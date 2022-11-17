import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {ApplicationStateContext} from '@Context/StateContext';
import {ReactElement, useContext} from 'react';
import {IconButton} from '@mui/material';
import {AddCircle, ContentCopy, RemoveCircle} from '@mui/icons-material';
import {ApplicationDispatchContext} from '@Context/DispatchContext';

export function TabList(): ReactElement {
  const {tabs} = useContext(ApplicationStateContext);
  const {dispatch} = useContext(ApplicationDispatchContext);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: string
  ): void => {
    const newTab = tabs.find((tab) => tab.id === newValue);
    if (newTab === undefined) {
      return;
    }
    dispatch({
      type: 'tab/show',
      payload: {
        tabId: newTab.id,
      },
    });
  };

  const handleAdd = (): void => {
    dispatch({
      type: 'tab/create',
      payload: {},
    });
  };

  const handleCopy = (): void => {
    const currentTab = tabs.find((tab) => !!tab.visible);
    if (!currentTab) {
      return;
    }
    dispatch({
      type: 'tab/create',
      payload: {
        fromTab: currentTab,
      },
    });
  };

  const handleRemove = (): void => {
    const currentTab = tabs.find((tab) => !!tab.visible);
    if (!currentTab) {
      return;
    }
    dispatch({
      type: 'tab/remove',
      payload: {
        id: currentTab.id,
      },
    });
  };

  return (
    <div className={'d-flex flex-wrap w-100'}>
      <Tabs
        value={tabs.find((tab) => !!tab.visible)?.id}
        onChange={handleChange}
        variant={'scrollable'}
        className={'w-75'}
      >
        {tabs
          .sort((tab1, tab2) => tab1.position - tab2.position)
          .map((tab) => (
            <Tab key={tab.id} label={tab.id} value={tab.id} />
          ))}
      </Tabs>
      <IconButton color="primary" component="label" onClick={handleAdd}>
        <AddCircle />
      </IconButton>
      <IconButton color="primary" component="label" onClick={handleRemove}>
        <RemoveCircle />
      </IconButton>
      <IconButton color="primary" component="label" onClick={handleCopy}>
        <ContentCopy />
      </IconButton>
    </div>
  );
}
