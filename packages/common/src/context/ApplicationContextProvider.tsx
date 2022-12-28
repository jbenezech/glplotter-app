import {useTheme} from '@mui/material';
import {ReactElement, useMemo, useReducer} from 'react';
import {
  ApplicationAction,
  applicationReducer,
  ApplicationReducerType,
} from './ApplicationReducer';
import {ApplicationDispatchContext} from './DispatchContext';
import {
  ApplicationStateContext,
  ApplicationStateType,
  InitialApplicationState,
} from './StateContext';

interface ProviderProps {
  children: React.ReactNode;
}

const init = (state: ApplicationStateType): ApplicationStateType => state;

export function ApplicationContextProvider({
  children,
}: ProviderProps): ReactElement {
  const reducer = useMemo((): ApplicationReducerType => {
    return (state: ApplicationStateType, action: ApplicationAction) =>
      applicationReducer(state, action);
  }, []);
  const theme = useTheme();

  const [state, dispatch] = useReducer<
    ApplicationReducerType,
    ApplicationStateType
  >(reducer, InitialApplicationState(theme), init);

  return (
    <ApplicationDispatchContext.Provider value={{dispatch}}>
      <ApplicationStateContext.Provider value={state}>
        {children}
      </ApplicationStateContext.Provider>
    </ApplicationDispatchContext.Provider>
  );
}
