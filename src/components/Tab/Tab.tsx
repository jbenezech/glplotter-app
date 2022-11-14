import {styled} from '@mui/material/styles';
import {default as MuiTab} from '@mui/material/Tab';
import {ReactElement} from 'react';

interface TabProps {
  label: string;
}

const StyledTab = styled((props: TabProps) => (
  <MuiTab disableRipple {...props} />
))(({theme}) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  '&.Mui-selected': {
    color: '#fff',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
}));

export function Tab({label}: TabProps): ReactElement {
  return <StyledTab label={label} />;
}
