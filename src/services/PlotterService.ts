import {GLPlotter, glplotter, GLPlotterOptions} from 'glplotter';
import {createContext} from 'react';

export class PlotterService {
  private _plotter: GLPlotter | null = null;
  private promiseQueue: Promise<void>[] = [];

  public async attach(options: GLPlotterOptions): Promise<void> {
    this.promiseQueue.push(this.detach());

    await Promise.all(this.promiseQueue);

    this.promiseQueue = [];

    this._plotter = glplotter(options);
  }

  public async detach(): Promise<void> {
    if (this._plotter === null) {
      return;
    }
    this._plotter.destroy();
    this._plotter = null;

    //@TODO library should return promise
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 50)
    );
  }

  public plotter(): GLPlotter {
    if (this._plotter === null) {
      throw new Error('GLPlotter used before initialization');
    }
    return this._plotter;
  }
}

export const PlotterServiceContext = createContext<PlotterService>(
  new PlotterService()
);
