import {DataService} from '@Services/DataService';
import {DataFrame} from 'glplotter';
import {useMemo} from 'react';

interface DataServiceHookProps {
  onData: (data: DataFrame) => void;
}

export const useDataService = ({onData}: DataServiceHookProps): DataService => {
  const service = useMemo(() => new DataService(onData), [onData]);
  return service;
};
