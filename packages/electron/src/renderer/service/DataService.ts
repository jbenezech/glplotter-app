import {DataServiceInterface} from '@glplotter-app/common';
import {DataFrame} from 'glplotter';
import {createContext} from 'react';

import {ipcRenderer} from 'electron';
import {
  DataReceivedMessageType,
  StartSessionMessageType,
  StopSessionMessageType,
  WorkerOutgoingMessage,
} from '../../common/Messages';

export class DataService implements DataServiceInterface {
  private messagePort: MessagePort | null = null;

  public listen(
    sessionId: string | undefined,
    onData: (data: DataFrame) => void
  ): void {
    //stop if we were already sending data
    this.stop();

    ipcRenderer.send('channel-request');

    ipcRenderer.once('channel-response', (event) => {
      this.messagePort = event.ports[0];

      this.messagePort.postMessage({
        type: StartSessionMessageType,
        payload: sessionId,
      });

      this.messagePort.onmessage = (
        event: MessageEvent<WorkerOutgoingMessage>
      ): void => {
        switch (event.data.type) {
          case DataReceivedMessageType: {
            const payload = event.data.payload;
            payload.data
              .filter((data) => data.points.length > 0)
              .forEach((frame) => onData(frame));
            break;
          }
          default:
        }
      };
    });
  }

  public stop(): void {
    this.messagePort?.postMessage({type: StopSessionMessageType});
  }
}

export const DataServiceContext = createContext<DataService>(new DataService());
