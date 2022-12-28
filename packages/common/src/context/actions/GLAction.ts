import {ReducerAction} from '@Context/ApplicationReducer';
import {GLPlotterInfo} from 'glplotter';

export const GLInfoActionType = 'gl/info';
export interface GLInfoPayload {
  info: GLPlotterInfo;
}
export type GLInfoAction = ReducerAction<
  typeof GLInfoActionType,
  GLInfoPayload
>;

export type GLAction = GLInfoAction;
