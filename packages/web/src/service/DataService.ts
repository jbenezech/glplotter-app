import {DataServiceInterface} from '@glplotter-app/common';
import {DataFrame} from 'glplotter';
import {createContext} from 'react';
import {
  DataReceivedMessageType,
  StartSessionMessageType,
  StopSessionMessageType,
  WorkerOutgoingMessage,
} from './worker/Messages';

const worker = new Worker(new URL('./worker/data-worker.ts', import.meta.url));

export class DataService implements DataServiceInterface {
  public listen(
    sessionId: string | undefined,
    onData: (data: DataFrame) => void
  ): void {
    //stop if we were already sending data
    this.stop();

    worker.postMessage({type: StartSessionMessageType, payload: sessionId});

    worker.onmessage = (event: MessageEvent<WorkerOutgoingMessage>): void => {
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
  }

  public stop(): void {
    worker.postMessage({type: StopSessionMessageType});
  }
}

export const DataServiceContext = createContext<DataService>(new DataService());
