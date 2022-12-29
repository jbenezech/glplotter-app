import {
  TabAction,
  TabCreateActionType,
  TabRemoveActionType,
  TabSaveActionType,
  TabShowActionType,
} from '@Context/actions/TabAction';
import {ApplicationStateType, Tab} from '@Context/StateContext';
import {
  calculateNextSignalYPosition,
  createSignalForTabAndChannel,
} from '@Utils/signalUtils';

const MAX_RECURSION = 100;

const uniqueId = (
  tabs: Tab[],
  proposed: string,
  iteration = 1
): string | null => {
  if (iteration > MAX_RECURSION) {
    return null;
  }
  const next = `${proposed}-${iteration}`;
  const {proposedExists, nextExists} = tabs.reduce(
    (acc, tab) => {
      return {
        proposedExists: acc.proposedExists || tab.id === proposed,
        nextExists: acc.nextExists || tab.id === next,
      };
    },
    {proposedExists: false, nextExists: false}
  );

  return !proposedExists
    ? proposed
    : !nextExists
    ? next
    : uniqueId(tabs, proposed, ++iteration);
};

export const tabReducer = (
  state: ApplicationStateType,
  action: TabAction
): ApplicationStateType => {
  switch (action.type) {
    case TabSaveActionType: {
      return {
        ...state,
        tabs: [
          ...state.tabs.filter((tab) => tab.id !== action.payload.previousId),
          action.payload.tab,
        ],
        signals: [
          ...state.signals.filter(
            (signal) => signal.containerId !== action.payload.previousId
          ),
          ...action.payload.tabSignals,
        ],
      };
    }
    case TabCreateActionType: {
      let baseTab = action.payload.fromTab;

      if (baseTab === undefined && state.tabs.length > 0) {
        baseTab = state.tabs[0];
      }
      if (baseTab === undefined) {
        baseTab = {} as Tab;
      }

      const definedBaseTab = baseTab;
      const newTabId = uniqueId(
        state.tabs,
        action.payload.fromTab ? `${action.payload.fromTab.id} (copy)` : 'tab'
      );

      if (newTabId === null) {
        return state;
      }

      const position =
        state.tabs.reduce((acc, tab) => Math.max(acc, tab.position), 0) + 1;

      const newTab = {
        id: newTabId,
        position: position,
        visible: state.tabs.length === 0,
      };

      const newSignals = state.channels.map((channel) => {
        const channelSignalInBase = state.signals.find(
          (signal) =>
            signal.containerId === definedBaseTab.id &&
            signal.channelId === channel.id
        );

        const signal = createSignalForTabAndChannel(newTab, channel);

        return {
          ...signal,
          visible: action.payload.fromTab
            ? channelSignalInBase?.visible || false
            : false,
          yPosition: action.payload.fromTab
            ? channelSignalInBase?.yPosition || 0
            : 0,
          color: action.payload.fromTab
            ? channelSignalInBase?.color || null
            : null,
        };
      });

      //place signals if not copied
      if (action.payload.fromTab === undefined) {
        newSignals.forEach((signal) => {
          signal.yPosition = calculateNextSignalYPosition(
            state.signalsContainerRect,
            newSignals.filter((otherSignal) => otherSignal.id !== signal.id)
          );
        });
      }

      return {
        ...state,
        tabs: [...state.tabs, newTab],
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
    case TabRemoveActionType: {
      const index = state.tabs.findIndex((tab) => tab.id === action.payload.id);
      const nextTab =
        state.tabs.length === 1
          ? undefined
          : index === 0
          ? state.tabs[1]
          : state.tabs[Math.max(0, index - 1)];

      return {
        ...state,
        tabs: state.tabs
          .filter((tab) => tab.id !== action.payload.id)
          .map((tab) =>
            tab.id === nextTab?.id
              ? {
                  ...tab,
                  visible: true,
                }
              : tab
          ),
        signals: state.signals.filter(
          (signal) => signal.containerId !== action.payload.id
        ),
      };
    }
    default:
      return state;
  }
};
