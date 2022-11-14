import {
  TabAction,
  TabCreateActionType,
  TabSaveActionType,
  TabShowActionType,
} from '@Context/actions/TabAction';
import {ApplicationStateType} from '@Context/StateContext';

export const tabReducer = (
  state: ApplicationStateType,
  action: TabAction
): ApplicationStateType => {
  switch (action.type) {
    case TabSaveActionType: {
      return {
        ...state,
        tabs: action.payload.tabs,
        signals: action.payload.signals,
      };
    }
    case TabCreateActionType: {
      let baseTab = action.payload.fromTab;

      if (baseTab === undefined && state.tabs.length > 0) {
        baseTab = state.tabs[0];
      }
      if (baseTab === undefined) {
        return state;
      }

      const definedBaseTab = baseTab;
      const newTabId = action.payload.fromTab
        ? `${action.payload.fromTab.id} (copy)`
        : 'new';

      const newSignals = state.signals
        .filter((signal) => signal.containerId === definedBaseTab.id)
        .map((signal) => ({
          ...signal,
          containerId: newTabId,
          id: `${newTabId}-${signal.channelId}`,
          visible: action.payload.fromTab ? signal.visible : false,
        }));

      const position =
        state.tabs.reduce((acc, tab) => Math.max(acc, tab.position), 0) + 1;

      return {
        ...state,
        tabs: [
          ...state.tabs,
          {
            id: newTabId,
            position: position,
            visible: false,
          },
        ],
        signals: [...state.signals, ...newSignals],
      };
    }
    case TabShowActionType: {
      return {
        ...state,
        tabs: [
          ...state.tabs
            .filter((tab) => tab.id !== action.payload.tabId)
            .map((tab) => ({...tab, visible: false})),
          ...state.tabs
            .filter((tab) => tab.id === action.payload.tabId)
            .map((tab) => ({...tab, visible: true})),
        ],
      };
    }
    default:
      return state;
  }
};
