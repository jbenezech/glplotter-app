import {GLAction, GLInfoActionType} from '@Context/actions/GLAction';
import {ApplicationStateType} from '@Context/StateContext';

export const glReducer = (
  state: ApplicationStateType,
  action: GLAction
): ApplicationStateType => {
  switch (action.type) {
    case GLInfoActionType: {
      const newState = {...state, glInfo: action.payload.info};
      return newState;
    }
    default:
      return state;
  }
};
