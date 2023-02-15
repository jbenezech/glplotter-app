import '@testing-library/jest-dom';

Object.defineProperty(window, 'crypto', {
  value: {
    randomUUID: () => 'abc-abc-abc-abc-abc',
  },
  configurable: true,
  writable: true,
});

export {};
