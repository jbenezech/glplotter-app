import {Channel, Signal, Tab} from '@Context/StateContext';

export const SIGNAL_PIXEL_HEIGHT = 70;

export const createSignalForTabAndChannel = (
  tab: Tab,
  channel: Channel
): Signal => {
  return {
    id: `${tab.id}-${channel.id}`,
    containerId: tab.id,
    channelId: channel.id,
    color: null,
    visible: tab.visible,
    amplitude: 8,
    pitch: 1,
    chartHeight: SIGNAL_PIXEL_HEIGHT,
    zoomRatio: 1,
    yPosition: SIGNAL_PIXEL_HEIGHT / 2,
  };
};

export const calculateNextSignalYPosition = (
  containerRect: DOMRect | null,
  existingSignals: Signal[]
): number => {
  if (containerRect === null) {
    return 0;
  }
  console.log(existingSignals);
  const nbrSlots = Math.round(containerRect.height / SIGNAL_PIXEL_HEIGHT);
  const slots = Array(nbrSlots)
    .fill(null)
    .map((_, index) => index * SIGNAL_PIXEL_HEIGHT + SIGNAL_PIXEL_HEIGHT / 2);

  const availableSlot = slots.find((slot) => {
    const isAvailable =
      existingSignals.find((signal) => {
        const signalTop = signal.yPosition - SIGNAL_PIXEL_HEIGHT / 2;
        const signalBottom = signal.yPosition + SIGNAL_PIXEL_HEIGHT / 2;

        const slotTop = slot;
        const slotBottom = slot + SIGNAL_PIXEL_HEIGHT;

        return !(slotTop > signalBottom || slotBottom < signalTop);
      }) === undefined;
    return isAvailable;
  });

  return availableSlot || 0;
};

export const fitSignalsInContainer = (
  containerRect: DOMRect,
  signals: Signal[]
): Signal[] => {
  const overflowingSignals = signals.filter(
    (signal) => signal.yPosition > containerRect.height
  );

  const otherSignals = signals.filter(
    (signal) => !overflowingSignals.includes(signal)
  );

  return [
    ...otherSignals,
    ...overflowingSignals.map((signal) => ({
      ...signal,
      yPosition: containerRect.height - SIGNAL_PIXEL_HEIGHT,
    })),
  ];
};

export const findSignalAtPosition = (
  tabs: Tab[],
  signals: Signal[],
  positionY: number
): Signal | undefined => {
  const activeTab = tabs.find((tab) => !!tab.visible);
  if (activeTab === undefined) {
    return;
  }
  return signals.find(
    (signal) =>
      !!signal.visible &&
      signal.containerId === activeTab.id &&
      signal.yPosition - SIGNAL_PIXEL_HEIGHT / 2 < positionY &&
      signal.yPosition + SIGNAL_PIXEL_HEIGHT / 2 > positionY
  );
};
