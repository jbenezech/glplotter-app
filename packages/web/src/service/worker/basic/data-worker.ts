import {
  DataReceivedMessageType,
  DATA_CHANNEL,
  WorkerIncomingMessage,
  WorkerOutgoingMessage,
} from '../Messages';

const socketWorker = new Worker(
  new URL('./socket-worker.ts?worker', import.meta.url),
  {type: 'module'}
);

const dataChannel = new BroadcastChannel(DATA_CHANNEL);

self.onmessage = (event: MessageEvent<WorkerIncomingMessage>): void => {
  socketWorker.postMessage(event.data);
};

dataChannel.onmessage = (event: MessageEvent<WorkerOutgoingMessage>): void => {
  switch (event.data.type) {
    case DataReceivedMessageType:
      //In real life, we'll do some processing here
      //That's why we do it in a worker
      self.postMessage({
        type: DataReceivedMessageType,
        payload: {
          data: event.data.payload.data,
        },
      });
      break;
    default:
  }
};
