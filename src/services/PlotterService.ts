import {InitialApplicationState} from '@Context/StateContext';
import {GLPlotter, glplotter} from 'glplotter';
import {createContext} from 'react';

export class PlotterService {
  private _plotter: GLPlotter | null = null;

  public attach(referenceContainer: HTMLElement): void {
    const {displayRate} = InitialApplicationState;
    this._plotter = glplotter({
      referenceContainer,
      displayRate: displayRate,
    });
  }

  public detach(): void {
    if (this._plotter === null) {
      return;
    }
    this._plotter.destroy();
    this._plotter = null;
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
