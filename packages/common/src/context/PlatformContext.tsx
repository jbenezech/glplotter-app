import {DataServiceInterface} from '@Services/DataServiceInterface';
import {createContext} from 'react';

export interface ContextValue {
  dataService: () => DataServiceInterface;
}

export const PlatformContext = createContext<ContextValue>({
  dataService: () => {
    return {} as DataServiceInterface;
  },
});
