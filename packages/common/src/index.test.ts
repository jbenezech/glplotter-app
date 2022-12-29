import {App} from './index';
import {AppRouter} from './index';
import {PlatformProvider} from './index';
import {PlatformContext} from './index';
import {useDataService} from './index';
import {ContextValue} from './index';
import {DataServiceInterface} from './index';

describe('Index', () => {
  it('exports public api', () => {
    expect(App).toBeTruthy();
    expect(AppRouter).toBeTruthy();
    expect(PlatformProvider).toBeTruthy();
    expect(PlatformContext).toBeTruthy();
    expect(useDataService).toBeTruthy();
    const value = {} as DataServiceInterface | ContextValue;
    expect(value).toBeDefined();
  });
});
