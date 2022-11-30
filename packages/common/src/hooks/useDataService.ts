import {PlatformContext} from '@Context/PlatformContext';
import {DataServiceInterface} from '@Services/DataServiceInterface';
import {useContext, useMemo} from 'react';

export const useDataService = (): DataServiceInterface => {
  const context = useContext(PlatformContext);
  const service = useMemo(() => context.dataService(), [context]);
  return service;
};
