import {ReactElement, useMemo, useReducer} from 'react';
import {
  ApplicationAction,
  ApplicationDispatchContext,
  applicationReducer,
  ApplicationReducerType,
} from './DispatchContext';
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

  const [state, dispatch] = useReducer<
    ApplicationReducerType,
    ApplicationStateType
  >(reducer, InitialApplicationState, init);

  return (
    <ApplicationDispatchContext.Provider value={{dispatch}}>
      <ApplicationStateContext.Provider value={state}>
        {children}
      </ApplicationStateContext.Provider>
    </ApplicationDispatchContext.Provider>
  );
}
