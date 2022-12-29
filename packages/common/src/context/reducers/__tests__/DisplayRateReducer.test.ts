import {
  DisplayRateDecreaseActionType,
  DisplayRateIncreaseActionType,
} from '@Context/actions/DisplayRateAction';
import {InitialApplicationState} from '@Context/StateContext';
import {LightTheme} from 'src/themes';
import {displayRateReducer} from '../DisplayRateReducer';

const state = InitialApplicationState(LightTheme);

describe('DisplayRateReducer', () => {
  describe('DisplayRateIncreaseActionType', () => {
    it('increases to next value', () => {
      const newState = displayRateReducer(state, {
        type: DisplayRateIncreaseActionType,
        payload: {},
      });

      expect(newState.displayRate).toEqual(100);
    });

    it('does nothing when maximum is reached', () => {
      const newState = displayRateReducer(
        {
          ...state,
          displayRate: 200,
        },
        {
          type: DisplayRateIncreaseActionType,
          payload: {},
        }
      );

      expect(newState.displayRate).toEqual(200);
    });
  });

  describe('DisplayRateDecreaseActionType', () => {
    it('increases to next value', () => {
      const newState = displayRateReducer(state, {
        type: DisplayRateDecreaseActionType,
        payload: {},
      });

      expect(newState.displayRate).toEqual(25);
    });

    it('does nothing when maximum is reached', () => {
      const newState = displayRateReducer(
        {
          ...state,
          displayRate: 6.25,
        },
        {
          type: DisplayRateDecreaseActionType,
          payload: {},
        }
      );

      expect(newState.displayRate).toEqual(6.25);
    });
  });

  describe('UnknownActionType', () => {
    it('does nothing on unknown action', () => {
      const newState = displayRateReducer(state, {
        // @ts-expect-error unknown type
        type: 'test',
        payload: {},
      });
      expect(newState).toEqual(state);
    });
  });
});
