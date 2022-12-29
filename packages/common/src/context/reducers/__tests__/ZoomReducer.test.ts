import {
  ZoomDecreaseActionType,
  ZoomIncreaseActionType,
} from '@Context/actions/ZoomAction';
import {InitialApplicationState} from '@Context/StateContext';
import {LightTheme} from 'src/themes';
import {zoomReducer} from '../ZoomReducer';

const stateTemplate = InitialApplicationState(LightTheme);
const state = {
  ...stateTemplate,
  signals: [
    ...stateTemplate.signals,
    ...stateTemplate.signals.map((signal) => ({
      ...signal,
      id: 'sig2',
    })),
  ],
};

describe('ZoomReducer', () => {
  describe('ZoomIncreaseActionType', () => {
    it('increases signal zoom ratio', () => {
      const newState = zoomReducer(state, {
        type: ZoomIncreaseActionType,
        payload: {
          signalId: 'sig2',
        },
      });

      expect(newState.signals).toEqual(
        state.signals.map((signal) => {
          return signal.id === 'sig2' ? {...signal, zoomRatio: 2} : signal;
        })
      );
    });

    it('does nothing when max is reached', () => {
      const newState = zoomReducer(
        {
          ...state,
          signals: [
            ...stateTemplate.signals,
            ...stateTemplate.signals.map((signal) => ({
              ...signal,
              id: 'sig2',
              zoomRatio: 128,
            })),
          ],
        },
        {
          type: ZoomIncreaseActionType,
          payload: {
            signalId: 'sig2',
          },
        }
      );
      expect(newState.signals).toEqual(
        state.signals.map((signal) => {
          return signal.id === 'sig2' ? {...signal, zoomRatio: 128} : signal;
        })
      );
    });
  });

  describe('ZoomDecreaseActionType', () => {
    it('decreases signal zoom ratio', () => {
      const newState = zoomReducer(
        {
          ...state,
          signals: [
            ...stateTemplate.signals,
            ...stateTemplate.signals.map((signal) => ({
              ...signal,
              id: 'sig2',
              zoomRatio: 2,
            })),
          ],
        },
        {
          type: ZoomDecreaseActionType,
          payload: {
            signalId: 'sig2',
          },
        }
      );

      expect(newState.signals).toEqual(
        state.signals.map((signal) => {
          return signal.id === 'sig2' ? {...signal, zoomRatio: 1} : signal;
        })
      );
    });

    it('does nothing when min is reached', () => {
      const newState = zoomReducer(state, {
        type: ZoomDecreaseActionType,
        payload: {
          signalId: 'sig2',
        },
      });
      expect(newState).toEqual(state);
    });
  });

  describe('UnknownActionType', () => {
    it('does nothing on unknown action', () => {
      const newState = zoomReducer(state, {
        // @ts-expect-error unknown type
        type: 'test',
        payload: {
          signalId: 'sig2',
        },
      });
      expect(newState).toEqual(state);
    });
  });
});
