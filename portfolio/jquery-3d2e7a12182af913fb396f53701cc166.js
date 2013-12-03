/*!
 * jQuery JavaScript Library v1.10.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-05-24T18:39Z
 */
!function(e, t) {
function n(e) {
var t = e.length, n = ut.type(e);
return ut.isWindow(e) ? !1 :1 === e.nodeType && t ? !0 :"array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e);
}
function i(e) {
var t = St[e] = {};
return ut.each(e.match(ht) || [], function(e, n) {
t[n] = !0;
}), t;
}
function r(e, n, i, r) {
if (ut.acceptData(e)) {
var o, a, s = ut.expando, l = e.nodeType, c = l ? ut.cache :e, u = l ? e[s] :e[s] && s;
if (u && c[u] && (r || c[u].data) || i !== t || "string" != typeof n) return u || (u = l ? e[s] = tt.pop() || ut.guid++ :s), 
c[u] || (c[u] = l ? {} :{
toJSON:ut.noop
}), ("object" == typeof n || "function" == typeof n) && (r ? c[u] = ut.extend(c[u], n) :c[u].data = ut.extend(c[u].data, n)), 
a = c[u], r || (a.data || (a.data = {}), a = a.data), i !== t && (a[ut.camelCase(n)] = i), 
"string" == typeof n ? (o = a[n], null == o && (o = a[ut.camelCase(n)])) :o = a, 
o;
}
}
function o(e, t, n) {
if (ut.acceptData(e)) {
var i, r, o = e.nodeType, a = o ? ut.cache :e, l = o ? e[ut.expando] :ut.expando;
if (a[l]) {
if (t && (i = n ? a[l] :a[l].data)) {
ut.isArray(t) ? t = t.concat(ut.map(t, ut.camelCase)) :t in i ? t = [ t ] :(t = ut.camelCase(t), 
t = t in i ? [ t ] :t.split(" ")), r = t.length;
for (;r--; ) delete i[t[r]];
if (n ? !s(i) :!ut.isEmptyObject(i)) return;
}
(n || (delete a[l].data, s(a[l]))) && (o ? ut.cleanData([ e ], !0) :ut.support.deleteExpando || a != a.window ? delete a[l] :a[l] = null);
}
}
}
function a(e, n, i) {
if (i === t && 1 === e.nodeType) {
var r = "data-" + n.replace(Tt, "-$1").toLowerCase();
if (i = e.getAttribute(r), "string" == typeof i) {
try {
i = "true" === i ? !0 :"false" === i ? !1 :"null" === i ? null :+i + "" === i ? +i :Et.test(i) ? ut.parseJSON(i) :i;
} catch (o) {}
ut.data(e, n, i);
} else i = t;
}
return i;
}
function s(e) {
var t;
for (t in e) if (("data" !== t || !ut.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
return !0;
}
function l() {
return !0;
}
function c() {
return !1;
}
function u() {
try {
return Q.activeElement;
} catch (e) {}
}
function d(e, t) {
do e = e[t]; while (e && 1 !== e.nodeType);
return e;
}
function h(e, t, n) {
if (ut.isFunction(t)) return ut.grep(e, function(e, i) {
return !!t.call(e, i, e) !== n;
});
if (t.nodeType) return ut.grep(e, function(e) {
return e === t !== n;
});
if ("string" == typeof t) {
if (zt.test(t)) return ut.filter(t, e, n);
t = ut.filter(t, e);
}
return ut.grep(e, function(e) {
return ut.inArray(e, t) >= 0 !== n;
});
}
function f(e) {
var t = qt.split("|"), n = e.createDocumentFragment();
if (n.createElement) for (;t.length; ) n.createElement(t.pop());
return n;
}
function p(e, t) {
return ut.nodeName(e, "table") && ut.nodeName(1 === t.nodeType ? t :t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) :e;
}
function m(e) {
return e.type = (null !== ut.find.attr(e, "type")) + "/" + e.type, e;
}
function g(e) {
var t = on.exec(e.type);
return t ? e.type = t[1] :e.removeAttribute("type"), e;
}
function v(e, t) {
for (var n, i = 0; null != (n = e[i]); i++) ut._data(n, "globalEval", !t || ut._data(t[i], "globalEval"));
}
function y(e, t) {
if (1 === t.nodeType && ut.hasData(e)) {
var n, i, r, o = ut._data(e), a = ut._data(t, o), s = o.events;
if (s) {
delete a.handle, a.events = {};
for (n in s) for (i = 0, r = s[n].length; r > i; i++) ut.event.add(t, n, s[n][i]);
}
a.data && (a.data = ut.extend({}, a.data));
}
}
function b(e, t) {
var n, i, r;
if (1 === t.nodeType) {
if (n = t.nodeName.toLowerCase(), !ut.support.noCloneEvent && t[ut.expando]) {
r = ut._data(t);
for (i in r.events) ut.removeEvent(t, i, r.handle);
t.removeAttribute(ut.expando);
}
"script" === n && t.text !== e.text ? (m(t).text = e.text, g(t)) :"object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), 
ut.support.html5Clone && e.innerHTML && !ut.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) :"input" === n && tn.test(e.type) ? (t.defaultChecked = t.checked = e.checked, 
t.value !== e.value && (t.value = e.value)) :"option" === n ? t.defaultSelected = t.selected = e.defaultSelected :("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue);
}
}
function w(e, n) {
var i, r, o = 0, a = typeof e.getElementsByTagName !== G ? e.getElementsByTagName(n || "*") :typeof e.querySelectorAll !== G ? e.querySelectorAll(n || "*") :t;
if (!a) for (a = [], i = e.childNodes || e; null != (r = i[o]); o++) !n || ut.nodeName(r, n) ? a.push(r) :ut.merge(a, w(r, n));
return n === t || n && ut.nodeName(e, n) ? ut.merge([ e ], a) :a;
}
function _(e) {
tn.test(e.type) && (e.defaultChecked = e.checked);
}
function x(e, t) {
if (t in e) return t;
for (var n = t.charAt(0).toUpperCase() + t.slice(1), i = t, r = Sn.length; r--; ) if (t = Sn[r] + n, 
t in e) return t;
return i;
}
function k(e, t) {
return e = t || e, "none" === ut.css(e, "display") || !ut.contains(e.ownerDocument, e);
}
function C(e, t) {
for (var n, i, r, o = [], a = 0, s = e.length; s > a; a++) i = e[a], i.style && (o[a] = ut._data(i, "olddisplay"), 
n = i.style.display, t ? (o[a] || "none" !== n || (i.style.display = ""), "" === i.style.display && k(i) && (o[a] = ut._data(i, "olddisplay", N(i.nodeName)))) :o[a] || (r = k(i), 
(n && "none" !== n || !r) && ut._data(i, "olddisplay", r ? n :ut.css(i, "display"))));
for (a = 0; s > a; a++) i = e[a], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? o[a] || "" :"none"));
return e;
}
function S(e, t, n) {
var i = yn.exec(t);
return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") :t;
}
function E(e, t, n, i, r) {
for (var o = n === (i ? "border" :"content") ? 4 :"width" === t ? 1 :0, a = 0; 4 > o; o += 2) "margin" === n && (a += ut.css(e, n + Cn[o], !0, r)), 
i ? ("content" === n && (a -= ut.css(e, "padding" + Cn[o], !0, r)), "margin" !== n && (a -= ut.css(e, "border" + Cn[o] + "Width", !0, r))) :(a += ut.css(e, "padding" + Cn[o], !0, r), 
"padding" !== n && (a += ut.css(e, "border" + Cn[o] + "Width", !0, r)));
return a;
}
function T(e, t, n) {
var i = !0, r = "width" === t ? e.offsetWidth :e.offsetHeight, o = dn(e), a = ut.support.boxSizing && "border-box" === ut.css(e, "boxSizing", !1, o);
if (0 >= r || null == r) {
if (r = hn(e, t, o), (0 > r || null == r) && (r = e.style[t]), bn.test(r)) return r;
i = a && (ut.support.boxSizingReliable || r === e.style[t]), r = parseFloat(r) || 0;
}
return r + E(e, t, n || (a ? "border" :"content"), i, o) + "px";
}
function N(e) {
var t = Q, n = _n[e];
return n || (n = A(e, t), "none" !== n && n || (un = (un || ut("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), 
t = (un[0].contentWindow || un[0].contentDocument).document, t.write("<!doctype html><html><body>"), 
t.close(), n = A(e, t), un.detach()), _n[e] = n), n;
}
function A(e, t) {
var n = ut(t.createElement(e)).appendTo(t.body), i = ut.css(n[0], "display");
return n.remove(), i;
}
function $(e, t, n, i) {
var r;
if (ut.isArray(t)) ut.each(t, function(t, r) {
n || Tn.test(e) ? i(e, r) :$(e + "[" + ("object" == typeof r ? t :"") + "]", r, n, i);
}); else if (n || "object" !== ut.type(t)) i(e, t); else for (r in t) $(e + "[" + r + "]", t[r], n, i);
}
function M(e) {
return function(t, n) {
"string" != typeof t && (n = t, t = "*");
var i, r = 0, o = t.toLowerCase().match(ht) || [];
if (ut.isFunction(n)) for (;i = o[r++]; ) "+" === i[0] ? (i = i.slice(1) || "*", 
(e[i] = e[i] || []).unshift(n)) :(e[i] = e[i] || []).push(n);
};
}
function D(e, t, n, i) {
function r(s) {
var l;
return o[s] = !0, ut.each(e[s] || [], function(e, s) {
var c = s(t, n, i);
return "string" != typeof c || a || o[c] ? a ? !(l = c) :void 0 :(t.dataTypes.unshift(c), 
r(c), !1);
}), l;
}
var o = {}, a = e === Un;
return r(t.dataTypes[0]) || !o["*"] && r("*");
}
function I(e, n) {
var i, r, o = ut.ajaxSettings.flatOptions || {};
for (r in n) n[r] !== t && ((o[r] ? e :i || (i = {}))[r] = n[r]);
return i && ut.extend(!0, e, i), e;
}
function B(e, n, i) {
for (var r, o, a, s, l = e.contents, c = e.dataTypes; "*" === c[0]; ) c.shift(), 
o === t && (o = e.mimeType || n.getResponseHeader("Content-Type"));
if (o) for (s in l) if (l[s] && l[s].test(o)) {
c.unshift(s);
break;
}
if (c[0] in i) a = c[0]; else {
for (s in i) {
if (!c[0] || e.converters[s + " " + c[0]]) {
a = s;
break;
}
r || (r = s);
}
a = a || r;
}
return a ? (a !== c[0] && c.unshift(a), i[a]) :void 0;
}
function P(e, t, n, i) {
var r, o, a, s, l, c = {}, u = e.dataTypes.slice();
if (u[1]) for (a in e.converters) c[a.toLowerCase()] = e.converters[a];
for (o = u.shift(); o; ) if (e.responseFields[o] && (n[e.responseFields[o]] = t), 
!l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = u.shift()) if ("*" === o) o = l; else if ("*" !== l && l !== o) {
if (a = c[l + " " + o] || c["* " + o], !a) for (r in c) if (s = r.split(" "), s[1] === o && (a = c[l + " " + s[0]] || c["* " + s[0]])) {
a === !0 ? a = c[r] :c[r] !== !0 && (o = s[0], u.unshift(s[1]));
break;
}
if (a !== !0) if (a && e["throws"]) t = a(t); else try {
t = a(t);
} catch (d) {
return {
state:"parsererror",
error:a ? d :"No conversion from " + l + " to " + o
};
}
}
return {
state:"success",
data:t
};
}
function O() {
try {
return new e.XMLHttpRequest();
} catch (t) {}
}
function R() {
try {
return new e.ActiveXObject("Microsoft.XMLHTTP");
} catch (t) {}
}
function L() {
return setTimeout(function() {
Zn = t;
}), Zn = ut.now();
}
function H(e, t, n) {
for (var i, r = (oi[t] || []).concat(oi["*"]), o = 0, a = r.length; a > o; o++) if (i = r[o].call(n, t, e)) return i;
}
function F(e, t, n) {
var i, r, o = 0, a = ri.length, s = ut.Deferred().always(function() {
delete l.elem;
}), l = function() {
if (r) return !1;
for (var t = Zn || L(), n = Math.max(0, c.startTime + c.duration - t), i = n / c.duration || 0, o = 1 - i, a = 0, l = c.tweens.length; l > a; a++) c.tweens[a].run(o);
return s.notifyWith(e, [ c, o, n ]), 1 > o && l ? n :(s.resolveWith(e, [ c ]), !1);
}, c = s.promise({
elem:e,
props:ut.extend({}, t),
opts:ut.extend(!0, {
specialEasing:{}
}, n),
originalProperties:t,
originalOptions:n,
startTime:Zn || L(),
duration:n.duration,
tweens:[],
createTween:function(t, n) {
var i = ut.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
return c.tweens.push(i), i;
},
stop:function(t) {
var n = 0, i = t ? c.tweens.length :0;
if (r) return this;
for (r = !0; i > n; n++) c.tweens[n].run(1);
return t ? s.resolveWith(e, [ c, t ]) :s.rejectWith(e, [ c, t ]), this;
}
}), u = c.props;
for (j(u, c.opts.specialEasing); a > o; o++) if (i = ri[o].call(c, e, u, c.opts)) return i;
return ut.map(u, H, c), ut.isFunction(c.opts.start) && c.opts.start.call(e, c), 
ut.fx.timer(ut.extend(l, {
elem:e,
anim:c,
queue:c.opts.queue
})), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always);
}
function j(e, t) {
var n, i, r, o, a;
for (n in e) if (i = ut.camelCase(n), r = t[i], o = e[n], ut.isArray(o) && (r = o[1], 
o = e[n] = o[0]), n !== i && (e[i] = o, delete e[n]), a = ut.cssHooks[i], a && "expand" in a) {
o = a.expand(o), delete e[i];
for (n in o) n in e || (e[n] = o[n], t[n] = r);
} else t[i] = r;
}
function z(e, t, n) {
var i, r, o, a, s, l, c = this, u = {}, d = e.style, h = e.nodeType && k(e), f = ut._data(e, "fxshow");
n.queue || (s = ut._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, 
l = s.empty.fire, s.empty.fire = function() {
s.unqueued || l();
}), s.unqueued++, c.always(function() {
c.always(function() {
s.unqueued--, ut.queue(e, "fx").length || s.empty.fire();
});
})), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [ d.overflow, d.overflowX, d.overflowY ], 
"inline" === ut.css(e, "display") && "none" === ut.css(e, "float") && (ut.support.inlineBlockNeedsLayout && "inline" !== N(e.nodeName) ? d.zoom = 1 :d.display = "inline-block")), 
n.overflow && (d.overflow = "hidden", ut.support.shrinkWrapBlocks || c.always(function() {
d.overflow = n.overflow[0], d.overflowX = n.overflow[1], d.overflowY = n.overflow[2];
}));
for (i in t) if (r = t[i], ti.exec(r)) {
if (delete t[i], o = o || "toggle" === r, r === (h ? "hide" :"show")) continue;
u[i] = f && f[i] || ut.style(e, i);
}
if (!ut.isEmptyObject(u)) {
f ? "hidden" in f && (h = f.hidden) :f = ut._data(e, "fxshow", {}), o && (f.hidden = !h), 
h ? ut(e).show() :c.done(function() {
ut(e).hide();
}), c.done(function() {
var t;
ut._removeData(e, "fxshow");
for (t in u) ut.style(e, t, u[t]);
});
for (i in u) a = H(h ? f[i] :0, i, c), i in f || (f[i] = a.start, h && (a.end = a.start, 
a.start = "width" === i || "height" === i ? 1 :0));
}
}
function W(e, t, n, i, r) {
return new W.prototype.init(e, t, n, i, r);
}
function U(e, t) {
var n, i = {
height:e
}, r = 0;
for (t = t ? 1 :0; 4 > r; r += 2 - t) n = Cn[r], i["margin" + n] = i["padding" + n] = e;
return t && (i.opacity = i.width = e), i;
}
function V(e) {
return ut.isWindow(e) ? e :9 === e.nodeType ? e.defaultView || e.parentWindow :!1;
}
var q, K, G = typeof t, Y = e.location, Q = e.document, J = Q.documentElement, X = e.jQuery, Z = e.$, et = {}, tt = [], nt = "1.10.0", it = tt.concat, rt = tt.push, ot = tt.slice, at = tt.indexOf, st = et.toString, lt = et.hasOwnProperty, ct = nt.trim, ut = function(e, t) {
return new ut.fn.init(e, t, K);
}, dt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, ht = /\S+/g, ft = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, pt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, mt = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, gt = /^[\],:{}\s]*$/, vt = /(?:^|:|,)(?:\s*\[)+/g, yt = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, bt = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g, wt = /^-ms-/, _t = /-([\da-z])/gi, xt = function(e, t) {
return t.toUpperCase();
}, kt = function(e) {
(Q.addEventListener || "load" === e.type || "complete" === Q.readyState) && (Ct(), 
ut.ready());
}, Ct = function() {
Q.addEventListener ? (Q.removeEventListener("DOMContentLoaded", kt, !1), e.removeEventListener("load", kt, !1)) :(Q.detachEvent("onreadystatechange", kt), 
e.detachEvent("onload", kt));
};
ut.fn = ut.prototype = {
jquery:nt,
constructor:ut,
init:function(e, n, i) {
var r, o;
if (!e) return this;
if ("string" == typeof e) {
if (r = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [ null, e, null ] :pt.exec(e), 
!r || !r[1] && n) return !n || n.jquery ? (n || i).find(e) :this.constructor(n).find(e);
if (r[1]) {
if (n = n instanceof ut ? n[0] :n, ut.merge(this, ut.parseHTML(r[1], n && n.nodeType ? n.ownerDocument || n :Q, !0)), 
mt.test(r[1]) && ut.isPlainObject(n)) for (r in n) ut.isFunction(this[r]) ? this[r](n[r]) :this.attr(r, n[r]);
return this;
}
if (o = Q.getElementById(r[2]), o && o.parentNode) {
if (o.id !== r[2]) return i.find(e);
this.length = 1, this[0] = o;
}
return this.context = Q, this.selector = e, this;
}
return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) :ut.isFunction(e) ? i.ready(e) :(e.selector !== t && (this.selector = e.selector, 
this.context = e.context), ut.makeArray(e, this));
},
selector:"",
length:0,
toArray:function() {
return ot.call(this);
},
get:function(e) {
return null == e ? this.toArray() :0 > e ? this[this.length + e] :this[e];
},
pushStack:function(e) {
var t = ut.merge(this.constructor(), e);
return t.prevObject = this, t.context = this.context, t;
},
each:function(e, t) {
return ut.each(this, e, t);
},
ready:function(e) {
return ut.ready.promise().done(e), this;
},
slice:function() {
return this.pushStack(ot.apply(this, arguments));
},
first:function() {
return this.eq(0);
},
last:function() {
return this.eq(-1);
},
eq:function(e) {
var t = this.length, n = +e + (0 > e ? t :0);
return this.pushStack(n >= 0 && t > n ? [ this[n] ] :[]);
},
map:function(e) {
return this.pushStack(ut.map(this, function(t, n) {
return e.call(t, n, t);
}));
},
end:function() {
return this.prevObject || this.constructor(null);
},
push:rt,
sort:[].sort,
splice:[].splice
}, ut.fn.init.prototype = ut.fn, ut.extend = ut.fn.extend = function() {
var e, n, i, r, o, a, s = arguments[0] || {}, l = 1, c = arguments.length, u = !1;
for ("boolean" == typeof s && (u = s, s = arguments[1] || {}, l = 2), "object" == typeof s || ut.isFunction(s) || (s = {}), 
c === l && (s = this, --l); c > l; l++) if (null != (o = arguments[l])) for (r in o) e = s[r], 
i = o[r], s !== i && (u && i && (ut.isPlainObject(i) || (n = ut.isArray(i))) ? (n ? (n = !1, 
a = e && ut.isArray(e) ? e :[]) :a = e && ut.isPlainObject(e) ? e :{}, s[r] = ut.extend(u, a, i)) :i !== t && (s[r] = i));
return s;
}, ut.extend({
expando:"jQuery" + (nt + Math.random()).replace(/\D/g, ""),
noConflict:function(t) {
return e.$ === ut && (e.$ = Z), t && e.jQuery === ut && (e.jQuery = X), ut;
},
isReady:!1,
readyWait:1,
holdReady:function(e) {
e ? ut.readyWait++ :ut.ready(!0);
},
ready:function(e) {
if (e === !0 ? !--ut.readyWait :!ut.isReady) {
if (!Q.body) return setTimeout(ut.ready);
ut.isReady = !0, e !== !0 && --ut.readyWait > 0 || (q.resolveWith(Q, [ ut ]), ut.fn.trigger && ut(Q).trigger("ready").off("ready"));
}
},
isFunction:function(e) {
return "function" === ut.type(e);
},
isArray:Array.isArray || function(e) {
return "array" === ut.type(e);
},
isWindow:function(e) {
return null != e && e == e.window;
},
isNumeric:function(e) {
return !isNaN(parseFloat(e)) && isFinite(e);
},
type:function(e) {
return null == e ? String(e) :"object" == typeof e || "function" == typeof e ? et[st.call(e)] || "object" :typeof e;
},
isPlainObject:function(e) {
var n;
if (!e || "object" !== ut.type(e) || e.nodeType || ut.isWindow(e)) return !1;
try {
if (e.constructor && !lt.call(e, "constructor") && !lt.call(e.constructor.prototype, "isPrototypeOf")) return !1;
} catch (i) {
return !1;
}
if (ut.support.ownLast) for (n in e) return lt.call(e, n);
for (n in e) ;
return n === t || lt.call(e, n);
},
isEmptyObject:function(e) {
var t;
for (t in e) return !1;
return !0;
},
error:function(e) {
throw new Error(e);
},
parseHTML:function(e, t, n) {
if (!e || "string" != typeof e) return null;
"boolean" == typeof t && (n = t, t = !1), t = t || Q;
var i = mt.exec(e), r = !n && [];
return i ? [ t.createElement(i[1]) ] :(i = ut.buildFragment([ e ], t, r), r && ut(r).remove(), 
ut.merge([], i.childNodes));
},
parseJSON:function(t) {
return e.JSON && e.JSON.parse ? e.JSON.parse(t) :null === t ? t :"string" == typeof t && (t = ut.trim(t), 
t && gt.test(t.replace(yt, "@").replace(bt, "]").replace(vt, ""))) ? new Function("return " + t)() :(ut.error("Invalid JSON: " + t), 
void 0);
},
parseXML:function(n) {
var i, r;
if (!n || "string" != typeof n) return null;
try {
e.DOMParser ? (r = new DOMParser(), i = r.parseFromString(n, "text/xml")) :(i = new ActiveXObject("Microsoft.XMLDOM"), 
i.async = "false", i.loadXML(n));
} catch (o) {
i = t;
}
return i && i.documentElement && !i.getElementsByTagName("parsererror").length || ut.error("Invalid XML: " + n), 
i;
},
noop:function() {},
globalEval:function(t) {
t && ut.trim(t) && (e.execScript || function(t) {
e.eval.call(e, t);
})(t);
},
camelCase:function(e) {
return e.replace(wt, "ms-").replace(_t, xt);
},
nodeName:function(e, t) {
return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
},
each:function(e, t, i) {
var r, o = 0, a = e.length, s = n(e);
if (i) {
if (s) for (;a > o && (r = t.apply(e[o], i), r !== !1); o++) ; else for (o in e) if (r = t.apply(e[o], i), 
r === !1) break;
} else if (s) for (;a > o && (r = t.call(e[o], o, e[o]), r !== !1); o++) ; else for (o in e) if (r = t.call(e[o], o, e[o]), 
r === !1) break;
return e;
},
trim:ct && !ct.call("﻿ ") ? function(e) {
return null == e ? "" :ct.call(e);
} :function(e) {
return null == e ? "" :(e + "").replace(ft, "");
},
makeArray:function(e, t) {
var i = t || [];
return null != e && (n(Object(e)) ? ut.merge(i, "string" == typeof e ? [ e ] :e) :rt.call(i, e)), 
i;
},
inArray:function(e, t, n) {
var i;
if (t) {
if (at) return at.call(t, e, n);
for (i = t.length, n = n ? 0 > n ? Math.max(0, i + n) :n :0; i > n; n++) if (n in t && t[n] === e) return n;
}
return -1;
},
merge:function(e, n) {
var i = n.length, r = e.length, o = 0;
if ("number" == typeof i) for (;i > o; o++) e[r++] = n[o]; else for (;n[o] !== t; ) e[r++] = n[o++];
return e.length = r, e;
},
grep:function(e, t, n) {
var i, r = [], o = 0, a = e.length;
for (n = !!n; a > o; o++) i = !!t(e[o], o), n !== i && r.push(e[o]);
return r;
},
map:function(e, t, i) {
var r, o = 0, a = e.length, s = n(e), l = [];
if (s) for (;a > o; o++) r = t(e[o], o, i), null != r && (l[l.length] = r); else for (o in e) r = t(e[o], o, i), 
null != r && (l[l.length] = r);
return it.apply([], l);
},
guid:1,
proxy:function(e, n) {
var i, r, o;
return "string" == typeof n && (o = e[n], n = e, e = o), ut.isFunction(e) ? (i = ot.call(arguments, 2), 
r = function() {
return e.apply(n || this, i.concat(ot.call(arguments)));
}, r.guid = e.guid = e.guid || ut.guid++, r) :t;
},
access:function(e, n, i, r, o, a, s) {
var l = 0, c = e.length, u = null == i;
if ("object" === ut.type(i)) {
o = !0;
for (l in i) ut.access(e, n, l, i[l], !0, a, s);
} else if (r !== t && (o = !0, ut.isFunction(r) || (s = !0), u && (s ? (n.call(e, r), 
n = null) :(u = n, n = function(e, t, n) {
return u.call(ut(e), n);
})), n)) for (;c > l; l++) n(e[l], i, s ? r :r.call(e[l], l, n(e[l], i)));
return o ? e :u ? n.call(e) :c ? n(e[0], i) :a;
},
now:function() {
return new Date().getTime();
},
swap:function(e, t, n, i) {
var r, o, a = {};
for (o in t) a[o] = e.style[o], e.style[o] = t[o];
r = n.apply(e, i || []);
for (o in t) e.style[o] = a[o];
return r;
}
}), ut.ready.promise = function(t) {
if (!q) if (q = ut.Deferred(), "complete" === Q.readyState) setTimeout(ut.ready); else if (Q.addEventListener) Q.addEventListener("DOMContentLoaded", kt, !1), 
e.addEventListener("load", kt, !1); else {
Q.attachEvent("onreadystatechange", kt), e.attachEvent("onload", kt);
var n = !1;
try {
n = null == e.frameElement && Q.documentElement;
} catch (i) {}
n && n.doScroll && !function r() {
if (!ut.isReady) {
try {
n.doScroll("left");
} catch (e) {
return setTimeout(r, 50);
}
Ct(), ut.ready();
}
}();
}
return q.promise(t);
}, ut.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
et["[object " + t + "]"] = t.toLowerCase();
}), K = ut(Q), /*!
 * Sizzle CSS Selector Engine v1.9.4-pre
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-05-15
 */
function(e, t) {
function n(e, t, n, i) {
var r, o, a, s, l, c, u, d, h, f;
if ((t ? t.ownerDocument || t :U) !== O && P(t), t = t || O, n = n || [], !e || "string" != typeof e) return n;
if (1 !== (s = t.nodeType) && 9 !== s) return [];
if (L && !i) {
if (r = kt.exec(e)) if (a = r[1]) {
if (9 === s) {
if (o = t.getElementById(a), !o || !o.parentNode) return n;
if (o.id === a) return n.push(o), n;
} else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && z(t, o) && o.id === a) return n.push(o), 
n;
} else {
if (r[2]) return rt.apply(n, t.getElementsByTagName(e)), n;
if ((a = r[3]) && T.getElementsByClassName && t.getElementsByClassName) return rt.apply(n, t.getElementsByClassName(a)), 
n;
}
if (T.qsa && (!H || !H.test(e))) {
if (d = u = W, h = t, f = 9 === s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
for (c = m(e), (u = t.getAttribute("id")) ? d = u.replace(Et, "\\$&") :t.setAttribute("id", d), 
d = "[id='" + d + "'] ", l = c.length; l--; ) c[l] = d + g(c[l]);
h = vt.test(e) && t.parentNode || t, f = c.join(",");
}
if (f) try {
return rt.apply(n, h.querySelectorAll(f)), n;
} catch (p) {} finally {
u || t.removeAttribute("id");
}
}
}
return C(e.replace(pt, "$1"), t, n, i);
}
function i(e) {
return xt.test(e + "");
}
function r() {
function e(n, i) {
return t.push(n += " ") > A.cacheLength && delete e[t.shift()], e[n] = i;
}
var t = [];
return e;
}
function o(e) {
return e[W] = !0, e;
}
function a(e) {
var t = O.createElement("div");
try {
return !!e(t);
} catch (n) {
return !1;
} finally {
t.parentNode && t.parentNode.removeChild(t), t = null;
}
}
function s(e, t, n) {
e = e.split("|");
for (var i, r = e.length, o = n ? null :t; r--; ) (i = A.attrHandle[e[r]]) && i !== t || (A.attrHandle[e[r]] = o);
}
function l(e, t) {
var n = e.getAttributeNode(t);
return n && n.specified ? n.value :e[t] === !0 ? t.toLowerCase() :null;
}
function c(e, t) {
return e.getAttribute(t, "type" === t.toLowerCase() ? 1 :2);
}
function u(e) {
return "input" === e.nodeName.toLowerCase() ? e.defaultValue :void 0;
}
function d(e, t) {
var n = t && e, i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || Z) - (~e.sourceIndex || Z);
if (i) return i;
if (n) for (;n = n.nextSibling; ) if (n === t) return -1;
return e ? 1 :-1;
}
function h(e) {
return function(t) {
var n = t.nodeName.toLowerCase();
return "input" === n && t.type === e;
};
}
function f(e) {
return function(t) {
var n = t.nodeName.toLowerCase();
return ("input" === n || "button" === n) && t.type === e;
};
}
function p(e) {
return o(function(t) {
return t = +t, o(function(n, i) {
for (var r, o = e([], n.length, t), a = o.length; a--; ) n[r = o[a]] && (n[r] = !(i[r] = n[r]));
});
});
}
function m(e, t) {
var i, r, o, a, s, l, c, u = G[e + " "];
if (u) return t ? 0 :u.slice(0);
for (s = e, l = [], c = A.preFilter; s; ) {
(!i || (r = mt.exec(s))) && (r && (s = s.slice(r[0].length) || s), l.push(o = [])), 
i = !1, (r = gt.exec(s)) && (i = r.shift(), o.push({
value:i,
type:r[0].replace(pt, " ")
}), s = s.slice(i.length));
for (a in A.filter) !(r = _t[a].exec(s)) || c[a] && !(r = c[a](r)) || (i = r.shift(), 
o.push({
value:i,
type:a,
matches:r
}), s = s.slice(i.length));
if (!i) break;
}
return t ? s.length :s ? n.error(e) :G(e, l).slice(0);
}
function g(e) {
for (var t = 0, n = e.length, i = ""; n > t; t++) i += e[t].value;
return i;
}
function v(e, t, n) {
var i = t.dir, r = n && "parentNode" === i, o = q++;
return t.first ? function(t, n, o) {
for (;t = t[i]; ) if (1 === t.nodeType || r) return e(t, n, o);
} :function(t, n, a) {
var s, l, c, u = V + " " + o;
if (a) {
for (;t = t[i]; ) if ((1 === t.nodeType || r) && e(t, n, a)) return !0;
} else for (;t = t[i]; ) if (1 === t.nodeType || r) if (c = t[W] || (t[W] = {}), 
(l = c[i]) && l[0] === u) {
if ((s = l[1]) === !0 || s === N) return s === !0;
} else if (l = c[i] = [ u ], l[1] = e(t, n, a) || N, l[1] === !0) return !0;
};
}
function y(e) {
return e.length > 1 ? function(t, n, i) {
for (var r = e.length; r--; ) if (!e[r](t, n, i)) return !1;
return !0;
} :e[0];
}
function b(e, t, n, i, r) {
for (var o, a = [], s = 0, l = e.length, c = null != t; l > s; s++) (o = e[s]) && (!n || n(o, i, r)) && (a.push(o), 
c && t.push(s));
return a;
}
function w(e, t, n, i, r, a) {
return i && !i[W] && (i = w(i)), r && !r[W] && (r = w(r, a)), o(function(o, a, s, l) {
var c, u, d, h = [], f = [], p = a.length, m = o || k(t || "*", s.nodeType ? [ s ] :s, []), g = !e || !o && t ? m :b(m, h, e, s, l), v = n ? r || (o ? e :p || i) ? [] :a :g;
if (n && n(g, v, s, l), i) for (c = b(v, f), i(c, [], s, l), u = c.length; u--; ) (d = c[u]) && (v[f[u]] = !(g[f[u]] = d));
if (o) {
if (r || e) {
if (r) {
for (c = [], u = v.length; u--; ) (d = v[u]) && c.push(g[u] = d);
r(null, v = [], c, l);
}
for (u = v.length; u--; ) (d = v[u]) && (c = r ? at.call(o, d) :h[u]) > -1 && (o[c] = !(a[c] = d));
}
} else v = b(v === a ? v.splice(p, v.length) :v), r ? r(null, a, v, l) :rt.apply(a, v);
});
}
function _(e) {
for (var t, n, i, r = e.length, o = A.relative[e[0].type], a = o || A.relative[" "], s = o ? 1 :0, l = v(function(e) {
return e === t;
}, a, !0), c = v(function(e) {
return at.call(t, e) > -1;
}, a, !0), u = [ function(e, n, i) {
return !o && (i || n !== I) || ((t = n).nodeType ? l(e, n, i) :c(e, n, i));
} ]; r > s; s++) if (n = A.relative[e[s].type]) u = [ v(y(u), n) ]; else {
if (n = A.filter[e[s].type].apply(null, e[s].matches), n[W]) {
for (i = ++s; r > i && !A.relative[e[i].type]; i++) ;
return w(s > 1 && y(u), s > 1 && g(e.slice(0, s - 1).concat({
value:" " === e[s - 2].type ? "*" :""
})).replace(pt, "$1"), n, i > s && _(e.slice(s, i)), r > i && _(e = e.slice(i)), r > i && g(e));
}
u.push(n);
}
return y(u);
}
function x(e, t) {
var i = 0, r = t.length > 0, a = e.length > 0, s = function(o, s, l, c, u) {
var d, h, f, p = [], m = 0, g = "0", v = o && [], y = null != u, w = I, _ = o || a && A.find.TAG("*", u && s.parentNode || s), x = V += null == w ? 1 :Math.random() || .1;
for (y && (I = s !== O && s, N = i); null != (d = _[g]); g++) {
if (a && d) {
for (h = 0; f = e[h++]; ) if (f(d, s, l)) {
c.push(d);
break;
}
y && (V = x, N = ++i);
}
r && ((d = !f && d) && m--, o && v.push(d));
}
if (m += g, r && g !== m) {
for (h = 0; f = t[h++]; ) f(v, p, s, l);
if (o) {
if (m > 0) for (;g--; ) v[g] || p[g] || (p[g] = nt.call(c));
p = b(p);
}
rt.apply(c, p), y && !o && p.length > 0 && m + t.length > 1 && n.uniqueSort(c);
}
return y && (V = x, I = w), v;
};
return r ? o(s) :s;
}
function k(e, t, i) {
for (var r = 0, o = t.length; o > r; r++) n(e, t[r], i);
return i;
}
function C(e, t, n, i) {
var r, o, a, s, l, c = m(e);
if (!i && 1 === c.length) {
if (o = c[0] = c[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && T.getById && 9 === t.nodeType && L && A.relative[o[1].type]) {
if (t = (A.find.ID(a.matches[0].replace(Tt, Nt), t) || [])[0], !t) return n;
e = e.slice(o.shift().value.length);
}
for (r = _t.needsContext.test(e) ? 0 :o.length; r-- && (a = o[r], !A.relative[s = a.type]); ) if ((l = A.find[s]) && (i = l(a.matches[0].replace(Tt, Nt), vt.test(o[0].type) && t.parentNode || t))) {
if (o.splice(r, 1), e = i.length && g(o), !e) return rt.apply(n, i), n;
break;
}
}
return D(e, c)(i, t, !L, n, vt.test(e)), n;
}
function S() {}
var E, T, N, A, $, M, D, I, B, P, O, R, L, H, F, j, z, W = "sizzle" + -new Date(), U = e.document, V = 0, q = 0, K = r(), G = r(), Y = r(), Q = !1, J = function() {
return 0;
}, X = typeof t, Z = 1 << 31, et = {}.hasOwnProperty, tt = [], nt = tt.pop, it = tt.push, rt = tt.push, ot = tt.slice, at = tt.indexOf || function(e) {
for (var t = 0, n = this.length; n > t; t++) if (this[t] === e) return t;
return -1;
}, st = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", lt = "[\\x20\\t\\r\\n\\f]", ct = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", dt = ct.replace("w", "w#"), ht = "\\[" + lt + "*(" + ct + ")" + lt + "*(?:([*^$|!~]?=)" + lt + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + dt + ")|)|)" + lt + "*\\]", ft = ":(" + ct + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + ht.replace(3, 8) + ")*)|.*)\\)|)", pt = new RegExp("^" + lt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + lt + "+$", "g"), mt = new RegExp("^" + lt + "*," + lt + "*"), gt = new RegExp("^" + lt + "*([>+~]|" + lt + ")" + lt + "*"), vt = new RegExp(lt + "*[+~]"), yt = new RegExp("=" + lt + "*([^\\]'\"]*)" + lt + "*\\]", "g"), bt = new RegExp(ft), wt = new RegExp("^" + dt + "$"), _t = {
ID:new RegExp("^#(" + ct + ")"),
CLASS:new RegExp("^\\.(" + ct + ")"),
TAG:new RegExp("^(" + ct.replace("w", "w*") + ")"),
ATTR:new RegExp("^" + ht),
PSEUDO:new RegExp("^" + ft),
CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + lt + "*(even|odd|(([+-]|)(\\d*)n|)" + lt + "*(?:([+-]|)" + lt + "*(\\d+)|))" + lt + "*\\)|)", "i"),
bool:new RegExp("^(?:" + st + ")$", "i"),
needsContext:new RegExp("^" + lt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + lt + "*((?:-\\d)?\\d*)" + lt + "*\\)|)(?=[^-]|$)", "i")
}, xt = /^[^{]+\{\s*\[native \w/, kt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, Ct = /^(?:input|select|textarea|button)$/i, St = /^h\d$/i, Et = /'|\\/g, Tt = new RegExp("\\\\([\\da-f]{1,6}" + lt + "?|(" + lt + ")|.)", "ig"), Nt = function(e, t, n) {
var i = "0x" + t - 65536;
return i !== i || n ? t :0 > i ? String.fromCharCode(i + 65536) :String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320);
};
try {
rt.apply(tt = ot.call(U.childNodes), U.childNodes), tt[U.childNodes.length].nodeType;
} catch (At) {
rt = {
apply:tt.length ? function(e, t) {
it.apply(e, ot.call(t));
} :function(e, t) {
for (var n = e.length, i = 0; e[n++] = t[i++]; ) ;
e.length = n - 1;
}
};
}
M = n.isXML = function(e) {
var t = e && (e.ownerDocument || e).documentElement;
return t ? "HTML" !== t.nodeName :!1;
}, T = n.support = {}, P = n.setDocument = function(e) {
var t = e ? e.ownerDocument || e :U;
return t !== O && 9 === t.nodeType && t.documentElement ? (O = t, R = t.documentElement, 
L = !M(t), T.attributes = a(function(e) {
return e.innerHTML = "<a href='#'></a>", s("type|href|height|width", c, "#" === e.firstChild.getAttribute("href")), 
s(st, l, null == e.getAttribute("disabled")), e.className = "i", !e.getAttribute("className");
}), T.input = a(function(e) {
return e.innerHTML = "<input>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
}), s("value", u, T.attributes && T.input), T.getElementsByTagName = a(function(e) {
return e.appendChild(t.createComment("")), !e.getElementsByTagName("*").length;
}), T.getElementsByClassName = a(function(e) {
return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 
2 === e.getElementsByClassName("i").length;
}), T.getById = a(function(e) {
return R.appendChild(e).id = W, !t.getElementsByName || !t.getElementsByName(W).length;
}), T.getById ? (A.find.ID = function(e, t) {
if (typeof t.getElementById !== X && L) {
var n = t.getElementById(e);
return n && n.parentNode ? [ n ] :[];
}
}, A.filter.ID = function(e) {
var t = e.replace(Tt, Nt);
return function(e) {
return e.getAttribute("id") === t;
};
}) :(delete A.find.ID, A.filter.ID = function(e) {
var t = e.replace(Tt, Nt);
return function(e) {
var n = typeof e.getAttributeNode !== X && e.getAttributeNode("id");
return n && n.value === t;
};
}), A.find.TAG = T.getElementsByTagName ? function(e, t) {
return typeof t.getElementsByTagName !== X ? t.getElementsByTagName(e) :void 0;
} :function(e, t) {
var n, i = [], r = 0, o = t.getElementsByTagName(e);
if ("*" === e) {
for (;n = o[r++]; ) 1 === n.nodeType && i.push(n);
return i;
}
return o;
}, A.find.CLASS = T.getElementsByClassName && function(e, t) {
return typeof t.getElementsByClassName !== X && L ? t.getElementsByClassName(e) :void 0;
}, F = [], H = [], (T.qsa = i(t.querySelectorAll)) && (a(function(e) {
e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || H.push("\\[" + lt + "*(?:value|" + st + ")"), 
e.querySelectorAll(":checked").length || H.push(":checked");
}), a(function(e) {
var n = t.createElement("input");
n.setAttribute("type", "hidden"), e.appendChild(n).setAttribute("t", ""), e.querySelectorAll("[t^='']").length && H.push("[*^$]=" + lt + "*(?:''|\"\")"), 
e.querySelectorAll(":enabled").length || H.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), 
H.push(",.*:");
})), (T.matchesSelector = i(j = R.webkitMatchesSelector || R.mozMatchesSelector || R.oMatchesSelector || R.msMatchesSelector)) && a(function(e) {
T.disconnectedMatch = j.call(e, "div"), j.call(e, "[s!='']:x"), F.push("!=", ft);
}), H = H.length && new RegExp(H.join("|")), F = F.length && new RegExp(F.join("|")), 
z = i(R.contains) || R.compareDocumentPosition ? function(e, t) {
var n = 9 === e.nodeType ? e.documentElement :e, i = t && t.parentNode;
return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) :e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)));
} :function(e, t) {
if (t) for (;t = t.parentNode; ) if (t === e) return !0;
return !1;
}, T.sortDetached = a(function(e) {
return 1 & e.compareDocumentPosition(t.createElement("div"));
}), J = R.compareDocumentPosition ? function(e, n) {
if (e === n) return Q = !0, 0;
var i = n.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(n);
return i ? 1 & i || !T.sortDetached && n.compareDocumentPosition(e) === i ? e === t || z(U, e) ? -1 :n === t || z(U, n) ? 1 :B ? at.call(B, e) - at.call(B, n) :0 :4 & i ? -1 :1 :e.compareDocumentPosition ? -1 :1;
} :function(e, n) {
var i, r = 0, o = e.parentNode, a = n.parentNode, s = [ e ], l = [ n ];
if (e === n) return Q = !0, 0;
if (!o || !a) return e === t ? -1 :n === t ? 1 :o ? -1 :a ? 1 :B ? at.call(B, e) - at.call(B, n) :0;
if (o === a) return d(e, n);
for (i = e; i = i.parentNode; ) s.unshift(i);
for (i = n; i = i.parentNode; ) l.unshift(i);
for (;s[r] === l[r]; ) r++;
return r ? d(s[r], l[r]) :s[r] === U ? -1 :l[r] === U ? 1 :0;
}, t) :O;
}, n.matches = function(e, t) {
return n(e, null, null, t);
}, n.matchesSelector = function(e, t) {
if ((e.ownerDocument || e) !== O && P(e), t = t.replace(yt, "='$1']"), !(!T.matchesSelector || !L || F && F.test(t) || H && H.test(t))) try {
var i = j.call(e, t);
if (i || T.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i;
} catch (r) {}
return n(t, O, null, [ e ]).length > 0;
}, n.contains = function(e, t) {
return (e.ownerDocument || e) !== O && P(e), z(e, t);
}, n.attr = function(e, n) {
(e.ownerDocument || e) !== O && P(e);
var i = A.attrHandle[n.toLowerCase()], r = i && et.call(A.attrHandle, n.toLowerCase()) ? i(e, n, !L) :t;
return r === t ? T.attributes || !L ? e.getAttribute(n) :(r = e.getAttributeNode(n)) && r.specified ? r.value :null :r;
}, n.error = function(e) {
throw new Error("Syntax error, unrecognized expression: " + e);
}, n.uniqueSort = function(e) {
var t, n = [], i = 0, r = 0;
if (Q = !T.detectDuplicates, B = !T.sortStable && e.slice(0), e.sort(J), Q) {
for (;t = e[r++]; ) t === e[r] && (i = n.push(r));
for (;i--; ) e.splice(n[i], 1);
}
return e;
}, $ = n.getText = function(e) {
var t, n = "", i = 0, r = e.nodeType;
if (r) {
if (1 === r || 9 === r || 11 === r) {
if ("string" == typeof e.textContent) return e.textContent;
for (e = e.firstChild; e; e = e.nextSibling) n += $(e);
} else if (3 === r || 4 === r) return e.nodeValue;
} else for (;t = e[i]; i++) n += $(t);
return n;
}, A = n.selectors = {
cacheLength:50,
createPseudo:o,
match:_t,
attrHandle:{},
find:{},
relative:{
">":{
dir:"parentNode",
first:!0
},
" ":{
dir:"parentNode"
},
"+":{
dir:"previousSibling",
first:!0
},
"~":{
dir:"previousSibling"
}
},
preFilter:{
ATTR:function(e) {
return e[1] = e[1].replace(Tt, Nt), e[3] = (e[4] || e[5] || "").replace(Tt, Nt), 
"~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
},
CHILD:function(e) {
return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || n.error(e[0]), 
e[4] = +(e[4] ? e[5] + (e[6] || 1) :2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) :e[3] && n.error(e[0]), 
e;
},
PSEUDO:function(e) {
var n, i = !e[5] && e[2];
return _t.CHILD.test(e[0]) ? null :(e[3] && e[4] !== t ? e[2] = e[4] :i && bt.test(i) && (n = m(i, !0)) && (n = i.indexOf(")", i.length - n) - i.length) && (e[0] = e[0].slice(0, n), 
e[2] = i.slice(0, n)), e.slice(0, 3));
}
},
filter:{
TAG:function(e) {
var t = e.replace(Tt, Nt).toLowerCase();
return "*" === e ? function() {
return !0;
} :function(e) {
return e.nodeName && e.nodeName.toLowerCase() === t;
};
},
CLASS:function(e) {
var t = K[e + " "];
return t || (t = new RegExp("(^|" + lt + ")" + e + "(" + lt + "|$)")) && K(e, function(e) {
return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== X && e.getAttribute("class") || "");
});
},
ATTR:function(e, t, i) {
return function(r) {
var o = n.attr(r, e);
return null == o ? "!=" === t :t ? (o += "", "=" === t ? o === i :"!=" === t ? o !== i :"^=" === t ? i && 0 === o.indexOf(i) :"*=" === t ? i && o.indexOf(i) > -1 :"$=" === t ? i && o.slice(-i.length) === i :"~=" === t ? (" " + o + " ").indexOf(i) > -1 :"|=" === t ? o === i || o.slice(0, i.length + 1) === i + "-" :!1) :!0;
};
},
CHILD:function(e, t, n, i, r) {
var o = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), s = "of-type" === t;
return 1 === i && 0 === r ? function(e) {
return !!e.parentNode;
} :function(t, n, l) {
var c, u, d, h, f, p, m = o !== a ? "nextSibling" :"previousSibling", g = t.parentNode, v = s && t.nodeName.toLowerCase(), y = !l && !s;
if (g) {
if (o) {
for (;m; ) {
for (d = t; d = d[m]; ) if (s ? d.nodeName.toLowerCase() === v :1 === d.nodeType) return !1;
p = m = "only" === e && !p && "nextSibling";
}
return !0;
}
if (p = [ a ? g.firstChild :g.lastChild ], a && y) {
for (u = g[W] || (g[W] = {}), c = u[e] || [], f = c[0] === V && c[1], h = c[0] === V && c[2], 
d = f && g.childNodes[f]; d = ++f && d && d[m] || (h = f = 0) || p.pop(); ) if (1 === d.nodeType && ++h && d === t) {
u[e] = [ V, f, h ];
break;
}
} else if (y && (c = (t[W] || (t[W] = {}))[e]) && c[0] === V) h = c[1]; else for (;(d = ++f && d && d[m] || (h = f = 0) || p.pop()) && ((s ? d.nodeName.toLowerCase() !== v :1 !== d.nodeType) || !++h || (y && ((d[W] || (d[W] = {}))[e] = [ V, h ]), 
d !== t)); ) ;
return h -= r, h === i || h % i === 0 && h / i >= 0;
}
};
},
PSEUDO:function(e, t) {
var i, r = A.pseudos[e] || A.setFilters[e.toLowerCase()] || n.error("unsupported pseudo: " + e);
return r[W] ? r(t) :r.length > 1 ? (i = [ e, e, "", t ], A.setFilters.hasOwnProperty(e.toLowerCase()) ? o(function(e, n) {
for (var i, o = r(e, t), a = o.length; a--; ) i = at.call(e, o[a]), e[i] = !(n[i] = o[a]);
}) :function(e) {
return r(e, 0, i);
}) :r;
}
},
pseudos:{
not:o(function(e) {
var t = [], n = [], i = D(e.replace(pt, "$1"));
return i[W] ? o(function(e, t, n, r) {
for (var o, a = i(e, null, r, []), s = e.length; s--; ) (o = a[s]) && (e[s] = !(t[s] = o));
}) :function(e, r, o) {
return t[0] = e, i(t, null, o, n), !n.pop();
};
}),
has:o(function(e) {
return function(t) {
return n(e, t).length > 0;
};
}),
contains:o(function(e) {
return function(t) {
return (t.textContent || t.innerText || $(t)).indexOf(e) > -1;
};
}),
lang:o(function(e) {
return wt.test(e || "") || n.error("unsupported lang: " + e), e = e.replace(Tt, Nt).toLowerCase(), 
function(t) {
var n;
do if (n = L ? t.lang :t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), 
n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
return !1;
};
}),
target:function(t) {
var n = e.location && e.location.hash;
return n && n.slice(1) === t.id;
},
root:function(e) {
return e === R;
},
focus:function(e) {
return e === O.activeElement && (!O.hasFocus || O.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
},
enabled:function(e) {
return e.disabled === !1;
},
disabled:function(e) {
return e.disabled === !0;
},
checked:function(e) {
var t = e.nodeName.toLowerCase();
return "input" === t && !!e.checked || "option" === t && !!e.selected;
},
selected:function(e) {
return e.parentNode && e.parentNode.selectedIndex, e.selected === !0;
},
empty:function(e) {
for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return !1;
return !0;
},
parent:function(e) {
return !A.pseudos.empty(e);
},
header:function(e) {
return St.test(e.nodeName);
},
input:function(e) {
return Ct.test(e.nodeName);
},
button:function(e) {
var t = e.nodeName.toLowerCase();
return "input" === t && "button" === e.type || "button" === t;
},
text:function(e) {
var t;
return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type);
},
first:p(function() {
return [ 0 ];
}),
last:p(function(e, t) {
return [ t - 1 ];
}),
eq:p(function(e, t, n) {
return [ 0 > n ? n + t :n ];
}),
even:p(function(e, t) {
for (var n = 0; t > n; n += 2) e.push(n);
return e;
}),
odd:p(function(e, t) {
for (var n = 1; t > n; n += 2) e.push(n);
return e;
}),
lt:p(function(e, t, n) {
for (var i = 0 > n ? n + t :n; --i >= 0; ) e.push(i);
return e;
}),
gt:p(function(e, t, n) {
for (var i = 0 > n ? n + t :n; ++i < t; ) e.push(i);
return e;
})
}
};
for (E in {
radio:!0,
checkbox:!0,
file:!0,
password:!0,
image:!0
}) A.pseudos[E] = h(E);
for (E in {
submit:!0,
reset:!0
}) A.pseudos[E] = f(E);
D = n.compile = function(e, t) {
var n, i = [], r = [], o = Y[e + " "];
if (!o) {
for (t || (t = m(e)), n = t.length; n--; ) o = _(t[n]), o[W] ? i.push(o) :r.push(o);
o = Y(e, x(r, i));
}
return o;
}, A.pseudos.nth = A.pseudos.eq, S.prototype = A.filters = A.pseudos, A.setFilters = new S(), 
T.sortStable = W.split("").sort(J).join("") === W, P(), [ 0, 0 ].sort(J), T.detectDuplicates = Q, 
ut.find = n, ut.expr = n.selectors, ut.expr[":"] = ut.expr.pseudos, ut.unique = n.uniqueSort, 
ut.text = n.getText, ut.isXMLDoc = n.isXML, ut.contains = n.contains;
}(e);
var St = {};
ut.Callbacks = function(e) {
e = "string" == typeof e ? St[e] || i(e) :ut.extend({}, e);
var n, r, o, a, s, l, c = [], u = !e.once && [], d = function(t) {
for (r = e.memory && t, o = !0, s = l || 0, l = 0, a = c.length, n = !0; c && a > s; s++) if (c[s].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
r = !1;
break;
}
n = !1, c && (u ? u.length && d(u.shift()) :r ? c = [] :h.disable());
}, h = {
add:function() {
if (c) {
var t = c.length;
!function i(t) {
ut.each(t, function(t, n) {
var r = ut.type(n);
"function" === r ? e.unique && h.has(n) || c.push(n) :n && n.length && "string" !== r && i(n);
});
}(arguments), n ? a = c.length :r && (l = t, d(r));
}
return this;
},
remove:function() {
return c && ut.each(arguments, function(e, t) {
for (var i; (i = ut.inArray(t, c, i)) > -1; ) c.splice(i, 1), n && (a >= i && a--, 
s >= i && s--);
}), this;
},
has:function(e) {
return e ? ut.inArray(e, c) > -1 :!(!c || !c.length);
},
empty:function() {
return c = [], a = 0, this;
},
disable:function() {
return c = u = r = t, this;
},
disabled:function() {
return !c;
},
lock:function() {
return u = t, r || h.disable(), this;
},
locked:function() {
return !u;
},
fireWith:function(e, t) {
return t = t || [], t = [ e, t.slice ? t.slice() :t ], !c || o && !u || (n ? u.push(t) :d(t)), 
this;
},
fire:function() {
return h.fireWith(this, arguments), this;
},
fired:function() {
return !!o;
}
};
return h;
}, ut.extend({
Deferred:function(e) {
var t = [ [ "resolve", "done", ut.Callbacks("once memory"), "resolved" ], [ "reject", "fail", ut.Callbacks("once memory"), "rejected" ], [ "notify", "progress", ut.Callbacks("memory") ] ], n = "pending", i = {
state:function() {
return n;
},
always:function() {
return r.done(arguments).fail(arguments), this;
},
then:function() {
var e = arguments;
return ut.Deferred(function(n) {
ut.each(t, function(t, o) {
var a = o[0], s = ut.isFunction(e[t]) && e[t];
r[o[1]](function() {
var e = s && s.apply(this, arguments);
e && ut.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) :n[a + "With"](this === i ? n.promise() :this, s ? [ e ] :arguments);
});
}), e = null;
}).promise();
},
promise:function(e) {
return null != e ? ut.extend(e, i) :i;
}
}, r = {};
return i.pipe = i.then, ut.each(t, function(e, o) {
var a = o[2], s = o[3];
i[o[1]] = a.add, s && a.add(function() {
n = s;
}, t[1 ^ e][2].disable, t[2][2].lock), r[o[0]] = function() {
return r[o[0] + "With"](this === r ? i :this, arguments), this;
}, r[o[0] + "With"] = a.fireWith;
}), i.promise(r), e && e.call(r, r), r;
},
when:function(e) {
var t, n, i, r = 0, o = ot.call(arguments), a = o.length, s = 1 !== a || e && ut.isFunction(e.promise) ? a :0, l = 1 === s ? e :ut.Deferred(), c = function(e, n, i) {
return function(r) {
n[e] = this, i[e] = arguments.length > 1 ? ot.call(arguments) :r, i === t ? l.notifyWith(n, i) :--s || l.resolveWith(n, i);
};
};
if (a > 1) for (t = new Array(a), n = new Array(a), i = new Array(a); a > r; r++) o[r] && ut.isFunction(o[r].promise) ? o[r].promise().done(c(r, i, o)).fail(l.reject).progress(c(r, n, t)) :--s;
return s || l.resolveWith(i, o), l.promise();
}
}), ut.support = function(t) {
var n, i, r, o, a, s, l, c, u, d = Q.createElement("div");
if (d.setAttribute("className", "t"), d.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
n = d.getElementsByTagName("*") || [], i = d.getElementsByTagName("a")[0], !i || !i.style || !n.length) return t;
o = Q.createElement("select"), s = o.appendChild(Q.createElement("option")), r = d.getElementsByTagName("input")[0], 
i.style.cssText = "top:1px;float:left;opacity:.5", t.getSetAttribute = "t" !== d.className, 
t.leadingWhitespace = 3 === d.firstChild.nodeType, t.tbody = !d.getElementsByTagName("tbody").length, 
t.htmlSerialize = !!d.getElementsByTagName("link").length, t.style = /top/.test(i.getAttribute("style")), 
t.hrefNormalized = "/a" === i.getAttribute("href"), t.opacity = /^0.5/.test(i.style.opacity), 
t.cssFloat = !!i.style.cssFloat, t.checkOn = !!r.value, t.optSelected = s.selected, 
t.enctype = !!Q.createElement("form").enctype, t.html5Clone = "<:nav></:nav>" !== Q.createElement("nav").cloneNode(!0).outerHTML, 
t.inlineBlockNeedsLayout = !1, t.shrinkWrapBlocks = !1, t.pixelPosition = !1, t.deleteExpando = !0, 
t.noCloneEvent = !0, t.reliableMarginRight = !0, t.boxSizingReliable = !0, r.checked = !0, 
t.noCloneChecked = r.cloneNode(!0).checked, o.disabled = !0, t.optDisabled = !s.disabled;
try {
delete d.test;
} catch (h) {
t.deleteExpando = !1;
}
r = Q.createElement("input"), r.setAttribute("value", ""), t.input = "" === r.getAttribute("value"), 
r.value = "t", r.setAttribute("type", "radio"), t.radioValue = "t" === r.value, 
r.setAttribute("checked", "t"), r.setAttribute("name", "t"), a = Q.createDocumentFragment(), 
a.appendChild(r), t.appendChecked = r.checked, t.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked, 
d.attachEvent && (d.attachEvent("onclick", function() {
t.noCloneEvent = !1;
}), d.cloneNode(!0).click());
for (u in {
submit:!0,
change:!0,
focusin:!0
}) d.setAttribute(l = "on" + u, "t"), t[u + "Bubbles"] = l in e || d.attributes[l].expando === !1;
d.style.backgroundClip = "content-box", d.cloneNode(!0).style.backgroundClip = "", 
t.clearCloneStyle = "content-box" === d.style.backgroundClip;
for (u in ut(t)) break;
return t.ownLast = "0" !== u, ut(function() {
var n, i, r, o = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;", a = Q.getElementsByTagName("body")[0];
a && (n = Q.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", 
a.appendChild(n).appendChild(d), d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", 
r = d.getElementsByTagName("td"), r[0].style.cssText = "padding:0;margin:0;border:0;display:none", 
c = 0 === r[0].offsetHeight, r[0].style.display = "", r[1].style.display = "none", 
t.reliableHiddenOffsets = c && 0 === r[0].offsetHeight, d.innerHTML = "", d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", 
ut.swap(a, null != a.style.zoom ? {
zoom:1
} :{}, function() {
t.boxSizing = 4 === d.offsetWidth;
}), e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(d, null) || {}).top, 
t.boxSizingReliable = "4px" === (e.getComputedStyle(d, null) || {
width:"4px"
}).width, i = d.appendChild(Q.createElement("div")), i.style.cssText = d.style.cssText = o, 
i.style.marginRight = i.style.width = "0", d.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(i, null) || {}).marginRight)), 
typeof d.style.zoom !== G && (d.innerHTML = "", d.style.cssText = o + "width:1px;padding:1px;display:inline;zoom:1", 
t.inlineBlockNeedsLayout = 3 === d.offsetWidth, d.style.display = "block", d.innerHTML = "<div></div>", 
d.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== d.offsetWidth, t.inlineBlockNeedsLayout && (a.style.zoom = 1)), 
a.removeChild(n), n = d = r = i = null);
}), n = o = a = s = i = r = null, t;
}({});
var Et = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, Tt = /([A-Z])/g;
ut.extend({
cache:{},
noData:{
applet:!0,
embed:!0,
object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
},
hasData:function(e) {
return e = e.nodeType ? ut.cache[e[ut.expando]] :e[ut.expando], !!e && !s(e);
},
data:function(e, t, n) {
return r(e, t, n);
},
removeData:function(e, t) {
return o(e, t);
},
_data:function(e, t, n) {
return r(e, t, n, !0);
},
_removeData:function(e, t) {
return o(e, t, !0);
},
acceptData:function(e) {
if (e.nodeType && 1 !== e.nodeType && 9 !== e.nodeType) return !1;
var t = e.nodeName && ut.noData[e.nodeName.toLowerCase()];
return !t || t !== !0 && e.getAttribute("classid") === t;
}
}), ut.fn.extend({
data:function(e, n) {
var i, r, o = null, s = 0, l = this[0];
if (e === t) {
if (this.length && (o = ut.data(l), 1 === l.nodeType && !ut._data(l, "parsedAttrs"))) {
for (i = l.attributes; s < i.length; s++) r = i[s].name, 0 === r.indexOf("data-") && (r = ut.camelCase(r.slice(5)), 
a(l, r, o[r]));
ut._data(l, "parsedAttrs", !0);
}
return o;
}
return "object" == typeof e ? this.each(function() {
ut.data(this, e);
}) :arguments.length > 1 ? this.each(function() {
ut.data(this, e, n);
}) :l ? a(l, e, ut.data(l, e)) :null;
},
removeData:function(e) {
return this.each(function() {
ut.removeData(this, e);
});
}
}), ut.extend({
queue:function(e, t, n) {
var i;
return e ? (t = (t || "fx") + "queue", i = ut._data(e, t), n && (!i || ut.isArray(n) ? i = ut._data(e, t, ut.makeArray(n)) :i.push(n)), 
i || []) :void 0;
},
dequeue:function(e, t) {
t = t || "fx";
var n = ut.queue(e, t), i = n.length, r = n.shift(), o = ut._queueHooks(e, t), a = function() {
ut.dequeue(e, t);
};
"inprogress" === r && (r = n.shift(), i--), o.cur = r, r && ("fx" === t && n.unshift("inprogress"), 
delete o.stop, r.call(e, a, o)), !i && o && o.empty.fire();
},
_queueHooks:function(e, t) {
var n = t + "queueHooks";
return ut._data(e, n) || ut._data(e, n, {
empty:ut.Callbacks("once memory").add(function() {
ut._removeData(e, t + "queue"), ut._removeData(e, n);
})
});
}
}), ut.fn.extend({
queue:function(e, n) {
var i = 2;
return "string" != typeof e && (n = e, e = "fx", i--), arguments.length < i ? ut.queue(this[0], e) :n === t ? this :this.each(function() {
var t = ut.queue(this, e, n);
ut._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && ut.dequeue(this, e);
});
},
dequeue:function(e) {
return this.each(function() {
ut.dequeue(this, e);
});
},
delay:function(e, t) {
return e = ut.fx ? ut.fx.speeds[e] || e :e, t = t || "fx", this.queue(t, function(t, n) {
var i = setTimeout(t, e);
n.stop = function() {
clearTimeout(i);
};
});
},
clearQueue:function(e) {
return this.queue(e || "fx", []);
},
promise:function(e, n) {
var i, r = 1, o = ut.Deferred(), a = this, s = this.length, l = function() {
--r || o.resolveWith(a, [ a ]);
};
for ("string" != typeof e && (n = e, e = t), e = e || "fx"; s--; ) i = ut._data(a[s], e + "queueHooks"), 
i && i.empty && (r++, i.empty.add(l));
return l(), o.promise(n);
}
});
var Nt, At, $t = /[\t\r\n\f]/g, Mt = /\r/g, Dt = /^(?:input|select|textarea|button|object)$/i, It = /^(?:a|area)$/i, Bt = /^(?:checked|selected)$/i, Pt = ut.support.getSetAttribute, Ot = ut.support.input;
ut.fn.extend({
attr:function(e, t) {
return ut.access(this, ut.attr, e, t, arguments.length > 1);
},
removeAttr:function(e) {
return this.each(function() {
ut.removeAttr(this, e);
});
},
prop:function(e, t) {
return ut.access(this, ut.prop, e, t, arguments.length > 1);
},
removeProp:function(e) {
return e = ut.propFix[e] || e, this.each(function() {
try {
this[e] = t, delete this[e];
} catch (n) {}
});
},
addClass:function(e) {
var t, n, i, r, o, a = 0, s = this.length, l = "string" == typeof e && e;
if (ut.isFunction(e)) return this.each(function(t) {
ut(this).addClass(e.call(this, t, this.className));
});
if (l) for (t = (e || "").match(ht) || []; s > a; a++) if (n = this[a], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace($t, " ") :" ")) {
for (o = 0; r = t[o++]; ) i.indexOf(" " + r + " ") < 0 && (i += r + " ");
n.className = ut.trim(i);
}
return this;
},
removeClass:function(e) {
var t, n, i, r, o, a = 0, s = this.length, l = 0 === arguments.length || "string" == typeof e && e;
if (ut.isFunction(e)) return this.each(function(t) {
ut(this).removeClass(e.call(this, t, this.className));
});
if (l) for (t = (e || "").match(ht) || []; s > a; a++) if (n = this[a], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace($t, " ") :"")) {
for (o = 0; r = t[o++]; ) for (;i.indexOf(" " + r + " ") >= 0; ) i = i.replace(" " + r + " ", " ");
n.className = e ? ut.trim(i) :"";
}
return this;
},
toggleClass:function(e, t) {
var n = typeof e, i = "boolean" == typeof t;
return ut.isFunction(e) ? this.each(function(n) {
ut(this).toggleClass(e.call(this, n, this.className, t), t);
}) :this.each(function() {
if ("string" === n) for (var r, o = 0, a = ut(this), s = t, l = e.match(ht) || []; r = l[o++]; ) s = i ? s :!a.hasClass(r), 
a[s ? "addClass" :"removeClass"](r); else (n === G || "boolean" === n) && (this.className && ut._data(this, "__className__", this.className), 
this.className = this.className || e === !1 ? "" :ut._data(this, "__className__") || "");
});
},
hasClass:function(e) {
for (var t = " " + e + " ", n = 0, i = this.length; i > n; n++) if (1 === this[n].nodeType && (" " + this[n].className + " ").replace($t, " ").indexOf(t) >= 0) return !0;
return !1;
},
val:function(e) {
var n, i, r, o = this[0];
{
if (arguments.length) return r = ut.isFunction(e), this.each(function(n) {
var o;
1 === this.nodeType && (o = r ? e.call(this, n, ut(this).val()) :e, null == o ? o = "" :"number" == typeof o ? o += "" :ut.isArray(o) && (o = ut.map(o, function(e) {
return null == e ? "" :e + "";
})), i = ut.valHooks[this.type] || ut.valHooks[this.nodeName.toLowerCase()], i && "set" in i && i.set(this, o, "value") !== t || (this.value = o));
});
if (o) return i = ut.valHooks[o.type] || ut.valHooks[o.nodeName.toLowerCase()], 
i && "get" in i && (n = i.get(o, "value")) !== t ? n :(n = o.value, "string" == typeof n ? n.replace(Mt, "") :null == n ? "" :n);
}
}
}), ut.extend({
valHooks:{
option:{
get:function(e) {
var t = ut.find.attr(e, "value");
return null != t ? t :e.text;
}
},
select:{
get:function(e) {
for (var t, n, i = e.options, r = e.selectedIndex, o = "select-one" === e.type || 0 > r, a = o ? null :[], s = o ? r + 1 :i.length, l = 0 > r ? s :o ? r :0; s > l; l++) if (n = i[l], 
!(!n.selected && l !== r || (ut.support.optDisabled ? n.disabled :null !== n.getAttribute("disabled")) || n.parentNode.disabled && ut.nodeName(n.parentNode, "optgroup"))) {
if (t = ut(n).val(), o) return t;
a.push(t);
}
return a;
},
set:function(e, t) {
for (var n, i, r = e.options, o = ut.makeArray(t), a = r.length; a--; ) i = r[a], 
(i.selected = ut.inArray(ut(i).val(), o) >= 0) && (n = !0);
return n || (e.selectedIndex = -1), o;
}
}
},
attr:function(e, n, i) {
var r, o, a = e.nodeType;
if (e && 3 !== a && 8 !== a && 2 !== a) return typeof e.getAttribute === G ? ut.prop(e, n, i) :(1 === a && ut.isXMLDoc(e) || (n = n.toLowerCase(), 
r = ut.attrHooks[n] || (ut.expr.match.bool.test(n) ? At :Nt)), i === t ? r && "get" in r && null !== (o = r.get(e, n)) ? o :(o = ut.find.attr(e, n), 
null == o ? t :o) :null !== i ? r && "set" in r && (o = r.set(e, i, n)) !== t ? o :(e.setAttribute(n, i + ""), 
i) :(ut.removeAttr(e, n), void 0));
},
removeAttr:function(e, t) {
var n, i, r = 0, o = t && t.match(ht);
if (o && 1 === e.nodeType) for (;n = o[r++]; ) i = ut.propFix[n] || n, ut.expr.match.bool.test(n) ? Ot && Pt || !Bt.test(n) ? e[i] = !1 :e[ut.camelCase("default-" + n)] = e[i] = !1 :ut.attr(e, n, ""), 
e.removeAttribute(Pt ? n :i);
},
attrHooks:{
type:{
set:function(e, t) {
if (!ut.support.radioValue && "radio" === t && ut.nodeName(e, "input")) {
var n = e.value;
return e.setAttribute("type", t), n && (e.value = n), t;
}
}
}
},
propFix:{
"for":"htmlFor",
"class":"className"
},
prop:function(e, n, i) {
var r, o, a, s = e.nodeType;
if (e && 3 !== s && 8 !== s && 2 !== s) return a = 1 !== s || !ut.isXMLDoc(e), a && (n = ut.propFix[n] || n, 
o = ut.propHooks[n]), i !== t ? o && "set" in o && (r = o.set(e, i, n)) !== t ? r :e[n] = i :o && "get" in o && null !== (r = o.get(e, n)) ? r :e[n];
},
propHooks:{
tabIndex:{
get:function(e) {
var t = ut.find.attr(e, "tabindex");
return t ? parseInt(t, 10) :Dt.test(e.nodeName) || It.test(e.nodeName) && e.href ? 0 :-1;
}
}
}
}), At = {
set:function(e, t, n) {
return t === !1 ? ut.removeAttr(e, n) :Ot && Pt || !Bt.test(n) ? e.setAttribute(!Pt && ut.propFix[n] || n, n) :e[ut.camelCase("default-" + n)] = e[n] = !0, 
n;
}
}, ut.each(ut.expr.match.bool.source.match(/\w+/g), function(e, n) {
var i = ut.expr.attrHandle[n] || ut.find.attr;
ut.expr.attrHandle[n] = Ot && Pt || !Bt.test(n) ? function(e, n, r) {
var o = ut.expr.attrHandle[n], a = r ? t :(ut.expr.attrHandle[n] = t) != i(e, n, r) ? n.toLowerCase() :null;
return ut.expr.attrHandle[n] = o, a;
} :function(e, n, i) {
return i ? t :e[ut.camelCase("default-" + n)] ? n.toLowerCase() :null;
};
}), Ot && Pt || (ut.attrHooks.value = {
set:function(e, t, n) {
return ut.nodeName(e, "input") ? (e.defaultValue = t, void 0) :Nt && Nt.set(e, t, n);
}
}), Pt || (Nt = {
set:function(e, n, i) {
var r = e.getAttributeNode(i);
return r || e.setAttributeNode(r = e.ownerDocument.createAttribute(i)), r.value = n += "", 
"value" === i || n === e.getAttribute(i) ? n :t;
}
}, ut.expr.attrHandle.id = ut.expr.attrHandle.name = ut.expr.attrHandle.coords = function(e, n, i) {
var r;
return i ? t :(r = e.getAttributeNode(n)) && "" !== r.value ? r.value :null;
}, ut.valHooks.button = {
get:function(e, n) {
var i = e.getAttributeNode(n);
return i && i.specified ? i.value :t;
},
set:Nt.set
}, ut.attrHooks.contenteditable = {
set:function(e, t, n) {
Nt.set(e, "" === t ? !1 :t, n);
}
}, ut.each([ "width", "height" ], function(e, t) {
ut.attrHooks[t] = {
set:function(e, n) {
return "" === n ? (e.setAttribute(t, "auto"), n) :void 0;
}
};
})), ut.support.hrefNormalized || ut.each([ "href", "src" ], function(e, t) {
ut.propHooks[t] = {
get:function(e) {
return e.getAttribute(t, 4);
}
};
}), ut.support.style || (ut.attrHooks.style = {
get:function(e) {
return e.style.cssText || t;
},
set:function(e, t) {
return e.style.cssText = t + "";
}
}), ut.support.optSelected || (ut.propHooks.selected = {
get:function(e) {
var t = e.parentNode;
return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null;
}
}), ut.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
ut.propFix[this.toLowerCase()] = this;
}), ut.support.enctype || (ut.propFix.enctype = "encoding"), ut.each([ "radio", "checkbox" ], function() {
ut.valHooks[this] = {
set:function(e, t) {
return ut.isArray(t) ? e.checked = ut.inArray(ut(e).val(), t) >= 0 :void 0;
}
}, ut.support.checkOn || (ut.valHooks[this].get = function(e) {
return null === e.getAttribute("value") ? "on" :e.value;
});
});
var Rt = /^(?:input|select|textarea)$/i, Lt = /^key/, Ht = /^(?:mouse|contextmenu)|click/, Ft = /^(?:focusinfocus|focusoutblur)$/, jt = /^([^.]*)(?:\.(.+)|)$/;
ut.event = {
global:{},
add:function(e, n, i, r, o) {
var a, s, l, c, u, d, h, f, p, m, g, v = ut._data(e);
if (v) {
for (i.handler && (c = i, i = c.handler, o = c.selector), i.guid || (i.guid = ut.guid++), 
(s = v.events) || (s = v.events = {}), (d = v.handle) || (d = v.handle = function(e) {
return typeof ut === G || e && ut.event.triggered === e.type ? t :ut.event.dispatch.apply(d.elem, arguments);
}, d.elem = e), n = (n || "").match(ht) || [ "" ], l = n.length; l--; ) a = jt.exec(n[l]) || [], 
p = g = a[1], m = (a[2] || "").split(".").sort(), p && (u = ut.event.special[p] || {}, 
p = (o ? u.delegateType :u.bindType) || p, u = ut.event.special[p] || {}, h = ut.extend({
type:p,
origType:g,
data:r,
handler:i,
guid:i.guid,
selector:o,
needsContext:o && ut.expr.match.needsContext.test(o),
namespace:m.join(".")
}, c), (f = s[p]) || (f = s[p] = [], f.delegateCount = 0, u.setup && u.setup.call(e, r, m, d) !== !1 || (e.addEventListener ? e.addEventListener(p, d, !1) :e.attachEvent && e.attachEvent("on" + p, d))), 
u.add && (u.add.call(e, h), h.handler.guid || (h.handler.guid = i.guid)), o ? f.splice(f.delegateCount++, 0, h) :f.push(h), 
ut.event.global[p] = !0);
e = null;
}
},
remove:function(e, t, n, i, r) {
var o, a, s, l, c, u, d, h, f, p, m, g = ut.hasData(e) && ut._data(e);
if (g && (u = g.events)) {
for (t = (t || "").match(ht) || [ "" ], c = t.length; c--; ) if (s = jt.exec(t[c]) || [], 
f = m = s[1], p = (s[2] || "").split(".").sort(), f) {
for (d = ut.event.special[f] || {}, f = (i ? d.delegateType :d.bindType) || f, h = u[f] || [], 
s = s[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = o = h.length; o--; ) a = h[o], 
!r && m !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || i && i !== a.selector && ("**" !== i || !a.selector) || (h.splice(o, 1), 
a.selector && h.delegateCount--, d.remove && d.remove.call(e, a));
l && !h.length && (d.teardown && d.teardown.call(e, p, g.handle) !== !1 || ut.removeEvent(e, f, g.handle), 
delete u[f]);
} else for (f in u) ut.event.remove(e, f + t[c], n, i, !0);
ut.isEmptyObject(u) && (delete g.handle, ut._removeData(e, "events"));
}
},
trigger:function(n, i, r, o) {
var a, s, l, c, u, d, h, f = [ r || Q ], p = lt.call(n, "type") ? n.type :n, m = lt.call(n, "namespace") ? n.namespace.split(".") :[];
if (l = d = r = r || Q, 3 !== r.nodeType && 8 !== r.nodeType && !Ft.test(p + ut.event.triggered) && (p.indexOf(".") >= 0 && (m = p.split("."), 
p = m.shift(), m.sort()), s = p.indexOf(":") < 0 && "on" + p, n = n[ut.expando] ? n :new ut.Event(p, "object" == typeof n && n), 
n.isTrigger = o ? 2 :3, n.namespace = m.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") :null, 
n.result = t, n.target || (n.target = r), i = null == i ? [ n ] :ut.makeArray(i, [ n ]), 
u = ut.event.special[p] || {}, o || !u.trigger || u.trigger.apply(r, i) !== !1)) {
if (!o && !u.noBubble && !ut.isWindow(r)) {
for (c = u.delegateType || p, Ft.test(c + p) || (l = l.parentNode); l; l = l.parentNode) f.push(l), 
d = l;
d === (r.ownerDocument || Q) && f.push(d.defaultView || d.parentWindow || e);
}
for (h = 0; (l = f[h++]) && !n.isPropagationStopped(); ) n.type = h > 1 ? c :u.bindType || p, 
a = (ut._data(l, "events") || {})[n.type] && ut._data(l, "handle"), a && a.apply(l, i), 
a = s && l[s], a && ut.acceptData(l) && a.apply && a.apply(l, i) === !1 && n.preventDefault();
if (n.type = p, !o && !n.isDefaultPrevented() && (!u._default || u._default.apply(f.pop(), i) === !1) && ut.acceptData(r) && s && r[p] && !ut.isWindow(r)) {
d = r[s], d && (r[s] = null), ut.event.triggered = p;
try {
r[p]();
} catch (g) {}
ut.event.triggered = t, d && (r[s] = d);
}
return n.result;
}
},
dispatch:function(e) {
e = ut.event.fix(e);
var n, i, r, o, a, s = [], l = ot.call(arguments), c = (ut._data(this, "events") || {})[e.type] || [], u = ut.event.special[e.type] || {};
if (l[0] = e, e.delegateTarget = this, !u.preDispatch || u.preDispatch.call(this, e) !== !1) {
for (s = ut.event.handlers.call(this, e, c), n = 0; (o = s[n++]) && !e.isPropagationStopped(); ) for (e.currentTarget = o.elem, 
a = 0; (r = o.handlers[a++]) && !e.isImmediatePropagationStopped(); ) (!e.namespace_re || e.namespace_re.test(r.namespace)) && (e.handleObj = r, 
e.data = r.data, i = ((ut.event.special[r.origType] || {}).handle || r.handler).apply(o.elem, l), 
i !== t && (e.result = i) === !1 && (e.preventDefault(), e.stopPropagation()));
return u.postDispatch && u.postDispatch.call(this, e), e.result;
}
},
handlers:function(e, n) {
var i, r, o, a, s = [], l = n.delegateCount, c = e.target;
if (l && c.nodeType && (!e.button || "click" !== e.type)) for (;c != this; c = c.parentNode || this) if (1 === c.nodeType && (c.disabled !== !0 || "click" !== e.type)) {
for (o = [], a = 0; l > a; a++) r = n[a], i = r.selector + " ", o[i] === t && (o[i] = r.needsContext ? ut(i, this).index(c) >= 0 :ut.find(i, this, null, [ c ]).length), 
o[i] && o.push(r);
o.length && s.push({
elem:c,
handlers:o
});
}
return l < n.length && s.push({
elem:this,
handlers:n.slice(l)
}), s;
},
fix:function(e) {
if (e[ut.expando]) return e;
var t, n, i, r = e.type, o = e, a = this.fixHooks[r];
for (a || (this.fixHooks[r] = a = Ht.test(r) ? this.mouseHooks :Lt.test(r) ? this.keyHooks :{}), 
i = a.props ? this.props.concat(a.props) :this.props, e = new ut.Event(o), t = i.length; t--; ) n = i[t], 
e[n] = o[n];
return e.target || (e.target = o.srcElement || Q), 3 === e.target.nodeType && (e.target = e.target.parentNode), 
e.metaKey = !!e.metaKey, a.filter ? a.filter(e, o) :e;
},
props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
fixHooks:{},
keyHooks:{
props:"char charCode key keyCode".split(" "),
filter:function(e, t) {
return null == e.which && (e.which = null != t.charCode ? t.charCode :t.keyCode), 
e;
}
},
mouseHooks:{
props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
filter:function(e, n) {
var i, r, o, a = n.button, s = n.fromElement;
return null == e.pageX && null != n.clientX && (r = e.target.ownerDocument || Q, 
o = r.documentElement, i = r.body, e.pageX = n.clientX + (o && o.scrollLeft || i && i.scrollLeft || 0) - (o && o.clientLeft || i && i.clientLeft || 0), 
e.pageY = n.clientY + (o && o.scrollTop || i && i.scrollTop || 0) - (o && o.clientTop || i && i.clientTop || 0)), 
!e.relatedTarget && s && (e.relatedTarget = s === e.target ? n.toElement :s), e.which || a === t || (e.which = 1 & a ? 1 :2 & a ? 3 :4 & a ? 2 :0), 
e;
}
},
special:{
load:{
noBubble:!0
},
focus:{
trigger:function() {
if (this !== u() && this.focus) try {
return this.focus(), !1;
} catch (e) {}
},
delegateType:"focusin"
},
blur:{
trigger:function() {
return this === u() && this.blur ? (this.blur(), !1) :void 0;
},
delegateType:"focusout"
},
click:{
trigger:function() {
return ut.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), 
!1) :void 0;
},
_default:function(e) {
return ut.nodeName(e.target, "a");
}
},
beforeunload:{
postDispatch:function(e) {
e.result !== t && (e.originalEvent.returnValue = e.result);
}
}
},
simulate:function(e, t, n, i) {
var r = ut.extend(new ut.Event(), n, {
type:e,
isSimulated:!0,
originalEvent:{}
});
i ? ut.event.trigger(r, null, t) :ut.event.dispatch.call(t, r), r.isDefaultPrevented() && n.preventDefault();
}
}, ut.removeEvent = Q.removeEventListener ? function(e, t, n) {
e.removeEventListener && e.removeEventListener(t, n, !1);
} :function(e, t, n) {
var i = "on" + t;
e.detachEvent && (typeof e[i] === G && (e[i] = null), e.detachEvent(i, n));
}, ut.Event = function(e, t) {
return this instanceof ut.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, 
this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? l :c) :this.type = e, 
t && ut.extend(this, t), this.timeStamp = e && e.timeStamp || ut.now(), this[ut.expando] = !0, 
void 0) :new ut.Event(e, t);
}, ut.Event.prototype = {
isDefaultPrevented:c,
isPropagationStopped:c,
isImmediatePropagationStopped:c,
preventDefault:function() {
var e = this.originalEvent;
this.isDefaultPrevented = l, e && (e.preventDefault ? e.preventDefault() :e.returnValue = !1);
},
stopPropagation:function() {
var e = this.originalEvent;
this.isPropagationStopped = l, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0);
},
stopImmediatePropagation:function() {
this.isImmediatePropagationStopped = l, this.stopPropagation();
}
}, ut.each({
mouseenter:"mouseover",
mouseleave:"mouseout"
}, function(e, t) {
ut.event.special[e] = {
delegateType:t,
bindType:t,
handle:function(e) {
var n, i = this, r = e.relatedTarget, o = e.handleObj;
return (!r || r !== i && !ut.contains(i, r)) && (e.type = o.origType, n = o.handler.apply(this, arguments), 
e.type = t), n;
}
};
}), ut.support.submitBubbles || (ut.event.special.submit = {
setup:function() {
return ut.nodeName(this, "form") ? !1 :(ut.event.add(this, "click._submit keypress._submit", function(e) {
var n = e.target, i = ut.nodeName(n, "input") || ut.nodeName(n, "button") ? n.form :t;
i && !ut._data(i, "submitBubbles") && (ut.event.add(i, "submit._submit", function(e) {
e._submit_bubble = !0;
}), ut._data(i, "submitBubbles", !0));
}), void 0);
},
postDispatch:function(e) {
e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && ut.event.simulate("submit", this.parentNode, e, !0));
},
teardown:function() {
return ut.nodeName(this, "form") ? !1 :(ut.event.remove(this, "._submit"), void 0);
}
}), ut.support.changeBubbles || (ut.event.special.change = {
setup:function() {
return Rt.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ut.event.add(this, "propertychange._change", function(e) {
"checked" === e.originalEvent.propertyName && (this._just_changed = !0);
}), ut.event.add(this, "click._change", function(e) {
this._just_changed && !e.isTrigger && (this._just_changed = !1), ut.event.simulate("change", this, e, !0);
})), !1) :(ut.event.add(this, "beforeactivate._change", function(e) {
var t = e.target;
Rt.test(t.nodeName) && !ut._data(t, "changeBubbles") && (ut.event.add(t, "change._change", function(e) {
!this.parentNode || e.isSimulated || e.isTrigger || ut.event.simulate("change", this.parentNode, e, !0);
}), ut._data(t, "changeBubbles", !0));
}), void 0);
},
handle:function(e) {
var t = e.target;
return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) :void 0;
},
teardown:function() {
return ut.event.remove(this, "._change"), !Rt.test(this.nodeName);
}
}), ut.support.focusinBubbles || ut.each({
focus:"focusin",
blur:"focusout"
}, function(e, t) {
var n = 0, i = function(e) {
ut.event.simulate(t, e.target, ut.event.fix(e), !0);
};
ut.event.special[t] = {
setup:function() {
0 === n++ && Q.addEventListener(e, i, !0);
},
teardown:function() {
0 === --n && Q.removeEventListener(e, i, !0);
}
};
}), ut.fn.extend({
on:function(e, n, i, r, o) {
var a, s;
if ("object" == typeof e) {
"string" != typeof n && (i = i || n, n = t);
for (a in e) this.on(a, n, i, e[a], o);
return this;
}
if (null == i && null == r ? (r = n, i = n = t) :null == r && ("string" == typeof n ? (r = i, 
i = t) :(r = i, i = n, n = t)), r === !1) r = c; else if (!r) return this;
return 1 === o && (s = r, r = function(e) {
return ut().off(e), s.apply(this, arguments);
}, r.guid = s.guid || (s.guid = ut.guid++)), this.each(function() {
ut.event.add(this, e, r, i, n);
});
},
one:function(e, t, n, i) {
return this.on(e, t, n, i, 1);
},
off:function(e, n, i) {
var r, o;
if (e && e.preventDefault && e.handleObj) return r = e.handleObj, ut(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace :r.origType, r.selector, r.handler), 
this;
if ("object" == typeof e) {
for (o in e) this.off(o, n, e[o]);
return this;
}
return (n === !1 || "function" == typeof n) && (i = n, n = t), i === !1 && (i = c), 
this.each(function() {
ut.event.remove(this, e, i, n);
});
},
trigger:function(e, t) {
return this.each(function() {
ut.event.trigger(e, t, this);
});
},
triggerHandler:function(e, t) {
var n = this[0];
return n ? ut.event.trigger(e, t, n, !0) :void 0;
}
});
var zt = /^.[^:#\[\.,]*$/, Wt = /^(?:parents|prev(?:Until|All))/, Ut = ut.expr.match.needsContext, Vt = {
children:!0,
contents:!0,
next:!0,
prev:!0
};
ut.fn.extend({
find:function(e) {
var t, n = [], i = this, r = i.length;
if ("string" != typeof e) return this.pushStack(ut(e).filter(function() {
for (t = 0; r > t; t++) if (ut.contains(i[t], this)) return !0;
}));
for (t = 0; r > t; t++) ut.find(e, i[t], n);
return n = this.pushStack(r > 1 ? ut.unique(n) :n), n.selector = this.selector ? this.selector + " " + e :e, 
n;
},
has:function(e) {
var t, n = ut(e, this), i = n.length;
return this.filter(function() {
for (t = 0; i > t; t++) if (ut.contains(this, n[t])) return !0;
});
},
not:function(e) {
return this.pushStack(h(this, e || [], !0));
},
filter:function(e) {
return this.pushStack(h(this, e || [], !1));
},
is:function(e) {
return !!h(this, "string" == typeof e && Ut.test(e) ? ut(e) :e || [], !1).length;
},
closest:function(e, t) {
for (var n, i = 0, r = this.length, o = [], a = Ut.test(e) || "string" != typeof e ? ut(e, t || this.context) :0; r > i; i++) for (n = this[i]; n && n !== t; n = n.parentNode) if (n.nodeType < 11 && (a ? a.index(n) > -1 :1 === n.nodeType && ut.find.matchesSelector(n, e))) {
n = o.push(n);
break;
}
return this.pushStack(o.length > 1 ? ut.unique(o) :o);
},
index:function(e) {
return e ? "string" == typeof e ? ut.inArray(this[0], ut(e)) :ut.inArray(e.jquery ? e[0] :e, this) :this[0] && this[0].parentNode ? this.first().prevAll().length :-1;
},
add:function(e, t) {
var n = "string" == typeof e ? ut(e, t) :ut.makeArray(e && e.nodeType ? [ e ] :e), i = ut.merge(this.get(), n);
return this.pushStack(ut.unique(i));
},
addBack:function(e) {
return this.add(null == e ? this.prevObject :this.prevObject.filter(e));
}
}), ut.each({
parent:function(e) {
var t = e.parentNode;
return t && 11 !== t.nodeType ? t :null;
},
parents:function(e) {
return ut.dir(e, "parentNode");
},
parentsUntil:function(e, t, n) {
return ut.dir(e, "parentNode", n);
},
next:function(e) {
return d(e, "nextSibling");
},
prev:function(e) {
return d(e, "previousSibling");
},
nextAll:function(e) {
return ut.dir(e, "nextSibling");
},
prevAll:function(e) {
return ut.dir(e, "previousSibling");
},
nextUntil:function(e, t, n) {
return ut.dir(e, "nextSibling", n);
},
prevUntil:function(e, t, n) {
return ut.dir(e, "previousSibling", n);
},
siblings:function(e) {
return ut.sibling((e.parentNode || {}).firstChild, e);
},
children:function(e) {
return ut.sibling(e.firstChild);
},
contents:function(e) {
return ut.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document :ut.merge([], e.childNodes);
}
}, function(e, t) {
ut.fn[e] = function(n, i) {
var r = ut.map(this, t, n);
return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (r = ut.filter(i, r)), 
this.length > 1 && (Vt[e] || (r = ut.unique(r)), Wt.test(e) && (r = r.reverse())), 
this.pushStack(r);
};
}), ut.extend({
filter:function(e, t, n) {
var i = t[0];
return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? ut.find.matchesSelector(i, e) ? [ i ] :[] :ut.find.matches(e, ut.grep(t, function(e) {
return 1 === e.nodeType;
}));
},
dir:function(e, n, i) {
for (var r = [], o = e[n]; o && 9 !== o.nodeType && (i === t || 1 !== o.nodeType || !ut(o).is(i)); ) 1 === o.nodeType && r.push(o), 
o = o[n];
return r;
},
sibling:function(e, t) {
for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
return n;
}
});
var qt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", Kt = / jQuery\d+="(?:null|\d+)"/g, Gt = new RegExp("<(?:" + qt + ")[\\s/>]", "i"), Yt = /^\s+/, Qt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Jt = /<([\w:]+)/, Xt = /<tbody/i, Zt = /<|&#?\w+;/, en = /<(?:script|style|link)/i, tn = /^(?:checkbox|radio)$/i, nn = /checked\s*(?:[^=]|=\s*.checked.)/i, rn = /^$|\/(?:java|ecma)script/i, on = /^true\/(.*)/, an = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, sn = {
option:[ 1, "<select multiple='multiple'>", "</select>" ],
legend:[ 1, "<fieldset>", "</fieldset>" ],
area:[ 1, "<map>", "</map>" ],
param:[ 1, "<object>", "</object>" ],
thead:[ 1, "<table>", "</table>" ],
tr:[ 2, "<table><tbody>", "</tbody></table>" ],
col:[ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
td:[ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
_default:ut.support.htmlSerialize ? [ 0, "", "" ] :[ 1, "X<div>", "</div>" ]
}, ln = f(Q), cn = ln.appendChild(Q.createElement("div"));
sn.optgroup = sn.option, sn.tbody = sn.tfoot = sn.colgroup = sn.caption = sn.thead, 
sn.th = sn.td, ut.fn.extend({
text:function(e) {
return ut.access(this, function(e) {
return e === t ? ut.text(this) :this.empty().append((this[0] && this[0].ownerDocument || Q).createTextNode(e));
}, null, e, arguments.length);
},
append:function() {
return this.domManip(arguments, function(e) {
if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
var t = p(this, e);
t.appendChild(e);
}
});
},
prepend:function() {
return this.domManip(arguments, function(e) {
if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
var t = p(this, e);
t.insertBefore(e, t.firstChild);
}
});
},
before:function() {
return this.domManip(arguments, function(e) {
this.parentNode && this.parentNode.insertBefore(e, this);
});
},
after:function() {
return this.domManip(arguments, function(e) {
this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
});
},
remove:function(e, t) {
for (var n, i = e ? ut.filter(e, this) :this, r = 0; null != (n = i[r]); r++) t || 1 !== n.nodeType || ut.cleanData(w(n)), 
n.parentNode && (t && ut.contains(n.ownerDocument, n) && v(w(n, "script")), n.parentNode.removeChild(n));
return this;
},
empty:function() {
for (var e, t = 0; null != (e = this[t]); t++) {
for (1 === e.nodeType && ut.cleanData(w(e, !1)); e.firstChild; ) e.removeChild(e.firstChild);
e.options && ut.nodeName(e, "select") && (e.options.length = 0);
}
return this;
},
clone:function(e, t) {
return e = null == e ? !1 :e, t = null == t ? e :t, this.map(function() {
return ut.clone(this, e, t);
});
},
html:function(e) {
return ut.access(this, function(e) {
var n = this[0] || {}, i = 0, r = this.length;
if (e === t) return 1 === n.nodeType ? n.innerHTML.replace(Kt, "") :t;
if (!("string" != typeof e || en.test(e) || !ut.support.htmlSerialize && Gt.test(e) || !ut.support.leadingWhitespace && Yt.test(e) || sn[(Jt.exec(e) || [ "", "" ])[1].toLowerCase()])) {
e = e.replace(Qt, "<$1></$2>");
try {
for (;r > i; i++) n = this[i] || {}, 1 === n.nodeType && (ut.cleanData(w(n, !1)), 
n.innerHTML = e);
n = 0;
} catch (o) {}
}
n && this.empty().append(e);
}, null, e, arguments.length);
},
replaceWith:function() {
var e = ut.map(this, function(e) {
return [ e.nextSibling, e.parentNode ];
}), t = 0;
return this.domManip(arguments, function(n) {
var i = e[t++], r = e[t++];
r && (i && i.parentNode !== r && (i = this.nextSibling), ut(this).remove(), r.insertBefore(n, i));
}, !0), t ? this :this.remove();
},
detach:function(e) {
return this.remove(e, !0);
},
domManip:function(e, t, n) {
e = it.apply([], e);
var i, r, o, a, s, l, c = 0, u = this.length, d = this, h = u - 1, f = e[0], p = ut.isFunction(f);
if (p || !(1 >= u || "string" != typeof f || ut.support.checkClone) && nn.test(f)) return this.each(function(i) {
var r = d.eq(i);
p && (e[0] = f.call(this, i, r.html())), r.domManip(e, t, n);
});
if (u && (l = ut.buildFragment(e, this[0].ownerDocument, !1, !n && this), i = l.firstChild, 
1 === l.childNodes.length && (l = i), i)) {
for (a = ut.map(w(l, "script"), m), o = a.length; u > c; c++) r = l, c !== h && (r = ut.clone(r, !0, !0), 
o && ut.merge(a, w(r, "script"))), t.call(this[c], r, c);
if (o) for (s = a[a.length - 1].ownerDocument, ut.map(a, g), c = 0; o > c; c++) r = a[c], 
rn.test(r.type || "") && !ut._data(r, "globalEval") && ut.contains(s, r) && (r.src ? ut._evalUrl(r.src) :ut.globalEval((r.text || r.textContent || r.innerHTML || "").replace(an, "")));
l = i = null;
}
return this;
}
}), ut.each({
appendTo:"append",
prependTo:"prepend",
insertBefore:"before",
insertAfter:"after",
replaceAll:"replaceWith"
}, function(e, t) {
ut.fn[e] = function(e) {
for (var n, i = 0, r = [], o = ut(e), a = o.length - 1; a >= i; i++) n = i === a ? this :this.clone(!0), 
ut(o[i])[t](n), rt.apply(r, n.get());
return this.pushStack(r);
};
}), ut.extend({
clone:function(e, t, n) {
var i, r, o, a, s, l = ut.contains(e.ownerDocument, e);
if (ut.support.html5Clone || ut.isXMLDoc(e) || !Gt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) :(cn.innerHTML = e.outerHTML, 
cn.removeChild(o = cn.firstChild)), !(ut.support.noCloneEvent && ut.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ut.isXMLDoc(e))) for (i = w(o), 
s = w(e), a = 0; null != (r = s[a]); ++a) i[a] && b(r, i[a]);
if (t) if (n) for (s = s || w(e), i = i || w(o), a = 0; null != (r = s[a]); a++) y(r, i[a]); else y(e, o);
return i = w(o, "script"), i.length > 0 && v(i, !l && w(e, "script")), i = s = r = null, 
o;
},
buildFragment:function(e, t, n, i) {
for (var r, o, a, s, l, c, u, d = e.length, h = f(t), p = [], m = 0; d > m; m++) if (o = e[m], 
o || 0 === o) if ("object" === ut.type(o)) ut.merge(p, o.nodeType ? [ o ] :o); else if (Zt.test(o)) {
for (s = s || h.appendChild(t.createElement("div")), l = (Jt.exec(o) || [ "", "" ])[1].toLowerCase(), 
u = sn[l] || sn._default, s.innerHTML = u[1] + o.replace(Qt, "<$1></$2>") + u[2], 
r = u[0]; r--; ) s = s.lastChild;
if (!ut.support.leadingWhitespace && Yt.test(o) && p.push(t.createTextNode(Yt.exec(o)[0])), 
!ut.support.tbody) for (o = "table" !== l || Xt.test(o) ? "<table>" !== u[1] || Xt.test(o) ? 0 :s :s.firstChild, 
r = o && o.childNodes.length; r--; ) ut.nodeName(c = o.childNodes[r], "tbody") && !c.childNodes.length && o.removeChild(c);
for (ut.merge(p, s.childNodes), s.textContent = ""; s.firstChild; ) s.removeChild(s.firstChild);
s = h.lastChild;
} else p.push(t.createTextNode(o));
for (s && h.removeChild(s), ut.support.appendChecked || ut.grep(w(p, "input"), _), 
m = 0; o = p[m++]; ) if ((!i || -1 === ut.inArray(o, i)) && (a = ut.contains(o.ownerDocument, o), 
s = w(h.appendChild(o), "script"), a && v(s), n)) for (r = 0; o = s[r++]; ) rn.test(o.type || "") && n.push(o);
return s = null, h;
},
cleanData:function(e, t) {
for (var n, i, r, o, a = 0, s = ut.expando, l = ut.cache, c = ut.support.deleteExpando, u = ut.event.special; null != (n = e[a]); a++) if ((t || ut.acceptData(n)) && (r = n[s], 
o = r && l[r])) {
if (o.events) for (i in o.events) u[i] ? ut.event.remove(n, i) :ut.removeEvent(n, i, o.handle);
l[r] && (delete l[r], c ? delete n[s] :typeof n.removeAttribute !== G ? n.removeAttribute(s) :n[s] = null, 
tt.push(r));
}
},
_evalUrl:function(e) {
return ut.ajax({
url:e,
type:"GET",
dataType:"script",
async:!1,
global:!1,
"throws":!0
});
}
}), ut.fn.extend({
wrapAll:function(e) {
if (ut.isFunction(e)) return this.each(function(t) {
ut(this).wrapAll(e.call(this, t));
});
if (this[0]) {
var t = ut(e, this[0].ownerDocument).eq(0).clone(!0);
this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
for (var e = this; e.firstChild && 1 === e.firstChild.nodeType; ) e = e.firstChild;
return e;
}).append(this);
}
return this;
},
wrapInner:function(e) {
return ut.isFunction(e) ? this.each(function(t) {
ut(this).wrapInner(e.call(this, t));
}) :this.each(function() {
var t = ut(this), n = t.contents();
n.length ? n.wrapAll(e) :t.append(e);
});
},
wrap:function(e) {
var t = ut.isFunction(e);
return this.each(function(n) {
ut(this).wrapAll(t ? e.call(this, n) :e);
});
},
unwrap:function() {
return this.parent().each(function() {
ut.nodeName(this, "body") || ut(this).replaceWith(this.childNodes);
}).end();
}
});
var un, dn, hn, fn = /alpha\([^)]*\)/i, pn = /opacity\s*=\s*([^)]*)/, mn = /^(top|right|bottom|left)$/, gn = /^(none|table(?!-c[ea]).+)/, vn = /^margin/, yn = new RegExp("^(" + dt + ")(.*)$", "i"), bn = new RegExp("^(" + dt + ")(?!px)[a-z%]+$", "i"), wn = new RegExp("^([+-])=(" + dt + ")", "i"), _n = {
BODY:"block"
}, xn = {
position:"absolute",
visibility:"hidden",
display:"block"
}, kn = {
letterSpacing:0,
fontWeight:400
}, Cn = [ "Top", "Right", "Bottom", "Left" ], Sn = [ "Webkit", "O", "Moz", "ms" ];
ut.fn.extend({
css:function(e, n) {
return ut.access(this, function(e, n, i) {
var r, o, a = {}, s = 0;
if (ut.isArray(n)) {
for (o = dn(e), r = n.length; r > s; s++) a[n[s]] = ut.css(e, n[s], !1, o);
return a;
}
return i !== t ? ut.style(e, n, i) :ut.css(e, n);
}, e, n, arguments.length > 1);
},
show:function() {
return C(this, !0);
},
hide:function() {
return C(this);
},
toggle:function(e) {
var t = "boolean" == typeof e;
return this.each(function() {
(t ? e :k(this)) ? ut(this).show() :ut(this).hide();
});
}
}), ut.extend({
cssHooks:{
opacity:{
get:function(e, t) {
if (t) {
var n = hn(e, "opacity");
return "" === n ? "1" :n;
}
}
}
},
cssNumber:{
columnCount:!0,
fillOpacity:!0,
fontWeight:!0,
lineHeight:!0,
opacity:!0,
orphans:!0,
widows:!0,
zIndex:!0,
zoom:!0
},
cssProps:{
"float":ut.support.cssFloat ? "cssFloat" :"styleFloat"
},
style:function(e, n, i, r) {
if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
var o, a, s, l = ut.camelCase(n), c = e.style;
if (n = ut.cssProps[l] || (ut.cssProps[l] = x(c, l)), s = ut.cssHooks[n] || ut.cssHooks[l], 
i === t) return s && "get" in s && (o = s.get(e, !1, r)) !== t ? o :c[n];
if (a = typeof i, "string" === a && (o = wn.exec(i)) && (i = (o[1] + 1) * o[2] + parseFloat(ut.css(e, n)), 
a = "number"), !(null == i || "number" === a && isNaN(i) || ("number" !== a || ut.cssNumber[l] || (i += "px"), 
ut.support.clearCloneStyle || "" !== i || 0 !== n.indexOf("background") || (c[n] = "inherit"), 
s && "set" in s && (i = s.set(e, i, r)) === t))) try {
c[n] = i;
} catch (u) {}
}
},
css:function(e, n, i, r) {
var o, a, s, l = ut.camelCase(n);
return n = ut.cssProps[l] || (ut.cssProps[l] = x(e.style, l)), s = ut.cssHooks[n] || ut.cssHooks[l], 
s && "get" in s && (a = s.get(e, !0, i)), a === t && (a = hn(e, n, r)), "normal" === a && n in kn && (a = kn[n]), 
"" === i || i ? (o = parseFloat(a), i === !0 || ut.isNumeric(o) ? o || 0 :a) :a;
}
}), e.getComputedStyle ? (dn = function(t) {
return e.getComputedStyle(t, null);
}, hn = function(e, n, i) {
var r, o, a, s = i || dn(e), l = s ? s.getPropertyValue(n) || s[n] :t, c = e.style;
return s && ("" !== l || ut.contains(e.ownerDocument, e) || (l = ut.style(e, n)), 
bn.test(l) && vn.test(n) && (r = c.width, o = c.minWidth, a = c.maxWidth, c.minWidth = c.maxWidth = c.width = l, 
l = s.width, c.width = r, c.minWidth = o, c.maxWidth = a)), l;
}) :Q.documentElement.currentStyle && (dn = function(e) {
return e.currentStyle;
}, hn = function(e, n, i) {
var r, o, a, s = i || dn(e), l = s ? s[n] :t, c = e.style;
return null == l && c && c[n] && (l = c[n]), bn.test(l) && !mn.test(n) && (r = c.left, 
o = e.runtimeStyle, a = o && o.left, a && (o.left = e.currentStyle.left), c.left = "fontSize" === n ? "1em" :l, 
l = c.pixelLeft + "px", c.left = r, a && (o.left = a)), "" === l ? "auto" :l;
}), ut.each([ "height", "width" ], function(e, t) {
ut.cssHooks[t] = {
get:function(e, n, i) {
return n ? 0 === e.offsetWidth && gn.test(ut.css(e, "display")) ? ut.swap(e, xn, function() {
return T(e, t, i);
}) :T(e, t, i) :void 0;
},
set:function(e, n, i) {
var r = i && dn(e);
return S(e, n, i ? E(e, t, i, ut.support.boxSizing && "border-box" === ut.css(e, "boxSizing", !1, r), r) :0);
}
};
}), ut.support.opacity || (ut.cssHooks.opacity = {
get:function(e, t) {
return pn.test((t && e.currentStyle ? e.currentStyle.filter :e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" :t ? "1" :"";
},
set:function(e, t) {
var n = e.style, i = e.currentStyle, r = ut.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" :"", o = i && i.filter || n.filter || "";
n.zoom = 1, (t >= 1 || "" === t) && "" === ut.trim(o.replace(fn, "")) && n.removeAttribute && (n.removeAttribute("filter"), 
"" === t || i && !i.filter) || (n.filter = fn.test(o) ? o.replace(fn, r) :o + " " + r);
}
}), ut(function() {
ut.support.reliableMarginRight || (ut.cssHooks.marginRight = {
get:function(e, t) {
return t ? ut.swap(e, {
display:"inline-block"
}, hn, [ e, "marginRight" ]) :void 0;
}
}), !ut.support.pixelPosition && ut.fn.position && ut.each([ "top", "left" ], function(e, t) {
ut.cssHooks[t] = {
get:function(e, n) {
return n ? (n = hn(e, t), bn.test(n) ? ut(e).position()[t] + "px" :n) :void 0;
}
};
});
}), ut.expr && ut.expr.filters && (ut.expr.filters.hidden = function(e) {
return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !ut.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || ut.css(e, "display"));
}, ut.expr.filters.visible = function(e) {
return !ut.expr.filters.hidden(e);
}), ut.each({
margin:"",
padding:"",
border:"Width"
}, function(e, t) {
ut.cssHooks[e + t] = {
expand:function(n) {
for (var i = 0, r = {}, o = "string" == typeof n ? n.split(" ") :[ n ]; 4 > i; i++) r[e + Cn[i] + t] = o[i] || o[i - 2] || o[0];
return r;
}
}, vn.test(e) || (ut.cssHooks[e + t].set = S);
});
var En = /%20/g, Tn = /\[\]$/, Nn = /\r?\n/g, An = /^(?:submit|button|image|reset|file)$/i, $n = /^(?:input|select|textarea|keygen)/i;
ut.fn.extend({
serialize:function() {
return ut.param(this.serializeArray());
},
serializeArray:function() {
return this.map(function() {
var e = ut.prop(this, "elements");
return e ? ut.makeArray(e) :this;
}).filter(function() {
var e = this.type;
return this.name && !ut(this).is(":disabled") && $n.test(this.nodeName) && !An.test(e) && (this.checked || !tn.test(e));
}).map(function(e, t) {
var n = ut(this).val();
return null == n ? null :ut.isArray(n) ? ut.map(n, function(e) {
return {
name:t.name,
value:e.replace(Nn, "\r\n")
};
}) :{
name:t.name,
value:n.replace(Nn, "\r\n")
};
}).get();
}
}), ut.param = function(e, n) {
var i, r = [], o = function(e, t) {
t = ut.isFunction(t) ? t() :null == t ? "" :t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t);
};
if (n === t && (n = ut.ajaxSettings && ut.ajaxSettings.traditional), ut.isArray(e) || e.jquery && !ut.isPlainObject(e)) ut.each(e, function() {
o(this.name, this.value);
}); else for (i in e) $(i, e[i], n, o);
return r.join("&").replace(En, "+");
}, ut.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
ut.fn[t] = function(e, n) {
return arguments.length > 0 ? this.on(t, null, e, n) :this.trigger(t);
};
}), ut.fn.extend({
hover:function(e, t) {
return this.mouseenter(e).mouseleave(t || e);
},
bind:function(e, t, n) {
return this.on(e, null, t, n);
},
unbind:function(e, t) {
return this.off(e, null, t);
},
delegate:function(e, t, n, i) {
return this.on(t, e, n, i);
},
undelegate:function(e, t, n) {
return 1 === arguments.length ? this.off(e, "**") :this.off(t, e || "**", n);
}
});
var Mn, Dn, In = ut.now(), Bn = /\?/, Pn = /#.*$/, On = /([?&])_=[^&]*/, Rn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Ln = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Hn = /^(?:GET|HEAD)$/, Fn = /^\/\//, jn = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, zn = ut.fn.load, Wn = {}, Un = {}, Vn = "*/".concat("*");
try {
Dn = Y.href;
} catch (qn) {
Dn = Q.createElement("a"), Dn.href = "", Dn = Dn.href;
}
Mn = jn.exec(Dn.toLowerCase()) || [], ut.fn.load = function(e, n, i) {
if ("string" != typeof e && zn) return zn.apply(this, arguments);
var r, o, a, s = this, l = e.indexOf(" ");
return l >= 0 && (r = e.slice(l, e.length), e = e.slice(0, l)), ut.isFunction(n) ? (i = n, 
n = t) :n && "object" == typeof n && (a = "POST"), s.length > 0 && ut.ajax({
url:e,
type:a,
dataType:"html",
data:n
}).done(function(e) {
o = arguments, s.html(r ? ut("<div>").append(ut.parseHTML(e)).find(r) :e);
}).complete(i && function(e, t) {
s.each(i, o || [ e.responseText, t, e ]);
}), this;
}, ut.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(e, t) {
ut.fn[t] = function(e) {
return this.on(t, e);
};
}), ut.extend({
active:0,
lastModified:{},
etag:{},
ajaxSettings:{
url:Dn,
type:"GET",
isLocal:Ln.test(Mn[1]),
global:!0,
processData:!0,
async:!0,
contentType:"application/x-www-form-urlencoded; charset=UTF-8",
accepts:{
"*":Vn,
text:"text/plain",
html:"text/html",
xml:"application/xml, text/xml",
json:"application/json, text/javascript"
},
contents:{
xml:/xml/,
html:/html/,
json:/json/
},
responseFields:{
xml:"responseXML",
text:"responseText",
json:"responseJSON"
},
converters:{
"* text":String,
"text html":!0,
"text json":ut.parseJSON,
"text xml":ut.parseXML
},
flatOptions:{
url:!0,
context:!0
}
},
ajaxSetup:function(e, t) {
return t ? I(I(e, ut.ajaxSettings), t) :I(ut.ajaxSettings, e);
},
ajaxPrefilter:M(Wn),
ajaxTransport:M(Un),
ajax:function(e, n) {
function i(e, n, i, r) {
var o, d, y, b, _, k = n;
2 !== w && (w = 2, l && clearTimeout(l), u = t, s = r || "", x.readyState = e > 0 ? 4 :0, 
o = e >= 200 && 300 > e || 304 === e, i && (b = B(h, x, i)), b = P(h, b, x, o), 
o ? (h.ifModified && (_ = x.getResponseHeader("Last-Modified"), _ && (ut.lastModified[a] = _), 
_ = x.getResponseHeader("etag"), _ && (ut.etag[a] = _)), 204 === e || "HEAD" === h.type ? k = "nocontent" :304 === e ? k = "notmodified" :(k = b.state, 
d = b.data, y = b.error, o = !y)) :(y = k, (e || !k) && (k = "error", 0 > e && (e = 0))), 
x.status = e, x.statusText = (n || k) + "", o ? m.resolveWith(f, [ d, k, x ]) :m.rejectWith(f, [ x, k, y ]), 
x.statusCode(v), v = t, c && p.trigger(o ? "ajaxSuccess" :"ajaxError", [ x, h, o ? d :y ]), 
g.fireWith(f, [ x, k ]), c && (p.trigger("ajaxComplete", [ x, h ]), --ut.active || ut.event.trigger("ajaxStop")));
}
"object" == typeof e && (n = e, e = t), n = n || {};
var r, o, a, s, l, c, u, d, h = ut.ajaxSetup({}, n), f = h.context || h, p = h.context && (f.nodeType || f.jquery) ? ut(f) :ut.event, m = ut.Deferred(), g = ut.Callbacks("once memory"), v = h.statusCode || {}, y = {}, b = {}, w = 0, _ = "canceled", x = {
readyState:0,
getResponseHeader:function(e) {
var t;
if (2 === w) {
if (!d) for (d = {}; t = Rn.exec(s); ) d[t[1].toLowerCase()] = t[2];
t = d[e.toLowerCase()];
}
return null == t ? null :t;
},
getAllResponseHeaders:function() {
return 2 === w ? s :null;
},
setRequestHeader:function(e, t) {
var n = e.toLowerCase();
return w || (e = b[n] = b[n] || e, y[e] = t), this;
},
overrideMimeType:function(e) {
return w || (h.mimeType = e), this;
},
statusCode:function(e) {
var t;
if (e) if (2 > w) for (t in e) v[t] = [ v[t], e[t] ]; else x.always(e[x.status]);
return this;
},
abort:function(e) {
var t = e || _;
return u && u.abort(t), i(0, t), this;
}
};
if (m.promise(x).complete = g.add, x.success = x.done, x.error = x.fail, h.url = ((e || h.url || Dn) + "").replace(Pn, "").replace(Fn, Mn[1] + "//"), 
h.type = n.method || n.type || h.method || h.type, h.dataTypes = ut.trim(h.dataType || "*").toLowerCase().match(ht) || [ "" ], 
null == h.crossDomain && (r = jn.exec(h.url.toLowerCase()), h.crossDomain = !(!r || r[1] === Mn[1] && r[2] === Mn[2] && (r[3] || ("http:" === r[1] ? "80" :"443")) === (Mn[3] || ("http:" === Mn[1] ? "80" :"443")))), 
h.data && h.processData && "string" != typeof h.data && (h.data = ut.param(h.data, h.traditional)), 
D(Wn, h, n, x), 2 === w) return x;
c = h.global, c && 0 === ut.active++ && ut.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), 
h.hasContent = !Hn.test(h.type), a = h.url, h.hasContent || (h.data && (a = h.url += (Bn.test(a) ? "&" :"?") + h.data, 
delete h.data), h.cache === !1 && (h.url = On.test(a) ? a.replace(On, "$1_=" + In++) :a + (Bn.test(a) ? "&" :"?") + "_=" + In++)), 
h.ifModified && (ut.lastModified[a] && x.setRequestHeader("If-Modified-Since", ut.lastModified[a]), 
ut.etag[a] && x.setRequestHeader("If-None-Match", ut.etag[a])), (h.data && h.hasContent && h.contentType !== !1 || n.contentType) && x.setRequestHeader("Content-Type", h.contentType), 
x.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + Vn + "; q=0.01" :"") :h.accepts["*"]);
for (o in h.headers) x.setRequestHeader(o, h.headers[o]);
if (h.beforeSend && (h.beforeSend.call(f, x, h) === !1 || 2 === w)) return x.abort();
_ = "abort";
for (o in {
success:1,
error:1,
complete:1
}) x[o](h[o]);
if (u = D(Un, h, n, x)) {
x.readyState = 1, c && p.trigger("ajaxSend", [ x, h ]), h.async && h.timeout > 0 && (l = setTimeout(function() {
x.abort("timeout");
}, h.timeout));
try {
w = 1, u.send(y, i);
} catch (k) {
if (!(2 > w)) throw k;
i(-1, k);
}
} else i(-1, "No Transport");
return x;
},
getJSON:function(e, t, n) {
return ut.get(e, t, n, "json");
},
getScript:function(e, n) {
return ut.get(e, t, n, "script");
}
}), ut.each([ "get", "post" ], function(e, n) {
ut[n] = function(e, i, r, o) {
return ut.isFunction(i) && (o = o || r, r = i, i = t), ut.ajax({
url:e,
type:n,
dataType:o,
data:i,
success:r
});
};
}), ut.ajaxSetup({
accepts:{
script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
},
contents:{
script:/(?:java|ecma)script/
},
converters:{
"text script":function(e) {
return ut.globalEval(e), e;
}
}
}), ut.ajaxPrefilter("script", function(e) {
e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1);
}), ut.ajaxTransport("script", function(e) {
if (e.crossDomain) {
var n, i = Q.head || ut("head")[0] || Q.documentElement;
return {
send:function(t, r) {
n = Q.createElement("script"), n.async = !0, e.scriptCharset && (n.charset = e.scriptCharset), 
n.src = e.url, n.onload = n.onreadystatechange = function(e, t) {
(t || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, 
n.parentNode && n.parentNode.removeChild(n), n = null, t || r(200, "success"));
}, i.insertBefore(n, i.firstChild);
},
abort:function() {
n && n.onload(t, !0);
}
};
}
});
var Kn = [], Gn = /(=)\?(?=&|$)|\?\?/;
ut.ajaxSetup({
jsonp:"callback",
jsonpCallback:function() {
var e = Kn.pop() || ut.expando + "_" + In++;
return this[e] = !0, e;
}
}), ut.ajaxPrefilter("json jsonp", function(n, i, r) {
var o, a, s, l = n.jsonp !== !1 && (Gn.test(n.url) ? "url" :"string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Gn.test(n.data) && "data");
return l || "jsonp" === n.dataTypes[0] ? (o = n.jsonpCallback = ut.isFunction(n.jsonpCallback) ? n.jsonpCallback() :n.jsonpCallback, 
l ? n[l] = n[l].replace(Gn, "$1" + o) :n.jsonp !== !1 && (n.url += (Bn.test(n.url) ? "&" :"?") + n.jsonp + "=" + o), 
n.converters["script json"] = function() {
return s || ut.error(o + " was not called"), s[0];
}, n.dataTypes[0] = "json", a = e[o], e[o] = function() {
s = arguments;
}, r.always(function() {
e[o] = a, n[o] && (n.jsonpCallback = i.jsonpCallback, Kn.push(o)), s && ut.isFunction(a) && a(s[0]), 
s = a = t;
}), "script") :void 0;
});
var Yn, Qn, Jn = 0, Xn = e.ActiveXObject && function() {
var e;
for (e in Yn) Yn[e](t, !0);
};
ut.ajaxSettings.xhr = e.ActiveXObject ? function() {
return !this.isLocal && O() || R();
} :O, Qn = ut.ajaxSettings.xhr(), ut.support.cors = !!Qn && "withCredentials" in Qn, 
Qn = ut.support.ajax = !!Qn, Qn && ut.ajaxTransport(function(n) {
if (!n.crossDomain || ut.support.cors) {
var i;
return {
send:function(r, o) {
var a, s, l = n.xhr();
if (n.username ? l.open(n.type, n.url, n.async, n.username, n.password) :l.open(n.type, n.url, n.async), 
n.xhrFields) for (s in n.xhrFields) l[s] = n.xhrFields[s];
n.mimeType && l.overrideMimeType && l.overrideMimeType(n.mimeType), n.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
try {
for (s in r) l.setRequestHeader(s, r[s]);
} catch (c) {}
l.send(n.hasContent && n.data || null), i = function(e, r) {
var s, c, u, d;
try {
if (i && (r || 4 === l.readyState)) if (i = t, a && (l.onreadystatechange = ut.noop, 
Xn && delete Yn[a]), r) 4 !== l.readyState && l.abort(); else {
d = {}, s = l.status, c = l.getAllResponseHeaders(), "string" == typeof l.responseText && (d.text = l.responseText);
try {
u = l.statusText;
} catch (h) {
u = "";
}
s || !n.isLocal || n.crossDomain ? 1223 === s && (s = 204) :s = d.text ? 200 :404;
}
} catch (f) {
r || o(-1, f);
}
d && o(s, u, d, c);
}, n.async ? 4 === l.readyState ? setTimeout(i) :(a = ++Jn, Xn && (Yn || (Yn = {}, 
ut(e).unload(Xn)), Yn[a] = i), l.onreadystatechange = i) :i();
},
abort:function() {
i && i(t, !0);
}
};
}
});
var Zn, ei, ti = /^(?:toggle|show|hide)$/, ni = new RegExp("^(?:([+-])=|)(" + dt + ")([a-z%]*)$", "i"), ii = /queueHooks$/, ri = [ z ], oi = {
"*":[ function(e, t) {
var n = this.createTween(e, t), i = n.cur(), r = ni.exec(t), o = r && r[3] || (ut.cssNumber[e] ? "" :"px"), a = (ut.cssNumber[e] || "px" !== o && +i) && ni.exec(ut.css(n.elem, e)), s = 1, l = 20;
if (a && a[3] !== o) {
o = o || a[3], r = r || [], a = +i || 1;
do s = s || ".5", a /= s, ut.style(n.elem, e, a + o); while (s !== (s = n.cur() / i) && 1 !== s && --l);
}
return r && (n.unit = o, n.start = +a || +i || 0, n.end = r[1] ? a + (r[1] + 1) * r[2] :+r[2]), 
n;
} ]
};
ut.Animation = ut.extend(F, {
tweener:function(e, t) {
ut.isFunction(e) ? (t = e, e = [ "*" ]) :e = e.split(" ");
for (var n, i = 0, r = e.length; r > i; i++) n = e[i], oi[n] = oi[n] || [], oi[n].unshift(t);
},
prefilter:function(e, t) {
t ? ri.unshift(e) :ri.push(e);
}
}), ut.Tween = W, W.prototype = {
constructor:W,
init:function(e, t, n, i, r, o) {
this.elem = e, this.prop = n, this.easing = r || "swing", this.options = t, this.start = this.now = this.cur(), 
this.end = i, this.unit = o || (ut.cssNumber[n] ? "" :"px");
},
cur:function() {
var e = W.propHooks[this.prop];
return e && e.get ? e.get(this) :W.propHooks._default.get(this);
},
run:function(e) {
var t, n = W.propHooks[this.prop];
return this.pos = t = this.options.duration ? ut.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) :e, 
this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
n && n.set ? n.set(this) :W.propHooks._default.set(this), this;
}
}, W.prototype.init.prototype = W.prototype, W.propHooks = {
_default:{
get:function(e) {
var t;
return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = ut.css(e.elem, e.prop, ""), 
t && "auto" !== t ? t :0) :e.elem[e.prop];
},
set:function(e) {
ut.fx.step[e.prop] ? ut.fx.step[e.prop](e) :e.elem.style && (null != e.elem.style[ut.cssProps[e.prop]] || ut.cssHooks[e.prop]) ? ut.style(e.elem, e.prop, e.now + e.unit) :e.elem[e.prop] = e.now;
}
}
}, W.propHooks.scrollTop = W.propHooks.scrollLeft = {
set:function(e) {
e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
}
}, ut.each([ "toggle", "show", "hide" ], function(e, t) {
var n = ut.fn[t];
ut.fn[t] = function(e, i, r) {
return null == e || "boolean" == typeof e ? n.apply(this, arguments) :this.animate(U(t, !0), e, i, r);
};
}), ut.fn.extend({
fadeTo:function(e, t, n, i) {
return this.filter(k).css("opacity", 0).show().end().animate({
opacity:t
}, e, n, i);
},
animate:function(e, t, n, i) {
var r = ut.isEmptyObject(e), o = ut.speed(t, n, i), a = function() {
var t = F(this, ut.extend({}, e), o);
a.finish = function() {
t.stop(!0);
}, (r || ut._data(this, "finish")) && t.stop(!0);
};
return a.finish = a, r || o.queue === !1 ? this.each(a) :this.queue(o.queue, a);
},
stop:function(e, n, i) {
var r = function(e) {
var t = e.stop;
delete e.stop, t(i);
};
return "string" != typeof e && (i = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), 
this.each(function() {
var t = !0, n = null != e && e + "queueHooks", o = ut.timers, a = ut._data(this);
if (n) a[n] && a[n].stop && r(a[n]); else for (n in a) a[n] && a[n].stop && ii.test(n) && r(a[n]);
for (n = o.length; n--; ) o[n].elem !== this || null != e && o[n].queue !== e || (o[n].anim.stop(i), 
t = !1, o.splice(n, 1));
(t || !i) && ut.dequeue(this, e);
});
},
finish:function(e) {
return e !== !1 && (e = e || "fx"), this.each(function() {
var t, n = ut._data(this), i = n[e + "queue"], r = n[e + "queueHooks"], o = ut.timers, a = i ? i.length :0;
for (n.finish = !0, ut.queue(this, e, []), r && r.cur && r.cur.finish && r.cur.finish.call(this), 
t = o.length; t--; ) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), 
o.splice(t, 1));
for (t = 0; a > t; t++) i[t] && i[t].finish && i[t].finish.call(this);
delete n.finish;
});
}
}), ut.each({
slideDown:U("show"),
slideUp:U("hide"),
slideToggle:U("toggle"),
fadeIn:{
opacity:"show"
},
fadeOut:{
opacity:"hide"
},
fadeToggle:{
opacity:"toggle"
}
}, function(e, t) {
ut.fn[e] = function(e, n, i) {
return this.animate(t, e, n, i);
};
}), ut.speed = function(e, t, n) {
var i = e && "object" == typeof e ? ut.extend({}, e) :{
complete:n || !n && t || ut.isFunction(e) && e,
duration:e,
easing:n && t || t && !ut.isFunction(t) && t
};
return i.duration = ut.fx.off ? 0 :"number" == typeof i.duration ? i.duration :i.duration in ut.fx.speeds ? ut.fx.speeds[i.duration] :ut.fx.speeds._default, 
(null == i.queue || i.queue === !0) && (i.queue = "fx"), i.old = i.complete, i.complete = function() {
ut.isFunction(i.old) && i.old.call(this), i.queue && ut.dequeue(this, i.queue);
}, i;
}, ut.easing = {
linear:function(e) {
return e;
},
swing:function(e) {
return .5 - Math.cos(e * Math.PI) / 2;
}
}, ut.timers = [], ut.fx = W.prototype.init, ut.fx.tick = function() {
var e, n = ut.timers, i = 0;
for (Zn = ut.now(); i < n.length; i++) e = n[i], e() || n[i] !== e || n.splice(i--, 1);
n.length || ut.fx.stop(), Zn = t;
}, ut.fx.timer = function(e) {
e() && ut.timers.push(e) && ut.fx.start();
}, ut.fx.interval = 13, ut.fx.start = function() {
ei || (ei = setInterval(ut.fx.tick, ut.fx.interval));
}, ut.fx.stop = function() {
clearInterval(ei), ei = null;
}, ut.fx.speeds = {
slow:600,
fast:200,
_default:400
}, ut.fx.step = {}, ut.expr && ut.expr.filters && (ut.expr.filters.animated = function(e) {
return ut.grep(ut.timers, function(t) {
return e === t.elem;
}).length;
}), ut.fn.offset = function(e) {
if (arguments.length) return e === t ? this :this.each(function(t) {
ut.offset.setOffset(this, e, t);
});
var n, i, r = {
top:0,
left:0
}, o = this[0], a = o && o.ownerDocument;
if (a) return n = a.documentElement, ut.contains(n, o) ? (typeof o.getBoundingClientRect !== G && (r = o.getBoundingClientRect()), 
i = V(a), {
top:r.top + (i.pageYOffset || n.scrollTop) - (n.clientTop || 0),
left:r.left + (i.pageXOffset || n.scrollLeft) - (n.clientLeft || 0)
}) :r;
}, ut.offset = {
setOffset:function(e, t, n) {
var i = ut.css(e, "position");
"static" === i && (e.style.position = "relative");
var r, o, a = ut(e), s = a.offset(), l = ut.css(e, "top"), c = ut.css(e, "left"), u = ("absolute" === i || "fixed" === i) && ut.inArray("auto", [ l, c ]) > -1, d = {}, h = {};
u ? (h = a.position(), r = h.top, o = h.left) :(r = parseFloat(l) || 0, o = parseFloat(c) || 0), 
ut.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (d.top = t.top - s.top + r), 
null != t.left && (d.left = t.left - s.left + o), "using" in t ? t.using.call(e, d) :a.css(d);
}
}, ut.fn.extend({
position:function() {
if (this[0]) {
var e, t, n = {
top:0,
left:0
}, i = this[0];
return "fixed" === ut.css(i, "position") ? t = i.getBoundingClientRect() :(e = this.offsetParent(), 
t = this.offset(), ut.nodeName(e[0], "html") || (n = e.offset()), n.top += ut.css(e[0], "borderTopWidth", !0), 
n.left += ut.css(e[0], "borderLeftWidth", !0)), {
top:t.top - n.top - ut.css(i, "marginTop", !0),
left:t.left - n.left - ut.css(i, "marginLeft", !0)
};
}
},
offsetParent:function() {
return this.map(function() {
for (var e = this.offsetParent || J; e && !ut.nodeName(e, "html") && "static" === ut.css(e, "position"); ) e = e.offsetParent;
return e || J;
});
}
}), ut.each({
scrollLeft:"pageXOffset",
scrollTop:"pageYOffset"
}, function(e, n) {
var i = /Y/.test(n);
ut.fn[e] = function(r) {
return ut.access(this, function(e, r, o) {
var a = V(e);
return o === t ? a ? n in a ? a[n] :a.document.documentElement[r] :e[r] :(a ? a.scrollTo(i ? ut(a).scrollLeft() :o, i ? o :ut(a).scrollTop()) :e[r] = o, 
void 0);
}, e, r, arguments.length, null);
};
}), ut.each({
Height:"height",
Width:"width"
}, function(e, n) {
ut.each({
padding:"inner" + e,
content:n,
"":"outer" + e
}, function(i, r) {
ut.fn[r] = function(r, o) {
var a = arguments.length && (i || "boolean" != typeof r), s = i || (r === !0 || o === !0 ? "margin" :"border");
return ut.access(this, function(n, i, r) {
var o;
return ut.isWindow(n) ? n.document.documentElement["client" + e] :9 === n.nodeType ? (o = n.documentElement, 
Math.max(n.body["scroll" + e], o["scroll" + e], n.body["offset" + e], o["offset" + e], o["client" + e])) :r === t ? ut.css(n, i, s) :ut.style(n, i, r, s);
}, n, a ? r :t, a, null);
};
});
}), ut.fn.size = function() {
return this.length;
}, ut.fn.andSelf = ut.fn.addBack, "object" == typeof module && "object" == typeof module.exports ? module.exports = ut :(e.jQuery = e.$ = ut, 
"function" == typeof define && define.amd && define("jquery", [], function() {
return ut;
}));
}(window);