var U = Object.create; var d = Object.defineProperty; var F = Object.getOwnPropertyDescriptor; var M =
  Object.getOwnPropertyNames; var z = Object.getPrototypeOf, B = Object.prototype.hasOwnProperty; var b = (e, t) => () =>
    (t || e((t = { exports: {} }).exports, t), t.exports), H = (e, t) => {
      for (var r in t) d(e, r, {
        get: t[r], enumerable:
          !0
      })
    }, C = (e, t, r, u) => {
      if (t && typeof t == "object" || typeof t == "function") for (let o of M(t)) !B.call(e,
        o) && o !== r && d(e, o, { get: () => t[o], enumerable: !(u = F(t, o)) || u.enumerable }); return e
    }; var W = (e, t, r)
      => (r = e != null ? U(z(e)) : {}, C(t || !e || !e.__esModule ? d(r, "default", { value: e, enumerable: !0 }) : r, e)), G
        = e => C(d({}, "__esModule", { value: !0 }), e); var L = b(n => {
          "use strict"; var y = Symbol.for("react.element"), J =
            Symbol.for("react.portal"), K = Symbol.for("react.fragment"), Q = Symbol.for("react.strict_mode"), Y =
              Symbol.for("react.profiler"), X = Symbol.for("react.provider"), Z = Symbol.for("react.context"), ee =
              Symbol.for("react.forward_ref"), te = Symbol.for("react.suspense"), re = Symbol.for("react.memo"), ne =
              Symbol.for("react.lazy"), j = Symbol.iterator; function oe(e) {
                return e === null || typeof e != "object" ? null : (e =
                  j && e[j] || e["@@iterator"], typeof e == "function" ? e : null)
              } var O = {
                isMounted: function () { return !1 },
                enqueueForceUpdate: function () { }, enqueueReplaceState: function () { }, enqueueSetState: function () { }
              }, P =
                  Object.assign, I = {}; function p(e, t, r) { this.props = e, this.context = t, this.refs = I, this.updater = r || O }
          p.prototype.isReactComponent = {}; p.prototype.setState = function (e, t) {
            if (typeof e != "object" && typeof e !=
              "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which
returns an object of state variables."); this.updater.enqueueSetState(this, e, t, "setState") }; p.prototype.forceUpdate
              = function (e) { this.updater.enqueueForceUpdate(this, e, "forceUpdate") }; function V() { } V.prototype = p.prototype;
            function S(e, t, r) { this.props = e, this.context = t, this.refs = I, this.updater = r || O } var E = S.prototype = new
              V; E.constructor = S; P(E, p.prototype); E.isPureReactComponent = !0; var g = Array.isArray, q =
                Object.prototype.hasOwnProperty, k = { current: null }, A = { key: !0, ref: !0, __self: !0, __source: !0 }; function
              D(e, t, r) {
                var u, o = {}, c = null, f = null; if (t != null) for (u in t.ref !== void 0 && (f = t.ref), t.key !== void
                  0 && (c = "" + t.key), t) q.call(t, u) && !A.hasOwnProperty(u) && (o[u] = t[u]); var s = arguments.length - 2; if (s ===
                    1) o.children = r; else if (1 < s) { for (var i = Array(s), a = 0; a < s; a++)i[a] = arguments[a + 2]; o.children = i } if (e &&
                      e.defaultProps) for (u in s = e.defaultProps, s) o[u] === void 0 && (o[u] = s[u]); return {
                        $$typeof: y, type: e, key: c,
                        ref: f, props: o, _owner: k.current
                      }
            } function ue(e, t) {
              return {
                $$typeof: y, type: e.type, key: t, ref: e.ref,
                props: e.props, _owner: e._owner
              }
            } function w(e) { return typeof e == "object" && e !== null && e.$$typeof === y }
            function ie(e) { var t = { "=": "=0", ":": "=2" }; return "$" + e.replace(/[=:]/g, function (r) { return t[r] }) }
            var x = /\/+/g; function v(e, t) {
              return typeof e == "object" && e !== null && e.key != null ? ie("" + e.key) :
                t.toString(36)
            } function h(e, t, r, u, o) {
              var c = typeof e; (c === "undefined" || c === "boolean") && (e = null); var
                f = !1; if (e === null) f = !0; else switch (c) {
                  case "string": case "number": f = !0; break; case "object": switch
                    (e.$$typeof) { case y: case J: f = !0 }
                }if (f) return f = e, o = o(f), e = u === "" ? "." + v(f, 0) : u, g(o) ? (r = "", e
                  != null && (r = e.replace(x, "$&/") + "/"), h(o, t, r, "", function (a) { return a })) : o != null && (w(o) && (o = ue(o,
                    r + (!o.key || f && f.key === o.key ? "" : ("" + o.key).replace(x, "$&/") + "/") + e)), t.push(o)), 1; if (f = 0,
                      u = u === "" ? "." : u + ":", g(e)) for (var s = 0; s < e.length; s++) { c = e[s]; var i = u + v(c, s); f += h(c, t, r, i, o) }
              else if (i = oe(e), typeof i == "function") for (e = i.call(e), s = 0; !(c = e.next()).done;)c = c.value, i = u + v(c, s++), f
                += h(c, t, r, i, o); else if (c === "object") throw t = String(e), Error("Objects are not valid as a React child
                  (found: " + (t === "[object Object]" ? "object with keys { " + Object.keys(e).join(", ") + " } " : t)
                    + "). If you meant to render a collection of children, use an array instead." ); return f } function _(e, t, r) {
                      if
                        (e == null) return e; var u = [], o = 0; return h(e, u, "", "", function (c) { return t.call(r, c, o++) }), u
                    } function
  ce(e) {
    if (e._status === -1) {
      var t = e._result; t = t(), t.then(function (r) {
        (e._status === 0 || e._status === -1) &&
        (e._status = 1, e._result = r)
      }, function (r) { (e._status === 0 || e._status === -1) && (e._status = 2, e._result = r) }),
        e._status === -1 && (e._status = 0, e._result = t)
    } if (e._status === 1) return e._result.default; throw e._result
} var l = {
  current: null
}, m = { transition: null }, se = {
  ReactCurrentDispatcher: l, ReactCurrentBatchConfig: m,
  ReactCurrentOwner: k
}; n.Children = {
  map: _, forEach: function (e, t, r) {
    _(e, function () {
      t.apply(this, arguments)
    }, r)
  }, count: function (e) { var t = 0; return _(e, function () { t++ }), t }, toArray: function (e) {
    return _(e,
      function (t) { return t }) || []
  }, only: function (e) {
    if (!w(e)) throw Error("React.Children.only expected to
  receive a single React element child."); return e } }; n.Component=p; n.Fragment=K; n.Profiler=Y; n.PureComponent=S;
  n.StrictMode = Q; n.Suspense = te; n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = se; n.cloneElement = function (e, t,
      r) {
        if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + "
          ."); var u=P({}, e.props), o=e.key, c=e.ref, f=e._owner; if (t !=null) { if (t.ref !==void 0 && (c=t.ref,
  f = k.current), t.key !== void 0 && (o = "" + t.key), e.type && e.type.defaultProps) var s = e.type.defaultProps; for (i in
        t) q.call(t, i) && !A.hasOwnProperty(i) && (u[i] = t[i] === void 0 && s !== void 0 ? s[i] : t[i])
    } var i = arguments.length
      - 2; if (i === 1) u.children = r; else if (1 < i) {
        s = Array(i); for (var a = 0; a < i; a++)s[a] = arguments[a + 2];
        u.children = s
      } return { $$typeof: y, type: e.type, key: o, ref: c, props: u, _owner: f }
  }; n.createContext = function
    (e) {
      return e = {
        $$typeof: Z, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null,
        _defaultValue: null, _globalName: null
      }, e.Provider = { $$typeof: X, _context: e }, e.Consumer = e
  }; n.createElement = D;
  n.createFactory = function (e) { var t = D.bind(null, e); return t.type = e, t }; n.createRef = function () {
    return {
      current: null
    }
  }; n.forwardRef = function (e) { return { $$typeof: ee, render: e } }; n.isValidElement = w;
  n.lazy = function (e) { return { $$typeof: ne, _payload: { _status: -1, _result: e }, _init: ce } }; n.memo = function (e,
    t) { return { $$typeof: re, type: e, compare: t === void 0 ? null : t } }; n.startTransition = function (e) {
      var
      t = m.transition; m.transition = {}; try { e() } finally { m.transition = t }
    }; n.unstable_act = function () {
      throw
      Error("act(...) is not supported in production builds of React.")
    }; n.useCallback = function (e, t) {
      return
      l.current.useCallback(e, t)
    }; n.useContext = function (e) { return l.current.useContext(e) }; n.useDebugValue = function
      () { }; n.useDeferredValue = function (e) { return l.current.useDeferredValue(e) }; n.useEffect = function (e, t) {
        return
        l.current.useEffect(e, t)
      }; n.useId = function () { return l.current.useId() }; n.useImperativeHandle = function (e, t,
        r) { return l.current.useImperativeHandle(e, t, r) }; n.useInsertionEffect = function (e, t) {
          return
          l.current.useInsertionEffect(e, t)
        }; n.useLayoutEffect = function (e, t) { return l.current.useLayoutEffect(e, t) };
  n.useMemo = function (e, t) { return l.current.useMemo(e, t) }; n.useReducer = function (e, t, r) {
    return
    l.current.useReducer(e, t, r)
  }; n.useRef = function (e) { return l.current.useRef(e) }; n.useState = function (e) {
    return l.current.useState(e)
  }; n.useSyncExternalStore = function (e, t, r) {
    return l.current.useSyncExternalStore(e,
      t, r)
  }; n.useTransition = function () { return l.current.useTransition() }; n.version = "18.2.0"
}); var N = b((ye, T) => {
  "use strict"; T.exports = L()
}); var le = {}; H(le, { SSRApp: () => fe }); module.exports = G(le); var R = W(N()), $
  = require("@dil-team-eevee/product-components"), fe = ({ data: e }) => {
    let t = { loading: !1, products: e }; return
    console.log("ProductList"), console.log($.ProductList), R.default.createElement("div", null,
      R.default.createElement($.ProductList, { result: { result: t } }))
  }; 0 && (module.exports = { SSRApp });
  /*! Bundled license information:

react/cjs/react.production.min.js:
(**
* @license React
* react.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*)
*/
  //# sourceMappingURL=template.js.map