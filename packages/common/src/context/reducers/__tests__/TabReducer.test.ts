import {
  TabCreateActionType,
  TabRemoveActionType,
  TabSaveActionType,
  TabShowActionType,
} from '@Context/actions/TabAction';
import {InitialApplicationState, Signal, Tab} from '@Context/StateContext';
import {LightTheme} from 'src/themes';
import {tabReducer} from '../TabReducer';
import {describe, it, expect} from 'vitest';

const stateTemplate = InitialApplicationState(LightTheme);
const state = {
  ...stateTemplate,
  tabs: [
    ...stateTemplate.tabs,
    ...stateTemplate.tabs.map((tab) => ({
      ...tab,
      id: 'tab2',
      position: 2,
      visible: false,
    })),
  ],
  signals: [
    ...stateTemplate.signals,
    ...stateTemplate.signals.map((signal) => ({
      ...signal,
      id: 'sig2',
      channelId: 'ch2',
      containerId: 'tab2',
    })),
  ],
};

describe('TabReducer', () => {
  describe('TabSaveActionType', () => {
    const saveTab: Tab = {
      ...state.tabs[1],
      id: 'newtab2',
    };

    const saveSignals: Signal[] = stateTemplate.signals.map((signal) => ({
      ...signal,
      id: 'sig2',
      channelId: 'ch2',
      containerId: 'newtab2',
      visible: true,
    }));

    it('replaces tabs and signals', () => {
      const newState = tabReducer(state, {
        type: TabSaveActionType,
        payload: {
          previousId: 'tab2',
          tab: saveTab,
          tabSignals: saveSignals,
        },
      });

      expect(newState.tabs).toEqual(
        state.tabs.map((tab) => {
          return tab.id === 'tab2' ? {...tab, id: 'newtab2'} : tab;
        })
      );

      expect(newState.signals).toEqual(
        state.signals.map((signal) => {
          return signal.id === 'sig2'
            ? {...signal, containerId: 'newtab2'}
            : signal;
        })
      );
    });
  });

  describe('TabCreateActionType', () => {
    it('creates a new tab', () => {
      const newState = tabReducer(state, {
        type: TabCreateActionType,
        payload: {},
      });

      expect(newState.tabs.length).toEqual(state.tabs.length + 1);
      expect(newState.tabs[0].id).not.toEqual(newState.tabs[2].id);
      expect(newState.tabs[0].position).not.toEqual(
        newState.tabs[2].position - 1
      );

      const newTabSignals = newState.signals.filter(
        (signal) => signal.containerId == newState.tabs[2].id
      );

      expect(newTabSignals.map((signal) => signal.channelId)).toEqual(
        state.channels.map((channel) => channel.id)
      );
    });

    it('duplicates an existing tab', () => {
      const newState = tabReducer(state, {
        type: TabCreateActionType,
        payload: {
          fromTab: state.tabs[0],
        },
      });

      expect(newState.tabs.length).toEqual(state.tabs.length + 1);
      expect(newState.tabs[0].id).not.toEqual(newState.tabs[2].id);
      expect(newState.tabs[0].position).not.toEqual(
        newState.tabs[2].position - 1
      );

      const originTabSignals = newState.signals.filter(
        (signal) => signal.containerId == newState.tabs[0].id
      );
      const newTabSignals = newState.signals.filter(
        (signal) => signal.containerId == newState.tabs[2].id
      );

      expect(
        newTabSignals.map((signal) => ({...signal, id: '', containerId: ''}))
      ).toEqual(
        originTabSignals.map((signal) => ({...signal, id: '', containerId: ''}))
      );
    });

    it('creates the first tab', () => {
      const newState = tabReducer(
        {...state, tabs: []},
        {
          type: TabCreateActionType,
          payload: {},
        }
      );

      expect(newState.tabs.length).toEqual(1);
      expect(newState.tabs[0].position).toEqual(1);
    });
  });

  describe('TabShowActionType', () => {
    it('switches tab visibility', () => {
      const newState = tabReducer(state, {
        type: TabShowActionType,
        payload: {
          tabId: state.tabs[1].id,
        },
      });

      expect(newState.tabs[1].visible).toEqual(true);
      expect(newState.tabs[0].visible).toEqual(false);
    });
  });

  describe('TabRemoveActionType', () => {
    it('removes a tab', () => {
      const newState = tabReducer(state, {
        type: TabRemoveActionType,
        payload: {
          id: state.tabs[0].id,
        },
      });

      expect(newState.tabs.length).toEqual(1);
      expect(newState.signals.length).toEqual(1);
      expect(newState.tabs[0].id).toEqual('tab2');
      expect(newState.tabs[0].visible).toEqual(true);
      expect(newState.signals[0].id).toEqual('sig2');
    });

    it('removes the last tab', () => {
      const newState = tabReducer(state, {
        type: TabRemoveActionType,
        payload: {
          id: state.tabs[1].id,
        },
      });
      expect(newState.tabs.length).toEqual(1);
      expect(newState.signals.length).toEqual(1);
      expect(newState.tabs[0].id).toEqual('c1');
      expect(newState.tabs[0].visible).toEqual(true);
      expect(newState.signals[0].id).toEqual('c1-ch1');
    });

    it('removes the last remaining tab', () => {
      let newState = tabReducer(state, {
        type: TabRemoveActionType,
        payload: {
          id: state.tabs[0].id,
        },
      });

      newState = tabReducer(newState, {
        type: TabRemoveActionType,
        payload: {
          id: newState.tabs[0].id,
        },
      });

      expect(newState.tabs.length).toEqual(0);
      expect(newState.signals.length).toEqual(0);
    });
  });

  describe('UnknownActionType', () => {
    const saveTab: Tab = {
      ...stateTemplate.tabs[0],
      id: 'newtab2',
    };

    it('does nothing on unknown action', () => {
      const newState = tabReducer(state, {
        // @ts-expect-error unknown type
        type: 'test',
        payload: {
          previousId: 'tab2',
          tab: saveTab,
          tabSignals: stateTemplate.signals,
        },
      });
      expect(newState).toEqual(state);
    });
  });
});
