import {GLPlotter} from 'glplotter';
import {PlotterService} from './PlotterService';
import {vi, describe, it, expect} from 'vitest';

const destroySpy = vi.fn();

vi.mock('glplotter', () => ({
  glplotter: (): Partial<GLPlotter> => {
    return {
      destroy: destroySpy,
    };
  },
}));

describe('PlotterService', () => {
  it('allows attaching plotter', async () => {
    const service = new PlotterService();
    await service.attach({
      referenceContainer: document.createElement('div'),
      displayRate: 50,
    });

    expect(service.plotter()).toBeTruthy();
  });

  it('allows dettaching plotter', async () => {
    const service = new PlotterService();
    await service.attach({
      referenceContainer: document.createElement('div'),
      displayRate: 50,
    });
    await service.detach();

    expect(destroySpy).toHaveBeenCalled();

    let exceptionThrown = false;

    try {
      service.plotter();
    } catch {
      exceptionThrown = true;
    }
    expect(exceptionThrown).toEqual(true);
  });
});
