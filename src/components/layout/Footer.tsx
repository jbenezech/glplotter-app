import {ReactElement, useContext, useState} from 'react';
import {makeStyles, createStyles} from '@mui/styles';
import {TabList} from '@Components/Tab/TabList';
import {IconButton, Theme, useTheme} from '@mui/material';
import {Visibility} from '@mui/icons-material';
import {ApplicationStateContext} from '@Context/StateContext';
import {FullScreenDialog} from '@Components/Dialog/FullScreenDialog';
import {TabSetting} from '@Components/Tab/TabSetting';

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

export function Footer(): ReactElement {
  const {tabs} = useContext(ApplicationStateContext);
  const theme = useTheme();
  const classes = useStyles(theme);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const currentTab = tabs.find((tab) => !!tab.visible);

  return (
    <>
      {currentTab && isSettingsOpen && (
        <FullScreenDialog onClose={(): void => setIsSettingsOpen(false)}>
          <TabSetting
            currentTab={currentTab}
            onComplete={(): void => setIsSettingsOpen(false)}
          />
        </FullScreenDialog>
      )}
      <div
        className={`${classes.footer} container-fluid gx-0 d-flex align-items-center`}
      >
        <div className={classes.controls}>
          <IconButton
            color="secondary"
            component="label"
            onClick={(): void => setIsSettingsOpen(true)}
          >
            <Visibility />
          </IconButton>
        </div>
        <div className={`${classes.tabs} d-flex flex-grow-1`}>
          <TabList />
        </div>
      </div>
    </>
  );
}
