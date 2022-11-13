import {DataService, DataServiceContext} from '@Services/DataService';
import {useContext} from 'react';

export const useDataService = (): DataService => {
  return useContext<DataService>(DataServiceContext);
};
