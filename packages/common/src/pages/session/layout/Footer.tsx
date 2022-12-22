import {ReactElement} from 'react';
import {makeStyles, createStyles} from '@mui/styles';
import {IconButton, Theme, useTheme} from '@mui/material';
import {Visibility} from '@mui/icons-material';
import {TabList} from '../tabs/TabList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      height: '60px',
      backgroundColor: theme.palette.background.default,
    },
    controls: {
      width: '100px',
      textAlign: 'center',
    },
    tabs: {
      width: 'calc(100% - 100px)',
    },
  })
);

interface FooterProps {
  onSettings: () => void;
}

export function Footer({onSettings}: FooterProps): ReactElement {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div
      className={`${classes.footer} container-fluid gx-0 d-flex align-items-center`}
    >
      <div className={classes.controls}>
        <IconButton
          color="secondary"
          component="label"
          onClick={(): void => onSettings()}
          data-testid="footer-settings"
        >
          <Visibility />
        </IconButton>
      </div>
      <div className={`${classes.tabs} d-flex flex-grow-1`}>
        <TabList />
      </div>
    </div>
  );
}
