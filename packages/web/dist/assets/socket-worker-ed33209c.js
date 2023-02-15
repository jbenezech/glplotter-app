(function () {
  'use strict';
  const n = 'DATA_CHANNEL',
    o = 'session/start',
    c = 'session/stop',
    l = 'data/received',
    r = ['ch1', 'ch2'],
    i = new BroadcastChannel(n);
  let s = 0,
    t = null;
  const A = () => {
    const a = [];
    for (let e = s; e < 50 + s; e++)
      a.push({x: e, y: Math.sin(e / ((50 * 10) / (Math.PI * 2))) * 4});
    return a;
  };
  self.onmessage = (a) => {
    switch (a.data.type) {
      case o:
        t !== null && (clearInterval(t), (s = 0)),
          (t = setInterval(() => {
            const e = [];
            r.forEach((p) => e.push({channelId: p, points: A()})),
              (s += 50),
              i.postMessage({type: l, payload: {data: e}});
          }, 50));
        break;
      case c:
        t !== null && clearInterval(t), (s = 0);
        break;
    }
  };
})();
