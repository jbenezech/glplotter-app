import {ChannelsSaveActionType} from '@Context/actions/ChannelAction';
import {Channel, InitialApplicationState} from '@Context/StateContext';
import {LightTheme} from 'src/themes';
import {channelReducer} from '../ChannelReducer';

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
    })),
  ],
  signalsContainerRect: {
    x: 0,
    y: 0,
    width: 1000,
    height: 400,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    toJSON: jest.fn(),
  },
};

describe('ChannelReducer', () => {
  describe('ChannelsSaveActionType', () => {
    const newChannels: Channel[] = [
      ...stateTemplate.channels,
      {
        id: 'test',
        dataSource: 'test',
        color: '#000',
      },
    ];

    it('replaces state channels', () => {
      const newState = channelReducer(state, {
        type: ChannelsSaveActionType,
        payload: {
          channels: newChannels,
        },
      });

      expect(newState.channels).toEqual(newChannels);
    });

    it('removes signals of removed channels', () => {
      const newChannels: Channel[] = [];
      const newState = channelReducer(state, {
        type: ChannelsSaveActionType,
        payload: {
          channels: newChannels,
        },
      });

      expect(newState.signals).toEqual([]);
    });

    it('assigns signals to new channel', () => {
      const newState = channelReducer(state, {
        type: ChannelsSaveActionType,
        payload: {
          channels: newChannels,
        },
      });

      expect(
        newState.signals.filter((signal) => signal.channelId === 'test').length
      ).toEqual(1);
    });
  });

  describe('UnknownActionType', () => {
    it('does nothing on unknown action', () => {
      const newState = channelReducer(state, {
        // @ts-expect-error unknown type
        type: 'test',
        payload: {
          channels: [],
        },
      });
      expect(newState).toEqual(state);
    });
  });
});
