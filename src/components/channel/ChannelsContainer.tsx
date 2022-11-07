import {ReactElement} from 'react';
import {makeStyles, createStyles} from '@mui/styles';
import {APP_THEME} from '@Theme';

const useStyles = makeStyles(() =>
  createStyles({
    channels: {
      height: '100%',
      width: '100px',
      borderRight: `1px solid ${APP_THEME.color.default.separator}`,
    },
  })
);

export function ChannelsContainer(): ReactElement {
  const classes = useStyles();

  return <div className={`${classes.channels} bg-dark`}>Channels</div>;
}
