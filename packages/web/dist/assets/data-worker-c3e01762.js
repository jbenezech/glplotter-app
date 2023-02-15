(function () {
  'use strict';
  const i = 'DATA_CHANNEL',
    p = 'socket/port',
    c = 'data/received',
    u = self;
  let o = null;
  const r = [];
  let n = null;
  u.onconnect = (a) => {
    const t = a.ports[0];
    n == null &&
      ((n = t),
      n.addEventListener('message', (s) => {
        switch (s.data.type) {
          case p:
            o = s.data.payload.port;
            break;
          default:
            o == null || o.postMessage(s.data);
        }
      })),
      t.start(),
      r.push(t);
  };
  const f = new BroadcastChannel(i),
    l = [],
    y = (a, t) => {
      if (l.includes(t)) return a;
      const h = a[0].points[0],
        d = [];
      for (let e = 0; e < h.x; e++) d.push({x: e, y: 0});
      const k = a.map((e) => ({...e, points: [...d, ...e.points]}));
      return l.push(t), k;
    };
  f.onmessage = (a) => {
    switch (a.data.type) {
      case c:
        r.forEach((t) => {
          const s = y(a.data.payload.data, t);
          t.postMessage({type: c, payload: {data: s}});
        });
        break;
    }
  };
})();
