import {DataServiceInterface} from '@glplotter-app/common';
import {DataFrame} from 'glplotter';
import {createContext} from 'react';
import {
  DataReceivedMessageType,
  StartSessionMessageType,
  StopSessionMessageType,
  WorkerOutgoingMessage,
} from './worker/Messages';
import {ProcessingWorker} from './worker/ProcessingWorker';

const processingWorker = ProcessingWorker();

export class DataService implements DataServiceInterface {
  public listen(
    sessionId: string | undefined,
    onData: (data: DataFrame) => void
  ): void {
    //stop if we were already sending data
    this.stop();

    processingWorker.postMessage({
      type: StartSessionMessageType,
      payload: {sessionId},
    });

    const onMessageHandler = (
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

    processingWorker.setOnMessage(onMessageHandler);
  }

  public stop(): void {
    processingWorker.postMessage({type: StopSessionMessageType, payload: {}});
  }
}

export const DataServiceContext = createContext<DataService>(new DataService());
