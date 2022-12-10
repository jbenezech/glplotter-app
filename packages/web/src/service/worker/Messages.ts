import {DataFrame} from 'glplotter';

export const DATA_CHANNEL = 'DATA_CHANNEL';

export interface WorkerMessage<T, P> {
  type: T;
  payload: P;
}

export const WorkerPortMessageType = 'socket/port';
export interface WorkerPortPayload {
  port: MessagePort;
}
export type WorkerPortMessage = WorkerMessage<
  typeof WorkerPortMessageType,
  WorkerPortPayload
>;

export type WorkCommunicationMessage = WorkerPortMessage;

export const StartSessionMessageType = 'session/start';
export interface SessionStartPayload {
  sessionId?: string;
}
export type StartSessionMessage = WorkerMessage<
  typeof StartSessionMessageType,
  SessionStartPayload
>;

export const StopSessionMessageType = 'session/stop';
export type SessionStopPayload = Record<string, never>;
export type StopSessionMessage = WorkerMessage<
  typeof StopSessionMessageType,
  SessionStopPayload
>;

export type WorkerIncomingMessage = StartSessionMessage | StopSessionMessage;

export const DataReceivedMessageType = 'data/received';
export interface DataReceivedPayload {
  data: DataFrame[];
}
export type DataReceivedMessage = WorkerMessage<
  typeof DataReceivedMessageType,
  DataReceivedPayload
>;

export type WorkerOutgoingMessage = DataReceivedMessage;
