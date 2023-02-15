import {DataFrame} from 'glplotter';
import {vi} from 'vitest';

export const listenSpy = vi.fn();
export const stopSpy = vi.fn();

export class DataServiceMock {
  public async listen(
    sessionId: string | undefined,
    onData: (data: DataFrame) => void
  ): Promise<void> {
    listenSpy(sessionId, onData);
    onData({
      channelId: 'ch1',
      points: [{x: 0, y: 0}],
    });
    return new Promise((resolve) => resolve());
  }

  public stop(): void {
    stopSpy();
  }
}
