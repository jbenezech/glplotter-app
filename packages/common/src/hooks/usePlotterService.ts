import {PlotterService, PlotterServiceContext} from '@Services/PlotterService';
import {useContext} from 'react';

export const usePlotterService = (): PlotterService => {
  return useContext<PlotterService>(PlotterServiceContext);
};
