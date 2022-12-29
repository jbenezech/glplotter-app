import 'jest-canvas-mock';
Object.defineProperty(window, 'crypto', {
  value: {
    randomUUID: () => 'abc-abc-abc-abc-abc',
  },
  configurable: true,
  writable: true,
});

export {};
