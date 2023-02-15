(function () {
  'use strict';
  const t = 'DATA_CHANNEL',
    a = 'data/received',
    s = new Worker(
      new URL(
        '' +
          new URL(
            'socket-worker-ed33209c.js',
            (document.currentScript && document.currentScript.src) ||
              document.baseURI
          ).href,
        self.location
      ),
      {type: 'module'}
    ),
    c = new BroadcastChannel(t);
  (self.onmessage = (e) => {
    s.postMessage(e.data);
  }),
    (c.onmessage = (e) => {
      switch (e.data.type) {
        case a:
          self.postMessage({type: a, payload: {data: e.data.payload.data}});
          break;
      }
    });
})();
