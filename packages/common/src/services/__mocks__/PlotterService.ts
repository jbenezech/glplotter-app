import {GLPlotter} from 'glplotter';
import {createContext} from 'react';
import {vi} from 'vitest';

export const plotterMock = {
  bufferData: vi.fn(),
  addSignal: vi.fn(),
  removeSignal: vi.fn(),
  replaceSignals: vi.fn(),
  stop: vi.fn(),
  destroy: vi.fn(),
  displayRate: vi.fn(),
  zoom: vi.fn(),
  positionSignal: vi.fn(),
  switchMode: vi.fn(),
  move: vi.fn(),
  timestamp: (position: number): number => position,
  pixelToTimestamp: (position: number): number => position,
  addMeasure: vi.fn(),
  removeMeasure: vi.fn(),
  replaceMeasures: vi.fn(),
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
