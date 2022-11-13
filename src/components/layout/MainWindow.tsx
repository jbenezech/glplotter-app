import {GLPlotterContainer} from '@Components/canvas/GLPlotterContainer';
import {SignalsContainer} from '@Components/channel/SignalsContainer';
import {ReactElement} from 'react';

export function MainWindow(): ReactElement {
  return (
    <div className={'container-fluid gx-0 d-flex'}>
      <SignalsContainer />
      <GLPlotterContainer />
    </div>
  );
}
