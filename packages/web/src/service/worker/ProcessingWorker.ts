import {
  WorkerOutgoingMessage,
  WorkerPortMessageType,
  WorkerIncomingMessage,
} from './Messages';

const hasSharedWorkerSupport = (): boolean => {
  return typeof window.SharedWorker === 'function';
};

export interface ProcessingWorkerInterface {
  setOnMessage: (
    handler: (event: MessageEvent<WorkerOutgoingMessage>) => void
  ) => void;
  postMessage: (message: WorkerIncomingMessage) => void;
}

export const ProcessingWorker = (): ProcessingWorkerInterface => {
  let processingWorker: SharedWorker | Worker;
  if (hasSharedWorkerSupport()) {
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
      if (hasSharedWorkerSupport()) {
        const worker = processingWorker as SharedWorker;
        worker.port.onmessage = handler;
      } else {
        const worker = processingWorker as Worker;
        worker.onmessage = handler;
      }
    },
    postMessage: (message: WorkerIncomingMessage): void => {
      if (hasSharedWorkerSupport()) {
        const worker = processingWorker as SharedWorker;
        worker.port.postMessage(message);
      } else {
        const worker = processingWorker as Worker;
        worker.postMessage(message);
      }
    },
  };
};
