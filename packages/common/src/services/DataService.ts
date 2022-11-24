import {DataFrame, Point} from 'glplotter';
import {createContext} from 'react';
import {data} from './input';

export class DataService {
  private lastX = 0;
  private interval: NodeJS.Timer | null = null;

  public listen(
    sessionId: string | undefined,
    onData: (data: DataFrame) => void
  ): void {
    //stop if we were already sending data
    this.stop();

    this.interval = setInterval(() => {
      const dataFrame: Point[] = [];
      for (let index = 0; index < 50; index++) {
        dataFrame.push({x: this.lastX, y: data[this.lastX % data.length]});
        this.lastX++;
      }

      ['ch1', 'ch2', 'ch3'].forEach((channel) =>
        onData({
          channelId: channel,
          points: dataFrame,
        })
      );
    }, 50);
  }

  public stop(): void {
    if (this.interval !== null) {
      clearInterval(this.interval);
    }
    this.lastX = 0;
  }
}

export const DataServiceContext = createContext<DataService>(new DataService());
