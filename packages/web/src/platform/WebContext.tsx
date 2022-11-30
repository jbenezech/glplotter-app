import {ContextValue, DataServiceInterface} from '@glplotter-app/common';
import {DataService} from '../service/DataService';

export const WebContext: ContextValue = {
  dataService: (): DataServiceInterface => {
    return new DataService();
  },
};
