import {Text} from '@Components/typography/Text';
import {ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
import {makeStyles, createStyles} from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    footer: {
      height: '60px',
    },
  })
);

interface FooterProps {
  drawingMode: string;
}

export function Footer({drawingMode}: FooterProps): ReactElement {
  const {t} = useTranslation();
  const classes = useStyles();

  return (
    <div
      className={`${classes.footer} container-fluid gx-5 d-flex justify-content-between align-items-end header`}
    >
      <Text>{t(`Drawing ${drawingMode}`)}</Text>
    </div>
  );
}
