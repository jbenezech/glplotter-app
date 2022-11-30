import {DataFrame, Point} from 'glplotter';
import {
  DataReceivedMessageType,
  StartSessionMessageType,
  StopSessionMessageType,
  WorkerIncomingMessage,
} from '../common/Messages';

const SAMPLING_RATE = 50;
const CHANNELS = ['ch1', 'ch2'];

let lastX = 0;
let interval: NodeJS.Timer | null = null;

const generateSignal = (): Point[] => {
  const points: Point[] = [];
  for (let index = lastX; index < SAMPLING_RATE + lastX; index++) {
    points.push({
      x: index,
      y: Math.sin(index / ((SAMPLING_RATE * 10) / (Math.PI * 2))) * 4,
    });
  }

  return points;
};

export const handleMessage = (
  event: MessageEvent<WorkerIncomingMessage>,
  port: MessagePort
): void => {
  switch (event.data.type) {
    case StartSessionMessageType:
      if (interval !== null) {
        clearInterval(interval);
        lastX = 0;
      }
      interval = setInterval(() => {
        const frames: DataFrame[] = [];
        CHANNELS.forEach((channel) =>
          frames.push({
            channelId: channel,
            points: generateSignal(),
          })
        );
        lastX += SAMPLING_RATE;

        port.postMessage({
          type: DataReceivedMessageType,
          payload: {
            data: frames,
          },
        });
      }, SAMPLING_RATE);
      break;
    case StopSessionMessageType:
      if (interval !== null) {
        clearInterval(interval);
      }
      lastX = 0;
      break;
    default:
  }
};