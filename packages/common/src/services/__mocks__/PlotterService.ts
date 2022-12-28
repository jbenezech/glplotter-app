import {GLPlotter} from 'glplotter';
import {createContext} from 'react';

export const plotterMock = {
  bufferData: jest.fn(),
  addSignal: jest.fn(),
  removeSignal: jest.fn(),
  replaceSignals: jest.fn(),
  stop: jest.fn(),
  destroy: jest.fn(),
  displayRate: jest.fn(),
  zoom: jest.fn(),
  positionSignal: jest.fn(),
  switchMode: jest.fn(),
  move: jest.fn(),
  timestamp: (position: number): number => position,
  pixelToTimestamp: (position: number): number => position,
  addMeasure: jest.fn(),
  removeMeasure: jest.fn(),
  replaceMeasures: jest.fn(),
};

export class PlotterService {
  public async attach(): Promise<void> {
    return new Promise((resolve) => resolve());
  }

  public async detach(): Promise<void> {
    return new Promise((resolve) => resolve());
  }

  public plotter(): Partial<GLPlotter> {
    return plotterMock;
  }
}

export const PlotterServiceContext = createContext<PlotterService>(
  new PlotterService()
);
