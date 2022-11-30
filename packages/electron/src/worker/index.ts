import {ipcRenderer} from 'electron';
import {WorkerIncomingMessage} from '../common/Messages';
import {handleMessage} from './DataWorker';

ipcRenderer.once('channel-response', (event) => {
  const messagePort = event.ports[0];
  messagePort.onmessage = (
    event: MessageEvent<WorkerIncomingMessage>
  ): void => {
    handleMessage(event, messagePort);
  };
});
