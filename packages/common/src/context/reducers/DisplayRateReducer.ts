import {
  DisplayRateAction,
  DisplayRateDecreaseActionType,
  DisplayRateIncreaseActionType,
} from '@Context/actions/DisplayRateAction';
import {ApplicationStateType} from '@Context/StateContext';
import {AVAILABLE_DISPLAY_RATES} from '@Constants';

export const nextDisplayRate = (current: number): number => {
  const index = AVAILABLE_DISPLAY_RATES.findIndex((rate) => rate === current);
  return AVAILABLE_DISPLAY_RATES[
    Math.min(AVAILABLE_DISPLAY_RATES.length - 1, index + 1)
  ];
};

export const previousDisplayRate = (current: number): number => {
  const index = AVAILABLE_DISPLAY_RATES.findIndex((rate) => rate === current);
  return AVAILABLE_DISPLAY_RATES[Math.max(0, index - 1)];
};

export const displayRateReducer = (
  state: ApplicationStateType,
  action: DisplayRateAction
): ApplicationStateType => {
  switch (action.type) {
    case DisplayRateIncreaseActionType: {
      const newRate = nextDisplayRate(state.displayRate);
      return {...state, displayRate: newRate};
    }
    case DisplayRateDecreaseActionType: {
      const newRate = previousDisplayRate(state.displayRate);
      return {...state, displayRate: newRate};
    }
    default:
      return state;
  }
};
