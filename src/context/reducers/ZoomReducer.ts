import {AVAILABLE_ZOOM_RATIOS} from '@Constants';
import {
  ZoomAction,
  ZoomDecreaseActionType,
  ZoomIncreaseActionType,
} from '@Context/actions/ZoomAction';
import {ApplicationStateType} from '@Context/StateContext';

export const nextZoomRatio = (current: number): number => {
  const index = AVAILABLE_ZOOM_RATIOS.findIndex((rate) => rate === current);
  return AVAILABLE_ZOOM_RATIOS[
    Math.min(AVAILABLE_ZOOM_RATIOS.length - 1, index + 1)
  ];
};

export const previousZoomRatio = (current: number): number => {
  const index = AVAILABLE_ZOOM_RATIOS.findIndex((rate) => rate === current);
  return AVAILABLE_ZOOM_RATIOS[Math.max(0, index - 1)];
};

export const zoomReducer = (
  state: ApplicationStateType,
  action: ZoomAction
): ApplicationStateType => {
  switch (action.type) {
    case ZoomIncreaseActionType: {
      return {
        ...state,
        signals: [
          ...state.signals.filter(
            (signal) => signal.id !== action.payload.signalId
          ),
          ...state.signals
            .filter((signal) => signal.id === action.payload.signalId)
            .map((signal) => ({
              ...signal,
              zoomRatio: nextZoomRatio(signal.zoomRatio),
            })),
        ],
      };
    }
    case ZoomDecreaseActionType: {
      return {
        ...state,
        signals: [
          ...state.signals.filter(
            (signal) => signal.id !== action.payload.signalId
          ),
          ...state.signals
            .filter((signal) => signal.id === action.payload.signalId)
            .map((signal) => ({
              ...signal,
              zoomRatio: previousZoomRatio(signal.zoomRatio),
            })),
        ],
      };
    }
    default:
      return state;
  }
};
