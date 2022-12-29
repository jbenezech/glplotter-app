import {ReducerAction} from '@Context/ApplicationReducer';
import {Signal, Tab} from '@Context/StateContext';

export const TabSaveActionType = 'tab/save';
export interface TabSavePayload {
  previousId: string;
  tab: Tab;
  tabSignals: Signal[];
}
export type TabSaveAction = ReducerAction<
  typeof TabSaveActionType,
  TabSavePayload
>;

export const TabCreateActionType = 'tab/create';
export interface TabCreatePayload {
  fromTab?: Tab;
}
export type TabCreateAction = ReducerAction<
  typeof TabCreateActionType,
  TabCreatePayload
>;

export const TabRemoveActionType = 'tab/remove';
export interface TabRemovePayload {
  id: string;
}
export type TabRemoveAction = ReducerAction<
  typeof TabRemoveActionType,
  TabRemovePayload
>;

export const TabShowActionType = 'tab/show';
export interface TabShowPayload {
  tabId: string;
}
export type TabShowAction = ReducerAction<
  typeof TabShowActionType,
  TabShowPayload
>;

export type TabAction =
  | TabSaveAction
  | TabCreateAction
  | TabShowAction
  | TabRemoveAction;
