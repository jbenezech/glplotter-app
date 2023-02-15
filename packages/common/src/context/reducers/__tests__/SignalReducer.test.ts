import {
  SignalMoveActionType,
  SignalResizeActionType,
} from '@Context/actions/SignalAction';
import {InitialApplicationState} from '@Context/StateContext';
import {LightTheme} from 'src/themes';
import {signalReducer} from '../SignalReducer';
import {vi, describe, it, expect} from 'vitest';

const stateTemplate = InitialApplicationState(LightTheme);
const state = {
  ...stateTemplate,
  channels: [
    ...stateTemplate.channels,
    ...stateTemplate.channels.map((channel) => ({
      ...channel,
      id: 'ch2',
    })),
  ],
  signals: [
    ...stateTemplate.signals,
    ...stateTemplate.signals.map((signal) => ({
      ...signal,
      id: 'sig2',
      channelId: 'ch2',
      yPosition: 800,
    })),
  ],
};

describe('SignalReducer', () => {
  describe('SignalMoveActionType', () => {
    it('updates signal position', () => {
      const newState = signalReducer(state, {
        type: SignalMoveActionType,
        payload: {
          signalId: 'sig2',
          yPosition: 200,
        },
      });

      expect(newState.signals).toEqual(
        state.signals.map((signal) => {
          return signal.id === 'sig2' ? {...signal, yPosition: 200} : signal;
        })
      );
    });

    it('does nothing on unknown signal', () => {
      const newState = signalReducer(state, {
        type: SignalMoveActionType,
        payload: {
          signalId: 'xxx',
          yPosition: 200,
        },
      });
      expect(newState).toEqual(state);
    });
  });

  describe('SignalResizeActionType', () => {
    const containerRect = {
      x: 0,
      y: 0,
      width: 1000,
      height: 400,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      toJSON: vi.fn(),
    };

    it('updates signal position', () => {
      const newState = signalReducer(state, {
        type: SignalResizeActionType,
        payload: {
          containerRect: containerRect,
        },
      });

      expect(newState.signals).toEqual(
        state.signals.map((signal) => {
          return signal.id === 'sig2' ? {...signal, yPosition: 330} : signal;
        })
      );
    });
  });

  describe('UnknownActionType', () => {
    it('does nothing on unknown action', () => {
      const newState = signalReducer(state, {
        // @ts-expect-error unknown type
        type: 'test',
        payload: {
          signalId: 'sig2',
          yPosition: 200,
        },
      });
      expect(newState).toEqual(state);
    });
  });
});
