import {Text} from '@Components/typography/Text';
import {Tab} from '@mui/material';
import {Box, Tabs} from '@mui/material';
import {ReactElement, SyntheticEvent, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Base} from '../Base';
import {DataSource} from './dataSource/DataSource';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps): ReactElement {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box className={'p-3'}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number): {
  key: string;
} {
  return {
    key: `tab-${index}`,
  };
}

export function Settings(): ReactElement {
  const [value, setValue] = useState(0);
  const {t} = useTranslation();
  const handleChange = (event: SyntheticEvent, newValue: number): void => {
    setValue(newValue);
  };

  return (
    <Base>
      <Box sx={{width: '75%', margin: 'auto'}}>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label={<Text>{t('settings.tabs.dataSource')}</Text>}
              {...a11yProps(0)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <DataSource />
        </TabPanel>
      </Box>
    </Base>
  );
}
