import {DataFrame, Point} from 'glplotter';
import {
  DataReceivedMessageType,
  DATA_CHANNEL,
  WorkCommunicationMessage,
  WorkerIncomingMessage,
  WorkerOutgoingMessage,
  WorkerPortMessageType,
} from '../Messages';

interface SharedWorkerGlobalScope {
  onconnect: (event: MessageEvent) => void;
}

const worker: SharedWorkerGlobalScope = self as SharedWorkerGlobalScope;

let socketPort: MessagePort | null = null;
const mainPorts: MessagePort[] = [];
let portInCommand: MessagePort | null = null;

worker.onconnect = (connectEvent): void => {
  const port = connectEvent.ports[0];
  if (portInCommand == null) {
    portInCommand = port;
    portInCommand.addEventListener(
      'message',
      (
        messageEvent: MessageEvent<
          WorkCommunicationMessage | WorkerIncomingMessage
        >
      ) => {
        switch (messageEvent.data.type) {
          case WorkerPortMessageType:
            socketPort = messageEvent.data.payload.port;
            break;
          default:
            socketPort?.postMessage(messageEvent.data);
        }
      }
    );
  }
  port.start();
  mainPorts.push(port);
};

const dataChannel = new BroadcastChannel(DATA_CHANNEL);
const portsBackFilled: MessagePort[] = [];

//All contexts share the same data
//So a context started later will not have its data
//starting at zero
//We backfill late comers here so that all contexts
//have the same amount of data
//We could eventually hold some data in RAM for a while
//and backfill with real data instead of zeros
const backfillLateFramesForPort = (
  frames: DataFrame[],
  port: MessagePort
): DataFrame[] => {
  if (portsBackFilled.includes(port)) {
    return frames;
  }

  const firstFrame = frames[0];
  const firstPoint = firstFrame.points[0];
  const backfilledPoints: Point[] = [];
  for (let index = 0; index < firstPoint.x; index++) {
    backfilledPoints.push({
      x: index,
      y: 0,
    });
  }
  const backfilledFrames = frames.map((frame) => ({
    ...frame,
    points: [...backfilledPoints, ...frame.points],
  }));

  portsBackFilled.push(port);
  return backfilledFrames;
};

dataChannel.onmessage = (event: MessageEvent<WorkerOutgoingMessage>): void => {
  switch (event.data.type) {
    case DataReceivedMessageType:
      //In real life, we'll do some processing here
      //That's why we do it in a worker
      mainPorts.forEach((port) => {
        const frames = backfillLateFramesForPort(event.data.payload.data, port);
        port.postMessage({
          type: DataReceivedMessageType,
          payload: {
            data: frames,
          },
        });
      });
      break;
    default:
  }
};
