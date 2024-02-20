import * as wrtc from '@koush/wrtc'
import XMLHttpRequest from 'xhr2'
import WebSocket from 'ws'
import url from 'url'
import HttpsProxyAgent from 'http-proxy-agent'
import JSON5 from 'json5'
import pako from 'pako'
import { Crypto } from '@peculiar/webcrypto'
import { performance } from 'perf_hooks'

const crypto = new Crypto()

let promiseResolve
let proxyAgent
let debug = false

const HBLoaded = new Promise(function (resolve, reject) {
  promiseResolve = resolve
})

/* eslint-disable */
;('use strict')
;(function (ua) {
  function nb() {
    return q.Zb(this, '')
  }
  function hb(a, b) {
    if (b == null) return null
    b.vd == null && (b.vd = ua.xe++)
    let c
    a.le == null ? (a.le = {}) : (c = a.le[b.vd])
    c == null && ((c = b.bind(a)), (a.le[b.vd] = c))
    return c
  }
  class ob {
    static Ci(a) {
      const b = []
      if (a != null) {
        const d = Object.prototype.hasOwnProperty
        for (const c in a)
          c != '__id__' && c != 'hx__closures__' && d.call(a, c) && b.push(c)
      }
      return b
    }
  }
  class K {
    constructor() {
      this.m = 32
      this.c = 63
      this.i = 1
      this.ka = 0
      this.X = new I(0, 0)
    }

    G(a) {
      const b = this.X
      a.g(b.x)
      a.g(b.y)
      a.g(this.ka)
      a.g(this.i)
      a.w(this.c)
      a.w(this.m)
    }

    pa(a) {
      const b = this.X
      b.x = a.o()
      b.y = a.o()
      this.ka = a.o()
      this.i = a.o()
      this.c = a.H()
      this.m = a.H()
    }
  }
  class ib {
    constructor(a, b) {
      this.x = a
      this.y = b
    }
  }
  class pb {
    static Eh(a) {
      a = a.split(' ')
      const b = a[4]
      if (a[6] != 'typ') throw t.s(null)
      return { ri: a[7], ih: b }
    }
  }
  class E {
    static vh() {
      qb.Fi()
      W.Ug()
        .then(
          function (a) {
            E.Se = a
          },
          function () {}
        )
        .then(function () {
          promiseResolve(E.ii)
          const a = b => b
          a != null && a()
        })
      E.Yh = null
    }

    static ei(a, b, c) {
      E.cd == null &&
        ((E.cd = null),
        (E.Sh = a.render(E.cd, {
          sitekey: b,
          callback: function (d) {
            E.Sd != null && E.Sd(d)
          }
        })))
      E.cd.hidden = !1
      a.reset(E.Sh)
      E.Sd = function (d) {
        setTimeout(function () {
          E.cd.hidden = !0
          c(d)
        }, 1e3)
        E.Sd = null
      }
    }

    static xh(a, b) {
      return 'https://www.haxball.com/play?c=' + a + (b ? '&p=1' : '')
    }

    static ii(a) {
      function b() {
        if (!l) {
          const h = new Wa()
          h.ti = 9
          h.oa = y.Td
          h.ba = y.ba.length - (x ? 0 : 1)
          h.Ah = D.Xc
          h.hb = va.hb
          h.kb = D.kb != null
          h.Sc = va.Sc
          h.Uc = va.Uc
          let n = A.aa(16)
          h.G(n)
          D.Yd(n.be())
        }
      }
      function c(h) {
        jb.then(function () {
          D.nc(h)
        })
      }
      function d(h) {
        return h == null
          ? null
          : {
              x: h.a.x,
              y: h.a.y,
              xspeed: h.u.x,
              yspeed: h.u.y,
              xgravity: h.la.x,
              ygravity: h.la.y,
              radius: h.M,
              bCoeff: h.i,
              invMass: h.L,
              damping: h.ga,
              color: h.T,
              cMask: h.c,
              cGroup: h.m
            }
      }
      function e() {
        return y.D == null
          ? null
          : {
              red: y.D.zb,
              blue: y.D.vb,
              time: y.D.Lb,
              scoreLimit: y.D.ab,
              timeLimit: 60 * y.D.Na
            }
      }
      function f(h) {
        if (h == null) return null
        let n = null
        let v = h.N
        v != null && (n = { x: v.a.x, y: v.a.y })
        return { name: h.oa, team: h.ja.S, id: h.ma, admin: h.Ub, position: n }
      }
      function g(h, n) {
        h = a[h]
        return h == null ? n : q.l(h, String)
      }
      function k(h, n) {
        h = a[h]
        return h == null ? n : h
      }
      if (E.Gf) throw t.s("Can't init twice")
      E.Gf = !0

      proxyAgent = k('proxy', null)
        ? new HttpsProxyAgent(url.parse(k('proxy', null)))
        : null
      debug = k('debug', null) == true

      const l = !k('public', !1)
      let p = g('roomName', 'Headless Room')
      let r = g('playerName', 'Host')
      let x = k('noPlayer', !1)
      let C = q.l(k('maxPlayers', 12), wa)
      let N = g('password', null)
      let ka = g('token', null)
      let rb = k('geo', null)
      let va = E.Se
      if (rb != null && ((va = W.Te(rb)), va.hb.length > 3)) {
        throw t.s('Invalid country code')
      }
      const y = new Na()
      y.Td = p
      x ||
        ((p = new xa()),
        (p.oa = r),
        (p.Ub = !0),
        (p.country = va.hb),
        y.ba.push(p))
      const D = new Oa({
        iceServers: ya.Id,
        Hi: ya.Ke + 'api/host',
        state: y,
        version: 9,
        Ji: ka
      })
      D.Xc = C < 2 ? 2 : C > 30 ? 30 : C
      D.kb = N
      const jb = Promise.resolve()
      b()
      let Xa = null
      let J = {
        sendChat: function (h, n) {
          const v = new la()
          v.Pa = h
          null != n
            ? jb.then(function () {
                D.Ef(v, n)
              })
            : c(v)
        },
        sendAnnouncement: function (h, n, v, F, H) {
          F = {
            bold: 1,
            italic: 2,
            small: 3,
            'small-bold': 4,
            'small-italic': 5
          }[F]
          null == F && (F = 0)
          null == v && (v = -1)
          null == H && (H = 1)
          let Y = X.V(h, v, F, H)
          null != n
            ? jb.then(function () {
                D.Ef(Y, n)
              })
            : c(Y)
        },
        setPlayerAdmin: function (h, n) {
          c(Z.V(h, n))
        },
        setPlayerTeam: function (h, n) {
          c(aa.V(h, n == 1 ? u.fa : n == 2 ? u.ta : u.na))
        },
        setPlayerAvatar: function (h, n) {
          c(ba.V(h, n))
        },
        kickPlayer: function (h, n, v) {
          n == null && (n = '')
          c(R.V(h, n, v))
        },
        clearBan: function (h) {
          D.Ad(h)
        },
        clearBans: function () {
          D.Bd()
        },
        setScoreLimit: function (h) {
          c(T.V(0, h))
        },
        setTimeLimit: function (h) {
          c(T.V(1, h))
        },
        setCustomStadium: function (h) {
          const n = new w()
          try {
            n.nh(h)
          } catch (v) {
            throw t.s(t.Vb(v).Hb())
          }
          c(U.V(n))
        },
        setDefaultStadium: function (h) {
          let n = w.Dd()
          let v = null
          let F = 0
          for (; F < n.length; ) {
            const H = n[F]
            ++F
            if (H.oa == h) {
              v = H
              break
            }
          }
          if (v == null) throw t.s("Stadium doesn't exist")
          c(U.V(v))
        },
        setDiscProperties: function (h, n) {
          c(L.cg(h, !1, n))
        },
        setPlayerDiscProperties: function (h, n) {
          c(L.cg(h, !0, n))
        },
        setTeamColors: function (h, n, v, F) {
          const H = new ma()
          const Y = new ca()
          H.rd = Y
          H.ja = h == 1 ? u.fa : h == 2 ? u.ta : u.na
          Y.Qa = []
          var Ya = F.length
          h = 0
          for (Ya = Ya < 3 ? Ya : 3; h < Ya; ) Y.Qa.push(F[h++] | 0)
          Y.$d = v | 0
          Y.Je = ((256 * n) / 360) | 0
          c(H)
        },
        setKickRateLimit: function (h, n, v) {
          h == null && (h = 2)
          null == n && (n = 0)
          null == v && (v = 0)
          h = da.V(h, n, v)
          c(h)
        },
        startGame: function () {
          c(new na())
        },
        stopGame: function () {
          c(new oa())
        },
        pauseGame: function (h) {
          const n = new pa()
          n.wc = h
          c(n)
        },
        setTeamsLock: function (h) {
          const n = new qa()
          n.newValue = h
          c(n)
        },
        setPassword: function (h) {
          D.kb = h == null ? null : q.l(h, String)
          b()
        },
        setRequireRecaptcha: function (h) {
          D.Xd(q.l(h, Za))
        },
        getPlayerList: function () {
          let h = []
          let n = 0
          let v = y.ba
          for (; n < v.length; ) h.push(f(v[n++]))
          return h
        },
        getPlayer: function (h) {
          h = y.R(h)
          return h == null ? null : f(h)
        },
        getScores: function () {
          return e()
        },
        getBallPosition: function () {
          let h = y.D
          if (h == null) return null
          h = h.ia.A[0].a
          return { x: h.x, y: h.y }
        },
        getPlayerDiscProperties: function (h) {
          if (y.D == null) return null
          h = y.R(h)
          return h == null ? null : d(h.N)
        },
        getDiscProperties: function (h) {
          const n = y.D
          return n == null ? null : d(n.ia.A[h])
        },
        getDiscCount: function () {
          const h = y.D
          return h == null ? 0 : h.ia.A.length
        },
        startRecording: function () {
          Xa = new $a(D, 3)
        },
        stopRecording: function () {
          if (Xa == null) return null
          let h = Xa.stop()
          Xa = null
          return h
        },
        reorderPlayers: function (h, n) {
          c(ea.V(h, n))
        },
        CollisionFlags: {
          ball: 1,
          red: 2,
          blue: 4,
          redKO: 8,
          blueKO: 16,
          wall: 32,
          kick: 64,
          score: 128,
          c0: 268435456,
          c1: 536870912,
          c2: 1073741824,
          c3: -2147483648,
          all: 63
        }
      }
      D.ic = function (h, n) {
        za.mh().then(function (v) {
          E.ei(v, h, n)
        })
      }
      setInterval(function () {
        D.Ba()
      }, 50)
      setInterval(function () {
        D.nc(fa.V(D))
      }, 3e3)
      D.kf = function (h) {
        y.R(h) != null && D.nc(R.V(h, 'Bad actor', !1))
      }
      D.Bh = function (h, n) {
        const v = n.lb()
        if (v.length > 25) throw t.s('name too long')
        const F = n.lb()
        if (F.length > 3) throw t.s('country too long')
        n = n.Ya()
        if (n != null && n.length > 2) throw t.s('avatar too long')
        D.nc(ha.V(h, v, F, n))
        b()
      }
      D.Ch = function (h) {
        y.R(h) != null && D.nc(R.V(h, null, !1))
      }
      D.Zc = function (h) {
        h = E.xh(h, D.kb != null)
        E.Yh = '<p>Room Link: <a href="' + h + '">' + h + '</a></p>'
        {
          const n = J.onRoomLink
          n != null && n(h)
        }
      }
      y.Hh = function (h) {
        let n = D.wb.get(h.ma)
        var v = null
        var F = null
        n != null && ((v = n.Jg), (F = n.jc.gb))
        n = v
        v = J.onPlayerJoin
        v != null && ((h = f(h)), (h.auth = n), (h.conn = F), v(h))
      }
      y.Nf = function () {
        {
          const h = J.onTeamVictory
          h != null && y.D != null && h(e())
        }
      }
      y.uf = function (h, n) {
        const v = J.onPlayerChat
        return v == null ? !0 : v(f(h), n) != 0
      }
      y.wf = function (h) {
        const n = J.onPlayerBallKick
        n != null && n(f(h))
      }
      y.Mf = function (h) {
        const n = J.onTeamGoal
        n != null && y.D != null && n(h.S)
      }
      y.Kf = function (h) {
        const n = J.onGameStart
        n != null && n(f(h))
      }
      y.md = function (h) {
        const n = J.onGameStop
        n != null && n(f(h))
      }
      y.Jh = function (h, n) {
        const v = J.onPlayerTeamChange
        v != null && v(f(n), f(h))
      }
      y.tf = function (h, n) {
        const v = J.onPlayerAdminChange
        v != null && v(f(n), f(h))
      }
      y.Qg = function () {
        const h = J.onGameTick
        h != null && h()
      }
      y.Fh = function (h, n) {
        n = J[n ? 'onGamePause' : 'onGameUnpause']
        n != null && n(f(h))
      }
      y.xf = function () {
        const h = J.onPositionsReset
        h != null && h()
      }
      y.vf = function (h) {
        {
          const n = J.onPlayerActivity
          n != null && n(f(h))
        }
      }
      y.If = function (h, n) {
        const v = J.onStadiumChange
        v != null && v(n.oa, f(h))
      }
      y.Ih = function (h, n, v, F) {
        b()
        let H = J.onPlayerLeave
        H != null && H(f(h))
        n != null &&
          ((H = null),
          F != null && (H = F.oa),
          D.Og(h.ma, n, H, v),
          (H = J.onPlayerKicked),
          H != null && H(f(h), n, v, f(F)))
      }
      y.kh = function (h, n, v, F) {
        const H = J.onKickRateLimitSet
        H != null && H(n, v, F, f(h))
      }
      y.li = function (h, n) {
        const v = J.onTeamsLockChange
        v != null && v(n, f(h))
      }
      return J
    }
  }
  class ra {
    static ui(a, b) {
      try {
        const c = new M(new DataView(a.buffer, a.byteOffset, a.byteLength), !1)
        c.C()
        const d = c.La(c.kc())
        let e = c.La()
        let f = new M(new DataView(d.buffer, d.byteOffset, d.byteLength), !1)
        let g = f.lb()
        let k = f.lb()
        let l = f.La()
        if (l.byteLength != b.byteLength) return Promise.reject(null)
        a = 0
        const p = l.byteLength
        for (; a < p; ) {
          const r = a++
          if (l[r] != b[r]) return Promise.reject(null)
        }
        return ra
          .xi(g, k)
          .then(function (r) {
            return crypto.subtle.verify(ra.fi, r, e, d)
          })
          .then(function (r) {
            if (!r) throw t.s(null)
            return g
          })
      } catch (c) {
        return Promise.reject(t.Vb(c).Hb())
      }
    }

    static xi(a, b) {
      try {
        return crypto.subtle.importKey(
          'jwk',
          { crv: 'P-256', ext: !0, key_ops: ['verify'], kty: 'EC', x: a, y: b },
          ra.tg,
          !0,
          ['verify']
        )
      } catch (c) {
        return Promise.reject(t.Vb(c).Hb())
      }
    }
  }
  class M {
    constructor(a, b) {
      b == null && (b = !1)
      this.j = a
      this.ra = b
      this.a = 0
    }

    La(a) {
      a == null && (a = this.j.byteLength - this.a)
      if (this.a + a > this.j.byteLength) throw t.s('Read too much')
      const b = new Uint8Array(this.j.buffer, this.j.byteOffset + this.a, a)
      this.a += a
      return b
    }

    Qh(a) {
      const b = this.La(a)
      a = new ArrayBuffer(a)
      new Uint8Array(a).set(b)
      return a
    }

    Rd() {
      return this.j.getInt8(this.a++)
    }

    C() {
      return this.j.getUint8(this.a++)
    }

    kc() {
      const a = this.j.getUint16(this.a, this.ra)
      this.a += 2
      return a
    }

    H() {
      const a = this.j.getInt32(this.a, this.ra)
      this.a += 4
      return a
    }

    Ob() {
      const a = this.j.getUint32(this.a, this.ra)
      this.a += 4
      return a
    }

    Rh() {
      const a = this.j.getFloat32(this.a, this.ra)
      this.a += 4
      return a
    }

    o() {
      const a = this.j.getFloat64(this.a, this.ra)
      this.a += 8
      return a
    }

    mb() {
      const a = this.a
      let b = 0
      let c
      let d = 0
      do {
        ;(c = this.j.getUint8(a + b)),
          5 > b && (d |= ((c & 127) << (7 * b)) >>> 0),
          ++b
      } while ((c & 128) != 0)
      this.a += b
      return d | 0
    }

    bd(a) {
      let b = this.a
      let c
      let d = ''
      for (a = b + a; b < a; ) {
        ;(c = M.Kg(this.j, b)),
          (b += c.length),
          (d += String.fromCodePoint(c.char))
      }
      if (b != a) {
        throw t.s(
          'Actual string length differs from the specified: ' +
            (b - a) +
            ' bytes'
        )
      }
      this.a = b
      return d
    }

    Ya() {
      const a = this.mb()
      return a <= 0 ? null : this.bd(a - 1)
    }

    lb() {
      return this.bd(this.mb())
    }

    yf() {
      const a = this.lb()
      return JSON.parse(a)
    }

    static Kg(a, b) {
      let c = a.getUint8(b)
      let d
      let e
      let f
      let g
      let k = b
      if ((c & 128) == 0) ++b
      else if ((c & 224) == 192) {
        ;(d = a.getUint8(b + 1)), (c = ((c & 31) << 6) | (d & 63)), (b += 2)
      } else if ((c & 240) == 224) {
        ;(d = a.getUint8(b + 1)),
          (e = a.getUint8(b + 2)),
          (c = ((c & 15) << 12) | ((d & 63) << 6) | (e & 63)),
          (b += 3)
      } else if ((c & 248) == 240) {
        ;(d = a.getUint8(b + 1)),
          (e = a.getUint8(b + 2)),
          (f = a.getUint8(b + 3)),
          (c = ((c & 7) << 18) | ((d & 63) << 12) | ((e & 63) << 6) | (f & 63)),
          (b += 4)
      } else if ((c & 252) == 248) {
        ;(d = a.getUint8(b + 1)),
          (e = a.getUint8(b + 2)),
          (f = a.getUint8(b + 3)),
          (g = a.getUint8(b + 4)),
          (c =
            ((c & 3) << 24) |
            ((d & 63) << 18) |
            ((e & 63) << 12) |
            ((f & 63) << 6) |
            (g & 63)),
          (b += 5)
      } else if ((c & 254) == 252) {
        ;(d = a.getUint8(b + 1)),
          (e = a.getUint8(b + 2)),
          (f = a.getUint8(b + 3)),
          (g = a.getUint8(b + 4)),
          (a = a.getUint8(b + 5)),
          (c =
            ((c & 1) << 30) |
            ((d & 63) << 24) |
            ((e & 63) << 18) |
            ((f & 63) << 12) |
            ((g & 63) << 6) |
            (a & 63)),
          (b += 6)
      } else {
        throw t.s(
          'Cannot decode UTF8 character at offset ' +
            b +
            ': charCode (' +
            c +
            ') is invalid'
        )
      }
      return { char: c, length: b - k }
    }
  }
  class S {
    static pb(a, b) {
      return a.length <= b ? a : P.substr(a, 0, b)
    }

    static Bi(a) {
      let b = ''
      let c = 0
      let d = a.byteLength
      for (; c < d; ) b += sb.Ei(a[c++])
      return b
    }
  }
  class ab {
    constructor(a) {
      this.hf = new bb(15)
      this.Fd = 0
      this.He = new Map()
      this.Vg = new Pa(100, 16)
      this.dd = !1
      this.ad = 0
      this.jc = a
      a = A.aa(8)
      a.g(Math.random())
      this.dc = a.Bb()
    }

    nb(a, b) {
      b == null && (b = 0)
      this.jc.nb(b, a)
    }
  }
  class W {
    constructor() {
      this.hb = ''
      this.Sc = this.Uc = 0
    }

    static Te(a) {
      const b = new W()
      b.Sc = a.lat
      b.Uc = a.lon
      b.hb = a.code.toLowerCase()
      return b
    }

    static Ug() {
      return V.Tg(ya.Ke + 'api/geo').then(function (a) {
        return W.Te(a)
      })
    }
  }
  class Aa {
    constructor() {
      this.rc = u.na
      this.K = new I(0, 0)
      this.F = new I(0, 0)
    }

    G(a) {
      let b = this.F
      a.g(b.x)
      a.g(b.y)
      b = this.K
      a.g(b.x)
      a.g(b.y)
      a.f(this.rc.S)
    }

    pa(a) {
      let b = this.F
      b.x = a.o()
      b.y = a.o()
      b = this.K
      b.x = a.o()
      b.y = a.o()
      a = a.Rd()
      this.rc = a == 1 ? u.fa : a == 2 ? u.ta : u.na
    }
  }
  class B {
    constructor() {
      this.Lc = 0
      this.m = 32
      this.c = 63
      this.i = 1
      this.a = new I(0, 0)
    }

    G(a) {
      const b = this.a
      a.g(b.x)
      a.g(b.y)
      a.g(this.i)
      a.w(this.c)
      a.w(this.m)
    }

    pa(a) {
      const b = this.a
      b.x = a.o()
      b.y = a.o()
      this.i = a.o()
      this.c = a.H()
      this.m = a.H()
    }
  }
  class Qa {
    constructor() {
      this.Oc = 0
      this.M = 15
      this.m = 0
      this.la = new I(0, 0)
      this.L = this.i = 0.5
      this.ga = 0.96
      this.zc = 0.1
      this.Pc = 0.07
      this.Qc = 0.96
      this.Nc = 5
    }

    G(a) {
      a.g(this.i)
      a.g(this.L)
      a.g(this.ga)
      a.g(this.zc)
      a.g(this.Pc)
      a.g(this.Qc)
      a.g(this.Nc)
      const b = this.la
      a.g(b.x)
      a.g(b.y)
      a.w(this.m)
      a.g(this.M)
      a.g(this.Oc)
    }

    pa(a) {
      this.i = a.o()
      this.L = a.o()
      this.ga = a.o()
      this.zc = a.o()
      this.Pc = a.o()
      this.Qc = a.o()
      this.Nc = a.o()
      const b = this.la
      b.x = a.o()
      b.y = a.o()
      this.m = a.H()
      this.M = a.o()
      this.Oc = a.o()
    }
  }
  class cb {
    constructor(a) {
      this.gb = null
      this.Th = 1e4
      this.Mc = !0
      a.Me()
      this.qa = a.qa
      this.ib = a.ib
      this.Rb = a.Rb
      this.gb = a.gb
      this.Of = performance.now()
      let b = null
      let c = this
      b = function () {
        let e = c.Th - c.ni()
        e <= 0
          ? c.cb()
          : (clearTimeout(c.Pf), (e = setTimeout(b, e + 1e3)), (c.Pf = e))
      }
      b()
      this.qa.oniceconnectionstatechange = function () {
        const e = c.qa.iceConnectionState
        ;(e != 'closed' && e != 'failed') || c.cb()
      }
      a = 0
      const d = this.ib
      for (; a < d.length; ) {
        const e = d[a]
        ++a
        e.onmessage = function (f) {
          c.Mc && ((c.Of = performance.now()), c.pf != null && c.pf(f.data))
        }
        e.onclose = function () {
          c.cb()
        }
      }
    }

    ni() {
      return performance.now() - this.Of
    }

    nb(a, b) {
      if (this.Mc && ((a = this.ib[a]), a.readyState == 'open')) {
        b = b.be()
        try {
          a.send(b)
        } catch (c) {
          ;(b = t.Vb(c).Hb()), ua.console.log(b)
        }
      }
    }

    cb() {
      clearTimeout(this.Pf)
      this.Mc && ((this.Mc = !1), this.qa.close(), this.nf != null && this.nf())
    }
  }
  class Ra {
    static sa(a, b) {
      a != null && a(b)
    }
  }
  class db {
    constructor() {
      this.list = []
    }

    Gi(a) {
      let b = 0
      let c = a.eb
      let d = a.fb
      let e = 0
      let f = this.list
      for (; e < f.length; ) {
        let g = f[e]
        ++e
        const k = g.eb
        if (k > c) break
        if (k == c) {
          g = g.fb
          if (g > d) break
          g == d && ++d
        }
        ++b
      }
      a.fb = d
      this.list.splice(b, 0, a)
    }
  }
  class kb {}
  class tb {
    static oi(a) {
      return new Promise(function (b, c) {
        const d = setTimeout(function () {
          c('Timed out')
        }, 500)
        a.then(
          function (e) {
            clearTimeout(d)
            b(e)
          },
          function (e) {
            clearTimeout(d)
            c(e)
          }
        )
      })
    }
  }
  class Wa {
    constructor() {}
    zg() {
      this.oa = S.pb(this.oa, 40)
      this.hb = S.pb(this.hb, 3)
    }

    G(a) {
      this.zg()
      a.ra = !0
      a.Oa(this.ti)
      a.Vf(this.oa)
      a.Vf(this.hb)
      a.ce(this.Sc)
      a.ce(this.Uc)
      a.f(this.kb ? 1 : 0)
      a.f(this.Ah)
      a.f(this.ba)
      a.ra = !1
    }
  }
  class Pa {
    constructor(a, b) {
      this.Le = a
      this.Qf = b
      this.tb = a
      this.Rc = performance.now()
    }

    Rf() {
      let a
      a == null && (a = 1)
      this.Ba()
      return a <= this.tb ? ((this.tb -= a), !0) : !1
    }

    Ba() {
      const a = performance.now()
      const b = Math.floor((a - this.Rc) / this.Qf)
      this.Rc += b * this.Qf
      this.tb += b
      this.tb >= this.Le && ((this.tb = this.Le), (this.Rc = a))
    }
  }
  class qb {
    static Fi() {
      m.$(X)
      m.$(Ba)
      m.$(sa)
      m.$(Ca)
      m.$(la)
      m.$(ha)
      m.$(R)
      m.$(na)
      m.$(oa)
      m.$(pa)
      m.$(T)
      m.$(U)
      m.$(aa)
      m.$(qa)
      m.$(Z)
      m.$(Da)
      m.$(Ea)
      m.$(fa)
      m.$(Fa)
      m.$(ma)
      m.$(ea)
      m.$(da)
      m.$(ba)
      m.$(L)
    }
  }
  class Q {
    constructor() {
      this.zb = this.vb = this.Lb = this.Xa = 0
      this.Jd = u.fa
      this.Ab = this.$a = 0
      this.ia = new Sa()
      this.Na = 0
      this.ab = 5
      this.ea = null
    }

    hh(a) {
      this.ha = a
      this.ab = a.ab
      this.Na = a.Na
      this.ea = a.ea
      this.ia.v = this.ea.v
      this.ia.Y = this.ea.Y
      this.ia.I = this.ea.I
      this.ia.Ta = this.ea.Ta
      a = 0
      const b = this.ea.A
      for (; a < b.length; ) this.ia.A.push(b[a++].wh())
      this.af()
    }

    $e(a) {
      if (a.ja == u.na) a.N = null
      else {
        a.Jb = 0
        let b = a.N
        b == null && ((b = new Ga()), (a.N = b), this.ia.A.push(b))
        let c = this.ea.Mb
        b.T = 0
        b.M = c.M
        b.L = c.L
        b.ga = c.ga
        b.i = c.i
        b.c = 39
        b.m = a.ja.m | c.m
        let d = a.ja == u.fa ? this.ea.Pb : this.ea.Ib
        d.length == 0
          ? ((b.a.x = a.ja.Qe * this.ea.cc), (b.a.y = 0))
          : ((a = b.a), (d = d[d.length - 1]), (a.x = d.x), (a.y = d.y))
        d = b.u
        d.x = 0
        d.y = 0
        b = b.la
        c = c.la
        b.x = c.x
        b.y = c.y
      }
    }

    Ba(a) {
      if (this.Xa > 0) this.Xa < 120 && this.Xa--
      else {
        let b = this.ha.Qg
        b != null && b()
        b = this.ha.ba
        for (var c = 0; c < b.length; ) {
          var d = b[c]
          ++c
          if (d.N != null) {
            ;(d.Jb & 16) == 0 && (d.Cb = !1)
            var e = this.ea.Mb
            d.uc > 0 && d.uc--
            d.Wb < this.ha.Ld && d.Wb++
            if (d.Cb && d.uc <= 0 && d.Wb >= 0) {
              for (var f = !1, g = 0, k = this.ia.A; g < k.length; ) {
                var l = k[g]
                ++g
                if ((l.m & 64) != 0 && l != d.N) {
                  let p = l.a
                  var r = d.N.a
                  var x = p.x - r.x
                  p = p.y - r.y
                  r = Math.sqrt(x * x + p * p)
                  if (r - l.M - d.N.M < 4) {
                    f = x / r
                    x = p / r
                    p = e.Nc
                    let C = (r = l.u)
                    l = l.L
                    r.x = C.x + f * p * l
                    r.y = C.y + x * p * l
                    C = d.N
                    l = -e.Oc
                    r = p = C.u
                    C = C.L
                    p.x = r.x + f * l * C
                    p.y = r.y + x * l * C
                    f = !0
                  }
                }
              }
              f &&
                (this.ha.wf != null && this.ha.wf(d),
                (d.Cb = !1),
                (d.uc = this.ha.Yc),
                (d.Wb -= this.ha.fc))
            }
            f = d.Jb
            k = g = 0(f & 1) != 0 && --k
            ;(f & 2) != 0 && ++k
            ;(f & 4) != 0 && --g
            ;(f & 8) != 0 && ++g
            g != 0 &&
              k != 0 &&
              ((f = Math.sqrt(g * g + k * k)), (g /= f), (k /= f))
            f = d.N.u
            l = d.Cb ? e.Pc : e.zc
            f.x += g * l
            f.y += k * l
            d.N.ga = d.Cb ? e.Qc : e.ga
          }
        }
        c = 0
        d = this.ia.A
        e = 0
        for (g = d.length; e < g; ) {
          ;(f = e++),
            (k = d[f]),
            0 != (k.m & 128) &&
              ((Q.Re[c] = f),
              (f = Q.jf[c]),
              (k = k.a),
              (f.x = k.x),
              (f.y = k.y),
              ++c)
        }
        this.ia.Ba(a)
        if (this.$a == 0) {
          for (a = 0; a < b.length; ) {
            ;(c = b[a]), ++a, c.N != null && (c.N.c = 39 | this.Jd.lh)
          }
          b = this.ia.A[0].u
          b.x * b.x + b.y * b.y > 0 && (this.$a = 1)
        } else if (this.$a == 1) {
          this.Lb += 0.016666666666666666
          for (a = 0; a < b.length; ) {
            ;(d = b[a]), ++a, d.N != null && (d.N.c = 39)
          }
          d = u.na
          b = this.ia.A
          for (
            a = 0;
            a < c &&
            ((d = a++), (d = this.ea.Bg(b[Q.Re[d]].a, Q.jf[d])), d == u.na);

          );
          d != u.na
            ? ((this.$a = 2),
              (this.Ab = 150),
              (this.Jd = d),
              d == u.fa ? this.vb++ : this.zb++,
              this.ha.Mf != null && this.ha.Mf(d.$c),
              this.ha.zf != null && this.ha.zf(d.S))
            : this.Na > 0 &&
              this.Lb >= 60 * this.Na &&
              this.zb != this.vb &&
              (this.ha.mi != null && this.ha.mi(), this.Jf())
        } else if (this.$a == 2) {
          this.Ab--,
            0 >= this.Ab &&
              ((this.ab > 0 && (this.zb >= this.ab || this.vb >= this.ab)) ||
              (this.Na > 0 && this.Lb >= 60 * this.Na && this.zb != this.vb)
                ? this.Jf()
                : (this.af(), this.ha.xf != null && this.ha.xf()))
        } else if (
          this.$a == 3 &&
          (this.Ab--, this.Ab <= 0 && ((b = this.ha), b.D != null))
        ) {
          b.D = null
          a = 0
          for (c = b.ba; a < c.length; ) {
            ;(d = c[a]), ++a, (d.N = null), (d.Eb = 0)
          }
          b.md != null && b.md(null)
        }
      }
    }

    Jf() {
      this.Ab = 300
      this.$a = 3
      this.ha.Nf != null && this.ha.Nf(this.zb > this.vb ? u.fa : u.ta)
    }

    af() {
      const a = this.ha.ba
      this.$a = 0
      for (
        var b = this.ea.A, c = this.ia.A, d = 0, e = this.ea.ed ? b.length : 1;
        d < e;

      ) {
        var f = d++
        b[f].Ze(c[f])
      }
      b = [0, 0, 0]
      for (c = 0; c < a.length; ) {
        if (((d = a[c]), ++c, this.$e(d), (e = d.ja), e != u.na)) {
          f = d.N.a
          var g = this.ea
          var k = b[e.S]
          var l = e == u.fa ? g.Pb : g.Ib
          0 == l.length
            ? ((l = (k + 1) >> 1),
              0 == (k & 1) && (l = -l),
              (g = g.Ma * e.Qe),
              (k = 55 * l))
            : (k >= l.length && (k = l.length - 1),
              (k = l[k]),
              (g = k.x),
              (k = k.y))
          f.x = g
          f.y = k
          b[e.S]++
          d.Eb = b[e.S]
        }
      }
    }

    G(a) {
      this.ia.G(a)
      a.w(this.Ab)
      a.w(this.$a)
      a.w(this.zb)
      a.w(this.vb)
      a.g(this.Lb)
      a.w(this.Xa)
      a.f(this.Jd.S)
    }
  }
  class ia {}
  class Na {
    constructor() {
      this.ea = null
      this.Yc = 2
      this.fc = 0
      this.Ld = 1
      this.ab = this.Na = 3
      this.nd = !1
      this.D = null
      this.ba = []
      this.Td = ''
      this.ea = w.Dd()[0]
      this.sc = [null, new ca(), new ca()]
      this.sc[1].Qa.push(u.fa.T)
      this.sc[2].Qa.push(u.ta.T)
    }

    hi(a) {
      if (this.D == null) {
        this.D = new Q()
        for (let b = 0, c = this.ba; b < c.length; ) {
          const d = c[b]
          ++b
          d.N = null
          d.Eb = 0
        }
        this.D.hh(this)
        this.Kf != null && this.Kf(a)
      }
    }

    Hc(a, b, c) {
      if (b.ja != c) {
        b.ja = c
        P.remove(this.ba, b)
        this.ba.push(b)
        if (this.D != null) {
          b.N != null && (P.remove(this.D.ia.A, b.N), (b.N = null))
          this.D.$e(b)
          let d = 0
          let e = !1
          for (; !e; ) {
            ++d
            e = !0
            let f = 0
            let g = this.ba
            for (; f < g.length; ) {
              const k = g[f]
              ++f
              if (k != b && k.ja == b.ja && k.Eb == d) {
                e = !1
                break
              }
            }
          }
          b.Eb = d
        }
        lb.sa(this.Jh, a, b, c)
      }
    }

    R(a) {
      let b = 0
      let c = this.ba
      for (; b < c.length; ) {
        const d = c[b]
        ++b
        if (d.ma == a) return d
      }
      return null
    }

    Ba(a) {
      this.D != null && this.D.Ba(a)
    }

    G(a) {
      a.Ca(this.Td)
      a.f(this.nd ? 1 : 0)
      a.w(this.ab)
      a.w(this.Na)
      a.de(this.Ld)
      a.f(this.fc)
      a.f(this.Yc)
      this.ea.G(a)
      a.f(this.D != null ? 1 : 0)
      this.D != null && this.D.G(a)
      a.f(this.ba.length)
      let b = 0
      let c = this.ba
      for (; b < c.length; ) c[b++].P(a)
      this.sc[1].G(a)
      this.sc[2].G(a)
    }

    Ue() {
      let a = 0
      let b = A.aa()
      this.G(b)
      for (b = b.pi(); b.j.byteLength - b.a >= 4; ) a ^= b.H()
      return a
    }

    Sg() {
      const a = A.aa(4)
      a.w(this.Ue())
      return a.be()
    }

    Fg(a) {
      a = new M(new DataView(a)).H()
      Ra.sa(this.Li, this.Ue() != a)
    }

    Hf(a) {
      this.zf = a
    }

    za(a) {
      if (a == 0) return !0
      a = this.R(a)
      return a != null && a.Ub ? !0 : !1
    }

    di(a, b, c, d) {
      this.Yc = b < 0 ? 0 : b > 255 ? 255 : b
      this.fc = c < 0 ? 0 : c > 255 ? 255 : c
      d < 0 ? (d = 0) : d > 100 && (d = 100)
      this.Ld = this.fc * d
      eb.sa(this.kh, a, this.Yc, this.fc, d)
    }
  }
  class u {
    constructor(a, b, c, d, e, f, g, k) {
      this.$c = null
      this.S = a
      this.T = b
      this.Qe = c
      this.lh = d
      this.oa = e
      this.m = k
      this.ki = new ca()
      this.ki.Qa.push(b)
    }
  }
  class mb {
    constructor(a) {
      this.current = 0
      this.Ai = a
    }

    next() {
      return this.Ai[this.current++]
    }
  }
  class ca {
    constructor() {
      this.$d = 16777215
      this.Qa = []
    }

    G(a) {
      a.f(this.Je)
      a.w(this.$d)
      a.f(this.Qa.length)
      let b = 0
      let c = this.Qa
      for (; b < c.length; ) a.w(c[b++])
    }

    pa(a) {
      this.Je = a.C()
      this.$d = a.H()
      const b = a.C()
      if (b > 3) throw t.s('too many')
      this.Qa = []
      let c = 0
      for (; c < b; ) ++c, this.Qa.push(a.H())
    }
  }
  class ya {}
  class w {
    constructor() {
      this.v = []
      this.I = []
      this.Y = []
      this.Sa = []
      this.A = []
      this.Ta = []
      this.Pb = []
      this.Ib = []
      this.Mb = new Qa()
      this.Cd = 255
      this.yd = this.Md = 0
      this.zd = !0
      this.ed = !1
    }

    Vc() {
      const a = new ja()
      a.T = 16777215
      a.c = 63
      a.m = 193
      a.M = 10
      a.ga = 0.99
      a.L = 1
      a.i = 0.5
      return a
    }

    G(a) {
      a.f(this.Cd)
      if (!this.jh()) {
        a.Ca(this.oa)
        a.w(this.Ec)
        a.g(this.Fc)
        a.g(this.Dc)
        a.g(this.bc)
        a.g(this.ac)
        a.g(this.wd)
        a.w(this.Cc)
        a.g(this.cc)
        a.g(this.Gc)
        a.g(this.Ma)
        this.Mb.G(a)
        a.Oa(this.Md)
        a.f(this.yd)
        a.f(this.zd ? 1 : 0)
        a.f(this.ed ? 1 : 0)
        a.f(this.v.length)
        for (var b = 0, c = this.v.length; b < c; ) {
          var d = b++
          const e = this.v[d]
          e.Lc = d
          e.G(a)
        }
        a.f(this.I.length)
        b = 0
        for (c = this.I; b < c.length; ) c[b++].G(a)
        a.f(this.Y.length)
        b = 0
        for (c = this.Y; b < c.length; ) c[b++].G(a)
        a.f(this.Sa.length)
        b = 0
        for (c = this.Sa; b < c.length; ) c[b++].G(a)
        a.f(this.A.length)
        b = 0
        for (c = this.A; b < c.length; ) c[b++].G(a)
        a.f(this.Ta.length)
        b = 0
        for (c = this.Ta; b < c.length; ) c[b++].G(a)
        a.f(this.Pb.length)
        b = 0
        for (c = this.Pb; b < c.length; ) (d = c[b]), ++b, a.g(d.x), a.g(d.y)
        a.f(this.Ib.length)
        b = 0
        for (c = this.Ib; b < c.length; ) (d = c[b]), ++b, a.g(d.x), a.g(d.y)
      }
    }

    si(a) {
      function b() {
        const f = []
        let g = a.C()
        let k = 0
        for (; k < g; ) {
          ++k
          const l = new I(0, 0)
          l.x = a.o()
          l.y = a.o()
          f.push(l)
        }
        return f
      }
      this.oa = a.Ya()
      this.Ec = a.H()
      this.Fc = a.o()
      this.Dc = a.o()
      this.bc = a.o()
      this.ac = a.o()
      this.wd = a.o()
      this.Cc = a.H()
      this.cc = a.o()
      this.Gc = a.o()
      this.Ma = a.o()
      this.Mb.pa(a)
      this.Md = a.kc()
      this.yd = a.C()
      this.zd = a.C() != 0
      this.ed = a.C() != 0
      this.v = []
      for (var c = a.C(), d = 0; d < c; ) {
        var e = new B()
        e.pa(a)
        e.Lc = d++
        this.v.push(e)
      }
      this.I = []
      c = a.C()
      for (d = 0; d < c; ) ++d, (e = new G()), e.pa(a, this.v), this.I.push(e)
      this.Y = []
      c = a.C()
      for (d = 0; d < c; ) ++d, (e = new K()), e.pa(a), this.Y.push(e)
      this.Sa = []
      c = a.C()
      for (d = 0; d < c; ) ++d, (e = new Aa()), e.pa(a), this.Sa.push(e)
      this.A = []
      c = a.C()
      for (d = 0; d < c; ) ++d, (e = new ja()), e.pa(a), this.A.push(e)
      this.Ta = []
      c = a.C()
      for (d = 0; d < c; ) ++d, (e = new Ha()), e.pa(a), this.Ta.push(e)
      this.Pb = b()
      this.Ib = b()
      this.Nb()
      if (!this.Sf()) throw t.s(new Ia('Invalid stadium'))
    }

    Sf() {
      return this.A.length <= 0 || this.ac < 0 || this.bc < 0 || this.Mb.M < 0
        ? !1
        : !0
    }

    Nb() {
      let a = 0
      let b = this.I
      for (; a < b.length; ) b[a++].Nb()
    }

    jh() {
      return this.Cd != 255
    }

    Kb(a, b) {
      a = a[b]
      return a != null ? q.l(a, z) : 0
    }

    uh(a) {
      a = a.canBeStored
      return a != null ? q.l(a, Za) : !0
    }

    nh(a) {
      function b(k) {
        let l = q.l(k[0], z)
        k = q.l(k[1], z)
        k == null && (k = 0)
        l == null && (l = 0)
        return new I(l, k)
      }
      function c(k, l, p, r) {
        r == null && (r = !1)
        let x = d[l]
        if (!r || x != null) {
          if (((r = q.l(x, Array)), r != null))
            for (x = 0; x < r.length; ) {
              let C = r[x]
              ++x
              try {
                w.ug(C, f), k.push(p(C))
              } catch (N) {
                throw t.s(new Ia('Error in "' + l + '" index: ' + k.length))
              }
            }
        }
      }
      const d = JSON5.parse(a)
      this.v = []
      this.I = []
      this.Y = []
      this.Sa = []
      this.A = []
      this.Ta = []
      this.oa = q.l(d.name, String)
      this.cc = q.l(d.width, z)
      this.Gc = q.l(d.height, z)
      this.Md = this.Kb(d, 'maxViewWidth') | 0
      'player' == d.cameraFollow && (this.yd = 1)
      this.Ma = 200
      a = d.spawnDistance
      a != null && (this.Ma = q.l(a, z))
      a = d.bg
      let e
      switch (a.type) {
        case 'grass':
          e = 1
          break
        case 'hockey':
          e = 2
          break
        default:
          e = 0
      }
      this.Ec = e
      this.Fc = this.Kb(a, 'width')
      this.Dc = this.Kb(a, 'height')
      this.bc = this.Kb(a, 'kickOffRadius')
      this.ac = this.Kb(a, 'cornerRadius')
      this.Cc = 7441498
      a.color != null && (this.Cc = w.Tc(a.color))
      this.wd = this.Kb(a, 'goalLine')
      this.zd = this.uh(d)
      this.ed = d.kickOffReset == 'full'
      const f = d.traits
      a = d.ballPhysics
      'disc0' != a &&
        (a != null
          ? ((a = w.df(a, this.Vc())), (a.m |= 192), this.A.push(a))
          : this.A.push(this.Vc()))
      c(this.v, 'vertexes', w.th)
      const g = this
      c(this.I, 'segments', function (k) {
        return w.sh(k, g.v)
      })
      c(this.Sa, 'goals', w.oh)
      c(this.A, 'discs', function (k) {
        return w.df(k, new ja())
      })
      c(this.Y, 'planes', w.qh)
      c(
        this.Ta,
        'joints',
        function (k) {
          return w.ph(k, g.A)
        },
        !0
      )
      c(this.Pb, 'redSpawnPoints', b, !0)
      c(this.Ib, 'blueSpawnPoints', b, !0)
      a = d.playerPhysics
      a != null && (this.Mb = w.rh(a))
      if (
        this.v.length > 255 ||
        this.I.length > 255 ||
        this.Y.length > 255 ||
        this.Sa.length > 255 ||
        this.A.length > 255
      ) {
        throw t.s('Error')
      }
      this.Nb()
      if (!this.Sf()) throw t.s(new Ia('Invalid stadium'))
    }

    Bg(a, b) {
      let c = 0
      let d = this.Sa
      for (; c < d.length; ) {
        const k = d[c]
        ++c
        let e = k.F
        var f = k.K
        var g = b.x - a.x
        const l =
          b.y - a.y - (e.y - a.y) * g + (e.x - a.x) * l > 0 ==
          -(f.y - a.y) * g + (f.x - a.x) * l > 0
            ? (e = !1)
            : ((g = f.x - e.x),
              (f = f.y - e.y),
              (e =
                -(a.y - e.y) * g + (a.x - e.x) * f > 0 ==
                -(b.y - e.y) * g + (b.x - e.x) * f > 0
                  ? !1
                  : !0))
        if (e) return k.rc
      }
      return u.na
    }

    jb(a, b, c, d, e, f, g, k) {
      k == null && (k = 0)
      this.oa = a
      this.A.push(this.Vc())
      this.cc = b
      this.Gc = c
      this.Ec = 1
      this.Cc = 7441498
      this.Fc = d
      this.Dc = e
      this.bc = g
      this.ac = k
      this.Ma = 0.75 * d
      this.Ma > 400 && (this.Ma = 400)
      a = new K()
      let l = a.X
      l.x = 0
      l.y = 1
      a.ka = -c
      a.i = 0
      this.Y.push(a)
      a = new K()
      l = a.X
      l.x = 0
      l.y = -1
      a.ka = -c
      a.i = 0
      this.Y.push(a)
      a = new K()
      l = a.X
      l.x = 1
      l.y = 0
      a.ka = -b
      a.i = 0
      this.Y.push(a)
      a = new K()
      l = a.X
      l.x = -1
      l.y = 0
      a.ka = -b
      a.i = 0
      this.Y.push(a)
      this.Wc(d, 1, f, 13421823, u.ta)
      this.Wc(-d, -1, f, 16764108, u.fa)
      this.gf(g, c)
      b = new K()
      c = b.X
      c.x = 0
      c.y = 1
      b.ka = -e
      b.c = 1
      this.Y.push(b)
      b = new K()
      c = b.X
      c.x = 0
      c.y = -1
      b.ka = -e
      b.c = 1
      this.Y.push(b)
      b = new B()
      c = b.a
      c.x = -d
      c.y = -e
      b.c = 0
      c = new B()
      g = c.a
      g.x = d
      g.y = -e
      c.c = 0
      g = new B()
      a = g.a
      a.x = d
      a.y = -f
      g.c = 0
      a = new B()
      l = a.a
      l.x = d
      l.y = f
      a.c = 0
      l = new B()
      let p = l.a
      p.x = d
      p.y = e
      l.c = 0
      p = new B()
      let r = p.a
      r.x = -d
      r.y = e
      p.c = 0
      r = new B()
      let x = r.a
      x.x = -d
      x.y = f
      r.c = 0
      x = new B()
      let C = x.a
      C.x = -d
      C.y = -f
      x.c = 0
      f = new G()
      f.F = c
      f.K = g
      f.c = 1
      f.va = !1
      C = new G()
      C.F = a
      C.K = l
      C.c = 1
      C.va = !1
      const N = new G()
      N.F = p
      N.K = r
      N.c = 1
      N.va = !1
      const ka = new G()
      ka.F = x
      ka.K = b
      ka.c = 1
      ka.va = !1
      this.v.push(b)
      this.v.push(c)
      this.v.push(g)
      this.v.push(a)
      this.v.push(l)
      this.v.push(p)
      this.v.push(r)
      this.v.push(x)
      this.I.push(f)
      this.I.push(C)
      this.I.push(N)
      this.I.push(ka)
      this.ef(d, e, k)
      this.Nb()
    }

    ff(a, b, c, d, e, f, g, k) {
      this.oa = a
      this.A.push(this.Vc())
      this.cc = b
      this.Gc = c
      this.Ec = 2
      this.Fc = d
      this.Dc = e
      this.bc = 75
      this.ac = k
      this.wd = g
      this.Ma = 0.75 * (d - g)
      this.Ma > 400 && (this.Ma = 400)
      a = new K()
      let l = a.X
      l.x = 0
      l.y = 1
      a.ka = -c
      a.i = 0
      this.Y.push(a)
      a = new K()
      l = a.X
      l.x = 0
      l.y = -1
      a.ka = -c
      a.i = 0
      this.Y.push(a)
      a = new K()
      l = a.X
      l.x = 1
      l.y = 0
      a.ka = -b
      a.i = 0
      this.Y.push(a)
      a = new K()
      l = a.X
      l.x = -1
      l.y = 0
      a.ka = -b
      a.i = 0
      this.Y.push(a)
      this.Wc(d - g, 1, f, 13421823, u.ta, 63)
      this.Wc(-d + g, -1, f, 16764108, u.fa, 63)
      this.gf(75, c)
      b = new K()
      c = b.X
      c.x = 0
      c.y = 1
      b.ka = -e
      b.c = 1
      this.Y.push(b)
      b = new K()
      c = b.X
      c.x = 0
      c.y = -1
      b.ka = -e
      b.c = 1
      this.Y.push(b)
      b = new K()
      c = b.X
      c.x = 1
      c.y = 0
      b.ka = -d
      b.c = 1
      this.Y.push(b)
      b = new K()
      c = b.X
      c.x = -1
      c.y = 0
      b.ka = -d
      b.c = 1
      this.Y.push(b)
      this.ef(d, e, k)
      this.Nb()
    }

    Wc(a, b, c, d, e, f) {
      let g
      g == null && (g = 32)
      f == null && (f = 1)
      let k = new B()
      var l = k.a
      l.x = a + 8 * b
      l.y = -c
      l = new B()
      let p = l.a
      p.x = a + 8 * b
      p.y = c
      const r = new B()
      p = r.a
      p.x = k.a.x + 22 * b
      p.y = k.a.y + 22
      const x = new B()
      p = x.a
      p.x = l.a.x + 22 * b
      p.y = l.a.y - 22
      p = new G()
      p.F = k
      p.K = r
      p.bb(90 * b)
      const C = new G()
      C.F = x
      C.K = r
      const N = new G()
      N.F = x
      N.K = l
      N.bb(90 * b)
      b = this.v.length
      this.v.push(k)
      this.v.push(l)
      this.v.push(r)
      this.v.push(x)
      k = b
      for (b = this.v.length; k < b; ) {
        ;(l = k++), (this.v[l].c = f), (this.v[l].m = g), (this.v[l].i = 0.1)
      }
      b = this.I.length
      this.I.push(p)
      this.I.push(C)
      this.I.push(N)
      k = b
      for (b = this.I.length; k < b; ) {
        ;(l = k++), (this.I[l].c = f), (this.I[l].m = g), (this.I[l].i = 0.1)
      }
      f = new ja()
      g = f.a
      g.x = a
      g.y = -c
      f.L = 0
      f.M = 8
      f.T = d
      this.A.push(f)
      f = new ja()
      g = f.a
      g.x = a
      g.y = c
      f.L = 0
      f.M = 8
      f.T = d
      this.A.push(f)
      d = new Aa()
      f = d.F
      f.x = a
      f.y = -c
      f = d.K
      f.x = a
      f.y = c
      d.rc = e
      this.Sa.push(d)
    }

    gf(a, b) {
      const c = new B()
      let d = c.a
      d.x = 0
      d.y = -b
      c.i = 0.1
      c.m = 24
      c.c = 6
      d = new B()
      let e = d.a
      e.x = 0
      e.y = -a
      d.i = 0.1
      d.m = 24
      d.c = 6
      e = new B()
      let f = e.a
      f.x = 0
      f.y = a
      e.i = 0.1
      e.m = 24
      e.c = 6
      a = new B()
      f = a.a
      f.x = 0
      f.y = b
      a.i = 0.1
      a.m = 24
      a.c = 6
      b = new G()
      b.F = c
      b.K = d
      b.m = 24
      b.c = 6
      b.va = !1
      b.i = 0.1
      f = new G()
      f.F = e
      f.K = a
      f.m = 24
      f.c = 6
      f.va = !1
      f.i = 0.1
      const g = new G()
      g.F = d
      g.K = e
      g.m = 8
      g.c = 6
      g.va = !1
      g.bb(180)
      g.i = 0.1
      const k = new G()
      k.F = e
      k.K = d
      k.m = 16
      k.c = 6
      k.va = !1
      k.bb(180)
      k.i = 0.1
      this.v.push(c)
      this.v.push(d)
      this.v.push(e)
      this.v.push(a)
      this.I.push(b)
      this.I.push(f)
      this.I.push(g)
      this.I.push(k)
    }

    ef(a, b, c) {
      if (!(c <= 0)) {
        const d = new B()
        var e = d.a
        e.x = -a + c
        e.y = -b
        d.c = 0
        e = new B()
        let f = e.a
        f.x = -a
        f.y = -b + c
        e.c = 0
        f = new B()
        let g = f.a
        g.x = -a + c
        g.y = b
        f.c = 0
        g = new B()
        let k = g.a
        k.x = -a
        k.y = b - c
        g.c = 0
        k = new B()
        let l = k.a
        l.x = a - c
        l.y = b
        k.c = 0
        l = new B()
        let p = l.a
        p.x = a
        p.y = b - c
        l.c = 0
        p = new B()
        let r = p.a
        r.x = a - c
        r.y = -b
        p.c = 0
        r = new B()
        let x = r.a
        x.x = a
        x.y = -b + c
        r.c = 0
        a = new G()
        a.F = d
        a.K = e
        a.c = 1
        a.va = !1
        a.i = 1
        a.bb(-90)
        b = new G()
        b.F = f
        b.K = g
        b.c = 1
        b.va = !1
        b.i = 1
        b.bb(90)
        c = new G()
        c.F = k
        c.K = l
        c.c = 1
        c.va = !1
        c.i = 1
        c.bb(-90)
        x = new G()
        x.F = p
        x.K = r
        x.c = 1
        x.va = !1
        x.i = 1
        x.bb(90)
        this.v.push(d)
        this.v.push(e)
        this.v.push(f)
        this.v.push(g)
        this.v.push(k)
        this.v.push(l)
        this.v.push(p)
        this.v.push(r)
        this.I.push(a)
        this.I.push(b)
        this.I.push(c)
        this.I.push(x)
      }
    }

    static pa(a) {
      let b = a.C()
      return b == 255 ? ((b = new w()), b.si(a), b) : w.Dd()[b]
    }

    static Dd() {
      if (w.wa == null) {
        w.wa = []
        let a = new w()
        a.jb('Classic', 420, 200, 370, 170, 64, 75)
        w.wa.push(a)
        a = new w()
        a.jb('Easy', 420, 200, 370, 170, 90, 75)
        w.wa.push(a)
        a = new w()
        a.jb('Small', 420, 200, 320, 130, 55, 70)
        w.wa.push(a)
        a = new w()
        a.jb('Big', 600, 270, 550, 240, 80, 80)
        w.wa.push(a)
        a = new w()
        a.jb('Rounded', 420, 200, 370, 170, 64, 75, 75)
        w.wa.push(a)
        a = new w()
        a.ff('Hockey', 420, 204, 398, 182, 68, 120, 100)
        w.wa.push(a)
        a = new w()
        a.ff('Big Hockey', 600, 270, 550, 240, 90, 160, 150)
        w.wa.push(a)
        a = new w()
        a.jb('Big Easy', 600, 270, 550, 240, 95, 80)
        w.wa.push(a)
        a = new w()
        a.jb('Big Rounded', 600, 270, 550, 240, 80, 75, 100)
        w.wa.push(a)
        a = new w()
        a.jb('Huge', 750, 350, 700, 320, 100, 80)
        w.wa.push(a)
        a = 0
        const b = w.wa.length
        for (; a < b; ) {
          const c = a++
          w.wa[c].Cd = c
        }
      }
      return w.wa
    }

    static ug(a, b) {
      if (a.trait != null && ((b = b[q.l(a.trait, String)]), b != null)) {
        let c = 0
        let d = ob.Ci(b)
        for (; c < d.length; ) {
          const e = d[c]
          ++c
          a[e] == null && (a[e] = b[e])
        }
      }
    }

    static Ua(a) {
      a = q.l(a, Array)
      let b = 0
      let c = 0
      for (; c < a.length; ) {
        switch (a[c++]) {
          case 'all':
            b |= 63
            break
          case 'ball':
            b |= 1
            break
          case 'blue':
            b |= 4
            break
          case 'blueKO':
            b |= 16
            break
          case 'c0':
            b |= 268435456
            break
          case 'c1':
            b |= 536870912
            break
          case 'c2':
            b |= 1073741824
            break
          case 'c3':
            b |= -2147483648
            break
          case 'kick':
            b |= 64
            break
          case 'red':
            b |= 2
            break
          case 'redKO':
            b |= 8
            break
          case 'score':
            b |= 128
            break
          case 'wall':
            b |= 32
        }
      }
      return b
    }

    static Tc(a) {
      if (a == 'transparent') return -1
      if (typeof a === 'string') return Ta.parseInt('0x' + Ta.ve(a))
      if (a instanceof Array) {
        return ((a[0] | 0) << 16) + ((a[1] | 0) << 8) + (a[2] | 0)
      }
      throw t.s('Bad color')
    }

    static th(a) {
      const b = new B()
      b.a.x = q.l(a.x, z)
      b.a.y = q.l(a.y, z)
      let c = a.bCoef
      c != null && (b.i = q.l(c, z))
      c = a.cMask
      c != null && (b.c = w.Ua(c))
      a = a.cGroup
      a != null && (b.m = w.Ua(a))
      return b
    }

    static sh(a, b) {
      const c = new G()
      let d = q.l(a.v1, wa)
      c.F = b[q.l(a.v0, wa)]
      c.K = b[d]
      b = a.bias
      d = a.bCoef
      const e = a.curve
      let f = a.curveF
      let g = a.vis
      let k = a.cMask
      let l = a.cGroup
      a = a.color
      b != null && (c.ub = q.l(b, z))
      d != null && (c.i = q.l(d, z))
      f != null ? (c.Ha = q.l(f, z)) : e != null && c.bb(q.l(e, z))
      g != null && (c.va = q.l(g, Za))
      k != null && (c.c = w.Ua(k))
      l != null && (c.m = w.Ua(l))
      a != null && (c.T = w.Tc(a))
      return c
    }

    static ph(a, b) {
      const c = new Ha()
      let d = q.l(a.d0, wa)
      var e = q.l(a.d1, wa)
      const f = a.color
      let g = a.strength
      a = a.length
      if (d >= b.length || d < 0) throw t.s(null)
      if (e >= b.length || e < 0) throw t.s(null)
      c.Ic = d
      c.Jc = e
      a == null
        ? ((d = b[d]),
          (e = b[e]),
          d == null || e == null
            ? (c.Va = c.Ka = 100)
            : ((b = d.a),
              (d = e.a),
              (e = b.x - d.x),
              (b = b.y - d.y),
              (c.Va = c.Ka = Math.sqrt(e * e + b * b))))
        : a instanceof Array
        ? ((c.Ka = q.l(a[0], z)), (c.Va = q.l(a[1], z)))
        : (c.Va = c.Ka = q.l(a, z))
      c.qc = g == null || g == 'rigid' ? 1 / 0 : q.l(g, z)
      f != null && (c.T = w.Tc(f))
      return c
    }

    static qh(a) {
      const b = new K()
      let c = q.l(a.normal, Array)
      var d = q.l(c[0], z)
      var e = q.l(c[1], z)
      c = b.X
      let f = d
      let g = e
      e == null && (g = 0)
      d == null && (f = 0)
      d = f
      e = Math.sqrt(d * d + g * g)
      c.x = d / e
      c.y = g / e
      b.ka = q.l(a.dist, z)
      c = a.bCoef
      d = a.cMask
      a = a.cGroup
      c != null && (b.i = q.l(c, z))
      d != null && (b.c = w.Ua(d))
      a != null && (b.m = w.Ua(a))
      return b
    }

    static oh(a) {
      const b = new Aa()
      let c = q.l(a.p0, Array)
      const d = q.l(a.p1, Array)
      let e = b.F
      e.x = c[0]
      e.y = c[1]
      c = b.K
      c.x = d[0]
      c.y = d[1]
      switch (a.team) {
        case 'blue':
          a = u.ta
          break
        case 'red':
          a = u.fa
          break
        default:
          throw t.s('Bad team value')
      }
      b.rc = a
      return b
    }

    static rh(a) {
      const b = new Qa()
      let c = a.bCoef
      var d = a.invMass
      const e = a.damping
      let f = a.acceleration
      let g = a.kickingAcceleration
      let k = a.kickingDamping
      let l = a.kickStrength
      let p = a.gravity
      let r = a.cGroup
      let x = a.radius
      a = a.kickback
      c != null && (b.i = q.l(c, z))
      d != null && (b.L = q.l(d, z))
      e != null && (b.ga = q.l(e, z))
      f != null && (b.zc = q.l(f, z))
      g != null && (b.Pc = q.l(g, z))
      k != null && (b.Qc = q.l(k, z))
      l != null && (b.Nc = q.l(l, z))
      p != null &&
        ((c = b.la), (d = q.l(p[1], z)), (c.x = q.l(p[0], z)), (c.y = d))
      r != null && (b.m = w.Ua(r))
      x != null && (b.M = q.l(x, z))
      a != null && (b.Oc = q.l(a, z))
      return b
    }

    static df(a, b) {
      let c = a.pos
      var d = a.speed
      const e = a.gravity
      let f = a.radius
      let g = a.bCoef
      let k = a.invMass
      let l = a.damping
      let p = a.color
      let r = a.cMask
      a = a.cGroup
      if (c != null) {
        const x = b.a
        x.x = c[0]
        x.y = c[1]
      }
      d != null && ((c = b.u), (c.x = d[0]), (c.y = d[1]))
      e != null && ((d = b.la), (d.x = e[0]), (d.y = e[1]))
      f != null && (b.M = q.l(f, z))
      g != null && (b.i = q.l(g, z))
      k != null && (b.L = q.l(k, z))
      l != null && (b.ga = q.l(l, z))
      p != null && (b.T = w.Tc(p))
      r != null && (b.c = w.Ua(r))
      a != null && (b.m = w.Ua(a))
      return b
    }
  }
  class Ja {
    constructor(a, b, c) {
      this.gb = this.ae = null
      this.Rb = []
      this.Pe = 0
      this.qf = !1
      this.Hd = []
      this.ib = []
      this.qa = new wrtc.RTCPeerConnection({ iceServers: b }, Ja.Gg)
      const d = this
      this.Ye = new Promise(function (e) {
        d.gh = e
      })
      this.qa.onicecandidate = function (e) {
        e.candidate == null
          ? d.gh(d.Hd)
          : ((e = e.candidate),
            e.candidate != null &&
              e.candidate != '' &&
              (d.Pd != null && d.Pd(e), d.Hd.push(e)))
      }
      for (b = 0; b < c.length; ) this.Ig(c[b++])
      this.S = a
    }

    ji() {
      let a
      a == null && (a = 1e4)
      clearTimeout(this.ae)
      this.ae = setTimeout(hb(this, this.fh), a)
    }

    Hg(a, b) {
      const c = this
      this.Mg(
        this.qa.setRemoteDescription(a).then(function () {
          return c.qa.createAnswer()
        }),
        b
      )
    }

    Mg(a, b) {
      const c = this
      a.then(function (d) {
        return c.qa.setLocalDescription(d).then(function () {
          return d
        })
      })
        .then(function (d) {
          function e() {
            return d
          }
          let f = 0
          for (; f < b.length; ) c.Ie(b[f++])
          return tb.oi(c.Ye).then(e, e)
        })
        .then(function (d) {
          c.mf(d)
        })
        .catch(function () {
          c.Kc()
        })
    }

    Ig(a) {
      const b = { id: this.ib.length, negotiated: !0, ordered: a.ordered }
      a.reliable || (b.maxRetransmits = 0)
      a = this.qa.createDataChannel(a.name, b)
      a.binaryType = 'arraybuffer'
      const c = this
      a.onopen = function () {
        let d = 0
        let e = c.ib
        for (; d < e.length; ) if (e[d++].readyState != 'open') return
        c.Nd != null && c.Nd()
      }
      a.onclose = function () {
        c.Kc()
      }
      a.onmessage = function () {
        c.Kc()
      }
      this.ib.push(a)
    }

    Ie(a) {
      const b = this
      setTimeout(function () {
        b.qa.addIceCandidate(a)
      }, this.Pe)
    }

    fh() {
      this.Kc()
    }

    Kc() {
      this.Od != null && this.Od()
      this.cb()
    }

    cb() {
      this.Me()
      this.qa.close()
    }

    Me() {
      clearTimeout(this.ae)
      this.mf = this.Nd = this.Pd = this.Od = null
      this.qa.onicecandidate = null
      this.qa.ondatachannel = null
      this.qa.onsignalingstatechange = null
      this.qa.oniceconnectionstatechange = null
      let a = 0
      let b = this.ib
      for (; a < b.length; ) {
        const c = b[a]
        ++a
        c.onopen = null
        c.onclose = null
        c.onmessage = null
      }
    }
  }
  class Ga {
    constructor() {
      this.sf = 0
      this.c = this.m = 63
      this.T = 16777215
      this.ga = 0.99
      this.L = 1
      this.i = 0.5
      this.M = 10
      this.la = new I(0, 0)
      this.u = new I(0, 0)
      this.a = new I(0, 0)
    }

    G(a) {
      let b = this.a
      a.g(b.x)
      a.g(b.y)
      b = this.u
      a.g(b.x)
      a.g(b.y)
      b = this.la
      a.g(b.x)
      a.g(b.y)
      a.g(this.M)
      a.g(this.i)
      a.g(this.L)
      a.g(this.ga)
      a.xa(this.T)
      a.w(this.c)
      a.w(this.m)
    }

    Dg(a) {
      let b = this.a
      var c = a.a
      var d = b.x - c.x
      b = b.y - c.y
      let e = a.M + this.M
      var f = d * d + b * b
      if (f > 0 && f <= e * e) {
        f = Math.sqrt(f)
        d /= f
        b /= f
        c = this.L / (this.L + a.L)
        e -= f
        f = e * c
        let g = this.a
        var k = this.a
        g.x = k.x + d * f
        g.y = k.y + b * f
        k = g = a.a
        e -= f
        g.x = k.x - d * e
        g.y = k.y - b * e
        e = this.u
        f = a.u
        e = d * (e.x - f.x) + b * (e.y - f.y)
        e < 0 &&
          ((e *= this.i * a.i + 1),
          (c *= e),
          (g = f = this.u),
          (f.x = g.x - d * c),
          (f.y = g.y - b * c),
          (a = f = a.u),
          (c = e - c),
          (f.x = a.x + d * c),
          (f.y = a.y + b * c))
      }
    }

    Eg(a) {
      if (0 * a.Ha != 0) {
        var b = a.F.a
        var c = a.K.a
        var d = c.x - b.x
        var e = c.y - b.y
        var f = this.a
        var g = f.x - c.x
        c = f.y - c.y
        f = this.a
        if ((f.x - b.x) * d + (f.y - b.y) * e <= 0 || g * d + c * e >= 0) {
          return
        }
        d = a.X
        b = d.x
        d = d.y
        g = b * g + d * c
      } else {
        d = a.ec
        g = this.a
        b = g.x - d.x
        d = g.y - d.y
        g = a.kd
        c = a.ld
        if ((g.x * b + g.y * d > 0 && c.x * b + c.y * d > 0) == a.Ha <= 0) {
          return
        }
        c = Math.sqrt(b * b + d * d)
        if (c == 0) return
        g = c - a.Oe
        b /= c
        d /= c
      }
      c = a.ub
      if (c == 0) g < 0 && ((g = -g), (b = -b), (d = -d))
      else if ((c < 0 && ((c = -c), (g = -g), (b = -b), (d = -d)), g < -c)) {
        return
      }
      g >= this.M ||
        ((g = this.M - g),
        (e = c = this.a),
        (c.x = e.x + b * g),
        (c.y = e.y + d * g),
        (g = this.u),
        (g = b * g.x + d * g.y),
        g < 0 &&
          ((g *= this.i * a.i + 1),
          (c = a = this.u),
          (a.x = c.x - b * g),
          (a.y = c.y - d * g)))
    }
  }
  class A {
    constructor(a, b) {
      b == null && (b = !1)
      this.j = a
      this.ra = b
      this.a = 0
    }

    be() {
      const a = new ArrayBuffer(this.a)
      const b = new Uint8Array(this.j.buffer, this.j.byteOffset, this.a)
      new Uint8Array(a).set(b)
      return a
    }

    Bb() {
      return new Uint8Array(this.j.buffer, this.j.byteOffset, this.a)
    }

    Sb() {
      return new DataView(this.j.buffer, this.j.byteOffset, this.a)
    }

    pi() {
      return new M(this.Sb(), this.ra)
    }

    Ia(a) {
      this.j.byteLength < a &&
        this.Uh(2 * this.j.byteLength >= a ? 2 * this.j.byteLength : a)
    }

    Uh(a) {
      if (a < 1) throw t.s("Can't resize buffer to a capacity lower than 1")
      if (this.j.byteLength < a) {
        const b = new Uint8Array(this.j.buffer)
        a = new ArrayBuffer(a)
        new Uint8Array(a).set(b)
        this.j = new DataView(a)
      }
    }

    f(a) {
      const b = this.a++
      this.Ia(this.a)
      this.j.setUint8(b, a)
    }

    de(a) {
      const b = this.a
      this.a += 2
      this.Ia(this.a)
      this.j.setInt16(b, a, this.ra)
    }

    Oa(a) {
      const b = this.a
      this.a += 2
      this.Ia(this.a)
      this.j.setUint16(b, a, this.ra)
    }

    w(a) {
      const b = this.a
      this.a += 4
      this.Ia(this.a)
      this.j.setInt32(b, a, this.ra)
    }

    xa(a) {
      const b = this.a
      this.a += 4
      this.Ia(this.a)
      this.j.setUint32(b, a, this.ra)
    }

    ce(a) {
      const b = this.a
      this.a += 4
      this.Ia(this.a)
      this.j.setFloat32(b, a, this.ra)
    }

    g(a) {
      const b = this.a
      this.a += 8
      this.Ia(this.a)
      this.j.setFloat64(b, a, this.ra)
    }

    ob(a) {
      const b = this.a
      this.a += a.byteLength
      this.Ia(this.a)
      new Uint8Array(this.j.buffer, this.j.byteOffset, this.j.byteLength).set(
        a,
        b
      )
    }

    wi(a) {
      a = new Uint8Array(a.buffer, a.byteOffset, a.byteLength)
      this.ob(a)
    }

    Tf(a) {
      this.ob(new Uint8Array(a))
    }

    Tb(a) {
      this.Da(A.xd(a))
      this.ee(a)
    }

    Ca(a) {
      a == null ? this.Da(0) : (this.Da(A.xd(a) + 1), this.ee(a))
    }

    Vf(a) {
      a = new TextEncoder().encode(a)
      const b = a.length
      if (b > 255) throw t.s(null)
      this.f(b)
      this.wi(a)
    }

    Uf(a) {
      this.Tb(JSON.stringify(a))
    }

    ee(a) {
      let b = this.a
      this.Ia(b + A.xd(a))
      const c = a.length
      let d = 0
      for (; d < c; ) b += A.Pg(P.Xf(a, d++), this.j, b)
      this.a = b
    }

    Da(a) {
      const b = this.a
      a >>>= 0
      this.Ia(b + A.yg(a))
      this.j.setUint8(b, a | 128)
      a >= 128
        ? (this.j.setUint8(b + 1, (a >> 7) | 128),
          a >= 16384
            ? (this.j.setUint8(b + 2, (a >> 14) | 128),
              a >= 2097152
                ? (this.j.setUint8(b + 3, (a >> 21) | 128),
                  a >= 268435456
                    ? (this.j.setUint8(b + 4, (a >> 28) & 127), (a = 5))
                    : (this.j.setUint8(b + 3, this.j.getUint8(b + 3) & 127),
                      (a = 4)))
                : (this.j.setUint8(b + 2, this.j.getUint8(b + 2) & 127),
                  (a = 3)))
            : (this.j.setUint8(b + 1, this.j.getUint8(b + 1) & 127), (a = 2)))
        : (this.j.setUint8(b, this.j.getUint8(b) & 127), (a = 1))
      this.a += a
    }

    static aa(a, b) {
      b == null && (b = !1)
      a == null && (a = 16)
      return new A(new DataView(new ArrayBuffer(a)), b)
    }

    static Pg(a, b, c) {
      const d = c
      if (a < 0) {
        throw t.s(
          'Cannot encode UTF8 character: charCode (' + a + ') is negative'
        )
      }
      if (a < 128) b.setUint8(c, a & 127), ++c
      else if (a < 2048) {
        b.setUint8(c, ((a >> 6) & 31) | 192),
          b.setUint8(c + 1, (a & 63) | 128),
          (c += 2)
      } else if (a < 65536) {
        b.setUint8(c, ((a >> 12) & 15) | 224),
          b.setUint8(c + 1, ((a >> 6) & 63) | 128),
          b.setUint8(c + 2, (a & 63) | 128),
          (c += 3)
      } else if (a < 2097152) {
        b.setUint8(c, ((a >> 18) & 7) | 240),
          b.setUint8(c + 1, ((a >> 12) & 63) | 128),
          b.setUint8(c + 2, ((a >> 6) & 63) | 128),
          b.setUint8(c + 3, (a & 63) | 128),
          (c += 4)
      } else if (a < 67108864) {
        b.setUint8(c, ((a >> 24) & 3) | 248),
          b.setUint8(c + 1, ((a >> 18) & 63) | 128),
          b.setUint8(c + 2, ((a >> 12) & 63) | 128),
          b.setUint8(c + 3, ((a >> 6) & 63) | 128),
          b.setUint8(c + 4, (a & 63) | 128),
          (c += 5)
      } else if (a < -2147483648) {
        b.setUint8(c, ((a >> 30) & 1) | 252),
          b.setUint8(c + 1, ((a >> 24) & 63) | 128),
          b.setUint8(c + 2, ((a >> 18) & 63) | 128),
          b.setUint8(c + 3, ((a >> 12) & 63) | 128),
          b.setUint8(c + 4, ((a >> 6) & 63) | 128),
          b.setUint8(c + 5, (a & 63) | 128),
          (c += 6)
      } else {
        throw t.s(
          'Cannot encode UTF8 character: charCode (' +
            a +
            ') is too large (>= 0x80000000)'
        )
      }
      return c - d
    }

    static xg(a) {
      if (a < 0) {
        throw t.s(
          'Cannot calculate length of UTF8 character: charCode (' +
            a +
            ') is negative'
        )
      }
      if (a < 128) return 1
      if (a < 2048) return 2
      if (a < 65536) return 3
      if (a < 2097152) return 4
      if (a < 67108864) return 5
      if (a < -2147483648) return 6
      throw t.s(
        'Cannot calculate length of UTF8 character: charCode (' +
          a +
          ') is too large (>= 0x80000000)'
      )
    }

    static xd(a) {
      let b = 0
      let c = a.length
      let d = 0
      for (; d < c; ) b += A.xg(P.Xf(a, d++))
      return b
    }

    static yg(a) {
      a >>>= 0
      return a < 128
        ? 1
        : a < 16384
        ? 2
        : a < 2097152
        ? 3
        : a < 268435456
        ? 4
        : 5
    }
  }
  class $a {
    constructor(a, b) {
      this.dg = 0
      this.version = 1
      this.td = 0
      this.Gb = A.aa(1e3)
      this.xc = A.aa(16384)
      this.version = b
      let c = (this.td = a.da)
      this.ne = a
      a.Fa.G(this.xc)
      const d = this
      a.yb = function (f) {
        const g = a.da
        d.xc.Da(g - c)
        c = g
        d.xc.Oa(f.B)
        m.re(f, d.xc)
      }
      this.Gb.Oa(0)
      let e = this.td
      a.Fa.Hf(function (f) {
        const g = a.da
        d.Gb.Da(g - e)
        d.Gb.f(f)
        d.dg++
        e = g
      })
    }

    stop() {
      this.ne.yb = null
      this.ne.Fa.Hf(null)
      this.Gb.j.setUint16(0, this.dg, this.Gb.ra)
      this.Gb.ob(this.xc.Bb())
      const a = pako.deflateRaw(this.Gb.Bb())
      let b = A.aa(a.byteLength + 32)
      b.ee('HBR2')
      b.xa(this.version)
      b.xa(this.ne.da - this.td)
      b.ob(a)
      return b.Bb()
    }
  }
  class za {
    static mh() {
      if (za.Qd != null) return za.Qd
      za.Qd = new Promise(function (a, b) {
        let c = grecaptcha
        c != null
          ? a(c)
          : ((c = createElement('script')),
            (c.src =
              'https://www.google.com/recaptcha/api.js?onload=___recaptchaload&render=explicit'),
            head.appendChild(c),
            (___recaptchaload = function () {
              a(grecaptcha)
            }),
            (c.onerror = function () {
              b(null)
            }))
      })
      return za.Qd
    }
  }
  class xa {
    constructor() {
      this.ja = u.na
      this.N = null
      this.Wb = this.uc = 0
      this.Cb = !1
      this.Jb = this.ma = 0
      this.oa = 'Player'
      this.Di = this.ad = 0
      this.country = null
      this.ke = !1
      this.Db = this.Wf = null
      this.Eb = 0
      this.Ub = !1
    }

    P(a) {
      a.f(this.Ub ? 1 : 0)
      a.w(this.Eb)
      a.Ca(this.Db)
      a.Ca(this.Wf)
      a.f(this.ke ? 1 : 0)
      a.Ca(this.country)
      a.w(this.Di)
      a.Ca(this.oa)
      a.w(this.Jb)
      a.Da(this.ma)
      a.f(this.Cb ? 1 : 0)
      a.de(this.Wb)
      a.f(this.uc)
      a.f(this.ja.S)
      a.de(this.N == null ? -1 : this.N.sf)
    }
  }
  class V {
    static Af(a, b, c, d) {
      return new Promise(function (e, f) {
        const g = new XMLHttpRequest()
        g.open(b, a)
        g.responseType = 'json'
        g.onload = function () {
          g.status >= 200 && g.status < 300
            ? g.response != null
              ? e(g.response)
              : f(null)
            : f('status: ' + g.status)
        }
        g.onerror = function (k) {
          f(k)
        }
        d != null && g.setRequestHeader('Content-type', d)
        g.send(c)
      })
    }

    static Rg(a) {
      return V.Af(a, 'GET', null)
    }

    static Tg(a) {
      return V.Rg(a).then(function (b) {
        const c = b.error
        if (c != null) throw t.s(c)
        return b.data
      })
    }

    static Kh(a, b, c) {
      return V.Af(a, 'POST', b, c)
    }

    static Lh(a, b, c) {
      return V.Kh(a, b, c).then(function (d) {
        const e = d.error
        if (e != null) throw t.s(e)
        return d.data
      })
    }
  }
  class Ha {
    constructor() {
      this.T = 0
      this.qc = 1 / 0
      this.Ka = this.Va = 100
      this.Ic = this.Jc = 0
    }

    G(a) {
      a.f(this.Ic)
      a.f(this.Jc)
      a.g(this.Ka)
      a.g(this.Va)
      a.g(this.qc)
      a.w(this.T)
    }

    pa(a) {
      this.Ic = a.C()
      this.Jc = a.C()
      this.Ka = a.o()
      this.Va = a.o()
      this.qc = a.o()
      this.T = a.H()
    }

    Ba(a) {
      let b = a[this.Ic]
      a = a[this.Jc]
      if (b != null && a != null) {
        let c = b.a
        var d = a.a
        var e = c.x - d.x
        c = c.y - d.y
        let f = Math.sqrt(e * e + c * c)
        if (!(f <= 0)) {
          e /= f
          c /= f
          d = b.L / (b.L + a.L)
          d != d && (d = 0.5)
          if (this.Ka >= this.Va) {
            var g = this.Ka
            var k = 0
          } else if (f <= this.Ka) (g = this.Ka), (k = 1)
          else if (f >= this.Va) (g = this.Va), (k = -1)
          else return
          f = g - f
          if (0 * this.qc == 0) {
            ;(d = this.qc * f * 0.5),
              (e *= d),
              (c *= d),
              (k = d = b.u),
              (b = b.L),
              (d.x = k.x + e * b),
              (d.y = k.y + c * b),
              (d = b = a.u),
              (a = a.L),
              (b.x = d.x + -e * a),
              (b.y = d.y + -c * a)
          } else {
            g = f * d
            let l = b.a
            var p = b.a
            l.x = p.x + e * g * 0.5
            l.y = p.y + c * g * 0.5
            p = l = a.a
            f -= g
            l.x = p.x - e * f * 0.5
            l.y = p.y - c * f * 0.5
            f = b.u
            g = a.u
            f = e * (f.x - g.x) + c * (f.y - g.y)
            f * k <= 0 &&
              ((d *= f),
              (b = k = b.u),
              (k.x = b.x - e * d),
              (k.y = b.y - c * d),
              (a = b = a.u),
              (d = f - d),
              (b.x = a.x + e * d),
              (b.y = a.y + c * d))
          }
        }
      }
    }
  }
  class Ta {
    static ve(a) {
      return q.Zb(a, '')
    }

    static parseInt(a) {
      a = parseInt(a)
      return isNaN(a) ? null : a
    }
  }
  class G {
    constructor() {
      this.kd = this.ld = this.X = null
      this.Oe = 0
      this.K = this.F = this.ec = null
      this.ub = 0
      this.i = 1
      this.c = 63
      this.m = 32
      this.Ha = 1 / 0
      this.va = !0
      this.T = 0
    }

    G(a) {
      let b = 0
      let c = a.a
      a.f(0)
      a.f(this.F.Lc)
      a.f(this.K.Lc)
      this.ub != 0 && ((b = 1), a.g(this.ub))
      this.Ha != 1 / 0 && ((b |= 2), a.g(this.Ha))
      this.T != 0 && ((b |= 4), a.w(this.T))
      this.va && (b |= 8)
      a.j.setUint8(c, b)
      a.g(this.i)
      a.w(this.c)
      a.w(this.m)
    }

    pa(a, b) {
      const c = a.C()
      this.F = b[a.C()]
      this.K = b[a.C()]
      this.ub = (c & 1) != 0 ? a.o() : 0
      this.Ha = (c & 2) != 0 ? a.o() : 1 / 0
      this.T = (c & 4) != 0 ? a.H() : 0
      this.va = (c & 8) != 0
      this.i = a.o()
      this.c = a.H()
      this.m = a.H()
    }

    bb(a) {
      a *= 0.017453292519943295
      if (a < 0) {
        a = -a
        const b = this.F
        this.F = this.K
        this.K = b
        this.ub = -this.ub
      }
      a > G.kg && a < G.jg && (this.Ha = 1 / Math.tan(a / 2))
    }

    Nb() {
      if (0 * this.Ha == 0) {
        var a = this.K.a
        var b = this.F.a
        var c = 0.5 * (a.x - b.x)
        a = 0.5 * (a.y - b.y)
        b = this.F.a
        const d = this.Ha
        this.ec = new I(b.x + c + -a * d, b.y + a + c * d)
        a = this.F.a
        b = this.ec
        c = a.x - b.x
        a = a.y - b.y
        this.Oe = Math.sqrt(c * c + a * a)
        c = this.F.a
        a = this.ec
        this.kd = new I(-(c.y - a.y), c.x - a.x)
        c = this.ec
        a = this.K.a
        this.ld = new I(-(c.y - a.y), c.x - a.x)
        this.Ha <= 0 &&
          ((a = c = this.kd),
          (c.x = -a.x),
          (c.y = -a.y),
          (a = c = this.ld),
          (c.x = -a.x),
          (c.y = -a.y))
      } else {
        ;(a = this.F.a),
          (b = this.K.a),
          (c = a.x - b.x),
          (a = -(a.y - b.y)),
          (b = Math.sqrt(a * a + c * c)),
          (this.X = new I(a / b, c / b))
      }
    }
  }
  class sb {
    static Ei(a) {
      let b = ''
      do (b = '0123456789ABCDEF'.charAt(a & 15) + b), (a >>>= 4)
      while (a > 0)
      for (; b.length < 2; ) b = '0' + b
      return b
    }
  }
  class eb {
    static sa(a, b, c, d, e) {
      a != null && a(b, c, d, e)
    }
  }
  class bb {
    constructor(a) {
      const b = []
      let c = 0
      for (; c < a; ) ++c, b.push(0)
      this.hd = b
      this.tc = this.hc = 0
    }

    rg(a) {
      this.tc -= this.hd[this.hc]
      this.hd[this.hc] = a
      this.tc += a
      this.hc++
      this.hc >= this.hd.length && (this.hc = 0)
    }

    vg() {
      return this.tc / this.hd.length
    }
  }
  class q {
    static Zf(a) {
      if (a == null) return null
      if (a instanceof Array) return Array
      {
        const b = a.h
        if (b != null) return b
        a = q.Ee(a)
        return a != null ? q.pg(a) : null
      }
    }

    static Zb(a, b) {
      if (a == null) return 'null'
      if (b.length >= 5) return '<...>'
      let c = typeof a
      'function' == c && (a.b || a.Be) && (c = 'object')
      switch (c) {
        case 'function':
          return '<function>'
        case 'object':
          if (a.Yb) {
            var d = fb[a.Yb].Ae[a.Gd]
            c = d.Xe
            if (d.Ge) {
              b += '\t'
              var e = []
              var f = 0
              for (d = d.Ge; f < d.length; ) {
                const g = d[f]
                f += 1
                e.push(q.Zb(a[g], b))
              }
              a = e
              return c + '(' + a.join(',') + ')'
            }
            return c
          }
          if (a instanceof Array) {
            c = '['
            b += '\t'
            e = 0
            for (f = a.length; e < f; ) {
              ;(d = e++), (c += (d > 0 ? ',' : '') + q.Zb(a[d], b))
            }
            return (c += ']')
          }
          try {
            e = a.toString
          } catch (g) {
            return '???'
          }
          if (
            e != null &&
            e != Object.toString &&
            typeof e === 'function' &&
            ((c = a.toString()), c != '[object Object]')
          ) {
            return c
          }
          c = '{\n'
          b += '\t'
          e = a.hasOwnProperty != null
          f = null
          for (f in a) {
            ;(e && !a.hasOwnProperty(f)) ||
              'prototype' == f ||
              '__class__' == f ||
              '__super__' == f ||
              '__interfaces__' == f ||
              '__properties__' == f ||
              (c.length != 2 && (c += ', \n'),
              (c += b + f + ' : ' + q.Zb(a[f], b)))
          }
          b = b.substring(1)
          return (c += '\n' + b + '}')
        case 'string':
          return a
        default:
          return String(a)
      }
    }

    static Ce(a, b) {
      for (;;) {
        if (a == null) return !1
        if (a == b) return !0
        const c = a.sb
        if (c != null && (a.J == null || a.J.sb != c)) {
          let d = 0
          let e = c.length
          for (; d < e; ) {
            const f = c[d++]
            if (f == b || q.Ce(f, b)) return !0
          }
        }
        a = a.J
      }
    }

    static ng(a, b) {
      if (b == null) return !1
      switch (b) {
        case Array:
          return a instanceof Array
        case Za:
          return typeof a === 'boolean'
        case ub:
          return a != null
        case z:
          return typeof a === 'number'
        case wa:
          return typeof a === 'number' ? (a | 0) === a : !1
        case String:
          return typeof a === 'string'
        default:
          if (a != null) {
            if ('function' === typeof b) {
              if (q.mg(a, b)) return !0
            } else {
              if ('object' === typeof b && q.og(b) && a instanceof b) return !0
            }
          } else return !1
          return (b == vb && a.b != null) || (b == wb && a.Be != null)
            ? !0
            : a.Yb != null
            ? fb[a.Yb] == b
            : !1
      }
    }

    static mg(a, b) {
      return a instanceof b ? !0 : b.De ? q.Ce(q.Zf(a), b) : !1
    }

    static l(a, b) {
      if (a == null || q.ng(a, b)) return a
      throw t.s('Cannot cast ' + Ta.ve(a) + ' to ' + Ta.ve(b))
    }

    static Ee(a) {
      a = q.qg.call(a).slice(8, -1)
      return a == 'Object' || a == 'Function' || a == 'Math' || a == 'JSON'
        ? null
        : a
    }

    static og(a) {
      return q.Ee(a) != null
    }

    static pg(a) {
      return ua[a]
    }
  }
  class P {
    static Xf(a, b) {
      a = a.charCodeAt(b)
      if (a == a) return a
    }

    static substr(a, b, c) {
      if (c == null) c = a.length
      else if (c < 0) {
        if (b == 0) c = a.length + c
        else return ''
      }
      return a.substr(b, c)
    }

    static remove(a, b) {
      b = a.indexOf(b)
      if (b == -1) return !1
      a.splice(b, 1)
      return !0
    }

    static now() {
      return Date.now()
    }
  }
  class I {
    constructor(a, b) {
      this.x = a
      this.y = b
    }
  }
  class Ka {
    constructor(a, b, c, d) {
      this.Ac = new Set()
      this.$b = new Set()
      this.fd = this.lc = this.Ff = !1
      this.Za = null
      this.mc = this.S = ''
      this.Wh = 5e4
      this.Vh = 1e4
      this.xb = new Map()
      this.gi = a
      this.Id = b
      this.Ag = c
      this.mc = d
      this.mc == null && (this.mc = '')
      this.Zd()
    }

    Yd(a) {
      if (this.Za != null || a != null) {
        if (
          this.Za != null &&
          a != null &&
          this.Za.byteLength == a.byteLength
        ) {
          const c = new Uint8Array(this.Za)
          let d = new Uint8Array(a)
          let e = !1
          let f = 0
          let g = this.Za.byteLength
          for (; f < g; ) {
            const k = f++
            if (c[k] != d[k]) {
              e = !0
              break
            }
          }
          if (!e) return
        }
        this.Za = a.slice(0)
        this.fd = !0
        let b = this
        this.ua != null &&
          this.ua.readyState == 1 &&
          this.gd == null &&
          (this.Vd(),
          (this.gd = setTimeout(function () {
            b.gd = null
            b.ua.readyState == 1 && b.fd && b.Vd()
          }, 1e4)))
      }
    }

    Xd(a) {
      function b() {
        c.ua != null && c.ua.readyState == 1 && c.lc != c.Ff && c.Df()
        c.Bf = null
      }
      this.lc = a
      const c = this
      this.Bf == null && (b(), (this.Bf = setTimeout(b, 1e3)))
    }

    Zd(a) {
      function b(e) {
        e = e.sitekey
        if (e == null) throw t.s(null)
        d.ic != null &&
          d.ic(e, function (f) {
            d.Zd(f)
          })
      }
      function c(e) {
        const f = e.url
        if (f == null) throw t.s(null)
        e = e.token
        if (e == null) throw t.s(null)
        d.ua = new WebSocket(f + '?token=' + e, {
          headers: { origin: 'https://html5.haxball.com' },
          agent: proxyAgent
        })
        d.ua.binaryType = 'arraybuffer'
        d.ua.onopen = function () {
          d.eh()
        }
        d.ua.onclose = function (g) {
          d.Ed(g.code != 4001)
        }
        d.ua.onerror = function () {
          debug && console.error(e)
          d.Ed(!0)
        }
        d.ua.onmessage = hb(d, d.dh)
      }
      a == null && (a = '')
      const d = this
      V.Lh(this.gi, 'token=' + this.mc + '&rcr=' + a, V.ig)
        .then(function (e) {
          switch (e.action) {
            case 'connect':
              c(e)
              break
            case 'recaptcha':
              console.log(new Error('Invalid Token Provided!'))
          }
        })
        .catch(function () {
          d.Ed(!0)
        })
    }

    eh() {
      this.Za != null && this.Vd()
      this.lc != 0 && this.Df()
      const a = this
      this.Gh = setInterval(function () {
        a.ai()
      }, 4e4)
    }

    dh(a) {
      a = new M(new DataView(a.data), !1)
      switch (a.C()) {
        case 1:
          this.ah(a)
          break
        case 4:
          this.Wg(a)
          break
        case 5:
          this.Yg(a)
          break
        case 6:
          this.$g(a)
      }
    }

    ah(a) {
      const b = a.Ob()
      let c = S.Bi(a.La(a.C()))
      let d
      let e
      let f
      try {
        a = new M(new DataView(pako.inflateRaw(a.La()).buffer), !1)
        d = a.C() != 0
        e = a.lb()
        const g = a.yf()
        let k = []
        let l = 0
        for (; l < g.length; ) k.push(new wrtc.RTCIceCandidate(g[l++]))
        f = k
      } catch (g) {
        this.oc(b, 0)
        return
      }
      this.bh(b, c, e, f, a, d)
    }

    bh(a, b, c, d, e, f) {
      if (this.xb.size >= 16) this.oc(a, 4104)
      else if (this.Ac.has(b)) this.oc(a, 4102)
      else {
        for (var g = [], k = 0; k < d.length; ) {
          const r = Ka.Ve(d[k++])
          if (r != null) {
            if (this.$b.has(r)) {
              this.oc(a, 4102)
              return
            }
            g.push(r)
          }
        }
        if (
          this.Ne != null &&
          ((k = new M(e.j)), (k.a = e.a), (e = this.Ne(b, k)), e.Gd == 1)
        ) {
          this.oc(a, e.reason)
          return
        }
        const l = new Ja(a, this.Id, this.Ag)
        f && (l.Pe = 2500)
        l.Rb = g
        l.gb = b
        this.xb.set(a, l)
        let p = this
        l.Od = function () {
          p.pc(0, l, null)
          p.xb.delete(l.S)
        }
        l.Nd = function () {
          p.xb.delete(l.S)
          p.pc(0, l, null)
          p.lf != null && p.lf(new cb(l))
        }
        l.mf = function (r) {
          p.bi(l, r, l.Hd)
          l.Ye.then(function () {
            p.pc(0, l, null)
          })
          l.Pd = function (x) {
            p.$h(l, x)
          }
        }
        l.ji()
        l.Hg(new wrtc.RTCSessionDescription({ sdp: c, type: 'offer' }), d)
      }
    }

    Wg(a) {
      const b = a.Ob()
      let c
      try {
        ;(a = new M(new DataView(pako.inflateRaw(a.La()).buffer), !1)),
          (c = new wrtc.RTCIceCandidate(a.yf()))
      } catch (d) {
        return
      }
      this.Xg(b, c)
    }

    Xg(a, b) {
      a = this.xb.get(a)
      if (a != null) {
        const c = Ka.Ve(b)
        if (c != null && (a.Rb.push(c), this.$b.has(c))) return
        a.Ie(b)
      }
    }

    Yg(a) {
      this.S = a.bd(a.C())
      this.Zc != null && this.Zc(this.S)
    }

    $g(a) {
      this.mc = a.bd(a.j.byteLength - a.a)
    }

    pc(a, b, c) {
      if (!b.qf) {
        a == 0 && (b.qf = !0)
        let d = b.S
        b = A.aa(32, !1)
        b.f(a)
        b.xa(d)
        c != null && ((a = pako.deflateRaw(c.Bb())), b.ob(a))
        this.ua.send(b.Sb())
      }
    }

    oc(a, b) {
      const c = A.aa(16, !1)
      c.f(0)
      c.xa(a)
      c.Oa(b)
      this.ua.send(c.Sb())
    }

    ai() {
      const a = A.aa(1, !1)
      a.f(8)
      this.ua.send(a.Sb())
    }

    Vd() {
      this.fd = !1
      const a = A.aa(256, !1)
      a.f(7)
      this.Za != null && a.Tf(this.Za)
      this.ua.send(a.Sb())
    }

    Df() {
      const a = A.aa(2, !1)
      a.f(9)
      a.f(this.lc ? 1 : 0)
      this.ua.send(a.Sb())
      this.Ff = this.lc
    }

    bi(a, b, c) {
      const d = A.aa(32, !1)
      d.Tb(b.sdp)
      d.Uf(c)
      this.pc(1, a, d)
    }

    $h(a, b) {
      const c = A.aa(32, !1)
      c.Uf(b)
      this.pc(4, a, c)
    }

    Ng() {
      const a = this.xb.values()
      let b = a.next()
      for (; !b.done; ) {
        const c = b.value
        b = a.next()
        c.cb()
      }
      this.xb.clear()
    }

    Ed(a) {
      this.Ng()
      clearTimeout(this.gd)
      this.gd = null
      this.fd = !1
      clearInterval(this.Gh)
      clearTimeout(this.Xh)
      const b = this
      a &&
        (this.Xh = setTimeout(function () {
          b.Zd()
        }, (this.Vh + Math.random() * this.Wh) | 0))
    }

    wg(a) {
      let b = 0
      let c = a.Rb
      for (; b < c.length; ) this.$b.add(c[b++])
      a.gb != null && this.Ac.add(a.gb)
      return { Ii: a.Rb, zi: a.gb }
    }

    Bd() {
      this.$b.clear()
      this.Ac.clear()
    }

    Ad(a) {
      let b = 0
      let c = a.Ii
      for (; b < c.length; ) this.$b.delete(c[b++])
      this.Ac.delete(a.zi)
    }

    static Ve(a) {
      try {
        const b = pb.Eh(a.candidate)
        if (b.ri == 'srflx') return b.ih
      } catch (b) {}
      return null
    }
  }
  class Ia {
    constructor() {}
  }
  class Sa {
    constructor() {
      this.A = []
    }

    G(a) {
      a.f(this.A.length)
      let b = 0
      let c = this.A.length
      for (; b < c; ) {
        const d = b++
        const e = this.A[d]
        e.sf = d
        e.G(a)
      }
    }

    Ba(a) {
      for (var b = 0, c = this.A; b < c.length; ) {
        var d = c[b]
        ++b
        var e = d.a
        var f = d.a
        var g = d.u
        e.x = f.x + g.x * a
        e.y = f.y + g.y * a
        f = e = d.u
        g = d.la
        d = d.ga
        e.x = (f.x + g.x) * d
        e.y = (f.y + g.y) * d
      }
      a = 0
      for (b = this.A.length; a < b; ) {
        d = a++
        c = this.A[d]
        d += 1
        for (e = this.A.length; d < e; ) {
          ;(f = this.A[d++]), (f.c & c.m) != 0 && (f.m & c.c) != 0 && c.Dg(f)
        }
        if (c.L != 0) {
          d = 0
          for (e = this.Y; d < e.length; ) {
            if (((f = e[d]), ++d, (f.c & c.m) != 0 && (f.m & c.c) != 0)) {
              g = f.X
              var k = c.a
              g = f.ka - (g.x * k.x + g.y * k.y) + c.M
              if (g > 0) {
                var l = (k = c.a)
                var p = f.X
                k.x = l.x + p.x * g
                k.y = l.y + p.y * g
                g = c.u
                k = f.X
                g = g.x * k.x + g.y * k.y
                0 > g &&
                  ((g *= c.i * f.i + 1),
                  (l = k = c.u),
                  (f = f.X),
                  (k.x = l.x - f.x * g),
                  (k.y = l.y - f.y * g))
              }
            }
          }
          d = 0
          for (e = this.I; d < e.length; ) {
            ;(f = e[d]), ++d, (f.c & c.m) != 0 && (f.m & c.c) != 0 && c.Eg(f)
          }
          d = 0
          for (e = this.v; d < e.length; ) {
            if (
              ((f = e[d]),
              ++d,
              0 != (f.c & c.m) &&
                (f.m & c.c) != 0 &&
                ((k = c.a),
                (l = f.a),
                (g = k.x - l.x),
                (k = k.y - l.y),
                (l = g * g + k * k),
                l > 0 && l <= c.M * c.M))
            ) {
              l = Math.sqrt(l)
              g /= l
              k /= l
              l = c.M - l
              let r = (p = c.a)
              p.x = r.x + g * l
              p.y = r.y + k * l
              l = c.u
              l = g * l.x + k * l.y
              0 > l &&
                ((l *= c.i * f.i + 1),
                (p = f = c.u),
                (f.x = p.x - g * l),
                (f.y = p.y - k * l))
            }
          }
        }
      }
      for (a = 0; a < 2; ) {
        for (++a, b = 0, c = this.Ta; b < c.length; ) c[b++].Ba(this.A)
      }
    }
  }
  class m {
    constructor() {
      m.Ja || this.Aa()
    }

    Aa() {
      this.fg = this.gg = this.fb = 0
    }

    eg() {
      return !0
    }

    apply() {
      throw t.s('missing implementation')
    }

    W() {
      throw t.s('missing implementation')
    }

    P() {
      throw t.s('missing implementation')
    }

    static Z(a) {
      a.delay == null && (a.delay = !0)
      a.ca == null && (a.ca = !0)
      return a
    }

    static $(a) {
      a.lg = m.fe
      if (a.U == null) throw t.s("Class doesn't have a config")
      a.prototype.ie = a.U
      m.$f.set(m.fe, a)
      m.fe++
    }

    static re(a, b) {
      const c = q.Zf(a).lg
      if (c == null) throw t.s('Tried to pack unregistered action')
      b.f(c)
      a.P(b)
    }

    static Ki(a) {
      let b = a.C()
      b = Object.create(m.$f.get(b).prototype)
      b.fb = 0
      b.eb = 0
      b.W(a)
      return b
    }
  }
  class Ua {
    static sa(a, b, c) {
      a != null && a(b, c)
    }
  }
  class O {
    constructor(a) {
      O.Ja || this.Aa(a)
    }

    Aa(a) {
      this.da = 0
      this.Fa = a
    }
  }
  class Va {}
  class lb {
    static sa(a, b, c, d) {
      a != null && a(b, c, d)
    }
  }
  class ja {
    constructor() {
      this.c = this.m = 63
      this.T = 16777215
      this.ga = 0.99
      this.L = 1
      this.i = 0.5
      this.M = 10
      this.la = new I(0, 0)
      this.u = new I(0, 0)
      this.a = new I(0, 0)
    }

    G(a) {
      let b = this.a
      a.g(b.x)
      a.g(b.y)
      b = this.u
      a.g(b.x)
      a.g(b.y)
      b = this.la
      a.g(b.x)
      a.g(b.y)
      a.g(this.M)
      a.g(this.i)
      a.g(this.L)
      a.g(this.ga)
      a.xa(this.T)
      a.w(this.c)
      a.w(this.m)
    }

    pa(a) {
      let b = this.a
      b.x = a.o()
      b.y = a.o()
      b = this.u
      b.x = a.o()
      b.y = a.o()
      b = this.la
      b.x = a.o()
      b.y = a.o()
      this.M = a.o()
      this.i = a.o()
      this.L = a.o()
      this.ga = a.o()
      this.T = a.Ob()
      this.c = a.H()
      this.m = a.H()
    }

    wh() {
      const a = new Ga()
      this.Ze(a)
      return a
    }

    Ze(a) {
      let b = a.a
      var c = this.a
      b.x = c.x
      b.y = c.y
      b = a.u
      c = this.u
      b.x = c.x
      b.y = c.y
      b = a.la
      c = this.la
      b.x = c.x
      b.y = c.y
      a.M = this.M
      a.i = this.i
      a.L = this.L
      a.ga = this.ga
      a.T = this.T
      a.c = this.c
      a.m = this.m
    }
  }
  class sa extends m {
    constructor() {
      super()
    }

    apply(a) {
      a.Fg(this.qd)
    }

    P(a) {
      a.Da(this.qd.byteLength)
      a.Tf(this.qd)
    }

    W(a) {
      this.qd = a.Qh(a.mb())
    }
  }
  class La extends O {
    constructor(a) {
      O.Ja ? super() : ((O.Ja = !0), super(), (O.Ja = !1), this.Aa(a))
    }

    Aa(a) {
      this.od = this.Ra = 0
      this.Ud = new db()
      this.Lg = 0
      this.ze = 0.06
      super.Aa(a)
    }

    sg(a) {
      const b = this.Ud.list
      let c = 0
      let d = b.length
      let e = 0
      for (; e < a; ) {
        for (++e; c < d; ) {
          const f = b[c]
          if (f.eb != this.da) break
          f.apply(this.Fa)
          this.yb != null && this.yb(f)
          this.Ra++
          ++c
        }
        this.Fa.Ba(1)
        this.od += this.Ra
        this.Ra = 0
        this.da++
      }
      for (; c < d; ) {
        a = b[c]
        if (a.eb != this.da || a.fb != this.Ra) break
        a.apply(this.Fa)
        this.yb != null && this.yb(a)
        this.Ra++
        ++c
      }
      b.splice(0, c)
    }

    Cf(a) {
      a.eb == this.da && a.fb <= this.Ra
        ? ((a.fb = this.Ra++), a.apply(this.Fa), this.yb != null && this.yb(a))
        : this.Ud.Gi(a)
    }
  }
  class Oa extends La {
    constructor(a) {
      O.Ja = !0
      super()
      O.Ja = !1
      this.Aa(a)
    }

    Aa(a) {
      this.Bc = new Map()
      this.kb = null
      this.Xc = 32
      this.wb = new Map()
      this.Ga = []
      this.Qb = 2
      this.Cg = 600
      super.Aa(a.state)
      this.yh = a.Hi
      this.vi = a.version
      this.zh = 1
      this.bf = 0
      this.Lf = performance.now()
      this.Wa = new Ka(this.yh, a.iceServers, kb.channels, a.Ji)
      this.Wa.Ne = hb(this, this.Zg)
      const b = this
      this.Wa.lf = function (c) {
        b.Dh(c)
      }
      this.Wa.Zc = function (c) {
        Ra.sa(b.Zc, c)
      }
      this.Wa.ic = function (c, d) {
        b.ic != null && b.ic(c, d)
      }
    }

    Og(a, b, c, d) {
      const e = this.wb.get(a)
      if (e != null) {
        if (d) {
          const f = this.Wa.wg(e.jc)
          this.Bc.set(a, f)
        }
        a = A.aa()
        a.f(5)
        a.f(d ? 1 : 0)
        a.Tb(b)
        c == null && (c = '')
        a.Tb(c)
        e.nb(a)
        e.jc.cb()
      }
    }

    Bd() {
      this.Wa.Bd()
      this.Bc.clear()
    }

    Ad(a) {
      const b = this.Bc.get(a)
      b != null && this.Wa.Ad(b)
      this.Bc.delete(a)
    }

    Yd(a) {
      this.Wa.Yd(a)
    }

    Xd(a) {
      this.Wa.Xd(a)
    }

    nc(a) {
      a.B = 0
      let b = this.da + this.Qb + this.Lg
      a.ie.delay || (b = this.da)
      a.eb = b
      this.Cf(a)
      this.Wd()
      this.Ga.length > 0 && this.jd(this.Kd(a), 1)
    }

    Ef(a, b) {
      b = this.wb.get(b)
      if (b != null) {
        a.B = 0
        let c = A.aa()
        c.f(6)
        m.re(a, c)
        b.nb(c, 0)
      }
    }

    Ba() {
      const a = (((performance.now() - this.Lf) * this.ze) | 0) - this.da
      a > 0 && this.sg(a)
      this.da - this.cf >= 7 && this.Wd()
      this.da - this.bf >= this.Cg && (this.Wd(), this.Zh())
    }

    Zg(a, b) {
      if (this.Ga.length >= this.Xc) return ta.yc(4100)
      try {
        if (b.kc() != this.vi) throw t.s(null)
      } catch (c) {
        return ta.yc(4103)
      }
      try {
        const c = b.Ya()
        if (this.kb != null && c != this.kb) throw t.s(null)
      } catch (c) {
        return ta.yc(4101)
      }
      return ta.ye
    }

    Dh(a) {
      if (this.Ga.length >= this.Xc) a.cb()
      else {
        const b = new ab(a)
        this.Ga.push(b)
        let c = this
        a.pf = function (d) {
          d = new M(new DataView(d))
          c.Mh(d, b)
        }
        a.nf = function () {
          P.remove(c.Ga, b)
          c.wb.delete(b.S)
          Ra.sa(c.Ch, b.S)
        }
        a = A.aa(1 + b.dc.byteLength)
        a.f(0)
        a.Da(b.dc.byteLength)
        a.ob(b.dc)
        b.nb(a)
      }
    }

    Kd(a) {
      const b = A.aa()
      b.f(2)
      this.rf(a, b)
      return b
    }

    rf(a, b) {
      b.xa(a.eb)
      b.Da(a.fb)
      b.Oa(a.B)
      b.xa(a.yi)
      m.re(a, b)
    }

    Wd() {
      if (!(this.da - this.cf <= 0) && this.Ga.length != 0) {
        const a = A.aa()
        a.f(3)
        a.xa(this.da)
        a.xa(this.od)
        this.jd(a, 2)
        this.cf = this.da
      }
    }

    jd(a, b) {
      b == null && (b = 0)
      let c = 0
      let d = this.Ga
      for (; c < d.length; ) {
        const e = d[c]
        ++c
        e.dd && e.nb(a, b)
      }
    }

    ci(a) {
      const b = A.aa()
      b.f(1)
      const c = A.aa()
      c.Oa(a.S)
      c.xa(this.da)
      c.xa(this.od)
      c.Da(this.Ra)
      this.Fa.G(c)
      const d = this.Ud.list
      let e = 0
      let f = d.length
      for (; e < f; ) this.rf(d[e++], c)
      b.ob(pako.deflateRaw(c.Bb()))
      a.nb(b)
    }

    Zh() {
      this.bf = this.da
      if (this.Ga.length != 0) {
        const a = new sa()
        a.eb = this.da
        a.fb = this.Ra++
        a.B = 0
        a.qd = this.Fa.Sg()
        this.jd(this.Kd(a))
      }
    }

    Oh(a, b) {
      const c = a.La(a.mb())
      const d = a.La(a.mb())
      a = b.dc
      b.dc = null
      const e = this
      ra.ui(c, a)
        .catch(function () {
          return null
        })
        .then(function (f) {
          try {
            if (e.Ga.indexOf(b) != -1) {
              b.Jg = f
              let g = e.zh++
              b.S = g
              e.wb.set(g, b)
              Ua.sa(
                e.Bh,
                g,
                new M(new DataView(d.buffer, d.byteOffset, d.byteLength), !1)
              )
              b.dd = !0
              e.ci(b)
            }
          } catch (k) {
            ;(f = t.Vb(k).Hb()), e.We(b, f)
          }
        })
    }

    Mh(a, b) {
      this.Ba()
      try {
        if (!b.Vg.Rf()) throw t.s(1)
        const c = a.C()
        if (b.dd) {
          switch (c) {
            case 1:
              this.Ph(a, b)
              break
            case 2:
              this.Nh(a, b)
              break
            default:
              throw t.s(0)
          }
        } else if (c == 0) this.Oh(a, b)
        else throw t.s(0)
        if (a.j.byteLength - a.a > 0) throw t.s(2)
      } catch (c) {
        this.We(b, t.Vb(c).Hb())
      }
    }

    We(a, b) {
      ua.console.log(b)
      this.wb.delete(a.S)
      P.remove(this.Ga, a)
      a.dd && this.kf != null && this.kf(a.S)
      a.jc.cb()
    }

    Nh(a, b) {
      const c = a.o()
      b.ad = a.mb()
      a = A.aa()
      a.f(4)
      a.g((performance.now() - this.Lf) * this.ze + this.Qb)
      a.g(c)
      b.nb(a, 2)
    }

    Ph(a, b) {
      let c = a.Ob()
      const d = a.Ob()
      a = m.Ki(a)
      let e = a.ie.se
      if (e != null) {
        var f = b.He.get(e)
        f == null && ((f = new Pa(e.ge, e.we)), b.He.set(e, f))
        if (!f.Rf()) throw t.s(3)
      }
      e = this.da + this.Qb
      f = this.da
      let g = this.da + 20
      f = c < f ? f : c > g ? g : c
      g = c - e
      if (a.ie.delay) {
        if (g < -this.Qb - 3) f = e
        else {
          const k = -this.Qb
          const l = this.Qb
          b.hf.rg(g < k ? k : g > l ? l : g)
        }
        f < e && b.hf.vg() < -0.85 && (f = e)
        f < b.Fd && (f = b.Fd)
        b.Fd = f
      }
      a.fg = g
      c = f - c
      a.gg = c > 0 ? c : 0
      a.yi = d
      a.B = b.S
      a.eb = f
      a.eg(this.Fa) && (this.Cf(a), this.jd(this.Kd(a), 1))
    }
  }
  class Ea extends m {
    constructor() {
      super()
    }

    apply(a) {
      const b = a.R(this.B)
      b != null && this.oe != b.ke && ((b.ke = this.oe), Ra.sa(a.Ni, b))
    }

    P(a) {
      a.f(this.oe ? 1 : 0)
    }

    W(a) {
      this.oe = a.C() != 0
    }
  }
  class X extends m {
    constructor() {
      super()
    }

    apply(a) {
      this.B == 0 && eb.sa(a.Pi, this.Pa, this.color, this.style, this.ue)
    }

    P(a) {
      a.Tb(S.pb(this.Pa, 1e3))
      a.w(this.color)
      a.f(this.style)
      a.f(this.ue)
    }

    W(a) {
      this.Pa = a.lb()
      if (this.Pa.length > 1e3) throw t.s('message too long')
      this.color = a.H()
      this.style = a.C()
      this.ue = a.C()
    }

    static V(a, b, c, d) {
      const e = new X()
      e.Pa = a
      e.color = b
      e.style = c
      e.ue = d
      return e
    }
  }
  class Da extends m {
    constructor() {
      super()
    }

    apply(a) {
      if (a.za(this.B)) {
        for (
          var b = a.R(this.B), c = a.ba, d = [], e = 0, f = 0, g = 0;
          g < c.length;

        ) {
          const k = c[g]
          ++g
          k.ja == u.na && d.push(k)
          k.ja == u.fa ? ++e : k.ja == u.ta && ++f
        }
        c = d.length
        c != 0 &&
          (f == e
            ? c < 2 || (a.Hc(b, d[0], u.fa), a.Hc(b, d[1], u.ta))
            : a.Hc(b, d[0], f > e ? u.fa : u.ta))
      }
    }

    P() {}
    W() {}
  }
  class T extends m {
    constructor() {
      super()
    }

    apply(a) {
      if (a.za(this.B) && a.D == null) {
        switch (this.te) {
          case 0:
            var b = this.newValue
            a.ab = b < 0 ? 0 : b > 99 ? 99 : b
            break
          case 1:
            ;(b = this.newValue), (a.Na = b < 0 ? 0 : b > 99 ? 99 : b)
        }
      }
    }

    P(a) {
      a.w(this.te)
      a.w(this.newValue)
    }

    W(a) {
      this.te = a.H()
      this.newValue = a.H()
    }

    static V(a, b) {
      const c = new T()
      c.te = a
      c.newValue = b
      return c
    }
  }
  class Z extends m {
    constructor() {
      super()
    }

    apply(a) {
      if (a.za(this.B)) {
        const b = a.R(this.B)
        var c = a.R(this.Fb)
        c != null &&
          c.ma != 0 &&
          c.Ub != this.sd &&
          ((c.Ub = this.sd), a.tf != null && a.tf(b, c))
      }
    }

    P(a) {
      a.w(this.Fb)
      a.f(this.sd ? 1 : 0)
    }

    W(a) {
      this.Fb = a.H()
      this.sd = a.C() != 0
    }

    static V(a, b) {
      const c = new Z()
      c.Fb = a
      c.sd = b
      return c
    }
  }
  class Fa extends m {
    constructor() {
      super()
    }

    apply(a) {
      a = a.R(this.B)
      a != null && (a.Db = this.Ea)
    }

    P(a) {
      a.Ca(this.Ea)
    }

    W(a) {
      this.Ea = a.Ya()
      this.Ea != null && (this.Ea = S.pb(this.Ea, 2))
    }
  }
  class aa extends m {
    constructor() {
      super()
    }

    apply(a) {
      const b = a.R(this.Fb)
      if (b != null) {
        const c = a.R(this.B)
        var d = a.za(this.B)
        ;(d = d || (b == c && !a.nd && a.D == null)) && a.Hc(c, b, this.pe)
      }
    }

    P(a) {
      a.w(this.Fb)
      a.f(this.pe.S)
    }

    W(a) {
      this.Fb = a.H()
      a = a.Rd()
      this.pe = a == 1 ? u.fa : a == 2 ? u.ta : u.na
    }

    static V(a, b) {
      const c = new aa()
      c.Fb = a
      c.pe = b
      return c
    }
  }
  class U extends m {
    constructor() {
      super()
    }

    apply(a) {
      if (a.za(this.B)) {
        const b = a.R(this.B)
        a.D == null && ((a.ea = this.ud), a.If != null && a.If(b, this.ud))
      }
    }

    P(a) {
      let b = A.aa()
      this.ud.G(b)
      b = pako.deflateRaw(b.Bb())
      a.Oa(b.byteLength)
      a.ob(b)
    }

    W(a) {
      a = pako.inflateRaw(a.La(a.kc()))
      this.ud = w.pa(new M(new DataView(a.buffer, a.byteOffset, a.byteLength)))
    }

    static V(a) {
      const b = new U()
      b.ud = a
      return b
    }
  }
  class ma extends m {
    constructor() {
      super()
    }

    apply(a) {
      a.za(this.B) && this.ja != u.na && (a.sc[this.ja.S] = this.rd)
    }

    P(a) {
      a.f(this.ja.S)
      this.rd.G(a)
    }

    W(a) {
      const b = a.Rd()
      this.ja = b == 1 ? u.fa : b == 2 ? u.ta : u.na
      this.rd = new ca()
      this.rd.pa(a)
    }
  }
  class qa extends m {
    constructor() {
      super()
    }

    apply(a) {
      if (a.za(this.B)) {
        const b = a.nd
        a.nd = this.newValue
        b != this.newValue && Ua.sa(a.li, a.R(this.B), this.newValue)
      }
    }

    P(a) {
      a.f(this.newValue ? 1 : 0)
    }

    W(a) {
      this.newValue = a.C() != 0
    }
  }
  class ha extends m {
    constructor() {
      super()
    }

    apply(a) {
      if (this.B == 0) {
        const b = new xa()
        b.ma = this.ma
        b.oa = this.name
        b.country = this.je
        b.Db = this.Db
        a.ba.push(b)
        a = a.Hh
        a != null && a(b)
      }
    }

    P(a) {
      a.w(this.ma)
      a.Ca(this.name)
      a.Ca(this.je)
      a.Ca(this.Db)
    }

    W(a) {
      this.ma = a.H()
      this.name = a.Ya()
      this.je = a.Ya()
      this.Db = a.Ya()
    }

    static V(a, b, c, d) {
      const e = new ha()
      e.ma = a
      e.name = b
      e.je = c
      e.Db = d
      return e
    }
  }
  class ba extends m {
    constructor() {
      super()
    }

    apply(a) {
      a = a.R(this.rb)
      a != null && this.B == 0 && (a.Wf = this.Ea)
    }

    P(a) {
      a.Ca(this.Ea)
      a.w(this.rb)
    }

    W(a) {
      this.Ea = a.Ya()
      this.rb = a.H()
      this.Ea != null && (this.Ea = S.pb(this.Ea, 2))
    }

    static V(a, b) {
      const c = new ba()
      c.Ea = b != null ? S.pb(b, 2) : null
      c.rb = a
      return c
    }
  }
  class pa extends m {
    constructor() {
      super()
    }

    apply(a) {
      const b = a.D
      if (b != null && a.za(this.B)) {
        const c = a.R(this.B)
        var d = b.Xa == 120
        var e = b.Xa > 0
        this.wc ? (b.Xa = 120) : b.Xa == 120 && (b.Xa = 119)
        d != this.wc && lb.sa(a.Fh, c, this.wc, e)
      }
    }

    P(a) {
      a.f(this.wc ? 1 : 0)
    }

    W(a) {
      this.wc = a.C() != 0
    }
  }
  class la extends m {
    constructor() {
      super()
    }

    eg(a) {
      if (a.uf != null) {
        const b = a.R(this.B)
        return b == null ? !1 : a.uf(b, this.Pa)
      }
      return !0
    }

    apply(a) {
      const b = a.R(this.B)
      b != null && Ua.sa(a.Mi, b, this.Pa)
    }

    P(a) {
      a.Tb(S.pb(this.Pa, 140))
    }

    W(a) {
      this.Pa = a.lb()
      if (this.Pa.length > 140) throw t.s('message too long')
    }
  }
  class Ca extends m {
    constructor() {
      super()
    }

    apply(a) {
      const b = a.R(this.B)
      if (b != null) {
        const c = this.input(b.Jb & 16) == 0 && (c & 16) != 0 && (b.Cb = !0)
        b.Jb = c
        a.vf != null && b.N != null && a.vf(b, this.input, this.fg, this.gg)
      }
    }

    P(a) {
      a.xa(this.input)
    }

    W(a) {
      this.input = a.Ob()
    }
  }
  class Ba extends m {
    constructor() {
      super()
    }

    apply(a) {
      const b = a.R(this.B)
      b != null && Ua.sa(a.Oi, b, this.hg)
    }

    P(a) {
      a.f(this.hg)
    }

    W(a) {
      this.hg = a.C()
    }
  }
  class R extends m {
    constructor() {
      m.Ja = !0
      super()
      m.Ja = !1
      this.Aa()
    }

    Aa() {
      this.pd = !1
      super.Aa()
    }

    apply(a) {
      if (this.ma != 0 && a.za(this.B)) {
        const b = a.R(this.ma)
        if (b != null) {
          const c = a.R(this.B)
          P.remove(a.ba, b)
          a.D != null && P.remove(a.D.ia.A, b.N)
          eb.sa(a.Ih, b, this.qb, this.pd, c)
        }
      }
    }

    P(a) {
      this.qb != null && (this.qb = S.pb(this.qb, 100))
      a.w(this.ma)
      a.Ca(this.qb)
      a.f(this.pd ? 1 : 0)
    }

    W(a) {
      this.ma = a.H()
      this.qb = a.Ya()
      this.pd = a.C() != 0
      if (this.qb != null && this.qb.length > 100) throw t.s('string too long')
    }

    static V(a, b, c) {
      const d = new R()
      d.ma = a
      d.qb = b
      d.pd = c
      return d
    }
  }
  class ea extends m {
    constructor() {
      super()
    }

    apply(a) {
      if (this.B == 0) {
        for (var b = new Map(), c = 0, d = a.ba; c < d.length; ) {
          var e = d[c]
          ++c
          b.set(e.ma, e)
        }
        c = []
        d = 0
        for (e = this.vc; d < e.length; ) {
          var f = e[d]
          ++d
          const g = b.get(f)
          g != null && (b.delete(f), c.push(g))
        }
        d = []
        b = b.values()
        for (e = b.next(); !e.done; ) (f = e.value), (e = b.next()), d.push(f)
        a.ba = this.qe ? c.concat(d) : d.concat(c)
      }
    }

    P(a) {
      a.f(this.qe ? 1 : 0)
      a.f(this.vc.length)
      let b = 0
      let c = this.vc
      for (; b < c.length; ) a.w(c[b++])
    }

    W(a) {
      this.qe = a.C() != 0
      const b = a.C()
      this.vc = []
      let c = 0
      for (; c < b; ) ++c, this.vc.push(a.H())
    }

    static V(a, b) {
      const c = new ea()
      for (var d = new Set(), e = 0; e < a.length; ) d.add(a[e++])
      a = []
      e = 0
      d = d.values()
      let f = d.next()
      for (; !f.done; ) {
        const g = f.value
        f = d.next()
        a.push(g)
        ++e
        if (e >= 40) break
      }
      c.vc = a
      c.qe = b
      return c
    }
  }
  class L extends m {
    constructor() {
      super()
    }

    apply(a) {
      if (this.B == 0) {
        const b = a.D
        if (b != null) {
          if (this.me) {
            a = a.R(this.rb)
            if (a == null) return
            a = a.N
          } else a = b.ia.A[this.rb]
          a != null &&
            (this.O[0] != null && (a.a.x = this.O[0]),
            this.O[1] != null && (a.a.y = this.O[1]),
            this.O[2] != null && (a.u.x = this.O[2]),
            this.O[3] != null && (a.u.y = this.O[3]),
            this.O[4] != null && (a.la.x = this.O[4]),
            this.O[5] != null && (a.la.y = this.O[5]),
            this.O[6] != null && (a.M = this.O[6]),
            this.O[7] != null && (a.i = this.O[7]),
            this.O[8] != null && (a.L = this.O[8]),
            this.O[9] != null && (a.ga = this.O[9]),
            this.ya[0] != null && (a.T = this.ya[0]),
            this.ya[1] != null && (a.c = this.ya[1]),
            this.ya[2] != null && (a.m = this.ya[2]))
        }
      }
    }

    P(a) {
      a.w(this.rb)
      a.f(this.me ? 1 : 0)
      const b = a.a
      a.Oa(0)
      let c = 0
      for (var d = 1, e = 0, f = this.O; e < f.length; ) {
        var g = f[e]
        ++e
        g != null && ((c |= d), a.ce(g))
        d <<= 1
      }
      e = 0
      for (f = this.ya; e < f.length; ) {
        ;(g = f[e]), ++e, g != null && ((c |= d), a.w(g)), (d <<= 1)
      }
      d = a.a
      a.a = b
      a.Oa(c)
      a.a = d
    }

    W(a) {
      this.rb = a.H()
      this.me = a.C() != 0
      let b = a.kc()
      this.O = []
      for (var c = 0; c < 10; ) {
        var d = c++
        this.O[d] = null(b & 1) != 0 && (this.O[d] = a.Rh())
        b >>>= 1
      }
      this.ya = []
      for (c = 0; c < 3; ) {
        ;(d = c++),
          (this.ya[d] = null),
          0 != (b & 1) && (this.ya[d] = a.H()),
          (b >>>= 1)
      }
    }

    static cg(a, b, c) {
      const d = new L()
      d.rb = a
      d.me = b
      d.O = [
        c.x,
        c.y,
        c.xspeed,
        c.yspeed,
        c.xgravity,
        c.ygravity,
        c.radius,
        c.bCoeff,
        c.invMass,
        c.damping
      ]
      d.ya = [c.color, c.cMask, c.cGroup]
      a = 0
      for (b = d.O.length; a < b; ) {
        c = a++
        var e = d.O[c]
        e != null && ((L.Yf[0] = e), (d.O[c] = L.Yf[0]))
      }
      a = 0
      for (b = d.ya.length; a < b; ) {
        ;(c = a++),
          (e = d.ya[c]),
          null != e && ((L.ag[0] = e), (d.ya[c] = L.ag[0]))
      }
      return d
    }
  }
  class da extends m {
    constructor() {
      super()
    }

    apply(a) {
      a.za(this.B) && a.di(a.R(this.B), this.min, this.rate, this.he)
    }

    P(a) {
      a.w(this.min)
      a.w(this.rate)
      a.w(this.he)
    }

    W(a) {
      this.min = a.H()
      this.rate = a.H()
      this.he = a.H()
    }

    static V(a, b, c) {
      const d = new da()
      d.min = a
      d.rate = b
      d.he = c
      return d
    }
  }
  class na extends m {
    constructor() {
      super()
    }

    apply(a) {
      a.za(this.B) && a.hi(a.R(this.B))
    }

    P() {}
    W() {}
  }
  class oa extends m {
    constructor() {
      super()
    }

    apply(a) {
      if (a.za(this.B)) {
        const b = a.R(this.B)
        if (a.D != null) {
          a.D = null
          let c = 0
          let d = a.ba
          for (; c < d.length; ) {
            const e = d[c]
            ++c
            e.N = null
            e.Eb = 0
          }
          a.md != null && a.md(b)
        }
      }
    }

    P() {}
    W() {}
  }
  class fa extends m {
    constructor() {
      super()
    }

    apply(a) {
      if (this.B == 0) {
        a = a.ba
        for (let b = 0, c = a.length; b < c; ) {
          const d = b++
          if (d >= this.Xb.length) break
          a[d].ad = this.Xb[d]
        }
      }
    }

    P(a) {
      a.Da(this.Xb.length)
      let b = 0
      let c = this.Xb
      for (; b < c.length; ) a.Da(c[b++])
    }

    W(a) {
      this.Xb = []
      const b = a.mb()
      let c = 0
      for (; c < b; ) ++c, this.Xb.push(a.mb())
    }

    static V(a) {
      const b = new fa()
      let c = a.Fa.ba
      let d = []
      let e = 0
      for (; e < c.length; ) {
        const f = a.wb.get(c[e++].ma)
        d.push(f == null ? 0 : f.ad)
      }
      b.Xb = d
      return b
    }
  }
  class t extends Error {
    constructor(a, b, c) {
      super(a)
      this.message = a
      this.Fe = c != null ? c : this
    }

    Hb() {
      return this.Fe
    }

    toString() {
      return this.message
    }

    static Vb(a) {
      return a instanceof t
        ? a
        : a instanceof Error
        ? new t(a.message, null, a)
        : new Ma(a, null, a)
    }

    static s(a) {
      return a instanceof t ? a.Fe : a instanceof Error ? a : new Ma(a)
    }
  }
  class Ma extends t {
    constructor(a, b, c) {
      super(String(a), b, c)
      this.value = a
    }

    Hb() {
      return this.value
    }
  }
  var fb = fb || {}
  var gb
  P.b = !0
  Math.b = !0
  ob.b = !0
  Ta.b = !0
  sb.b = !0
  S.b = !0
  Ja.b = !0
  Object.assign(Ja.prototype, { h: Ja })
  var ta = (fb['bas.basnet.ConnectionRequestResponse'] = {
    Be: !0,
    Ae: null,
    ye: {
      Xe: 'Accept',
      Gd: 0,
      Yb: 'bas.basnet.ConnectionRequestResponse',
      toString: nb
    },
    yc:
      ((gb = function (a) {
        return {
          Gd: 1,
          reason: a,
          Yb: 'bas.basnet.ConnectionRequestResponse',
          toString: nb
        }
      }),
      (gb.Xe = 'Reject'),
      (gb.Ge = ['reason']),
      gb)
  })
  ta.Ae = [ta.ye, ta.yc]
  Ka.b = !0
  Object.assign(Ka.prototype, { h: Ka })
  pb.b = !0
  cb.b = !0
  Object.assign(cb.prototype, { h: cb })
  M.b = !0
  Object.assign(M.prototype, { h: M })
  A.b = !0
  Object.assign(A.prototype, { h: A })
  ra.b = !0
  za.b = !0
  tb.b = !0
  m.b = !0
  Object.assign(m.prototype, { h: m })
  db.b = !0
  Object.assign(db.prototype, { h: db })
  O.b = !0
  Object.assign(O.prototype, { h: O })
  sa.b = !0
  sa.J = m
  Object.assign(sa.prototype, { h: sa })
  Va.b = !0
  Va.De = !0
  Object.assign(Va.prototype, { h: Va })
  $a.b = !0
  Object.assign($a.prototype, { h: $a })
  ia.b = !0
  ia.De = !0
  La.b = !0
  La.J = O
  Object.assign(La.prototype, { h: La })
  Oa.b = !0
  Oa.J = La
  Object.assign(Oa.prototype, { h: Oa })
  ab.b = !0
  Object.assign(ab.prototype, { h: ab })
  bb.b = !0
  Object.assign(bb.prototype, { h: bb })
  kb.b = !0
  ib.b = !0
  Object.assign(ib.prototype, { h: ib })
  I.b = !0
  Object.assign(I.prototype, { h: I })
  V.b = !0
  Ra.b = !0
  Ua.b = !0
  lb.b = !0
  eb.b = !0
  Pa.b = !0
  Object.assign(Pa.prototype, { h: Pa })
  W.b = !0
  Object.assign(W.prototype, { h: W })
  ya.b = !0
  E.b = !0
  Wa.b = !0
  Object.assign(Wa.prototype, { h: Wa })
  ja.b = !0
  Object.assign(ja.prototype, { h: ja })
  Q.b = !0
  Q.sb = [ia]
  Object.assign(Q.prototype, { h: Q })
  Aa.b = !0
  Object.assign(Aa.prototype, { h: Aa })
  Qa.b = !0
  Object.assign(Qa.prototype, { h: Qa })
  Ia.b = !0
  Object.assign(Ia.prototype, { h: Ia })
  w.b = !0
  Object.assign(w.prototype, { h: w })
  ca.b = !0
  Object.assign(ca.prototype, { h: ca })
  u.b = !0
  Object.assign(u.prototype, { h: u })
  Na.b = !0
  Na.sb = [ia, Va]
  Object.assign(Na.prototype, { h: Na })
  xa.b = !0
  xa.sb = [ia]
  Object.assign(xa.prototype, { h: xa })
  Ea.b = !0
  Ea.J = m
  Object.assign(Ea.prototype, { h: Ea })
  X.b = !0
  X.J = m
  Object.assign(X.prototype, { h: X })
  Da.b = !0
  Da.J = m
  Object.assign(Da.prototype, { h: Da })
  T.b = !0
  T.J = m
  Object.assign(T.prototype, { h: T })
  Z.b = !0
  Z.J = m
  Object.assign(Z.prototype, { h: Z })
  Fa.b = !0
  Fa.J = m
  Object.assign(Fa.prototype, { h: Fa })
  aa.b = !0
  aa.J = m
  Object.assign(aa.prototype, { h: aa })
  U.b = !0
  U.J = m
  Object.assign(U.prototype, { h: U })
  ma.b = !0
  ma.J = m
  Object.assign(ma.prototype, { h: ma })
  qa.b = !0
  qa.J = m
  Object.assign(qa.prototype, { h: qa })
  ha.b = !0
  ha.J = m
  Object.assign(ha.prototype, { h: ha })
  ba.b = !0
  ba.J = m
  Object.assign(ba.prototype, { h: ba })
  pa.b = !0
  pa.J = m
  Object.assign(pa.prototype, { h: pa })
  la.b = !0
  la.J = m
  Object.assign(la.prototype, { h: la })
  Ca.b = !0
  Ca.J = m
  Object.assign(Ca.prototype, { h: Ca })
  Ba.b = !0
  Ba.J = m
  Object.assign(Ba.prototype, { h: Ba })
  qb.b = !0
  R.b = !0
  R.J = m
  Object.assign(R.prototype, { h: R })
  ea.b = !0
  ea.J = m
  Object.assign(ea.prototype, { h: ea })
  L.b = !0
  L.J = m
  Object.assign(L.prototype, { h: L })
  da.b = !0
  da.J = m
  Object.assign(da.prototype, { h: da })
  na.b = !0
  na.J = m
  Object.assign(na.prototype, { h: na })
  oa.b = !0
  oa.J = m
  Object.assign(oa.prototype, { h: oa })
  fa.b = !0
  fa.J = m
  Object.assign(fa.prototype, { h: fa })
  Ga.b = !0
  Ga.sb = [ia]
  Object.assign(Ga.prototype, { h: Ga })
  Ha.b = !0
  Ha.sb = [ia]
  Object.assign(Ha.prototype, { h: Ha })
  Sa.b = !0
  Sa.sb = [ia]
  Object.assign(Sa.prototype, { h: Sa })
  K.b = !0
  Object.assign(K.prototype, { h: K })
  G.b = !0
  Object.assign(G.prototype, { h: G })
  B.b = !0
  Object.assign(B.prototype, { h: B })
  t.b = !0
  t.J = Error
  Object.assign(t.prototype, { h: t })
  Ma.b = !0
  Ma.J = t
  Object.assign(Ma.prototype, { h: Ma })
  mb.b = !0
  Object.assign(mb.prototype, { h: mb })
  q.b = !0
  ua.xe |= 0
  'undefined' !== typeof performance &&
    typeof performance.now === 'function' &&
    (P.now = performance.now.bind(performance))
  String.fromCodePoint == null &&
    (String.fromCodePoint = function (a) {
      return a < 65536
        ? String.fromCharCode(a)
        : String.fromCharCode((a >> 10) + 55232) +
            String.fromCharCode((a & 1023) + 56320)
    })
  Object.defineProperty(String.prototype, '__class__', {
    value: String,
    enumerable: !1,
    writable: !0
  })
  String.b = !0
  Array.b = !0
  var wa = {}
  var ub = {}
  var z = Number
  var Za = Boolean
  var vb = {}
  var wb = {}
  u.na = new u(0, 16777215, 0, -1, 'Spectators', 't-spec', 0, 0)
  u.fa = new u(1, 15035990, -1, 8, 'Red', 't-red', 15035990, 2)
  u.ta = new u(2, 5671397, 1, 16, 'Blue', 't-blue', 625603, 4)
  u.na.$c = u.na
  u.fa.$c = u.ta
  u.ta.$c = u.fa
  q.qg = {}.toString
  Ja.Gg = { mandatory: { OfferToReceiveAudio: !1, OfferToReceiveVideo: !1 } }
  ra.tg = { name: 'ECDSA', namedCurve: 'P-256' }
  ra.fi = { name: 'ECDSA', hash: { name: 'SHA-256' } }
  m.Ja = !1
  m.$f = new Map()
  m.fe = 0
  O.Ja = !1
  sa.U = m.Z({ ca: !1, delay: !1 })
  kb.channels = [
    { name: 'ro', reliable: !0, ordered: !0 },
    { name: 'ru', reliable: !0, ordered: !1 },
    { name: 'uu', reliable: !1, ordered: !1 }
  ]
  V.ig = 'application/x-www-form-urlencoded'
  ya.Ke = 'https://www.haxball.com/rs/'
  ya.Id = [{ urls: 'stun:stun.l.google.com:19302' }]
  E.Se = new W()
  E.Gf = !1
  Q.jf = (function () {
    const a = []
    {
      let b = 0
      for (; b < 256; ) ++b, a.push(new I(0, 0))
    }
    return a
  })(this)
  Q.Re = (function () {
    const a = []
    {
      let b = 0
      for (; b < 256; ) ++b, a.push(0)
    }
    return a
  })(this)
  Ea.U = m.Z({ ca: !1, delay: !1 })
  X.U = m.Z({ ca: !1, delay: !1, se: { ge: 10, we: 900 } })
  Da.U = m.Z({ ca: !1, delay: !1 })
  T.U = m.Z({ ca: !1, delay: !1 })
  Z.U = m.Z({ ca: !1, delay: !1 })
  Fa.U = m.Z({ ca: !1, delay: !1 })
  aa.U = m.Z({ ca: !1, delay: !1 })
  U.U = m.Z({ ca: !1, delay: !1, se: { ge: 10, we: 2e3 } })
  ma.U = m.Z({ ca: !1, delay: !1 })
  qa.U = m.Z({ ca: !1, delay: !1 })
  ha.U = m.Z({ ca: !1, delay: !1 })
  ba.U = m.Z({ ca: !1, delay: !1 })
  pa.U = m.Z({})
  la.U = m.Z({ ca: !1, delay: !1, se: { ge: 10, we: 900 } })
  Ca.U = m.Z({})
  Ba.U = m.Z({ ca: !1, delay: !1 })
  R.U = m.Z({ ca: !1, delay: !1 })
  ea.U = m.Z({ ca: !1, delay: !1 })
  L.U = m.Z({ ca: !1, delay: !1 })
  L.Yf = new Float32Array(1)
  L.ag = new Int32Array(1)
  da.U = m.Z({ ca: !1, delay: !1 })
  na.U = m.Z({ ca: !1, delay: !1 })
  oa.U = m.Z({ ca: !1, delay: !1 })
  fa.U = m.Z({ ca: !1, delay: !1 })
  G.kg = 0.17435839227423353
  G.jg = 5.934119456780721
  E.vh()
})(global)
/* eslint-enable */

export default await HBLoaded
