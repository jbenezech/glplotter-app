import {ReactElement} from 'react';
import {makeStyles, createStyles} from '@mui/styles';
import {IconButton, Theme, useTheme} from '@mui/material';
import {SettingsInputComponent} from '@mui/icons-material';
import {Info} from './Info';
import {DisplayRate} from '../displayRate/DisplayRate';
import {DrawingMode} from '../drawingMode/DrawingMode';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      height: '60px',
      backgroundColor: theme.palette.background.default,
    },
    controls: {
      marginLeft: '100px',
    },
  })
);

interface HeaderProps {
  onSettings: () => void;
}

export function Header({onSettings}: HeaderProps): ReactElement {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={`${classes.header} container-fluid gx-5 d-flex`}>
      <IconButton
        color="secondary"
        component="label"
        onClick={onSettings}
        data-testid="header-settings"
      >
        <SettingsInputComponent fontSize="large" />
      </IconButton>
      <div
        className={`${classes.controls} d-flex flex-grow-1 justify-content-around align-items-center`}
      >
        <DisplayRate />
        <DrawingMode />
        <Info />
      </div>
    </div>
  );
}
