var _gaq = {push: function (){}};
(function()
{
    window.Bobcat = window.$B = window.Bobcat || {}, window.console || (window.console = {
        log: function()
        {
            return {};
        },
        error: function()
        {
            return {};
        },
        warn: function()
        {
            return {};
        }
    });
}).call(this),
function(e, t)
{
    e.rails !== t && e.error("jquery-ujs has already been loaded!");
    var n;
    e.rails = n = {
        linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",
        buttonClickSelector: "button[data-remote]",
        inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
        formSubmitSelector: "form",
        formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",
        disableSelector: "input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",
        enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",
        requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
        fileInputSelector: "input[type=file]",
        linkDisableSelector: "a[data-disable-with]",
        CSRFProtection: function(t)
        {
            var n = e('meta[name="csrf-token"]').attr("content");
            n && t.setRequestHeader("X-CSRF-Token", n);
        },
        fire: function(t, n, i)
        {
            var r = e.Event(n);
            return t.trigger(r, i), r.result !== !1;
        },
        confirm: function(e)
        {
            return confirm(e);
        },
        ajax: function(t)
        {
            return e.ajax(t);
        },
        href: function(e)
        {
            return e.attr("href");
        },
        handleRemote: function(i)
        {
            var r, o, a, s, l, u, c, d;
            if (n.fire(i, "ajax:before"))
            {
                if (s = i.data("cross-domain"), l = s === t ? null : s, u = i.data("with-credentials") || null,
                c = i.data("type") || e.ajaxSettings && e.ajaxSettings.dataType, i.is("form"))
                {
                    r = i.attr("method"), o = i.attr("action"), a = i.serializeArray();
                    var p = i.data("ujs:submit-button");
                    p && (a.push(p), i.data("ujs:submit-button", null));
                }
                else i.is(n.inputChangeSelector) ? (r = i.data("method"), o = i.data("url"), a = i.serialize(),
                i.data("params") && (a = a + "&" + i.data("params"))) : i.is(n.buttonClickSelector) ? (r = i.data("method") || "get",
                o = i.data("url"), a = i.serialize(), i.data("params") && (a = a + "&" + i.data("params"))) : (r = i.data("method"),
                o = n.href(i), a = i.data("params") || null);
                d = {
                    type: r || "GET",
                    data: a,
                    dataType: c,
                    beforeSend: function(e, r)
                    {
                        return r.dataType === t && e.setRequestHeader("accept", "*/*;q=0.5, " + r.accepts.script),
                        n.fire(i, "ajax:beforeSend", [e, r]);
                    },
                    success: function(e, t, n)
                    {
                        i.trigger("ajax:success", [e, t, n]);
                    },
                    complete: function(e, t)
                    {
                        i.trigger("ajax:complete", [e, t]);
                    },
                    error: function(e, t, n)
                    {
                        i.trigger("ajax:error", [e, t, n]);
                    },
                    crossDomain: l
                }, u && (d.xhrFields = {
                    withCredentials: u
                }), o && (d.url = o);
                var h = n.ajax(d);
                return i.trigger("ajax:send", h), h;
            }
            return !1;
        },
        handleMethod: function(i)
        {
            var r = n.href(i),
                o = i.data("method"),
                a = i.attr("target"),
                s = e("meta[name=csrf-token]").attr("content"),
                l = e("meta[name=csrf-param]").attr("content"),
                u = e('<form method="post" action="' + r + '"></form>'),
                c = '<input name="_method" value="' + o + '" type="hidden" />';
            l !== t && s !== t && (c += '<input name="' + l + '" value="' + s + '" type="hidden" />'),
            a && u.attr("target", a), u.hide().append(c).appendTo("body"), u.submit();
        },
        disableFormElements: function(t)
        {
            t.find(n.disableSelector).each(function()
            {
                var t = e(this),
                    n = t.is("button") ? "html" : "val";
                t.data("ujs:enable-with", t[n]()), t[n](t.data("disable-with")), t.prop("disabled", !0);
            });
        },
        enableFormElements: function(t)
        {
            t.find(n.enableSelector).each(function()
            {
                var t = e(this),
                    n = t.is("button") ? "html" : "val";
                t.data("ujs:enable-with") && t[n](t.data("ujs:enable-with")), t.prop("disabled", !1);
            });
        },
        allowAction: function(e)
        {
            var t, i = e.data("confirm"),
                r = !1;
            return i ? (n.fire(e, "confirm") && (r = n.confirm(i), t = n.fire(e, "confirm:complete", [r])),
            r && t) : !0;
        },
        blankInputs: function(t, n, i)
        {
            var r, o, a = e(),
                s = n || "input,textarea",
                l = t.find(s);
            return l.each(function()
            {
                if (r = e(this), o = r.is("input[type=checkbox],input[type=radio]") ? r.is(":checked") : r.val(), !o == !i)
                {
                    if (r.is("input[type=radio]") && l.filter('input[type=radio]:checked[name="' + r.attr("name") + '"]').length) return !0;
                    a = a.add(r);
                }
            }), a.length ? a : !1;
        },
        nonBlankInputs: function(e, t)
        {
            return n.blankInputs(e, t, !0);
        },
        stopEverything: function(t)
        {
            return e(t.target).trigger("ujs:everythingStopped"), t.stopImmediatePropagation(), !1;
        },
        disableElement: function(e)
        {
            e.data("ujs:enable-with", e.html()), e.html(e.data("disable-with")), e.bind("click.railsDisable", function(e)
            {
                return n.stopEverything(e);
            });
        },
        enableElement: function(e)
        {
            e.data("ujs:enable-with") !== t && (e.html(e.data("ujs:enable-with")), e.removeData("ujs:enable-with")),
            e.unbind("click.railsDisable");
        }
    }, n.fire(e(document), "rails:attachBindings") && (e.ajaxPrefilter(function(e, t, i)
    {
        e.crossDomain || n.CSRFProtection(i);
    }), e(document).delegate(n.linkDisableSelector, "ajax:complete", function()
    {
        n.enableElement(e(this));
    }), e(document).delegate(n.linkClickSelector, "click.rails", function(i)
    {
        var r = e(this),
            o = r.data("method"),
            a = r.data("params");
        if (!n.allowAction(r)) return n.stopEverything(i);
        if (r.is(n.linkDisableSelector) && n.disableElement(r), r.data("remote") !== t)
        {
            if (!(!i.metaKey && !i.ctrlKey || o && "GET" !== o || a)) return !0;
            var s = n.handleRemote(r);
            return s === !1 ? n.enableElement(r) : s.error(function()
            {
                n.enableElement(r);
            }), !1;
        }
        return r.data("method") ? (n.handleMethod(r), !1) : void 0;
    }), e(document).delegate(n.buttonClickSelector, "click.rails", function(t)
    {
        var i = e(this);
        return n.allowAction(i) ? (n.handleRemote(i), !1) : n.stopEverything(t);
    }), e(document).delegate(n.inputChangeSelector, "change.rails", function(t)
    {
        var i = e(this);
        return n.allowAction(i) ? (n.handleRemote(i), !1) : n.stopEverything(t);
    }), e(document).delegate(n.formSubmitSelector, "submit.rails", function(i)
    {
        var r = e(this),
            o = r.data("remote") !== t,
            a = n.blankInputs(r, n.requiredInputSelector),
            s = n.nonBlankInputs(r, n.fileInputSelector);
        if (!n.allowAction(r)) return n.stopEverything(i);
        if (a && r.attr("novalidate") == t && n.fire(r, "ajax:aborted:required", [a])) return n.stopEverything(i);
        if (o)
        {
            if (s)
            {
                setTimeout(function()
                {
                    n.disableFormElements(r);
                }, 13);
                var l = n.fire(r, "ajax:aborted:file", [s]);
                return l || setTimeout(function()
                {
                    n.enableFormElements(r);
                }, 13), l;
            }
            return n.handleRemote(r), !1;
        }
        setTimeout(function()
        {
            n.disableFormElements(r);
        }, 13);
    }), e(document).delegate(n.formInputClickSelector, "click.rails", function(t)
    {
        var i = e(this);
        if (!n.allowAction(i)) return n.stopEverything(t);
        var r = i.attr("name"),
            o = r ? {
                name: r,
                value: i.val()
            } : null;
        i.closest("form").data("ujs:submit-button", o);
    }), e(document).delegate(n.formSubmitSelector, "ajax:beforeSend.rails", function(t)
    {
        this == t.target && n.disableFormElements(e(this));
    }), e(document).delegate(n.formSubmitSelector, "ajax:complete.rails", function(t)
    {
        this == t.target && n.enableFormElements(e(this));
    }), e(function()
    {
        var t = e("meta[name=csrf-token]").attr("content"),
            n = e("meta[name=csrf-param]").attr("content");
        e('form input[name="' + n + '"]').val(t);
    }));
}(jQuery),
function()
{
    var e, t;
    jQuery.uaMatch = function(e)
    {
        e = e.toLowerCase();
        var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
        return {
            browser: t[1] || "",
            version: t[2] || "0"
        };
    }, e = jQuery.uaMatch(navigator.userAgent), t = {}, e.browser && (t[e.browser] = !0,
    t.version = e.version), t.chrome ? t.webkit = !0 : t.webkit && (t.safari = !0), jQuery.browser = t,
    jQuery.sub = function()
    {
        function e(t, n)
        {
            return new e.fn.init(t, n);
        }
        jQuery.extend(!0, e, this), e.superclass = this, e.fn = e.prototype = this(), e.fn.constructor = e,
        e.sub = this.sub, e.fn.init = function(n, i)
        {
            return i && i instanceof jQuery && !(i instanceof e) && (i = e(i)), jQuery.fn.init.call(this, n, i, t);
        }, e.fn.init.prototype = e.fn;
        var t = e(document);
        return e;
    };
}(),
function(e)
{
    function t(e)
    {
        return "object" == typeof e ? e : {
            top: e,
            left: e
        };
    }
    var n = e.scrollTo = function(t, n, i)
    {
        e(window).scrollTo(t, n, i);
    };
    n.defaults = {
        axis: "xy",
        duration: parseFloat(e.fn.jquery) >= 1.3 ? 0 : 1
    }, n.window = function()
    {
        return e(window)._scrollable();
    }, e.fn._scrollable = function()
    {
        return this.map(function()
        {
            var t = this,
                n = !t.nodeName || -1 != e.inArray(t.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]);
            if (!n) return t;
            var i = (t.contentWindow || t).document || t.ownerDocument || t;
            return e.browser.safari || "BackCompat" == i.compatMode ? i.body : i.documentElement;
        });
    }, e.fn.scrollTo = function(i, r, o)
    {
        return "object" == typeof r && (o = r, r = 0), "function" == typeof o && (o = {
            onAfter: o
        }), "max" == i && (i = 9e9), o = e.extend(
        {}, n.defaults, o), r = r || o.speed || o.duration,
        o.queue = o.queue && o.axis.length > 1, o.queue && (r /= 2), o.offset = t(o.offset),
        o.over = t(o.over), this._scrollable().each(function()
        {
            function a(e)
            {
                u.animate(d, r, o.easing, e && function()
                {
                    e.call(this, i, o);
                });
            }
            var s, l = this,
                u = e(l),
                c = i,
                d = {}, p = u.is("html,body");
            switch (typeof c)
            {
            case "number":
            case "string":
                if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(c))
                {
                    c = t(c);
                    break;
                }
                c = e(c, this);

            case "object":
                (c.is || c.style) && (s = (c = e(c)).offset());
            }
            e.each(o.axis.split(""), function(e, t)
            {
                var i = "x" == t ? "Left" : "Top",
                    r = i.toLowerCase(),
                    h = "scroll" + i,
                    f = l[h],
                    m = n.max(l, t);
                if (s) d[h] = s[r] + (p ? 0 : f - u.offset()[r]), o.margin && (d[h] -= parseInt(c.css("margin" + i)) || 0,
                d[h] -= parseInt(c.css("border" + i + "Width")) || 0), d[h] += o.offset[r] || 0,
                o.over[r] && (d[h] += c["x" == t ? "width" : "height"]() * o.over[r]);
                else
                {
                    var g = c[r];
                    d[h] = g.slice && "%" == g.slice(-1) ? parseFloat(g) / 100 * m : g;
                }
                /^\d+$/.test(d[h]) && (d[h] = d[h] <= 0 ? 0 : Math.min(d[h], m)), !e && o.queue && (f != d[h] && a(o.onAfterFirst),
                delete d[h]);
            }), a(o.onAfter);
        }).end();
    }, n.max = function(t, n)
    {
        var i = "x" == n ? "Width" : "Height",
            r = "scroll" + i;
        if (!e(t).is("html,body")) return t[r] - e(t)[i.toLowerCase()]();
        var o = "client" + i,
            a = t.ownerDocument.documentElement,
            s = t.ownerDocument.body;
        return Math.max(a[r], s[r]) - Math.min(a[o], s[o]);
    };
}(jQuery),
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing,
{
    def: "easeOutQuad",
    swing: function(e, t, n, i, r)
    {
        return (t /= r / 2) < 1 ? i / 2 * t * t + n : -i / 2 * (--t * (t - 2) - 1) + n;
    },
    easeInQuad: function(e, t, n, i, r)
    {
        return i * (t /= r) * t + n;
    },
    easeOutQuad: function(e, t, n, i, r)
    {
        return -i * (t /= r) * (t - 2) + n;
    },
    easeInOutQuad: function(e, t, n, i, r)
    {
        return (t /= r / 2) < 1 ? i / 2 * t * t + n : -i / 2 * (--t * (t - 2) - 1) + n;
    },
    easeInCubic: function(e, t, n, i, r)
    {
        return i * (t /= r) * t * t + n;
    },
    easeOutCubic: function(e, t, n, i, r)
    {
        return i * ((t = t / r - 1) * t * t + 1) + n;
    },
    easeInOutCubic: function(e, t, n, i, r)
    {
        return (t /= r / 2) < 1 ? i / 2 * t * t * t + n : i / 2 * ((t -= 2) * t * t + 2) + n;
    },
    easeInQuart: function(e, t, n, i, r)
    {
        return i * (t /= r) * t * t * t + n;
    },
    easeOutQuart: function(e, t, n, i, r)
    {
        return -i * ((t = t / r - 1) * t * t * t - 1) + n;
    },
    easeInOutQuart: function(e, t, n, i, r)
    {
        return (t /= r / 2) < 1 ? i / 2 * t * t * t * t + n : -i / 2 * ((t -= 2) * t * t * t - 2) + n;
    },
    easeInQuint: function(e, t, n, i, r)
    {
        return i * (t /= r) * t * t * t * t + n;
    },
    easeOutQuint: function(e, t, n, i, r)
    {
        return i * ((t = t / r - 1) * t * t * t * t + 1) + n;
    },
    easeInOutQuint: function(e, t, n, i, r)
    {
        return (t /= r / 2) < 1 ? i / 2 * t * t * t * t * t + n : i / 2 * ((t -= 2) * t * t * t * t + 2) + n;
    },
    easeInSine: function(e, t, n, i, r)
    {
        return -i * Math.cos(t / r * (Math.PI / 2)) + i + n;
    },
    easeOutSine: function(e, t, n, i, r)
    {
        return i * Math.sin(t / r * (Math.PI / 2)) + n;
    },
    easeInOutSine: function(e, t, n, i, r)
    {
        return -i / 2 * (Math.cos(Math.PI * t / r) - 1) + n;
    },
    easeInExpo: function(e, t, n, i, r)
    {
        return 0 == t ? n : i * Math.pow(2, 10 * (t / r - 1)) + n;
    },
    easeOutExpo: function(e, t, n, i, r)
    {
        return t == r ? n + i : i * (-Math.pow(2, - 10 * t / r) + 1) + n;
    },
    easeInOutExpo: function(e, t, n, i, r)
    {
        return 0 == t ? n : t == r ? n + i : (t /= r / 2) < 1 ? i / 2 * Math.pow(2, 10 * (t - 1)) + n : i / 2 * (-Math.pow(2, - 10 * --t) + 2) + n;
    },
    easeInCirc: function(e, t, n, i, r)
    {
        return -i * (Math.sqrt(1 - (t /= r) * t) - 1) + n;
    },
    easeOutCirc: function(e, t, n, i, r)
    {
        return i * Math.sqrt(1 - (t = t / r - 1) * t) + n;
    },
    easeInOutCirc: function(e, t, n, i, r)
    {
        return (t /= r / 2) < 1 ? -i / 2 * (Math.sqrt(1 - t * t) - 1) + n : i / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n;
    },
    easeInElastic: function(e, t, n, i, r)
    {
        var o = 1.70158,
            a = 0,
            s = i;
        if (0 == t) return n;
        if (1 == (t /= r)) return n + i;
        if (a || (a = .3 * r), s < Math.abs(i))
        {
            s = i;
            var o = a / 4;
        }
        else var o = a / (2 * Math.PI) * Math.asin(i / s);
        return -(s * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t * r - o) * Math.PI / a)) + n;
    },
    easeOutElastic: function(e, t, n, i, r)
    {
        var o = 1.70158,
            a = 0,
            s = i;
        if (0 == t) return n;
        if (1 == (t /= r)) return n + i;
        if (a || (a = .3 * r), s < Math.abs(i))
        {
            s = i;
            var o = a / 4;
        }
        else var o = a / (2 * Math.PI) * Math.asin(i / s);
        return s * Math.pow(2, - 10 * t) * Math.sin(2 * (t * r - o) * Math.PI / a) + i + n;
    },
    easeInOutElastic: function(e, t, n, i, r)
    {
        var o = 1.70158,
            a = 0,
            s = i;
        if (0 == t) return n;
        if (2 == (t /= r / 2)) return n + i;
        if (a || (a = .3 * r * 1.5), s < Math.abs(i))
        {
            s = i;
            var o = a / 4;
        }
        else var o = a / (2 * Math.PI) * Math.asin(i / s);
        return 1 > t ? -.5 * s * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t * r - o) * Math.PI / a) + n : s * Math.pow(2, - 10 * (t -= 1)) * Math.sin(2 * (t * r - o) * Math.PI / a) * .5 + i + n;
    },
    easeInBack: function(e, t, n, i, r, o)
    {
        return void 0 == o && (o = 1.70158), i * (t /= r) * t * ((o + 1) * t - o) + n;
    },
    easeOutBack: function(e, t, n, i, r, o)
    {
        return void 0 == o && (o = 1.70158), i * ((t = t / r - 1) * t * ((o + 1) * t + o) + 1) + n;
    },
    easeInOutBack: function(e, t, n, i, r, o)
    {
        return void 0 == o && (o = 1.70158), (t /= r / 2) < 1 ? i / 2 * t * t * (((o *= 1.525) + 1) * t - o) + n : i / 2 * ((t -= 2) * t * (((o *= 1.525) + 1) * t + o) + 2) + n;
    },
    easeInBounce: function(e, t, n, i, r)
    {
        return i - jQuery.easing.easeOutBounce(e, r - t, 0, i, r) + n;
    },
    easeOutBounce: function(e, t, n, i, r)
    {
        return (t /= r) < 1 / 2.75 ? 7.5625 * i * t * t + n : 2 / 2.75 > t ? i * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n : 2.5 / 2.75 > t ? i * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n : i * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n;
    },
    easeInOutBounce: function(e, t, n, i, r)
    {
        return r / 2 > t ? .5 * jQuery.easing.easeInBounce(e, 2 * t, 0, i, r) + n : .5 * jQuery.easing.easeOutBounce(e, 2 * t - r, 0, i, r) + .5 * i + n;
    }
}),
/*
jQuery Waypoints - v2.0.3
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
function()
{
    var e = [].indexOf || function(e)
        {
            for (var t = 0, n = this.length; n > t; t++) if (t in this && this[t] === e) return t;
            return -1;
        }, t = [].slice;
    ! function(e, t)
    {
        return "function" == typeof define && define.amd ? define("waypoints", ["jquery"], function(n)
        {
            return t(n, e);
        }) : t(e.jQuery, e);
    }(this, function(n, i)
    {
        var r, o, a, s, l, u, c, d, p, h, f, m, g, v, y, b;
        return r = n(i), d = e.call(i, "ontouchstart") >= 0, s = {
            horizontal: {},
            vertical: {}
        }, l = 1, c = {}, u = "waypoints-context-id", f = "resize.waypoints", m = "scroll.waypoints",
        g = 1, v = "waypoints-waypoint-ids", y = "waypoint", b = "waypoints", o = function()
        {
            function e(e)
            {
                var t = this;
                this.$element = e, this.element = e[0], this.didResize = !1, this.didScroll = !1,
                this.id = "context" + l++, this.oldScroll = {
                    x: e.scrollLeft(),
                    y: e.scrollTop()
                }, this.waypoints = {
                    horizontal: {},
                    vertical: {}
                }, e.data(u, this.id), c[this.id] = this, e.bind(m, function()
                {
                    var e;
                    return t.didScroll || d ? void 0 : (t.didScroll = !0, e = function()
                    {
                        return t.doScroll(), t.didScroll = !1;
                    }, i.setTimeout(e, n[b].settings.scrollThrottle));
                }), e.bind(f, function()
                {
                    var e;
                    return t.didResize ? void 0 : (t.didResize = !0, e = function()
                    {
                        return n[b]("refresh"), t.didResize = !1;
                    }, i.setTimeout(e, n[b].settings.resizeThrottle));
                });
            }
            return e.prototype.doScroll = function()
            {
                var e, t = this;
                return e = {
                    horizontal: {
                        newScroll: this.$element.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left"
                    },
                    vertical: {
                        newScroll: this.$element.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up"
                    }
                }, !d || e.vertical.oldScroll && e.vertical.newScroll || n[b]("refresh"), n.each(e, function(e, i)
                {
                    var r, o, a;
                    return a = [], o = i.newScroll > i.oldScroll, r = o ? i.forward : i.backward, n.each(t.waypoints[e], function(e, t)
                    {
                        var n, r;
                        return i.oldScroll < (n = t.offset) && n <= i.newScroll ? a.push(t) : i.newScroll < (r = t.offset) && r <= i.oldScroll ? a.push(t) : void 0;
                    }), a.sort(function(e, t)
                    {
                        return e.offset - t.offset;
                    }), o || a.reverse(), n.each(a, function(e, t)
                    {
                        return t.options.continuous || e === a.length - 1 ? t.trigger([r]) : void 0;
                    });
                }), this.oldScroll = {
                    x: e.horizontal.newScroll,
                    y: e.vertical.newScroll
                };
            }, e.prototype.refresh = function()
            {
                var e, t, i, r = this;
                return i = n.isWindow(this.element), t = this.$element.offset(), this.doScroll(),
                e = {
                    horizontal: {
                        contextOffset: i ? 0 : t.left,
                        contextScroll: i ? 0 : this.oldScroll.x,
                        contextDimension: this.$element.width(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                        offsetProp: "left"
                    },
                    vertical: {
                        contextOffset: i ? 0 : t.top,
                        contextScroll: i ? 0 : this.oldScroll.y,
                        contextDimension: i ? n[b]("viewportHeight") : this.$element.height(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                        offsetProp: "top"
                    }
                }, n.each(e, function(e, t)
                {
                    return n.each(r.waypoints[e], function(e, i)
                    {
                        var r, o, a, s, l;
                        return r = i.options.offset, a = i.offset, o = n.isWindow(i.element) ? 0 : i.$element.offset()[t.offsetProp],
                        n.isFunction(r) ? r = r.apply(i.element) : "string" == typeof r && (r = parseFloat(r),
                        i.options.offset.indexOf("%") > -1 && (r = Math.ceil(t.contextDimension * r / 100))),
                        i.offset = o - t.contextOffset + t.contextScroll - r, i.options.onlyOnScroll && null != a || !i.enabled ? void 0 : null !== a && a < (s = t.oldScroll) && s <= i.offset ? i.trigger([t.backward]) : null !== a && a > (l = t.oldScroll) && l >= i.offset ? i.trigger([t.forward]) : null === a && t.oldScroll >= i.offset ? i.trigger([t.forward]) : void 0;
                    });
                });
            }, e.prototype.checkEmpty = function()
            {
                return n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical) ? (this.$element.unbind([f, m].join(" ")),
                delete c[this.id]) : void 0;
            }, e;
        }(), a = function()
        {
            function e(e, t, i)
            {
                var r, o;
                i = n.extend(
                {}, n.fn[y].defaults, i), "bottom-in-view" === i.offset && (i.offset = function()
                {
                    var e;
                    return e = n[b]("viewportHeight"), n.isWindow(t.element) || (e = t.$element.height()),
                    e - n(this).outerHeight();
                }), this.$element = e, this.element = e[0], this.axis = i.horizontal ? "horizontal" : "vertical",
                this.callback = i.handler, this.context = t, this.enabled = i.enabled, this.id = "waypoints" + g++,
                this.offset = null, this.options = i, t.waypoints[this.axis][this.id] = this, s[this.axis][this.id] = this,
                r = null != (o = e.data(v)) ? o : [], r.push(this.id), e.data(v, r);
            }
            return e.prototype.trigger = function(e)
            {
                return this.enabled ? (null != this.callback && this.callback.apply(this.element, e),
                this.options.triggerOnce ? this.destroy() : void 0) : void 0;
            }, e.prototype.disable = function()
            {
                return this.enabled = !1;
            }, e.prototype.enable = function()
            {
                return this.context.refresh(), this.enabled = !0;
            }, e.prototype.destroy = function()
            {
                return delete s[this.axis][this.id], delete this.context.waypoints[this.axis][this.id],
                this.context.checkEmpty();
            }, e.getWaypointsByElement = function(e)
            {
                var t, i;
                return (i = n(e).data(v)) ? (t = n.extend(
                {}, s.horizontal, s.vertical), n.map(i, function(e)
                {
                    return t[e];
                })) : [];
            }, e;
        }(), h = {
            init: function(e, t)
            {
                var i;
                return null == t && (t = {}), null == (i = t.handler) && (t.handler = e), this.each(function()
                {
                    var e, i, r, s;
                    return e = n(this), r = null != (s = t.context) ? s : n.fn[y].defaults.context, n.isWindow(r) || (r = e.closest(r)),
                    r = n(r), i = c[r.data(u)], i || (i = new o(r)), new a(e, i, t);
                }), n[b]("refresh"), this;
            },
            disable: function()
            {
                return h._invoke(this, "disable");
            },
            enable: function()
            {
                return h._invoke(this, "enable");
            },
            destroy: function()
            {
                return h._invoke(this, "destroy");
            },
            prev: function(e, t)
            {
                return h._traverse.call(this, e, t, function(e, t, n)
                {
                    return t > 0 ? e.push(n[t - 1]) : void 0;
                });
            },
            next: function(e, t)
            {
                return h._traverse.call(this, e, t, function(e, t, n)
                {
                    return t < n.length - 1 ? e.push(n[t + 1]) : void 0;
                });
            },
            _traverse: function(e, t, r)
            {
                var o, a;
                return null == e && (e = "vertical"), null == t && (t = i), a = p.aggregate(t),
                o = [], this.each(function()
                {
                    var t;
                    return t = n.inArray(this, a[e]), r(o, t, a[e]);
                }), this.pushStack(o);
            },
            _invoke: function(e, t)
            {
                return e.each(function()
                {
                    var e;
                    return e = a.getWaypointsByElement(this), n.each(e, function(e, n)
                    {
                        return n[t](), !0;
                    });
                }), this;
            }
        }, n.fn[y] = function()
        {
            var e, i;
            return i = arguments[0], e = 2 <= arguments.length ? t.call(arguments, 1) : [], h[i] ? h[i].apply(this, e) : n.isFunction(i) ? h.init.apply(this, arguments) : n.isPlainObject(i) ? h.init.apply(this, [null, i]) : i ? n.error("The " + i + " method does not exist in jQuery Waypoints.") : n.error("jQuery Waypoints needs a callback function or handler option.");
        }, n.fn[y].defaults = {
            context: i,
            continuous: !0,
            enabled: !0,
            horizontal: !1,
            offset: 0,
            triggerOnce: !1
        }, p = {
            refresh: function()
            {
                return n.each(c, function(e, t)
                {
                    return t.refresh();
                });
            },
            viewportHeight: function()
            {
                var e;
                return null != (e = i.innerHeight) ? e : r.height();
            },
            aggregate: function(e)
            {
                var t, i, r;
                return t = s, e && (t = null != (r = c[n(e).data(u)]) ? r.waypoints : void 0), t ? (i = {
                    horizontal: [],
                    vertical: []
                }, n.each(i, function(e, r)
                {
                    return n.each(t[e], function(e, t)
                    {
                        return r.push(t);
                    }), r.sort(function(e, t)
                    {
                        return e.offset - t.offset;
                    }), i[e] = n.map(r, function(e)
                    {
                        return e.element;
                    }), i[e] = n.unique(i[e]);
                }), i) : [];
            },
            above: function(e)
            {
                return null == e && (e = i), p._filter(e, "vertical", function(e, t)
                {
                    return t.offset <= e.oldScroll.y;
                });
            },
            below: function(e)
            {
                return null == e && (e = i), p._filter(e, "vertical", function(e, t)
                {
                    return t.offset > e.oldScroll.y;
                });
            },
            left: function(e)
            {
                return null == e && (e = i), p._filter(e, "horizontal", function(e, t)
                {
                    return t.offset <= e.oldScroll.x;
                });
            },
            right: function(e)
            {
                return null == e && (e = i), p._filter(e, "horizontal", function(e, t)
                {
                    return t.offset > e.oldScroll.x;
                });
            },
            enable: function()
            {
                return p._invoke("enable");
            },
            disable: function()
            {
                return p._invoke("disable");
            },
            destroy: function()
            {
                return p._invoke("destroy");
            },
            extendFn: function(e, t)
            {
                return h[e] = t;
            },
            _invoke: function(e)
            {
                var t;
                return t = n.extend(
                {}, s.vertical, s.horizontal), n.each(t, function(t, n)
                {
                    return n[e](), !0;
                });
            },
            _filter: function(e, t, i)
            {
                var r, o;
                return (r = c[n(e).data(u)]) ? (o = [], n.each(r.waypoints[t], function(e, t)
                {
                    return i(r, t) ? o.push(t) : void 0;
                }), o.sort(function(e, t)
                {
                    return e.offset - t.offset;
                }), n.map(o, function(e)
                {
                    return e.element;
                })) : [];
            }
        }, n[b] = function()
        {
            var e, n;
            return n = arguments[0], e = 2 <= arguments.length ? t.call(arguments, 1) : [], p[n] ? p[n].apply(null, e) : p.aggregate.call(null, n);
        }, n[b].settings = {
            resizeThrottle: 100,
            scrollThrottle: 30
        }, r.load(function()
        {
            return n[b]("refresh");
        });
    });
}.call(this),
/*!
 * jQuery Templates Plugin
 * http://github.com/jquery/jquery-tmpl
 *
 * Copyright Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */

function(e)
{
    function t(t, n, i, r)
    {
        var o = {
            data: r || (n ? n.data : {}),
            _wrap: n ? n._wrap : null,
            tmpl: null,
            parent: n || null,
            nodes: [],
            calls: u,
            nest: c,
            wrap: d,
            html: p,
            update: h
        };
        return t && e.extend(o, t,
        {
            nodes: [],
            parent: n
        }), i && (o.tmpl = i, o._ctnt = o._ctnt || o.tmpl(e, o), o.key = ++_, (k.length ? b : y)[_] = o),
        o;
    }

    function n(t, r, o)
    {
        var a, s = o ? e.map(o, function(e)
        {
            return "string" == typeof e ? t.key ? e.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + g + '="' + t.key + '" $2') : e : n(e, t, e._ctnt);
        }) : t;
        return r ? s : (s = s.join(""), s.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function(t, n, r, o)
        {
            a = e(r).get(), l(a), n && (a = i(n).concat(a)), o && (a = a.concat(i(o)));
        }), a ? a : i(s));
    }

    function i(t)
    {
        var n = document.createElement("div");
        return n.innerHTML = t, e.makeArray(n.childNodes);
    }

    function r(t)
    {
        return new Function("jQuery", "$item", "var $=jQuery,call,_=[],$data=$item.data;with($data){_.push('" + e.trim(t).replace(/([\\'])/g, "\\$1").replace(/[\r\t\n]/g, " ").replace(/\$\{([^\}]*)\}/g, "{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g, function(t, n, i, r, o, s, l)
        {
            var u, c, d, p = e.tmpl.tag[i];
            if (!p) throw "Template command not found: " + i;
            return u = p._default || [], s && !/\w$/.test(o) && (o += s, s = ""), o ? (o = a(o),
            l = l ? "," + a(l) + ")" : s ? ")" : "", c = s ? o.indexOf(".") > -1 ? o + s : "(" + o + ").call($item" + l : o,
            d = s ? c : "(typeof(" + o + ")==='function'?(" + o + ").call($item):(" + o + "))") : d = c = u.$1 || "null",
            r = a(r), "');" + p[n ? "close" : "open"].split("$notnull_1").join(o ? "typeof(" + o + ")!=='undefined' && (" + o + ")!=null" : "true").split("$1a").join(d).split("$1").join(c).split("$2").join(r ? r.replace(/\s*([^\(]+)\s*(\((.*?)\))?/g, function(e, t, n, i)
            {
                return i = i ? "," + i + ")" : n ? ")" : "", i ? "(" + t + ").call($item" + i : e;
            }) : u.$2 || "") + "_.push('";
        }) + "');}return _;");
    }

    function o(t, i)
    {
        t._wrap = n(t, !0, e.isArray(i) ? i : [v.test(i) ? i : e(i).html()]).join("");
    }

    function a(e)
    {
        return e ? e.replace(/\\'/g, "'").replace(/\\\\/g, "\\") : null;
    }

    function s(e)
    {
        var t = document.createElement("div");
        return t.appendChild(e.cloneNode(!0)), t.innerHTML;
    }

    function l(n)
    {
        function i(n)
        {
            function i(e)
            {
                e += u, a = c[e] = c[e] || t(a, y[a.parent.key + u] || a.parent, null, !0);
            }
            var r, o, a, s, l = n;
            if (s = n.getAttribute(g))
            {
                for (; l.parentNode && 1 === (l = l.parentNode).nodeType && !(r = l.getAttribute(g)););
                r !== s && (l = l.parentNode ? 11 === l.nodeType ? 0 : l.getAttribute(g) || 0 : 0, (a = y[s]) || (a = b[s], a = t(a, y[l] || b[l], null, !0), a.key = ++_, y[_] = a),
                x && i(s)), n.removeAttribute(g);
            }
            else x && (a = e.data(n, "tmplItem")) && (i(a.key), y[a.key] = a, l = e.data(n.parentNode, "tmplItem"),
            l = l ? l.key : 0);
            if (a)
            {
                for (o = a; o && o.key != l;) o.nodes.push(n), o = o.parent;
                delete a._ctnt, delete a._wrap, e.data(n, "tmplItem", a);
            }
        }
        var r, o, a, s, l, u = "_" + x,
            c = {};
        for (a = 0, s = n.length; s > a; a++) if (1 === (r = n[a]).nodeType)
        {
            for (o = r.getElementsByTagName("*"), l = o.length - 1; l >= 0; l--) i(o[l]);
            i(r);
        }
    }

    function u(e, t, n, i)
    {
        return e ? (k.push(
        {
            _: e,
            tmpl: t,
            item: this,
            data: n,
            options: i
        }), void 0) : k.pop();
    }

    function c(t, n, i)
    {
        return e.tmpl(e.template(t), n, i, this);
    }

    function d(t, n)
    {
        var i = t.options || {};
        return i.wrapped = n, e.tmpl(e.template(t.tmpl), t.data, i, t.item);
    }

    function p(t, n)
    {
        var i = this._wrap;
        return e.map(e(e.isArray(i) ? i.join("") : i).filter(t || "*"), function(e)
        {
            return n ? e.innerText || e.textContent : e.outerHTML || s(e);
        });
    }

    function h()
    {
        var t = this.nodes;
        e.tmpl(null, null, null, this).insertBefore(t[0]), e(t).remove();
    }
    var f, m = e.fn.domManip,
        g = "_tmplitem",
        v = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,
        y = {}, b = {}, w = {
            key: 0,
            data: {}
        }, _ = 0,
        x = 0,
        k = [];
    e.each(
    {
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(t, n)
    {
        e.fn[t] = function(i)
        {
            var r, o, a, s, l = [],
                u = e(i),
                c = 1 === this.length && this[0].parentNode;
            if (f = y || {}, c && 11 === c.nodeType && 1 === c.childNodes.length && 1 === u.length) u[n](this[0]),
            l = this;
            else
            {
                for (o = 0, a = u.length; a > o; o++) x = o, r = (o > 0 ? this.clone(!0) : this).get(),
                e.fn[n].apply(e(u[o]), r), l = l.concat(r);
                x = 0, l = this.pushStack(l, t, u.selector);
            }
            return s = f, f = null, e.tmpl.complete(s), l;
        };
    }), e.fn.extend(
    {
        tmpl: function(t, n, i)
        {
            return e.tmpl(this[0], t, n, i);
        },
        tmplItem: function()
        {
            return e.tmplItem(this[0]);
        },
        template: function(t)
        {
            return e.template(t, this[0]);
        },
        domManip: function(t, n, i)
        {
            if (t[0] && t[0].nodeType)
            {
                for (var r, o = e.makeArray(arguments), a = t.length, s = 0; a > s && !(r = e.data(t[s++], "tmplItem")););
                a > 1 && (o[0] = [e.makeArray(t)]), r && x && (o[2] = function(t)
                {
                    e.tmpl.afterManip(this, t, i);
                }), m.apply(this, o);
            }
            else m.apply(this, arguments);
            return x = 0, f || e.tmpl.complete(y), this;
        }
    }), e.extend(
    {
        tmpl: function(i, r, a, s)
        {
            var l, u = !s;
            if (u) s = w, i = e.template[i] || e.template(null, i), b = {};
            else if (!i) return i = s.tmpl,
            y[s.key] = s, s.nodes = [], s.wrapped && o(s, s.wrapped), e(n(s, null, s.tmpl(e, s)));
            return i ? ("function" == typeof r && (r = r.call(s || {})), a && a.wrapped && o(a, a.wrapped),
            l = e.isArray(r) ? e.map(r, function(e)
            {
                return e ? t(a, s, i, e) : null;
            }) : [t(a, s, i, r)], u ? e(n(s, null, l)) : l) : [];
        },
        tmplItem: function(t)
        {
            var n;
            for (t instanceof e && (t = t[0]); t && 1 === t.nodeType && !(n = e.data(t, "tmplItem")) && (t = t.parentNode););
            return n || w;
        },
        template: function(t, n)
        {
            return n ? ("string" == typeof n ? n = r(n) : n instanceof e && (n = n[0] || {}),
            n.nodeType && (n = e.data(n, "tmpl") || e.data(n, "tmpl", r(n.innerHTML))), "string" == typeof t ? e.template[t] = n : n) : t ? "string" != typeof t ? e.template(null, t) : e.template[t] || e.template(null, v.test(t) ? t : e(t)) : null;
        },
        encode: function(e)
        {
            return ("" + e).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;");
        }
    }), e.extend(e.tmpl,
    {
        tag: {
            tmpl: {
                _default: {
                    $2: "null"
                },
                open: "if($notnull_1){_=_.concat($item.nest($1,$2));}"
            },
            wrap: {
                _default: {
                    $2: "null"
                },
                open: "$item.calls(_,$1,$2);_=[];",
                close: "call=$item.calls();_=call._.concat($item.wrap(call,_));"
            },
            each: {
                _default: {
                    $2: "$index, $value"
                },
                open: "if($notnull_1){$.each($1a,function($2){with(this){",
                close: "}});}"
            },
            "if": {
                open: "if(($notnull_1) && $1a){",
                close: "}"
            },
            "else": {
                _default: {
                    $1: "true"
                },
                open: "}else if(($notnull_1) && $1a){"
            },
            html: {
                open: "if($notnull_1){_.push($1a);}"
            },
            "=": {
                _default: {
                    $1: "$data"
                },
                open: "if($notnull_1){_.push($.encode($1a));}"
            },
            "!": {
                open: ""
            }
        },
        complete: function()
        {
            y = {};
        },
        afterManip: function(t, n, i)
        {
            var r = 11 === n.nodeType ? e.makeArray(n.childNodes) : 1 === n.nodeType ? [n] : [];
            i.call(t, n), l(r), x++;
        }
    });
}(jQuery),
function(e)
{
    function t()
    {
        var e = "[jquery.form] " + Array.prototype.join.call(arguments, "");
        window.console && window.console.log ? window.console.log(e) : window.opera && window.opera.postError && window.opera.postError(e);
    }
    e.fn.ajaxSubmit = function(n)
    {
        function i(i)
        {
            function o(e)
            {
                var t = e.contentWindow ? e.contentWindow.document : e.contentDocument ? e.contentDocument : e.document;
                return t;
            }

            function a()
            {
                function n()
                {
                    try
                    {
                        var e = o(m).readyState;
                        t("state = " + e), "uninitialized" == e.toLowerCase() && setTimeout(n, 50);
                    }
                    catch (i)
                    {
                        t("Server abort: ", i, " (", i.name, ")"), l(S), w && clearTimeout(w), w = void 0;
                    }
                }
                var i = s.attr("target"),
                    a = s.attr("action");
                _.setAttribute("target", h), r || _.setAttribute("method", "POST"), a != d.url && _.setAttribute("action", d.url),
                d.skipEncodingOverride || r && !/post/i.test(r) || s.attr(
                {
                    encoding: "multipart/form-data",
                    enctype: "multipart/form-data"
                }), d.timeout && (w = setTimeout(function()
                {
                    b = !0, l(k);
                }, d.timeout));
                var u = [];
                try
                {
                    if (d.extraData) for (var c in d.extraData) u.push(e('<input type="hidden" name="' + c + '" />').attr("value", d.extraData[c]).appendTo(_)[0]);
                    d.iframeTarget || (f.appendTo("body"), m.attachEvent ? m.attachEvent("onload", l) : m.addEventListener("load", l, !1)),
                    setTimeout(n, 15), _.submit();
                }
                finally
                {
                    _.setAttribute("action", a), i ? _.setAttribute("target", i) : s.removeAttr("target"),
                    e(u).remove();
                }
            }

            function l(n)
            {
                if (!g.aborted && !T)
                {
                    try
                    {
                        E = o(m);
                    }
                    catch (i)
                    {
                        t("cannot access response document: ", i), n = S;
                    }
                    if (n === k && g) return g.abort("timeout"), void 0;
                    if (n == S && g) return g.abort("server abort"), void 0;
                    if (E && E.location.href != d.iframeSrc || b)
                    {
                        m.detachEvent ? m.detachEvent("onload", l) : m.removeEventListener("load", l, !1);
                        var r, a = "success";
                        try
                        {
                            if (b) throw "timeout";
                            var s = "xml" == d.dataType || E.XMLDocument || e.isXMLDoc(E);
                            if (t("isXml=" + s), !s && window.opera && (null == E.body || "" == E.body.innerHTML) && --A) return t("requeing onLoad callback, DOM not available"),
                            setTimeout(l, 250), void 0;
                            var u = E.body ? E.body : E.documentElement;
                            g.responseText = u ? u.innerHTML : null, g.responseXML = E.XMLDocument ? E.XMLDocument : E,
                            s && (d.dataType = "xml"), g.getResponseHeader = function(e)
                            {
                                var t = {
                                    "content-type": d.dataType
                                };
                                return t[e];
                            }, u && (g.status = Number(u.getAttribute("status")) || g.status, g.statusText = u.getAttribute("statusText") || g.statusText);
                            var c = d.dataType || "",
                                h = /(json|script|text)/.test(c.toLowerCase());
                            if (h || d.textarea)
                            {
                                var v = E.getElementsByTagName("textarea")[0];
                                if (v) g.responseText = v.value, g.status = Number(v.getAttribute("status")) || g.status,
                                g.statusText = v.getAttribute("statusText") || g.statusText;
                                else if (h)
                                {
                                    var y = E.getElementsByTagName("pre")[0],
                                        _ = E.getElementsByTagName("body")[0];
                                    y ? g.responseText = y.textContent ? y.textContent : y.innerHTML : _ && (g.responseText = _.innerHTML);
                                }
                            }
                            else "xml" != d.dataType || g.responseXML || null == g.responseText || (g.responseXML = I(g.responseText));
                            try
                            {
                                C = D(g, d.dataType, d);
                            }
                            catch (n)
                            {
                                a = "parsererror", g.error = r = n || a;
                            }
                        }
                        catch (n)
                        {
                            t("error caught: ", n), a = "error", g.error = r = n || a;
                        }
                        g.aborted && (t("upload aborted"), a = null), g.status && (a = g.status >= 200 && g.status < 300 || 304 === g.status ? "success" : "error"), "success" === a ? (d.success && d.success.call(d.context, C, "success", g), p && e.event.trigger("ajaxSuccess", [g, d])) : a && (void 0 == r && (r = g.statusText),
                        d.error && d.error.call(d.context, g, a, r), p && e.event.trigger("ajaxError", [g, d, r])),
                        p && e.event.trigger("ajaxComplete", [g, d]), p && !--e.active && e.event.trigger("ajaxStop"),
                        d.complete && d.complete.call(d.context, g, a), T = !0, d.timeout && clearTimeout(w),
                        setTimeout(function()
                        {
                            d.iframeTarget || f.remove(), g.responseXML = null;
                        }, 100);
                    }
                }
            }
            var u, c, d, p, h, f, m, g, v, y, b, w, _ = s[0],
                x = !! e.fn.prop;
            if (i) for (c = 0; c < i.length; c++) u = e(_[i[c].name]), u[x ? "prop" : "attr"]("disabled", !1);
            if (e(":input[name=submit],:input[id=submit]", _).length) return alert('Error: Form elements must not have name or id of "submit".'),
            void 0;
            if (d = e.extend(!0,
            {}, e.ajaxSettings, n), d.context = d.context || d, h = "jqFormIO" + new Date().getTime(),
            d.iframeTarget ? (f = e(d.iframeTarget), y = f.attr("name"), null == y ? f.attr("name", h) : h = y) : (f = e('<iframe name="' + h + '" src="' + d.iframeSrc + '" />'),
            f.css(
            {
                position: "absolute",
                top: "-1000px",
                left: "-1000px"
            })), m = f[0], g = {
                aborted: 0,
                responseText: null,
                responseXML: null,
                status: 0,
                statusText: "n/a",
                getAllResponseHeaders: function()
                {},
                getResponseHeader: function()
                {},
                setRequestHeader: function()
                {},
                abort: function(n)
                {
                    var i = "timeout" === n ? "timeout" : "aborted";
                    t("aborting upload... " + i), this.aborted = 1, f.attr("src", d.iframeSrc), g.error = i,
                    d.error && d.error.call(d.context, g, i, n), p && e.event.trigger("ajaxError", [g, d, i]),
                    d.complete && d.complete.call(d.context, g, i);
                }
            }, p = d.global, p && !e.active++ && e.event.trigger("ajaxStart"), p && e.event.trigger("ajaxSend", [g, d]),
            d.beforeSend && d.beforeSend.call(d.context, g, d) === !1) return d.global && e.active--,
            void 0;
            if (!g.aborted)
            {
                v = _.clk, v && (y = v.name, y && !v.disabled && (d.extraData = d.extraData || {},
                d.extraData[y] = v.value, "image" == v.type && (d.extraData[y + ".x"] = _.clk_x,
                d.extraData[y + ".y"] = _.clk_y)));
                var k = 1,
                    S = 2;
                d.forceSync ? a() : setTimeout(a, 10);
                var C, E, T, A = 50,
                    I = e.parseXML || function(e, t)
                    {
                        return window.ActiveXObject ? (t = new ActiveXObject("Microsoft.XMLDOM"), t.async = "false",
                        t.loadXML(e)) : t = new DOMParser().parseFromString(e, "text/xml"), t && t.documentElement && "parsererror" != t.documentElement.nodeName ? t : null;
                    }, B = e.parseJSON || function(e)
                    {
                        return window.eval("(" + e + ")");
                    }, D = function(t, n, i)
                    {
                        var r = t.getResponseHeader("content-type") || "",
                            o = "xml" === n || !n && r.indexOf("xml") >= 0,
                            a = o ? t.responseXML : t.responseText;
                        return o && "parsererror" === a.documentElement.nodeName && e.error && e.error("parsererror"),
                        i && i.dataFilter && (a = i.dataFilter(a, n)), "string" == typeof a && ("json" === n || !n && r.indexOf("json") >= 0 ? a = B(a) : ("script" === n || !n && r.indexOf("javascript") >= 0) && e.globalEval(a)),
                        a;
                    };
            }
        }
        if (!this.length) return t("ajaxSubmit: skipping submit process - no element selected"),
        this;
        var r, o, a, s = this;
        "function" == typeof n && (n = {
            success: n
        }), r = this.attr("method"), o = this.attr("action"), a = "string" == typeof o ? e.trim(o) : "",
        a = a || window.location.href || "", a && (a = (a.match(/^([^#]+)/) || [])[1]),
        n = e.extend(!0,
        {
            url: a,
            success: e.ajaxSettings.success,
            type: r || "GET",
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
        }, n);
        var l = {};
        if (this.trigger("form-pre-serialize", [this, n, l]), l.veto) return t("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),
        this;
        if (n.beforeSerialize && n.beforeSerialize(this, n) === !1) return t("ajaxSubmit: submit aborted via beforeSerialize callback"),
        this;
        var u, c, d = this.formToArray(n.semantic);
        if (n.data)
        {
            n.extraData = n.data;
            for (u in n.data) if (n.data[u] instanceof Array) for (var p in n.data[u]) d.push(
            {
                name: u,
                value: n.data[u][p]
            });
            else c = n.data[u], c = e.isFunction(c) ? c() : c, d.push(
            {
                name: u,
                value: c
            });
        }
        if (n.beforeSubmit && n.beforeSubmit(d, this, n) === !1) return t("ajaxSubmit: submit aborted via beforeSubmit callback"),
        this;
        if (this.trigger("form-submit-validate", [d, this, n, l]), l.veto) return t("ajaxSubmit: submit vetoed via form-submit-validate trigger"),
        this;
        var h = e.param(d);
        "GET" == n.type.toUpperCase() ? (n.url += (n.url.indexOf("?") >= 0 ? "&" : "?") + h,
        n.data = null) : n.data = h;
        var f = [];
        if (n.resetForm && f.push(function()
        {
            s.resetForm();
        }), n.clearForm && f.push(function()
        {
            s.clearForm();
        }), !n.dataType && n.target)
        {
            var m = n.success || function()
                {};
            f.push(function(t)
            {
                var i = n.replaceTarget ? "replaceWith" : "html";
                e(n.target)[i](t).each(m, arguments);
            });
        }
        else n.success && f.push(n.success);
        n.success = function(e, t, i)
        {
            for (var r = n.context || n, o = 0, a = f.length; a > o; o++) f[o].apply(r, [e, t, i || s, s]);
        };
        var g = e("input:file", this).length > 0,
            v = "multipart/form-data",
            y = s.attr("enctype") == v || s.attr("encoding") == v;
        if (n.iframe !== !1 && (g || n.iframe || y)) n.closeKeepAlive ? e.get(n.closeKeepAlive, function()
        {
            i(d);
        }) : i(d);
        else
        {
            if (e.browser.msie && "get" == r)
            {
                var b = s[0].getAttribute("method");
                "string" == typeof b && (n.type = b);
            }
            e.ajax(n);
        }
        return this.trigger("form-submit-notify", [this, n]), this;
    }, e.fn.ajaxForm = function(n)
    {
        if (0 === this.length)
        {
            var i = {
                s: this.selector,
                c: this.context
            };
            return !e.isReady && i.s ? (t("DOM not ready, queuing ajaxForm"), e(function()
            {
                e(i.s, i.c).ajaxForm(n);
            }), this) : (t("terminating; zero elements found by selector" + (e.isReady ? "" : " (DOM not ready)")),
            this);
        }
        return this.ajaxFormUnbind().bind("submit.form-plugin", function(t)
        {
            t.isDefaultPrevented() || (t.preventDefault(), e(this).ajaxSubmit(n));
        }).bind("click.form-plugin", function(t)
        {
            var n = t.target,
                i = e(n);
            if (!i.is(":submit,input:image"))
            {
                var r = i.closest(":submit");
                if (0 == r.length) return;
                n = r[0];
            }
            var o = this;
            if (o.clk = n, "image" == n.type) if (void 0 != t.offsetX) o.clk_x = t.offsetX,
            o.clk_y = t.offsetY;
            else if ("function" == typeof e.fn.offset)
            {
                var a = i.offset();
                o.clk_x = t.pageX - a.left, o.clk_y = t.pageY - a.top;
            }
            else o.clk_x = t.pageX - n.offsetLeft, o.clk_y = t.pageY - n.offsetTop;
            setTimeout(function()
            {
                o.clk = o.clk_x = o.clk_y = null;
            }, 100);
        });
    }, e.fn.ajaxFormUnbind = function()
    {
        return this.unbind("submit.form-plugin click.form-plugin");
    }, e.fn.formToArray = function(t)
    {
        var n = [];
        if (0 === this.length) return n;
        var i = this[0],
            r = t ? i.getElementsByTagName("*") : i.elements;
        if (!r) return n;
        var o, a, s, l, u, c, d;
        for (o = 0, c = r.length; c > o; o++) if (u = r[o], s = u.name) if (t && i.clk && "image" == u.type) u.disabled || i.clk != u || (n.push(
        {
            name: s,
            value: e(u).val()
        }), n.push(
        {
            name: s + ".x",
            value: i.clk_x
        },
        {
            name: s + ".y",
            value: i.clk_y
        }));
        else if (l = e.fieldValue(u, !0), l && l.constructor == Array) for (a = 0,
        d = l.length; d > a; a++) n.push(
        {
            name: s,
            value: l[a]
        });
        else null !== l && "undefined" != typeof l && n.push(
        {
            name: s,
            value: l
        });
        if (!t && i.clk)
        {
            var p = e(i.clk),
                h = p[0];
            s = h.name, s && !h.disabled && "image" == h.type && (n.push(
            {
                name: s,
                value: p.val()
            }), n.push(
            {
                name: s + ".x",
                value: i.clk_x
            },
            {
                name: s + ".y",
                value: i.clk_y
            }));
        }
        return n;
    }, e.fn.formSerialize = function(t)
    {
        return e.param(this.formToArray(t));
    }, e.fn.fieldSerialize = function(t)
    {
        var n = [];
        return this.each(function()
        {
            var i = this.name;
            if (i)
            {
                var r = e.fieldValue(this, t);
                if (r && r.constructor == Array) for (var o = 0, a = r.length; a > o; o++) n.push(
                {
                    name: i,
                    value: r[o]
                });
                else null !== r && "undefined" != typeof r && n.push(
                {
                    name: this.name,
                    value: r
                });
            }
        }), e.param(n);
    }, e.fn.fieldValue = function(t)
    {
        for (var n = [], i = 0, r = this.length; r > i; i++)
        {
            var o = this[i],
                a = e.fieldValue(o, t);
            null === a || "undefined" == typeof a || a.constructor == Array && !a.length || (a.constructor == Array ? e.merge(n, a) : n.push(a));
        }
        return n;
    }, e.fieldValue = function(t, n)
    {
        var i = t.name,
            r = t.type,
            o = t.tagName.toLowerCase();
        if (void 0 === n && (n = !0), n && (!i || t.disabled || "reset" == r || "button" == r || ("checkbox" == r || "radio" == r) && !t.checked || ("submit" == r || "image" == r) && t.form && t.form.clk != t || "select" == o && -1 == t.selectedIndex)) return null;
        if ("select" == o)
        {
            var a = t.selectedIndex;
            if (0 > a) return null;
            for (var s = [], l = t.options, u = "select-one" == r, c = u ? a + 1 : l.length, d = u ? a : 0; c > d; d++)
            {
                var p = l[d];
                if (p.selected)
                {
                    var h = p.value;
                    if (h || (h = p.attributes && p.attributes.value && !p.attributes.value.specified ? p.text : p.value),
                    u) return h;
                    s.push(h);
                }
            }
            return s;
        }
        return e(t).val();
    }, e.fn.clearForm = function()
    {
        return this.each(function()
        {
            e("input,select,textarea", this).clearFields();
        });
    }, e.fn.clearFields = e.fn.clearInputs = function()
    {
        var e = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function()
        {
            var t = this.type,
                n = this.tagName.toLowerCase();
            e.test(t) || "textarea" == n ? this.value = "" : "checkbox" == t || "radio" == t ? this.checked = !1 : "select" == n && (this.selectedIndex = -1);
        });
    }, e.fn.resetForm = function()
    {
        return this.each(function()
        {
            ("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset();
        });
    }, e.fn.enable = function(e)
    {
        return void 0 === e && (e = !0), this.each(function()
        {
            this.disabled = !e;
        });
    }, e.fn.selected = function(t)
    {
        return void 0 === t && (t = !0), this.each(function()
        {
            var n = this.type;
            if ("checkbox" == n || "radio" == n) this.checked = t;
            else if ("option" == this.tagName.toLowerCase())
            {
                var i = e(this).parent("select");
                t && i[0] && "select-one" == i[0].type && i.find("option").selected(!1), this.selected = t;
            }
        });
    };
}(jQuery),
/* ==========================================================
 * bootstrap-twipsy.js v1.4.0
 * http://twitter.github.com/bootstrap/javascript.html#twipsy
 * Adapted from the original jQuery.tipsy by Jason Frame
 * ==========================================================
 * Copyright 2011 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
! function(e)
{
    "use strict";

    function t(e, t, n)
    {
        return "function" == typeof e ? e.apply(t, n) : e;
    }
    var n;
    e(document).ready(function()
    {
        e.support.transition = function()
        {
            var e = document.body || document.documentElement,
                t = e.style,
                n = void 0 !== t.transition || void 0 !== t.WebkitTransition || void 0 !== t.MozTransition || void 0 !== t.MsTransition || void 0 !== t.OTransition;
            return n;
        }(), e.support.transition && (n = "TransitionEnd", e.browser.webkit ? n = "webkitTransitionEnd" : e.browser.mozilla ? n = "transitionend" : e.browser.opera && (n = "oTransitionEnd"));
    });
    var i = function(t, n)
    {
        this.$element = e(t), this.options = n, this.enabled = !0, this.fixTitle();
    };
    i.prototype = {
        show: function()
        {
            var n, i, r, o, a, s;
            if (this.hasContent() && this.enabled)
            {
                switch (a = this.tip(), this.setContent(), this.options.animate && a.addClass("fade"),
                a.remove().css(
                {
                    top: 0,
                    left: 0,
                    display: "block"
                }).prependTo(document.body), n = e.extend(
                {}, this.$element.offset(),
                {
                    width: this.$element[0].offsetWidth,
                    height: this.$element[0].offsetHeight
                }), i = a[0].offsetWidth, r = a[0].offsetHeight, o = t(this.options.placement, this, [a[0], this.$element[0]]))
                {
                case "below":
                    s = {
                        top: n.top + n.height + this.options.offset,
                        left: n.left + n.width / 2 - i / 2
                    };
                    break;

                case "above":
                    s = {
                        top: n.top - r - this.options.offset,
                        left: n.left + n.width / 2 - i / 2
                    };
                    break;

                case "left":
                    s = {
                        top: n.top + n.height / 2 - r / 2,
                        left: n.left - i - this.options.offset
                    };
                    break;

                case "right":
                    s = {
                        top: n.top + n.height / 2 - r / 2,
                        left: n.left + n.width + this.options.offset
                    };
                }
                a.css(s).addClass(o).addClass("in");
            }
        },
        setContent: function()
        {
            var e = this.tip();
            e.find(".twipsy-inner")[this.options.html ? "html" : "text"](this.getTitle()), e[0].className = "twipsy";
        },
        hide: function()
        {
            function t()
            {
                i.remove();
            }
            var i = this.tip();
            i.removeClass("in"), e.support.transition && this.$tip.hasClass("fade") ? i.bind(n, t) : t();
        },
        fixTitle: function()
        {
            var e = this.$element;
            (e.attr("title") || "string" != typeof e.attr("data-original-title")) && e.attr("data-original-title", e.attr("title") || "").removeAttr("title");
        },
        hasContent: function()
        {
            return this.getTitle();
        },
        getTitle: function()
        {
            var e, t = this.$element,
                n = this.options;
            return this.fixTitle(), "string" == typeof n.title ? e = t.attr("title" == n.title ? "data-original-title" : n.title) : "function" == typeof n.title && (e = n.title.call(t[0])),
            e = ("" + e).replace(/(^\s*|\s*$)/, ""), e || n.fallback;
        },
        tip: function()
        {
            return this.$tip = this.$tip || e('<div class="twipsy" />').html(this.options.template);
        },
        validate: function()
        {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null);
        },
        enable: function()
        {
            this.enabled = !0;
        },
        disable: function()
        {
            this.enabled = !1;
        },
        toggleEnabled: function()
        {
            this.enabled = !this.enabled;
        },
        toggle: function()
        {
            this[this.tip().hasClass("in") ? "hide" : "show"]();
        }
    }, e.fn.twipsy = function(t)
    {
        return e.fn.twipsy.initWith.call(this, t, i, "twipsy"), this;
    }, e.fn.twipsy.initWith = function(t, n, i)
    {
        function r(r)
        {
            var o = e.data(r, i);
            return o || (o = new n(r, e.fn.twipsy.elementOptions(r, t)), e.data(r, i, o)), o;
        }

        function o()
        {
            var e = r(this);
            e.hoverState = "in", 0 == t.delayIn ? e.show() : (e.fixTitle(), setTimeout(function()
            {
                "in" == e.hoverState && e.show();
            }, t.delayIn));
        }

        function a()
        {
            var e = r(this);
            e.hoverState = "out", 0 == t.delayOut ? e.hide() : setTimeout(function()
            {
                "out" == e.hoverState && e.hide();
            }, t.delayOut);
        }
        var s, l, u, c;
        return t === !0 ? this.data(i) : "string" == typeof t ? (s = this.data(i), s && s[t](),
        this) : (t = e.extend(
        {}, e.fn[i].defaults, t), t.live || this.each(function()
        {
            r(this);
        }), "manual" != t.trigger && (l = t.live ? "live" : "bind", u = "hover" == t.trigger ? "mouseenter" : "focus",
        c = "hover" == t.trigger ? "mouseleave" : "blur", this[l](u, o)[l](c, a)), this);
    }, e.fn.twipsy.Twipsy = i, e.fn.twipsy.defaults = {
        animate: !0,
        delayIn: 0,
        delayOut: 0,
        fallback: "",
        placement: "above",
        html: !1,
        live: !1,
        offset: 0,
        title: "title",
        trigger: "hover",
        template: '<div class="twipsy-arrow"></div><div class="twipsy-inner"></div>'
    }, e.fn.twipsy.rejectAttrOptions = ["title"], e.fn.twipsy.elementOptions = function(t, n)
    {
        for (var i = e(t).data(), r = e.fn.twipsy.rejectAttrOptions, o = r.length; o--;) delete i[r[o]];
        return e.extend(
        {}, n, i);
    };
}(window.jQuery || window.ender),
/*!
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
// Copyright (c) 2010 "Cowboy" Ben Alman,

function(e, t, n)
{
    "$:nomunge";

    function i(e)
    {
        return e = e || location.href, "#" + e.replace(/^[^#]*#?(.*)$/, "$1");
    }
    var r, o = "hashchange",
        a = document,
        s = e.event.special,
        l = a.documentMode,
        u = "on" + o in t && (l === n || l > 7);
    e.fn[o] = function(e)
    {
        return e ? this.bind(o, e) : this.trigger(o);
    }, e.fn[o].delay = 50, s[o] = e.extend(s[o],
    {
        setup: function()
        {
            return u ? !1 : (e(r.start), void 0);
        },
        teardown: function()
        {
            return u ? !1 : (e(r.stop), void 0);
        }
    }), r = function()
    {
        function r()
        {
            var n = i(),
                a = h(c);
            n !== c ? (p(c = n, a), e(t).trigger(o)) : a !== c && (location.href = location.href.replace(/#.*/, "") + a),
            s = setTimeout(r, e.fn[o].delay);
        }
        var s, l = {}, c = i(),
            d = function(e)
            {
                return e;
            }, p = d,
            h = d;
        return l.start = function()
        {
            s || r();
        }, l.stop = function()
        {
            s && clearTimeout(s), s = n;
        }, e.browser.msie && !u && function()
        {
            var t, n;
            l.start = function()
            {
                t || (n = e.fn[o].src, n = n && n + i(), t = e('<iframe tabindex="-1" title="empty"/>').hide().one("load", function()
                {
                    n || p(i()), r();
                }).attr("src", n || "javascript:0").insertAfter("body")[0].contentWindow, a.onpropertychange = function()
                {
                    try
                    {
                        "title" === event.propertyName && (t.document.title = a.title);
                    }
                    catch (e)
                    {}
                });
            }, l.stop = d, h = function()
            {
                return i(t.location.href);
            }, p = function(n, i)
            {
                var r = t.document,
                    s = e.fn[o].domain;
                n !== i && (r.title = a.title, r.open(), s && r.write('<script>document.domain="' + s + '"</script>'),
                r.close(), t.location.hash = n);
            };
        }(), l;
    }();
}(jQuery, this), ! function(e)
{
    var t = "waitForImages";
    e.waitForImages = {
        hasImageProperties: ["backgroundImage", "listStyleImage", "borderImage", "borderCornerImage", "cursor"]
    }, e.expr[":"].uncached = function(t)
    {
        if (!e(t).is('img[src!=""]')) return !1;
        var n = new Image();
        return n.src = t.src, !n.complete;
    }, e.fn.waitForImages = function(n, i, r)
    {
        var o = 0,
            a = 0;
        if (e.isPlainObject(arguments[0]) && (r = arguments[0].waitForAll, i = arguments[0].each,
        n = arguments[0].finished), n = n || e.noop, i = i || e.noop, r = !! r, !e.isFunction(n) || !e.isFunction(i)) throw new TypeError("An invalid callback was supplied.");
        return this.each(function()
        {
            var s = e(this),
                l = [],
                u = e.waitForImages.hasImageProperties || [],
                c = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
            r ? s.find("*").addBack().each(function()
            {
                var t = e(this);
                t.is("img:uncached") && l.push(
                {
                    src: t.attr("src"),
                    element: t[0]
                }), e.each(u, function(e, n)
                {
                    var i, r = t.css(n);
                    if (!r) return !0;
                    for (; i = c.exec(r);) l.push(
                    {
                        src: i[2],
                        element: t[0]
                    });
                });
            }) : s.find("img:uncached").each(function()
            {
                l.push(
                {
                    src: this.src,
                    element: this
                });
            }), o = l.length, a = 0, 0 === o && n.call(s[0]), e.each(l, function(r, l)
            {
                var u = new Image();
                e(u).on("load." + t + " error." + t, function(e)
                {
                    return a++, i.call(l.element, a, o, "load" == e.type), a == o ? (n.call(s[0]), !1) : void 0;
                }), u.src = l.src;
            });
        });
    };
}(jQuery),
/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2013 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.8.5
 *
 */

function(e, t, n, i)
{
    var r = e(t);
    e.fn.lazyload = function(o)
    {
        function a()
        {
            var t = 0;
            l.each(function()
            {
                var n = e(this);
                if (!u.skip_invisible || n.is(":visible")) if (e.abovethetop(this, u) || e.leftofbegin(this, u));
                else if (e.belowthefold(this, u) || e.rightoffold(this, u))
                {
                    if (++t > u.failure_limit) return !1;
                }
                else n.trigger("appear"), t = 0;
            });
        }
        var s, l = this,
            u = {
                threshold: 0,
                failure_limit: 0,
                event: "scroll",
                effect: "show",
                container: t,
                data_attribute: "original",
                skip_invisible: !0,
                appear: null,
                load: null
            };
        return o && (i !== o.failurelimit && (o.failure_limit = o.failurelimit, delete o.failurelimit),
        i !== o.effectspeed && (o.effect_speed = o.effectspeed, delete o.effectspeed), e.extend(u, o)),
        s = u.container === i || u.container === t ? r : e(u.container), 0 === u.event.indexOf("scroll") && s.bind(u.event, function()
        {
            return a();
        }), this.each(function()
        {
            var t = this,
                n = e(t);
            t.loaded = !1, n.one("appear", function()
            {
                if (!this.loaded)
                {
                    if (u.appear)
                    {
                        var i = l.length;
                        u.appear.call(t, i, u);
                    }
                    if (n.data("background"))
                    {
                        var r = n.data("background");
                        n.css("backgroundImage", "url(" + r + ")");
                    }
                    else
                    {
                        var r = n.data(u.data_attribute);
                        e("<img />").bind("load", function()
                        {
                            n.hide().attr("src", r).on("load", function()
                            {
                                n.trigger("afterAppear");
                            }), n[u.effect](u.effect_speed), t.loaded = !0;
                            var i = e.grep(l, function(e)
                            {
                                return !e.loaded;
                            });
                            if (l = e(i), u.load)
                            {
                                var o = l.length;
                                u.load.call(t, o, u);
                            }
                        }).attr("src", r);
                    }
                }
            }), 0 !== u.event.indexOf("scroll") && n.bind(u.event, function()
            {
                t.loaded || n.trigger("appear");
            });
        }), r.bind("resize", function()
        {
            a();
        }), /iphone|ipod|ipad.*os 5/gi.test(navigator.appVersion) && r.bind("pageshow", function(t)
        {
            t.originalEvent && t.originalEvent.persisted && l.each(function()
            {
                e(this).trigger("appear");
            });
        }), e(n).ready(function()
        {
            a();
        }), this;
    }, e.belowthefold = function(n, o)
    {
        var a;
        return a = o.container === i || o.container === t ? r.height() + r.scrollTop() : e(o.container).offset().top + e(o.container).height(),
        a <= e(n).offset().top - o.threshold;
    }, e.rightoffold = function(n, o)
    {
        var a;
        return a = o.container === i || o.container === t ? r.width() + r.scrollLeft() : e(o.container).offset().left + e(o.container).width(),
        a <= e(n).offset().left - o.threshold;
    }, e.abovethetop = function(n, o)
    {
        var a;
        return a = o.container === i || o.container === t ? r.scrollTop() : e(o.container).offset().top,
        a >= e(n).offset().top + o.threshold + e(n).height();
    }, e.leftofbegin = function(n, o)
    {
        var a;
        return a = o.container === i || o.container === t ? r.scrollLeft() : e(o.container).offset().left,
        a >= e(n).offset().left + o.threshold + e(n).width();
    }, e.inviewport = function(t, n)
    {
        return !(e.rightoffold(t, n) || e.leftofbegin(t, n) || e.belowthefold(t, n) || e.abovethetop(t, n));
    }, e.extend(e.expr[":"],
    {
        "below-the-fold": function(t)
        {
            return e.belowthefold(t,
            {
                threshold: 0
            });
        },
        "above-the-top": function(t)
        {
            return !e.belowthefold(t,
            {
                threshold: 0
            });
        },
        "right-of-screen": function(t)
        {
            return e.rightoffold(t,
            {
                threshold: 0
            });
        },
        "left-of-screen": function(t)
        {
            return !e.rightoffold(t,
            {
                threshold: 0
            });
        },
        "in-viewport": function(t)
        {
            return e.inviewport(t,
            {
                threshold: 0
            });
        },
        "above-the-fold": function(t)
        {
            return !e.belowthefold(t,
            {
                threshold: 0
            });
        },
        "right-of-fold": function(t)
        {
            return e.rightoffold(t,
            {
                threshold: 0
            });
        },
        "left-of-fold": function(t)
        {
            return !e.rightoffold(t,
            {
                threshold: 0
            });
        }
    });
}(jQuery, window, document),
function(e, t)
{
    function n(e, t)
    {
        var n = null === e || typeof e in r;
        return n ? e === t : !1;
    }
    var i = e.ko = {};
    i.exportSymbol = function(t, n)
    {
        for (var i = t.split("."), r = e, o = 0; o < i.length - 1; o++) r = r[i[o]];
        r[i[i.length - 1]] = n;
    }, i.exportProperty = function(e, t, n)
    {
        e[t] = n;
    }, i.utils = new function()
    {
        function n(e, t)
        {
            if ("INPUT" != e.tagName || !e.type) return !1;
            if ("click" != t.toLowerCase()) return !1;
            var n = e.type.toLowerCase();
            return "checkbox" == n || "radio" == n;
        }
        var r = /^(\s|\u00A0)+|(\s|\u00A0)+$/g,
            o = /MSIE 6/i.test(navigator.userAgent),
            a = /MSIE 7/i.test(navigator.userAgent),
            s = {}, l = {}, u = /Firefox\/2/i.test(navigator.userAgent) ? "KeyboardEvent" : "UIEvents";
        s[u] = ["keyup", "keydown", "keypress"], s.MouseEvents = ["click", "dblclick", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "mouseenter", "mouseleave"];
        for (var c in s)
        {
            var d = s[c];
            if (d.length) for (var p = 0, h = d.length; h > p; p++) l[d[p]] = c;
        }
        return {
            fieldsIncludedWithJsonPost: ["authenticity_token", /^__RequestVerificationToken(_.*)?$/],
            arrayForEach: function(e, t)
            {
                for (var n = 0, i = e.length; i > n; n++) t(e[n]);
            },
            arrayIndexOf: function(e, t)
            {
                if ("function" == typeof e.indexOf) return e.indexOf(t);
                for (var n = 0, i = e.length; i > n; n++) if (e[n] === t) return n;
                return -1;
            },
            arrayFirst: function(e, t, n)
            {
                for (var i = 0, r = e.length; r > i; i++) if (t.call(n, e[i])) return e[i];
                return null;
            },
            arrayRemoveItem: function(e, t)
            {
                var n = i.utils.arrayIndexOf(e, t);
                n >= 0 && e.splice(n, 1);
            },
            arrayGetDistinctValues: function(e)
            {
                e = e || [];
                for (var t = [], n = 0, r = e.length; r > n; n++) i.utils.arrayIndexOf(t, e[n]) < 0 && t.push(e[n]);
                return t;
            },
            arrayMap: function(e, t)
            {
                e = e || [];
                for (var n = [], i = 0, r = e.length; r > i; i++) n.push(t(e[i]));
                return n;
            },
            arrayFilter: function(e, t)
            {
                e = e || [];
                for (var n = [], i = 0, r = e.length; r > i; i++) t(e[i]) && n.push(e[i]);
                return n;
            },
            arrayPushAll: function(e, t)
            {
                for (var n = 0, i = t.length; i > n; n++) e.push(t[n]);
            },
            emptyDomNode: function(e)
            {
                for (; e.firstChild;) i.removeNode(e.firstChild);
            },
            setDomNodeChildren: function(e, t)
            {
                i.utils.emptyDomNode(e), t && i.utils.arrayForEach(t, function(t)
                {
                    e.appendChild(t);
                });
            },
            replaceDomNodes: function(e, t)
            {
                var n = e.nodeType ? [e] : e;
                if (n.length > 0)
                {
                    for (var r = n[0], o = r.parentNode, a = 0, s = t.length; s > a; a++) o.insertBefore(t[a], r);
                    for (var a = 0, s = n.length; s > a; a++) i.removeNode(n[a]);
                }
            },
            setOptionNodeSelectionState: function(e, t)
            {
                navigator.userAgent.indexOf("MSIE 6") >= 0 ? e.setAttribute("selected", t) : e.selected = t;
            },
            getElementsHavingAttribute: function(e, t)
            {
                if (!e || 1 != e.nodeType) return [];
                var n = [];
                null !== e.getAttribute(t) && n.push(e);
                for (var i = e.getElementsByTagName("*"), r = 0, o = i.length; o > r; r++) null !== i[r].getAttribute(t) && n.push(i[r]);
                return n;
            },
            stringTrim: function(e)
            {
                return (e || "").replace(r, "");
            },
            stringTokenize: function(e, t)
            {
                for (var n = [], r = (e || "").split(t), o = 0, a = r.length; a > o; o++)
                {
                    var s = i.utils.stringTrim(r[o]);
                    "" !== s && n.push(s);
                }
                return n;
            },
            stringStartsWith: function(e, t)
            {
                return e = e || "", t.length > e.length ? !1 : e.substring(0, t.length) === t;
            },
            evalWithinScope: function(e, n)
            {
                return n === t ? new Function("return " + e)() : new Function("sc", "with(sc) { return (" + e + ") }")(n);
            },
            domNodeIsContainedBy: function(e, t)
            {
                if (t.compareDocumentPosition) return 16 == (16 & t.compareDocumentPosition(e));
                for (; null != e;)
                {
                    if (e == t) return !0;
                    e = e.parentNode;
                }
                return !1;
            },
            domNodeIsAttachedToDocument: function(e)
            {
                return i.utils.domNodeIsContainedBy(e, document);
            },
            registerEventHandler: function(e, t, i)
            {
                if ("undefined" != typeof jQuery)
                {
                    if (n(e, t))
                    {
                        var r = i;
                        i = function(e, t)
                        {
                            var n = this.checked;
                            t && (this.checked = t.checkedStateBeforeEvent !== !0), r.call(this, e), this.checked = n;
                        };
                    }
                    jQuery(e).bind(t, i);
                }
                else if ("function" == typeof e.addEventListener) e.addEventListener(t, i, !1);
                else
                {
                    if ("undefined" == typeof e.attachEvent) throw new Error("Browser doesn't support addEventListener or attachEvent");
                    e.attachEvent("on" + t, function(t)
                    {
                        i.call(e, t);
                    });
                }
            },
            triggerEvent: function(t, i)
            {
                if (!t || !t.nodeType) throw new Error("element must be a DOM node when calling triggerEvent");
                if ("undefined" != typeof jQuery)
                {
                    var r = [];
                    n(t, i) && r.push(
                    {
                        checkedStateBeforeEvent: t.checked
                    }), jQuery(t).trigger(i, r);
                }
                else if ("function" == typeof document.createEvent)
                {
                    if ("function" != typeof t.dispatchEvent) throw new Error("The supplied element doesn't support dispatchEvent");
                    var o = l[i] || "HTMLEvents",
                        a = document.createEvent(o);
                    a.initEvent(i, !0, !0, e, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, t), t.dispatchEvent(a);
                }
                else
                {
                    if ("undefined" == typeof t.fireEvent) throw new Error("Browser doesn't support triggering events");
                    "click" == i && ("INPUT" != t.tagName || "checkbox" != t.type.toLowerCase() && "radio" != t.type.toLowerCase() || (t.checked = t.checked !== !0)),
                    t.fireEvent("on" + i);
                }
            },
            unwrapObservable: function(e)
            {
                return i.isObservable(e) ? e() : e;
            },
            domNodeHasCssClass: function(e, t)
            {
                var n = (e.className || "").split(/\s+/);
                return i.utils.arrayIndexOf(n, t) >= 0;
            },
            toggleDomNodeCssClass: function(e, t, n)
            {
                var r = i.utils.domNodeHasCssClass(e, t);
                if (n && !r) e.className = (e.className || "") + " " + t;
                else if (r && !n)
                {
                    for (var o = (e.className || "").split(/\s+/), a = "", s = 0; s < o.length; s++) o[s] != t && (a += o[s] + " ");
                    e.className = i.utils.stringTrim(a);
                }
            },
            range: function(e, t)
            {
                e = i.utils.unwrapObservable(e), t = i.utils.unwrapObservable(t);
                for (var n = [], r = e; t >= r; r++) n.push(r);
                return n;
            },
            makeArray: function(e)
            {
                for (var t = [], n = 0, i = e.length; i > n; n++) t.push(e[n]);
                return t;
            },
            isIe6: o,
            isIe7: a,
            getFormFields: function(e, t)
            {
                for (var n = i.utils.makeArray(e.getElementsByTagName("INPUT")).concat(i.utils.makeArray(e.getElementsByTagName("TEXTAREA"))), r = "string" == typeof t ? function(e)
                    {
                        return e.name === t;
                    } : function(e)
                    {
                        return t.test(e.name);
                    }, o = [], a = n.length - 1; a >= 0; a--) r(n[a]) && o.push(n[a]);
                return o;
            },
            parseJson: function(t)
            {
                return "string" == typeof t && (t = i.utils.stringTrim(t)) ? e.JSON && e.JSON.parse ? e.JSON.parse(t) : new Function("return " + t)() : null;
            },
            stringifyJson: function(e)
            {
                if ("undefined" == typeof JSON || "undefined" == typeof JSON.stringify) throw new Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js");
                return JSON.stringify(i.utils.unwrapObservable(e));
            },
            postJson: function(e, t, n)
            {
                n = n || {};
                var r = n.params || {}, o = n.includeFields || this.fieldsIncludedWithJsonPost,
                    a = e;
                if ("object" == typeof e && "FORM" == e.tagName)
                {
                    var s = e;
                    a = s.action;
                    for (var l = o.length - 1; l >= 0; l--) for (var u = i.utils.getFormFields(s, o[l]), c = u.length - 1; c >= 0; c--) r[u[c].name] = u[c].value;
                }
                t = i.utils.unwrapObservable(t);
                var d = document.createElement("FORM");
                d.style.display = "none", d.action = a, d.method = "post";
                for (var p in t)
                {
                    var h = document.createElement("INPUT");
                    h.name = p, h.value = i.utils.stringifyJson(i.utils.unwrapObservable(t[p])), d.appendChild(h);
                }
                for (var p in r)
                {
                    var h = document.createElement("INPUT");
                    h.name = p, h.value = r[p], d.appendChild(h);
                }
                document.body.appendChild(d), n.submitter ? n.submitter(d) : d.submit(), setTimeout(function()
                {
                    d.parentNode.removeChild(d);
                }, 0);
            }
        };
    }(), i.exportSymbol("ko.utils", i.utils), i.exportSymbol("ko.utils.arrayForEach", i.utils.arrayForEach),
    i.exportSymbol("ko.utils.arrayFirst", i.utils.arrayFirst), i.exportSymbol("ko.utils.arrayFilter", i.utils.arrayFilter),
    i.exportSymbol("ko.utils.arrayGetDistinctValues", i.utils.arrayGetDistinctValues),
    i.exportSymbol("ko.utils.arrayIndexOf", i.utils.arrayIndexOf), i.exportSymbol("ko.utils.arrayMap", i.utils.arrayMap),
    i.exportSymbol("ko.utils.arrayPushAll", i.utils.arrayPushAll), i.exportSymbol("ko.utils.arrayRemoveItem", i.utils.arrayRemoveItem),
    i.exportSymbol("ko.utils.fieldsIncludedWithJsonPost", i.utils.fieldsIncludedWithJsonPost),
    i.exportSymbol("ko.utils.getElementsHavingAttribute", i.utils.getElementsHavingAttribute),
    i.exportSymbol("ko.utils.getFormFields", i.utils.getFormFields), i.exportSymbol("ko.utils.postJson", i.utils.postJson),
    i.exportSymbol("ko.utils.parseJson", i.utils.parseJson), i.exportSymbol("ko.utils.registerEventHandler", i.utils.registerEventHandler),
    i.exportSymbol("ko.utils.stringifyJson", i.utils.stringifyJson), i.exportSymbol("ko.utils.range", i.utils.range),
    i.exportSymbol("ko.utils.toggleDomNodeCssClass", i.utils.toggleDomNodeCssClass),
    i.exportSymbol("ko.utils.triggerEvent", i.utils.triggerEvent), i.exportSymbol("ko.utils.unwrapObservable", i.utils.unwrapObservable),
    Function.prototype.bind || (Function.prototype.bind = function(e)
    {
        var t = this,
            n = Array.prototype.slice.call(arguments),
            e = n.shift();
        return function()
        {
            return t.apply(e, n.concat(Array.prototype.slice.call(arguments)));
        };
    }), i.utils.domData = new function()
    {
        var e = 0,
            n = "__ko__" + new Date().getTime(),
            r = {};
        return {
            get: function(e, n)
            {
                var r = i.utils.domData.getAll(e, !1);
                return r === t ? t : r[n];
            },
            set: function(e, n, r)
            {
                if (r !== t || i.utils.domData.getAll(e, !1) !== t)
                {
                    var o = i.utils.domData.getAll(e, !0);
                    o[n] = r;
                }
            },
            getAll: function(i, o)
            {
                var a = i[n];
                if (!a)
                {
                    if (!o) return t;
                    a = i[n] = "ko" + e++, r[a] = {};
                }
                return r[a];
            },
            clear: function(e)
            {
                var t = e[n];
                t && (delete r[t], e[n] = null);
            }
        };
    }(), i.utils.domNodeDisposal = new function()
    {
        function e(e, n)
        {
            var r = i.utils.domData.get(e, o);
            return r === t && n && (r = [], i.utils.domData.set(e, o, r)), r;
        }

        function n(e)
        {
            i.utils.domData.set(e, o, t);
        }

        function r(t)
        {
            var n = e(t, !1);
            if (n)
            {
                n = n.slice(0);
                for (var r = 0; r < n.length; r++) n[r](t);
            }
            i.utils.domData.clear(t), "function" == typeof jQuery && "function" == typeof jQuery.cleanData && jQuery.cleanData([t]);
        }
        var o = "__ko_domNodeDisposal__" + new Date().getTime();
        return {
            addDisposeCallback: function(t, n)
            {
                if ("function" != typeof n) throw new Error("Callback must be a function");
                e(t, !0).push(n);
            },
            removeDisposeCallback: function(t, r)
            {
                var o = e(t, !1);
                o && (i.utils.arrayRemoveItem(o, r), 0 == o.length && n(t));
            },
            cleanNode: function(e)
            {
                if (1 == e.nodeType || 9 == e.nodeType)
                {
                    r(e);
                    var t = [];
                    i.utils.arrayPushAll(t, e.getElementsByTagName("*"));
                    for (var n = 0, o = t.length; o > n; n++) r(t[n]);
                }
            },
            removeNode: function(e)
            {
                i.cleanNode(e), e.parentNode && e.parentNode.removeChild(e);
            }
        };
    }(), i.cleanNode = i.utils.domNodeDisposal.cleanNode, i.removeNode = i.utils.domNodeDisposal.removeNode,
    i.exportSymbol("ko.cleanNode", i.cleanNode), i.exportSymbol("ko.removeNode", i.removeNode),
    i.exportSymbol("ko.utils.domNodeDisposal", i.utils.domNodeDisposal), i.exportSymbol("ko.utils.domNodeDisposal.addDisposeCallback", i.utils.domNodeDisposal.addDisposeCallback),
    i.exportSymbol("ko.utils.domNodeDisposal.removeDisposeCallback", i.utils.domNodeDisposal.removeDisposeCallback),

    function()
    {
        function e(e)
        {
            var t = i.utils.stringTrim(e).toLowerCase(),
                n = document.createElement("div"),
                r = t.match(/^<(thead|tbody|tfoot)/) && [1, "<table>", "</table>"] || !t.indexOf("<tr") && [2, "<table><tbody>", "</tbody></table>"] || (!t.indexOf("<td") || !t.indexOf("<th")) && [3, "<table><tbody><tr>", "</tr></tbody></table>"] || [0, "", ""];
            for (n.innerHTML = r[1] + e + r[2]; r[0]--;) n = n.lastChild;
            return i.utils.makeArray(n.childNodes);
        }
        i.utils.parseHtmlFragment = function(t)
        {
            return "undefined" != typeof jQuery ? jQuery.clean([t]) : e(t);
        }, i.utils.setHtml = function(e, n)
        {
            if (i.utils.emptyDomNode(e), null !== n && n !== t) if ("string" != typeof n && (n = n.toString()), "undefined" != typeof jQuery) jQuery(e).html(n);
            else for (var r = i.utils.parseHtmlFragment(n), o = 0; o < r.length; o++) e.appendChild(r[o]);
        };
    }(), i.memoization = function()
    {
        function e()
        {
            return (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1);
        }

        function n()
        {
            return e() + e();
        }

        function r(e, t)
        {
            if (e) if (8 == e.nodeType)
            {
                var n = i.memoization.parseMemoText(e.nodeValue);
                null != n && t.push(
                {
                    domNode: e,
                    memoId: n
                });
            }
            else if (1 == e.nodeType) for (var o = 0, a = e.childNodes, s = a.length; s > o; o++) r(a[o], t);
        }
        var o = {};
        return {
            memoize: function(e)
            {
                if ("function" != typeof e) throw new Error("You can only pass a function to ko.memoization.memoize()");
                var t = n();
                return o[t] = e, "<!--[ko_memo:" + t + "]-->";
            },
            unmemoize: function(e, n)
            {
                var i = o[e];
                if (i === t) throw new Error("Couldn't find any memo with ID " + e + ". Perhaps it's already been unmemoized.");
                try
                {
                    return i.apply(null, n || []), !0;
                }
                finally
                {
                    delete o[e];
                }
            },
            unmemoizeDomNodeAndDescendants: function(e, t)
            {
                var n = [];
                r(e, n);
                for (var o = 0, a = n.length; a > o; o++)
                {
                    var s = n[o].domNode,
                        l = [s];
                    t && i.utils.arrayPushAll(l, t), i.memoization.unmemoize(n[o].memoId, l), s.nodeValue = "",
                    s.parentNode && s.parentNode.removeChild(s);
                }
            },
            parseMemoText: function(e)
            {
                var t = e.match(/^\[ko_memo\:(.*?)\]$/);
                return t ? t[1] : null;
            }
        };
    }(), i.exportSymbol("ko.memoization", i.memoization), i.exportSymbol("ko.memoization.memoize", i.memoization.memoize),
    i.exportSymbol("ko.memoization.unmemoize", i.memoization.unmemoize), i.exportSymbol("ko.memoization.parseMemoText", i.memoization.parseMemoText),
    i.exportSymbol("ko.memoization.unmemoizeDomNodeAndDescendants", i.memoization.unmemoizeDomNodeAndDescendants),
    i.subscription = function(e, t)
    {
        this.callback = e, this.dispose = function()
        {
            this.isDisposed = !0, t();
        }.bind(this), i.exportProperty(this, "dispose", this.dispose);
    }, i.subscribable = function()
    {
        var e = [];
        this.subscribe = function(t, n)
        {
            var r = n ? t.bind(n) : t,
                o = new i.subscription(r, function()
                {
                    i.utils.arrayRemoveItem(e, o);
                });
            return e.push(o), o;
        }, this.notifySubscribers = function(t)
        {
            i.utils.arrayForEach(e.slice(0), function(e)
            {
                e && e.isDisposed !== !0 && e.callback(t);
            });
        }, this.getSubscriptionsCount = function()
        {
            return e.length;
        }, i.exportProperty(this, "subscribe", this.subscribe), i.exportProperty(this, "notifySubscribers", this.notifySubscribers),
        i.exportProperty(this, "getSubscriptionsCount", this.getSubscriptionsCount);
    }, i.isSubscribable = function(e)
    {
        return "function" == typeof e.subscribe && "function" == typeof e.notifySubscribers;
    }, i.exportSymbol("ko.subscribable", i.subscribable), i.exportSymbol("ko.isSubscribable", i.isSubscribable),
    i.dependencyDetection = function()
    {
        var e = [];
        return {
            begin: function()
            {
                e.push([]);
            },
            end: function()
            {
                return e.pop();
            },
            registerDependency: function(t)
            {
                if (!i.isSubscribable(t)) throw "Only subscribable things can act as dependencies";
                e.length > 0 && e[e.length - 1].push(t);
            }
        };
    }();
    var r = {
        undefined: !0,
        "boolean": !0,
        number: !0,
        string: !0
    };
    i.observable = function(e)
    {
        function t()
        {
            return arguments.length > 0 ? (t.equalityComparer && t.equalityComparer(r, arguments[0]) || (r = arguments[0],
            t.notifySubscribers(r)), this) : (i.dependencyDetection.registerDependency(t), r);
        }
        var r = e;
        return t.__ko_proto__ = i.observable, t.valueHasMutated = function()
        {
            t.notifySubscribers(r);
        }, t.equalityComparer = n, i.subscribable.call(t), i.exportProperty(t, "valueHasMutated", t.valueHasMutated),
        t;
    }, i.isObservable = function(e)
    {
        return null === e || e === t || e.__ko_proto__ === t ? !1 : e.__ko_proto__ === i.observable ? !0 : i.isObservable(e.__ko_proto__);
    }, i.isWriteableObservable = function(e)
    {
        return "function" == typeof e && e.__ko_proto__ === i.observable ? !0 : "function" == typeof e && e.__ko_proto__ === i.dependentObservable && e.hasWriteFunction ? !0 : !1;
    }, i.exportSymbol("ko.observable", i.observable), i.exportSymbol("ko.isObservable", i.isObservable),
    i.exportSymbol("ko.isWriteableObservable", i.isWriteableObservable), i.observableArray = function(e)
    {
        if (0 == arguments.length && (e = []), null !== e && e !== t && !("length" in e)) throw new Error("The argument passed when initializing an observable array must be an array, or null, or undefined.");
        var n = new i.observable(e);
        return i.utils.arrayForEach(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e)
        {
            n[e] = function()
            {
                var t = n(),
                    i = t[e].apply(t, arguments);
                return n.valueHasMutated(), i;
            };
        }), i.utils.arrayForEach(["slice"], function(e)
        {
            n[e] = function()
            {
                var t = n();
                return t[e].apply(t, arguments);
            };
        }), n.remove = function(e)
        {
            for (var t = n(), i = [], r = [], o = "function" == typeof e ? e : function(t)
                {
                    return t === e;
                }, a = 0, s = t.length; s > a; a++)
            {
                var l = t[a];
                o(l) ? r.push(l) : i.push(l);
            }
            return n(i), r;
        }, n.removeAll = function(e)
        {
            if (e === t)
            {
                var r = n();
                return n([]), r;
            }
            return e ? n.remove(function(t)
            {
                return i.utils.arrayIndexOf(e, t) >= 0;
            }) : [];
        }, n.destroy = function(e)
        {
            for (var t = n(), i = "function" == typeof e ? e : function(t)
                {
                    return t === e;
                }, r = t.length - 1; r >= 0; r--)
            {
                var o = t[r];
                i(o) && (t[r]._destroy = !0);
            }
            n.valueHasMutated();
        }, n.destroyAll = function(e)
        {
            return e === t ? n.destroy(function()
            {
                return !0;
            }) : e ? n.destroy(function(t)
            {
                return i.utils.arrayIndexOf(e, t) >= 0;
            }) : [];
        }, n.indexOf = function(e)
        {
            var t = n();
            return i.utils.arrayIndexOf(t, e);
        }, n.replace = function(e, t)
        {
            var i = n.indexOf(e);
            i >= 0 && (n()[i] = t, n.valueHasMutated());
        }, i.exportProperty(n, "remove", n.remove), i.exportProperty(n, "removeAll", n.removeAll),
        i.exportProperty(n, "destroy", n.destroy), i.exportProperty(n, "destroyAll", n.destroyAll),
        i.exportProperty(n, "indexOf", n.indexOf), n;
    }, i.exportSymbol("ko.observableArray", i.observableArray), i.dependentObservable = function(e, t, n)
    {
        function r()
        {
            i.utils.arrayForEach(h, function(e)
            {
                e.dispose();
            }), h = [];
        }

        function o(e)
        {
            r(), i.utils.arrayForEach(e, function(e)
            {
                h.push(e.subscribe(a));
            });
        }

        function a()
        {
            if (u && "function" == typeof n.disposeWhen && n.disposeWhen()) return s.dispose(),
            void 0;
            try
            {
                i.dependencyDetection.begin(), l = n.owner ? n.read.call(n.owner) : n.read();
            }
            finally
            {
                var e = i.utils.arrayGetDistinctValues(i.dependencyDetection.end());
                o(e);
            }
            s.notifySubscribers(l), u = !0;
        }

        function s()
        {
            if (!(arguments.length > 0)) return u || a(), i.dependencyDetection.registerDependency(s),
            l;
            if ("function" != typeof n.write) throw "Cannot write a value to a dependentObservable unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.";
            var e = arguments[0];
            n.owner ? n.write.call(n.owner, e) : n.write(e);
        }
        var l, u = !1;
        if (e && "object" == typeof e ? n = e : (n = n || {}, n.read = e || n.read, n.owner = t || n.owner), "function" != typeof n.read) throw "Pass a function that returns the value of the dependentObservable";
        var c = "object" == typeof n.disposeWhenNodeIsRemoved ? n.disposeWhenNodeIsRemoved : null,
            d = null;
        if (c)
        {
            d = function()
            {
                s.dispose();
            }, i.utils.domNodeDisposal.addDisposeCallback(c, d);
            var p = n.disposeWhen;
            n.disposeWhen = function()
            {
                return !i.utils.domNodeIsAttachedToDocument(c) || "function" == typeof p && p();
            };
        }
        var h = [];
        return s.__ko_proto__ = i.dependentObservable, s.getDependenciesCount = function()
        {
            return h.length;
        }, s.hasWriteFunction = "function" == typeof n.write, s.dispose = function()
        {
            c && i.utils.domNodeDisposal.removeDisposeCallback(c, d), r();
        }, i.subscribable.call(s), n.deferEvaluation !== !0 && a(), i.exportProperty(s, "dispose", s.dispose),
        i.exportProperty(s, "getDependenciesCount", s.getDependenciesCount), s;
    }, i.dependentObservable.__ko_proto__ = i.observable, i.exportSymbol("ko.dependentObservable", i.dependentObservable),

    function()
    {
        function e(i, o, a)
        {
            a = a || new r(), i = o(i);
            var s = "object" == typeof i && null !== i && i !== t;
            if (!s) return i;
            var l = i instanceof Array ? [] : {};
            return a.save(i, l), n(i, function(n)
            {
                var r = o(i[n]);
                switch (typeof r)
                {
                case "boolean":
                case "number":
                case "string":
                case "function":
                    l[n] = r;
                    break;

                case "object":
                case "undefined":
                    var s = a.get(r);
                    l[n] = s !== t ? s : e(r, o, a);
                }
            }), l;
        }

        function n(e, t)
        {
            if (e instanceof Array) for (var n = 0; n < e.length; n++) t(n);
            else for (var i in e) t(i);
        }

        function r()
        {
            var e = [],
                n = [];
            this.save = function(t, r)
            {
                var o = i.utils.arrayIndexOf(e, t);
                o >= 0 ? n[o] = r : (e.push(t), n.push(r));
            }, this.get = function(r)
            {
                var o = i.utils.arrayIndexOf(e, r);
                return o >= 0 ? n[o] : t;
            };
        }
        var o = 10;
        i.toJS = function(t)
        {
            if (0 == arguments.length) throw new Error("When calling ko.toJS, pass the object you want to convert.");
            return e(t, function(e)
            {
                for (var t = 0; i.isObservable(e) && o > t; t++) e = e();
                return e;
            });
        }, i.toJSON = function(e)
        {
            var t = i.toJS(e);
            return i.utils.stringifyJson(t);
        };
    }(), i.exportSymbol("ko.toJS", i.toJS), i.exportSymbol("ko.toJSON", i.toJSON),
    function()
    {
        i.selectExtensions = {
            readValue: function(e)
            {
                return "OPTION" == e.tagName ? e.__ko__hasDomDataOptionValue__ === !0 ? i.utils.domData.get(e, i.bindingHandlers.options.optionValueDomDataKey) : e.getAttribute("value") : "SELECT" == e.tagName ? e.selectedIndex >= 0 ? i.selectExtensions.readValue(e.options[e.selectedIndex]) : t : e.value;
            },
            writeValue: function(e, n)
            {
                if ("OPTION" == e.tagName) switch (typeof n)
                {
                case "string":
                case "number":
                    i.utils.domData.set(e, i.bindingHandlers.options.optionValueDomDataKey, t), "__ko__hasDomDataOptionValue__" in e && delete e.__ko__hasDomDataOptionValue__,
                    e.value = n;
                    break;

                default:
                    i.utils.domData.set(e, i.bindingHandlers.options.optionValueDomDataKey, n), e.__ko__hasDomDataOptionValue__ = !0,
                    e.value = "";
                }
                else if ("SELECT" == e.tagName)
                {
                    for (var r = e.options.length - 1; r >= 0; r--) if (i.selectExtensions.readValue(e.options[r]) == n)
                    {
                        e.selectedIndex = r;
                        break;
                    }
                }
                else(null === n || n === t) && (n = ""), e.value = n;
            }
        };
    }(), i.exportSymbol("ko.selectExtensions", i.selectExtensions), i.exportSymbol("ko.selectExtensions.readValue", i.selectExtensions.readValue),
    i.exportSymbol("ko.selectExtensions.writeValue", i.selectExtensions.writeValue),
    i.jsonExpressionRewriting = function()
    {
        function e(e, t)
        {
            return e.replace(n, function(e, n)
            {
                return t[n];
            });
        }

        function t(e)
        {
            return i.utils.arrayIndexOf(o, i.utils.stringTrim(e).toLowerCase()) >= 0 ? !1 : null !== e.match(r);
        }
        var n = /\[ko_token_(\d+)\]/g,
            r = /^[\_$a-z][\_$a-z0-9]*(\[.*?\])*(\.[\_$a-z][\_$a-z0-9]*(\[.*?\])*)*$/i,
            o = ["true", "false"];
        return {
            parseJson: function(t)
            {
                if (t = i.utils.stringTrim(t), t.length < 3) return {};
                for (var n, r = [], o = null, a = "{" == t.charAt(0) ? 1 : 0; a < t.length; a++)
                {
                    var s = t.charAt(a);
                    if (null === o) switch (s)
                    {
                    case '"':
                    case "'":
                    case "/":
                        o = a, n = s;
                        break;

                    case "{":
                        o = a, n = "}";
                        break;

                    case "[":
                        o = a, n = "]";
                    }
                    else if (s == n)
                    {
                        var l = t.substring(o, a + 1);
                        r.push(l);
                        var u = "[ko_token_" + (r.length - 1) + "]";
                        t = t.substring(0, o) + u + t.substring(a + 1), a -= l.length - u.length, o = null;
                    }
                }
                for (var c = {}, d = t.split(","), p = 0, h = d.length; h > p; p++)
                {
                    var f = d[p],
                        m = f.indexOf(":");
                    if (m > 0 && m < f.length - 1)
                    {
                        var g = i.utils.stringTrim(f.substring(0, m)),
                            v = i.utils.stringTrim(f.substring(m + 1));
                        "{" == g.charAt(0) && (g = g.substring(1)), "}" == v.charAt(v.length - 1) && (v = v.substring(0, v.length - 1)),
                        g = i.utils.stringTrim(e(g, r)), v = i.utils.stringTrim(e(v, r)), c[g] = v;
                    }
                }
                return c;
            },
            insertPropertyAccessorsIntoJson: function(e)
            {
                var n = i.jsonExpressionRewriting.parseJson(e),
                    r = [];
                for (var o in n)
                {
                    var a = n[o];
                    t(a) && (r.length > 0 && r.push(", "), r.push(o + " : function(__ko_value) { " + a + " = __ko_value; }"));
                }
                if (r.length > 0)
                {
                    var s = r.join("");
                    e = e + ", '_ko_property_writers' : { " + s + " } ";
                }
                return e;
            }
        };
    }(), i.exportSymbol("ko.jsonExpressionRewriting", i.jsonExpressionRewriting), i.exportSymbol("ko.jsonExpressionRewriting.parseJson", i.jsonExpressionRewriting.parseJson),
    i.exportSymbol("ko.jsonExpressionRewriting.insertPropertyAccessorsIntoJson", i.jsonExpressionRewriting.insertPropertyAccessorsIntoJson),

    function()
    {
        function n(t, n)
        {
            try
            {
                var r = " { " + i.jsonExpressionRewriting.insertPropertyAccessorsIntoJson(t) + " } ";
                return i.utils.evalWithinScope(r, null === n ? e : n);
            }
            catch (o)
            {
                throw new Error("Unable to parse binding attribute.\nMessage: " + o + ";\nAttribute value: " + t);
            }
        }

        function r(e, t, n, i, r)
        {
            e(t, n, i, r);
        }
        var o = "data-bind";
        i.bindingHandlers = {}, i.applyBindingsToNode = function(e, t, a, s)
        {
            function l(e)
            {
                return function()
                {
                    return d[e];
                };
            }

            function u()
            {
                return d;
            }
            var c = !0;
            s = s || o;
            var d;
            new i.dependentObservable(function()
            {
                var o = "function" == typeof t ? t() : t;
                if (d = o || n(e.getAttribute(s), a), c) for (var p in d) i.bindingHandlers[p] && "function" == typeof i.bindingHandlers[p].init && r(i.bindingHandlers[p].init, e, l(p), u, a);
                for (var p in d) i.bindingHandlers[p] && "function" == typeof i.bindingHandlers[p].update && r(i.bindingHandlers[p].update, e, l(p), u, a);
            }, null,
            {
                disposeWhenNodeIsRemoved: e
            }), c = !1;
        }, i.applyBindings = function(n, r)
        {
            if (r && r.nodeType == t) throw new Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node (note: this is a breaking change since KO version 1.05)");
            r = r || e.document.body;
            var a = i.utils.getElementsHavingAttribute(r, o);
            i.utils.arrayForEach(a, function(e)
            {
                i.applyBindingsToNode(e, null, n);
            });
        }, i.exportSymbol("ko.bindingHandlers", i.bindingHandlers), i.exportSymbol("ko.applyBindings", i.applyBindings),
        i.exportSymbol("ko.applyBindingsToNode", i.applyBindingsToNode);
    }();
    var o = ["click"];
    i.utils.arrayForEach(o, function(e)
    {
        i.bindingHandlers[e] = {
            init: function(t, n, r, o)
            {
                var a = function()
                {
                    var t = {};
                    return t[e] = n(), t;
                };
                return i.bindingHandlers.event.init.call(this, t, a, r, o);
            }
        };
    }), i.bindingHandlers.event = {
        init: function(e, t, n, r)
        {
            var o = t() || {};
            for (var a in o)! function()
            {
                var o = a;
                "string" == typeof o && i.utils.registerEventHandler(e, o, function(e)
                {
                    var i, a = t()[o];
                    if (a)
                    {
                        var s = n();
                        try
                        {
                            i = a.apply(r, arguments);
                        }
                        finally
                        {
                            i !== !0 && (e.preventDefault ? e.preventDefault() : e.returnValue = !1);
                        }
                        var l = s[o + "Bubble"] !== !1;
                        l || (e.cancelBubble = !0, e.stopPropagation && e.stopPropagation());
                    }
                });
            }();
        }
    }, i.bindingHandlers.submit = {
        init: function(e, t, n, r)
        {
            if ("function" != typeof t()) throw new Error("The value for a submit binding must be a function to invoke on submit");
            i.utils.registerEventHandler(e, "submit", function(n)
            {
                var i, o = t();
                try
                {
                    i = o.call(r, e);
                }
                finally
                {
                    i !== !0 && (n.preventDefault ? n.preventDefault() : n.returnValue = !1);
                }
            });
        }
    }, i.bindingHandlers.visible = {
        update: function(e, t)
        {
            var n = i.utils.unwrapObservable(t()),
                r = !("none" == e.style.display);
            n && !r ? e.style.display = "" : !n && r && (e.style.display = "none");
        }
    }, i.bindingHandlers.enable = {
        update: function(e, t)
        {
            var n = i.utils.unwrapObservable(t());
            n && e.disabled ? e.removeAttribute("disabled") : n || e.disabled || (e.disabled = !0);
        }
    }, i.bindingHandlers.disable = {
        update: function(e, t)
        {
            i.bindingHandlers.enable.update(e, function()
            {
                return !i.utils.unwrapObservable(t());
            });
        }
    }, i.bindingHandlers.value = {
        init: function(e, t, n)
        {
            var r = ["change"],
                o = n().valueUpdate;
            o && ("string" == typeof o && (o = [o]), i.utils.arrayPushAll(r, o), r = i.utils.arrayGetDistinctValues(r)),
            i.utils.arrayForEach(r, function(r)
            {
                var o = !1;
                i.utils.stringStartsWith(r, "after") && (o = !0, r = r.substring("after".length));
                var a = o ? function(e)
                    {
                        setTimeout(e, 0);
                    } : function(e)
                    {
                        e();
                    };
                i.utils.registerEventHandler(e, r, function()
                {
                    a(function()
                    {
                        var r = t(),
                            o = i.selectExtensions.readValue(e);
                        if (i.isWriteableObservable(r)) r(o);
                        else
                        {
                            var a = n();
                            a._ko_property_writers && a._ko_property_writers.value && a._ko_property_writers.value(o);
                        }
                    });
                });
            });
        },
        update: function(e, t)
        {
            var n = i.utils.unwrapObservable(t()),
                r = i.selectExtensions.readValue(e),
                o = n != r;
            if (0 === n && 0 !== r && "0" !== r && (o = !0), o)
            {
                var a = function()
                {
                    i.selectExtensions.writeValue(e, n);
                };
                a();
                var s = "SELECT" == e.tagName;
                s && setTimeout(a, 0);
            }
            "SELECT" == e.tagName && (r = i.selectExtensions.readValue(e), r !== n && i.utils.triggerEvent(e, "change"));
        }
    }, i.bindingHandlers.options = {
        update: function(e, n, r)
        {
            if ("SELECT" != e.tagName) throw new Error("options binding applies only to SELECT elements");
            {
                var o = i.utils.arrayMap(i.utils.arrayFilter(e.childNodes, function(e)
                {
                    return e.tagName && "OPTION" == e.tagName && e.selected;
                }), function(e)
                {
                    return i.selectExtensions.readValue(e) || e.innerText || e.textContent;
                }),
                    a = e.scrollTop,
                    s = i.utils.unwrapObservable(n());
                e.value;
            }
            if (i.utils.emptyDomNode(e), s)
            {
                var l = r();
                if ("number" != typeof s.length && (s = [s]), l.optionsCaption)
                {
                    var u = document.createElement("OPTION");
                    u.innerHTML = l.optionsCaption, i.selectExtensions.writeValue(u, t), e.appendChild(u);
                }
                for (var c = 0, d = s.length; d > c; c++)
                {
                    var u = document.createElement("OPTION"),
                        p = "string" == typeof l.optionsValue ? s[c][l.optionsValue] : s[c];
                    p = i.utils.unwrapObservable(p), i.selectExtensions.writeValue(u, p);
                    var h = l.optionsText;
                    optionText = "function" == typeof h ? h(s[c]) : "string" == typeof h ? s[c][h] : p, (null === optionText || optionText === t) && (optionText = ""), optionText = i.utils.unwrapObservable(optionText).toString(), "string" == typeof u.innerText ? u.innerText = optionText : u.textContent = optionText,
                    e.appendChild(u);
                }
                for (var f = e.getElementsByTagName("OPTION"), m = 0, c = 0, d = f.length; d > c; c++) i.utils.arrayIndexOf(o, i.selectExtensions.readValue(f[c])) >= 0 && (i.utils.setOptionNodeSelectionState(f[c], !0),
                m++);
                a && (e.scrollTop = a);
            }
        }
    }, i.bindingHandlers.options.optionValueDomDataKey = "__ko.bindingHandlers.options.optionValueDomData__",
    i.bindingHandlers.selectedOptions = {
        getSelectedValuesFromSelectNode: function(e)
        {
            for (var t = [], n = e.childNodes, r = 0, o = n.length; o > r; r++)
            {
                var a = n[r];
                "OPTION" == a.tagName && a.selected && t.push(i.selectExtensions.readValue(a));
            }
            return t;
        },
        init: function(e, t, n)
        {
            i.utils.registerEventHandler(e, "change", function()
            {
                var e = t();
                if (i.isWriteableObservable(e)) e(i.bindingHandlers.selectedOptions.getSelectedValuesFromSelectNode(this));
                else
                {
                    var r = n();
                    r._ko_property_writers && r._ko_property_writers.value && r._ko_property_writers.value(i.bindingHandlers.selectedOptions.getSelectedValuesFromSelectNode(this));
                }
            });
        },
        update: function(e, t)
        {
            if ("SELECT" != e.tagName) throw new Error("values binding applies only to SELECT elements");
            var n = i.utils.unwrapObservable(t());
            if (n && "number" == typeof n.length) for (var r = e.childNodes, o = 0, a = r.length; a > o; o++)
            {
                var s = r[o];
                "OPTION" == s.tagName && i.utils.setOptionNodeSelectionState(s, i.utils.arrayIndexOf(n, i.selectExtensions.readValue(s)) >= 0);
            }
        }
    }, i.bindingHandlers.text = {
        update: function(e, n)
        {
            var r = i.utils.unwrapObservable(n());
            (null === r || r === t) && (r = ""), "string" == typeof e.innerText ? e.innerText = r : e.textContent = r;
        }
    }, i.bindingHandlers.html = {
        update: function(e, t)
        {
            var n = i.utils.unwrapObservable(t());
            i.utils.setHtml(e, n);
        }
    }, i.bindingHandlers.css = {
        update: function(e, t)
        {
            var n = i.utils.unwrapObservable(t() || {});
            for (var r in n) if ("string" == typeof r)
            {
                var o = i.utils.unwrapObservable(n[r]);
                i.utils.toggleDomNodeCssClass(e, r, o);
            }
        }
    }, i.bindingHandlers.style = {
        update: function(e, t)
        {
            var n = i.utils.unwrapObservable(t() || {});
            for (var r in n) if ("string" == typeof r)
            {
                var o = i.utils.unwrapObservable(n[r]);
                e.style[r] = o || "";
            }
        }
    }, i.bindingHandlers.uniqueName = {
        init: function(e, t)
        {
            t() && (e.name = "ko_unique_" + ++i.bindingHandlers.uniqueName.currentIndex, i.utils.isIe6 && e.mergeAttributes(document.createElement("<input name='" + e.name + "'/>"), !1));
        }
    }, i.bindingHandlers.uniqueName.currentIndex = 0, i.bindingHandlers.checked = {
        init: function(e, t, n)
        {
            var r = function()
            {
                var r;
                if ("checkbox" == e.type) r = e.checked;
                else
                {
                    if ("radio" != e.type || !e.checked) return;
                    r = e.value;
                }
                var o = t();
                if ("checkbox" == e.type && i.utils.unwrapObservable(o) instanceof Array)
                {
                    var a = i.utils.arrayIndexOf(i.utils.unwrapObservable(o), e.value);
                    e.checked && 0 > a ? o.push(e.value) : !e.checked && a >= 0 && o.splice(a, 1);
                }
                else if (i.isWriteableObservable(o)) o() !== r && o(r);
                else
                {
                    var s = n();
                    s._ko_property_writers && s._ko_property_writers.checked && s._ko_property_writers.checked(r);
                }
            };
            i.utils.registerEventHandler(e, "click", r), "radio" != e.type || e.name || i.bindingHandlers.uniqueName.init(e, function()
            {
                return !0;
            });
        },
        update: function(e, t)
        {
            var n = i.utils.unwrapObservable(t());
            "checkbox" == e.type ? (e.checked = n instanceof Array ? i.utils.arrayIndexOf(n, e.value) >= 0 : n,
            n && i.utils.isIe6 && e.mergeAttributes(document.createElement("<input type='checkbox' checked='checked' />"), !1)) : "radio" == e.type && (e.checked = e.value == n,
            e.value == n && (i.utils.isIe6 || i.utils.isIe7) && e.mergeAttributes(document.createElement("<input type='radio' checked='checked' />"), !1));
        }
    }, i.bindingHandlers.attr = {
        update: function(e, n)
        {
            var r = i.utils.unwrapObservable(n()) || {};
            for (var o in r) if ("string" == typeof o)
            {
                var a = i.utils.unwrapObservable(r[o]);
                a === !1 || null === a || a === t ? e.removeAttribute(o) : e.setAttribute(o, a.toString());
            }
        }
    }, i.templateEngine = function()
    {
        this.renderTemplate = function()
        {
            throw "Override renderTemplate in your ko.templateEngine subclass";
        }, this.isTemplateRewritten = function()
        {
            throw "Override isTemplateRewritten in your ko.templateEngine subclass";
        }, this.rewriteTemplate = function()
        {
            throw "Override rewriteTemplate in your ko.templateEngine subclass";
        }, this.createJavaScriptEvaluatorBlock = function()
        {
            throw "Override createJavaScriptEvaluatorBlock in your ko.templateEngine subclass";
        };
    }, i.exportSymbol("ko.templateEngine", i.templateEngine), i.templateRewriting = function()
    {
        var e = /(<[a-z]+\d*(\s+(?!data-bind=)[a-z0-9\-]+(=(\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind=(["'])([\s\S]*?)\5/gi;
        return {
            ensureTemplateIsRewritten: function(e, t)
            {
                t.isTemplateRewritten(e) || t.rewriteTemplate(e, function(e)
                {
                    return i.templateRewriting.memoizeBindingAttributeSyntax(e, t);
                });
            },
            memoizeBindingAttributeSyntax: function(t, n)
            {
                return t.replace(e, function()
                {
                    var e = arguments[1],
                        t = arguments[6];
                    t = i.jsonExpressionRewriting.insertPropertyAccessorsIntoJson(t);
                    var r = "ko.templateRewriting.applyMemoizedBindingsToNextSibling(function() {                     return (function() { return { " + t + " } })()                 })";
                    return n.createJavaScriptEvaluatorBlock(r) + e;
                });
            },
            applyMemoizedBindingsToNextSibling: function(e)
            {
                return i.memoization.memoize(function(t, n)
                {
                    t.nextSibling && i.applyBindingsToNode(t.nextSibling, e, n);
                });
            }
        };
    }(), i.exportSymbol("ko.templateRewriting", i.templateRewriting), i.exportSymbol("ko.templateRewriting.applyMemoizedBindingsToNextSibling", i.templateRewriting.applyMemoizedBindingsToNextSibling),

    function()
    {
        function e(e)
        {
            return e.nodeType ? e : e.length > 0 ? e[0] : null;
        }

        function n(e, t, n, r, a)
        {
            var s = i.utils.unwrapObservable(r);
            a = a || {};
            var l = a.templateEngine || o;
            i.templateRewriting.ensureTemplateIsRewritten(n, l);
            var u = l.renderTemplate(n, s, a);
            if ("number" != typeof u.length || u.length > 0 && "number" != typeof u[0].nodeType) throw "Template engine must return an array of DOM nodes";
            switch (u && i.utils.arrayForEach(u, function(e)
            {
                i.memoization.unmemoizeDomNodeAndDescendants(e, [r]);
            }), t)
            {
            case "replaceChildren":
                i.utils.setDomNodeChildren(e, u);
                break;

            case "replaceNode":
                i.utils.replaceDomNodes(e, u);
                break;

            case "ignoreTargetNode":
                break;

            default:
                throw new Error("Unknown renderMode: " + t);
            }
            return a.afterRender && a.afterRender(u, r), u;
        }

        function r(e, t)
        {
            var n = i.utils.domData.get(e, a);
            n && "function" == typeof n.dispose && n.dispose(), i.utils.domData.set(e, a, t);
        }
        var o;
        i.setTemplateEngine = function(e)
        {
            if (e != t && !(e instanceof i.templateEngine)) throw "templateEngine must inherit from ko.templateEngine";
            o = e;
        }, i.renderTemplate = function(r, a, s, l, u)
        {
            if (s = s || {}, (s.templateEngine || o) == t) throw "Set a template engine before calling renderTemplate";
            if (u = u || "replaceChildren", l)
            {
                var c = e(l),
                    d = function()
                    {
                        return !c || !i.utils.domNodeIsAttachedToDocument(c);
                    }, p = c && "replaceNode" == u ? c.parentNode : c;
                return new i.dependentObservable(function()
                {
                    var t = "function" == typeof r ? r(a) : r,
                        i = n(l, u, t, a, s);
                    "replaceNode" == u && (l = i, c = e(l));
                }, null,
                {
                    disposeWhen: d,
                    disposeWhenNodeIsRemoved: p
                });
            }
            return i.memoization.memoize(function(e)
            {
                i.renderTemplate(r, a, s, e, "replaceNode");
            });
        }, i.renderTemplateForEach = function(e, t, r, o)
        {
            return new i.dependentObservable(function()
            {
                var a = i.utils.unwrapObservable(t) || [];
                "undefined" == typeof a.length && (a = [a]);
                var s = i.utils.arrayFilter(a, function(e)
                {
                    return r.includeDestroyed || !e._destroy;
                });
                i.utils.setDomNodeChildrenFromArrayMapping(o, s, function(t)
                {
                    var i = "function" == typeof e ? e(t) : e;
                    return n(null, "ignoreTargetNode", i, t, r);
                }, r);
            }, null,
            {
                disposeWhenNodeIsRemoved: o
            });
        };
        var a = "__ko__templateSubscriptionDomDataKey__";
        i.bindingHandlers.template = {
            update: function(e, t, n, o)
            {
                var a, s = i.utils.unwrapObservable(t()),
                    l = "string" == typeof s ? s : s.name;
                if ("undefined" != typeof s.foreach) a = i.renderTemplateForEach(l, s.foreach || [],
                {
                    templateOptions: s.templateOptions,
                    afterAdd: s.afterAdd,
                    beforeRemove: s.beforeRemove,
                    includeDestroyed: s.includeDestroyed,
                    afterRender: s.afterRender
                }, e);
                else
                {
                    var u = s.data;
                    a = i.renderTemplate(l, "undefined" == typeof u ? o : u,
                    {
                        templateOptions: s.templateOptions,
                        afterRender: s.afterRender
                    }, e);
                }
                r(e, a);
            }
        };
    }(), i.exportSymbol("ko.setTemplateEngine", i.setTemplateEngine), i.exportSymbol("ko.renderTemplate", i.renderTemplate),

    function()
    {
        function e(e, n, i)
        {
            for (var r = [], o = 0; o <= n.length; o++) r[o] = [];
            for (var o = 0, a = Math.min(e.length, i); a >= o; o++) r[0][o] = o;
            for (var o = 1, a = Math.min(n.length, i); a >= o; o++) r[o][0] = o;
            var s, l, u = e.length,
                c = n.length;
            for (s = 1; u >= s; s++)
            {
                var d = Math.max(1, s - i),
                    p = Math.min(c, s + i);
                for (l = d; p >= l; l++) if (e[s - 1] === n[l - 1]) r[l][s] = r[l - 1][s - 1];
                else
                {
                    var h = r[l - 1][s] === t ? Number.MAX_VALUE : r[l - 1][s] + 1,
                        f = r[l][s - 1] === t ? Number.MAX_VALUE : r[l][s - 1] + 1;
                    r[l][s] = Math.min(h, f);
                }
            }
            return r;
        }

        function n(e, n, i)
        {
            var r = n.length,
                o = i.length,
                a = [],
                s = e[o][r];
            if (s === t) return null;
            for (; r > 0 || o > 0;)
            {
                var l = e[o][r],
                    u = o > 0 ? e[o - 1][r] : s + 1,
                    c = r > 0 ? e[o][r - 1] : s + 1,
                    d = o > 0 && r > 0 ? e[o - 1][r - 1] : s + 1;
                (u === t || l - 1 > u) && (u = s + 1), (c === t || l - 1 > c) && (c = s + 1), l - 1 > d && (d = s + 1),
                c >= u && d > u ? (a.push(
                {
                    status: "added",
                    value: i[o - 1]
                }), o--) : u > c && d > c ? (a.push(
                {
                    status: "deleted",
                    value: n[r - 1]
                }), r--) : (a.push(
                {
                    status: "retained",
                    value: n[r - 1]
                }), o--, r--);
            }
            return a.reverse();
        }
        i.utils.compareArrays = function(r, o, a)
        {
            if (a === t) return i.utils.compareArrays(r, o, 1) || i.utils.compareArrays(r, o, 10) || i.utils.compareArrays(r, o, Number.MAX_VALUE);
            r = r || [], o = o || [];
            var s = e(r, o, a);
            return n(s, r, o);
        };
    }(), i.exportSymbol("ko.utils.compareArrays", i.utils.compareArrays),
    function()
    {
        function e(e, t, n)
        {
            var r = [],
                o = i.dependentObservable(function()
                {
                    var e = t(n) || [];
                    r.length > 0 && i.utils.replaceDomNodes(r, e), r.splice(0, r.length), i.utils.arrayPushAll(r, e);
                }, null,
                {
                    disposeWhenNodeIsRemoved: e,
                    disposeWhen: function()
                    {
                        return 0 == r.length || !i.utils.domNodeIsAttachedToDocument(r[0]);
                    }
                });
            return {
                mappedNodes: r,
                dependentObservable: o
            };
        }
        i.utils.setDomNodeChildrenFromArrayMapping = function(n, r, o, a)
        {
            r = r || [], a = a || {};
            for (var s = i.utils.domData.get(n, "setDomNodeChildrenFromArrayMapping_lastMappingResult") === t, l = i.utils.domData.get(n, "setDomNodeChildrenFromArrayMapping_lastMappingResult") || [], u = i.utils.arrayMap(l, function(e)
            {
                return e.arrayEntry;
            }), c = i.utils.compareArrays(u, r), d = [], p = 0, h = [], f = [], m = null, g = 0, v = c.length; v > g; g++) switch (c[g].status)
            {
            case "retained":
                var y = l[p];
                d.push(y), y.domNodes.length > 0 && (m = y.domNodes[y.domNodes.length - 1]), p++;
                break;

            case "deleted":
                l[p].dependentObservable.dispose(), i.utils.arrayForEach(l[p].domNodes, function(e)
                {
                    h.push(
                    {
                        element: e,
                        index: g,
                        value: c[g].value
                    }), m = e;
                }), p++;
                break;

            case "added":
                var b = e(n, o, c[g].value),
                    w = b.mappedNodes;
                d.push(
                {
                    arrayEntry: c[g].value,
                    domNodes: w,
                    dependentObservable: b.dependentObservable
                });
                for (var _ = 0, x = w.length; x > _; _++)
                {
                    var k = w[_];
                    f.push(
                    {
                        element: k,
                        index: g,
                        value: c[g].value
                    }), null == m ? n.firstChild ? n.insertBefore(k, n.firstChild) : n.appendChild(k) : m.nextSibling ? n.insertBefore(k, m.nextSibling) : n.appendChild(k),
                    m = k;
                }
            }
            i.utils.arrayForEach(h, function(e)
            {
                i.cleanNode(e.element);
            });
            var S = !1;
            if (!s)
            {
                if (a.afterAdd) for (var g = 0; g < f.length; g++) a.afterAdd(f[g].element, f[g].index, f[g].value);
                if (a.beforeRemove)
                {
                    for (var g = 0; g < h.length; g++) a.beforeRemove(h[g].element, h[g].index, h[g].value);
                    S = !0;
                }
            }
            S || i.utils.arrayForEach(h, function(e)
            {
                e.element.parentNode && e.element.parentNode.removeChild(e.element);
            }), i.utils.domData.set(n, "setDomNodeChildrenFromArrayMapping_lastMappingResult", d);
        };
    }(), i.exportSymbol("ko.utils.setDomNodeChildrenFromArrayMapping", i.utils.setDomNodeChildrenFromArrayMapping),
    i.jqueryTmplTemplateEngine = function()
    {
        this.jQueryTmplVersion = function()
        {
            return "undefined" != typeof jQuery && jQuery.tmpl ? jQuery.tmpl.tag ? jQuery.tmpl.tag.tmpl && jQuery.tmpl.tag.tmpl.open && jQuery.tmpl.tag.tmpl.open.toString().indexOf("__") >= 0 ? 3 : 2 : 1 : 0;
        }(), this.getTemplateNode = function(e)
        {
            var t = document.getElementById(e);
            if (null == t) throw new Error("Cannot find template with ID=" + e);
            return t;
        };
        var e = "__ko_apos__",
            t = new RegExp(e, "g");
        this.renderTemplate = function(e, n, i)
        {
            if (i = i || {}, 0 == this.jQueryTmplVersion) throw new Error("jquery.tmpl not detected.\nTo use KO's default template engine, reference jQuery and jquery.tmpl. See Knockout installation documentation for more details.");
            if (1 == this.jQueryTmplVersion)
            {
                var r = '<script type="text/html">' + this.getTemplateNode(e).text + "</script>",
                    o = jQuery.tmpl(r, n),
                    a = o[0].text.replace(t, "'");
                return jQuery.clean([a], document);
            }
            if (!(e in jQuery.template))
            {
                var s = this.getTemplateNode(e).text;
                jQuery.template(e, s);
            }
            n = [n];
            var l = jQuery.tmpl(e, n, i.templateOptions);
            return l.appendTo(document.createElement("div")), jQuery.fragments = {}, l;
        }, this.isTemplateRewritten = function(e)
        {
            return e in jQuery.template ? !0 : this.getTemplateNode(e).isRewritten === !0;
        }, this.rewriteTemplate = function(t, n)
        {
            var r = this.getTemplateNode(t);
            text = r.text.replace(/([\w-]+)=([\w-]+)([ >])/g, function(e, t, n, i)
            {
                return t + '="' + n + '"' + i;
            });
            var o = n(text);
            1 == this.jQueryTmplVersion && (o = i.utils.stringTrim(o), o = o.replace(/([\s\S]*?)(\${[\s\S]*?}|{{[\=a-z][\s\S]*?}}|$)/g, function()
            {
                var t = arguments[1],
                    n = arguments[2];
                return t.replace(/\'/g, e) + n;
            })), r.text = o, r.isRewritten = !0;
        }, this.createJavaScriptEvaluatorBlock = function(e)
        {
            return 1 == this.jQueryTmplVersion ? "{{= " + e + "}}" : "{{ko_code ((function() { return " + e + " })()) }}";
        }, this.addTemplate = function(e, t)
        {
            document.write("<script type='text/html' id='" + e + "'>" + t + "</script>");
        }, i.exportProperty(this, "addTemplate", this.addTemplate), this.jQueryTmplVersion > 1 && (jQuery.tmpl.tag.ko_code = {
            open: (this.jQueryTmplVersion < 3 ? "_" : "__") + ".push($1 || '');"
        });
    }, i.jqueryTmplTemplateEngine.prototype = new i.templateEngine(), i.setTemplateEngine(new i.jqueryTmplTemplateEngine()),
    i.exportSymbol("ko.jqueryTmplTemplateEngine", i.jqueryTmplTemplateEngine);
}(window), ko.exportSymbol = function(e, t)
{
    for (var n = e.split("."), i = window, r = 0; r < n.length - 1; r++) i = i[n[r]];
    i[n[n.length - 1]] = t;
}, ko.exportProperty = function(e, t, n)
{
    e[t] = n;
},
function()
{
    function e(t, n)
    {
        for (var i in n) n.hasOwnProperty(i) && n[i] && (!t[i] || t[i] instanceof Array ? t[i] = n[i] : e(t[i], n[i]));
    }

    function t(t, n)
    {
        var i = {};
        return e(i, t), e(i, n), i;
    }

    function n(e)
    {
        return e && "object" == typeof e && e.constructor == new Date().constructor ? "date" : typeof e;
    }

    function i(e, t)
    {
        return e = e || {}, (e.create instanceof Function || e.key instanceof Function || e.arrayChanged instanceof Function) && (e = {
            "": e
        }), t && (e.ignore = r(t.ignore, e.ignore), e.include = r(t.include, e.include),
        e.copy = r(t.copy, e.copy)), e.ignore = r(e.ignore, y.ignore), e.include = r(e.include, y.include),
        e.copy = r(e.copy, y.copy), e.mappedProperties = {}, e;
    }

    function r(e, t)
    {
        return e instanceof Array || (e = "undefined" === n(e) ? [] : [e]), t instanceof Array || (t = "undefined" === n(t) ? [] : [t]),
        e.concat(t);
    }

    function o(e)
    {
        var t = ko.dependentObservable;
        ko.dependentObservable = function()
        {
            var e = arguments[2] || {};
            e.deferEvaluation = !0;
            var t = new g(arguments[0], arguments[1], e);
            return t.__ko_proto__ = g, t;
        };
        var n = e();
        return ko.dependentObservable = t, n;
    }

    function a(e, i, r, l, h, g, v)
    {
        var y = ko.utils.unwrapObservable(i) instanceof Array;
        if (v = v || "", ko.mapping.isMapped(e))
        {
            var b = ko.utils.unwrapObservable(e)[m];
            r = t(b, r);
        }
        var w = function()
        {
            return r[h] && r[h].create instanceof Function;
        };
        if (l = l || new f(), l.get(i)) return e;
        if (h = h || "", y)
        {
            var _ = [],
                x = function(e)
                {
                    return e;
                };
            r[h] && r[h].key && (x = r[h].key);
            var k = function(e)
            {
                return e;
            };
            w() && (k = function(e)
            {
                return r[h].create(
                {
                    data: e,
                    parent: g
                });
            }), ko.isObservable(e) || (e = ko.observableArray([]), e.mappedRemove = function(t)
            {
                var n = "function" == typeof t ? t : function(e)
                    {
                        return e === x(t);
                    };
                return e.remove(function(e)
                {
                    return n(x(e));
                });
            }, e.mappedRemoveAll = function(t)
            {
                var n = c(t, x);
                return e.remove(function(e)
                {
                    return -1 != ko.utils.arrayIndexOf(n, x(e));
                });
            }, e.mappedDestroy = function(t)
            {
                var n = "function" == typeof t ? t : function(e)
                    {
                        return e === x(t);
                    };
                return e.destroy(function(e)
                {
                    return n(x(e));
                });
            }, e.mappedDestroyAll = function(t)
            {
                var n = c(t, x);
                return e.destroy(function(e)
                {
                    return -1 != ko.utils.arrayIndexOf(n, x(e));
                });
            }, e.mappedIndexOf = function(t)
            {
                var n = c(e(), x),
                    i = x(t);
                return ko.utils.arrayIndexOf(n, i);
            }, e.mappedCreate = function(t)
            {
                if (-1 !== e.mappedIndexOf(t)) throw new Error("There already is an object with the key that you specified.");
                var n = k(t);
                return e.push(n), n;
            });
            for (var S = c(ko.utils.unwrapObservable(e), x).sort(), C = c(i, x).sort(), E = ko.utils.compareArrays(S, C), T = {}, A = [], I = 0, B = E.length; B > I; I++)
            {
                var D, $ = E[I],
                    O = v + "[" + I + "]";
                switch ($.status)
                {
                case "added":
                    var N = u(ko.utils.unwrapObservable(i), $.value, x);
                    D = ko.utils.unwrapObservable(a(void 0, N, r, l, h, e, O));
                    var M = s(ko.utils.unwrapObservable(i), N, T);
                    A[M] = D, T[M] = !0;
                    break;

                case "retained":
                    var N = u(ko.utils.unwrapObservable(i), $.value, x);
                    D = u(e, $.value, x), a(D, N, r, l, h, e, O);
                    var M = s(ko.utils.unwrapObservable(i), N, T);
                    A[M] = D, T[M] = !0;
                    break;

                case "deleted":
                    D = u(e, $.value, x);
                }
                _.push(
                {
                    event: $.status,
                    item: D
                });
            }
            e(A), r[h] && r[h].arrayChanged && ko.utils.arrayForEach(_, function(e)
            {
                r[h].arrayChanged(e.event, e.item);
            });
        }
        else if (p(i))
        {
            if (!e)
            {
                if (w())
                {
                    var H = o(function()
                    {
                        return r[h].create(
                        {
                            data: i,
                            parent: g
                        });
                    });
                    return H;
                }
                e = {};
            }
            l.save(i, e), d(i, function(t)
            {
                var n = v.length ? v + "." + t : t;
                if (-1 == ko.utils.arrayIndexOf(r.ignore, n))
                {
                    if (-1 != ko.utils.arrayIndexOf(r.copy, n)) return e[t] = i[t], void 0;
                    var o = l.get(i[t]);
                    e[t] = o ? o : a(e[t], i[t], r, l, t, e, n), r.mappedProperties[n] = !0;
                }
            });
        }
        else switch (n(i))
        {
        case "function":
            e = i;
            break;

        default:
            ko.isWriteableObservable(e) ? e(ko.utils.unwrapObservable(i)) : e = w() ? o(function()
            {
                return r[h].create(
                {
                    data: i,
                    parent: g
                });
            }) : ko.observable(ko.utils.unwrapObservable(i));
        }
        return e;
    }

    function s(e, t, n)
    {
        for (var i = 0, r = e.length; r > i; i++) if (n[i] !== !0 && e[i] == t) return i;
        return null;
    }

    function l(e, t)
    {
        var i;
        return t && (i = t(e)), "undefined" === n(i) && (i = e), ko.utils.unwrapObservable(i);
    }

    function u(e, t, n)
    {
        var i = ko.utils.arrayFilter(ko.utils.unwrapObservable(e), function(e)
        {
            return l(e, n) == t;
        });
        if (0 == i.length) throw new Error("When calling ko.update*, the key '" + t + "' was not found!");
        if (i.length > 1 && p(i[0])) throw new Error("When calling ko.update*, the key '" + t + "' was not unique!");
        return i[0];
    }

    function c(e, t)
    {
        return ko.utils.arrayMap(ko.utils.unwrapObservable(e), function(e)
        {
            return t ? l(e, t) : e;
        });
    }

    function d(e, t)
    {
        if (e instanceof Array) for (var n = 0; n < e.length; n++) t(n);
        else for (var i in e) t(i);
    }

    function p(e)
    {
        var t = n(e);
        return "object" == t && null !== e && "undefined" !== t;
    }

    function h(e, t, n)
    {
        var i = e || "";
        return t instanceof Array ? e && (i += "[" + n + "]") : (e && (i += "."), i += n),
        i;
    }

    function f()
    {
        var e = [],
            t = [];
        this.save = function(n, i)
        {
            var r = ko.utils.arrayIndexOf(e, n);
            r >= 0 ? t[r] = i : (e.push(n), t.push(i));
        }, this.get = function(n)
        {
            var i = ko.utils.arrayIndexOf(e, n);
            return i >= 0 ? t[i] : void 0;
        };
    }
    ko.mapping = {};
    var m = "__ko_mapping__",
        g = ko.dependentObservable,
        v = {
            include: ["_destroy"],
            ignore: [],
            copy: []
        }, y = v;
    ko.mapping.fromJS = function(e, n, r)
    {
        if (0 == arguments.length) throw new Error("When calling ko.fromJS, pass the object you want to convert.");
        n = i(n);
        var o = a(r, e, n);
        return o[m] = t(o[m], n), o;
    }, ko.mapping.fromJSON = function(e, t)
    {
        var n = ko.utils.parseJson(e);
        return ko.mapping.fromJS(n, t);
    }, ko.mapping.isMapped = function(e)
    {
        var t = ko.utils.unwrapObservable(e);
        return t && t[m];
    }, ko.mapping.updateFromJS = function(e, t)
    {
        if (arguments.length < 2) throw new Error("When calling ko.updateFromJS, pass: the object to update and the object you want to update from.");
        if (!e) throw new Error("The object is undefined.");
        if (!e[m]) throw new Error("The object you are trying to update was not created by a 'fromJS' or 'fromJSON' mapping.");
        return a(e, t, e[m]);
    }, ko.mapping.updateFromJSON = function(e, t, n)
    {
        var i = ko.utils.parseJson(t);
        return ko.mapping.updateFromJS(e, i, n);
    }, ko.mapping.toJS = function(e, t)
    {
        if (y || ko.mapping.resetDefaultOptions(), 0 == arguments.length) throw new Error("When calling ko.mapping.toJS, pass the object you want to convert.");
        if (!(y.ignore instanceof Array)) throw new Error("ko.mapping.defaultOptions().ignore should be an array.");
        if (!(y.include instanceof Array)) throw new Error("ko.mapping.defaultOptions().include should be an array.");
        if (!(y.copy instanceof Array)) throw new Error("ko.mapping.defaultOptions().copy should be an array.");
        return t = i(t, e[m]), ko.mapping.visitModel(e, function(e)
        {
            return ko.utils.unwrapObservable(e);
        }, t);
    }, ko.mapping.toJSON = function(e, t)
    {
        var n = ko.mapping.toJS(e, t);
        return ko.utils.stringifyJson(n);
    }, ko.mapping.defaultOptions = function()
    {
        return arguments.length > 0 ? (y = arguments[0], void 0) : y;
    }, ko.mapping.resetDefaultOptions = function()
    {
        y = {
            include: v.include.slice(0),
            ignore: v.ignore.slice(0),
            copy: v.copy.slice(0)
        };
    }, ko.mapping.visitModel = function(e, t, r)
    {
        r = r || {}, r.visitedObjects = r.visitedObjects || new f(), r.parentName || (r = i(r));
        var o, a = ko.utils.unwrapObservable(e);
        if (!p(a)) return t(e, r.parentName);
        t(e, r.parentName), o = a instanceof Array ? [] : {}, r.visitedObjects.save(e, o);
        var s = r.parentName;
        return d(a, function(e)
        {
            if (!r.ignore || -1 == ko.utils.arrayIndexOf(r.ignore, e))
            {
                var i = a[e];
                if (r.parentName = h(s, a, e), - 1 !== ko.utils.arrayIndexOf(r.copy, e) || -1 !== ko.utils.arrayIndexOf(r.include, e) || !a[m] || !a[m].mappedProperties || a[m].mappedProperties[e] || a instanceof Array)
                {
                    switch (n(ko.utils.unwrapObservable(i)))
                    {
                    case "object":
                    case "undefined":
                        var l = r.visitedObjects.get(i);
                        o[e] = "undefined" !== n(l) ? l : ko.mapping.visitModel(i, t, r);
                        break;

                    default:
                        o[e] = t(i, r.parentName);
                    }
                }
            }
        }), o;
    }, ko.exportSymbol("ko.mapping", ko.mapping), ko.exportSymbol("ko.mapping.fromJS", ko.mapping.fromJS),
    ko.exportSymbol("ko.mapping.fromJSON", ko.mapping.fromJSON), ko.exportSymbol("ko.mapping.isMapped", ko.mapping.isMapped),
    ko.exportSymbol("ko.mapping.defaultOptions", ko.mapping.defaultOptions), ko.exportSymbol("ko.mapping.toJS", ko.mapping.toJS),
    ko.exportSymbol("ko.mapping.toJSON", ko.mapping.toJSON), ko.exportSymbol("ko.mapping.updateFromJS", ko.mapping.updateFromJS),
    ko.exportSymbol("ko.mapping.updateFromJSON", ko.mapping.updateFromJSON), ko.exportSymbol("ko.mapping.visitModel", ko.mapping.visitModel);
}(),
function(e)
{
    var t = "data-bind";
    e.currentlyBindingNamespace = "", e.applyBindings = function(n, i, r)
    {
        i && void 0 !== i.nodeType ? (r = i, i = "") : (i = i || "", r = r || window.document.body),
        e.currentlyBindingNamespace = i;
        var o = i.length > 0 ? "-" + i : "",
            a = t + o,
            s = e.utils.getElementsHavingAttribute(r, a);
        e.utils.arrayForEach(s, function(t)
        {
            e.applyBindingsToNode(t, null, n, a);
        }), e.currentlyBindingNamespace = "";
    }, e.templateRewriting = function()
    {
        var t = /(<[a-z]+\d*(\s+(?!data-bind(-[a-z0-9\-]*)?=)[a-z0-9\-]+(=(\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind(-[a-z0-9\-]*)?=(["'])([\s\S]*?)\7/gi;
        return {
            ensureTemplateIsRewritten: function(t, n)
            {
                n.isTemplateRewritten(t) || n.rewriteTemplate(t, function(t)
                {
                    return e.templateRewriting.memoizeBindingAttributeSyntax(t, n);
                });
            },
            memoizeBindingAttributeSyntax: function(n, i)
            {
                return n.replace(t, function(t)
                {
                    var n = arguments[1],
                        r = arguments[8],
                        o = arguments[6] ? arguments[6].slice(1) : "";
                    if ("" === o || o === e.currentlyBindingNamespace)
                    {
                        r = e.jsonExpressionRewriting.insertPropertyAccessorsIntoJson(r);
                        var a = "ko.templateRewriting.applyMemoizedBindingsToNextSibling(function() {                         return (function() { return { " + r + " } })()                     })";
                        return i.createJavaScriptEvaluatorBlock(a) + n;
                    }
                    return t;
                });
            },
            applyMemoizedBindingsToNextSibling: function(t)
            {
                return e.memoization.memoize(function(n, i)
                {
                    n.nextSibling && e.applyBindingsToNode(n.nextSibling, t, i);
                });
            }
        };
    }();
}(ko),
function()
{
    function e(t, n, i)
    {
        if (t === n) return 0 !== t || 1 / t == 1 / n;
        if (null == t || null == n) return t === n;
        if (t._chain && (t = t._wrapped), n._chain && (n = n._wrapped), t.isEqual && k.isFunction(t.isEqual)) return t.isEqual(n);
        if (n.isEqual && k.isFunction(n.isEqual)) return n.isEqual(t);
        var r = u.call(t);
        if (r != u.call(n)) return !1;
        switch (r)
        {
        case "[object String]":
            return t == String(n);

        case "[object Number]":
            return t != +t ? n != +n : 0 == t ? 1 / t == 1 / n : t == +n;

        case "[object Date]":
        case "[object Boolean]":
            return +t == +n;

        case "[object RegExp]":
            return t.source == n.source && t.global == n.global && t.multiline == n.multiline && t.ignoreCase == n.ignoreCase;
        }
        if ("object" != typeof t || "object" != typeof n) return !1;
        for (var o = i.length; o--;) if (i[o] == t) return !0;
        i.push(t);
        var a = 0,
            s = !0;
        if ("[object Array]" == r)
        {
            if (a = t.length, s = a == n.length) for (; a-- && (s = a in t == a in n && e(t[a], n[a], i)););
        }
        else
        {
            if ("constructor" in t != "constructor" in n || t.constructor != n.constructor) return !1;
            for (var l in t) if (k.has(t, l) && (a++, !(s = k.has(n, l) && e(t[l], n[l], i)))) break;
            if (s)
            {
                for (l in n) if (k.has(n, l) && !a--) break;
                s = !a;
            }
        }
        return i.pop(), s;
    }
    var t = this,
        n = t._,
        i = {}, r = Array.prototype,
        o = Object.prototype,
        a = Function.prototype,
        s = r.slice,
        l = r.unshift,
        u = o.toString,
        c = o.hasOwnProperty,
        d = r.forEach,
        p = r.map,
        h = r.reduce,
        f = r.reduceRight,
        m = r.filter,
        g = r.every,
        v = r.some,
        y = r.indexOf,
        b = r.lastIndexOf,
        w = Array.isArray,
        _ = Object.keys,
        x = a.bind,
        k = function(e)
        {
            return new B(e);
        };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = k),
    exports._ = k) : t._ = k, k.VERSION = "1.3.1";
    var S = k.each = k.forEach = function(e, t, n)
    {
        if (null != e) if (d && e.forEach === d) e.forEach(t, n);
        else if (e.length === +e.length)
        {
            for (var r = 0, o = e.length; o > r; r++) if (r in e && t.call(n, e[r], r, e) === i) return;
        }
        else for (var a in e) if (k.has(e, a) && t.call(n, e[a], a, e) === i) return;
    };
    k.map = k.collect = function(e, t, n)
    {
        var i = [];
        return null == e ? i : p && e.map === p ? e.map(t, n) : (S(e, function(e, r, o)
        {
            i[i.length] = t.call(n, e, r, o);
        }), e.length === +e.length && (i.length = e.length), i);
    }, k.reduce = k.foldl = k.inject = function(e, t, n, i)
    {
        var r = arguments.length > 2;
        if (null == e && (e = []), h && e.reduce === h) return i && (t = k.bind(t, i)),
        r ? e.reduce(t, n) : e.reduce(t);
        if (S(e, function(e, o, a)
        {
            r ? n = t.call(i, n, e, o, a) : (n = e, r = !0);
        }), !r) throw new TypeError("Reduce of empty array with no initial value");
        return n;
    }, k.reduceRight = k.foldr = function(e, t, n, i)
    {
        var r = arguments.length > 2;
        if (null == e && (e = []), f && e.reduceRight === f) return i && (t = k.bind(t, i)),
        r ? e.reduceRight(t, n) : e.reduceRight(t);
        var o = k.toArray(e).reverse();
        return i && !r && (t = k.bind(t, i)), r ? k.reduce(o, t, n, i) : k.reduce(o, t);
    }, k.find = k.detect = function(e, t, n)
    {
        var i;
        return C(e, function(e, r, o)
        {
            return t.call(n, e, r, o) ? (i = e, !0) : void 0;
        }), i;
    }, k.filter = k.select = function(e, t, n)
    {
        var i = [];
        return null == e ? i : m && e.filter === m ? e.filter(t, n) : (S(e, function(e, r, o)
        {
            t.call(n, e, r, o) && (i[i.length] = e);
        }), i);
    }, k.reject = function(e, t, n)
    {
        var i = [];
        return null == e ? i : (S(e, function(e, r, o)
        {
            t.call(n, e, r, o) || (i[i.length] = e);
        }), i);
    }, k.every = k.all = function(e, t, n)
    {
        var r = !0;
        return null == e ? r : g && e.every === g ? e.every(t, n) : (S(e, function(e, o, a)
        {
            return (r = r && t.call(n, e, o, a)) ? void 0 : i;
        }), r);
    };
    var C = k.some = k.any = function(e, t, n)
    {
        t || (t = k.identity);
        var r = !1;
        return null == e ? r : v && e.some === v ? e.some(t, n) : (S(e, function(e, o, a)
        {
            return r || (r = t.call(n, e, o, a)) ? i : void 0;
        }), !! r);
    };
    k.include = k.contains = function(e, t)
    {
        var n = !1;
        return null == e ? n : y && e.indexOf === y ? -1 != e.indexOf(t) : n = C(e, function(e)
        {
            return e === t;
        });
    }, k.invoke = function(e, t)
    {
        var n = s.call(arguments, 2);
        return k.map(e, function(e)
        {
            return (k.isFunction(t) ? t || e : e[t]).apply(e, n);
        });
    }, k.pluck = function(e, t)
    {
        return k.map(e, function(e)
        {
            return e[t];
        });
    }, k.max = function(e, t, n)
    {
        if (!t && k.isArray(e)) return Math.max.apply(Math, e);
        if (!t && k.isEmpty(e)) return -1 / 0;
        var i = {
            computed: -1 / 0
        };
        return S(e, function(e, r, o)
        {
            var a = t ? t.call(n, e, r, o) : e;
            a >= i.computed && (i = {
                value: e,
                computed: a
            });
        }), i.value;
    }, k.min = function(e, t, n)
    {
        if (!t && k.isArray(e)) return Math.min.apply(Math, e);
        if (!t && k.isEmpty(e)) return 1 / 0;
        var i = {
            computed: 1 / 0
        };
        return S(e, function(e, r, o)
        {
            var a = t ? t.call(n, e, r, o) : e;
            a < i.computed && (i = {
                value: e,
                computed: a
            });
        }), i.value;
    }, k.shuffle = function(e)
    {
        var t, n = [];
        return S(e, function(e, i)
        {
            0 == i ? n[0] = e : (t = Math.floor(Math.random() * (i + 1)), n[i] = n[t], n[t] = e);
        }), n;
    }, k.sortBy = function(e, t, n)
    {
        return k.pluck(k.map(e, function(e, i, r)
        {
            return {
                value: e,
                criteria: t.call(n, e, i, r)
            };
        }).sort(function(e, t)
        {
            var n = e.criteria,
                i = t.criteria;
            return i > n ? -1 : n > i ? 1 : 0;
        }), "value");
    }, k.groupBy = function(e, t)
    {
        var n = {}, i = k.isFunction(t) ? t : function(e)
            {
                return e[t];
            };
        return S(e, function(e, t)
        {
            var r = i(e, t);
            (n[r] || (n[r] = [])).push(e);
        }), n;
    }, k.sortedIndex = function(e, t, n)
    {
        n || (n = k.identity);
        for (var i = 0, r = e.length; r > i;)
        {
            var o = i + r >> 1;
            n(e[o]) < n(t) ? i = o + 1 : r = o;
        }
        return i;
    }, k.toArray = function(e)
    {
        return e ? e.toArray ? e.toArray() : k.isArray(e) ? s.call(e) : k.isArguments(e) ? s.call(e) : k.values(e) : [];
    }, k.size = function(e)
    {
        return k.toArray(e).length;
    }, k.first = k.head = function(e, t, n)
    {
        return null == t || n ? e[0] : s.call(e, 0, t);
    }, k.initial = function(e, t, n)
    {
        return s.call(e, 0, e.length - (null == t || n ? 1 : t));
    }, k.last = function(e, t, n)
    {
        return null == t || n ? e[e.length - 1] : s.call(e, Math.max(e.length - t, 0));
    }, k.rest = k.tail = function(e, t, n)
    {
        return s.call(e, null == t || n ? 1 : t);
    }, k.compact = function(e)
    {
        return k.filter(e, function(e)
        {
            return !!e;
        });
    }, k.flatten = function(e, t)
    {
        return k.reduce(e, function(e, n)
        {
            return k.isArray(n) ? e.concat(t ? n : k.flatten(n)) : (e[e.length] = n, e);
        }, []);
    }, k.without = function(e)
    {
        return k.difference(e, s.call(arguments, 1));
    }, k.uniq = k.unique = function(e, t, n)
    {
        var i = n ? k.map(e, n) : e,
            r = [];
        return k.reduce(i, function(n, i, o)
        {
            return 0 != o && (t === !0 ? k.last(n) == i : k.include(n, i)) || (n[n.length] = i,
            r[r.length] = e[o]), n;
        }, []), r;
    }, k.union = function()
    {
        return k.uniq(k.flatten(arguments, !0));
    }, k.intersection = k.intersect = function(e)
    {
        var t = s.call(arguments, 1);
        return k.filter(k.uniq(e), function(e)
        {
            return k.every(t, function(t)
            {
                return k.indexOf(t, e) >= 0;
            });
        });
    }, k.difference = function(e)
    {
        var t = k.flatten(s.call(arguments, 1));
        return k.filter(e, function(e)
        {
            return !k.include(t, e);
        });
    }, k.zip = function()
    {
        for (var e = s.call(arguments), t = k.max(k.pluck(e, "length")), n = new Array(t), i = 0; t > i; i++) n[i] = k.pluck(e, "" + i);
        return n;
    }, k.indexOf = function(e, t, n)
    {
        if (null == e) return -1;
        var i, r;
        if (n) return i = k.sortedIndex(e, t), e[i] === t ? i : -1;
        if (y && e.indexOf === y) return e.indexOf(t);
        for (i = 0, r = e.length; r > i; i++) if (i in e && e[i] === t) return i;
        return -1;
    }, k.lastIndexOf = function(e, t)
    {
        if (null == e) return -1;
        if (b && e.lastIndexOf === b) return e.lastIndexOf(t);
        for (var n = e.length; n--;) if (n in e && e[n] === t) return n;
        return -1;
    }, k.range = function(e, t, n)
    {
        arguments.length <= 1 && (t = e || 0, e = 0), n = arguments[2] || 1;
        for (var i = Math.max(Math.ceil((t - e) / n), 0), r = 0, o = new Array(i); i > r;) o[r++] = e,
        e += n;
        return o;
    };
    var E = function()
    {};
    k.bind = function(e, t)
    {
        var n, i;
        if (e.bind === x && x) return x.apply(e, s.call(arguments, 1));
        if (!k.isFunction(e)) throw new TypeError();
        return i = s.call(arguments, 2), n = function()
        {
            if (!(this instanceof n)) return e.apply(t, i.concat(s.call(arguments)));
            E.prototype = e.prototype;
            var r = new E(),
                o = e.apply(r, i.concat(s.call(arguments)));
            return Object(o) === o ? o : r;
        };
    }, k.bindAll = function(e)
    {
        var t = s.call(arguments, 1);
        return 0 == t.length && (t = k.functions(e)), S(t, function(t)
        {
            e[t] = k.bind(e[t], e);
        }), e;
    }, k.memoize = function(e, t)
    {
        var n = {};
        return t || (t = k.identity),
        function()
        {
            var i = t.apply(this, arguments);
            return k.has(n, i) ? n[i] : n[i] = e.apply(this, arguments);
        };
    }, k.delay = function(e, t)
    {
        var n = s.call(arguments, 2);
        return setTimeout(function()
        {
            return e.apply(e, n);
        }, t);
    }, k.defer = function(e)
    {
        return k.delay.apply(k, [e, 1].concat(s.call(arguments, 1)));
    }, k.throttle = function(e, t)
    {
        var n, i, r, o, a, s = k.debounce(function()
        {
            a = o = !1;
        }, t);
        return function()
        {
            n = this, i = arguments;
            var l = function()
            {
                r = null, a && e.apply(n, i), s();
            };
            r || (r = setTimeout(l, t)), o ? a = !0 : e.apply(n, i), s(), o = !0;
        };
    }, k.debounce = function(e, t)
    {
        var n;
        return function()
        {
            var i = this,
                r = arguments,
                o = function()
                {
                    n = null, e.apply(i, r);
                };
            clearTimeout(n), n = setTimeout(o, t);
        };
    }, k.once = function(e)
    {
        var t, n = !1;
        return function()
        {
            return n ? t : (n = !0, t = e.apply(this, arguments));
        };
    }, k.wrap = function(e, t)
    {
        return function()
        {
            var n = [e].concat(s.call(arguments, 0));
            return t.apply(this, n);
        };
    }, k.compose = function()
    {
        var e = arguments;
        return function()
        {
            for (var t = arguments, n = e.length - 1; n >= 0; n--) t = [e[n].apply(this, t)];
            return t[0];
        };
    }, k.after = function(e, t)
    {
        return 0 >= e ? t() : function()
        {
            return --e < 1 ? t.apply(this, arguments) : void 0;
        };
    }, k.keys = _ || function(e)
    {
        if (e !== Object(e)) throw new TypeError("Invalid object");
        var t = [];
        for (var n in e) k.has(e, n) && (t[t.length] = n);
        return t;
    }, k.values = function(e)
    {
        return k.map(e, k.identity);
    }, k.functions = k.methods = function(e)
    {
        var t = [];
        for (var n in e) k.isFunction(e[n]) && t.push(n);
        return t.sort();
    }, k.extend = function(e)
    {
        return S(s.call(arguments, 1), function(t)
        {
            for (var n in t) e[n] = t[n];
        }), e;
    }, k.defaults = function(e)
    {
        return S(s.call(arguments, 1), function(t)
        {
            for (var n in t) null == e[n] && (e[n] = t[n]);
        }), e;
    }, k.clone = function(e)
    {
        return k.isObject(e) ? k.isArray(e) ? e.slice() : k.extend(
        {}, e) : e;
    }, k.tap = function(e, t)
    {
        return t(e), e;
    }, k.isEqual = function(t, n)
    {
        return e(t, n, []);
    }, k.isEmpty = function(e)
    {
        if (k.isArray(e) || k.isString(e)) return 0 === e.length;
        for (var t in e) if (k.has(e, t)) return !1;
        return !0;
    }, k.isElement = function(e)
    {
        return !(!e || 1 != e.nodeType);
    }, k.isArray = w || function(e)
    {
        return "[object Array]" == u.call(e);
    }, k.isObject = function(e)
    {
        return e === Object(e);
    }, k.isArguments = function(e)
    {
        return "[object Arguments]" == u.call(e);
    }, k.isArguments(arguments) || (k.isArguments = function(e)
    {
        return !(!e || !k.has(e, "callee"));
    }), k.isFunction = function(e)
    {
        return "[object Function]" == u.call(e);
    }, k.isString = function(e)
    {
        return "[object String]" == u.call(e);
    }, k.isNumber = function(e)
    {
        return "[object Number]" == u.call(e);
    }, k.isNaN = function(e)
    {
        return e !== e;
    }, k.isBoolean = function(e)
    {
        return e === !0 || e === !1 || "[object Boolean]" == u.call(e);
    }, k.isDate = function(e)
    {
        return "[object Date]" == u.call(e);
    }, k.isRegExp = function(e)
    {
        return "[object RegExp]" == u.call(e);
    }, k.isNull = function(e)
    {
        return null === e;
    }, k.isUndefined = function(e)
    {
        return void 0 === e;
    }, k.has = function(e, t)
    {
        return c.call(e, t);
    }, k.noConflict = function()
    {
        return t._ = n, this;
    }, k.identity = function(e)
    {
        return e;
    }, k.times = function(e, t, n)
    {
        for (var i = 0; e > i; i++) t.call(n, i);
    }, k.escape = function(e)
    {
        return ("" + e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
    }, k.mixin = function(e)
    {
        S(k.functions(e), function(t)
        {
            $(t, k[t] = e[t]);
        });
    };
    var T = 0;
    k.uniqueId = function(e)
    {
        var t = T++;
        return e ? e + t : t;
    }, k.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var A = /.^/,
        I = function(e)
        {
            return e.replace(/\\\\/g, "\\").replace(/\\'/g, "'");
        };
    k.template = function(e, t)
    {
        var n = k.templateSettings,
            i = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(n.escape || A, function(e, t)
            {
                return "',_.escape(" + I(t) + "),'";
            }).replace(n.interpolate || A, function(e, t)
            {
                return "'," + I(t) + ",'";
            }).replace(n.evaluate || A, function(e, t)
            {
                return "');" + I(t).replace(/[\r\n\t]/g, " ") + ";__p.push('";
            }).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');",
            r = new Function("obj", "_", i);
        return t ? r(t, k) : function(e)
        {
            return r.call(this, e, k);
        };
    }, k.chain = function(e)
    {
        return k(e).chain();
    };
    var B = function(e)
    {
        this._wrapped = e;
    };
    k.prototype = B.prototype;
    var D = function(e, t)
    {
        return t ? k(e).chain() : e;
    }, $ = function(e, t)
    {
        B.prototype[e] = function()
        {
            var e = s.call(arguments);
            return l.call(e, this._wrapped), D(t.apply(k, e), this._chain);
        };
    };
    k.mixin(k), S(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e)
    {
        var t = r[e];
        B.prototype[e] = function()
        {
            var n = this._wrapped;
            t.apply(n, arguments);
            var i = n.length;
            return "shift" != e && "splice" != e || 0 !== i || delete n[0], D(n, this._chain);
        };
    }), S(["concat", "join", "slice"], function(e)
    {
        var t = r[e];
        B.prototype[e] = function()
        {
            return D(t.apply(this._wrapped, arguments), this._chain);
        };
    }), B.prototype.chain = function()
    {
        return this._chain = !0, this;
    }, B.prototype.value = function()
    {
        return this._wrapped;
    };
}.call(this),
/*!
 * fancyBox - jQuery Plugin
 * version: 2.1.5 (Fri, 14 Jun 2013)
 * @requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */

function(e, t, n, i)
{
    "use strict";
    var r = n("html"),
        o = n(e),
        a = n(t),
        s = n.fancybox = function()
        {
            s.open.apply(this, arguments);
        }, l = navigator.userAgent.match(/msie/i),
        u = null,
        c = t.createTouch !== i,
        d = function(e)
        {
            return e && e.hasOwnProperty && e instanceof n;
        }, p = function(e)
        {
            return e && "string" === n.type(e);
        }, h = function(e)
        {
            return p(e) && e.indexOf("%") > 0;
        }, f = function(e)
        {
            return e && !(e.style.overflow && "hidden" === e.style.overflow) && (e.clientWidth && e.scrollWidth > e.clientWidth || e.clientHeight && e.scrollHeight > e.clientHeight);
        }, m = function(e, t)
        {
            var n = parseInt(e, 10) || 0;
            return t && h(e) && (n = s.getViewport()[t] / 100 * n), Math.ceil(n);
        }, g = function(e, t)
        {
            return m(e, t) + "px";
        };
    n.extend(s,
    {
        version: "2.1.5",
        defaults: {
            padding: 15,
            margin: 20,
            width: 800,
            height: 600,
            minWidth: 100,
            minHeight: 100,
            maxWidth: 9999,
            maxHeight: 9999,
            pixelRatio: 1,
            autoSize: !0,
            autoHeight: !1,
            autoWidth: !1,
            autoResize: !0,
            autoCenter: !c,
            fitToView: !0,
            aspectRatio: !1,
            topRatio: .5,
            leftRatio: .5,
            scrolling: "auto",
            wrapCSS: "",
            arrows: !0,
            closeBtn: !0,
            closeClick: !1,
            nextClick: !1,
            mouseWheel: !0,
            autoPlay: !1,
            playSpeed: 3e3,
            preload: 3,
            modal: !1,
            loop: !0,
            ajax: {
                dataType: "html",
                headers: {
                    "X-fancyBox": !0
                }
            },
            iframe: {
                scrolling: "auto",
                preload: !0
            },
            swf: {
                wmode: "transparent",
                allowfullscreen: "true",
                allowscriptaccess: "always"
            },
            keys: {
                next: {
                    13: "left",
                    34: "up",
                    39: "left",
                    40: "up"
                },
                prev: {
                    8: "right",
                    33: "down",
                    37: "right",
                    38: "down"
                },
                close: [27],
                play: [32],
                toggle: [70]
            },
            direction: {
                next: "left",
                prev: "right"
            },
            scrollOutside: !0,
            index: 0,
            type: null,
            href: null,
            content: null,
            title: null,
            tpl: {
                wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                image: '<img class="fancybox-image" src="{href}" alt="" />',
                iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (l ? ' allowtransparency="true"' : "") + "></iframe>",
                error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
            },
            openEffect: "fade",
            openSpeed: 250,
            openEasing: "swing",
            openOpacity: !0,
            openMethod: "zoomIn",
            closeEffect: "fade",
            closeSpeed: 250,
            closeEasing: "swing",
            closeOpacity: !0,
            closeMethod: "zoomOut",
            nextEffect: "elastic",
            nextSpeed: 250,
            nextEasing: "swing",
            nextMethod: "changeIn",
            prevEffect: "elastic",
            prevSpeed: 250,
            prevEasing: "swing",
            prevMethod: "changeOut",
            helpers: {
                overlay: !0,
                title: !0
            },
            onCancel: n.noop,
            beforeLoad: n.noop,
            afterLoad: n.noop,
            beforeShow: n.noop,
            afterShow: n.noop,
            beforeChange: n.noop,
            beforeClose: n.noop,
            afterClose: n.noop
        },
        group: {},
        opts: {},
        previous: null,
        coming: null,
        current: null,
        isActive: !1,
        isOpen: !1,
        isOpened: !1,
        wrap: null,
        skin: null,
        outer: null,
        inner: null,
        player: {
            timer: null,
            isActive: !1
        },
        ajaxLoad: null,
        imgPreload: null,
        transitions: {},
        helpers: {},
        open: function(e, t)
        {
            return e && (n.isPlainObject(t) || (t = {}), !1 !== s.close(!0)) ? (n.isArray(e) || (e = d(e) ? n(e).get() : [e]),
            n.each(e, function(r, o)
            {
                var a, l, u, c, h, f, m, g = {};
                "object" === n.type(o) && (o.nodeType && (o = n(o)), d(o) ? (g = {
                    href: o.data("fancybox-href") || o.attr("href"),
                    title: o.data("fancybox-title") || o.attr("title"),
                    isDom: !0,
                    element: o
                }, n.metadata && n.extend(!0, g, o.metadata())) : g = o), a = t.href || g.href || (p(o) ? o : null),
                l = t.title !== i ? t.title : g.title || "", u = t.content || g.content, c = u ? "html" : t.type || g.type, !c && g.isDom && (c = o.data("fancybox-type"), c || (h = o.prop("class").match(/fancybox\.(\w+)/),
                c = h ? h[1] : null)), p(a) && (c || (s.isImage(a) ? c = "image" : s.isSWF(a) ? c = "swf" : "#" === a.charAt(0) ? c = "inline" : p(o) && (c = "html",
                u = o)), "ajax" === c && (f = a.split(/\s+/, 2), a = f.shift(), m = f.shift())),
                u || ("inline" === c ? a ? u = n(p(a) ? a.replace(/.*(?=#[^\s]+$)/, "") : a) : g.isDom && (u = o) : "html" === c ? u = a : c || a || !g.isDom || (c = "inline",
                u = o)), n.extend(g,
                {
                    href: a,
                    type: c,
                    content: u,
                    title: l,
                    selector: m
                }), e[r] = g;
            }), s.opts = n.extend(!0,
            {}, s.defaults, t), t.keys !== i && (s.opts.keys = t.keys ? n.extend(
            {}, s.defaults.keys, t.keys) : !1),
            s.group = e, s._start(s.opts.index)) : void 0;
        },
        cancel: function()
        {
            var e = s.coming;
            e && !1 !== s.trigger("onCancel") && (s.hideLoading(), s.ajaxLoad && s.ajaxLoad.abort(),
            s.ajaxLoad = null, s.imgPreload && (s.imgPreload.onload = s.imgPreload.onerror = null),
            e.wrap && e.wrap.stop(!0, !0).trigger("onReset").remove(), s.coming = null, s.current || s._afterZoomOut(e));
        },
        close: function(e)
        {
            s.cancel(), !1 !== s.trigger("beforeClose") && (s.unbindEvents(), s.isActive && (s.isOpen && e !== !0 ? (s.isOpen = s.isOpened = !1,
            s.isClosing = !0, n(".fancybox-item, .fancybox-nav").remove(), s.wrap.stop(!0, !0).removeClass("fancybox-opened"),
            s.transitions[s.current.closeMethod]()) : (n(".fancybox-wrap").stop(!0).trigger("onReset").remove(),
            s._afterZoomOut())));
        },
        play: function(e)
        {
            var t = function()
            {
                clearTimeout(s.player.timer);
            }, n = function()
            {
                t(), s.current && s.player.isActive && (s.player.timer = setTimeout(s.next, s.current.playSpeed));
            }, i = function()
            {
                t(), a.unbind(".player"), s.player.isActive = !1, s.trigger("onPlayEnd");
            }, r = function()
            {
                s.current && (s.current.loop || s.current.index < s.group.length - 1) && (s.player.isActive = !0,
                a.bind(
                {
                    "onCancel.player beforeClose.player": i,
                    "onUpdate.player": n,
                    "beforeLoad.player": t
                }), n(), s.trigger("onPlayStart"));
            };
            e === !0 || !s.player.isActive && e !== !1 ? r() : i();
        },
        next: function(e)
        {
            var t = s.current;
            t && (p(e) || (e = t.direction.next), s.jumpto(t.index + 1, e, "next"));
        },
        prev: function(e)
        {
            var t = s.current;
            t && (p(e) || (e = t.direction.prev), s.jumpto(t.index - 1, e, "prev"));
        },
        jumpto: function(e, t, n)
        {
            var r = s.current;
            r && (e = m(e), s.direction = t || r.direction[e >= r.index ? "next" : "prev"], s.router = n || "jumpto",
            r.loop && (0 > e && (e = r.group.length + e % r.group.length), e %= r.group.length),
            r.group[e] !== i && (s.cancel(), s._start(e)));
        },
        reposition: function(e, t)
        {
            var i, r = s.current,
                o = r ? r.wrap : null;
            o && (i = s._getPosition(t), e && "scroll" === e.type ? (delete i.position, o.stop(!0, !0).animate(i, 200)) : (o.css(i),
            r.pos = n.extend(
            {}, r.dim, i)));
        },
        update: function(e)
        {
            var t = e && e.type,
                n = !t || "orientationchange" === t;
            n && (clearTimeout(u), u = null), s.isOpen && !u && (u = setTimeout(function()
            {
                var i = s.current;
                i && !s.isClosing && (s.wrap.removeClass("fancybox-tmp"), (n || "load" === t || "resize" === t && i.autoResize) && s._setDimension(), "scroll" === t && i.canShrink || s.reposition(e), s.trigger("onUpdate"), u = null);
            }, n && !c ? 0 : 300));
        },
        toggle: function(e)
        {
            s.isOpen && (s.current.fitToView = "boolean" === n.type(e) ? e : !s.current.fitToView,
            c && (s.wrap.removeAttr("style").addClass("fancybox-tmp"), s.trigger("onUpdate")),
            s.update());
        },
        hideLoading: function()
        {
            a.unbind(".loading"), n("#fancybox-loading").remove();
        },
        showLoading: function()
        {
            var e, t;
            s.hideLoading(), e = n('<div id="fancybox-loading"><div></div></div>').click(s.cancel).appendTo("body"),
            a.bind("keydown.loading", function(e)
            {
                27 === (e.which || e.keyCode) && (e.preventDefault(), s.cancel());
            }), s.defaults.fixed || (t = s.getViewport(), e.css(
            {
                position: "absolute",
                top: .5 * t.h + t.y,
                left: .5 * t.w + t.x
            }));
        },
        getViewport: function()
        {
            var t = s.current && s.current.locked || !1,
                n = {
                    x: o.scrollLeft(),
                    y: o.scrollTop()
                };
            return t ? (n.w = t[0].clientWidth, n.h = t[0].clientHeight) : (n.w = c && e.innerWidth ? e.innerWidth : o.width(),
            n.h = c && e.innerHeight ? e.innerHeight : o.height()), n;
        },
        unbindEvents: function()
        {
            s.wrap && d(s.wrap) && s.wrap.unbind(".fb"), a.unbind(".fb"), o.unbind(".fb");
        },
        bindEvents: function()
        {
            var e, t = s.current;
            t && (o.bind("orientationchange.fb" + (c ? "" : " resize.fb") + (t.autoCenter && !t.locked ? " scroll.fb" : ""), s.update),
            e = t.keys, e && a.bind("keydown.fb", function(r)
            {
                var o = r.which || r.keyCode,
                    a = r.target || r.srcElement;
                return 27 === o && s.coming ? !1 : (r.ctrlKey || r.altKey || r.shiftKey || r.metaKey || a && (a.type || n(a).is("[contenteditable]")) || n.each(e, function(e, a)
                {
                    return t.group.length > 1 && a[o] !== i ? (s[e](a[o]), r.preventDefault(), !1) : n.inArray(o, a) > -1 ? (s[e](),
                    r.preventDefault(), !1) : void 0;
                }), void 0);
            }), n.fn.mousewheel && t.mouseWheel && s.wrap.bind("mousewheel.fb", function(e, i, r, o)
            {
                for (var a = e.target || null, l = n(a), u = !1; l.length && !(u || l.is(".fancybox-skin") || l.is(".fancybox-wrap"));) u = f(l[0]),
                l = n(l).parent();
                0 === i || u || s.group.length > 1 && !t.canShrink && (o > 0 || r > 0 ? s.prev(o > 0 ? "down" : "left") : (0 > o || 0 > r) && s.next(0 > o ? "up" : "right"),
                e.preventDefault());
            }));
        },
        trigger: function(e, t)
        {
            var i, r = t || s.coming || s.current;
            if (r)
            {
                if (n.isFunction(r[e]) && (i = r[e].apply(r, Array.prototype.slice.call(arguments, 1))),
                i === !1) return !1;
                r.helpers && n.each(r.helpers, function(t, i)
                {
                    i && s.helpers[t] && n.isFunction(s.helpers[t][e]) && s.helpers[t][e](n.extend(!0,
                    {}, s.helpers[t].defaults, i), r);
                }), a.trigger(e);
            }
        },
        isImage: function(e)
        {
            return p(e) && e.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
        },
        isSWF: function(e)
        {
            return p(e) && e.match(/\.(swf)((\?|#).*)?$/i);
        },
        _start: function(e)
        {
            var t, i, r, o, a, l = {};
            if (e = m(e), t = s.group[e] || null, !t) return !1;
            if (l = n.extend(!0,
            {}, s.opts, t), o = l.margin, a = l.padding, "number" === n.type(o) && (l.margin = [o, o, o, o]), "number" === n.type(a) && (l.padding = [a, a, a, a]), l.modal && n.extend(!0, l,
            {
                closeBtn: !1,
                closeClick: !1,
                nextClick: !1,
                arrows: !1,
                mouseWheel: !1,
                keys: null,
                helpers: {
                    overlay: {
                        closeClick: !1
                    }
                }
            }), l.autoSize && (l.autoWidth = l.autoHeight = !0), "auto" === l.width && (l.autoWidth = !0), "auto" === l.height && (l.autoHeight = !0), l.group = s.group, l.index = e, s.coming = l, !1 === s.trigger("beforeLoad")) return s.coming = null, void 0;
            if (r = l.type, i = l.href, !r) return s.coming = null, s.current && s.router && "jumpto" !== s.router ? (s.current.index = e,
            s[s.router](s.direction)) : !1;
            if (s.isActive = !0, ("image" === r || "swf" === r) && (l.autoHeight = l.autoWidth = !1,
            l.scrolling = "visible"), "image" === r && (l.aspectRatio = !0), "iframe" === r && c && (l.scrolling = "scroll"),
            l.wrap = n(l.tpl.wrap).addClass("fancybox-" + (c ? "mobile" : "desktop") + " fancybox-type-" + r + " fancybox-tmp " + l.wrapCSS).appendTo(l.parent || "body"),
            n.extend(l,
            {
                skin: n(".fancybox-skin", l.wrap),
                outer: n(".fancybox-outer", l.wrap),
                inner: n(".fancybox-inner", l.wrap)
            }), n.each(["Top", "Right", "Bottom", "Left"], function(e, t)
            {
                l.skin.css("padding" + t, g(l.padding[e]));
            }), s.trigger("onReady"), "inline" === r || "html" === r)
            {
                if (!l.content || !l.content.length) return s._error("content");
            }
            else if (!i) return s._error("href");
            "image" === r ? s._loadImage() : "ajax" === r ? s._loadAjax() : "iframe" === r ? s._loadIframe() : s._afterLoad();
        },
        _error: function(e)
        {
            n.extend(s.coming,
            {
                type: "html",
                autoWidth: !0,
                autoHeight: !0,
                minWidth: 0,
                minHeight: 0,
                scrolling: "no",
                hasError: e,
                content: s.coming.tpl.error
            }), s._afterLoad();
        },
        _loadImage: function()
        {
            var e = s.imgPreload = new Image();
            e.onload = function()
            {
                this.onload = this.onerror = null, s.coming.width = this.width / s.opts.pixelRatio,
                s.coming.height = this.height / s.opts.pixelRatio, s._afterLoad();
            }, e.onerror = function()
            {
                this.onload = this.onerror = null, s._error("image");
            }, e.src = s.coming.href, e.complete !== !0 && s.showLoading();
        },
        _loadAjax: function()
        {
            var e = s.coming;
            s.showLoading(), s.ajaxLoad = n.ajax(n.extend(
            {}, e.ajax,
            {
                url: e.href,
                error: function(e, t)
                {
                    s.coming && "abort" !== t ? s._error("ajax", e) : s.hideLoading();
                },
                success: function(t, n)
                {
                    "success" === n && (e.content = t, s._afterLoad());
                }
            }));
        },
        _loadIframe: function()
        {
            var e = s.coming,
                t = n(e.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime())).attr("scrolling", c ? "auto" : e.iframe.scrolling).attr("src", e.href);
            n(e.wrap).bind("onReset", function()
            {
                try
                {
                    n(this).find("iframe").hide().attr("src", "//about:blank").end().empty();
                }
                catch (e)
                {}
            }), e.iframe.preload && (s.showLoading(), t.one("load", function()
            {
                n(this).data("ready", 1), c || n(this).bind("load.fb", s.update), n(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(),
                s._afterLoad();
            })), e.content = t.appendTo(e.inner), e.iframe.preload || s._afterLoad();
        },
        _preloadImages: function()
        {
            var e, t, n = s.group,
                i = s.current,
                r = n.length,
                o = i.preload ? Math.min(i.preload, r - 1) : 0;
            for (t = 1; o >= t; t += 1) e = n[(i.index + t) % r], "image" === e.type && e.href && (new Image().src = e.href);
        },
        _afterLoad: function()
        {
            var e, t, i, r, o, a, l = s.coming,
                u = s.current,
                c = "fancybox-placeholder";
            if (s.hideLoading(), l && s.isActive !== !1)
            {
                if (!1 === s.trigger("afterLoad", l, u)) return l.wrap.stop(!0).trigger("onReset").remove(),
                s.coming = null, void 0;
                switch (u && (s.trigger("beforeChange", u), u.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()),
                s.unbindEvents(), e = l, t = l.content, i = l.type, r = l.scrolling, n.extend(s,
                {
                    wrap: e.wrap,
                    skin: e.skin,
                    outer: e.outer,
                    inner: e.inner,
                    current: e,
                    previous: u
                }), o = e.href, i)
                {
                case "inline":
                case "ajax":
                case "html":
                    e.selector ? t = n("<div>").html(t).find(e.selector) : d(t) && (t.data(c) || t.data(c, n('<div class="' + c + '"></div>').insertAfter(t).hide()),
                    t = t.show().detach(), e.wrap.bind("onReset", function()
                    {
                        n(this).find(t).length && t.hide().replaceAll(t.data(c)).data(c, !1);
                    }));
                    break;

                case "image":
                    t = e.tpl.image.replace("{href}", o);
                    break;

                case "swf":
                    t = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + o + '"></param>',
                    a = "", n.each(e.swf, function(e, n)
                    {
                        t += '<param name="' + e + '" value="' + n + '"></param>', a += " " + e + '="' + n + '"';
                    }), t += '<embed src="' + o + '" type="application/x-shockwave-flash" width="100%" height="100%"' + a + "></embed></object>";
                }
                d(t) && t.parent().is(e.inner) || e.inner.append(t), s.trigger("beforeShow"), e.inner.css("overflow", "yes" === r ? "scroll" : "no" === r ? "hidden" : r),
                s._setDimension(), s.reposition(), s.isOpen = !1, s.coming = null, s.bindEvents(),
                s.isOpened ? u.prevMethod && s.transitions[u.prevMethod]() : n(".fancybox-wrap").not(e.wrap).stop(!0).trigger("onReset").remove(),
                s.transitions[s.isOpened ? e.nextMethod : e.openMethod](), s._preloadImages();
            }
        },
        _setDimension: function()
        {
            var e, t, i, r, o, a, l, u, c, d, p, f, v, y, b, w = s.getViewport(),
                _ = 0,
                x = !1,
                k = !1,
                S = s.wrap,
                C = s.skin,
                E = s.inner,
                T = s.current,
                A = T.width,
                I = T.height,
                B = T.minWidth,
                D = T.minHeight,
                $ = T.maxWidth,
                O = T.maxHeight,
                N = T.scrolling,
                M = T.scrollOutside ? T.scrollbarWidth : 0,
                H = T.margin,
                F = m(H[1] + H[3]),
                P = m(H[0] + H[2]);
            if (S.add(C).add(E).width("auto").height("auto").removeClass("fancybox-tmp"), e = m(C.outerWidth(!0) - C.width()),
            t = m(C.outerHeight(!0) - C.height()), i = F + e, r = P + t, o = h(A) ? (w.w - i) * m(A) / 100 : A,
            a = h(I) ? (w.h - r) * m(I) / 100 : I, "iframe" === T.type)
            {
                if (y = T.content, T.autoHeight && 1 === y.data("ready")) try
                {
                    y[0].contentWindow.document.location && (E.width(o).height(9999), b = y.contents().find("body"),
                    M && b.css("overflow-x", "hidden"), a = b.outerHeight(!0));
                }
                catch (R)
                {}
            }
            else(T.autoWidth || T.autoHeight) && (E.addClass("fancybox-tmp"), T.autoWidth || E.width(o),
            T.autoHeight || E.height(a), T.autoWidth && (o = E.width()), T.autoHeight && (a = E.height()),
            E.removeClass("fancybox-tmp"));
            if (A = m(o), I = m(a), c = o / a, B = m(h(B) ? m(B, "w") - i : B), $ = m(h($) ? m($, "w") - i : $),
            D = m(h(D) ? m(D, "h") - r : D), O = m(h(O) ? m(O, "h") - r : O), l = $, u = O, T.fitToView && ($ = Math.min(w.w - i, $),
            O = Math.min(w.h - r, O)), f = w.w - F, v = w.h - P, T.aspectRatio ? (A > $ && (A = $,
            I = m(A / c)), I > O && (I = O, A = m(I * c)), B > A && (A = B, I = m(A / c)), D > I && (I = D,
            A = m(I * c))) : (A = Math.max(B, Math.min(A, $)), T.autoHeight && "iframe" !== T.type && (E.width(A),
            I = E.height()), I = Math.max(D, Math.min(I, O))), T.fitToView) if (E.width(A).height(I),
            S.width(A + e), d = S.width(), p = S.height(), T.aspectRatio) for (;
            (d > f || p > v) && A > B && I > D && !(_++ > 19);) I = Math.max(D, Math.min(O, I - 10)),
            A = m(I * c), B > A && (A = B, I = m(A / c)), A > $ && (A = $, I = m(A / c)), E.width(A).height(I),
            S.width(A + e), d = S.width(), p = S.height();
            else A = Math.max(B, Math.min(A, A - (d - f))),
            I = Math.max(D, Math.min(I, I - (p - v)));
            M && "auto" === N && a > I && f > A + e + M && (A += M), E.width(A).height(I), S.width(A + e),
            d = S.width(), p = S.height(), x = (d > f || p > v) && A > B && I > D, k = T.aspectRatio ? l > A && u > I && o > A && a > I : (l > A || u > I) && (o > A || a > I),
            n.extend(T,
            {
                dim: {
                    width: g(d),
                    height: g(p)
                },
                origWidth: o,
                origHeight: a,
                canShrink: x,
                canExpand: k,
                wPadding: e,
                hPadding: t,
                wrapSpace: p - C.outerHeight(!0),
                skinSpace: C.height() - I
            }), !y && T.autoHeight && I > D && O > I && !k && E.height("auto");
        },
        _getPosition: function(e)
        {
            var t = s.current,
                n = s.getViewport(),
                i = t.margin,
                r = s.wrap.width() + i[1] + i[3],
                o = s.wrap.height() + i[0] + i[2],
                a = {
                    position: "absolute",
                    top: i[0],
                    left: i[3]
                };
            return t.autoCenter && t.fixed && !e && o <= n.h && r <= n.w ? a.position = "fixed" : t.locked || (a.top += n.y,
            a.left += n.x), a.top = g(Math.max(a.top, a.top + (n.h - o) * t.topRatio)), a.left = g(Math.max(a.left, a.left + (n.w - r) * t.leftRatio)),
            a;
        },
        _afterZoomIn: function()
        {
            var e = s.current;
            e && (s.isOpen = s.isOpened = !0, s.wrap.css("overflow", "visible").addClass("fancybox-opened"),
            s.update(), (e.closeClick || e.nextClick && s.group.length > 1) && s.inner.css("cursor", "pointer").bind("click.fb", function(t)
            {
                n(t.target).is("a") || n(t.target).parent().is("a") || (t.preventDefault(), s[e.closeClick ? "close" : "next"]());
            }), e.closeBtn && n(e.tpl.closeBtn).appendTo(s.skin).bind("click.fb", function(e)
            {
                e.preventDefault(), s.close();
            }), e.arrows && s.group.length > 1 && ((e.loop || e.index > 0) && n(e.tpl.prev).appendTo(s.outer).bind("click.fb", s.prev), (e.loop || e.index < s.group.length - 1) && n(e.tpl.next).appendTo(s.outer).bind("click.fb", s.next)),
            s.trigger("afterShow"), e.loop || e.index !== e.group.length - 1 ? s.opts.autoPlay && !s.player.isActive && (s.opts.autoPlay = !1,
            s.play()) : s.play(!1));
        },
        _afterZoomOut: function(e)
        {
            e = e || s.current, n(".fancybox-wrap").trigger("onReset").remove(), n.extend(s,
            {
                group: {},
                opts: {},
                router: !1,
                current: null,
                isActive: !1,
                isOpened: !1,
                isOpen: !1,
                isClosing: !1,
                wrap: null,
                skin: null,
                outer: null,
                inner: null
            }), s.trigger("afterClose", e);
        }
    }), s.transitions = {
        getOrigPosition: function()
        {
            var e = s.current,
                t = e.element,
                n = e.orig,
                i = {}, r = 50,
                o = 50,
                a = e.hPadding,
                l = e.wPadding,
                u = s.getViewport();
            return !n && e.isDom && t.is(":visible") && (n = t.find("img:first"), n.length || (n = t)),
            d(n) ? (i = n.offset(), n.is("img") && (r = n.outerWidth(), o = n.outerHeight())) : (i.top = u.y + (u.h - o) * e.topRatio,
            i.left = u.x + (u.w - r) * e.leftRatio), ("fixed" === s.wrap.css("position") || e.locked) && (i.top -= u.y,
            i.left -= u.x), i = {
                top: g(i.top - a * e.topRatio),
                left: g(i.left - l * e.leftRatio),
                width: g(r + l),
                height: g(o + a)
            };
        },
        step: function(e, t)
        {
            var n, i, r, o = t.prop,
                a = s.current,
                l = a.wrapSpace,
                u = a.skinSpace;
            ("width" === o || "height" === o) && (n = t.end === t.start ? 1 : (e - t.start) / (t.end - t.start),
            s.isClosing && (n = 1 - n), i = "width" === o ? a.wPadding : a.hPadding, r = e - i,
            s.skin[o](m("width" === o ? r : r - l * n)), s.inner[o](m("width" === o ? r : r - l * n - u * n)));
        },
        zoomIn: function()
        {
            var e = s.current,
                t = e.pos,
                i = e.openEffect,
                r = "elastic" === i,
                o = n.extend(
                {
                    opacity: 1
                }, t);
            delete o.position, r ? (t = this.getOrigPosition(), e.openOpacity && (t.opacity = .1)) : "fade" === i && (t.opacity = .1),
            s.wrap.css(t).animate(o,
            {
                duration: "none" === i ? 0 : e.openSpeed,
                easing: e.openEasing,
                step: r ? this.step : null,
                complete: s._afterZoomIn
            });
        },
        zoomOut: function()
        {
            var e = s.current,
                t = e.closeEffect,
                n = "elastic" === t,
                i = {
                    opacity: .1
                };
            n && (i = this.getOrigPosition(), e.closeOpacity && (i.opacity = .1)), s.wrap.animate(i,
            {
                duration: "none" === t ? 0 : e.closeSpeed,
                easing: e.closeEasing,
                step: n ? this.step : null,
                complete: s._afterZoomOut
            });
        },
        changeIn: function()
        {
            var e, t = s.current,
                n = t.nextEffect,
                i = t.pos,
                r = {
                    opacity: 1
                }, o = s.direction,
                a = 200;
            i.opacity = .1, "elastic" === n && (e = "down" === o || "up" === o ? "top" : "left", "down" === o || "right" === o ? (i[e] = g(m(i[e]) - a), r[e] = "+=" + a + "px") : (i[e] = g(m(i[e]) + a),
            r[e] = "-=" + a + "px")), "none" === n ? s._afterZoomIn() : s.wrap.css(i).animate(r,
            {
                duration: t.nextSpeed,
                easing: t.nextEasing,
                complete: s._afterZoomIn
            });
        },
        changeOut: function()
        {
            var e = s.previous,
                t = e.prevEffect,
                i = {
                    opacity: .1
                }, r = s.direction,
                o = 200;
            "elastic" === t && (i["down" === r || "up" === r ? "top" : "left"] = ("up" === r || "left" === r ? "-" : "+") + "=" + o + "px"),
            e.wrap.animate(i,
            {
                duration: "none" === t ? 0 : e.prevSpeed,
                easing: e.prevEasing,
                complete: function()
                {
                    n(this).trigger("onReset").remove();
                }
            });
        }
    }, s.helpers.overlay = {
        defaults: {
            closeClick: !0,
            speedOut: 200,
            showEarly: !0,
            css: {},
            locked: !c,
            fixed: !0
        },
        overlay: null,
        fixed: !1,
        el: n("html"),
        create: function(e)
        {
            e = n.extend(
            {}, this.defaults, e), this.overlay && this.close(), this.overlay = n('<div class="fancybox-overlay"></div>').appendTo(s.coming ? s.coming.parent : e.parent),
            this.fixed = !1, e.fixed && s.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"),
            this.fixed = !0);
        },
        open: function(e)
        {
            var t = this;
            e = n.extend(
            {}, this.defaults, e), this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(e),
            this.fixed || (o.bind("resize.overlay", n.proxy(this.update, this)), this.update()),
            e.closeClick && this.overlay.bind("click.overlay", function(e)
            {
                return n(e.target).hasClass("fancybox-overlay") ? (s.isActive ? s.close() : t.close(), !1) : void 0;
            }), this.overlay.css(e.css).show();
        },
        close: function()
        {
            var e, t;
            o.unbind("resize.overlay"), this.el.hasClass("fancybox-lock") && (n(".fancybox-margin").removeClass("fancybox-margin"),
            e = o.scrollTop(), t = o.scrollLeft(), this.el.removeClass("fancybox-lock"), o.scrollTop(e).scrollLeft(t)),
            n(".fancybox-overlay").remove().hide(), n.extend(this,
            {
                overlay: null,
                fixed: !1
            });
        },
        update: function()
        {
            var e, n = "100%";
            this.overlay.width(n).height("100%"), l ? (e = Math.max(t.documentElement.offsetWidth, t.body.offsetWidth),
            a.width() > e && (n = a.width())) : a.width() > o.width() && (n = a.width()), this.overlay.width(n).height(a.height());
        },
        onReady: function(e, t)
        {
            var i = this.overlay;
            n(".fancybox-overlay").stop(!0, !0), i || this.create(e), e.locked && this.fixed && t.fixed && (i || (this.margin = a.height() > o.height() ? n("html").css("margin-right").replace("px", "") : !1),
            t.locked = this.overlay.append(t.wrap), t.fixed = !1), e.showEarly === !0 && this.beforeShow.apply(this, arguments);
        },
        beforeShow: function(e, t)
        {
            var i, r;
            t.locked && (this.margin !== !1 && (n("*").filter(function()
            {
                return "fixed" === n(this).css("position") && !n(this).hasClass("fancybox-overlay") && !n(this).hasClass("fancybox-wrap");
            }).addClass("fancybox-margin"), this.el.addClass("fancybox-margin")), i = o.scrollTop(),
            r = o.scrollLeft(), this.el.addClass("fancybox-lock"), o.scrollTop(i).scrollLeft(r)),
            this.open(e);
        },
        onUpdate: function()
        {
            this.fixed || this.update();
        },
        afterClose: function(e)
        {
            this.overlay && !s.coming && this.overlay.fadeOut(e.speedOut, n.proxy(this.close, this));
        }
    }, s.helpers.title = {
        defaults: {
            type: "float",
            position: "bottom"
        },
        beforeShow: function(e)
        {
            var t, i, r = s.current,
                o = r.title,
                a = e.type;
            if (n.isFunction(o) && (o = o.call(r.element, r)), p(o) && "" !== n.trim(o))
            {
                switch (t = n('<div class="fancybox-title fancybox-title-' + a + '-wrap">' + o + "</div>"),
                a)
                {
                case "inside":
                    i = s.skin;
                    break;

                case "outside":
                    i = s.wrap;
                    break;

                case "over":
                    i = s.inner;
                    break;

                default:
                    i = s.skin, t.appendTo("body"), l && t.width(t.width()), t.wrapInner('<span class="child"></span>'),
                    s.current.margin[2] += Math.abs(m(t.css("margin-bottom")));
                }
                t["top" === e.position ? "prependTo" : "appendTo"](i);
            }
        }
    }, n.fn.fancybox = function(e)
    {
        var t, i = n(this),
            r = this.selector || "",
            o = function(o)
            {
                var a, l, u = n(this).blur(),
                    c = t;
                o.ctrlKey || o.altKey || o.shiftKey || o.metaKey || u.is(".fancybox-wrap") || (a = e.groupAttr || "data-fancybox-group",
                l = u.attr(a), l || (a = "rel", l = u.get(0)[a]), l && "" !== l && "nofollow" !== l && (u = r.length ? n(r) : i,
                u = u.filter("[" + a + '="' + l + '"]'), c = u.index(this)), e.index = c, s.open(u, e) !== !1 && o.preventDefault());
            };
        return e = e || {}, t = e.index || 0, r && e.live !== !1 ? a.undelegate(r, "click.fb-start").delegate(r + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", o) : i.unbind("click.fb-start").bind("click.fb-start", o),
        this.filter("[data-fancybox-start=1]").trigger("click"), this;
    }, a.ready(function()
    {
        var t, o;
        n.scrollbarWidth === i && (n.scrollbarWidth = function()
        {
            var e = n('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
                t = e.children(),
                i = t.innerWidth() - t.height(99).innerWidth();
            return e.remove(), i;
        }), n.support.fixedPosition === i && (n.support.fixedPosition = function()
        {
            var e = n('<div style="position:fixed;top:20px;"></div>').appendTo("body"),
                t = 20 === e[0].offsetTop || 15 === e[0].offsetTop;
            return e.remove(), t;
        }()), n.extend(s.defaults,
        {
            scrollbarWidth: n.scrollbarWidth(),
            fixed: n.support.fixedPosition,
            parent: n("body")
        }), t = n(e).width(), r.addClass("fancybox-lock-test"), o = n(e).width(), r.removeClass("fancybox-lock-test"),
        n("<style type='text/css'>.fancybox-margin{margin-right:" + (o - t) + "px;}</style>").appendTo("head");
    });
}(window, document, jQuery),
function(e)
{
    var t = e.fancybox;
    t.helpers.buttons = {
        defaults: {
            skipSingle: !1,
            position: "top",
            tpl: '<div id="fancybox-buttons"><ul><li><a class="btnPrev" title="Previous" href="javascript:;"></a></li><li><a class="btnPlay" title="Start slideshow" href="javascript:;"></a></li><li><a class="btnNext" title="Next" href="javascript:;"></a></li><li><a class="btnToggle" title="Toggle size" href="javascript:;"></a></li><li><a class="btnClose" title="Close" href="javascript:;"></a></li></ul></div>'
        },
        list: null,
        buttons: null,
        beforeLoad: function(e, t)
        {
            return e.skipSingle && t.group.length < 2 ? (t.helpers.buttons = !1, t.closeBtn = !0,
            void 0) : (t.margin["bottom" === e.position ? 2 : 0] += 30, void 0);
        },
        onPlayStart: function()
        {
            this.buttons && this.buttons.play.attr("title", "Pause slideshow").addClass("btnPlayOn");
        },
        onPlayEnd: function()
        {
            this.buttons && this.buttons.play.attr("title", "Start slideshow").removeClass("btnPlayOn");
        },
        afterShow: function(n, i)
        {
            var r = this.buttons;
            r || (this.list = e(n.tpl).addClass(n.position).appendTo("body"), r = {
                prev: this.list.find(".btnPrev").click(t.prev),
                next: this.list.find(".btnNext").click(t.next),
                play: this.list.find(".btnPlay").click(t.play),
                toggle: this.list.find(".btnToggle").click(t.toggle),
                close: this.list.find(".btnClose").click(t.close)
            }), i.index > 0 || i.loop ? r.prev.removeClass("btnDisabled") : r.prev.addClass("btnDisabled"),
            i.loop || i.index < i.group.length - 1 ? (r.next.removeClass("btnDisabled"), r.play.removeClass("btnDisabled")) : (r.next.addClass("btnDisabled"),
            r.play.addClass("btnDisabled")), this.buttons = r, this.onUpdate(n, i);
        },
        onUpdate: function(e, t)
        {
            var n;
            this.buttons && (n = this.buttons.toggle.removeClass("btnDisabled btnToggleOn"),
            t.canShrink ? n.addClass("btnToggleOn") : t.canExpand || n.addClass("btnDisabled"));
        },
        beforeClose: function()
        {
            this.list && this.list.remove(), this.list = null, this.buttons = null;
        }
    };
}(jQuery),
function(e)
{
    var t = e.fancybox;
    t.helpers.thumbs = {
        defaults: {
            width: 50,
            height: 50,
            position: "bottom",
            source: function(t)
            {
                var n;
                return t.element && (n = e(t.element).find("img").attr("src")), !n && "image" === t.type && t.href && (n = t.href),
                n;
            }
        },
        wrap: null,
        list: null,
        width: 0,
        init: function(t, n)
        {
            var i, r = this,
                o = t.width,
                a = t.height,
                s = t.source;
            i = "";
            for (var l = 0; l < n.group.length; l++) i += '<li><a style="width:' + o + "px;height:" + a + 'px;" href="javascript:jQuery.fancybox.jumpto(' + l + ');"></a></li>';
            this.wrap = e('<div id="fancybox-thumbs"></div>').addClass(t.position).appendTo("body"),
            this.list = e("<ul>" + i + "</ul>").appendTo(this.wrap), e.each(n.group, function(t)
            {
                var i = s(n.group[t]);
                i && e("<img />").load(function()
                {
                    var n, i, s, l = this.width,
                        u = this.height;
                    r.list && l && u && (n = l / o, i = u / a, s = r.list.children().eq(t).find("a"),
                    n >= 1 && i >= 1 && (n > i ? (l = Math.floor(l / i), u = a) : (l = o, u = Math.floor(u / n))),
                    e(this).css(
                    {
                        width: l,
                        height: u,
                        top: Math.floor(a / 2 - u / 2),
                        left: Math.floor(o / 2 - l / 2)
                    }), s.width(o).height(a), e(this).hide().appendTo(s).fadeIn(300));
                }).attr("src", i);
            }), this.width = this.list.children().eq(0).outerWidth(!0), this.list.width(this.width * (n.group.length + 1)).css("left", Math.floor(.5 * e(window).width() - (n.index * this.width + .5 * this.width)));
        },
        beforeLoad: function(e, t)
        {
            return t.group.length < 2 ? (t.helpers.thumbs = !1, void 0) : (t.margin["top" === e.position ? 0 : 2] += e.height + 15,
            void 0);
        },
        afterShow: function(e, t)
        {
            this.list ? this.onUpdate(e, t) : this.init(e, t), this.list.children().removeClass("active").eq(t.index).addClass("active");
        },
        onUpdate: function(t, n)
        {
            this.list && this.list.stop(!0).animate(
            {
                left: Math.floor(.5 * e(window).width() - (n.index * this.width + .5 * this.width))
            }, 150);
        },
        beforeClose: function()
        {
            this.wrap && this.wrap.remove(), this.wrap = null, this.list = null, this.width = 0;
        }
    };
}(jQuery),
function(e)
{
    "use strict";
    var t = e.fancybox,
        n = function(t, n, i)
        {
            return i = i || "", "object" === e.type(i) && (i = e.param(i, !0)), e.each(n, function(e, n)
            {
                t = t.replace("$" + e, n || "");
            }), i.length && (t += (t.indexOf("?") > 0 ? "&" : "?") + i), t;
        };
    t.helpers.media = {
        defaults: {
            youtube: {
                matcher: /(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
                params: {
                    autoplay: 1,
                    autohide: 1,
                    fs: 1,
                    rel: 0,
                    hd: 1,
                    wmode: "opaque",
                    enablejsapi: 1
                },
                type: "iframe",
                url: "//www.youtube.com/embed/$3"
            },
            vimeo: {
                matcher: /(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,
                params: {
                    autoplay: 1,
                    hd: 1,
                    show_title: 1,
                    show_byline: 1,
                    show_portrait: 0,
                    fullscreen: 1
                },
                type: "iframe",
                url: "//player.vimeo.com/video/$1"
            },
            metacafe: {
                matcher: /metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,
                params: {
                    autoPlay: "yes"
                },
                type: "swf",
                url: function(t, n, i)
                {
                    return i.swf.flashVars = "playerVars=" + e.param(n, !0), "//www.metacafe.com/fplayer/" + t[1] + "/.swf";
                }
            },
            dailymotion: {
                matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
                params: {
                    additionalInfos: 0,
                    autoStart: 1
                },
                type: "swf",
                url: "//www.dailymotion.com/swf/video/$1"
            },
            twitvid: {
                matcher: /twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,
                params: {
                    autoplay: 0
                },
                type: "iframe",
                url: "//www.twitvid.com/embed.php?guid=$1"
            },
            twitpic: {
                matcher: /twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,
                type: "image",
                url: "//twitpic.com/show/full/$1/"
            },
            instagram: {
                matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
                type: "image",
                url: "//$1/p/$2/media/?size=l"
            },
            google_maps: {
                matcher: /maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
                type: "iframe",
                url: function(e)
                {
                    return "//maps.google." + e[1] + "/" + e[3] + e[4] + "&output=" + (e[4].indexOf("layer=c") > 0 ? "svembed" : "embed");
                }
            }
        },
        beforeLoad: function(t, i)
        {
            var r, o, a, s, l = i.href || "",
                u = !1;
            for (r in t) if (t.hasOwnProperty(r) && (o = t[r], a = l.match(o.matcher)))
            {
                u = o.type, s = e.extend(!0,
                {}, o.params, i[r] || (e.isPlainObject(t[r]) ? t[r].params : null)),
                l = "function" === e.type(o.url) ? o.url.call(this, a, s, i) : n(o.url, a, s);
                break;
            }
            u && (i.href = l, i.type = u, i.autoHeight = !1);
        }
    };
}(jQuery),
function()
{
    "undefined" != typeof _ && null !== _ && (_.templateSettings = {
        evaluate: /\{\{(.+?)\}\}/g,
        interpolate: /\{\{=(.+?)\}\}/g
    }), "undefined" != typeof $ && null !== $ && ($.support.cors = !0);
}.call(this),
function()
{
    var e, t, n, i, r = [].indexOf || function(e)
        {
            for (var t = 0, n = this.length; n > t; t++) if (t in this && this[t] === e) return t;
            return -1;
        }, o = function(e, t)
        {
            return function()
            {
                return e.apply(t, arguments);
            };
        };
    String.prototype.toSlug = function()
    {
        var e;
        return e = this.replace(/[^\u0020-\u007e]/g, ""), e = e.replace(/["'`]/g, ""), e = e.replace(/@/g, " at "),
        e = e.replace(/&/g, " and "), e = e.replace(/\W+/g, " "), e = e.replace(/_/g, " "),
        e = e.trim(), e = e.replace(/\s+/g, "-"), e = e.toLowerCase();
    }, String.prototype.trim || (String.prototype.trim = function()
    {
        return this.replace(/^\s+|\s+$/g, "");
    }), $B.log = function()
    {
        var e, t;
        return e = "true" === (null != (t = window.localStorage) ? "function" == typeof t.getItem ? t.getItem("strikinglyLogger") : void 0 : void 0),
        $B.log.enabled() && console && console.log ? console.log(Array.prototype.slice.call(arguments)) : void 0;
    }, $.smartPoller = function(e, t)
    {
        var n;
        return $.isFunction(e) && (t = e, e = 1e3), n = function()
        {
            return setTimeout(function()
            {
                return t.call(this, n);
            }, e), e = 1.5 * e;
        }, n();
    }, $.strikingPoller = function(e, t, n)
    {
        return t || (t = function(e)
        {
            return console.log(e);
        }), n || (n = function(e)
        {
            return console.log(e);
        }), $.smartPoller(function(i)
        {
            return console.log("Polling URL " + e), $.getJSON(e).success(function(e)
            {
                return e ? "retry" === e.html ? (i(), void 0) : t(e) : i();
            }).error(n);
        });
    },
    function(e)
    {
        var t;
        return t = {}, e.setCustomization = function(e, n)
        {
            return t[e] = n;
        }, e.getCustomization = function(e)
        {
            return null != t[e] ? t[e] : void 0;
        };
    }($B),
    function(e)
    {
        var t;
        return t = {}, e.meta = function(e, n)
        {
            var i;
            return null == n && (n = !1), null == t[e] || n ? (i = $('meta[name="' + e + '"]').attr("content"),
            null != i ? t[e] = i : ($B.log("" + e + " missing in meta."), void 0)) : t[e];
        }, e.metaObject = function(e, n)
        {
            var i;
            return null == n && (n = !1), null == t[e] || n ? (i = $('meta[name="' + e + '"]').attr("content"),
            null != i ? t[e] = jQuery.parseJSON(i) : ($B.log("" + e + " missing in meta object."),
            {})) : t[e];
        }, e.appMeta = function(t)
        {
            return e.metaObject("app-configs")[t];
        }, e.siteMeta = function(t)
        {
            return e.metaObject("site-configs")[t];
        };
    }($B), $B.log.enabled = function()
    {
        var e, t, n;
        return t = "true" === (null != (n = window.localStorage) ? "function" == typeof n.getItem ? n.getItem("strikinglyLogger") : void 0 : void 0),
        e = "true" === $("meta[name=a-minimum]").attr("content"), t || e;
    }, $B.log.enable = function()
    {
        var e;
        return null != (e = window.localStorage) && "function" == typeof e.setItem && e.setItem("strikinglyLogger", "true"),
        console.log("Bobcat logger enabled!");
    }, $B.log.disable = function()
    {
        var e;
        return null != (e = window.localStorage) && "function" == typeof e.setItem && e.setItem("strikinglyLogger", "false"),
        console.log("Bobcat logger disabled!");
    }, $B.growl = function(e)
    {
        var t, n, i;
        if ($B.log.enabled()) return n = 2800, i = 20 + 34 * $(".s-growl").length, t = $("<div></div>").addClass("s-growl").text(e).css(
        {
            background: "rgba(0,0,0,0.85)",
            color: "white",
            padding: "6px 14px",
            "font-size": "110%",
            position: "fixed",
            "z-index": 999e3,
            top: i,
            right: 20,
            "-webkit-border-radius": "4px"
        }), setTimeout(function()
        {
            return t.animate(
            {
                top: "-=5",
                opacity: 0
            }, function()
            {
                return t.remove();
            });
        }, n), $("body").append(t);
    }, $B.ui = {
        openModal: function(e)
        {
            var t;
            if (!e.is(":visible") || "1" !== e.css("opacity")) return e.css(
            {
                top: "51.5%",
                opacity: 0
            }).show(), e.css(
            {
                "margin-top": -e.height() / 2
            }), e.stop().animate(
            {
                top: "50%",
                opacity: 1
            }, 400, "easeInOutQuart"), (t = $(".s-modal-bg")).length ? (t.css("opacity", 0).show(),
            t.css("pointer-events", "auto"), t.animate(
            {
                opacity: 1
            }, 400, "easeInOutQuart"), t.click(function()
            {
                return t.css("pointer-events", "none"), $B.ui.closeModal(e);
            })) : void 0;
        },
        closeModal: function(e)
        {
            var t;
            return t = $(".s-modal-bg"), t.stop().animate(
            {
                opacity: 0
            }, 400, "easeInOutQuart", function()
            {
                return t.hide();
            }), e.is(":visible") || "0" !== e.css("opacity") ? e.stop().animate(
            {
                top: "51.5%",
                opacity: 0
            }, 400, "easeInOutQuart", function()
            {
                return e.hide();
            }) : void 0;
        },
        openCloseModal: function(e, t)
        {
            var n;
            return null == t && (t = !1), n = e.is(":visible"), n ? t || this.closeModal(e) : this.openModal(e),
            n;
        }
    }, window.Singleton = function()
    {
        function e()
        {}
        var t;
        return t = void 0, e.get = function(e)
        {
            return null != t ? t : t = new i(e);
        }, e;
    }(), i = function()
    {
        function e(e)
        {
            this.args = e;
        }
        return e.prototype.echo = function()
        {
            return this.args;
        }, e;
    }(), n = ["extended", "included"], $B.Module = function()
    {
        function e()
        {}
        return e.extend = function(e)
        {
            var t, i, o;
            for (t in e) i = e[t], r.call(n, t) < 0 && (this[t] = i);
            return null != (o = e.extended) && o.apply(this), this;
        }, e.include = function(e)
        {
            var t, i, o;
            for (t in e) i = e[t], r.call(n, t) < 0 && (this.prototype[t] = i);
            return null != (o = e.included) && o.apply(this), this;
        }, e;
    }(), Bobcat.UrlHelper = {
        isEmail: function(e)
        {
            var t;
            return t = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            t.test(e);
        },
        hasProtocol: function(e)
        {
            var t, n;
            return t = /^((http|https|ftp|mailto|tel|fb):)/, n = /^(#)/, t.test(e) || n.test(e);
        },
        addProtocol: function(e, t)
        {
            return null == t && (t = !1), e = $.trim(e), 0 === e.length ? e = t ? "" : "javascript:void(0);" : this.isEmail(e) ? e = "mailto:" + e : this.hasProtocol(e) || (e = "http://" + e),
            e;
        },
        createUrlParser: function(e)
        {
            var t;
            return t = document.createElement("a"), t.href = this.addProtocol(e, !0), t;
        }
    }, Bobcat.HtmlHelper = {
        htmlEncode: function(e)
        {
            return $("<div/>").text(e).html();
        },
        htmlDecode: function(e)
        {
            return $("<div/>").html(e).text();
        }
    }, Bobcat.ImageOptionHelper = {
        IMAGE_SIZE: {
            small: "300x225>",
            medium: "720x540>",
            large: "1200x900>",
            background: "2000x1200>"
        },
        getOptions: function(e)
        {
            var t, n, i, r, o, a, s;
            return this.conversions ? this.conversions : (window.form = e, r = e.find('[name="asset[image_size]"]').get(0),
            a = e.find('[name="asset[thumb_size]"]').get(0), o = this.toImageSize($(r).val()),
            s = this.toImageSize($(a).val()), i = function(e)
            {
                return e.slice(0, - 1).split("x")[0];
            }, n = function(e)
            {
                return e.slice(0, - 1).split("x")[1];
            }, t = function(e)
            {
                var t;
                return t = e.charAt(e.length - 1), "#" === t ? {
                    crop: "thumb"
                } : "<" === t || ">" === t ? {
                    crop: "limit"
                } : void 0;
            }, this.conversions = {
                custom: {
                    width: i(o),
                    height: n(o)
                },
                thumb: {
                    width: i(s),
                    height: n(s)
                }
            }, this.conversions.custom = _.extend(this.conversions.custom, t(o)), this.conversions.thumb = _.extend(this.conversions.thumb, t(s)),
            this.conversions);
        },
        toImageSize: function(e)
        {
            return ("small" === e || "medium" === e || "large" === e || "background" === e) && (e = this.IMAGE_SIZE[e]),
            e;
        }
    }, e = function()
    {
        function e(e)
        {
            this.handler = e, this.queue = [];
        }
        return e.prototype.run = function()
        {
            var e, t = this;
            return e = function()
            {
                return t.queue.length > 0 ? t.run() : void 0;
            }, this.handler(this.queue.shift(), e);
        }, e.prototype.append = function(e)
        {
            return this.queue.push(e), 1 === this.queue.length ? this.run() : void 0;
        }, e;
    }(), t = function()
    {
        function e(e, t, n)
        {
            this.item = e, this.url = t, this.callback = n;
        }
        return e;
    }(), $B.FacebookLogin = function()
    {
        function e(e)
        {
            this._configs = e, this.loadFacebook = o(this.loadFacebook, this), this.fbLoginPopup = o(this.fbLoginPopup, this);
        }
        return e.prototype.fbLoginPopup = function(e)
        {
            return FB.login(function(t)
            {
                if (t.authResponse)
                {
                    if (e.success) return e.success(t);
                }
                else if (e.fail) return e.fail(t);
            },
            {
                scope: this._configs.facebook_perms
            });
        }, e.prototype.loadFacebook = function(e)
        {
            var t = this;
            return window.fbAsyncInit = function()
            {
                return FB.init(
                {
                    appId: t._configs.facebook_app_id,
                    channelUrl: "" + window.location.protocol + "//" + window.location.host + "/fb/channel.html",
                    status: !1,
                    cookie: !0,
                    xfbml: !0,
                    oauth: !0
                }), FB.Event.subscribe("auth.authResponseChange", function(t)
                {
                    if (console.log(t), "connected" === t.status)
                    {
                        if (e.connected) return e.connected(t);
                    }
                    else if ("not_authorized" === t.status)
                    {
                        if (e.notAuthorized) return e.notAuthorized(t);
                    }
                    else if (e.others) return e.others(t);
                });
            },
            function(e)
            {
                var t, n, i;
                return t = "facebook-jssdk", i = e.getElementsByTagName("script")[0], e.getElementById(t) ? void 0 : (n = e.createElement("script"),
                n.id = t, n.async = !0, n.src = "//connect.facebook.net/en_US/all.js", i.parentNode.insertBefore(n, i));
            }(document);
        }, e;
    }(), window.AjaxQueueBuffer = e, window.Task = t;
}.call(this),
function()
{
    window.Bobcat = window.$B = window.Bobcat || {}, window.Bobcat.GALLERY_COUNTER = 1,
    window.Bobcat.DOM = {
        SLIDES: ".slides .slide",
        PAGE_DATA_SCOPE: "page",
        EDITPAGE_DATA_SCOPE: "editpage",
        NAVIGATOR: "#s-header, .navigator",
        FOOTER: "#footer",
        FOOTER_LOGO_EDITOR: "#edit-logo-footer",
        EDITOR_OVERLAY: ".edit-overlay",
        EDITOR: ".editor",
        CONTENT: ".content",
        PAGE_SETTING_DIALOG: "#page-settings-menu",
        NEW_PAGE_MESSAGE_DIALOG: "#new-page-message-dialog",
        NEW_SECTION_DIALOG: "#new-section-dialog",
        SHARE_DIALOG: "#sharing-options-dialog",
        PUBLISH_DIALOG: "#publish-dialog-new",
        SAVED_DIALOG: "#saved-dialog",
        FEEDBACK_DIALOG: "#feedback-dialog",
        FEEDBACK_DIALOG_STEP1: ".step-1",
        FEEDBACK_DIALOG_STEP2: ".step-2",
        DIALOG_INACTIVE_CLASS: "inactive",
        FACEBOOK_ROOT: "#fb-root",
        FONT_SELECTOR: "select.fontselector",
        VARIATION_SELECTOR: "select.variationselector",
        PRESET_SELECTOR: "select.s-preset-selector-input",
        STRIKINGLY_LOGO: "#strikingly-footer-logo",
        SETTINGS: {
            FORM: ".strikingly-settings-form",
            PUBLISH: {
                FB_SHARE: "#facebook_share",
                SHARE_LINK: "#page_share_link"
            }
        },
        IMAGE_TITLE: function(e)
        {
            return e.find("img").attr("alt") || "";
        },
        IMAGE_DESCRIPTION: function(e)
        {
            return e.find("img").attr("data-description") || "";
        },
        GALLERY: function(e)
        {
            var t, n, i, r;
            for (r = e.parent().find("a.item"), n = 0, i = r.length; i > n; n++) t = r[n], $(t).attr("rel", "gallery_" + window.Bobcat.GALLERY_COUNTER);
            return $("a.item[rel=gallery_" + window.Bobcat.GALLERY_COUNTER+++"]");
        },
        GALLERY_IMAGES: function(e)
        {
            return e.find("a.item");
        },
        GALLERY_IMAGES_EDITOR: function(e)
        {
            return e.find(".gallery-editor-image");
        }
    };
}.call(this),
function()
{
    var e = function(e, t)
    {
        return function()
        {
            return e.apply(t, arguments);
        };
    };
    Bobcat.UserAnalyticsEngine = function()
    {
        function t(t, n, i)
        {
            this.user_id = t, this.user_email = n, this.urlBase = i, this.save = e(this.save, this),
            this.track = e(this.track, this), this.trackWithoutMixpanel = e(this.trackWithoutMixpanel, this),
            null == this.urlBase && (this.urlBase = $B.appMeta("analytics_logger_url"));
        }
        return t.prototype.trackWithoutMixpanel = function(e)
        {
            return this.user_id && this.user_email ? this.save(this.user_id, e) : void 0;
        }, t.prototype.track = function(e, t)
        {
            return window.mixpanel.track(e, t), this.user_id && this.user_email ? this.save(this.user_id, e) : void 0;
        }, t.prototype.save = function(e, t)
        {
            var n = this;
            return $.ajax(
            {
                type: "POST",
                url: "" + this.urlBase + "/events",
                data: {
                    user_id: e,
                    event: t
                },
                success: function(e)
                {
                    return "Editor - edit" === t ? _veroq.push(["user",
                    {
                        id: n.user_id,
                        edit_count: e.count
                    }]) : void 0;
                },
                dataType: "json"
            });
        }, t;
    }(), Bobcat.PageAnalyticsEngine = function()
    {
        function t(t, n)
        {
            this.pageData = t, this.source = n, this.sendData = e(this.sendData, this), this.logSocialClicks = e(this.logSocialClicks, this),
            this.logPageSectionView = e(this.logPageSectionView, this), this.startPing = e(this.startPing, this),
            this.logClick = e(this.logClick, this), this.logPageView = e(this.logPageView, this),
            this.baseData = {
                pageId: this.pageData.page_id,
                permalink: this.pageData.permalink,
                referrer: document.referrer,
                membership: this.pageData.membership,
                createdAt: this.pageData.created_at,
                strikinglyBranding: this.pageData.showStrikinglyLogo
            };
        }
        return t.prototype.pingInterval = 1e4, t.prototype.logPageView = function()
        {
            var e;
            return e = _.extend(
            {
                eventName: "PageView"
            }, this.baseData);
        }, t.prototype.logClick = function(e)
        {
            var t, n, i;
            return t = e.attr("data-click-name") || "N/A", n = e.attr("href") || "N/A", i = _.extend(
            {
                eventName: "PageClick",
                clickName: t,
                clickTarget: n
            }, this.baseData), this.sendData(this.source, i);
        }, t.prototype.startPing = function()
        {
            var e, t, n = this;
            return this.lastTimestamp || (this.lastTimestamp = new Date().getTime()), this.firstTimestamp || (this.firstTimestamp = this.lastTimestamp),
            e = _.extend(
            {
                eventName: "PagePing"
            }, this.baseData), t = function()
            {
                return window.setTimeout(function()
                {
                    var i;
                    return e.sectionId = window.slide_navigator.currentIndex(), e.sectionName = window.slide_navigator.currentSectionName(),
                    i = new Date().getTime(), e.diff = i - n.lastTimestamp, e.diff > 0 && e.diff < 3e5 && n.sendData(n.source, e),
                    n.lastTimestamp = i, n.logPageSectionView(), n.lastTimestamp - n.firstTimestamp < 3e5 ? t() : void 0;
                }, n.pingInterval);
            }, t();
        }, t.prototype.logPageSectionView = function()
        {
            var e, t, n;
            return this.sectionBitmap || (this.sectionBitmap = {}), t = window.slide_navigator.currentIndex(),
            this.sectionBitmap[t] ? void 0 : (n = window.slide_navigator.currentSectionName(),
            e = _.extend(
            {
                eventName: "PageSectionView",
                sectionId: t,
                sectionName: n
            }, this.baseData), this.sendData(this.source, e), this.sectionBitmap[t] = !0);
        }, t.prototype.logSocialClicks = function(e)
        {
            var t;
            return t = _.extend(
            {
                eventName: "SocialClicks",
                channel: e
            }, this.baseData), this.sendData(this.source, t);
        }, t.prototype.sendData = function(e, t)
        {
            return ;
        }, t;
    }();
}.call(this),
function()
{
    var e = {}.hasOwnProperty,
        t = function(t, n)
        {
            function i()
            {
                this.constructor = t;
            }
            for (var r in n) e.call(n, r) && (t[r] = n[r]);
            return i.prototype = n.prototype, t.prototype = new i(), t.__super__ = n.prototype,
            t;
        }, n = [].indexOf || function(e)
        {
            for (var t = 0, n = this.length; n > t; t++) if (t in this && this[t] === e) return t;
            return -1;
        };
    window.partial = function(e, t)
    {
        return _.template($("#" + e + "-partial").html(), t);
    }, Bobcat.IndexGenerator = function()
    {
        function e()
        {
            this.currentIndex = 0;
        }
        return e.prototype.increment = function()
        {
            return this.currentIndex += 1;
        }, e.prototype.getNext = function()
        {
            var e;
            return e = this.currentIndex, this.increment(), "model" + e;
        }, e;
    }(), Bobcat.PageTransformer = function()
    {
        function e(e, t)
        {
            this.domTree = e, this.isEdit = t, this.textTransformer = new Bobcat.TextTransformer(),
            this.imageTransformer = new Bobcat.ImageTransformer(), this.htmlTransformer = new Bobcat.HtmlTransformer();
        }
        return e.prototype.transform = function()
        {
            var e, t, n, i, r, o, a, s, l, u, c, d, p, h, f, m;
            for (h = this.domTree.find("[data-component='repeatable_item_template']"), o = 0,
            u = h.length; u > o; o++) n = h[o], t = $(n), $("<div id='" + t.attr("id") + "_temp' style='display:none;'>" + t.html() + "</div>").appendTo(this.domTree);
            for (this.indexGenerator = new Bobcat.IndexGenerator(), r = [this.textTransformer, this.imageTransformer, this.htmlTransformer],
            a = 0, c = r.length; c > a; a++) i = r[a], i.indexGenerator = this.indexGenerator;
            for (s = 0, d = r.length; d > s; s++) i = r[s], i.transform(this.domTree, this.isEdit);
            for (f = this.domTree.find("[data-component='repeatable_item_template']"), m = [],
            l = 0, p = f.length; p > l; l++) n = f[l], t = $(n), e = $("#" + t.attr("id") + "_temp"),
            $.browser.msie && e.find("*").filter(function()
            {
                return "" !== $(this).attr("class");
            }).addClass("ie-fix ie-fix2"), n.text = e.html(), m.push(e.remove());
            return m;
        }, e;
    }(), Bobcat.Transformer = function()
    {
        function e()
        {}
        return e.prototype.validateName = function(e)
        {
            return null == e.attr("data-name") && (this.warning("The following DOM doesn't have data-name."),
            this.warning(e)), !0;
        }, e.prototype.getDataName = function(e)
        {
            var t;
            return t = e.attr("data-name"), t || (t = this.indexGenerator.getNext()), t;
        }, e.prototype.clearDom = function(e)
        {
            return e.html("");
        }, e.prototype.isEditable = function(e)
        {
            var t;
            return t = e.attr("data-show"), "true" !== t;
        }, e.prototype.warning = function(e)
        {
            return console.warn(e);
        }, e.prototype.error = function(e)
        {
            return console.error(e);
        }, e;
    }(), Bobcat.TextTransformer = function(e)
    {
        function i()
        {}
        return t(i, e), i.prototype.transform = function(e, t)
        {
            var n = this;
            return this.domTree = e, this.isEdit = null != t ? t : !1, this.domTree.find("[data-component='text']").each(function(e, t)
            {
                var i;
                return i = $(t), n.validate(i) ? n.isEdit && n.isEditable(i) ? n.transformToEditable(i) : n.transformToShow(i) : void 0;
            });
        }, i.prototype.getTextType = function(e)
        {
            var t;
            if (t = e.attr("data-text-type"))
            {
                if ("heading" === t) return "headingFont";
                if ("title" === t) return "titleFont";
                if ("navigation" === t) return "navFont";
            }
            return "bodyFont";
        }, i.prototype.getUseFont = function(e)
        {
            var t;
            return t = e.attr("data-use-font"), "false" === t ? !1 : !0;
        }, i.prototype.buildData = function(e)
        {
            var t, n, i, r;
            return t = e.html(), n = this.getDataName(e), i = this.getTextType(e), r = this.getUseFont(e),
            {
                content: t,
                name: n,
                textType: i,
                useFont: r
            };
        }, i.prototype.transformToShow = function(e)
        {
            var t, n;
            return t = this.buildData(e), e.addClass("text-component").html(""), n = $.trim(_.template($("#textContent-partial").html())(t)),
            $(n).appendTo(e);
        }, i.prototype.transformToEditable = function(e)
        {
            var t, n;
            return t = this.buildData(e), this.clearDom(e), e.addClass("editable text-component"),
            e.attr("data-text-type", "" + t.textType), e.attr("data-name", "" + t.name), e.attr("data-bind", "css: {'empty-text': " + t.name + ".showEmptyText()}, mouseenter : " + t.name + ".mouseenterHandler, mouseleave: " + t.name + ".mouseleaveHandler, mouseclick:" + t.name + ".clickEditorHandler"),
            n = $.trim(_.template($("#textEditor").html())(t)), $(n).appendTo(e);
        }, i.prototype.validate = function(e)
        {
            var t;
            return t = this.validateName(e) && this.validateTextType(e);
        }, i.prototype.validateTextType = function(e)
        {
            var t, i, r, o;
            return r = !0, i = e.attr("data-text-type"), t = ["body", "heading", "title", "navigation"],
            i && (o = !i, n.call(t, o) >= 0 && (r = !1, this.warning("data-text-type should be one of " + t.join(", ")),
            this.warning(e))), r;
        }, i;
    }(Bobcat.Transformer), Bobcat.ImageTransformer = function(e)
    {
        function n()
        {
            return n.__super__.constructor.apply(this, arguments);
        }
        return t(n, e), n.prototype.transform = function(e, t)
        {
            var n = this;
            return this.domTree = e, this.isEdit = t, this.domTree.find("[data-component='image']").each(function(e, t)
            {
                var i;
                return i = $(t), n.validate(i) ? n.isEdit && n.isEditable(i) ? n.transformToEditable(i) : n.transformToShow(i) : void 0;
            });
        }, n.prototype.validate = function(e)
        {
            var t;
            return t = this.validateName(e) && this.validateUrl(e) && this.validateImageSize(e) && this.validateThumbSize(e);
        }, n.prototype.getImageDom = function(e)
        {
            return e.imageDom ? e.imageDom : e.imageDom = e.find("img").first();
        }, n.prototype.validateUrl = function(e)
        {
            return "undefined" == typeof this.getImageDom(e).attr("src") ? (this.error("img doesn't have a src"),
            this.error(this.getImageDom(e)), !1) : !0;
        }, n.prototype.transformToEditable = function(e)
        {
            var t, n;
            return t = this.buildData(e), this.clearDom(e), e.addClass("editable image-component"),
            e.attr("data-name", "" + t.name), e.attr("data-bind", "css: {'empty-image':!" + t.name + ".hasContent()}, mouseenter : " + t.name + ".mouseenterHandler, mouseleave: " + t.name + ".mouseleaveHandler, mouseclick:" + t.name + ".clickEditorHandler"),
            n = $.trim(_.template($("#imageEditor").html())(t)), $(n).appendTo(e);
        }, n.prototype.transformToShow = function(e)
        {
            var t, n;
            return t = this.buildData(e), e.html(""), n = $.trim(_.template($("#imageContent-partial").html())(t)),
            $(n).appendTo(e);
        }, n.prototype.validateSize = function(e)
        {
            return "small" === e || "medium" === e || "large" === e || "background" === e ? !0 : /^\d+x\d+[><^#]+$/.test(e) ? !0 : "undefined" == typeof e ? !0 : !1;
        }, n.prototype.validateThumbSize = function(e)
        {
            var t, n;
            return t = e.attr("data-thumb-size"), n = this.validateSize(t), n || (this.warning("size format is wrong"),
            this.warning(e)), n;
        }, n.prototype.validateImageSize = function(e)
        {
            var t, n;
            return t = e.attr("data-image-size"), n = this.validateSize(t), n || (this.warning("size format is wrong"),
            this.warning(e)), n;
        }, n.prototype.getImageSize = function(e)
        {
            var t;
            return t = e.attr("data-image-size"), t || (t = "medium");
        }, n.prototype.getThumbSize = function(e)
        {
            var t;
            return t = e.attr("data-thumb-size"), t || (t = "128x128#");
        }, n.prototype.getHasUrl = function(e)
        {
            var t;
            return t = e.attr("data-use-url"), "true" === t;
        }, n.prototype.getAssetUrls = function(e)
        {
            var t;
            return t = e.attr("data-assets"), t ? t.split(" ") : [];
        }, n.prototype.buildData = function(e)
        {
            var t, n, i, r, o, a, s, l;
            return s = this.getImageDom(e).attr("src"), n = this.getImageDom(e).attr("alt"),
            r = this.getDataName(e), t = this.getAssetUrls(e), o = this.getImageSize(e), a = this.getThumbSize(e),
            l = this.getHasUrl(e), n || (n = ""), i = {
                url: s,
                caption: n,
                name: r,
                imageSize: o,
                useUrl: l,
                thumbSize: a,
                assetUrls: t
            };
        }, n;
    }(Bobcat.Transformer), Bobcat.HtmlTransformer = function(e)
    {
        function n()
        {}
        return t(n, e), n.prototype.transform = function(e, t)
        {
            var n = this;
            return this.domTree = e, this.isEdit = t, this.domTree.find("[data-component='html']").each(function(e, t)
            {
                var i;
                return i = $(t), n.validate(i) ? n.isEdit && n.isEditable(i) ? n.transformToEditable(i) : n.transformToShow(i) : void 0;
            });
        }, n.prototype.validate = function(e)
        {
            var t;
            return t = this.validateName(e);
        }, n.prototype.transformToEditable = function(e)
        {
            var t, n;
            return t = this.buildData(e), this.clearDom(e), e.addClass("editable html-component"),
            e.attr("data-name", "" + t.name), e.attr("data-bind", "mouseenter : " + t.name + ".mouseenterHandler, mouseleave: " + t.name + ".mouseleaveHandler, mouseclick:" + t.name + ".clickEditorHandler"),
            n = $.trim(_.template($("#htmlEditor").html())(t)), $(n).appendTo(e);
        }, n.prototype.buildData = function(e)
        {
            var t;
            return t = this.getDataName(e),
            {
                name: t
            };
        }, n.prototype.transformToShow = function()
        {}, n;
    }(Bobcat.Transformer);
}.call(this),
function()
{
    var e = function(e, t)
    {
        return function()
        {
            return e.apply(t, arguments);
        };
    };
    Bobcat.ShowPage = function()
    {
        function t(t)
        {
            this.checkIframe = e(this.checkIframe, this), this.init = e(this.init, this), this.data = new Bobcat.PageData(t),
            this.Event = new Bobcat.Event(), this.unsavedChanges = ko.observable(!1), this.isShowPage = !0;
        }
        return t.prototype.init = function()
        {
            var e, t, n, i;
            for (this.data.removePremiumSlides(), this.data.bindSlides(), Bobcat.TH.initPageHelpers(),
            i = window.runAfterDomBinding.getAllJobs(), t = 0, n = i.length; n > t; t++) e = i[t],
            e();
            return window.slide_navigator.init(), this.checkIframe();
        }, t.prototype.checkIframe = function()
        {
            var e, t, n, i;
            return window.top.location !== window.location && document.referrer && (i = document.referrer.match(/^https?:\/\/([^.]+\.)?([^:\/\s]+)\/?.*/),
            i && (t = $B.meta("strikingly-host-name"), t && (n = $.map(t.split(","), function(e)
            {
                return e.trim();
            }), e = i[2], - 1 === $.inArray(e.toLowerCase(), n)))) ? (alert("Framing is not allowed with free account. Redirecting to Strikingly.com. Please contact support@strikingly.com if you have any questions."),
            window.top.location = window.location) : void 0;
        }, t;
    }();
}.call(this),
function()
{
    window.$B = window.Bobcat || {}, $B.TH = {
        fixNavOnScroll: function(e, t, n)
        {
            var i, r;
            return null == n && (n = 0), $B.TH.isSmallScreen() ? void 0 : (i = function()
            {
                return $("ul.slides li.slide").css(
                {
                    "padding-top": 0
                }), $B.TH.isSmallScreen() ? e.css("position", "static") : (e.css("position", "fixed"),
                $("ul.slides li.slide").first().css(
                {
                    "padding-top": e.outerHeight(!1)
                }));
            }, r = function()
            {
                var i, r, o, a;
                return r = e.outerHeight() - t.height() - n, 0 !== e.length ? (i = $(window).height(),
                o = e.height(), a = $(window).scrollTop(), a > r && (a = r), $(".demo-bar-spacer").length && (a -= $(".demo-bar-spacer").outerHeight()),
                e.stop().animate(
                {
                    top: -a
                })) : void 0;
            }, $(window).scroll(r), $(window).resize(i), setTimeout(i, 2e3), i());
        },
        isMobile: function()
        {
            return navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)|(windows phone)|(iemobile)/i);
        },
        isAndroid: function()
        {
            return navigator.userAgent.match(/(android)/i);
        },
        isWindowsPhone: function()
        {
            return navigator.userAgent.match(/(windows phone)|(iemobile)/i);
        },
        isIpad: function()
        {
            return navigator.userAgent.match(/(iPad)/i);
        },
        isIOS: function()
        {
            return navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i);
        },
        isSmallScreen: function()
        {
            return $(window).width() <= 727 || $(window).height() < 400;
        },
        iOSversion: function()
        {
            var e, t;
            return /iP(hone|od|ad)/.test(navigator.platform) ? (e = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
            t = [parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3] || 0, 10)], t[0]) : void 0;
        },
        androidVersion: function()
        {
            var e;
            return $B.TH.isAndroid() ? (e = navigator.userAgent, parseFloat(e.slice(e.indexOf("Android") + 8))) : void 0;
        },
        isAndroid2x: function()
        {
            return $B.TH.isAndroid() && $B.TH.androidVersion() < 3;
        },
        shiftBody: function(e)
        {
            var t, n;
            return n = $("#s-content"), t = $("body"), e ? n.addClass("translate-" + e) : n.removeClass("translate-right translate-left"),
            t.css(
            {
                overflow: "visible",
                "overflow-x": "visible"
            }), n.css(
            {
                width: "auto"
            });
        },
        shiftDrawer: function(e, t, n, i)
        {
            return null == e && (e = 0), null == t && (t = !1), null == n && (n = 450), null == i && (i = "easeInOutQuart"),
            $(".navbar-drawer").toggleClass("translate");
        },
        shiftMobileDrawer: function(e, t, n, i)
        {
            var r;
            return null == e && (e = 0), null == t && (t = !1), null == n && (n = 450), null == i && (i = "easeInOutQuart"),
            r = $(".mobile-drawer"), t ? r.css(
            {
                right: e
            }) : r.animate(
            {
                right: e
            }, n, i);
        },
        toggleDrawer: function(e)
        {
            var t, n, i, r, o, a, s, l;
            return null == e && (e = !0), r = $(".navbar-drawer"), o = $(".navbar-drawer-bar"),
            i = $("#s-content"), $B.TH.canAnimateCSS() ? (s = "translate", t = "translate-left",
            n = "translate-right") : (s = "shown", t = "left", n = "right"), r.hasClass(s) ? (o.removeClass(t + " " + n),
            r.removeClass(s)) : (o.removeClass(t).addClass(n), r.addClass(s)), a = $(".mobile-actions"),
            a.removeClass(s), $B.TH.androidVersion() < 3 ? (l = $(window).scrollTop(), $("#nav-drawer-list").attr("data-top", l)) : void 0;
        },
        toggleMobileDrawer: function(e)
        {
            var t, n;
            return null == e && (e = !0), t = $(".mobile-actions"), 0 !== t.length ? (n = $B.TH.canAnimateCSS() ? "translate" : "shown",
            t.hasClass(n) ? t.removeClass(n) : t.addClass(n)) : void 0;
        },
        detectCSSFeature: function(e)
        {
            var t, n, i, r, o, a, s;
            if (i = !1, t = "Webkit Moz ms O".split(" "), n = document.createElement("div"),
            e = e.toLowerCase(), r = e.charAt(0).toUpperCase() + e.substr(1), void 0 !== n.style[e]) return !0;
            for (a = 0, s = t.length; s > a; a++) if (o = t[a], void 0 !== n.style[o + r]) return !0;
            return !1;
        },
        canAnimateCSS: function()
        {
            return $B.TH.detectCSSFeature("transform") && !$B.TH.isAndroid2x();
        },
        isIE: function()
        {
            var e;
            return e = navigator.userAgent.toLowerCase(), - 1 !== e.indexOf("msie") ? parseInt(e.split("msie")[1]) : !1;
        },
        enableAnimationForBlocks: function(e)
        {
            return null == e && (e = "75%"), !window.edit_page.isShowPage || $B.TH.isMobile() || $B.TH.isIE() && $B.TH.isIE() <= 9 ? void 0 : ($(".fadeInUp").css("opacity", "0").waypoint(function()
            {
                return $(this).addClass("animated");
            },
            {
                offset: e
            }), $(".fadeInRight").css("opacity", "0").waypoint(function()
            {
                return $(this).addClass("animated");
            },
            {
                offset: e
            }));
        },
        applyTouchNav: function()
        {
            var e, t, n;
            if (!$B.getCustomization("disableMobileNav")) return e = $(".navbar-touch").first(),
            $(".navbar-drawer").length && (n = $("#nav-drawer-list"), $(".navbar-drawer, .navbar-drawer-bar, .mobile-actions").removeClass("hidden"),
            $(".mobile-actions").css(
            {
                height: $(".mobile-actions").height()
            }), $("body").bind("touchstart", function()
            {}).attr("ontouchstart", "").attr("screen_capture_injected", "true"),
            $B.TH.isAndroid2x() ? $(window).height() < n.height() && (n.css(
            {
                overflow: "visible",
                height: "auto"
            }), $(window).scroll(function()
            {
                var e, t, i, r;
                return e = parseInt(n.attr("data-top"), 10), e || 0 === e ? (r = $(window).scrollTop(),
                i = e - r, i > 0 && (i = 0), t = $(window).height() - n.height(), t > i && (i = t),
                n.css(
                {
                    top: i
                })) : void 0;
            })) : n.height($(window).height()), $B.TH.canAnimateCSS() && $(".navbar-drawer, .navbar-drawer-bar, .mobile-actions").addClass("strikingly-nav-transition"),
            t = $(".navbar-drawer-bar .navbar-drawer-title"), t.width() < 170 && t.height() < 20 && t.addClass("big")),
            $(window).resize(function()
            {
                return n = $("#nav-drawer-list"), $B.TH.isAndroid2x() || n.height($(window).height()),
                $(".navbar-drawer").hasClass("shown") || $(".navbar-drawer").hasClass("translate") ? $B.TH.toggleDrawer() : void 0;
            });
        },
        matchHeights: function(e)
        {
            var t, n, i, r;
            if (e && ("string" == typeof e && (e = $(e)), 0 !== e.length))
            {
                i = {}, n = 0, e.each(function()
                {
                    var e;
                    return e = $(this), n = e.offset().top + "", i[n] = i[n] ? i[n].add(e) : e;
                }), r = [];
                for (n in i) t = i[n], t.length > 1 ? r.push($B.TH.matchHeightsAll(t)) : r.push(void 0);
                return r;
            }
        },
        matchHeightsAll: function(e)
        {
            var t, n;
            if (0 !== e.length) return t = 0, n = e.first().offset().top, e.each(function()
            {
                var e;
                return e = $(this), e.css("height", "auto"), e.height() > t ? t = e.height() : void 0;
            }), e.each(function()
            {
                return $(this).css("height", t);
            });
        },
        applyMatchHeights: function(e, t)
        {
            var n, i, r;
            return null == e && (e = ".s-mhi"), null == t && (t = ".s-mh"), r = function(e)
            {
                var t;
                return t = !0, e.each(function()
                {
                    return $(this).height() < 2 ? t = !1 : void 0;
                }), t;
            }, n = function(n)
            {
                return null == n && (n = !0), $(t).each(function()
                {
                    var t, i, o, a;
                    return t = $(this), o = t.find(e), i = $(this).find("img"), a = $(this).find("img.lazy"),
                    a.length ? a.on("afterAppear", function()
                    {
                        return r(i) ? $B.TH.matchHeights(o) : void 0;
                    }) : i.length && n ? $(this).waitForImages(function()
                    {
                        return r(i) ? $B.TH.matchHeights(o) : void 0;
                    }) : $B.TH.matchHeights(o);
                });
            }, $(window).resize(function()
            {
                return n(!1);
            }), n(!0), window.edit_page.isShowPage ? void 0 : (i = function(n, i)
            {
                var r, o, a;
                if (i && (o = i.target, a = o.closest(t), a.length)) return r = a.find(e), $B.TH.matchHeights(r);
            }, window.edit_page.Event.subscribe("RichTextComponent.afterTextChange", i), window.edit_page.Event.subscribe("ImageComponent.afterChange", i),
            window.edit_page.Event.subscribe("Repeatable.add", i), window.edit_page.Event.subscribe("Repeatable.remove", i));
        },
        fitText: function(e)
        {
            return 0 !== e.length ? e.each(function()
            {
                var e, t, n, i, r;
                return r = $(this), i = r.width(), n = parseInt(r.css("font-size")), e = r.css(
                {
                    position: "absolute"
                }).width(), r.css(
                {
                    position: "relative"
                }), i >= e ? void 0 : (t = n * i / e, r.css(
                {
                    "font-size": t
                }));
            }) : void 0;
        },
        isTouchDevice: function()
        {
            try
            {
                return document.createEvent("TouchEvent"), !0;
            }
            catch (e)
            {
                return !1;
            }
        },
        touchScroll: function(e)
        {
            var t;
            return $B.TH.isTouchDevice() ? (t = 0, e.addEventListener("touchstart", function(e)
            {
                return t = this.scrollTop + e.touches[0].pageY;
            }, !1), e.addEventListener("touchmove", function(e)
            {
                return this.scrollTop = t - e.touches[0].pageY;
            }, !1)) : void 0;
        },
        resizeIFrame: function(e)
        {
            var t, n, i;
            if (1 !== e.data("height-binding-complete")) return e.data("height-binding-complete", 1),
            $.browser.safari || $.browser.opera ? (e.load(function()
            {
                var t;
                return t = function()
                {
                    return e.height(e.contents().height() + "px");
                }, setTimeout(t, 1);
            }), t = e[0].src, e[0].src = "", e[0].src = t) : e.load(function()
            {
                return e.height(e.contents().height() + "px");
            }), "complete" === (null != (n = e.contents()) ? null != (i = n[0]) ? i.readyState : void 0 : void 0) && e.height() < e.contents().height() ? e.height(e.contents().height() + "px") : void 0;
        },
        adjustIFrameHeight: function()
        {
            return $("iframe.s-show-frame").each(function()
            {
                return $B.TH.resizeIFrame($(this));
            });
        },
        enableParallax: function(e, t)
        {
            return null == t && (t = !1), $B.TH.isMobile() || $B.TH.isSmallScreen() ? void 0 : ($(window).scroll(function()
            {
                var n, i, r;
                return i = $(document).scrollTop(), r = $(window).height(), n = $(document).height(),
                e.each(function()
                {
                    var e, o, a, s, l, u, c;
                    if ($(this).css("background-image").length) return l = $(this), t ? (o = 0, e = n - r) : (c = l.offset().top,
                    u = l.outerHeight(), o = c - r, e = c + u), s = e - o, a = 100 - .01 * ~~ (1e4 * (i - o) / s),
                    t && (a = 100 - a), a >= 0 && 100 >= a ? l.css(
                    {
                        backgroundPosition: "49.5% " + a + "%"
                    }) : void 0;
                });
            }), $(window).scroll());
        },
        setupStrikinglyLogo: function()
        {
            var e, t, n, i, r, o, a;
            return n = $(window), e = $(document), t = $($B.DOM.STRIKINGLY_LOGO), t && t.is(":visible") ? $B.TH.isMobile() ? (t.css(
            {
                bottom: -100,
                position: "fixed"
            }).show(), r = !1, n.scroll(function()
            {
                return r = !0;
            }), setInterval(function()
            {
                var i;
                if (r)
                {
                    if (i = e.height() - n.height() - 20, r = !1, n.scrollTop() >= i) return t.animate(
                    {
                        bottom: -20
                    }, 1e3, "easeInOutBack");
                    if (n.scrollTop() < i) return t.animate(
                    {
                        bottom: -100
                    }, 1e3, "easeInOutBack");
                }
            }, 250)) : (i = -70, t.css(
            {
                bottom: i,
                position: "fixed"
            }).hide(), a = 500, o = 100, n.scroll(function()
            {
                var r, s, l, u, c;
                return l = "free" === (null != (u = $S.page_meta) ? null != (c = u.user) ? c.membership : void 0 : void 0) ? n.height() + 100 : e.height() - a - 200,
                r = e.scrollTop() + n.height() + o, r > l + i ? (s = i + (r - l) / a * 60, s > -10 && (s = -10),
                i > s && (s = i), t.css(
                {
                    bottom: s
                }).show()) : t.css(
                {
                    bottom: i
                });
            })) : void 0;
        },
        disableLazyload: function(e)
        {
            return e.each(function(e, t)
            {
                var n;
                return n = $(t), null != n.data("background") && (null != n.data("background") && n.css("background-image", "url(" + n.data("background") + ")"),
                n.removeClass("lazy")), n.is("img") && null != n.data("original") ? (n.attr("src", n.data("original")),
                n.removeClass("lazy"), n.on("load", function()
                {
                    return n.trigger("afterAppear");
                })) : void 0;
            });
        },
        applyLazyload: function(e)
        {
            return null == e && (e = $(".lazy")), e.lazyload(
            {
                effect: "fadeIn",
                effect_speed: 500,
                skip_invisible: !1,
                threshold: $(window).height()
            }), $("img.lazy-img").each(function()
            {
                return "static" === $(this).css("position") ? $(this).css("position", "relative") : void 0;
            });
        },
        lazyloadSection: function(e)
        {
            return null != e ? ($B.TH.disableLazyload(e.find(".lazy-background")), $B.TH.disableLazyload(e.find(".lazy-img")),
            $B.TH.applyLazyload(e.find(".lazy"))) : void 0;
        },
        lazyload: function()
        {
            var e;
            return $B.TH.isMobile() ? $B.TH.disableLazyload($(".lazy")) : (e = $($B.DOM.SLIDES),
            $B.TH.disableLazyload($($B.DOM.NAVIGATOR).find(".lazy").addBack()), e.each(function(e, t)
            {
                return $B.TH.lazyloadSection($(t));
            }));
        },
        initPageHelpers: function()
        {
            return $B.TH.adjustIFrameHeight(), $B.TH.applyMatchHeights(), window.edit_page.isShowPage ? ($B.TH.lazyload(),
            $B.TH.setupStrikinglyLogo()) : void 0;
        }
    };
}.call(this),
function()
{
    Bobcat.Event = function()
    {
        function e()
        {
            this.topics = {}, this.subUid = -1;
        }
        return e.prototype.subscribe = function(e, t)
        {
            var n;
            return this.topics[e] || (this.topics[e] = []), n = (++this.subUid).to_s, this.topics[e].push(
            {
                token: n,
                func: t
            }), n;
        }, e.prototype.publish = function(e, t)
        {
            var n, i, r, o, a;
            if (!this.topics[e]) return !1;
            for (o = this.topics[e], a = [], i = 0, r = o.length; r > i; i++) n = o[i], a.push(n.func(e, t));
            return a;
        }, e.prototype.unsubscribe = function(e)
        {
            var t, n, i, r, o;
            o = this.topics;
            for (r in o)
            {
                i = o[r];
                for (t in i) if (n = i[t], n.token === e) return i.splice(t, 1), e;
            }
            return !1;
        }, e;
    }();
}.call(this),
function()
{
    var e = function(e, t)
    {
        return function()
        {
            return e.apply(t, arguments);
        };
    };
    window.Bobcat = window.Bobcat || {}, Bobcat.Navigator = function()
    {
        function t()
        {
            this.selectAndGotoSlideWithIndex = e(this.selectAndGotoSlideWithIndex, this), this.registerSlideWaypoint = e(this.registerSlideWaypoint, this),
            this.selectSlideByWaypoint = e(this.selectSlideByWaypoint, this), this.hashTagChangeHandler = e(this.hashTagChangeHandler, this),
            this.getSlideName = e(this.getSlideName, this), this.setupKeyBindings = e(this.setupKeyBindings, this),
            this.prev = e(this.prev, this), this.next = e(this.next, this), this.isLast = e(this.isLast, this),
            this.isFirst = e(this.isFirst, this), this.currentSectionName = e(this.currentSectionName, this),
            this.currentIndex = e(this.currentIndex, this), this.slideIndex = e(this.slideIndex, this),
            this.unlockKeyboard = e(this.unlockKeyboard, this), this.lockKeyboard = e(this.lockKeyboard, this),
            this.removeHash = e(this.removeHash, this), this.setupHashTagChangeHandler = e(this.setupHashTagChangeHandler, this),
            this.runMobileOptimization = e(this.runMobileOptimization, this), this.scrolling = !1,
            this.keyboardLock = !1, this.firstTime = !0, this.current = ko.observable();
        }
        return t.prototype.init = function()
        {
            var e;
            return $B.log("[NAVIGATOR] Init"), this.selectSlide($(".slides .slide").first()),
            this.setupHashTagChangeHandler(), e = this.registerSlideWaypoint, $(".slides .slide").each(function()
            {
                return e($(this));
            }), $B.getCustomization("pageKeybinding") && this.setupKeyBindings(), this.runMobileOptimization();
        }, t.prototype.runMobileOptimization = function()
        {
            var e;
            return e = $B.TH.isMobile(), e && !location.hash ? window.scrollTo(0, 1) : void 0;
        }, t.prototype.setupHashTagChangeHandler = function()
        {
            var e = this;
            return $(window).hashchange(function()
            {
                return e.hashTagChangeHandler(location.hash);
            }), 0 === $(document).scrollTop() ? setTimeout(function()
            {
                return $(window).hashchange();
            }, 1500) : void 0;
        }, t.prototype.removeHash = function()
        {
            var e;
            return e = window.location.hash, "" !== e && "#" !== e && 0 !== e.indexOf("#!/~") ? "undefined" != typeof history && null !== history ? "function" == typeof history.replaceState ? history.replaceState("", document.title, window.location.pathname + window.location.search) : void 0 : void 0 : void 0;
        }, t.prototype.lockKeyboard = function()
        {
            return this.keyboardLock = !0;
        }, t.prototype.unlockKeyboard = function()
        {
            return this.keyboardLock = !1;
        }, t.prototype.slideIndex = function(e)
        {
            var t;
            return t = $(".slides .slide"), t.index(e);
        }, t.prototype.currentIndex = function()
        {
            return this.slideIndex(this.current());
        }, t.prototype.currentSectionName = function()
        {
            return this.current().find("a.section-name-anchor").attr("data-section-name");
        }, t.prototype.isFirst = function()
        {
            var e;
            return e = this.slideIndex(this.current()), 0 === e;
        }, t.prototype.isLast = function()
        {
            var e, t;
            return t = $(".slides .slide"), e = this.slideIndex(this.current()), e === t.length - 1;
        }, t.prototype.next = function()
        {
            var e, t;
            return t = $(".slides .slide"), e = t.index(this.current()), t.length - 1 > e ? this.selectAndGotoSlideWithIndex(e + 1) : e === t.length - 1 ? $("html, body").stop().animate(
            {
                scrollTop: $(document).height() - $(window).height()
            }, 1200, "easeInOutQuart") : void 0;
        }, t.prototype.prev = function()
        {
            var e, t;
            return t = $(".slides .slide"), e = t.index(this.current()), e > 0 ? this.selectAndGotoSlideWithIndex(e - 1) : $("html, body").stop().animate(
            {
                scrollTop: 0
            }, 1200, "easeInOutQuart");
        }, t.prototype.setupKeyBindings = function()
        {
            var e, t, n = this;
            return t = !1, e = !0, $(document).on(
            {
                keydown: function(t)
                {
                    if (13 === t.keyCode && t.shiftKey && window.editorTracker.closeLastEditor(), !n.keyboardLock && !(window.editable && window.currentComponent && window.currentComponent.isState("editor") || $("input:focus, textarea:focus, select:focus, .redactor_editor:focus").length || $(document.activeElement).is(".redactor_editor")))
                    {
                        switch (t.keyCode)
                        {
                        case 32:
                            t.preventDefault();
                            break;

                        case 38:
                            t.preventDefault();
                            break;

                        case 40:
                            t.preventDefault();
                        }
                        return e = !0;
                    }
                },
                keyup: function(i)
                {
                    if (clearTimeout(t), t = !1, !e) return e = !0, void 0;
                    if (!n.keyboardLock && !(window.editable && window.currentComponent && window.currentComponent.isState("editor") || $("input:focus, textarea:focus, select:focus, .redactor_editor:focus").length || $(document.activeElement).is(".redactor_editor"))) switch (i.keyCode)
                    {
                    case 32:
                        return i.preventDefault(), n.next();

                    case 38:
                        return i.preventDefault(), n.prev();

                    case 40:
                        return i.preventDefault(), n.next();
                    }
                }
            });
        }, t.prototype.getSlug = function(e, t)
        {
            return e = e.toSlug(), (0 === e.length || e.match(/^[0-9]+$/g)) && (e = "_" + (t + 1)),
            e;
        }, t.prototype.getSlideNames = function()
        {
            var e, t, n, i, r, o, a, s, l;
            for (i = [], l = window.edit_page.data.slides(), t = a = 0, s = l.length; s > a; t = ++a)
            {
                for (o = l[t], n = r = "#" + this.getSlug(o.getName(), t), e = 1; - 1 !== $.inArray(n, i);) n = r + "-" + e++;
                i.push(n);
            }
            return i;
        }, t.prototype.getSlideName = function(e)
        {
            return this.getSlideNames()[e];
        }, t.prototype.hashTagChangeHandler = function(e)
        {
            var t, n, i, r = this;
            return $B.log("[NAVIGATOR] Got hash change " + e), $("html, body").stop(), n = $('a[data-scroll-name="' + e + '"]'),
            n.length ? (i = n.closest(".slide"), $B.log("[NAVIGATOR] Found section number")) : (t = $.inArray(e, this.getSlideNames()), - 1 !== t && ($B.log("[NAVIGATOR] Found section slug"), i = $("ul.slides .slide").eq(t),
            n = i.find("a.section-anchor").first())), n.length > 0 ? (this.scrolling = !0, window.edit_page.Event.publish("Menu.beforeChange", e),
            $(Bobcat.DOM.FACEBOOK_ROOT).css("height", "1px"), this.selectSlide(i), $B.log("[NAVIGATOR] Animating to #" + ($(".slides .slide").index(i) + 1)),
            $("html, body").stop().animate(
            {
                scrollTop: n.first().offset().top
            }, 1200, "easeInOutQuart", function()
            {
                return $(Bobcat.DOM.FACEBOOK_ROOT).css("height", "0px"), window.edit_page.Event.publish("Menu.afterChange", e),
                r.scrolling = !1;
            })) : void 0;
        }, t.prototype.selectSlideByWaypoint = function(e, t)
        {
            var n;
            return n = this.getSlideName(t), window.location.hash !== n ? ($B.log("[NAVIGATOR] Selecting slide " + (t + 1) + " by waypoint"),
            this.selectSlide(e), this.removeHash()) : void 0;
        }, t.prototype.registerSlideWaypoint = function(e)
        {
            var t, n, i, r, o = this;
            return n = this.slideIndex, e.waypoint(function(t)
            {
                var i, r;
                if (o.firstTime) return o.firstTime = !1, $B.log("[NAVIGATOR] Canceling first waypoint event"),
                void 0;
                if (!o.scrolling)
                {
                    if (r = n(e), "down" === t || 0 === r) i = e;
                    else if ("up" === t && (i = e.prev(),
                    r -= 1, 0 === $(document).scrollTop() && 0 !== r)) return;
                    return $B.log("[NAVIGATOR] Got waypoint event " + t + ", " + r), o.selectSlideByWaypoint(i, r);
                }
            },
            {
                offset: "50%",
                continuous: !1
            }), t = 0, 0 === (null != (i = e.first()) ? null != (r = i.offset()) ? r.top : void 0 : void 0) ? $(window).scroll(function()
            {
                var i;
                if (!o.scrolling && 0 === n(e.first()) && e.first().height() < .5 * $(window).height() && e.eq(1).length)
                {
                    if (i = $(document).scrollTop(), t === i) return;
                    return 0 === i ? o.selectSlideByWaypoint(e.first(), 0) : 0 === t && o.selectSlideByWaypoint(e.eq(1), 1),
                    t = i;
                }
            }) : void 0;
        }, t.prototype.selectSlide = function(e)
        {
            return $(".slides .slide").removeClass("selected"), e.addClass("selected"), this.current(e),
            this.currentIndex();
        }, t.prototype.selectAndGotoSlideWithIndex = function(e)
        {
            return window.location.hash = this.getSlideName(e);
        }, t;
    }();
}.call(this),
function()
{
    var e = function(e, t)
    {
        return function()
        {
            return e.apply(t, arguments);
        };
    }, t = {}.hasOwnProperty,
        n = function(e, n)
        {
            function i()
            {
                this.constructor = e;
            }
            for (var r in n) t.call(n, r) && (e[r] = n[r]);
            return i.prototype = n.prototype, e.prototype = new i(), e.__super__ = n.prototype,
            e;
        };
    window.currentComponent = null, window.currentRepeatable = null, Bobcat.EditorTracker = function(t)
    {
        function i()
        {
            this.closeLastEditor = e(this.closeLastEditor, this), this.addOpenedEditor = e(this.addOpenedEditor, this),
            this.removeFromOpenedEditors = e(this.removeFromOpenedEditors, this), this.hasOpenedEditor = e(this.hasOpenedEditor, this),
            this.openedEditors = [];
        }
        return n(i, t), i.prototype.hasOpenedEditor = function()
        {
            return 0 === this.openedEditors.length;
        }, i.prototype.removeFromOpenedEditors = function(e)
        {
            var t;
            return t = $.inArray(e, this.openedEditors), t > -1 ? this.openedEditors.splice(t, 1) : void 0;
        }, i.prototype.addOpenedEditor = function(e)
        {
            return this.openedEditors.push(e);
        }, i.prototype.closeLastEditor = function()
        {
            var e;
            return e = this.openedEditors.pop(), e && (Bobcat.AE.track("Editor - Combo Key - Done"),
            e.doneClickHandler()), e;
        }, i;
    }($B.Module), window.editorTracker = new Bobcat.EditorTracker(), Bobcat.ComponentHelper = {
        TRANSPARENT_IMAGE_URL: "/assets/icons/transparent.png",
        isImageTransparent: function(e)
        {
            return null == e && (e = ""), - 1 !== e.indexOf(this.TRANSPARENT_IMAGE_URL);
        }
    }, Bobcat.Component = function(t)
    {
        function i(t, n)
        {
            null == t && (t = {}), null == n && (n = {}), this.destroy = e(this.destroy, this),
            this.loadData = e(this.loadData, this), this.doneClickHandler = e(this.doneClickHandler, this),
            this.hideEditorHandler = e(this.hideEditorHandler, this), this.clickEditorHandler = e(this.clickEditorHandler, this),
            this.mouseleaveHandler = e(this.mouseleaveHandler, this), this.mouseenterHandler = e(this.mouseenterHandler, this),
            this.firstTimeToLoad = !0, this.loadData(t, n), this.selected = ko.observable(),
            this.dialogOpen = ko.observable(!1), this.state = ko.observable(0);
        }
        return n(i, t), i.include(Bobcat.ComponentHelper), i.prototype.isNull = function(e)
        {
            return "undefined" == typeof e || null === e;
        }, i.prototype.isState = function(e)
        {
            return "normal" === e && 0 === this.state() ? !0 : "overlay" === e && 1 === this.state() ? !0 : "editor" === e && 2 === this.state() ? !0 : !1;
        }, i.prototype.gotoState = function(e)
        {
            return "normal" === e ? (this === window.currentComponent && (window.currentComponent = null),
            this === window.currentRepeatable && (window.currentRepeatable = null), this.state(0),
            window.editorTracker.removeFromOpenedEditors(this)) : "overlay" === e ? this.type && "RepeatableItem" === this.type() || !window.currentComponent || !window.currentComponent.isState("overlay") ? (this.type && "RepeatableItem" === this.type() ? window.currentRepeatable = this : window.currentComponent = this,
            this.state(1)) : (window.currentComponent.gotoState("normal"), void 0) : "editor" === e ? (window.editorTracker.addOpenedEditor(this),
            this.state(2)) : void 0;
        }, i.prototype.mouseenterHandler = function()
        {
            return this.isState("normal") ? this.gotoState("overlay") : void 0;
        }, i.prototype.mouseleaveHandler = function()
        {
            return this.isState("overlay") ? this.gotoState("normal") : void 0;
        }, i.prototype.clickEditorHandler = function()
        {
            return this.isState("overlay") ? this.gotoState("editor") : void 0;
        }, i.prototype.hideEditorHandler = function()
        {
            return this.isState("editor") ? this.gotoState("normal") : void 0;
        }, i.prototype.doneClickHandler = function(e)
        {
            return this.hideEditorHandler(e), window.edit_page.unsavedChanges() && Bobcat.AE.trackWithoutMixpanel("Editor - Edited " + this.type()),
            window.edit_page.saveWhenUnsaved(!0);
        }, i.prototype.loadData = function(e, t)
        {
            var n, i, r = this;
            null == e && (e = {}), null == t && (t = {}), this.firstTimeToLoad && (this.lastData = e,
            this.firstTimeToLoad = !1), ko.mapping.fromJS(e, t, this);
            for (n in e) i = e[n], this[n] && ko.isSubscribable(this[n]) && this[n].subscribe(function()
            {
                return window.edit_page.unsavedChanges(!0);
            });
            return window.edit_page && window.edit_page.unsavedChanges() && !this.firstTimeToLoad ? (window.edit_page.pushModification(function()
            {
                return ko.mapping.fromJS(r.lastData, t, r);
            }), this.lastData = e) : void 0;
        }, i.prototype.destroy = function()
        {}, i;
    }($B.Module);
}.call(this),
function()
{
    var e = function(e, t)
    {
        return function()
        {
            return e.apply(t, arguments);
        };
    }, t = {}.hasOwnProperty,
        n = function(e, n)
        {
            function i()
            {
                this.constructor = e;
            }
            for (var r in n) t.call(n, r) && (e[r] = n[r]);
            return i.prototype = n.prototype, e.prototype = new i(), e.__super__ = n.prototype,
            e;
        };
    window.asset_path = function(e)
    {
        var t, n;
        return t = $("meta[name=asset-url]").attr("content"), n = /^\/assets\//, n.test(e) && t && (e = t + e),
        e;
    }, Bobcat.DelayJob = function()
    {
        function t()
        {
            this.init = e(this.init, this), this.getAllJobs = e(this.getAllJobs, this), this.getJob = e(this.getJob, this),
            this.add = e(this.add, this), this.jobs = {};
        }
        return t.prototype.add = function(e, t)
        {
            return this.jobs[e] = t;
        }, t.prototype.getJob = function(e)
        {
            return this.jobs[e];
        }, t.prototype.getAllJobs = function()
        {
            var e, t, n, i;
            n = [], i = this.jobs;
            for (t in i) e = i[t], n.push(e);
            return n;
        }, t.prototype.init = function()
        {}, t;
    }(), window.runAfterDomBinding = new Bobcat.DelayJob(), Bobcat.PageData = function(t)
    {
        function i(t)
        {
            this.removePremiumSlides = e(this.removePremiumSlides, this), this.selectedPreset = e(this.selectedPreset, this);
            var n;
            this.isNull(t.showNavigationButtons) && (t.showNavigationButtons = !1), this.isNull(t.submenu) && (t.submenu = {
                type: "SubMenu",
                list: [],
                components: {
                    link: {
                        type: "Button",
                        url: "http://www.wordpress.com",
                        text: "Blog",
                        new_target: !0
                    }
                }
            }), this.isNull(t.templateVariation) && (t.templateVariation = ""), this.isNull(t.templatePreset) && (t.templatePreset = ""),
            n = {
                slides: {
                    create: function(e)
                    {
                        return new Bobcat.Slide(e.data);
                    }
                },
                menu: {
                    create: function(e)
                    {
                        return new Bobcat.Menu(e.data);
                    }
                },
                footer: {
                    create: function(e)
                    {
                        return new Bobcat.Footer(e.data);
                    }
                },
                submenu: {
                    create: function(e)
                    {
                        return new Bobcat.SubMenu(e.data);
                    }
                }
            }, i.__super__.constructor.call(this, t, n);
        }
        return n(i, t), i.prototype.selectedPreset = function()
        {}, i.prototype.removePremiumSlides = function()
        {
            var e, t;
            return (t = $B.meta("premium-slides")) ? (e = t.split(","), this.slides($.grep(this.slides(), function(t)
            {
                return -1 === $.inArray(t.data.template_name, e);
            }))) : void 0;
        }, i.prototype.bindSlides = function()
        {
            var e, t, n, i, r, o, a, s, l, u;
            for (this.menu.bind($(Bobcat.DOM.NAVIGATOR)), this.footer.bind($(Bobcat.DOM.FOOTER)),
            $(Bobcat.DOM.SLIDES).length !== this.slides().length && console.warn("Slide data and .slide classes are different."),
            s = this.slides(), t = i = 0, o = s.length; o > i; t = ++i) n = s[t], e = $(Bobcat.DOM.SLIDES).eq(t),
            n.index(t), n.html(e);
            for (this.slides.subscribe(function(e)
            {
                var n, i, r, o, a;
                for (t = i = 0, o = e.length; o > i; t = ++i) n = e[t], n.index(t);
                for (r = 0, a = e.length; a > r; r++) n = e[r], n.html().find(".section-anchor").attr("data-scroll-name", "#" + (n.index() + 1)),
                n.beforeMoveHandler(), $(".slides").append(n.html()), n.afterMovedHandler();
                return $.waypoints("refresh");
            }), ko.applyBindings(this, Bobcat.DOM.PAGE_DATA_SCOPE), l = this.slides(), u = [],
            r = 0, a = l.length; a > r; r++) n = l[r], u.push(n.bind());
            return u;
        }, i.prototype.addSlideData = function(e, t)
        {
            return this.slides.splice(e, 0, t), window.edit_page.setupTwipsy();
        }, i.prototype.removeSlideData = function(e)
        {
            return this.slides.splice(e, 1), window.edit_page.removeTwipsy();
        }, i.prototype.hideAllEditors = function()
        {
            var e, t, n, i;
            for (i = this.slides(), t = 0, n = i.length; n > t; t++) e = i[t], e.hideAllEditors();
            return this.menu.hideAllEditors();
        }, i.prototype.highlightInNav = function(e)
        {
            var t;
            return t = e.data, t.isSelected() && !t.isHidden() ? !0 : void 0;
        }, i;
    }(Bobcat.Component), Bobcat.Slide = function(t)
    {
        function i(t)
        {
            var n;
            this.data = t, this.destroy = e(this.destroy, this), this.deleteSlide = e(this.deleteSlide, this),
            this.isSelected = e(this.isSelected, this), this.isHighlighted = e(this.isHighlighted, this),
            this.getName = e(this.getName, this), this.isHidden = e(this.isHidden, this), this.selectSlide = e(this.selectSlide, this),
            this.toggleMenu = e(this.toggleMenu, this), this.renameDone = e(this.renameDone, this),
            this.rename = e(this.rename, this), n = {
                components: {
                    create: function(e)
                    {
                        var t, n, i, r;
                        n = {}, r = e.data;
                        for (t in r) i = r[t], n[t] = new Bobcat[i.type](i), "undefined" != typeof n[t].init && n[t].init();
                        return n;
                    }
                }
            }, i.__super__.constructor.call(this, this.data, n), this.html = ko.observable(),
            this.index = ko.observable(), this.renameMode = ko.observable(!1);
        }
        return n(i, t), i.StripHtml = function(e)
        {
            return Bobcat.Gallery.StripHtml(e);
        }, i.prototype.htmlCopy = function()
        {
            return this.html().html();
        }, i.prototype.hideAllEditors = function()
        {
            var e, t, n, i;
            n = this.components, i = [];
            for (t in n) e = n[t], i.push(e.hideEditorHandler());
            return i;
        }, i.prototype.bind = function()
        {
            return ko.applyBindings(this.components, this.html().get(0));
        }, i.prototype.rename = function(e)
        {
            return this.renameMode(!0), window.dom = e, $(e.closest(".section").find("input").first()).focus(),
            window.slide_navigator.lockKeyboard();
        }, i.prototype.renameDone = function()
        {
            return this.renameMode(!1), window.slide_navigator.unlockKeyboard(), Bobcat.AE.track("Editor - Rename Section");
        }, i.prototype.toggleMenu = function()
        {
            var e;
            return e = this.components.slideSettings.show_nav(), this.components.slideSettings.show_nav(!e);
        }, i.prototype.selectSlide = function(e)
        {
            return this.isSelected() ? this.rename(e) : window.slide_navigator.selectAndGotoSlideWithIndex(this.index());
        }, i.prototype.isHidden = function()
        {
            return !this.components.slideSettings.show_nav();
        }, i.prototype.hashHref = function()
        {
            return window.slide_navigator.getSlideName(this.index());
        }, i.prototype.getName = function()
        {
            return this.components.slideSettings.name();
        }, i.prototype.isHighlighted = function()
        {
            var e, t;
            if (this.isSelected() && !this.isHidden()) return !0;
            if (this.index() > window.slide_navigator.currentIndex()) return !1;
            for (e = this.index() + 1, t = window.edit_page.data.slides(); t[e] && t[e].isHidden();)
            {
                if (t[e].isSelected()) return !0;
                e += 1;
            }
            return !1;
        }, i.prototype.isSelected = function()
        {
            return window.slide_navigator.currentIndex() === this.index();
        }, i.prototype.deleteSlide = function()
        {
            var e, t = this;
            return e = !0, $("html body").stop().animate(
            {
                scrollTop: this.html().first().offset().top
            }, 500, "easeInOutQuart", function()
            {
                return e && (e = !1, window.confirm(I18n.t("js.pages.edit.confirm.delete_section"))) ? (window.edit_page.deleteSlide(t.index()),
                t.destroy()) : void 0;
            });
        }, i.prototype.destroy = function()
        {
            var e, t, n, i;
            n = this.components, i = [];
            for (t in n) e = n[t], i.push(e.destroy());
            return i;
        }, i.prototype.duplicateSlide = function()
        {
            return window.edit_page.duplicateSlide(this.index()), window.edit_page.removeTwipsy();
        }, i.prototype.beforeMoveHandler = function()
        {
            var e, t, n, i;
            n = this.components, i = [];
            for (t in n) e = n[t], null != e.beforeMoveHandler ? i.push(e.beforeMoveHandler()) : i.push(void 0);
            return i;
        }, i.prototype.afterMovedHandler = function()
        {}, i;
    }(Bobcat.Component), Bobcat.Text = function(e)
    {
        function t(e)
        {
            var n;
            n = {
                style: {
                    create: function(e)
                    {
                        return new Bobcat.TextStyle(e.data);
                    }
                }
            }, t.__super__.constructor.call(this, e, n), this.oldValue = ko.observable();
        }
        return n(t, e), t.prototype.edit = function()
        {
            return t.__super__.edit.call(this), this["default"]() ? (this.oldValue(this.value()),
            this.value("&nbsp;")) : void 0;
        }, t.prototype.deselect = function()
        {
            return t.__super__.deselect.call(this), this["default"]() ? "&nbsp;" === this.value() ? this.value(this.oldValue()) : this["default"](!1) : void 0;
        }, t;
    }(Bobcat.Component), Bobcat.RichText = function(t)
    {
        function i(t)
        {
            this.isCenterAligned = e(this.isCenterAligned, this), this.isRightAligned = e(this.isRightAligned, this),
            this.isLeftAligned = e(this.isLeftAligned, this), this.hasContentOrIsEditMode = e(this.hasContentOrIsEditMode, this),
            this.showEmptyText = e(this.showEmptyText, this), this.hasContent = e(this.hasContent, this),
            this.clickEditorHandler = e(this.clickEditorHandler, this), this.changeFontHandler = e(this.changeFontHandler, this),
            this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this), this.doneClickHandler = e(this.doneClickHandler, this),
            this.deleteHandler = e(this.deleteHandler, this), i.__super__.constructor.call(this, t),
            this.textarea = null, this.editor = null, this.origin_text = null;
        }
        return n(i, t), i.prototype.deleteHandler = function(e, t)
        {
            return t.stopPropagation(), this.editor && this.editor.tinymce() ? (this.editor.tinymce().setContent(""),
            this.editor.tinymce().focus()) : void 0;
        }, i.prototype.init = function()
        {}, i.prototype.doneClickHandler = function(e)
        {
            return this.done(), i.__super__.doneClickHandler.call(this, e), window.edit_page.Event.publish("RichTextComponent.afterTextChange",
            {
                target: e.closest(".text-component")
            });
        }, i.prototype.clickCancelEditorHandler = function()
        {
            return this.cancel(), this.hideEditorHandler();
        }, i.prototype.changeFontHandler = function(e)
        {
            return this.doneClickHandler(e), window.edit_page.showFontMenu(e.attr("text-type")),
            window.edit_page.showMenu();
        }, i.prototype.clickEditorHandler = function(e)
        {
            var t = this;
            if (i.__super__.clickEditorHandler.call(this, e)) return this.textarea = e.find(Bobcat.DOM.EDITOR).find("textarea"),
            this.origin_text = this.filterText(this.textarea.val()), this.editor && this.editor.tinymce() || (this.editor = this.textarea.tinymce(
            {
                theme: "advanced",
                skin: "striking",
                plugins: "autoresize,paste,inlinepopups",
                forced_root_block: "div",
                remove_linebreaks: !1,
                theme_advanced_buttons1: "bold,italic,underline,link,unlink,bullist,numlist,justifyleft,justifycenter,justifyright,justifyfull",
                theme_advanced_buttons2: "",
                theme_advanced_statusbar_location: "none",
                theme_advanced_toolbar_align: "left",
                paste_text_sticky: !0,
                convert_urls: !1,
                relative_urls: !1,
                valid_styles: {
                    "*": "text-align,text-decoration"
                },
                setup: function(e)
                {
                    return e.onInit.add(function(e)
                    {
                        return e.pasteAsPlainText = !0;
                    }), e.onKeyDown.add(function(e, t)
                    {
                        return 13 === t.keyCode && t.shiftKey && window.editorTracker.closeLastEditor() ? t.preventDefault() : void 0;
                    }), e.onClick.add(function(e)
                    {
                        return $(e.getBody()).find("a").each(function(e, n)
                        {
                            var i;
                            return i = $(n).attr("href"), t.pattern || (t.pattern = new RegExp("^((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i")),
                            t.pattern.test(i) ? ($(n).attr("href", "http://" + i), $(n).attr("data-mce-href", "http://" + i)) : void 0;
                        });
                    });
                }
            })), this.editor.tinymce() ? this.editor.tinymce().focus() : void 0;
        }, i.prototype.hasContent = function()
        {
            return !/^\s*$/.test(this.value());
        }, i.prototype.showEmptyText = function()
        {
            return !this.hasContent() && !this.isState("editor");
        }, i.prototype.hasContentOrIsEditMode = function()
        {
            return this.hasContent() || !window.edit_page.isShowPage;
        }, i.prototype.isLeftAligned = function()
        {
            return /style="text-align: left;"/.test(this.value());
        }, i.prototype.isRightAligned = function()
        {
            return /style="text-align: right;"/.test(this.value());
        }, i.prototype.isCenterAligned = function()
        {
            return /style="text-align: center;"/.test(this.value());
        }, i.prototype.done = function()
        {
            var e;
            return this.editor && this.editor.tinymce() ? (e = this.filterText(this.textarea.val()),
            this.value(e), this.origin_text = e) : void 0;
        }, i.prototype.filterText = function(e)
        {
            return e = e.replace(/^<div>(\s|&nbsp;)?<\/div>$/, ""), e.replace("<p><br></p>", "");
        }, i.prototype.cancel = function()
        {
            return this.editor && this.editor.tinymce() ? (this.value(this.origin_text), this.textarea.tinymce().execCommand("mceSetContent", !1, this.origin_text)) : void 0;
        }, i.prototype.beforeMoveHandler = function()
        {
            return this.editor && this.editor.tinymce() ? (this.editor.tinymce().remove(), this.gotoState("normal")) : void 0;
        }, i.prototype.afterMoveHandler = function()
        {}, i;
    }(Bobcat.Text), Bobcat.SocialMediaList = function(t)
    {
        function i(t)
        {
            this.doneClickHandler = e(this.doneClickHandler, this), this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this),
            this.clickEditorHandler = e(this.clickEditorHandler, this), this.bind = e(this.bind, this);
            var n, r = this;
            n = {
                link_list: {
                    create: function(e)
                    {
                        return new Bobcat[e.data.type](e.data, r);
                    }
                },
                button_list: {
                    create: function(e)
                    {
                        return new Bobcat[e.data.type](e.data, r);
                    }
                }
            }, i.__super__.constructor.call(this, t, n), 0 === this.link_list().length && (this.link_list = ko.observableArray(),
            window.social_media_config.getDefaultLinkList(this)), 0 === this.button_list().length && (this.button_list = ko.observableArray(),
            window.social_media_config.getDefaultButtonList(this)), this.mediaListHtml = ko.observable();
        }
        return n(i, t), i.prototype.bind = function()
        {
            return this.render();
        }, i.prototype.render = function()
        {
            var e, t, n, i, r, o, a, s, l, u;
            for (n = "", s = this.button_list(), i = 0, o = s.length; o > i; i++) t = s[i],
            t.show_button() && (n += t.getTemplate());
            for (this.mediaListHtml(n), l = this.button_list(), u = [], r = 0, a = l.length; a > r; r++) t = l[r],
            e = $('meta[name="force-social-js"]') && "true" === $('meta[name="force-social-js"]').attr("content"),
            window.edit_page.isShowPage ? t.show_button() || e ? u.push(t.reRender()) : u.push(void 0) : u.push(t.reRender());
            return u;
        }, i.prototype.clickEditorHandler = function(e)
        {
            return i.__super__.clickEditorHandler.call(this, e);
        }, i.prototype.clickCancelEditorHandler = function()
        {
            return this.hideEditorHandler();
        }, i.prototype.doneClickHandler = function(e)
        {
            var t, n, r, o;
            for (this.render(), o = this.link_list(), n = 0, r = o.length; r > n; n++) t = o[n],
            t.doneClickHandler();
            return i.__super__.doneClickHandler.call(this, e);
        }, i;
    }(Bobcat.Component), Bobcat.SocialMediaItem = function(t)
    {
        function i(t)
        {
            this.doneClickHandler = e(this.doneClickHandler, this), this.onScriptLoad = e(this.onScriptLoad, this),
            this.getUrl = e(this.getUrl, this);
            var n = this;
            t.link_url || (t.link_url = ""), t.share_text || (t.share_text = window.social_media_config.get("description")),
            i.__super__.constructor.call(this, t), this.show_link = ko.dependentObservable(function()
            {
                return n.link_url().length > 0;
            });
        }
        return n(i, t), i.include(Bobcat.UrlHelper), i.prototype.getUrl = function()
        {
            return this.url && this.url() ? this.url() : window.social_media_config.get("url");
        }, i.prototype.getSubtitle = function()
        {
            return "";
        }, i.prototype.openLinkInput = function(e)
        {
            var t;
            return window.lol = e, t = e.closest(".social-media-item"), t.length ? (t.find("input.url").show(),
            e.hide()) : void 0;
        }, i.prototype.onScriptLoad = function()
        {
            return this.runScript();
        }, i.prototype.createScriptTag = function(e, t)
        {
            var n, i;
            return null;
        }, i.prototype.doneClickHandler = function()
        {
            var e, t;
            return t = this.link_url(), e = this.addProtocol(t, !0), this.link_url(e);
        }, i;
    }(Bobcat.Component), Bobcat.Facebook = function(t)
    {
        function i(t, n)
        {
            this.parent = n, this.runScript = e(this.runScript, this), (!t.app_id || t.app_id.length < 1) && (t.app_id = window.social_media_config.get("fb_app_id")),
            t.imageUrl = asset_path("/assets/icons/facebook.png"), i.__super__.constructor.call(this, t);
        }
        return n(i, t), i.prototype.getSubtitle = function()
        {
            return "Facebook Like";
        }, i.prototype.getTemplate = function()
        {
            return '<div class="col fb-counter"><fb:like href="' + this.getUrl() + '" send="false" layout="button_count" data-width="100" show_faces="false" font="arial"></fb:like></div>';
        }, i.prototype.runScript = function()
        {
            return "undefined" != typeof FB ? (FB.init(
            {
                appId: this.app_id(),
                status: !0,
                cookie: !0,
                xfbml: !0
            }), FB.Event.subscribe("edge.create", function(e)
            {
                return "https://www.facebook.com/strikingly" === e ? (window.mixpanel.track("Editor - Notification - Liked"),
                $.ajax(
                {
                    url: "/s/free_periods.jsm",
                    type: "POST",
                    dataType: "json",
                    beforeSend: function(e)
                    {
                        return e.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"));
                    },
                    data: {
                        type: "like_on_facebook"
                    }
                })) : $("#footer").css("margin-bottom", "150px");
            })) : void 0;
        }, i.prototype.reRender = function()
        {
            return $("#fb-root .facebook_script").length < 1 ? this.createScriptTag("facebook_script", document.location.protocol + "//connect.facebook.net/en_US/all.js") : this.runScript();
        }, i;
    }(Bobcat.SocialMediaItem), Bobcat.Twitter = function(t)
    {
        function i(t, n)
        {
            this.parent = n, this.runScript = e(this.runScript, this), t.imageUrl = asset_path("/assets/icons/twitter.png"),
            i.__super__.constructor.call(this, t);
        }
        return n(i, t), i.prototype.getTemplate = function()
        {
            return '<div class="col twitter-counter"><a href="http://twitter.com/share" class="twitter-share-button" data-url="' + this.getUrl() + '" data-text="' + this.share_text() + '"  data-count="horizontal">Tweet</a></div>';
        }, i.prototype.getSubtitle = function()
        {
            return "Tweet button";
        }, i.prototype.runScript = function()
        {
            return "undefined" != typeof twttr && "undefined" != typeof twttr.widgets ? twttr.widgets.load() : void 0;
        }, i.prototype.reRender = function()
        {
            return $("#fb-root .twitter_script").length < 1 ? this.createScriptTag("twitter_script", document.location.protocol + "//platform.twitter.com/widgets.js") : this.runScript();
        }, i;
    }(Bobcat.SocialMediaItem), Bobcat.GPlus = function(t)
    {
        function i(t, n)
        {
            this.parent = n, this.runScript = e(this.runScript, this), t.imageUrl = asset_path("/assets/icons/gplus.png"),
            i.__super__.constructor.call(this, t);
        }
        return n(i, t), i.prototype.getTemplate = function()
        {
            return '<div class="col gplus-counter"><g:plusone size="medium" annotation="bubble" href="' + this.getUrl() + '" ></g:plusone></div>';
        }, i.prototype.getSubtitle = function()
        {
            return "Google +1";
        }, i.prototype.runScript = function()
        {
            var e;
            return "undefined" != typeof gapi && "undefined" != typeof gapi.plusone ? (e = $(".gplus-counter"),
            e.each(function()
            {
                return gapi.plusone.go(this);
            })) : void 0;
        }, i.prototype.reRender = function()
        {
            return $("#fb-root .gplus_script").length < 1 ? this.createScriptTag("gplus_script", document.location.protocol + "//apis.google.com/js/plusone.js") : this.runScript();
        }, i;
    }(Bobcat.SocialMediaItem), Bobcat.Renren = function(t)
    {
        function i(t, n)
        {
            this.parent = n, this.runScript = e(this.runScript, this), t.imageUrl = asset_path("/assets/icons/renren.png"),
            i.__super__.constructor.call(this, t);
        }
        return n(i, t), i.prototype.getSubtitle = function()
        {
            return "人人喜欢";
        }, i.prototype.getTemplate = function()
        {
            var e, t;
            this.p = [], e = {
                url: this.getUrl(),
                title: window.social_media_config.get("title"),
                description: window.social_media_config.get("description"),
                image: window.social_media_config.get("image")
            };
            for (t in e) this.p.push(t + "=" + encodeURIComponent(e[t] || ""));
            return '<div class="col renren-counter"><iframe scrolling="no" frameborder="0" allowtransparency="true" src="' + document.location.protocol + "//www.connect.renren.com/like/v2?" + this.p.join("&") + '" style="width:130px;height:24px;"></iframe></div>';
        }, i.prototype.runScript = function()
        {}, i.prototype.reRender = function()
        {},
        i;
    }(Bobcat.SocialMediaItem), Bobcat.SinaWeibo = function(t)
    {
        function i(t, n)
        {
            this.parent = n, this.runScript = e(this.runScript, this), this.getTemplate = e(this.getTemplate, this),
            t.imageUrl = asset_path("/assets/icons/weibo.png"), i.__super__.constructor.call(this, t);
        }
        return n(i, t), i.prototype.getSubtitle = function()
        {
            return "新浪微博";
        }, i.prototype.getTemplate = function()
        {
            var e, t, n, i, r;
            r = 90, i = 24, t = {
                url: this.getUrl(),
                type: "2",
                count: "1",
                title: window.social_media_config.get("title"),
                pic: window.social_media_config.get("image"),
                rnd: new Date().valueOf()
            }, n = [];
            for (e in t) n.push(e + "=" + encodeURIComponent(t[e] || ""));
            return '<div class="col sinaweibo-counter"><iframe allowTransparency="true" frameborder="0" scrolling="no" src="' + document.location.protocol + "//hits.sinajs.cn/A1/weiboshare.html?" + n.join("&") + '" width="' + r + '" height="' + i + '"></iframe></div>';
        }, i.prototype.runScript = function()
        {}, i.prototype.reRender = function()
        {},
        i;
    }(Bobcat.SocialMediaItem), Bobcat.Person = function(e)
    {
        function t(e, n)
        {
            this.parent = n, t.__super__.constructor.call(this, e), this.name = new Bobcat.RichText(this.name),
            this.name.init(), this.title = new Bobcat.RichText(this.title), this.title.init(),
            this.image = new Bobcat.Image(this.image,
            {}), this.choosingImage = ko.observable(!1);
        }
        return n(t, e), t.prototype.remove = function()
        {
            return this.parent.list.remove(this);
        }, t.prototype.toggleImageChooser = function()
        {
            return this.choosingImage(!this.choosingImage());
        }, t;
    }(Bobcat.Component), Bobcat.Video = function(t)
    {
        function i(t)
        {
            this.remove = e(this.remove, this), this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this),
            this.clickEditorHandler = e(this.clickEditorHandler, this), this.errorCallback = e(this.errorCallback, this),
            this.successCallback = e(this.successCallback, this), this.upload = e(this.upload, this);
            i.__super__.constructor.call(this, t), this.visible = ko.dependentObservable(function()
            {
                return !window.edit_page.isLoading();
            });
        }
        return n(i, t), i.include(Bobcat.UrlHelper), i.prototype.upload = function(e)
        {
            var t = this;
            if (!window.edit_page.isLoading()) return window.edit_page.isLoading(!0), e.target && (e = $(e.target)),
            this.url(this.addProtocol(this.url())), e.closest("form").ajaxSubmit(
            {
                url: "/s/videos.json",
                type: "POST",
                dataType: "json",
                beforeSend: function(e)
                {
                    return e.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"));
                },
                success: function(e)
                {
                    return console.log(e), "retry" === e.html ? $.strikingPoller("/s/tasks/" + e.message.type + "/" + e.message.id + ".jsm?v=1", t.successCallback, t.errorCallback) : "success" === e.html ? t.successCallback(e) : void 0;
                },
                error: this.errorCallback
            });
        }, i.prototype.successCallback = function(e)
        {
            return window.edit_page.isLoading(!1), this.html(e.message.html), Bobcat.AE.track("Editor - Add Video");
        }, i.prototype.errorCallback = function(e)
        {
            var t;
            return t = jQuery.parseJSON(e.responseText), window.edit_page.isLoading(!1), $B.log(t),
            alert(I18n.t(t.html, t.message.i18n));
        }, i.prototype.clickEditorHandler = function(e)
        {
            return this.oldHtml = this.html(), i.__super__.clickEditorHandler.call(this, e);
        }, i.prototype.clickCancelEditorHandler = function()
        {
            return this.html(this.oldHtml), this.hideEditorHandler();
        }, i.prototype.remove = function()
        {
            return this.html(""), this.url("");
        }, i;
    }(Bobcat.Component), Bobcat.Repeatable = function(t)
    {
        function i(t)
        {
            this.hasContent = e(this.hasContent, this), this.selectedIndex = e(this.selectedIndex, this),
            this.changeToPrev = e(this.changeToPrev, this), this.changeToNext = e(this.changeToNext, this),
            this.changeSelected = e(this.changeSelected, this), this.add = e(this.add, this);
            var n, r = this;
            this.isNull(t.subItemClassName) && (t.subItemClassName = "RepeatableItem"), n = {
                list: {
                    create: function(e)
                    {
                        return new Bobcat[t.subItemClassName](e.data, r);
                    }
                },
                components: {
                    create: function(e)
                    {
                        return e.data;
                    }
                }
            }, i.__super__.constructor.call(this, t, n), this.selected = ko.observable(), this.direction = ko.observable(1);
        }
        return n(i, t), i.prototype.add = function(e)
        {
            var t;
            return t = new(Bobcat[this.subItemClassName()])(
            {
                components: this.components
            }, this), this.changeSelected(t), this.list.push(t), this.changeSelected(t), window.edit_page.Event.publish("Repeatable.add",
            {
                target: e
            }), Bobcat.AE.track("Editor - Add Repeatable");
        }, i.prototype.changeSelected = function(e)
        {
            return this.selected() && e.index() > 0 && this.selectedIndex() > e.index() ? this.direction(-1) : this.direction(1),
            this.selected(e);
        }, i.prototype.changeToNext = function(e)
        {
            return this.changeSelected(this.list()[(e.index() + 1) % this.list().length]);
        }, i.prototype.changeToPrev = function(e)
        {
            return this.changeSelected(this.list()[(e.index() - 1) % this.list().length]);
        }, i.prototype.beforeMoveHandler = function()
        {
            var e, t, n, i, r;
            for (i = this.list(), r = [], t = 0, n = i.length; n > t; t++) e = i[t], null != e.beforeMoveHandler ? r.push(e.beforeMoveHandler()) : r.push(void 0);
            return r;
        }, i.prototype.afterMovedHandler = function()
        {}, i.prototype.selectedIndex = function()
        {
            return this.selected() ? this.selected().index() : void 0;
        }, i.prototype.hasContent = function()
        {
            return this.list().length > 0;
        }, i;
    }(Bobcat.Component), Bobcat.RepeatableItem = function(t)
    {
        function i(t, n)
        {
            var r, o = this;
            this.parent = n, this.smartCol = e(this.smartCol, this), this.deselect = e(this.deselect, this),
            this.selectForEdit = e(this.selectForEdit, this), this.direction = e(this.direction, this),
            this.prev = e(this.prev, this), this.next = e(this.next, this), this.select = e(this.select, this),
            this.showEditor = e(this.showEditor, this), this.leaveDeleteHandler = e(this.leaveDeleteHandler, this),
            this.enterDeleteHandler = e(this.enterDeleteHandler, this), this.isLast = e(this.isLast, this),
            this.isFirst = e(this.isFirst, this), this.isEven = e(this.isEven, this), this.index = e(this.index, this),
            this.remove = e(this.remove, this), r = {
                components: {
                    create: function(e)
                    {
                        var t, n, i, r;
                        n = {}, r = e.data;
                        for (t in r) i = r[t], n[t] = new Bobcat[i.type](i), "undefined" != typeof n[t].init && n[t].init();
                        return n;
                    }
                }
            }, t.type = "RepeatableItem", t.deleteOverlayEnabled = !1, i.__super__.constructor.call(this, t, r),
            this.isSelected = ko.dependentObservable(function()
            {
                return o.parent.selected() === o;
            }, this);
        }
        return n(i, t), i.prototype.remove = function(e)
        {
            var t;
            return t = e.closest(".repeatable").prev(), this.parent.list.remove(this), window.edit_page.Event.publish("Repeatable.remove",
            {
                target: t
            }), Bobcat.AE.track("Editor - Remove Repeatable");
        }, i.prototype.index = function()
        {
            return $.inArray(this, this.parent.list());
        }, i.prototype.isEven = function()
        {
            return this.index() % 2 === 0;
        }, i.prototype.isFirst = function()
        {
            return 0 === this.index();
        }, i.prototype.isLast = function()
        {
            return this.index() === this.parent.list().length - 1;
        }, i.prototype.enterDeleteHandler = function()
        {
            return this.deleteOverlayEnabled(!0);
        }, i.prototype.leaveDeleteHandler = function()
        {
            return this.deleteOverlayEnabled(!1);
        }, i.prototype.showEditor = function()
        {
            var e, t, n, i;
            n = !0, i = this.components;
            for (t in i) e = i[t], n = n && (e.isState("normal") || e.isState("overlay"));
            return n;
        }, i.prototype.select = function()
        {
            return this.parent.changeSelected(this);
        }, i.prototype.next = function()
        {
            return this.deselect(), this.parent.changeToNext(this);
        }, i.prototype.prev = function()
        {
            return this.deselect(), this.parent.changeToPrev(this);
        }, i.prototype.direction = function()
        {
            return this.parent.direction();
        }, i.prototype.selectForEdit = function(e)
        {
            var t, n, i;
            this.deselect(), this.select(e), i = this.components;
            for (n in i) if (t = i[n], "Image" === t.type()) return t.mouseenterHandler(), t.clickEditorHandler(),
            void 0;
        }, i.prototype.deselect = function()
        {
            var e, t, n, i, r, o, a;
            for (o = this.parent.list(), a = [], i = 0, r = o.length; r > i; i++) t = o[i],
            a.push(function()
            {
                var i, r;
                i = t.components, r = [];
                for (n in i) e = i[n], "Image" === e.type() && e.isState("editor") ? r.push(e.clickCancelEditorHandler()) : r.push(void 0);
                return r;
            }());
            return a;
        }, i.prototype.beforeMoveHandler = function()
        {
            var e, t, n, i;
            n = this.components, i = [];
            for (t in n) e = n[t], null != e.beforeMoveHandler ? i.push(e.beforeMoveHandler()) : i.push(void 0);
            return i;
        }, i.prototype.afterMovedHandler = function()
        {}, i.prototype.smartCol = function()
        {
            return 4 === this.parent.list().length || this.parent.list().length < 3;
        }, i;
    }(Bobcat.Component), Bobcat.SubMenu = function(t)
    {
        function i(t)
        {
            this.add = e(this.add, this), t.subItemClassName = "SubMenuItem", i.__super__.constructor.call(this, t);
        }
        return n(i, t), i.prototype.add = function(e)
        {
            return i.__super__.add.call(this, e), this.selected().edit(), window.edit_page.setupTwipsy(),
            Bobcat.AE.track("Editor - Add External Link");
        }, i;
    }(Bobcat.Repeatable), Bobcat.SubMenuItem = function(t)
    {
        function i()
        {
            return this.remove = e(this.remove, this), this.select = e(this.select, this), this.editDone = e(this.editDone, this),
            this.edit = e(this.edit, this), i.__super__.constructor.apply(this, arguments);
        }
        return n(i, t), i.prototype.edit = function()
        {
            return this.gotoState("editor");
        }, i.prototype.editDone = function()
        {
            return this.gotoState("normal"), this.parent.selected(null);
        }, i.prototype.select = function(e)
        {
            return this.isSelected() ? this.parent.selected(null) : (i.__super__.select.call(this, e),
            this.edit());
        }, i.prototype.remove = function(e)
        {
            return window.edit_page.removeTwipsy(), i.__super__.remove.call(this, e);
        }, i;
    }(Bobcat.RepeatableItem), Bobcat.Gallery = function(t)
    {
        function i(t)
        {
            this.prevImage = e(this.prevImage, this), this.nextImage = e(this.nextImage, this),
            this.changeImage = e(this.changeImage, this), this.error_callback = e(this.error_callback, this),
            this.upload = e(this.upload, this), this.clickRemoveCurrentHandler = e(this.clickRemoveCurrentHandler, this),
            this.clickEditorHandler = e(this.clickEditorHandler, this), this.mouseleaveHandler = e(this.mouseleaveHandler, this),
            this.mouseenterHandler = e(this.mouseenterHandler, this), this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this),
            this.add = e(this.add, this);
            var n, r, o = this;
            r = {
                sources: {
                    create: function(e)
                    {
                        return new Bobcat.Image(e.data,
                        {}, o);
                    }
                }
            }, i.__super__.constructor.call(this, t, r), this.nullImage = new Bobcat.Image(
            {
                type: "Image",
                url: "",
                caption: "",
                description: ""
            },
            {}, this), n = function()
            {
                return "";
            }, this.emptyImage = {
                url: n,
                caption: n,
                description: n
            }, this.current = ko.observable(), this.sources().length ? this.current(this.sources()[0]) : this.current(this.nullImage),
            this.empty = ko.dependentObservable(function()
            {
                return 0 === o.sources().length;
            }, this);
        }
        return n(i, t), i.include(Bobcat.ImageOptionHelper), i.StripHtml = function(e)
        {
            return Bobcat.DOM.GALLERY_IMAGES(e).remove(), Bobcat.DOM.GALLERY_IMAGES_EDITOR(e).remove();
        }, i.prototype.add = function(e)
        {
            var t;
            return t = new Bobcat.Image(e,
            {}, this), this.sources.push(t), this.current(t);
        }, i.prototype.clickCancelEditorHandler = function()
        {
            return this.hideEditorHandler();
        }, i.prototype.mouseenterHandler = function()
        {
            return this.isState("normal") ? this.gotoState("overlay") : void 0;
        }, i.prototype.mouseleaveHandler = function()
        {
            return this.isState("overlay") ? this.gotoState("normal") : void 0;
        }, i.prototype.clickEditorHandler = function(e)
        {
            return this.current(e), this.gotoState("editor");
        }, i.prototype.clickRemoveCurrentHandler = function()
        {
            return this.current() && (this.current().clickRemoveHandler(), this.current(this.nullImage)),
            this.gotoState("normal");
        }, i.prototype.upload = function(e)
        {
            var t, n, i = this;
            return e.target && (e = $(e.target)), "undefined" == typeof filepicker ? (alert(I18n.t("js.pages.edit.errors.upload_network_error")),
            _gaq.push(["_trackEvent", "UploadError", "network error"]), void 0) : (t = {
                multiple: !0,
                maxSize: 6291456,
                container: "modal",
                mimetypes: ["image/jpeg", "image/pjpeg", "image/png", "image/gif"],
                openTo: "COMPUTER",
                services: ["COMPUTER", "IMAGE_SEARCH", "URL", "FACEBOOK", "FLICKR", "INSTAGRAM", "DROPBOX", "BOX", "EVERNOTE", "GOOGLE_DRIVE", "PICASA"]
            }, n = function(e, t, n)
            {
                return $.smartPoller(function(i)
                {
                    var r;
                    return r = "/s/tasks/" + t + "/" + e + ".jsm", $.getJSON(r).success(function(e)
                    {
                        return console.log(e), e ? "retry" === e.html ? (i(), void 0) : n(e) : i();
                    }).error(function(e)
                    {
                        return console.log(e), window.edit_page.isLoading(!1), alert(I18n.t("js.pages.edit.errors.upload_network_error"));
                    });
                });
            }, filepicker.pickAndStore(t, window.store_options, function(t)
            {
                var r, o, a, s, l, u;
                for (window.edit_page.isLoading(!0), console.log(t), r = e.closest("form"), a = t.length,
                u = [], s = 0, l = t.length; l > s; s++) o = t[s], u.push($.ajax(
                {
                    url: "/s/assets/create_with_worker.jsm",
                    type: "POST",
                    dataType: "json",
                    crossDomain: !0,
                    data: {
                        asset: {
                            file: o.url,
                            tags: $("meta[name=cloudinary-tags]").attr("content")
                        }
                    },
                    beforeSend: function(e)
                    {
                        return e.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"));
                    },
                    success: function(e)
                    {
                        var t;
                        return t = function(e)
                        {
                            var t, n;
                            return n = i.getOptions(r), t = e.message, i.add(
                            {
                                url: $.cloudinary.url("" + t.public_id + "." + t.format, n.custom),
                                thumb_url: $.cloudinary.url("" + t.public_id + "." + t.format, n.thumb)
                            }), a--, console.log(a), 0 === a ? (window.edit_page.isLoading(!1), Bobcat.AE.track("Editor - Upload Image Gallery"),
                            window.edit_page.save(!0)) : void 0;
                        }, console.log("Begin poll"), n(e.message.id, e.message.type, t);
                    },
                    error: i.error_callback
                }));
                return u;
            }));
        }, i.prototype.error_callback = function(e)
        {
            return window.edit_page.isLoading(!1), alert(I18n.t("js.pages.edit.errors.upload_network_error")),
            e ? _gaq.push(["_trackEvent", "GalleryUploadErrors", e]) : void 0;
        }, i.prototype.changeImage = function(e)
        {
            var t;
            return t = (this.sources.indexOf(this.current()) + e) % this.sources().length, 0 > t && (t += this.sources().length),
            this.current(this.sources()[t]);
        }, i.prototype.nextImage = function()
        {
            return this.changeImage(1);
        }, i.prototype.prevImage = function()
        {
            return this.changeImage(-1);
        }, i.prototype.isLastElement = function(e)
        {
            return e.parent().find(".thumb").index(e) === this.sources().length - 1;
        }, i.prototype.afterRender = function(e)
        {
            var t;
            return this.isLastElement($(e)) ? (t = Bobcat.DOM.GALLERY($(e)), t.fancybox(
            {
                beforeLoad: function()
                {
                    var e;
                    return e = Bobcat.DOM.IMAGE_DESCRIPTION($(this.element)), this.title = Bobcat.DOM.IMAGE_TITLE($(this.element)),
                    e.length ? this.title += " - " + Bobcat.DOM.IMAGE_DESCRIPTION($(this.element)) : void 0;
                },
                closeBtn: !1,
                helpers: {
                    buttons: {},
                    thumbs: {
                        width: 40,
                        height: 40
                    }
                },
                margin: [20, 8, 8, 8],
                padding: 5,
                arrows: !1,
                nextClick: !0,
                nextEffect: "fade",
                prevEffect: "fade"
            })) : void 0;
        }, i;
    }(Bobcat.Component), Bobcat.Button = function(t)
    {
        function i(t)
        {
            this.toggleTarget = e(this.toggleTarget, this), this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this),
            this.clickEditorHandler = e(this.clickEditorHandler, this), this.hasText = e(this.hasText, this),
            this.changeUrl = e(this.changeUrl, this), this.doneClickHandler = e(this.doneClickHandler, this),
            this.link_url = e(this.link_url, this), this.target = e(this.target, this), "undefined" == typeof t.new_target && (t.new_target = !0),
            i.__super__.constructor.call(this, t);
        }
        return n(i, t), i.include(Bobcat.UrlHelper), i.prototype.target = function()
        {
            return this.new_target() && "" !== this.url() ? "_blank" : "_self";
        }, i.prototype.link_url = function()
        {
            var e;
            return e = this.url(), this.addProtocol(e);
        }, i.prototype.doneClickHandler = function(e)
        {
            var t;
            return t = this.addProtocol(this.url()), this.url(t), i.__super__.doneClickHandler.call(this, e);
        }, i.prototype.changeUrl = function(e)
        {
            return this.url(e.attr("data-url"));
        }, i.prototype.hasText = function()
        {
            return this.text().length > 0;
        }, i.prototype.clickEditorHandler = function(e)
        {
            return this.oldText = this.text(), this.oldUrl = this.url(), i.__super__.clickEditorHandler.call(this, e);
        }, i.prototype.clickCancelEditorHandler = function()
        {
            return this.text(this.oldText), this.url(this.oldUrl), this.hideEditorHandler();
        }, i.prototype.toggleTarget = function()
        {
            return this.new_target(!this.new_target());
        }, i;
    }(Bobcat.Component), Bobcat.Image = function(t)
    {
        function i(t, n, r)
        {
            var o = this;
            this.parent = r, this.hasContentOrIsEditMode = e(this.hasContentOrIsEditMode, this),
            this.hasContent = e(this.hasContent, this), this.remove = e(this.remove, this),
            this.clickRemoveHandler = e(this.clickRemoveHandler, this), this.clickGalleryEditorHandler = e(this.clickGalleryEditorHandler, this),
            this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this), this.clickEditorHandler = e(this.clickEditorHandler, this),
            this.addFilter = e(this.addFilter, this), this.uploadFile = e(this.uploadFile, this),
            this.error_callback = e(this.error_callback, this), this.upload = e(this.upload, this),
            this.link = e(this.link, this), this.selectImage = e(this.selectImage, this), this.recover = e(this.recover, this),
            this.previewImage = e(this.previewImage, this), this.doneClickHandler = e(this.doneClickHandler, this),
            this.showDescriptionInput = e(this.showDescriptionInput, this), this.openDescriptionInput = e(this.openDescriptionInput, this),
            this.showLinkInput = e(this.showLinkInput, this), this.openLinkInput = e(this.openLinkInput, this),
            this.goToDescriptionField = e(this.goToDescriptionField, this), this.goToLinkUrlField = e(this.goToLinkUrlField, this),
            this.target = e(this.target, this), this.isNull(t.original_url) && (t.original_url = t.url),
            this.isNull(t.new_target) && (t.new_target = !0), t.linkInputEnabled = t.link_url ? t.link_url.length > 0 : !1,
            t.descriptionInputEnabled = t.caption ? t.caption.length > 0 : !1, this.isNull(t.caption) && (t.caption = ""),
            this.isNull(t.description) && (t.description = ""), i.__super__.constructor.call(this, t, n),
            this.parent && (this.selected = ko.dependentObservable(function()
            {
                return o === o.parent.current();
            }, this)), this.assetUrl = ko.dependentObservable(function()
            {
                return window.asset_path(o.url());
            }, this), this.loadingSpinner = !0;
        }
        return n(i, t), i.include(Bobcat.UrlHelper), i.include(Bobcat.ImageOptionHelper),
        i.prototype.target = function()
        {
            return this.new_target() && "" !== this.link_url() ? "_blank" : "_self";
        }, i.prototype.goToLinkUrlField = function(e, t)
        {
            return e.preventDefault(), $(t).closest("form").find(".link_url").focus(), window.el = t;
        }, i.prototype.goToDescriptionField = function(e, t)
        {
            return e.preventDefault(), $(t).closest("form").find("textarea").focus(), window.el = t;
        }, i.prototype.openLinkInput = function()
        {
            return this.linkInputEnabled(!0);
        }, i.prototype.showLinkInput = function()
        {
            return this.linkInputEnabled();
        }, i.prototype.openDescriptionInput = function()
        {
            return this.descriptionInputEnabled(!0);
        }, i.prototype.showDescriptionInput = function()
        {
            return this.descriptionInputEnabled();
        }, i.prototype.doneClickHandler = function(e)
        {
            return i.__super__.doneClickHandler.call(this, e), window.edit_page.Event.publish("ImageComponent.afterChange",
            {
                target: e.closest(".image-component")
            });
        }, i.prototype.previewImage = function(e)
        {
            return this.tmpUrl || (this.tmpUrl = this.url()), this.url(e.attr("data-image-url")),
            this.onPreview = !0;
        }, i.prototype.recover = function()
        {
            return this.onPreview ? (this.url(this.tmpUrl), this.tmpUrl = "") : void 0;
        }, i.prototype.selectImage = function(e)
        {
            return this.url(e.attr("data-image-url")), this.tmpUrl = "", this.onPreview = !1,
            this.doneClickHandler(e.closest(".editor").find(".se-done-btn").first());
        }, i.prototype.link = function()
        {
            var e;
            return e = this.link_url(), this.addProtocol(e);
        }, i.prototype.upload = function(e)
        {
            var t, n = this;
            return e.target && (e = $(e.target)), "undefined" == typeof filepicker ? (alert(I18n.t("js.pages.edit.errors.upload_network_error")),
            _gaq.push(["_trackEvent", "UploadError", "network error"]), void 0) : (console.log(window.filepicker_options),
            t = {
                maxSize: 6291456,
                container: "modal",
                mimetypes: ["image/jpeg", "image/pjpeg", "image/png", "image/gif"],
                openTo: "COMPUTER",
                services: ["COMPUTER", "IMAGE_SEARCH", "URL", "FACEBOOK", "FLICKR", "INSTAGRAM", "DROPBOX", "BOX", "EVERNOTE", "GOOGLE_DRIVE", "PICASA"]
            }, console.log(t), filepicker.pickAndStore(t, window.store_options, function(t)
            {
                var i, r;
                return console.log(t), r = t[0], i = e.closest("form"), window.edit_page.isLoading(!0),
                n.oldUrl = n.url(), n.loadingSpinner && n.url($('meta[name="loading-image-spinner"]').attr("content")),
                console.log(n.url()), console.log(JSON.stringify(r)), n.uploadFile(r.url, n.getOptions(i));
            }, function(e)
            {
                return _gaq.push(["_trackEvent", "FilepickPickerUploadError", e]);
            }));
        }, i.prototype.error_callback = function(e)
        {
            return this.url(this.oldUrl), window.edit_page.isLoading(!1), alert(I18n.t("js.pages.edit.errors.upload_network_error")),
            window.mixpanel.track("Editor - UploadErrors", e.responseText), _gaq.push(["_trackEvent", "UploadErrors", e.responseText]);
        }, i.prototype.uploadFile = function(e, t)
        {
            var n, i = this;
            return n = function(t, n, i)
            {
                return $.smartPoller(function(r)
                {
                    return e = "/s/tasks/" + n + "/" + t + ".jsm", $.getJSON(e).success(function(e)
                    {
                        return console.log(e), e ? "retry" === e.html ? (r(), void 0) : i(e) : r();
                    }).error(function(e)
                    {
                        return console.log(e), this.url(this.oldUrl), window.edit_page.isLoading(!1), alert(I18n.t("js.pages.edit.errors.upload_network_error"));
                    });
                });
            }, $.ajax(
            {
                url: "/s/assets/create_with_worker.jsm",
                type: "POST",
                dataType: "json",
                crossDomain: !0,
                data: {
                    asset: {
                        file: e,
                        tags: $("meta[name=cloudinary-tags]").attr("content")
                    }
                },
                beforeSend: function(e)
                {
                    return e.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"));
                },
                success: function(e)
                {
                    var r;
                    return r = function(e)
                    {
                        var n;
                        return n = e.message, "BackgroundImage" === i.type() && "gif" !== n.format && (n.format = "jpg",
                        t.custom.quality = 90, t.custom.flags = "progressive"), i.loadData(
                        {
                            url: $.cloudinary.url("" + n.public_id + "." + n.format, t.custom),
                            thumb_url: $.cloudinary.url("" + n.public_id + "." + n.format, t.thumb),
                            original_url: n.url
                        }), window.edit_page.isLoading(!1), Bobcat.AE.track("Editor - Upload Image"), "BackgroundImage" === i.type() ? i.oldUrl = i.url() : void 0;
                    }, console.log("Begin poll"), n(e.message.id, e.message.type, r);
                },
                error: this.error_callback
            });
        }, i.prototype.addFilter = function(e)
        {
            var t, n, i = this;
            return "undefined" == typeof window.featherEditor || "undefined" == typeof filepicker ? (alert(I18n.t("js.pages.edit.errors.effects_network_error")),
            _gaq.push(["_trackEvent", "UploadError", "network error"]), void 0) : (n = "free" === $S.user_meta.plan ? ["effects", "crop", "orientation", "resize", "sharpness", "brightness", "contrast"] : ["enhance", "effects", "crop", "orientation", "resize", "warmth", "brightness", "contrast", "saturation", "sharpness", "text", "redeye", "whiten", "blemish"],
            t = function(e)
            {
                return e = window.asset_path(e), e.replace("https", "http");
            }, window.featherEditor.launch(
            {
                tools: n,
                onSave: function(t, n)
                {
                    var r;
                    return window.edit_page.isLoading(!0), i.oldUrl = i.url(), i.loadingSpinner && i.url($('meta[name="loading-image-spinner"]').attr("content")),
                    window.featherEditor.close(), r = e.closest("form"), i.uploadFile(n, i.getOptions(r));
                },
                image: e.closest("form").find("img"),
                url: t(this.url())
            }));
        }, i.prototype.clickEditorHandler = function(e)
        {
            return this.oldUrl = this.url(), this.oldThumbUrl = this.thumb_url(), i.__super__.clickEditorHandler.call(this, e);
        }, i.prototype.clickCancelEditorHandler = function()
        {
            return this.url(this.oldUrl), this.thumb_url(this.oldThumbUrl), this.hideEditorHandler();
        }, i.prototype.clickGalleryEditorHandler = function(e)
        {
            return this.parent ? (this.parent.current(this), this.parent.gotoState("editor"),
            setTimeout(function()
            {
                return $(window).scrollTo(e.closest(".editable").find(".editor"),
                {
                    easing: "easeOutQuint",
                    duration: 300,
                    axis: "y",
                    offset: -150
                });
            }, 200)) : void 0;
        }, i.prototype.clickRemoveHandler = function()
        {
            return this.parent.sources.remove(this);
        }, i.prototype.remove = function()
        {
            return this.url(this.TRANSPARENT_IMAGE_URL), this.thumb_url(this.TRANSPARENT_IMAGE_URL);
        }, i.prototype.hasContent = function()
        {
            return !this.isImageTransparent(this.url());
        }, i.prototype.hasContentOrIsEditMode = function()
        {
            return this.hasContent() || !window.edit_page.isShowPage;
        }, i;
    }(Bobcat.Component), Bobcat.TextStyle = function(e)
    {
        function t(e, n)
        {
            this.parent = n, t.__super__.constructor.call(this, e);
        }
        return n(t, e), t;
    }(Bobcat.Component), Bobcat.BackgroundImage = function(t)
    {
        function i(t)
        {
            this.onDoneHandler = e(this.onDoneHandler, this), this.onClickHandler = e(this.onClickHandler, this),
            this.selectImage = e(this.selectImage, this), this.stockImages = e(this.stockImages, this),
            this.bgObject = e(this.bgObject, this), this.recover = e(this.recover, this), this.previewImage = e(this.previewImage, this),
            this.remove = e(this.remove, this), this.selectedStyleLazy = e(this.selectedStyleLazy, this),
            this.selectedStyle = e(this.selectedStyle, this), this.textStyle = e(this.textStyle, this);
            var n, r = this;
            n = {}, n.textStyles = {
                create: function(e)
                {
                    return new Bobcat.TextStyle(e.data, this);
                }
            }, "undefined" != typeof t.textStyles && t.textStyles && t.selectedClassName || (t.textStyles = [],
            t.textStyles.push(
            {
                type: "TextStyle",
                displayName: "Light Text",
                colorCode: "#ffffff",
                className: "strikingly-light-text"
            }), t.textStyles.push(
            {
                type: "TextStyle",
                displayName: "Dark Text",
                colorCode: "#222222",
                className: "strikingly-dark-text"
            }), t.selectedClassName = "strikingly-light"), i.__super__.constructor.call(this, t, n),
            this.opacity_f = ko.dependentObservable(function()
            {
                return r.opacity() / 100;
            }), this.onPreview = !1, this.formOpen = !1, this.loadingSpinner = !1;
        }
        return n(i, t), i.prototype.textStyle = function()
        {
            var e, t = this;
            return e = this.textStyles().filter(function(e)
            {
                return e.className() === t.selectedClassName();
            }), e[0];
        }, i.prototype.selectedStyle = function()
        {
            var e, t, n;
            return t = function()
            {
                switch (this.style())
                {
                case "cover":
                    return "cover";

                case "contain":
                    return "contain";

                case "100%":
                    return "100%";

                case "stretch":
                    return "100%";

                case "fit":
                    return "cover";

                default:
                    return "auto";
                }
            }.call(this), e = function()
            {
                switch (this.style())
                {
                case "tile":
                    return "repeat";

                default:
                    return "no-repeat";
                }
            }.call(this), n = {
                backgroundPosition: "49% 50%",
                backgroundImage: "url(" + this.assetUrl() + ")",
                backgroundRepeat: e,
                backgroundSize: t
            };
        }, i.prototype.selectedStyleLazy = function()
        {
            var e;
            return e = this.selectedStyle(), e.backgroundImage = "url(" + asset_path("/assets/icons/transparent.png") + ")",
            e;
        }, i.prototype.remove = function()
        {
            return this.url(this.TRANSPARENT_IMAGE_URL);
        }, i.prototype.previewImage = function(e)
        {
            return this.oldUrl || (this.oldUrl = this.url(), this.oldStyle = this.style()),
            this.url(e.attr("data-url")), this.style(e.attr("data-style")), this.onPreview = !0;
        }, i.prototype.recover = function()
        {
            return this.onPreview ? (this.url(this.oldUrl), this.style(this.oldStyle), this.oldUrl = "",
            this.oldStyle = "") : void 0;
        }, i.prototype.bgObject = function(e)
        {
            return {
                url: "http://uploads.striking.ly/page/images/backgrounds/" + e + ".jpg",
                thumbUrl: "http://uploads.striking.ly/page/images/backgrounds/" + e + "-thumb.jpg",
                style: "stretch",
                component: this
            };
        }, i.prototype.stockImages = function(e)
        {
            var t, n, i, r, o, a, s, l, u;
            if ("solidBanner" === e)
            {
                for (a = ["banners/banner1", "bg3", "banners/banner3", "banners/banner4"], l = [],
                n = 0, r = a.length; r > n; n++) t = a[n], l.push(this.bgObject(t));
                return l;
            }
            for (s = ["bg1", "bg5", "bg6", "bg4"], u = [], i = 0, o = s.length; o > i; i++) t = s[i],
            u.push(this.bgObject(t));
            return u;
        }, i.prototype.selectImage = function(e)
        {
            return this.url(e.attr("data-url")), this.style(e.attr("data-style")), this.oldUrl = "",
            this.oldStyle = "", this.onPreview = !1, window.edit_page.unsavedChanges() && Bobcat.AE.track("Editor - Edit Background"),
            window.edit_page.saveWhenUnsaved();
        }, i.prototype.onClickHandler = function(e)
        {
            var t;
            return t = e.parent().find(".background-form"), this.formOpen ? (t.slideUp(), this.formOpen = !1) : (t.slideDown(),
            this.formOpen = !0);
        }, i.prototype.onDoneHandler = function(e)
        {
            var t;
            return t = e.closest(".background-form"), t.slideUp(), window.edit_page.unsavedChanges() && Bobcat.AE.track("Editor - Edit Background"),
            window.edit_page.saveWhenUnsaved(), this.formOpen = !1;
        }, i;
    }(Bobcat.Image), Bobcat.SlideSettings = function(e)
    {
        function t()
        {
            return t.__super__.constructor.apply(this, arguments);
        }
        return n(t, e), t;
    }(Bobcat.Component), Bobcat.Menu = function(e)
    {
        function t(e)
        {
            var n;
            this.data = e, n = {}, n.components = {
                create: function(e)
                {
                    var t, n, i, r;
                    n = {}, r = e.data;
                    for (t in r) i = r[t], n[t] = new Bobcat[i.type](i), "undefined" != typeof n[t].init && n[t].init();
                    return n;
                }
            }, t.__super__.constructor.call(this, this.data, n);
        }
        return n(t, e), t.prototype.bind = function(e)
        {
            var t, n, i, r;
            if (e.length > 0)
            {
                for (r = [], n = 0, i = e.length; i > n; n++) t = e[n], r.push(ko.applyBindings(this.components, t));
                return r;
            }
            return console.warn("Cannot find .navigator");
        }, t.prototype.hideAllEditors = function()
        {
            return this.logo.hideEditorHandler();
        }, t;
    }(Bobcat.Component), Bobcat.Footer = function(e)
    {
        function t(e)
        {
            var n, i = this;
            n = {
                socialMedia: {
                    create: function(e)
                    {
                        return new Bobcat[e.data.type](e.data, i);
                    }
                },
                copyright: {
                    create: function(e)
                    {
                        return new Bobcat[e.data.type](e.data, i);
                    }
                }
            }, t.__super__.constructor.call(this, e, n);
        }
        return n(t, e), t.prototype.bind = function(e)
        {
            return true;
        }, t;
    }(Bobcat.Component), Bobcat.Media = function(t)
    {
        function i(t)
        {
            this.inEditorAndHasNoContent = e(this.inEditorAndHasNoContent, this), this.hasContentOrIsEditMode = e(this.hasContentOrIsEditMode, this),
            this.hasContent = e(this.hasContent, this), this.showImage = e(this.showImage, this),
            this.showVideo = e(this.showVideo, this), this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this),
            this.clickEditorHandler = e(this.clickEditorHandler, this);
            var n, r = this;
            n = {
                video: {
                    create: function(e)
                    {
                        return new Bobcat.Video(e.data, r);
                    }
                },
                image: {
                    create: function(e)
                    {
                        return new Bobcat.Image(e.data,
                        {}, r);
                    }
                }
            }, i.__super__.constructor.call(this, t, n);
        }
        return n(i, t), i.prototype.clickEditorHandler = function(e)
        {
            return i.__super__.clickEditorHandler.call(this, e), this.image.clickEditorHandler(e),
            this.video.clickEditorHandler(e);
        }, i.prototype.clickCancelEditorHandler = function(e)
        {
            return this.hideEditorHandler(), this.image.hideEditorHandler(e), this.video.hideEditorHandler(e);
        }, i.prototype.showVideo = function()
        {
            return "video" === this.current() && this.video.html() && this.video.html().length > 0;
        }, i.prototype.showImage = function()
        {
            return "image" === this.current();
        }, i.prototype.hasContent = function()
        {
            return "video" === this.current() && this.video.html() || "image" === this.current() && this.image.url() && !this.isImageTransparent(this.image.url());
        }, i.prototype.hasContentOrIsEditMode = function()
        {
            return this.hasContent() || !window.edit_page.isShowPage;
        }, i.prototype.inEditorAndHasNoContent = function()
        {
            return !this.isState("editor") && ("video" === this.current() && (!this.video.html() || 0 === this.video.html().length) || "image" === this.current() && 0 === this.image.url().length);
        }, i;
    }(Bobcat.Component), Bobcat.EmailForm = function(t)
    {
        function i(t)
        {
            this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this), this.clickEditorHandler = e(this.clickEditorHandler, this),
            this.hasMessageBox = e(this.hasMessageBox, this), this.hasNameBox = e(this.hasNameBox, this),
            this.hasEmailBox = e(this.hasEmailBox, this), this.isEmailInvalid = e(this.isEmailInvalid, this),
            this.isNameEmpty = e(this.isNameEmpty, this), this.isSuccess = e(this.isSuccess, this),
            this.isError = e(this.isError, this), this.submit = e(this.submit, this), t.isLoading = !1,
            t.recipient || (t.recipient = ""), this.isNull(t.hideMessageBox) && (t.hideMessageBox = !1),
            this.isNull(t.hide_name) && (t.hide_name = !1), this.isNull(t.hide_email) && (t.hide_email = !1),
            this.isNull(t.thanksMessage) && (t.thanksMessage = "Thanks for your message!"),
            this.isNull(t.name_label) && (t.name_label = "Name", t.email_label = "Email", t.message_label = "Message"),
            this.isNull(t.submit_label) && (t.submit_label = "Submit"), i.__super__.constructor.call(this, t),
            this.status = ko.observable(""), this.invalidEmail = ko.observable(!1), this.invalidName = ko.observable(!1);
        }
        return n(i, t), i.include(Bobcat.UrlHelper), i.prototype.isRecipientEmailValid = function()
        {
            return 0 === this.recipient().length || this.isEmail(this.recipient());
        }, i.prototype.reset = function()
        {
            return this.invalidEmail(!1), this.invalidName(!1), this.isLoading(!1);
        }, i.prototype.submit = function(e)
        {
            var t = this;
            if (window.edit_page.isShowPage) return this.reset(), this.isLoading(!0), e.closest("form").ajaxSubmit(
            {
                success: function(e)
                {
                    return console.log(e), t.status(e.status), t.isLoading(!1), _gaq.push(["_trackEvent", "Actions", "EmailCollected"]),
                    _gaq.push(["b._trackEvent", "Actions", "EmailCollected"]), window.edit_page.Event.publish("Site.contactForm.submit");
                },
                error: function(e)
                {
                    var n;
                    if (n = jQuery.parseJSON(e.responseText), console.log(n), t.status(n.status), t.isLoading(!1), !n.message) throw alert(n.html), n.html;
                    return n.message.invalid_email && t.invalidEmail(!0), n.message.invalid_name ? t.invalidName(!0) : void 0;
                }
            });
        }, i.prototype.isError = function()
        {
            return "error" === this.status();
        }, i.prototype.isSuccess = function()
        {
            return "ok" === this.status();
        }, i.prototype.isNameEmpty = function()
        {
            return this.invalidName();
        }, i.prototype.isEmailInvalid = function()
        {
            return this.invalidEmail();
        }, i.prototype.hasEmailBox = function()
        {
            return !this.hide_email();
        }, i.prototype.hasNameBox = function()
        {
            return !this.hide_name();
        }, i.prototype.hasMessageBox = function()
        {
            return !this.hideMessageBox();
        }, i.prototype.clickEditorHandler = function(e)
        {
            return i.__super__.clickEditorHandler.call(this, e);
        }, i.prototype.clickCancelEditorHandler = function()
        {
            return this.hideEditorHandler();
        }, i;
    }(Bobcat.Component);
}.call(this),
function()
{
    var e = function(e, t)
    {
        return function()
        {
            return e.apply(t, arguments);
        };
    }, t = {}.hasOwnProperty,
        n = function(e, n)
        {
            function i()
            {
                this.constructor = e;
            }
            for (var r in n) t.call(n, r) && (e[r] = n[r]);
            return i.prototype = n.prototype, e.prototype = new i(), e.__super__ = n.prototype,
            e;
        };
    Bobcat.HtmlComponent = function(t)
    {
        function i(t)
        {
            this.done = e(this.done, this), this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this),
            this.doneClickHandler = e(this.doneClickHandler, this), this.clickEditorHandler = e(this.clickEditorHandler, this),
            this.initWhenBound = e(this.initWhenBound, this), this.deselectApp = e(this.deselectApp, this),
            this.selectAppClickHandler = e(this.selectAppClickHandler, this), this.loadAppConfig = e(this.loadAppConfig, this),
            this.saveAppConfig = e(this.saveAppConfig, this), this.saveComponent = e(this.saveComponent, this),
            this.addAppToList = e(this.addAppToList, this), this.reloadIframe = e(this.reloadIframe, this),
            this.createApp = e(this.createApp, this), this.isAppEditorState = e(this.isAppEditorState, this),
            this.goToAppEditorState = e(this.goToAppEditorState, this), this.destroy = e(this.destroy, this),
            t.htmlValue = this.htmlDecode(t.value), t.appEditorState = 0, t.app = null, t.selected_app_name || (t.selected_app_name = null), "undefined" == typeof t.render_as_iframe && (t.render_as_iframe = !1), t.app_list || (t.app_list = "{}"),
            t.editorIframeSrc = "/s/html_editor/" + t.id, i.__super__.constructor.call(this, t),
            this.appList = jQuery.parseJSON(t.app_list), this.originalIframeSrc = this.editorIframeSrc();
        }
        return n(i, t), i.include(Bobcat.HtmlHelper), i.prototype.destroy = function()
        {
            var e;
            return e = $.ajax(
            {
                url: "/s/components/" + this.id(),
                type: "DELETE",
                dataType: "json",
                beforeSend: function(e)
                {
                    return e.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"));
                }
            }), e.success(function(e)
            {
                return console.log(e);
            }), e.error(function(e)
            {
                var t;
                return t = jQuery.parseJSON(e.responseText), console.log(t);
            });
        }, i.prototype.goToAppEditorState = function(e)
        {
            return "selector" === e ? this.appEditorState(0) : "loading" === e ? this.appEditorState(1) : "editor" === e ? this.appEditorState(2) : void 0;
        }, i.prototype.isAppEditorState = function(e)
        {
            return "selector" === e && 0 === this.appEditorState() ? !0 : "loading" === e && 1 === this.appEditorState() ? !0 : "editor" === e && 2 === this.appEditorState() ? !0 : !1;
        }, i.prototype.createApp = function(e, t)
        {
            return t.name = e, new Bobcat[e](t, this);
        }, i.prototype.reloadIframe = function()
        {
            return console.log("reloadIframe"), this.iframeSrcQ || (this.iframeSrcQ = 0), this.editorIframeSrc("" + this.originalIframeSrc + "?q=" + ++this.iframeSrcQ);
        }, i.prototype.addAppToList = function(e, t)
        {
            return this.appList[e] = t.id, this.app_list(JSON.stringify(this.appList));
        }, i.prototype.saveComponent = function()
        {
            var e, t = this;
            return e = ko.mapping.toJS(this), console.log(e), $.ajax(
            {
                url: "/s/components/" + this.id(),
                dataType: "json",
                type: "PUT",
                data: {
                    component: {
                        value: ko.toJSON(e)
                    }
                },
                success: function(e)
                {
                    return t.reloadIframe(), console.log(e);
                }
            });
        }, i.prototype.saveAppConfig = function()
        {
            var e, t;
            return e = this.app().exportConfig(), this.selected_app_name(e.name), t = e.id,
            $.ajax(
            {
                url: "/s/app_configs/" + t + ".jsm",
                dataType: "json",
                type: "PUT",
                data: {
                    app_config: {
                        id: t,
                        config: ko.toJSON(e),
                        component_id: this.id(),
                        app_name: e.name
                    }
                },
                success: function()
                {}
            });
        }, i.prototype.loadAppConfig = function(e, t, n)
        {
            var i = this;
            return this.appList[e] ? $.ajax(
            {
                url: "/s/app_configs/" + this.appList[e] + ".jsm",
                dataType: "json",
                type: "GET",
                success: function(n)
                {
                    return "redirect" === n.status ? (alert(n.html), window.location = n.to, void 0) : t(e, n.message);
                },
                error: function(t)
                {
                    return n(e, t);
                }
            }) : $.ajax(
            {
                url: "/s/app_configs.jsm",
                dataType: "json",
                type: "POST",
                data: {
                    app_config: {
                        app_name: e,
                        page_id: window.edit_page.page_id,
                        component_id: this.id()
                    }
                },
                beforeSend: function(e)
                {
                    return e.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"));
                },
                success: function(n)
                {
                    return "redirect" === n.status ? (alert(n.html), window.location = n.to, void 0) : (i.addAppToList(e, n.message),
                    t(e, n.message));
                },
                error: function(t)
                {
                    return n(e, t);
                }
            });
        }, i.prototype.selectAppClickHandler = function(e)
        {
            var t, n, i, r = this;
            return i = e.attr("data-app-name"), e.addClass("se-loading"), Bobcat.AE.track("Editor - App Store - Select App",
            {
                appName: i
            }), t = function(t, n)
            {
                return r.app(r.createApp(i, n)), r.app().initAndShow(), r.goToAppEditorState("editor"),
                e.removeClass("se-loading");
            }, n = function(t, n)
            {
                return alert(I18n.t("js.pages.edit.errors.network_error")), _gaq.push(["_trackEvent", "AppError", n.responseText]),
                e.removeClass("se-loading");
            }, this.loadAppConfig(i, t, n);
        }, i.prototype.deselectApp = function()
        {
            return this.goToAppEditorState("selector");
        }, i.prototype.initWhenBound = function(e)
        {
            var t;
            return 0 === this.value().length && (this.gotoState("overlay"), this.clickEditorHandler(e.parent())),
            t = e.parent().find("iframe").first(), Bobcat.TH.resizeIFrame(t);
        }, i.prototype.clickEditorHandler = function(e)
        {
            var t;
            if (i.__super__.clickEditorHandler.call(this, e)) return this.textarea = e.find(Bobcat.DOM.EDITOR).find("textarea").first(),
            this.origin_text = this.textarea.val(), this.selected_app_name() ? (t = e.find("li.app-item a[data-app-name='" + this.selected_app_name() + "']"),
            this.selectAppClickHandler(t)) : void 0;
        }, i.prototype.doneClickHandler = function(e)
        {
            return this.done(e) !== !1 ? i.__super__.doneClickHandler.call(this, e) : void 0;
        }, i.prototype.clickCancelEditorHandler = function()
        {
            return this.cancel(), this.hideEditorHandler();
        }, i.prototype.done = function(e)
        {
            var t;
            return this.app().done && this.app().done(e) === !1 ? !1 : (this.saveAppConfig(),
            t = this.textarea.val(), this.value(this.htmlEncode(t)), this.htmlValue(t), this.origin_text = t,
            this.saveComponent());
        }, i.prototype.cancel = function()
        {
            return this.value(this.htmlEncode(this.origin_text)), this.htmlValue(this.origin_text);
        }, i.prototype.viewMoreApps = function()
        {
            return Bobcat.AE.track("Editor - App Store - More"), $.fancybox(
            {
                href: "/assets/app-icons/more-apps.jpg",
                padding: 0,
                scrolling: "no"
            });
        }, i;
    }(Bobcat.Component), Bobcat.App = function(t)
    {
        function i(t, n)
        {
            this.parent = n, this.createScriptTag = e(this.createScriptTag, this), this.onScriptLoad = e(this.onScriptLoad, this),
            this.exportConfig = e(this.exportConfig, this), i.__super__.constructor.call(this, t);
        }
        return n(i, t), i.include(Bobcat.HtmlHelper), i.prototype.exportConfig = function()
        {
            return ko.mapping.toJS(this);
        }, i.prototype.onScriptLoad = function()
        {
            return this.runScript ? this.runScript() : void 0;
        }, i.prototype.createScriptTag = function(e, t)
        {
            var n = this;
            return jQuery.getScript(t, function()
            {
                var t;
                return t = $("<div></div>").addClass(e).appendTo($("#app-script-root")), n.onScriptLoad();
            });
        }, i.prototype.addStrikinglyContainer = function(e, t)
        {
            return "<div class='" + t + "'>" + e + "</div>";
        }, i;
    }(Bobcat.Component), Bobcat.GoogleMapApp = function(t)
    {
        function i(t, n)
        {
            this.parent = n, this.done = e(this.done, this), this.runScript = e(this.runScript, this),
            this.initAndShow = e(this.initAndShow, this), t.location || (t.location = ""), t.zoom || (t.zoom = ""),
            i.__super__.constructor.call(this, t, this.parent);
        }
        return n(i, t), i.prototype.initAndShow = function()
        {
            return $("#app-script-root .google-maps-script").length ? this.runScript() : (window.strikinglyGoogleMapsCallback = function()
            {
                return $(".google-maps-location-input").each(function(e, t)
                {
                    var n;
                    return google.maps.places ? n = new google.maps.places.Autocomplete($(t)[0]) : void 0;
                });
            }, this.createScriptTag("google-maps-script", "http://maps.googleapis.com/maps/api/js?&sensor=false&libraries=places&callback=strikinglyGoogleMapsCallback"));
        }, i.prototype.runScript = function()
        {
            return window.strikinglyGoogleMapsCallback();
        }, i.prototype.done = function(e)
        {
            var t, n, i;
            return i = e.closest(".editor").find(".google-maps-location-input").first().val(),
            this.location(i), n = $.trim(this.location().replace(/\ /g, "+")), "" === n ? (alert(I18n.t("js.pages.edit.html_editor.google_maps.enter_location")), !1) : (t = '<div class="strikingly-map-container"><iframe width="1200" height="420" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="http://maps.google.com/maps?q=' + n + "&oe=UTF-8&ie=UTF8&hq=&hnear=" + n + "&gl=us&z=" + this.zoom() + '&output=embed"></iframe> <br/><br/><small><a target="_blank" href="http://maps.google.com/maps?q=' + n + "&oe=UTF-8&ie=UTF8&hq=&hnear=" + n + "&gl=us&z=" + this.zoom() + '&source=embed" style="">' + I18n.t("js.pages.edit.html_editor.google_maps.view_larger_map") + "</a></small></div>",
            this.parent.value(this.htmlEncode(t)), this.parent.htmlValue(t), this.parent.render_as_iframe(!1));
        }, i;
    }(Bobcat.App), Bobcat.EcwidApp = function(t)
    {
        function i(t, n)
        {
            this.parent = n, this.submit = e(this.submit, this), this.runScript = e(this.runScript, this),
            this.initAndShow = e(this.initAndShow, this), t.storeId || (t.storeId = ""), i.__super__.constructor.call(this, t, this.parent);
        }
        return n(i, t), i.prototype.initAndShow = function()
        {}, i.prototype.runScript = function()
        {},
        i.prototype.submit = function()
        {
            var e, t;
            return (t = $.trim(this.storeId())) ? (e = '<div>      <script type="text/javascript" src="http://app.ecwid.com/script.js?' + t + '"></script>      <script type="text/javascript">         if (Bobcat.TH.isSmallScreen()) {          xProductBrowser("categoriesPerRow=3","views=table(20)","categoryView=table","searchView=list","style=");        } else {           xProductBrowser("categoriesPerRow=3","views=grid(3,3) list(10) table(20)","categoryView=grid","searchView=list","style=");        } </script>      <noscript>Your browser does not support JavaScript.</a></noscript>      </div>',
            e = this.addStrikinglyContainer(e, "strikingly-ecwid-container"), this.parent.value(this.htmlEncode(e)),
            this.parent.htmlValue(e), this.parent.render_as_iframe(!1), this.parent.doneClickHandler()) : (alert(I18n.t("js.pages.edit.html_editor.ecwid.enter_store_id")), !1);
        }, i;
    }(Bobcat.App), Bobcat.HtmlApp = function(t)
    {
        function i(t, n)
        {
            this.parent = n, this.runScript = e(this.runScript, this), this.initAndShow = e(this.initAndShow, this),
            i.__super__.constructor.call(this, t, this.parent);
        }
        return n(i, t), i.prototype.initAndShow = function()
        {}, i.prototype.runScript = function()
        {},
        i;
    }(Bobcat.App), Bobcat.WufooFormApp = function(t)
    {
        function i(t, n)
        {
            this.parent = n, this.runScript = e(this.runScript, this), this.initAndShow = e(this.initAndShow, this),
            i.__super__.constructor.call(this, t, this.parent);
        }
        return n(i, t), i.prototype.initAndShow = function()
        {
            return $("#app-script-root .wufoo-script").length ? this.runScript() : this.createScriptTag("wufoo-script", "http://wufoo.com/scripts/iframe/formEmbedKit.js");
        }, i.prototype.runScript = function()
        {
            var e, t, n, i = this;
            $("#wufoo-view").length > 0 && $("#wufoo-view").remove(), e = $("<div></div>").attr("id", "wufoo-view"),
            $("#app-view-root").append(e), t = function(e)
            {
                var t, r;
                return r = JSON.parse(e), t = r.setup + r.display, t = i.addStrikinglyContainer(t, "strikingly-wufoo-container"),
                i.parent.htmlValue(t), i.parent.value(i.htmlEncode(t)), i.parent.render_as_iframe(!1),
                console.log("Running Wufoo Embed Kit User Callback"), console.log(t), n.destroy(),
                $.fancybox.close(), i.parent.doneClickHandler();
            };
            try
            {
                return n = WufooFormEmbedKit(
                {
                    userDefinedCallback: t,
                    displayElement: "wufoo-view"
                }), n.display(), this.fancybox = $.fancybox(
                {
                    href: "#wufoo-view",
                    padding: 0,
                    scrolling: "no"
                });
            }
            catch (r)
            {
                return console.log("Wufoo Embed Kit Error!"), console.log(r);
            }
        }, i;
    }(Bobcat.App), Bobcat.FacebookCommentsApp = function(t)
    {
        function i(t, n)
        {
            this.parent = n, this.done = e(this.done, this), this.runScript = e(this.runScript, this),
            this.initAndShow = e(this.initAndShow, this), null == t.useCurrentUrl && (t.useCurrentUrl = !0),
            t.url || (t.url = window.social_media_config.get("url")), t.commentsNumber || (t.commentsNumber = 10),
            i.__super__.constructor.call(this, t, this.parent);
        }
        return n(i, t), i.prototype.initAndShow = function()
        {}, i.prototype.runScript = function()
        {},
        i.prototype.done = function()
        {
            var e;
            return e = '<div id="fb-root"></div><script>(function(d, s, id) {  var js, fjs = d.getElementsByTagName(s)[0];  if (d.getElementById(id)) return;  js = d.createElement(s); js.id = id;  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";  fjs.parentNode.insertBefore(js, fjs);}(document, "script", "facebook-jssdk"));</script>',
            this.useCurrentUrl() && this.url(window.social_media_config.get("url")), e += '<div class="fb-comments" data-href="' + this.url() + '" data-num_posts="' + this.commentsNumber() + '" data-width="470"></div>',
            this.parent.value(this.htmlEncode(e)), this.parent.htmlValue(e), this.parent.render_as_iframe(!1);
        }, i;
    }(Bobcat.App), Bobcat.SoundcloudApp = function(t)
    {
        function i(t, n)
        {
            this.parent = n, this.done = e(this.done, this), this.runScript = e(this.runScript, this),
            this.initAndShow = e(this.initAndShow, this), this.validHostname = "soundcloud.com",
            t.soundcloudUrl || (t.soundcloudUrl = ""), i.__super__.constructor.call(this, t, this.parent);
        }
        return n(i, t), i.include(Bobcat.UrlHelper), i.prototype.initAndShow = function()
        {},
        i.prototype.runScript = function()
        {}, i.prototype.done = function()
        {
            var e, t, n, i, r, o;
            return t = this.createUrlParser(this.soundcloudUrl()), t.hostname === this.validHostname ? (i = t.pathname,
            r = i.split("/"), n = 3 === r.length && "groups" !== r[1] ? 166 : 450, o = encodeURI("https://w.soundcloud.com/player/?url=http://api.soundcloud.com" + i),
            e = '<iframe width="100%" height="' + n + '" scrolling="no" frameborder="no" src="' + o + '"></iframe>',
            this.parent.value(this.htmlEncode(e)), this.parent.htmlValue(e), this.parent.render_as_iframe(!1)) : (alert(I18n.t("js.pages.edit.html_editor.soundcloud.errors.invalid_url")), !1);
        }, i;
    }(Bobcat.App), Bobcat.SlidesApp = function(t)
    {
        function i(t, n)
        {
            this.parent = n, this.done = e(this.done, this), this.runScript = e(this.runScript, this),
            this.initAndShow = e(this.initAndShow, this), this.validHostname = "slid.es", t.slidesUrl || (t.slidesUrl = ""),
            null == t.setDefault && (t.setDefault = !0), (t.setDefault || !t.slideWidth) && (t.slideWidth = 576), (t.setDefault || !t.slideHeight) && (t.slideHeight = 420), i.__super__.constructor.call(this, t, this.parent);
        }
        return n(i, t), i.include(Bobcat.UrlHelper), i.prototype.initAndShow = function()
        {},
        i.prototype.runScript = function()
        {}, i.prototype.done = function()
        {
            var e, t;
            return t = this.createUrlParser(this.slidesUrl()), t.hostname === this.validHostname ? (this.setDefault() && (this.slideWidth(576),
            this.slideHeight(420)), e = '<iframe src="' + this.slidesUrl() + '/embed" width="' + this.slideWidth() + '" height="' + this.slideHeight() + '" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
            this.parent.value(this.htmlEncode(e)), this.parent.htmlValue(e), this.parent.render_as_iframe(!1)) : (alert(I18n.t("js.pages.edit.html_editor.slides.errors.invalid_url")), !1);
        }, i;
    }(Bobcat.App);
}.call(this),
function()
{
    ko.bindingHandlers.runWhenBound = {
        init: function(e, t)
        {
            return t()($(e));
        }
    }, ko.bindingHandlers.enterKey = {
        init: function(e, t, n, i)
        {
            var r, o;
            return o = function(e)
            {
                return 13 === e.which ? t().call(this, e) : void 0;
            }, r = function()
            {
                return {
                    keyup: o
                };
            }, ko.bindingHandlers.event.init(e, r, n, i);
        }
    }, ko.bindingHandlers.enterKeyPress = {
        init: function(e, t, n, i)
        {
            var r, o;
            return o = function(n)
            {
                return 13 === n.which ? t().call(this, n, e) : !0;
            }, r = function()
            {
                return {
                    keypress: o
                };
            }, ko.bindingHandlers.event.init(e, r, n, i);
        }
    }, ko.bindingHandlers.className = {
        update: function(e, t)
        {
            var n;
            return e.__ko__previousClassValue__ && $(e).removeClass(e.__ko__previousClassValue__),
            n = ko.utils.unwrapObservable(t()), $(e).addClass(n), e.__ko__previousClassValue__ = n;
        }
    }, ko.bindingHandlers.htmlValue = {
        init: function(e, t, n)
        {
            return ko.utils.registerEventHandler(e, "blur", function()
            {
                var i, r, o;
                return o = t(), r = e.innerHTML, ko.isWriteableObservable(o) ? o(r) : (i = n(), i._ko_property_writers && i._ko_property_writers.htmlValue ? i._ko_property_writers.htmlValue(r) : void 0);
            });
        },
        update: function(e, t)
        {
            var n;
            return n = ko.utils.unwrapObservable(t()), (null === n || void 0 === n) && (n = ""), "textarea" === e.tagName.toLowerCase() ? $(e).val(n) : e.innerHTML = n;
        }
    }, ko.bindingHandlers.escapedValue = {
        init: ko.bindingHandlers.value.init,
        update: function(e, t)
        {
            var n, i, r;
            return r = ko.utils.unwrapObservable(t()), n = /<script\b[^>]*>([\s\S]*?)<\/script>/gim,
            i = /<\/script>/gim, r && (r = r.replace(n, "").replace(i, "")), t()(r), ko.bindingHandlers.value.update(e, t);
        }
    }, ko.bindingHandlers.mouseenter = {
        init: function(e, t)
        {
            return $(e).mouseenter(function(e)
            {
                return t()($(this), e);
            });
        },
        update: function()
        {}
    }, ko.bindingHandlers.mouseleave = {
        init: function(e, t)
        {
            return $(e).mouseleave(function(e)
            {
                return t()($(this), e);
            });
        },
        update: function()
        {}
    }, ko.bindingHandlers.mouseover = {
        init: function(e, t)
        {
            return $(e).mouseover(function(e)
            {
                return t()($(this), e);
            });
        },
        update: function()
        {}
    }, ko.bindingHandlers.mouseout = {
        init: function(e, t)
        {
            return $(e).mouseout(function(e)
            {
                return t()($(this), e);
            });
        },
        update: function()
        {}
    }, ko.bindingHandlers.mouseclick = {
        init: function(e, t)
        {
            return $(e).click(function(e)
            {
                return t()($(this), e);
            });
        },
        update: function()
        {}
    }, ko.bindingHandlers.fadeVisible = {
        init: function(e, t)
        {
            return $(e).toggle(ko.utils.unwrapObservable(t()));
        },
        update: function(e, t)
        {
            return ko.utils.unwrapObservable(t()) ? $(e).css("visibility", "visible").stop().fadeTo(600, 1) : $(e).stop().fadeTo(400, 0, function()
            {
                return $(e).css("visibility", "hidden");
            });
        }
    }, ko.bindingHandlers.fadeVisibleAndHide = {
        init: function(e, t)
        {
            return $(e).toggle(ko.utils.unwrapObservable(t()));
        },
        update: function(e, t)
        {
            return ko.utils.unwrapObservable(t()) ? $(e).css("visibility", "visible").stop().fadeTo(600, 1) : $(e).stop().hide();
        }
    }, ko.bindingHandlers.data = {
        update: function(e, t)
        {
            var n, i, r, o;
            r = ko.utils.unwrapObservable(t()) || {}, o = [];
            for (n in r) i = r[n], i = ko.utils.unwrapObservable(i), "other" === n && "bananas" !== i && console.log(i),
            o.push($(e).data(n, i));
            return o;
        }
    }, ko.bindingHandlers.bind = {
        init: function(e, t)
        {
            var n, i, r;
            return r = ko.utils.unwrapObservable(t()), n = ko.utils.unwrapObservable(r.data),
            i = ko.utils.unwrapObservable(r.html), i ? ($(e).html(i), ko.applyBindings(n, e)) : void 0;
        },
        update: function(e, t)
        {
            var n, i, r;
            return r = ko.utils.unwrapObservable(t()), n = ko.utils.unwrapObservable(r.data),
            i = ko.utils.unwrapObservable(r.html), i ? ($(e).html(i), ko.applyBindings(n, e)) : void 0;
        }
    }, ko.bindingHandlers.slideVisible = {
        init: function(e, t)
        {
            var n;
            return n = t(), $(e).toggle(n), $(e).data("animating", !1);
        },
        update: function(e, t)
        {
            var n;
            return n = t(), n ? ($(e).data("animating", !0), $(e).stop().slideDown(600, "swing", function()
            {
                return $(this).data("animating", !1);
            })) : ($(e).data("animating", !0), $(e).slideUp(600, "swing", function()
            {
                return $(this).data("animating", !1);
            }));
        }
    }, ko.bindingHandlers.slideVisibleAndMoveTo = {
        init: function(e, t)
        {
            var n;
            return n = t(), $(e).toggle(n), $(e).data("animating", !1);
        },
        update: function(e, t)
        {
            var n;
            return n = t(), n ? ($(e).data("animating", !0), $("html, body").stop().animate(
            {
                scrollTop: $(e).parent().offset().top - 100
            }, 1200, "easeInOutQuart", function()
            {
                return $(e).slideDown(600, "swing", function()
                {
                    return $(this).data("animating", !1);
                });
            })) : ($(e).data("animating", !0), $(e).slideUp(600, "swing", function()
            {
                return $(this).data("animating", !1);
            }));
        }
    }, ko.bindingHandlers.bannerVisible = {
        init: function(e, t, n, i)
        {
            return i.isFirst() && i.select(), $(e).show().css(
            {
                left: "0%"
            });
        },
        update: function(e, t, n, i)
        {
            var r, o, a, s;
            if (s = $(e), a = ko.utils.unwrapObservable(t()), r = i.parent.direction(), window.lol = i.parent,
            a)
            {
                if (i.animated) return;
                return console.log("show " + i.index() + " " + r), o = r > 0 ? "100%" : "-100%",
                s.stop().css(
                {
                    left: o
                }).animate(
                {
                    left: "0%"
                }), i.animated = !0;
            }
            return i.animated !== !1 ? (console.log("hide " + i.index() + " " + r), o = r > 0 ? "-100%" : "100%",
            s.stop().css(
            {
                left: "0%"
            }).animate(
            {
                left: o
            }), i.animated = !1) : void 0;
        }
    }, ko.bindingHandlers.slidyButtonSlide = {
        init: function()
        {},
        update: function(e, t)
        {
            var n, i, r;
            if (r = t());
            else if (n = $(e).children(".icon"), i = $(e).children(".title"), !$(e).data("mouseover")) return i.stop(!0), i.css("left", "0"), i.hide("slide",
            {
                direction: "left"
            }, 250), i.removeClass("hover"), n.removeClass("hover");
        }
    }, ko.bindingHandlers.slideVisibleWidth = {
        init: function(e, t)
        {
            var n;
            return n = t(), $(e).toggle(n);
        },
        update: function(e, t)
        {
            var n;
            return n = t(), n ? $(e).show("slide",
            {
                direction: "right"
            }, 600) : $(e).hide("slide",
            {
                direction: "right"
            }, 600);
        }
    }, ko.bindingHandlers.dialogVisible = {
        update: function(e, t)
        {
            var n;
            return n = !! ko.utils.unwrapObservable(t()), $(e).hasClass("dialog") ? n ? $(e).dialog("open") : $(e).dialog("close") : void 0;
        }
    }, ko.bindingHandlers.theme = {
        init: function(e, t)
        {
            var n;
            return n = ko.utils.unwrapObservable(t()), $(e).addClass(n), $(e).data("theme", n);
        },
        update: function(e, t)
        {
            var n;
            return n = ko.utils.unwrapObservable(t()), $(e).removeClass($(e).data("theme")),
            $(e).addClass(n), $(e).data("theme", n);
        }
    }, ko.bindingHandlers.currentDisabled = {
        init: function(e, t)
        {
            var n;
            return n = ko.utils.unwrapObservable(t()), n && n.style && n.style.fontFamily ? $(e).removeAttr("disabled") : $(e).attr("disabled", "disabled");
        },
        update: function(e, t)
        {
            var n;
            return n = ko.utils.unwrapObservable(t()), n && n.style && n.style.fontFamily ? $(e).removeAttr("disabled") : $(e).attr("disabled", "disabled");
        }
    }, ko.bindingHandlers.ensureVisible = {
        init: function()
        {},
        update: function(e, t)
        {
            var n, i, r, o, a, s;
            if (ko.utils.unwrapObservable(t())) return n = $(e), i = n.parent(), s = n.position().top,
            r = s + n.height(), a = i.scrollTop(), o = i.height(), a > s || r > o ? i.scrollTo(n) : void 0;
        }
    }, ko.bindingHandlers.background = {
        init: function(e, t)
        {
            var n;
            return n = ko.utils.unwrapObservable(t()), $(e).attr("src", n);
        },
        update: function(e, t)
        {
            var n;
            return n = ko.utils.unwrapObservable(t()), $(e).attr("src", n);
        }
    }, ko.bindingHandlers.inverseChecked = {
        init: function(e, t, n)
        {
            var i, r, o;
            return o = t(), i = ko.dependentObservable(
            {
                read: function()
                {
                    return !o();
                },
                write: function(e)
                {
                    return o(!e);
                },
                disposeWhenNodeIsRemoved: e
            }), r = function()
            {
                return i;
            }, ko.utils.domData.set(e, "newValueAccessor", r), ko.bindingHandlers.checked.init(e, r, n);
        },
        update: function(e)
        {
            return ko.bindingHandlers.checked.update(e, ko.utils.domData.get(e, "newValueAccessor"));
        }
    }, ko.bindingHandlers.computedStyles = {
        init: function()
        {}
    };
}.call(this),
function()
{
    var e;
    e = window.Bobcat || {}, e.SocialMediaConfig = function()
    {
        function t(e)
        {
            this.settings = e;
        }
        return t.prototype.get = function(e)
        {
            return this.settings[e];
        }, t.prototype.getDefaultLinkList = function(t)
        {
            var n, i, r, o, a;
            for (n = [new e.Facebook(
            {
                type: "Facebook",
                link_url: ""
            }, t), new e.Twitter(
            {
                type: "Twitter",
                link_url: ""
            }, t), new e.GPlus(
            {
                type: "GPlus",
                link_url: ""
            }, t)], a = [], r = 0, o = n.length; o > r; r++) i = n[r], a.push(t.link_list.push(i));
            return a;
        }, t.prototype.getDefaultButtonList = function(t)
        {
            var n, i, r, o, a;
            for (n = [new e.Facebook(
            {
                type: "Facebook",
                show_button: !0,
                url: ""
            }, t), new e.Twitter(
            {
                type: "Twitter",
                show_button: !0,
                url: ""
            }, t), new e.GPlus(
            {
                type: "GPlus",
                show_button: !0,
                url: ""
            }, t)], a = [], r = 0, o = n.length; o > r; r++) i = n[r], a.push(t.button_list.push(i));
            return a;
        }, t;
    }();
}.call(this),
function()
{}.call(this);