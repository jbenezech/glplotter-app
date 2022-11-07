import {CanvasContainer} from '@Components/canvas/CanvasContainer';
import {ChannelsContainer} from '@Components/channel/ChannelsContainer';
import {ApplicationDispatchContext} from '@Context/DispatchContext';
import React, {ReactElement, useContext} from 'react';

export function MainWindow(): ReactElement {
  const dispatch = useContext(ApplicationDispatchContext);

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
    <div
      className={'container-fluid gx-0 d-flex'}
      tabIndex={0}
      onKeyDown={handleKeyPress}
    >
      <ChannelsContainer />
      <CanvasContainer />
    </div>
  );
}
