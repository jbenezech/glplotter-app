import {ContextValue} from '@Context/PlatformContext';
import {DataServiceInterface} from '@Services/DataServiceInterface';
import {DataServiceMock} from './DataServiceMock';

export const PlatformContextMock: ContextValue = {
  dataService: (): DataServiceInterface => {
    return new DataServiceMock();
  },
};
