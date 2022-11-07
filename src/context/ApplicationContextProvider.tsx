import {useGlPlotter} from '@Hooks/useGlPlotter';
import {ReactElement, useReducer} from 'react';
import {
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

export function ApplicationStateProvider({
  children,
}: ProviderProps): ReactElement {
  const {plotter} = useGlPlotter();
  const [state, dispatch] = useReducer<
    ApplicationReducerType,
    ApplicationStateType
  >(
    (action, state) => applicationReducer(action, state, plotter),
    InitialApplicationState,
    init
  );

  return (
    <ApplicationDispatchContext.Provider value={dispatch}>
      <ApplicationStateContext.Provider value={state}>
        {children}
      </ApplicationStateContext.Provider>
    </ApplicationDispatchContext.Provider>
  );
}
