import {
  SignalAction,
  SignalMoveActionType,
  SignalResizeActionType,
} from '@Context/actions/SignalAction';
import {ApplicationStateType} from '@Context/StateContext';
import {fitSignalsInContainer} from '@Utils/signalUtils';

export const signalReducer = (
  state: ApplicationStateType,
  action: SignalAction
): ApplicationStateType => {
  switch (action.type) {
    case SignalMoveActionType: {
      const movingSignal = state.signals.find(
        (signal) => signal.id === action.payload.signalId
      );

      if (movingSignal === undefined) {
        return state;
      }

      const newState = {
        ...state,
        signals: [
          ...state.signals.filter((signal) => signal.id !== movingSignal.id),
          {
            ...movingSignal,
            yPosition: action.payload.yPosition,
          },
        ],
      };
      return newState;
    }

    case SignalResizeActionType: {
      //reposition all signals to make sure they fit
      //in the new window. Otherwise they will just
      //disapear from the screen
      const signals = fitSignalsInContainer(
        action.payload.containerRect,
        state.signals
      );

      return {
        ...state,
        signals,
        signalsContainerRect: action.payload.containerRect,
      };
    }

    default:
      return state;
  }
};
