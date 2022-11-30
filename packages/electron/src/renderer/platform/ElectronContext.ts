import {ContextValue, DataServiceInterface} from '@glplotter-app/common';
import {DataService} from '../service/DataService';

export const ElectronContext: ContextValue = {
  dataService: (): DataServiceInterface => {
    return new DataService();
  },
};
