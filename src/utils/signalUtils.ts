import {Signal} from '@Context/StateContext';

export const SIGNAL_PIXEL_HEIGHT = 70;

export const calculateNextSignalYPosition = (
  existingSignals: Signal[]
): number => {
  const lastPos = existingSignals
    .map((signal) => signal.yPosition)
    .reduce((acc, current) => {
      if (current > acc) {
        return current;
      }
      return acc;
    }, 0);

  return lastPos + SIGNAL_PIXEL_HEIGHT;
};
