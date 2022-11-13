import {
  SignalAction,
  SignalMoveActionType,
} from '@Context/actions/SignalAction';
import {ApplicationStateType} from '@Context/StateContext';

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
    default:
      return state;
  }
};
