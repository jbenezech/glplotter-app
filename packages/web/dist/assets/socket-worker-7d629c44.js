(function () {
  'use strict';
  const o = 'DATA_CHANNEL',
    c = 'session/start',
    r = 'session/stop',
    l = 'data/received',
    i = ['ch1', 'ch2'],
    A = new BroadcastChannel(o);
  let t = 0,
    n = null;
  const p = () => {
      const s = [];
      for (let e = t; e < 50 + t; e++)
        s.push({x: e, y: Math.sin(e / ((50 * 10) / (Math.PI * 2))) * 4});
      return s;
    },
    d = self,
    h = (s) => {
      switch (s.data.type) {
        case c:
          n !== null && (clearInterval(n), (t = 0)),
            (n = setInterval(() => {
              const e = [];
              i.forEach((a) => e.push({channelId: a, points: p()})),
                (t += 50),
                A.postMessage({type: l, payload: {data: e}});
            }, 50));
          break;
        case r:
          n !== null && clearInterval(n), (t = 0);
          break;
      }
    };
  d.onconnect = (s) => {
    const e = s.ports[0];
    e.addEventListener('message', (a) => {
      h(a);
    }),
      e.start();
  };
})();
