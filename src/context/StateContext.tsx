import {createContext} from 'react';

export interface ApplicationStateType {
  displayRate: number;
}

export const InitialApplicationState: ApplicationStateType = {
  displayRate: 50,
};

export const ApplicationStateContext = createContext(InitialApplicationState);
