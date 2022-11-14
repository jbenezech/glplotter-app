import {styled} from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {ApplicationStateContext} from '@Context/StateContext';
import {ReactElement, useContext, useState} from 'react';
import {APP_THEME} from '@Theme';
import {IconButton} from '@mui/material';
import {AddCircle} from '@mui/icons-material';
import {ApplicationDispatchContext} from '@Context/DispatchContext';

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{children: <span className="MuiTabs-indicatorSpan" />}}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: APP_THEME.color.custom.primary,
  },
});

export function TabList(): ReactElement {
  const {tabs} = useContext(ApplicationStateContext);
  const [value, setValue] = useState(0);
  const {dispatch} = useContext(ApplicationDispatchContext);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    setValue(newValue);
    dispatch({
      type: 'tab/show',
      payload: {
        tabId: tabs[newValue].id,
      },
    });
  };

  const handleAdd = (): void => {
    dispatch({
      type: 'tab/create',
      payload: {},
    });
  };

  return (
    <Box sx={{width: '100%'}}>
      <Box>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          {tabs
            .sort((tab1, tab2) => tab1.position - tab2.position)
            .map((tab) => (
              <Tab key={tab.id} label={tab.id} />
            ))}
          <IconButton color="primary" component="label" onClick={handleAdd}>
            <AddCircle />
          </IconButton>
        </StyledTabs>
      </Box>
    </Box>
  );
}
