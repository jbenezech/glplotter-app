import {ReactElement} from 'react';
import {makeStyles, createStyles} from '@mui/styles';
import {Signal} from '@Context/StateContext';
import {SIGNAL_PIXEL_HEIGHT} from '@Utils/signalUtils';

const useStyles = makeStyles(() =>
  createStyles({
    signal: {
      color: '#fff',
      cursor: 'pointer',
      height: `${SIGNAL_PIXEL_HEIGHT}px`,
    },
    highlight: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  })
);

interface SignalComponentProps {
  signal: Signal;
  highlight: boolean;
}

export function SignalComponent({
  signal,
  highlight,
}: SignalComponentProps): ReactElement {
  const classes = useStyles();

  const inlineStyle = {
    top: `${signal.yPosition + SIGNAL_PIXEL_HEIGHT / 2}px`,
    left: 0,
  };

  return (
    <div
      className={`
        ${classes.signal}
        ${highlight ? classes.highlight : ''}
        position-absolute w-100 d-flex align-items-center
      `}
      style={inlineStyle}
    >
      {signal.channelId}
    </div>
  );
}
