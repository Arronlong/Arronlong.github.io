(function(c) {
    window.XBox = {
        version: "v2.4.6.2.1",
		c : c,
        init: function(a) {
            var b = c.defaultConfig(a.site, this.version);
            c.util.extend(b, a || {});
            if (",1,2,3,4,14,15,50,51,52,61,62,63,".indexOf("," + b.site + ",") != -1) c.content = new c.KuBox(b)
        },
        clean: function() {
            c.content.cleanRefresh();
            c.content._bword() == "" && c.content._uword("")
        },
        hide: function() {
            c.content._handler.documentClick.call(c.content, !0)
        },
        kUpdate: function(a) {
            c.content.kUpdate(a)
        },
        yUpdate: function(a) {
            c.content.yUpdate(a)
        },
        dUpdate: function(a) {
            c.content.dUpdate(a)
        },
        gUpdate: function(a) {
            c.content.gUpdate(a)
        },
        cUpdate: function() {
            c.content.cUpdate()
        }
    };
    c.util = {
        readCookie: function(a) {
            var b = "";
            a += "=";
            if (document.cookie.length > 0 && (offset = document.cookie.indexOf(a), offset != -1)) {
                offset += a.length;
                end = document.cookie.indexOf(";", offset);
                if (end == -1) end = document.cookie.length;
                b = unescape(document.cookie.substring(offset, end))
            }
            return b
        },
        writeCookie: function(a, b, d, c, g) {
            var h = "";
            d != null && (h = new Date((new Date).getTime() + d * 36E5), h = "; expires=" + h.toGMTString());
            document.cookie = a + "=" + escape(b) + h + (g == null ? "": "; path=" + g) + (c == null ? "": ";domain=" + c)
        },
        getHistory: function(a) {
            if (!a) return [];
            eval("var items=" + (this.readCookie(a) || "[]"));
            return items
        },
        updateHistory: function(a, b) {
            try {
                if (b) {
                    var d = this.getHistory(a),
                    c = {};
                    c.q = encodeURIComponent(b);
                    for (var g = 0; g < d.length; g++) {
                        var h = d[g];
                        for (k in h) k == "q" && h[k] == c.q && d.splice(g, 1)
                    }
                    for (d.unshift(c); d.length > 10;) d.pop();
                    c = "[";
                    for (g = 0; g < d.length; g++) {
                        h = d[g];
                        g > 0 && (c += ",");
                        c += "{";
                        var m = 0;
                        for (k in h) m > 0 && (c += ","),
                        m++,
                        c += '"' + k + '":"' + h[k] + '"';
                        c += "}"
                    }
                    c += "]";
                    this.writeCookie(a, c, 720, ".soku.com", "/")
                }
            } catch(o) {}
        },
        cleanHistory: function(a) {
            this.writeCookie(a, "", 720, ".soku.com", "/")
        },
        timeOut: function(a, b, d) {
            if (typeof a === "function") {
                if (!this.timeOutContext) this.timeOutContext = {};
                var b = b || 100,
                d = d || null,
                c = this.sample(a);
                this.timeOutContext[c] && window.clearTimeout(this.timeOutContext[c]);
                this.timeOutContext[c] = window.setTimeout(function() {
                    a.apply(d)
                },
                b);
                return this.timeOutContext[c]
            }
        },
        interval: function(a, b, d) {
            if (typeof a === "function") {
                if (!this.intervalContext) this.intervalContext = {};
                var b = b || 100,
                d = d || null,
                c = this,
                g = this.sample(a);
                this.intervalContext[g] && window.clearInterval(this.intervalContext[g]);
                this.intervalContext[g] = window.setInterval(function() {
                    a.apply(d) && window.clearInterval(c.intervalContext[g])
                },
                b);
                return this.intervalContext[g]
            }
        },
        delayLocation: function(a) {
            this.timeOut(function() {
                document.location = a
            },
            100)
        },
        debounce: function(a, b, d) {
            var c = this;
            return function() {
                c.timeOut(a, b, d)
            }
        },
        sample: function(a, b) {
            if (!a) return "";
            var b = b || 30,
            d = a.toString().match(/[a-zA-Z]/g).join(""),
            c = Math.floor(d.length / 6),
            g = d.length - c;
            return d.substring(c, g - c > b ? c + b: g)
        },
        localServer: function() {
            return (window.location.protocol ? window.location.protocol: "") + "//" + (window.location.hostname ? window.location.host: "www.soku.com")
        },
        localPath: function(a) {
            //for (var b = "",
            //d = document.getElementsByTagName("script"), c = 0; d && c < d.length; c++) {
            //    var g = this.trim(d[c].src);
            //    if (g && g.indexOf("js/sk-box") > -1) {
            //        b = g.indexOf("js/sk-box");
            //        b = g.substring(0, b) + (a || "");
            //        break
            //    }
            //}
            //return b
			return 'http://static-new.soku.com/youku/static/soku/inthesky-aone/giantstar/';
        },
        isFunction: function(a) {
            return Object.prototype.toString.call(a) === "[object Function]"
        },
        isArray: function(a) {
            return Object.prototype.toString.call(a) === "[object Array]"
        },
        isNodeList: function(a) {
            return Object.prototype.toString.call(a) === "[object NodeList]"
        },
        isObject: function(a) {
            return Object.prototype.toString.call(a) === "[object Object]"
        },
        isString: function(a) {
            return Object.prototype.toString.call(a) === "[object String]"
        },
        trim: function(a) {
            return String.prototype.trim ? a == null || a == void 0 ? "": String.prototype.trim.call(a) : a == null || a == void 0 ? "": a.toString().replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "")
        },
        equalsIgnoreCase: function(a, b) {
            a = a ? a.toLowerCase() : "";
            b = b ? b.toLowerCase() : "";
            return a == b
        },
        extend: function(a, b) {
            for (var d in b) b.hasOwnProperty(d) && b[d] != null && b[d] != void 0 && (a[d] = b[d])
        },
        contain: function(a, b) {
            if (!a || !b) return ! 1;
            for (k in a) if (a[k] == b) return ! 0;
            return ! 1
        },
        strLength: function(a, b, d) {
            var c = 0;
            if (!a) return c;
            for (i = 0; i < a.length; i++) {
                var g = a.charAt(i);
                c += this.isEn(g) ? d: b
            }
            return c
        },
        substr: function(a, b, d, e) {
            a = c.util.trim(a);
            if (a == "" || b <= 0) return a;
            b = this.isEn(a) ? d: b;
            if (a.length <= b) return a;
            return a.substring(0, b) + (e || "")
        },
        isEn: function(a) {
            return /^[0-9a-zA-Z\[\]\/\s.,')("!&?:-]+$/.test(a)
        },
        isEmptyFun: function(a) {
            return ! a || a.toString().replace(/[\s]+/g, "") == "function(){}"
        },
        htmlEscape: function(a) {
            if (!a) return a;
            return a.replace(/[<\">&]/g,
            function(a) {
                switch (a) {
                case "<":
                    return "&lt;";
                case ">":
                    return "&gt;";
                case '"':
                    return "&quot;";
                case "&":
                    return "&amp;"
                }
            })
        },
        isEmptyObject: function(a) {
            if (!a) return ! 0;
            for (k in a) return ! 1;
            return ! 0
        },
        isEmpty: function(a) {
            return ! c.util.isNotEmpty(a)
        },
        isNotEmpty: function(a) {
            return (this.isArray(a) || this.isNodeList(a) || this.isObject(a)) && a.length && a.length > 0
        }
    };
    c.events = {
        ev: function(a) {
            return a ? a: window.event
        },
        element: function(a) {
            a = this.ev(a);
            return a.target || a.srcElement
        },
        stopDefault: function(a) {
            a = this.ev(a);
            a.preventDefault ? a.preventDefault() : a.returnValue = !1
        },
        stopBubble: function(a) {
            a = this.ev(a);
            a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
        },
        bind: function(a, b) {
            var d = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : null;
            return function() {
                var e = c.util.isString(a) ? b[a] : a,
                g = d ? d.concat(Array.prototype.slice.call(arguments, 0)) : arguments;
                return e.apply(b || e, g)
            }
        },
        attachEvent: function(a, b, d, c, g) {
            if (a) {
                if (b == "keypress" && (navigator.appVersion.match(/Konqueror|Safari|rv:11|KHTML/) || a.attachEvent)) b = "keydown";
                a.addEventListener ? a.addEventListener(b, d, c) : a.attachEvent && (a["e" + b + (g || "") + d] = d, a[b + (g || "") + d] = function() {
                    return a["e" + b + (g || "") + d](window.event)
                },
                a.attachEvent("on" + b, a[b + (g || "") + d]))
            }
        },
        listen: function(a, b, d) {
            c.events.attachEvent(a, b, d, !1, null)
        },
        listenLive: function(a, b, d, e, g) {
            c.events.attachEvent(a, d, this.bind(function(a) {
                var d = c.events.element(a); (d.getAttribute("sk_live") == b || b == "") && e.apply(d, arguments)
            },
            this), g || !1, b)
        }
    };
    c.browser = {
        ua: navigator.userAgent.toLowerCase(),
        isOpera: function() {
            return this.ua.indexOf("opera") > -1
        },
        isChrome: function() {
            return /chrome/.test(this.ua)
        },
        isSafari: function() {
            return ! this.isChrome() && /safari/.test(this.ua)
        },
        isIE: function() {
            return ! this.isOpera() && this.ua.indexOf("msie") > -1
        },
        isIE6: function() {
            return ! this.isOpera() && this.ua.indexOf("msie 6") > -1
        },
        isIE7: function() {
            return ! this.isOpera() && this.ua.indexOf("msie 7") > -1
        },
        isIE8: function() {
            return ! this.isOpera() && this.ua.indexOf("msie 8") > -1
        },
        isGecko: function() {
            return ! this.isSafari() && this.ua.indexOf("gecko") > -1
        }
    };
    c.dom = {
        g: function(a) {
            if ("string" == typeof a || a instanceof String) return document.getElementById(a);
            else if (a && a.nodeName && (a.nodeType == 1 || a.nodeType == 9)) return a;
            return null
        },
        visible: function(a) {
            return this.g(a).style.display != "none"
        },
        hide: function() {
            for (var a = 0; a < arguments.length; a++) this.g(arguments[a]).style.display = "none"
        },
        show: function() {
            for (var a = 0; a < arguments.length; a++) this.g(arguments[a]).style.display = "block"
        },
        getHeight: function(a) {
            a = this.g(a);
            return a.offsetHeight
        },
        addClass: function(a, b) {
            if (a = this.g(a)) a.className = "" == a.className ? b: a.className + " " + b
        },
        removeClass: function(a, b) {
            if (a = this.g(a)) a.className = a.className.replace(RegExp("(^| )" + b + "( |$)"), "$1").replace(/ $/, "")
        },
        hasClass: function(a, b) {
            for (var d = a.className.split(/\s+/), c = 0; c < d.length; c++) if (d[c] == b) return ! 0;
            return ! 1
        },
        attr: function(a, b, d) {
            var c = b;
            if (typeof b === "string") if (d === void 0) return a && a.getAttribute(b);
            else c = {},
            c[b] = d;
            for (var g in c) a.setAttribute(g, c[g])
        },
        isTag: function(a, b) {
            if (!a) return ! 1;
            return a.tagName.toLowerCase() == b.toLowerCase()
        },
        cleanChild: function(a) {
            for (; a.childNodes.length > 0;) a.removeChild(a.firstChild)
        },
        selectText: function(a, b, c) {
            a.createTextRange ? (a = a.createTextRange(), a.moveStart("character", b), a.moveEnd("character", c), a.select()) : (a.setSelectionRange(b, c), a.focus())
        },
        gc: function(a, b, d) {
            var e = [],
            g,
            h,
            m;
            if (! (a = c.util.trim(a))) return null;
            if ("undefined" == typeof b) b = document;
            else if (b = this.g(b), !b) return e;
            d && (d = c.util.trim(d).toUpperCase());
            if (b.getElementsByClassName) {
                h = b.getElementsByClassName(a);
                b = h.length;
                for (g = 0; g < b; g++) m = h[g],
                d && m.tagName != d || (e[e.length] = m)
            } else {
                a = RegExp("(^|\\s)" + a + "(\\s|$)");
                h = d ? b.getElementsByTagName(d) : b.all || b.getElementsByTagName("*");
                b = h.length;
                for (g = 0; g < b; g++) m = h[g],
                a.test(m.className) && (e[e.length] = m)
            }
            return e
        }
    };
    c.defaultConfig = function(a) {
        var b = c.util.localPath(),
        d = b ? b + "css/s_kubox.css": "",
        e = b ? b + "m/css/m_kubox.css": "",
        g = function() {
            $(".yk_search .yk_so input").parent().addClass("yk_on")
        },
        h = function() {
            $(".yk_search .yk_so input").parent().removeClass("yk_on")
        };
        switch (a.toString()) {
        case "1":
            return {
                kUrl:
                "//tip.soku.com/search_tip_1",
                yUrl: "//tip.soku.com/search_tip_1",
                cUrl: "//tip.soku.com/history",
                gUrl: "//tip.soku.com/searches/soku/kubox/v4/sideads.json",
                css: d,
                localPath: b,
                queryUrl: function(a, b) {
                    return a ? b + "/v?keyword=" + encodeURIComponent(a) : ""
                }
            };
        case "2":
            return {
                kUrl:
                "//tip.soku.com/search_tip_1",
                yUrl: "//tip.soku.com/search_tip_1",
                cUrl: "//tip.soku.com/history",
                gUrl: "//tip.soku.com/searches/soku/kubox/v4/sideads.json",
                css: d,
                localPath: b,
                queryUrl: function(a, b) {
                    return a ? b + "/search_video/q_" + encodeURIComponent(a) : ""
                }
            };
        case "3":
            return {
                kUrl:
                "//tip.tudou.soku.com/search_tip_1",
                yUrl: "//tip.tudou.soku.com/search_tip_1",
                cUrl: "//tip.soku.com/history",
                gUrl: "//tip.soku.com/searches/soku/kubox/v4/sideads.json",
                css: d,
                localPath: b,
                queryUrl: function(a, b) {
                    return a ? b + "/t/nisearch/" + encodeURIComponent(a) : ""
                }
            };
        case "4":
            return {
                target:
                "_blank",
                kUrl: "//tip.tudou.soku.com/v1/search_tip",
                yUrl: "//tip.tudou.soku.com/v1/search_tip",
                cUrl: "//tip.soku.com/history",
                gUrl: "//tip.soku.com/searches/soku/kubox/v4/sideads.json",
                css: d,
                localPath: b,
                queryUrl: function(a) {
                    return a ? "//www.soku.com/nt/search/q_" + encodeURIComponent(a) : ""
                }
            };
        case "14":
            return {
                clientMark:
                "__ysuid",
                target: "_blank",
                kUrl: "//tip.soku.com/search_tip_1",
                yUrl: "//tip.soku.com/search_tip_1",
                cUrl: "//tip.soku.com/history",
                gUrl: "//tip.soku.com/searches/soku/kubox/v4/sideads.json",
                css: d,
                localPath: b,
                enterOpen: !1,
                queryUrl: function(a) {
                    return a ? "//www.soku.com/search_video/q_" + encodeURIComponent(a) : ""
                }
            };
        case "15":
            return {
                target:
                "_blank",
                kUrl: "//tip.tudou.soku.com/search_tip_1",
                yUrl: "//tip.tudou.soku.com/search_tip_1",
                cUrl: "//tip.soku.com/history",
                gUrl: "//tip.soku.com/searches/soku/kubox/v4/sideads.json",
                css: d,
                localPath: b,
                cleanDefault: !0,
                queryUrl: function(a) {
                    return a ? "//www.soku.com/t/nisearch/" + encodeURIComponent(a) : ""
                }
            };
        case "50":
            return {
                skin:
                "simple",
                contentId: "id_xbox",
                iframe: !1,
                size: 6,
                kUrl: "//tip.soku.com/searches/soku/kubox/v4/by_keyword.json",
                yUrl: "//tip.soku.com/searches/soku/kubox/v4/by_keyword.json",
                cUrl: "//tip.soku.com/history",
                css: e,
                localPath: b,
                queryUrl: function(a, b) {
                    return a ? b + "/m/s/video?q=" + encodeURIComponent(a) : ""
                }
            };
        case "51":
            return {
                skin:
                "simple",
                contentId: "id_xbox",
                iframe: !1,
                size: 6,
                kUrl: "//tip.soku.com/searches/soku/kubox/v4/by_keyword.json",
                yUrl: "//tip.soku.com/searches/soku/kubox/v4/by_keyword.json",
                cUrl: "//tip.soku.com/history",
                css: e,
                localPath: b,
                queryUrl: function(a, b) {
                    return a ? b + "/m/y/video?q=" + encodeURIComponent(a) : ""
                },
                afterShow: g,
                inputBegin: g,
                inputEnd: h
            };
        case "52":
            return {
                skin:
                "simple",
                contentId: "id_xbox",
                iframe: !1,
                size: 6,
                kUrl: "//tip.tudou.soku.com/searches/soku/kubox/v4/by_keyword.json",
                yUrl: "//tip.tudou.soku.com/searches/soku/kubox/v4/by_keyword.json",
                cUrl: "//tip.soku.com/history",
                css: e,
                localPath: b,
                queryUrl: function(a, b) {
                    return a ? b + "/m/t/video?q=" + encodeURIComponent(a) : ""
                },
                afterShow: g,
                inputBegin: g,
                inputEnd: h
            };
        case "61":
            return {
                skin:
                "simple",
                iframe: !1,
                size: 6,
                clientMark: "__ysuid",
                target: "_blank",
                kUrl: "//tip.soku.com/searches/soku/kubox/v4/by_keyword.json",
                yUrl: "//tip.soku.com/searches/soku/kubox/v4/by_keyword.json",
                cUrl: "//tip.soku.com/history",
                css: e,
                localPath: b,
                queryUrl: function(a) {
                    return a ? "//www.soku.com/m/y/video?q=" + encodeURIComponent(a) : ""
                }
            };
        case "62":
            return {
                kUrl:
                "//tip.soku.com/search_tip_1",
                yUrl: "//tip.soku.com/search_tip_1",
                cUrl: "//tip.soku.com/history",
                css: d,
                sendLog: !1,
                localPath: b,
                queryUrl: function(a, b) {
                    return a ? b + "/search_video/q_" + encodeURIComponent(a) : ""
                }
            };
        case "63":
            return {
                skin:
                "simple",
                iframe: !1,
                useYunCache: !1,
                clientMark: "__ysuid",
                kUrl: "//tip.soku.com/searches/soku/kubox/v4/by_keyword.json",
                yUrl: "//tip.soku.com/searches/soku/kubox/v4/by_keyword.json",
                cUrl: "//tip.soku.com/history",
                css: e,
                localPath: b,
                queryUrl: function(a) {
                    return a ? "//www.soku.com/search_ikuvideo/q_" + encodeURIComponent(a) : ""
                }
            };
        default:
            return {}
        }
    };
    c.XDomain = function(a) {
        this.settings = {
            proxy: "about:blank"
        };
        c.util.extend(this.settings, a || {});
        this.box = document.body || document.getElementsByTagName("head")[0]
    };
    c.util.extend(c.XDomain.prototype, {
        send: function(a) {
            var b = {
                url: null,
                success: function() {},
                dataType: "string"
            };
            c.util.extend(b, a || {});
            if (b.url && typeof b.url === "string") {
                b.url += (b.url.indexOf("?") > 0 ? "&": "?") + "windowname=get";
                var d = document.createElement("iframe");
                d.style.display = "none";
                d._state = 0;
                this.box.appendChild(d);
                c.events.listen(d, "load", c.events.bind(function() {
                    if (d._state == 1) {
                        var a = d.contentWindow.name ? b.dataType == "object" ? eval("(" + d.contentWindow.name + ")") : b.dataType == "string" ? d.contentWindow.name: null: null;
                        b.success && typeof b.success === "function" && b.success.call(this, a);
                        this._destory(d)
                    } else if (d._state == 0) d._state = 1,
                    d.contentWindow.location.replace(this.settings.proxy)
                },
                this));
                d.src = b.url
            }
        },
        _destory: function(a) {
            a.contentWindow.document.write("");
            a.contentWindow.close();
            this.box.removeChild(a)
        }
    });
    c.UUID = {
        create: function() {
            var a = (new Date(1582, 10, 15, 0, 0, 0, 0)).getTime(),
            b = (new Date).getTime() - a,
            a = this._getIntegerBits(b, 0, 31),
            c = this._getIntegerBits(b, 32, 47),
            b = this._getIntegerBits(b, 48, 59) + "1",
            e = this._getIntegerBits(this._rand(4095), 0, 7),
            g = this._getIntegerBits(this._rand(4095), 0, 7),
            h = this._getIntegerBits(this._rand(8191), 0, 7) + this._getIntegerBits(this._rand(8191), 8, 15) + this._getIntegerBits(this._rand(8191), 0, 7) + this._getIntegerBits(this._rand(8191), 8, 15) + this._getIntegerBits(this._rand(8191), 0, 15);
            return a + c + b + e + g + h
        },
        _getIntegerBits: function(a, b, c) {
            for (var a = this._returnBase(a, 16), e = [], g = "", h = 0, h = 0; h < a.length; h++) e.push(a.substring(h, h + 1));
            for (h = Math.floor(b / 4); h <= Math.floor(c / 4); h++) g += !e[h] || e[h] == "" ? "0": e[h];
            return g
        },
        _returnBase: function(a, b) {
            return a.toString(b).toUpperCase()
        },
        _rand: function(a) {
            return Math.floor(Math.random() * (a + 1))
        }
    };
    c.autoremind = function(a) {
        var b = {
            minChars: 0,
            maxChars: 15,
            delay: 150,
            searchId: "headq",
            enterOpen: !0,
            request: function() {},
            moveUp: function() {},
            moveDown: function() {},
            right: function() {},
            del: function() {},
            enter: function() {}
        };
        c.util.extend(b, a || {});
        var d = document.getElementById(b.searchId),
        e = {
            BACKSPACE: 8,
            TAB: 9,
            RETURN: 13,
            ESC: 27,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            DELETE: 46,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            END: 35,
            HOME: 36,
            INSERT: 45,
            SHIFT: 16,
            CTRL: 17,
            ALT: 18,
            CAPSLOCK: 20,
            F1: 112,
            F2: 113,
            F3: 114,
            F4: 115,
            F5: 116,
            F6: 117,
            F7: 118,
            F9: 120,
            F10: 122,
            F12: 123
        };
        c.events.listen(d, "keypress", c.events.bind(function(a) {
            a = a || window.event;
            switch (a.which ? a.which: a.keyCode) {
            case e.RETURN:
                b.enter.apply(this, arguments);
                b.enterOpen && c.events.stopDefault(a);
                break;
            case e.UP:
                b.moveUp.apply(this, arguments);
                c.events.stopDefault(a);
                break;
            case e.DOWN:
                b.moveDown.apply(this, arguments);
                c.events.stopDefault(a);
                break;
            case e.LEFT:
            case e.RIGHT:
                b.right.apply(this, arguments);
                break;
            case e.ESC:
            case e.PAGE_UP:
            case e.PAGE_DOWN:
            case e.END:
            case e.HOME:
            case e.INSERT:
            case e.CTRL:
            case e.ALT:
            case e.SHIFT:
            case e.TAB:
            case e.CAPSLOCK:
            case e.F1:
            case e.F2:
            case e.F3:
            case e.F4:
            case e.F5:
            case e.F6:
            case e.F7:
            case e.F10:
            case e.F11:
            case e.F12:
                break;
            case e.DELETE:
            case e.BACKSPACE:
                c.util.timeOut(function() {
                    b.del.apply(this, arguments)
                },
                50);
            default:
                c.util.timeOut(function() {
                    var a = c.util.trim(d.value).length;
                    a >= b.minChars && a <= b.maxChars && b.request.apply(this, arguments)
                },
                b.delay)
            }
        },
        this))
    };
    c.log = function(a) {
        this.cons = {
            LOG_M_SELECT: "0",
            LOG_MOUSE_SELECT: "1",
            LOG_KEY_SELECT: "2"
        };
        this.settings = {
            site: "",
            costSize: 10,
            abtest: "",
            sendLog: !0
        };
        c.util.extend(this.settings, a || {});
        this.costRepository = {};
        this.costRepositorySize = 0;
        this.startCost = function(a) {
            this.costRepositorySize >= this.settings.costSize || (this.costRepository[a] = (new Date).getTime(), this.costRepositorySize++)
        };
        this.endCost = function(a) {
            var c = this.costRepository[a];
            c && (this.costRepository[a] = (new Date).getTime() - c)
        };
        this.sendCost = function() {
            if (this.settings.sendLog) {
                var a = [];
                for (k in this.costRepository) {
                    var c = this.costRepository[k];
                    c && a.push(c)
                }
                if (a.length != 0) this.costRepository = {},
                this.costRepositorySize = 0,
                a = a.join(","),
                this._request(this._buildLogUrl_cost({
                    type: 4,
                    cost: a
                })),
                this._request(this._buildLogUrl_cost({
                    type: 4,
                    cost: a
                },
                "//p.l.youku.com/sokubox"))
            }
        };
        this.sendExposure = function(a) {
            this.settings.sendLog && (this._request(this._buildLogUrl_exposure(a || {})), this._request(this._buildLogUrl_exposure(a || {},
            "//p.l.youku.com/sokubox")))
        };
        this.sendXposed = function(a) {
            this.settings.sendLog && (this._request(this._buildLogUrl_xposed(a || {})), this._request(this._buildLogUrl_xposed(a || {},
            "//p.l.youku.com/sokubox")))
        };
        this.sendUse = function(a) {
            this.settings.sendLog && (this._request(this._buildClickLogUrl(a || {})), this._request(this._buildLogUrl_use(a || {})), this._request(this._buildLogUrl_use(a || {},
            "//p.l.youku.com/sokubox")))
        };
        this._buildClickLogUrl = function(a) {
            var c = "//lstat.youku.com/sokuClick.php";
            c += "?type=" + (a.type || "");
            c += "&pos=" + (a.pos || "");
            c += "&keyword=" + encodeURIComponent(a.qword || "");
            c += "&url=" + encodeURIComponent(a.url || "");
            c += "&site=" + (this.settings.site || "");
            return c
        };
        this._buildLogUrl_xposed = function(a, c) {
            var e = c || "//log.soku.com/sak.gif";
            e += "?cf=" + this._getCF(this.settings.site);
            e += "&dv=" + this._getVersion(this.settings.abtest, a.dataver);
            e += "&kq=" + (a.wordtype || "");
            e += "&re=" + encodeURIComponent(this._getRefer());
            return e
        };
        this._buildLogUrl_exposure = function(a, c) {
            var e = c || "//log.soku.com/sak.gif";
            e += "?cf=" + this._getCF(this.settings.site);
            e += "&klog=" + (a.klog || "");
            e += "&mo=" + (a.mo || "");
            e += "&info=" + encodeURIComponent(a.info || "");
            return e
        };
        this._buildLogUrl_cost = function(a, c) {
            var e = c || "//log.soku.com/sak.gif";
            e += "?cf=" + this._getCF(this.settings.site);
            e += "&re=" + encodeURIComponent(this._getRefer());
            e += "&cost=" + (a.cost || "");
            return e
        };
        this._buildLogUrl_use = function(a, c) {
            var e = c || "//log.soku.com/sak.gif";
            e += "?cf=" + this._getCF(this.settings.site);
            e += "&pos=" + (a.pos || "");
            e += "&kt=" + (a.operate || "0");
            e += "&kq=" + (a.wordtype || "");
            e += "&ki=" + (a.windex || "000");
            e += "&dv=" + this._getVersion(this.settings.abtest, a.dataver);
            var g = document.getElementById("log_param_soku"),
            g = g ? g.getAttribute("keyword") : "";
            e += "&lk=" + (g || "");
            e += "&ok=" + encodeURIComponent(a.bword || "");
            e += "&k=" + encodeURIComponent(a.qword || "");
            e += "&re=" + encodeURIComponent(this._getRefer());
            e += "&kct=" + (a.kct || "");
            e += "&url=" + encodeURIComponent(a.url || "");
            return e
        };
        this.getKB = function(a) {
            var c = "";
            c += this._getCF(this.settings.site) || "00";
            c += a.pos || "0";
            c += a.operate || "0";
            c += a.wordtype || "0";
            c += a.windex || "000";
            c += this._getVersion(this.settings.abtest, a.dataver, "0", "0000");
            c += this._fullBit(a.kct, 2);
            var e = document.getElementById("log_param_soku"),
            e = e ? e.getAttribute("keyword") : "";
            c += "_" + (e || "");
            c += "_" + encodeURIComponent(a.bword || "");
            return c
        };
        this._fullBit = function(a, c) {
            if (!a) return "00";
            if (a.length >= c) return a;
            for (var e = "",
            g = 0; g < c - a.length; g++) e += "0";
            return e + a
        };
        this._getRefer = function() {
            var a = document.referrer || "";
            if (a != "") return a;
            return window.location
        };
        this._getVersion = function(a, c, e, g) {
            if (c && c.length >= 5) return c;
            a = (a = this._getAbtest(a)) ? a: c ? "0": e || "";
            return (c || g || "") + a
        };
        this._getAbtest = function(a) {
            return a ? a.substring(a.length - 1, a.length) : ""
        };
        this._getCF = function(a) {
            var c = ",50,51,52,61,".indexOf("," + a + ",") > -1 ? "1": "0";
            a += "";
            switch (a) {
            case "50":
                a = "1";
                break;
            case "51":
                a = "2";
                break;
            case "52":
                a = "3";
                break;
            case "14":
            case "61":
            case "62":
            case "63":
                a = "4";
                break;
            case "15":
                a = "5"
            }
            return c + a
        };
        this._request = function(a) {
            var c = new Image,
            e = "soku_sio_log_" + Math.floor(Math.random() * 2147483648).toString(36);
            window[e] = c;
            c.onload = c.onerror = c.onabort = function() {
                c.onload = c.onerror = c.onabort = null;
                c = window[e] = null
            };
            c.src = a
        }
    };
    c.KuBox = function(a) {
        this.settings = {
            site: "",
            localPath: "",
            searchId: "headq",
            searchClass: "headq",
            cancelId: "",
            placeholderId: "",
            size: 10,
            target: "_self",
            contentId: null,
            refreshId: "_xbox_refresh",
            adId: "_xbox_ad",
            abtest: "",
            skin: "classics",
            historyName: "SK_QUERY",
            adHideName: "SK_ADHIDE",
            history: !1,
            crossHistory: !1,
            enable: !0,
            controlButton: !1,
            useYunCache: !0,
            useKuCache: !0,
            sendLog: !0,
            iframe: !0,
            enterOpen: !0,
            cleanDefault: !1,
            clientMark: null,
            kUrl: null,
            yUrl: null,
            cUrl: null,
            gUrl: null,
            css: null,
            confirm: function() {},
            queryUrl: function() {},
            openUrl: function() {},
            beforeEnter: function() {
                return ! 0
            },
            whenInput: function() {},
            inputBegin: function() {},
            inputEnd: function() {},
            appendHeader: function() {},
            appendFooter: function() {},
            appendItem: function() {},
            beforeShow: function() {},
            afterShow: function() {},
            beforeHide: function() {},
            afterHide: function() {}
        };
        c.util.extend(this.settings, a || {});
        this.dom_search = this.searchDom();
        if (this.settings.enable && this.dom_search) this.repository = {},
        this.keys = {},
        this.log = new c.log({
            site: this.settings.site,
            sendLog: this.settings.sendLog,
            abtest: this.settings.abtest
        }),
        this.XDomain = new c.XDomain,
        this.boxUUID = c.UUID.create(),
        this.globalRequestCount = 1,
        this.initQueryWord = this._bword(),
        this.dom_boxDiv = document.createElement("div"),
        this.dom_scriptDiv = document.createElement("div"),
        this.dom_content = this.settings.contentId ? c.dom.g(this.settings.contentId) : this.dom_search.parentNode,
        this.dom_content.appendChild(this.dom_boxDiv),
        this.dom_content.appendChild(this.dom_scriptDiv),
        this.dom_boxDiv.innerHTML = this._skinManager.htmlKeel.call(this, this.settings.skin),
        this.dom_button = this.dom_search.parentNode.getElementsByTagName("BUTTON")[0],
        this.dom_submitform = this.submitform(),
        this.dom_refreshDiv = c.dom.g(this.settings.refreshId),
        //this.dom_adDiv = c.dom.g(this.settings.adId),
        this.dom_cancel = this.settings.cancelId ? c.dom.g(this.settings.cancelId) : null,
        this.hide(),
        this.settings.cleanDefault && this.defaultShow("", this._bword()),
        this.settings.history && c.util.updateHistory(this.settings.historyName, this._bword()),
        this.importCss(this.settings.css,
        function() {
            this._skinManager.event.call(this, this.settings.skin)
        }),
        this._handler._requestYkYun.call(this, "XBox.dUpdate"),
        this._handler._requestAd.call(this)
    };
    c.util.extend(c.KuBox.prototype, {
        kUpdate: function(a) {
            if (typeof a == "object") {
                var b = a.q;
                this.repository[b] = a;
                b == this._bword() && (this.cleanRefresh(), this.show(b))
            }
        },
        yUpdate: function(a) {
            if (typeof a == "object") {
                var b = a.q || "";
                this.repository[b] = a;
                b == this._bword() && (this.cleanRefresh(), this.show(b))
            }
        },
        dUpdate: function(a) {
            if (typeof a == "object") {
                var b = a.dq || "";
                this.repository[a.q || ""] = a;
                this.defaultShow(b)
            }
        },
        gUpdate: function(a) {
           // this.dom_adDiv.innerHTML = this._skinManager.htmlAd.call(this, this.settings.skin, a)
        },
        gbUpdate: function(a) {
            var b = c.dom.gc("sk_adsb", this.dom_adDiv, "div");
            b && b.length > 0 && b[0].parentNode.removeChild(b[0]);
            //this.dom_adDiv.innerHTML += this._skinManager.htmlAd.call(this, this.settings.skin, a)
        },
        cUpdate: function() {
            this.settings.inputEnd.apply(this, arguments);
            this.cleanRefresh();
            this.repository[""] = "";
            this.keys[""] = ""
        },
        show: function(a) {
            this.settings.beforeShow.apply(this, arguments);
            var b = !1;
            if (this.dom_refreshDiv.childNodes.length > 0 && this.dom_search.getAttribute("_xbox_show") == this._bword()) c.dom.visible(this.dom_boxDiv) || (c.dom.show(this.dom_boxDiv), b = !0);
            else {
                var d = this.settings.appendItem.call(this.log, this._bword()) || [],
                d = this._skinManager.htmlRefresh.call(this, this.settings.skin, this.repository[a || this._bword()], d),
                e = this.settings.appendHeader.call(this.log, this._bword(), d != "") || "",
                g = this.settings.appendFooter.call(this.log, this._bword(), d != "") || "",
                d = e + d + g;
                d != "" ? (this.dom_refreshDiv.innerHTML = d, this.dom_search.setAttribute("_xbox_show", a), c.dom.show(this.dom_boxDiv), b = !0) : this.hide();
                this.gbUpdate(this.repository[a || this._bword()]);
                this._resetIframe()
            } (d = this._dataItem(!1)) && d.getAttribute("dataver");
            d && d.getAttribute("boxtype");
            //this.dom_adDiv.childNodes.length > 0 && this.dom_adDiv.getAttribute("_xbox_sendLog") != "t" && (this.dom_adDiv.setAttribute("_xbox_sendLog", "t"), this.dom_adDiv.firstChild.firstChild.getAttribute("href")); (d = c.dom.gc("sk_adsb", this.dom_adDiv, "div")) && d.length > 0 && d[0].firstChild.getAttribute("href");
            d = this.dom_refreshDiv.parentNode;
            if (b) {
                this.settings.afterShow.call(this, a, d ? d.offsetWidth: -1, d ? d.offsetHeight: -1);
                var h = c.dom.gc("ico_ad_close", this.dom_adDiv, "i");
                h && h.length > 0 && !c.dom.visible(h[0]) && c.util.timeOut(function() {
                    for (k in h) c.dom.show(h[k])
                },
                3E3)
            }
        },
        hide: function() {
            this.dom_refreshDiv.childNodes.length > 0 ? (this.settings.beforeHide.apply(this, arguments), c.dom.visible(this.dom_boxDiv) && (c.dom.hide(this.dom_boxDiv), this.settings.afterHide.apply(this, arguments))) : c.dom.hide(this.dom_boxDiv)
        },
        searchDom: function() {
            var a = c.dom.g(this.settings.searchId);
            if (!a) {
                var b = c.dom.gc(this.settings.searchClass, document, "input");
                if (b) for (k in b) {
                    for (var d = b[k], e = d, g = !0, h = 0; h < 5; h++) {
                        if (!e || !e.tagName || c.dom.isTag(e, "body")) break;
                        if ((e.currentStyle ? e.currentStyle.display: getComputedStyle(e, !1).display) == "none") {
                            g = !1;
                            break
                        }
                        e = e.parentNode
                    }
                    if (g) {
                        a = d;
                        break
                    }
                }
            }
            if (!a || a.getAttribute("_xbox_init") == "t") return null;
            a.setAttribute("_xbox_init", "t");
            return a
        },
        importCss: function(a, b) {
            if (a = c.util.trim(a)) {
                var d = document.getElementsByTagName("link");
                for (i = 0; d && i < d.length; i++) if (d[i].href && d[i].href.indexOf(a) != -1) return d[i];
                var e = document.createElement("link");
                e.rel = "stylesheet";
                e.type = "text/css";
                e.disabled = !1;
                this.dom_content.appendChild(e);
                this.cssCallback = c.util.timeOut(function() {
                    if (!e.scallback) e.scallback = !0,
                    b && b.call(this)
                },
                300, this);
                c.events.listen(e, "load", c.events.bind(function() {
                    this.cssCallback && window.clearTimeout(this.cssCallback);
                    if (!e.scallback) e.scallback = !0,
                    b && b.call(this)
                },
                this));
                e.href = a
            } else b && b.call(this)
        },
        vmopenform: function() {
            var a = document.createElement("form");
            a.setAttribute("id", "sk_vmopen");
            a.setAttribute("method", "get");
            a.setAttribute("target", "_blank");
            document.body.appendChild(a);
            return document.getElementById("sk_vmopen")
        },
        submitform: function() {
            var a = this.dom_search;
            if (a) for (var b = 0; b < 4; b++) {
                if (!a || !a.tagName || c.dom.isTag(a, "body")) break;
                if (c.dom.isTag(a, "form")) return a;
                a = a.parentNode
            }
            return null
        },
        _dataItems: function() {
            var a = [];
            if (!this.dom_refreshDiv) return a;
            var b = this.dom_refreshDiv.childNodes;
            if (c.util.isEmpty(b)) return a;
            for (var d = function(a) {
                return ! a || !a.tagName || c.dom.hasClass(a, "tip") || c.dom.hasClass(a, "close") || c.dom.hasClass(a, "empty")
            },
            e = function(b) {
                if (b && !d(b)) if (b.getAttribute("dataver") || b.getAttribute("wordtype")) a.push(b);
                else if ((b = b.childNodes) && b.length != 0) for (var c = 0; c < b.length; c++) {
                    var g = b[c];
                    d(g) || (g.getAttribute("dataver") || g.getAttribute("wordtype") ? a.push(g) : e(g))
                }
            },
            g = 0; g < b.length; g++) e(b[g]);
            return a
        },
        _dataItem: function(a) {
            var b = this._dataItems();
            if (!c.util.isNotEmpty(b)) return null;
            for (var d = 0; d < b.length; d++) {
                var e = b[d];
                if (e && (a && c.dom.hasClass(e, "current") || !a)) return e
            }
            return null
        },
        _dataDirectItem: function() {
            var a = this._dataItems();
            if (!c.util.isNotEmpty(a)) return null;
            for (var b = 0; b < a.length; b++) {
                var d = a[b];
                if (d && d.getAttribute("log_pos") == "4") return d
            }
            return null
        },
        _dataItemByEvent: function(a) {
            var b;
            if (a) for (var d = 0; d < 6; d++) {
                if (!a || !a.tagName || a.getAttribute("id") == this.settings.refreshId || c.dom.isTag(a, "body")) break;
                if (c.dom.isTag(a, "li") || a.getAttribute("dataver") || a.getAttribute("boxtype")) {
                    b = a;
                    break
                }
                a = a.parentNode
            }
            return b
        },
        _dataWordType: function() {
            var a = "",
            b = this._dataItems();
            if (c.util.isNotEmpty(b)) {
                for (var d = 0; d < b.length; d++) {
                    var e = b[d],
                    e = e ? e.getAttribute("wordtype") : "";
                    a += e && a.indexOf(e) == -1 ? e: ""
                }
                return a
            }
        },
        cleanRefresh: function() {
            this.hide();
            this.dom_refreshDiv.innerHTML = ""
        },
        defaultShow: function(a, b) {
            if (a) {
                if (this.initQueryWord == "" && document.activeElement != this.dom_search)(this.dom_search.value = a) ? c.dom.addClass(this.dom_search, "default") : c.dom.removeClass(this.dom_search, "default");
                this.defaultValue(b || a)
            }
        },
        defaultValue: function(a) {
            a && this.dom_search.setAttribute("_xbox_default", a);
            return this.dom_search.getAttribute("_xbox_default") || ""
        },
        timeRequest: function() {
            this.initTimeRequestWord = this._bword();
            c.util.interval(function() {
                var a = this._bword();
                if (a != this.initTimeRequestWord) this.initTimeRequestWord = a,
                this._handler.remote.call(this)
            },
            150, this)
        },
        _ajax: function(a) {
            if (a) {
                var b = document.createElement("script");
                b.src = a;
                this.dom_scriptDiv.appendChild(b)
            }
        },
        _resetIframe: function() {
            if (this.settings.iframe) {
                var a = this.dom_refreshDiv.parentNode,
                b = document.getElementById("sk_holder_iframe");
                if (a && b) b.style.width = a.offsetWidth + "px",
                b.style.height = a.offsetHeight + "px"
            }
        },
        _bword: function(a) {
            if (a) this.dom_search.value = a;
            return this.dom_search.value
        },
        _uword: function(a) { (a == "" || a) && this.dom_search.setAttribute("_xbox_input", a);
            return c.util.trim(this.dom_search.getAttribute("_xbox_input"))
        },
        _sub: function(a, b, d, e) {
            a = c.util.trim(a);
            if (a == "") return "";
            if (b && (b = a.split(" "), b != null && b.length > 0)) for (var g = 0,
            h = !0; g < b.length; g++, h = !1) {
                var m = b[g];
                if (h) a = m;
                else {
                    if (!/^[a-zA-Z]+$/.test(m)) break;
                    a += " " + m
                }
            }
            b = a.length;
            d = /^[0-9a-zA-Z\s.,-]+$/.test(a) ? d * 2 : d;
            if (d >= b) return a;
            return a.substring(0, d) + e
        },
        _hight: function(a, b, d, e) {
            var g = b ? b.length: 0,
            h = a ? a.length: 0;
            if (g <= 0 || g > h) return c.util.htmlEscape(a);
            h = a.indexOf(b);
            if (h != -1 && a.substring(h, h + g).toLowerCase() == b.toLowerCase()) return c.util.htmlEscape(a.substring(0, h)) + d + c.util.htmlEscape(a.substring(h, h + g)) + e + c.util.htmlEscape(a.substring(h + g));
            return c.util.htmlEscape(a)
        },
        _complete: {
            isCompleteInput: function(a) {
                return (a = a || this._bword()) && this._complete.cword.call(this) == a
            },
            isClose: function() {
                return this._complete.cword.call(this) == ""
            },
            close: function() {
                this._complete.cword.call(this, "")
            },
            open: function() {
                this.dom_search.removeAttribute("_xbox_complete")
            },
            cword: function(a) { (a == "" || a) && this.dom_search.setAttribute("_xbox_complete", a);
                return this.dom_search.getAttribute("_xbox_complete")
            }
        },
        _touch: {
            stop: !1,
            start: function(a, b) {
                this.stx = this.sty = this.etx = this.ety = this.curX = this.curY = 0;
                this.stx = b.touches[0].pageX;
                this.sty = b.touches[0].pageY;
                a && a.call(this, b);
                this._touch.stop && (c.events.stopDefault(b), c.events.stopBubble(b))
            },
            move: function(a, b) {
                this.curX = b.targetTouches[0].pageX - this.stx + this.etx;
                this.curY = b.targetTouches[0].pageY - this.sty + this.ety;
                a && a.call(this, b);
                this._touch.stop && (c.events.stopDefault(b), c.events.stopBubble(b))
            },
            end: function(a, b, d) {
                this.etx = this.curX;
                this.ety = this.curY;
                var e = Math.abs(this.etx),
                g = Math.abs(this.ety); (!b || e < 10 && g < 10) && a && a.call(this, d);
                this._touch.stop && (c.events.stopDefault(d), c.events.stopBubble(d))
            }
        },
        _skinManager: {
            cons: {
                SIMPLE: "simple",
                CLASSICS: "classics"
            },
            htmlKeel: function(a) {
                return a == this._skinManager.cons.SIMPLE ? this._skinManager._simpleKeel.call(this) : this._skinManager._classicsKeel.call(this)
            },
            htmlAd: function(a, b) {
                if (a != this._skinManager.cons.SIMPLE) return this._skinManager._classicsAd.call(this, b)
            },
            htmlRefresh: function(a, b, c) {
                return a == this._skinManager.cons.SIMPLE ? this._skinManager._simpleHTML.call(this, b, c) : this._skinManager._classicsHTML.call(this, b, c)
            },
            event: function(a) {
                a == this._skinManager.cons.SIMPLE ? this._skinManager._simpleEvent.call(this) : this._skinManager._classicsEvent.call(this)
            },
            _buildComplete: function(a, b) {
                if (a && b && this.globalRequestCount != 2) {
                    var d = c.util.strLength(a, 2, 1),
                    e = a.length,
                    g = b.length,
                    h = b.toLowerCase(),
                    m = a.toLowerCase();
                    if (!this._complete.isClose.call(this) && !(d < 4 || m != h.substring(0, a.length) || e >= g)) if (d = (d = c.util.getHistory(this.settings.historyName)) && d.length > 0 ? d[0] : null, (d && decodeURIComponent(d.q) || "").toLowerCase() != h && !/^\s{1}(([0-9]{4})|(\u7b2c\S\u5b63)|(tv\u7248)|(\u672a\u5220\u51cf\u7248)|(\u6e56\u5357\u536b\u89c6tv\u7248)|(\u6d59\u6c5f\u536b\u89c6tv\u7248 )|(dvd\u7248))$/.test(h.substring(a.length)) && b != this._complete.cword.call(this)) this._bword(b),
                    c.dom.selectText(this.dom_search, e, g),
                    this._complete.cword.call(this, b)
                }
            },
            _buildIframe: function() {
                return this.settings.iframe ? '<iframe id="sk_holder_iframe" frameborder="0" scrolling="no" style="position: absolute; z-index: ' + (c.browser.isIE() ? -1 : 0) + '; top: -2px; left: -2px;"></iframe>': ""
            },
            _appendOnLink: function(a) {
                if (!a) return "";
                var b = a.indexOf(".youku.com/v_show/id_") > -1,
                c = a.indexOf(".soku.com") > -1;
                switch (this.settings.site + "") {
                case "1":
                case "2":
                case "3":
                    b && (a += a.indexOf("?") > -1 ? "&": "?", a += "from=s1.8-4.999");
                    break;
                case "14":
                    b && (a += a.indexOf("?") > -1 ? "&": "?", a += "from=y1.8-4.999")
                }
                c && window.logPvid && (a += a.indexOf("?") > -1 ? "&": "?", a += "_rp=" + window.logPvid);
                return a
            },
            _simpleKeel: function() {
                var a = [];
                a.push('<div class="yk_kubox">');
                a.push(this._skinManager._buildIframe.call(this));
                a.push('<div class="about_list" id="' + this.settings.refreshId + '">');
                a.push("</div>");
                a.push("</div>");
                return a.join("")
            },
            _simpleHTML: function(a, b) {
                if (c.util.isEmptyObject(a)) return "";
                var d = a.q || "",
                e = a.s,
                g = a.vs || "",
                h = a.t || "",
                m = 0,
                o = 2 == h,
                s = 1 == h,
                C = 0 == h,
                t = this.settings.size;
                if (!c.util.isNotEmpty(e) && !c.util.isNotEmpty(b)) return "";
                c.util.isNotEmpty(b) && (e = c.util.isNotEmpty(e) ? b.concat(e) : b, t += b.length);
                var l = [];
                l.push("<ul>");
                for (var r = 0; r < e.length && t > 0; r++) {
                    var p = e[r],
                    v = p.sk == 1,
                    H = o ? r == 0 ? "one": r == 1 ? "two": r == 2 ? "three": "": "";
                    o && r == 0 && (l.push('<li class="tip">'), l.push('<i class="dot"></i>'), l.push('<span class="name"><em>\u5927\u5bb6\u90fd\u5728\u641c</em></span>'), l.push("</li>"));
                    if (v) {
                        v = p.k;
                        this._skinManager._appendOnLink.call(this, p.d);
                        var w = p.n || "";
                        c.util.substr(w, 12, 20, "...");
                        var f = p.hi || "",
                        B = this._skinManager._appendOnLink.call(this, p.u),
                        j = this._skinManager._appendOnLink.call(this, p.t),
                        n = p.c || "",
                        q = p.y || "";
                        this._skinManager._appendOnLink.call(this, p.m);
                        p = p.z == 1 && p.cr != 1;
                        l.push('<li class="hit ' + H + '" boxtype="' + h + '" dataver="' + g + '" qword="' + w + '" log_pos="4" log_kct="' + (v == 2 && !p && !B && j ? "25": v) + '">');
                        B && !p && (l.push('<div class="action">'), l.push('<a href="' + B + '" target="_blank" sk_live="link">'), l.push('<i class="btn_play" sk_live="link"></i>'), l.push('<p sk_live="link">\u64ad\u653e</p>'), l.push("</a>"), l.push("</div>"));
                        l.push("<a>");
                        o && l.push('<i class="dot" sk_live="word">' + (r + 1) + "</i>");
                        l.push('<div class="pic" sk_live="word"><img sk_live="word" src="' + f + '"></div>');
                        l.push('<div class="txt">');
                        o ? l.push('<p class="title" sk_live="word">' + w + "</p>") : l.push('<p class="title" sk_live="word"><span class="c_highred" sk_live="word">' + w + "</span></p>");
                        l.push('<p sk_live="word">' + q + n + "</p>");
                        l.push("</div>");
                        l.push("</a>");
                        l.push("</li>");
                        t--;
                        t--
                    } else if (w = p.k || "", v = p.c || "", f = p.w || "", B = c.util.htmlEscape(f), j = this._hight(f, d, '<em sk_live="word">', "</em>"), q = p.y || "", this._skinManager._appendOnLink.call(this, p.r), p = (m < 9 ? "0": "") + (m + 1) + "0", m++, C || o) l.push('<li class="' + H + '" sk_live="word" boxtype="' + h + '" wordtype="' + w + '" dataver="' + g + '" windex="' + p + '" qword="' + f + '">'),
                    l.push('<a sk_live="word">'),
                    o && l.push('<i class="dot" sk_live="word">' + (r + 1) + "</i>"),
                    l.push('<span class="name" sk_live="word">' + j + "</span>"),
                    l.push('<span class="type" sk_live="word">' + q + v + "</span>"),
                    l.push("</a>"),
                    l.push("</li>"),
                    t--;
                    else if (s && (r == 0 && (l.push('<li class="tip">'), l.push('<i class="dot"></i>'), l.push('<span class="name"><em>\u5386\u53f2\u641c\u7d22</em></span>'), l.push('<a sk_live="clean" class="func"><i class="btn_del" sk_live="clean"></i>\u6e05\u7a7a\u8bb0\u5f55</a>'), l.push("</li>"), t--), r == 0 && (l.push('<li class="word_box clearfix">'), l.push('<div class="word_wrap">')), l.push('<span class="word" sk_live="word" boxtype="' + h + '" wordtype="' + w + '" dataver="' + g + '" windex="' + p + '" qword="' + f + '"><a sk_live="word">' + B + "</a></span>"), r == e.length - 1 || t == 0)) l.push("</div>"),
                    l.push("</li>")
                }
                l.push('<li class="close" sk_live="close">');
                l.push('<a sk_live="close">\u5173\u95ed</a>');
                l.push("</li>");
                l.push("</ul>");
                return t < this.settings.size ? l.join("") : ""
            },
            _classicsKeel: function() {
                var a = [],
                b = this.settings.site == 14 ? " sk_youku": this.settings.site == 15 ? " sk_tudou": "";
                a.push('<div class="' + (this.settings.site == 15 ? "for_tudou": "") + '">');
                a.push('<div class="sk_box' + b + '" style="display:block;">');
                a.push(this._skinManager._buildIframe.call(this));
                a.push('<div class="main" id="' + this.settings.refreshId + '">');
                a.push("</div>");
                a.push('<div id="' + this.settings.adId + '">');
                a.push("</div>");
                a.push("</div>");
                a.push("</div>");
                return a.join("")
            },
            _classicsAd: function(a) {
                if (c.util.isEmptyObject(a)) return "";
                var b = a.left || {},
                d = a.right || {},
                e = a.ad || {},
                a = [];
                if (!c.util.isEmptyObject(b)) {
                    var g = b.i || "",
                    b = b.l || "";
                    a.push('<div class="sk_adsl">');
                    a.push('<a target="_blank" href="' + b + '">');
                    a.push('<img sk_live="link" log_pos="8" src="' + g + '">');
                    a.push("</a>");
                    a.push('<a class="sk_ads_close" href="javascript:;" style="display: inline;">');
                    a.push('<i sk_live="adclose" class="ico ico_ad_close" style="display: none;"></i>');
                    a.push("</a>");
                    a.push("</div>")
                }
                c.util.isEmptyObject(d) || (b = d.i || "", d = d.l || "", a.push('<div class="sk_adsr">'), a.push('<a target="_blank" href="' + d + '">'), a.push('<img sk_live="link" log_pos="8" src="' + b + '">'), a.push("</a>"), a.push('<a class="sk_ads_close" href="javascript:;" style="display: inline;">'), a.push('<i sk_live="adclose" class="ico ico_ad_close" style="display: none;"></i>'), a.push("</a>"), a.push("</div>"));
                c.util.isEmptyObject(e) || (d = e.l || "", a.push('<div class="sk_adsb">'), a.push('<div  href="' + d + '"></div>'), a.push('<iframe src="' + d + '" width="100%" height="100%" style="filter: alpha(opacity=100); opacity: 1;" frameborder="0" scrolling="no"></iframe>'), a.push("</div>"));
                return a.join("")
            },
            _classicsHTML: function(a, b) {
                function d(a) {
                    if (a) {
                        var b = a.s || -9;
                        if (! (b < -1)) {
                            var d = c.util.htmlEscape(a.n || ""),
                            e = a.t || "";
                            f.push('<li sk_live="word" log_pos="' + b + '" boxtype="' + t + '" wordtype="' + (a.k || "") + '" dataver="' + C + '" qword="' + d + '" enterurl="' + (a.p || "") + '">');
                            f.push('<a sk_live="word" onclick="return false;" class="c_topic">' + d + ' <i sk_live="word" class="ico ico_topic">' + e + "</i></a>");
                            f.push("</li>");
                            v--
                        }
                    }
                }
                if (c.util.isEmptyObject(a)) return "";
                var e = a.r || [],
                g = a.d || [],
                h = a.q || "",
                m = a.p || {},
                o = a.a || {},
                s = a.ht || {},
                C = a.vs || "",
                t = a.t || "",
                l = 2 == t,
                r = 1 == t,
                p = 0 == t,
                v = this.settings.size,
                H = 0,
                w = ' sk_live="word" boxtype="' + t + '" dataver="' + C + '" log_pos="4" ';
                c.util.isNotEmpty(b) && (e = c.util.isNotEmpty(e) ? b.concat(e) : b, v += b.length);
                for (var f = [], B = 0; B < g.length; B++) {
                    var j = g[B];
                    if (j) {
                        var n = j.k,
                        q = this._skinManager._appendOnLink.call(this, j.d),
                        u = j.s || "",
                        A = j.n || "",
                        y = c.util.substr(A, 11, 20, "..."),
                        D = j.i || "",
                        F = this._skinManager._appendOnLink.call(this, j.u),
                        G = this._skinManager._appendOnLink.call(this, j.t),
                        K = j.c || "",
                        E = j.y || "",
                        L = j.r || "",
                        M = j.h || "",
                        N = j.a || "",
                        I = this._skinManager._appendOnLink.call(this, j.m),
                        J = j.z == 1,
                        Q = j.f || "",
                        z = j.o || [],
                        S = c.util.contain(z, "\u8ba4\u8bc1\u7528\u6237"),
                        T = c.util.contain(z, "\u571f\u8c46\u8ba4\u8bc1"),
                        R = j.l || "",
                        z = j.e || [],
                        O = j.t1 || 0,
                        U = c.util.substr(O, 5, 8, "..."),
                        P = j.t2 || 0,
                        V = c.util.substr(P, 5, 8, "..."),
                        W = j.m1 || 0,
                        X = j.m2 || 0,
                        x = j.b || 0,
                        j = j.g || 0;
                        v -= 3;
                        if (n == 1 || n == 5 || n == 177) {
                            f.push("<div" + w + ' class="dir" qword="' + A + '" log_kct="' + n + '">');
                            f.push('<div class="pic"><a target="_blank" href="' + q + '" _showid="' + u + '"><img sk_live="link" src="' + D + '"></a></div>');
                            f.push('<div class="info">');
                            f.push("<p>");
                            f.push('<span class="tit"><a sk_live="link" target="_blank" title="' + A + '" href="' + q + '" _showid="' + u + '">' + y + "</a></span>");
                            f.push('<span class="type">' + E + K + "</span>");
                            j == 1 && x != 10 && x != 100 && x != 1 && f.push('<i class="ico ico_sole">\u72ec\u64ad</i>'); (x == 10 || x == 100 || x == 1) && f.push(' <i class="ico ico_tip">\u4f1a\u5458</i>');
                            f.push("</p>");
                            f.push("<p>" + (M || N) + "</p>");
                            if (J || z.length == 0) f.push('<div class="load_btn">'),
                            f.push('<a sk_live="link" class="btn btn_play" target="_blank" href="' + q + '" _showid="' + u + '">\u67e5\u770b</a>');
                            else {
                                f.push('<div class="part_link">');
                                for (n = 0; n < z.length; n++) j = z[n],
                                y = j.s,
                                D = this._skinManager._appendOnLink.call(this, j.u),
                                E = j.n == 1,
                                j = j.c == 1,
                                z.length >= 4 && n == 2 && z[1].s + 1 != y && f.push('<a sk_live="link" target="_blank" href="' + q + '" _showid="' + u + '">\u2026\u2026</a>'),
                                f.push('<a sk_live="link"' + (j ? ' class="long" ': "") + 'target="_blank" href="' + D + '">' + y + (E ? '<i class="ico ico_new"></i>': "") + (j ? "<em>\u5927\u7ed3\u5c40</em>": "") + "</a>")
                            }
                            f.push("</div>");
                            f.push("</div>");
                            f.push("</div>")
                        } else if (n == 2) f.push("<div" + w + ' class="dir" qword="' + A + '" log_kct="' + (!J && !F && G ? "25": n) + '">'),
                        f.push('<div class="pic"><a target="_blank" href="' + q + '" _showid="' + u + '"><img sk_live="link" src="' + D + '"></a></div>'),
                        f.push('<div class="info">'),
                        f.push("<p>"),
                        f.push('<span class="tit"><a sk_live="link" target="_blank" title="' + A + '" href="' + q + '" _showid="' + u + '">' + y + "</a></span>"),
                        f.push('<span class="type">' + E + K + "</span>"),
                        j == 1 && x != 10 && x != 100 && x != 1 && f.push('<i class="ico ico_sole">\u72ec\u64ad</i>'),
                        (x == 10 || x == 100 || x == 1) && f.push(' <i class="ico ico_tip">\u4f1a\u5458</i>'),
                        f.push("</p>"),
                        f.push("<p>" + (M || N) + "</p>"),
                        f.push('<div class="load_btn">'),
                        J || !F && !G && !I ? f.push('<a sk_live="link" class="btn btn_play" target="_blank" href="' + q + '" _showid="' + u + '">\u67e5\u770b</a>') : F ? f.push('<a sk_live="link" class="btn btn_play" target="_blank" href="' + F + '"><i class="ico_arr" sk_live="link"></i>\u64ad\u653e</a>') : (I && f.push('<a sk_live="link" class="btn btn_buy" target="_blank" href="' + I + '">\u4e70\u7535\u5f71\u7968</a>'), G && f.push('<a sk_live="link" class="btn btn_play" target="_blank" href="' + G + '"><i class="ico_arr" sk_live="link"></i>\u9884\u544a\u7247</a>'), !I && L && f.push('<span class="high">' + L + "\u4e0a\u6620</span>")),
                        f.push("</div>"),
                        f.push("</div>"),
                        f.push("</div>");
                        else if (n == 3 || n == 8 || n == 9 || n == 17 || n == 178) {
                            f.push("<div" + w + ' class="dir" qword="' + A + '" log_kct="' + n + '">');
                            f.push('<div class="pic"><a target="_blank" href="' + q + '" _showid="' + u + '"><img sk_live="link" src="' + D + '"></a></div>');
                            f.push('<div class="info">');
                            f.push("<p>");
                            f.push('<span class="tit"><a sk_live="link" target="_blank" title="' + A + '" href="' + q + '" _showid="' + u + '">' + y + "</a></span>");
                            f.push('<span class="type">' + K + "</span>");
                            j == 1 && x != 10 && x != 100 && x != 1 && f.push('<i class="ico ico_sole">\u72ec\u64ad</i>'); (x == 10 || x == 100 || x == 1) && f.push(' <i class="ico ico_tip">\u4f1a\u5458</i>');
                            f.push("</p>");
                            if (J || z.length == 0) f.push("<p>" + (M || N) + "</p>"),
                            f.push('<div class="load_btn">'),
                            f.push('<a sk_live="link" class="btn btn_play" target="_blank" href="' + q + '" _showid="' + u + '">\u67e5\u770b</a>');
                            else {
                                f.push('<div class="item_list">');
                                for (n = 0; n < z.length; n++) j = z[n],
                                y = j.s,
                                q = c.util.htmlEscape(y),
                                u = c.util.substr(y, 20, 28, "..."),
                                D = this._skinManager._appendOnLink.call(this, j.u),
                                y = j.d,
                                E = j.n == 1,
                                j = j.c == 1,
                                f.push("<p>"),
                                f.push('<a sk_live="link" target="_blank" title="' + q + '" href="' + D + '"><span class="data">' + y + "</span> " + u + "</a>" + (E ? '<i class="ico ico_new"></i>': "")),
                                f.push("</p>")
                            }
                            f.push("</div>");
                            f.push("</div>");
                            f.push("</div>")
                        } else if (n == 20) q = this._skinManager._appendOnLink.call(this, "//z.soku.com/"),
                        f.push("<div" + w + ' class="dir" qword="' + O + "VS" + P + '" log_kct="' + n + '">'),
                        f.push('<div class="live">'),
                        f.push('<div class="game_pic">'),
                        f.push('<a target="_blank" href="' + q + '" _showid="' + u + '"><img sk_live="link" src="' + W + '"></a>'),
                        f.push("</div>"),
                        f.push('<div class="game_info">'),
                        f.push('<p class="tit"><a sk_live="link" target="_blank" title="' + O + '" href="' + q + '" _showid="' + u + '">' + U + '</a><span class="vs">VS</span><a sk_live="link" target="_blank" title="' + P + '" href="' + q + '" _showid="' + u + '">' + V + "</a></p>"),
                        f.push("<p>" + L + " " + A + "</p>"),
                        f.push('<div class="load_btn">'),
                        F ? f.push('<a sk_live="link" target="_blank" class="btn btn_play" href="' + F + '">\u770b\u76f4\u64ad</a>') : f.push("<p>\u5373\u5c06\u76f4\u64ad</p>"),
                        f.push("</div>"),
                        f.push("</div>"),
                        f.push('<div class="game_pic">'),
                        f.push('<a target="_blank" href="' + q + '" _showid="' + u + '"><img sk_live="link" src="' + X + '"></a>'),
                        f.push("</div>"),
                        f.push("</div>"),
                        f.push("</div>");
                        else if (n == 14) f.push("<div" + w + ' class="dir dir_user" qword="' + A + '" log_kct="' + n + '">'),
                        f.push('<div class="user">'),
                        f.push('<div class="pic"><a target="_blank" href="' + q + '" _showid="' + u + '"><img sk_live="link" src="' + D + '"></a></div>'),
                        f.push('<div class="info">'),
                        f.push('<p><span class="tit"><a sk_live="link" target="_blank" title="' + A + '" href="' + q + '" _showid="' + u + '">' + y + "</a></span> "),
                        R && f.push('<i class="ico_level level' + R + '"></i>'),
                        S || T && f.push('<i class="ico ico_mark_g"></i>'),
                        f.push("</p>"),
                        Q && f.push("<p><span>" + Q + "\u7c89\u4e1d</span></p>"),
                        f.push("</div>"),
                        f.push('<div class="play">'),
                        f.push('<div class="load_btn">'),
                        f.push('<a sk_live="link" class="btn btn_play" target="_blank" href="' + q + '" _showid="' + u + '">\u8fdb\u5165\u9891\u9053</a>'),
                        f.push("</div>"),
                        f.push("</div>"),
                        f.push("</div>"),
                        f.push("</div>"),
                        v += 1;
                        else {
                            v += 3;
                            continue
                        }
                        this._skinManager._buildComplete.call(this, h, A)
                    }
                }
                f.push('<ul class="autolist' + (l ? " hotword": "") + '">');
                r && e.length > 0 && (f.push('<li class="empty">'), f.push("<span>\u5386\u53f2\u641c\u7d22</span>"), f.push('<span class="info" sk_live="clean"><em class="ico ico_empty" sk_live="clean"></em>\u6e05\u7a7a</span>'), f.push("</li>"), v--);
                for (g = 0; g < e.length && v > 0; g++) {
                    j = e[g];
                    n = j.c || "";
                    w = j.k || "";
                    B = j.w || "";
                    A = c.util.htmlEscape(B);
                    E = j.y || "";
                    z = j.u || "";
                    q = j.t || "";
                    D = j.i || "";
                    u = p && w == 2;
                    y = j.z || "";
                    j = this._skinManager._appendOnLink.call(this, j.r) || "javascript:;";
                    F = this._hight(B, h, '<b sk_live="word">', "</b>");
                    G = (H < 9 ? "0": "") + (H + 1) + "0";
                    s && (s.s || -9) == g && d(s);
                    if (w == 7) f.push('<li sk_live="word" log_pos="1" boxtype="' + t + '" wordtype="' + w + '" dataver="' + C + '" windex="' + G + '" qword="' + A + '" enterurl="' + z + '">'),
                    f.push('<a sk_live="word" onclick="return false;"><img sk_live="word" src="' + D + '"><span class="link" sk_live="word">' + B + " " + z + "</span></a>");
                    else if (f.push('<li sk_live="word" log_pos="1" boxtype="' + t + '" wordtype="' + w + '" dataver="' + C + '" windex="' + G + '" qword="' + A + '" enterurl="' + z + '" ' + (w == 9 ? 'log_kct="34"': "") + ">"), l && f.push('<span class="rank' + (g < 3 ? " top3": "") + '">' + (g + 1) + "</span>"), f.push('<a sk_live="word" ' + (l || r ? 'class="c_0"': "") + ' onclick="return false;">' + F), q && f.push('<img sk_live="word" class="icon" src="' + q + '">'), f.push("</a>"), u || E || n || y) f.push('<span sk_live="word" class="info">' + (u ? "\u6700\u8fd1\u641c\u8fc7": "") + E + "  " + n + (y ? '<a target="_blank" sk_live="link" log_pos="6" href="' + j + '">' + y + "</a>": "") + "</span>");
                    f.push("</li>");
                    v--;
                    H++
                }
                s && (s.s || -9) == -1 && v > 0 && d(s);
                f.push("</ul>");
                if ((h = o.r) && h.length > 0) {
                    s = o.n || "";
                    l = o.c || "";
                    r = o.u || "";
                    o = o.i || "";
                    p = c.util.htmlEscape(s);
                    f.push('<div class="dir hot' + (e.length > 0 ? "": " hot_nobor") + '">');
                    f.push('<div class="live">');
                    s && (f.push('<div class="pic" sk_live="word" boxtype="' + t + '" dataver="' + C + '" qword="' + p + '">'), f.push('<a target="_blank" href="' + r + '">'), f.push('<img sk_live="link" src="' + o + '">'), l && f.push('<span sk_live="link" class="lab">' + l + "</span>"), f.push('<div sk_live="link" class="cover"><span class="name">' + s + "</span></div>"), f.push("</a>"), f.push("</div>"));
                    s && f.push('<div class="info">');
                    f.push('<ul class="autolist hotword">');
                    for (g = 0; g < h.length && (s && g < 4 || !s); g++) r = h[g],
                    e = r.k || "",
                    o = r.u || "",
                    l = r.t || "",
                    r = c.util.htmlEscape(r.w || ""),
                    f.push('<li sk_live="word" boxtype="' + t + '" wordtype="' + e + '" dataver="' + C + '" qword="' + r + '" enterurl="' + o + '">'),
                    f.push('<span class="rank' + (g < 3 ? " top3": "") + '">' + (g + 1) + ".</span>"),
                    f.push('<a sk_live="word" onclick="return false;">' + r),
                    l && f.push('<img sk_live="word" class="icon" src="' + l + '">'),
                    f.push("</a>"),
                    f.push("</li>"),
                    v--;
                    f.push("</ul>");
                    s && f.push("</div>");
                    f.push("</div>");
                    f.push("</div>")
                }
                if ((s = m.n || "") && v > 0) e = m.c || "",
                o = m.u || "",
                h = m.i || "",
                m = m.v || "",
                l = this._sub(s, !1, 18, "..."),
                s = c.util.htmlEscape(s),
                f.push('<div class="dir extend" sk_live="word" class="dir" boxtype="' + t + '" dataver="' + C + '" log_pos="4" qword="' + s + '" log_kct="31">'),
                f.push('<div class="live">'),
                f.push('<div class="pic">'),
                f.push('<a target="_blank" href="' + o + '">'),
                f.push('<img sk_live="link" src="' + h + '">'),
                e && f.push('<span sk_live="link" class="lab">' + e + "</span>"),
                f.push("</a>"),
                f.push("</div>"),
                f.push('<div class="info">'),
                f.push('<p><a class="tit" sk_live="link" target="_blank" href="' + o + '">' + l + "</a></p>"),
                f.push("<p>\u64ad\u653e\uff1a<span>" + m + "</span></p>"),
                f.push("</div>"),
                f.push('<div class="play">'),
                f.push('<a sk_live="link" target="_blank" href="' + o + '">'),
                f.push('<i sk_live="link" class="ico ico_start"></i>'),
                f.push('<p sk_live="link">\u7acb\u5373\u64ad\u653e</p>'),
                f.push("</a>"),
                f.push("</div>"),
                f.push("</div>"),
                f.push("</div>"),
                v -= 3;
                return v < this.settings.size ? f.join("") : ""
            },
            _simpleEvent: function() {
                this.settings.controlButton && c.events.listen(this.dom_button, "click", c.events.bind(this._handler.bwSimpleClick, this));
                c.events.listen(document, "click", c.events.bind(this._handler.documentClick, this));
                c.events.listen(document, "touchstart", c.events.bind(this._handler.documentClick, this));
                c.events.listen(this.dom_search, "click", c.events.bind(this._handler.searchClick, this));
                c.events.listen(this.dom_search, "touchstart", c.events.bind(this._handler.searchClick, this));
                c.events.listen(this.dom_search, "input", c.events.bind(this._handler.searchInput, this));
                this.dom_cancel && c.events.listen(this.dom_cancel, "click", c.events.bind(this._handler.inputCancel, this));
                c.autoremind({
                    enterOpen: this.settings.enterOpen,
                    request: c.events.bind(this._handler.remote, this),
                    moveUp: c.events.bind(this._handler.boxWordMoveUp, this),
                    moveDown: c.events.bind(this._handler.boxWordMoveDown, this),
                    enter: c.events.bind(this._handler.boxWordEnter, this)
                });
                c.events.listenLive(this.dom_refreshDiv, "word", "mouseout", c.events.bind(this._handler.boxWordMouseOut, this));
                c.events.listenLive(this.dom_refreshDiv, "word", "mouseover", c.events.bind(this._handler.boxWordMouseOver, this));
                c.events.listenLive(this.dom_refreshDiv, "word", "click", c.events.bind(this._handler.boxWordClick, this), !0);
                c.events.listenLive(this.dom_refreshDiv, "word", "touchstart", c.events.bind(this._touch.start, this, this._handler.simpleAddCurrent), !0);
                c.events.listenLive(this.dom_refreshDiv, "word", "touchend", c.events.bind(this._touch.end, this, this._handler.simpleRemoveCurrent, !1), !0);
                c.events.listenLive(this.dom_refreshDiv, "clean", "click", c.events.bind(this._handler.simpleClean, this, this.log.cons.LOG_M_SELECT), !0);
                c.events.listenLive(this.dom_refreshDiv, "close", "click", c.events.bind(this._handler.documentClick, this, !0), !0);
                c.events.listenLive(this.dom_refreshDiv, "link", "click", c.events.bind(this._handler.linkBefore, this))
            },
            _classicsEvent: function() {
                this.settings.controlButton && c.events.listen(this.dom_button, "click", c.events.bind(this._handler.boxWordClick, this));
                c.events.listen(document, "click", c.events.bind(this._handler.documentClick, this));
                c.events.listen(document, "touchstart", c.events.bind(this._handler.documentClick, this));
                c.events.listen(this.dom_search, "click", c.events.bind(this._handler.searchClick, this));
                c.events.listen(this.dom_search, "touchstart", c.events.bind(this._handler.searchClick, this));
                c.events.listen(this.dom_search, "input", c.events.bind(this._handler.searchInput, this));
                c.autoremind({
                    enterOpen: this.settings.enterOpen,
                    request: c.events.bind(this._handler.remote, this),
                    moveUp: c.events.bind(this._handler.boxWordMoveUp, this),
                    moveDown: c.events.bind(this._handler.boxWordMoveDown, this),
                    del: c.events.bind(this._handler.inputDel, this),
                    right: c.events.bind(this._handler.remote, this),
                    enter: c.events.bind(this._handler.boxWordEnter, this)
                });
                c.events.listenLive(this.dom_refreshDiv, "word", "mouseout", c.events.bind(this._handler.boxWordMouseOut, this));
                c.events.listenLive(this.dom_refreshDiv, "word", "mouseover", c.events.bind(this._handler.boxWordMouseOver, this));
                c.events.listenLive(this.dom_refreshDiv, "word", "click", c.events.bind(this._handler.boxWordClick, this), !0);
                c.events.listenLive(this.dom_refreshDiv, "hotword", "click", c.events.bind(this._handler.hotWordClick, this), !0);
                c.events.listenLive(this.dom_refreshDiv, "clean", "click", c.events.bind(this._handler.simpleClean, this, this.log.cons.LOG_MOUSE_SELECT), !0);
                c.events.listenLive(this.dom_boxDiv, "link", "click", c.events.bind(this._handler.linkBefore, this));
                //c.events.listenLive(this.dom_adDiv, "adclose", "click", c.events.bind(this._handler.adCloseBefore, this))
            }
        },
        _handler: {
            documentClick: function(a, b) {
                var d = c.events.element(a),
                e = !1;
                if (d) for (var g = 0; g < 8; g++) {
                    if (!d || !d.tagName || c.dom.isTag(d, "body")) break;
                    var h = d.getAttribute("id");
                    if (h && (h == this.settings.adId || h == this.settings.refreshId || h == this.settings.searchId || h == this.settings.cancelId || h == this.settings.placeholderId)) {
                        e = !0;
                        break
                    }
                    d = d.parentNode
                }
                if (!e || b) {
                    if (this._bword() == "") this.dom_search.value = this.defaultValue(),
                    c.dom.addClass(this.dom_search, "default");
                    c.util.timeOut(function() {
                        this.hide();
                        this.settings.inputEnd.apply(this, arguments)
                    },
                    100, this)
                }
                this.settings.cleanDefault && c.util.interval(function() {
                    var a = this._bword();
                    if (a == "" || a != null && a != this.defaultValue()) return ! 0;
                    this.defaultShow("", this.defaultValue());
                    return ! 1
                },
                30, this)
            },
            searchClick: function() {
                if (this._bword() == this.defaultValue()) this.dom_search.value = "",
                c.dom.removeClass(this.dom_search, "default");
                this.settings.inputBegin.apply(this, arguments);
                //this._handler.remote.apply(this, arguments)
            },
            searchInput: function() {
                this._bword();
                var a = arguments;
                c.util.timeOut(function() {
                    this.closeClick ? this.closeClick = !1 : this._handler.remote.apply(this, a)
                },
                300, this)
            },
            inputCancel: function() {
                this.dom_search.value = "";
                c.dom.hide(this.dom_cancel);
                this.dom_search.focus();
                XBox.clean();
                this._handler.searchClick.call(this)
            },
            boxWordMoveUp: function() {
                var a = this._dataItems();
                if (c.util.isNotEmpty(a)) {
                    for (var b = a.length - 1,
                    d = 0; d < a.length; d++) {
                        var e = a[d];
                        if (e && c.dom.hasClass(e, "current")) {
                            b = d == 0 ? a.length - 1 : d - 1;
                            break
                        }
                    }
                    this._handler._select.call(this, a[b]);
                    this._bword(a[b].getAttribute("qword"))
                }
            },
            boxWordMoveDown: function() {
                var a = this._dataItems();
                if (c.util.isNotEmpty(a)) {
                    for (var b = 0,
                    d = 0; d < a.length; d++) {
                        var e = a[d];
                        if (e && c.dom.hasClass(e, "current")) {
                            b = d == a.length - 1 ? 0 : d + 1;
                            break
                        }
                    }
                    this._handler._select.call(this, a[b]);
                    this._bword(a[b].getAttribute("qword"))
                }
            },
            inputDel: function() {
                c.util.trim(this._bword()) ? this._complete.close.call(this) : this._complete.open.call(this)
            },
            boxWordEnter: function() {
                this.settings.beforeEnter.call(this, this._bword()) && this._handler._requestWord.call(this, this.log.cons.LOG_KEY_SELECT)
            },
            boxWordMouseOver: function(a) {
                a = this._dataItemByEvent(c.events.element(a));
                c.dom.hasClass(a, "dir") || this._handler._select.call(this, a)
            },
            boxWordMouseOut: function(a) {
                this._handler._cancelSelect.call(this, this._dataItemByEvent(c.events.element(a)))
            },
            boxWordClick: function(a) {
                c.events.stopDefault(a);
                a = c.events.element(a);
                this._handler._select.call(this, this._dataItemByEvent(a));
                this._handler._requestWord.call(this, this.log.cons.LOG_MOUSE_SELECT, a)
            },
            hotWordClick: function(a) {
                var b = this._bword(),
                d = "",
                e = "",
                g = "";
                if (a = c.events.element(a)) b = a.getAttribute("qword"),
                d = a.getAttribute("windex"),
                e = a.getAttribute("dataver"),
                g = a.getAttribute("wordtype");
                b = {
                    type: 4,
                    pos: "1",
                    bword: this._uword(),
                    wordtype: g,
                    qword: b,
                    dataver: e,
                    operate: this.log.cons.LOG_MOUSE_SELECT,
                    windex: d
                };
                this._handler._openUrl.call(this, "", this._handler._buildQueryUrl.call(this, b), b)
            },
            linkBefore: function(a) {
                var b = c.events.element(a),
                d = this._dataItemByEvent(b),
                a = this._bword(),
                e = b.getAttribute("log_pos"),
                g = "00",
                h = "",
                m = "",
                o = "";
                d && (a = d.getAttribute("qword"), h = d.getAttribute("windex"), m = d.getAttribute("dataver"), o = d.getAttribute("wordtype"), g = this.log._fullBit(d.getAttribute("log_kct"), 2), e = e || d.getAttribute("log_pos"));
                d = c.dom.isTag(b, "a") ? b: b.parentNode;
                b = d.getAttribute("href") || "";
                d = d.getAttribute("_showid") || "";
                a = {
                    type: 4,
                    pos: e,
                    kct: g,
                    bword: this._uword(),
                    wordtype: o,
                    qword: a,
                    dataver: m,
                    url: b,
                    showid: d,
                    operate: this.log.cons.LOG_MOUSE_SELECT,
                    windex: h
                };
                this._handler._openUrl.call(this, "", b, a, !0)
            },
            adCloseBefore: function() {
                c.dom.hide(this.dom_adDiv);
                c.util.writeCookie(this.settings.adHideName, "1", 1, ".soku.com", "/");
                this._uword()
            },
            remote: function(a) {
                var b = this._bword(),
                a = c.events.ev(a);
                if ((!this._complete.isCompleteInput.call(this, b) || !(a && a.type == "input")) && !(this._uword() == b && c.dom.visible(this.dom_boxDiv))) this._uword(b),
                this.settings.whenInput.call(this, b),
                this.dom_cancel && (b ? c.dom.show(this.dom_cancel) : c.dom.hide(this.dom_cancel)),
                a = this.repository[b],
                b == "" && !c.util.isEmptyObject(a) && this.settings.useYunCache ? this.show("") : b != "" && !c.util.isEmptyObject(a) && this.settings.useKuCache ? this.show(b) : b == "" && (!this.keys[""] || !this.settings.useYunCache) ? this._handler._remoteYun.call(this) : (b != "" && !this.keys[b] || !this.settings.useKuCache) && this._handler._remoteKu.call(this, b)
            },
            _remoteKu: function(a) {
                if (c.util.trim(this.settings.kUrl) != "") {
                    this.keys[a] = a;
                    var b = "";
                    b += (this.settings.kUrl.indexOf("?") > -1 ? "&": "?") + "jsoncallback=XBox.kUpdate";
                    b += "&query=" + encodeURIComponent(a);
                    b += this.settings.site != "1" ? "&site=" + this.settings.site: "";
                    b += "&rm=" + this.boxUUID + "-" + this.globalRequestCount++;
                    a = this.log._getAbtest(this.settings.abtest);
                    b += a ? "&ver=" + a: "";
                    b += "&h=" + (new Date).getHours();
                    this._ajax(this.settings.kUrl + b)
                }
            },
            _remoteYun: function() {
                c.util.trim(this.settings.yUrl) == "" ? this.hide() : (this.keys[""] = "search_yun", this._handler._requestYkYun.call(this, "XBox.yUpdate"))
            },
            _requestYkYun: function(a) {
                var b = "";
                b += (this.settings.yUrl.indexOf("?") > -1 ? "&": "?") + "jsoncallback=" + a;
                b += "&site=" + this.settings.site;
                a = this.settings.clientMark && c.util.readCookie(this.settings.clientMark);
                b += a ? "&cm=" + a: "";
                a = this.log._getAbtest(this.settings.abtest);
                b += a ? "&ver=" + a: "";
                b += "&t=" + (new Date).getTime();
                this._ajax(this.settings.yUrl + b)
            },
            _requestTdYun: function() {
                this._handler._requestHistory.call(this,
                function() {})
            },
            _requestAd: function() {
                if (this.settings.gUrl && c.util.readCookie(this.settings.adHideName) != "1") {
                    var a = "";
                    a += (this.settings.gUrl.indexOf("?") > -1 ? "&": "?") + "jsoncallback=XBox.gUpdate";
                    a += "&site=" + this.settings.site;
                    var b = this.log._getAbtest(this.settings.abtest);
                    a += b ? "&ver=" + b: "";
                    a += "&t=" + (new Date).getTime();
                    this._ajax(this.settings.gUrl + a)
                }
            },
            simpleClean: function() {
                var a = function() {
                    var a = "";
                    a += (this.settings.cUrl.indexOf("?") > -1 ? "&": "?") + "jsoncallback=XBox.cUpdate";
                    a += "&site=" + this.settings.site;
                    var d = this.settings.clientMark && c.util.readCookie(this.settings.clientMark);
                    a += d ? "&cm=" + d: "";
                    d = this.log._getAbtest(this.settings.abtest);
                    a += d ? "&ver=" + d: "";
                    a += "&t=" + (new Date).getTime();
                    this._ajax(this.settings.cUrl + a); (a = this._dataItem(!1)) && a.getAttribute("dataver");
                    a && a.getAttribute("boxtype")
                };
                c.util.isEmptyFun(this.settings.confirm) ? window.confirm("\u786e\u8ba4\u6e05\u9664\u5168\u90e8\u5386\u53f2\u8bb0\u5f55?") && a.call(this) : this.settings.confirm.call(this, c.events.bind(a, this))
            },
            simpleClose: function() {
                this.closeClick = !0;
                this.hide()
            },
            simplePuton: function(a) {
                var a = c.events.element(a),
                a = c.dom.isTag(a, "span") ? a.parentNode: a,
                b = a.parentNode,
                d = c.dom.gc("selected", b.parentNode, "div");
                c.util.isArray(d) && d.length > 0 && c.dom.removeClass(d[0], "selected");
                c.dom.addClass(a, "selected");
                if (a = b.getAttribute("qword")) this._bword(a),
                this._handler.remote.call(this)
            },
            bwSimpleClick: function(a) {
                c.events.stopDefault(a);
                a = this._dataItemByEvent(c.events.element(a));
                this._resetIframe();
                var b = this._bword(),
                d = "",
                e = "",
                g = "";
                a && (b = a.getAttribute("qword"), d = a.getAttribute("windex"), e = a.getAttribute("dataver"), g = a.getAttribute("wordtype"));
                a = {
                    type: 4,
                    pos: "1",
                    bword: this._uword(),
                    wordtype: g,
                    qword: b,
                    dataver: e,
                    windex: d
                };
                this._handler._openUrl.call(this, "", this._handler._buildQueryUrl.call(this, a), a)
            },
            simpleAddCurrent: function(a) {
                for (var b = this._dataItems(), d = 0; d < b.length; d++) {
                    var e = b[d];
                    if (e && c.dom.hasClass(e, "current")) {
                        c.dom.removeClass(e, "current");
                        break
                    }
                } (a = this._dataItemByEvent(c.events.element(a))) && !c.dom.hasClass(a, "hit") && c.dom.addClass(a, "current")
            },
            simpleRemoveCurrent: function(a) {
                c.dom.removeClass(this._dataItemByEvent(c.events.element(a)), "current")
            },
            _requestHistory: function(a) {
                this.settings.crossHistory ? this.XDomain.send({
                    url: "//www.soku.com/search/cookie.html?cn=" + this.settings.historyName,
                    success: function(b) {
                        a && a.call(this, b)
                    }
                }) : a && a.call(this, c.util.readCookie(this.settings.historyName))
            },
            _requestWord: function(a, b) {
                var d = this._bword(),
                e = this._dataItem(!0),
                g = this._complete.isCompleteInput.call(this, d) && this.log.cons.LOG_KEY_SELECT && !e,
                h = "",
                m = "",
                o = "",
                s = "",
                C = "",
                t = "";
                if ((e = g ? this._dataDirectItem() : b ? this._dataItemByEvent(b) : e) && (a == this.log.cons.LOG_MOUSE_SELECT || c.util.equalsIgnoreCase(d, e.getAttribute("qword")))) d = e.getAttribute("qword"),
                h = e.getAttribute("windex"),
                m = e.getAttribute("dataver"),
                o = e.getAttribute("wordtype"),
                s = e.getAttribute("enterurl"),
                C = this.log._fullBit(e.getAttribute("log_kct"), 2),
                t = e.getAttribute("log_pos") || "1";
                d = {
                    type: 4,
                    pos: g ? 7 : t,
                    kct: C,
                    bword: this._uword(),
                    wordtype: o,
                    qword: d,
                    dataver: m,
                    operate: a,
                    windex: h,
                    enterurl: s
                }; (g = this._handler._buildQueryUrl.call(this, d)) && g.indexOf("?") > -1 && g.split("?");
                this._handler._openUrl.call(this, a, g, d)
            },
            _openUrl: function(a, b, d, e) {
                //if (b) if (c.util.isEmptyFun(this.settings.openUrl)) {
                //    if (!e) this.settings.target == "_blank" || d.enterurl ? a == this.log.cons.LOG_KEY_SELECT && !this.settings.enterOpen && this.dom_submitform ? this.dom_submitform.setAttribute("action", b) : window.open(b, "_blank") : document.location = b
                //} else c.events.stopDefault(event),
                //c.events.stopBubble(event),
                //a = {
                //    url: b,
                //    word: d.qword || "",
                //    showid: d.showid || ""
                //},
                //a.type = /\/detail\/show/.test(b) || /http((:\/\/)|(%3A%2F%2F))list.youku.com((\/)|(%2F))show_page/.test(b) || /https((:\/\/)|(%3A%2F%2F))list.youku.com((\/)|(%2F))show_page/.test(b) ? 1 : /http((:\/\/)|(%3A%2F%2F))v.youku.com((\/)|(%2F))v_show/.test(b) || /https((:\/\/)|(%3A%2F%2F))v.youku.com((\/)|(%2F))v_show/.test(b) ? 2 : /http((:\/\/)|(%3A%2F%2F))www.soku.com((\/)|(%2F))search_iku/.test(b) || /https((:\/\/)|(%3A%2F%2F))www.soku.com((\/)|(%2F))search_iku/.test(b) ? 3 : 4,
                //this.settings.openUrl.call(window, a)
            },
            _buildQueryUrl: function(a) {
                var b = "";
                a.qword = this._handler._htmlEncodeAll(a.qword);
                a && a.enterurl ? b = a.enterurl: a && a.qword && (b = this.settings.queryUrl.call(this, a.qword, c.util.localServer()), this.settings.history && c.util.updateHistory(this.settings.historyName, a.qword));
                if (!b) return "";
                a.url = b;
                b += b.indexOf("?") == -1 ? "?f=1": "&f=1";
                b += "&kb=" + (this.log.getKB(a) || "");
                b = this._skinManager._appendOnLink.call(this, b);
                return b = b.substring(0, 4) != "http" && b.substring(0, 5) != "https" && b.substring(0, 1) != "/" ? "//" + b: b
            },
            _htmlEncodeAll: function(a) {
                return null == a ? "": a.replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/\&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/\\/g, "").replace(/\//g, "")
            },
            _select: function(a) {
                a && !c.dom.hasClass(a, "current") && (this._handler._cancelSelect.call(this), c.dom.addClass(a, "current"), this._resetIframe())
            },
            _cancelSelect: function(a) {
                if (a) return c.dom.removeClass(d, "current"),
                a;
                if ((a = this._dataItems()) && a[0]) for (var b = 0; b < a.length; b++) {
                    var d = a[b];
                    if (d && c.dom.hasClass(d, "current")) {
                        c.dom.removeClass(d, "current");
                        break
                    }
                }
                return a
            }
        }
    })
})({});