import {ChannelSettings} from '@Components/ChannelSettings/ChannelSettings';
import {FullScreenDialog} from '@Components/Dialog/FullScreenDialog';
import {Footer} from '@Components/layout/Footer';
import {Header} from '@Components/layout/Header';
import {MainWindow} from '@Components/layout/MainWindow';
import {ApplicationDispatchContext} from '@Context/DispatchContext';
import {ReactElement, useContext, useState} from 'react';

export function Root(): ReactElement {
  const {dispatch} = useContext(ApplicationDispatchContext);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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

  const handleOpenSettings = (): void => {
    setIsSettingsOpen(true);
  };

  return (
    <>
      {isSettingsOpen && (
        <FullScreenDialog onClose={(): void => setIsSettingsOpen(false)}>
          <ChannelSettings onComplete={(): void => setIsSettingsOpen(false)} />
        </FullScreenDialog>
      )}
      <div
        className="vw-100 vh-100 d-flex flex-column justify-content-around overflow-hidden"
        tabIndex={0}
        onKeyDown={handleKeyPress}
      >
        <Header onSettings={handleOpenSettings} />
        <MainWindow />
        <Footer />
      </div>
    </>
  );
}
