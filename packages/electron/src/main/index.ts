import {app, BrowserWindow, ipcMain, MessageChannelMain} from 'electron';
import {join} from 'node:path';
import {release} from 'node:os';

process.env.DIST_ELECTRON = join(__dirname, '../');
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist');
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST;

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName());

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

  if (process.env.VITE_DEV_SERVER_URL) {
    const url = join(process.env.VITE_DEV_SERVER_URL, 'src/worker/index.html');
    await window.loadURL(url);
  } else {
    const indexHtml = join(process.env.DIST, 'worker/index.html');
    await window.loadFile(indexHtml);
  }

  window.on('closed', () => {
    workerWindow = null;
  });

  workerWindow = window;
}

async function createMainWindow(): Promise<void> {
  const window = new BrowserWindow({
    show: false,
    icon: join(process.env.PUBLIC, 'favicon.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  window.setMenuBarVisibility(false);
  window.maximize();
  window.show();

  if (process.env.VITE_DEV_SERVER_URL) {
    const url = process.env.VITE_DEV_SERVER_URL;
    await window.loadURL(url);
    // Open devTool if the app is not packaged
    window.webContents.openDevTools();
  } else {
    const indexHtml = join(process.env.DIST, 'index.html');
    await window.loadFile(indexHtml);
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

app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-gpu-compositing');
