import {DataServiceInterface} from '@glplotter-app/common';
import {DataFrame} from 'glplotter';
import {createContext} from 'react';
import {
  DataReceivedMessageType,
  StartSessionMessageType,
  StopSessionMessageType,
  WorkerOutgoingMessage,
  WorkerPortMessageType,
} from './worker/Messages';

const socketWorker = new SharedWorker(
  new URL('./worker/socket-worker.ts', import.meta.url),
  {name: 'fetcher'}
);

const processingWorker = new SharedWorker(
  new URL('./worker/data-worker.ts', import.meta.url)
);

processingWorker.port.postMessage(
  {
    type: WorkerPortMessageType,
    payload: {
      port: socketWorker.port,
    },
  },
  [socketWorker.port]
);

export class DataService implements DataServiceInterface {
  public listen(
    sessionId: string | undefined,
    onData: (data: DataFrame) => void
  ): void {
    //stop if we were already sending data
    this.stop();

    processingWorker.port.postMessage({
      type: StartSessionMessageType,
      payload: sessionId,
    });

    processingWorker.port.onmessage = (
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
          console.log(event.data);
      }
    };
  }

  public stop(): void {
    socketWorker.port.postMessage({type: StopSessionMessageType});
  }
}

export const DataServiceContext = createContext<DataService>(new DataService());
