import {ReducerAction} from '@Context/DispatchContext';
import {Signal, Tab} from '@Context/StateContext';

export const TabSaveActionType = 'tab/save';
export interface TabSavePayload {
  tabs: Tab[];
  signals: Signal[];
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

export const TabShowActionType = 'tab/show';
export interface TabShowPayload {
  tabId: string;
}
export type TabShowAction = ReducerAction<
  typeof TabShowActionType,
  TabShowPayload
>;

export type TabAction = TabSaveAction | TabCreateAction | TabShowAction;
