import {ChannelSettings} from '@Pages/session/channelSettings/ChannelSettings';
import {FullScreenDialog} from '@Components/dialog/FullScreenDialog';
import {ApplicationDispatchContext} from '@Context/DispatchContext';
import {ReactElement, useContext, useState} from 'react';
import {Base} from '../Base';
import {TabSettings} from './tabSettings/TabSettings';
import {ApplicationStateContext} from '@Context/StateContext';
import {MainWindow} from './MainWindow';
import {Header} from './layout/Header';
import {Footer} from './layout/Footer';

export function Session(): ReactElement {
  const {tabs} = useContext(ApplicationStateContext);
  const {dispatch} = useContext(ApplicationDispatchContext);
  const [isChannelSettingsOpen, setIsChannelSettingsOpen] = useState(false);
  const [isTabSettingsOpen, setIsTabSettingsOpen] = useState(false);

  const currentTab = tabs.find((tab) => !!tab.visible);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    const keyName = event.key;
    if (keyName === '+') {
      event.preventDefault();
      dispatch({type: 'displayRate/increase', payload: {}});
      return;
    }

    if (keyName === '-') {
      event.preventDefault();
      dispatch({type: 'displayRate/decrease', payload: {}});
      return;
    }
  };

  return (
    <Base>
      {isChannelSettingsOpen && (
        <FullScreenDialog onClose={(): void => setIsChannelSettingsOpen(false)}>
          <ChannelSettings
            onComplete={(): void => setIsChannelSettingsOpen(false)}
          />
        </FullScreenDialog>
      )}
      {currentTab && isTabSettingsOpen && (
        <FullScreenDialog onClose={(): void => setIsTabSettingsOpen(false)}>
          <TabSettings
            currentTab={currentTab}
            onComplete={(): void => setIsTabSettingsOpen(false)}
          />
        </FullScreenDialog>
      )}
      <div
        className="vw-100 vh-100 d-flex flex-column justify-content-around overflow-hidden"
        tabIndex={0}
        onKeyDown={handleKeyPress}
      >
        <Header onSettings={(): void => setIsChannelSettingsOpen(true)} />
        <MainWindow />
        <Footer onSettings={(): void => setIsTabSettingsOpen(true)} />
      </div>
    </Base>
  );
}
