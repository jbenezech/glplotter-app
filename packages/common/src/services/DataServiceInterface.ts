import {DataFrame} from 'glplotter';

export interface DataServiceInterface {
  listen(
    sessionId: string | undefined,
    onData: (data: DataFrame) => void
  ): void;

  stop(): void;
}
