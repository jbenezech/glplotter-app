import {GLPlotter} from 'glplotter';
import {createContext, Dispatch} from 'react';
import {
  DisplayRateDecreaseAction,
  DisplayRateDecreaseActionType,
  DisplayRateIncreaseAction,
  DisplayRateIncreaseActionType,
} from './actions/DisplayRateAction';
import {ApplicationStateType} from './StateContext';

export interface ReducerAction<T, P> {
  type: T;
  payload: P;
}

type ApplicationAction = DisplayRateIncreaseAction | DisplayRateDecreaseAction;

export type ApplicationReducerType = (
  state: ApplicationStateType,
  action: ApplicationAction
) => ApplicationStateType;

export const applicationReducer = (
  state: ApplicationStateType,
  action: ApplicationAction,
  plotter: () => GLPlotter
): ApplicationStateType => {
  switch (action.type) {
    case DisplayRateIncreaseActionType: {
      const newRate = state.displayRate + 50;
      plotter().displayRate(newRate);
      return {...state, displayRate: newRate};
    }
    case DisplayRateDecreaseActionType: {
      const newRate = state.displayRate - 50;
      plotter().displayRate(newRate);
      return {...state, displayRate: newRate};
    }
    default:
      return state;
  }
};

export const ApplicationDispatchContext = createContext<
  Dispatch<ApplicationAction>
>(() => null);
