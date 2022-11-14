import {createContext, Dispatch} from 'react';
import {ChannelAction, ChannelsSaveActionType} from './actions/ChannelAction';
import {
  DisplayRateAction,
  DisplayRateDecreaseActionType,
  DisplayRateIncreaseActionType,
} from './actions/DisplayRateAction';
import {
  DrawingModeAction,
  DrawingModeToggleActionType,
} from './actions/DrawingModeAction';
import {
  SignalAction,
  SignalMoveActionType,
  SignalResizeActionType,
} from './actions/SignalAction';
import {zoomReducer} from './reducers/ZoomReducer';
import {channelReducer} from './reducers/ChannelReducer';
import {displayRateReducer} from './reducers/DisplayRateReducer';
import {drawingModeReducer} from './reducers/DrawingModeReducer';
import {signalReducer} from './reducers/SignalReducer';
import {ApplicationStateType} from './StateContext';
import {
  ZoomAction,
  ZoomDecreaseActionType,
  ZoomIncreaseActionType,
} from './actions/ZoomAction';
import {
  TabAction,
  TabCreateActionType,
  TabSaveActionType,
  TabShowActionType,
} from './actions/TabAction';
import {tabReducer} from './reducers/TabReducer';

export interface ReducerAction<T, P> {
  type: T;
  payload: P;
}

export type ApplicationAction =
  | DisplayRateAction
  | ZoomAction
  | DrawingModeAction
  | ChannelAction
  | TabAction
  | SignalAction;

export type ApplicationReducerType = (
  state: ApplicationStateType,
  action: ApplicationAction
) => ApplicationStateType;

export const applicationReducer = (
  state: ApplicationStateType,
  action: ApplicationAction
): ApplicationStateType => {
  switch (action.type) {
    case DisplayRateIncreaseActionType:
    case DisplayRateDecreaseActionType:
      return displayRateReducer(state, action);

    case ZoomIncreaseActionType:
    case ZoomDecreaseActionType:
      return zoomReducer(state, action);

    case DrawingModeToggleActionType:
      return drawingModeReducer(state, action);

    case SignalMoveActionType:
    case SignalResizeActionType:
      return signalReducer(state, action);

    case ChannelsSaveActionType:
      return channelReducer(state, action);

    case TabSaveActionType:
    case TabCreateActionType:
    case TabShowActionType:
      return tabReducer(state, action);

    default:
      return state;
  }
};

interface DispatchContextType {
  dispatch: Dispatch<ApplicationAction>;
}

export const ApplicationDispatchContext = createContext<DispatchContextType>({
  dispatch: () => null,
});
