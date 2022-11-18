import {ReactElement} from 'react';
import {makeStyles, createStyles} from '@mui/styles';
import {DisplayRate} from '@Components/displayRate/DisplayRate';
import {DrawingMode} from '@Components/drawingMode/DrawingMode';
import {IconButton, Theme, useTheme} from '@mui/material';
import {SettingsInputComponent} from '@mui/icons-material';
import {Info} from './Info';

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
      <IconButton color="secondary" component="label" onClick={onSettings}>
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
