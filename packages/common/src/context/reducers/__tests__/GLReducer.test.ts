import {GLInfoActionType} from '@Context/actions/GLAction';
import {InitialApplicationState} from '@Context/StateContext';
import {LightTheme} from 'src/themes';
import {glReducer} from '../GLReducer';
import {describe, it, expect} from 'vitest';

const state = InitialApplicationState(LightTheme);

describe('GLReducer', () => {
  describe('GLInfoActionType', () => {
    it('updates info', () => {
      const newState = glReducer(state, {
        type: GLInfoActionType,
        payload: {
          info: {
            pointsPerWindow: 10,
            gpuOverflow: true,
          },
        },
      });

      expect(newState.glInfo).toEqual({
        pointsPerWindow: 10,
        gpuOverflow: true,
      });
    });
  });

  describe('UnknownActionType', () => {
    it('does nothing on unknown action', () => {
      const newState = glReducer(state, {
        // @ts-expect-error unknown type
        type: 'test',
        payload: {
          info: {
            pointsPerWindow: 10,
            gpuOverflow: true,
          },
        },
      });
      expect(newState).toEqual(state);
    });
  });
});
