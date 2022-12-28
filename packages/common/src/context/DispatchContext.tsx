import {createContext, Dispatch} from 'react';
import {ApplicationAction} from './ApplicationReducer';

interface DispatchContextType {
  dispatch: Dispatch<ApplicationAction>;
}

export const ApplicationDispatchContext = createContext<DispatchContextType>({
  dispatch: () => null,
});
