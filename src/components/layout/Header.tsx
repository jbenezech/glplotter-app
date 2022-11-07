import {Text} from '@Components/typography/Text';
import {ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
import {makeStyles, createStyles} from '@mui/styles';
import {DisplayRate} from '@Components/displayRate/DisplayRate';

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      height: '60px',
    },
  })
);

interface HeaderProps {
  drawingMode: string;
}

export function Header({drawingMode}: HeaderProps): ReactElement {
  const {t} = useTranslation();
  const classes = useStyles();

  return (
    <div
      className={`${classes.header} container-fluid gx-5 d-flex justify-content-between align-items-end header`}
    >
      <DisplayRate />
      <Text>{t(`Drawing ${drawingMode}`)}</Text>
    </div>
  );
}
