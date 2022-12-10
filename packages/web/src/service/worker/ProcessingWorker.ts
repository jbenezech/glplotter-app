import {
  WorkerOutgoingMessage,
  WorkerPortMessageType,
  WorkerIncomingMessage,
} from './Messages';

export interface ProcessingWorkerInterface {
  setOnMessage: (
    handler: (event: MessageEvent<WorkerOutgoingMessage>) => void
  ) => void;
  postMessage: (message: WorkerIncomingMessage) => void;
}

export const ProcessingWorker = (): ProcessingWorkerInterface => {
  let processingWorker: SharedWorker | Worker;
  if (typeof window.SharedWorker === 'function') {
    const socketWorker = new SharedWorker(
      new URL('./shared/socket-worker.ts', import.meta.url)
    );

    processingWorker = new SharedWorker(
      new URL('./shared/data-worker.ts', import.meta.url)
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
  } else {
    processingWorker = new Worker(
      new URL('./basic/data-worker.ts', import.meta.url)
    );
  }

  return {
    setOnMessage: (
      handler: (event: MessageEvent<WorkerOutgoingMessage>) => void
    ): void => {
      if (processingWorker instanceof SharedWorker) {
        processingWorker.port.onmessage = handler;
      } else {
        processingWorker.onmessage = handler;
      }
    },
    postMessage: (message: WorkerIncomingMessage): void => {
      if (processingWorker instanceof SharedWorker) {
        processingWorker.port.postMessage(message);
      } else {
        processingWorker.postMessage(message);
      }
    },
  };
};
