import {GLPlotter, glplotter} from 'glplotter';

interface GlPlotterHook {
  attach: (referenceContainer: HTMLElement) => GLPlotter;
  detach: () => void;
  plotter: () => GLPlotter;
}

let plotter: GLPlotter | null = null;

export const useGlPlotter = (): GlPlotterHook => {
  const attach = (referenceContainer: HTMLElement): GLPlotter => {
    referenceContainer.innerHTML = '';

    plotter = glplotter({
      referenceContainer,
      displayRate: 50,
    });

    return plotter;
  };

  const detach = (): void => {
    if (plotter === null) {
      return;
    }
    plotter.destroy();
    plotter = null;
  };

  const getPlotter = (): GLPlotter => {
    if (plotter === null) {
      throw new Error('GLPlotter used before initialization');
    }
    return plotter;
  };

  return {
    attach,
    plotter: getPlotter,
    detach,
  };
};
