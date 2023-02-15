import {DrawingModeToggleActionType} from '@Context/actions/DrawingModeAction';
import {InitialApplicationState} from '@Context/StateContext';
import {LightTheme} from 'src/themes';
import {drawingModeReducer} from '../DrawingModeReducer';
import {describe, it, expect} from 'vitest';

const state = InitialApplicationState(LightTheme);

describe('DrawingMode', () => {
  describe('DrawingModeToggleActionType', () => {
    it('toggles recording', () => {
      let newState = drawingModeReducer(state, {
        type: DrawingModeToggleActionType,
        payload: {},
      });

      expect(newState.isRecording).toEqual(false);

      newState = drawingModeReducer(newState, {
        type: DrawingModeToggleActionType,
        payload: {},
      });

      expect(newState.isRecording).toEqual(true);
    });
  });

  describe('UnknownActionType', () => {
    it('does nothing on unknown action', () => {
      const newState = drawingModeReducer(state, {
        // @ts-expect-error unknown type
        type: 'test',
        payload: {},
      });
      expect(newState).toEqual(state);
    });
  });
});
