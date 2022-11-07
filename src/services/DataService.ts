import {DataFrame} from 'glplotter';
import {data} from './input';

export class DataService {
  private onData;
  private lastX = 0;
  private interval: NodeJS.Timer | null = null;

  public constructor(onData: (data: DataFrame) => void) {
    this.onData = onData;
  }

  public listen(): void {
    //stop if we were already sending data
    this.stop();

    this.interval = setInterval(() => {
      const dataFrame = [];
      for (let index = 0; index < 50; index++) {
        dataFrame.push({x: this.lastX, y: data[this.lastX % data.length]});
        this.lastX++;
      }
      this.onData({
        channelId: 'ch1',
        points: dataFrame,
      });
    }, 50);
  }

  public stop(): void {
    if (this.interval !== null) {
      clearInterval(this.interval);
    }
  }
}
