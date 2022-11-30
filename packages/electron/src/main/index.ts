import {app, BrowserWindow, ipcMain, MessageChannelMain} from 'electron';
import * as path from 'path';
process.env.NODE_OPTIONS = undefined;

const isDevelopment = process.env.NODE_ENV === 'development';
const developmentPort = process.env.ELECTRON_WEBPACK_WDS_PORT || 8080;
const isMacOS = process.platform === 'darwin';

// global reference to mainWindow (necessary to prevent window from being garbage collected)
/* eslint-disable @typescript-eslint/no-unused-vars */
let mainWindow: BrowserWindow | null;
let workerWindow: BrowserWindow | null;

async function createWorkerWindow(): Promise<void> {
  const window = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const indexPath = path.resolve(__dirname, 'worker/index.html');
  await window.loadFile(indexPath);

  window.on('closed', () => {
    workerWindow = null;
  });

  workerWindow = window;
}

async function createMainWindow(): Promise<void> {
  const window = new BrowserWindow({
    show: false,
    icon: path.join(__dirname, 'logo.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  window.setMenuBarVisibility(false);
  window.maximize();
  window.show();

  if (isDevelopment) {
    const url = `http://localhost:${developmentPort}`;
    await window.loadURL(url);
  } else {
    const indexPath = path.resolve(__dirname, 'renderer/index.html');
    await window.loadFile(indexPath);
  }

  window.on('closed', () => {
    mainWindow = null;
  });

  mainWindow = window;
}

function bridgeRenderers(): void {
  ipcMain.on('channel-request', (event) => {
    if (event.senderFrame === mainWindow?.webContents.mainFrame) {
      const {port1, port2} = new MessageChannelMain();
      workerWindow?.webContents.postMessage('channel-response', null, [port1]);
      event.senderFrame.postMessage('channel-response', null, [port2]);
    }
  });
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (!isMacOS) app.quit();
});

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  void createWorkerWindow();
  void createMainWindow();
});

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  void createWorkerWindow();
  void createMainWindow();
  bridgeRenderers();
});
