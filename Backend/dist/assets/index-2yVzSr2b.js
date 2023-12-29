import * as R from "react";
import j, {
  useState as m,
  createContext as vr,
  useContext as xr,
  useEffect as ee,
} from "react";
import Cr from "react-dom";
import {
  useDispatch as Z,
  useSelector as K,
  Provider as br,
} from "react-redux";
import {
  createSlice as Ae,
  combineReducers as jr,
  configureStore as wr,
} from "@reduxjs/toolkit";
import M from "axios";
import {
  Router as Sr,
  UNSAFE_NavigationContext as Pr,
  useHref as Er,
  useNavigate as se,
  useLocation as kr,
  useResolvedPath as Ar,
  createPath as Pt,
  Routes as Tr,
  Route as q,
} from "react-router";
import { useEffect as Et } from "@react";
import {
  Input as A,
  Button as E,
  Dropdown as Or,
  Space as Rr,
  Spin as Ir,
  Select as be,
  Steps as Nr,
  Radio as Lr,
} from "antd";
import {
  FaHome as Mr,
  FaQuestionCircle as Fr,
  FaAddressCard as Ur,
  FaPlus as Dr,
  FaShoppingBasket as un,
  FaHeart as Ge,
  FaUser as _r,
  FaList as Br,
} from "react-icons/fa";
import { FaMagnifyingGlass as $r } from "react-icons/fa6";
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) a(o);
  new MutationObserver((o) => {
    for (const s of o)
      if (s.type === "childList")
        for (const i of s.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && a(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const s = {};
    return (
      o.integrity && (s.integrity = o.integrity),
      o.referrerPolicy && (s.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (s.credentials = "include")
        : o.crossOrigin === "anonymous"
        ? (s.credentials = "omit")
        : (s.credentials = "same-origin"),
      s
    );
  }
  function a(o) {
    if (o.ep) return;
    o.ep = !0;
    const s = n(o);
    fetch(o.href, s);
  }
})();
function fn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var pn = { exports: {} },
  Ve = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Hr = j,
  zr = Symbol.for("react.element"),
  Wr = Symbol.for("react.fragment"),
  Gr = Object.prototype.hasOwnProperty,
  Vr = Hr.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Kr = { key: !0, ref: !0, __self: !0, __source: !0 };
function hn(e, t, n) {
  var a,
    o = {},
    s = null,
    i = null;
  n !== void 0 && (s = "" + n),
    t.key !== void 0 && (s = "" + t.key),
    t.ref !== void 0 && (i = t.ref);
  for (a in t) Gr.call(t, a) && !Kr.hasOwnProperty(a) && (o[a] = t[a]);
  if (e && e.defaultProps)
    for (a in ((t = e.defaultProps), t)) o[a] === void 0 && (o[a] = t[a]);
  return {
    $$typeof: zr,
    type: e,
    key: s,
    ref: i,
    props: o,
    _owner: Vr.current,
  };
}
Ve.Fragment = Wr;
Ve.jsx = hn;
Ve.jsxs = hn;
pn.exports = Ve;
var r = pn.exports,
  it = {},
  kt = Cr;
(it.createRoot = kt.createRoot), (it.hydrateRoot = kt.hydrateRoot);
const At = [],
  mn = Ae({
    name: "user",
    initialState: At,
    reducers: {
      appendUser(e, t) {
        e.push(t.payload);
      },
      clearUser() {
        return At;
      },
      setUser(e, t) {
        return t.payload;
      },
    },
  }),
  { appendUser: gn, clearUser: yn, setUser: qr } = mn.actions,
  Yr = mn.reducer,
  F = "http://localhost:3003";
let N = null;
const vn = (e) => {
    (N = `Bearer ${e}`), console.log(N);
  },
  Jr = async (e, t) => {
    console.log(e, t);
    try {
      const n = await M.post(`${F}/api/login`, { email: e, password: t }),
        a = n.data.token;
      return vn(a), console.log(n.data), console.log("palautetaan"), n.data;
    } catch (n) {
      throw (console.log("Error", n), { error: n.response.data.error });
    }
  },
  Zr = async (e) => {
    try {
      return (
        console.log("axios", e),
        console.log(e.phone),
        (await M.post(`${F}/api/users`, { newObject: e })).data
      );
    } catch (t) {
      throw (console.log("Error", t), { error: t.response.data.error });
    }
  },
  Qr = async (e, t, n, a, o, s, i) => {
    const l = {
        name: e,
        country: t,
        price: n,
        currency: a,
        category: o,
        description: s,
        pics: i,
      },
      c = { headers: { Authorization: N } };
    console.log("Token before request:", N);
    try {
      return (await M.post(`${F}/api/listings`, l, c)).data;
    } catch (d) {
      throw { error: d.response.data.error };
    }
  },
  Xr = async () => {
    try {
      return (await M.get(`${F}/api/listings`)).data;
    } catch (e) {
      throw { error: e.response.data.error };
    }
  },
  ea = async (e) => {
    const t = { headers: { Authorization: N } };
    try {
      console.log(e);
      const n = await M.post(`${F}/api/cart`, { id: e }, t);
      return console.log("Response ", n.data), n.data;
    } catch (n) {
      throw (console.log("Error", n), n.response.data.error);
    }
  },
  ta = async () => {
    try {
      let e = { headers: { Authorization: N } };
      for (; !N; ) await new Promise((n) => setTimeout(n, 100));
      return (
        (e = { headers: { Authorization: N } }),
        (await M.get(`${F}/api/cart`, e)).data
      );
    } catch (e) {
      throw { error: e.response.data.error };
    }
  },
  na = async () => {
    try {
      return (await M.get(`${F}/images`)).data;
    } catch (e) {
      throw { error: e.response.data.error };
    }
  },
  xn = async (e) => {
    const t = { headers: { Authorization: N } };
    try {
      const n = await M.delete(`${F}/api/cart/${e}`, t);
      return console.log(n.data), n.data;
    } catch (n) {
      throw (console.log(n), { error: n.response.data.error });
    }
  },
  we = async () => {
    try {
      let e = { headers: { Authorization: N } };
      for (; !N; ) await new Promise((n) => setTimeout(n, 100));
      (e = { headers: { Authorization: N } }), console.log(e);
      const t = await M.get(`${F}/api/users/info`, e);
      return console.log(t), t.data;
    } catch (e) {
      throw (console.log(e), e.response);
    }
  },
  Cn = async () => {
    try {
      let e = { headers: { Authorization: N } };
      for (; !N; ) await new Promise((n) => setTimeout(n, 100));
      return (
        (e = { headers: { Authorization: N } }),
        (await M.get(`${F}/api/favorite`, e)).data
      );
    } catch (e) {
      throw { error: e.response.data.error };
    }
  },
  bn = async (e) => {
    const t = { headers: { Authorization: N } };
    try {
      return (
        console.log(e), (await M.post(`${F}/api/favorite`, { id: e }, t)).data
      );
    } catch (n) {
      throw { error: n.response.data.error };
    }
  },
  jn = async (e) => {
    const t = { headers: { Authorization: N } };
    try {
      return (await M.delete(`${F}/api/favorite/${e}`, t)).data;
    } catch (n) {
      throw { error: n.response.data.error };
    }
  },
  ra = async (e, t, n, a) => {
    const o = { headers: { Authorization: N } },
      s = { email: e, name: t, address: n, phone: a };
    console.log(N), console.log(s);
    try {
      return (await M.put(`${F}/api/users/`, s, o)).data;
    } catch (i) {
      throw (
        (console.log("Error", i),
        console.log("Data", i.response.data.error),
        { error: i.response.data.error })
      );
    }
  },
  aa = async (e) => {
    try {
      const t = { headers: { Authorization: N } };
      return (await M.put(`${F}/api/users/password`, { password: e }, t)).data;
    } catch (t) {
      throw { error: t.response.data.error };
    }
  },
  oa = async () => {
    try {
      const e = { headers: { Authorization: N } };
      return (await M.delete(`${F}/api/users`, e)).data;
    } catch (e) {
      throw { error: e.response.data.error };
    }
  },
  wn = async () => {
    try {
      const e = { headers: { Authorization: N } };
      return (await M.get(`${F}/api/users/listings`, e)).data;
    } catch (e) {
      throw { error: e.response.data.error };
    }
  },
  sa = async (e, t, n, a, o) => {
    try {
      const s = { name: e, country: t, price: n, description: a, id: o };
      console.log("Yritetään päivittää");
      const i = { headers: { Authorization: N } };
      return (await M.put(`${F}/api/listings`, s, i)).data;
    } catch (s) {
      throw { error: s.response.data.error };
    }
  },
  Sn = async (e) => {
    try {
      const t = { headers: { Authorization: N } };
      return (await M.delete(`${F}/api/listings/${e}`, t)).data;
    } catch (t) {
      throw { error: t.response.data.error };
    }
  },
  ia = async (e, t) => {
    try {
      return (
        await M.post(`${F}/api/checkout/create-payment-intent`, {
          items: e,
          userId: t,
        })
      ).data;
    } catch (n) {
      throw { error: n.response.data.error };
    }
  },
  ca = async (e) => {
    try {
      return (await M.patch(`${F}/api/users/stripe`, e)).data;
    } catch (t) {
      throw { error: t.response.data.error };
    }
  },
  la = async (e) => {
    try {
      const t = { headers: { Authorization: N } };
      return (await M.put(`${F}/api/listings`, e, t)).data;
    } catch (t) {
      throw { error: t.response.data.error };
    }
  },
  da = async (e, t, n) => {
    try {
      return (
        await M.post(`${F}/api/email/buyer`, {
          email: e,
          sellerEmail: t,
          items: n,
        })
      ).data;
    } catch (a) {
      throw { error: a.response.data.error };
    }
  },
  ua = async (e, t, n) => {
    try {
      return (
        await M.post(`${F}/api/email/seller`, {
          email: e,
          sellerEmail: t,
          items: n,
        })
      ).data;
    } catch (a) {
      throw { error: a.response.data.error };
    }
  },
  me = { setToken: vn, getAllListings: Xr, getAllCartItems: ta, getImages: na },
  Pn = Ae({
    name: "listing",
    initialState: [],
    reducers: {
      appendlisting(e, t) {
        e.push(t.payload);
      },
      setlisting(e, t) {
        return t.payload;
      },
      clearListing() {
        return [];
      },
    },
  }),
  { appendlisting: fa, setlisting: pa, clearListing: ha } = Pn.actions,
  ct = () => async (e) => {
    const t = await me.getAllListings();
    e(pa(t));
  },
  ma = Pn.reducer;
/**
 * @remix-run/router v1.13.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function ze() {
  return (
    (ze = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n)
              Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
          }
          return e;
        }),
    ze.apply(this, arguments)
  );
}
var Ee;
(function (e) {
  (e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE");
})(Ee || (Ee = {}));
const Tt = "popstate";
function ga(e) {
  e === void 0 && (e = {});
  function t(a, o) {
    let { pathname: s, search: i, hash: l } = a.location;
    return lt(
      "",
      { pathname: s, search: i, hash: l },
      (o.state && o.state.usr) || null,
      (o.state && o.state.key) || "default"
    );
  }
  function n(a, o) {
    return typeof o == "string" ? o : En(o);
  }
  return Ca(t, n, null, e);
}
function ya(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function va() {
  return Math.random().toString(36).substr(2, 8);
}
function Ot(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function lt(e, t, n, a) {
  return (
    n === void 0 && (n = null),
    ze(
      { pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" },
      typeof t == "string" ? xa(t) : t,
      { state: n, key: (t && t.key) || a || va() }
    )
  );
}
function En(e) {
  let { pathname: t = "/", search: n = "", hash: a = "" } = e;
  return (
    n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
    a && a !== "#" && (t += a.charAt(0) === "#" ? a : "#" + a),
    t
  );
}
function xa(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let a = e.indexOf("?");
    a >= 0 && ((t.search = e.substr(a)), (e = e.substr(0, a))),
      e && (t.pathname = e);
  }
  return t;
}
function Ca(e, t, n, a) {
  a === void 0 && (a = {});
  let { window: o = document.defaultView, v5Compat: s = !1 } = a,
    i = o.history,
    l = Ee.Pop,
    c = null,
    d = p();
  d == null && ((d = 0), i.replaceState(ze({}, i.state, { idx: d }), ""));
  function p() {
    return (i.state || { idx: null }).idx;
  }
  function u() {
    l = Ee.Pop;
    let y = p(),
      S = y == null ? null : y - d;
    (d = y), c && c({ action: l, location: x.location, delta: S });
  }
  function g(y, S) {
    l = Ee.Push;
    let w = lt(x.location, y, S);
    n && n(w, y), (d = p() + 1);
    let C = Ot(w, d),
      b = x.createHref(w);
    try {
      i.pushState(C, "", b);
    } catch (P) {
      if (P instanceof DOMException && P.name === "DataCloneError") throw P;
      o.location.assign(b);
    }
    s && c && c({ action: l, location: x.location, delta: 1 });
  }
  function f(y, S) {
    l = Ee.Replace;
    let w = lt(x.location, y, S);
    n && n(w, y), (d = p());
    let C = Ot(w, d),
      b = x.createHref(w);
    i.replaceState(C, "", b),
      s && c && c({ action: l, location: x.location, delta: 0 });
  }
  function v(y) {
    let S = o.location.origin !== "null" ? o.location.origin : o.location.href,
      w = typeof y == "string" ? y : En(y);
    return (
      ya(
        S,
        "No window.location.(origin|href) available to create URL for href: " +
          w
      ),
      new URL(w, S)
    );
  }
  let x = {
    get action() {
      return l;
    },
    get location() {
      return e(o, i);
    },
    listen(y) {
      if (c) throw new Error("A history only accepts one active listener");
      return (
        o.addEventListener(Tt, u),
        (c = y),
        () => {
          o.removeEventListener(Tt, u), (c = null);
        }
      );
    },
    createHref(y) {
      return t(o, y);
    },
    createURL: v,
    encodeLocation(y) {
      let S = v(y);
      return { pathname: S.pathname, search: S.search, hash: S.hash };
    },
    push: g,
    replace: f,
    go(y) {
      return i.go(y);
    },
  };
  return x;
}
var Rt;
(function (e) {
  (e.data = "data"),
    (e.deferred = "deferred"),
    (e.redirect = "redirect"),
    (e.error = "error");
})(Rt || (Rt = {}));
function ba(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length,
    a = e.charAt(n);
  return a && a !== "/" ? null : e.slice(n) || "/";
}
const kn = ["post", "put", "patch", "delete"];
new Set(kn);
const ja = ["get", ...kn];
new Set(ja);
/**
 * React Router DOM v6.20.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function dt() {
  return (
    (dt = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n)
              Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
          }
          return e;
        }),
    dt.apply(this, arguments)
  );
}
function wa(e, t) {
  if (e == null) return {};
  var n = {},
    a = Object.keys(e),
    o,
    s;
  for (s = 0; s < a.length; s++)
    (o = a[s]), !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function Sa(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Pa(e, t) {
  return e.button === 0 && (!t || t === "_self") && !Sa(e);
}
const Ea = [
    "onClick",
    "relative",
    "reloadDocument",
    "replace",
    "state",
    "target",
    "to",
    "preventScrollReset",
    "unstable_viewTransition",
  ],
  ka = "startTransition",
  It = R[ka];
function Aa(e) {
  let { basename: t, children: n, future: a, window: o } = e,
    s = R.useRef();
  s.current == null && (s.current = ga({ window: o, v5Compat: !0 }));
  let i = s.current,
    [l, c] = R.useState({ action: i.action, location: i.location }),
    { v7_startTransition: d } = a || {},
    p = R.useCallback(
      (u) => {
        d && It ? It(() => c(u)) : c(u);
      },
      [c, d]
    );
  return (
    R.useLayoutEffect(() => i.listen(p), [i, p]),
    R.createElement(Sr, {
      basename: t,
      children: n,
      location: l.location,
      navigationType: l.action,
      navigator: i,
    })
  );
}
const Ta =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  Oa = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Ce = R.forwardRef(function (t, n) {
    let {
        onClick: a,
        relative: o,
        reloadDocument: s,
        replace: i,
        state: l,
        target: c,
        to: d,
        preventScrollReset: p,
        unstable_viewTransition: u,
      } = t,
      g = wa(t, Ea),
      { basename: f } = R.useContext(Pr),
      v,
      x = !1;
    if (typeof d == "string" && Oa.test(d) && ((v = d), Ta))
      try {
        let C = new URL(window.location.href),
          b = d.startsWith("//") ? new URL(C.protocol + d) : new URL(d),
          P = ba(b.pathname, f);
        b.origin === C.origin && P != null
          ? (d = P + b.search + b.hash)
          : (x = !0);
      } catch {}
    let y = Er(d, { relative: o }),
      S = Ra(d, {
        replace: i,
        state: l,
        target: c,
        preventScrollReset: p,
        relative: o,
        unstable_viewTransition: u,
      });
    function w(C) {
      a && a(C), C.defaultPrevented || S(C);
    }
    return R.createElement(
      "a",
      dt({}, g, { href: v || y, onClick: x || s ? a : w, ref: n, target: c })
    );
  });
var Nt;
(function (e) {
  (e.UseScrollRestoration = "useScrollRestoration"),
    (e.UseSubmit = "useSubmit"),
    (e.UseSubmitFetcher = "useSubmitFetcher"),
    (e.UseFetcher = "useFetcher"),
    (e.useViewTransitionState = "useViewTransitionState");
})(Nt || (Nt = {}));
var Lt;
(function (e) {
  (e.UseFetcher = "useFetcher"),
    (e.UseFetchers = "useFetchers"),
    (e.UseScrollRestoration = "useScrollRestoration");
})(Lt || (Lt = {}));
function Ra(e, t) {
  let {
      target: n,
      replace: a,
      state: o,
      preventScrollReset: s,
      relative: i,
      unstable_viewTransition: l,
    } = t === void 0 ? {} : t,
    c = se(),
    d = kr(),
    p = Ar(e, { relative: i });
  return R.useCallback(
    (u) => {
      if (Pa(u, n)) {
        u.preventDefault();
        let g = a !== void 0 ? a : Pt(d) === Pt(p);
        c(e, {
          replace: g,
          state: o,
          preventScrollReset: s,
          relative: i,
          unstable_viewTransition: l,
        });
      }
    },
    [d, c, p, a, o, n, e, s, i, l]
  );
}
const Mt = "",
  An = Ae({
    name: "Notifications",
    initialState: Mt,
    reducers: {
      addNotification: (e, t) => t.payload,
      clearNotification: () => Mt,
    },
  }),
  { addNotification: k, clearNotification: Ia } = An.actions,
  Na = An.reducer,
  La = ({
    handleLogin: e,
    handleRegister: t,
    setEmail: n,
    setPassword: a,
    email: o,
    password: s,
  }) =>
    r.jsx("div", {
      style: {
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      },
      children: r.jsxs("div", {
        children: [
          r.jsx("h1", { children: "Login" }),
          r.jsxs("form", {
            onSubmit: e,
            children: [
              r.jsx(A, {
                id: "input",
                type: "text",
                placeholder: "Email",
                autoComplete: "email",
                value: o,
                onChange: (i) => n(i.target.value),
              }),
              r.jsx(A, {
                id: "input",
                type: "password",
                placeholder: "Password",
                value: s,
                autoComplete: "current-password",
                onChange: (i) => a(i.target.value),
              }),
              r.jsxs("div", {
                id: "login",
                children: [
                  r.jsx(E, {
                    type: "primary",
                    id: "button",
                    htmlType: "submit",
                    children: "Log in",
                  }),
                  r.jsx("p", { children: "Forgot password?" }),
                ],
              }),
              r.jsx("div", {
                children: r.jsx(E, {
                  type: "primary",
                  id: "button",
                  onClick: () => t(),
                  children: "Register",
                }),
              }),
            ],
          }),
        ],
      }),
    }),
  Ma = () => {
    const e = se(),
      t = Z(),
      [n, a] = m(""),
      [o, s] = m(""),
      i = async (c) => {
        c.preventDefault();
        try {
          const d = await Jr(o, n);
          console.log("User Loginissa", d),
            t(gn(d)),
            console.log(d.token),
            me.setToken(d.token),
            window.sessionStorage.setItem(
              "loggedNoteappUser",
              JSON.stringify(d.token)
            ),
            e("/");
        } catch (d) {
          t(k(d.error));
        }
      },
      l = () => {
        e("/register");
      };
    return r.jsx(La, {
      handleLogin: i,
      handleRegister: l,
      setEmail: s,
      setPassword: a,
      email: o,
      password: n,
    });
  };
var Tn = {
    color: void 0,
    size: void 0,
    className: void 0,
    style: void 0,
    attr: void 0,
  },
  Ft = j.createContext && j.createContext(Tn),
  he = function () {
    return (
      (he =
        Object.assign ||
        function (e) {
          for (var t, n = 1, a = arguments.length; n < a; n++) {
            t = arguments[n];
            for (var o in t)
              Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
          }
          return e;
        }),
      he.apply(this, arguments)
    );
  },
  Fa = function (e, t) {
    var n = {};
    for (var a in e)
      Object.prototype.hasOwnProperty.call(e, a) &&
        t.indexOf(a) < 0 &&
        (n[a] = e[a]);
    if (e != null && typeof Object.getOwnPropertySymbols == "function")
      for (var o = 0, a = Object.getOwnPropertySymbols(e); o < a.length; o++)
        t.indexOf(a[o]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, a[o]) &&
          (n[a[o]] = e[a[o]]);
    return n;
  };
function On(e) {
  return (
    e &&
    e.map(function (t, n) {
      return j.createElement(t.tag, he({ key: n }, t.attr), On(t.child));
    })
  );
}
function Ct(e) {
  return function (t) {
    return j.createElement(Ua, he({ attr: he({}, e.attr) }, t), On(e.child));
  };
}
function Ua(e) {
  var t = function (n) {
    var a = e.attr,
      o = e.size,
      s = e.title,
      i = Fa(e, ["attr", "size", "title"]),
      l = o || n.size || "1em",
      c;
    return (
      n.className && (c = n.className),
      e.className && (c = (c ? c + " " : "") + e.className),
      j.createElement(
        "svg",
        he(
          { stroke: "currentColor", fill: "currentColor", strokeWidth: "0" },
          n.attr,
          a,
          i,
          {
            className: c,
            style: he(he({ color: e.color || n.color }, n.style), e.style),
            height: l,
            width: l,
            xmlns: "http://www.w3.org/2000/svg",
          }
        ),
        s && j.createElement("title", null, s),
        e.children
      )
    );
  };
  return Ft !== void 0
    ? j.createElement(Ft.Consumer, null, function (n) {
        return t(n);
      })
    : t(Tn);
}
function Da(e) {
  return Ct({
    tag: "svg",
    attr: { viewBox: "0 0 24 24" },
    child: [
      {
        tag: "g",
        attr: { id: "Credit_Card_1" },
        child: [
          {
            tag: "g",
            attr: {},
            child: [
              {
                tag: "path",
                attr: {
                  d: "M19.44,5.14H4.56a2.5,2.5,0,0,0-2.5,2.5v8.72a2.5,2.5,0,0,0,2.5,2.5H19.44a2.5,2.5,0,0,0,2.5-2.5V7.64A2.5,2.5,0,0,0,19.44,5.14ZM3.06,7.64a1.5,1.5,0,0,1,1.5-1.5H19.44a1.5,1.5,0,0,1,1.5,1.5v.5H3.06Zm17.88,8.72a1.5,1.5,0,0,1-1.5,1.5H4.56a1.5,1.5,0,0,1-1.5-1.5V9.64H20.94Z",
                },
              },
              {
                tag: "path",
                attr: {
                  d: "M8.063,14.247h-3a.5.5,0,1,1,0-1h3a.5.5,0,1,1,0,1Z",
                },
              },
              {
                tag: "path",
                attr: {
                  d: "M18.934,14.25h-6.5a.5.5,0,1,1,0-1h6.5a.5.5,0,0,1,0,1Z",
                },
              },
            ],
          },
        ],
      },
    ],
  })(e);
}
function _a(e) {
  return Ct({
    tag: "svg",
    attr: { viewBox: "0 0 24 24" },
    child: [
      {
        tag: "g",
        attr: { id: "Login" },
        child: [
          {
            tag: "g",
            attr: {},
            child: [
              {
                tag: "path",
                attr: {
                  d: "M20.944,18.432a2.577,2.577,0,0,1-2.729,2.5c-2.153.012-4.307,0-6.46,0a.5.5,0,0,1,0-1c2.2,0,4.4.032,6.6,0,1.107-.016,1.589-.848,1.589-1.838V5.63a1.545,1.545,0,0,0-.969-1.471,3.027,3.027,0,0,0-1.061-.095H11.755a.5.5,0,0,1,0-1c2.225,0,4.465-.085,6.688,0a2.566,2.566,0,0,1,2.5,2.67Z",
                },
              },
              {
                tag: "path",
                attr: {
                  d: "M15.794,12.354a.459.459,0,0,0,.138-.312A.3.3,0,0,0,15.938,12a.29.29,0,0,0-.006-.041.455.455,0,0,0-.138-.313L12.125,7.978a.5.5,0,0,0-.707.707L14.234,11.5H3.492a.5.5,0,0,0,0,1H14.234l-2.816,2.815a.5.5,0,0,0,.707.707Z",
                },
              },
            ],
          },
        ],
      },
    ],
  })(e);
}
var Ba = vr({});
const Rn = Ba;
function ue() {
  return (
    (ue = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n)
              Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
          }
          return e;
        }),
    ue.apply(this, arguments)
  );
}
function $a(e) {
  if (Array.isArray(e)) return e;
}
function Ha(e, t) {
  var n =
    e == null
      ? null
      : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (n != null) {
    var a,
      o,
      s,
      i,
      l = [],
      c = !0,
      d = !1;
    try {
      if (((s = (n = n.call(e)).next), t === 0)) {
        if (Object(n) !== n) return;
        c = !1;
      } else
        for (
          ;
          !(c = (a = s.call(n)).done) && (l.push(a.value), l.length !== t);
          c = !0
        );
    } catch (p) {
      (d = !0), (o = p);
    } finally {
      try {
        if (!c && n.return != null && ((i = n.return()), Object(i) !== i))
          return;
      } finally {
        if (d) throw o;
      }
    }
    return l;
  }
}
function Ut(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, a = new Array(t); n < t; n++) a[n] = e[n];
  return a;
}
function za(e, t) {
  if (e) {
    if (typeof e == "string") return Ut(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (n === "Object" && e.constructor && (n = e.constructor.name),
      n === "Map" || n === "Set")
    )
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return Ut(e, t);
  }
}
function Wa() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function In(e, t) {
  return $a(e) || Ha(e, t) || za(e, t) || Wa();
}
function je(e) {
  "@babel/helpers - typeof";
  return (
    (je =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    je(e)
  );
}
function Ga(e, t) {
  if (je(e) !== "object" || e === null) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t || "default");
    if (je(a) !== "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Va(e) {
  var t = Ga(e, "string");
  return je(t) === "symbol" ? t : String(t);
}
function ut(e, t, n) {
  return (
    (t = Va(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function Ka(e, t) {
  if (e == null) return {};
  var n = {},
    a = Object.keys(e),
    o,
    s;
  for (s = 0; s < a.length; s++)
    (o = a[s]), !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function Nn(e, t) {
  if (e == null) return {};
  var n = Ka(e, t),
    a,
    o;
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (o = 0; o < s.length; o++)
      (a = s[o]),
        !(t.indexOf(a) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, a) &&
          (n[a] = e[a]);
  }
  return n;
}
var Ln = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/ (function (e) {
  (function () {
    var t = {}.hasOwnProperty;
    function n() {
      for (var a = [], o = 0; o < arguments.length; o++) {
        var s = arguments[o];
        if (s) {
          var i = typeof s;
          if (i === "string" || i === "number") a.push(s);
          else if (Array.isArray(s)) {
            if (s.length) {
              var l = n.apply(null, s);
              l && a.push(l);
            }
          } else if (i === "object") {
            if (
              s.toString !== Object.prototype.toString &&
              !s.toString.toString().includes("[native code]")
            ) {
              a.push(s.toString());
              continue;
            }
            for (var c in s) t.call(s, c) && s[c] && a.push(c);
          }
        }
      }
      return a.join(" ");
    }
    e.exports ? ((n.default = n), (e.exports = n)) : (window.classNames = n);
  })();
})(Ln);
var qa = Ln.exports;
const Ya = fn(qa);
function X(e, t) {
  Ja(e) && (e = "100%");
  var n = Za(e);
  return (
    (e = t === 360 ? e : Math.min(t, Math.max(0, parseFloat(e)))),
    n && (e = parseInt(String(e * t), 10) / 100),
    Math.abs(e - t) < 1e-6
      ? 1
      : (t === 360
          ? (e = (e < 0 ? (e % t) + t : e % t) / parseFloat(String(t)))
          : (e = (e % t) / parseFloat(String(t))),
        e)
  );
}
function Ja(e) {
  return typeof e == "string" && e.indexOf(".") !== -1 && parseFloat(e) === 1;
}
function Za(e) {
  return typeof e == "string" && e.indexOf("%") !== -1;
}
function Qa(e) {
  return (e = parseFloat(e)), (isNaN(e) || e < 0 || e > 1) && (e = 1), e;
}
function Me(e) {
  return e <= 1 ? "".concat(Number(e) * 100, "%") : e;
}
function Qe(e) {
  return e.length === 1 ? "0" + e : String(e);
}
function Xa(e, t, n) {
  return { r: X(e, 255) * 255, g: X(t, 255) * 255, b: X(n, 255) * 255 };
}
function Xe(e, t, n) {
  return (
    n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6
      ? e + (t - e) * (6 * n)
      : n < 1 / 2
      ? t
      : n < 2 / 3
      ? e + (t - e) * (2 / 3 - n) * 6
      : e
  );
}
function eo(e, t, n) {
  var a, o, s;
  if (((e = X(e, 360)), (t = X(t, 100)), (n = X(n, 100)), t === 0))
    (o = n), (s = n), (a = n);
  else {
    var i = n < 0.5 ? n * (1 + t) : n + t - n * t,
      l = 2 * n - i;
    (a = Xe(l, i, e + 1 / 3)), (o = Xe(l, i, e)), (s = Xe(l, i, e - 1 / 3));
  }
  return { r: a * 255, g: o * 255, b: s * 255 };
}
function to(e, t, n) {
  (e = X(e, 255)), (t = X(t, 255)), (n = X(n, 255));
  var a = Math.max(e, t, n),
    o = Math.min(e, t, n),
    s = 0,
    i = a,
    l = a - o,
    c = a === 0 ? 0 : l / a;
  if (a === o) s = 0;
  else {
    switch (a) {
      case e:
        s = (t - n) / l + (t < n ? 6 : 0);
        break;
      case t:
        s = (n - e) / l + 2;
        break;
      case n:
        s = (e - t) / l + 4;
        break;
    }
    s /= 6;
  }
  return { h: s, s: c, v: i };
}
function no(e, t, n) {
  (e = X(e, 360) * 6), (t = X(t, 100)), (n = X(n, 100));
  var a = Math.floor(e),
    o = e - a,
    s = n * (1 - t),
    i = n * (1 - o * t),
    l = n * (1 - (1 - o) * t),
    c = a % 6,
    d = [n, i, s, s, l, n][c],
    p = [l, n, n, i, s, s][c],
    u = [s, s, l, n, n, i][c];
  return { r: d * 255, g: p * 255, b: u * 255 };
}
function ro(e, t, n, a) {
  var o = [
    Qe(Math.round(e).toString(16)),
    Qe(Math.round(t).toString(16)),
    Qe(Math.round(n).toString(16)),
  ];
  return a &&
    o[0].startsWith(o[0].charAt(1)) &&
    o[1].startsWith(o[1].charAt(1)) &&
    o[2].startsWith(o[2].charAt(1))
    ? o[0].charAt(0) + o[1].charAt(0) + o[2].charAt(0)
    : o.join("");
}
function Dt(e) {
  return Y(e) / 255;
}
function Y(e) {
  return parseInt(e, 16);
}
var _t = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  goldenrod: "#daa520",
  gold: "#ffd700",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavenderblush: "#fff0f5",
  lavender: "#e6e6fa",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32",
};
function Ie(e) {
  var t = { r: 0, g: 0, b: 0 },
    n = 1,
    a = null,
    o = null,
    s = null,
    i = !1,
    l = !1;
  return (
    typeof e == "string" && (e = so(e)),
    typeof e == "object" &&
      (de(e.r) && de(e.g) && de(e.b)
        ? ((t = Xa(e.r, e.g, e.b)),
          (i = !0),
          (l = String(e.r).substr(-1) === "%" ? "prgb" : "rgb"))
        : de(e.h) && de(e.s) && de(e.v)
        ? ((a = Me(e.s)),
          (o = Me(e.v)),
          (t = no(e.h, a, o)),
          (i = !0),
          (l = "hsv"))
        : de(e.h) &&
          de(e.s) &&
          de(e.l) &&
          ((a = Me(e.s)),
          (s = Me(e.l)),
          (t = eo(e.h, a, s)),
          (i = !0),
          (l = "hsl")),
      Object.prototype.hasOwnProperty.call(e, "a") && (n = e.a)),
    (n = Qa(n)),
    {
      ok: i,
      format: e.format || l,
      r: Math.min(255, Math.max(t.r, 0)),
      g: Math.min(255, Math.max(t.g, 0)),
      b: Math.min(255, Math.max(t.b, 0)),
      a: n,
    }
  );
}
var ao = "[-\\+]?\\d+%?",
  oo = "[-\\+]?\\d*\\.\\d+%?",
  fe = "(?:".concat(oo, ")|(?:").concat(ao, ")"),
  et = "[\\s|\\(]+("
    .concat(fe, ")[,|\\s]+(")
    .concat(fe, ")[,|\\s]+(")
    .concat(fe, ")\\s*\\)?"),
  tt = "[\\s|\\(]+("
    .concat(fe, ")[,|\\s]+(")
    .concat(fe, ")[,|\\s]+(")
    .concat(fe, ")[,|\\s]+(")
    .concat(fe, ")\\s*\\)?"),
  re = {
    CSS_UNIT: new RegExp(fe),
    rgb: new RegExp("rgb" + et),
    rgba: new RegExp("rgba" + tt),
    hsl: new RegExp("hsl" + et),
    hsla: new RegExp("hsla" + tt),
    hsv: new RegExp("hsv" + et),
    hsva: new RegExp("hsva" + tt),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  };
function so(e) {
  if (((e = e.trim().toLowerCase()), e.length === 0)) return !1;
  var t = !1;
  if (_t[e]) (e = _t[e]), (t = !0);
  else if (e === "transparent")
    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  var n = re.rgb.exec(e);
  return n
    ? { r: n[1], g: n[2], b: n[3] }
    : ((n = re.rgba.exec(e)),
      n
        ? { r: n[1], g: n[2], b: n[3], a: n[4] }
        : ((n = re.hsl.exec(e)),
          n
            ? { h: n[1], s: n[2], l: n[3] }
            : ((n = re.hsla.exec(e)),
              n
                ? { h: n[1], s: n[2], l: n[3], a: n[4] }
                : ((n = re.hsv.exec(e)),
                  n
                    ? { h: n[1], s: n[2], v: n[3] }
                    : ((n = re.hsva.exec(e)),
                      n
                        ? { h: n[1], s: n[2], v: n[3], a: n[4] }
                        : ((n = re.hex8.exec(e)),
                          n
                            ? {
                                r: Y(n[1]),
                                g: Y(n[2]),
                                b: Y(n[3]),
                                a: Dt(n[4]),
                                format: t ? "name" : "hex8",
                              }
                            : ((n = re.hex6.exec(e)),
                              n
                                ? {
                                    r: Y(n[1]),
                                    g: Y(n[2]),
                                    b: Y(n[3]),
                                    format: t ? "name" : "hex",
                                  }
                                : ((n = re.hex4.exec(e)),
                                  n
                                    ? {
                                        r: Y(n[1] + n[1]),
                                        g: Y(n[2] + n[2]),
                                        b: Y(n[3] + n[3]),
                                        a: Dt(n[4] + n[4]),
                                        format: t ? "name" : "hex8",
                                      }
                                    : ((n = re.hex3.exec(e)),
                                      n
                                        ? {
                                            r: Y(n[1] + n[1]),
                                            g: Y(n[2] + n[2]),
                                            b: Y(n[3] + n[3]),
                                            format: t ? "name" : "hex",
                                          }
                                        : !1)))))))));
}
function de(e) {
  return !!re.CSS_UNIT.exec(String(e));
}
var Fe = 2,
  Bt = 0.16,
  io = 0.05,
  co = 0.05,
  lo = 0.15,
  Mn = 5,
  Fn = 4,
  uo = [
    { index: 7, opacity: 0.15 },
    { index: 6, opacity: 0.25 },
    { index: 5, opacity: 0.3 },
    { index: 5, opacity: 0.45 },
    { index: 5, opacity: 0.65 },
    { index: 5, opacity: 0.85 },
    { index: 4, opacity: 0.9 },
    { index: 3, opacity: 0.95 },
    { index: 2, opacity: 0.97 },
    { index: 1, opacity: 0.98 },
  ];
function $t(e) {
  var t = e.r,
    n = e.g,
    a = e.b,
    o = to(t, n, a);
  return { h: o.h * 360, s: o.s, v: o.v };
}
function Ue(e) {
  var t = e.r,
    n = e.g,
    a = e.b;
  return "#".concat(ro(t, n, a, !1));
}
function fo(e, t, n) {
  var a = n / 100,
    o = {
      r: (t.r - e.r) * a + e.r,
      g: (t.g - e.g) * a + e.g,
      b: (t.b - e.b) * a + e.b,
    };
  return o;
}
function Ht(e, t, n) {
  var a;
  return (
    Math.round(e.h) >= 60 && Math.round(e.h) <= 240
      ? (a = n ? Math.round(e.h) - Fe * t : Math.round(e.h) + Fe * t)
      : (a = n ? Math.round(e.h) + Fe * t : Math.round(e.h) - Fe * t),
    a < 0 ? (a += 360) : a >= 360 && (a -= 360),
    a
  );
}
function zt(e, t, n) {
  if (e.h === 0 && e.s === 0) return e.s;
  var a;
  return (
    n ? (a = e.s - Bt * t) : t === Fn ? (a = e.s + Bt) : (a = e.s + io * t),
    a > 1 && (a = 1),
    n && t === Mn && a > 0.1 && (a = 0.1),
    a < 0.06 && (a = 0.06),
    Number(a.toFixed(2))
  );
}
function Wt(e, t, n) {
  var a;
  return (
    n ? (a = e.v + co * t) : (a = e.v - lo * t),
    a > 1 && (a = 1),
    Number(a.toFixed(2))
  );
}
function ft(e) {
  for (
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      n = [],
      a = Ie(e),
      o = Mn;
    o > 0;
    o -= 1
  ) {
    var s = $t(a),
      i = Ue(Ie({ h: Ht(s, o, !0), s: zt(s, o, !0), v: Wt(s, o, !0) }));
    n.push(i);
  }
  n.push(Ue(a));
  for (var l = 1; l <= Fn; l += 1) {
    var c = $t(a),
      d = Ue(Ie({ h: Ht(c, l), s: zt(c, l), v: Wt(c, l) }));
    n.push(d);
  }
  return t.theme === "dark"
    ? uo.map(function (p) {
        var u = p.index,
          g = p.opacity,
          f = Ue(fo(Ie(t.backgroundColor || "#141414"), Ie(n[u]), g * 100));
        return f;
      })
    : n;
}
var nt = {
    red: "#F5222D",
    volcano: "#FA541C",
    orange: "#FA8C16",
    gold: "#FAAD14",
    yellow: "#FADB14",
    lime: "#A0D911",
    green: "#52C41A",
    cyan: "#13C2C2",
    blue: "#1677FF",
    geekblue: "#2F54EB",
    purple: "#722ED1",
    magenta: "#EB2F96",
    grey: "#666666",
  },
  Be = {},
  rt = {};
Object.keys(nt).forEach(function (e) {
  (Be[e] = ft(nt[e])),
    (Be[e].primary = Be[e][5]),
    (rt[e] = ft(nt[e], { theme: "dark", backgroundColor: "#141414" })),
    (rt[e].primary = rt[e][5]);
});
var po = Be.blue;
function Gt(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    t &&
      (a = a.filter(function (o) {
        return Object.getOwnPropertyDescriptor(e, o).enumerable;
      })),
      n.push.apply(n, a);
  }
  return n;
}
function pe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Gt(Object(n), !0).forEach(function (a) {
          ut(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : Gt(Object(n)).forEach(function (a) {
          Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
        });
  }
  return e;
}
function ho() {
  return !!(
    typeof window < "u" &&
    window.document &&
    window.document.createElement
  );
}
function mo(e, t) {
  if (!e) return !1;
  if (e.contains) return e.contains(t);
  for (var n = t; n; ) {
    if (n === e) return !0;
    n = n.parentNode;
  }
  return !1;
}
var Vt = "data-rc-order",
  Kt = "data-rc-priority",
  go = "rc-util-key",
  pt = new Map();
function Un() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
    t = e.mark;
  return t ? (t.startsWith("data-") ? t : "data-".concat(t)) : go;
}
function bt(e) {
  if (e.attachTo) return e.attachTo;
  var t = document.querySelector("head");
  return t || document.body;
}
function yo(e) {
  return e === "queue" ? "prependQueue" : e ? "prepend" : "append";
}
function Dn(e) {
  return Array.from((pt.get(e) || e).children).filter(function (t) {
    return t.tagName === "STYLE";
  });
}
function _n(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!ho()) return null;
  var n = t.csp,
    a = t.prepend,
    o = t.priority,
    s = o === void 0 ? 0 : o,
    i = yo(a),
    l = i === "prependQueue",
    c = document.createElement("style");
  c.setAttribute(Vt, i),
    l && s && c.setAttribute(Kt, "".concat(s)),
    n != null && n.nonce && (c.nonce = n == null ? void 0 : n.nonce),
    (c.innerHTML = e);
  var d = bt(t),
    p = d.firstChild;
  if (a) {
    if (l) {
      var u = Dn(d).filter(function (g) {
        if (!["prepend", "prependQueue"].includes(g.getAttribute(Vt)))
          return !1;
        var f = Number(g.getAttribute(Kt) || 0);
        return s >= f;
      });
      if (u.length) return d.insertBefore(c, u[u.length - 1].nextSibling), c;
    }
    d.insertBefore(c, p);
  } else d.appendChild(c);
  return c;
}
function vo(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    n = bt(t);
  return Dn(n).find(function (a) {
    return a.getAttribute(Un(t)) === e;
  });
}
function xo(e, t) {
  var n = pt.get(e);
  if (!n || !mo(document, n)) {
    var a = _n("", t),
      o = a.parentNode;
    pt.set(e, o), e.removeChild(a);
  }
}
function Co(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
    a = bt(n);
  xo(a, n);
  var o = vo(t, n);
  if (o) {
    var s, i;
    if (
      (s = n.csp) !== null &&
      s !== void 0 &&
      s.nonce &&
      o.nonce !== ((i = n.csp) === null || i === void 0 ? void 0 : i.nonce)
    ) {
      var l;
      o.nonce = (l = n.csp) === null || l === void 0 ? void 0 : l.nonce;
    }
    return o.innerHTML !== e && (o.innerHTML = e), o;
  }
  var c = _n(e, n);
  return c.setAttribute(Un(n), t), c;
}
function Bn(e) {
  var t;
  return e == null || (t = e.getRootNode) === null || t === void 0
    ? void 0
    : t.call(e);
}
function bo(e) {
  return Bn(e) instanceof ShadowRoot;
}
function jo(e) {
  return bo(e) ? Bn(e) : null;
}
var ht = {},
  wo = function (t) {};
function So(e, t) {}
function Po(e, t) {}
function Eo() {
  ht = {};
}
function $n(e, t, n) {
  !t && !ht[n] && (e(!1, n), (ht[n] = !0));
}
function Ke(e, t) {
  $n(So, e, t);
}
function ko(e, t) {
  $n(Po, e, t);
}
Ke.preMessage = wo;
Ke.resetWarned = Eo;
Ke.noteOnce = ko;
function Ao(e) {
  return e.replace(/-(.)/g, function (t, n) {
    return n.toUpperCase();
  });
}
function To(e, t) {
  Ke(e, "[@ant-design/icons] ".concat(t));
}
function qt(e) {
  return (
    je(e) === "object" &&
    typeof e.name == "string" &&
    typeof e.theme == "string" &&
    (je(e.icon) === "object" || typeof e.icon == "function")
  );
}
function Yt() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  return Object.keys(e).reduce(function (t, n) {
    var a = e[n];
    switch (n) {
      case "class":
        (t.className = a), delete t.class;
        break;
      default:
        delete t[n], (t[Ao(n)] = a);
    }
    return t;
  }, {});
}
function mt(e, t, n) {
  return n
    ? j.createElement(
        e.tag,
        pe(pe({ key: t }, Yt(e.attrs)), n),
        (e.children || []).map(function (a, o) {
          return mt(a, "".concat(t, "-").concat(e.tag, "-").concat(o));
        })
      )
    : j.createElement(
        e.tag,
        pe({ key: t }, Yt(e.attrs)),
        (e.children || []).map(function (a, o) {
          return mt(a, "".concat(t, "-").concat(e.tag, "-").concat(o));
        })
      );
}
function Hn(e) {
  return ft(e)[0];
}
function zn(e) {
  return e ? (Array.isArray(e) ? e : [e]) : [];
}
var Oo = `
.anticon {
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`,
  Ro = function (t) {
    var n = xr(Rn),
      a = n.csp,
      o = n.prefixCls,
      s = Oo;
    o && (s = s.replace(/anticon/g, o)),
      ee(function () {
        var i = t.current,
          l = jo(i);
        Co(s, "@ant-design-icons", { prepend: !0, csp: a, attachTo: l });
      }, []);
  },
  Io = [
    "icon",
    "className",
    "onClick",
    "style",
    "primaryColor",
    "secondaryColor",
  ],
  Ne = { primaryColor: "#333", secondaryColor: "#E6E6E6", calculated: !1 };
function No(e) {
  var t = e.primaryColor,
    n = e.secondaryColor;
  (Ne.primaryColor = t),
    (Ne.secondaryColor = n || Hn(t)),
    (Ne.calculated = !!n);
}
function Lo() {
  return pe({}, Ne);
}
var qe = function (t) {
  var n = t.icon,
    a = t.className,
    o = t.onClick,
    s = t.style,
    i = t.primaryColor,
    l = t.secondaryColor,
    c = Nn(t, Io),
    d = R.useRef(),
    p = Ne;
  if (
    (i && (p = { primaryColor: i, secondaryColor: l || Hn(i) }),
    Ro(d),
    To(qt(n), "icon should be icon definiton, but got ".concat(n)),
    !qt(n))
  )
    return null;
  var u = n;
  return (
    u &&
      typeof u.icon == "function" &&
      (u = pe(
        pe({}, u),
        {},
        { icon: u.icon(p.primaryColor, p.secondaryColor) }
      )),
    mt(
      u.icon,
      "svg-".concat(u.name),
      pe(
        pe(
          {
            className: a,
            onClick: o,
            style: s,
            "data-icon": u.name,
            width: "1em",
            height: "1em",
            fill: "currentColor",
            "aria-hidden": "true",
          },
          c
        ),
        {},
        { ref: d }
      )
    )
  );
};
qe.displayName = "IconReact";
qe.getTwoToneColors = Lo;
qe.setTwoToneColors = No;
const jt = qe;
function Wn(e) {
  var t = zn(e),
    n = In(t, 2),
    a = n[0],
    o = n[1];
  return jt.setTwoToneColors({ primaryColor: a, secondaryColor: o });
}
function Mo() {
  var e = jt.getTwoToneColors();
  return e.calculated ? [e.primaryColor, e.secondaryColor] : e.primaryColor;
}
var Fo = [
  "className",
  "icon",
  "spin",
  "rotate",
  "tabIndex",
  "onClick",
  "twoToneColor",
];
Wn(po.primary);
var Ye = R.forwardRef(function (e, t) {
  var n,
    a = e.className,
    o = e.icon,
    s = e.spin,
    i = e.rotate,
    l = e.tabIndex,
    c = e.onClick,
    d = e.twoToneColor,
    p = Nn(e, Fo),
    u = R.useContext(Rn),
    g = u.prefixCls,
    f = g === void 0 ? "anticon" : g,
    v = u.rootClassName,
    x = Ya(
      v,
      f,
      ((n = {}),
      ut(n, "".concat(f, "-").concat(o.name), !!o.name),
      ut(n, "".concat(f, "-spin"), !!s || o.name === "loading"),
      n),
      a
    ),
    y = l;
  y === void 0 && c && (y = -1);
  var S = i
      ? {
          msTransform: "rotate(".concat(i, "deg)"),
          transform: "rotate(".concat(i, "deg)"),
        }
      : void 0,
    w = zn(d),
    C = In(w, 2),
    b = C[0],
    P = C[1];
  return R.createElement(
    "span",
    ue({ role: "img", "aria-label": o.name }, p, {
      ref: t,
      tabIndex: y,
      onClick: c,
      className: x,
    }),
    R.createElement(jt, {
      icon: o,
      primaryColor: b,
      secondaryColor: P,
      style: S,
    })
  );
});
Ye.displayName = "AntdIcon";
Ye.getTwoToneColor = Mo;
Ye.setTwoToneColor = Wn;
const Te = Ye;
var Uo = {
  icon: {
    tag: "svg",
    attrs: { viewBox: "0 0 1024 1024", focusable: "false" },
    children: [
      {
        tag: "path",
        attrs: {
          d: "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z",
        },
      },
    ],
  },
  name: "loading",
  theme: "outlined",
};
const Do = Uo;
var _o = function (t, n) {
  return R.createElement(Te, ue({}, t, { ref: n, icon: Do }));
};
const Gn = R.forwardRef(_o);
var Bo = {
  icon: {
    tag: "svg",
    attrs: { viewBox: "64 64 896 896", focusable: "false" },
    children: [
      {
        tag: "path",
        attrs: {
          d: "M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 01-112.7 75.9A352.8 352.8 0 01512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 01-112.7-75.9 353.28 353.28 0 01-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 000-12.6z",
        },
      },
    ],
  },
  name: "logout",
  theme: "outlined",
};
const $o = Bo;
var Ho = function (t, n) {
  return R.createElement(Te, ue({}, t, { ref: n, icon: $o }));
};
const zo = R.forwardRef(Ho);
var Wo = {
  icon: {
    tag: "svg",
    attrs: { viewBox: "64 64 896 896", focusable: "false" },
    children: [
      {
        tag: "path",
        attrs: {
          d: "M288 421a48 48 0 1096 0 48 48 0 10-96 0zm352 0a48 48 0 1096 0 48 48 0 10-96 0zM512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm263 711c-34.2 34.2-74 61-118.3 79.8C611 874.2 562.3 884 512 884c-50.3 0-99-9.8-144.8-29.2A370.4 370.4 0 01248.9 775c-34.2-34.2-61-74-79.8-118.3C149.8 611 140 562.3 140 512s9.8-99 29.2-144.8A370.4 370.4 0 01249 248.9c34.2-34.2 74-61 118.3-79.8C413 149.8 461.7 140 512 140c50.3 0 99 9.8 144.8 29.2A370.4 370.4 0 01775.1 249c34.2 34.2 61 74 79.8 118.3C874.2 413 884 461.7 884 512s-9.8 99-29.2 144.8A368.89 368.89 0 01775 775zM664 533h-48.1c-4.2 0-7.8 3.2-8.1 7.4C604 589.9 562.5 629 512 629s-92.1-39.1-95.8-88.6c-.3-4.2-3.9-7.4-8.1-7.4H360a8 8 0 00-8 8.4c4.4 84.3 74.5 151.6 160 151.6s155.6-67.3 160-151.6a8 8 0 00-8-8.4z",
        },
      },
    ],
  },
  name: "smile",
  theme: "outlined",
};
const Go = Wo;
var Vo = function (t, n) {
  return R.createElement(Te, ue({}, t, { ref: n, icon: Go }));
};
const Ko = R.forwardRef(Vo);
var qo = {
  icon: {
    tag: "svg",
    attrs: { viewBox: "64 64 896 896", focusable: "false" },
    children: [
      {
        tag: "path",
        attrs: {
          d: "M688 264c0-4.4-3.6-8-8-8H296c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8v-48zm-8 136H296c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM480 544H296c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm-48 308H208V148h560v344c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V108c0-17.7-14.3-32-32-32H168c-17.7 0-32 14.3-32 32v784c0 17.7 14.3 32 32 32h264c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm356.8-74.4c29-26.3 47.2-64.3 47.2-106.6 0-79.5-64.5-144-144-144s-144 64.5-144 144c0 42.3 18.2 80.3 47.2 106.6-57 32.5-96.2 92.7-99.2 162.1-.2 4.5 3.5 8.3 8 8.3h48.1c4.2 0 7.7-3.3 8-7.6C564 871.2 621.7 816 692 816s128 55.2 131.9 124.4c.2 4.2 3.7 7.6 8 7.6H880c4.6 0 8.2-3.8 8-8.3-2.9-69.5-42.2-129.6-99.2-162.1zM692 591c44.2 0 80 35.8 80 80s-35.8 80-80 80-80-35.8-80-80 35.8-80 80-80z",
        },
      },
    ],
  },
  name: "solution",
  theme: "outlined",
};
const Yo = qo;
var Jo = function (t, n) {
  return R.createElement(Te, ue({}, t, { ref: n, icon: Yo }));
};
const Zo = R.forwardRef(Jo);
var Qo = {
  icon: {
    tag: "svg",
    attrs: { viewBox: "64 64 896 896", focusable: "false" },
    children: [
      {
        tag: "path",
        attrs: {
          d: "M668.6 320c0-4.4-3.6-8-8-8h-54.5c-3 0-5.8 1.7-7.1 4.4l-84.7 168.8H511l-84.7-168.8a8 8 0 00-7.1-4.4h-55.7c-1.3 0-2.6.3-3.8 1-3.9 2.1-5.3 7-3.2 10.8l103.9 191.6h-57c-4.4 0-8 3.6-8 8v27.1c0 4.4 3.6 8 8 8h76v39h-76c-4.4 0-8 3.6-8 8v27.1c0 4.4 3.6 8 8 8h76V704c0 4.4 3.6 8 8 8h49.9c4.4 0 8-3.6 8-8v-63.5h76.3c4.4 0 8-3.6 8-8v-27.1c0-4.4-3.6-8-8-8h-76.3v-39h76.3c4.4 0 8-3.6 8-8v-27.1c0-4.4-3.6-8-8-8H564l103.7-191.6c.5-1.1.9-2.4.9-3.7zM157.9 504.2a352.7 352.7 0 01103.5-242.4c32.5-32.5 70.3-58.1 112.4-75.9 43.6-18.4 89.9-27.8 137.6-27.8 47.8 0 94.1 9.3 137.6 27.8 42.1 17.8 79.9 43.4 112.4 75.9 10 10 19.3 20.5 27.9 31.4l-50 39.1a8 8 0 003 14.1l156.8 38.3c5 1.2 9.9-2.6 9.9-7.7l.8-161.5c0-6.7-7.7-10.5-12.9-6.3l-47.8 37.4C770.7 146.3 648.6 82 511.5 82 277 82 86.3 270.1 82 503.8a8 8 0 008 8.2h60c4.3 0 7.8-3.5 7.9-7.8zM934 512h-60c-4.3 0-7.9 3.5-8 7.8a352.7 352.7 0 01-103.5 242.4 352.57 352.57 0 01-112.4 75.9c-43.6 18.4-89.9 27.8-137.6 27.8s-94.1-9.3-137.6-27.8a352.57 352.57 0 01-112.4-75.9c-10-10-19.3-20.5-27.9-31.4l49.9-39.1a8 8 0 00-3-14.1l-156.8-38.3c-5-1.2-9.9 2.6-9.9 7.7l-.8 161.7c0 6.7 7.7 10.5 12.9 6.3l47.8-37.4C253.3 877.7 375.4 942 512.5 942 747 942 937.7 753.9 942 520.2a8 8 0 00-8-8.2z",
        },
      },
    ],
  },
  name: "transaction",
  theme: "outlined",
};
const Xo = Qo;
var es = function (t, n) {
  return R.createElement(Te, ue({}, t, { ref: n, icon: Xo }));
};
const ts = R.forwardRef(es);
var ns = {
  icon: {
    tag: "svg",
    attrs: { viewBox: "64 64 896 896", focusable: "false" },
    children: [
      {
        tag: "path",
        attrs: {
          d: "M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z",
        },
      },
    ],
  },
  name: "user",
  theme: "outlined",
};
const rs = ns;
var as = function (t, n) {
  return R.createElement(Te, ue({}, t, { ref: n, icon: rs }));
};
const os = R.forwardRef(as),
  ss = (e = "", t) => {
    switch (t.type) {
      case "SET_FILTER":
        return t.payload;
      default:
        return e;
    }
  },
  is = (e) => ({ type: "SET_FILTER", payload: e }),
  cs = (e = "", t) => {
    switch (t.type) {
      case "SET_MIN_PRICE":
        return t.payload;
      default:
        return e;
    }
  },
  Jt = (e) => ({ type: "SET_MIN_PRICE", payload: e }),
  ls = (e = "", t) => {
    switch (t.type) {
      case "SET_MAX_PRICE":
        return t.payload;
      default:
        return e;
    }
  },
  Zt = (e) => ({ type: "SET_MAX_PRICE", payload: e }),
  ds = (e = "None", t) => {
    switch (t.type) {
      case "SET_COUNTRY":
        return t.payload;
      default:
        return e;
    }
  },
  Qt = (e) => ({ type: "SET_COUNTRY", payload: e }),
  us = (e = "None", t) => {
    switch (t.type) {
      case "SET_CATEGORY":
        return t.payload;
      default:
        return e;
    }
  },
  Xt = (e) => ({ type: "SET_CATEGORY", payload: e }),
  en = [],
  Vn = Ae({
    name: "cart",
    initialState: en,
    reducers: {
      appendcart(e, t) {
        e.push(t.payload);
      },
      setcart(e, t) {
        return t.payload;
      },
      clearCart() {
        return en;
      },
    },
  }),
  { appendcart: fs, setcart: ps, clearCart: Kn } = Vn.actions,
  at = () => async (e) => {
    const t = await me.getAllCartItems();
    e(ps(t));
  },
  hs = Vn.reducer,
  tn = [],
  qn = Ae({
    name: "favorite",
    initialState: tn,
    reducers: {
      appendfavorite(e, t) {
        e.push(t.payload);
      },
      setfavorite(e, t) {
        return t.payload;
      },
      clearFavorite() {
        return tn;
      },
    },
  }),
  { appendfavorite: Yn, setfavorite: ms, clearFavorite: gs } = qn.actions,
  gt = () => async (e) => {
    const t = await Cn();
    e(ms(t));
  },
  ys = qn.reducer,
  J = () => {
    const e = se(),
      t = Z(),
      [n, a] = m(!1),
      [o, s] = m(!1),
      [i, l] = m(!0),
      [c, d] = m(!1);
    ee(() => {
      (() => {
        const T = window.sessionStorage.getItem("loggedNoteappUser");
        if (T) {
          const D = JSON.parse(T),
            h = D.style;
          (h === "seller" || h === "both") && l(!0),
            h !== "seller" && d(!0),
            D.length > 0 && a(!0);
        }
      })();
    }, []);
    const p = (P) => {
        const T = P.target.value;
        t(is(T));
      },
      u = () => {
        s((P) => !P);
      },
      g = K((P) => P.cart),
      f = K((P) => P.favorite),
      v = g.length,
      x = f.length,
      y = () => {
        window.sessionStorage.clear(),
          console.log("Hah sessionStorage meni siinä"),
          t(yn()),
          t(Kn()),
          t(gs()),
          t(ha()),
          console.log("User cleared"),
          e("/login");
      },
      S = () => {
        e("/history");
      },
      w = () => {
        e("/user");
      },
      C = () => {
        e("/ownlisting");
      },
      b = [
        { label: "User info", key: "1", icon: r.jsx(os, {}), onClick: w },
        { label: "Own listings", key: "2", icon: r.jsx(Br, {}), onClick: C },
        {
          label: "Purchase history",
          key: "3",
          icon: r.jsx(ts, {}),
          onClick: S,
        },
        {
          label: "Log out",
          key: "4",
          icon: r.jsx(zo, {}),
          danger: !0,
          onClick: y,
        },
      ];
    return r.jsx("div", {
      children: r.jsx("nav", {
        children: r.jsxs("ul", {
          id: "navbar",
          children: [
            r.jsx("li", {
              id: "navitem",
              children: r.jsxs(Ce, {
                to: "/",
                children: ["Home ", r.jsx(Mr, {})],
              }),
            }),
            r.jsx("li", {
              id: "navitem",
              children: r.jsxs(Ce, {
                to: "/about",
                children: ["About-us ", r.jsx(Fr, {})],
              }),
            }),
            r.jsx("li", {
              id: "navitem",
              children: r.jsxs(Ce, {
                to: "/contacts",
                children: ["Contacts ", r.jsx(Ur, {})],
              }),
            }),
            o &&
              r.jsx(A, {
                placeholder: "input search text",
                onChange: p,
                style: { width: 250 },
                enterButton: !0,
              }),
            r.jsx("li", {
              id: "search",
              onClick: () => u(),
              children: r.jsx($r, {}),
            }),
            i &&
              r.jsx("li", {
                id: "navitem",
                children: r.jsx(Ce, { to: "/add", children: r.jsx(Dr, {}) }),
              }),
            c &&
              r.jsx("li", {
                id: "navitem",
                children: r.jsxs(Ce, {
                  to: "/cart",
                  children: [r.jsx(un, {}), " ", v],
                }),
              }),
            r.jsx("li", {
              id: "navitem",
              children: r.jsxs(Ce, {
                to: "/favorites",
                children: [r.jsx(Ge, {}), " ", x],
              }),
            }),
            n &&
              r.jsx("li", {
                id: "navitem",
                children: r.jsx(Or, {
                  menu: { items: b },
                  trigger: ["click"],
                  children: r.jsx("a", {
                    onClick: (P) => P.preventDefault(),
                    children: r.jsx(Rr, {
                      children: r.jsx(_r, { id: "user" }),
                    }),
                  }),
                }),
              }),
            !n &&
              r.jsx("li", {
                id: "navitem",
                children: r.jsxs(Ce, {
                  to: "/login",
                  children: ["Login ", r.jsx(_a, {})],
                }),
              }),
          ],
        }),
      }),
    });
  };
function nn(e) {
  return Ct({
    tag: "svg",
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "path", attr: { d: "M20 7h-9" } },
      { tag: "path", attr: { d: "M14 17H5" } },
      { tag: "circle", attr: { cx: "17", cy: "17", r: "3" } },
      { tag: "circle", attr: { cx: "7", cy: "7", r: "3" } },
    ],
  })(e);
}
const vs = [
    "None",
    "Electronics",
    "Appliances",
    "Home",
    "Books",
    "Clothing",
    "Children",
    "Sports",
    "Beauty",
    "Pets",
    "Renovation",
    "Garden And Wood Stain",
    "Toys And Games",
    "Smartphones",
    "Laptops",
    "Fragrances",
    "Skincare",
    "Groceries",
    "Home Decoration",
    "Furniture",
    "Tops",
    "Women's Dresses",
    "Women's Shoes",
    "Men's Shirts",
    "Men's Shoes",
    "Men's Watches",
    "Women's Watches",
    "Women's Bags",
    "Women's Jewellery",
    "Sunglasses",
    "Automotive",
    "Motorcycle",
    "Lighting",
  ],
  yt = vs.map((e) => ({ value: e, label: e })),
  xs = [
    { name: "Afghanistan", code: "AF" },
    { name: "Åland Islands", code: "AX" },
    { name: "Albania", code: "AL" },
    { name: "Algeria", code: "DZ" },
    { name: "American Samoa", code: "AS" },
    { name: "AndorrA", code: "AD" },
    { name: "Angola", code: "AO" },
    { name: "Anguilla", code: "AI" },
    { name: "Antarctica", code: "AQ" },
    { name: "Antigua and Barbuda", code: "AG" },
    { name: "Argentina", code: "AR" },
    { name: "Armenia", code: "AM" },
    { name: "Aruba", code: "AW" },
    { name: "Australia", code: "AU" },
    { name: "Austria", code: "AT" },
    { name: "Azerbaijan", code: "AZ" },
    { name: "Bahamas", code: "BS" },
    { name: "Bahrain", code: "BH" },
    { name: "Bangladesh", code: "BD" },
    { name: "Barbados", code: "BB" },
    { name: "Belarus", code: "BY" },
    { name: "Belgium", code: "BE" },
    { name: "Belize", code: "BZ" },
    { name: "Benin", code: "BJ" },
    { name: "Bermuda", code: "BM" },
    { name: "Bhutan", code: "BT" },
    { name: "Bolivia", code: "BO" },
    { name: "Bosnia and Herzegovina", code: "BA" },
    { name: "Botswana", code: "BW" },
    { name: "Bouvet Island", code: "BV" },
    { name: "Brazil", code: "BR" },
    { name: "British Indian Ocean Territory", code: "IO" },
    { name: "Brunei Darussalam", code: "BN" },
    { name: "Bulgaria", code: "BG" },
    { name: "Burkina Faso", code: "BF" },
    { name: "Burundi", code: "BI" },
    { name: "Cambodia", code: "KH" },
    { name: "Cameroon", code: "CM" },
    { name: "Canada", code: "CA" },
    { name: "Cape Verde", code: "CV" },
    { name: "Cayman Islands", code: "KY" },
    { name: "Central African Republic", code: "CF" },
    { name: "Chad", code: "TD" },
    { name: "Chile", code: "CL" },
    { name: "China", code: "CN" },
    { name: "Christmas Island", code: "CX" },
    { name: "Cocos (Keeling) Islands", code: "CC" },
    { name: "Colombia", code: "CO" },
    { name: "Comoros", code: "KM" },
    { name: "Congo", code: "CG" },
    { name: "Congo, The Democratic Republic of the", code: "CD" },
    { name: "Cook Islands", code: "CK" },
    { name: "Costa Rica", code: "CR" },
    { name: "Cote D'Ivoire", code: "CI" },
    { name: "Croatia", code: "HR" },
    { name: "Cuba", code: "CU" },
    { name: "Cyprus", code: "CY" },
    { name: "Czech Republic", code: "CZ" },
    { name: "Denmark", code: "DK" },
    { name: "Djibouti", code: "DJ" },
    { name: "Dominica", code: "DM" },
    { name: "Dominican Republic", code: "DO" },
    { name: "Ecuador", code: "EC" },
    { name: "Egypt", code: "EG" },
    { name: "El Salvador", code: "SV" },
    { name: "Equatorial Guinea", code: "GQ" },
    { name: "Eritrea", code: "ER" },
    { name: "Estonia", code: "EE" },
    { name: "Ethiopia", code: "ET" },
    { name: "Falkland Islands (Malvinas)", code: "FK" },
    { name: "Faroe Islands", code: "FO" },
    { name: "Fiji", code: "FJ" },
    { name: "Finland", code: "FI" },
    { name: "France", code: "FR" },
    { name: "French Guiana", code: "GF" },
    { name: "French Polynesia", code: "PF" },
    { name: "French Southern Territories", code: "TF" },
    { name: "Gabon", code: "GA" },
    { name: "Gambia", code: "GM" },
    { name: "Georgia", code: "GE" },
    { name: "Germany", code: "DE" },
    { name: "Ghana", code: "GH" },
    { name: "Gibraltar", code: "GI" },
    { name: "Greece", code: "GR" },
    { name: "Greenland", code: "GL" },
    { name: "Grenada", code: "GD" },
    { name: "Guadeloupe", code: "GP" },
    { name: "Guam", code: "GU" },
    { name: "Guatemala", code: "GT" },
    { name: "Guernsey", code: "GG" },
    { name: "Guinea", code: "GN" },
    { name: "Guinea-Bissau", code: "GW" },
    { name: "Guyana", code: "GY" },
    { name: "Haiti", code: "HT" },
    { name: "Heard Island and Mcdonald Islands", code: "HM" },
    { name: "Holy See (Vatican City State)", code: "VA" },
    { name: "Honduras", code: "HN" },
    { name: "Hong Kong", code: "HK" },
    { name: "Hungary", code: "HU" },
    { name: "Iceland", code: "IS" },
    { name: "India", code: "IN" },
    { name: "Indonesia", code: "ID" },
    { name: "Iran, Islamic Republic Of", code: "IR" },
    { name: "Iraq", code: "IQ" },
    { name: "Ireland", code: "IE" },
    { name: "Isle of Man", code: "IM" },
    { name: "Israel", code: "IL" },
    { name: "Italy", code: "IT" },
    { name: "Jamaica", code: "JM" },
    { name: "Japan", code: "JP" },
    { name: "Jersey", code: "JE" },
    { name: "Jordan", code: "JO" },
    { name: "Kazakhstan", code: "KZ" },
    { name: "Kenya", code: "KE" },
    { name: "Kiribati", code: "KI" },
    { name: "Korea, Democratic People'S Republic of", code: "KP" },
    { name: "Korea, Republic of", code: "KR" },
    { name: "Kuwait", code: "KW" },
    { name: "Kyrgyzstan", code: "KG" },
    { name: "Lao People'S Democratic Republic", code: "LA" },
    { name: "Latvia", code: "LV" },
    { name: "Lebanon", code: "LB" },
    { name: "Lesotho", code: "LS" },
    { name: "Liberia", code: "LR" },
    { name: "Libyan Arab Jamahiriya", code: "LY" },
    { name: "Liechtenstein", code: "LI" },
    { name: "Lithuania", code: "LT" },
    { name: "Luxembourg", code: "LU" },
    { name: "Macao", code: "MO" },
    { name: "Macedonia, The Former Yugoslav Republic of", code: "MK" },
    { name: "Madagascar", code: "MG" },
    { name: "Malawi", code: "MW" },
    { name: "Malaysia", code: "MY" },
    { name: "Maldives", code: "MV" },
    { name: "Mali", code: "ML" },
    { name: "Malta", code: "MT" },
    { name: "Marshall Islands", code: "MH" },
    { name: "Martinique", code: "MQ" },
    { name: "Mauritania", code: "MR" },
    { name: "Mauritius", code: "MU" },
    { name: "Mayotte", code: "YT" },
    { name: "Mexico", code: "MX" },
    { name: "Micronesia, Federated States of", code: "FM" },
    { name: "Moldova, Republic of", code: "MD" },
    { name: "Monaco", code: "MC" },
    { name: "Mongolia", code: "MN" },
    { name: "Montserrat", code: "MS" },
    { name: "Morocco", code: "MA" },
    { name: "Mozambique", code: "MZ" },
    { name: "Myanmar", code: "MM" },
    { name: "Namibia", code: "NA" },
    { name: "Nauru", code: "NR" },
    { name: "Nepal", code: "NP" },
    { name: "Netherlands", code: "NL" },
    { name: "Netherlands Antilles", code: "AN" },
    { name: "New Caledonia", code: "NC" },
    { name: "New Zealand", code: "NZ" },
    { name: "Nicaragua", code: "NI" },
    { name: "Niger", code: "NE" },
    { name: "Nigeria", code: "NG" },
    { name: "Niue", code: "NU" },
    { name: "Norfolk Island", code: "NF" },
    { name: "Northern Mariana Islands", code: "MP" },
    { name: "Norway", code: "NO" },
    { name: "Oman", code: "OM" },
    { name: "Pakistan", code: "PK" },
    { name: "Palau", code: "PW" },
    { name: "Palestinian Territory, Occupied", code: "PS" },
    { name: "Panama", code: "PA" },
    { name: "Papua New Guinea", code: "PG" },
    { name: "Paraguay", code: "PY" },
    { name: "Peru", code: "PE" },
    { name: "Philippines", code: "PH" },
    { name: "Pitcairn", code: "PN" },
    { name: "Poland", code: "PL" },
    { name: "Portugal", code: "PT" },
    { name: "Puerto Rico", code: "PR" },
    { name: "Qatar", code: "QA" },
    { name: "Reunion", code: "RE" },
    { name: "Romania", code: "RO" },
    { name: "Russian Federation", code: "RU" },
    { name: "RWANDA", code: "RW" },
    { name: "Saint Helena", code: "SH" },
    { name: "Saint Kitts and Nevis", code: "KN" },
    { name: "Saint Lucia", code: "LC" },
    { name: "Saint Pierre and Miquelon", code: "PM" },
    { name: "Saint Vincent and the Grenadines", code: "VC" },
    { name: "Samoa", code: "WS" },
    { name: "San Marino", code: "SM" },
    { name: "Sao Tome and Principe", code: "ST" },
    { name: "Saudi Arabia", code: "SA" },
    { name: "Senegal", code: "SN" },
    { name: "Serbia and Montenegro", code: "CS" },
    { name: "Seychelles", code: "SC" },
    { name: "Sierra Leone", code: "SL" },
    { name: "Singapore", code: "SG" },
    { name: "Slovakia", code: "SK" },
    { name: "Slovenia", code: "SI" },
    { name: "Solomon Islands", code: "SB" },
    { name: "Somalia", code: "SO" },
    { name: "South Africa", code: "ZA" },
    { name: "South Georgia and the South Sandwich Islands", code: "GS" },
    { name: "Spain", code: "ES" },
    { name: "Sri Lanka", code: "LK" },
    { name: "Sudan", code: "SD" },
    { name: "Suriname", code: "SR" },
    { name: "Svalbard and Jan Mayen", code: "SJ" },
    { name: "Swaziland", code: "SZ" },
    { name: "Sweden", code: "SE" },
    { name: "Switzerland", code: "CH" },
    { name: "Syrian Arab Republic", code: "SY" },
    { name: "Taiwan, Province of China", code: "TW" },
    { name: "Tajikistan", code: "TJ" },
    { name: "Tanzania, United Republic of", code: "TZ" },
    { name: "Thailand", code: "TH" },
    { name: "Timor-Leste", code: "TL" },
    { name: "Togo", code: "TG" },
    { name: "Tokelau", code: "TK" },
    { name: "Tonga", code: "TO" },
    { name: "Trinidad and Tobago", code: "TT" },
    { name: "Tunisia", code: "TN" },
    { name: "Turkey", code: "TR" },
    { name: "Turkmenistan", code: "TM" },
    { name: "Turks and Caicos Islands", code: "TC" },
    { name: "Tuvalu", code: "TV" },
    { name: "Uganda", code: "UG" },
    { name: "Ukraine", code: "UA" },
    { name: "United Arab Emirates", code: "AE" },
    { name: "United Kingdom", code: "GB" },
    { name: "United States", code: "US" },
    { name: "United States Minor Outlying Islands", code: "UM" },
    { name: "Uruguay", code: "UY" },
    { name: "Uzbekistan", code: "UZ" },
    { name: "Vanuatu", code: "VU" },
    { name: "Venezuela", code: "VE" },
    { name: "Viet Nam", code: "VN" },
    { name: "Virgin Islands, British", code: "VG" },
    { name: "Virgin Islands, U.S.", code: "VI" },
    { name: "Wallis and Futuna", code: "WF" },
    { name: "Western Sahara", code: "EH" },
    { name: "Yemen", code: "YE" },
    { name: "Zambia", code: "ZM" },
    { name: "Zimbabwe", code: "ZW" },
  ],
  We = xs.map(({ name: e, code: t }) => ({ label: e, value: t })),
  ge = ({ loading: e, spinTip: t }) =>
    r.jsx("div", {
      children: r.jsx(Ir, {
        spinning: e,
        fullscreen: !0,
        tip: t,
        indicator: r.jsx(Gn, { style: { fontSize: 24 }, spin: !0 }),
        children: r.jsx("div", { className: "content" }),
      }),
    }),
  Cs = () => {
    const e = Z(),
      [t, n] = m(!1),
      [a, o] = m(!1),
      s = "Loading listings...",
      i = K((f) => f.user),
      l = K((f) => f.filter);
    ee(() => {
      (async () => {
        try {
          o(!0);
          const v = await me.getAllListings();
          console.log("Listings", v), e(ct(v)), o(!1);
        } catch (v) {
          console.error("Error fetching listings:", v), e(k(v)), o(!1);
        }
      })();
    }, [e]);
    const c = K((f) => f.favorite.map((y) => y.id)),
      d = async (f) => {
        try {
          if (i.length === 0) {
            e(k("Please login first your session has expired"));
            return;
          }
          const v = await ea(f);
          if ((console.log("Response", v), v === "Already in cart"))
            e(k(v)), console.log("Hah");
          else if (v === "Some one has already taken that") e(k(v));
          else {
            console.log(v), e(fs(v)), e(k(`${v.name} was added to your cart`));
            const x = i.filter((y) => {
              v.name;
            });
            e(ct(x));
          }
        } catch (v) {
          e(k(v));
        }
      },
      p = async (f) => {
        if (i.length === 0) {
          e(k("Please login first your session has expired"));
          return;
        }
        if (c.includes(f)) await jn(f), e(gt());
        else {
          const v = await bn(f);
          v === "You have already marked it as favorite"
            ? e(k(v))
            : (e(Yn(v)), e(k(`${v.name} was added to your favorites`)));
        }
      },
      u = () => {
        n((f) => !f);
      },
      g = K((f) =>
        f.listing.filter(
          (x) =>
            x.status !== "In cart" &&
            (f.filter.minPrice === "" || x.price >= f.filter.minPrice) &&
            (f.filter.maxPrice === "" || x.price <= f.filter.maxPrice) &&
            (f.filter.country === "None" || x.country === f.filter.country) &&
            (f.filter.category === "None" ||
              x.category === f.filter.category) &&
            x.name.toLowerCase().includes(f.filter.filter.toLowerCase())
        )
      );
    return g.length === 0
      ? r.jsxs("div", {
          children: [
            r.jsx("div", { children: r.jsx(J, {}) }),
            r.jsxs("div", {
              id: "itemstyle",
              children: [
                r.jsx("p", { id: "welcome" }),
                r.jsx(E, {
                  type: "primary",
                  id: "Filtericon",
                  onClick: u,
                  children: r.jsx(nn, {}),
                }),
              ],
            }),
            r.jsx("div", {
              children:
                t &&
                r.jsxs("div", {
                  style: { margin: 30 },
                  children: [
                    r.jsxs("div", {
                      style: { margin: 10 },
                      children: [
                        r.jsx("label", {
                          htmlFor: "category",
                          children: "Filter by category: ",
                        }),
                        r.jsx(be, {
                          id: "category",
                          options: yt,
                          style: { width: 200 },
                          value: l.category,
                          onChange: (f) => e(Xt(f)),
                        }),
                      ],
                    }),
                    r.jsxs("div", {
                      style: { margin: 10 },
                      children: [
                        r.jsx("label", {
                          htmlFor: "country",
                          children: "Filter by country: ",
                        }),
                        r.jsx(be, {
                          id: "country",
                          options: We,
                          style: { width: 200 },
                          value: l.country,
                          onChange: (f) => e(Qt(f)),
                        }),
                      ],
                    }),
                    r.jsx("div", {
                      style: { margin: 10 },
                      children: r.jsx(A, {
                        placeholder: "Min price",
                        onChange: (f) => e(Jt(f.target.value)),
                        value: l.minPrice,
                      }),
                    }),
                    r.jsx("div", {
                      style: { margin: 10 },
                      children: r.jsx(A, {
                        onChange: (f) => e(Zt(f.target.value)),
                        value: l.maxPrice,
                        placeholder: "Max price",
                      }),
                    }),
                    r.jsx("div", {
                      style: { margin: 10 },
                      children: r.jsx(E, { children: "Clear filter" }),
                    }),
                  ],
                }),
            }),
            r.jsx("div", {
              style: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
              },
              children: r.jsx("h1", { children: "No listings" }),
            }),
          ],
        })
      : r.jsxs("div", {
          children: [
            r.jsx("div", { children: r.jsx(J, {}) }),
            r.jsxs("div", {
              id: "itemstyle",
              children: [
                r.jsx("div", { id: "welcome" }),
                r.jsx(E, {
                  type: "primary",
                  id: "Filtericon",
                  onClick: u,
                  children: r.jsx(nn, {}),
                }),
              ],
            }),
            t &&
              r.jsxs("div", {
                style: { margin: 30 },
                children: [
                  r.jsxs("div", {
                    style: { margin: 10 },
                    children: [
                      r.jsx("label", {
                        htmlFor: "category",
                        children: "Filter by category: ",
                      }),
                      r.jsx(be, {
                        id: "category",
                        options: yt,
                        style: { width: 200 },
                        value: l.category,
                        onChange: (f) => e(Xt(f)),
                      }),
                    ],
                  }),
                  r.jsxs("div", {
                    style: { margin: 10 },
                    children: [
                      r.jsx("label", {
                        htmlFor: "country",
                        children: "Filter by country: ",
                      }),
                      r.jsx(be, {
                        id: "country",
                        options: We,
                        style: { width: 200 },
                        value: l.country,
                        onChange: (f) => e(Qt(f)),
                      }),
                    ],
                  }),
                  r.jsxs("div", {
                    style: { margin: 10, width: 300 },
                    children: [
                      r.jsx("label", {
                        htmlFor: "minPrice",
                        children: "Min price: ",
                      }),
                      r.jsx(A, {
                        id: "minPrice",
                        placeholder: "Min price",
                        value: l.minPrice,
                        onChange: (f) => e(Jt(f.target.value)),
                      }),
                    ],
                  }),
                  r.jsxs("div", {
                    style: { margin: 10, width: 300 },
                    children: [
                      r.jsx("label", {
                        htmlFor: "maxPrice",
                        children: "Max price: ",
                      }),
                      r.jsx(A, {
                        id: "maxPrice",
                        onChange: (f) => e(Zt(f.target.value)),
                        value: l.maxPrice,
                        placeholder: "Max price",
                      }),
                    ],
                  }),
                  r.jsx("div", {
                    style: { margin: 10 },
                    children: r.jsx(E, {
                      type: "primary",
                      children: "Clear filter",
                    }),
                  }),
                ],
              }),
            r.jsx("div", {
              id: "listingstyle",
              children: g.map((f) =>
                r.jsxs(
                  "div",
                  {
                    id: "listing",
                    children: [
                      r.jsx("div", {
                        children: r.jsx("img", {
                          src: "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
                          alt: f.name,
                          style: {
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "cover",
                            borderRadius: 10,
                          },
                        }),
                      }),
                      r.jsxs("div", {
                        children: [
                          r.jsxs("div", {
                            style: { margin: 5 },
                            children: ["Name: ", f.name],
                          }),
                          r.jsxs("div", {
                            style: { margin: 5 },
                            children: ["Country: ", f.country],
                          }),
                          r.jsxs("div", {
                            style: { margin: 5 },
                            children: ["Price: ", f.price, " ", f.currency],
                          }),
                          r.jsxs("div", {
                            style: { margin: 5 },
                            children: ["Description: ", f.description],
                          }),
                          r.jsxs("div", {
                            id: "itemstyle",
                            children: [
                              r.jsx(E, {
                                type: "primary",
                                style: { margin: 10 },
                                onClick: () => d(f.id),
                                children: "Add to cart",
                              }),
                              r.jsx(E, {
                                style: {
                                  margin: 10,
                                  color:
                                    i &&
                                    i.favorites &&
                                    i.favorite.includes(f.id)
                                      ? "red"
                                      : "black",
                                },
                                onClick: () => p(f.id),
                                children: r.jsx(Ge, {
                                  style: {
                                    color: c.includes(f.id) ? "red" : "black",
                                  },
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  },
                  f.id
                )
              ),
            }),
            r.jsx("div", { children: r.jsx(ge, { loading: a, spinTip: s }) }),
          ],
        });
  },
  bs = () => {
    const e = {
        backgroundColor: "#f8f8f8",
        padding: "50px 0",
        display: "flex",
      },
      t = { maxWidth: "800px", margin: "0 auto", textAlign: "center" },
      n = { color: "#333" },
      a = { fontSize: "1.2em", color: "#555" },
      o = { marginBottom: "20px", lineHeight: "1.6", color: "#777" },
      s = { fontWeight: "bold", color: "#28a745" };
    return r.jsxs("div", {
      children: [
        r.jsx(J, {}),
        r.jsx("section", {
          style: e,
          children: r.jsxs("div", {
            style: t,
            children: [
              r.jsx("h2", { style: n, children: "About Nordic Exchange" }),
              r.jsx("p", {
                style: a,
                className: "intro",
                children:
                  "Welcome to Nordic Exchange, your gateway to a sustainable future! We are more than just a C2C marketplace; we are on a mission to revolutionize material usage and promote a greener, more sustainable world.",
              }),
              r.jsx("p", {
                style: o,
                children:
                  "At Nordic Exchange, we believe in the power of conscious consumerism. Our platform connects individuals and businesses in a unique C2C model, fostering a circular economy where materials are reused, recycled, and repurposed to reduce waste and environmental impact.",
              }),
              r.jsx("p", {
                style: o,
                children:
                  "What sets us apart is our unwavering commitment to sustainability. Every transaction on Nordic Exchange contributes to our vision of a world where resources are used responsibly, and waste is minimized. By choosing Nordic Exchange, you are not just buying or selling; you are participating in a movement towards a more sustainable future.",
              }),
              r.jsx("p", {
                style: o,
                children:
                  "Join us in building a community that values not only the products exchanged but also the impact those transactions have on the environment. Together, let's create a marketplace that goes beyond commerce – a marketplace that embodies responsibility, innovation, and a shared commitment to a better world.",
              }),
              r.jsx("p", {
                style: s,
                className: "closing",
                children:
                  "Nordic Exchange - Empowering Sustainable Material Usage, One Transaction at a Time.",
              }),
            ],
          }),
        }),
      ],
    });
  };
var Jn = { exports: {} },
  js = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",
  ws = js,
  Ss = ws;
function Zn() {}
function Qn() {}
Qn.resetWarningCache = Zn;
var Ps = function () {
  function e(a, o, s, i, l, c) {
    if (c !== Ss) {
      var d = new Error(
        "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
      );
      throw ((d.name = "Invariant Violation"), d);
    }
  }
  e.isRequired = e;
  function t() {
    return e;
  }
  var n = {
    array: e,
    bigint: e,
    bool: e,
    func: e,
    number: e,
    object: e,
    string: e,
    symbol: e,
    any: e,
    arrayOf: t,
    element: e,
    elementType: e,
    instanceOf: t,
    node: e,
    objectOf: t,
    oneOf: t,
    oneOfType: t,
    shape: t,
    exact: t,
    checkPropTypes: Qn,
    resetWarningCache: Zn,
  };
  return (n.PropTypes = n), n;
};
Jn.exports = Ps();
var Es = Jn.exports;
const I = fn(Es);
function rn(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    t &&
      (a = a.filter(function (o) {
        return Object.getOwnPropertyDescriptor(e, o).enumerable;
      })),
      n.push.apply(n, a);
  }
  return n;
}
function an(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? rn(Object(n), !0).forEach(function (a) {
          Xn(e, a, n[a]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : rn(Object(n)).forEach(function (a) {
          Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
        });
  }
  return e;
}
function $e(e) {
  "@babel/helpers - typeof";
  return (
    typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
      ? ($e = function (t) {
          return typeof t;
        })
      : ($e = function (t) {
          return t &&
            typeof Symbol == "function" &&
            t.constructor === Symbol &&
            t !== Symbol.prototype
            ? "symbol"
            : typeof t;
        }),
    $e(e)
  );
}
function Xn(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function He(e, t) {
  return ks(e) || As(e, t) || Ts(e, t) || Os();
}
function ks(e) {
  if (Array.isArray(e)) return e;
}
function As(e, t) {
  var n = e && ((typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"]);
  if (n != null) {
    var a = [],
      o = !0,
      s = !1,
      i,
      l;
    try {
      for (
        n = n.call(e);
        !(o = (i = n.next()).done) && (a.push(i.value), !(t && a.length === t));
        o = !0
      );
    } catch (c) {
      (s = !0), (l = c);
    } finally {
      try {
        !o && n.return != null && n.return();
      } finally {
        if (s) throw l;
      }
    }
    return a;
  }
}
function Ts(e, t) {
  if (e) {
    if (typeof e == "string") return on(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (n === "Object" && e.constructor && (n = e.constructor.name),
      n === "Map" || n === "Set")
    )
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return on(e, t);
  }
}
function on(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, a = new Array(t); n < t; n++) a[n] = e[n];
  return a;
}
function Os() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var vt = function (t) {
    var n = j.useRef(t);
    return (
      j.useEffect(
        function () {
          n.current = t;
        },
        [t]
      ),
      n.current
    );
  },
  ke = function (t) {
    return t !== null && $e(t) === "object";
  },
  Rs = function (t) {
    return ke(t) && typeof t.then == "function";
  },
  Is = function (t) {
    return (
      ke(t) &&
      typeof t.elements == "function" &&
      typeof t.createToken == "function" &&
      typeof t.createPaymentMethod == "function" &&
      typeof t.confirmCardPayment == "function"
    );
  },
  sn = "[object Object]",
  Ns = function e(t, n) {
    if (!ke(t) || !ke(n)) return t === n;
    var a = Array.isArray(t),
      o = Array.isArray(n);
    if (a !== o) return !1;
    var s = Object.prototype.toString.call(t) === sn,
      i = Object.prototype.toString.call(n) === sn;
    if (s !== i) return !1;
    if (!s && !a) return t === n;
    var l = Object.keys(t),
      c = Object.keys(n);
    if (l.length !== c.length) return !1;
    for (var d = {}, p = 0; p < l.length; p += 1) d[l[p]] = !0;
    for (var u = 0; u < c.length; u += 1) d[c[u]] = !0;
    var g = Object.keys(d);
    if (g.length !== l.length) return !1;
    var f = t,
      v = n,
      x = function (S) {
        return e(f[S], v[S]);
      };
    return g.every(x);
  },
  er = function (t, n, a) {
    return ke(t)
      ? Object.keys(t).reduce(function (o, s) {
          var i = !ke(n) || !Ns(t[s], n[s]);
          return a.includes(s)
            ? (i &&
                console.warn(
                  "Unsupported prop change: options.".concat(
                    s,
                    " is not a mutable property."
                  )
                ),
              o)
            : i
            ? an(an({}, o || {}), {}, Xn({}, s, t[s]))
            : o;
        }, null)
      : null;
  },
  tr =
    "Invalid prop `stripe` supplied to `Elements`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.",
  cn = function (t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : tr;
    if (t === null || Is(t)) return t;
    throw new Error(n);
  },
  Ls = function (t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : tr;
    if (Rs(t))
      return {
        tag: "async",
        stripePromise: Promise.resolve(t).then(function (o) {
          return cn(o, n);
        }),
      };
    var a = cn(t, n);
    return a === null ? { tag: "empty" } : { tag: "sync", stripe: a };
  },
  Ms = function (t) {
    !t ||
      !t._registerWrapper ||
      !t.registerAppInfo ||
      (t._registerWrapper({ name: "react-stripe-js", version: "2.4.0" }),
      t.registerAppInfo({
        name: "react-stripe-js",
        version: "2.4.0",
        url: "https://stripe.com/docs/stripe-js/react",
      }));
  },
  nr = j.createContext(null);
nr.displayName = "CustomCheckoutSdkContext";
var Fs = function (t, n) {
    if (!t)
      throw new Error(
        "Could not find CustomCheckoutProvider context; You need to wrap the part of your app that ".concat(
          n,
          " in an <CustomCheckoutProvider> provider."
        )
      );
    return t;
  },
  Us = j.createContext(null);
Us.displayName = "CustomCheckoutContext";
I.any,
  I.shape({ clientSecret: I.string.isRequired, elementsOptions: I.object })
    .isRequired;
var xt = function (t) {
    var n = j.useContext(nr),
      a = j.useContext(Je);
    if (n && a)
      throw new Error(
        "You cannot wrap the part of your app that ".concat(
          t,
          " in both <CustomCheckoutProvider> and <Elements> providers."
        )
      );
    return n ? Fs(n, t) : rr(a, t);
  },
  Je = j.createContext(null);
Je.displayName = "ElementsContext";
var rr = function (t, n) {
    if (!t)
      throw new Error(
        "Could not find Elements context; You need to wrap the part of your app that ".concat(
          n,
          " in an <Elements> provider."
        )
      );
    return t;
  },
  wt = j.createContext(null);
wt.displayName = "CartElementContext";
var Ds = function (t, n) {
    if (!t)
      throw new Error(
        "Could not find Elements context; You need to wrap the part of your app that ".concat(
          n,
          " in an <Elements> provider."
        )
      );
    return t;
  },
  ar = function (t) {
    var n = t.stripe,
      a = t.options,
      o = t.children,
      s = j.useMemo(
        function () {
          return Ls(n);
        },
        [n]
      ),
      i = j.useState(null),
      l = He(i, 2),
      c = l[0],
      d = l[1],
      p = j.useState(null),
      u = He(p, 2),
      g = u[0],
      f = u[1],
      v = j.useState(function () {
        return {
          stripe: s.tag === "sync" ? s.stripe : null,
          elements: s.tag === "sync" ? s.stripe.elements(a) : null,
        };
      }),
      x = He(v, 2),
      y = x[0],
      S = x[1];
    j.useEffect(
      function () {
        var b = !0,
          P = function (D) {
            S(function (h) {
              return h.stripe ? h : { stripe: D, elements: D.elements(a) };
            });
          };
        return (
          s.tag === "async" && !y.stripe
            ? s.stripePromise.then(function (T) {
                T && b && P(T);
              })
            : s.tag === "sync" && !y.stripe && P(s.stripe),
          function () {
            b = !1;
          }
        );
      },
      [s, y, a]
    );
    var w = vt(n);
    j.useEffect(
      function () {
        w !== null &&
          w !== n &&
          console.warn(
            "Unsupported prop change on Elements: You cannot change the `stripe` prop after setting it."
          );
      },
      [w, n]
    );
    var C = vt(a);
    return (
      j.useEffect(
        function () {
          if (y.elements) {
            var b = er(a, C, ["clientSecret", "fonts"]);
            b && y.elements.update(b);
          }
        },
        [a, C, y.elements]
      ),
      j.useEffect(
        function () {
          Ms(y.stripe);
        },
        [y.stripe]
      ),
      j.createElement(
        Je.Provider,
        { value: y },
        j.createElement(
          wt.Provider,
          { value: { cart: c, setCart: d, cartState: g, setCartState: f } },
          o
        )
      )
    );
  };
ar.propTypes = { stripe: I.any, options: I.object };
var _s = function (t) {
    var n = j.useContext(Je);
    return rr(n, t);
  },
  Bs = {
    cart: null,
    cartState: null,
    setCart: function () {},
    setCartState: function () {},
  },
  ln = function (t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1,
      a = j.useContext(wt);
    return n ? Bs : Ds(a, t);
  },
  $s = function () {
    var t = _s("calls useElements()"),
      n = t.elements;
    return n;
  },
  Hs = function () {
    var t = xt("calls useStripe()"),
      n = t.stripe;
    return n;
  };
I.func.isRequired;
var V = function (t, n, a) {
    var o = !!a,
      s = j.useRef(a);
    j.useEffect(
      function () {
        s.current = a;
      },
      [a]
    ),
      j.useEffect(
        function () {
          if (!o || !t) return function () {};
          var i = function () {
            s.current && s.current.apply(s, arguments);
          };
          return (
            t.on(n, i),
            function () {
              t.off(n, i);
            }
          );
        },
        [o, n, t, s]
      );
  },
  zs = function (t) {
    return t.charAt(0).toUpperCase() + t.slice(1);
  },
  B = function (t, n) {
    var a = "".concat(zs(t), "Element"),
      o = function (c) {
        var d = c.id,
          p = c.className,
          u = c.options,
          g = u === void 0 ? {} : u,
          f = c.onBlur,
          v = c.onFocus,
          x = c.onReady,
          y = c.onChange,
          S = c.onEscape,
          w = c.onClick,
          C = c.onLoadError,
          b = c.onLoaderStart,
          P = c.onNetworksChange,
          T = c.onCheckout,
          D = c.onLineItemClick,
          h = c.onConfirm,
          O = c.onCancel,
          te = c.onShippingAddressChange,
          Q = c.onShippingRateChange,
          ie = xt("mounts <".concat(a, ">")),
          ce = "elements" in ie ? ie.elements : null,
          le = "customCheckoutSdk" in ie ? ie.customCheckoutSdk : null,
          Se = j.useState(null),
          Pe = He(Se, 2),
          L = Pe[0],
          Oe = Pe[1],
          z = j.useRef(null),
          ae = j.useRef(null),
          ye = ln("mounts <".concat(a, ">"), "customCheckoutSdk" in ie),
          oe = ye.setCart,
          _ = ye.setCartState;
        V(L, "blur", f),
          V(L, "focus", v),
          V(L, "escape", S),
          V(L, "click", w),
          V(L, "loaderror", C),
          V(L, "loaderstart", b),
          V(L, "networkschange", P),
          V(L, "lineitemclick", D),
          V(L, "confirm", h),
          V(L, "cancel", O),
          V(L, "shippingaddresschange", te),
          V(L, "shippingratechange", Q);
        var ne;
        t === "cart"
          ? (ne = function (Le) {
              _(Le), x && x(Le);
            })
          : x &&
            (t === "expressCheckout"
              ? (ne = x)
              : (ne = function () {
                  x(L);
                })),
          V(L, "ready", ne);
        var ve =
          t === "cart"
            ? function (U) {
                _(U), y && y(U);
              }
            : y;
        V(L, "change", ve);
        var Re =
          t === "cart"
            ? function (U) {
                _(U), T && T(U);
              }
            : T;
        V(L, "checkout", Re),
          j.useLayoutEffect(
            function () {
              if (z.current === null && ae.current !== null && (ce || le)) {
                var U = null;
                le ? (U = le.createElement(t, g)) : ce && (U = ce.create(t, g)),
                  t === "cart" && oe && oe(U),
                  (z.current = U),
                  Oe(U),
                  U && U.mount(ae.current);
              }
            },
            [ce, le, g, oe]
          );
        var xe = vt(g);
        return (
          j.useEffect(
            function () {
              if (z.current) {
                var U = er(g, xe, ["paymentRequest"]);
                U && z.current.update(U);
              }
            },
            [g, xe]
          ),
          j.useLayoutEffect(function () {
            return function () {
              if (z.current && typeof z.current.destroy == "function")
                try {
                  z.current.destroy(), (z.current = null);
                } catch {}
            };
          }, []),
          j.createElement("div", { id: d, className: p, ref: ae })
        );
      },
      s = function (c) {
        var d = xt("mounts <".concat(a, ">"));
        ln("mounts <".concat(a, ">"), "customCheckoutSdk" in d);
        var p = c.id,
          u = c.className;
        return j.createElement("div", { id: p, className: u });
      },
      i = n ? s : o;
    return (
      (i.propTypes = {
        id: I.string,
        className: I.string,
        onChange: I.func,
        onBlur: I.func,
        onFocus: I.func,
        onReady: I.func,
        onEscape: I.func,
        onClick: I.func,
        onLoadError: I.func,
        onLoaderStart: I.func,
        onNetworksChange: I.func,
        onCheckout: I.func,
        onLineItemClick: I.func,
        onConfirm: I.func,
        onCancel: I.func,
        onShippingAddressChange: I.func,
        onShippingRateChange: I.func,
        options: I.object,
      }),
      (i.displayName = a),
      (i.__elementType = t),
      i
    );
  },
  $ = typeof window > "u",
  Ws = j.createContext(null);
Ws.displayName = "EmbeddedCheckoutProviderContext";
B("auBankAccount", $);
B("card", $);
B("cardNumber", $);
B("cardExpiry", $);
B("cardCvc", $);
B("fpxBank", $);
B("iban", $);
B("idealBank", $);
B("p24Bank", $);
B("epsBank", $);
var or = B("payment", $);
B("expressCheckout", $);
B("paymentRequestButton", $);
B("linkAuthentication", $);
B("address", $);
B("shippingAddress", $);
B("cart", $);
B("paymentMethodMessaging", $);
B("affirmMessage", $);
B("afterpayClearpayMessage", $);
const Gs = () => {
  const e = se(),
    t = Z(),
    [n, a] = m(!1),
    [o, s] = m(!1),
    [i, l] = m(!1),
    [c, d] = m(!1),
    [p, u] = m(""),
    [g, f] = m([]),
    v = K((C) => C.cart);
  console.log("cart", v);
  const [x, y] = m(0);
  ee(() => {
    (async () => {
      try {
        u("Loading cart items"), d(!0);
        const b = JSON.parse(sessionStorage.getItem("loggedNoteappUser")),
          P = await we(b);
        f(P);
        const T = await me.getAllCartItems();
        console.log("Listings", T);
        const D = T.filter((h) => h != null && h !== "");
        if (D.length === 0) {
          t(at([])), d(!1);
          return;
        } else t(at(D)), console.log("Valid Listings", D), d(!1);
      } catch (b) {
        b.status === 401 &&
          (e("/login"),
          t(
            k(
              "Please login first your session has expired so we can keep your cart up to date",
              "error"
            )
          )),
          d(!1),
          console.error("Error fetching listings:", b);
      }
    })();
  }, []);
  const S = async (C) => {
    try {
      u("Deleting item"), d(!0), console.log(C);
      const b = await xn(C);
      t(at(b));
    } catch (b) {
      console.log(b);
    }
  };
  ee(() => {
    (() => {
      const b = v.reduce((P, T) => P + T.price, 0);
      y(b);
    })();
  }, [v]);
  const w = () => {
    if (!g) {
      alert("Please login first your session has expired");
      return;
    }
    e("/checkout"), g[0].name ? (l(!0), s(!0)) : (l(!0), a(!0));
  };
  return r.jsxs("div", {
    children: [
      r.jsxs("div", {
        children: [r.jsx(J, {}), "User Profile ", r.jsx(un, {})],
      }),
      r.jsx("div", {
        id: "listingstyle",
        children: v.map((C) =>
          r.jsxs(
            "div",
            {
              id: "listing",
              children: [
                r.jsx("div", {
                  children: r.jsx("img", {
                    src: "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
                    alt: C.name,
                    style: {
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "cover",
                    },
                  }),
                }),
                r.jsxs("div", {
                  style: { margin: 5 },
                  children: ["Name: ", C.name],
                }),
                r.jsxs("div", {
                  style: { margin: 5 },
                  children: ["Country: ", C.country],
                }),
                r.jsxs("div", {
                  style: { margin: 5 },
                  children: ["Price: ", C.price, " ", C.currency],
                }),
                r.jsxs("div", {
                  style: { margin: 5 },
                  children: ["Description: ", C.description],
                }),
                r.jsx(E, {
                  style: { margin: 5 },
                  type: "primary",
                  onClick: () => S(C.id),
                  children: "Delete",
                }),
              ],
            },
            C.id
          )
        ),
      }),
      r.jsx("div", {
        children: r.jsxs("h2", { children: ["Total price: ", x, " €"] }),
      }),
      r.jsx("div", {
        children: r.jsx(E, {
          type: "primary",
          onClick: w,
          children: "Check out",
        }),
      }),
      i &&
        r.jsxs("div", {
          children: [
            r.jsx(Nr, {
              items: [
                {
                  title: "Fill information",
                  status: "process",
                  icon: r.jsx(Gn, {}),
                },
                { title: "Confirm", status: "wait", icon: r.jsx(Zo, {}) },
                { title: "Pay", status: "wait", icon: r.jsx(Da, {}) },
                { title: "Done", status: "wait", icon: r.jsx(Ko, {}) },
              ],
            }),
            n &&
              r.jsxs("div", {
                children: [
                  r.jsx(A, {
                    type: "text",
                    placeholder: "Name",
                    value: g[0].name,
                  }),
                  r.jsx(A, {
                    type: "text",
                    placeholder: "Address",
                    value: g[0].address,
                  }),
                  r.jsx(A, {
                    type: "text",
                    placeholder: "Email",
                    value: g[0].email,
                  }),
                  r.jsx(E, { type: "primary", children: "Submit" }),
                ],
              }),
            o &&
              r.jsxs("div", {
                children: [
                  r.jsxs("div", {
                    children: [
                      r.jsx("h2", { children: "Confirm your order" }),
                      r.jsxs("h3", { children: ["Total price: ", x, " €"] }),
                    ],
                  }),
                  r.jsx(or, {}),
                ],
              }),
          ],
        }),
      r.jsx(ge, { loading: c, spinTip: p }),
    ],
  });
};
var De,
  Vs = new Uint8Array(16);
function Ks() {
  if (
    !De &&
    ((De =
      (typeof crypto < "u" &&
        crypto.getRandomValues &&
        crypto.getRandomValues.bind(crypto)) ||
      (typeof msCrypto < "u" &&
        typeof msCrypto.getRandomValues == "function" &&
        msCrypto.getRandomValues.bind(msCrypto))),
    !De)
  )
    throw new Error(
      "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
    );
  return De(Vs);
}
const qs =
  /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function Ys(e) {
  return typeof e == "string" && qs.test(e);
}
var H = [];
for (var ot = 0; ot < 256; ++ot) H.push((ot + 256).toString(16).substr(1));
function Js(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
    n = (
      H[e[t + 0]] +
      H[e[t + 1]] +
      H[e[t + 2]] +
      H[e[t + 3]] +
      "-" +
      H[e[t + 4]] +
      H[e[t + 5]] +
      "-" +
      H[e[t + 6]] +
      H[e[t + 7]] +
      "-" +
      H[e[t + 8]] +
      H[e[t + 9]] +
      "-" +
      H[e[t + 10]] +
      H[e[t + 11]] +
      H[e[t + 12]] +
      H[e[t + 13]] +
      H[e[t + 14]] +
      H[e[t + 15]]
    ).toLowerCase();
  if (!Ys(n)) throw TypeError("Stringified UUID is invalid");
  return n;
}
function sr(e, t, n) {
  e = e || {};
  var a = e.random || (e.rng || Ks)();
  if (((a[6] = (a[6] & 15) | 64), (a[8] = (a[8] & 63) | 128), t)) {
    n = n || 0;
    for (var o = 0; o < 16; ++o) t[n + o] = a[o];
    return t;
  }
  return Js(a);
}
const ir = ({
    firstName: e,
    setFirstName: t,
    lastName: n,
    setLastname: a,
    email: o,
    setEmail: s,
  }) =>
    r.jsxs("div", {
      children: [
        r.jsxs("div", {
          style: { display: "flex" },
          children: [
            r.jsx(A, {
              id: "personalInfoInput",
              type: "text",
              placeholder: "First name",
              value: e,
              onChange: (i) => t(i.target.value),
              required: !0,
            }),
            r.jsx(A, {
              id: "personalInfoInput",
              type: "text",
              placeholder: "Last name",
              value: n,
              onChange: (i) => a(i.target.value),
              required: !0,
            }),
          ],
        }),
        r.jsx("div", {
          children: r.jsx(A, {
            id: "personalLongInput",
            type: "text",
            placeholder: "Email",
            autoComplete: "email",
            value: o,
            onChange: (i) => s(i.target.value),
            required: !0,
          }),
        }),
      ],
    }),
  cr = ({
    city: e,
    setCity: t,
    address: n,
    setAddress: a,
    postalCode: o,
    setPostalCode: s,
    selectedCountry: i,
    setSelectedCountry: l,
  }) => {
    const c = (d, p) =>
      ((p == null ? void 0 : p.label) ?? "")
        .toLowerCase()
        .includes(d.toLowerCase());
    return r.jsxs("div", {
      children: [
        r.jsx("div", {
          children: r.jsx(be, {
            style: { width: 300, margin: 5 },
            showSearch: !0,
            placeholder: "Select your country",
            options: We,
            onChange: (d) => l(d),
            filterOption: c,
            value: i,
            required: !0,
          }),
        }),
        r.jsx("div", {
          children: r.jsx(A, {
            id: "addressLongInput",
            type: "text",
            placeholder: "Address",
            value: n,
            onChange: (d) => a(d.target.value),
            required: !0,
          }),
        }),
        r.jsxs("div", {
          style: { display: "flex" },
          children: [
            r.jsx(A, {
              id: "personalInfoInput",
              type: "text",
              placeholder: "City",
              value: e,
              onChange: (d) => t(d.target.value),
              required: !0,
            }),
            r.jsx(A, {
              id: "personalInfoInput",
              type: "text",
              placeholder: "Postal code",
              value: o,
              onChange: (d) => s(d.target.value),
              required: !0,
            }),
          ],
        }),
      ],
    });
  },
  lr = ({
    iban: e,
    setIban: t,
    phoneNumber: n,
    setPhoneNumber: a,
    style: o,
    setStyle: s,
    setBirthDay: i,
    birthDay: l,
  }) => {
    const c = [
        { label: "Buyer", value: "buyer" },
        { label: "Seller", value: "seller" },
        { label: "Both", value: "both" },
      ],
      d = (p) => {
        i(p.target.value), console.log(p.target.value);
      };
    return (
      console.log(l),
      r.jsxs("div", {
        children: [
          r.jsx("div", {
            children: r.jsx(A, {
              style: { width: 300 },
              id: "input",
              type: "text",
              autoComplete: "tel",
              placeholder: "Phone number",
              value: n,
              onChange: (p) => a(p.target.value),
            }),
          }),
          r.jsx("div", {
            style: { display: "flex" },
            children: r.jsx(A, { type: "date", value: l, onChange: d }),
          }),
          r.jsx("div", {
            children: r.jsx(A, {
              id: "personalLongInput",
              type: "text",
              placeholder: "IBAN",
              autoComplete: "iban",
              value: e,
              onChange: (p) => t(p.target.value),
            }),
          }),
          r.jsxs("div", {
            id: "personalStyleDiv",
            children: [
              r.jsx("div", {
                children: r.jsx("p", { children: "What role you wanna take" }),
              }),
              r.jsx("div", {
                children: r.jsx(Lr.Group, {
                  id: "input",
                  options: c,
                  onChange: (p) => s(p.target.value),
                  value: o,
                  optionType: "button",
                }),
              }),
            ],
          }),
        ],
      })
    );
  },
  Zs = () => {
    const e = Z(),
      t = se(),
      [n, a] = m(""),
      [o, s] = m(""),
      [i, l] = m(""),
      [c, d] = m(""),
      [p, u] = m(""),
      [g, f] = m(""),
      [v, x] = m(""),
      [y, S] = m(""),
      [w, C] = m("buyer"),
      [b, P] = m("FI"),
      [T, D] = m(""),
      [h, O] = m(!0),
      [te, Q] = m(!1),
      [ie, ce] = m(!1),
      [le, Se] = m(""),
      [Pe, L] = m(!1),
      Oe = "Creating account...",
      z = async (_) => {
        _.preventDefault();
        try {
          const ne = sr();
          console.log("phone", y);
          const ve = le.split("-"),
            Re = `${ve[1]}/${ve[2]}/${ve[0]}`,
            xe = {
              email: n,
              firstName: i,
              lastName: c,
              password: o,
              style: w,
              country: b,
              id: ne,
              city: p,
              address: g,
              postalCode: v,
              phone: y,
              Dob: Re,
              iban: T,
            };
          L(!0),
            await Zr(xe),
            await ca(xe),
            L(!1),
            t("/login"),
            a(""),
            l(""),
            s("");
        } catch (ne) {
          L(!1),
            console.error("Registration failed:", ne.error),
            e(k(ne.error));
        }
      },
      ae = () => {
        O((_) => !_), Q((_) => !_);
      },
      ye = () => {
        t("/login");
      },
      oe = () => {
        Q((_) => !_), ce((_) => !_);
      };
    return r.jsx("div", {
      style: {
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      },
      children: r.jsxs("div", {
        children: [
          r.jsx("h1", { children: "Register" }),
          r.jsxs("form", {
            onSubmit: z,
            children: [
              h &&
                r.jsxs("div", {
                  children: [
                    r.jsx(ir, {
                      firstName: i,
                      setFirstName: l,
                      lastName: c,
                      setLastname: d,
                      email: n,
                      setEmail: a,
                      password: o,
                      setPassword: s,
                      style: w,
                      setStyle: C,
                      handlePersonalInfoForm: ae,
                    }),
                    r.jsx("div", {
                      children: r.jsx(A.Password, {
                        type: "password",
                        placeholder: "Password",
                        value: o,
                        autoComplete: "new-password",
                        required: !0,
                        onChange: (_) => s(_.target.value),
                      }),
                    }),
                    r.jsxs("div", {
                      id: "NextBackButtonDiv",
                      children: [
                        r.jsx(E, {
                          type: "primary",
                          onClick: ye,
                          children: "Cancel",
                        }),
                        r.jsx(E, {
                          type: "primary",
                          onClick: ae,
                          children: "Next",
                        }),
                      ],
                    }),
                  ],
                }),
              te &&
                r.jsxs("div", {
                  children: [
                    r.jsx(cr, {
                      city: p,
                      setCity: u,
                      address: g,
                      setAddress: f,
                      postalCode: v,
                      setPostalCode: x,
                      selectedCountry: b,
                      setSelectedCountry: P,
                      handleAddressInfoForm: oe,
                      handlePersonalInfoForm: ae,
                    }),
                    r.jsxs("div", {
                      id: "NextBackButtonDiv",
                      children: [
                        r.jsx(E, {
                          type: "primary",
                          onClick: ae,
                          children: "Back",
                        }),
                        r.jsx(E, {
                          type: "primary",
                          onClick: oe,
                          children: "Next",
                        }),
                      ],
                    }),
                  ],
                }),
              ie &&
                r.jsxs("div", {
                  children: [
                    r.jsx(lr, {
                      birthDay: le,
                      setBirthDay: Se,
                      setIban: D,
                      iban: T,
                      phoneNumber: y,
                      setPhoneNumber: S,
                      handleAddressInfoForm: oe,
                      handleRegistery: z,
                      setStyle: C,
                      style: w,
                    }),
                    r.jsxs("div", {
                      id: "NextBackButtonDiv",
                      children: [
                        r.jsx(E, {
                          type: "primary",
                          onClick: oe,
                          children: "Back",
                        }),
                        r.jsx(E, {
                          onClick: z,
                          type: "primary",
                          children: "Submit",
                        }),
                      ],
                    }),
                  ],
                }),
            ],
          }),
          r.jsx(ge, { loading: Pe, spinTip: Oe }),
        ],
      }),
    });
  },
  Qs = () => {
    const e = Z(),
      t = se(),
      [n, a] = m(!1),
      [o, s] = m(""),
      [i, l] = m([]),
      c = K((u) => u.favorite.map((v) => v.id)),
      d = async (u) => {
        if (i.length === 0) {
          e(k("Please login first your session has expired"));
          return;
        }
        if (c.includes(u)) await jn(u), e(gt());
        else {
          const g = await bn(u);
          g === "You have already marked it as favorite"
            ? e(k(g))
            : (e(Yn(g)), e(k(`${g.name} was added to your favorites`)));
        }
      };
    ee(() => {
      (async () => {
        s("Loading favorite items");
        try {
          a(!0);
          const g = JSON.parse(sessionStorage.getItem("loggedNoteappUser")),
            f = await we(g);
          l(f);
          const v = await Cn();
          e(gt(v)), a(!1);
        } catch (g) {
          console.log("error", g.status),
            g.status === 401 &&
              (t("/login"),
              e(
                k(
                  "Please login first your session has expired so we can keep your favorites stored",
                  "error"
                )
              )),
            a(!1),
            console.error("Error fetching favorite items:", g);
        }
      })();
    }, []),
      (document.title = "Favorites");
    const p = K((u) => u.favorite);
    return !p || p.length === 0
      ? r.jsxs("div", {
          children: [
            r.jsx(J, {}),
            r.jsx("div", {
              style: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
              },
              children: r.jsx("h1", { children: "No favorites" }),
            }),
          ],
        })
      : r.jsxs("div", {
          children: [
            r.jsx(J, {}),
            r.jsx("div", {
              id: "listingstyle",
              children: p.map((u) =>
                r.jsxs(
                  "div",
                  {
                    id: "listing",
                    children: [
                      r.jsx("img", {
                        src: "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
                        alt: u.name,
                        style: {
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "cover",
                          borderRadius: 10,
                        },
                      }),
                      r.jsxs("div", {
                        children: [
                          r.jsxs("div", {
                            style: { margin: 5 },
                            children: ["Name: ", u.name],
                          }),
                          r.jsxs("div", {
                            style: { margin: 5 },
                            children: ["Country: ", u.country],
                          }),
                          r.jsxs("div", {
                            style: { margin: 5 },
                            children: ["Price:", u.price, " ", u.currency, " "],
                          }),
                          r.jsxs("div", {
                            style: { margin: 5 },
                            children: [
                              "Last price: ",
                              u.lastPrice,
                              " ",
                              u.currency,
                            ],
                          }),
                          r.jsxs("div", {
                            style: { margin: 5 },
                            children: ["Description: ", u.description],
                          }),
                        ],
                      }),
                      r.jsx(E, {
                        style: {
                          margin: 10,
                          color:
                            i && i.favorites && i.favorite.includes(u.id)
                              ? "red"
                              : "black",
                        },
                        onClick: () => d(u.id),
                        children: r.jsx(Ge, {
                          style: { color: c.includes(u.id) ? "red" : "black" },
                        }),
                      }),
                      " ",
                    ],
                  },
                  u.id
                )
              ),
            }),
            r.jsx(ge, { loading: n, tip: o }),
          ],
        });
  },
  Xs = () => {
    const e = Z(),
      t = se(),
      [n, a] = m(!0),
      [o, s] = m(!0),
      [i, l] = m(!1),
      [c, d] = m(!1),
      [p, u] = m(""),
      [g, f] = m(""),
      [v, x] = m(""),
      [y, S] = m(""),
      [w, C] = m(""),
      [b, P] = m(!1),
      [T, D] = m(""),
      [h, O] = m(""),
      [te, Q] = m(""),
      [ie, ce] = m(""),
      [le, Se] = m(""),
      [Pe, L] = m(""),
      [Oe, z] = m(""),
      [ae, ye] = m(""),
      [oe, _] = m(""),
      [ne, ve] = m([]);
    ee(() => {
      const W = JSON.parse(sessionStorage.getItem("user"));
      _("Loading user info..."),
        (async () => {
          try {
            a(!0);
            const G = await we(W);
            ve(G),
              console.log("response", G),
              u(G.email),
              f(G.firstname),
              x(G.lastname),
              S(G.address || ""),
              C(G.phone || ""),
              Q(G.style),
              ce(G.city || ""),
              Se(G.postalCode || ""),
              L(G.country || "");
            const Ze = G.Dob.split("/"),
              St = `${Ze[2]}-${Ze[0]}-${Ze[1]}`;
            console.log("date", St), z(St || ""), ye(G.iban || ""), a(!1);
          } catch (G) {
            G.status === 401 &&
              (t("/login"), e(k("Please login to continue.")));
          }
        })();
    }, []);
    const Re = () => {
        P((W) => !W);
      },
      xe = async () => {
        try {
          _("Updating user info...");
          const W = await ra(p, name, y, w, te);
          e(k(W)), console.log(W);
        } catch (W) {
          console.error(W.error), e(k(W.error));
        }
      },
      U = () => {
        T === h
          ? (_("Changing password..."), a(!0), aa(T), a(!1))
          : console.log("passwords do not match");
      },
      Le = async () => {
        if (window.confirm("Are you sure you want to delete your account?")) {
          _("Deleting account..."), a(!0);
          const W = await oa();
          t("/login"), e(k(W)), a(!1);
        }
      },
      mr = () => {
        s(!0), l(!1), d(!1);
      },
      gr = () => {
        s(!1), l(!0), d(!1);
      },
      yr = () => {
        s(!1), l(!1), d(!0);
      };
    return ne.length === 0
      ? r.jsxs("div", {
          children: [
            r.jsx(J, {}),
            r.jsx("div", {
              style: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
              },
              children: r.jsxs("div", {
                children: [
                  r.jsx("p", {
                    children: "Please login first your session has expired",
                  }),
                  r.jsx(E, {
                    type: "primary",
                    onClick: () => t("/login"),
                    children: "Login",
                  }),
                  r.jsx(E, {
                    style: { margin: 5 },
                    type: "primary",
                    onClick: () => t("/register"),
                    children: "Register",
                  }),
                ],
              }),
            }),
          ],
        })
      : r.jsx("div", {
          children: r.jsxs("div", {
            children: [
              r.jsx(J, {}),
              r.jsx("h1", { children: "Userpage" }),
              r.jsxs("div", {
                id: "userPageDiv",
                children: [
                  r.jsx("div", {
                    style: {
                      display: "flex",
                      justifyContent: "center",
                      backgroundColor: "aqua",
                    },
                    children: r.jsxs("ul", {
                      id: "usernavbar",
                      children: [
                        r.jsx("li", {
                          id: "usernavitem",
                          onClick: mr,
                          children: "Personal Info",
                        }),
                        r.jsx("li", {
                          id: "usernavitem",
                          onClick: gr,
                          children: "Address Info",
                        }),
                        r.jsx("li", {
                          id: "usernavitem",
                          onClick: yr,
                          children: "Additional Info",
                        }),
                      ],
                    }),
                  }),
                  o &&
                    r.jsx("div", {
                      children: r.jsx(ir, {
                        lastName: v,
                        setLastname: x,
                        firstName: g,
                        setFirstName: f,
                        email: p,
                        setEmail: u,
                        password: T,
                        setPassword: D,
                      }),
                    }),
                  i &&
                    r.jsx("div", {
                      children: r.jsx(cr, {
                        city: ie,
                        setCity: ce,
                        address: y,
                        setAddress: S,
                        postalCode: le,
                        setPostalCode: Se,
                        selectedCountry: Pe,
                        setSelectedCountry: L,
                      }),
                    }),
                  c &&
                    r.jsx("div", {
                      children: r.jsx(lr, {
                        phoneNumber: w,
                        setPhoneNumber: C,
                        style: te,
                        setStyle: Q,
                        birthDay: Oe,
                        setBirthDay: z,
                        iban: ae,
                        setIban: ye,
                      }),
                    }),
                  r.jsxs("div", {
                    children: [
                      r.jsx(E, {
                        type: "primary",
                        onClick: xe,
                        style: { margin: 10 },
                        children: "Save changes",
                      }),
                      r.jsx(E, {
                        type: "primary",
                        onClick: Re,
                        style: { margin: 10 },
                        children: "Change Password",
                      }),
                    ],
                  }),
                  r.jsx("div", {
                    style: { margin: 10 },
                    children:
                      b &&
                      r.jsx("form", {
                        children: r.jsxs("div", {
                          children: [
                            r.jsxs("div", {
                              style: { margin: 10 },
                              children: [
                                r.jsx("label", {
                                  htmlFor: "password",
                                  children: "Password: ",
                                }),
                                r.jsx(A.Password, {
                                  value: T,
                                  onChange: (W) => D(W.target.value),
                                  id: "password",
                                  autoComplete: "new-password",
                                  style: { width: 300 },
                                }),
                              ],
                            }),
                            r.jsxs("div", {
                              style: { margin: 10 },
                              children: [
                                r.jsx("label", {
                                  htmlFor: "password2",
                                  children: "Repeat Password: ",
                                }),
                                r.jsx(A.Password, {
                                  value: h,
                                  onChange: (W) => O(W.target.value),
                                  id: "password2",
                                  autoComplete: "new-password",
                                  style: { width: 300 },
                                }),
                              ],
                            }),
                            r.jsx(E, {
                              type: "primary",
                              onClick: U,
                              children: "Save Password",
                            }),
                          ],
                        }),
                      }),
                  }),
                  r.jsx("div", {
                    style: { margin: 10 },
                    children: r.jsx(E, {
                      type: "primary",
                      danger: !0,
                      onClick: Le,
                      children: "Delete Account",
                    }),
                  }),
                ],
              }),
              r.jsx(ge, { loading: n, spinTip: oe }),
            ],
          }),
        });
  },
  ei = () => r.jsx("h1", { children: "Error 404: Page not found" }),
  ti = () => {
    const e = {
        backgroundColor: "#f8f8f8",
        padding: "50px 0",
        display: "flex",
      },
      t = { maxWidth: "800px", margin: "0 auto", textAlign: "center" },
      n = { color: "#333" },
      a = { marginBottom: "20px", lineHeight: "1.6", color: "#777" },
      o = { display: "flex", flexDirection: "column", alignItems: "center" },
      s = {
        width: "100%",
        padding: "10px",
        margin: "10px 0",
        boxSizing: "border-box",
      },
      i = {
        background: "#28a745",
        color: "#fff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      };
    return r.jsxs("div", {
      children: [
        r.jsx(J, {}),
        r.jsx("section", {
          style: e,
          children: r.jsxs("div", {
            style: t,
            children: [
              r.jsx("h2", { style: n, children: "Contact Us" }),
              r.jsx("p", {
                style: a,
                children:
                  "Have questions or suggestions? Reach out to us! We'd love to hear from you.",
              }),
              r.jsxs("form", {
                style: o,
                children: [
                  r.jsx("input", {
                    type: "text",
                    placeholder: "Your Name",
                    style: s,
                  }),
                  r.jsx("input", {
                    type: "email",
                    placeholder: "Your Email",
                    style: s,
                  }),
                  r.jsx("textarea", { placeholder: "Your Message", style: s }),
                  r.jsx("button", {
                    type: "submit",
                    style: i,
                    children: "Submit",
                  }),
                ],
              }),
            ],
          }),
        }),
      ],
    });
  },
  { TextArea: ni } = A,
  ri = () => {
    const e = We,
      t = Z(),
      n = se(),
      [a, o] = m("Select country"),
      [s, i] = m(0),
      [l, c] = m(""),
      [d, p] = m("None"),
      [u, g] = m(!1),
      [f, v] = m([]),
      x = "EUR",
      [y, S] = m([]),
      [w, C] = m(""),
      b = sr();
    (document.title = "Add listing"),
      ee(() => {
        (async () => {
          try {
            const O = JSON.parse(sessionStorage.getItem("loggedNoteappUser")),
              te = await we(O);
            v(te);
          } catch (O) {
            O.status === 401 &&
              (n("/login"),
              t(
                k(
                  "Please login first your session has expired so we can add your listing to your account and you could get the money from it",
                  "error"
                )
              ));
          }
        })();
      }, []);
    const P = async () => {
        try {
          g(!0);
          const h = await Qr(l, a, s, x, d, w, y, b);
          h.error
            ? (g(!1), console.error("Adding failed", h.error), t(k(h.error)))
            : (g(!1),
              n("/"),
              t(fa(h)),
              console.log(h),
              t(k(h.name, "was listed")),
              console.log("Navigoidaan"));
        } catch (h) {
          g(!1), console.error("Adding failed", h.message), t(k(h.message));
        }
      },
      T = (h) => {
        const O = h.target.files;
        S(Array.from(O));
      },
      D = (h, O) =>
        ((O == null ? void 0 : O.label) ?? "")
          .toLowerCase()
          .includes(h.toLowerCase());
    return (
      f.length,
      r.jsxs("div", {
        children: [
          r.jsxs("div", {
            children: [
              r.jsx(J, {}),
              r.jsx("h1", { id: "ah1", children: "Add a new item" }),
            ],
          }),
          r.jsxs("div", {
            style: { display: "flex" },
            children: [
              r.jsx("div", {
                id: "divContainer",
                children: r.jsx("div", {
                  id: "Prev",
                  children: r.jsxs("div", {
                    children: [
                      r.jsx("img", {
                        src: "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
                        alt: "previewPic",
                        style: {
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "cover",
                          borderRadius: 10,
                        },
                      }),
                      r.jsxs("div", {
                        children: [
                          r.jsxs("div", {
                            style: { margin: 5 },
                            children: ["Name: ", l],
                          }),
                          r.jsxs("div", {
                            style: { margin: 5 },
                            children: ["Country: ", a],
                          }),
                          r.jsxs("div", {
                            style: { margin: 5 },
                            children: ["Price: ", s, " ", x],
                          }),
                          r.jsxs("div", {
                            style: { margin: 5 },
                            children: ["Description: ", w],
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              }),
              r.jsxs("div", {
                id: "InputDiv",
                children: [
                  r.jsx("div", {
                    id: "ainputdiv",
                    children: r.jsx(A, {
                      type: "text",
                      placeholder: "Name of listing",
                      value: l,
                      onChange: (h) => c(h.target.value),
                    }),
                  }),
                  r.jsx("div", {
                    id: "ainputdiv",
                    children: r.jsx(be, {
                      style: { width: 200 },
                      showSearch: !0,
                      defaultValue: "Finaland",
                      value: a,
                      filterOption: D,
                      onChange: (h) => o(h),
                      options: e,
                    }),
                  }),
                  r.jsx("div", {
                    id: "ainputdiv",
                    children: r.jsx(A, {
                      addonBefore: "EUR",
                      value: s,
                      onChange: (h) => i(h.target.value),
                    }),
                  }),
                  r.jsx("div", {
                    id: "ainputdiv",
                    children: r.jsx(be, {
                      style: { width: 200 },
                      value: d,
                      options: yt,
                      onChange: (h) => p(h),
                    }),
                  }),
                  r.jsx("div", {
                    id: "ainputdiv",
                    children: r.jsx(ni, {
                      style: { width: 300 },
                      showCount: !0,
                      maxLength: 300,
                      onChange: (h) => C(h.target.value),
                      placeholder: "Description",
                    }),
                  }),
                  r.jsx("div", {
                    id: "ainputdiv",
                    children: r.jsx(A, {
                      type: "file",
                      multiple: !0,
                      onChange: T,
                    }),
                  }),
                  r.jsx("div", {
                    id: "ainputdiv",
                    children: r.jsx(E, {
                      type: "primary",
                      onClick: P,
                      children: "Submit",
                    }),
                  }),
                ],
              }),
              r.jsx(ge, { loading: u, spinTip: "Adding listing" }),
            ],
          }),
        ],
      })
    );
  },
  ai = () =>
    r.jsxs("div", { children: [r.jsx(J, {}), "User Profile ", r.jsx(Ge, {})] }),
  oi = () => {
    const e = Z(),
      t = K((a) => a.notification);
    console.log("Huomautus", t);
    const n = { border: "solid", padding: 10, borderWidth: 1 };
    return (
      setTimeout(() => {
        e(Ia());
      }, 3e3),
      t !== "" ? r.jsx("div", { style: n, children: t }) : null
    );
  },
  dr = Ae({
    name: "userListing",
    initialState: [],
    reducers: {
      appendUserListing(e, t) {
        e.push(t.payload);
      },
      setUserListing(e, t) {
        return t.payload;
      },
      clearUserListing() {
        return [];
      },
    },
  }),
  {
    appendUserListing: Ni,
    setUserListing: si,
    clearUserListing: Li,
  } = dr.actions,
  st = () => async (e) => {
    const t = await wn();
    e(si(t));
  },
  ii = dr.reducer,
  ci = () => {
    const e = Z(),
      t = se(),
      [n, a] = m(""),
      [o, s] = m(""),
      [i, l] = m(""),
      [c, d] = m(""),
      [p, u] = m(),
      [g, f] = m(!1),
      [v, x] = m(!1),
      [y, S] = m(""),
      [w, C] = m([]),
      b = K((h) => h.userListings);
    console.log(b),
      console.log("User", w),
      (document.title = "Own Listings"),
      ee(() => {
        const h = async () => {
          S("Loading user listings...");
          try {
            x(!0);
            const O = JSON.parse(sessionStorage.getItem("loggedNoteappUser")),
              te = await we(O);
            C(te);
            const Q = await wn();
            console.log("User listings", Q), e(st(Q)), x(!1);
          } catch (O) {
            O.status === 401 &&
              (t("/login"),
              e(
                k(
                  "Please login first your session has expired so we can keep your favorites stored",
                  "error"
                )
              )),
              x(!1),
              console.error(O);
          }
        };
        w.lenght > 0 && h();
      }, []),
      console.log(w),
      console.log("Userlength", w.length);
    const P = (h) => {
        if ((console.log(h), console.log(p), p !== h)) {
          f(!0);
          const O = b.filter((Q) => Q.id === h);
          a(O[0].name),
            s(O[0].country),
            l(O[0].price),
            d(O[0].description),
            console.log(O),
            la({ id: h, name: n, country: o, price: i, description: c }),
            u(h);
        } else p === h && (f(!1), u(""));
      },
      T = async () => {
        const h = await sa(n, o, i, c, p);
        console.log("Save"),
          console.log(p),
          console.log("Vastaus", h),
          e(st()),
          f(!1);
      },
      D = async (h) => {
        console.log("Delete"), console.log(h);
        const O = await Sn(h);
        console.log("response", O), e(st());
      };
    return w.length === 0
      ? r.jsxs("div", {
          children: [
            r.jsx(J, {}),
            r.jsx("div", {
              style: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
              },
              children: r.jsxs("div", {
                children: [
                  r.jsx("p", {
                    children: "Please login first your session has expired",
                  }),
                  r.jsx(E, {
                    type: "primary",
                    onClick: () => t("/login"),
                    children: "Login",
                  }),
                  r.jsx(E, {
                    style: { margin: 5 },
                    type: "primary",
                    onClick: () => t("/register"),
                    children: "Register",
                  }),
                ],
              }),
            }),
            r.jsx(ge, { loading: v, tip: y }),
          ],
        })
      : r.jsxs("div", {
          children: [
            r.jsx(J, {}),
            "User Profile",
            r.jsx("div", {
              id: "listingstyle",
              children: b.map((h) =>
                r.jsxs(
                  "div",
                  {
                    id: "listing",
                    children: [
                      r.jsx("div", {
                        children: r.jsx("img", {
                          src: "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
                          alt: h.name,
                          style: {
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "cover",
                            borderRadius: 10,
                          },
                        }),
                      }),
                      r.jsxs("div", {
                        children: [
                          r.jsxs("div", {
                            style: { margin: 5 },
                            children: ["Name: ", h.name],
                          }),
                          r.jsxs("div", {
                            style: { margin: 5 },
                            children: ["Country: ", h.country],
                          }),
                          r.jsxs("div", {
                            style: { margin: 5 },
                            children: ["Price: ", h.price, " ", h.currency],
                          }),
                          r.jsxs("div", {
                            style: { margin: 5 },
                            children: ["Description: ", h.description],
                          }),
                        ],
                      }),
                      r.jsxs("div", {
                        id: "itemstyle",
                        children: [
                          r.jsx(E, {
                            type: "primary",
                            onClick: () => P(h.id),
                            children: "Edit",
                          }),
                          r.jsx(E, {
                            type: "primary",
                            onClick: () => D(h.id),
                            children: "Delete",
                          }),
                        ],
                      }),
                    ],
                  },
                  h.id
                )
              ),
            }),
            g &&
              r.jsxs("div", {
                children: [
                  r.jsx("div", {
                    children: r.jsx(A, {
                      value: n,
                      onChange: (h) => a(h.target.value),
                      style: { margin: 10, width: 300 },
                    }),
                  }),
                  r.jsx("div", {
                    children: r.jsx(A, {
                      value: o,
                      onChange: (h) => s(h.target.value),
                      style: { margin: 10, width: 300 },
                    }),
                  }),
                  r.jsx(A, {
                    value: i,
                    onChange: (h) => l(h.target.value),
                    style: { margin: 10, width: 300 },
                  }),
                  r.jsx("div", {
                    children: r.jsx(A, {
                      value: c,
                      onChange: (h) => d(h.target.value),
                      style: { margin: 10, width: 300 },
                    }),
                  }),
                  r.jsxs("div", {
                    children: [
                      r.jsx(E, {
                        type: "primary",
                        onClick: () => {
                          f(!1), u("");
                        },
                        children: "Cancel",
                      }),
                      r.jsx(E, {
                        onClick: T,
                        style: { margin: 10 },
                        type: "primary",
                        children: "Save",
                      }),
                    ],
                  }),
                  r.jsx(ge, { loading: v, tip: y }),
                ],
              }),
          ],
        });
  };
var ur = "https://js.stripe.com/v3",
  li = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,
  dn =
    "loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used",
  di = function () {
    for (
      var t = document.querySelectorAll('script[src^="'.concat(ur, '"]')),
        n = 0;
      n < t.length;
      n++
    ) {
      var a = t[n];
      if (li.test(a.src)) return a;
    }
    return null;
  },
  ui = function (t) {
    var n = t && !t.advancedFraudSignals ? "?advancedFraudSignals=false" : "",
      a = document.createElement("script");
    a.src = "".concat(ur).concat(n);
    var o = document.head || document.body;
    if (!o)
      throw new Error(
        "Expected document.body not to be null. Stripe.js requires a <body> element."
      );
    return o.appendChild(a), a;
  },
  fi = function (t, n) {
    !t ||
      !t._registerWrapper ||
      t._registerWrapper({ name: "stripe-js", version: "2.2.0", startTime: n });
  },
  _e = null,
  pi = function (t) {
    return (
      _e !== null ||
        (_e = new Promise(function (n, a) {
          if (typeof window > "u" || typeof document > "u") {
            n(null);
            return;
          }
          if ((window.Stripe && t && console.warn(dn), window.Stripe)) {
            n(window.Stripe);
            return;
          }
          try {
            var o = di();
            o && t ? console.warn(dn) : o || (o = ui(t)),
              o.addEventListener("load", function () {
                window.Stripe
                  ? n(window.Stripe)
                  : a(new Error("Stripe.js not available"));
              }),
              o.addEventListener("error", function () {
                a(new Error("Failed to load Stripe.js"));
              });
          } catch (s) {
            a(s);
            return;
          }
        })),
      _e
    );
  },
  hi = function (t, n, a) {
    if (t === null) return null;
    var o = t.apply(void 0, n);
    return fi(o, a), o;
  },
  fr = Promise.resolve().then(function () {
    return pi(null);
  }),
  pr = !1;
fr.catch(function (e) {
  pr || console.warn(e);
});
var mi = function () {
  for (var t = arguments.length, n = new Array(t), a = 0; a < t; a++)
    n[a] = arguments[a];
  pr = !0;
  var o = Date.now();
  return fr.then(function (s) {
    return hi(s, n, o);
  });
};
function gi() {
  const e = Hs(),
    t = $s(),
    n = Z(),
    [a, o] = m(""),
    [s, i] = m(!1),
    l = K((u) => u.user),
    c = l[0].cart.author;
  console.log("UserCart", c),
    ee(() => {
      if (!e) return;
      const u = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );
      u &&
        e.retrievePaymentIntent(u).then(({ paymentIntent: g }) => {
          switch (g.status) {
            case "succeeded":
              n(k("Payment succeeded!")), console.log(g);
              break;
            case "processing":
              n(k("Your payment is processing.")), console.log(g);
              break;
            case "requires_payment_method":
              n(k("Your payment was not successful, please try again.")),
                console.log(g);
              break;
            default:
              n(k("Something went wrong.")), console.log(g);
              break;
          }
        });
    }, [e]),
    console.log("User", l),
    console.log("Kärry", c);
  const d = async (u) => {
      if ((u.preventDefault(), !e || !t)) return;
      i(!0);
      const { error: g } = await e.confirmPayment({
        elements: t,
        confirmParams: {
          return_url: "http://localhost:5173/payment-successful",
          receipt_email: a,
        },
      });
      g.type === "card_error" || g.type === "validation_error"
        ? n(k(g.message))
        : n(k("An unexpected error occurred.")),
        i(!1);
    },
    p = {
      layout: {
        type: "accordion",
        defaultCollapsed: !1,
        radios: !1,
        spacedAccordionItems: !0,
      },
    };
  return r.jsx("body", {
    id: "body",
    children: r.jsxs("form", {
      id: "payment-form",
      onSubmit: d,
      children: [
        r.jsx("input", {
          id: "email",
          type: "text",
          value: a,
          onChange: (u) => o(u.target.value),
          placeholder: "Enter email address",
        }),
        r.jsx(or, { id: "payment-element", options: p }),
        r.jsx("button", {
          disabled: s || !e || !t,
          id: "submit",
          children: r.jsx("span", {
            id: "button-text",
            children: s
              ? r.jsx("div", { className: "spinner", id: "spinner" })
              : "Pay now",
          }),
        }),
      ],
    }),
  });
}
const yi = mi(
    "pk_test_51OKnCVIH6vH73ShNYWADAfCZDWGrshfLbylxZJNzr3qJcuGHKavRE0JITdLoMRL3VnEsuD8CG7TlFbqLRNROLKrh000HpEysVB"
  ),
  vi = () => {
    const [e, t] = m("");
    ee(() => {
      (async () => {
        const s = await me.getAllCartItems(),
          i = await ia(s);
        t(i.clientSecret), console.log(i);
      })();
    }, []);
    const a = { clientSecret: e, appearance: { theme: "stripe" } };
    return r.jsxs("div", {
      children: [
        r.jsx("h1", { children: "Checkout Page" }),
        e && r.jsx(ar, { options: a, stripe: yi, children: r.jsx(gi, {}) }),
      ],
    });
  },
  xi = () => {
    const e = Z(),
      t = se();
    ee(() => {
      console.log("useEffect"),
        (async () => {
          const i = window.sessionStorage.getItem("loggedNoteappUser"),
            l = JSON.parse(i);
          console.log(l);
          const c = await we();
          e(yn()), e(gn(c));
        })();
    }, []);
    const n = K((s) => s.cart);
    console.log(n);
    const a = K((s) => s.user),
      o = async () => {
        const s = a[0].email,
          i = n[0].author;
        await da(s, i, n),
          console.log("send receipt s"),
          await ua(s, i, n),
          console.log("send receipt b"),
          n.forEach(async (l) => {
            console.log("delete user listing"),
              await Sn(l.id),
              console.log("delete cart item"),
              await xn(l.id);
          }),
          t("/"),
          e(Kn());
      };
    return r.jsxs("div", {
      children: [
        r.jsx("h1", { children: "Payment Sucess" }),
        r.jsx("h2", { children: "Thank you for your purchase" }),
        r.jsx("h3", { children: "Order details" }),
        r.jsx("div", {
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          children: n.map((s) =>
            r.jsxs(
              "div",
              {
                id: "Cartlisting",
                children: [
                  r.jsx("div", {
                    children: r.jsx("img", {
                      src: "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
                      alt: s.name,
                      style: {
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "cover",
                        borderRadius: 10,
                      },
                    }),
                  }),
                  r.jsxs("div", {
                    children: [
                      r.jsxs("div", {
                        style: { margin: 5 },
                        children: ["Name: ", s.name],
                      }),
                      r.jsxs("div", {
                        style: { margin: 5 },
                        children: ["Country: ", s.country],
                      }),
                      r.jsxs("div", {
                        style: { margin: 5 },
                        children: ["Price: ", s.price, " ", s.currency],
                      }),
                      r.jsxs("div", {
                        style: { margin: 5 },
                        children: ["Description: ", s.description],
                      }),
                    ],
                  }),
                ],
              },
              s.id
            )
          ),
        }),
        r.jsx("div", {
          children: r.jsx(E, {
            type: "primary",
            onClick: o,
            children: "Back to Home",
          }),
        }),
      ],
    });
  },
  Ci = () => {
    const e = Z();
    Et(() => {
      (async () => {
        try {
          const a = await me.getAllListings();
          e(ct(a)), console.log("Listings", a);
        } catch (a) {
          console.error("Error fetching listings:", a);
        }
      })();
    }, []),
      Et(() => {
        const n = JSON.parse(sessionStorage.getItem("loggedNoteappUser"));
        (async () => {
          if ((me.setToken(n), !n && n.lenght === 0)) {
            console.log("No user logged in");
            return;
          }
          try {
            console.log("Fetching user data"), console.log(n);
            const o = await we(n);
            console.log("Logged user", o), qr(o);
          } catch (o) {
            if (o.error === "token expired") {
              console.log("Token expired"),
                sessionStorage.removeItem("loggedNoteappUser");
              return;
            }
            console.error("Error fetching user:", o);
          }
        })();
      }, []);
    const t = K((n) => n.user);
    return (
      console.log("App.js user", t),
      r.jsxs("div", {
        children: [
          r.jsx(oi, {}),
          r.jsx(Aa, {
            children: r.jsxs(Tr, {
              children: [
                r.jsx(q, { path: "/", exact: !0, Component: Cs }),
                r.jsx(q, { path: "/about", Component: bs }),
                r.jsx(q, { path: "/cart", Component: Gs }),
                r.jsx(q, { path: "/checkout", Component: vi }),
                r.jsx(q, { path: "/login", Component: Ma }),
                r.jsx(q, { path: "/register", Component: Zs }),
                r.jsx(q, { path: "/favorites", Component: Qs }),
                r.jsx(q, { path: "/user", Component: Xs }),
                r.jsx(q, { path: "/contacts", Component: ti }),
                r.jsx(q, { path: "/add", Component: ri }),
                r.jsx(q, { path: "/history", Component: ai }),
                r.jsx(q, { path: "/ownlisting", Component: ci }),
                r.jsx(q, { path: "/payment-successful", Component: xi }),
                r.jsx(q, { path: "/*", Component: ei }),
              ],
            }),
          }),
        ],
      })
    );
  },
  bi = jr({
    filter: ss,
    minPrice: cs,
    maxPrice: ls,
    country: ds,
    category: us,
  }),
  hr = wr({
    reducer: {
      user: Yr,
      listing: ma,
      cart: hs,
      notification: Na,
      filter: bi,
      favorite: ys,
      userListings: ii,
    },
  });
console.log(hr.getState());
it.createRoot(document.getElementById("root")).render(
  r.jsx(br, { store: hr, children: r.jsx(Ci, {}) })
);
