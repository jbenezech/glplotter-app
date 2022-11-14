import {ReactElement, useContext} from 'react';
import {makeStyles, createStyles} from '@mui/styles';
import {Signal} from '@Context/StateContext';
import {SIGNAL_PIXEL_HEIGHT} from '@Utils/signalUtils';
import {Text} from '@Components/typography/Text';
import {APP_THEME} from '@Theme';
import {ArrowDropDown, ArrowDropUp} from '@mui/icons-material';
import {IconButton} from '@mui/material';
import {AVAILABLE_ZOOM_RATIOS} from '@Constants';
import {ApplicationDispatchContext} from '@Context/DispatchContext';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      cursor: 'pointer',
      height: `${SIGNAL_PIXEL_HEIGHT}px`,
    },
    signal: {
      minWidth: '100%',
      color: '#fff',
      border: `1px solid ${APP_THEME.color.default.separator}`,
      borderWidth: '1px 0 1px 0',
    },
    text: {
      pointerEvents: 'none',
      userSelect: 'none',
    },
    filler: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  })
);

interface SignalComponentProps {
  signal: Signal;
}

export function SignalComponent({signal}: SignalComponentProps): ReactElement {
  const {dispatch} = useContext(ApplicationDispatchContext);
  const classes = useStyles();

  const handleZoomIncrease = (): void => {
    dispatch({
      type: 'zoom/increase',
      payload: {
        signalId: signal.id,
      },
    });
  };

  const handleZoomDecrease = (): void => {
    dispatch({
      type: 'zoom/decrease',
      payload: {
        signalId: signal.id,
      },
    });
  };

  const containerInlineStyle = {
    top: `${signal.yPosition - SIGNAL_PIXEL_HEIGHT / 2}px`,
    left: 0,
  };

  const fillingPercent =
    (AVAILABLE_ZOOM_RATIOS.findIndex((zoom) => zoom === signal.zoomRatio) *
      100) /
    (AVAILABLE_ZOOM_RATIOS.length - 1);
  const fillerStyle = {
    width: `${fillingPercent}%`,
  };

  return (
    <div
      className={`
        ${classes.container}
        position-absolute w-100 d-flex align-items-center
      `}
      style={containerInlineStyle}
    >
      <div
        className={`
          ${classes.signal}
          h-100 d-flex align-items-center justify-content-between
        `}
      >
        <Text className={classes.text}>{signal.channelId}</Text>
        <div className={'h-100 d-flex align-items-end'}>
          <Text variant={'caption'} className={classes.text}>
            {`x${signal.zoomRatio}`}
          </Text>
          <div
            className={
              'h-100 d-flex flex-column justify-content-between align-items-end'
            }
          >
            <IconButton
              color={'primary'}
              size={'small'}
              className={'p-0'}
              onClick={handleZoomIncrease}
            >
              <ArrowDropUp />
            </IconButton>
            <IconButton
              color={'primary'}
              className={'p-0'}
              onClick={handleZoomDecrease}
            >
              <ArrowDropDown />
            </IconButton>
          </div>
        </div>
      </div>
      |
      <div
        className={`${classes.filler} position-absolute top-0 left-0 h-100`}
        style={fillerStyle}
      />
    </div>
  );
}
