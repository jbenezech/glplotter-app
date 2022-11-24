import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React, {ReactElement, useState} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {ListItemButton} from '@mui/material';
import {PlayArrow, Settings} from '@mui/icons-material';
import {createStyles, makeStyles} from '@mui/styles';
import {useTranslation} from 'react-i18next';
import {APP_ROUTES} from '@Router/Routes';
import {Link} from 'react-router-dom';
import {generateSessionId} from '@Utils/sessionUtils';
import {Text} from '@Components/typography/Text';

const useStyles = makeStyles(() =>
  createStyles({
    drawerContainer: {
      position: 'absolute',
      top: '10px',
      right: '20px',
    },
  })
);

export function AppMenu(): ReactElement {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const {t} = useTranslation();
  const [sessionId, setSessionId] = useState<string>(generateSessionId());

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setOpen(open);
    };

  return (
    <div className={classes.drawerContainer}>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer
        className={'text-uppercase'}
        anchor={'right'}
        open={open}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{width: 300}}
          className={'py-5'}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem>
              <Link
                className={'w-100'}
                to={APP_ROUTES.ROOT}
                state={{sessionId: sessionId}}
                onClick={(): void => setSessionId(generateSessionId())}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <PlayArrow />
                  </ListItemIcon>
                  <ListItemText primary={<Text>{t('menu.restart')}</Text>} />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem>
              <Link className={'w-100'} to={APP_ROUTES.SETTINGS}>
                <ListItemButton>
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText primary={<Text>{t('menu.settings')}</Text>} />
                </ListItemButton>
              </Link>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
