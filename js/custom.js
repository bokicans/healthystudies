if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");
if (+ function(t) {
        "use strict";
        var i = t.fn.jquery.split(" ")[0].split(".");
        if (i[0] < 2 && i[1] < 9 || 1 == i[0] && 9 == i[1] && i[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
    }(jQuery), + function(t) {
        "use strict";

        function i() {
            var t = document.createElement("bootstrap"),
                i = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
            for (var e in i)
                if (void 0 !== t.style[e]) return {
                    end: i[e]
                };
            return !1
        }
        t.fn.emulateTransitionEnd = function(i) {
            var e = !1,
                s = this;
            t(this).one("bsTransitionEnd", function() {
                e = !0
            });
            var o = function() {
                e || t(s).trigger(t.support.transition.end)
            };
            return setTimeout(o, i), this
        }, t(function() {
            t.support.transition = i(), t.support.transition && (t.event.special.bsTransitionEnd = {
                bindType: t.support.transition.end,
                delegateType: t.support.transition.end,
                handle: function(i) {
                    return t(i.target).is(this) ? i.handleObj.handler.apply(this, arguments) : void 0
                }
            })
        })
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var e = t(this),
                    o = e.data("bs.alert");
                o || e.data("bs.alert", o = new s(this)), "string" == typeof i && o[i].call(e)
            })
        }
        var e = '[data-dismiss="alert"]',
            s = function(i) {
                t(i).on("click", e, this.close)
            };
        s.VERSION = "3.3.4", s.TRANSITION_DURATION = 150, s.prototype.close = function(i) {
            function e() {
                r.detach().trigger("closed.bs.alert").remove()
            }
            var o = t(this),
                n = o.attr("data-target");
            n || (n = o.attr("href"), n = n && n.replace(/.*(?=#[^\s]*$)/, ""));
            var r = t(n);
            i && i.preventDefault(), r.length || (r = o.closest(".alert")), r.trigger(i = t.Event("close.bs.alert")), i.isDefaultPrevented() || (r.removeClass("in"), t.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", e).emulateTransitionEnd(s.TRANSITION_DURATION) : e())
        };
        var o = t.fn.alert;
        t.fn.alert = i, t.fn.alert.Constructor = s, t.fn.alert.noConflict = function() {
            return t.fn.alert = o, this
        }, t(document).on("click.bs.alert.data-api", e, s.prototype.close)
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.button"),
                    n = "object" == typeof i && i;
                o || s.data("bs.button", o = new e(this, n)), "toggle" == i ? o.toggle() : i && o.setState(i)
            })
        }
        var e = function(i, s) {
            this.$element = t(i), this.options = t.extend({}, e.DEFAULTS, s), this.isLoading = !1
        };
        e.VERSION = "3.3.4", e.DEFAULTS = {
            loadingText: "loading..."
        }, e.prototype.setState = function(i) {
            var e = "disabled",
                s = this.$element,
                o = s.is("input") ? "val" : "html",
                n = s.data();
            i += "Text", null == n.resetText && s.data("resetText", s[o]()), setTimeout(t.proxy(function() {
                s[o](null == n[i] ? this.options[i] : n[i]), "loadingText" == i ? (this.isLoading = !0, s.addClass(e).attr(e, e)) : this.isLoading && (this.isLoading = !1, s.removeClass(e).removeAttr(e))
            }, this), 0)
        }, e.prototype.toggle = function() {
            var t = !0,
                i = this.$element.closest('[data-toggle="buttons"]');
            if (i.length) {
                var e = this.$element.find("input");
                "radio" == e.prop("type") && (e.prop("checked") && this.$element.hasClass("active") ? t = !1 : i.find(".active").removeClass("active")), t && e.prop("checked", !this.$element.hasClass("active")).trigger("change")
            } else this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
            t && this.$element.toggleClass("active")
        };
        var s = t.fn.button;
        t.fn.button = i, t.fn.button.Constructor = e, t.fn.button.noConflict = function() {
            return t.fn.button = s, this
        }, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(e) {
            var s = t(e.target);
            s.hasClass("btn") || (s = s.closest(".btn")), i.call(s, "toggle"), e.preventDefault()
        }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(i) {
            t(i.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(i.type))
        })
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.carousel"),
                    n = t.extend({}, e.DEFAULTS, s.data(), "object" == typeof i && i),
                    r = "string" == typeof i ? i : n.slide;
                o || s.data("bs.carousel", o = new e(this, n)), "number" == typeof i ? o.to(i) : r ? o[r]() : n.interval && o.pause().cycle()
            })
        }
        var e = function(i, e) {
            this.$element = t(i), this.$indicators = this.$element.find(".carousel-indicators"), this.options = e, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
        };
        e.VERSION = "3.3.4", e.TRANSITION_DURATION = 600, e.DEFAULTS = {
            interval: 5e3,
            pause: "hover",
            wrap: !0,
            keyboard: !0
        }, e.prototype.keydown = function(t) {
            if (!/input|textarea/i.test(t.target.tagName)) {
                switch (t.which) {
                    case 37:
                        this.prev();
                        break;
                    case 39:
                        this.next();
                        break;
                    default:
                        return
                }
                t.preventDefault()
            }
        }, e.prototype.cycle = function(i) {
            return i || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
        }, e.prototype.getItemIndex = function(t) {
            return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
        }, e.prototype.getItemForDirection = function(t, i) {
            var e = this.getItemIndex(i),
                s = "prev" == t && 0 === e || "next" == t && e == this.$items.length - 1;
            if (s && !this.options.wrap) return i;
            var o = "prev" == t ? -1 : 1,
                n = (e + o) % this.$items.length;
            return this.$items.eq(n)
        }, e.prototype.to = function(t) {
            var i = this,
                e = this.getItemIndex(this.$active = this.$element.find(".item.active"));
            return t > this.$items.length - 1 || 0 > t ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
                i.to(t)
            }) : e == t ? this.pause().cycle() : this.slide(t > e ? "next" : "prev", this.$items.eq(t))
        }, e.prototype.pause = function(i) {
            return i || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
        }, e.prototype.next = function() {
            return this.sliding ? void 0 : this.slide("next")
        }, e.prototype.prev = function() {
            return this.sliding ? void 0 : this.slide("prev")
        }, e.prototype.slide = function(i, s) {
            var o = this.$element.find(".item.active"),
                n = s || this.getItemForDirection(i, o),
                r = this.interval,
                a = "next" == i ? "left" : "right",
                l = this;
            if (n.hasClass("active")) return this.sliding = !1;
            var h = n[0],
                c = t.Event("slide.bs.carousel", {
                    relatedTarget: h,
                    direction: a
                });
            if (this.$element.trigger(c), !c.isDefaultPrevented()) {
                if (this.sliding = !0, r && this.pause(), this.$indicators.length) {
                    this.$indicators.find(".active").removeClass("active");
                    var d = t(this.$indicators.children()[this.getItemIndex(n)]);
                    d && d.addClass("active")
                }
                var p = t.Event("slid.bs.carousel", {
                    relatedTarget: h,
                    direction: a
                });
                return t.support.transition && this.$element.hasClass("slide") ? (n.addClass(i), n[0].offsetWidth, o.addClass(a), n.addClass(a), o.one("bsTransitionEnd", function() {
                    n.removeClass([i, a].join(" ")).addClass("active"), o.removeClass(["active", a].join(" ")), l.sliding = !1, setTimeout(function() {
                        l.$element.trigger(p)
                    }, 0)
                }).emulateTransitionEnd(e.TRANSITION_DURATION)) : (o.removeClass("active"), n.addClass("active"), this.sliding = !1, this.$element.trigger(p)), r && this.cycle(), this
            }
        };
        var s = t.fn.carousel;
        t.fn.carousel = i, t.fn.carousel.Constructor = e, t.fn.carousel.noConflict = function() {
            return t.fn.carousel = s, this
        };
        var o = function(e) {
            var s, o = t(this),
                n = t(o.attr("data-target") || (s = o.attr("href")) && s.replace(/.*(?=#[^\s]+$)/, ""));
            if (n.hasClass("carousel")) {
                var r = t.extend({}, n.data(), o.data()),
                    a = o.attr("data-slide-to");
                a && (r.interval = !1), i.call(n, r), a && n.data("bs.carousel").to(a), e.preventDefault()
            }
        };
        t(document).on("click.bs.carousel.data-api", "[data-slide]", o).on("click.bs.carousel.data-api", "[data-slide-to]", o), t(window).on("load", function() {
            t('[data-ride="carousel"]').each(function() {
                var e = t(this);
                i.call(e, e.data())
            })
        })
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            var e, s = i.attr("data-target") || (e = i.attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "");
            return t(s)
        }

        function e(i) {
            return this.each(function() {
                var e = t(this),
                    o = e.data("bs.collapse"),
                    n = t.extend({}, s.DEFAULTS, e.data(), "object" == typeof i && i);
                !o && n.toggle && /show|hide/.test(i) && (n.toggle = !1), o || e.data("bs.collapse", o = new s(this, n)), "string" == typeof i && o[i]()
            })
        }
        var s = function(i, e) {
            this.$element = t(i), this.options = t.extend({}, s.DEFAULTS, e), this.$trigger = t('[data-toggle="collapse"][href="#' + i.id + '"],[data-toggle="collapse"][data-target="#' + i.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
        };
        s.VERSION = "3.3.4", s.TRANSITION_DURATION = 350, s.DEFAULTS = {
            toggle: !0
        }, s.prototype.dimension = function() {
            var t = this.$element.hasClass("width");
            return t ? "width" : "height"
        }, s.prototype.show = function() {
            if (!this.transitioning && !this.$element.hasClass("in")) {
                var i, o = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
                if (!(o && o.length && (i = o.data("bs.collapse"), i && i.transitioning))) {
                    var n = t.Event("show.bs.collapse");
                    if (this.$element.trigger(n), !n.isDefaultPrevented()) {
                        o && o.length && (e.call(o, "hide"), i || o.data("bs.collapse", null));
                        var r = this.dimension();
                        this.$element.removeClass("collapse").addClass("collapsing")[r](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                        var a = function() {
                            this.$element.removeClass("collapsing").addClass("collapse in")[r](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                        };
                        if (!t.support.transition) return a.call(this);
                        var l = t.camelCase(["scroll", r].join("-"));
                        this.$element.one("bsTransitionEnd", t.proxy(a, this)).emulateTransitionEnd(s.TRANSITION_DURATION)[r](this.$element[0][l])
                    }
                }
            }
        }, s.prototype.hide = function() {
            if (!this.transitioning && this.$element.hasClass("in")) {
                var i = t.Event("hide.bs.collapse");
                if (this.$element.trigger(i), !i.isDefaultPrevented()) {
                    var e = this.dimension();
                    this.$element[e](this.$element[e]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                    var o = function() {
                        this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                    };
                    return t.support.transition ? void this.$element[e](0).one("bsTransitionEnd", t.proxy(o, this)).emulateTransitionEnd(s.TRANSITION_DURATION) : o.call(this)
                }
            }
        }, s.prototype.toggle = function() {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        }, s.prototype.getParent = function() {
            return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function(e, s) {
                var o = t(s);
                this.addAriaAndCollapsedClass(i(o), o)
            }, this)).end()
        }, s.prototype.addAriaAndCollapsedClass = function(t, i) {
            var e = t.hasClass("in");
            t.attr("aria-expanded", e), i.toggleClass("collapsed", !e).attr("aria-expanded", e)
        };
        var o = t.fn.collapse;
        t.fn.collapse = e, t.fn.collapse.Constructor = s, t.fn.collapse.noConflict = function() {
            return t.fn.collapse = o, this
        }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(s) {
            var o = t(this);
            o.attr("data-target") || s.preventDefault();
            var n = i(o),
                r = n.data("bs.collapse"),
                a = r ? "toggle" : o.data();
            e.call(n, a)
        })
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            i && 3 === i.which || (t(o).remove(), t(n).each(function() {
                var s = t(this),
                    o = e(s),
                    n = {
                        relatedTarget: this
                    };
                o.hasClass("open") && (o.trigger(i = t.Event("hide.bs.dropdown", n)), i.isDefaultPrevented() || (s.attr("aria-expanded", "false"), o.removeClass("open").trigger("hidden.bs.dropdown", n)))
            }))
        }

        function e(i) {
            var e = i.attr("data-target");
            e || (e = i.attr("href"), e = e && /#[A-Za-z]/.test(e) && e.replace(/.*(?=#[^\s]*$)/, ""));
            var s = e && t(e);
            return s && s.length ? s : i.parent()
        }

        function s(i) {
            return this.each(function() {
                var e = t(this),
                    s = e.data("bs.dropdown");
                s || e.data("bs.dropdown", s = new r(this)), "string" == typeof i && s[i].call(e)
            })
        }
        var o = ".dropdown-backdrop",
            n = '[data-toggle="dropdown"]',
            r = function(i) {
                t(i).on("click.bs.dropdown", this.toggle)
            };
        r.VERSION = "3.3.4", r.prototype.toggle = function(s) {
            var o = t(this);
            if (!o.is(".disabled, :disabled")) {
                var n = e(o),
                    r = n.hasClass("open");
                if (i(), !r) {
                    "ontouchstart" in document.documentElement && !n.closest(".navbar-nav").length && t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click", i);
                    var a = {
                        relatedTarget: this
                    };
                    if (n.trigger(s = t.Event("show.bs.dropdown", a)), s.isDefaultPrevented()) return;
                    o.trigger("focus").attr("aria-expanded", "true"), n.toggleClass("open").trigger("shown.bs.dropdown", a)
                }
                return !1
            }
        }, r.prototype.keydown = function(i) {
            if (/(38|40|27|32)/.test(i.which) && !/input|textarea/i.test(i.target.tagName)) {
                var s = t(this);
                if (i.preventDefault(), i.stopPropagation(), !s.is(".disabled, :disabled")) {
                    var o = e(s),
                        r = o.hasClass("open");
                    if (!r && 27 != i.which || r && 27 == i.which) return 27 == i.which && o.find(n).trigger("focus"), s.trigger("click");
                    var a = " li:not(.disabled):visible a",
                        l = o.find('[role="menu"]' + a + ', [role="listbox"]' + a);
                    if (l.length) {
                        var h = l.index(i.target);
                        38 == i.which && h > 0 && h--, 40 == i.which && h < l.length - 1 && h++, ~h || (h = 0), l.eq(h).trigger("focus")
                    }
                }
            }
        };
        var a = t.fn.dropdown;
        t.fn.dropdown = s, t.fn.dropdown.Constructor = r, t.fn.dropdown.noConflict = function() {
            return t.fn.dropdown = a, this
        }, t(document).on("click.bs.dropdown.data-api", i).on("click.bs.dropdown.data-api", ".dropdown form", function(t) {
            t.stopPropagation()
        }).on("click.bs.dropdown.data-api", n, r.prototype.toggle).on("keydown.bs.dropdown.data-api", n, r.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', r.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', r.prototype.keydown)
    }(jQuery), + function(t) {
        "use strict";

        function i(i, s) {
            return this.each(function() {
                var o = t(this),
                    n = o.data("bs.modal"),
                    r = t.extend({}, e.DEFAULTS, o.data(), "object" == typeof i && i);
                n || o.data("bs.modal", n = new e(this, r)), "string" == typeof i ? n[i](s) : r.show && n.show(s)
            })
        }
        var e = function(i, e) {
            this.options = e, this.$body = t(document.body), this.$element = t(i), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function() {
                this.$element.trigger("loaded.bs.modal")
            }, this))
        };
        e.VERSION = "3.3.4", e.TRANSITION_DURATION = 300, e.BACKDROP_TRANSITION_DURATION = 150, e.DEFAULTS = {
            backdrop: !0,
            keyboard: !0,
            show: !0
        }, e.prototype.toggle = function(t) {
            return this.isShown ? this.hide() : this.show(t)
        }, e.prototype.show = function(i) {
            var s = this,
                o = t.Event("show.bs.modal", {
                    relatedTarget: i
                });
            this.$element.trigger(o), this.isShown || o.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
                s.$element.one("mouseup.dismiss.bs.modal", function(i) {
                    t(i.target).is(s.$element) && (s.ignoreBackdropClick = !0)
                })
            }), this.backdrop(function() {
                var o = t.support.transition && s.$element.hasClass("fade");
                s.$element.parent().length || s.$element.appendTo(s.$body), s.$element.show().scrollTop(0), s.adjustDialog(), o && s.$element[0].offsetWidth, s.$element.addClass("in").attr("aria-hidden", !1), s.enforceFocus();
                var n = t.Event("shown.bs.modal", {
                    relatedTarget: i
                });
                o ? s.$dialog.one("bsTransitionEnd", function() {
                    s.$element.trigger("focus").trigger(n)
                }).emulateTransitionEnd(e.TRANSITION_DURATION) : s.$element.trigger("focus").trigger(n)
            }))
        }, e.prototype.hide = function(i) {
            i && i.preventDefault(), i = t.Event("hide.bs.modal"), this.$element.trigger(i), this.isShown && !i.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(e.TRANSITION_DURATION) : this.hideModal())
        }, e.prototype.enforceFocus = function() {
            t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
                this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
            }, this))
        }, e.prototype.escape = function() {
            this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function(t) {
                27 == t.which && this.hide()
            }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
        }, e.prototype.resize = function() {
            this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
        }, e.prototype.hideModal = function() {
            var t = this;
            this.$element.hide(), this.backdrop(function() {
                t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal")
            })
        }, e.prototype.removeBackdrop = function() {
            this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
        }, e.prototype.backdrop = function(i) {
            var s = this,
                o = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var n = t.support.transition && o;
                if (this.$backdrop = t('<div class="modal-backdrop ' + o + '" />').appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", t.proxy(function(t) {
                        return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                    }, this)), n && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !i) return;
                n ? this.$backdrop.one("bsTransitionEnd", i).emulateTransitionEnd(e.BACKDROP_TRANSITION_DURATION) : i()
            } else if (!this.isShown && this.$backdrop) {
                this.$backdrop.removeClass("in");
                var r = function() {
                    s.removeBackdrop(), i && i()
                };
                t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", r).emulateTransitionEnd(e.BACKDROP_TRANSITION_DURATION) : r()
            } else i && i()
        }, e.prototype.handleUpdate = function() {
            this.adjustDialog()
        }, e.prototype.adjustDialog = function() {
            var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
            this.$element.css({
                paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
                paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
            })
        }, e.prototype.resetAdjustments = function() {
            this.$element.css({
                paddingLeft: "",
                paddingRight: ""
            })
        }, e.prototype.checkScrollbar = function() {
            var t = window.innerWidth;
            if (!t) {
                var i = document.documentElement.getBoundingClientRect();
                t = i.right - Math.abs(i.left)
            }
            this.bodyIsOverflowing = document.body.clientWidth < t, this.scrollbarWidth = this.measureScrollbar()
        }, e.prototype.setScrollbar = function() {
            var t = parseInt(this.$body.css("padding-right") || 0, 10);
            this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
        }, e.prototype.resetScrollbar = function() {
            this.$body.css("padding-right", this.originalBodyPad)
        }, e.prototype.measureScrollbar = function() {
            var t = document.createElement("div");
            t.className = "modal-scrollbar-measure", this.$body.append(t);
            var i = t.offsetWidth - t.clientWidth;
            return this.$body[0].removeChild(t), i
        };
        var s = t.fn.modal;
        t.fn.modal = i, t.fn.modal.Constructor = e, t.fn.modal.noConflict = function() {
            return t.fn.modal = s, this
        }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(e) {
            var s = t(this),
                o = s.attr("href"),
                n = t(s.attr("data-target") || o && o.replace(/.*(?=#[^\s]+$)/, "")),
                r = n.data("bs.modal") ? "toggle" : t.extend({
                    remote: !/#/.test(o) && o
                }, n.data(), s.data());
            s.is("a") && e.preventDefault(), n.one("show.bs.modal", function(t) {
                t.isDefaultPrevented() || n.one("hidden.bs.modal", function() {
                    s.is(":visible") && s.trigger("focus")
                })
            }), i.call(n, r, this)
        })
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.tooltip"),
                    n = "object" == typeof i && i;
                (o || !/destroy|hide/.test(i)) && (o || s.data("bs.tooltip", o = new e(this, n)), "string" == typeof i && o[i]())
            })
        }
        var e = function(t, i) {
            this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.init("tooltip", t, i)
        };
        e.VERSION = "3.3.4", e.TRANSITION_DURATION = 150, e.DEFAULTS = {
            animation: !0,
            placement: "top",
            selector: !1,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            container: !1,
            viewport: {
                selector: "body",
                padding: 0
            }
        }, e.prototype.init = function(i, e, s) {
            if (this.enabled = !0, this.type = i, this.$element = t(e), this.options = this.getOptions(s), this.$viewport = this.options.viewport && t(this.options.viewport.selector || this.options.viewport), this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
            for (var o = this.options.trigger.split(" "), n = o.length; n--;) {
                var r = o[n];
                if ("click" == r) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
                else if ("manual" != r) {
                    var a = "hover" == r ? "mouseenter" : "focusin",
                        l = "hover" == r ? "mouseleave" : "focusout";
                    this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
                }
            }
            this.options.selector ? this._options = t.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        }, e.prototype.getDefaults = function() {
            return e.DEFAULTS
        }, e.prototype.getOptions = function(i) {
            return i = t.extend({}, this.getDefaults(), this.$element.data(), i), i.delay && "number" == typeof i.delay && (i.delay = {
                show: i.delay,
                hide: i.delay
            }), i
        }, e.prototype.getDelegateOptions = function() {
            var i = {},
                e = this.getDefaults();
            return this._options && t.each(this._options, function(t, s) {
                e[t] != s && (i[t] = s)
            }), i
        }, e.prototype.enter = function(i) {
            var e = i instanceof this.constructor ? i : t(i.currentTarget).data("bs." + this.type);
            return e && e.$tip && e.$tip.is(":visible") ? void(e.hoverState = "in") : (e || (e = new this.constructor(i.currentTarget, this.getDelegateOptions()), t(i.currentTarget).data("bs." + this.type, e)), clearTimeout(e.timeout), e.hoverState = "in", e.options.delay && e.options.delay.show ? void(e.timeout = setTimeout(function() {
                "in" == e.hoverState && e.show()
            }, e.options.delay.show)) : e.show())
        }, e.prototype.leave = function(i) {
            var e = i instanceof this.constructor ? i : t(i.currentTarget).data("bs." + this.type);
            return e || (e = new this.constructor(i.currentTarget, this.getDelegateOptions()), t(i.currentTarget).data("bs." + this.type, e)), clearTimeout(e.timeout), e.hoverState = "out", e.options.delay && e.options.delay.hide ? void(e.timeout = setTimeout(function() {
                "out" == e.hoverState && e.hide()
            }, e.options.delay.hide)) : e.hide()
        }, e.prototype.show = function() {
            var i = t.Event("show.bs." + this.type);
            if (this.hasContent() && this.enabled) {
                this.$element.trigger(i);
                var s = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
                if (i.isDefaultPrevented() || !s) return;
                var o = this,
                    n = this.tip(),
                    r = this.getUID(this.type);
                this.setContent(), n.attr("id", r), this.$element.attr("aria-describedby", r), this.options.animation && n.addClass("fade");
                var a = "function" == typeof this.options.placement ? this.options.placement.call(this, n[0], this.$element[0]) : this.options.placement,
                    l = /\s?auto?\s?/i,
                    h = l.test(a);
                h && (a = a.replace(l, "") || "top"), n.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).addClass(a).data("bs." + this.type, this), this.options.container ? n.appendTo(this.options.container) : n.insertAfter(this.$element);
                var c = this.getPosition(),
                    d = n[0].offsetWidth,
                    p = n[0].offsetHeight;
                if (h) {
                    var u = a,
                        f = this.options.container ? t(this.options.container) : this.$element.parent(),
                        v = this.getPosition(f);
                    a = "bottom" == a && c.bottom + p > v.bottom ? "top" : "top" == a && c.top - p < v.top ? "bottom" : "right" == a && c.right + d > v.width ? "left" : "left" == a && c.left - d < v.left ? "right" : a, n.removeClass(u).addClass(a)
                }
                var g = this.getCalculatedOffset(a, c, d, p);
                this.applyPlacement(g, a);
                var m = function() {
                    var t = o.hoverState;
                    o.$element.trigger("shown.bs." + o.type), o.hoverState = null, "out" == t && o.leave(o)
                };
                t.support.transition && this.$tip.hasClass("fade") ? n.one("bsTransitionEnd", m).emulateTransitionEnd(e.TRANSITION_DURATION) : m()
            }
        }, e.prototype.applyPlacement = function(i, e) {
            var s = this.tip(),
                o = s[0].offsetWidth,
                n = s[0].offsetHeight,
                r = parseInt(s.css("margin-top"), 10),
                a = parseInt(s.css("margin-left"), 10);
            isNaN(r) && (r = 0), isNaN(a) && (a = 0), i.top = i.top + r, i.left = i.left + a, t.offset.setOffset(s[0], t.extend({
                using: function(t) {
                    s.css({
                        top: Math.round(t.top),
                        left: Math.round(t.left)
                    })
                }
            }, i), 0), s.addClass("in");
            var l = s[0].offsetWidth,
                h = s[0].offsetHeight;
            "top" == e && h != n && (i.top = i.top + n - h);
            var c = this.getViewportAdjustedDelta(e, i, l, h);
            c.left ? i.left += c.left : i.top += c.top;
            var d = /top|bottom/.test(e),
                p = d ? 2 * c.left - o + l : 2 * c.top - n + h,
                u = d ? "offsetWidth" : "offsetHeight";
            s.offset(i), this.replaceArrow(p, s[0][u], d)
        }, e.prototype.replaceArrow = function(t, i, e) {
            this.arrow().css(e ? "left" : "top", 50 * (1 - t / i) + "%").css(e ? "top" : "left", "")
        }, e.prototype.setContent = function() {
            var t = this.tip(),
                i = this.getTitle();
            t.find(".tooltip-inner")[this.options.html ? "html" : "text"](i), t.removeClass("fade in top bottom left right")
        }, e.prototype.hide = function(i) {
            function s() {
                "in" != o.hoverState && n.detach(), o.$element.removeAttr("aria-describedby").trigger("hidden.bs." + o.type), i && i()
            }
            var o = this,
                n = t(this.$tip),
                r = t.Event("hide.bs." + this.type);
            return this.$element.trigger(r), r.isDefaultPrevented() ? void 0 : (n.removeClass("in"), t.support.transition && n.hasClass("fade") ? n.one("bsTransitionEnd", s).emulateTransitionEnd(e.TRANSITION_DURATION) : s(), this.hoverState = null, this)
        }, e.prototype.fixTitle = function() {
            var t = this.$element;
            (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
        }, e.prototype.hasContent = function() {
            return this.getTitle()
        }, e.prototype.getPosition = function(i) {
            i = i || this.$element;
            var e = i[0],
                s = "BODY" == e.tagName,
                o = e.getBoundingClientRect();
            null == o.width && (o = t.extend({}, o, {
                width: o.right - o.left,
                height: o.bottom - o.top
            }));
            var n = s ? {
                    top: 0,
                    left: 0
                } : i.offset(),
                r = {
                    scroll: s ? document.documentElement.scrollTop || document.body.scrollTop : i.scrollTop()
                },
                a = s ? {
                    width: t(window).width(),
                    height: t(window).height()
                } : null;
            return t.extend({}, o, r, a, n)
        }, e.prototype.getCalculatedOffset = function(t, i, e, s) {
            return "bottom" == t ? {
                top: i.top + i.height,
                left: i.left + i.width / 2 - e / 2
            } : "top" == t ? {
                top: i.top - s,
                left: i.left + i.width / 2 - e / 2
            } : "left" == t ? {
                top: i.top + i.height / 2 - s / 2,
                left: i.left - e
            } : {
                top: i.top + i.height / 2 - s / 2,
                left: i.left + i.width
            }
        }, e.prototype.getViewportAdjustedDelta = function(t, i, e, s) {
            var o = {
                top: 0,
                left: 0
            };
            if (!this.$viewport) return o;
            var n = this.options.viewport && this.options.viewport.padding || 0,
                r = this.getPosition(this.$viewport);
            if (/right|left/.test(t)) {
                var a = i.top - n - r.scroll,
                    l = i.top + n - r.scroll + s;
                a < r.top ? o.top = r.top - a : l > r.top + r.height && (o.top = r.top + r.height - l)
            } else {
                var h = i.left - n,
                    c = i.left + n + e;
                h < r.left ? o.left = r.left - h : c > r.width && (o.left = r.left + r.width - c)
            }
            return o
        }, e.prototype.getTitle = function() {
            var t, i = this.$element,
                e = this.options;
            return t = i.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(i[0]) : e.title)
        }, e.prototype.getUID = function(t) {
            do t += ~~(1e6 * Math.random()); while (document.getElementById(t));
            return t
        }, e.prototype.tip = function() {
            return this.$tip = this.$tip || t(this.options.template)
        }, e.prototype.arrow = function() {
            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
        }, e.prototype.enable = function() {
            this.enabled = !0
        }, e.prototype.disable = function() {
            this.enabled = !1
        }, e.prototype.toggleEnabled = function() {
            this.enabled = !this.enabled
        }, e.prototype.toggle = function(i) {
            var e = this;
            i && (e = t(i.currentTarget).data("bs." + this.type), e || (e = new this.constructor(i.currentTarget, this.getDelegateOptions()), t(i.currentTarget).data("bs." + this.type, e))), e.tip().hasClass("in") ? e.leave(e) : e.enter(e)
        }, e.prototype.destroy = function() {
            var t = this;
            clearTimeout(this.timeout), this.hide(function() {
                t.$element.off("." + t.type).removeData("bs." + t.type)
            })
        };
        var s = t.fn.tooltip;
        t.fn.tooltip = i, t.fn.tooltip.Constructor = e, t.fn.tooltip.noConflict = function() {
            return t.fn.tooltip = s, this
        }
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.popover"),
                    n = "object" == typeof i && i;
                (o || !/destroy|hide/.test(i)) && (o || s.data("bs.popover", o = new e(this, n)), "string" == typeof i && o[i]())
            })
        }
        var e = function(t, i) {
            this.init("popover", t, i)
        };
        if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
        e.VERSION = "3.3.4", e.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
        }), e.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), e.prototype.constructor = e, e.prototype.getDefaults = function() {
            return e.DEFAULTS
        }, e.prototype.setContent = function() {
            var t = this.tip(),
                i = this.getTitle(),
                e = this.getContent();
            t.find(".popover-title")[this.options.html ? "html" : "text"](i), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof e ? "html" : "append" : "text"](e), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
        }, e.prototype.hasContent = function() {
            return this.getTitle() || this.getContent()
        }, e.prototype.getContent = function() {
            var t = this.$element,
                i = this.options;
            return t.attr("data-content") || ("function" == typeof i.content ? i.content.call(t[0]) : i.content)
        }, e.prototype.arrow = function() {
            return this.$arrow = this.$arrow || this.tip().find(".arrow")
        };
        var s = t.fn.popover;
        t.fn.popover = i, t.fn.popover.Constructor = e, t.fn.popover.noConflict = function() {
            return t.fn.popover = s, this
        }
    }(jQuery), + function(t) {
        "use strict";

        function i(e, s) {
            this.$body = t(document.body), this.$scrollElement = t(t(e).is(document.body) ? window : e), this.options = t.extend({}, i.DEFAULTS, s), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", t.proxy(this.process, this)), this.refresh(), this.process()
        }

        function e(e) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.scrollspy"),
                    n = "object" == typeof e && e;
                o || s.data("bs.scrollspy", o = new i(this, n)), "string" == typeof e && o[e]()
            })
        }
        i.VERSION = "3.3.4", i.DEFAULTS = {
            offset: 10
        }, i.prototype.getScrollHeight = function() {
            return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
        }, i.prototype.refresh = function() {
            var i = this,
                e = "offset",
                s = 0;
            this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), t.isWindow(this.$scrollElement[0]) || (e = "position", s = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
                var i = t(this),
                    o = i.data("target") || i.attr("href"),
                    n = /^#./.test(o) && t(o);
                return n && n.length && n.is(":visible") && [
                    [n[e]().top + s, o]
                ] || null
            }).sort(function(t, i) {
                return t[0] - i[0]
            }).each(function() {
                i.offsets.push(this[0]), i.targets.push(this[1])
            })
        }, i.prototype.process = function() {
            var t, i = this.$scrollElement.scrollTop() + this.options.offset,
                e = this.getScrollHeight(),
                s = this.options.offset + e - this.$scrollElement.height(),
                o = this.offsets,
                n = this.targets,
                r = this.activeTarget;
            if (this.scrollHeight != e && this.refresh(), i >= s) return r != (t = n[n.length - 1]) && this.activate(t);
            if (r && i < o[0]) return this.activeTarget = null, this.clear();
            for (t = o.length; t--;) r != n[t] && i >= o[t] && (void 0 === o[t + 1] || i < o[t + 1]) && this.activate(n[t])
        }, i.prototype.activate = function(i) {
            this.activeTarget = i, this.clear();
            var e = this.selector + '[data-target="' + i + '"],' + this.selector + '[href="' + i + '"]',
                s = t(e).parents("li").addClass("active");
            s.parent(".dropdown-menu").length && (s = s.closest("li.dropdown").addClass("active")), s.trigger("activate.bs.scrollspy")
        }, i.prototype.clear = function() {
            t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
        };
        var s = t.fn.scrollspy;
        t.fn.scrollspy = e, t.fn.scrollspy.Constructor = i, t.fn.scrollspy.noConflict = function() {
            return t.fn.scrollspy = s, this
        }, t(window).on("load.bs.scrollspy.data-api", function() {
            t('[data-spy="scroll"]').each(function() {
                var i = t(this);
                e.call(i, i.data())
            })
        })
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.tab");
                o || s.data("bs.tab", o = new e(this)), "string" == typeof i && o[i]()
            })
        }
        var e = function(i) {
            this.element = t(i)
        };
        e.VERSION = "3.3.4", e.TRANSITION_DURATION = 150, e.prototype.show = function() {
            var i = this.element,
                e = i.closest("ul:not(.dropdown-menu)"),
                s = i.data("target");
            if (s || (s = i.attr("href"), s = s && s.replace(/.*(?=#[^\s]*$)/, "")), !i.parent("li").hasClass("active")) {
                var o = e.find(".active:last a"),
                    n = t.Event("hide.bs.tab", {
                        relatedTarget: i[0]
                    }),
                    r = t.Event("show.bs.tab", {
                        relatedTarget: o[0]
                    });
                if (o.trigger(n), i.trigger(r), !r.isDefaultPrevented() && !n.isDefaultPrevented()) {
                    var a = t(s);
                    this.activate(i.closest("li"), e), this.activate(a, a.parent(), function() {
                        o.trigger({
                            type: "hidden.bs.tab",
                            relatedTarget: i[0]
                        }), i.trigger({
                            type: "shown.bs.tab",
                            relatedTarget: o[0]
                        })
                    })
                }
            }
        }, e.prototype.activate = function(i, s, o) {
            function n() {
                r.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), i.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), a ? (i[0].offsetWidth, i.addClass("in")) : i.removeClass("fade"), i.parent(".dropdown-menu").length && i.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), o && o()
            }
            var r = s.find("> .active"),
                a = o && t.support.transition && (r.length && r.hasClass("fade") || !!s.find("> .fade").length);
            r.length && a ? r.one("bsTransitionEnd", n).emulateTransitionEnd(e.TRANSITION_DURATION) : n(), r.removeClass("in")
        };
        var s = t.fn.tab;
        t.fn.tab = i, t.fn.tab.Constructor = e, t.fn.tab.noConflict = function() {
            return t.fn.tab = s, this
        };
        var o = function(e) {
            e.preventDefault(), i.call(t(this), "show")
        };
        t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', o).on("click.bs.tab.data-api", '[data-toggle="pill"]', o)
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.affix"),
                    n = "object" == typeof i && i;
                o || s.data("bs.affix", o = new e(this, n)), "string" == typeof i && o[i]()
            })
        }
        var e = function(i, s) {
            this.options = t.extend({}, e.DEFAULTS, s), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(i), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
        };
        e.VERSION = "3.3.4", e.RESET = "affix affix-top affix-bottom", e.DEFAULTS = {
            offset: 0,
            target: window
        }, e.prototype.getState = function(t, i, e, s) {
            var o = this.$target.scrollTop(),
                n = this.$element.offset(),
                r = this.$target.height();
            if (null != e && "top" == this.affixed) return e > o && "top";
            if ("bottom" == this.affixed) return null != e ? !(o + this.unpin <= n.top) && "bottom" : !(t - s >= o + r) && "bottom";
            var a = null == this.affixed,
                l = a ? o : n.top,
                h = a ? r : i;
            return null != e && e >= o ? "top" : null != s && l + h >= t - s && "bottom"
        }, e.prototype.getPinnedOffset = function() {
            if (this.pinnedOffset) return this.pinnedOffset;
            this.$element.removeClass(e.RESET).addClass("affix");
            var t = this.$target.scrollTop(),
                i = this.$element.offset();
            return this.pinnedOffset = i.top - t
        }, e.prototype.checkPositionWithEventLoop = function() {
            setTimeout(t.proxy(this.checkPosition, this), 1)
        }, e.prototype.checkPosition = function() {
            if (this.$element.is(":visible")) {
                var i = this.$element.height(),
                    s = this.options.offset,
                    o = s.top,
                    n = s.bottom,
                    r = t(document.body).height();
                "object" != typeof s && (n = o = s), "function" == typeof o && (o = s.top(this.$element)), "function" == typeof n && (n = s.bottom(this.$element));
                var a = this.getState(r, i, o, n);
                if (this.affixed != a) {
                    null != this.unpin && this.$element.css("top", "");
                    var l = "affix" + (a ? "-" + a : ""),
                        h = t.Event(l + ".bs.affix");
                    if (this.$element.trigger(h), h.isDefaultPrevented()) return;
                    this.affixed = a, this.unpin = "bottom" == a ? this.getPinnedOffset() : null, this.$element.removeClass(e.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
                }
                "bottom" == a && this.$element.offset({
                    top: r - i - n
                })
            }
        };
        var s = t.fn.affix;
        t.fn.affix = i, t.fn.affix.Constructor = e, t.fn.affix.noConflict = function() {
            return t.fn.affix = s, this
        }, t(window).on("load", function() {
            t('[data-spy="affix"]').each(function() {
                var e = t(this),
                    s = e.data();
                s.offset = s.offset || {}, null != s.offsetBottom && (s.offset.bottom = s.offsetBottom), null != s.offsetTop && (s.offset.top = s.offsetTop), i.call(e, s)
            })
        })
    }(jQuery), function() {
        var t, i, e, s, o, n = {}.hasOwnProperty,
            r = function(t, i) {
                function e() {
                    this.constructor = t
                }
                for (var s in i) n.call(i, s) && (t[s] = i[s]);
                return e.prototype = i.prototype, t.prototype = new e, t.__super__ = i.prototype, t
            };
        s = function() {
            function t() {
                this.options_index = 0, this.parsed = []
            }
            return t.prototype.add_node = function(t) {
                return "OPTGROUP" === t.nodeName.toUpperCase() ? this.add_group(t) : this.add_option(t)
            }, t.prototype.add_group = function(t) {
                var i, e, s, o, n, r;
                for (i = this.parsed.length, this.parsed.push({
                        array_index: i,
                        group: !0,
                        label: this.escapeExpression(t.label),
                        title: t.title ? t.title : void 0,
                        children: 0,
                        disabled: t.disabled,
                        classes: t.className
                    }), n = t.childNodes, r = [], s = 0, o = n.length; o > s; s++) e = n[s], r.push(this.add_option(e, i, t.disabled));
                return r
            }, t.prototype.add_option = function(t, i, e) {
                return "OPTION" === t.nodeName.toUpperCase() ? ("" !== t.text ? (null != i && (this.parsed[i].children += 1), this.parsed.push({
                    array_index: this.parsed.length,
                    options_index: this.options_index,
                    value: t.value,
                    text: t.text,
                    html: t.innerHTML,
                    title: t.title ? t.title : void 0,
                    selected: t.selected,
                    disabled: e === !0 ? e : t.disabled,
                    group_array_index: i,
                    group_label: null != i ? this.parsed[i].label : null,
                    classes: t.className,
                    style: t.style.cssText
                })) : this.parsed.push({
                    array_index: this.parsed.length,
                    options_index: this.options_index,
                    empty: !0
                }), this.options_index += 1) : void 0
            }, t.prototype.escapeExpression = function(t) {
                var i, e;
                return null == t || t === !1 ? "" : /[\&\<\>\"\'\`]/.test(t) ? (i = {
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#x27;",
                    "`": "&#x60;"
                }, e = /&(?!\w+;)|[\<\>\"\'\`]/g, t.replace(e, function(t) {
                    return i[t] || "&amp;"
                })) : t
            }, t
        }(), s.select_to_array = function(t) {
            var i, e, o, n, r;
            for (e = new s, r = t.childNodes, o = 0, n = r.length; n > o; o++) i = r[o], e.add_node(i);
            return e.parsed
        }, i = function() {
            function t(i, e) {
                this.form_field = i, this.options = null != e ? e : {}, t.browser_is_supported() && (this.is_multiple = this.form_field.multiple, this.set_default_text(), this.set_default_values(), this.setup(), this.set_up_html(), this.register_observers(), this.on_ready())
            }
            return t.prototype.set_default_values = function() {
                var t = this;
                return this.click_test_action = function(i) {
                    return t.test_active_click(i)
                }, this.activate_action = function(i) {
                    return t.activate_field(i)
                }, this.active_field = !1, this.mouse_on_container = !1, this.results_showing = !1, this.result_highlighted = null, this.allow_single_deselect = null != this.options.allow_single_deselect && null != this.form_field.options[0] && "" === this.form_field.options[0].text && this.options.allow_single_deselect, this.disable_search_threshold = this.options.disable_search_threshold || 0, this.disable_search = this.options.disable_search || !1, this.enable_split_word_search = null == this.options.enable_split_word_search || this.options.enable_split_word_search, this.group_search = null == this.options.group_search || this.options.group_search, this.search_contains = this.options.search_contains || !1, this.single_backstroke_delete = null == this.options.single_backstroke_delete || this.options.single_backstroke_delete, this.max_selected_options = this.options.max_selected_options || 1 / 0, this.inherit_select_classes = this.options.inherit_select_classes || !1, this.display_selected_options = null == this.options.display_selected_options || this.options.display_selected_options, this.display_disabled_options = null == this.options.display_disabled_options || this.options.display_disabled_options, this.include_group_label_in_selected = this.options.include_group_label_in_selected || !1
            }, t.prototype.set_default_text = function() {
                return this.default_text = this.form_field.getAttribute("data-placeholder") ? this.form_field.getAttribute("data-placeholder") : this.is_multiple ? this.options.placeholder_text_multiple || this.options.placeholder_text || t.default_multiple_text : this.options.placeholder_text_single || this.options.placeholder_text || t.default_single_text, this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || t.default_no_result_text
            }, t.prototype.choice_label = function(t) {
                return this.include_group_label_in_selected && null != t.group_label ? "<b class='group-name'>" + t.group_label + "</b>" + t.html : t.html
            }, t.prototype.mouse_enter = function() {
                return this.mouse_on_container = !0
            }, t.prototype.mouse_leave = function() {
                return this.mouse_on_container = !1
            }, t.prototype.input_focus = function() {
                var t = this;
                if (this.is_multiple) {
                    if (!this.active_field) return setTimeout(function() {
                        return t.container_mousedown()
                    }, 50)
                } else if (!this.active_field) return this.activate_field()
            }, t.prototype.input_blur = function() {
                var t = this;
                return this.mouse_on_container ? void 0 : (this.active_field = !1, setTimeout(function() {
                    return t.blur_test()
                }, 100))
            }, t.prototype.results_option_build = function(t) {
                var i, e, s, o, n;
                for (i = "", n = this.results_data, s = 0, o = n.length; o > s; s++) e = n[s], i += e.group ? this.result_add_group(e) : this.result_add_option(e), (null != t ? t.first : void 0) && (e.selected && this.is_multiple ? this.choice_build(e) : e.selected && !this.is_multiple && this.single_set_selected_text(this.choice_label(e)));
                return i
            }, t.prototype.result_add_option = function(t) {
                var i, e;
                return t.search_match && this.include_option_in_results(t) ? (i = [], t.disabled || t.selected && this.is_multiple || i.push("active-result"), !t.disabled || t.selected && this.is_multiple || i.push("disabled-result"), t.selected && i.push("result-selected"), null != t.group_array_index && i.push("group-option"), "" !== t.classes && i.push(t.classes), e = document.createElement("li"), e.className = i.join(" "), e.style.cssText = t.style, e.setAttribute("data-option-array-index", t.array_index), e.innerHTML = t.search_text, t.title && (e.title = t.title), this.outerHTML(e)) : ""
            }, t.prototype.result_add_group = function(t) {
                var i, e;
                return (t.search_match || t.group_match) && t.active_options > 0 ? (i = [], i.push("group-result"), t.classes && i.push(t.classes), e = document.createElement("li"), e.className = i.join(" "), e.innerHTML = t.search_text, t.title && (e.title = t.title), this.outerHTML(e)) : ""
            }, t.prototype.results_update_field = function() {
                return this.set_default_text(), this.is_multiple || this.results_reset_cleanup(), this.result_clear_highlight(), this.results_build(), this.results_showing ? this.winnow_results() : void 0
            }, t.prototype.reset_single_select_options = function() {
                var t, i, e, s, o;
                for (s = this.results_data, o = [], i = 0, e = s.length; e > i; i++) t = s[i], t.selected ? o.push(t.selected = !1) : o.push(void 0);
                return o
            }, t.prototype.results_toggle = function() {
                return this.results_showing ? this.results_hide() : this.results_show()
            }, t.prototype.results_search = function() {
                return this.results_showing ? this.winnow_results() : this.results_show()
            }, t.prototype.winnow_results = function() {
                var t, i, e, s, o, n, r, a, l, h, c, d;
                for (this.no_results_clear(), s = 0, n = this.get_search_text(), t = n.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), l = new RegExp(t, "i"), e = this.get_search_regex(t), d = this.results_data, h = 0, c = d.length; c > h; h++) i = d[h], i.search_match = !1, o = null, this.include_option_in_results(i) && (i.group && (i.group_match = !1, i.active_options = 0), null != i.group_array_index && this.results_data[i.group_array_index] && (o = this.results_data[i.group_array_index], 0 === o.active_options && o.search_match && (s += 1), o.active_options += 1), i.search_text = i.group ? i.label : i.html, (!i.group || this.group_search) && (i.search_match = this.search_string_match(i.search_text, e), i.search_match && !i.group && (s += 1), i.search_match ? (n.length && (r = i.search_text.search(l), a = i.search_text.substr(0, r + n.length) + "</em>" + i.search_text.substr(r + n.length), i.search_text = a.substr(0, r) + "<em>" + a.substr(r)), null != o && (o.group_match = !0)) : null != i.group_array_index && this.results_data[i.group_array_index].search_match && (i.search_match = !0)));
                return this.result_clear_highlight(), 1 > s && n.length ? (this.update_results_content(""), this.no_results(n)) : (this.update_results_content(this.results_option_build()), this.winnow_results_set_highlight())
            }, t.prototype.get_search_regex = function(t) {
                var i;
                return i = this.search_contains ? "" : "^", new RegExp(i + t, "i")
            }, t.prototype.search_string_match = function(t, i) {
                var e, s, o, n;
                if (i.test(t)) return !0;
                if (this.enable_split_word_search && (t.indexOf(" ") >= 0 || 0 === t.indexOf("[")) && (s = t.replace(/\[|\]/g, "").split(" "), s.length))
                    for (o = 0, n = s.length; n > o; o++)
                        if (e = s[o], i.test(e)) return !0
            }, t.prototype.choices_count = function() {
                var t, i, e, s;
                if (null != this.selected_option_count) return this.selected_option_count;
                for (this.selected_option_count = 0, s = this.form_field.options, i = 0, e = s.length; e > i; i++) t = s[i], t.selected && (this.selected_option_count += 1);
                return this.selected_option_count
            }, t.prototype.choices_click = function(t) {
                return t.preventDefault(), this.results_showing || this.is_disabled ? void 0 : this.results_show()
            }, t.prototype.keyup_checker = function(t) {
                var i, e;
                switch (i = null != (e = t.which) ? e : t.keyCode, this.search_field_scale(), i) {
                    case 8:
                        if (this.is_multiple && this.backstroke_length < 1 && this.choices_count() > 0) return this.keydown_backstroke();
                        if (!this.pending_backstroke) return this.result_clear_highlight(), this.results_search();
                        break;
                    case 13:
                        if (t.preventDefault(), this.results_showing) return this.result_select(t);
                        break;
                    case 27:
                        return this.results_showing && this.results_hide(), !0;
                    case 9:
                    case 38:
                    case 40:
                    case 16:
                    case 91:
                    case 17:
                        break;
                    default:
                        return this.results_search()
                }
            }, t.prototype.clipboard_event_checker = function() {
                var t = this;
                return setTimeout(function() {
                    return t.results_search()
                }, 50)
            }, t.prototype.container_width = function() {
                return null != this.options.width ? this.options.width : "" + this.form_field.offsetWidth + "px"
            }, t.prototype.include_option_in_results = function(t) {
                return !(this.is_multiple && !this.display_selected_options && t.selected) && (!(!this.display_disabled_options && t.disabled) && !t.empty)
            }, t.prototype.search_results_touchstart = function(t) {
                return this.touch_started = !0, this.search_results_mouseover(t)
            }, t.prototype.search_results_touchmove = function(t) {
                return this.touch_started = !1, this.search_results_mouseout(t)
            }, t.prototype.search_results_touchend = function(t) {
                return this.touch_started ? this.search_results_mouseup(t) : void 0
            }, t.prototype.outerHTML = function(t) {
                var i;
                return t.outerHTML ? t.outerHTML : (i = document.createElement("div"), i.appendChild(t), i.innerHTML)
            }, t.browser_is_supported = function() {
                return "Microsoft Internet Explorer" === window.navigator.appName ? document.documentMode >= 8 : !/iP(od|hone)/i.test(window.navigator.userAgent) && (!/Android/i.test(window.navigator.userAgent) || !/Mobile/i.test(window.navigator.userAgent))
            }, t.default_multiple_text = "Select Some Options", t.default_single_text = "Select an Option", t.default_no_result_text = "No results match", t
        }(), t = jQuery, t.fn.extend({
            chosen: function(s) {
                return i.browser_is_supported() ? this.each(function() {
                    var i, o;
                    i = t(this), o = i.data("chosen"), "destroy" === s && o instanceof e ? o.destroy() : o instanceof e || i.data("chosen", new e(this, s))
                }) : this
            }
        }), e = function(i) {
            function e() {
                return o = e.__super__.constructor.apply(this, arguments)
            }
            return r(e, i), e.prototype.setup = function() {
                return this.form_field_jq = t(this.form_field), this.current_selectedIndex = this.form_field.selectedIndex, this.is_rtl = this.form_field_jq.hasClass("chosen-rtl")
            }, e.prototype.set_up_html = function() {
                var i, e;
                return i = ["chosen-container"], i.push("chosen-container-" + (this.is_multiple ? "multi" : "single")), this.inherit_select_classes && this.form_field.className && i.push(this.form_field.className), this.is_rtl && i.push("chosen-rtl"), e = {
                    class: i.join(" "),
                    style: "width: " + this.container_width() + ";",
                    title: this.form_field.title
                }, this.form_field.id.length && (e.id = this.form_field.id.replace(/[^\w]/g, "_") + "_chosen"), this.container = t("<div />", e), this.is_multiple ? this.container.html('<ul class="chosen-choices"><li class="search-field"><input type="text" value="' + this.default_text + '" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>') : this.container.html('<a class="chosen-single chosen-default" tabindex="-1"><span>' + this.default_text + '</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>'), this.form_field_jq.hide().after(this.container), this.dropdown = this.container.find("div.chosen-drop").first(), this.search_field = this.container.find("input").first(), this.search_results = this.container.find("ul.chosen-results").first(), this.search_field_scale(), this.search_no_results = this.container.find("li.no-results").first(), this.is_multiple ? (this.search_choices = this.container.find("ul.chosen-choices").first(), this.search_container = this.container.find("li.search-field").first()) : (this.search_container = this.container.find("div.chosen-search").first(), this.selected_item = this.container.find(".chosen-single").first()), this.results_build(), this.set_tab_index(), this.set_label_behavior()
            }, e.prototype.on_ready = function() {
                return this.form_field_jq.trigger("chosen:ready", {
                    chosen: this
                })
            }, e.prototype.register_observers = function() {
                var t = this;
                return this.container.bind("touchstart.chosen", function(i) {
                    return t.container_mousedown(i), i.preventDefault()
                }), this.container.bind("touchend.chosen", function(i) {
                    return t.container_mouseup(i), i.preventDefault()
                }), this.container.bind("mousedown.chosen", function(i) {
                    t.container_mousedown(i)
                }), this.container.bind("mouseup.chosen", function(i) {
                    t.container_mouseup(i)
                }), this.container.bind("mouseenter.chosen", function(i) {
                    t.mouse_enter(i)
                }), this.container.bind("mouseleave.chosen", function(i) {
                    t.mouse_leave(i)
                }), this.search_results.bind("mouseup.chosen", function(i) {
                    t.search_results_mouseup(i)
                }), this.search_results.bind("mouseover.chosen", function(i) {
                    t.search_results_mouseover(i)
                }), this.search_results.bind("mouseout.chosen", function(i) {
                    t.search_results_mouseout(i)
                }), this.search_results.bind("mousewheel.chosen DOMMouseScroll.chosen", function(i) {
                    t.search_results_mousewheel(i)
                }), this.search_results.bind("touchstart.chosen", function(i) {
                    t.search_results_touchstart(i)
                }), this.search_results.bind("touchmove.chosen", function(i) {
                    t.search_results_touchmove(i)
                }), this.search_results.bind("touchend.chosen", function(i) {
                    t.search_results_touchend(i)
                }), this.form_field_jq.bind("chosen:updated.chosen", function(i) {
                    t.results_update_field(i)
                }), this.form_field_jq.bind("chosen:activate.chosen", function(i) {
                    t.activate_field(i)
                }), this.form_field_jq.bind("chosen:open.chosen", function(i) {
                    t.container_mousedown(i)
                }), this.form_field_jq.bind("chosen:close.chosen", function(i) {
                    t.input_blur(i)
                }), this.search_field.bind("blur.chosen", function(i) {
                    t.input_blur(i)
                }), this.search_field.bind("keyup.chosen", function(i) {
                    t.keyup_checker(i)
                }), this.search_field.bind("keydown.chosen", function(i) {
                    t.keydown_checker(i)
                }), this.search_field.bind("focus.chosen", function(i) {
                    t.input_focus(i)
                }), this.search_field.bind("cut.chosen", function(i) {
                    t.clipboard_event_checker(i)
                }), this.search_field.bind("paste.chosen", function(i) {
                    t.clipboard_event_checker(i)
                }), this.is_multiple ? this.search_choices.bind("click.chosen", function(i) {
                    t.choices_click(i)
                }) : this.container.bind("click.chosen", function(t) {
                    t.preventDefault()
                })
            }, e.prototype.destroy = function() {
                return t(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action), this.search_field[0].tabIndex && (this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex), this.container.remove(), this.form_field_jq.removeData("chosen"), this.form_field_jq.show()
            }, e.prototype.search_field_disabled = function() {
                return this.is_disabled = this.form_field_jq[0].disabled, this.is_disabled ? (this.container.addClass("chosen-disabled"), this.search_field[0].disabled = !0, this.is_multiple || this.selected_item.unbind("focus.chosen", this.activate_action), this.close_field()) : (this.container.removeClass("chosen-disabled"), this.search_field[0].disabled = !1, this.is_multiple ? void 0 : this.selected_item.bind("focus.chosen", this.activate_action))
            }, e.prototype.container_mousedown = function(i) {
                return this.is_disabled || (i && "mousedown" === i.type && !this.results_showing && i.preventDefault(), null != i && t(i.target).hasClass("search-choice-close")) ? void 0 : (this.active_field ? this.is_multiple || !i || t(i.target)[0] !== this.selected_item[0] && !t(i.target).parents("a.chosen-single").length || (i.preventDefault(), this.results_toggle()) : (this.is_multiple && this.search_field.val(""), t(this.container[0].ownerDocument).bind("click.chosen", this.click_test_action), this.results_show()), this.activate_field())
            }, e.prototype.container_mouseup = function(t) {
                return "ABBR" !== t.target.nodeName || this.is_disabled ? void 0 : this.results_reset(t)
            }, e.prototype.search_results_mousewheel = function(t) {
                var i;
                return t.originalEvent && (i = t.originalEvent.deltaY || -t.originalEvent.wheelDelta || t.originalEvent.detail), null != i ? (t.preventDefault(), "DOMMouseScroll" === t.type && (i = 40 * i), this.search_results.scrollTop(i + this.search_results.scrollTop())) : void 0
            }, e.prototype.blur_test = function() {
                return !this.active_field && this.container.hasClass("chosen-container-active") ? this.close_field() : void 0
            }, e.prototype.close_field = function() {
                return t(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action), this.active_field = !1, this.results_hide(), this.container.removeClass("chosen-container-active"), this.clear_backstroke(), this.show_search_field_default(), this.search_field_scale()
            }, e.prototype.activate_field = function() {
                return this.container.addClass("chosen-container-active"), this.active_field = !0, this.search_field.val(this.search_field.val()), this.search_field.focus()
            }, e.prototype.test_active_click = function(i) {
                var e;
                return e = t(i.target).closest(".chosen-container"), e.length && this.container[0] === e[0] ? this.active_field = !0 : this.close_field()
            }, e.prototype.results_build = function() {
                return this.parsing = !0, this.selected_option_count = null, this.results_data = s.select_to_array(this.form_field), this.is_multiple ? this.search_choices.find("li.search-choice").remove() : this.is_multiple || (this.single_set_selected_text(), this.disable_search || this.form_field.options.length <= this.disable_search_threshold ? (this.search_field[0].readOnly = !0, this.container.addClass("chosen-container-single-nosearch")) : (this.search_field[0].readOnly = !1, this.container.removeClass("chosen-container-single-nosearch"))), this.update_results_content(this.results_option_build({
                    first: !0
                })), this.search_field_disabled(), this.show_search_field_default(), this.search_field_scale(), this.parsing = !1
            }, e.prototype.result_do_highlight = function(t) {
                var i, e, s, o, n;
                if (t.length) {
                    if (this.result_clear_highlight(), this.result_highlight = t, this.result_highlight.addClass("highlighted"), s = parseInt(this.search_results.css("maxHeight"), 10), n = this.search_results.scrollTop(), o = s + n, e = this.result_highlight.position().top + this.search_results.scrollTop(), i = e + this.result_highlight.outerHeight(), i >= o) return this.search_results.scrollTop(i - s > 0 ? i - s : 0);
                    if (n > e) return this.search_results.scrollTop(e)
                }
            }, e.prototype.result_clear_highlight = function() {
                return this.result_highlight && this.result_highlight.removeClass("highlighted"), this.result_highlight = null
            }, e.prototype.results_show = function() {
                return this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {
                    chosen: this
                }), !1) : (this.container.addClass("chosen-with-drop"), this.results_showing = !0, this.search_field.focus(), this.search_field.val(this.search_field.val()), this.winnow_results(), this.form_field_jq.trigger("chosen:showing_dropdown", {
                    chosen: this
                }))
            }, e.prototype.update_results_content = function(t) {
                return this.search_results.html(t)
            }, e.prototype.results_hide = function() {
                return this.results_showing && (this.result_clear_highlight(), this.container.removeClass("chosen-with-drop"), this.form_field_jq.trigger("chosen:hiding_dropdown", {
                    chosen: this
                })), this.results_showing = !1
            }, e.prototype.set_tab_index = function() {
                var t;
                return this.form_field.tabIndex ? (t = this.form_field.tabIndex, this.form_field.tabIndex = -1, this.search_field[0].tabIndex = t) : void 0
            }, e.prototype.set_label_behavior = function() {
                var i = this;
                return this.form_field_label = this.form_field_jq.parents("label"), !this.form_field_label.length && this.form_field.id.length && (this.form_field_label = t("label[for='" + this.form_field.id + "']")), this.form_field_label.length > 0 ? this.form_field_label.bind("click.chosen", function(t) {
                    return i.is_multiple ? i.container_mousedown(t) : i.activate_field()
                }) : void 0
            }, e.prototype.show_search_field_default = function() {
                return this.is_multiple && this.choices_count() < 1 && !this.active_field ? (this.search_field.val(this.default_text), this.search_field.addClass("default")) : (this.search_field.val(""), this.search_field.removeClass("default"))
            }, e.prototype.search_results_mouseup = function(i) {
                var e;
                return e = t(i.target).hasClass("active-result") ? t(i.target) : t(i.target).parents(".active-result").first(), e.length ? (this.result_highlight = e, this.result_select(i), this.search_field.focus()) : void 0
            }, e.prototype.search_results_mouseover = function(i) {
                var e;
                return e = t(i.target).hasClass("active-result") ? t(i.target) : t(i.target).parents(".active-result").first(), e ? this.result_do_highlight(e) : void 0
            }, e.prototype.search_results_mouseout = function(i) {
                return t(i.target).hasClass("active-result") ? this.result_clear_highlight() : void 0
            }, e.prototype.choice_build = function(i) {
                var e, s, o = this;
                return e = t("<li />", {
                    class: "search-choice"
                }).html("<span>" + this.choice_label(i) + "</span>"), i.disabled ? e.addClass("search-choice-disabled") : (s = t("<a />", {
                    class: "search-choice-close",
                    "data-option-array-index": i.array_index
                }), s.bind("click.chosen", function(t) {
                    return o.choice_destroy_link_click(t)
                }), e.append(s)), this.search_container.before(e)
            }, e.prototype.choice_destroy_link_click = function(i) {
                return i.preventDefault(), i.stopPropagation(), this.is_disabled ? void 0 : this.choice_destroy(t(i.target))
            }, e.prototype.choice_destroy = function(t) {
                return this.result_deselect(t[0].getAttribute("data-option-array-index")) ? (this.show_search_field_default(), this.is_multiple && this.choices_count() > 0 && this.search_field.val().length < 1 && this.results_hide(), t.parents("li").first().remove(), this.search_field_scale()) : void 0
            }, e.prototype.results_reset = function() {
                return this.reset_single_select_options(), this.form_field.options[0].selected = !0, this.single_set_selected_text(), this.show_search_field_default(), this.results_reset_cleanup(), this.form_field_jq.trigger("change"), this.active_field ? this.results_hide() : void 0
            }, e.prototype.results_reset_cleanup = function() {
                return this.current_selectedIndex = this.form_field.selectedIndex, this.selected_item.find("abbr").remove()
            }, e.prototype.result_select = function(t) {
                var i, e;
                return this.result_highlight ? (i = this.result_highlight, this.result_clear_highlight(), this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {
                    chosen: this
                }), !1) : (this.is_multiple ? i.removeClass("active-result") : this.reset_single_select_options(), i.addClass("result-selected"), e = this.results_data[i[0].getAttribute("data-option-array-index")], e.selected = !0, this.form_field.options[e.options_index].selected = !0, this.selected_option_count = null, this.is_multiple ? this.choice_build(e) : this.single_set_selected_text(this.choice_label(e)), (t.metaKey || t.ctrlKey) && this.is_multiple || this.results_hide(), this.search_field.val(""), (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) && this.form_field_jq.trigger("change", {
                    selected: this.form_field.options[e.options_index].value
                }), this.current_selectedIndex = this.form_field.selectedIndex, t.preventDefault(), this.search_field_scale())) : void 0
            }, e.prototype.single_set_selected_text = function(t) {
                return null == t && (t = this.default_text), t === this.default_text ? this.selected_item.addClass("chosen-default") : (this.single_deselect_control_build(), this.selected_item.removeClass("chosen-default")), this.selected_item.find("span").html(t)
            }, e.prototype.result_deselect = function(t) {
                var i;
                return i = this.results_data[t], !this.form_field.options[i.options_index].disabled && (i.selected = !1, this.form_field.options[i.options_index].selected = !1, this.selected_option_count = null, this.result_clear_highlight(), this.results_showing && this.winnow_results(), this.form_field_jq.trigger("change", {
                    deselected: this.form_field.options[i.options_index].value
                }), this.search_field_scale(), !0)
            }, e.prototype.single_deselect_control_build = function() {
                return this.allow_single_deselect ? (this.selected_item.find("abbr").length || this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>'), this.selected_item.addClass("chosen-single-with-deselect")) : void 0
            }, e.prototype.get_search_text = function() {
                return t("<div/>").text(t.trim(this.search_field.val())).html()
            }, e.prototype.winnow_results_set_highlight = function() {
                var t, i;
                return i = this.is_multiple ? [] : this.search_results.find(".result-selected.active-result"), t = i.length ? i.first() : this.search_results.find(".active-result").first(), null != t ? this.result_do_highlight(t) : void 0
            }, e.prototype.no_results = function(i) {
                var e;
                return e = t('<li class="no-results">' + this.results_none_found + ' "<span></span>"</li>'), e.find("span").first().html(i), this.search_results.append(e), this.form_field_jq.trigger("chosen:no_results", {
                    chosen: this
                })
            }, e.prototype.no_results_clear = function() {
                return this.search_results.find(".no-results").remove()
            }, e.prototype.keydown_arrow = function() {
                var t;
                return this.results_showing && this.result_highlight ? (t = this.result_highlight.nextAll("li.active-result").first()) ? this.result_do_highlight(t) : void 0 : this.results_show()
            }, e.prototype.keyup_arrow = function() {
                var t;
                return this.results_showing || this.is_multiple ? this.result_highlight ? (t = this.result_highlight.prevAll("li.active-result"), t.length ? this.result_do_highlight(t.first()) : (this.choices_count() > 0 && this.results_hide(), this.result_clear_highlight())) : void 0 : this.results_show()
            }, e.prototype.keydown_backstroke = function() {
                var t;
                return this.pending_backstroke ? (this.choice_destroy(this.pending_backstroke.find("a").first()), this.clear_backstroke()) : (t = this.search_container.siblings("li.search-choice").last(), t.length && !t.hasClass("search-choice-disabled") ? (this.pending_backstroke = t, this.single_backstroke_delete ? this.keydown_backstroke() : this.pending_backstroke.addClass("search-choice-focus")) : void 0)
            }, e.prototype.clear_backstroke = function() {
                return this.pending_backstroke && this.pending_backstroke.removeClass("search-choice-focus"), this.pending_backstroke = null
            }, e.prototype.keydown_checker = function(t) {
                var i, e;
                switch (i = null != (e = t.which) ? e : t.keyCode, this.search_field_scale(), 8 !== i && this.pending_backstroke && this.clear_backstroke(), i) {
                    case 8:
                        this.backstroke_length = this.search_field.val().length;
                        break;
                    case 9:
                        this.results_showing && !this.is_multiple && this.result_select(t), this.mouse_on_container = !1;
                        break;
                    case 13:
                        this.results_showing && t.preventDefault();
                        break;
                    case 32:
                        this.disable_search && t.preventDefault();
                        break;
                    case 38:
                        t.preventDefault(), this.keyup_arrow();
                        break;
                    case 40:
                        t.preventDefault(), this.keydown_arrow()
                }
            }, e.prototype.search_field_scale = function() {
                var i, e, s, o, n, r, a, l, h;
                if (this.is_multiple) {
                    for (s = 0, a = 0, n = "position:absolute; left: -1000px; top: -1000px; display:none;", r = ["font-size", "font-style", "font-weight", "font-family", "line-height", "text-transform", "letter-spacing"], l = 0, h = r.length; h > l; l++) o = r[l], n += o + ":" + this.search_field.css(o) + ";";
                    return i = t("<div />", {
                        style: n
                    }), i.text(this.search_field.val()), t("body").append(i), a = i.width() + 25, i.remove(), e = this.container.outerWidth(), a > e - 10 && (a = e - 10), this.search_field.css({
                        width: a + "px"
                    })
                }
            }, e
        }(i)
    }.call(this), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");
if (+ function(t) {
        "use strict";
        var i = t.fn.jquery.split(" ")[0].split(".");
        if (i[0] < 2 && i[1] < 9 || 1 == i[0] && 9 == i[1] && i[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
    }(jQuery), + function(t) {
        "use strict";

        function i() {
            var t = document.createElement("bootstrap"),
                i = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
            for (var e in i)
                if (void 0 !== t.style[e]) return {
                    end: i[e]
                };
            return !1
        }
        t.fn.emulateTransitionEnd = function(i) {
            var e = !1,
                s = this;
            t(this).one("bsTransitionEnd", function() {
                e = !0
            });
            var o = function() {
                e || t(s).trigger(t.support.transition.end)
            };
            return setTimeout(o, i), this
        }, t(function() {
            t.support.transition = i(), t.support.transition && (t.event.special.bsTransitionEnd = {
                bindType: t.support.transition.end,
                delegateType: t.support.transition.end,
                handle: function(i) {
                    return t(i.target).is(this) ? i.handleObj.handler.apply(this, arguments) : void 0
                }
            })
        })
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var e = t(this),
                    o = e.data("bs.alert");
                o || e.data("bs.alert", o = new s(this)), "string" == typeof i && o[i].call(e)
            })
        }
        var e = '[data-dismiss="alert"]',
            s = function(i) {
                t(i).on("click", e, this.close)
            };
        s.VERSION = "3.3.4",
            s.TRANSITION_DURATION = 150, s.prototype.close = function(i) {
                function e() {
                    r.detach().trigger("closed.bs.alert").remove()
                }
                var o = t(this),
                    n = o.attr("data-target");
                n || (n = o.attr("href"), n = n && n.replace(/.*(?=#[^\s]*$)/, ""));
                var r = t(n);
                i && i.preventDefault(), r.length || (r = o.closest(".alert")), r.trigger(i = t.Event("close.bs.alert")), i.isDefaultPrevented() || (r.removeClass("in"), t.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", e).emulateTransitionEnd(s.TRANSITION_DURATION) : e())
            };
        var o = t.fn.alert;
        t.fn.alert = i, t.fn.alert.Constructor = s, t.fn.alert.noConflict = function() {
            return t.fn.alert = o, this
        }, t(document).on("click.bs.alert.data-api", e, s.prototype.close)
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.button"),
                    n = "object" == typeof i && i;
                o || s.data("bs.button", o = new e(this, n)), "toggle" == i ? o.toggle() : i && o.setState(i)
            })
        }
        var e = function(i, s) {
            this.$element = t(i), this.options = t.extend({}, e.DEFAULTS, s), this.isLoading = !1
        };
        e.VERSION = "3.3.4", e.DEFAULTS = {
            loadingText: "loading..."
        }, e.prototype.setState = function(i) {
            var e = "disabled",
                s = this.$element,
                o = s.is("input") ? "val" : "html",
                n = s.data();
            i += "Text", null == n.resetText && s.data("resetText", s[o]()), setTimeout(t.proxy(function() {
                s[o](null == n[i] ? this.options[i] : n[i]), "loadingText" == i ? (this.isLoading = !0, s.addClass(e).attr(e, e)) : this.isLoading && (this.isLoading = !1, s.removeClass(e).removeAttr(e))
            }, this), 0)
        }, e.prototype.toggle = function() {
            var t = !0,
                i = this.$element.closest('[data-toggle="buttons"]');
            if (i.length) {
                var e = this.$element.find("input");
                "radio" == e.prop("type") && (e.prop("checked") && this.$element.hasClass("active") ? t = !1 : i.find(".active").removeClass("active")), t && e.prop("checked", !this.$element.hasClass("active")).trigger("change")
            } else this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
            t && this.$element.toggleClass("active")
        };
        var s = t.fn.button;
        t.fn.button = i, t.fn.button.Constructor = e, t.fn.button.noConflict = function() {
            return t.fn.button = s, this
        }, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(e) {
            var s = t(e.target);
            s.hasClass("btn") || (s = s.closest(".btn")), i.call(s, "toggle"), e.preventDefault()
        }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(i) {
            t(i.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(i.type))
        })
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.carousel"),
                    n = t.extend({}, e.DEFAULTS, s.data(), "object" == typeof i && i),
                    r = "string" == typeof i ? i : n.slide;
                o || s.data("bs.carousel", o = new e(this, n)), "number" == typeof i ? o.to(i) : r ? o[r]() : n.interval && o.pause().cycle()
            })
        }
        var e = function(i, e) {
            this.$element = t(i), this.$indicators = this.$element.find(".carousel-indicators"), this.options = e, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
        };
        e.VERSION = "3.3.4", e.TRANSITION_DURATION = 600, e.DEFAULTS = {
            interval: 5e3,
            pause: "hover",
            wrap: !0,
            keyboard: !0
        }, e.prototype.keydown = function(t) {
            if (!/input|textarea/i.test(t.target.tagName)) {
                switch (t.which) {
                    case 37:
                        this.prev();
                        break;
                    case 39:
                        this.next();
                        break;
                    default:
                        return
                }
                t.preventDefault()
            }
        }, e.prototype.cycle = function(i) {
            return i || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
        }, e.prototype.getItemIndex = function(t) {
            return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
        }, e.prototype.getItemForDirection = function(t, i) {
            var e = this.getItemIndex(i),
                s = "prev" == t && 0 === e || "next" == t && e == this.$items.length - 1;
            if (s && !this.options.wrap) return i;
            var o = "prev" == t ? -1 : 1,
                n = (e + o) % this.$items.length;
            return this.$items.eq(n)
        }, e.prototype.to = function(t) {
            var i = this,
                e = this.getItemIndex(this.$active = this.$element.find(".item.active"));
            return t > this.$items.length - 1 || 0 > t ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
                i.to(t)
            }) : e == t ? this.pause().cycle() : this.slide(t > e ? "next" : "prev", this.$items.eq(t))
        }, e.prototype.pause = function(i) {
            return i || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
        }, e.prototype.next = function() {
            return this.sliding ? void 0 : this.slide("next")
        }, e.prototype.prev = function() {
            return this.sliding ? void 0 : this.slide("prev")
        }, e.prototype.slide = function(i, s) {
            var o = this.$element.find(".item.active"),
                n = s || this.getItemForDirection(i, o),
                r = this.interval,
                a = "next" == i ? "left" : "right",
                l = this;
            if (n.hasClass("active")) return this.sliding = !1;
            var h = n[0],
                c = t.Event("slide.bs.carousel", {
                    relatedTarget: h,
                    direction: a
                });
            if (this.$element.trigger(c), !c.isDefaultPrevented()) {
                if (this.sliding = !0, r && this.pause(), this.$indicators.length) {
                    this.$indicators.find(".active").removeClass("active");
                    var d = t(this.$indicators.children()[this.getItemIndex(n)]);
                    d && d.addClass("active")
                }
                var p = t.Event("slid.bs.carousel", {
                    relatedTarget: h,
                    direction: a
                });
                return t.support.transition && this.$element.hasClass("slide") ? (n.addClass(i), n[0].offsetWidth, o.addClass(a), n.addClass(a), o.one("bsTransitionEnd", function() {
                    n.removeClass([i, a].join(" ")).addClass("active"), o.removeClass(["active", a].join(" ")), l.sliding = !1, setTimeout(function() {
                        l.$element.trigger(p)
                    }, 0)
                }).emulateTransitionEnd(e.TRANSITION_DURATION)) : (o.removeClass("active"), n.addClass("active"), this.sliding = !1, this.$element.trigger(p)), r && this.cycle(), this
            }
        };
        var s = t.fn.carousel;
        t.fn.carousel = i, t.fn.carousel.Constructor = e, t.fn.carousel.noConflict = function() {
            return t.fn.carousel = s, this
        };
        var o = function(e) {
            var s, o = t(this),
                n = t(o.attr("data-target") || (s = o.attr("href")) && s.replace(/.*(?=#[^\s]+$)/, ""));
            if (n.hasClass("carousel")) {
                var r = t.extend({}, n.data(), o.data()),
                    a = o.attr("data-slide-to");
                a && (r.interval = !1), i.call(n, r), a && n.data("bs.carousel").to(a), e.preventDefault()
            }
        };
        t(document).on("click.bs.carousel.data-api", "[data-slide]", o).on("click.bs.carousel.data-api", "[data-slide-to]", o), t(window).on("load", function() {
            t('[data-ride="carousel"]').each(function() {
                var e = t(this);
                i.call(e, e.data())
            })
        })
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            var e, s = i.attr("data-target") || (e = i.attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "");
            return t(s)
        }

        function e(i) {
            return this.each(function() {
                var e = t(this),
                    o = e.data("bs.collapse"),
                    n = t.extend({}, s.DEFAULTS, e.data(), "object" == typeof i && i);
                !o && n.toggle && /show|hide/.test(i) && (n.toggle = !1), o || e.data("bs.collapse", o = new s(this, n)), "string" == typeof i && o[i]()
            })
        }
        var s = function(i, e) {
            this.$element = t(i), this.options = t.extend({}, s.DEFAULTS, e), this.$trigger = t('[data-toggle="collapse"][href="#' + i.id + '"],[data-toggle="collapse"][data-target="#' + i.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
        };
        s.VERSION = "3.3.4", s.TRANSITION_DURATION = 350, s.DEFAULTS = {
            toggle: !0
        }, s.prototype.dimension = function() {
            var t = this.$element.hasClass("width");
            return t ? "width" : "height"
        }, s.prototype.show = function() {
            if (!this.transitioning && !this.$element.hasClass("in")) {
                var i, o = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
                if (!(o && o.length && (i = o.data("bs.collapse"), i && i.transitioning))) {
                    var n = t.Event("show.bs.collapse");
                    if (this.$element.trigger(n), !n.isDefaultPrevented()) {
                        o && o.length && (e.call(o, "hide"), i || o.data("bs.collapse", null));
                        var r = this.dimension();
                        this.$element.removeClass("collapse").addClass("collapsing")[r](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                        var a = function() {
                            this.$element.removeClass("collapsing").addClass("collapse in")[r](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                        };
                        if (!t.support.transition) return a.call(this);
                        var l = t.camelCase(["scroll", r].join("-"));
                        this.$element.one("bsTransitionEnd", t.proxy(a, this)).emulateTransitionEnd(s.TRANSITION_DURATION)[r](this.$element[0][l])
                    }
                }
            }
        }, s.prototype.hide = function() {
            if (!this.transitioning && this.$element.hasClass("in")) {
                var i = t.Event("hide.bs.collapse");
                if (this.$element.trigger(i), !i.isDefaultPrevented()) {
                    var e = this.dimension();
                    this.$element[e](this.$element[e]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                    var o = function() {
                        this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                    };
                    return t.support.transition ? void this.$element[e](0).one("bsTransitionEnd", t.proxy(o, this)).emulateTransitionEnd(s.TRANSITION_DURATION) : o.call(this)
                }
            }
        }, s.prototype.toggle = function() {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        }, s.prototype.getParent = function() {
            return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function(e, s) {
                var o = t(s);
                this.addAriaAndCollapsedClass(i(o), o)
            }, this)).end()
        }, s.prototype.addAriaAndCollapsedClass = function(t, i) {
            var e = t.hasClass("in");
            t.attr("aria-expanded", e), i.toggleClass("collapsed", !e).attr("aria-expanded", e)
        };
        var o = t.fn.collapse;
        t.fn.collapse = e, t.fn.collapse.Constructor = s, t.fn.collapse.noConflict = function() {
            return t.fn.collapse = o, this
        }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(s) {
            var o = t(this);
            o.attr("data-target") || s.preventDefault();
            var n = i(o),
                r = n.data("bs.collapse"),
                a = r ? "toggle" : o.data();
            e.call(n, a)
        })
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            i && 3 === i.which || (t(o).remove(), t(n).each(function() {
                var s = t(this),
                    o = e(s),
                    n = {
                        relatedTarget: this
                    };
                o.hasClass("open") && (o.trigger(i = t.Event("hide.bs.dropdown", n)), i.isDefaultPrevented() || (s.attr("aria-expanded", "false"), o.removeClass("open").trigger("hidden.bs.dropdown", n)))
            }))
        }

        function e(i) {
            var e = i.attr("data-target");
            e || (e = i.attr("href"), e = e && /#[A-Za-z]/.test(e) && e.replace(/.*(?=#[^\s]*$)/, ""));
            var s = e && t(e);
            return s && s.length ? s : i.parent()
        }

        function s(i) {
            return this.each(function() {
                var e = t(this),
                    s = e.data("bs.dropdown");
                s || e.data("bs.dropdown", s = new r(this)), "string" == typeof i && s[i].call(e)
            })
        }
        var o = ".dropdown-backdrop",
            n = '[data-toggle="dropdown"]',
            r = function(i) {
                t(i).on("click.bs.dropdown", this.toggle)
            };
        r.VERSION = "3.3.4", r.prototype.toggle = function(s) {
            var o = t(this);
            if (!o.is(".disabled, :disabled")) {
                var n = e(o),
                    r = n.hasClass("open");
                if (i(), !r) {
                    "ontouchstart" in document.documentElement && !n.closest(".navbar-nav").length && t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click", i);
                    var a = {
                        relatedTarget: this
                    };
                    if (n.trigger(s = t.Event("show.bs.dropdown", a)), s.isDefaultPrevented()) return;
                    o.trigger("focus").attr("aria-expanded", "true"), n.toggleClass("open").trigger("shown.bs.dropdown", a)
                }
                return !1
            }
        }, r.prototype.keydown = function(i) {
            if (/(38|40|27|32)/.test(i.which) && !/input|textarea/i.test(i.target.tagName)) {
                var s = t(this);
                if (i.preventDefault(), i.stopPropagation(), !s.is(".disabled, :disabled")) {
                    var o = e(s),
                        r = o.hasClass("open");
                    if (!r && 27 != i.which || r && 27 == i.which) return 27 == i.which && o.find(n).trigger("focus"), s.trigger("click");
                    var a = " li:not(.disabled):visible a",
                        l = o.find('[role="menu"]' + a + ', [role="listbox"]' + a);
                    if (l.length) {
                        var h = l.index(i.target);
                        38 == i.which && h > 0 && h--, 40 == i.which && h < l.length - 1 && h++, ~h || (h = 0), l.eq(h).trigger("focus")
                    }
                }
            }
        };
        var a = t.fn.dropdown;
        t.fn.dropdown = s, t.fn.dropdown.Constructor = r, t.fn.dropdown.noConflict = function() {
            return t.fn.dropdown = a, this
        }, t(document).on("click.bs.dropdown.data-api", i).on("click.bs.dropdown.data-api", ".dropdown form", function(t) {
            t.stopPropagation()
        }).on("click.bs.dropdown.data-api", n, r.prototype.toggle).on("keydown.bs.dropdown.data-api", n, r.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', r.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', r.prototype.keydown)
    }(jQuery), + function(t) {
        "use strict";

        function i(i, s) {
            return this.each(function() {
                var o = t(this),
                    n = o.data("bs.modal"),
                    r = t.extend({}, e.DEFAULTS, o.data(), "object" == typeof i && i);
                n || o.data("bs.modal", n = new e(this, r)), "string" == typeof i ? n[i](s) : r.show && n.show(s)
            })
        }
        var e = function(i, e) {
            this.options = e, this.$body = t(document.body), this.$element = t(i), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function() {
                this.$element.trigger("loaded.bs.modal")
            }, this))
        };
        e.VERSION = "3.3.4", e.TRANSITION_DURATION = 300, e.BACKDROP_TRANSITION_DURATION = 150, e.DEFAULTS = {
            backdrop: !0,
            keyboard: !0,
            show: !0
        }, e.prototype.toggle = function(t) {
            return this.isShown ? this.hide() : this.show(t)
        }, e.prototype.show = function(i) {
            var s = this,
                o = t.Event("show.bs.modal", {
                    relatedTarget: i
                });
            this.$element.trigger(o), this.isShown || o.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
                s.$element.one("mouseup.dismiss.bs.modal", function(i) {
                    t(i.target).is(s.$element) && (s.ignoreBackdropClick = !0)
                })
            }), this.backdrop(function() {
                var o = t.support.transition && s.$element.hasClass("fade");
                s.$element.parent().length || s.$element.appendTo(s.$body), s.$element.show().scrollTop(0), s.adjustDialog(), o && s.$element[0].offsetWidth, s.$element.addClass("in").attr("aria-hidden", !1), s.enforceFocus();
                var n = t.Event("shown.bs.modal", {
                    relatedTarget: i
                });
                o ? s.$dialog.one("bsTransitionEnd", function() {
                    s.$element.trigger("focus").trigger(n)
                }).emulateTransitionEnd(e.TRANSITION_DURATION) : s.$element.trigger("focus").trigger(n)
            }))
        }, e.prototype.hide = function(i) {
            i && i.preventDefault(), i = t.Event("hide.bs.modal"), this.$element.trigger(i), this.isShown && !i.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(e.TRANSITION_DURATION) : this.hideModal())
        }, e.prototype.enforceFocus = function() {
            t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
                this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
            }, this))
        }, e.prototype.escape = function() {
            this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function(t) {
                27 == t.which && this.hide()
            }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
        }, e.prototype.resize = function() {
            this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
        }, e.prototype.hideModal = function() {
            var t = this;
            this.$element.hide(), this.backdrop(function() {
                t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal")
            })
        }, e.prototype.removeBackdrop = function() {
            this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
        }, e.prototype.backdrop = function(i) {
            var s = this,
                o = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var n = t.support.transition && o;
                if (this.$backdrop = t('<div class="modal-backdrop ' + o + '" />').appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", t.proxy(function(t) {
                        return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                    }, this)), n && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !i) return;
                n ? this.$backdrop.one("bsTransitionEnd", i).emulateTransitionEnd(e.BACKDROP_TRANSITION_DURATION) : i()
            } else if (!this.isShown && this.$backdrop) {
                this.$backdrop.removeClass("in");
                var r = function() {
                    s.removeBackdrop(), i && i()
                };
                t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", r).emulateTransitionEnd(e.BACKDROP_TRANSITION_DURATION) : r()
            } else i && i()
        }, e.prototype.handleUpdate = function() {
            this.adjustDialog()
        }, e.prototype.adjustDialog = function() {
            var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
            this.$element.css({
                paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
                paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
            })
        }, e.prototype.resetAdjustments = function() {
            this.$element.css({
                paddingLeft: "",
                paddingRight: ""
            })
        }, e.prototype.checkScrollbar = function() {
            var t = window.innerWidth;
            if (!t) {
                var i = document.documentElement.getBoundingClientRect();
                t = i.right - Math.abs(i.left)
            }
            this.bodyIsOverflowing = document.body.clientWidth < t, this.scrollbarWidth = this.measureScrollbar()
        }, e.prototype.setScrollbar = function() {
            var t = parseInt(this.$body.css("padding-right") || 0, 10);
            this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
        }, e.prototype.resetScrollbar = function() {
            this.$body.css("padding-right", this.originalBodyPad)
        }, e.prototype.measureScrollbar = function() {
            var t = document.createElement("div");
            t.className = "modal-scrollbar-measure", this.$body.append(t);
            var i = t.offsetWidth - t.clientWidth;
            return this.$body[0].removeChild(t), i
        };
        var s = t.fn.modal;
        t.fn.modal = i, t.fn.modal.Constructor = e, t.fn.modal.noConflict = function() {
            return t.fn.modal = s, this
        }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(e) {
            var s = t(this),
                o = s.attr("href"),
                n = t(s.attr("data-target") || o && o.replace(/.*(?=#[^\s]+$)/, "")),
                r = n.data("bs.modal") ? "toggle" : t.extend({
                    remote: !/#/.test(o) && o
                }, n.data(), s.data());
            s.is("a") && e.preventDefault(), n.one("show.bs.modal", function(t) {
                t.isDefaultPrevented() || n.one("hidden.bs.modal", function() {
                    s.is(":visible") && s.trigger("focus")
                })
            }), i.call(n, r, this)
        })
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.tooltip"),
                    n = "object" == typeof i && i;
                (o || !/destroy|hide/.test(i)) && (o || s.data("bs.tooltip", o = new e(this, n)), "string" == typeof i && o[i]())
            })
        }
        var e = function(t, i) {
            this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.init("tooltip", t, i)
        };
        e.VERSION = "3.3.4", e.TRANSITION_DURATION = 150, e.DEFAULTS = {
            animation: !0,
            placement: "top",
            selector: !1,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            container: !1,
            viewport: {
                selector: "body",
                padding: 0
            }
        }, e.prototype.init = function(i, e, s) {
            if (this.enabled = !0, this.type = i, this.$element = t(e), this.options = this.getOptions(s), this.$viewport = this.options.viewport && t(this.options.viewport.selector || this.options.viewport), this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
            for (var o = this.options.trigger.split(" "), n = o.length; n--;) {
                var r = o[n];
                if ("click" == r) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
                else if ("manual" != r) {
                    var a = "hover" == r ? "mouseenter" : "focusin",
                        l = "hover" == r ? "mouseleave" : "focusout";
                    this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
                }
            }
            this.options.selector ? this._options = t.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        }, e.prototype.getDefaults = function() {
            return e.DEFAULTS
        }, e.prototype.getOptions = function(i) {
            return i = t.extend({}, this.getDefaults(), this.$element.data(), i), i.delay && "number" == typeof i.delay && (i.delay = {
                show: i.delay,
                hide: i.delay
            }), i
        }, e.prototype.getDelegateOptions = function() {
            var i = {},
                e = this.getDefaults();
            return this._options && t.each(this._options, function(t, s) {
                e[t] != s && (i[t] = s)
            }), i
        }, e.prototype.enter = function(i) {
            var e = i instanceof this.constructor ? i : t(i.currentTarget).data("bs." + this.type);
            return e && e.$tip && e.$tip.is(":visible") ? void(e.hoverState = "in") : (e || (e = new this.constructor(i.currentTarget, this.getDelegateOptions()), t(i.currentTarget).data("bs." + this.type, e)), clearTimeout(e.timeout), e.hoverState = "in", e.options.delay && e.options.delay.show ? void(e.timeout = setTimeout(function() {
                "in" == e.hoverState && e.show()
            }, e.options.delay.show)) : e.show())
        }, e.prototype.leave = function(i) {
            var e = i instanceof this.constructor ? i : t(i.currentTarget).data("bs." + this.type);
            return e || (e = new this.constructor(i.currentTarget, this.getDelegateOptions()), t(i.currentTarget).data("bs." + this.type, e)), clearTimeout(e.timeout), e.hoverState = "out", e.options.delay && e.options.delay.hide ? void(e.timeout = setTimeout(function() {
                "out" == e.hoverState && e.hide()
            }, e.options.delay.hide)) : e.hide()
        }, e.prototype.show = function() {
            var i = t.Event("show.bs." + this.type);
            if (this.hasContent() && this.enabled) {
                this.$element.trigger(i);
                var s = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
                if (i.isDefaultPrevented() || !s) return;
                var o = this,
                    n = this.tip(),
                    r = this.getUID(this.type);
                this.setContent(), n.attr("id", r), this.$element.attr("aria-describedby", r), this.options.animation && n.addClass("fade");
                var a = "function" == typeof this.options.placement ? this.options.placement.call(this, n[0], this.$element[0]) : this.options.placement,
                    l = /\s?auto?\s?/i,
                    h = l.test(a);
                h && (a = a.replace(l, "") || "top"), n.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).addClass(a).data("bs." + this.type, this), this.options.container ? n.appendTo(this.options.container) : n.insertAfter(this.$element);
                var c = this.getPosition(),
                    d = n[0].offsetWidth,
                    p = n[0].offsetHeight;
                if (h) {
                    var u = a,
                        f = this.options.container ? t(this.options.container) : this.$element.parent(),
                        v = this.getPosition(f);
                    a = "bottom" == a && c.bottom + p > v.bottom ? "top" : "top" == a && c.top - p < v.top ? "bottom" : "right" == a && c.right + d > v.width ? "left" : "left" == a && c.left - d < v.left ? "right" : a, n.removeClass(u).addClass(a)
                }
                var g = this.getCalculatedOffset(a, c, d, p);
                this.applyPlacement(g, a);
                var m = function() {
                    var t = o.hoverState;
                    o.$element.trigger("shown.bs." + o.type), o.hoverState = null, "out" == t && o.leave(o)
                };
                t.support.transition && this.$tip.hasClass("fade") ? n.one("bsTransitionEnd", m).emulateTransitionEnd(e.TRANSITION_DURATION) : m()
            }
        }, e.prototype.applyPlacement = function(i, e) {
            var s = this.tip(),
                o = s[0].offsetWidth,
                n = s[0].offsetHeight,
                r = parseInt(s.css("margin-top"), 10),
                a = parseInt(s.css("margin-left"), 10);
            isNaN(r) && (r = 0), isNaN(a) && (a = 0), i.top = i.top + r, i.left = i.left + a, t.offset.setOffset(s[0], t.extend({
                using: function(t) {
                    s.css({
                        top: Math.round(t.top),
                        left: Math.round(t.left)
                    })
                }
            }, i), 0), s.addClass("in");
            var l = s[0].offsetWidth,
                h = s[0].offsetHeight;
            "top" == e && h != n && (i.top = i.top + n - h);
            var c = this.getViewportAdjustedDelta(e, i, l, h);
            c.left ? i.left += c.left : i.top += c.top;
            var d = /top|bottom/.test(e),
                p = d ? 2 * c.left - o + l : 2 * c.top - n + h,
                u = d ? "offsetWidth" : "offsetHeight";
            s.offset(i), this.replaceArrow(p, s[0][u], d)
        }, e.prototype.replaceArrow = function(t, i, e) {
            this.arrow().css(e ? "left" : "top", 50 * (1 - t / i) + "%").css(e ? "top" : "left", "")
        }, e.prototype.setContent = function() {
            var t = this.tip(),
                i = this.getTitle();
            t.find(".tooltip-inner")[this.options.html ? "html" : "text"](i), t.removeClass("fade in top bottom left right")
        }, e.prototype.hide = function(i) {
            function s() {
                "in" != o.hoverState && n.detach(), o.$element.removeAttr("aria-describedby").trigger("hidden.bs." + o.type), i && i()
            }
            var o = this,
                n = t(this.$tip),
                r = t.Event("hide.bs." + this.type);
            return this.$element.trigger(r), r.isDefaultPrevented() ? void 0 : (n.removeClass("in"), t.support.transition && n.hasClass("fade") ? n.one("bsTransitionEnd", s).emulateTransitionEnd(e.TRANSITION_DURATION) : s(), this.hoverState = null, this)
        }, e.prototype.fixTitle = function() {
            var t = this.$element;
            (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
        }, e.prototype.hasContent = function() {
            return this.getTitle()
        }, e.prototype.getPosition = function(i) {
            i = i || this.$element;
            var e = i[0],
                s = "BODY" == e.tagName,
                o = e.getBoundingClientRect();
            null == o.width && (o = t.extend({}, o, {
                width: o.right - o.left,
                height: o.bottom - o.top
            }));
            var n = s ? {
                    top: 0,
                    left: 0
                } : i.offset(),
                r = {
                    scroll: s ? document.documentElement.scrollTop || document.body.scrollTop : i.scrollTop()
                },
                a = s ? {
                    width: t(window).width(),
                    height: t(window).height()
                } : null;
            return t.extend({}, o, r, a, n)
        }, e.prototype.getCalculatedOffset = function(t, i, e, s) {
            return "bottom" == t ? {
                top: i.top + i.height,
                left: i.left + i.width / 2 - e / 2
            } : "top" == t ? {
                top: i.top - s,
                left: i.left + i.width / 2 - e / 2
            } : "left" == t ? {
                top: i.top + i.height / 2 - s / 2,
                left: i.left - e
            } : {
                top: i.top + i.height / 2 - s / 2,
                left: i.left + i.width
            }
        }, e.prototype.getViewportAdjustedDelta = function(t, i, e, s) {
            var o = {
                top: 0,
                left: 0
            };
            if (!this.$viewport) return o;
            var n = this.options.viewport && this.options.viewport.padding || 0,
                r = this.getPosition(this.$viewport);
            if (/right|left/.test(t)) {
                var a = i.top - n - r.scroll,
                    l = i.top + n - r.scroll + s;
                a < r.top ? o.top = r.top - a : l > r.top + r.height && (o.top = r.top + r.height - l)
            } else {
                var h = i.left - n,
                    c = i.left + n + e;
                h < r.left ? o.left = r.left - h : c > r.width && (o.left = r.left + r.width - c)
            }
            return o
        }, e.prototype.getTitle = function() {
            var t, i = this.$element,
                e = this.options;
            return t = i.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(i[0]) : e.title)
        }, e.prototype.getUID = function(t) {
            do t += ~~(1e6 * Math.random()); while (document.getElementById(t));
            return t
        }, e.prototype.tip = function() {
            return this.$tip = this.$tip || t(this.options.template)
        }, e.prototype.arrow = function() {
            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
        }, e.prototype.enable = function() {
            this.enabled = !0
        }, e.prototype.disable = function() {
            this.enabled = !1
        }, e.prototype.toggleEnabled = function() {
            this.enabled = !this.enabled
        }, e.prototype.toggle = function(i) {
            var e = this;
            i && (e = t(i.currentTarget).data("bs." + this.type), e || (e = new this.constructor(i.currentTarget, this.getDelegateOptions()), t(i.currentTarget).data("bs." + this.type, e))), e.tip().hasClass("in") ? e.leave(e) : e.enter(e)
        }, e.prototype.destroy = function() {
            var t = this;
            clearTimeout(this.timeout), this.hide(function() {
                t.$element.off("." + t.type).removeData("bs." + t.type)
            })
        };
        var s = t.fn.tooltip;
        t.fn.tooltip = i, t.fn.tooltip.Constructor = e, t.fn.tooltip.noConflict = function() {
            return t.fn.tooltip = s, this
        }
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.popover"),
                    n = "object" == typeof i && i;
                (o || !/destroy|hide/.test(i)) && (o || s.data("bs.popover", o = new e(this, n)), "string" == typeof i && o[i]())
            })
        }
        var e = function(t, i) {
            this.init("popover", t, i)
        };
        if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
        e.VERSION = "3.3.4", e.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
        }), e.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), e.prototype.constructor = e, e.prototype.getDefaults = function() {
            return e.DEFAULTS
        }, e.prototype.setContent = function() {
            var t = this.tip(),
                i = this.getTitle(),
                e = this.getContent();
            t.find(".popover-title")[this.options.html ? "html" : "text"](i), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof e ? "html" : "append" : "text"](e), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
        }, e.prototype.hasContent = function() {
            return this.getTitle() || this.getContent()
        }, e.prototype.getContent = function() {
            var t = this.$element,
                i = this.options;
            return t.attr("data-content") || ("function" == typeof i.content ? i.content.call(t[0]) : i.content)
        }, e.prototype.arrow = function() {
            return this.$arrow = this.$arrow || this.tip().find(".arrow")
        };
        var s = t.fn.popover;
        t.fn.popover = i, t.fn.popover.Constructor = e, t.fn.popover.noConflict = function() {
            return t.fn.popover = s, this
        }
    }(jQuery), + function(t) {
        "use strict";

        function i(e, s) {
            this.$body = t(document.body), this.$scrollElement = t(t(e).is(document.body) ? window : e), this.options = t.extend({}, i.DEFAULTS, s), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", t.proxy(this.process, this)), this.refresh(), this.process()
        }

        function e(e) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.scrollspy"),
                    n = "object" == typeof e && e;
                o || s.data("bs.scrollspy", o = new i(this, n)), "string" == typeof e && o[e]()
            })
        }
        i.VERSION = "3.3.4", i.DEFAULTS = {
            offset: 10
        }, i.prototype.getScrollHeight = function() {
            return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
        }, i.prototype.refresh = function() {
            var i = this,
                e = "offset",
                s = 0;
            this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), t.isWindow(this.$scrollElement[0]) || (e = "position", s = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
                var i = t(this),
                    o = i.data("target") || i.attr("href"),
                    n = /^#./.test(o) && t(o);
                return n && n.length && n.is(":visible") && [
                    [n[e]().top + s, o]
                ] || null
            }).sort(function(t, i) {
                return t[0] - i[0]
            }).each(function() {
                i.offsets.push(this[0]), i.targets.push(this[1])
            })
        }, i.prototype.process = function() {
            var t, i = this.$scrollElement.scrollTop() + this.options.offset,
                e = this.getScrollHeight(),
                s = this.options.offset + e - this.$scrollElement.height(),
                o = this.offsets,
                n = this.targets,
                r = this.activeTarget;
            if (this.scrollHeight != e && this.refresh(), i >= s) return r != (t = n[n.length - 1]) && this.activate(t);
            if (r && i < o[0]) return this.activeTarget = null, this.clear();
            for (t = o.length; t--;) r != n[t] && i >= o[t] && (void 0 === o[t + 1] || i < o[t + 1]) && this.activate(n[t])
        }, i.prototype.activate = function(i) {
            this.activeTarget = i, this.clear();
            var e = this.selector + '[data-target="' + i + '"],' + this.selector + '[href="' + i + '"]',
                s = t(e).parents("li").addClass("active");
            s.parent(".dropdown-menu").length && (s = s.closest("li.dropdown").addClass("active")), s.trigger("activate.bs.scrollspy")
        }, i.prototype.clear = function() {
            t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
        };
        var s = t.fn.scrollspy;
        t.fn.scrollspy = e, t.fn.scrollspy.Constructor = i, t.fn.scrollspy.noConflict = function() {
            return t.fn.scrollspy = s, this
        }, t(window).on("load.bs.scrollspy.data-api", function() {
            t('[data-spy="scroll"]').each(function() {
                var i = t(this);
                e.call(i, i.data())
            })
        })
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.tab");
                o || s.data("bs.tab", o = new e(this)), "string" == typeof i && o[i]()
            })
        }
        var e = function(i) {
            this.element = t(i)
        };
        e.VERSION = "3.3.4", e.TRANSITION_DURATION = 150, e.prototype.show = function() {
            var i = this.element,
                e = i.closest("ul:not(.dropdown-menu)"),
                s = i.data("target");
            if (s || (s = i.attr("href"), s = s && s.replace(/.*(?=#[^\s]*$)/, "")), !i.parent("li").hasClass("active")) {
                var o = e.find(".active:last a"),
                    n = t.Event("hide.bs.tab", {
                        relatedTarget: i[0]
                    }),
                    r = t.Event("show.bs.tab", {
                        relatedTarget: o[0]
                    });
                if (o.trigger(n), i.trigger(r), !r.isDefaultPrevented() && !n.isDefaultPrevented()) {
                    var a = t(s);
                    this.activate(i.closest("li"), e), this.activate(a, a.parent(), function() {
                        o.trigger({
                            type: "hidden.bs.tab",
                            relatedTarget: i[0]
                        }), i.trigger({
                            type: "shown.bs.tab",
                            relatedTarget: o[0]
                        })
                    })
                }
            }
        }, e.prototype.activate = function(i, s, o) {
            function n() {
                r.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), i.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), a ? (i[0].offsetWidth, i.addClass("in")) : i.removeClass("fade"), i.parent(".dropdown-menu").length && i.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), o && o()
            }
            var r = s.find("> .active"),
                a = o && t.support.transition && (r.length && r.hasClass("fade") || !!s.find("> .fade").length);
            r.length && a ? r.one("bsTransitionEnd", n).emulateTransitionEnd(e.TRANSITION_DURATION) : n(), r.removeClass("in")
        };
        var s = t.fn.tab;
        t.fn.tab = i, t.fn.tab.Constructor = e, t.fn.tab.noConflict = function() {
            return t.fn.tab = s, this
        };
        var o = function(e) {
            e.preventDefault(), i.call(t(this), "show")
        };
        t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', o).on("click.bs.tab.data-api", '[data-toggle="pill"]', o);
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.affix"),
                    n = "object" == typeof i && i;
                o || s.data("bs.affix", o = new e(this, n)), "string" == typeof i && o[i]()
            })
        }
        var e = function(i, s) {
            this.options = t.extend({}, e.DEFAULTS, s), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(i), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
        };
        e.VERSION = "3.3.4", e.RESET = "affix affix-top affix-bottom", e.DEFAULTS = {
            offset: 0,
            target: window
        }, e.prototype.getState = function(t, i, e, s) {
            var o = this.$target.scrollTop(),
                n = this.$element.offset(),
                r = this.$target.height();
            if (null != e && "top" == this.affixed) return e > o && "top";
            if ("bottom" == this.affixed) return null != e ? !(o + this.unpin <= n.top) && "bottom" : !(t - s >= o + r) && "bottom";
            var a = null == this.affixed,
                l = a ? o : n.top,
                h = a ? r : i;
            return null != e && e >= o ? "top" : null != s && l + h >= t - s && "bottom"
        }, e.prototype.getPinnedOffset = function() {
            if (this.pinnedOffset) return this.pinnedOffset;
            this.$element.removeClass(e.RESET).addClass("affix");
            var t = this.$target.scrollTop(),
                i = this.$element.offset();
            return this.pinnedOffset = i.top - t
        }, e.prototype.checkPositionWithEventLoop = function() {
            setTimeout(t.proxy(this.checkPosition, this), 1)
        }, e.prototype.checkPosition = function() {
            if (this.$element.is(":visible")) {
                var i = this.$element.height(),
                    s = this.options.offset,
                    o = s.top,
                    n = s.bottom,
                    r = t(document.body).height();
                "object" != typeof s && (n = o = s), "function" == typeof o && (o = s.top(this.$element)), "function" == typeof n && (n = s.bottom(this.$element));
                var a = this.getState(r, i, o, n);
                if (this.affixed != a) {
                    null != this.unpin && this.$element.css("top", "");
                    var l = "affix" + (a ? "-" + a : ""),
                        h = t.Event(l + ".bs.affix");
                    if (this.$element.trigger(h), h.isDefaultPrevented()) return;
                    this.affixed = a, this.unpin = "bottom" == a ? this.getPinnedOffset() : null, this.$element.removeClass(e.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
                }
                "bottom" == a && this.$element.offset({
                    top: r - i - n
                })
            }
        };
        var s = t.fn.affix;
        t.fn.affix = i, t.fn.affix.Constructor = e, t.fn.affix.noConflict = function() {
            return t.fn.affix = s, this
        }, t(window).on("load", function() {
            t('[data-spy="affix"]').each(function() {
                var e = t(this),
                    s = e.data();
                s.offset = s.offset || {}, null != s.offsetBottom && (s.offset.bottom = s.offsetBottom), null != s.offsetTop && (s.offset.top = s.offsetTop), i.call(e, s)
            })
        })
    }(jQuery), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");
if (+ function(t) {
        "use strict";
        var i = t.fn.jquery.split(" ")[0].split(".");
        if (i[0] < 2 && i[1] < 9 || 1 == i[0] && 9 == i[1] && i[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
    }(jQuery), + function(t) {
        "use strict";

        function i() {
            var t = document.createElement("bootstrap"),
                i = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
            for (var e in i)
                if (void 0 !== t.style[e]) return {
                    end: i[e]
                };
            return !1
        }
        t.fn.emulateTransitionEnd = function(i) {
            var e = !1,
                s = this;
            t(this).one("bsTransitionEnd", function() {
                e = !0
            });
            var o = function() {
                e || t(s).trigger(t.support.transition.end)
            };
            return setTimeout(o, i), this
        }, t(function() {
            t.support.transition = i(), t.support.transition && (t.event.special.bsTransitionEnd = {
                bindType: t.support.transition.end,
                delegateType: t.support.transition.end,
                handle: function(i) {
                    return t(i.target).is(this) ? i.handleObj.handler.apply(this, arguments) : void 0
                }
            })
        })
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var e = t(this),
                    o = e.data("bs.alert");
                o || e.data("bs.alert", o = new s(this)), "string" == typeof i && o[i].call(e)
            })
        }
        var e = '[data-dismiss="alert"]',
            s = function(i) {
                t(i).on("click", e, this.close)
            };
        s.VERSION = "3.3.4", s.TRANSITION_DURATION = 150, s.prototype.close = function(i) {
            function e() {
                r.detach().trigger("closed.bs.alert").remove()
            }
            var o = t(this),
                n = o.attr("data-target");
            n || (n = o.attr("href"), n = n && n.replace(/.*(?=#[^\s]*$)/, ""));
            var r = t(n);
            i && i.preventDefault(), r.length || (r = o.closest(".alert")), r.trigger(i = t.Event("close.bs.alert")), i.isDefaultPrevented() || (r.removeClass("in"), t.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", e).emulateTransitionEnd(s.TRANSITION_DURATION) : e())
        };
        var o = t.fn.alert;
        t.fn.alert = i, t.fn.alert.Constructor = s, t.fn.alert.noConflict = function() {
            return t.fn.alert = o, this
        }, t(document).on("click.bs.alert.data-api", e, s.prototype.close)
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.button"),
                    n = "object" == typeof i && i;
                o || s.data("bs.button", o = new e(this, n)), "toggle" == i ? o.toggle() : i && o.setState(i)
            })
        }
        var e = function(i, s) {
            this.$element = t(i), this.options = t.extend({}, e.DEFAULTS, s), this.isLoading = !1
        };
        e.VERSION = "3.3.4", e.DEFAULTS = {
            loadingText: "loading..."
        }, e.prototype.setState = function(i) {
            var e = "disabled",
                s = this.$element,
                o = s.is("input") ? "val" : "html",
                n = s.data();
            i += "Text", null == n.resetText && s.data("resetText", s[o]()), setTimeout(t.proxy(function() {
                s[o](null == n[i] ? this.options[i] : n[i]), "loadingText" == i ? (this.isLoading = !0, s.addClass(e).attr(e, e)) : this.isLoading && (this.isLoading = !1, s.removeClass(e).removeAttr(e))
            }, this), 0)
        }, e.prototype.toggle = function() {
            var t = !0,
                i = this.$element.closest('[data-toggle="buttons"]');
            if (i.length) {
                var e = this.$element.find("input");
                "radio" == e.prop("type") && (e.prop("checked") && this.$element.hasClass("active") ? t = !1 : i.find(".active").removeClass("active")), t && e.prop("checked", !this.$element.hasClass("active")).trigger("change")
            } else this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
            t && this.$element.toggleClass("active")
        };
        var s = t.fn.button;
        t.fn.button = i, t.fn.button.Constructor = e, t.fn.button.noConflict = function() {
            return t.fn.button = s, this
        }, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(e) {
            var s = t(e.target);
            s.hasClass("btn") || (s = s.closest(".btn")), i.call(s, "toggle"), e.preventDefault()
        }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(i) {
            t(i.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(i.type))
        })
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.carousel"),
                    n = t.extend({}, e.DEFAULTS, s.data(), "object" == typeof i && i),
                    r = "string" == typeof i ? i : n.slide;
                o || s.data("bs.carousel", o = new e(this, n)), "number" == typeof i ? o.to(i) : r ? o[r]() : n.interval && o.pause().cycle()
            })
        }
        var e = function(i, e) {
            this.$element = t(i), this.$indicators = this.$element.find(".carousel-indicators"), this.options = e, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
        };
        e.VERSION = "3.3.4", e.TRANSITION_DURATION = 600, e.DEFAULTS = {
            interval: 5e3,
            pause: "hover",
            wrap: !0,
            keyboard: !0
        }, e.prototype.keydown = function(t) {
            if (!/input|textarea/i.test(t.target.tagName)) {
                switch (t.which) {
                    case 37:
                        this.prev();
                        break;
                    case 39:
                        this.next();
                        break;
                    default:
                        return
                }
                t.preventDefault()
            }
        }, e.prototype.cycle = function(i) {
            return i || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
        }, e.prototype.getItemIndex = function(t) {
            return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
        }, e.prototype.getItemForDirection = function(t, i) {
            var e = this.getItemIndex(i),
                s = "prev" == t && 0 === e || "next" == t && e == this.$items.length - 1;
            if (s && !this.options.wrap) return i;
            var o = "prev" == t ? -1 : 1,
                n = (e + o) % this.$items.length;
            return this.$items.eq(n)
        }, e.prototype.to = function(t) {
            var i = this,
                e = this.getItemIndex(this.$active = this.$element.find(".item.active"));
            return t > this.$items.length - 1 || 0 > t ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
                i.to(t)
            }) : e == t ? this.pause().cycle() : this.slide(t > e ? "next" : "prev", this.$items.eq(t))
        }, e.prototype.pause = function(i) {
            return i || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
        }, e.prototype.next = function() {
            return this.sliding ? void 0 : this.slide("next")
        }, e.prototype.prev = function() {
            return this.sliding ? void 0 : this.slide("prev")
        }, e.prototype.slide = function(i, s) {
            var o = this.$element.find(".item.active"),
                n = s || this.getItemForDirection(i, o),
                r = this.interval,
                a = "next" == i ? "left" : "right",
                l = this;
            if (n.hasClass("active")) return this.sliding = !1;
            var h = n[0],
                c = t.Event("slide.bs.carousel", {
                    relatedTarget: h,
                    direction: a
                });
            if (this.$element.trigger(c), !c.isDefaultPrevented()) {
                if (this.sliding = !0, r && this.pause(), this.$indicators.length) {
                    this.$indicators.find(".active").removeClass("active");
                    var d = t(this.$indicators.children()[this.getItemIndex(n)]);
                    d && d.addClass("active")
                }
                var p = t.Event("slid.bs.carousel", {
                    relatedTarget: h,
                    direction: a
                });
                return t.support.transition && this.$element.hasClass("slide") ? (n.addClass(i), n[0].offsetWidth, o.addClass(a), n.addClass(a), o.one("bsTransitionEnd", function() {
                    n.removeClass([i, a].join(" ")).addClass("active"), o.removeClass(["active", a].join(" ")), l.sliding = !1, setTimeout(function() {
                        l.$element.trigger(p)
                    }, 0)
                }).emulateTransitionEnd(e.TRANSITION_DURATION)) : (o.removeClass("active"), n.addClass("active"), this.sliding = !1, this.$element.trigger(p)), r && this.cycle(), this
            }
        };
        var s = t.fn.carousel;
        t.fn.carousel = i, t.fn.carousel.Constructor = e, t.fn.carousel.noConflict = function() {
            return t.fn.carousel = s, this
        };
        var o = function(e) {
            var s, o = t(this),
                n = t(o.attr("data-target") || (s = o.attr("href")) && s.replace(/.*(?=#[^\s]+$)/, ""));
            if (n.hasClass("carousel")) {
                var r = t.extend({}, n.data(), o.data()),
                    a = o.attr("data-slide-to");
                a && (r.interval = !1), i.call(n, r), a && n.data("bs.carousel").to(a), e.preventDefault()
            }
        };
        t(document).on("click.bs.carousel.data-api", "[data-slide]", o).on("click.bs.carousel.data-api", "[data-slide-to]", o), t(window).on("load", function() {
            t('[data-ride="carousel"]').each(function() {
                var e = t(this);
                i.call(e, e.data())
            })
        })
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            var e, s = i.attr("data-target") || (e = i.attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "");
            return t(s)
        }

        function e(i) {
            return this.each(function() {
                var e = t(this),
                    o = e.data("bs.collapse"),
                    n = t.extend({}, s.DEFAULTS, e.data(), "object" == typeof i && i);
                !o && n.toggle && /show|hide/.test(i) && (n.toggle = !1), o || e.data("bs.collapse", o = new s(this, n)), "string" == typeof i && o[i]()
            })
        }
        var s = function(i, e) {
            this.$element = t(i), this.options = t.extend({}, s.DEFAULTS, e), this.$trigger = t('[data-toggle="collapse"][href="#' + i.id + '"],[data-toggle="collapse"][data-target="#' + i.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
        };
        s.VERSION = "3.3.4", s.TRANSITION_DURATION = 350, s.DEFAULTS = {
            toggle: !0
        }, s.prototype.dimension = function() {
            var t = this.$element.hasClass("width");
            return t ? "width" : "height"
        }, s.prototype.show = function() {
            if (!this.transitioning && !this.$element.hasClass("in")) {
                var i, o = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
                if (!(o && o.length && (i = o.data("bs.collapse"), i && i.transitioning))) {
                    var n = t.Event("show.bs.collapse");
                    if (this.$element.trigger(n), !n.isDefaultPrevented()) {
                        o && o.length && (e.call(o, "hide"), i || o.data("bs.collapse", null));
                        var r = this.dimension();
                        this.$element.removeClass("collapse").addClass("collapsing")[r](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                        var a = function() {
                            this.$element.removeClass("collapsing").addClass("collapse in")[r](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                        };
                        if (!t.support.transition) return a.call(this);
                        var l = t.camelCase(["scroll", r].join("-"));
                        this.$element.one("bsTransitionEnd", t.proxy(a, this)).emulateTransitionEnd(s.TRANSITION_DURATION)[r](this.$element[0][l])
                    }
                }
            }
        }, s.prototype.hide = function() {
            if (!this.transitioning && this.$element.hasClass("in")) {
                var i = t.Event("hide.bs.collapse");
                if (this.$element.trigger(i), !i.isDefaultPrevented()) {
                    var e = this.dimension();
                    this.$element[e](this.$element[e]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                    var o = function() {
                        this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                    };
                    return t.support.transition ? void this.$element[e](0).one("bsTransitionEnd", t.proxy(o, this)).emulateTransitionEnd(s.TRANSITION_DURATION) : o.call(this)
                }
            }
        }, s.prototype.toggle = function() {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        }, s.prototype.getParent = function() {
            return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function(e, s) {
                var o = t(s);
                this.addAriaAndCollapsedClass(i(o), o)
            }, this)).end()
        }, s.prototype.addAriaAndCollapsedClass = function(t, i) {
            var e = t.hasClass("in");
            t.attr("aria-expanded", e), i.toggleClass("collapsed", !e).attr("aria-expanded", e)
        };
        var o = t.fn.collapse;
        t.fn.collapse = e, t.fn.collapse.Constructor = s, t.fn.collapse.noConflict = function() {
            return t.fn.collapse = o, this
        }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(s) {
            var o = t(this);
            o.attr("data-target") || s.preventDefault();
            var n = i(o),
                r = n.data("bs.collapse"),
                a = r ? "toggle" : o.data();
            e.call(n, a)
        })
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            i && 3 === i.which || (t(o).remove(), t(n).each(function() {
                var s = t(this),
                    o = e(s),
                    n = {
                        relatedTarget: this
                    };
                o.hasClass("open") && (o.trigger(i = t.Event("hide.bs.dropdown", n)), i.isDefaultPrevented() || (s.attr("aria-expanded", "false"), o.removeClass("open").trigger("hidden.bs.dropdown", n)))
            }))
        }

        function e(i) {
            var e = i.attr("data-target");
            e || (e = i.attr("href"), e = e && /#[A-Za-z]/.test(e) && e.replace(/.*(?=#[^\s]*$)/, ""));
            var s = e && t(e);
            return s && s.length ? s : i.parent()
        }

        function s(i) {
            return this.each(function() {
                var e = t(this),
                    s = e.data("bs.dropdown");
                s || e.data("bs.dropdown", s = new r(this)), "string" == typeof i && s[i].call(e)
            })
        }
        var o = ".dropdown-backdrop",
            n = '[data-toggle="dropdown"]',
            r = function(i) {
                t(i).on("click.bs.dropdown", this.toggle)
            };
        r.VERSION = "3.3.4", r.prototype.toggle = function(s) {
            var o = t(this);
            if (!o.is(".disabled, :disabled")) {
                var n = e(o),
                    r = n.hasClass("open");
                if (i(), !r) {
                    "ontouchstart" in document.documentElement && !n.closest(".navbar-nav").length && t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click", i);
                    var a = {
                        relatedTarget: this
                    };
                    if (n.trigger(s = t.Event("show.bs.dropdown", a)), s.isDefaultPrevented()) return;
                    o.trigger("focus").attr("aria-expanded", "true"), n.toggleClass("open").trigger("shown.bs.dropdown", a)
                }
                return !1
            }
        }, r.prototype.keydown = function(i) {
            if (/(38|40|27|32)/.test(i.which) && !/input|textarea/i.test(i.target.tagName)) {
                var s = t(this);
                if (i.preventDefault(), i.stopPropagation(), !s.is(".disabled, :disabled")) {
                    var o = e(s),
                        r = o.hasClass("open");
                    if (!r && 27 != i.which || r && 27 == i.which) return 27 == i.which && o.find(n).trigger("focus"), s.trigger("click");
                    var a = " li:not(.disabled):visible a",
                        l = o.find('[role="menu"]' + a + ', [role="listbox"]' + a);
                    if (l.length) {
                        var h = l.index(i.target);
                        38 == i.which && h > 0 && h--, 40 == i.which && h < l.length - 1 && h++, ~h || (h = 0), l.eq(h).trigger("focus")
                    }
                }
            }
        };
        var a = t.fn.dropdown;
        t.fn.dropdown = s, t.fn.dropdown.Constructor = r, t.fn.dropdown.noConflict = function() {
            return t.fn.dropdown = a, this
        }, t(document).on("click.bs.dropdown.data-api", i).on("click.bs.dropdown.data-api", ".dropdown form", function(t) {
            t.stopPropagation()
        }).on("click.bs.dropdown.data-api", n, r.prototype.toggle).on("keydown.bs.dropdown.data-api", n, r.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', r.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', r.prototype.keydown)
    }(jQuery), + function(t) {
        "use strict";

        function i(i, s) {
            return this.each(function() {
                var o = t(this),
                    n = o.data("bs.modal"),
                    r = t.extend({}, e.DEFAULTS, o.data(), "object" == typeof i && i);
                n || o.data("bs.modal", n = new e(this, r)), "string" == typeof i ? n[i](s) : r.show && n.show(s)
            })
        }
        var e = function(i, e) {
            this.options = e, this.$body = t(document.body), this.$element = t(i), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function() {
                this.$element.trigger("loaded.bs.modal")
            }, this))
        };
        e.VERSION = "3.3.4", e.TRANSITION_DURATION = 300, e.BACKDROP_TRANSITION_DURATION = 150, e.DEFAULTS = {
            backdrop: !0,
            keyboard: !0,
            show: !0
        }, e.prototype.toggle = function(t) {
            return this.isShown ? this.hide() : this.show(t)
        }, e.prototype.show = function(i) {
            var s = this,
                o = t.Event("show.bs.modal", {
                    relatedTarget: i
                });
            this.$element.trigger(o), this.isShown || o.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
                s.$element.one("mouseup.dismiss.bs.modal", function(i) {
                    t(i.target).is(s.$element) && (s.ignoreBackdropClick = !0)
                })
            }), this.backdrop(function() {
                var o = t.support.transition && s.$element.hasClass("fade");
                s.$element.parent().length || s.$element.appendTo(s.$body), s.$element.show().scrollTop(0), s.adjustDialog(), o && s.$element[0].offsetWidth, s.$element.addClass("in").attr("aria-hidden", !1), s.enforceFocus();
                var n = t.Event("shown.bs.modal", {
                    relatedTarget: i
                });
                o ? s.$dialog.one("bsTransitionEnd", function() {
                    s.$element.trigger("focus").trigger(n)
                }).emulateTransitionEnd(e.TRANSITION_DURATION) : s.$element.trigger("focus").trigger(n)
            }))
        }, e.prototype.hide = function(i) {
            i && i.preventDefault(), i = t.Event("hide.bs.modal"), this.$element.trigger(i), this.isShown && !i.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(e.TRANSITION_DURATION) : this.hideModal())
        }, e.prototype.enforceFocus = function() {
            t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
                this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
            }, this))
        }, e.prototype.escape = function() {
            this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function(t) {
                27 == t.which && this.hide()
            }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
        }, e.prototype.resize = function() {
            this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
        }, e.prototype.hideModal = function() {
            var t = this;
            this.$element.hide(), this.backdrop(function() {
                t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal")
            })
        }, e.prototype.removeBackdrop = function() {
            this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
        }, e.prototype.backdrop = function(i) {
            var s = this,
                o = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var n = t.support.transition && o;
                if (this.$backdrop = t('<div class="modal-backdrop ' + o + '" />').appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", t.proxy(function(t) {
                        return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                    }, this)), n && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !i) return;
                n ? this.$backdrop.one("bsTransitionEnd", i).emulateTransitionEnd(e.BACKDROP_TRANSITION_DURATION) : i()
            } else if (!this.isShown && this.$backdrop) {
                this.$backdrop.removeClass("in");
                var r = function() {
                    s.removeBackdrop(), i && i()
                };
                t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", r).emulateTransitionEnd(e.BACKDROP_TRANSITION_DURATION) : r()
            } else i && i()
        }, e.prototype.handleUpdate = function() {
            this.adjustDialog()
        }, e.prototype.adjustDialog = function() {
            var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
            this.$element.css({
                paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
                paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
            })
        }, e.prototype.resetAdjustments = function() {
            this.$element.css({
                paddingLeft: "",
                paddingRight: ""
            })
        }, e.prototype.checkScrollbar = function() {
            var t = window.innerWidth;
            if (!t) {
                var i = document.documentElement.getBoundingClientRect();
                t = i.right - Math.abs(i.left)
            }
            this.bodyIsOverflowing = document.body.clientWidth < t, this.scrollbarWidth = this.measureScrollbar()
        }, e.prototype.setScrollbar = function() {
            var t = parseInt(this.$body.css("padding-right") || 0, 10);
            this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
        }, e.prototype.resetScrollbar = function() {
            this.$body.css("padding-right", this.originalBodyPad)
        }, e.prototype.measureScrollbar = function() {
            var t = document.createElement("div");
            t.className = "modal-scrollbar-measure", this.$body.append(t);
            var i = t.offsetWidth - t.clientWidth;
            return this.$body[0].removeChild(t), i
        };
        var s = t.fn.modal;
        t.fn.modal = i, t.fn.modal.Constructor = e, t.fn.modal.noConflict = function() {
            return t.fn.modal = s, this
        }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(e) {
            var s = t(this),
                o = s.attr("href"),
                n = t(s.attr("data-target") || o && o.replace(/.*(?=#[^\s]+$)/, "")),
                r = n.data("bs.modal") ? "toggle" : t.extend({
                    remote: !/#/.test(o) && o
                }, n.data(), s.data());
            s.is("a") && e.preventDefault(), n.one("show.bs.modal", function(t) {
                t.isDefaultPrevented() || n.one("hidden.bs.modal", function() {
                    s.is(":visible") && s.trigger("focus")
                })
            }), i.call(n, r, this)
        })
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.tooltip"),
                    n = "object" == typeof i && i;
                (o || !/destroy|hide/.test(i)) && (o || s.data("bs.tooltip", o = new e(this, n)), "string" == typeof i && o[i]())
            })
        }
        var e = function(t, i) {
            this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.init("tooltip", t, i)
        };
        e.VERSION = "3.3.4", e.TRANSITION_DURATION = 150, e.DEFAULTS = {
            animation: !0,
            placement: "top",
            selector: !1,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            container: !1,
            viewport: {
                selector: "body",
                padding: 0
            }
        }, e.prototype.init = function(i, e, s) {
            if (this.enabled = !0, this.type = i, this.$element = t(e), this.options = this.getOptions(s), this.$viewport = this.options.viewport && t(this.options.viewport.selector || this.options.viewport), this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
            for (var o = this.options.trigger.split(" "), n = o.length; n--;) {
                var r = o[n];
                if ("click" == r) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
                else if ("manual" != r) {
                    var a = "hover" == r ? "mouseenter" : "focusin",
                        l = "hover" == r ? "mouseleave" : "focusout";
                    this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
                }
            }
            this.options.selector ? this._options = t.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        }, e.prototype.getDefaults = function() {
            return e.DEFAULTS
        }, e.prototype.getOptions = function(i) {
            return i = t.extend({}, this.getDefaults(), this.$element.data(), i), i.delay && "number" == typeof i.delay && (i.delay = {
                show: i.delay,
                hide: i.delay
            }), i
        }, e.prototype.getDelegateOptions = function() {
            var i = {},
                e = this.getDefaults();
            return this._options && t.each(this._options, function(t, s) {
                e[t] != s && (i[t] = s)
            }), i
        }, e.prototype.enter = function(i) {
            var e = i instanceof this.constructor ? i : t(i.currentTarget).data("bs." + this.type);
            return e && e.$tip && e.$tip.is(":visible") ? void(e.hoverState = "in") : (e || (e = new this.constructor(i.currentTarget, this.getDelegateOptions()), t(i.currentTarget).data("bs." + this.type, e)), clearTimeout(e.timeout), e.hoverState = "in", e.options.delay && e.options.delay.show ? void(e.timeout = setTimeout(function() {
                "in" == e.hoverState && e.show()
            }, e.options.delay.show)) : e.show())
        }, e.prototype.leave = function(i) {
            var e = i instanceof this.constructor ? i : t(i.currentTarget).data("bs." + this.type);
            return e || (e = new this.constructor(i.currentTarget, this.getDelegateOptions()), t(i.currentTarget).data("bs." + this.type, e)), clearTimeout(e.timeout), e.hoverState = "out", e.options.delay && e.options.delay.hide ? void(e.timeout = setTimeout(function() {
                "out" == e.hoverState && e.hide()
            }, e.options.delay.hide)) : e.hide()
        }, e.prototype.show = function() {
            var i = t.Event("show.bs." + this.type);
            if (this.hasContent() && this.enabled) {
                this.$element.trigger(i);
                var s = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
                if (i.isDefaultPrevented() || !s) return;
                var o = this,
                    n = this.tip(),
                    r = this.getUID(this.type);
                this.setContent(), n.attr("id", r), this.$element.attr("aria-describedby", r), this.options.animation && n.addClass("fade");
                var a = "function" == typeof this.options.placement ? this.options.placement.call(this, n[0], this.$element[0]) : this.options.placement,
                    l = /\s?auto?\s?/i,
                    h = l.test(a);
                h && (a = a.replace(l, "") || "top"), n.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).addClass(a).data("bs." + this.type, this), this.options.container ? n.appendTo(this.options.container) : n.insertAfter(this.$element);
                var c = this.getPosition(),
                    d = n[0].offsetWidth,
                    p = n[0].offsetHeight;
                if (h) {
                    var u = a,
                        f = this.options.container ? t(this.options.container) : this.$element.parent(),
                        v = this.getPosition(f);
                    a = "bottom" == a && c.bottom + p > v.bottom ? "top" : "top" == a && c.top - p < v.top ? "bottom" : "right" == a && c.right + d > v.width ? "left" : "left" == a && c.left - d < v.left ? "right" : a, n.removeClass(u).addClass(a)
                }
                var g = this.getCalculatedOffset(a, c, d, p);
                this.applyPlacement(g, a);
                var m = function() {
                    var t = o.hoverState;
                    o.$element.trigger("shown.bs." + o.type), o.hoverState = null, "out" == t && o.leave(o)
                };
                t.support.transition && this.$tip.hasClass("fade") ? n.one("bsTransitionEnd", m).emulateTransitionEnd(e.TRANSITION_DURATION) : m()
            }
        }, e.prototype.applyPlacement = function(i, e) {
            var s = this.tip(),
                o = s[0].offsetWidth,
                n = s[0].offsetHeight,
                r = parseInt(s.css("margin-top"), 10),
                a = parseInt(s.css("margin-left"), 10);
            isNaN(r) && (r = 0), isNaN(a) && (a = 0), i.top = i.top + r, i.left = i.left + a, t.offset.setOffset(s[0], t.extend({
                using: function(t) {
                    s.css({
                        top: Math.round(t.top),
                        left: Math.round(t.left)
                    })
                }
            }, i), 0), s.addClass("in");
            var l = s[0].offsetWidth,
                h = s[0].offsetHeight;
            "top" == e && h != n && (i.top = i.top + n - h);
            var c = this.getViewportAdjustedDelta(e, i, l, h);
            c.left ? i.left += c.left : i.top += c.top;
            var d = /top|bottom/.test(e),
                p = d ? 2 * c.left - o + l : 2 * c.top - n + h,
                u = d ? "offsetWidth" : "offsetHeight";
            s.offset(i), this.replaceArrow(p, s[0][u], d)
        }, e.prototype.replaceArrow = function(t, i, e) {
            this.arrow().css(e ? "left" : "top", 50 * (1 - t / i) + "%").css(e ? "top" : "left", "")
        }, e.prototype.setContent = function() {
            var t = this.tip(),
                i = this.getTitle();
            t.find(".tooltip-inner")[this.options.html ? "html" : "text"](i), t.removeClass("fade in top bottom left right")
        }, e.prototype.hide = function(i) {
            function s() {
                "in" != o.hoverState && n.detach(), o.$element.removeAttr("aria-describedby").trigger("hidden.bs." + o.type), i && i()
            }
            var o = this,
                n = t(this.$tip),
                r = t.Event("hide.bs." + this.type);
            return this.$element.trigger(r), r.isDefaultPrevented() ? void 0 : (n.removeClass("in"), t.support.transition && n.hasClass("fade") ? n.one("bsTransitionEnd", s).emulateTransitionEnd(e.TRANSITION_DURATION) : s(), this.hoverState = null, this)
        }, e.prototype.fixTitle = function() {
            var t = this.$element;
            (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
        }, e.prototype.hasContent = function() {
            return this.getTitle()
        }, e.prototype.getPosition = function(i) {
            i = i || this.$element;
            var e = i[0],
                s = "BODY" == e.tagName,
                o = e.getBoundingClientRect();
            null == o.width && (o = t.extend({}, o, {
                width: o.right - o.left,
                height: o.bottom - o.top
            }));
            var n = s ? {
                    top: 0,
                    left: 0
                } : i.offset(),
                r = {
                    scroll: s ? document.documentElement.scrollTop || document.body.scrollTop : i.scrollTop()
                },
                a = s ? {
                    width: t(window).width(),
                    height: t(window).height()
                } : null;
            return t.extend({}, o, r, a, n)
        }, e.prototype.getCalculatedOffset = function(t, i, e, s) {
            return "bottom" == t ? {
                top: i.top + i.height,
                left: i.left + i.width / 2 - e / 2
            } : "top" == t ? {
                top: i.top - s,
                left: i.left + i.width / 2 - e / 2
            } : "left" == t ? {
                top: i.top + i.height / 2 - s / 2,
                left: i.left - e
            } : {
                top: i.top + i.height / 2 - s / 2,
                left: i.left + i.width
            }
        }, e.prototype.getViewportAdjustedDelta = function(t, i, e, s) {
            var o = {
                top: 0,
                left: 0
            };
            if (!this.$viewport) return o;
            var n = this.options.viewport && this.options.viewport.padding || 0,
                r = this.getPosition(this.$viewport);
            if (/right|left/.test(t)) {
                var a = i.top - n - r.scroll,
                    l = i.top + n - r.scroll + s;
                a < r.top ? o.top = r.top - a : l > r.top + r.height && (o.top = r.top + r.height - l)
            } else {
                var h = i.left - n,
                    c = i.left + n + e;
                h < r.left ? o.left = r.left - h : c > r.width && (o.left = r.left + r.width - c)
            }
            return o
        }, e.prototype.getTitle = function() {
            var t, i = this.$element,
                e = this.options;
            return t = i.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(i[0]) : e.title)
        }, e.prototype.getUID = function(t) {
            do t += ~~(1e6 * Math.random()); while (document.getElementById(t));
            return t
        }, e.prototype.tip = function() {
            return this.$tip = this.$tip || t(this.options.template)
        }, e.prototype.arrow = function() {
            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
        }, e.prototype.enable = function() {
            this.enabled = !0
        }, e.prototype.disable = function() {
            this.enabled = !1
        }, e.prototype.toggleEnabled = function() {
            this.enabled = !this.enabled
        }, e.prototype.toggle = function(i) {
            var e = this;
            i && (e = t(i.currentTarget).data("bs." + this.type), e || (e = new this.constructor(i.currentTarget, this.getDelegateOptions()), t(i.currentTarget).data("bs." + this.type, e))), e.tip().hasClass("in") ? e.leave(e) : e.enter(e)
        }, e.prototype.destroy = function() {
            var t = this;
            clearTimeout(this.timeout), this.hide(function() {
                t.$element.off("." + t.type).removeData("bs." + t.type)
            })
        };
        var s = t.fn.tooltip;
        t.fn.tooltip = i, t.fn.tooltip.Constructor = e, t.fn.tooltip.noConflict = function() {
            return t.fn.tooltip = s, this
        }
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.popover"),
                    n = "object" == typeof i && i;
                (o || !/destroy|hide/.test(i)) && (o || s.data("bs.popover", o = new e(this, n)), "string" == typeof i && o[i]())
            })
        }
        var e = function(t, i) {
            this.init("popover", t, i)
        };
        if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
        e.VERSION = "3.3.4", e.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
        }), e.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), e.prototype.constructor = e, e.prototype.getDefaults = function() {
            return e.DEFAULTS
        }, e.prototype.setContent = function() {
            var t = this.tip(),
                i = this.getTitle(),
                e = this.getContent();
            t.find(".popover-title")[this.options.html ? "html" : "text"](i), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof e ? "html" : "append" : "text"](e), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
        }, e.prototype.hasContent = function() {
            return this.getTitle() || this.getContent()
        }, e.prototype.getContent = function() {
            var t = this.$element,
                i = this.options;
            return t.attr("data-content") || ("function" == typeof i.content ? i.content.call(t[0]) : i.content)
        }, e.prototype.arrow = function() {
            return this.$arrow = this.$arrow || this.tip().find(".arrow")
        };
        var s = t.fn.popover;
        t.fn.popover = i, t.fn.popover.Constructor = e, t.fn.popover.noConflict = function() {
            return t.fn.popover = s, this
        }
    }(jQuery), + function(t) {
        "use strict";

        function i(e, s) {
            this.$body = t(document.body), this.$scrollElement = t(t(e).is(document.body) ? window : e), this.options = t.extend({}, i.DEFAULTS, s), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", t.proxy(this.process, this)), this.refresh(), this.process()
        }

        function e(e) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.scrollspy"),
                    n = "object" == typeof e && e;
                o || s.data("bs.scrollspy", o = new i(this, n)), "string" == typeof e && o[e]()
            })
        }
        i.VERSION = "3.3.4", i.DEFAULTS = {
            offset: 10
        }, i.prototype.getScrollHeight = function() {
            return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
        }, i.prototype.refresh = function() {
            var i = this,
                e = "offset",
                s = 0;
            this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), t.isWindow(this.$scrollElement[0]) || (e = "position", s = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
                var i = t(this),
                    o = i.data("target") || i.attr("href"),
                    n = /^#./.test(o) && t(o);
                return n && n.length && n.is(":visible") && [
                    [n[e]().top + s, o]
                ] || null
            }).sort(function(t, i) {
                return t[0] - i[0]
            }).each(function() {
                i.offsets.push(this[0]), i.targets.push(this[1])
            })
        }, i.prototype.process = function() {
            var t, i = this.$scrollElement.scrollTop() + this.options.offset,
                e = this.getScrollHeight(),
                s = this.options.offset + e - this.$scrollElement.height(),
                o = this.offsets,
                n = this.targets,
                r = this.activeTarget;
            if (this.scrollHeight != e && this.refresh(), i >= s) return r != (t = n[n.length - 1]) && this.activate(t);
            if (r && i < o[0]) return this.activeTarget = null, this.clear();
            for (t = o.length; t--;) r != n[t] && i >= o[t] && (void 0 === o[t + 1] || i < o[t + 1]) && this.activate(n[t])
        }, i.prototype.activate = function(i) {
            this.activeTarget = i, this.clear();
            var e = this.selector + '[data-target="' + i + '"],' + this.selector + '[href="' + i + '"]',
                s = t(e).parents("li").addClass("active");
            s.parent(".dropdown-menu").length && (s = s.closest("li.dropdown").addClass("active")), s.trigger("activate.bs.scrollspy")
        }, i.prototype.clear = function() {
            t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
        };
        var s = t.fn.scrollspy;
        t.fn.scrollspy = e, t.fn.scrollspy.Constructor = i, t.fn.scrollspy.noConflict = function() {
            return t.fn.scrollspy = s, this
        }, t(window).on("load.bs.scrollspy.data-api", function() {
            t('[data-spy="scroll"]').each(function() {
                var i = t(this);
                e.call(i, i.data())
            })
        })
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.tab");
                o || s.data("bs.tab", o = new e(this)), "string" == typeof i && o[i]()
            })
        }
        var e = function(i) {
            this.element = t(i)
        };
        e.VERSION = "3.3.4", e.TRANSITION_DURATION = 150, e.prototype.show = function() {
            var i = this.element,
                e = i.closest("ul:not(.dropdown-menu)"),
                s = i.data("target");
            if (s || (s = i.attr("href"), s = s && s.replace(/.*(?=#[^\s]*$)/, "")), !i.parent("li").hasClass("active")) {
                var o = e.find(".active:last a"),
                    n = t.Event("hide.bs.tab", {
                        relatedTarget: i[0]
                    }),
                    r = t.Event("show.bs.tab", {
                        relatedTarget: o[0]
                    });
                if (o.trigger(n), i.trigger(r), !r.isDefaultPrevented() && !n.isDefaultPrevented()) {
                    var a = t(s);
                    this.activate(i.closest("li"), e), this.activate(a, a.parent(), function() {
                        o.trigger({
                            type: "hidden.bs.tab",
                            relatedTarget: i[0]
                        }), i.trigger({
                            type: "shown.bs.tab",
                            relatedTarget: o[0]
                        })
                    })
                }
            }
        }, e.prototype.activate = function(i, s, o) {
            function n() {
                r.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), i.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), a ? (i[0].offsetWidth, i.addClass("in")) : i.removeClass("fade"), i.parent(".dropdown-menu").length && i.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), o && o()
            }
            var r = s.find("> .active"),
                a = o && t.support.transition && (r.length && r.hasClass("fade") || !!s.find("> .fade").length);
            r.length && a ? r.one("bsTransitionEnd", n).emulateTransitionEnd(e.TRANSITION_DURATION) : n(), r.removeClass("in")
        };
        var s = t.fn.tab;
        t.fn.tab = i, t.fn.tab.Constructor = e, t.fn.tab.noConflict = function() {
            return t.fn.tab = s, this
        };
        var o = function(e) {
            e.preventDefault(), i.call(t(this), "show")
        };
        t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', o).on("click.bs.tab.data-api", '[data-toggle="pill"]', o)
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.affix"),
                    n = "object" == typeof i && i;
                o || s.data("bs.affix", o = new e(this, n)), "string" == typeof i && o[i]()
            })
        }
        var e = function(i, s) {
            this.options = t.extend({}, e.DEFAULTS, s), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(i), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
        };
        e.VERSION = "3.3.4", e.RESET = "affix affix-top affix-bottom", e.DEFAULTS = {
            offset: 0,
            target: window
        }, e.prototype.getState = function(t, i, e, s) {
            var o = this.$target.scrollTop(),
                n = this.$element.offset(),
                r = this.$target.height();
            if (null != e && "top" == this.affixed) return e > o && "top";
            if ("bottom" == this.affixed) return null != e ? !(o + this.unpin <= n.top) && "bottom" : !(t - s >= o + r) && "bottom";
            var a = null == this.affixed,
                l = a ? o : n.top,
                h = a ? r : i;
            return null != e && e >= o ? "top" : null != s && l + h >= t - s && "bottom"
        }, e.prototype.getPinnedOffset = function() {
            if (this.pinnedOffset) return this.pinnedOffset;
            this.$element.removeClass(e.RESET).addClass("affix");
            var t = this.$target.scrollTop(),
                i = this.$element.offset();
            return this.pinnedOffset = i.top - t
        }, e.prototype.checkPositionWithEventLoop = function() {
            setTimeout(t.proxy(this.checkPosition, this), 1)
        }, e.prototype.checkPosition = function() {
            if (this.$element.is(":visible")) {
                var i = this.$element.height(),
                    s = this.options.offset,
                    o = s.top,
                    n = s.bottom,
                    r = t(document.body).height();
                "object" != typeof s && (n = o = s), "function" == typeof o && (o = s.top(this.$element)), "function" == typeof n && (n = s.bottom(this.$element));
                var a = this.getState(r, i, o, n);
                if (this.affixed != a) {
                    null != this.unpin && this.$element.css("top", "");
                    var l = "affix" + (a ? "-" + a : ""),
                        h = t.Event(l + ".bs.affix");
                    if (this.$element.trigger(h), h.isDefaultPrevented()) return;
                    this.affixed = a, this.unpin = "bottom" == a ? this.getPinnedOffset() : null, this.$element.removeClass(e.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
                }
                "bottom" == a && this.$element.offset({
                    top: r - i - n
                })
            }
        };
        var s = t.fn.affix;
        t.fn.affix = i, t.fn.affix.Constructor = e, t.fn.affix.noConflict = function() {
            return t.fn.affix = s, this
        }, t(window).on("load", function() {
            t('[data-spy="affix"]').each(function() {
                var e = t(this),
                    s = e.data();
                s.offset = s.offset || {}, null != s.offsetBottom && (s.offset.bottom = s.offsetBottom), null != s.offsetTop && (s.offset.top = s.offsetTop), i.call(e, s)
            })
        })
    }(jQuery), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");
if (+ function(t) {
        "use strict";
        var i = t.fn.jquery.split(" ")[0].split(".");
        if (i[0] < 2 && i[1] < 9 || 1 == i[0] && 9 == i[1] && i[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
    }(jQuery), + function(t) {
        "use strict";

        function i() {
            var t = document.createElement("bootstrap"),
                i = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
            for (var e in i)
                if (void 0 !== t.style[e]) return {
                    end: i[e]
                };
            return !1
        }
        t.fn.emulateTransitionEnd = function(i) {
            var e = !1,
                s = this;
            t(this).one("bsTransitionEnd", function() {
                e = !0
            });
            var o = function() {
                e || t(s).trigger(t.support.transition.end)
            };
            return setTimeout(o, i), this
        }, t(function() {
            t.support.transition = i(), t.support.transition && (t.event.special.bsTransitionEnd = {
                bindType: t.support.transition.end,
                delegateType: t.support.transition.end,
                handle: function(i) {
                    return t(i.target).is(this) ? i.handleObj.handler.apply(this, arguments) : void 0
                }
            })
        })
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var e = t(this),
                    o = e.data("bs.alert");
                o || e.data("bs.alert", o = new s(this)), "string" == typeof i && o[i].call(e)
            })
        }
        var e = '[data-dismiss="alert"]',
            s = function(i) {
                t(i).on("click", e, this.close)
            };
        s.VERSION = "3.3.4", s.TRANSITION_DURATION = 150, s.prototype.close = function(i) {
            function e() {
                r.detach().trigger("closed.bs.alert").remove()
            }
            var o = t(this),
                n = o.attr("data-target");
            n || (n = o.attr("href"), n = n && n.replace(/.*(?=#[^\s]*$)/, ""));
            var r = t(n);
            i && i.preventDefault(), r.length || (r = o.closest(".alert")), r.trigger(i = t.Event("close.bs.alert")), i.isDefaultPrevented() || (r.removeClass("in"), t.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", e).emulateTransitionEnd(s.TRANSITION_DURATION) : e())
        };
        var o = t.fn.alert;
        t.fn.alert = i, t.fn.alert.Constructor = s, t.fn.alert.noConflict = function() {
            return t.fn.alert = o, this
        }, t(document).on("click.bs.alert.data-api", e, s.prototype.close)
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.button"),
                    n = "object" == typeof i && i;
                o || s.data("bs.button", o = new e(this, n)), "toggle" == i ? o.toggle() : i && o.setState(i)
            })
        }
        var e = function(i, s) {
            this.$element = t(i), this.options = t.extend({}, e.DEFAULTS, s), this.isLoading = !1
        };
        e.VERSION = "3.3.4", e.DEFAULTS = {
            loadingText: "loading..."
        }, e.prototype.setState = function(i) {
            var e = "disabled",
                s = this.$element,
                o = s.is("input") ? "val" : "html",
                n = s.data();
            i += "Text", null == n.resetText && s.data("resetText", s[o]()), setTimeout(t.proxy(function() {
                s[o](null == n[i] ? this.options[i] : n[i]), "loadingText" == i ? (this.isLoading = !0, s.addClass(e).attr(e, e)) : this.isLoading && (this.isLoading = !1, s.removeClass(e).removeAttr(e))
            }, this), 0)
        }, e.prototype.toggle = function() {
            var t = !0,
                i = this.$element.closest('[data-toggle="buttons"]');
            if (i.length) {
                var e = this.$element.find("input");
                "radio" == e.prop("type") && (e.prop("checked") && this.$element.hasClass("active") ? t = !1 : i.find(".active").removeClass("active")), t && e.prop("checked", !this.$element.hasClass("active")).trigger("change")
            } else this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
            t && this.$element.toggleClass("active")
        };
        var s = t.fn.button;
        t.fn.button = i, t.fn.button.Constructor = e, t.fn.button.noConflict = function() {
            return t.fn.button = s, this
        }, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(e) {
            var s = t(e.target);
            s.hasClass("btn") || (s = s.closest(".btn")), i.call(s, "toggle"), e.preventDefault()
        }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(i) {
            t(i.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(i.type))
        })
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.carousel"),
                    n = t.extend({}, e.DEFAULTS, s.data(), "object" == typeof i && i),
                    r = "string" == typeof i ? i : n.slide;
                o || s.data("bs.carousel", o = new e(this, n)), "number" == typeof i ? o.to(i) : r ? o[r]() : n.interval && o.pause().cycle()
            })
        }
        var e = function(i, e) {
            this.$element = t(i), this.$indicators = this.$element.find(".carousel-indicators"), this.options = e, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
        };
        e.VERSION = "3.3.4", e.TRANSITION_DURATION = 600, e.DEFAULTS = {
            interval: 5e3,
            pause: "hover",
            wrap: !0,
            keyboard: !0
        }, e.prototype.keydown = function(t) {
            if (!/input|textarea/i.test(t.target.tagName)) {
                switch (t.which) {
                    case 37:
                        this.prev();
                        break;
                    case 39:
                        this.next();
                        break;
                    default:
                        return
                }
                t.preventDefault()
            }
        }, e.prototype.cycle = function(i) {
            return i || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
        }, e.prototype.getItemIndex = function(t) {
            return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
        }, e.prototype.getItemForDirection = function(t, i) {
            var e = this.getItemIndex(i),
                s = "prev" == t && 0 === e || "next" == t && e == this.$items.length - 1;
            if (s && !this.options.wrap) return i;
            var o = "prev" == t ? -1 : 1,
                n = (e + o) % this.$items.length;
            return this.$items.eq(n)
        }, e.prototype.to = function(t) {
            var i = this,
                e = this.getItemIndex(this.$active = this.$element.find(".item.active"));
            return t > this.$items.length - 1 || 0 > t ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
                i.to(t)
            }) : e == t ? this.pause().cycle() : this.slide(t > e ? "next" : "prev", this.$items.eq(t))
        }, e.prototype.pause = function(i) {
            return i || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
        }, e.prototype.next = function() {
            return this.sliding ? void 0 : this.slide("next")
        }, e.prototype.prev = function() {
            return this.sliding ? void 0 : this.slide("prev")
        }, e.prototype.slide = function(i, s) {
            var o = this.$element.find(".item.active"),
                n = s || this.getItemForDirection(i, o),
                r = this.interval,
                a = "next" == i ? "left" : "right",
                l = this;
            if (n.hasClass("active")) return this.sliding = !1;
            var h = n[0],
                c = t.Event("slide.bs.carousel", {
                    relatedTarget: h,
                    direction: a
                });
            if (this.$element.trigger(c), !c.isDefaultPrevented()) {
                if (this.sliding = !0, r && this.pause(), this.$indicators.length) {
                    this.$indicators.find(".active").removeClass("active");
                    var d = t(this.$indicators.children()[this.getItemIndex(n)]);
                    d && d.addClass("active")
                }
                var p = t.Event("slid.bs.carousel", {
                    relatedTarget: h,
                    direction: a
                });
                return t.support.transition && this.$element.hasClass("slide") ? (n.addClass(i), n[0].offsetWidth, o.addClass(a), n.addClass(a), o.one("bsTransitionEnd", function() {
                    n.removeClass([i, a].join(" ")).addClass("active"), o.removeClass(["active", a].join(" ")), l.sliding = !1, setTimeout(function() {
                        l.$element.trigger(p)
                    }, 0)
                }).emulateTransitionEnd(e.TRANSITION_DURATION)) : (o.removeClass("active"), n.addClass("active"), this.sliding = !1, this.$element.trigger(p)), r && this.cycle(), this
            }
        };
        var s = t.fn.carousel;
        t.fn.carousel = i, t.fn.carousel.Constructor = e, t.fn.carousel.noConflict = function() {
            return t.fn.carousel = s, this
        };
        var o = function(e) {
            var s, o = t(this),
                n = t(o.attr("data-target") || (s = o.attr("href")) && s.replace(/.*(?=#[^\s]+$)/, ""));
            if (n.hasClass("carousel")) {
                var r = t.extend({}, n.data(), o.data()),
                    a = o.attr("data-slide-to");
                a && (r.interval = !1), i.call(n, r), a && n.data("bs.carousel").to(a), e.preventDefault()
            }
        };
        t(document).on("click.bs.carousel.data-api", "[data-slide]", o).on("click.bs.carousel.data-api", "[data-slide-to]", o), t(window).on("load", function() {
            t('[data-ride="carousel"]').each(function() {
                var e = t(this);
                i.call(e, e.data())
            })
        })
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            var e, s = i.attr("data-target") || (e = i.attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "");
            return t(s)
        }

        function e(i) {
            return this.each(function() {
                var e = t(this),
                    o = e.data("bs.collapse"),
                    n = t.extend({}, s.DEFAULTS, e.data(), "object" == typeof i && i);
                !o && n.toggle && /show|hide/.test(i) && (n.toggle = !1), o || e.data("bs.collapse", o = new s(this, n)), "string" == typeof i && o[i]()
            })
        }
        var s = function(i, e) {
            this.$element = t(i), this.options = t.extend({}, s.DEFAULTS, e), this.$trigger = t('[data-toggle="collapse"][href="#' + i.id + '"],[data-toggle="collapse"][data-target="#' + i.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
        };
        s.VERSION = "3.3.4", s.TRANSITION_DURATION = 350, s.DEFAULTS = {
            toggle: !0
        }, s.prototype.dimension = function() {
            var t = this.$element.hasClass("width");
            return t ? "width" : "height"
        }, s.prototype.show = function() {
            if (!this.transitioning && !this.$element.hasClass("in")) {
                var i, o = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
                if (!(o && o.length && (i = o.data("bs.collapse"), i && i.transitioning))) {
                    var n = t.Event("show.bs.collapse");
                    if (this.$element.trigger(n), !n.isDefaultPrevented()) {
                        o && o.length && (e.call(o, "hide"), i || o.data("bs.collapse", null));
                        var r = this.dimension();
                        this.$element.removeClass("collapse").addClass("collapsing")[r](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                        var a = function() {
                            this.$element.removeClass("collapsing").addClass("collapse in")[r](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                        };
                        if (!t.support.transition) return a.call(this);
                        var l = t.camelCase(["scroll", r].join("-"));
                        this.$element.one("bsTransitionEnd", t.proxy(a, this)).emulateTransitionEnd(s.TRANSITION_DURATION)[r](this.$element[0][l])
                    }
                }
            }
        }, s.prototype.hide = function() {
            if (!this.transitioning && this.$element.hasClass("in")) {
                var i = t.Event("hide.bs.collapse");
                if (this.$element.trigger(i), !i.isDefaultPrevented()) {
                    var e = this.dimension();
                    this.$element[e](this.$element[e]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                    var o = function() {
                        this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                    };
                    return t.support.transition ? void this.$element[e](0).one("bsTransitionEnd", t.proxy(o, this)).emulateTransitionEnd(s.TRANSITION_DURATION) : o.call(this)
                }
            }
        }, s.prototype.toggle = function() {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        }, s.prototype.getParent = function() {
            return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function(e, s) {
                var o = t(s);
                this.addAriaAndCollapsedClass(i(o), o)
            }, this)).end()
        }, s.prototype.addAriaAndCollapsedClass = function(t, i) {
            var e = t.hasClass("in");
            t.attr("aria-expanded", e), i.toggleClass("collapsed", !e).attr("aria-expanded", e)
        };
        var o = t.fn.collapse;
        t.fn.collapse = e, t.fn.collapse.Constructor = s, t.fn.collapse.noConflict = function() {
            return t.fn.collapse = o, this
        }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(s) {
            var o = t(this);
            o.attr("data-target") || s.preventDefault();
            var n = i(o),
                r = n.data("bs.collapse"),
                a = r ? "toggle" : o.data();
            e.call(n, a)
        })
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            i && 3 === i.which || (t(o).remove(), t(n).each(function() {
                var s = t(this),
                    o = e(s),
                    n = {
                        relatedTarget: this
                    };
                o.hasClass("open") && (o.trigger(i = t.Event("hide.bs.dropdown", n)), i.isDefaultPrevented() || (s.attr("aria-expanded", "false"), o.removeClass("open").trigger("hidden.bs.dropdown", n)))
            }))
        }

        function e(i) {
            var e = i.attr("data-target");
            e || (e = i.attr("href"), e = e && /#[A-Za-z]/.test(e) && e.replace(/.*(?=#[^\s]*$)/, ""));
            var s = e && t(e);
            return s && s.length ? s : i.parent()
        }

        function s(i) {
            return this.each(function() {
                var e = t(this),
                    s = e.data("bs.dropdown");
                s || e.data("bs.dropdown", s = new r(this)), "string" == typeof i && s[i].call(e)
            })
        }
        var o = ".dropdown-backdrop",
            n = '[data-toggle="dropdown"]',
            r = function(i) {
                t(i).on("click.bs.dropdown", this.toggle)
            };
        r.VERSION = "3.3.4", r.prototype.toggle = function(s) {
            var o = t(this);
            if (!o.is(".disabled, :disabled")) {
                var n = e(o),
                    r = n.hasClass("open");
                if (i(), !r) {
                    "ontouchstart" in document.documentElement && !n.closest(".navbar-nav").length && t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click", i);
                    var a = {
                        relatedTarget: this
                    };
                    if (n.trigger(s = t.Event("show.bs.dropdown", a)), s.isDefaultPrevented()) return;
                    o.trigger("focus").attr("aria-expanded", "true"), n.toggleClass("open").trigger("shown.bs.dropdown", a)
                }
                return !1
            }
        }, r.prototype.keydown = function(i) {
            if (/(38|40|27|32)/.test(i.which) && !/input|textarea/i.test(i.target.tagName)) {
                var s = t(this);
                if (i.preventDefault(), i.stopPropagation(), !s.is(".disabled, :disabled")) {
                    var o = e(s),
                        r = o.hasClass("open");
                    if (!r && 27 != i.which || r && 27 == i.which) return 27 == i.which && o.find(n).trigger("focus"), s.trigger("click");
                    var a = " li:not(.disabled):visible a",
                        l = o.find('[role="menu"]' + a + ', [role="listbox"]' + a);
                    if (l.length) {
                        var h = l.index(i.target);
                        38 == i.which && h > 0 && h--, 40 == i.which && h < l.length - 1 && h++, ~h || (h = 0), l.eq(h).trigger("focus")
                    }
                }
            }
        };
        var a = t.fn.dropdown;
        t.fn.dropdown = s, t.fn.dropdown.Constructor = r, t.fn.dropdown.noConflict = function() {
            return t.fn.dropdown = a, this
        }, t(document).on("click.bs.dropdown.data-api", i).on("click.bs.dropdown.data-api", ".dropdown form", function(t) {
            t.stopPropagation()
        }).on("click.bs.dropdown.data-api", n, r.prototype.toggle).on("keydown.bs.dropdown.data-api", n, r.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', r.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', r.prototype.keydown)
    }(jQuery), + function(t) {
        "use strict";

        function i(i, s) {
            return this.each(function() {
                var o = t(this),
                    n = o.data("bs.modal"),
                    r = t.extend({}, e.DEFAULTS, o.data(), "object" == typeof i && i);
                n || o.data("bs.modal", n = new e(this, r)), "string" == typeof i ? n[i](s) : r.show && n.show(s)
            })
        }
        var e = function(i, e) {
            this.options = e, this.$body = t(document.body), this.$element = t(i), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function() {
                this.$element.trigger("loaded.bs.modal")
            }, this))
        };
        e.VERSION = "3.3.4", e.TRANSITION_DURATION = 300, e.BACKDROP_TRANSITION_DURATION = 150, e.DEFAULTS = {
            backdrop: !0,
            keyboard: !0,
            show: !0
        }, e.prototype.toggle = function(t) {
            return this.isShown ? this.hide() : this.show(t)
        }, e.prototype.show = function(i) {
            var s = this,
                o = t.Event("show.bs.modal", {
                    relatedTarget: i
                });
            this.$element.trigger(o), this.isShown || o.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
                s.$element.one("mouseup.dismiss.bs.modal", function(i) {
                    t(i.target).is(s.$element) && (s.ignoreBackdropClick = !0)
                })
            }), this.backdrop(function() {
                var o = t.support.transition && s.$element.hasClass("fade");
                s.$element.parent().length || s.$element.appendTo(s.$body), s.$element.show().scrollTop(0), s.adjustDialog(), o && s.$element[0].offsetWidth, s.$element.addClass("in").attr("aria-hidden", !1), s.enforceFocus();
                var n = t.Event("shown.bs.modal", {
                    relatedTarget: i
                });
                o ? s.$dialog.one("bsTransitionEnd", function() {
                    s.$element.trigger("focus").trigger(n)
                }).emulateTransitionEnd(e.TRANSITION_DURATION) : s.$element.trigger("focus").trigger(n)
            }))
        }, e.prototype.hide = function(i) {
            i && i.preventDefault(), i = t.Event("hide.bs.modal"), this.$element.trigger(i), this.isShown && !i.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(e.TRANSITION_DURATION) : this.hideModal())
        }, e.prototype.enforceFocus = function() {
            t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
                this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
            }, this))
        }, e.prototype.escape = function() {
            this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function(t) {
                27 == t.which && this.hide()
            }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
        }, e.prototype.resize = function() {
            this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
        }, e.prototype.hideModal = function() {
            var t = this;
            this.$element.hide(), this.backdrop(function() {
                t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal")
            })
        }, e.prototype.removeBackdrop = function() {
            this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
        }, e.prototype.backdrop = function(i) {
            var s = this,
                o = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var n = t.support.transition && o;
                if (this.$backdrop = t('<div class="modal-backdrop ' + o + '" />').appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", t.proxy(function(t) {
                        return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                    }, this)), n && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !i) return;
                n ? this.$backdrop.one("bsTransitionEnd", i).emulateTransitionEnd(e.BACKDROP_TRANSITION_DURATION) : i()
            } else if (!this.isShown && this.$backdrop) {
                this.$backdrop.removeClass("in");
                var r = function() {
                    s.removeBackdrop(), i && i()
                };
                t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", r).emulateTransitionEnd(e.BACKDROP_TRANSITION_DURATION) : r()
            } else i && i()
        }, e.prototype.handleUpdate = function() {
            this.adjustDialog()
        }, e.prototype.adjustDialog = function() {
            var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
            this.$element.css({
                paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
                paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
            })
        }, e.prototype.resetAdjustments = function() {
            this.$element.css({
                paddingLeft: "",
                paddingRight: ""
            })
        }, e.prototype.checkScrollbar = function() {
            var t = window.innerWidth;
            if (!t) {
                var i = document.documentElement.getBoundingClientRect();
                t = i.right - Math.abs(i.left)
            }
            this.bodyIsOverflowing = document.body.clientWidth < t, this.scrollbarWidth = this.measureScrollbar()
        }, e.prototype.setScrollbar = function() {
            var t = parseInt(this.$body.css("padding-right") || 0, 10);
            this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
        }, e.prototype.resetScrollbar = function() {
            this.$body.css("padding-right", this.originalBodyPad)
        }, e.prototype.measureScrollbar = function() {
            var t = document.createElement("div");
            t.className = "modal-scrollbar-measure", this.$body.append(t);
            var i = t.offsetWidth - t.clientWidth;
            return this.$body[0].removeChild(t), i
        };
        var s = t.fn.modal;
        t.fn.modal = i, t.fn.modal.Constructor = e, t.fn.modal.noConflict = function() {
            return t.fn.modal = s, this
        }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(e) {
            var s = t(this),
                o = s.attr("href"),
                n = t(s.attr("data-target") || o && o.replace(/.*(?=#[^\s]+$)/, "")),
                r = n.data("bs.modal") ? "toggle" : t.extend({
                    remote: !/#/.test(o) && o
                }, n.data(), s.data());
            s.is("a") && e.preventDefault(), n.one("show.bs.modal", function(t) {
                t.isDefaultPrevented() || n.one("hidden.bs.modal", function() {
                    s.is(":visible") && s.trigger("focus")
                })
            }), i.call(n, r, this)
        })
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.tooltip"),
                    n = "object" == typeof i && i;
                (o || !/destroy|hide/.test(i)) && (o || s.data("bs.tooltip", o = new e(this, n)), "string" == typeof i && o[i]())
            })
        }
        var e = function(t, i) {
            this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.init("tooltip", t, i)
        };
        e.VERSION = "3.3.4", e.TRANSITION_DURATION = 150, e.DEFAULTS = {
            animation: !0,
            placement: "top",
            selector: !1,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            container: !1,
            viewport: {
                selector: "body",
                padding: 0
            }
        }, e.prototype.init = function(i, e, s) {
            if (this.enabled = !0, this.type = i, this.$element = t(e), this.options = this.getOptions(s), this.$viewport = this.options.viewport && t(this.options.viewport.selector || this.options.viewport), this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
            for (var o = this.options.trigger.split(" "), n = o.length; n--;) {
                var r = o[n];
                if ("click" == r) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
                else if ("manual" != r) {
                    var a = "hover" == r ? "mouseenter" : "focusin",
                        l = "hover" == r ? "mouseleave" : "focusout";
                    this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
                }
            }
            this.options.selector ? this._options = t.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        }, e.prototype.getDefaults = function() {
            return e.DEFAULTS
        }, e.prototype.getOptions = function(i) {
            return i = t.extend({}, this.getDefaults(), this.$element.data(), i), i.delay && "number" == typeof i.delay && (i.delay = {
                show: i.delay,
                hide: i.delay
            }), i
        }, e.prototype.getDelegateOptions = function() {
            var i = {},
                e = this.getDefaults();
            return this._options && t.each(this._options, function(t, s) {
                e[t] != s && (i[t] = s)
            }), i
        }, e.prototype.enter = function(i) {
            var e = i instanceof this.constructor ? i : t(i.currentTarget).data("bs." + this.type);
            return e && e.$tip && e.$tip.is(":visible") ? void(e.hoverState = "in") : (e || (e = new this.constructor(i.currentTarget, this.getDelegateOptions()), t(i.currentTarget).data("bs." + this.type, e)), clearTimeout(e.timeout), e.hoverState = "in", e.options.delay && e.options.delay.show ? void(e.timeout = setTimeout(function() {
                "in" == e.hoverState && e.show()
            }, e.options.delay.show)) : e.show())
        }, e.prototype.leave = function(i) {
            var e = i instanceof this.constructor ? i : t(i.currentTarget).data("bs." + this.type);
            return e || (e = new this.constructor(i.currentTarget, this.getDelegateOptions()), t(i.currentTarget).data("bs." + this.type, e)), clearTimeout(e.timeout), e.hoverState = "out", e.options.delay && e.options.delay.hide ? void(e.timeout = setTimeout(function() {
                "out" == e.hoverState && e.hide()
            }, e.options.delay.hide)) : e.hide()
        }, e.prototype.show = function() {
            var i = t.Event("show.bs." + this.type);
            if (this.hasContent() && this.enabled) {
                this.$element.trigger(i);
                var s = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
                if (i.isDefaultPrevented() || !s) return;
                var o = this,
                    n = this.tip(),
                    r = this.getUID(this.type);
                this.setContent(), n.attr("id", r), this.$element.attr("aria-describedby", r), this.options.animation && n.addClass("fade");
                var a = "function" == typeof this.options.placement ? this.options.placement.call(this, n[0], this.$element[0]) : this.options.placement,
                    l = /\s?auto?\s?/i,
                    h = l.test(a);
                h && (a = a.replace(l, "") || "top"), n.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).addClass(a).data("bs." + this.type, this), this.options.container ? n.appendTo(this.options.container) : n.insertAfter(this.$element);
                var c = this.getPosition(),
                    d = n[0].offsetWidth,
                    p = n[0].offsetHeight;
                if (h) {
                    var u = a,
                        f = this.options.container ? t(this.options.container) : this.$element.parent(),
                        v = this.getPosition(f);
                    a = "bottom" == a && c.bottom + p > v.bottom ? "top" : "top" == a && c.top - p < v.top ? "bottom" : "right" == a && c.right + d > v.width ? "left" : "left" == a && c.left - d < v.left ? "right" : a, n.removeClass(u).addClass(a)
                }
                var g = this.getCalculatedOffset(a, c, d, p);
                this.applyPlacement(g, a);
                var m = function() {
                    var t = o.hoverState;
                    o.$element.trigger("shown.bs." + o.type), o.hoverState = null, "out" == t && o.leave(o)
                };
                t.support.transition && this.$tip.hasClass("fade") ? n.one("bsTransitionEnd", m).emulateTransitionEnd(e.TRANSITION_DURATION) : m()
            }
        }, e.prototype.applyPlacement = function(i, e) {
            var s = this.tip(),
                o = s[0].offsetWidth,
                n = s[0].offsetHeight,
                r = parseInt(s.css("margin-top"), 10),
                a = parseInt(s.css("margin-left"), 10);
            isNaN(r) && (r = 0), isNaN(a) && (a = 0), i.top = i.top + r, i.left = i.left + a, t.offset.setOffset(s[0], t.extend({
                using: function(t) {
                    s.css({
                        top: Math.round(t.top),
                        left: Math.round(t.left)
                    })
                }
            }, i), 0), s.addClass("in");
            var l = s[0].offsetWidth,
                h = s[0].offsetHeight;
            "top" == e && h != n && (i.top = i.top + n - h);
            var c = this.getViewportAdjustedDelta(e, i, l, h);
            c.left ? i.left += c.left : i.top += c.top;
            var d = /top|bottom/.test(e),
                p = d ? 2 * c.left - o + l : 2 * c.top - n + h,
                u = d ? "offsetWidth" : "offsetHeight";
            s.offset(i), this.replaceArrow(p, s[0][u], d)
        }, e.prototype.replaceArrow = function(t, i, e) {
            this.arrow().css(e ? "left" : "top", 50 * (1 - t / i) + "%").css(e ? "top" : "left", "")
        }, e.prototype.setContent = function() {
            var t = this.tip(),
                i = this.getTitle();
            t.find(".tooltip-inner")[this.options.html ? "html" : "text"](i), t.removeClass("fade in top bottom left right")
        }, e.prototype.hide = function(i) {
            function s() {
                "in" != o.hoverState && n.detach(), o.$element.removeAttr("aria-describedby").trigger("hidden.bs." + o.type), i && i()
            }
            var o = this,
                n = t(this.$tip),
                r = t.Event("hide.bs." + this.type);
            return this.$element.trigger(r), r.isDefaultPrevented() ? void 0 : (n.removeClass("in"), t.support.transition && n.hasClass("fade") ? n.one("bsTransitionEnd", s).emulateTransitionEnd(e.TRANSITION_DURATION) : s(), this.hoverState = null, this)
        }, e.prototype.fixTitle = function() {
            var t = this.$element;
            (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
        }, e.prototype.hasContent = function() {
            return this.getTitle()
        }, e.prototype.getPosition = function(i) {
            i = i || this.$element;
            var e = i[0],
                s = "BODY" == e.tagName,
                o = e.getBoundingClientRect();
            null == o.width && (o = t.extend({}, o, {
                width: o.right - o.left,
                height: o.bottom - o.top
            }));
            var n = s ? {
                    top: 0,
                    left: 0
                } : i.offset(),
                r = {
                    scroll: s ? document.documentElement.scrollTop || document.body.scrollTop : i.scrollTop()
                },
                a = s ? {
                    width: t(window).width(),
                    height: t(window).height()
                } : null;
            return t.extend({}, o, r, a, n)
        }, e.prototype.getCalculatedOffset = function(t, i, e, s) {
            return "bottom" == t ? {
                top: i.top + i.height,
                left: i.left + i.width / 2 - e / 2
            } : "top" == t ? {
                top: i.top - s,
                left: i.left + i.width / 2 - e / 2
            } : "left" == t ? {
                top: i.top + i.height / 2 - s / 2,
                left: i.left - e
            } : {
                top: i.top + i.height / 2 - s / 2,
                left: i.left + i.width
            }
        }, e.prototype.getViewportAdjustedDelta = function(t, i, e, s) {
            var o = {
                top: 0,
                left: 0
            };
            if (!this.$viewport) return o;
            var n = this.options.viewport && this.options.viewport.padding || 0,
                r = this.getPosition(this.$viewport);
            if (/right|left/.test(t)) {
                var a = i.top - n - r.scroll,
                    l = i.top + n - r.scroll + s;
                a < r.top ? o.top = r.top - a : l > r.top + r.height && (o.top = r.top + r.height - l)
            } else {
                var h = i.left - n,
                    c = i.left + n + e;
                h < r.left ? o.left = r.left - h : c > r.width && (o.left = r.left + r.width - c)
            }
            return o
        }, e.prototype.getTitle = function() {
            var t, i = this.$element,
                e = this.options;
            return t = i.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(i[0]) : e.title)
        }, e.prototype.getUID = function(t) {
            do t += ~~(1e6 * Math.random()); while (document.getElementById(t));
            return t
        }, e.prototype.tip = function() {
            return this.$tip = this.$tip || t(this.options.template)
        }, e.prototype.arrow = function() {
            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
        }, e.prototype.enable = function() {
            this.enabled = !0
        }, e.prototype.disable = function() {
            this.enabled = !1
        }, e.prototype.toggleEnabled = function() {
            this.enabled = !this.enabled
        }, e.prototype.toggle = function(i) {
            var e = this;
            i && (e = t(i.currentTarget).data("bs." + this.type), e || (e = new this.constructor(i.currentTarget, this.getDelegateOptions()), t(i.currentTarget).data("bs." + this.type, e))), e.tip().hasClass("in") ? e.leave(e) : e.enter(e)
        }, e.prototype.destroy = function() {
            var t = this;
            clearTimeout(this.timeout), this.hide(function() {
                t.$element.off("." + t.type).removeData("bs." + t.type)
            })
        };
        var s = t.fn.tooltip;
        t.fn.tooltip = i, t.fn.tooltip.Constructor = e, t.fn.tooltip.noConflict = function() {
            return t.fn.tooltip = s, this
        }
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.popover"),
                    n = "object" == typeof i && i;
                (o || !/destroy|hide/.test(i)) && (o || s.data("bs.popover", o = new e(this, n)), "string" == typeof i && o[i]())
            })
        }
        var e = function(t, i) {
            this.init("popover", t, i)
        };
        if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
        e.VERSION = "3.3.4", e.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
        }), e.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), e.prototype.constructor = e, e.prototype.getDefaults = function() {
            return e.DEFAULTS
        }, e.prototype.setContent = function() {
            var t = this.tip(),
                i = this.getTitle(),
                e = this.getContent();
            t.find(".popover-title")[this.options.html ? "html" : "text"](i), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof e ? "html" : "append" : "text"](e), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
        }, e.prototype.hasContent = function() {
            return this.getTitle() || this.getContent()
        }, e.prototype.getContent = function() {
            var t = this.$element,
                i = this.options;
            return t.attr("data-content") || ("function" == typeof i.content ? i.content.call(t[0]) : i.content)
        }, e.prototype.arrow = function() {
            return this.$arrow = this.$arrow || this.tip().find(".arrow")
        };
        var s = t.fn.popover;
        t.fn.popover = i, t.fn.popover.Constructor = e, t.fn.popover.noConflict = function() {
            return t.fn.popover = s, this
        }
    }(jQuery), + function(t) {
        "use strict";

        function i(e, s) {
            this.$body = t(document.body), this.$scrollElement = t(t(e).is(document.body) ? window : e), this.options = t.extend({}, i.DEFAULTS, s), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", t.proxy(this.process, this)), this.refresh(), this.process()
        }

        function e(e) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.scrollspy"),
                    n = "object" == typeof e && e;
                o || s.data("bs.scrollspy", o = new i(this, n)), "string" == typeof e && o[e]()
            })
        }
        i.VERSION = "3.3.4", i.DEFAULTS = {
            offset: 10
        }, i.prototype.getScrollHeight = function() {
            return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
        }, i.prototype.refresh = function() {
            var i = this,
                e = "offset",
                s = 0;
            this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), t.isWindow(this.$scrollElement[0]) || (e = "position", s = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
                var i = t(this),
                    o = i.data("target") || i.attr("href"),
                    n = /^#./.test(o) && t(o);
                return n && n.length && n.is(":visible") && [
                    [n[e]().top + s, o]
                ] || null
            }).sort(function(t, i) {
                return t[0] - i[0]
            }).each(function() {
                i.offsets.push(this[0]), i.targets.push(this[1])
            })
        }, i.prototype.process = function() {
            var t, i = this.$scrollElement.scrollTop() + this.options.offset,
                e = this.getScrollHeight(),
                s = this.options.offset + e - this.$scrollElement.height(),
                o = this.offsets,
                n = this.targets,
                r = this.activeTarget;
            if (this.scrollHeight != e && this.refresh(), i >= s) return r != (t = n[n.length - 1]) && this.activate(t);
            if (r && i < o[0]) return this.activeTarget = null, this.clear();
            for (t = o.length; t--;) r != n[t] && i >= o[t] && (void 0 === o[t + 1] || i < o[t + 1]) && this.activate(n[t])
        }, i.prototype.activate = function(i) {
            this.activeTarget = i, this.clear();
            var e = this.selector + '[data-target="' + i + '"],' + this.selector + '[href="' + i + '"]',
                s = t(e).parents("li").addClass("active");
            s.parent(".dropdown-menu").length && (s = s.closest("li.dropdown").addClass("active")), s.trigger("activate.bs.scrollspy")
        }, i.prototype.clear = function() {
            t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
        };
        var s = t.fn.scrollspy;
        t.fn.scrollspy = e, t.fn.scrollspy.Constructor = i, t.fn.scrollspy.noConflict = function() {
            return t.fn.scrollspy = s, this
        }, t(window).on("load.bs.scrollspy.data-api", function() {
            t('[data-spy="scroll"]').each(function() {
                var i = t(this);
                e.call(i, i.data())
            })
        })
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.tab");
                o || s.data("bs.tab", o = new e(this)), "string" == typeof i && o[i]()
            })
        }
        var e = function(i) {
            this.element = t(i)
        };
        e.VERSION = "3.3.4", e.TRANSITION_DURATION = 150, e.prototype.show = function() {
            var i = this.element,
                e = i.closest("ul:not(.dropdown-menu)"),
                s = i.data("target");
            if (s || (s = i.attr("href"), s = s && s.replace(/.*(?=#[^\s]*$)/, "")), !i.parent("li").hasClass("active")) {
                var o = e.find(".active:last a"),
                    n = t.Event("hide.bs.tab", {
                        relatedTarget: i[0]
                    }),
                    r = t.Event("show.bs.tab", {
                        relatedTarget: o[0]
                    });
                if (o.trigger(n), i.trigger(r), !r.isDefaultPrevented() && !n.isDefaultPrevented()) {
                    var a = t(s);
                    this.activate(i.closest("li"), e), this.activate(a, a.parent(), function() {
                        o.trigger({
                            type: "hidden.bs.tab",
                            relatedTarget: i[0]
                        }), i.trigger({
                            type: "shown.bs.tab",
                            relatedTarget: o[0]
                        })
                    })
                }
            }
        }, e.prototype.activate = function(i, s, o) {
            function n() {
                r.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), i.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), a ? (i[0].offsetWidth, i.addClass("in")) : i.removeClass("fade"), i.parent(".dropdown-menu").length && i.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), o && o()
            }
            var r = s.find("> .active"),
                a = o && t.support.transition && (r.length && r.hasClass("fade") || !!s.find("> .fade").length);
            r.length && a ? r.one("bsTransitionEnd", n).emulateTransitionEnd(e.TRANSITION_DURATION) : n(), r.removeClass("in")
        };
        var s = t.fn.tab;
        t.fn.tab = i, t.fn.tab.Constructor = e, t.fn.tab.noConflict = function() {
            return t.fn.tab = s, this
        };
        var o = function(e) {
            e.preventDefault(), i.call(t(this), "show")
        };
        t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', o).on("click.bs.tab.data-api", '[data-toggle="pill"]', o)
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.affix"),
                    n = "object" == typeof i && i;
                o || s.data("bs.affix", o = new e(this, n)), "string" == typeof i && o[i]()
            })
        }
        var e = function(i, s) {
            this.options = t.extend({}, e.DEFAULTS, s), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(i), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
        };
        e.VERSION = "3.3.4", e.RESET = "affix affix-top affix-bottom", e.DEFAULTS = {
            offset: 0,
            target: window
        }, e.prototype.getState = function(t, i, e, s) {
            var o = this.$target.scrollTop(),
                n = this.$element.offset(),
                r = this.$target.height();
            if (null != e && "top" == this.affixed) return e > o && "top";
            if ("bottom" == this.affixed) return null != e ? !(o + this.unpin <= n.top) && "bottom" : !(t - s >= o + r) && "bottom";
            var a = null == this.affixed,
                l = a ? o : n.top,
                h = a ? r : i;
            return null != e && e >= o ? "top" : null != s && l + h >= t - s && "bottom"
        }, e.prototype.getPinnedOffset = function() {
            if (this.pinnedOffset) return this.pinnedOffset;
            this.$element.removeClass(e.RESET).addClass("affix");
            var t = this.$target.scrollTop(),
                i = this.$element.offset();
            return this.pinnedOffset = i.top - t
        }, e.prototype.checkPositionWithEventLoop = function() {
            setTimeout(t.proxy(this.checkPosition, this), 1)
        }, e.prototype.checkPosition = function() {
            if (this.$element.is(":visible")) {
                var i = this.$element.height(),
                    s = this.options.offset,
                    o = s.top,
                    n = s.bottom,
                    r = t(document.body).height();
                "object" != typeof s && (n = o = s), "function" == typeof o && (o = s.top(this.$element)), "function" == typeof n && (n = s.bottom(this.$element));
                var a = this.getState(r, i, o, n);
                if (this.affixed != a) {
                    null != this.unpin && this.$element.css("top", "");
                    var l = "affix" + (a ? "-" + a : ""),
                        h = t.Event(l + ".bs.affix");
                    if (this.$element.trigger(h), h.isDefaultPrevented()) return;
                    this.affixed = a, this.unpin = "bottom" == a ? this.getPinnedOffset() : null, this.$element.removeClass(e.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
                }
                "bottom" == a && this.$element.offset({
                    top: r - i - n
                })
            }
        };
        var s = t.fn.affix;
        t.fn.affix = i, t.fn.affix.Constructor = e, t.fn.affix.noConflict = function() {
            return t.fn.affix = s, this
        }, t(window).on("load", function() {
            t('[data-spy="affix"]').each(function() {
                var e = t(this),
                    s = e.data();
                s.offset = s.offset || {}, null != s.offsetBottom && (s.offset.bottom = s.offsetBottom), null != s.offsetTop && (s.offset.top = s.offsetTop), i.call(e, s)
            })
        })
    }(jQuery), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");
if (+ function(t) {
        "use strict";
        var i = t.fn.jquery.split(" ")[0].split(".");
        if (i[0] < 2 && i[1] < 9 || 1 == i[0] && 9 == i[1] && i[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
    }(jQuery), + function(t) {
        "use strict";

        function i() {
            var t = document.createElement("bootstrap"),
                i = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
            for (var e in i)
                if (void 0 !== t.style[e]) return {
                    end: i[e]
                };
            return !1
        }
        t.fn.emulateTransitionEnd = function(i) {
            var e = !1,
                s = this;
            t(this).one("bsTransitionEnd", function() {
                e = !0
            });
            var o = function() {
                e || t(s).trigger(t.support.transition.end)
            };
            return setTimeout(o, i), this
        }, t(function() {
            t.support.transition = i(), t.support.transition && (t.event.special.bsTransitionEnd = {
                bindType: t.support.transition.end,
                delegateType: t.support.transition.end,
                handle: function(i) {
                    return t(i.target).is(this) ? i.handleObj.handler.apply(this, arguments) : void 0
                }
            })
        })
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var e = t(this),
                    o = e.data("bs.alert");
                o || e.data("bs.alert", o = new s(this)), "string" == typeof i && o[i].call(e)
            })
        }
        var e = '[data-dismiss="alert"]',
            s = function(i) {
                t(i).on("click", e, this.close)
            };
        s.VERSION = "3.3.4", s.TRANSITION_DURATION = 150, s.prototype.close = function(i) {
            function e() {
                r.detach().trigger("closed.bs.alert").remove()
            }
            var o = t(this),
                n = o.attr("data-target");
            n || (n = o.attr("href"), n = n && n.replace(/.*(?=#[^\s]*$)/, ""));
            var r = t(n);
            i && i.preventDefault(), r.length || (r = o.closest(".alert")), r.trigger(i = t.Event("close.bs.alert")), i.isDefaultPrevented() || (r.removeClass("in"), t.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", e).emulateTransitionEnd(s.TRANSITION_DURATION) : e())
        };
        var o = t.fn.alert;
        t.fn.alert = i, t.fn.alert.Constructor = s, t.fn.alert.noConflict = function() {
            return t.fn.alert = o, this
        }, t(document).on("click.bs.alert.data-api", e, s.prototype.close)
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.button"),
                    n = "object" == typeof i && i;
                o || s.data("bs.button", o = new e(this, n)), "toggle" == i ? o.toggle() : i && o.setState(i)
            })
        }
        var e = function(i, s) {
            this.$element = t(i), this.options = t.extend({}, e.DEFAULTS, s), this.isLoading = !1
        };
        e.VERSION = "3.3.4", e.DEFAULTS = {
            loadingText: "loading..."
        }, e.prototype.setState = function(i) {
            var e = "disabled",
                s = this.$element,
                o = s.is("input") ? "val" : "html",
                n = s.data();
            i += "Text", null == n.resetText && s.data("resetText", s[o]()), setTimeout(t.proxy(function() {
                s[o](null == n[i] ? this.options[i] : n[i]), "loadingText" == i ? (this.isLoading = !0, s.addClass(e).attr(e, e)) : this.isLoading && (this.isLoading = !1, s.removeClass(e).removeAttr(e))
            }, this), 0)
        }, e.prototype.toggle = function() {
            var t = !0,
                i = this.$element.closest('[data-toggle="buttons"]');
            if (i.length) {
                var e = this.$element.find("input");
                "radio" == e.prop("type") && (e.prop("checked") && this.$element.hasClass("active") ? t = !1 : i.find(".active").removeClass("active")), t && e.prop("checked", !this.$element.hasClass("active")).trigger("change")
            } else this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
            t && this.$element.toggleClass("active")
        };
        var s = t.fn.button;
        t.fn.button = i, t.fn.button.Constructor = e, t.fn.button.noConflict = function() {
            return t.fn.button = s, this
        }, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(e) {
            var s = t(e.target);
            s.hasClass("btn") || (s = s.closest(".btn")), i.call(s, "toggle"), e.preventDefault()
        }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(i) {
            t(i.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(i.type))
        })
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.carousel"),
                    n = t.extend({}, e.DEFAULTS, s.data(), "object" == typeof i && i),
                    r = "string" == typeof i ? i : n.slide;
                o || s.data("bs.carousel", o = new e(this, n)), "number" == typeof i ? o.to(i) : r ? o[r]() : n.interval && o.pause().cycle()
            })
        }
        var e = function(i, e) {
            this.$element = t(i), this.$indicators = this.$element.find(".carousel-indicators"), this.options = e, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
        };
        e.VERSION = "3.3.4", e.TRANSITION_DURATION = 600, e.DEFAULTS = {
            interval: 5e3,
            pause: "hover",
            wrap: !0,
            keyboard: !0
        }, e.prototype.keydown = function(t) {
            if (!/input|textarea/i.test(t.target.tagName)) {
                switch (t.which) {
                    case 37:
                        this.prev();
                        break;
                    case 39:
                        this.next();
                        break;
                    default:
                        return
                }
                t.preventDefault()
            }
        }, e.prototype.cycle = function(i) {
            return i || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
        }, e.prototype.getItemIndex = function(t) {
            return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
        }, e.prototype.getItemForDirection = function(t, i) {
            var e = this.getItemIndex(i),
                s = "prev" == t && 0 === e || "next" == t && e == this.$items.length - 1;
            if (s && !this.options.wrap) return i;
            var o = "prev" == t ? -1 : 1,
                n = (e + o) % this.$items.length;
            return this.$items.eq(n)
        }, e.prototype.to = function(t) {
            var i = this,
                e = this.getItemIndex(this.$active = this.$element.find(".item.active"));
            return t > this.$items.length - 1 || 0 > t ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
                i.to(t)
            }) : e == t ? this.pause().cycle() : this.slide(t > e ? "next" : "prev", this.$items.eq(t))
        }, e.prototype.pause = function(i) {
            return i || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
        }, e.prototype.next = function() {
            return this.sliding ? void 0 : this.slide("next")
        }, e.prototype.prev = function() {
            return this.sliding ? void 0 : this.slide("prev")
        }, e.prototype.slide = function(i, s) {
            var o = this.$element.find(".item.active"),
                n = s || this.getItemForDirection(i, o),
                r = this.interval,
                a = "next" == i ? "left" : "right",
                l = this;
            if (n.hasClass("active")) return this.sliding = !1;
            var h = n[0],
                c = t.Event("slide.bs.carousel", {
                    relatedTarget: h,
                    direction: a
                });
            if (this.$element.trigger(c), !c.isDefaultPrevented()) {
                if (this.sliding = !0, r && this.pause(), this.$indicators.length) {
                    this.$indicators.find(".active").removeClass("active");
                    var d = t(this.$indicators.children()[this.getItemIndex(n)]);
                    d && d.addClass("active")
                }
                var p = t.Event("slid.bs.carousel", {
                    relatedTarget: h,
                    direction: a
                });
                return t.support.transition && this.$element.hasClass("slide") ? (n.addClass(i), n[0].offsetWidth, o.addClass(a), n.addClass(a), o.one("bsTransitionEnd", function() {
                    n.removeClass([i, a].join(" ")).addClass("active"), o.removeClass(["active", a].join(" ")), l.sliding = !1, setTimeout(function() {
                        l.$element.trigger(p)
                    }, 0)
                }).emulateTransitionEnd(e.TRANSITION_DURATION)) : (o.removeClass("active"), n.addClass("active"), this.sliding = !1, this.$element.trigger(p)), r && this.cycle(), this
            }
        };
        var s = t.fn.carousel;
        t.fn.carousel = i, t.fn.carousel.Constructor = e, t.fn.carousel.noConflict = function() {
            return t.fn.carousel = s, this
        };
        var o = function(e) {
            var s, o = t(this),
                n = t(o.attr("data-target") || (s = o.attr("href")) && s.replace(/.*(?=#[^\s]+$)/, ""));
            if (n.hasClass("carousel")) {
                var r = t.extend({}, n.data(), o.data()),
                    a = o.attr("data-slide-to");
                a && (r.interval = !1), i.call(n, r), a && n.data("bs.carousel").to(a), e.preventDefault()
            }
        };
        t(document).on("click.bs.carousel.data-api", "[data-slide]", o).on("click.bs.carousel.data-api", "[data-slide-to]", o), t(window).on("load", function() {
            t('[data-ride="carousel"]').each(function() {
                var e = t(this);
                i.call(e, e.data())
            })
        })
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            var e, s = i.attr("data-target") || (e = i.attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "");
            return t(s)
        }

        function e(i) {
            return this.each(function() {
                var e = t(this),
                    o = e.data("bs.collapse"),
                    n = t.extend({}, s.DEFAULTS, e.data(), "object" == typeof i && i);
                !o && n.toggle && /show|hide/.test(i) && (n.toggle = !1), o || e.data("bs.collapse", o = new s(this, n)), "string" == typeof i && o[i]()
            })
        }
        var s = function(i, e) {
            this.$element = t(i), this.options = t.extend({}, s.DEFAULTS, e), this.$trigger = t('[data-toggle="collapse"][href="#' + i.id + '"],[data-toggle="collapse"][data-target="#' + i.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
        };
        s.VERSION = "3.3.4", s.TRANSITION_DURATION = 350, s.DEFAULTS = {
            toggle: !0
        }, s.prototype.dimension = function() {
            var t = this.$element.hasClass("width");
            return t ? "width" : "height"
        }, s.prototype.show = function() {
            if (!this.transitioning && !this.$element.hasClass("in")) {
                var i, o = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
                if (!(o && o.length && (i = o.data("bs.collapse"), i && i.transitioning))) {
                    var n = t.Event("show.bs.collapse");
                    if (this.$element.trigger(n), !n.isDefaultPrevented()) {
                        o && o.length && (e.call(o, "hide"), i || o.data("bs.collapse", null));
                        var r = this.dimension();
                        this.$element.removeClass("collapse").addClass("collapsing")[r](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                        var a = function() {
                            this.$element.removeClass("collapsing").addClass("collapse in")[r](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                        };
                        if (!t.support.transition) return a.call(this);
                        var l = t.camelCase(["scroll", r].join("-"));
                        this.$element.one("bsTransitionEnd", t.proxy(a, this)).emulateTransitionEnd(s.TRANSITION_DURATION)[r](this.$element[0][l])
                    }
                }
            }
        }, s.prototype.hide = function() {
            if (!this.transitioning && this.$element.hasClass("in")) {
                var i = t.Event("hide.bs.collapse");
                if (this.$element.trigger(i), !i.isDefaultPrevented()) {
                    var e = this.dimension();
                    this.$element[e](this.$element[e]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                    var o = function() {
                        this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                    };
                    return t.support.transition ? void this.$element[e](0).one("bsTransitionEnd", t.proxy(o, this)).emulateTransitionEnd(s.TRANSITION_DURATION) : o.call(this)
                }
            }
        }, s.prototype.toggle = function() {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        }, s.prototype.getParent = function() {
            return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function(e, s) {
                var o = t(s);
                this.addAriaAndCollapsedClass(i(o), o)
            }, this)).end()
        }, s.prototype.addAriaAndCollapsedClass = function(t, i) {
            var e = t.hasClass("in");
            t.attr("aria-expanded", e), i.toggleClass("collapsed", !e).attr("aria-expanded", e)
        };
        var o = t.fn.collapse;
        t.fn.collapse = e, t.fn.collapse.Constructor = s, t.fn.collapse.noConflict = function() {
            return t.fn.collapse = o, this
        }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(s) {
            var o = t(this);
            o.attr("data-target") || s.preventDefault();
            var n = i(o),
                r = n.data("bs.collapse"),
                a = r ? "toggle" : o.data();
            e.call(n, a)
        })
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            i && 3 === i.which || (t(o).remove(), t(n).each(function() {
                var s = t(this),
                    o = e(s),
                    n = {
                        relatedTarget: this
                    };
                o.hasClass("open") && (o.trigger(i = t.Event("hide.bs.dropdown", n)), i.isDefaultPrevented() || (s.attr("aria-expanded", "false"), o.removeClass("open").trigger("hidden.bs.dropdown", n)))
            }))
        }

        function e(i) {
            var e = i.attr("data-target");
            e || (e = i.attr("href"), e = e && /#[A-Za-z]/.test(e) && e.replace(/.*(?=#[^\s]*$)/, ""));
            var s = e && t(e);
            return s && s.length ? s : i.parent()
        }

        function s(i) {
            return this.each(function() {
                var e = t(this),
                    s = e.data("bs.dropdown");
                s || e.data("bs.dropdown", s = new r(this)), "string" == typeof i && s[i].call(e)
            })
        }
        var o = ".dropdown-backdrop",
            n = '[data-toggle="dropdown"]',
            r = function(i) {
                t(i).on("click.bs.dropdown", this.toggle)
            };
        r.VERSION = "3.3.4", r.prototype.toggle = function(s) {
            var o = t(this);
            if (!o.is(".disabled, :disabled")) {
                var n = e(o),
                    r = n.hasClass("open");
                if (i(), !r) {
                    "ontouchstart" in document.documentElement && !n.closest(".navbar-nav").length && t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click", i);
                    var a = {
                        relatedTarget: this
                    };
                    if (n.trigger(s = t.Event("show.bs.dropdown", a)), s.isDefaultPrevented()) return;
                    o.trigger("focus").attr("aria-expanded", "true"), n.toggleClass("open").trigger("shown.bs.dropdown", a)
                }
                return !1
            }
        }, r.prototype.keydown = function(i) {
            if (/(38|40|27|32)/.test(i.which) && !/input|textarea/i.test(i.target.tagName)) {
                var s = t(this);
                if (i.preventDefault(), i.stopPropagation(), !s.is(".disabled, :disabled")) {
                    var o = e(s),
                        r = o.hasClass("open");
                    if (!r && 27 != i.which || r && 27 == i.which) return 27 == i.which && o.find(n).trigger("focus"), s.trigger("click");
                    var a = " li:not(.disabled):visible a",
                        l = o.find('[role="menu"]' + a + ', [role="listbox"]' + a);
                    if (l.length) {
                        var h = l.index(i.target);
                        38 == i.which && h > 0 && h--, 40 == i.which && h < l.length - 1 && h++, ~h || (h = 0), l.eq(h).trigger("focus")
                    }
                }
            }
        };
        var a = t.fn.dropdown;
        t.fn.dropdown = s, t.fn.dropdown.Constructor = r, t.fn.dropdown.noConflict = function() {
            return t.fn.dropdown = a, this
        }, t(document).on("click.bs.dropdown.data-api", i).on("click.bs.dropdown.data-api", ".dropdown form", function(t) {
            t.stopPropagation()
        }).on("click.bs.dropdown.data-api", n, r.prototype.toggle).on("keydown.bs.dropdown.data-api", n, r.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', r.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', r.prototype.keydown)
    }(jQuery), + function(t) {
        "use strict";

        function i(i, s) {
            return this.each(function() {
                var o = t(this),
                    n = o.data("bs.modal"),
                    r = t.extend({}, e.DEFAULTS, o.data(), "object" == typeof i && i);
                n || o.data("bs.modal", n = new e(this, r)), "string" == typeof i ? n[i](s) : r.show && n.show(s)
            })
        }
        var e = function(i, e) {
            this.options = e, this.$body = t(document.body), this.$element = t(i), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function() {
                this.$element.trigger("loaded.bs.modal")
            }, this))
        };
        e.VERSION = "3.3.4", e.TRANSITION_DURATION = 300, e.BACKDROP_TRANSITION_DURATION = 150, e.DEFAULTS = {
            backdrop: !0,
            keyboard: !0,
            show: !0
        }, e.prototype.toggle = function(t) {
            return this.isShown ? this.hide() : this.show(t)
        }, e.prototype.show = function(i) {
            var s = this,
                o = t.Event("show.bs.modal", {
                    relatedTarget: i
                });
            this.$element.trigger(o), this.isShown || o.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
                s.$element.one("mouseup.dismiss.bs.modal", function(i) {
                    t(i.target).is(s.$element) && (s.ignoreBackdropClick = !0)
                })
            }), this.backdrop(function() {
                var o = t.support.transition && s.$element.hasClass("fade");
                s.$element.parent().length || s.$element.appendTo(s.$body), s.$element.show().scrollTop(0), s.adjustDialog(), o && s.$element[0].offsetWidth, s.$element.addClass("in").attr("aria-hidden", !1), s.enforceFocus();
                var n = t.Event("shown.bs.modal", {
                    relatedTarget: i
                });
                o ? s.$dialog.one("bsTransitionEnd", function() {
                    s.$element.trigger("focus").trigger(n)
                }).emulateTransitionEnd(e.TRANSITION_DURATION) : s.$element.trigger("focus").trigger(n)
            }))
        }, e.prototype.hide = function(i) {
            i && i.preventDefault(), i = t.Event("hide.bs.modal"), this.$element.trigger(i), this.isShown && !i.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(e.TRANSITION_DURATION) : this.hideModal())
        }, e.prototype.enforceFocus = function() {
            t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
                this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
            }, this))
        }, e.prototype.escape = function() {
            this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function(t) {
                27 == t.which && this.hide()
            }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
        }, e.prototype.resize = function() {
            this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
        }, e.prototype.hideModal = function() {
            var t = this;
            this.$element.hide(), this.backdrop(function() {
                t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal")
            })
        }, e.prototype.removeBackdrop = function() {
            this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
        }, e.prototype.backdrop = function(i) {
            var s = this,
                o = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var n = t.support.transition && o;
                if (this.$backdrop = t('<div class="modal-backdrop ' + o + '" />').appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", t.proxy(function(t) {
                        return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                    }, this)), n && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !i) return;
                n ? this.$backdrop.one("bsTransitionEnd", i).emulateTransitionEnd(e.BACKDROP_TRANSITION_DURATION) : i()
            } else if (!this.isShown && this.$backdrop) {
                this.$backdrop.removeClass("in");
                var r = function() {
                    s.removeBackdrop(), i && i()
                };
                t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", r).emulateTransitionEnd(e.BACKDROP_TRANSITION_DURATION) : r()
            } else i && i()
        }, e.prototype.handleUpdate = function() {
            this.adjustDialog()
        }, e.prototype.adjustDialog = function() {
            var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
            this.$element.css({
                paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
                paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
            })
        }, e.prototype.resetAdjustments = function() {
            this.$element.css({
                paddingLeft: "",
                paddingRight: ""
            })
        }, e.prototype.checkScrollbar = function() {
            var t = window.innerWidth;
            if (!t) {
                var i = document.documentElement.getBoundingClientRect();
                t = i.right - Math.abs(i.left)
            }
            this.bodyIsOverflowing = document.body.clientWidth < t, this.scrollbarWidth = this.measureScrollbar()
        }, e.prototype.setScrollbar = function() {
            var t = parseInt(this.$body.css("padding-right") || 0, 10);
            this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
        }, e.prototype.resetScrollbar = function() {
            this.$body.css("padding-right", this.originalBodyPad)
        }, e.prototype.measureScrollbar = function() {
            var t = document.createElement("div");
            t.className = "modal-scrollbar-measure", this.$body.append(t);
            var i = t.offsetWidth - t.clientWidth;
            return this.$body[0].removeChild(t), i
        };
        var s = t.fn.modal;
        t.fn.modal = i, t.fn.modal.Constructor = e, t.fn.modal.noConflict = function() {
            return t.fn.modal = s, this
        }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(e) {
            var s = t(this),
                o = s.attr("href"),
                n = t(s.attr("data-target") || o && o.replace(/.*(?=#[^\s]+$)/, "")),
                r = n.data("bs.modal") ? "toggle" : t.extend({
                    remote: !/#/.test(o) && o
                }, n.data(), s.data());
            s.is("a") && e.preventDefault(), n.one("show.bs.modal", function(t) {
                t.isDefaultPrevented() || n.one("hidden.bs.modal", function() {
                    s.is(":visible") && s.trigger("focus")
                })
            }), i.call(n, r, this)
        })
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.tooltip"),
                    n = "object" == typeof i && i;
                (o || !/destroy|hide/.test(i)) && (o || s.data("bs.tooltip", o = new e(this, n)), "string" == typeof i && o[i]())
            })
        }
        var e = function(t, i) {
            this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.init("tooltip", t, i)
        };
        e.VERSION = "3.3.4", e.TRANSITION_DURATION = 150, e.DEFAULTS = {
            animation: !0,
            placement: "top",
            selector: !1,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            container: !1,
            viewport: {
                selector: "body",
                padding: 0
            }
        }, e.prototype.init = function(i, e, s) {
            if (this.enabled = !0, this.type = i, this.$element = t(e), this.options = this.getOptions(s), this.$viewport = this.options.viewport && t(this.options.viewport.selector || this.options.viewport), this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
            for (var o = this.options.trigger.split(" "), n = o.length; n--;) {
                var r = o[n];
                if ("click" == r) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
                else if ("manual" != r) {
                    var a = "hover" == r ? "mouseenter" : "focusin",
                        l = "hover" == r ? "mouseleave" : "focusout";
                    this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
                }
            }
            this.options.selector ? this._options = t.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        }, e.prototype.getDefaults = function() {
            return e.DEFAULTS
        }, e.prototype.getOptions = function(i) {
            return i = t.extend({}, this.getDefaults(), this.$element.data(), i), i.delay && "number" == typeof i.delay && (i.delay = {
                show: i.delay,
                hide: i.delay
            }), i
        }, e.prototype.getDelegateOptions = function() {
            var i = {},
                e = this.getDefaults();
            return this._options && t.each(this._options, function(t, s) {
                e[t] != s && (i[t] = s)
            }), i
        }, e.prototype.enter = function(i) {
            var e = i instanceof this.constructor ? i : t(i.currentTarget).data("bs." + this.type);
            return e && e.$tip && e.$tip.is(":visible") ? void(e.hoverState = "in") : (e || (e = new this.constructor(i.currentTarget, this.getDelegateOptions()), t(i.currentTarget).data("bs." + this.type, e)), clearTimeout(e.timeout), e.hoverState = "in", e.options.delay && e.options.delay.show ? void(e.timeout = setTimeout(function() {
                "in" == e.hoverState && e.show()
            }, e.options.delay.show)) : e.show())
        }, e.prototype.leave = function(i) {
            var e = i instanceof this.constructor ? i : t(i.currentTarget).data("bs." + this.type);
            return e || (e = new this.constructor(i.currentTarget, this.getDelegateOptions()), t(i.currentTarget).data("bs." + this.type, e)), clearTimeout(e.timeout),
                e.hoverState = "out", e.options.delay && e.options.delay.hide ? void(e.timeout = setTimeout(function() {
                    "out" == e.hoverState && e.hide()
                }, e.options.delay.hide)) : e.hide()
        }, e.prototype.show = function() {
            var i = t.Event("show.bs." + this.type);
            if (this.hasContent() && this.enabled) {
                this.$element.trigger(i);
                var s = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
                if (i.isDefaultPrevented() || !s) return;
                var o = this,
                    n = this.tip(),
                    r = this.getUID(this.type);
                this.setContent(), n.attr("id", r), this.$element.attr("aria-describedby", r), this.options.animation && n.addClass("fade");
                var a = "function" == typeof this.options.placement ? this.options.placement.call(this, n[0], this.$element[0]) : this.options.placement,
                    l = /\s?auto?\s?/i,
                    h = l.test(a);
                h && (a = a.replace(l, "") || "top"), n.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).addClass(a).data("bs." + this.type, this), this.options.container ? n.appendTo(this.options.container) : n.insertAfter(this.$element);
                var c = this.getPosition(),
                    d = n[0].offsetWidth,
                    p = n[0].offsetHeight;
                if (h) {
                    var u = a,
                        f = this.options.container ? t(this.options.container) : this.$element.parent(),
                        v = this.getPosition(f);
                    a = "bottom" == a && c.bottom + p > v.bottom ? "top" : "top" == a && c.top - p < v.top ? "bottom" : "right" == a && c.right + d > v.width ? "left" : "left" == a && c.left - d < v.left ? "right" : a, n.removeClass(u).addClass(a)
                }
                var g = this.getCalculatedOffset(a, c, d, p);
                this.applyPlacement(g, a);
                var m = function() {
                    var t = o.hoverState;
                    o.$element.trigger("shown.bs." + o.type), o.hoverState = null, "out" == t && o.leave(o)
                };
                t.support.transition && this.$tip.hasClass("fade") ? n.one("bsTransitionEnd", m).emulateTransitionEnd(e.TRANSITION_DURATION) : m()
            }
        }, e.prototype.applyPlacement = function(i, e) {
            var s = this.tip(),
                o = s[0].offsetWidth,
                n = s[0].offsetHeight,
                r = parseInt(s.css("margin-top"), 10),
                a = parseInt(s.css("margin-left"), 10);
            isNaN(r) && (r = 0), isNaN(a) && (a = 0), i.top = i.top + r, i.left = i.left + a, t.offset.setOffset(s[0], t.extend({
                using: function(t) {
                    s.css({
                        top: Math.round(t.top),
                        left: Math.round(t.left)
                    })
                }
            }, i), 0), s.addClass("in");
            var l = s[0].offsetWidth,
                h = s[0].offsetHeight;
            "top" == e && h != n && (i.top = i.top + n - h);
            var c = this.getViewportAdjustedDelta(e, i, l, h);
            c.left ? i.left += c.left : i.top += c.top;
            var d = /top|bottom/.test(e),
                p = d ? 2 * c.left - o + l : 2 * c.top - n + h,
                u = d ? "offsetWidth" : "offsetHeight";
            s.offset(i), this.replaceArrow(p, s[0][u], d)
        }, e.prototype.replaceArrow = function(t, i, e) {
            this.arrow().css(e ? "left" : "top", 50 * (1 - t / i) + "%").css(e ? "top" : "left", "")
        }, e.prototype.setContent = function() {
            var t = this.tip(),
                i = this.getTitle();
            t.find(".tooltip-inner")[this.options.html ? "html" : "text"](i), t.removeClass("fade in top bottom left right")
        }, e.prototype.hide = function(i) {
            function s() {
                "in" != o.hoverState && n.detach(), o.$element.removeAttr("aria-describedby").trigger("hidden.bs." + o.type), i && i()
            }
            var o = this,
                n = t(this.$tip),
                r = t.Event("hide.bs." + this.type);
            return this.$element.trigger(r), r.isDefaultPrevented() ? void 0 : (n.removeClass("in"), t.support.transition && n.hasClass("fade") ? n.one("bsTransitionEnd", s).emulateTransitionEnd(e.TRANSITION_DURATION) : s(), this.hoverState = null, this)
        }, e.prototype.fixTitle = function() {
            var t = this.$element;
            (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
        }, e.prototype.hasContent = function() {
            return this.getTitle()
        }, e.prototype.getPosition = function(i) {
            i = i || this.$element;
            var e = i[0],
                s = "BODY" == e.tagName,
                o = e.getBoundingClientRect();
            null == o.width && (o = t.extend({}, o, {
                width: o.right - o.left,
                height: o.bottom - o.top
            }));
            var n = s ? {
                    top: 0,
                    left: 0
                } : i.offset(),
                r = {
                    scroll: s ? document.documentElement.scrollTop || document.body.scrollTop : i.scrollTop()
                },
                a = s ? {
                    width: t(window).width(),
                    height: t(window).height()
                } : null;
            return t.extend({}, o, r, a, n)
        }, e.prototype.getCalculatedOffset = function(t, i, e, s) {
            return "bottom" == t ? {
                top: i.top + i.height,
                left: i.left + i.width / 2 - e / 2
            } : "top" == t ? {
                top: i.top - s,
                left: i.left + i.width / 2 - e / 2
            } : "left" == t ? {
                top: i.top + i.height / 2 - s / 2,
                left: i.left - e
            } : {
                top: i.top + i.height / 2 - s / 2,
                left: i.left + i.width
            }
        }, e.prototype.getViewportAdjustedDelta = function(t, i, e, s) {
            var o = {
                top: 0,
                left: 0
            };
            if (!this.$viewport) return o;
            var n = this.options.viewport && this.options.viewport.padding || 0,
                r = this.getPosition(this.$viewport);
            if (/right|left/.test(t)) {
                var a = i.top - n - r.scroll,
                    l = i.top + n - r.scroll + s;
                a < r.top ? o.top = r.top - a : l > r.top + r.height && (o.top = r.top + r.height - l)
            } else {
                var h = i.left - n,
                    c = i.left + n + e;
                h < r.left ? o.left = r.left - h : c > r.width && (o.left = r.left + r.width - c)
            }
            return o
        }, e.prototype.getTitle = function() {
            var t, i = this.$element,
                e = this.options;
            return t = i.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(i[0]) : e.title)
        }, e.prototype.getUID = function(t) {
            do t += ~~(1e6 * Math.random()); while (document.getElementById(t));
            return t
        }, e.prototype.tip = function() {
            return this.$tip = this.$tip || t(this.options.template)
        }, e.prototype.arrow = function() {
            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
        }, e.prototype.enable = function() {
            this.enabled = !0
        }, e.prototype.disable = function() {
            this.enabled = !1
        }, e.prototype.toggleEnabled = function() {
            this.enabled = !this.enabled
        }, e.prototype.toggle = function(i) {
            var e = this;
            i && (e = t(i.currentTarget).data("bs." + this.type), e || (e = new this.constructor(i.currentTarget, this.getDelegateOptions()), t(i.currentTarget).data("bs." + this.type, e))), e.tip().hasClass("in") ? e.leave(e) : e.enter(e)
        }, e.prototype.destroy = function() {
            var t = this;
            clearTimeout(this.timeout), this.hide(function() {
                t.$element.off("." + t.type).removeData("bs." + t.type)
            })
        };
        var s = t.fn.tooltip;
        t.fn.tooltip = i, t.fn.tooltip.Constructor = e, t.fn.tooltip.noConflict = function() {
            return t.fn.tooltip = s, this
        }
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.popover"),
                    n = "object" == typeof i && i;
                (o || !/destroy|hide/.test(i)) && (o || s.data("bs.popover", o = new e(this, n)), "string" == typeof i && o[i]())
            })
        }
        var e = function(t, i) {
            this.init("popover", t, i)
        };
        if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
        e.VERSION = "3.3.4", e.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
        }), e.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), e.prototype.constructor = e, e.prototype.getDefaults = function() {
            return e.DEFAULTS
        }, e.prototype.setContent = function() {
            var t = this.tip(),
                i = this.getTitle(),
                e = this.getContent();
            t.find(".popover-title")[this.options.html ? "html" : "text"](i), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof e ? "html" : "append" : "text"](e), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
        }, e.prototype.hasContent = function() {
            return this.getTitle() || this.getContent()
        }, e.prototype.getContent = function() {
            var t = this.$element,
                i = this.options;
            return t.attr("data-content") || ("function" == typeof i.content ? i.content.call(t[0]) : i.content)
        }, e.prototype.arrow = function() {
            return this.$arrow = this.$arrow || this.tip().find(".arrow")
        };
        var s = t.fn.popover;
        t.fn.popover = i, t.fn.popover.Constructor = e, t.fn.popover.noConflict = function() {
            return t.fn.popover = s, this
        }
    }(jQuery), + function(t) {
        "use strict";

        function i(e, s) {
            this.$body = t(document.body), this.$scrollElement = t(t(e).is(document.body) ? window : e), this.options = t.extend({}, i.DEFAULTS, s), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", t.proxy(this.process, this)), this.refresh(), this.process()
        }

        function e(e) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.scrollspy"),
                    n = "object" == typeof e && e;
                o || s.data("bs.scrollspy", o = new i(this, n)), "string" == typeof e && o[e]()
            })
        }
        i.VERSION = "3.3.4", i.DEFAULTS = {
            offset: 10
        }, i.prototype.getScrollHeight = function() {
            return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
        }, i.prototype.refresh = function() {
            var i = this,
                e = "offset",
                s = 0;
            this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), t.isWindow(this.$scrollElement[0]) || (e = "position", s = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
                var i = t(this),
                    o = i.data("target") || i.attr("href"),
                    n = /^#./.test(o) && t(o);
                return n && n.length && n.is(":visible") && [
                    [n[e]().top + s, o]
                ] || null
            }).sort(function(t, i) {
                return t[0] - i[0]
            }).each(function() {
                i.offsets.push(this[0]), i.targets.push(this[1])
            })
        }, i.prototype.process = function() {
            var t, i = this.$scrollElement.scrollTop() + this.options.offset,
                e = this.getScrollHeight(),
                s = this.options.offset + e - this.$scrollElement.height(),
                o = this.offsets,
                n = this.targets,
                r = this.activeTarget;
            if (this.scrollHeight != e && this.refresh(), i >= s) return r != (t = n[n.length - 1]) && this.activate(t);
            if (r && i < o[0]) return this.activeTarget = null, this.clear();
            for (t = o.length; t--;) r != n[t] && i >= o[t] && (void 0 === o[t + 1] || i < o[t + 1]) && this.activate(n[t])
        }, i.prototype.activate = function(i) {
            this.activeTarget = i, this.clear();
            var e = this.selector + '[data-target="' + i + '"],' + this.selector + '[href="' + i + '"]',
                s = t(e).parents("li").addClass("active");
            s.parent(".dropdown-menu").length && (s = s.closest("li.dropdown").addClass("active")), s.trigger("activate.bs.scrollspy")
        }, i.prototype.clear = function() {
            t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
        };
        var s = t.fn.scrollspy;
        t.fn.scrollspy = e, t.fn.scrollspy.Constructor = i, t.fn.scrollspy.noConflict = function() {
            return t.fn.scrollspy = s, this
        }, t(window).on("load.bs.scrollspy.data-api", function() {
            t('[data-spy="scroll"]').each(function() {
                var i = t(this);
                e.call(i, i.data())
            })
        })
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.tab");
                o || s.data("bs.tab", o = new e(this)), "string" == typeof i && o[i]()
            })
        }
        var e = function(i) {
            this.element = t(i)
        };
        e.VERSION = "3.3.4", e.TRANSITION_DURATION = 150, e.prototype.show = function() {
            var i = this.element,
                e = i.closest("ul:not(.dropdown-menu)"),
                s = i.data("target");
            if (s || (s = i.attr("href"), s = s && s.replace(/.*(?=#[^\s]*$)/, "")), !i.parent("li").hasClass("active")) {
                var o = e.find(".active:last a"),
                    n = t.Event("hide.bs.tab", {
                        relatedTarget: i[0]
                    }),
                    r = t.Event("show.bs.tab", {
                        relatedTarget: o[0]
                    });
                if (o.trigger(n), i.trigger(r), !r.isDefaultPrevented() && !n.isDefaultPrevented()) {
                    var a = t(s);
                    this.activate(i.closest("li"), e), this.activate(a, a.parent(), function() {
                        o.trigger({
                            type: "hidden.bs.tab",
                            relatedTarget: i[0]
                        }), i.trigger({
                            type: "shown.bs.tab",
                            relatedTarget: o[0]
                        })
                    })
                }
            }
        }, e.prototype.activate = function(i, s, o) {
            function n() {
                r.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), i.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), a ? (i[0].offsetWidth, i.addClass("in")) : i.removeClass("fade"), i.parent(".dropdown-menu").length && i.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), o && o()
            }
            var r = s.find("> .active"),
                a = o && t.support.transition && (r.length && r.hasClass("fade") || !!s.find("> .fade").length);
            r.length && a ? r.one("bsTransitionEnd", n).emulateTransitionEnd(e.TRANSITION_DURATION) : n(), r.removeClass("in")
        };
        var s = t.fn.tab;
        t.fn.tab = i, t.fn.tab.Constructor = e, t.fn.tab.noConflict = function() {
            return t.fn.tab = s, this
        };
        var o = function(e) {
            e.preventDefault(), i.call(t(this), "show")
        };
        t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', o).on("click.bs.tab.data-api", '[data-toggle="pill"]', o)
    }(jQuery), + function(t) {
        "use strict";

        function i(i) {
            return this.each(function() {
                var s = t(this),
                    o = s.data("bs.affix"),
                    n = "object" == typeof i && i;
                o || s.data("bs.affix", o = new e(this, n)), "string" == typeof i && o[i]()
            })
        }
        var e = function(i, s) {
            this.options = t.extend({}, e.DEFAULTS, s), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(i), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
        };
        e.VERSION = "3.3.4", e.RESET = "affix affix-top affix-bottom", e.DEFAULTS = {
            offset: 0,
            target: window
        }, e.prototype.getState = function(t, i, e, s) {
            var o = this.$target.scrollTop(),
                n = this.$element.offset(),
                r = this.$target.height();
            if (null != e && "top" == this.affixed) return e > o && "top";
            if ("bottom" == this.affixed) return null != e ? !(o + this.unpin <= n.top) && "bottom" : !(t - s >= o + r) && "bottom";
            var a = null == this.affixed,
                l = a ? o : n.top,
                h = a ? r : i;
            return null != e && e >= o ? "top" : null != s && l + h >= t - s && "bottom"
        }, e.prototype.getPinnedOffset = function() {
            if (this.pinnedOffset) return this.pinnedOffset;
            this.$element.removeClass(e.RESET).addClass("affix");
            var t = this.$target.scrollTop(),
                i = this.$element.offset();
            return this.pinnedOffset = i.top - t
        }, e.prototype.checkPositionWithEventLoop = function() {
            setTimeout(t.proxy(this.checkPosition, this), 1)
        }, e.prototype.checkPosition = function() {
            if (this.$element.is(":visible")) {
                var i = this.$element.height(),
                    s = this.options.offset,
                    o = s.top,
                    n = s.bottom,
                    r = t(document.body).height();
                "object" != typeof s && (n = o = s), "function" == typeof o && (o = s.top(this.$element)), "function" == typeof n && (n = s.bottom(this.$element));
                var a = this.getState(r, i, o, n);
                if (this.affixed != a) {
                    null != this.unpin && this.$element.css("top", "");
                    var l = "affix" + (a ? "-" + a : ""),
                        h = t.Event(l + ".bs.affix");
                    if (this.$element.trigger(h), h.isDefaultPrevented()) return;
                    this.affixed = a, this.unpin = "bottom" == a ? this.getPinnedOffset() : null, this.$element.removeClass(e.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
                }
                "bottom" == a && this.$element.offset({
                    top: r - i - n
                })
            }
        };
        var s = t.fn.affix;
        t.fn.affix = i, t.fn.affix.Constructor = e, t.fn.affix.noConflict = function() {
            return t.fn.affix = s, this
        }, t(window).on("load", function() {
            t('[data-spy="affix"]').each(function() {
                var e = t(this),
                    s = e.data();
                s.offset = s.offset || {}, null != s.offsetBottom && (s.offset.bottom = s.offsetBottom), null != s.offsetTop && (s.offset.top = s.offsetTop), i.call(e, s)
            })
        })
    }(jQuery), function(t, i, e) {
        function s(t, e) {
            this.wrapper = "string" == typeof t ? i.querySelector(t) : t, this.scroller = this.wrapper.children[0], this.scrollerStyle = this.scroller.style, this.options = {
                resizeScrollbars: !0,
                mouseWheelSpeed: 20,
                snapThreshold: .334,
                startX: 0,
                startY: 0,
                scrollY: !0,
                directionLockThreshold: 5,
                momentum: !0,
                bounce: !0,
                bounceTime: 600,
                bounceEasing: "",
                preventDefault: !0,
                preventDefaultException: {
                    tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
                },
                HWCompositing: !0,
                useTransition: !0,
                useTransform: !0
            };
            for (var s in e) this.options[s] = e[s];
            this.translateZ = this.options.HWCompositing && a.hasPerspective ? " translateZ(0)" : "", this.options.useTransition = a.hasTransition && this.options.useTransition, this.options.useTransform = a.hasTransform && this.options.useTransform, this.options.eventPassthrough = this.options.eventPassthrough === !0 ? "vertical" : this.options.eventPassthrough, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollY = "vertical" != this.options.eventPassthrough && this.options.scrollY, this.options.scrollX = "horizontal" != this.options.eventPassthrough && this.options.scrollX, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? a.ease[this.options.bounceEasing] || a.ease.circular : this.options.bounceEasing, this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling, this.options.tap === !0 && (this.options.tap = "tap"), "scale" == this.options.shrinkScrollbars && (this.options.useTransition = !1), this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1, this.x = 0, this.y = 0, this.directionX = 0, this.directionY = 0, this._events = {}, this._init(), this.refresh(), this.scrollTo(this.options.startX, this.options.startY), this.enable()
        }

        function o(t, e, s) {
            var o = i.createElement("div"),
                n = i.createElement("div");
            return s === !0 && (o.style.cssText = "position:absolute;z-index:9999", n.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"), n.className = "iScrollIndicator", "h" == t ? (s === !0 && (o.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", n.style.height = "100%"), o.className = "iScrollHorizontalScrollbar") : (s === !0 && (o.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", n.style.width = "100%"), o.className = "iScrollVerticalScrollbar"), o.style.cssText += ";overflow:hidden", e || (o.style.pointerEvents = "none"), o.appendChild(n), o
        }

        function n(e, s) {
            this.wrapper = "string" == typeof s.el ? i.querySelector(s.el) : s.el, this.wrapperStyle = this.wrapper.style, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = e, this.options = {
                listenX: !0,
                listenY: !0,
                interactive: !1,
                resize: !0,
                defaultScrollbars: !1,
                shrink: !1,
                fade: !1,
                speedRatioX: 0,
                speedRatioY: 0
            };
            for (var o in s) this.options[o] = s[o];
            this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.options.interactive && (this.options.disableTouch || (a.addEvent(this.indicator, "touchstart", this), a.addEvent(t, "touchend", this)), this.options.disablePointer || (a.addEvent(this.indicator, a.prefixPointerEvent("pointerdown"), this), a.addEvent(t, a.prefixPointerEvent("pointerup"), this)), this.options.disableMouse || (a.addEvent(this.indicator, "mousedown", this), a.addEvent(t, "mouseup", this))), this.options.fade && (this.wrapperStyle[a.style.transform] = this.scroller.translateZ, this.wrapperStyle[a.style.transitionDuration] = a.isBadAndroid ? "0.001s" : "0ms", this.wrapperStyle.opacity = "0")
        }
        var r = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame || function(i) {
                t.setTimeout(i, 1e3 / 60)
            },
            a = function() {
                function s(t) {
                    return r !== !1 && ("" === r ? t : r + t.charAt(0).toUpperCase() + t.substr(1))
                }
                var o = {},
                    n = i.createElement("div").style,
                    r = function() {
                        for (var t, i = ["t", "webkitT", "MozT", "msT", "OT"], e = 0, s = i.length; e < s; e++)
                            if (t = i[e] + "ransform", t in n) return i[e].substr(0, i[e].length - 1);
                        return !1
                    }();
                o.getTime = Date.now || function() {
                    return (new Date).getTime()
                }, o.extend = function(t, i) {
                    for (var e in i) t[e] = i[e]
                }, o.addEvent = function(t, i, e, s) {
                    t.addEventListener(i, e, !!s)
                }, o.removeEvent = function(t, i, e, s) {
                    t.removeEventListener(i, e, !!s)
                }, o.prefixPointerEvent = function(i) {
                    return t.MSPointerEvent ? "MSPointer" + i.charAt(9).toUpperCase() + i.substr(10) : i
                }, o.momentum = function(t, i, s, o, n, r) {
                    var a, l, h = t - i,
                        c = e.abs(h) / s;
                    return r = void 0 === r ? 6e-4 : r, a = t + c * c / (2 * r) * (h < 0 ? -1 : 1), l = c / r, a < o ? (a = n ? o - n / 2.5 * (c / 8) : o, h = e.abs(a - t), l = h / c) : a > 0 && (a = n ? n / 2.5 * (c / 8) : 0, h = e.abs(t) + a, l = h / c), {
                        destination: e.round(a),
                        duration: l
                    }
                };
                var a = s("transform");
                return o.extend(o, {
                    hasTransform: a !== !1,
                    hasPerspective: s("perspective") in n,
                    hasTouch: "ontouchstart" in t,
                    hasPointer: t.PointerEvent || t.MSPointerEvent,
                    hasTransition: s("transition") in n
                }), o.isBadAndroid = /Android /.test(t.navigator.appVersion) && !/Chrome\/\d/.test(t.navigator.appVersion), o.extend(o.style = {}, {
                    transform: a,
                    transitionTimingFunction: s("transitionTimingFunction"),
                    transitionDuration: s("transitionDuration"),
                    transitionDelay: s("transitionDelay"),
                    transformOrigin: s("transformOrigin")
                }), o.hasClass = function(t, i) {
                    var e = new RegExp("(^|\\s)" + i + "(\\s|$)");
                    return e.test(t.className)
                }, o.addClass = function(t, i) {
                    if (!o.hasClass(t, i)) {
                        var e = t.className.split(" ");
                        e.push(i), t.className = e.join(" ")
                    }
                }, o.removeClass = function(t, i) {
                    if (o.hasClass(t, i)) {
                        var e = new RegExp("(^|\\s)" + i + "(\\s|$)", "g");
                        t.className = t.className.replace(e, " ")
                    }
                }, o.offset = function(t) {
                    for (var i = -t.offsetLeft, e = -t.offsetTop; t = t.offsetParent;) i -= t.offsetLeft, e -= t.offsetTop;
                    return {
                        left: i,
                        top: e
                    }
                }, o.preventDefaultException = function(t, i) {
                    for (var e in i)
                        if (i[e].test(t[e])) return !0;
                    return !1
                }, o.extend(o.eventType = {}, {
                    touchstart: 1,
                    touchmove: 1,
                    touchend: 1,
                    mousedown: 2,
                    mousemove: 2,
                    mouseup: 2,
                    pointerdown: 3,
                    pointermove: 3,
                    pointerup: 3,
                    MSPointerDown: 3,
                    MSPointerMove: 3,
                    MSPointerUp: 3
                }), o.extend(o.ease = {}, {
                    quadratic: {
                        style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        fn: function(t) {
                            return t * (2 - t)
                        }
                    },
                    circular: {
                        style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
                        fn: function(t) {
                            return e.sqrt(1 - --t * t)
                        }
                    },
                    back: {
                        style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        fn: function(t) {
                            var i = 4;
                            return (t -= 1) * t * ((i + 1) * t + i) + 1
                        }
                    },
                    bounce: {
                        style: "",
                        fn: function(t) {
                            return (t /= 1) < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                        }
                    },
                    elastic: {
                        style: "",
                        fn: function(t) {
                            var i = .22,
                                s = .4;
                            return 0 === t ? 0 : 1 == t ? 1 : s * e.pow(2, -10 * t) * e.sin((t - i / 4) * (2 * e.PI) / i) + 1
                        }
                    }
                }), o.tap = function(t, e) {
                    var s = i.createEvent("Event");
                    s.initEvent(e, !0, !0), s.pageX = t.pageX, s.pageY = t.pageY, t.target.dispatchEvent(s)
                }, o.click = function(t) {
                    var e, s = t.target;
                    /(SELECT|INPUT|TEXTAREA)/i.test(s.tagName) || (e = i.createEvent("MouseEvents"), e.initMouseEvent("click", !0, !0, t.view, 1, s.screenX, s.screenY, s.clientX, s.clientY, t.ctrlKey, t.altKey, t.shiftKey, t.metaKey, 0, null), e._constructed = !0, s.dispatchEvent(e))
                }, o
            }();
        s.prototype = {
            version: "5.1.3",
            _init: function() {
                this._initEvents(), (this.options.scrollbars || this.options.indicators) && this._initIndicators(), this.options.mouseWheel && this._initWheel(), this.options.snap && this._initSnap(), this.options.keyBindings && this._initKeys()
            },
            destroy: function() {
                this._initEvents(!0), this._execEvent("destroy")
            },
            _transitionEnd: function(t) {
                t.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, this._execEvent("scrollEnd")))
            },
            _start: function(t) {
                if ((1 == a.eventType[t.type] || 0 === t.button) && this.enabled && (!this.initiated || a.eventType[t.type] === this.initiated)) {
                    !this.options.preventDefault || a.isBadAndroid || a.preventDefaultException(t.target, this.options.preventDefaultException) || t.preventDefault();
                    var i, s = t.touches ? t.touches[0] : t;
                    this.initiated = a.eventType[t.type], this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.directionLocked = 0, this._transitionTime(), this.startTime = a.getTime(), this.options.useTransition && this.isInTransition ? (this.isInTransition = !1, i = this.getComputedPosition(), this._translate(e.round(i.x), e.round(i.y)), this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this._execEvent("scrollEnd")), this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = s.pageX, this.pointY = s.pageY, this._execEvent("beforeScrollStart")
                }
            },
            _move: function(t) {
                if (this.enabled && a.eventType[t.type] === this.initiated) {
                    this.options.preventDefault && t.preventDefault();
                    var i, s, o, n, r = t.touches ? t.touches[0] : t,
                        l = r.pageX - this.pointX,
                        h = r.pageY - this.pointY,
                        c = a.getTime();
                    if (this.pointX = r.pageX, this.pointY = r.pageY, this.distX += l, this.distY += h, o = e.abs(this.distX), n = e.abs(this.distY), !(c - this.endTime > 300 && o < 10 && n < 10)) {
                        if (this.directionLocked || this.options.freeScroll || (o > n + this.options.directionLockThreshold ? this.directionLocked = "h" : n >= o + this.options.directionLockThreshold ? this.directionLocked = "v" : this.directionLocked = "n"), "h" == this.directionLocked) {
                            if ("vertical" == this.options.eventPassthrough) t.preventDefault();
                            else if ("horizontal" == this.options.eventPassthrough) return void(this.initiated = !1);
                            h = 0
                        } else if ("v" == this.directionLocked) {
                            if ("horizontal" == this.options.eventPassthrough) t.preventDefault();
                            else if ("vertical" == this.options.eventPassthrough) return void(this.initiated = !1);
                            l = 0
                        }
                        l = this.hasHorizontalScroll ? l : 0, h = this.hasVerticalScroll ? h : 0, i = this.x + l, s = this.y + h, (i > 0 || i < this.maxScrollX) && (i = this.options.bounce ? this.x + l / 3 : i > 0 ? 0 : this.maxScrollX), (s > 0 || s < this.maxScrollY) && (s = this.options.bounce ? this.y + h / 3 : s > 0 ? 0 : this.maxScrollY), this.directionX = l > 0 ? -1 : l < 0 ? 1 : 0, this.directionY = h > 0 ? -1 : h < 0 ? 1 : 0, this.moved || this._execEvent("scrollStart"), this.moved = !0, this._translate(i, s), c - this.startTime > 300 && (this.startTime = c, this.startX = this.x, this.startY = this.y)
                    }
                }
            },
            _end: function(t) {
                if (this.enabled && a.eventType[t.type] === this.initiated) {
                    this.options.preventDefault && !a.preventDefaultException(t.target, this.options.preventDefaultException) && t.preventDefault();
                    var i, s, o = (t.changedTouches ? t.changedTouches[0] : t, a.getTime() - this.startTime),
                        n = e.round(this.x),
                        r = e.round(this.y),
                        l = e.abs(n - this.startX),
                        h = e.abs(r - this.startY),
                        c = 0,
                        d = "";
                    if (this.isInTransition = 0, this.initiated = 0, this.endTime = a.getTime(), !this.resetPosition(this.options.bounceTime)) {
                        if (this.scrollTo(n, r), !this.moved) return this.options.tap && a.tap(t, this.options.tap), this.options.click && a.click(t), void this._execEvent("scrollCancel");
                        if (this._events.flick && o < 200 && l < 100 && h < 100) return void this._execEvent("flick");
                        if (this.options.momentum && o < 300 && (i = this.hasHorizontalScroll ? a.momentum(this.x, this.startX, o, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
                                destination: n,
                                duration: 0
                            }, s = this.hasVerticalScroll ? a.momentum(this.y, this.startY, o, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
                                destination: r,
                                duration: 0
                            }, n = i.destination, r = s.destination, c = e.max(i.duration, s.duration), this.isInTransition = 1), this.options.snap) {
                            var p = this._nearestSnap(n, r);
                            this.currentPage = p, c = this.options.snapSpeed || e.max(e.max(e.min(e.abs(n - p.x), 1e3), e.min(e.abs(r - p.y), 1e3)), 300), n = p.x, r = p.y, this.directionX = 0, this.directionY = 0, d = this.options.bounceEasing
                        }
                        return n != this.x || r != this.y ? ((n > 0 || n < this.maxScrollX || r > 0 || r < this.maxScrollY) && (d = a.ease.quadratic), void this.scrollTo(n, r, c, d)) : void this._execEvent("scrollEnd")
                    }
                }
            },
            _resize: function() {
                var t = this;
                clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() {
                    t.refresh()
                }, this.options.resizePolling)
            },
            resetPosition: function(t) {
                var i = this.x,
                    e = this.y;
                return t = t || 0, !this.hasHorizontalScroll || this.x > 0 ? i = 0 : this.x < this.maxScrollX && (i = this.maxScrollX), !this.hasVerticalScroll || this.y > 0 ? e = 0 : this.y < this.maxScrollY && (e = this.maxScrollY), (i != this.x || e != this.y) && (this.scrollTo(i, e, t, this.options.bounceEasing), !0)
            },
            disable: function() {
                this.enabled = !1
            },
            enable: function() {
                this.enabled = !0
            },
            refresh: function() {
                this.wrapper.offsetHeight, this.wrapperWidth = this.wrapper.clientWidth, this.wrapperHeight = this.wrapper.clientHeight, this.scrollerWidth = this.scroller.offsetWidth, this.scrollerHeight = this.scroller.offsetHeight, this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.maxScrollY = this.wrapperHeight - this.scrollerHeight, this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, this.wrapperOffset = a.offset(this.wrapper), this._execEvent("refresh"), this.resetPosition()
            },
            on: function(t, i) {
                this._events[t] || (this._events[t] = []), this._events[t].push(i)
            },
            off: function(t, i) {
                if (this._events[t]) {
                    var e = this._events[t].indexOf(i);
                    e > -1 && this._events[t].splice(e, 1)
                }
            },
            _execEvent: function(t) {
                if (this._events[t]) {
                    var i = 0,
                        e = this._events[t].length;
                    if (e)
                        for (; i < e; i++) this._events[t][i].apply(this, [].slice.call(arguments, 1))
                }
            },
            scrollBy: function(t, i, e, s) {
                t = this.x + t, i = this.y + i, e = e || 0, this.scrollTo(t, i, e, s)
            },
            scrollTo: function(t, i, e, s) {
                s = s || a.ease.circular, this.isInTransition = this.options.useTransition && e > 0, !e || this.options.useTransition && s.style ? (this._transitionTimingFunction(s.style), this._transitionTime(e), this._translate(t, i)) : this._animate(t, i, e, s.fn)
            },
            scrollToElement: function(t, i, s, o, n) {
                if (t = t.nodeType ? t : this.scroller.querySelector(t)) {
                    var r = a.offset(t);
                    r.left -= this.wrapperOffset.left, r.top -= this.wrapperOffset.top, s === !0 && (s = e.round(t.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), o === !0 && (o = e.round(t.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), r.left -= s || 0, r.top -= o || 0, r.left = r.left > 0 ? 0 : r.left < this.maxScrollX ? this.maxScrollX : r.left, r.top = r.top > 0 ? 0 : r.top < this.maxScrollY ? this.maxScrollY : r.top, i = void 0 === i || null === i || "auto" === i ? e.max(e.abs(this.x - r.left), e.abs(this.y - r.top)) : i, this.scrollTo(r.left, r.top, i, n)
                }
            },
            _transitionTime: function(t) {
                if (t = t || 0, this.scrollerStyle[a.style.transitionDuration] = t + "ms", !t && a.isBadAndroid && (this.scrollerStyle[a.style.transitionDuration] = "0.001s"), this.indicators)
                    for (var i = this.indicators.length; i--;) this.indicators[i].transitionTime(t)
            },
            _transitionTimingFunction: function(t) {
                if (this.scrollerStyle[a.style.transitionTimingFunction] = t, this.indicators)
                    for (var i = this.indicators.length; i--;) this.indicators[i].transitionTimingFunction(t)
            },
            _translate: function(t, i) {
                if (this.options.useTransform ? this.scrollerStyle[a.style.transform] = "translate(" + t + "px," + i + "px)" + this.translateZ : (t = e.round(t), i = e.round(i), this.scrollerStyle.left = t + "px", this.scrollerStyle.top = i + "px"), this.x = t, this.y = i, this.indicators)
                    for (var s = this.indicators.length; s--;) this.indicators[s].updatePosition()
            },
            _initEvents: function(i) {
                var e = i ? a.removeEvent : a.addEvent,
                    s = this.options.bindToWrapper ? this.wrapper : t;
                e(t, "orientationchange", this), e(t, "resize", this), this.options.click && e(this.wrapper, "click", this, !0), this.options.disableMouse || (e(this.wrapper, "mousedown", this), e(s, "mousemove", this), e(s, "mousecancel", this), e(s, "mouseup", this)), a.hasPointer && !this.options.disablePointer && (e(this.wrapper, a.prefixPointerEvent("pointerdown"), this), e(s, a.prefixPointerEvent("pointermove"), this), e(s, a.prefixPointerEvent("pointercancel"), this), e(s, a.prefixPointerEvent("pointerup"), this)), a.hasTouch && !this.options.disableTouch && (e(this.wrapper, "touchstart", this), e(s, "touchmove", this), e(s, "touchcancel", this), e(s, "touchend", this)), e(this.scroller, "transitionend", this), e(this.scroller, "webkitTransitionEnd", this), e(this.scroller, "oTransitionEnd", this), e(this.scroller, "MSTransitionEnd", this)
            },
            getComputedPosition: function() {
                var i, e, s = t.getComputedStyle(this.scroller, null);
                return this.options.useTransform ? (s = s[a.style.transform].split(")")[0].split(", "), i = +(s[12] || s[4]), e = +(s[13] || s[5])) : (i = +s.left.replace(/[^-\d.]/g, ""), e = +s.top.replace(/[^-\d.]/g, "")), {
                    x: i,
                    y: e
                }
            },
            _initIndicators: function() {
                function t(t) {
                    for (var i = a.indicators.length; i--;) t.call(a.indicators[i])
                }
                var i, e = this.options.interactiveScrollbars,
                    s = "string" != typeof this.options.scrollbars,
                    r = [],
                    a = this;
                this.indicators = [], this.options.scrollbars && (this.options.scrollY && (i = {
                    el: o("v", e, this.options.scrollbars),
                    interactive: e,
                    defaultScrollbars: !0,
                    customStyle: s,
                    resize: this.options.resizeScrollbars,
                    shrink: this.options.shrinkScrollbars,
                    fade: this.options.fadeScrollbars,
                    listenX: !1
                }, this.wrapper.appendChild(i.el), r.push(i)), this.options.scrollX && (i = {
                    el: o("h", e, this.options.scrollbars),
                    interactive: e,
                    defaultScrollbars: !0,
                    customStyle: s,
                    resize: this.options.resizeScrollbars,
                    shrink: this.options.shrinkScrollbars,
                    fade: this.options.fadeScrollbars,
                    listenY: !1
                }, this.wrapper.appendChild(i.el), r.push(i))), this.options.indicators && (r = r.concat(this.options.indicators));
                for (var l = r.length; l--;) this.indicators.push(new n(this, r[l]));
                this.options.fadeScrollbars && (this.on("scrollEnd", function() {
                    t(function() {
                        this.fade()
                    })
                }), this.on("scrollCancel", function() {
                    t(function() {
                        this.fade()
                    })
                }), this.on("scrollStart", function() {
                    t(function() {
                        this.fade(1)
                    })
                }), this.on("beforeScrollStart", function() {
                    t(function() {
                        this.fade(1, !0)
                    })
                })), this.on("refresh", function() {
                    t(function() {
                        this.refresh()
                    })
                }), this.on("destroy", function() {
                    t(function() {
                        this.destroy()
                    }), delete this.indicators
                })
            },
            _initWheel: function() {
                a.addEvent(this.wrapper, "wheel", this), a.addEvent(this.wrapper, "mousewheel", this), a.addEvent(this.wrapper, "DOMMouseScroll", this), this.on("destroy", function() {
                    a.removeEvent(this.wrapper, "wheel", this), a.removeEvent(this.wrapper, "mousewheel", this), a.removeEvent(this.wrapper, "DOMMouseScroll", this)
                })
            },
            _wheel: function(t) {
                if (this.enabled) {
                    t.preventDefault(), t.stopPropagation();
                    var i, s, o, n, r = this;
                    if (void 0 === this.wheelTimeout && r._execEvent("scrollStart"), clearTimeout(this.wheelTimeout), this.wheelTimeout = setTimeout(function() {
                            r._execEvent("scrollEnd"), r.wheelTimeout = void 0
                        }, 400), "deltaX" in t) 1 === t.deltaMode ? (i = -t.deltaX * this.options.mouseWheelSpeed, s = -t.deltaY * this.options.mouseWheelSpeed) : (i = -t.deltaX, s = -t.deltaY);
                    else if ("wheelDeltaX" in t) i = t.wheelDeltaX / 120 * this.options.mouseWheelSpeed, s = t.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
                    else if ("wheelDelta" in t) i = s = t.wheelDelta / 120 * this.options.mouseWheelSpeed;
                    else {
                        if (!("detail" in t)) return;
                        i = s = -t.detail / 3 * this.options.mouseWheelSpeed
                    }
                    if (i *= this.options.invertWheelDirection, s *= this.options.invertWheelDirection, this.hasVerticalScroll || (i = s, s = 0), this.options.snap) return o = this.currentPage.pageX,
                        n = this.currentPage.pageY, i > 0 ? o-- : i < 0 && o++, s > 0 ? n-- : s < 0 && n++, void this.goToPage(o, n);
                    o = this.x + e.round(this.hasHorizontalScroll ? i : 0), n = this.y + e.round(this.hasVerticalScroll ? s : 0), o > 0 ? o = 0 : o < this.maxScrollX && (o = this.maxScrollX), n > 0 ? n = 0 : n < this.maxScrollY && (n = this.maxScrollY), this.scrollTo(o, n, 0)
                }
            },
            _initSnap: function() {
                this.currentPage = {}, "string" == typeof this.options.snap && (this.options.snap = this.scroller.querySelectorAll(this.options.snap)), this.on("refresh", function() {
                    var t, i, s, o, n, r, a = 0,
                        l = 0,
                        h = 0,
                        c = this.options.snapStepX || this.wrapperWidth,
                        d = this.options.snapStepY || this.wrapperHeight;
                    if (this.pages = [], this.wrapperWidth && this.wrapperHeight && this.scrollerWidth && this.scrollerHeight) {
                        if (this.options.snap === !0)
                            for (s = e.round(c / 2), o = e.round(d / 2); h > -this.scrollerWidth;) {
                                for (this.pages[a] = [], t = 0, n = 0; n > -this.scrollerHeight;) this.pages[a][t] = {
                                    x: e.max(h, this.maxScrollX),
                                    y: e.max(n, this.maxScrollY),
                                    width: c,
                                    height: d,
                                    cx: h - s,
                                    cy: n - o
                                }, n -= d, t++;
                                h -= c, a++
                            } else
                                for (r = this.options.snap, t = r.length, i = -1; a < t; a++)(0 === a || r[a].offsetLeft <= r[a - 1].offsetLeft) && (l = 0, i++), this.pages[l] || (this.pages[l] = []), h = e.max(-r[a].offsetLeft, this.maxScrollX), n = e.max(-r[a].offsetTop, this.maxScrollY), s = h - e.round(r[a].offsetWidth / 2), o = n - e.round(r[a].offsetHeight / 2), this.pages[l][i] = {
                                    x: h,
                                    y: n,
                                    width: r[a].offsetWidth,
                                    height: r[a].offsetHeight,
                                    cx: s,
                                    cy: o
                                }, h > this.maxScrollX && l++;
                        this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0), this.options.snapThreshold % 1 === 0 ? (this.snapThresholdX = this.options.snapThreshold, this.snapThresholdY = this.options.snapThreshold) : (this.snapThresholdX = e.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold), this.snapThresholdY = e.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold))
                    }
                }), this.on("flick", function() {
                    var t = this.options.snapSpeed || e.max(e.max(e.min(e.abs(this.x - this.startX), 1e3), e.min(e.abs(this.y - this.startY), 1e3)), 300);
                    this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, t)
                })
            },
            _nearestSnap: function(t, i) {
                if (!this.pages.length) return {
                    x: 0,
                    y: 0,
                    pageX: 0,
                    pageY: 0
                };
                var s = 0,
                    o = this.pages.length,
                    n = 0;
                if (e.abs(t - this.absStartX) < this.snapThresholdX && e.abs(i - this.absStartY) < this.snapThresholdY) return this.currentPage;
                for (t > 0 ? t = 0 : t < this.maxScrollX && (t = this.maxScrollX), i > 0 ? i = 0 : i < this.maxScrollY && (i = this.maxScrollY); s < o; s++)
                    if (t >= this.pages[s][0].cx) {
                        t = this.pages[s][0].x;
                        break
                    }
                for (o = this.pages[s].length; n < o; n++)
                    if (i >= this.pages[0][n].cy) {
                        i = this.pages[0][n].y;
                        break
                    }
                return s == this.currentPage.pageX && (s += this.directionX, s < 0 ? s = 0 : s >= this.pages.length && (s = this.pages.length - 1), t = this.pages[s][0].x), n == this.currentPage.pageY && (n += this.directionY, n < 0 ? n = 0 : n >= this.pages[0].length && (n = this.pages[0].length - 1), i = this.pages[0][n].y), {
                    x: t,
                    y: i,
                    pageX: s,
                    pageY: n
                }
            },
            goToPage: function(t, i, s, o) {
                o = o || this.options.bounceEasing, t >= this.pages.length ? t = this.pages.length - 1 : t < 0 && (t = 0), i >= this.pages[t].length ? i = this.pages[t].length - 1 : i < 0 && (i = 0);
                var n = this.pages[t][i].x,
                    r = this.pages[t][i].y;
                s = void 0 === s ? this.options.snapSpeed || e.max(e.max(e.min(e.abs(n - this.x), 1e3), e.min(e.abs(r - this.y), 1e3)), 300) : s, this.currentPage = {
                    x: n,
                    y: r,
                    pageX: t,
                    pageY: i
                }, this.scrollTo(n, r, s, o)
            },
            next: function(t, i) {
                var e = this.currentPage.pageX,
                    s = this.currentPage.pageY;
                e++, e >= this.pages.length && this.hasVerticalScroll && (e = 0, s++), this.goToPage(e, s, t, i)
            },
            prev: function(t, i) {
                var e = this.currentPage.pageX,
                    s = this.currentPage.pageY;
                e--, e < 0 && this.hasVerticalScroll && (e = 0, s--), this.goToPage(e, s, t, i)
            },
            _initKeys: function(i) {
                var e, s = {
                    pageUp: 33,
                    pageDown: 34,
                    end: 35,
                    home: 36,
                    left: 37,
                    up: 38,
                    right: 39,
                    down: 40
                };
                if ("object" == typeof this.options.keyBindings)
                    for (e in this.options.keyBindings) "string" == typeof this.options.keyBindings[e] && (this.options.keyBindings[e] = this.options.keyBindings[e].toUpperCase().charCodeAt(0));
                else this.options.keyBindings = {};
                for (e in s) this.options.keyBindings[e] = this.options.keyBindings[e] || s[e];
                a.addEvent(t, "keydown", this), this.on("destroy", function() {
                    a.removeEvent(t, "keydown", this)
                })
            },
            _key: function(t) {
                if (this.enabled) {
                    var i, s = this.options.snap,
                        o = s ? this.currentPage.pageX : this.x,
                        n = s ? this.currentPage.pageY : this.y,
                        r = a.getTime(),
                        l = this.keyTime || 0,
                        h = .25;
                    switch (this.options.useTransition && this.isInTransition && (i = this.getComputedPosition(), this._translate(e.round(i.x), e.round(i.y)), this.isInTransition = !1), this.keyAcceleration = r - l < 200 ? e.min(this.keyAcceleration + h, 50) : 0, t.keyCode) {
                        case this.options.keyBindings.pageUp:
                            this.hasHorizontalScroll && !this.hasVerticalScroll ? o += s ? 1 : this.wrapperWidth : n += s ? 1 : this.wrapperHeight;
                            break;
                        case this.options.keyBindings.pageDown:
                            this.hasHorizontalScroll && !this.hasVerticalScroll ? o -= s ? 1 : this.wrapperWidth : n -= s ? 1 : this.wrapperHeight;
                            break;
                        case this.options.keyBindings.end:
                            o = s ? this.pages.length - 1 : this.maxScrollX, n = s ? this.pages[0].length - 1 : this.maxScrollY;
                            break;
                        case this.options.keyBindings.home:
                            o = 0, n = 0;
                            break;
                        case this.options.keyBindings.left:
                            o += s ? -1 : 5 + this.keyAcceleration >> 0;
                            break;
                        case this.options.keyBindings.up:
                            n += s ? 1 : 5 + this.keyAcceleration >> 0;
                            break;
                        case this.options.keyBindings.right:
                            o -= s ? -1 : 5 + this.keyAcceleration >> 0;
                            break;
                        case this.options.keyBindings.down:
                            n -= s ? 1 : 5 + this.keyAcceleration >> 0;
                            break;
                        default:
                            return
                    }
                    if (s) return void this.goToPage(o, n);
                    o > 0 ? (o = 0, this.keyAcceleration = 0) : o < this.maxScrollX && (o = this.maxScrollX, this.keyAcceleration = 0), n > 0 ? (n = 0, this.keyAcceleration = 0) : n < this.maxScrollY && (n = this.maxScrollY, this.keyAcceleration = 0), this.scrollTo(o, n, 0), this.keyTime = r
                }
            },
            _animate: function(t, i, e, s) {
                function o() {
                    var p, u, f, v = a.getTime();
                    return v >= d ? (n.isAnimating = !1, n._translate(t, i), void(n.resetPosition(n.options.bounceTime) || n._execEvent("scrollEnd"))) : (v = (v - c) / e, f = s(v), p = (t - l) * f + l, u = (i - h) * f + h, n._translate(p, u), void(n.isAnimating && r(o)))
                }
                var n = this,
                    l = this.x,
                    h = this.y,
                    c = a.getTime(),
                    d = c + e;
                this.isAnimating = !0, o()
            },
            handleEvent: function(t) {
                switch (t.type) {
                    case "touchstart":
                    case "pointerdown":
                    case "MSPointerDown":
                    case "mousedown":
                        this._start(t);
                        break;
                    case "touchmove":
                    case "pointermove":
                    case "MSPointerMove":
                    case "mousemove":
                        this._move(t);
                        break;
                    case "touchend":
                    case "pointerup":
                    case "MSPointerUp":
                    case "mouseup":
                    case "touchcancel":
                    case "pointercancel":
                    case "MSPointerCancel":
                    case "mousecancel":
                        this._end(t);
                        break;
                    case "orientationchange":
                    case "resize":
                        this._resize();
                        break;
                    case "transitionend":
                    case "webkitTransitionEnd":
                    case "oTransitionEnd":
                    case "MSTransitionEnd":
                        this._transitionEnd(t);
                        break;
                    case "wheel":
                    case "DOMMouseScroll":
                    case "mousewheel":
                        this._wheel(t);
                        break;
                    case "keydown":
                        this._key(t);
                        break;
                    case "click":
                        t._constructed || (t.preventDefault(), t.stopPropagation())
                }
            }
        }, n.prototype = {
            handleEvent: function(t) {
                switch (t.type) {
                    case "touchstart":
                    case "pointerdown":
                    case "MSPointerDown":
                    case "mousedown":
                        this._start(t);
                        break;
                    case "touchmove":
                    case "pointermove":
                    case "MSPointerMove":
                    case "mousemove":
                        this._move(t);
                        break;
                    case "touchend":
                    case "pointerup":
                    case "MSPointerUp":
                    case "mouseup":
                    case "touchcancel":
                    case "pointercancel":
                    case "MSPointerCancel":
                    case "mousecancel":
                        this._end(t)
                }
            },
            destroy: function() {
                this.options.interactive && (a.removeEvent(this.indicator, "touchstart", this), a.removeEvent(this.indicator, a.prefixPointerEvent("pointerdown"), this), a.removeEvent(this.indicator, "mousedown", this), a.removeEvent(t, "touchmove", this), a.removeEvent(t, a.prefixPointerEvent("pointermove"), this), a.removeEvent(t, "mousemove", this), a.removeEvent(t, "touchend", this), a.removeEvent(t, a.prefixPointerEvent("pointerup"), this), a.removeEvent(t, "mouseup", this)), this.options.defaultScrollbars && this.wrapper.parentNode.removeChild(this.wrapper)
            },
            _start: function(i) {
                var e = i.touches ? i.touches[0] : i;
                i.preventDefault(), i.stopPropagation(), this.transitionTime(), this.initiated = !0, this.moved = !1, this.lastPointX = e.pageX, this.lastPointY = e.pageY, this.startTime = a.getTime(), this.options.disableTouch || a.addEvent(t, "touchmove", this), this.options.disablePointer || a.addEvent(t, a.prefixPointerEvent("pointermove"), this), this.options.disableMouse || a.addEvent(t, "mousemove", this), this.scroller._execEvent("beforeScrollStart")
            },
            _move: function(t) {
                var i, e, s, o, n = t.touches ? t.touches[0] : t;
                a.getTime(), this.moved || this.scroller._execEvent("scrollStart"), this.moved = !0, i = n.pageX - this.lastPointX, this.lastPointX = n.pageX, e = n.pageY - this.lastPointY, this.lastPointY = n.pageY, s = this.x + i, o = this.y + e, this._pos(s, o), t.preventDefault(), t.stopPropagation()
            },
            _end: function(i) {
                if (this.initiated) {
                    if (this.initiated = !1, i.preventDefault(), i.stopPropagation(), a.removeEvent(t, "touchmove", this), a.removeEvent(t, a.prefixPointerEvent("pointermove"), this), a.removeEvent(t, "mousemove", this), this.scroller.options.snap) {
                        var s = this.scroller._nearestSnap(this.scroller.x, this.scroller.y),
                            o = this.options.snapSpeed || e.max(e.max(e.min(e.abs(this.scroller.x - s.x), 1e3), e.min(e.abs(this.scroller.y - s.y), 1e3)), 300);
                        this.scroller.x == s.x && this.scroller.y == s.y || (this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = s, this.scroller.scrollTo(s.x, s.y, o, this.scroller.options.bounceEasing))
                    }
                    this.moved && this.scroller._execEvent("scrollEnd")
                }
            },
            transitionTime: function(t) {
                t = t || 0, this.indicatorStyle[a.style.transitionDuration] = t + "ms", !t && a.isBadAndroid && (this.indicatorStyle[a.style.transitionDuration] = "0.001s")
            },
            transitionTimingFunction: function(t) {
                this.indicatorStyle[a.style.transitionTimingFunction] = t
            },
            refresh: function() {
                this.transitionTime(), this.options.listenX && !this.options.listenY ? this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.indicatorStyle.display = this.scroller.hasVerticalScroll ? "block" : "none" : this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none", this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ? (a.addClass(this.wrapper, "iScrollBothScrollbars"), a.removeClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "8px" : this.wrapper.style.bottom = "8px")) : (a.removeClass(this.wrapper, "iScrollBothScrollbars"), a.addClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "2px" : this.wrapper.style.bottom = "2px")), this.wrapper.offsetHeight, this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth, this.options.resize ? (this.indicatorWidth = e.max(e.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px") : this.indicatorWidth = this.indicator.clientWidth, this.maxPosX = this.wrapperWidth - this.indicatorWidth, "clip" == this.options.shrink ? (this.minBoundaryX = -this.indicatorWidth + 8, this.maxBoundaryX = this.wrapperWidth - 8) : (this.minBoundaryX = 0, this.maxBoundaryX = this.maxPosX), this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX), this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight, this.options.resize ? (this.indicatorHeight = e.max(e.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px") : this.indicatorHeight = this.indicator.clientHeight, this.maxPosY = this.wrapperHeight - this.indicatorHeight, "clip" == this.options.shrink ? (this.minBoundaryY = -this.indicatorHeight + 8, this.maxBoundaryY = this.wrapperHeight - 8) : (this.minBoundaryY = 0, this.maxBoundaryY = this.maxPosY), this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY), this.updatePosition()
            },
            updatePosition: function() {
                var t = this.options.listenX && e.round(this.sizeRatioX * this.scroller.x) || 0,
                    i = this.options.listenY && e.round(this.sizeRatioY * this.scroller.y) || 0;
                this.options.ignoreBoundaries || (t < this.minBoundaryX ? ("scale" == this.options.shrink && (this.width = e.max(this.indicatorWidth + t, 8), this.indicatorStyle.width = this.width + "px"), t = this.minBoundaryX) : t > this.maxBoundaryX ? "scale" == this.options.shrink ? (this.width = e.max(this.indicatorWidth - (t - this.maxPosX), 8), this.indicatorStyle.width = this.width + "px", t = this.maxPosX + this.indicatorWidth - this.width) : t = this.maxBoundaryX : "scale" == this.options.shrink && this.width != this.indicatorWidth && (this.width = this.indicatorWidth, this.indicatorStyle.width = this.width + "px"), i < this.minBoundaryY ? ("scale" == this.options.shrink && (this.height = e.max(this.indicatorHeight + 3 * i, 8), this.indicatorStyle.height = this.height + "px"), i = this.minBoundaryY) : i > this.maxBoundaryY ? "scale" == this.options.shrink ? (this.height = e.max(this.indicatorHeight - 3 * (i - this.maxPosY), 8), this.indicatorStyle.height = this.height + "px", i = this.maxPosY + this.indicatorHeight - this.height) : i = this.maxBoundaryY : "scale" == this.options.shrink && this.height != this.indicatorHeight && (this.height = this.indicatorHeight, this.indicatorStyle.height = this.height + "px")), this.x = t, this.y = i, this.scroller.options.useTransform ? this.indicatorStyle[a.style.transform] = "translate(" + t + "px," + i + "px)" + this.scroller.translateZ : (this.indicatorStyle.left = t + "px", this.indicatorStyle.top = i + "px")
            },
            _pos: function(t, i) {
                t < 0 ? t = 0 : t > this.maxPosX && (t = this.maxPosX), i < 0 ? i = 0 : i > this.maxPosY && (i = this.maxPosY), t = this.options.listenX ? e.round(t / this.sizeRatioX) : this.scroller.x, i = this.options.listenY ? e.round(i / this.sizeRatioY) : this.scroller.y, this.scroller.scrollTo(t, i)
            },
            fade: function(t, i) {
                if (!i || this.visible) {
                    clearTimeout(this.fadeTimeout), this.fadeTimeout = null;
                    var e = t ? 250 : 500,
                        s = t ? 0 : 300;
                    t = t ? "1" : "0", this.wrapperStyle[a.style.transitionDuration] = e + "ms", this.fadeTimeout = setTimeout(function(t) {
                        this.wrapperStyle.opacity = t, this.visible = +t
                    }.bind(this, t), s)
                }
            }
        }, s.utils = a, "undefined" != typeof module && module.exports ? module.exports = s : t.IScroll = s
    }(window, document, Math), function(t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery)
    }(function(t) {
        "use strict";

        function i(i) {
            return !i.nodeName || -1 !== t.inArray(i.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"])
        }

        function e(i) {
            return t.isFunction(i) || t.isPlainObject(i) ? i : {
                top: i,
                left: i
            }
        }
        var s = t.scrollTo = function(i, e, s) {
            return t(window).scrollTo(i, e, s)
        };
        return s.defaults = {
            axis: "xy",
            duration: 0,
            limit: !0
        }, t.fn.scrollTo = function(o, n, r) {
            "object" == typeof n && (r = n, n = 0), "function" == typeof r && (r = {
                onAfter: r
            }), "max" === o && (o = 9e9), r = t.extend({}, s.defaults, r), n = n || r.duration;
            var a = r.queue && 1 < r.axis.length;
            return a && (n /= 2), r.offset = e(r.offset), r.over = e(r.over), this.each(function() {
                function l(i) {
                    var e = t.extend({}, r, {
                        queue: !0,
                        duration: n,
                        complete: i && function() {
                            i.call(d, u, r)
                        }
                    });
                    p.animate(f, e)
                }
                if (null !== o) {
                    var h, c = i(this),
                        d = c ? this.contentWindow || window : this,
                        p = t(d),
                        u = o,
                        f = {};
                    switch (typeof u) {
                        case "number":
                        case "string":
                            if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(u)) {
                                u = e(u);
                                break
                            }
                            u = c ? t(u) : t(u, d);
                        case "object":
                            if (0 === u.length) return;
                            (u.is || u.style) && (h = (u = t(u)).offset())
                    }
                    var v = t.isFunction(r.offset) && r.offset(d, u) || r.offset;
                    t.each(r.axis.split(""), function(t, i) {
                        var e = "x" === i ? "Left" : "Top",
                            o = e.toLowerCase(),
                            n = "scroll" + e,
                            g = p[n](),
                            m = s.max(d, i);
                        h ? (f[n] = h[o] + (c ? 0 : g - p.offset()[o]), r.margin && (f[n] -= parseInt(u.css("margin" + e), 10) || 0, f[n] -= parseInt(u.css("border" + e + "Width"), 10) || 0), f[n] += v[o] || 0, r.over[o] && (f[n] += u["x" === i ? "width" : "height"]() * r.over[o])) : (e = u[o], f[n] = e.slice && "%" === e.slice(-1) ? parseFloat(e) / 100 * m : e), r.limit && /^\d+$/.test(f[n]) && (f[n] = 0 >= f[n] ? 0 : Math.min(f[n], m)), !t && 1 < r.axis.length && (g === f[n] ? f = {} : a && (l(r.onAfterFirst), f = {}))
                    }), l(r.onAfter)
                }
            })
        }, s.max = function(e, s) {
            var o = "x" === s ? "Width" : "Height",
                n = "scroll" + o;
            if (!i(e)) return e[n] - t(e)[o.toLowerCase()]();
            var o = "client" + o,
                r = e.ownerDocument || e.document,
                a = r.documentElement,
                r = r.body;
            return Math.max(a[n], r[n]) - Math.min(a[o], r[o])
        }, t.Tween.propHooks.scrollLeft = t.Tween.propHooks.scrollTop = {
            get: function(i) {
                return t(i.elem)[i.prop]()
            },
            set: function(i) {
                var e = this.get(i);
                if (i.options.interrupt && i._last && i._last !== e) return t(i.elem).stop();
                var s = Math.round(i.now);
                e !== s && (t(i.elem)[i.prop](s), i._last = this.get(i))
            }
        }, s
    }), ! function(t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
    }(function(t) {
        "use strict";
        var i = window.Slick || {};
        i = function() {
            function i(i, s) {
                var o, n = this;
                n.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: t(i),
                    appendDots: t(i),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                    nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    centerMode: !1,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function(t, i) {
                        return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (i + 1) + "</button>"
                    },
                    dots: !1,
                    dotsClass: "slick-dots",
                    draggable: !0,
                    easing: "linear",
                    edgeFriction: .35,
                    fade: !1,
                    focusOnSelect: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    mobileFirst: !1,
                    pauseOnHover: !0,
                    pauseOnDotsHover: !1,
                    respondTo: "window",
                    responsive: null,
                    rows: 1,
                    rtl: !1,
                    slide: "",
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: !0,
                    swipeToSlide: !1,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    variableWidth: !1,
                    vertical: !1,
                    verticalSwiping: !1,
                    waitForAnimate: !0,
                    zIndex: 1e3
                }, n.initials = {
                    animating: !1,
                    dragging: !1,
                    autoPlayTimer: null,
                    currentDirection: 0,
                    currentLeft: null,
                    currentSlide: 0,
                    direction: 1,
                    $dots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    $nextArrow: null,
                    $prevArrow: null,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: !1,
                    unslicked: !1
                }, t.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.hidden = "hidden", n.paused = !1, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = t(i), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, o = t(i).data("slick") || {}, n.options = t.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, "undefined" != typeof document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = t.proxy(n.autoPlay, n), n.autoPlayClear = t.proxy(n.autoPlayClear, n), n.changeSlide = t.proxy(n.changeSlide, n), n.clickHandler = t.proxy(n.clickHandler, n), n.selectHandler = t.proxy(n.selectHandler, n), n.setPosition = t.proxy(n.setPosition, n), n.swipeHandler = t.proxy(n.swipeHandler, n), n.dragHandler = t.proxy(n.dragHandler, n), n.keyHandler = t.proxy(n.keyHandler, n), n.autoPlayIterator = t.proxy(n.autoPlayIterator, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0), n.checkResponsive(!0)
            }
            var e = 0;
            return i
        }(), i.prototype.addSlide = i.prototype.slickAdd = function(i, e, s) {
            var o = this;
            if ("boolean" == typeof e) s = e, e = null;
            else if (0 > e || e >= o.slideCount) return !1;
            o.unload(), "number" == typeof e ? 0 === e && 0 === o.$slides.length ? t(i).appendTo(o.$slideTrack) : s ? t(i).insertBefore(o.$slides.eq(e)) : t(i).insertAfter(o.$slides.eq(e)) : s === !0 ? t(i).prependTo(o.$slideTrack) : t(i).appendTo(o.$slideTrack), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slides.each(function(i, e) {
                t(e).attr("data-slick-index", i)
            }), o.$slidesCache = o.$slides, o.reinit()
        }, i.prototype.animateHeight = function() {
            var t = this;
            if (1 === t.options.slidesToShow && t.options.adaptiveHeight === !0 && t.options.vertical === !1) {
                var i = t.$slides.eq(t.currentSlide).outerHeight(!0);
                t.$list.animate({
                    height: i
                }, t.options.speed)
            }
        }, i.prototype.animateSlide = function(i, e) {
            var s = {},
                o = this;
            o.animateHeight(), o.options.rtl === !0 && o.options.vertical === !1 && (i = -i), o.transformsEnabled === !1 ? o.options.vertical === !1 ? o.$slideTrack.animate({
                left: i
            }, o.options.speed, o.options.easing, e) : o.$slideTrack.animate({
                top: i
            }, o.options.speed, o.options.easing, e) : o.cssTransitions === !1 ? (o.options.rtl === !0 && (o.currentLeft = -o.currentLeft), t({
                animStart: o.currentLeft
            }).animate({
                animStart: i
            }, {
                duration: o.options.speed,
                easing: o.options.easing,
                step: function(t) {
                    t = Math.ceil(t), o.options.vertical === !1 ? (s[o.animType] = "translate(" + t + "px, 0px)", o.$slideTrack.css(s)) : (s[o.animType] = "translate(0px," + t + "px)", o.$slideTrack.css(s))
                },
                complete: function() {
                    e && e.call()
                }
            })) : (o.applyTransition(), i = Math.ceil(i), s[o.animType] = o.options.vertical === !1 ? "translate3d(" + i + "px, 0px, 0px)" : "translate3d(0px," + i + "px, 0px)", o.$slideTrack.css(s), e && setTimeout(function() {
                o.disableTransition(), e.call()
            }, o.options.speed))
        }, i.prototype.asNavFor = function(i) {
            var e = this,
                s = e.options.asNavFor;
            s && null !== s && (s = t(s).not(e.$slider)), null !== s && "object" == typeof s && s.each(function() {
                var e = t(this).slick("getSlick");
                e.unslicked || e.slideHandler(i, !0)
            })
        }, i.prototype.applyTransition = function(t) {
            var i = this,
                e = {};
            e[i.transitionType] = i.options.fade === !1 ? i.transformType + " " + i.options.speed + "ms " + i.options.cssEase : "opacity " + i.options.speed + "ms " + i.options.cssEase, i.options.fade === !1 ? i.$slideTrack.css(e) : i.$slides.eq(t).css(e)
        }, i.prototype.autoPlay = function() {
            var t = this;
            t.autoPlayTimer && clearInterval(t.autoPlayTimer), t.slideCount > t.options.slidesToShow && t.paused !== !0 && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed))
        }, i.prototype.autoPlayClear = function() {
            var t = this;
            t.autoPlayTimer && clearInterval(t.autoPlayTimer)
        }, i.prototype.autoPlayIterator = function() {
            var t = this;
            t.options.infinite === !1 ? 1 === t.direction ? (t.currentSlide + 1 === t.slideCount - 1 && (t.direction = 0), t.slideHandler(t.currentSlide + t.options.slidesToScroll)) : (0 === t.currentSlide - 1 && (t.direction = 1), t.slideHandler(t.currentSlide - t.options.slidesToScroll)) : t.slideHandler(t.currentSlide + t.options.slidesToScroll)
        }, i.prototype.buildArrows = function() {
            var i = this;
            i.options.arrows === !0 && (i.$prevArrow = t(i.options.prevArrow).addClass("slick-arrow"), i.$nextArrow = t(i.options.nextArrow).addClass("slick-arrow"), i.slideCount > i.options.slidesToShow ? (i.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), i.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.prependTo(i.options.appendArrows), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.appendTo(i.options.appendArrows), i.options.infinite !== !0 && i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : i.$prevArrow.add(i.$nextArrow).addClass("slick-hidden").attr({
                "aria-disabled": "true",
                tabindex: "-1"
            }))
        }, i.prototype.buildDots = function() {
            var i, e, s = this;
            if (s.options.dots === !0 && s.slideCount > s.options.slidesToShow) {
                for (e = '<ul class="' + s.options.dotsClass + '">', i = 0; i <= s.getDotCount(); i += 1) e += "<li>" + s.options.customPaging.call(this, s, i) + "</li>";
                e += "</ul>", s.$dots = t(e).appendTo(s.options.appendDots), s.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
            }
        }, i.prototype.buildOut = function() {
            var i = this;
            i.$slides = i.$slider.children(i.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), i.slideCount = i.$slides.length, i.$slides.each(function(i, e) {
                t(e).attr("data-slick-index", i).data("originalStyling", t(e).attr("style") || "")
            }), i.$slidesCache = i.$slides, i.$slider.addClass("slick-slider"), i.$slideTrack = 0 === i.slideCount ? t('<div class="slick-track"/>').appendTo(i.$slider) : i.$slides.wrapAll('<div class="slick-track"/>').parent(), i.$list = i.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), i.$slideTrack.css("opacity", 0), (i.options.centerMode === !0 || i.options.swipeToSlide === !0) && (i.options.slidesToScroll = 1), t("img[data-lazy]", i.$slider).not("[src]").addClass("slick-loading"), i.setupInfinite(), i.buildArrows(), i.buildDots(), i.updateDots(), i.setSlideClasses("number" == typeof i.currentSlide ? i.currentSlide : 0), i.options.draggable === !0 && i.$list.addClass("draggable")
        }, i.prototype.buildRows = function() {
            var t, i, e, s, o, n, r, a = this;
            if (s = document.createDocumentFragment(), n = a.$slider.children(), a.options.rows > 1) {
                for (r = a.options.slidesPerRow * a.options.rows, o = Math.ceil(n.length / r), t = 0; o > t; t++) {
                    var l = document.createElement("div");
                    for (i = 0; i < a.options.rows; i++) {
                        var h = document.createElement("div");
                        for (e = 0; e < a.options.slidesPerRow; e++) {
                            var c = t * r + (i * a.options.slidesPerRow + e);
                            n.get(c) && h.appendChild(n.get(c))
                        }
                        l.appendChild(h)
                    }
                    s.appendChild(l)
                }
                a.$slider.html(s), a.$slider.children().children().children().css({
                    width: 100 / a.options.slidesPerRow + "%",
                    display: "inline-block"
                })
            }
        }, i.prototype.checkResponsive = function(i, e) {
            var s, o, n, r = this,
                a = !1,
                l = r.$slider.width(),
                h = window.innerWidth || t(window).width();
            if ("window" === r.respondTo ? n = h : "slider" === r.respondTo ? n = l : "min" === r.respondTo && (n = Math.min(h, l)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
                o = null;
                for (s in r.breakpoints) r.breakpoints.hasOwnProperty(s) && (r.originalSettings.mobileFirst === !1 ? n < r.breakpoints[s] && (o = r.breakpoints[s]) : n > r.breakpoints[s] && (o = r.breakpoints[s]));
                null !== o ? null !== r.activeBreakpoint ? (o !== r.activeBreakpoint || e) && (r.activeBreakpoint = o, "unslick" === r.breakpointSettings[o] ? r.unslick(o) : (r.options = t.extend({}, r.originalSettings, r.breakpointSettings[o]), i === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(i)), a = o) : (r.activeBreakpoint = o, "unslick" === r.breakpointSettings[o] ? r.unslick(o) : (r.options = t.extend({}, r.originalSettings, r.breakpointSettings[o]), i === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(i)), a = o) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, i === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(i), a = o), i || a === !1 || r.$slider.trigger("breakpoint", [r, a])
            }
        }, i.prototype.changeSlide = function(i, e) {
            var s, o, n, r = this,
                a = t(i.target);
            switch (a.is("a") && i.preventDefault(), a.is("li") || (a = a.closest("li")), n = 0 !== r.slideCount % r.options.slidesToScroll, s = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, i.data.message) {
                case "previous":
                    o = 0 === s ? r.options.slidesToScroll : r.options.slidesToShow - s, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - o, !1, e);
                    break;
                case "next":
                    o = 0 === s ? r.options.slidesToScroll : s, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + o, !1, e);
                    break;
                case "index":
                    var l = 0 === i.data.index ? 0 : i.data.index || a.index() * r.options.slidesToScroll;
                    r.slideHandler(r.checkNavigable(l), !1, e), a.children().trigger("focus");
                    break;
                default:
                    return
            }
        }, i.prototype.checkNavigable = function(t) {
            var i, e, s = this;
            if (i = s.getNavigableIndexes(), e = 0, t > i[i.length - 1]) t = i[i.length - 1];
            else
                for (var o in i) {
                    if (t < i[o]) {
                        t = e;
                        break
                    }
                    e = i[o]
                }
            return t
        }, i.prototype.cleanUpEvents = function() {
            var i = this;
            i.options.dots && null !== i.$dots && (t("li", i.$dots).off("click.slick", i.changeSlide), i.options.pauseOnDotsHover === !0 && i.options.autoplay === !0 && t("li", i.$dots).off("mouseenter.slick", t.proxy(i.setPaused, i, !0)).off("mouseleave.slick", t.proxy(i.setPaused, i, !1))), i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow && i.$prevArrow.off("click.slick", i.changeSlide), i.$nextArrow && i.$nextArrow.off("click.slick", i.changeSlide)), i.$list.off("touchstart.slick mousedown.slick", i.swipeHandler), i.$list.off("touchmove.slick mousemove.slick", i.swipeHandler), i.$list.off("touchend.slick mouseup.slick", i.swipeHandler), i.$list.off("touchcancel.slick mouseleave.slick", i.swipeHandler), i.$list.off("click.slick", i.clickHandler), t(document).off(i.visibilityChange, i.visibility), i.$list.off("mouseenter.slick", t.proxy(i.setPaused, i, !0)), i.$list.off("mouseleave.slick", t.proxy(i.setPaused, i, !1)), i.options.accessibility === !0 && i.$list.off("keydown.slick", i.keyHandler), i.options.focusOnSelect === !0 && t(i.$slideTrack).children().off("click.slick", i.selectHandler), t(window).off("orientationchange.slick.slick-" + i.instanceUid, i.orientationChange), t(window).off("resize.slick.slick-" + i.instanceUid, i.resize), t("[draggable!=true]", i.$slideTrack).off("dragstart", i.preventDefault), t(window).off("load.slick.slick-" + i.instanceUid, i.setPosition), t(document).off("ready.slick.slick-" + i.instanceUid, i.setPosition)
        }, i.prototype.cleanUpRows = function() {
            var t, i = this;
            i.options.rows > 1 && (t = i.$slides.children().children(), t.removeAttr("style"), i.$slider.html(t))
        }, i.prototype.clickHandler = function(t) {
            var i = this;
            i.shouldClick === !1 && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault())
        }, i.prototype.destroy = function(i) {
            var e = this;
            e.autoPlayClear(), e.touchObject = {}, e.cleanUpEvents(), t(".slick-cloned", e.$slider).detach(), e.$dots && e.$dots.remove(), e.options.arrows === !0 && (e.$prevArrow && e.$prevArrow.length && (e.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove()), e.$nextArrow && e.$nextArrow.length && (e.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove())), e.$slides && (e.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
                t(this).attr("style", t(this).data("originalStyling"))
            }), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.detach(), e.$list.detach(), e.$slider.append(e.$slides)), e.cleanUpRows(), e.$slider.removeClass("slick-slider"), e.$slider.removeClass("slick-initialized"), e.unslicked = !0, i || e.$slider.trigger("destroy", [e])
        }, i.prototype.disableTransition = function(t) {
            var i = this,
                e = {};
            e[i.transitionType] = "", i.options.fade === !1 ? i.$slideTrack.css(e) : i.$slides.eq(t).css(e)
        }, i.prototype.fadeSlide = function(t, i) {
            var e = this;
            e.cssTransitions === !1 ? (e.$slides.eq(t).css({
                zIndex: e.options.zIndex
            }), e.$slides.eq(t).animate({
                opacity: 1
            }, e.options.speed, e.options.easing, i)) : (e.applyTransition(t), e.$slides.eq(t).css({
                opacity: 1,
                zIndex: e.options.zIndex
            }), i && setTimeout(function() {
                e.disableTransition(t), i.call()
            }, e.options.speed))
        }, i.prototype.fadeSlideOut = function(t) {
            var i = this;
            i.cssTransitions === !1 ? i.$slides.eq(t).animate({
                opacity: 0,
                zIndex: i.options.zIndex - 2
            }, i.options.speed, i.options.easing) : (i.applyTransition(t), i.$slides.eq(t).css({
                opacity: 0,
                zIndex: i.options.zIndex - 2
            }))
        }, i.prototype.filterSlides = i.prototype.slickFilter = function(t) {
            var i = this;
            null !== t && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.filter(t).appendTo(i.$slideTrack), i.reinit())
        }, i.prototype.getCurrent = i.prototype.slickCurrentSlide = function() {
            var t = this;
            return t.currentSlide
        }, i.prototype.getDotCount = function() {
            var t = this,
                i = 0,
                e = 0,
                s = 0;
            if (t.options.infinite === !0)
                for (; i < t.slideCount;) ++s, i = e + t.options.slidesToShow, e += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
            else if (t.options.centerMode === !0) s = t.slideCount;
            else
                for (; i < t.slideCount;) ++s, i = e + t.options.slidesToShow, e += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
            return s - 1
        }, i.prototype.getLeft = function(t) {
            var i, e, s, o = this,
                n = 0;
            return o.slideOffset = 0, e = o.$slides.first().outerHeight(!0), o.options.infinite === !0 ? (o.slideCount > o.options.slidesToShow && (o.slideOffset = -1 * o.slideWidth * o.options.slidesToShow, n = -1 * e * o.options.slidesToShow), 0 !== o.slideCount % o.options.slidesToScroll && t + o.options.slidesToScroll > o.slideCount && o.slideCount > o.options.slidesToShow && (t > o.slideCount ? (o.slideOffset = -1 * (o.options.slidesToShow - (t - o.slideCount)) * o.slideWidth, n = -1 * (o.options.slidesToShow - (t - o.slideCount)) * e) : (o.slideOffset = -1 * o.slideCount % o.options.slidesToScroll * o.slideWidth, n = -1 * o.slideCount % o.options.slidesToScroll * e))) : t + o.options.slidesToShow > o.slideCount && (o.slideOffset = (t + o.options.slidesToShow - o.slideCount) * o.slideWidth, n = (t + o.options.slidesToShow - o.slideCount) * e), o.slideCount <= o.options.slidesToShow && (o.slideOffset = 0, n = 0), o.options.centerMode === !0 && o.options.infinite === !0 ? o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2) - o.slideWidth : o.options.centerMode === !0 && (o.slideOffset = 0, o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2)), i = o.options.vertical === !1 ? -1 * t * o.slideWidth + o.slideOffset : -1 * t * e + n, o.options.variableWidth === !0 && (s = o.slideCount <= o.options.slidesToShow || o.options.infinite === !1 ? o.$slideTrack.children(".slick-slide").eq(t) : o.$slideTrack.children(".slick-slide").eq(t + o.options.slidesToShow),
                i = s[0] ? -1 * s[0].offsetLeft : 0, o.options.centerMode === !0 && (s = o.options.infinite === !1 ? o.$slideTrack.children(".slick-slide").eq(t) : o.$slideTrack.children(".slick-slide").eq(t + o.options.slidesToShow + 1), i = s[0] ? -1 * s[0].offsetLeft : 0, i += (o.$list.width() - s.outerWidth()) / 2)), i
        }, i.prototype.getOption = i.prototype.slickGetOption = function(t) {
            var i = this;
            return i.options[t]
        }, i.prototype.getNavigableIndexes = function() {
            var t, i = this,
                e = 0,
                s = 0,
                o = [];
            for (i.options.infinite === !1 ? t = i.slideCount : (e = -1 * i.options.slidesToScroll, s = -1 * i.options.slidesToScroll, t = 2 * i.slideCount); t > e;) o.push(e), e = s + i.options.slidesToScroll, s += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
            return o
        }, i.prototype.getSlick = function() {
            return this
        }, i.prototype.getSlideCount = function() {
            var i, e, s, o = this;
            return s = o.options.centerMode === !0 ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, o.options.swipeToSlide === !0 ? (o.$slideTrack.find(".slick-slide").each(function(i, n) {
                return n.offsetLeft - s + t(n).outerWidth() / 2 > -1 * o.swipeLeft ? (e = n, !1) : void 0
            }), i = Math.abs(t(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
        }, i.prototype.goTo = i.prototype.slickGoTo = function(t, i) {
            var e = this;
            e.changeSlide({
                data: {
                    message: "index",
                    index: parseInt(t)
                }
            }, i)
        }, i.prototype.init = function(i) {
            var e = this;
            t(e.$slider).hasClass("slick-initialized") || (t(e.$slider).addClass("slick-initialized"), e.buildRows(), e.buildOut(), e.setProps(), e.startLoad(), e.loadSlider(), e.initializeEvents(), e.updateArrows(), e.updateDots()), i && e.$slider.trigger("init", [e]), e.options.accessibility === !0 && e.initADA()
        }, i.prototype.initArrowEvents = function() {
            var t = this;
            t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.on("click.slick", {
                message: "previous"
            }, t.changeSlide), t.$nextArrow.on("click.slick", {
                message: "next"
            }, t.changeSlide))
        }, i.prototype.initDotEvents = function() {
            var i = this;
            i.options.dots === !0 && i.slideCount > i.options.slidesToShow && t("li", i.$dots).on("click.slick", {
                message: "index"
            }, i.changeSlide), i.options.dots === !0 && i.options.pauseOnDotsHover === !0 && i.options.autoplay === !0 && t("li", i.$dots).on("mouseenter.slick", t.proxy(i.setPaused, i, !0)).on("mouseleave.slick", t.proxy(i.setPaused, i, !1))
        }, i.prototype.initializeEvents = function() {
            var i = this;
            i.initArrowEvents(), i.initDotEvents(), i.$list.on("touchstart.slick mousedown.slick", {
                action: "start"
            }, i.swipeHandler), i.$list.on("touchmove.slick mousemove.slick", {
                action: "move"
            }, i.swipeHandler), i.$list.on("touchend.slick mouseup.slick", {
                action: "end"
            }, i.swipeHandler), i.$list.on("touchcancel.slick mouseleave.slick", {
                action: "end"
            }, i.swipeHandler), i.$list.on("click.slick", i.clickHandler), t(document).on(i.visibilityChange, t.proxy(i.visibility, i)), i.$list.on("mouseenter.slick", t.proxy(i.setPaused, i, !0)), i.$list.on("mouseleave.slick", t.proxy(i.setPaused, i, !1)), i.options.accessibility === !0 && i.$list.on("keydown.slick", i.keyHandler), i.options.focusOnSelect === !0 && t(i.$slideTrack).children().on("click.slick", i.selectHandler), t(window).on("orientationchange.slick.slick-" + i.instanceUid, t.proxy(i.orientationChange, i)), t(window).on("resize.slick.slick-" + i.instanceUid, t.proxy(i.resize, i)), t("[draggable!=true]", i.$slideTrack).on("dragstart", i.preventDefault), t(window).on("load.slick.slick-" + i.instanceUid, i.setPosition), t(document).on("ready.slick.slick-" + i.instanceUid, i.setPosition)
        }, i.prototype.initUI = function() {
            var t = this;
            t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.show(), t.options.autoplay === !0 && t.autoPlay()
        }, i.prototype.keyHandler = function(t) {
            var i = this;
            t.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === t.keyCode && i.options.accessibility === !0 ? i.changeSlide({
                data: {
                    message: "previous"
                }
            }) : 39 === t.keyCode && i.options.accessibility === !0 && i.changeSlide({
                data: {
                    message: "next"
                }
            }))
        }, i.prototype.lazyLoad = function() {
            function i(i) {
                t("img[data-lazy]", i).each(function() {
                    var i = t(this),
                        e = t(this).attr("data-lazy"),
                        s = document.createElement("img");
                    s.onload = function() {
                        i.animate({
                            opacity: 0
                        }, 100, function() {
                            i.attr("src", e).animate({
                                opacity: 1
                            }, 200, function() {
                                i.removeAttr("data-lazy").removeClass("slick-loading")
                            })
                        })
                    }, s.src = e
                })
            }
            var e, s, o, n, r = this;
            r.options.centerMode === !0 ? r.options.infinite === !0 ? (o = r.currentSlide + (r.options.slidesToShow / 2 + 1), n = o + r.options.slidesToShow + 2) : (o = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)), n = 2 + (r.options.slidesToShow / 2 + 1) + r.currentSlide) : (o = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide, n = o + r.options.slidesToShow, r.options.fade === !0 && (o > 0 && o--, n <= r.slideCount && n++)), e = r.$slider.find(".slick-slide").slice(o, n), i(e), r.slideCount <= r.options.slidesToShow ? (s = r.$slider.find(".slick-slide"), i(s)) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? (s = r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow), i(s)) : 0 === r.currentSlide && (s = r.$slider.find(".slick-cloned").slice(-1 * r.options.slidesToShow), i(s))
        }, i.prototype.loadSlider = function() {
            var t = this;
            t.setPosition(), t.$slideTrack.css({
                opacity: 1
            }), t.$slider.removeClass("slick-loading"), t.initUI(), "progressive" === t.options.lazyLoad && t.progressiveLazyLoad()
        }, i.prototype.next = i.prototype.slickNext = function() {
            var t = this;
            t.changeSlide({
                data: {
                    message: "next"
                }
            })
        }, i.prototype.orientationChange = function() {
            var t = this;
            t.checkResponsive(), t.setPosition()
        }, i.prototype.pause = i.prototype.slickPause = function() {
            var t = this;
            t.autoPlayClear(), t.paused = !0
        }, i.prototype.play = i.prototype.slickPlay = function() {
            var t = this;
            t.paused = !1, t.autoPlay()
        }, i.prototype.postSlide = function(t) {
            var i = this;
            i.$slider.trigger("afterChange", [i, t]), i.animating = !1, i.setPosition(), i.swipeLeft = null, i.options.autoplay === !0 && i.paused === !1 && i.autoPlay(), i.options.accessibility === !0 && i.initADA()
        }, i.prototype.prev = i.prototype.slickPrev = function() {
            var t = this;
            t.changeSlide({
                data: {
                    message: "previous"
                }
            })
        }, i.prototype.preventDefault = function(t) {
            t.preventDefault()
        }, i.prototype.progressiveLazyLoad = function() {
            var i, e, s = this;
            i = t("img[data-lazy]", s.$slider).length, i > 0 && (e = t("img[data-lazy]", s.$slider).first(), e.attr("src", e.attr("data-lazy")).removeClass("slick-loading").load(function() {
                e.removeAttr("data-lazy"), s.progressiveLazyLoad(), s.options.adaptiveHeight === !0 && s.setPosition()
            }).error(function() {
                e.removeAttr("data-lazy"), s.progressiveLazyLoad()
            }))
        }, i.prototype.refresh = function(i) {
            var e = this,
                s = e.currentSlide;
            e.destroy(!0), t.extend(e, e.initials, {
                currentSlide: s
            }), e.init(), i || e.changeSlide({
                data: {
                    message: "index",
                    index: s
                }
            }, !1)
        }, i.prototype.registerBreakpoints = function() {
            var i, e, s, o = this,
                n = o.options.responsive || null;
            if ("array" === t.type(n) && n.length) {
                o.respondTo = o.options.respondTo || "window";
                for (i in n)
                    if (s = o.breakpoints.length - 1, e = n[i].breakpoint, n.hasOwnProperty(i)) {
                        for (; s >= 0;) o.breakpoints[s] && o.breakpoints[s] === e && o.breakpoints.splice(s, 1), s--;
                        o.breakpoints.push(e), o.breakpointSettings[e] = n[i].settings
                    }
                o.breakpoints.sort(function(t, i) {
                    return o.options.mobileFirst ? t - i : i - t
                })
            }
        }, i.prototype.reinit = function() {
            var i = this;
            i.$slides = i.$slideTrack.children(i.options.slide).addClass("slick-slide"), i.slideCount = i.$slides.length, i.currentSlide >= i.slideCount && 0 !== i.currentSlide && (i.currentSlide = i.currentSlide - i.options.slidesToScroll), i.slideCount <= i.options.slidesToShow && (i.currentSlide = 0), i.registerBreakpoints(), i.setProps(), i.setupInfinite(), i.buildArrows(), i.updateArrows(), i.initArrowEvents(), i.buildDots(), i.updateDots(), i.initDotEvents(), i.checkResponsive(!1, !0), i.options.focusOnSelect === !0 && t(i.$slideTrack).children().on("click.slick", i.selectHandler), i.setSlideClasses(0), i.setPosition(), i.$slider.trigger("reInit", [i]), i.options.autoplay === !0 && i.focusHandler()
        }, i.prototype.resize = function() {
            var i = this;
            t(window).width() !== i.windowWidth && (clearTimeout(i.windowDelay), i.windowDelay = window.setTimeout(function() {
                i.windowWidth = t(window).width(), i.checkResponsive(), i.unslicked || i.setPosition()
            }, 50))
        }, i.prototype.removeSlide = i.prototype.slickRemove = function(t, i, e) {
            var s = this;
            return "boolean" == typeof t ? (i = t, t = i === !0 ? 0 : s.slideCount - 1) : t = i === !0 ? --t : t, !(s.slideCount < 1 || 0 > t || t > s.slideCount - 1) && (s.unload(), e === !0 ? s.$slideTrack.children().remove() : s.$slideTrack.children(this.options.slide).eq(t).remove(), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slidesCache = s.$slides, void s.reinit())
        }, i.prototype.setCSS = function(t) {
            var i, e, s = this,
                o = {};
            s.options.rtl === !0 && (t = -t), i = "left" == s.positionProp ? Math.ceil(t) + "px" : "0px", e = "top" == s.positionProp ? Math.ceil(t) + "px" : "0px", o[s.positionProp] = t, s.transformsEnabled === !1 ? s.$slideTrack.css(o) : (o = {}, s.cssTransitions === !1 ? (o[s.animType] = "translate(" + i + ", " + e + ")", s.$slideTrack.css(o)) : (o[s.animType] = "translate3d(" + i + ", " + e + ", 0px)", s.$slideTrack.css(o)))
        }, i.prototype.setDimensions = function() {
            var t = this;
            t.options.vertical === !1 ? t.options.centerMode === !0 && t.$list.css({
                padding: "0px " + t.options.centerPadding
            }) : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow), t.options.centerMode === !0 && t.$list.css({
                padding: t.options.centerPadding + " 0px"
            })), t.listWidth = t.$list.width(), t.listHeight = t.$list.height(), t.options.vertical === !1 && t.options.variableWidth === !1 ? (t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow), t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length))) : t.options.variableWidth === !0 ? t.$slideTrack.width(5e3 * t.slideCount) : (t.slideWidth = Math.ceil(t.listWidth), t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
            var i = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
            t.options.variableWidth === !1 && t.$slideTrack.children(".slick-slide").width(t.slideWidth - i)
        }, i.prototype.setFade = function() {
            var i, e = this;
            e.$slides.each(function(s, o) {
                i = -1 * e.slideWidth * s, e.options.rtl === !0 ? t(o).css({
                    position: "relative",
                    right: i,
                    top: 0,
                    zIndex: e.options.zIndex - 2,
                    opacity: 0
                }) : t(o).css({
                    position: "relative",
                    left: i,
                    top: 0,
                    zIndex: e.options.zIndex - 2,
                    opacity: 0
                })
            }), e.$slides.eq(e.currentSlide).css({
                zIndex: e.options.zIndex - 1,
                opacity: 1
            })
        }, i.prototype.setHeight = function() {
            var t = this;
            if (1 === t.options.slidesToShow && t.options.adaptiveHeight === !0 && t.options.vertical === !1) {
                var i = t.$slides.eq(t.currentSlide).outerHeight(!0);
                t.$list.css("height", i)
            }
        }, i.prototype.setOption = i.prototype.slickSetOption = function(i, e, s) {
            var o, n, r = this;
            if ("responsive" === i && "array" === t.type(e))
                for (n in e)
                    if ("array" !== t.type(r.options.responsive)) r.options.responsive = [e[n]];
                    else {
                        for (o = r.options.responsive.length - 1; o >= 0;) r.options.responsive[o].breakpoint === e[n].breakpoint && r.options.responsive.splice(o, 1), o--;
                        r.options.responsive.push(e[n])
                    } else r.options[i] = e;
            s === !0 && (r.unload(), r.reinit())
        }, i.prototype.setPosition = function() {
            var t = this;
            t.setDimensions(), t.setHeight(), t.options.fade === !1 ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), t.$slider.trigger("setPosition", [t])
        }, i.prototype.setProps = function() {
            var t = this,
                i = document.body.style;
            t.positionProp = t.options.vertical === !0 ? "top" : "left", "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"), (void 0 !== i.WebkitTransition || void 0 !== i.MozTransition || void 0 !== i.msTransition) && t.options.useCSS === !0 && (t.cssTransitions = !0), t.options.fade && ("number" == typeof t.options.zIndex ? t.options.zIndex < 3 && (t.options.zIndex = 3) : t.options.zIndex = t.defaults.zIndex), void 0 !== i.OTransform && (t.animType = "OTransform", t.transformType = "-o-transform", t.transitionType = "OTransition", void 0 === i.perspectiveProperty && void 0 === i.webkitPerspective && (t.animType = !1)), void 0 !== i.MozTransform && (t.animType = "MozTransform", t.transformType = "-moz-transform", t.transitionType = "MozTransition", void 0 === i.perspectiveProperty && void 0 === i.MozPerspective && (t.animType = !1)), void 0 !== i.webkitTransform && (t.animType = "webkitTransform", t.transformType = "-webkit-transform", t.transitionType = "webkitTransition", void 0 === i.perspectiveProperty && void 0 === i.webkitPerspective && (t.animType = !1)), void 0 !== i.msTransform && (t.animType = "msTransform", t.transformType = "-ms-transform", t.transitionType = "msTransition", void 0 === i.msTransform && (t.animType = !1)), void 0 !== i.transform && t.animType !== !1 && (t.animType = "transform", t.transformType = "transform", t.transitionType = "transition"), t.transformsEnabled = null !== t.animType && t.animType !== !1
        }, i.prototype.setSlideClasses = function(t) {
            var i, e, s, o, n = this;
            e = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(t).addClass("slick-current"), n.options.centerMode === !0 ? (i = Math.floor(n.options.slidesToShow / 2), n.options.infinite === !0 && (t >= i && t <= n.slideCount - 1 - i ? n.$slides.slice(t - i, t + i + 1).addClass("slick-active").attr("aria-hidden", "false") : (s = n.options.slidesToShow + t, e.slice(s - i + 1, s + i + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === t ? e.eq(e.length - 1 - n.options.slidesToShow).addClass("slick-center") : t === n.slideCount - 1 && e.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(t).addClass("slick-center")) : t >= 0 && t <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(t, t + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : e.length <= n.options.slidesToShow ? e.addClass("slick-active").attr("aria-hidden", "false") : (o = n.slideCount % n.options.slidesToShow, s = n.options.infinite === !0 ? n.options.slidesToShow + t : t, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - t < n.options.slidesToShow ? e.slice(s - (n.options.slidesToShow - o), s + o).addClass("slick-active").attr("aria-hidden", "false") : e.slice(s, s + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === n.options.lazyLoad && n.lazyLoad()
        }, i.prototype.setupInfinite = function() {
            var i, e, s, o = this;
            if (o.options.fade === !0 && (o.options.centerMode = !1), o.options.infinite === !0 && o.options.fade === !1 && (e = null, o.slideCount > o.options.slidesToShow)) {
                for (s = o.options.centerMode === !0 ? o.options.slidesToShow + 1 : o.options.slidesToShow, i = o.slideCount; i > o.slideCount - s; i -= 1) e = i - 1, t(o.$slides[e]).clone(!0).attr("id", "").attr("data-slick-index", e - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
                for (i = 0; s > i; i += 1) e = i, t(o.$slides[e]).clone(!0).attr("id", "").attr("data-slick-index", e + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
                o.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                    t(this).attr("id", "")
                })
            }
        }, i.prototype.setPaused = function(t) {
            var i = this;
            i.options.autoplay === !0 && i.options.pauseOnHover === !0 && (i.paused = t, t ? i.autoPlayClear() : i.autoPlay())
        }, i.prototype.selectHandler = function(i) {
            var e = this,
                s = t(i.target).is(".slick-slide") ? t(i.target) : t(i.target).parents(".slick-slide"),
                o = parseInt(s.attr("data-slick-index"));
            return o || (o = 0), e.slideCount <= e.options.slidesToShow ? (e.setSlideClasses(o), void e.asNavFor(o)) : void e.slideHandler(o)
        }, i.prototype.slideHandler = function(t, i, e) {
            var s, o, n, r, a = null,
                l = this;
            return i = i || !1, l.animating === !0 && l.options.waitForAnimate === !0 || l.options.fade === !0 && l.currentSlide === t || l.slideCount <= l.options.slidesToShow ? void 0 : (i === !1 && l.asNavFor(t), s = t, a = l.getLeft(s), r = l.getLeft(l.currentSlide), l.currentLeft = null === l.swipeLeft ? r : l.swipeLeft, l.options.infinite === !1 && l.options.centerMode === !1 && (0 > t || t > l.getDotCount() * l.options.slidesToScroll) ? void(l.options.fade === !1 && (s = l.currentSlide, e !== !0 ? l.animateSlide(r, function() {
                l.postSlide(s)
            }) : l.postSlide(s))) : l.options.infinite === !1 && l.options.centerMode === !0 && (0 > t || t > l.slideCount - l.options.slidesToScroll) ? void(l.options.fade === !1 && (s = l.currentSlide, e !== !0 ? l.animateSlide(r, function() {
                l.postSlide(s)
            }) : l.postSlide(s))) : (l.options.autoplay === !0 && clearInterval(l.autoPlayTimer), o = 0 > s ? 0 !== l.slideCount % l.options.slidesToScroll ? l.slideCount - l.slideCount % l.options.slidesToScroll : l.slideCount + s : s >= l.slideCount ? 0 !== l.slideCount % l.options.slidesToScroll ? 0 : s - l.slideCount : s, l.animating = !0, l.$slider.trigger("beforeChange", [l, l.currentSlide, o]), n = l.currentSlide, l.currentSlide = o, l.setSlideClasses(l.currentSlide), l.updateDots(), l.updateArrows(), l.options.fade === !0 ? (e !== !0 ? (l.fadeSlideOut(n), l.fadeSlide(o, function() {
                l.postSlide(o)
            })) : l.postSlide(o), void l.animateHeight()) : void(e !== !0 ? l.animateSlide(a, function() {
                l.postSlide(o)
            }) : l.postSlide(o))))
        }, i.prototype.startLoad = function() {
            var t = this;
            t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.hide(), t.$slider.addClass("slick-loading")
        }, i.prototype.swipeDirection = function() {
            var t, i, e, s, o = this;
            return t = o.touchObject.startX - o.touchObject.curX, i = o.touchObject.startY - o.touchObject.curY, e = Math.atan2(i, t), s = Math.round(180 * e / Math.PI), 0 > s && (s = 360 - Math.abs(s)), 45 >= s && s >= 0 ? o.options.rtl === !1 ? "left" : "right" : 360 >= s && s >= 315 ? o.options.rtl === !1 ? "left" : "right" : s >= 135 && 225 >= s ? o.options.rtl === !1 ? "right" : "left" : o.options.verticalSwiping === !0 ? s >= 35 && 135 >= s ? "left" : "right" : "vertical"
        }, i.prototype.swipeEnd = function() {
            var t, i = this;
            if (i.dragging = !1, i.shouldClick = !(i.touchObject.swipeLength > 10), void 0 === i.touchObject.curX) return !1;
            if (i.touchObject.edgeHit === !0 && i.$slider.trigger("edge", [i, i.swipeDirection()]), i.touchObject.swipeLength >= i.touchObject.minSwipe) switch (i.swipeDirection()) {
                case "left":
                    t = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide + i.getSlideCount()) : i.currentSlide + i.getSlideCount(), i.slideHandler(t), i.currentDirection = 0, i.touchObject = {}, i.$slider.trigger("swipe", [i, "left"]);
                    break;
                case "right":
                    t = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide - i.getSlideCount()) : i.currentSlide - i.getSlideCount(), i.slideHandler(t), i.currentDirection = 1, i.touchObject = {}, i.$slider.trigger("swipe", [i, "right"])
            } else i.touchObject.startX !== i.touchObject.curX && (i.slideHandler(i.currentSlide), i.touchObject = {})
        }, i.prototype.swipeHandler = function(t) {
            var i = this;
            if (!(i.options.swipe === !1 || "ontouchend" in document && i.options.swipe === !1 || i.options.draggable === !1 && -1 !== t.type.indexOf("mouse"))) switch (i.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1, i.touchObject.minSwipe = i.listWidth / i.options.touchThreshold, i.options.verticalSwiping === !0 && (i.touchObject.minSwipe = i.listHeight / i.options.touchThreshold), t.data.action) {
                case "start":
                    i.swipeStart(t);
                    break;
                case "move":
                    i.swipeMove(t);
                    break;
                case "end":
                    i.swipeEnd(t)
            }
        }, i.prototype.swipeMove = function(t) {
            var i, e, s, o, n, r = this;
            return n = void 0 !== t.originalEvent ? t.originalEvent.touches : null, !(!r.dragging || n && 1 !== n.length) && (i = r.getLeft(r.currentSlide), r.touchObject.curX = void 0 !== n ? n[0].pageX : t.clientX, r.touchObject.curY = void 0 !== n ? n[0].pageY : t.clientY, r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curX - r.touchObject.startX, 2))), r.options.verticalSwiping === !0 && (r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curY - r.touchObject.startY, 2)))), e = r.swipeDirection(), "vertical" !== e ? (void 0 !== t.originalEvent && r.touchObject.swipeLength > 4 && t.preventDefault(), o = (r.options.rtl === !1 ? 1 : -1) * (r.touchObject.curX > r.touchObject.startX ? 1 : -1), r.options.verticalSwiping === !0 && (o = r.touchObject.curY > r.touchObject.startY ? 1 : -1), s = r.touchObject.swipeLength, r.touchObject.edgeHit = !1, r.options.infinite === !1 && (0 === r.currentSlide && "right" === e || r.currentSlide >= r.getDotCount() && "left" === e) && (s = r.touchObject.swipeLength * r.options.edgeFriction, r.touchObject.edgeHit = !0), r.swipeLeft = r.options.vertical === !1 ? i + s * o : i + s * (r.$list.height() / r.listWidth) * o, r.options.verticalSwiping === !0 && (r.swipeLeft = i + s * o), r.options.fade !== !0 && r.options.touchMove !== !1 && (r.animating === !0 ? (r.swipeLeft = null, !1) : void r.setCSS(r.swipeLeft))) : void 0)
        }, i.prototype.swipeStart = function(t) {
            var i, e = this;
            return 1 !== e.touchObject.fingerCount || e.slideCount <= e.options.slidesToShow ? (e.touchObject = {}, !1) : (void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (i = t.originalEvent.touches[0]), e.touchObject.startX = e.touchObject.curX = void 0 !== i ? i.pageX : t.clientX, e.touchObject.startY = e.touchObject.curY = void 0 !== i ? i.pageY : t.clientY, void(e.dragging = !0))
        }, i.prototype.unfilterSlides = i.prototype.slickUnfilter = function() {
            var t = this;
            null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit())
        }, i.prototype.unload = function() {
            var i = this;
            t(".slick-cloned", i.$slider).remove(), i.$dots && i.$dots.remove(), i.$prevArrow && i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove(), i.$nextArrow && i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove(), i.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
        }, i.prototype.unslick = function(t) {
            var i = this;
            i.$slider.trigger("unslick", [i, t]), i.destroy()
        }, i.prototype.updateArrows = function() {
            var t, i = this;
            t = Math.floor(i.options.slidesToShow / 2), i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && i.options.centerMode === !1 ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && i.options.centerMode === !0 && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
        }, i.prototype.updateDots = function() {
            var t = this;
            null !== t.$dots && (t.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
        }, i.prototype.visibility = function() {
            var t = this;
            document[t.hidden] ? (t.paused = !0, t.autoPlayClear()) : t.options.autoplay === !0 && (t.paused = !1, t.autoPlay())
        }, i.prototype.initADA = function() {
            var i = this;
            i.$slides.add(i.$slideTrack.find(".slick-cloned")).attr({
                "aria-hidden": "true",
                tabindex: "-1"
            }).find("a, input, button, select").attr({
                tabindex: "-1"
            }), i.$slideTrack.attr("role", "listbox"), i.$slides.not(i.$slideTrack.find(".slick-cloned")).each(function(e) {
                t(this).attr({
                    role: "option",
                    "aria-describedby": "slick-slide" + i.instanceUid + e
                })
            }), null !== i.$dots && i.$dots.attr("role", "tablist").find("li").each(function(e) {
                t(this).attr({
                    role: "presentation",
                    "aria-selected": "false",
                    "aria-controls": "navigation" + i.instanceUid + e,
                    id: "slick-slide" + i.instanceUid + e
                })
            }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), i.activateADA()
        }, i.prototype.activateADA = function() {
            var t = this,
                i = t.$slider.find("*").is(":focus");
            t.$slideTrack.find(".slick-active").attr({
                "aria-hidden": "false",
                tabindex: "0"
            }).find("a, input, button, select").attr({
                tabindex: "0"
            }), i && t.$slideTrack.find(".slick-active").focus()
        }, i.prototype.focusHandler = function() {
            var i = this;
            i.$slider.on("focus.slick blur.slick", "*", function(e) {
                e.stopImmediatePropagation();
                var s = t(this);
                setTimeout(function() {
                    i.isPlay && (s.is(":focus") ? (i.autoPlayClear(), i.paused = !0) : (i.paused = !1, i.autoPlay()))
                }, 0)
            })
        }, t.fn.slick = function() {
            var t, e = this,
                s = arguments[0],
                o = Array.prototype.slice.call(arguments, 1),
                n = e.length,
                r = 0;
            for (r; n > r; r++)
                if ("object" == typeof s || "undefined" == typeof s ? e[r].slick = new i(e[r], s) : t = e[r].slick[s].apply(e[r].slick, o), "undefined" != typeof t) return t;
            return e
        }
    }), void 0 === wwctrials) var wwctrials = {};
if (wwctrials.tracking = function(t) {
        var i = {
            init: function() {
                this.eventTracking()
            },
            eventTracking: function() {
                t("._gt").on("click", function() {
                    var i = t(this),
                        e = i.data("category"),
                        s = i.data("action"),
                        o = i.data("label");
                    wwctrials.tracking.trackEvent(e, s, o)
                }), t(".library-gate-box .btn").on("click", function() {
                    wwctrials.tracking.trackEvent("Research Library", "Submit", "Gated Content Submit")
                }), t(".library-list").on("click", ".read-more", function() {
                    var i = t(this),
                        e = i.closest(".library-item").find(".library-title").text(),
                        s = e.split(" "),
                        o = "";
                    if (s.length <= 5) o = e + " ";
                    else
                        for (var n = 0; n < 5; n++) o += s[n] + " ";
                    o += "- Read More", wwctrials.tracking.trackEvent("Research Library", "Read More", o)
                }), t('.investigator-form input[type="submit"]').click(function() {
                    wwctrials.tracking.trackEvent("Investigator", "Submit", "Investigator Form-Submit")
                });
                var i = t(".footer");
                i.find(".fa-facebook").on("click", function() {
                    wwctrials.tracking.trackEvent("Social Links", "Click", "Facebook")
                }), i.find(".fa-twitter").on("click", function() {
                    wwctrials.tracking.trackEvent("Social Links", "Click", "Twitter")
                }), i.find(".fa-linkedin").on("click", function() {
                    wwctrials.tracking.trackEvent("Social Links", "Click", "LinkedIn")
                })
            },
            trackContactSubmit: function() {
                wwctrials.tracking.trackEvent("Contact Us", "Submit", "Contact Form-Submit")
            },
            trackEvent: function(t, i, e) {
                "function" == typeof ga ? ga("send", "event", t, i, e) : console.log("Unable to log event: \nCategory: " + t + "\nAction: " + i + "\nLabel: " + e)
            }
        };
        return i
    }(jQuery), jQuery(document).ready(function($) {
        wwctrials.tracking.init()
    }), void 0 === wwctrials) var wwctrials = {};
if (wwctrials.main = function(t) {
        var i = t("body").is(".EditMode"),
            e = t("body").is(".DesignMode"),
            s = {
                init: function() {
                    this.externalLinks(), this.heroArrow(), this.mobileNav(), this.clickFirstLink(), this.parallax(), this.homeTherapeuticAreas(), this.scrollable(), this.tabSelector(), this.regionalMessage(), this.videoModal(), this.librarySignupModal(), this.collapsibleBox(), this.searchToggle(), this.imageSlider(), this.contactUs(), this.methodsSearch()
                },
                externalLinks: function() {
                    t('a[href^="http"]').each(function() {
                        this.href.indexOf(location.host) == -1 && t(this).attr("target", "_blank")
                    })
                },
                collapsibleBox: function() {
                    var s = t(".collapsible-box-webpart");
                    if (s.length > 0)
                        if (i || e) {
                            var o = s.find(".collapsible-heading");
                            o.addClass("active"), o.next(".collapsible-content").show()
                        } else s.find(".collapsible-heading").on("click", function() {
                            var i = t(this);
                            i.toggleClass("active"), i.next(".collapsible-content").slideToggle()
                        })
                },
                searchToggle: function() {
                    t(".header-search").length > 0 && (t(".search-toggle").on("click", function() {
                        var i = t(this),
                            e = t(".header-search");
                        i.hasClass("active") ? (i.removeClass("active"), e.fadeOut()) : (i.addClass("active"), e.fadeIn())
                    }), t(".search-close").on("click", function() {
                        var i = t(".header-search"),
                            e = t(".search-toggle");
                        e.removeClass("active"), i.fadeOut()
                    }))
                },
                heroArrow: function() {
                    var i = t(".hero-image-webpart, .hero-video-webpart"),
                        e = i.find(".down-arrow");
                    e.on("click", function() {
                        t("html, body").animate({
                            scrollTop: i.offset().top + i.height()
                        }, 500)
                    })
                },
                parallax: function() {
                    if (console.log("paralax activated"), s.isMobile.any()) return void t(".hero-image-webpart").each(function(i, e) {
                        t(this).find(".img-bg").css("background-position", "50% 0"), t(this).find(".img-bg").css("background-attachment", "scroll")
                    });
                    var i = [],
                        e = function() {
                            i = [], t(".hero-image-webpart").each(function(e, s) {
                                e > 0 ? (t(this).find(".img-bg").css("background-position", "50% 0"), t(this).find(".img-bg").css("background-attachment", "scroll")) : i.push({
                                    startingPos: t(s).offset().top,
                                    elem: t(s)
                                })
                            })
                        };
                    e(), t(window).on("resize", function() {
                        e(), t(window).trigger("scroll")
                    }), t(window).on("scroll", function() {
                        t(i).each(function(i, e) {
                            var s = e.startingPos - t(window).scrollTop();
                            s < 0 ? e.elem.find(".img-bg").css("background-position", "50% " + s / 2 + "px") : e.elem.find(".img-bg").css("background-position", "50% " + s + "px")
                        })
                    }), t(window).trigger("scroll")
                },
                mobileNav: function() {
                    var i = t(".nav-icon"),
                        e = t(".mobile-nav");
                    if (e.is(":visible")) {
                        i.on("click", function() {
                            t(this).is(".open") ? e.removeClass("open") : e.addClass("open")
                        });
                        var s = e.find(".root-nav"),
                            o = e.find(".sub-nav");
                        o.each(function() {
                            var i = t(this),
                                s = i.siblings("a");
                            s.data("subnav", i), s.addClass("has-children"), i.remove().appendTo(e)
                        }), t(window).on("load", function() {
                            new IScroll(s.get(0), {
                                click: !0
                            }), o.each(function() {
                                new IScroll(this, {
                                    click: !0
                                })
                            })
                        }), e.on("click", "a", function(i) {
                            var s = t(this),
                                n = s.data("subnav");
                            void 0 != n ? (i.preventDefault(), n.addClass("open")) : (e.removeClass("open"), o.removeCLass("open"))
                        }), e.on("click", ".back", function(i) {
                            var e = t(this);
                            e.closest(".sub-nav").removeClass("open")
                        })
                    } else i.on("click", function() {
                        var e = t(".primary-nav");
                        t(this).is(".open") ? (e.removeClass("open"), i.removeClass("open")) : (e.addClass("open"), i.addClass("open"))
                    })
                },
                clickFirstLink: function() {
                    i || t(".click-first-link").on("click", function() {
                        var i = t(this).find("a[href]").attr("href");
                        void 0 != i && "" != i && (window.location = i)
                    })
                },
                homeTherapeuticAreas: function() {
                    var i = t(".home-therapeutic-icons-wrapper"),
                        e = t(".home-therapeutic-icon"),
                        s = Math.max(e.length, 1);
                    i.on("click", ".next, .previous", function(i) {
                        var o, n = t(i.target),
                            r = e.index(e.filter(".active").get(0));
                        o = n.is(".next") ? (r + 1) % s : 0 == r ? s - 1 : r - 1, e.eq(r).removeClass("active"), e.eq(o).addClass("active")
                    })
                },
                scrollable: function() {
                    t(window).load(function() {
                        var i = t(".scroll-wrapper");
                        i.each(function(i, e) {
                            var s = t(e),
                                o = s.find(".scroller");
                            1 == o.length && (s.height(o.height()), new IScroll(e, {
                                eventPassthrough: !0,
                                scrollX: !0,
                                scrollY: !1
                            }))
                        })
                    })
                },
                tabSelector: function() {
                    var i = t(".tabs");
                    i.on("click", ".tab", function(i) {
                        var e = t(this),
                            s = e.closest(".tabs"),
                            o = s.find(".tab");
                        o.length > 1 && 1 == o.filter(":visible").length ? (i.preventDefault(), s.addClass("overlay")) : s.is(".overlay") && e.is(".selected") && (i.preventDefault(), s.removeClass("overlay"))
                    })
                },
                regionalMessage: function() {
                    var i = t(".regional-message-webpart");
                    i.find(".close-btn").on("click", function() {
                        i.addClass("hide"), s.setCookie("rgnmsg", "1", 365)
                    })
                },
                videoModal: function() {
                    var i = t(".video-modal"),
                        e = i.find(".video-iframe"),
                        o = i.find(".modal-title");
                    i.on("show.bs.modal", function(i) {
                        var n = t(i.relatedTarget),
                            r = n.data("title");
                        o.text(r);
                        var a = s.convertToYouTubeEmbedUrl(n.attr("href"));
                        e.attr("src", a)
                    }), i.on("hide.bs.modal", function() {
                        e.attr("src", "")
                    })
                },
                librarySignupModal: function() {
                    var i = t(".library-signup-modal"),
                        e = i.find(".feature-signup-success a");
                    if (i.length > 0) {
                        var o = t(".library-featured a, .featured-resource a");
                        o.on("click", function(o) {
                            var n = t(this);
                            e.attr("href", n.attr("href"));
                            var r = s.getCookie("libsignup");
                            "1" != r && (o.preventDefault(), i.modal("show"))
                        })
                    }
                },
                imageSlider: function() {
                    t(".image-slider-webpart").each(function() {
                        var i = t(this);
                        i.slick({
                            arrows: !0,
                            dots: !0,
                            autoplay: !0,
                            autoplaySpeed: 12e3,
                            slide: ".image-slide",
                            prevArrow: ".prev-slide",
                            nextArrow: ".next-slide"
                        })
                    })
                },
                contactUs: function() {
                    var i = t(".contact-us-webpart"),
                        e = null;
                    if (i.length > 0) {
                        var s = i.find(".contact-options");
                        s.on("change", function() {
                            var t = i.find("." + this.value);
                            t.length > 0 && (null != e && e.hide(), t.show(), e = t)
                        })
                    }
                },
                methodsSearch: function() {
                    var i = t(".methods-search-webpart"),
                        e = i.find(".textbox"),
                        s = i.find("input[type=submit]");
                    e.on("keypress", function(t) {
                        if (13 === t.keyCode) return t.preventDefault(), s.click(), !1
                    })
                },
                convertToYouTubeEmbedUrl: function(t) {
                    var i = /v=([^&]+)/,
                        e = i.exec(t);
                    return e.length > 1 ? "https://www.youtube.com/embed/" + e[1] + "?autoplay=1&autohide=0" : ""
                },
                getCookie: function(t) {
                    for (var i = t + "=", e = document.cookie.split(";"), s = 0; s < e.length; s++) {
                        for (var o = e[s];
                            " " == o.charAt(0);) o = o.substring(1);
                        if (0 == o.indexOf(i)) return o.substring(i.length, o.length)
                    }
                    return ""
                },
                setCookie: function(t, i, e) {
                    var s = new Date;
                    s.setTime(s.getTime() + 24 * e * 60 * 60 * 1e3);
                    var o = "expires=" + s.toUTCString();
                    document.cookie = t + "=" + i + "; " + o
                },
                isMobile: {
                    android: function() {
                        return !!navigator.userAgent.match(/Android/i)
                    },
                    blackBerry: function() {
                        return !!navigator.userAgent.match(/BlackBerry/i)
                    },
                    iOS: function() {
                        return !!navigator.userAgent.match(/iPhone|iPad|iPod/i)
                    },
                    iOS7: function() {
                        if (!this.iOS()) return !1;
                        var t = this.iOSVersion();
                        return t[0] > 6 && t[0] < 8
                    },
                    windows: function() {
                        return !!navigator.userAgent.match(/IEMobile/i)
                    },
                    any: function() {
                        return this.android() || this.blackBerry() || this.iOS() || this.windows()
                    },
                    iOSVersion: function() {
                        if (this.iOS()) {
                            var t = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                            return [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3] || 0, 10)]
                        }
                        return []
                    }
                }
            };
        return s
    }(jQuery), jQuery(function($) {
        wwctrials.main.init()
    }), function(t, i, e) {
        function s(t, e) {
            this.wrapper = "string" == typeof t ? i.querySelector(t) : t, this.scroller = this.wrapper.children[0], this.scrollerStyle = this.scroller.style, this.options = {
                resizeScrollbars: !0,
                mouseWheelSpeed: 20,
                snapThreshold: .334,
                startX: 0,
                startY: 0,
                scrollY: !0,
                directionLockThreshold: 5,
                momentum: !0,
                bounce: !0,
                bounceTime: 600,
                bounceEasing: "",
                preventDefault: !0,
                preventDefaultException: {
                    tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
                },
                HWCompositing: !0,
                useTransition: !0,
                useTransform: !0
            };
            for (var s in e) this.options[s] = e[s];
            this.translateZ = this.options.HWCompositing && a.hasPerspective ? " translateZ(0)" : "", this.options.useTransition = a.hasTransition && this.options.useTransition, this.options.useTransform = a.hasTransform && this.options.useTransform, this.options.eventPassthrough = this.options.eventPassthrough === !0 ? "vertical" : this.options.eventPassthrough, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollY = "vertical" != this.options.eventPassthrough && this.options.scrollY, this.options.scrollX = "horizontal" != this.options.eventPassthrough && this.options.scrollX, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? a.ease[this.options.bounceEasing] || a.ease.circular : this.options.bounceEasing, this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling, this.options.tap === !0 && (this.options.tap = "tap"), "scale" == this.options.shrinkScrollbars && (this.options.useTransition = !1), this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1, this.x = 0, this.y = 0, this.directionX = 0, this.directionY = 0, this._events = {}, this._init(), this.refresh(), this.scrollTo(this.options.startX, this.options.startY), this.enable()
        }

        function o(t, e, s) {
            var o = i.createElement("div"),
                n = i.createElement("div");
            return s === !0 && (o.style.cssText = "position:absolute;z-index:9999", n.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"), n.className = "iScrollIndicator", "h" == t ? (s === !0 && (o.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", n.style.height = "100%"), o.className = "iScrollHorizontalScrollbar") : (s === !0 && (o.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", n.style.width = "100%"), o.className = "iScrollVerticalScrollbar"), o.style.cssText += ";overflow:hidden", e || (o.style.pointerEvents = "none"), o.appendChild(n), o
        }

        function n(e, s) {
            this.wrapper = "string" == typeof s.el ? i.querySelector(s.el) : s.el, this.wrapperStyle = this.wrapper.style, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = e, this.options = {
                listenX: !0,
                listenY: !0,
                interactive: !1,
                resize: !0,
                defaultScrollbars: !1,
                shrink: !1,
                fade: !1,
                speedRatioX: 0,
                speedRatioY: 0
            };
            for (var o in s) this.options[o] = s[o];
            this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.options.interactive && (this.options.disableTouch || (a.addEvent(this.indicator, "touchstart", this), a.addEvent(t, "touchend", this)), this.options.disablePointer || (a.addEvent(this.indicator, a.prefixPointerEvent("pointerdown"), this), a.addEvent(t, a.prefixPointerEvent("pointerup"), this)), this.options.disableMouse || (a.addEvent(this.indicator, "mousedown", this), a.addEvent(t, "mouseup", this))), this.options.fade && (this.wrapperStyle[a.style.transform] = this.scroller.translateZ, this.wrapperStyle[a.style.transitionDuration] = a.isBadAndroid ? "0.001s" : "0ms", this.wrapperStyle.opacity = "0")
        }
        var r = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame || function(i) {
                t.setTimeout(i, 1e3 / 60)
            },
            a = function() {
                function s(t) {
                    return r !== !1 && ("" === r ? t : r + t.charAt(0).toUpperCase() + t.substr(1))
                }
                var o = {},
                    n = i.createElement("div").style,
                    r = function() {
                        for (var t, i = ["t", "webkitT", "MozT", "msT", "OT"], e = 0, s = i.length; e < s; e++)
                            if (t = i[e] + "ransform", t in n) return i[e].substr(0, i[e].length - 1);
                        return !1
                    }();
                o.getTime = Date.now || function() {
                    return (new Date).getTime()
                }, o.extend = function(t, i) {
                    for (var e in i) t[e] = i[e]
                }, o.addEvent = function(t, i, e, s) {
                    t.addEventListener(i, e, !!s)
                }, o.removeEvent = function(t, i, e, s) {
                    t.removeEventListener(i, e, !!s)
                }, o.prefixPointerEvent = function(i) {
                    return t.MSPointerEvent ? "MSPointer" + i.charAt(9).toUpperCase() + i.substr(10) : i
                }, o.momentum = function(t, i, s, o, n, r) {
                    var a, l, h = t - i,
                        c = e.abs(h) / s;
                    return r = void 0 === r ? 6e-4 : r, a = t + c * c / (2 * r) * (h < 0 ? -1 : 1), l = c / r, a < o ? (a = n ? o - n / 2.5 * (c / 8) : o, h = e.abs(a - t), l = h / c) : a > 0 && (a = n ? n / 2.5 * (c / 8) : 0, h = e.abs(t) + a, l = h / c), {
                        destination: e.round(a),
                        duration: l
                    }
                };
                var a = s("transform");
                return o.extend(o, {
                    hasTransform: a !== !1,
                    hasPerspective: s("perspective") in n,
                    hasTouch: "ontouchstart" in t,
                    hasPointer: t.PointerEvent || t.MSPointerEvent,
                    hasTransition: s("transition") in n
                }), o.isBadAndroid = /Android /.test(t.navigator.appVersion) && !/Chrome\/\d/.test(t.navigator.appVersion), o.extend(o.style = {}, {
                    transform: a,
                    transitionTimingFunction: s("transitionTimingFunction"),
                    transitionDuration: s("transitionDuration"),
                    transitionDelay: s("transitionDelay"),
                    transformOrigin: s("transformOrigin")
                }), o.hasClass = function(t, i) {
                    var e = new RegExp("(^|\\s)" + i + "(\\s|$)");
                    return e.test(t.className)
                }, o.addClass = function(t, i) {
                    if (!o.hasClass(t, i)) {
                        var e = t.className.split(" ");
                        e.push(i), t.className = e.join(" ")
                    }
                }, o.removeClass = function(t, i) {
                    if (o.hasClass(t, i)) {
                        var e = new RegExp("(^|\\s)" + i + "(\\s|$)", "g");
                        t.className = t.className.replace(e, " ")
                    }
                }, o.offset = function(t) {
                    for (var i = -t.offsetLeft, e = -t.offsetTop; t = t.offsetParent;) i -= t.offsetLeft, e -= t.offsetTop;
                    return {
                        left: i,
                        top: e
                    }
                }, o.preventDefaultException = function(t, i) {
                    for (var e in i)
                        if (i[e].test(t[e])) return !0;
                    return !1
                }, o.extend(o.eventType = {}, {
                    touchstart: 1,
                    touchmove: 1,
                    touchend: 1,
                    mousedown: 2,
                    mousemove: 2,
                    mouseup: 2,
                    pointerdown: 3,
                    pointermove: 3,
                    pointerup: 3,
                    MSPointerDown: 3,
                    MSPointerMove: 3,
                    MSPointerUp: 3
                }), o.extend(o.ease = {}, {
                    quadratic: {
                        style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        fn: function(t) {
                            return t * (2 - t)
                        }
                    },
                    circular: {
                        style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
                        fn: function(t) {
                            return e.sqrt(1 - --t * t)
                        }
                    },
                    back: {
                        style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        fn: function(t) {
                            var i = 4;
                            return (t -= 1) * t * ((i + 1) * t + i) + 1
                        }
                    },
                    bounce: {
                        style: "",
                        fn: function(t) {
                            return (t /= 1) < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                        }
                    },
                    elastic: {
                        style: "",
                        fn: function(t) {
                            var i = .22,
                                s = .4;
                            return 0 === t ? 0 : 1 == t ? 1 : s * e.pow(2, -10 * t) * e.sin((t - i / 4) * (2 * e.PI) / i) + 1
                        }
                    }
                }), o.tap = function(t, e) {
                    var s = i.createEvent("Event");
                    s.initEvent(e, !0, !0), s.pageX = t.pageX, s.pageY = t.pageY, t.target.dispatchEvent(s)
                }, o.click = function(t) {
                    var e, s = t.target;
                    /(SELECT|INPUT|TEXTAREA)/i.test(s.tagName) || (e = i.createEvent("MouseEvents"), e.initMouseEvent("click", !0, !0, t.view, 1, s.screenX, s.screenY, s.clientX, s.clientY, t.ctrlKey, t.altKey, t.shiftKey, t.metaKey, 0, null), e._constructed = !0, s.dispatchEvent(e))
                }, o
            }();
        s.prototype = {
            version: "5.1.3",
            _init: function() {
                this._initEvents(), (this.options.scrollbars || this.options.indicators) && this._initIndicators(), this.options.mouseWheel && this._initWheel(), this.options.snap && this._initSnap(), this.options.keyBindings && this._initKeys()
            },
            destroy: function() {
                this._initEvents(!0), this._execEvent("destroy")
            },
            _transitionEnd: function(t) {
                t.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, this._execEvent("scrollEnd")))
            },
            _start: function(t) {
                if ((1 == a.eventType[t.type] || 0 === t.button) && this.enabled && (!this.initiated || a.eventType[t.type] === this.initiated)) {
                    !this.options.preventDefault || a.isBadAndroid || a.preventDefaultException(t.target, this.options.preventDefaultException) || t.preventDefault();
                    var i, s = t.touches ? t.touches[0] : t;
                    this.initiated = a.eventType[t.type], this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.directionLocked = 0, this._transitionTime(), this.startTime = a.getTime(), this.options.useTransition && this.isInTransition ? (this.isInTransition = !1, i = this.getComputedPosition(), this._translate(e.round(i.x), e.round(i.y)), this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this._execEvent("scrollEnd")), this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = s.pageX, this.pointY = s.pageY, this._execEvent("beforeScrollStart")
                }
            },
            _move: function(t) {
                if (this.enabled && a.eventType[t.type] === this.initiated) {
                    this.options.preventDefault && t.preventDefault();
                    var i, s, o, n, r = t.touches ? t.touches[0] : t,
                        l = r.pageX - this.pointX,
                        h = r.pageY - this.pointY,
                        c = a.getTime();
                    if (this.pointX = r.pageX, this.pointY = r.pageY, this.distX += l, this.distY += h, o = e.abs(this.distX), n = e.abs(this.distY), !(c - this.endTime > 300 && o < 10 && n < 10)) {
                        if (this.directionLocked || this.options.freeScroll || (o > n + this.options.directionLockThreshold ? this.directionLocked = "h" : n >= o + this.options.directionLockThreshold ? this.directionLocked = "v" : this.directionLocked = "n"), "h" == this.directionLocked) {
                            if ("vertical" == this.options.eventPassthrough) t.preventDefault();
                            else if ("horizontal" == this.options.eventPassthrough) return void(this.initiated = !1);
                            h = 0
                        } else if ("v" == this.directionLocked) {
                            if ("horizontal" == this.options.eventPassthrough) t.preventDefault();
                            else if ("vertical" == this.options.eventPassthrough) return void(this.initiated = !1);
                            l = 0
                        }
                        l = this.hasHorizontalScroll ? l : 0, h = this.hasVerticalScroll ? h : 0, i = this.x + l, s = this.y + h, (i > 0 || i < this.maxScrollX) && (i = this.options.bounce ? this.x + l / 3 : i > 0 ? 0 : this.maxScrollX), (s > 0 || s < this.maxScrollY) && (s = this.options.bounce ? this.y + h / 3 : s > 0 ? 0 : this.maxScrollY), this.directionX = l > 0 ? -1 : l < 0 ? 1 : 0, this.directionY = h > 0 ? -1 : h < 0 ? 1 : 0, this.moved || this._execEvent("scrollStart"), this.moved = !0, this._translate(i, s), c - this.startTime > 300 && (this.startTime = c, this.startX = this.x, this.startY = this.y)
                    }
                }
            },
            _end: function(t) {
                if (this.enabled && a.eventType[t.type] === this.initiated) {
                    this.options.preventDefault && !a.preventDefaultException(t.target, this.options.preventDefaultException) && t.preventDefault();
                    var i, s, o = (t.changedTouches ? t.changedTouches[0] : t, a.getTime() - this.startTime),
                        n = e.round(this.x),
                        r = e.round(this.y),
                        l = e.abs(n - this.startX),
                        h = e.abs(r - this.startY),
                        c = 0,
                        d = "";
                    if (this.isInTransition = 0, this.initiated = 0, this.endTime = a.getTime(), !this.resetPosition(this.options.bounceTime)) {
                        if (this.scrollTo(n, r), !this.moved) return this.options.tap && a.tap(t, this.options.tap), this.options.click && a.click(t), void this._execEvent("scrollCancel");
                        if (this._events.flick && o < 200 && l < 100 && h < 100) return void this._execEvent("flick");
                        if (this.options.momentum && o < 300 && (i = this.hasHorizontalScroll ? a.momentum(this.x, this.startX, o, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
                                destination: n,
                                duration: 0
                            }, s = this.hasVerticalScroll ? a.momentum(this.y, this.startY, o, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
                                destination: r,
                                duration: 0
                            }, n = i.destination, r = s.destination, c = e.max(i.duration, s.duration), this.isInTransition = 1), this.options.snap) {
                            var p = this._nearestSnap(n, r);
                            this.currentPage = p, c = this.options.snapSpeed || e.max(e.max(e.min(e.abs(n - p.x), 1e3), e.min(e.abs(r - p.y), 1e3)), 300), n = p.x, r = p.y, this.directionX = 0, this.directionY = 0, d = this.options.bounceEasing
                        }
                        return n != this.x || r != this.y ? ((n > 0 || n < this.maxScrollX || r > 0 || r < this.maxScrollY) && (d = a.ease.quadratic), void this.scrollTo(n, r, c, d)) : void this._execEvent("scrollEnd")
                    }
                }
            },
            _resize: function() {
                var t = this;
                clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() {
                    t.refresh()
                }, this.options.resizePolling)
            },
            resetPosition: function(t) {
                var i = this.x,
                    e = this.y;
                return t = t || 0, !this.hasHorizontalScroll || this.x > 0 ? i = 0 : this.x < this.maxScrollX && (i = this.maxScrollX), !this.hasVerticalScroll || this.y > 0 ? e = 0 : this.y < this.maxScrollY && (e = this.maxScrollY), (i != this.x || e != this.y) && (this.scrollTo(i, e, t, this.options.bounceEasing), !0)
            },
            disable: function() {
                this.enabled = !1
            },
            enable: function() {
                this.enabled = !0
            },
            refresh: function() {
                this.wrapper.offsetHeight, this.wrapperWidth = this.wrapper.clientWidth, this.wrapperHeight = this.wrapper.clientHeight, this.scrollerWidth = this.scroller.offsetWidth, this.scrollerHeight = this.scroller.offsetHeight, this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.maxScrollY = this.wrapperHeight - this.scrollerHeight, this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, this.wrapperOffset = a.offset(this.wrapper), this._execEvent("refresh"), this.resetPosition()
            },
            on: function(t, i) {
                this._events[t] || (this._events[t] = []), this._events[t].push(i)
            },
            off: function(t, i) {
                if (this._events[t]) {
                    var e = this._events[t].indexOf(i);
                    e > -1 && this._events[t].splice(e, 1)
                }
            },
            _execEvent: function(t) {
                if (this._events[t]) {
                    var i = 0,
                        e = this._events[t].length;
                    if (e)
                        for (; i < e; i++) this._events[t][i].apply(this, [].slice.call(arguments, 1))
                }
            },
            scrollBy: function(t, i, e, s) {
                t = this.x + t, i = this.y + i, e = e || 0, this.scrollTo(t, i, e, s)
            },
            scrollTo: function(t, i, e, s) {
                s = s || a.ease.circular, this.isInTransition = this.options.useTransition && e > 0, !e || this.options.useTransition && s.style ? (this._transitionTimingFunction(s.style), this._transitionTime(e), this._translate(t, i)) : this._animate(t, i, e, s.fn)
            },
            scrollToElement: function(t, i, s, o, n) {
                if (t = t.nodeType ? t : this.scroller.querySelector(t)) {
                    var r = a.offset(t);
                    r.left -= this.wrapperOffset.left, r.top -= this.wrapperOffset.top, s === !0 && (s = e.round(t.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), o === !0 && (o = e.round(t.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), r.left -= s || 0, r.top -= o || 0, r.left = r.left > 0 ? 0 : r.left < this.maxScrollX ? this.maxScrollX : r.left, r.top = r.top > 0 ? 0 : r.top < this.maxScrollY ? this.maxScrollY : r.top, i = void 0 === i || null === i || "auto" === i ? e.max(e.abs(this.x - r.left), e.abs(this.y - r.top)) : i, this.scrollTo(r.left, r.top, i, n)
                }
            },
            _transitionTime: function(t) {
                if (t = t || 0, this.scrollerStyle[a.style.transitionDuration] = t + "ms", !t && a.isBadAndroid && (this.scrollerStyle[a.style.transitionDuration] = "0.001s"), this.indicators)
                    for (var i = this.indicators.length; i--;) this.indicators[i].transitionTime(t)
            },
            _transitionTimingFunction: function(t) {
                if (this.scrollerStyle[a.style.transitionTimingFunction] = t, this.indicators)
                    for (var i = this.indicators.length; i--;) this.indicators[i].transitionTimingFunction(t)
            },
            _translate: function(t, i) {
                if (this.options.useTransform ? this.scrollerStyle[a.style.transform] = "translate(" + t + "px," + i + "px)" + this.translateZ : (t = e.round(t), i = e.round(i), this.scrollerStyle.left = t + "px", this.scrollerStyle.top = i + "px"), this.x = t, this.y = i, this.indicators)
                    for (var s = this.indicators.length; s--;) this.indicators[s].updatePosition()
            },
            _initEvents: function(i) {
                var e = i ? a.removeEvent : a.addEvent,
                    s = this.options.bindToWrapper ? this.wrapper : t;
                e(t, "orientationchange", this), e(t, "resize", this), this.options.click && e(this.wrapper, "click", this, !0), this.options.disableMouse || (e(this.wrapper, "mousedown", this), e(s, "mousemove", this), e(s, "mousecancel", this), e(s, "mouseup", this)), a.hasPointer && !this.options.disablePointer && (e(this.wrapper, a.prefixPointerEvent("pointerdown"), this), e(s, a.prefixPointerEvent("pointermove"), this), e(s, a.prefixPointerEvent("pointercancel"), this), e(s, a.prefixPointerEvent("pointerup"), this)), a.hasTouch && !this.options.disableTouch && (e(this.wrapper, "touchstart", this), e(s, "touchmove", this), e(s, "touchcancel", this), e(s, "touchend", this)), e(this.scroller, "transitionend", this), e(this.scroller, "webkitTransitionEnd", this), e(this.scroller, "oTransitionEnd", this), e(this.scroller, "MSTransitionEnd", this)
            },
            getComputedPosition: function() {
                var i, e, s = t.getComputedStyle(this.scroller, null);
                return this.options.useTransform ? (s = s[a.style.transform].split(")")[0].split(", "), i = +(s[12] || s[4]), e = +(s[13] || s[5])) : (i = +s.left.replace(/[^-\d.]/g, ""), e = +s.top.replace(/[^-\d.]/g, "")), {
                    x: i,
                    y: e
                }
            },
            _initIndicators: function() {
                function t(t) {
                    for (var i = a.indicators.length; i--;) t.call(a.indicators[i])
                }
                var i, e = this.options.interactiveScrollbars,
                    s = "string" != typeof this.options.scrollbars,
                    r = [],
                    a = this;
                this.indicators = [], this.options.scrollbars && (this.options.scrollY && (i = {
                    el: o("v", e, this.options.scrollbars),
                    interactive: e,
                    defaultScrollbars: !0,
                    customStyle: s,
                    resize: this.options.resizeScrollbars,
                    shrink: this.options.shrinkScrollbars,
                    fade: this.options.fadeScrollbars,
                    listenX: !1
                }, this.wrapper.appendChild(i.el), r.push(i)), this.options.scrollX && (i = {
                    el: o("h", e, this.options.scrollbars),
                    interactive: e,
                    defaultScrollbars: !0,
                    customStyle: s,
                    resize: this.options.resizeScrollbars,
                    shrink: this.options.shrinkScrollbars,
                    fade: this.options.fadeScrollbars,
                    listenY: !1
                }, this.wrapper.appendChild(i.el), r.push(i))), this.options.indicators && (r = r.concat(this.options.indicators));
                for (var l = r.length; l--;) this.indicators.push(new n(this, r[l]));
                this.options.fadeScrollbars && (this.on("scrollEnd", function() {
                    t(function() {
                        this.fade()
                    })
                }), this.on("scrollCancel", function() {
                    t(function() {
                        this.fade()
                    })
                }), this.on("scrollStart", function() {
                    t(function() {
                        this.fade(1)
                    })
                }), this.on("beforeScrollStart", function() {
                    t(function() {
                        this.fade(1, !0)
                    })
                })), this.on("refresh", function() {
                    t(function() {
                        this.refresh()
                    })
                }), this.on("destroy", function() {
                    t(function() {
                        this.destroy()
                    }), delete this.indicators
                })
            },
            _initWheel: function() {
                a.addEvent(this.wrapper, "wheel", this), a.addEvent(this.wrapper, "mousewheel", this), a.addEvent(this.wrapper, "DOMMouseScroll", this), this.on("destroy", function() {
                    a.removeEvent(this.wrapper, "wheel", this), a.removeEvent(this.wrapper, "mousewheel", this), a.removeEvent(this.wrapper, "DOMMouseScroll", this)
                })
            },
            _wheel: function(t) {
                if (this.enabled) {
                    t.preventDefault(), t.stopPropagation();
                    var i, s, o, n, r = this;
                    if (void 0 === this.wheelTimeout && r._execEvent("scrollStart"), clearTimeout(this.wheelTimeout), this.wheelTimeout = setTimeout(function() {
                            r._execEvent("scrollEnd"), r.wheelTimeout = void 0
                        }, 400), "deltaX" in t) 1 === t.deltaMode ? (i = -t.deltaX * this.options.mouseWheelSpeed, s = -t.deltaY * this.options.mouseWheelSpeed) : (i = -t.deltaX, s = -t.deltaY);
                    else if ("wheelDeltaX" in t) i = t.wheelDeltaX / 120 * this.options.mouseWheelSpeed, s = t.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
                    else if ("wheelDelta" in t) i = s = t.wheelDelta / 120 * this.options.mouseWheelSpeed;
                    else {
                        if (!("detail" in t)) return;
                        i = s = -t.detail / 3 * this.options.mouseWheelSpeed
                    }
                    if (i *= this.options.invertWheelDirection, s *= this.options.invertWheelDirection, this.hasVerticalScroll || (i = s, s = 0), this.options.snap) return o = this.currentPage.pageX, n = this.currentPage.pageY, i > 0 ? o-- : i < 0 && o++, s > 0 ? n-- : s < 0 && n++, void this.goToPage(o, n);
                    o = this.x + e.round(this.hasHorizontalScroll ? i : 0), n = this.y + e.round(this.hasVerticalScroll ? s : 0), o > 0 ? o = 0 : o < this.maxScrollX && (o = this.maxScrollX), n > 0 ? n = 0 : n < this.maxScrollY && (n = this.maxScrollY), this.scrollTo(o, n, 0)
                }
            },
            _initSnap: function() {
                this.currentPage = {}, "string" == typeof this.options.snap && (this.options.snap = this.scroller.querySelectorAll(this.options.snap)), this.on("refresh", function() {
                    var t, i, s, o, n, r, a = 0,
                        l = 0,
                        h = 0,
                        c = this.options.snapStepX || this.wrapperWidth,
                        d = this.options.snapStepY || this.wrapperHeight;
                    if (this.pages = [], this.wrapperWidth && this.wrapperHeight && this.scrollerWidth && this.scrollerHeight) {
                        if (this.options.snap === !0)
                            for (s = e.round(c / 2), o = e.round(d / 2); h > -this.scrollerWidth;) {
                                for (this.pages[a] = [], t = 0, n = 0; n > -this.scrollerHeight;) this.pages[a][t] = {
                                    x: e.max(h, this.maxScrollX),
                                    y: e.max(n, this.maxScrollY),
                                    width: c,
                                    height: d,
                                    cx: h - s,
                                    cy: n - o
                                }, n -= d, t++;
                                h -= c, a++
                            } else
                                for (r = this.options.snap, t = r.length, i = -1; a < t; a++)(0 === a || r[a].offsetLeft <= r[a - 1].offsetLeft) && (l = 0, i++), this.pages[l] || (this.pages[l] = []), h = e.max(-r[a].offsetLeft, this.maxScrollX), n = e.max(-r[a].offsetTop, this.maxScrollY), s = h - e.round(r[a].offsetWidth / 2), o = n - e.round(r[a].offsetHeight / 2), this.pages[l][i] = {
                                    x: h,
                                    y: n,
                                    width: r[a].offsetWidth,
                                    height: r[a].offsetHeight,
                                    cx: s,
                                    cy: o
                                }, h > this.maxScrollX && l++;
                        this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0), this.options.snapThreshold % 1 === 0 ? (this.snapThresholdX = this.options.snapThreshold, this.snapThresholdY = this.options.snapThreshold) : (this.snapThresholdX = e.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold), this.snapThresholdY = e.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold))
                    }
                }), this.on("flick", function() {
                    var t = this.options.snapSpeed || e.max(e.max(e.min(e.abs(this.x - this.startX), 1e3), e.min(e.abs(this.y - this.startY), 1e3)), 300);
                    this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, t)
                })
            },
            _nearestSnap: function(t, i) {
                if (!this.pages.length) return {
                    x: 0,
                    y: 0,
                    pageX: 0,
                    pageY: 0
                };
                var s = 0,
                    o = this.pages.length,
                    n = 0;
                if (e.abs(t - this.absStartX) < this.snapThresholdX && e.abs(i - this.absStartY) < this.snapThresholdY) return this.currentPage;
                for (t > 0 ? t = 0 : t < this.maxScrollX && (t = this.maxScrollX), i > 0 ? i = 0 : i < this.maxScrollY && (i = this.maxScrollY); s < o; s++)
                    if (t >= this.pages[s][0].cx) {
                        t = this.pages[s][0].x;
                        break
                    }
                for (o = this.pages[s].length; n < o; n++)
                    if (i >= this.pages[0][n].cy) {
                        i = this.pages[0][n].y;
                        break
                    }
                return s == this.currentPage.pageX && (s += this.directionX, s < 0 ? s = 0 : s >= this.pages.length && (s = this.pages.length - 1), t = this.pages[s][0].x), n == this.currentPage.pageY && (n += this.directionY, n < 0 ? n = 0 : n >= this.pages[0].length && (n = this.pages[0].length - 1), i = this.pages[0][n].y), {
                    x: t,
                    y: i,
                    pageX: s,
                    pageY: n
                }
            },
            goToPage: function(t, i, s, o) {
                o = o || this.options.bounceEasing, t >= this.pages.length ? t = this.pages.length - 1 : t < 0 && (t = 0), i >= this.pages[t].length ? i = this.pages[t].length - 1 : i < 0 && (i = 0);
                var n = this.pages[t][i].x,
                    r = this.pages[t][i].y;
                s = void 0 === s ? this.options.snapSpeed || e.max(e.max(e.min(e.abs(n - this.x), 1e3), e.min(e.abs(r - this.y), 1e3)), 300) : s, this.currentPage = {
                    x: n,
                    y: r,
                    pageX: t,
                    pageY: i
                }, this.scrollTo(n, r, s, o)
            },
            next: function(t, i) {
                var e = this.currentPage.pageX,
                    s = this.currentPage.pageY;
                e++, e >= this.pages.length && this.hasVerticalScroll && (e = 0, s++), this.goToPage(e, s, t, i)
            },
            prev: function(t, i) {
                var e = this.currentPage.pageX,
                    s = this.currentPage.pageY;
                e--, e < 0 && this.hasVerticalScroll && (e = 0, s--), this.goToPage(e, s, t, i)
            },
            _initKeys: function(i) {
                var e, s = {
                    pageUp: 33,
                    pageDown: 34,
                    end: 35,
                    home: 36,
                    left: 37,
                    up: 38,
                    right: 39,
                    down: 40
                };
                if ("object" == typeof this.options.keyBindings)
                    for (e in this.options.keyBindings) "string" == typeof this.options.keyBindings[e] && (this.options.keyBindings[e] = this.options.keyBindings[e].toUpperCase().charCodeAt(0));
                else this.options.keyBindings = {};
                for (e in s) this.options.keyBindings[e] = this.options.keyBindings[e] || s[e];
                a.addEvent(t, "keydown", this), this.on("destroy", function() {
                    a.removeEvent(t, "keydown", this)
                })
            },
            _key: function(t) {
                if (this.enabled) {
                    var i, s = this.options.snap,
                        o = s ? this.currentPage.pageX : this.x,
                        n = s ? this.currentPage.pageY : this.y,
                        r = a.getTime(),
                        l = this.keyTime || 0,
                        h = .25;
                    switch (this.options.useTransition && this.isInTransition && (i = this.getComputedPosition(), this._translate(e.round(i.x), e.round(i.y)), this.isInTransition = !1), this.keyAcceleration = r - l < 200 ? e.min(this.keyAcceleration + h, 50) : 0, t.keyCode) {
                        case this.options.keyBindings.pageUp:
                            this.hasHorizontalScroll && !this.hasVerticalScroll ? o += s ? 1 : this.wrapperWidth : n += s ? 1 : this.wrapperHeight;
                            break;
                        case this.options.keyBindings.pageDown:
                            this.hasHorizontalScroll && !this.hasVerticalScroll ? o -= s ? 1 : this.wrapperWidth : n -= s ? 1 : this.wrapperHeight;
                            break;
                        case this.options.keyBindings.end:
                            o = s ? this.pages.length - 1 : this.maxScrollX, n = s ? this.pages[0].length - 1 : this.maxScrollY;
                            break;
                        case this.options.keyBindings.home:
                            o = 0, n = 0;
                            break;
                        case this.options.keyBindings.left:
                            o += s ? -1 : 5 + this.keyAcceleration >> 0;
                            break;
                        case this.options.keyBindings.up:
                            n += s ? 1 : 5 + this.keyAcceleration >> 0;
                            break;
                        case this.options.keyBindings.right:
                            o -= s ? -1 : 5 + this.keyAcceleration >> 0;
                            break;
                        case this.options.keyBindings.down:
                            n -= s ? 1 : 5 + this.keyAcceleration >> 0;
                            break;
                        default:
                            return
                    }
                    if (s) return void this.goToPage(o, n);
                    o > 0 ? (o = 0, this.keyAcceleration = 0) : o < this.maxScrollX && (o = this.maxScrollX, this.keyAcceleration = 0), n > 0 ? (n = 0, this.keyAcceleration = 0) : n < this.maxScrollY && (n = this.maxScrollY, this.keyAcceleration = 0), this.scrollTo(o, n, 0), this.keyTime = r
                }
            },
            _animate: function(t, i, e, s) {
                function o() {
                    var p, u, f, v = a.getTime();
                    return v >= d ? (n.isAnimating = !1, n._translate(t, i), void(n.resetPosition(n.options.bounceTime) || n._execEvent("scrollEnd"))) : (v = (v - c) / e, f = s(v), p = (t - l) * f + l, u = (i - h) * f + h, n._translate(p, u), void(n.isAnimating && r(o)))
                }
                var n = this,
                    l = this.x,
                    h = this.y,
                    c = a.getTime(),
                    d = c + e;
                this.isAnimating = !0, o()
            },
            handleEvent: function(t) {
                switch (t.type) {
                    case "touchstart":
                    case "pointerdown":
                    case "MSPointerDown":
                    case "mousedown":
                        this._start(t);
                        break;
                    case "touchmove":
                    case "pointermove":
                    case "MSPointerMove":
                    case "mousemove":
                        this._move(t);
                        break;
                    case "touchend":
                    case "pointerup":
                    case "MSPointerUp":
                    case "mouseup":
                    case "touchcancel":
                    case "pointercancel":
                    case "MSPointerCancel":
                    case "mousecancel":
                        this._end(t);
                        break;
                    case "orientationchange":
                    case "resize":
                        this._resize();
                        break;
                    case "transitionend":
                    case "webkitTransitionEnd":
                    case "oTransitionEnd":
                    case "MSTransitionEnd":
                        this._transitionEnd(t);
                        break;
                    case "wheel":
                    case "DOMMouseScroll":
                    case "mousewheel":
                        this._wheel(t);
                        break;
                    case "keydown":
                        this._key(t);
                        break;
                    case "click":
                        t._constructed || (t.preventDefault(), t.stopPropagation())
                }
            }
        }, n.prototype = {
            handleEvent: function(t) {
                switch (t.type) {
                    case "touchstart":
                    case "pointerdown":
                    case "MSPointerDown":
                    case "mousedown":
                        this._start(t);
                        break;
                    case "touchmove":
                    case "pointermove":
                    case "MSPointerMove":
                    case "mousemove":
                        this._move(t);
                        break;
                    case "touchend":
                    case "pointerup":
                    case "MSPointerUp":
                    case "mouseup":
                    case "touchcancel":
                    case "pointercancel":
                    case "MSPointerCancel":
                    case "mousecancel":
                        this._end(t)
                }
            },
            destroy: function() {
                this.options.interactive && (a.removeEvent(this.indicator, "touchstart", this), a.removeEvent(this.indicator, a.prefixPointerEvent("pointerdown"), this), a.removeEvent(this.indicator, "mousedown", this), a.removeEvent(t, "touchmove", this), a.removeEvent(t, a.prefixPointerEvent("pointermove"), this), a.removeEvent(t, "mousemove", this), a.removeEvent(t, "touchend", this), a.removeEvent(t, a.prefixPointerEvent("pointerup"), this), a.removeEvent(t, "mouseup", this)), this.options.defaultScrollbars && this.wrapper.parentNode.removeChild(this.wrapper)
            },
            _start: function(i) {
                var e = i.touches ? i.touches[0] : i;
                i.preventDefault(), i.stopPropagation(), this.transitionTime(), this.initiated = !0, this.moved = !1, this.lastPointX = e.pageX, this.lastPointY = e.pageY, this.startTime = a.getTime(), this.options.disableTouch || a.addEvent(t, "touchmove", this), this.options.disablePointer || a.addEvent(t, a.prefixPointerEvent("pointermove"), this), this.options.disableMouse || a.addEvent(t, "mousemove", this), this.scroller._execEvent("beforeScrollStart")
            },
            _move: function(t) {
                var i, e, s, o, n = t.touches ? t.touches[0] : t;
                a.getTime(), this.moved || this.scroller._execEvent("scrollStart"), this.moved = !0, i = n.pageX - this.lastPointX, this.lastPointX = n.pageX, e = n.pageY - this.lastPointY, this.lastPointY = n.pageY, s = this.x + i, o = this.y + e, this._pos(s, o), t.preventDefault(), t.stopPropagation()
            },
            _end: function(i) {
                if (this.initiated) {
                    if (this.initiated = !1, i.preventDefault(), i.stopPropagation(), a.removeEvent(t, "touchmove", this), a.removeEvent(t, a.prefixPointerEvent("pointermove"), this), a.removeEvent(t, "mousemove", this), this.scroller.options.snap) {
                        var s = this.scroller._nearestSnap(this.scroller.x, this.scroller.y),
                            o = this.options.snapSpeed || e.max(e.max(e.min(e.abs(this.scroller.x - s.x), 1e3), e.min(e.abs(this.scroller.y - s.y), 1e3)), 300);
                        this.scroller.x == s.x && this.scroller.y == s.y || (this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = s, this.scroller.scrollTo(s.x, s.y, o, this.scroller.options.bounceEasing))
                    }
                    this.moved && this.scroller._execEvent("scrollEnd")
                }
            },
            transitionTime: function(t) {
                t = t || 0, this.indicatorStyle[a.style.transitionDuration] = t + "ms", !t && a.isBadAndroid && (this.indicatorStyle[a.style.transitionDuration] = "0.001s")
            },
            transitionTimingFunction: function(t) {
                this.indicatorStyle[a.style.transitionTimingFunction] = t
            },
            refresh: function() {
                this.transitionTime(), this.options.listenX && !this.options.listenY ? this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.indicatorStyle.display = this.scroller.hasVerticalScroll ? "block" : "none" : this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none", this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ? (a.addClass(this.wrapper, "iScrollBothScrollbars"), a.removeClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "8px" : this.wrapper.style.bottom = "8px")) : (a.removeClass(this.wrapper, "iScrollBothScrollbars"), a.addClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "2px" : this.wrapper.style.bottom = "2px")), this.wrapper.offsetHeight, this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth, this.options.resize ? (this.indicatorWidth = e.max(e.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px") : this.indicatorWidth = this.indicator.clientWidth, this.maxPosX = this.wrapperWidth - this.indicatorWidth, "clip" == this.options.shrink ? (this.minBoundaryX = -this.indicatorWidth + 8, this.maxBoundaryX = this.wrapperWidth - 8) : (this.minBoundaryX = 0, this.maxBoundaryX = this.maxPosX), this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX), this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight, this.options.resize ? (this.indicatorHeight = e.max(e.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px") : this.indicatorHeight = this.indicator.clientHeight, this.maxPosY = this.wrapperHeight - this.indicatorHeight, "clip" == this.options.shrink ? (this.minBoundaryY = -this.indicatorHeight + 8, this.maxBoundaryY = this.wrapperHeight - 8) : (this.minBoundaryY = 0, this.maxBoundaryY = this.maxPosY), this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY), this.updatePosition()
            },
            updatePosition: function() {
                var t = this.options.listenX && e.round(this.sizeRatioX * this.scroller.x) || 0,
                    i = this.options.listenY && e.round(this.sizeRatioY * this.scroller.y) || 0;
                this.options.ignoreBoundaries || (t < this.minBoundaryX ? ("scale" == this.options.shrink && (this.width = e.max(this.indicatorWidth + t, 8), this.indicatorStyle.width = this.width + "px"), t = this.minBoundaryX) : t > this.maxBoundaryX ? "scale" == this.options.shrink ? (this.width = e.max(this.indicatorWidth - (t - this.maxPosX), 8), this.indicatorStyle.width = this.width + "px", t = this.maxPosX + this.indicatorWidth - this.width) : t = this.maxBoundaryX : "scale" == this.options.shrink && this.width != this.indicatorWidth && (this.width = this.indicatorWidth, this.indicatorStyle.width = this.width + "px"), i < this.minBoundaryY ? ("scale" == this.options.shrink && (this.height = e.max(this.indicatorHeight + 3 * i, 8), this.indicatorStyle.height = this.height + "px"), i = this.minBoundaryY) : i > this.maxBoundaryY ? "scale" == this.options.shrink ? (this.height = e.max(this.indicatorHeight - 3 * (i - this.maxPosY), 8), this.indicatorStyle.height = this.height + "px", i = this.maxPosY + this.indicatorHeight - this.height) : i = this.maxBoundaryY : "scale" == this.options.shrink && this.height != this.indicatorHeight && (this.height = this.indicatorHeight, this.indicatorStyle.height = this.height + "px")), this.x = t, this.y = i, this.scroller.options.useTransform ? this.indicatorStyle[a.style.transform] = "translate(" + t + "px," + i + "px)" + this.scroller.translateZ : (this.indicatorStyle.left = t + "px", this.indicatorStyle.top = i + "px")
            },
            _pos: function(t, i) {
                t < 0 ? t = 0 : t > this.maxPosX && (t = this.maxPosX), i < 0 ? i = 0 : i > this.maxPosY && (i = this.maxPosY), t = this.options.listenX ? e.round(t / this.sizeRatioX) : this.scroller.x, i = this.options.listenY ? e.round(i / this.sizeRatioY) : this.scroller.y, this.scroller.scrollTo(t, i)
            },
            fade: function(t, i) {
                if (!i || this.visible) {
                    clearTimeout(this.fadeTimeout), this.fadeTimeout = null;
                    var e = t ? 250 : 500,
                        s = t ? 0 : 300;
                    t = t ? "1" : "0", this.wrapperStyle[a.style.transitionDuration] = e + "ms", this.fadeTimeout = setTimeout(function(t) {
                        this.wrapperStyle.opacity = t, this.visible = +t
                    }.bind(this, t), s)
                }
            }
        }, s.utils = a, "undefined" != typeof module && module.exports ? module.exports = s : t.IScroll = s
    }(window, document, Math), function(t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery)
    }(function(t) {
        "use strict";

        function i(i) {
            return !i.nodeName || -1 !== t.inArray(i.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]);
        }

        function e(i) {
            return t.isFunction(i) || t.isPlainObject(i) ? i : {
                top: i,
                left: i
            }
        }
        var s = t.scrollTo = function(i, e, s) {
            return t(window).scrollTo(i, e, s)
        };
        return s.defaults = {
            axis: "xy",
            duration: 0,
            limit: !0
        }, t.fn.scrollTo = function(o, n, r) {
            "object" == typeof n && (r = n, n = 0), "function" == typeof r && (r = {
                onAfter: r
            }), "max" === o && (o = 9e9), r = t.extend({}, s.defaults, r), n = n || r.duration;
            var a = r.queue && 1 < r.axis.length;
            return a && (n /= 2), r.offset = e(r.offset), r.over = e(r.over), this.each(function() {
                function l(i) {
                    var e = t.extend({}, r, {
                        queue: !0,
                        duration: n,
                        complete: i && function() {
                            i.call(d, u, r)
                        }
                    });
                    p.animate(f, e)
                }
                if (null !== o) {
                    var h, c = i(this),
                        d = c ? this.contentWindow || window : this,
                        p = t(d),
                        u = o,
                        f = {};
                    switch (typeof u) {
                        case "number":
                        case "string":
                            if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(u)) {
                                u = e(u);
                                break
                            }
                            u = c ? t(u) : t(u, d);
                        case "object":
                            if (0 === u.length) return;
                            (u.is || u.style) && (h = (u = t(u)).offset())
                    }
                    var v = t.isFunction(r.offset) && r.offset(d, u) || r.offset;
                    t.each(r.axis.split(""), function(t, i) {
                        var e = "x" === i ? "Left" : "Top",
                            o = e.toLowerCase(),
                            n = "scroll" + e,
                            g = p[n](),
                            m = s.max(d, i);
                        h ? (f[n] = h[o] + (c ? 0 : g - p.offset()[o]), r.margin && (f[n] -= parseInt(u.css("margin" + e), 10) || 0, f[n] -= parseInt(u.css("border" + e + "Width"), 10) || 0), f[n] += v[o] || 0, r.over[o] && (f[n] += u["x" === i ? "width" : "height"]() * r.over[o])) : (e = u[o], f[n] = e.slice && "%" === e.slice(-1) ? parseFloat(e) / 100 * m : e), r.limit && /^\d+$/.test(f[n]) && (f[n] = 0 >= f[n] ? 0 : Math.min(f[n], m)), !t && 1 < r.axis.length && (g === f[n] ? f = {} : a && (l(r.onAfterFirst), f = {}))
                    }), l(r.onAfter)
                }
            })
        }, s.max = function(e, s) {
            var o = "x" === s ? "Width" : "Height",
                n = "scroll" + o;
            if (!i(e)) return e[n] - t(e)[o.toLowerCase()]();
            var o = "client" + o,
                r = e.ownerDocument || e.document,
                a = r.documentElement,
                r = r.body;
            return Math.max(a[n], r[n]) - Math.min(a[o], r[o])
        }, t.Tween.propHooks.scrollLeft = t.Tween.propHooks.scrollTop = {
            get: function(i) {
                return t(i.elem)[i.prop]()
            },
            set: function(i) {
                var e = this.get(i);
                if (i.options.interrupt && i._last && i._last !== e) return t(i.elem).stop();
                var s = Math.round(i.now);
                e !== s && (t(i.elem)[i.prop](s), i._last = this.get(i))
            }
        }, s
    }), ! function(t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
    }(function(t) {
        "use strict";
        var i = window.Slick || {};
        i = function() {
            function i(i, s) {
                var o, n = this;
                n.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: t(i),
                    appendDots: t(i),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                    nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    centerMode: !1,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function(t, i) {
                        return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (i + 1) + "</button>"
                    },
                    dots: !1,
                    dotsClass: "slick-dots",
                    draggable: !0,
                    easing: "linear",
                    edgeFriction: .35,
                    fade: !1,
                    focusOnSelect: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    mobileFirst: !1,
                    pauseOnHover: !0,
                    pauseOnDotsHover: !1,
                    respondTo: "window",
                    responsive: null,
                    rows: 1,
                    rtl: !1,
                    slide: "",
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: !0,
                    swipeToSlide: !1,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    variableWidth: !1,
                    vertical: !1,
                    verticalSwiping: !1,
                    waitForAnimate: !0,
                    zIndex: 1e3
                }, n.initials = {
                    animating: !1,
                    dragging: !1,
                    autoPlayTimer: null,
                    currentDirection: 0,
                    currentLeft: null,
                    currentSlide: 0,
                    direction: 1,
                    $dots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    $nextArrow: null,
                    $prevArrow: null,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: !1,
                    unslicked: !1
                }, t.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.hidden = "hidden", n.paused = !1, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = t(i), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, o = t(i).data("slick") || {}, n.options = t.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, "undefined" != typeof document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = t.proxy(n.autoPlay, n), n.autoPlayClear = t.proxy(n.autoPlayClear, n), n.changeSlide = t.proxy(n.changeSlide, n), n.clickHandler = t.proxy(n.clickHandler, n), n.selectHandler = t.proxy(n.selectHandler, n), n.setPosition = t.proxy(n.setPosition, n), n.swipeHandler = t.proxy(n.swipeHandler, n), n.dragHandler = t.proxy(n.dragHandler, n), n.keyHandler = t.proxy(n.keyHandler, n), n.autoPlayIterator = t.proxy(n.autoPlayIterator, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0), n.checkResponsive(!0)
            }
            var e = 0;
            return i
        }(), i.prototype.addSlide = i.prototype.slickAdd = function(i, e, s) {
            var o = this;
            if ("boolean" == typeof e) s = e, e = null;
            else if (0 > e || e >= o.slideCount) return !1;
            o.unload(), "number" == typeof e ? 0 === e && 0 === o.$slides.length ? t(i).appendTo(o.$slideTrack) : s ? t(i).insertBefore(o.$slides.eq(e)) : t(i).insertAfter(o.$slides.eq(e)) : s === !0 ? t(i).prependTo(o.$slideTrack) : t(i).appendTo(o.$slideTrack), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slides.each(function(i, e) {
                t(e).attr("data-slick-index", i)
            }), o.$slidesCache = o.$slides, o.reinit()
        }, i.prototype.animateHeight = function() {
            var t = this;
            if (1 === t.options.slidesToShow && t.options.adaptiveHeight === !0 && t.options.vertical === !1) {
                var i = t.$slides.eq(t.currentSlide).outerHeight(!0);
                t.$list.animate({
                    height: i
                }, t.options.speed)
            }
        }, i.prototype.animateSlide = function(i, e) {
            var s = {},
                o = this;
            o.animateHeight(), o.options.rtl === !0 && o.options.vertical === !1 && (i = -i), o.transformsEnabled === !1 ? o.options.vertical === !1 ? o.$slideTrack.animate({
                left: i
            }, o.options.speed, o.options.easing, e) : o.$slideTrack.animate({
                top: i
            }, o.options.speed, o.options.easing, e) : o.cssTransitions === !1 ? (o.options.rtl === !0 && (o.currentLeft = -o.currentLeft), t({
                animStart: o.currentLeft
            }).animate({
                animStart: i
            }, {
                duration: o.options.speed,
                easing: o.options.easing,
                step: function(t) {
                    t = Math.ceil(t), o.options.vertical === !1 ? (s[o.animType] = "translate(" + t + "px, 0px)", o.$slideTrack.css(s)) : (s[o.animType] = "translate(0px," + t + "px)", o.$slideTrack.css(s))
                },
                complete: function() {
                    e && e.call()
                }
            })) : (o.applyTransition(), i = Math.ceil(i), s[o.animType] = o.options.vertical === !1 ? "translate3d(" + i + "px, 0px, 0px)" : "translate3d(0px," + i + "px, 0px)", o.$slideTrack.css(s), e && setTimeout(function() {
                o.disableTransition(), e.call()
            }, o.options.speed))
        }, i.prototype.asNavFor = function(i) {
            var e = this,
                s = e.options.asNavFor;
            s && null !== s && (s = t(s).not(e.$slider)), null !== s && "object" == typeof s && s.each(function() {
                var e = t(this).slick("getSlick");
                e.unslicked || e.slideHandler(i, !0)
            })
        }, i.prototype.applyTransition = function(t) {
            var i = this,
                e = {};
            e[i.transitionType] = i.options.fade === !1 ? i.transformType + " " + i.options.speed + "ms " + i.options.cssEase : "opacity " + i.options.speed + "ms " + i.options.cssEase, i.options.fade === !1 ? i.$slideTrack.css(e) : i.$slides.eq(t).css(e)
        }, i.prototype.autoPlay = function() {
            var t = this;
            t.autoPlayTimer && clearInterval(t.autoPlayTimer), t.slideCount > t.options.slidesToShow && t.paused !== !0 && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed))
        }, i.prototype.autoPlayClear = function() {
            var t = this;
            t.autoPlayTimer && clearInterval(t.autoPlayTimer)
        }, i.prototype.autoPlayIterator = function() {
            var t = this;
            t.options.infinite === !1 ? 1 === t.direction ? (t.currentSlide + 1 === t.slideCount - 1 && (t.direction = 0), t.slideHandler(t.currentSlide + t.options.slidesToScroll)) : (0 === t.currentSlide - 1 && (t.direction = 1), t.slideHandler(t.currentSlide - t.options.slidesToScroll)) : t.slideHandler(t.currentSlide + t.options.slidesToScroll)
        }, i.prototype.buildArrows = function() {
            var i = this;
            i.options.arrows === !0 && (i.$prevArrow = t(i.options.prevArrow).addClass("slick-arrow"), i.$nextArrow = t(i.options.nextArrow).addClass("slick-arrow"), i.slideCount > i.options.slidesToShow ? (i.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), i.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.prependTo(i.options.appendArrows), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.appendTo(i.options.appendArrows), i.options.infinite !== !0 && i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : i.$prevArrow.add(i.$nextArrow).addClass("slick-hidden").attr({
                "aria-disabled": "true",
                tabindex: "-1"
            }))
        }, i.prototype.buildDots = function() {
            var i, e, s = this;
            if (s.options.dots === !0 && s.slideCount > s.options.slidesToShow) {
                for (e = '<ul class="' + s.options.dotsClass + '">', i = 0; i <= s.getDotCount(); i += 1) e += "<li>" + s.options.customPaging.call(this, s, i) + "</li>";
                e += "</ul>", s.$dots = t(e).appendTo(s.options.appendDots), s.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
            }
        }, i.prototype.buildOut = function() {
            var i = this;
            i.$slides = i.$slider.children(i.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), i.slideCount = i.$slides.length, i.$slides.each(function(i, e) {
                t(e).attr("data-slick-index", i).data("originalStyling", t(e).attr("style") || "")
            }), i.$slidesCache = i.$slides, i.$slider.addClass("slick-slider"), i.$slideTrack = 0 === i.slideCount ? t('<div class="slick-track"/>').appendTo(i.$slider) : i.$slides.wrapAll('<div class="slick-track"/>').parent(), i.$list = i.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), i.$slideTrack.css("opacity", 0), (i.options.centerMode === !0 || i.options.swipeToSlide === !0) && (i.options.slidesToScroll = 1), t("img[data-lazy]", i.$slider).not("[src]").addClass("slick-loading"), i.setupInfinite(), i.buildArrows(), i.buildDots(), i.updateDots(), i.setSlideClasses("number" == typeof i.currentSlide ? i.currentSlide : 0), i.options.draggable === !0 && i.$list.addClass("draggable")
        }, i.prototype.buildRows = function() {
            var t, i, e, s, o, n, r, a = this;
            if (s = document.createDocumentFragment(), n = a.$slider.children(), a.options.rows > 1) {
                for (r = a.options.slidesPerRow * a.options.rows, o = Math.ceil(n.length / r), t = 0; o > t; t++) {
                    var l = document.createElement("div");
                    for (i = 0; i < a.options.rows; i++) {
                        var h = document.createElement("div");
                        for (e = 0; e < a.options.slidesPerRow; e++) {
                            var c = t * r + (i * a.options.slidesPerRow + e);
                            n.get(c) && h.appendChild(n.get(c))
                        }
                        l.appendChild(h)
                    }
                    s.appendChild(l)
                }
                a.$slider.html(s), a.$slider.children().children().children().css({
                    width: 100 / a.options.slidesPerRow + "%",
                    display: "inline-block"
                })
            }
        }, i.prototype.checkResponsive = function(i, e) {
            var s, o, n, r = this,
                a = !1,
                l = r.$slider.width(),
                h = window.innerWidth || t(window).width();
            if ("window" === r.respondTo ? n = h : "slider" === r.respondTo ? n = l : "min" === r.respondTo && (n = Math.min(h, l)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
                o = null;
                for (s in r.breakpoints) r.breakpoints.hasOwnProperty(s) && (r.originalSettings.mobileFirst === !1 ? n < r.breakpoints[s] && (o = r.breakpoints[s]) : n > r.breakpoints[s] && (o = r.breakpoints[s]));
                null !== o ? null !== r.activeBreakpoint ? (o !== r.activeBreakpoint || e) && (r.activeBreakpoint = o, "unslick" === r.breakpointSettings[o] ? r.unslick(o) : (r.options = t.extend({}, r.originalSettings, r.breakpointSettings[o]), i === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(i)), a = o) : (r.activeBreakpoint = o, "unslick" === r.breakpointSettings[o] ? r.unslick(o) : (r.options = t.extend({}, r.originalSettings, r.breakpointSettings[o]), i === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(i)), a = o) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, i === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(i), a = o), i || a === !1 || r.$slider.trigger("breakpoint", [r, a])
            }
        }, i.prototype.changeSlide = function(i, e) {
            var s, o, n, r = this,
                a = t(i.target);
            switch (a.is("a") && i.preventDefault(), a.is("li") || (a = a.closest("li")), n = 0 !== r.slideCount % r.options.slidesToScroll, s = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, i.data.message) {
                case "previous":
                    o = 0 === s ? r.options.slidesToScroll : r.options.slidesToShow - s, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - o, !1, e);
                    break;
                case "next":
                    o = 0 === s ? r.options.slidesToScroll : s, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + o, !1, e);
                    break;
                case "index":
                    var l = 0 === i.data.index ? 0 : i.data.index || a.index() * r.options.slidesToScroll;
                    r.slideHandler(r.checkNavigable(l), !1, e), a.children().trigger("focus");
                    break;
                default:
                    return
            }
        }, i.prototype.checkNavigable = function(t) {
            var i, e, s = this;
            if (i = s.getNavigableIndexes(), e = 0, t > i[i.length - 1]) t = i[i.length - 1];
            else
                for (var o in i) {
                    if (t < i[o]) {
                        t = e;
                        break
                    }
                    e = i[o]
                }
            return t
        }, i.prototype.cleanUpEvents = function() {
            var i = this;
            i.options.dots && null !== i.$dots && (t("li", i.$dots).off("click.slick", i.changeSlide), i.options.pauseOnDotsHover === !0 && i.options.autoplay === !0 && t("li", i.$dots).off("mouseenter.slick", t.proxy(i.setPaused, i, !0)).off("mouseleave.slick", t.proxy(i.setPaused, i, !1))), i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow && i.$prevArrow.off("click.slick", i.changeSlide), i.$nextArrow && i.$nextArrow.off("click.slick", i.changeSlide)), i.$list.off("touchstart.slick mousedown.slick", i.swipeHandler), i.$list.off("touchmove.slick mousemove.slick", i.swipeHandler), i.$list.off("touchend.slick mouseup.slick", i.swipeHandler), i.$list.off("touchcancel.slick mouseleave.slick", i.swipeHandler), i.$list.off("click.slick", i.clickHandler), t(document).off(i.visibilityChange, i.visibility), i.$list.off("mouseenter.slick", t.proxy(i.setPaused, i, !0)), i.$list.off("mouseleave.slick", t.proxy(i.setPaused, i, !1)), i.options.accessibility === !0 && i.$list.off("keydown.slick", i.keyHandler), i.options.focusOnSelect === !0 && t(i.$slideTrack).children().off("click.slick", i.selectHandler), t(window).off("orientationchange.slick.slick-" + i.instanceUid, i.orientationChange), t(window).off("resize.slick.slick-" + i.instanceUid, i.resize), t("[draggable!=true]", i.$slideTrack).off("dragstart", i.preventDefault), t(window).off("load.slick.slick-" + i.instanceUid, i.setPosition), t(document).off("ready.slick.slick-" + i.instanceUid, i.setPosition)
        }, i.prototype.cleanUpRows = function() {
            var t, i = this;
            i.options.rows > 1 && (t = i.$slides.children().children(), t.removeAttr("style"), i.$slider.html(t))
        }, i.prototype.clickHandler = function(t) {
            var i = this;
            i.shouldClick === !1 && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault())
        }, i.prototype.destroy = function(i) {
            var e = this;
            e.autoPlayClear(), e.touchObject = {}, e.cleanUpEvents(), t(".slick-cloned", e.$slider).detach(), e.$dots && e.$dots.remove(), e.options.arrows === !0 && (e.$prevArrow && e.$prevArrow.length && (e.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove()), e.$nextArrow && e.$nextArrow.length && (e.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove())), e.$slides && (e.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
                t(this).attr("style", t(this).data("originalStyling"))
            }), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.detach(), e.$list.detach(), e.$slider.append(e.$slides)), e.cleanUpRows(), e.$slider.removeClass("slick-slider"), e.$slider.removeClass("slick-initialized"), e.unslicked = !0, i || e.$slider.trigger("destroy", [e])
        }, i.prototype.disableTransition = function(t) {
            var i = this,
                e = {};
            e[i.transitionType] = "", i.options.fade === !1 ? i.$slideTrack.css(e) : i.$slides.eq(t).css(e)
        }, i.prototype.fadeSlide = function(t, i) {
            var e = this;
            e.cssTransitions === !1 ? (e.$slides.eq(t).css({
                zIndex: e.options.zIndex
            }), e.$slides.eq(t).animate({
                opacity: 1
            }, e.options.speed, e.options.easing, i)) : (e.applyTransition(t), e.$slides.eq(t).css({
                opacity: 1,
                zIndex: e.options.zIndex
            }), i && setTimeout(function() {
                e.disableTransition(t), i.call()
            }, e.options.speed))
        }, i.prototype.fadeSlideOut = function(t) {
            var i = this;
            i.cssTransitions === !1 ? i.$slides.eq(t).animate({
                opacity: 0,
                zIndex: i.options.zIndex - 2
            }, i.options.speed, i.options.easing) : (i.applyTransition(t), i.$slides.eq(t).css({
                opacity: 0,
                zIndex: i.options.zIndex - 2
            }))
        }, i.prototype.filterSlides = i.prototype.slickFilter = function(t) {
            var i = this;
            null !== t && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.filter(t).appendTo(i.$slideTrack), i.reinit())
        }, i.prototype.getCurrent = i.prototype.slickCurrentSlide = function() {
            var t = this;
            return t.currentSlide
        }, i.prototype.getDotCount = function() {
            var t = this,
                i = 0,
                e = 0,
                s = 0;
            if (t.options.infinite === !0)
                for (; i < t.slideCount;) ++s, i = e + t.options.slidesToShow, e += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
            else if (t.options.centerMode === !0) s = t.slideCount;
            else
                for (; i < t.slideCount;) ++s, i = e + t.options.slidesToShow, e += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
            return s - 1
        }, i.prototype.getLeft = function(t) {
            var i, e, s, o = this,
                n = 0;
            return o.slideOffset = 0, e = o.$slides.first().outerHeight(!0), o.options.infinite === !0 ? (o.slideCount > o.options.slidesToShow && (o.slideOffset = -1 * o.slideWidth * o.options.slidesToShow, n = -1 * e * o.options.slidesToShow), 0 !== o.slideCount % o.options.slidesToScroll && t + o.options.slidesToScroll > o.slideCount && o.slideCount > o.options.slidesToShow && (t > o.slideCount ? (o.slideOffset = -1 * (o.options.slidesToShow - (t - o.slideCount)) * o.slideWidth, n = -1 * (o.options.slidesToShow - (t - o.slideCount)) * e) : (o.slideOffset = -1 * o.slideCount % o.options.slidesToScroll * o.slideWidth, n = -1 * o.slideCount % o.options.slidesToScroll * e))) : t + o.options.slidesToShow > o.slideCount && (o.slideOffset = (t + o.options.slidesToShow - o.slideCount) * o.slideWidth, n = (t + o.options.slidesToShow - o.slideCount) * e), o.slideCount <= o.options.slidesToShow && (o.slideOffset = 0, n = 0), o.options.centerMode === !0 && o.options.infinite === !0 ? o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2) - o.slideWidth : o.options.centerMode === !0 && (o.slideOffset = 0, o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2)), i = o.options.vertical === !1 ? -1 * t * o.slideWidth + o.slideOffset : -1 * t * e + n, o.options.variableWidth === !0 && (s = o.slideCount <= o.options.slidesToShow || o.options.infinite === !1 ? o.$slideTrack.children(".slick-slide").eq(t) : o.$slideTrack.children(".slick-slide").eq(t + o.options.slidesToShow), i = s[0] ? -1 * s[0].offsetLeft : 0, o.options.centerMode === !0 && (s = o.options.infinite === !1 ? o.$slideTrack.children(".slick-slide").eq(t) : o.$slideTrack.children(".slick-slide").eq(t + o.options.slidesToShow + 1), i = s[0] ? -1 * s[0].offsetLeft : 0, i += (o.$list.width() - s.outerWidth()) / 2)), i
        }, i.prototype.getOption = i.prototype.slickGetOption = function(t) {
            var i = this;
            return i.options[t]
        }, i.prototype.getNavigableIndexes = function() {
            var t, i = this,
                e = 0,
                s = 0,
                o = [];
            for (i.options.infinite === !1 ? t = i.slideCount : (e = -1 * i.options.slidesToScroll, s = -1 * i.options.slidesToScroll, t = 2 * i.slideCount); t > e;) o.push(e), e = s + i.options.slidesToScroll, s += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
            return o
        }, i.prototype.getSlick = function() {
            return this
        }, i.prototype.getSlideCount = function() {
            var i, e, s, o = this;
            return s = o.options.centerMode === !0 ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, o.options.swipeToSlide === !0 ? (o.$slideTrack.find(".slick-slide").each(function(i, n) {
                return n.offsetLeft - s + t(n).outerWidth() / 2 > -1 * o.swipeLeft ? (e = n, !1) : void 0
            }), i = Math.abs(t(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
        }, i.prototype.goTo = i.prototype.slickGoTo = function(t, i) {
            var e = this;
            e.changeSlide({
                data: {
                    message: "index",
                    index: parseInt(t)
                }
            }, i)
        }, i.prototype.init = function(i) {
            var e = this;
            t(e.$slider).hasClass("slick-initialized") || (t(e.$slider).addClass("slick-initialized"), e.buildRows(), e.buildOut(), e.setProps(), e.startLoad(), e.loadSlider(), e.initializeEvents(), e.updateArrows(), e.updateDots()), i && e.$slider.trigger("init", [e]), e.options.accessibility === !0 && e.initADA()
        }, i.prototype.initArrowEvents = function() {
            var t = this;
            t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.on("click.slick", {
                message: "previous"
            }, t.changeSlide), t.$nextArrow.on("click.slick", {
                message: "next"
            }, t.changeSlide))
        }, i.prototype.initDotEvents = function() {
            var i = this;
            i.options.dots === !0 && i.slideCount > i.options.slidesToShow && t("li", i.$dots).on("click.slick", {
                message: "index"
            }, i.changeSlide), i.options.dots === !0 && i.options.pauseOnDotsHover === !0 && i.options.autoplay === !0 && t("li", i.$dots).on("mouseenter.slick", t.proxy(i.setPaused, i, !0)).on("mouseleave.slick", t.proxy(i.setPaused, i, !1))
        }, i.prototype.initializeEvents = function() {
            var i = this;
            i.initArrowEvents(), i.initDotEvents(), i.$list.on("touchstart.slick mousedown.slick", {
                action: "start"
            }, i.swipeHandler), i.$list.on("touchmove.slick mousemove.slick", {
                action: "move"
            }, i.swipeHandler), i.$list.on("touchend.slick mouseup.slick", {
                action: "end"
            }, i.swipeHandler), i.$list.on("touchcancel.slick mouseleave.slick", {
                action: "end"
            }, i.swipeHandler), i.$list.on("click.slick", i.clickHandler), t(document).on(i.visibilityChange, t.proxy(i.visibility, i)), i.$list.on("mouseenter.slick", t.proxy(i.setPaused, i, !0)), i.$list.on("mouseleave.slick", t.proxy(i.setPaused, i, !1)), i.options.accessibility === !0 && i.$list.on("keydown.slick", i.keyHandler), i.options.focusOnSelect === !0 && t(i.$slideTrack).children().on("click.slick", i.selectHandler), t(window).on("orientationchange.slick.slick-" + i.instanceUid, t.proxy(i.orientationChange, i)), t(window).on("resize.slick.slick-" + i.instanceUid, t.proxy(i.resize, i)), t("[draggable!=true]", i.$slideTrack).on("dragstart", i.preventDefault), t(window).on("load.slick.slick-" + i.instanceUid, i.setPosition), t(document).on("ready.slick.slick-" + i.instanceUid, i.setPosition)
        }, i.prototype.initUI = function() {
            var t = this;
            t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.show(), t.options.autoplay === !0 && t.autoPlay()
        }, i.prototype.keyHandler = function(t) {
            var i = this;
            t.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === t.keyCode && i.options.accessibility === !0 ? i.changeSlide({
                data: {
                    message: "previous"
                }
            }) : 39 === t.keyCode && i.options.accessibility === !0 && i.changeSlide({
                data: {
                    message: "next"
                }
            }))
        }, i.prototype.lazyLoad = function() {
            function i(i) {
                t("img[data-lazy]", i).each(function() {
                    var i = t(this),
                        e = t(this).attr("data-lazy"),
                        s = document.createElement("img");
                    s.onload = function() {
                        i.animate({
                            opacity: 0
                        }, 100, function() {
                            i.attr("src", e).animate({
                                opacity: 1
                            }, 200, function() {
                                i.removeAttr("data-lazy").removeClass("slick-loading")
                            })
                        })
                    }, s.src = e
                })
            }
            var e, s, o, n, r = this;
            r.options.centerMode === !0 ? r.options.infinite === !0 ? (o = r.currentSlide + (r.options.slidesToShow / 2 + 1), n = o + r.options.slidesToShow + 2) : (o = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)), n = 2 + (r.options.slidesToShow / 2 + 1) + r.currentSlide) : (o = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide, n = o + r.options.slidesToShow, r.options.fade === !0 && (o > 0 && o--, n <= r.slideCount && n++)), e = r.$slider.find(".slick-slide").slice(o, n), i(e), r.slideCount <= r.options.slidesToShow ? (s = r.$slider.find(".slick-slide"), i(s)) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? (s = r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow), i(s)) : 0 === r.currentSlide && (s = r.$slider.find(".slick-cloned").slice(-1 * r.options.slidesToShow), i(s))
        }, i.prototype.loadSlider = function() {
            var t = this;
            t.setPosition(), t.$slideTrack.css({
                opacity: 1
            }), t.$slider.removeClass("slick-loading"), t.initUI(), "progressive" === t.options.lazyLoad && t.progressiveLazyLoad()
        }, i.prototype.next = i.prototype.slickNext = function() {
            var t = this;
            t.changeSlide({
                data: {
                    message: "next"
                }
            })
        }, i.prototype.orientationChange = function() {
            var t = this;
            t.checkResponsive(), t.setPosition()
        }, i.prototype.pause = i.prototype.slickPause = function() {
            var t = this;
            t.autoPlayClear(), t.paused = !0
        }, i.prototype.play = i.prototype.slickPlay = function() {
            var t = this;
            t.paused = !1, t.autoPlay()
        }, i.prototype.postSlide = function(t) {
            var i = this;
            i.$slider.trigger("afterChange", [i, t]), i.animating = !1, i.setPosition(), i.swipeLeft = null, i.options.autoplay === !0 && i.paused === !1 && i.autoPlay(), i.options.accessibility === !0 && i.initADA()
        }, i.prototype.prev = i.prototype.slickPrev = function() {
            var t = this;
            t.changeSlide({
                data: {
                    message: "previous"
                }
            })
        }, i.prototype.preventDefault = function(t) {
            t.preventDefault()
        }, i.prototype.progressiveLazyLoad = function() {
            var i, e, s = this;
            i = t("img[data-lazy]", s.$slider).length, i > 0 && (e = t("img[data-lazy]", s.$slider).first(), e.attr("src", e.attr("data-lazy")).removeClass("slick-loading").load(function() {
                e.removeAttr("data-lazy"), s.progressiveLazyLoad(), s.options.adaptiveHeight === !0 && s.setPosition()
            }).error(function() {
                e.removeAttr("data-lazy"), s.progressiveLazyLoad()
            }))
        }, i.prototype.refresh = function(i) {
            var e = this,
                s = e.currentSlide;
            e.destroy(!0), t.extend(e, e.initials, {
                currentSlide: s
            }), e.init(), i || e.changeSlide({
                data: {
                    message: "index",
                    index: s
                }
            }, !1)
        }, i.prototype.registerBreakpoints = function() {
            var i, e, s, o = this,
                n = o.options.responsive || null;
            if ("array" === t.type(n) && n.length) {
                o.respondTo = o.options.respondTo || "window";
                for (i in n)
                    if (s = o.breakpoints.length - 1, e = n[i].breakpoint, n.hasOwnProperty(i)) {
                        for (; s >= 0;) o.breakpoints[s] && o.breakpoints[s] === e && o.breakpoints.splice(s, 1), s--;
                        o.breakpoints.push(e), o.breakpointSettings[e] = n[i].settings
                    }
                o.breakpoints.sort(function(t, i) {
                    return o.options.mobileFirst ? t - i : i - t
                })
            }
        }, i.prototype.reinit = function() {
            var i = this;
            i.$slides = i.$slideTrack.children(i.options.slide).addClass("slick-slide"), i.slideCount = i.$slides.length, i.currentSlide >= i.slideCount && 0 !== i.currentSlide && (i.currentSlide = i.currentSlide - i.options.slidesToScroll), i.slideCount <= i.options.slidesToShow && (i.currentSlide = 0), i.registerBreakpoints(), i.setProps(), i.setupInfinite(), i.buildArrows(), i.updateArrows(), i.initArrowEvents(), i.buildDots(), i.updateDots(), i.initDotEvents(), i.checkResponsive(!1, !0), i.options.focusOnSelect === !0 && t(i.$slideTrack).children().on("click.slick", i.selectHandler), i.setSlideClasses(0), i.setPosition(), i.$slider.trigger("reInit", [i]), i.options.autoplay === !0 && i.focusHandler()
        }, i.prototype.resize = function() {
            var i = this;
            t(window).width() !== i.windowWidth && (clearTimeout(i.windowDelay), i.windowDelay = window.setTimeout(function() {
                i.windowWidth = t(window).width(), i.checkResponsive(), i.unslicked || i.setPosition()
            }, 50))
        }, i.prototype.removeSlide = i.prototype.slickRemove = function(t, i, e) {
            var s = this;
            return "boolean" == typeof t ? (i = t, t = i === !0 ? 0 : s.slideCount - 1) : t = i === !0 ? --t : t, !(s.slideCount < 1 || 0 > t || t > s.slideCount - 1) && (s.unload(), e === !0 ? s.$slideTrack.children().remove() : s.$slideTrack.children(this.options.slide).eq(t).remove(), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slidesCache = s.$slides, void s.reinit())
        }, i.prototype.setCSS = function(t) {
            var i, e, s = this,
                o = {};
            s.options.rtl === !0 && (t = -t), i = "left" == s.positionProp ? Math.ceil(t) + "px" : "0px", e = "top" == s.positionProp ? Math.ceil(t) + "px" : "0px", o[s.positionProp] = t, s.transformsEnabled === !1 ? s.$slideTrack.css(o) : (o = {}, s.cssTransitions === !1 ? (o[s.animType] = "translate(" + i + ", " + e + ")", s.$slideTrack.css(o)) : (o[s.animType] = "translate3d(" + i + ", " + e + ", 0px)", s.$slideTrack.css(o)))
        }, i.prototype.setDimensions = function() {
            var t = this;
            t.options.vertical === !1 ? t.options.centerMode === !0 && t.$list.css({
                padding: "0px " + t.options.centerPadding
            }) : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow), t.options.centerMode === !0 && t.$list.css({
                padding: t.options.centerPadding + " 0px"
            })), t.listWidth = t.$list.width(), t.listHeight = t.$list.height(), t.options.vertical === !1 && t.options.variableWidth === !1 ? (t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow), t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length))) : t.options.variableWidth === !0 ? t.$slideTrack.width(5e3 * t.slideCount) : (t.slideWidth = Math.ceil(t.listWidth), t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
            var i = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
            t.options.variableWidth === !1 && t.$slideTrack.children(".slick-slide").width(t.slideWidth - i)
        }, i.prototype.setFade = function() {
            var i, e = this;
            e.$slides.each(function(s, o) {
                i = -1 * e.slideWidth * s, e.options.rtl === !0 ? t(o).css({
                    position: "relative",
                    right: i,
                    top: 0,
                    zIndex: e.options.zIndex - 2,
                    opacity: 0
                }) : t(o).css({
                    position: "relative",
                    left: i,
                    top: 0,
                    zIndex: e.options.zIndex - 2,
                    opacity: 0
                })
            }), e.$slides.eq(e.currentSlide).css({
                zIndex: e.options.zIndex - 1,
                opacity: 1
            })
        }, i.prototype.setHeight = function() {
            var t = this;
            if (1 === t.options.slidesToShow && t.options.adaptiveHeight === !0 && t.options.vertical === !1) {
                var i = t.$slides.eq(t.currentSlide).outerHeight(!0);
                t.$list.css("height", i)
            }
        }, i.prototype.setOption = i.prototype.slickSetOption = function(i, e, s) {
            var o, n, r = this;
            if ("responsive" === i && "array" === t.type(e))
                for (n in e)
                    if ("array" !== t.type(r.options.responsive)) r.options.responsive = [e[n]];
                    else {
                        for (o = r.options.responsive.length - 1; o >= 0;) r.options.responsive[o].breakpoint === e[n].breakpoint && r.options.responsive.splice(o, 1), o--;
                        r.options.responsive.push(e[n])
                    } else r.options[i] = e;
            s === !0 && (r.unload(), r.reinit())
        }, i.prototype.setPosition = function() {
            var t = this;
            t.setDimensions(), t.setHeight(), t.options.fade === !1 ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), t.$slider.trigger("setPosition", [t])
        }, i.prototype.setProps = function() {
            var t = this,
                i = document.body.style;
            t.positionProp = t.options.vertical === !0 ? "top" : "left", "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"), (void 0 !== i.WebkitTransition || void 0 !== i.MozTransition || void 0 !== i.msTransition) && t.options.useCSS === !0 && (t.cssTransitions = !0), t.options.fade && ("number" == typeof t.options.zIndex ? t.options.zIndex < 3 && (t.options.zIndex = 3) : t.options.zIndex = t.defaults.zIndex), void 0 !== i.OTransform && (t.animType = "OTransform", t.transformType = "-o-transform", t.transitionType = "OTransition", void 0 === i.perspectiveProperty && void 0 === i.webkitPerspective && (t.animType = !1)), void 0 !== i.MozTransform && (t.animType = "MozTransform", t.transformType = "-moz-transform", t.transitionType = "MozTransition", void 0 === i.perspectiveProperty && void 0 === i.MozPerspective && (t.animType = !1)), void 0 !== i.webkitTransform && (t.animType = "webkitTransform", t.transformType = "-webkit-transform", t.transitionType = "webkitTransition", void 0 === i.perspectiveProperty && void 0 === i.webkitPerspective && (t.animType = !1)), void 0 !== i.msTransform && (t.animType = "msTransform", t.transformType = "-ms-transform", t.transitionType = "msTransition", void 0 === i.msTransform && (t.animType = !1)), void 0 !== i.transform && t.animType !== !1 && (t.animType = "transform", t.transformType = "transform", t.transitionType = "transition"), t.transformsEnabled = null !== t.animType && t.animType !== !1
        }, i.prototype.setSlideClasses = function(t) {
            var i, e, s, o, n = this;
            e = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(t).addClass("slick-current"), n.options.centerMode === !0 ? (i = Math.floor(n.options.slidesToShow / 2), n.options.infinite === !0 && (t >= i && t <= n.slideCount - 1 - i ? n.$slides.slice(t - i, t + i + 1).addClass("slick-active").attr("aria-hidden", "false") : (s = n.options.slidesToShow + t, e.slice(s - i + 1, s + i + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === t ? e.eq(e.length - 1 - n.options.slidesToShow).addClass("slick-center") : t === n.slideCount - 1 && e.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(t).addClass("slick-center")) : t >= 0 && t <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(t, t + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : e.length <= n.options.slidesToShow ? e.addClass("slick-active").attr("aria-hidden", "false") : (o = n.slideCount % n.options.slidesToShow, s = n.options.infinite === !0 ? n.options.slidesToShow + t : t, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - t < n.options.slidesToShow ? e.slice(s - (n.options.slidesToShow - o), s + o).addClass("slick-active").attr("aria-hidden", "false") : e.slice(s, s + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === n.options.lazyLoad && n.lazyLoad()
        }, i.prototype.setupInfinite = function() {
            var i, e, s, o = this;
            if (o.options.fade === !0 && (o.options.centerMode = !1), o.options.infinite === !0 && o.options.fade === !1 && (e = null,
                    o.slideCount > o.options.slidesToShow)) {
                for (s = o.options.centerMode === !0 ? o.options.slidesToShow + 1 : o.options.slidesToShow, i = o.slideCount; i > o.slideCount - s; i -= 1) e = i - 1, t(o.$slides[e]).clone(!0).attr("id", "").attr("data-slick-index", e - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
                for (i = 0; s > i; i += 1) e = i, t(o.$slides[e]).clone(!0).attr("id", "").attr("data-slick-index", e + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
                o.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                    t(this).attr("id", "")
                })
            }
        }, i.prototype.setPaused = function(t) {
            var i = this;
            i.options.autoplay === !0 && i.options.pauseOnHover === !0 && (i.paused = t, t ? i.autoPlayClear() : i.autoPlay())
        }, i.prototype.selectHandler = function(i) {
            var e = this,
                s = t(i.target).is(".slick-slide") ? t(i.target) : t(i.target).parents(".slick-slide"),
                o = parseInt(s.attr("data-slick-index"));
            return o || (o = 0), e.slideCount <= e.options.slidesToShow ? (e.setSlideClasses(o), void e.asNavFor(o)) : void e.slideHandler(o)
        }, i.prototype.slideHandler = function(t, i, e) {
            var s, o, n, r, a = null,
                l = this;
            return i = i || !1, l.animating === !0 && l.options.waitForAnimate === !0 || l.options.fade === !0 && l.currentSlide === t || l.slideCount <= l.options.slidesToShow ? void 0 : (i === !1 && l.asNavFor(t), s = t, a = l.getLeft(s), r = l.getLeft(l.currentSlide), l.currentLeft = null === l.swipeLeft ? r : l.swipeLeft, l.options.infinite === !1 && l.options.centerMode === !1 && (0 > t || t > l.getDotCount() * l.options.slidesToScroll) ? void(l.options.fade === !1 && (s = l.currentSlide, e !== !0 ? l.animateSlide(r, function() {
                l.postSlide(s)
            }) : l.postSlide(s))) : l.options.infinite === !1 && l.options.centerMode === !0 && (0 > t || t > l.slideCount - l.options.slidesToScroll) ? void(l.options.fade === !1 && (s = l.currentSlide, e !== !0 ? l.animateSlide(r, function() {
                l.postSlide(s)
            }) : l.postSlide(s))) : (l.options.autoplay === !0 && clearInterval(l.autoPlayTimer), o = 0 > s ? 0 !== l.slideCount % l.options.slidesToScroll ? l.slideCount - l.slideCount % l.options.slidesToScroll : l.slideCount + s : s >= l.slideCount ? 0 !== l.slideCount % l.options.slidesToScroll ? 0 : s - l.slideCount : s, l.animating = !0, l.$slider.trigger("beforeChange", [l, l.currentSlide, o]), n = l.currentSlide, l.currentSlide = o, l.setSlideClasses(l.currentSlide), l.updateDots(), l.updateArrows(), l.options.fade === !0 ? (e !== !0 ? (l.fadeSlideOut(n), l.fadeSlide(o, function() {
                l.postSlide(o)
            })) : l.postSlide(o), void l.animateHeight()) : void(e !== !0 ? l.animateSlide(a, function() {
                l.postSlide(o)
            }) : l.postSlide(o))))
        }, i.prototype.startLoad = function() {
            var t = this;
            t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.hide(), t.$slider.addClass("slick-loading")
        }, i.prototype.swipeDirection = function() {
            var t, i, e, s, o = this;
            return t = o.touchObject.startX - o.touchObject.curX, i = o.touchObject.startY - o.touchObject.curY, e = Math.atan2(i, t), s = Math.round(180 * e / Math.PI), 0 > s && (s = 360 - Math.abs(s)), 45 >= s && s >= 0 ? o.options.rtl === !1 ? "left" : "right" : 360 >= s && s >= 315 ? o.options.rtl === !1 ? "left" : "right" : s >= 135 && 225 >= s ? o.options.rtl === !1 ? "right" : "left" : o.options.verticalSwiping === !0 ? s >= 35 && 135 >= s ? "left" : "right" : "vertical"
        }, i.prototype.swipeEnd = function() {
            var t, i = this;
            if (i.dragging = !1, i.shouldClick = !(i.touchObject.swipeLength > 10), void 0 === i.touchObject.curX) return !1;
            if (i.touchObject.edgeHit === !0 && i.$slider.trigger("edge", [i, i.swipeDirection()]), i.touchObject.swipeLength >= i.touchObject.minSwipe) switch (i.swipeDirection()) {
                case "left":
                    t = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide + i.getSlideCount()) : i.currentSlide + i.getSlideCount(), i.slideHandler(t), i.currentDirection = 0, i.touchObject = {}, i.$slider.trigger("swipe", [i, "left"]);
                    break;
                case "right":
                    t = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide - i.getSlideCount()) : i.currentSlide - i.getSlideCount(), i.slideHandler(t), i.currentDirection = 1, i.touchObject = {}, i.$slider.trigger("swipe", [i, "right"])
            } else i.touchObject.startX !== i.touchObject.curX && (i.slideHandler(i.currentSlide), i.touchObject = {})
        }, i.prototype.swipeHandler = function(t) {
            var i = this;
            if (!(i.options.swipe === !1 || "ontouchend" in document && i.options.swipe === !1 || i.options.draggable === !1 && -1 !== t.type.indexOf("mouse"))) switch (i.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1, i.touchObject.minSwipe = i.listWidth / i.options.touchThreshold, i.options.verticalSwiping === !0 && (i.touchObject.minSwipe = i.listHeight / i.options.touchThreshold), t.data.action) {
                case "start":
                    i.swipeStart(t);
                    break;
                case "move":
                    i.swipeMove(t);
                    break;
                case "end":
                    i.swipeEnd(t)
            }
        }, i.prototype.swipeMove = function(t) {
            var i, e, s, o, n, r = this;
            return n = void 0 !== t.originalEvent ? t.originalEvent.touches : null, !(!r.dragging || n && 1 !== n.length) && (i = r.getLeft(r.currentSlide), r.touchObject.curX = void 0 !== n ? n[0].pageX : t.clientX, r.touchObject.curY = void 0 !== n ? n[0].pageY : t.clientY, r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curX - r.touchObject.startX, 2))), r.options.verticalSwiping === !0 && (r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curY - r.touchObject.startY, 2)))), e = r.swipeDirection(), "vertical" !== e ? (void 0 !== t.originalEvent && r.touchObject.swipeLength > 4 && t.preventDefault(), o = (r.options.rtl === !1 ? 1 : -1) * (r.touchObject.curX > r.touchObject.startX ? 1 : -1), r.options.verticalSwiping === !0 && (o = r.touchObject.curY > r.touchObject.startY ? 1 : -1), s = r.touchObject.swipeLength, r.touchObject.edgeHit = !1, r.options.infinite === !1 && (0 === r.currentSlide && "right" === e || r.currentSlide >= r.getDotCount() && "left" === e) && (s = r.touchObject.swipeLength * r.options.edgeFriction, r.touchObject.edgeHit = !0), r.swipeLeft = r.options.vertical === !1 ? i + s * o : i + s * (r.$list.height() / r.listWidth) * o, r.options.verticalSwiping === !0 && (r.swipeLeft = i + s * o), r.options.fade !== !0 && r.options.touchMove !== !1 && (r.animating === !0 ? (r.swipeLeft = null, !1) : void r.setCSS(r.swipeLeft))) : void 0)
        }, i.prototype.swipeStart = function(t) {
            var i, e = this;
            return 1 !== e.touchObject.fingerCount || e.slideCount <= e.options.slidesToShow ? (e.touchObject = {}, !1) : (void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (i = t.originalEvent.touches[0]), e.touchObject.startX = e.touchObject.curX = void 0 !== i ? i.pageX : t.clientX, e.touchObject.startY = e.touchObject.curY = void 0 !== i ? i.pageY : t.clientY, void(e.dragging = !0))
        }, i.prototype.unfilterSlides = i.prototype.slickUnfilter = function() {
            var t = this;
            null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit())
        }, i.prototype.unload = function() {
            var i = this;
            t(".slick-cloned", i.$slider).remove(), i.$dots && i.$dots.remove(), i.$prevArrow && i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove(), i.$nextArrow && i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove(), i.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
        }, i.prototype.unslick = function(t) {
            var i = this;
            i.$slider.trigger("unslick", [i, t]), i.destroy()
        }, i.prototype.updateArrows = function() {
            var t, i = this;
            t = Math.floor(i.options.slidesToShow / 2), i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && i.options.centerMode === !1 ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && i.options.centerMode === !0 && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
        }, i.prototype.updateDots = function() {
            var t = this;
            null !== t.$dots && (t.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
        }, i.prototype.visibility = function() {
            var t = this;
            document[t.hidden] ? (t.paused = !0, t.autoPlayClear()) : t.options.autoplay === !0 && (t.paused = !1, t.autoPlay())
        }, i.prototype.initADA = function() {
            var i = this;
            i.$slides.add(i.$slideTrack.find(".slick-cloned")).attr({
                "aria-hidden": "true",
                tabindex: "-1"
            }).find("a, input, button, select").attr({
                tabindex: "-1"
            }), i.$slideTrack.attr("role", "listbox"), i.$slides.not(i.$slideTrack.find(".slick-cloned")).each(function(e) {
                t(this).attr({
                    role: "option",
                    "aria-describedby": "slick-slide" + i.instanceUid + e
                })
            }), null !== i.$dots && i.$dots.attr("role", "tablist").find("li").each(function(e) {
                t(this).attr({
                    role: "presentation",
                    "aria-selected": "false",
                    "aria-controls": "navigation" + i.instanceUid + e,
                    id: "slick-slide" + i.instanceUid + e
                })
            }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), i.activateADA()
        }, i.prototype.activateADA = function() {
            var t = this,
                i = t.$slider.find("*").is(":focus");
            t.$slideTrack.find(".slick-active").attr({
                "aria-hidden": "false",
                tabindex: "0"
            }).find("a, input, button, select").attr({
                tabindex: "0"
            }), i && t.$slideTrack.find(".slick-active").focus()
        }, i.prototype.focusHandler = function() {
            var i = this;
            i.$slider.on("focus.slick blur.slick", "*", function(e) {
                e.stopImmediatePropagation();
                var s = t(this);
                setTimeout(function() {
                    i.isPlay && (s.is(":focus") ? (i.autoPlayClear(), i.paused = !0) : (i.paused = !1, i.autoPlay()))
                }, 0)
            })
        }, t.fn.slick = function() {
            var t, e = this,
                s = arguments[0],
                o = Array.prototype.slice.call(arguments, 1),
                n = e.length,
                r = 0;
            for (r; n > r; r++)
                if ("object" == typeof s || "undefined" == typeof s ? e[r].slick = new i(e[r], s) : t = e[r].slick[s].apply(e[r].slick, o), "undefined" != typeof t) return t;
            return e
        }
    }), void 0 === wwctrials) var wwctrials = {};
if (wwctrials.tracking = function(t) {
        var i = {
            init: function() {
                this.eventTracking()
            },
            eventTracking: function() {
                t("._gt").on("click", function() {
                    var i = t(this),
                        e = i.data("category"),
                        s = i.data("action"),
                        o = i.data("label");
                    wwctrials.tracking.trackEvent(e, s, o)
                }), t(".library-gate-box .btn").on("click", function() {
                    wwctrials.tracking.trackEvent("Research Library", "Submit", "Gated Content Submit")
                }), t(".library-list").on("click", ".read-more", function() {
                    var i = t(this),
                        e = i.closest(".library-item").find(".library-title").text(),
                        s = e.split(" "),
                        o = "";
                    if (s.length <= 5) o = e + " ";
                    else
                        for (var n = 0; n < 5; n++) o += s[n] + " ";
                    o += "- Read More", wwctrials.tracking.trackEvent("Research Library", "Read More", o)
                }), t('.investigator-form input[type="submit"]').click(function() {
                    wwctrials.tracking.trackEvent("Investigator", "Submit", "Investigator Form-Submit")
                });
                var i = t(".footer");
                i.find(".fa-facebook").on("click", function() {
                    wwctrials.tracking.trackEvent("Social Links", "Click", "Facebook")
                }), i.find(".fa-twitter").on("click", function() {
                    wwctrials.tracking.trackEvent("Social Links", "Click", "Twitter")
                }), i.find(".fa-linkedin").on("click", function() {
                    wwctrials.tracking.trackEvent("Social Links", "Click", "LinkedIn")
                })
            },
            trackContactSubmit: function() {
                wwctrials.tracking.trackEvent("Contact Us", "Submit", "Contact Form-Submit")
            },
            trackEvent: function(t, i, e) {
                "function" == typeof ga ? ga("send", "event", t, i, e) : console.log("Unable to log event: \nCategory: " + t + "\nAction: " + i + "\nLabel: " + e)
            }
        };
        return i
    }(jQuery), jQuery(document).ready(function($) {
        wwctrials.tracking.init()
    }), void 0 === wwctrials) var wwctrials = {};
if (wwctrials.main = function(t) {
        var i = t("body").is(".EditMode"),
            e = t("body").is(".DesignMode"),
            s = {
                init: function() {
                    this.externalLinks(), this.heroArrow(), this.mobileNav(), this.clickFirstLink(), this.parallax(), this.homeTherapeuticAreas(), this.scrollable(), this.tabSelector(), this.regionalMessage(), this.videoModal(), this.librarySignupModal(), this.collapsibleBox(), this.searchToggle(), this.imageSlider(), this.contactUs(), this.methodsSearch()
                },
                externalLinks: function() {
                    t('a[href^="http"]').each(function() {
                        this.href.indexOf(location.host) == -1 && t(this).attr("target", "_blank")
                    })
                },
                collapsibleBox: function() {
                    var s = t(".collapsible-box-webpart");
                    if (s.length > 0)
                        if (i || e) {
                            var o = s.find(".collapsible-heading");
                            o.addClass("active"), o.next(".collapsible-content").show()
                        } else s.find(".collapsible-heading").on("click", function() {
                            var i = t(this);
                            i.toggleClass("active"), i.next(".collapsible-content").slideToggle()
                        })
                },
                searchToggle: function() {
                    t(".header-search").length > 0 && (t(".search-toggle").on("click", function() {
                        var i = t(this),
                            e = t(".header-search");
                        i.hasClass("active") ? (i.removeClass("active"), e.fadeOut()) : (i.addClass("active"), e.fadeIn())
                    }), t(".search-close").on("click", function() {
                        var i = t(".header-search"),
                            e = t(".search-toggle");
                        e.removeClass("active"), i.fadeOut()
                    }))
                },
                heroArrow: function() {
                    var i = t(".hero-image-webpart, .hero-video-webpart"),
                        e = i.find(".down-arrow");
                    e.on("click", function() {
                        t("html, body").animate({
                            scrollTop: i.offset().top + i.height()
                        }, 500)
                    })
                },
                parallax: function() {
                    if (console.log("paralax activated"), s.isMobile.any()) return void t(".hero-image-webpart").each(function(i, e) {
                        t(this).find(".img-bg").css("background-position", "50% 0"), t(this).find(".img-bg").css("background-attachment", "scroll")
                    });
                    var i = [],
                        e = function() {
                            i = [], t(".hero-image-webpart").each(function(e, s) {
                                e > 0 ? (t(this).find(".img-bg").css("background-position", "50% 0"), t(this).find(".img-bg").css("background-attachment", "scroll")) : i.push({
                                    startingPos: t(s).offset().top,
                                    elem: t(s)
                                })
                            })
                        };
                    e(), t(window).on("resize", function() {
                        e(), t(window).trigger("scroll")
                    }), t(window).on("scroll", function() {
                        t(i).each(function(i, e) {
                            var s = e.startingPos - t(window).scrollTop();
                            s < 0 ? e.elem.find(".img-bg").css("background-position", "50% " + s / 2 + "px") : e.elem.find(".img-bg").css("background-position", "50% " + s + "px")
                        })
                    }), t(window).trigger("scroll")
                },
                mobileNav: function() {
                    var i = t(".nav-icon"),
                        e = t(".mobile-nav");
                    if (e.is(":visible")) {
                        i.on("click", function() {
                            t(this).is(".open") ? e.removeClass("open") : e.addClass("open")
                        });
                        var s = e.find(".root-nav"),
                            o = e.find(".sub-nav");
                        o.each(function() {
                            var i = t(this),
                                s = i.siblings("a");
                            s.data("subnav", i), s.addClass("has-children"), i.remove().appendTo(e)
                        }), t(window).on("load", function() {
                            new IScroll(s.get(0), {
                                click: !0
                            }), o.each(function() {
                                new IScroll(this, {
                                    click: !0
                                })
                            })
                        }), e.on("click", "a", function(i) {
                            var s = t(this),
                                n = s.data("subnav");
                            void 0 != n ? (i.preventDefault(), n.addClass("open")) : (e.removeClass("open"), o.removeCLass("open"))
                        }), e.on("click", ".back", function(i) {
                            var e = t(this);
                            e.closest(".sub-nav").removeClass("open")
                        })
                    } else i.on("click", function() {
                        var e = t(".primary-nav");
                        t(this).is(".open") ? (e.removeClass("open"), i.removeClass("open")) : (e.addClass("open"), i.addClass("open"))
                    })
                },
                clickFirstLink: function() {
                    i || t(".click-first-link").on("click", function() {
                        var i = t(this).find("a[href]").attr("href");
                        void 0 != i && "" != i && (window.location = i)
                    })
                },
                homeTherapeuticAreas: function() {
                    var i = t(".home-therapeutic-icons-wrapper"),
                        e = t(".home-therapeutic-icon"),
                        s = Math.max(e.length, 1);
                    i.on("click", ".next, .previous", function(i) {
                        var o, n = t(i.target),
                            r = e.index(e.filter(".active").get(0));
                        o = n.is(".next") ? (r + 1) % s : 0 == r ? s - 1 : r - 1, e.eq(r).removeClass("active"), e.eq(o).addClass("active")
                    })
                },
                scrollable: function() {
                    t(window).load(function() {
                        var i = t(".scroll-wrapper");
                        i.each(function(i, e) {
                            var s = t(e),
                                o = s.find(".scroller");
                            1 == o.length && (s.height(o.height()), new IScroll(e, {
                                eventPassthrough: !0,
                                scrollX: !0,
                                scrollY: !1
                            }))
                        })
                    })
                },
                tabSelector: function() {
                    var i = t(".tabs");
                    i.on("click", ".tab", function(i) {
                        var e = t(this),
                            s = e.closest(".tabs"),
                            o = s.find(".tab");
                        o.length > 1 && 1 == o.filter(":visible").length ? (i.preventDefault(), s.addClass("overlay")) : s.is(".overlay") && e.is(".selected") && (i.preventDefault(), s.removeClass("overlay"))
                    })
                },
                regionalMessage: function() {
                    var i = t(".regional-message-webpart");
                    i.find(".close-btn").on("click", function() {
                        i.addClass("hide"), s.setCookie("rgnmsg", "1", 365)
                    })
                },
                videoModal: function() {
                    var i = t(".video-modal"),
                        e = i.find(".video-iframe"),
                        o = i.find(".modal-title");
                    i.on("show.bs.modal", function(i) {
                        var n = t(i.relatedTarget),
                            r = n.data("title");
                        o.text(r);
                        var a = s.convertToYouTubeEmbedUrl(n.attr("href"));
                        e.attr("src", a)
                    }), i.on("hide.bs.modal", function() {
                        e.attr("src", "")
                    })
                },
                librarySignupModal: function() {
                    var i = t(".library-signup-modal"),
                        e = i.find(".feature-signup-success a");
                    if (i.length > 0) {
                        var o = t(".library-featured a, .featured-resource a");
                        o.on("click", function(o) {
                            var n = t(this);
                            e.attr("href", n.attr("href"));
                            var r = s.getCookie("libsignup");
                            "1" != r && (o.preventDefault(), i.modal("show"))
                        })
                    }
                },
                imageSlider: function() {
                    t(".image-slider-webpart").each(function() {
                        var i = t(this);
                        i.slick({
                            arrows: !0,
                            dots: !0,
                            autoplay: !0,
                            autoplaySpeed: 12e3,
                            slide: ".image-slide",
                            prevArrow: ".prev-slide",
                            nextArrow: ".next-slide"
                        })
                    })
                },
                contactUs: function() {
                    var i = t(".contact-us-webpart"),
                        e = null;
                    if (i.length > 0) {
                        var s = i.find(".contact-options");
                        s.on("change", function() {
                            var t = i.find("." + this.value);
                            t.length > 0 && (null != e && e.hide(), t.show(), e = t)
                        })
                    }
                },
                methodsSearch: function() {
                    var i = t(".methods-search-webpart"),
                        e = i.find(".textbox"),
                        s = i.find("input[type=submit]");
                    e.on("keypress", function(t) {
                        if (13 === t.keyCode) return t.preventDefault(), s.click(), !1
                    })
                },
                convertToYouTubeEmbedUrl: function(t) {
                    var i = /v=([^&]+)/,
                        e = i.exec(t);
                    return e.length > 1 ? "https://www.youtube.com/embed/" + e[1] + "?autoplay=1&autohide=0" : ""
                },
                getCookie: function(t) {
                    for (var i = t + "=", e = document.cookie.split(";"), s = 0; s < e.length; s++) {
                        for (var o = e[s];
                            " " == o.charAt(0);) o = o.substring(1);
                        if (0 == o.indexOf(i)) return o.substring(i.length, o.length)
                    }
                    return ""
                },
                setCookie: function(t, i, e) {
                    var s = new Date;
                    s.setTime(s.getTime() + 24 * e * 60 * 60 * 1e3);
                    var o = "expires=" + s.toUTCString();
                    document.cookie = t + "=" + i + "; " + o
                },
                isMobile: {
                    android: function() {
                        return !!navigator.userAgent.match(/Android/i)
                    },
                    blackBerry: function() {
                        return !!navigator.userAgent.match(/BlackBerry/i)
                    },
                    iOS: function() {
                        return !!navigator.userAgent.match(/iPhone|iPad|iPod/i)
                    },
                    iOS7: function() {
                        if (!this.iOS()) return !1;
                        var t = this.iOSVersion();
                        return t[0] > 6 && t[0] < 8
                    },
                    windows: function() {
                        return !!navigator.userAgent.match(/IEMobile/i)
                    },
                    any: function() {
                        return this.android() || this.blackBerry() || this.iOS() || this.windows()
                    },
                    iOSVersion: function() {
                        if (this.iOS()) {
                            var t = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                            return [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3] || 0, 10)]
                        }
                        return []
                    }
                }
            };
        return s
    }(jQuery), jQuery(function() {
        wwctrials.main.init()
    }), function(t, i, e) {
        function s(t, e) {
            this.wrapper = "string" == typeof t ? i.querySelector(t) : t, this.scroller = this.wrapper.children[0], this.scrollerStyle = this.scroller.style, this.options = {
                resizeScrollbars: !0,
                mouseWheelSpeed: 20,
                snapThreshold: .334,
                startX: 0,
                startY: 0,
                scrollY: !0,
                directionLockThreshold: 5,
                momentum: !0,
                bounce: !0,
                bounceTime: 600,
                bounceEasing: "",
                preventDefault: !0,
                preventDefaultException: {
                    tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
                },
                HWCompositing: !0,
                useTransition: !0,
                useTransform: !0
            };
            for (var s in e) this.options[s] = e[s];
            this.translateZ = this.options.HWCompositing && a.hasPerspective ? " translateZ(0)" : "", this.options.useTransition = a.hasTransition && this.options.useTransition, this.options.useTransform = a.hasTransform && this.options.useTransform, this.options.eventPassthrough = this.options.eventPassthrough === !0 ? "vertical" : this.options.eventPassthrough, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollY = "vertical" != this.options.eventPassthrough && this.options.scrollY, this.options.scrollX = "horizontal" != this.options.eventPassthrough && this.options.scrollX, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? a.ease[this.options.bounceEasing] || a.ease.circular : this.options.bounceEasing, this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling, this.options.tap === !0 && (this.options.tap = "tap"), "scale" == this.options.shrinkScrollbars && (this.options.useTransition = !1), this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1, this.x = 0, this.y = 0, this.directionX = 0, this.directionY = 0, this._events = {}, this._init(), this.refresh(), this.scrollTo(this.options.startX, this.options.startY), this.enable()
        }

        function o(t, e, s) {
            var o = i.createElement("div"),
                n = i.createElement("div");
            return s === !0 && (o.style.cssText = "position:absolute;z-index:9999", n.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"), n.className = "iScrollIndicator", "h" == t ? (s === !0 && (o.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", n.style.height = "100%"), o.className = "iScrollHorizontalScrollbar") : (s === !0 && (o.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", n.style.width = "100%"), o.className = "iScrollVerticalScrollbar"), o.style.cssText += ";overflow:hidden", e || (o.style.pointerEvents = "none"), o.appendChild(n), o
        }

        function n(e, s) {
            this.wrapper = "string" == typeof s.el ? i.querySelector(s.el) : s.el, this.wrapperStyle = this.wrapper.style, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = e, this.options = {
                listenX: !0,
                listenY: !0,
                interactive: !1,
                resize: !0,
                defaultScrollbars: !1,
                shrink: !1,
                fade: !1,
                speedRatioX: 0,
                speedRatioY: 0
            };
            for (var o in s) this.options[o] = s[o];
            this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.options.interactive && (this.options.disableTouch || (a.addEvent(this.indicator, "touchstart", this), a.addEvent(t, "touchend", this)), this.options.disablePointer || (a.addEvent(this.indicator, a.prefixPointerEvent("pointerdown"), this), a.addEvent(t, a.prefixPointerEvent("pointerup"), this)), this.options.disableMouse || (a.addEvent(this.indicator, "mousedown", this), a.addEvent(t, "mouseup", this))), this.options.fade && (this.wrapperStyle[a.style.transform] = this.scroller.translateZ, this.wrapperStyle[a.style.transitionDuration] = a.isBadAndroid ? "0.001s" : "0ms", this.wrapperStyle.opacity = "0")
        }
        var r = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame || function(i) {
                t.setTimeout(i, 1e3 / 60)
            },
            a = function() {
                function s(t) {
                    return r !== !1 && ("" === r ? t : r + t.charAt(0).toUpperCase() + t.substr(1))
                }
                var o = {},
                    n = i.createElement("div").style,
                    r = function() {
                        for (var t, i = ["t", "webkitT", "MozT", "msT", "OT"], e = 0, s = i.length; e < s; e++)
                            if (t = i[e] + "ransform", t in n) return i[e].substr(0, i[e].length - 1);
                        return !1
                    }();
                o.getTime = Date.now || function() {
                    return (new Date).getTime()
                }, o.extend = function(t, i) {
                    for (var e in i) t[e] = i[e]
                }, o.addEvent = function(t, i, e, s) {
                    t.addEventListener(i, e, !!s)
                }, o.removeEvent = function(t, i, e, s) {
                    t.removeEventListener(i, e, !!s)
                }, o.prefixPointerEvent = function(i) {
                    return t.MSPointerEvent ? "MSPointer" + i.charAt(9).toUpperCase() + i.substr(10) : i
                }, o.momentum = function(t, i, s, o, n, r) {
                    var a, l, h = t - i,
                        c = e.abs(h) / s;
                    return r = void 0 === r ? 6e-4 : r, a = t + c * c / (2 * r) * (h < 0 ? -1 : 1), l = c / r, a < o ? (a = n ? o - n / 2.5 * (c / 8) : o, h = e.abs(a - t), l = h / c) : a > 0 && (a = n ? n / 2.5 * (c / 8) : 0, h = e.abs(t) + a, l = h / c), {
                        destination: e.round(a),
                        duration: l
                    }
                };
                var a = s("transform");
                return o.extend(o, {
                    hasTransform: a !== !1,
                    hasPerspective: s("perspective") in n,
                    hasTouch: "ontouchstart" in t,
                    hasPointer: t.PointerEvent || t.MSPointerEvent,
                    hasTransition: s("transition") in n
                }), o.isBadAndroid = /Android /.test(t.navigator.appVersion) && !/Chrome\/\d/.test(t.navigator.appVersion), o.extend(o.style = {}, {
                    transform: a,
                    transitionTimingFunction: s("transitionTimingFunction"),
                    transitionDuration: s("transitionDuration"),
                    transitionDelay: s("transitionDelay"),
                    transformOrigin: s("transformOrigin")
                }), o.hasClass = function(t, i) {
                    var e = new RegExp("(^|\\s)" + i + "(\\s|$)");
                    return e.test(t.className)
                }, o.addClass = function(t, i) {
                    if (!o.hasClass(t, i)) {
                        var e = t.className.split(" ");
                        e.push(i), t.className = e.join(" ")
                    }
                }, o.removeClass = function(t, i) {
                    if (o.hasClass(t, i)) {
                        var e = new RegExp("(^|\\s)" + i + "(\\s|$)", "g");
                        t.className = t.className.replace(e, " ")
                    }
                }, o.offset = function(t) {
                    for (var i = -t.offsetLeft, e = -t.offsetTop; t = t.offsetParent;) i -= t.offsetLeft, e -= t.offsetTop;
                    return {
                        left: i,
                        top: e
                    }
                }, o.preventDefaultException = function(t, i) {
                    for (var e in i)
                        if (i[e].test(t[e])) return !0;
                    return !1
                }, o.extend(o.eventType = {}, {
                    touchstart: 1,
                    touchmove: 1,
                    touchend: 1,
                    mousedown: 2,
                    mousemove: 2,
                    mouseup: 2,
                    pointerdown: 3,
                    pointermove: 3,
                    pointerup: 3,
                    MSPointerDown: 3,
                    MSPointerMove: 3,
                    MSPointerUp: 3
                }), o.extend(o.ease = {}, {
                    quadratic: {
                        style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        fn: function(t) {
                            return t * (2 - t)
                        }
                    },
                    circular: {
                        style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
                        fn: function(t) {
                            return e.sqrt(1 - --t * t)
                        }
                    },
                    back: {
                        style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        fn: function(t) {
                            var i = 4;
                            return (t -= 1) * t * ((i + 1) * t + i) + 1
                        }
                    },
                    bounce: {
                        style: "",
                        fn: function(t) {
                            return (t /= 1) < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                        }
                    },
                    elastic: {
                        style: "",
                        fn: function(t) {
                            var i = .22,
                                s = .4;
                            return 0 === t ? 0 : 1 == t ? 1 : s * e.pow(2, -10 * t) * e.sin((t - i / 4) * (2 * e.PI) / i) + 1
                        }
                    }
                }), o.tap = function(t, e) {
                    var s = i.createEvent("Event");
                    s.initEvent(e, !0, !0), s.pageX = t.pageX, s.pageY = t.pageY, t.target.dispatchEvent(s)
                }, o.click = function(t) {
                    var e, s = t.target;
                    /(SELECT|INPUT|TEXTAREA)/i.test(s.tagName) || (e = i.createEvent("MouseEvents"), e.initMouseEvent("click", !0, !0, t.view, 1, s.screenX, s.screenY, s.clientX, s.clientY, t.ctrlKey, t.altKey, t.shiftKey, t.metaKey, 0, null), e._constructed = !0, s.dispatchEvent(e))
                }, o
            }();
        s.prototype = {
            version: "5.1.3",
            _init: function() {
                this._initEvents(), (this.options.scrollbars || this.options.indicators) && this._initIndicators(), this.options.mouseWheel && this._initWheel(), this.options.snap && this._initSnap(), this.options.keyBindings && this._initKeys()
            },
            destroy: function() {
                this._initEvents(!0), this._execEvent("destroy")
            },
            _transitionEnd: function(t) {
                t.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, this._execEvent("scrollEnd")))
            },
            _start: function(t) {
                if ((1 == a.eventType[t.type] || 0 === t.button) && this.enabled && (!this.initiated || a.eventType[t.type] === this.initiated)) {
                    !this.options.preventDefault || a.isBadAndroid || a.preventDefaultException(t.target, this.options.preventDefaultException) || t.preventDefault();
                    var i, s = t.touches ? t.touches[0] : t;
                    this.initiated = a.eventType[t.type], this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.directionLocked = 0, this._transitionTime(), this.startTime = a.getTime(), this.options.useTransition && this.isInTransition ? (this.isInTransition = !1, i = this.getComputedPosition(), this._translate(e.round(i.x), e.round(i.y)), this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this._execEvent("scrollEnd")), this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = s.pageX, this.pointY = s.pageY, this._execEvent("beforeScrollStart")
                }
            },
            _move: function(t) {
                if (this.enabled && a.eventType[t.type] === this.initiated) {
                    this.options.preventDefault && t.preventDefault();
                    var i, s, o, n, r = t.touches ? t.touches[0] : t,
                        l = r.pageX - this.pointX,
                        h = r.pageY - this.pointY,
                        c = a.getTime();
                    if (this.pointX = r.pageX, this.pointY = r.pageY, this.distX += l, this.distY += h, o = e.abs(this.distX), n = e.abs(this.distY), !(c - this.endTime > 300 && o < 10 && n < 10)) {
                        if (this.directionLocked || this.options.freeScroll || (o > n + this.options.directionLockThreshold ? this.directionLocked = "h" : n >= o + this.options.directionLockThreshold ? this.directionLocked = "v" : this.directionLocked = "n"), "h" == this.directionLocked) {
                            if ("vertical" == this.options.eventPassthrough) t.preventDefault();
                            else if ("horizontal" == this.options.eventPassthrough) return void(this.initiated = !1);
                            h = 0
                        } else if ("v" == this.directionLocked) {
                            if ("horizontal" == this.options.eventPassthrough) t.preventDefault();
                            else if ("vertical" == this.options.eventPassthrough) return void(this.initiated = !1);
                            l = 0
                        }
                        l = this.hasHorizontalScroll ? l : 0, h = this.hasVerticalScroll ? h : 0, i = this.x + l, s = this.y + h, (i > 0 || i < this.maxScrollX) && (i = this.options.bounce ? this.x + l / 3 : i > 0 ? 0 : this.maxScrollX), (s > 0 || s < this.maxScrollY) && (s = this.options.bounce ? this.y + h / 3 : s > 0 ? 0 : this.maxScrollY), this.directionX = l > 0 ? -1 : l < 0 ? 1 : 0, this.directionY = h > 0 ? -1 : h < 0 ? 1 : 0, this.moved || this._execEvent("scrollStart"), this.moved = !0, this._translate(i, s), c - this.startTime > 300 && (this.startTime = c, this.startX = this.x, this.startY = this.y)
                    }
                }
            },
            _end: function(t) {
                if (this.enabled && a.eventType[t.type] === this.initiated) {
                    this.options.preventDefault && !a.preventDefaultException(t.target, this.options.preventDefaultException) && t.preventDefault();
                    var i, s, o = (t.changedTouches ? t.changedTouches[0] : t, a.getTime() - this.startTime),
                        n = e.round(this.x),
                        r = e.round(this.y),
                        l = e.abs(n - this.startX),
                        h = e.abs(r - this.startY),
                        c = 0,
                        d = "";
                    if (this.isInTransition = 0, this.initiated = 0, this.endTime = a.getTime(), !this.resetPosition(this.options.bounceTime)) {
                        if (this.scrollTo(n, r), !this.moved) return this.options.tap && a.tap(t, this.options.tap), this.options.click && a.click(t), void this._execEvent("scrollCancel");
                        if (this._events.flick && o < 200 && l < 100 && h < 100) return void this._execEvent("flick");
                        if (this.options.momentum && o < 300 && (i = this.hasHorizontalScroll ? a.momentum(this.x, this.startX, o, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
                                destination: n,
                                duration: 0
                            }, s = this.hasVerticalScroll ? a.momentum(this.y, this.startY, o, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
                                destination: r,
                                duration: 0
                            }, n = i.destination, r = s.destination, c = e.max(i.duration, s.duration), this.isInTransition = 1), this.options.snap) {
                            var p = this._nearestSnap(n, r);
                            this.currentPage = p, c = this.options.snapSpeed || e.max(e.max(e.min(e.abs(n - p.x), 1e3), e.min(e.abs(r - p.y), 1e3)), 300), n = p.x, r = p.y, this.directionX = 0, this.directionY = 0, d = this.options.bounceEasing
                        }
                        return n != this.x || r != this.y ? ((n > 0 || n < this.maxScrollX || r > 0 || r < this.maxScrollY) && (d = a.ease.quadratic), void this.scrollTo(n, r, c, d)) : void this._execEvent("scrollEnd")
                    }
                }
            },
            _resize: function() {
                var t = this;
                clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() {
                    t.refresh()
                }, this.options.resizePolling)
            },
            resetPosition: function(t) {
                var i = this.x,
                    e = this.y;
                return t = t || 0, !this.hasHorizontalScroll || this.x > 0 ? i = 0 : this.x < this.maxScrollX && (i = this.maxScrollX), !this.hasVerticalScroll || this.y > 0 ? e = 0 : this.y < this.maxScrollY && (e = this.maxScrollY), (i != this.x || e != this.y) && (this.scrollTo(i, e, t, this.options.bounceEasing), !0)
            },
            disable: function() {
                this.enabled = !1
            },
            enable: function() {
                this.enabled = !0
            },
            refresh: function() {
                this.wrapper.offsetHeight, this.wrapperWidth = this.wrapper.clientWidth, this.wrapperHeight = this.wrapper.clientHeight, this.scrollerWidth = this.scroller.offsetWidth, this.scrollerHeight = this.scroller.offsetHeight, this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.maxScrollY = this.wrapperHeight - this.scrollerHeight, this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, this.wrapperOffset = a.offset(this.wrapper), this._execEvent("refresh"), this.resetPosition()
            },
            on: function(t, i) {
                this._events[t] || (this._events[t] = []), this._events[t].push(i)
            },
            off: function(t, i) {
                if (this._events[t]) {
                    var e = this._events[t].indexOf(i);
                    e > -1 && this._events[t].splice(e, 1)
                }
            },
            _execEvent: function(t) {
                if (this._events[t]) {
                    var i = 0,
                        e = this._events[t].length;
                    if (e)
                        for (; i < e; i++) this._events[t][i].apply(this, [].slice.call(arguments, 1))
                }
            },
            scrollBy: function(t, i, e, s) {
                t = this.x + t, i = this.y + i, e = e || 0, this.scrollTo(t, i, e, s)
            },
            scrollTo: function(t, i, e, s) {
                s = s || a.ease.circular, this.isInTransition = this.options.useTransition && e > 0, !e || this.options.useTransition && s.style ? (this._transitionTimingFunction(s.style), this._transitionTime(e), this._translate(t, i)) : this._animate(t, i, e, s.fn)
            },
            scrollToElement: function(t, i, s, o, n) {
                if (t = t.nodeType ? t : this.scroller.querySelector(t)) {
                    var r = a.offset(t);
                    r.left -= this.wrapperOffset.left, r.top -= this.wrapperOffset.top, s === !0 && (s = e.round(t.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), o === !0 && (o = e.round(t.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), r.left -= s || 0, r.top -= o || 0, r.left = r.left > 0 ? 0 : r.left < this.maxScrollX ? this.maxScrollX : r.left, r.top = r.top > 0 ? 0 : r.top < this.maxScrollY ? this.maxScrollY : r.top, i = void 0 === i || null === i || "auto" === i ? e.max(e.abs(this.x - r.left), e.abs(this.y - r.top)) : i, this.scrollTo(r.left, r.top, i, n)
                }
            },
            _transitionTime: function(t) {
                if (t = t || 0, this.scrollerStyle[a.style.transitionDuration] = t + "ms", !t && a.isBadAndroid && (this.scrollerStyle[a.style.transitionDuration] = "0.001s"),
                    this.indicators)
                    for (var i = this.indicators.length; i--;) this.indicators[i].transitionTime(t)
            },
            _transitionTimingFunction: function(t) {
                if (this.scrollerStyle[a.style.transitionTimingFunction] = t, this.indicators)
                    for (var i = this.indicators.length; i--;) this.indicators[i].transitionTimingFunction(t)
            },
            _translate: function(t, i) {
                if (this.options.useTransform ? this.scrollerStyle[a.style.transform] = "translate(" + t + "px," + i + "px)" + this.translateZ : (t = e.round(t), i = e.round(i), this.scrollerStyle.left = t + "px", this.scrollerStyle.top = i + "px"), this.x = t, this.y = i, this.indicators)
                    for (var s = this.indicators.length; s--;) this.indicators[s].updatePosition()
            },
            _initEvents: function(i) {
                var e = i ? a.removeEvent : a.addEvent,
                    s = this.options.bindToWrapper ? this.wrapper : t;
                e(t, "orientationchange", this), e(t, "resize", this), this.options.click && e(this.wrapper, "click", this, !0), this.options.disableMouse || (e(this.wrapper, "mousedown", this), e(s, "mousemove", this), e(s, "mousecancel", this), e(s, "mouseup", this)), a.hasPointer && !this.options.disablePointer && (e(this.wrapper, a.prefixPointerEvent("pointerdown"), this), e(s, a.prefixPointerEvent("pointermove"), this), e(s, a.prefixPointerEvent("pointercancel"), this), e(s, a.prefixPointerEvent("pointerup"), this)), a.hasTouch && !this.options.disableTouch && (e(this.wrapper, "touchstart", this), e(s, "touchmove", this), e(s, "touchcancel", this), e(s, "touchend", this)), e(this.scroller, "transitionend", this), e(this.scroller, "webkitTransitionEnd", this), e(this.scroller, "oTransitionEnd", this), e(this.scroller, "MSTransitionEnd", this)
            },
            getComputedPosition: function() {
                var i, e, s = t.getComputedStyle(this.scroller, null);
                return this.options.useTransform ? (s = s[a.style.transform].split(")")[0].split(", "), i = +(s[12] || s[4]), e = +(s[13] || s[5])) : (i = +s.left.replace(/[^-\d.]/g, ""), e = +s.top.replace(/[^-\d.]/g, "")), {
                    x: i,
                    y: e
                }
            },
            _initIndicators: function() {
                function t(t) {
                    for (var i = a.indicators.length; i--;) t.call(a.indicators[i])
                }
                var i, e = this.options.interactiveScrollbars,
                    s = "string" != typeof this.options.scrollbars,
                    r = [],
                    a = this;
                this.indicators = [], this.options.scrollbars && (this.options.scrollY && (i = {
                    el: o("v", e, this.options.scrollbars),
                    interactive: e,
                    defaultScrollbars: !0,
                    customStyle: s,
                    resize: this.options.resizeScrollbars,
                    shrink: this.options.shrinkScrollbars,
                    fade: this.options.fadeScrollbars,
                    listenX: !1
                }, this.wrapper.appendChild(i.el), r.push(i)), this.options.scrollX && (i = {
                    el: o("h", e, this.options.scrollbars),
                    interactive: e,
                    defaultScrollbars: !0,
                    customStyle: s,
                    resize: this.options.resizeScrollbars,
                    shrink: this.options.shrinkScrollbars,
                    fade: this.options.fadeScrollbars,
                    listenY: !1
                }, this.wrapper.appendChild(i.el), r.push(i))), this.options.indicators && (r = r.concat(this.options.indicators));
                for (var l = r.length; l--;) this.indicators.push(new n(this, r[l]));
                this.options.fadeScrollbars && (this.on("scrollEnd", function() {
                    t(function() {
                        this.fade()
                    })
                }), this.on("scrollCancel", function() {
                    t(function() {
                        this.fade()
                    })
                }), this.on("scrollStart", function() {
                    t(function() {
                        this.fade(1)
                    })
                }), this.on("beforeScrollStart", function() {
                    t(function() {
                        this.fade(1, !0)
                    })
                })), this.on("refresh", function() {
                    t(function() {
                        this.refresh()
                    })
                }), this.on("destroy", function() {
                    t(function() {
                        this.destroy()
                    }), delete this.indicators
                })
            },
            _initWheel: function() {
                a.addEvent(this.wrapper, "wheel", this), a.addEvent(this.wrapper, "mousewheel", this), a.addEvent(this.wrapper, "DOMMouseScroll", this), this.on("destroy", function() {
                    a.removeEvent(this.wrapper, "wheel", this), a.removeEvent(this.wrapper, "mousewheel", this), a.removeEvent(this.wrapper, "DOMMouseScroll", this)
                })
            },
            _wheel: function(t) {
                if (this.enabled) {
                    t.preventDefault(), t.stopPropagation();
                    var i, s, o, n, r = this;
                    if (void 0 === this.wheelTimeout && r._execEvent("scrollStart"), clearTimeout(this.wheelTimeout), this.wheelTimeout = setTimeout(function() {
                            r._execEvent("scrollEnd"), r.wheelTimeout = void 0
                        }, 400), "deltaX" in t) 1 === t.deltaMode ? (i = -t.deltaX * this.options.mouseWheelSpeed, s = -t.deltaY * this.options.mouseWheelSpeed) : (i = -t.deltaX, s = -t.deltaY);
                    else if ("wheelDeltaX" in t) i = t.wheelDeltaX / 120 * this.options.mouseWheelSpeed, s = t.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
                    else if ("wheelDelta" in t) i = s = t.wheelDelta / 120 * this.options.mouseWheelSpeed;
                    else {
                        if (!("detail" in t)) return;
                        i = s = -t.detail / 3 * this.options.mouseWheelSpeed
                    }
                    if (i *= this.options.invertWheelDirection, s *= this.options.invertWheelDirection, this.hasVerticalScroll || (i = s, s = 0), this.options.snap) return o = this.currentPage.pageX, n = this.currentPage.pageY, i > 0 ? o-- : i < 0 && o++, s > 0 ? n-- : s < 0 && n++, void this.goToPage(o, n);
                    o = this.x + e.round(this.hasHorizontalScroll ? i : 0), n = this.y + e.round(this.hasVerticalScroll ? s : 0), o > 0 ? o = 0 : o < this.maxScrollX && (o = this.maxScrollX), n > 0 ? n = 0 : n < this.maxScrollY && (n = this.maxScrollY), this.scrollTo(o, n, 0)
                }
            },
            _initSnap: function() {
                this.currentPage = {}, "string" == typeof this.options.snap && (this.options.snap = this.scroller.querySelectorAll(this.options.snap)), this.on("refresh", function() {
                    var t, i, s, o, n, r, a = 0,
                        l = 0,
                        h = 0,
                        c = this.options.snapStepX || this.wrapperWidth,
                        d = this.options.snapStepY || this.wrapperHeight;
                    if (this.pages = [], this.wrapperWidth && this.wrapperHeight && this.scrollerWidth && this.scrollerHeight) {
                        if (this.options.snap === !0)
                            for (s = e.round(c / 2), o = e.round(d / 2); h > -this.scrollerWidth;) {
                                for (this.pages[a] = [], t = 0, n = 0; n > -this.scrollerHeight;) this.pages[a][t] = {
                                    x: e.max(h, this.maxScrollX),
                                    y: e.max(n, this.maxScrollY),
                                    width: c,
                                    height: d,
                                    cx: h - s,
                                    cy: n - o
                                }, n -= d, t++;
                                h -= c, a++
                            } else
                                for (r = this.options.snap, t = r.length, i = -1; a < t; a++)(0 === a || r[a].offsetLeft <= r[a - 1].offsetLeft) && (l = 0, i++), this.pages[l] || (this.pages[l] = []), h = e.max(-r[a].offsetLeft, this.maxScrollX), n = e.max(-r[a].offsetTop, this.maxScrollY), s = h - e.round(r[a].offsetWidth / 2), o = n - e.round(r[a].offsetHeight / 2), this.pages[l][i] = {
                                    x: h,
                                    y: n,
                                    width: r[a].offsetWidth,
                                    height: r[a].offsetHeight,
                                    cx: s,
                                    cy: o
                                }, h > this.maxScrollX && l++;
                        this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0), this.options.snapThreshold % 1 === 0 ? (this.snapThresholdX = this.options.snapThreshold, this.snapThresholdY = this.options.snapThreshold) : (this.snapThresholdX = e.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold), this.snapThresholdY = e.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold))
                    }
                }), this.on("flick", function() {
                    var t = this.options.snapSpeed || e.max(e.max(e.min(e.abs(this.x - this.startX), 1e3), e.min(e.abs(this.y - this.startY), 1e3)), 300);
                    this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, t)
                })
            },
            _nearestSnap: function(t, i) {
                if (!this.pages.length) return {
                    x: 0,
                    y: 0,
                    pageX: 0,
                    pageY: 0
                };
                var s = 0,
                    o = this.pages.length,
                    n = 0;
                if (e.abs(t - this.absStartX) < this.snapThresholdX && e.abs(i - this.absStartY) < this.snapThresholdY) return this.currentPage;
                for (t > 0 ? t = 0 : t < this.maxScrollX && (t = this.maxScrollX), i > 0 ? i = 0 : i < this.maxScrollY && (i = this.maxScrollY); s < o; s++)
                    if (t >= this.pages[s][0].cx) {
                        t = this.pages[s][0].x;
                        break
                    }
                for (o = this.pages[s].length; n < o; n++)
                    if (i >= this.pages[0][n].cy) {
                        i = this.pages[0][n].y;
                        break
                    }
                return s == this.currentPage.pageX && (s += this.directionX, s < 0 ? s = 0 : s >= this.pages.length && (s = this.pages.length - 1), t = this.pages[s][0].x), n == this.currentPage.pageY && (n += this.directionY, n < 0 ? n = 0 : n >= this.pages[0].length && (n = this.pages[0].length - 1), i = this.pages[0][n].y), {
                    x: t,
                    y: i,
                    pageX: s,
                    pageY: n
                }
            },
            goToPage: function(t, i, s, o) {
                o = o || this.options.bounceEasing, t >= this.pages.length ? t = this.pages.length - 1 : t < 0 && (t = 0), i >= this.pages[t].length ? i = this.pages[t].length - 1 : i < 0 && (i = 0);
                var n = this.pages[t][i].x,
                    r = this.pages[t][i].y;
                s = void 0 === s ? this.options.snapSpeed || e.max(e.max(e.min(e.abs(n - this.x), 1e3), e.min(e.abs(r - this.y), 1e3)), 300) : s, this.currentPage = {
                    x: n,
                    y: r,
                    pageX: t,
                    pageY: i
                }, this.scrollTo(n, r, s, o)
            },
            next: function(t, i) {
                var e = this.currentPage.pageX,
                    s = this.currentPage.pageY;
                e++, e >= this.pages.length && this.hasVerticalScroll && (e = 0, s++), this.goToPage(e, s, t, i)
            },
            prev: function(t, i) {
                var e = this.currentPage.pageX,
                    s = this.currentPage.pageY;
                e--, e < 0 && this.hasVerticalScroll && (e = 0, s--), this.goToPage(e, s, t, i)
            },
            _initKeys: function(i) {
                var e, s = {
                    pageUp: 33,
                    pageDown: 34,
                    end: 35,
                    home: 36,
                    left: 37,
                    up: 38,
                    right: 39,
                    down: 40
                };
                if ("object" == typeof this.options.keyBindings)
                    for (e in this.options.keyBindings) "string" == typeof this.options.keyBindings[e] && (this.options.keyBindings[e] = this.options.keyBindings[e].toUpperCase().charCodeAt(0));
                else this.options.keyBindings = {};
                for (e in s) this.options.keyBindings[e] = this.options.keyBindings[e] || s[e];
                a.addEvent(t, "keydown", this), this.on("destroy", function() {
                    a.removeEvent(t, "keydown", this)
                })
            },
            _key: function(t) {
                if (this.enabled) {
                    var i, s = this.options.snap,
                        o = s ? this.currentPage.pageX : this.x,
                        n = s ? this.currentPage.pageY : this.y,
                        r = a.getTime(),
                        l = this.keyTime || 0,
                        h = .25;
                    switch (this.options.useTransition && this.isInTransition && (i = this.getComputedPosition(), this._translate(e.round(i.x), e.round(i.y)), this.isInTransition = !1), this.keyAcceleration = r - l < 200 ? e.min(this.keyAcceleration + h, 50) : 0, t.keyCode) {
                        case this.options.keyBindings.pageUp:
                            this.hasHorizontalScroll && !this.hasVerticalScroll ? o += s ? 1 : this.wrapperWidth : n += s ? 1 : this.wrapperHeight;
                            break;
                        case this.options.keyBindings.pageDown:
                            this.hasHorizontalScroll && !this.hasVerticalScroll ? o -= s ? 1 : this.wrapperWidth : n -= s ? 1 : this.wrapperHeight;
                            break;
                        case this.options.keyBindings.end:
                            o = s ? this.pages.length - 1 : this.maxScrollX, n = s ? this.pages[0].length - 1 : this.maxScrollY;
                            break;
                        case this.options.keyBindings.home:
                            o = 0, n = 0;
                            break;
                        case this.options.keyBindings.left:
                            o += s ? -1 : 5 + this.keyAcceleration >> 0;
                            break;
                        case this.options.keyBindings.up:
                            n += s ? 1 : 5 + this.keyAcceleration >> 0;
                            break;
                        case this.options.keyBindings.right:
                            o -= s ? -1 : 5 + this.keyAcceleration >> 0;
                            break;
                        case this.options.keyBindings.down:
                            n -= s ? 1 : 5 + this.keyAcceleration >> 0;
                            break;
                        default:
                            return
                    }
                    if (s) return void this.goToPage(o, n);
                    o > 0 ? (o = 0, this.keyAcceleration = 0) : o < this.maxScrollX && (o = this.maxScrollX, this.keyAcceleration = 0), n > 0 ? (n = 0, this.keyAcceleration = 0) : n < this.maxScrollY && (n = this.maxScrollY, this.keyAcceleration = 0), this.scrollTo(o, n, 0), this.keyTime = r
                }
            },
            _animate: function(t, i, e, s) {
                function o() {
                    var p, u, f, v = a.getTime();
                    return v >= d ? (n.isAnimating = !1, n._translate(t, i), void(n.resetPosition(n.options.bounceTime) || n._execEvent("scrollEnd"))) : (v = (v - c) / e, f = s(v), p = (t - l) * f + l, u = (i - h) * f + h, n._translate(p, u), void(n.isAnimating && r(o)))
                }
                var n = this,
                    l = this.x,
                    h = this.y,
                    c = a.getTime(),
                    d = c + e;
                this.isAnimating = !0, o()
            },
            handleEvent: function(t) {
                switch (t.type) {
                    case "touchstart":
                    case "pointerdown":
                    case "MSPointerDown":
                    case "mousedown":
                        this._start(t);
                        break;
                    case "touchmove":
                    case "pointermove":
                    case "MSPointerMove":
                    case "mousemove":
                        this._move(t);
                        break;
                    case "touchend":
                    case "pointerup":
                    case "MSPointerUp":
                    case "mouseup":
                    case "touchcancel":
                    case "pointercancel":
                    case "MSPointerCancel":
                    case "mousecancel":
                        this._end(t);
                        break;
                    case "orientationchange":
                    case "resize":
                        this._resize();
                        break;
                    case "transitionend":
                    case "webkitTransitionEnd":
                    case "oTransitionEnd":
                    case "MSTransitionEnd":
                        this._transitionEnd(t);
                        break;
                    case "wheel":
                    case "DOMMouseScroll":
                    case "mousewheel":
                        this._wheel(t);
                        break;
                    case "keydown":
                        this._key(t);
                        break;
                    case "click":
                        t._constructed || (t.preventDefault(), t.stopPropagation())
                }
            }
        }, n.prototype = {
            handleEvent: function(t) {
                switch (t.type) {
                    case "touchstart":
                    case "pointerdown":
                    case "MSPointerDown":
                    case "mousedown":
                        this._start(t);
                        break;
                    case "touchmove":
                    case "pointermove":
                    case "MSPointerMove":
                    case "mousemove":
                        this._move(t);
                        break;
                    case "touchend":
                    case "pointerup":
                    case "MSPointerUp":
                    case "mouseup":
                    case "touchcancel":
                    case "pointercancel":
                    case "MSPointerCancel":
                    case "mousecancel":
                        this._end(t)
                }
            },
            destroy: function() {
                this.options.interactive && (a.removeEvent(this.indicator, "touchstart", this), a.removeEvent(this.indicator, a.prefixPointerEvent("pointerdown"), this), a.removeEvent(this.indicator, "mousedown", this), a.removeEvent(t, "touchmove", this), a.removeEvent(t, a.prefixPointerEvent("pointermove"), this), a.removeEvent(t, "mousemove", this), a.removeEvent(t, "touchend", this), a.removeEvent(t, a.prefixPointerEvent("pointerup"), this), a.removeEvent(t, "mouseup", this)), this.options.defaultScrollbars && this.wrapper.parentNode.removeChild(this.wrapper)
            },
            _start: function(i) {
                var e = i.touches ? i.touches[0] : i;
                i.preventDefault(), i.stopPropagation(), this.transitionTime(), this.initiated = !0, this.moved = !1, this.lastPointX = e.pageX, this.lastPointY = e.pageY, this.startTime = a.getTime(), this.options.disableTouch || a.addEvent(t, "touchmove", this), this.options.disablePointer || a.addEvent(t, a.prefixPointerEvent("pointermove"), this), this.options.disableMouse || a.addEvent(t, "mousemove", this), this.scroller._execEvent("beforeScrollStart")
            },
            _move: function(t) {
                var i, e, s, o, n = t.touches ? t.touches[0] : t;
                a.getTime(), this.moved || this.scroller._execEvent("scrollStart"), this.moved = !0, i = n.pageX - this.lastPointX, this.lastPointX = n.pageX, e = n.pageY - this.lastPointY, this.lastPointY = n.pageY, s = this.x + i, o = this.y + e, this._pos(s, o), t.preventDefault(), t.stopPropagation()
            },
            _end: function(i) {
                if (this.initiated) {
                    if (this.initiated = !1, i.preventDefault(), i.stopPropagation(), a.removeEvent(t, "touchmove", this), a.removeEvent(t, a.prefixPointerEvent("pointermove"), this), a.removeEvent(t, "mousemove", this), this.scroller.options.snap) {
                        var s = this.scroller._nearestSnap(this.scroller.x, this.scroller.y),
                            o = this.options.snapSpeed || e.max(e.max(e.min(e.abs(this.scroller.x - s.x), 1e3), e.min(e.abs(this.scroller.y - s.y), 1e3)), 300);
                        this.scroller.x == s.x && this.scroller.y == s.y || (this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = s, this.scroller.scrollTo(s.x, s.y, o, this.scroller.options.bounceEasing))
                    }
                    this.moved && this.scroller._execEvent("scrollEnd")
                }
            },
            transitionTime: function(t) {
                t = t || 0, this.indicatorStyle[a.style.transitionDuration] = t + "ms", !t && a.isBadAndroid && (this.indicatorStyle[a.style.transitionDuration] = "0.001s")
            },
            transitionTimingFunction: function(t) {
                this.indicatorStyle[a.style.transitionTimingFunction] = t
            },
            refresh: function() {
                this.transitionTime(), this.options.listenX && !this.options.listenY ? this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.indicatorStyle.display = this.scroller.hasVerticalScroll ? "block" : "none" : this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none", this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ? (a.addClass(this.wrapper, "iScrollBothScrollbars"), a.removeClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "8px" : this.wrapper.style.bottom = "8px")) : (a.removeClass(this.wrapper, "iScrollBothScrollbars"), a.addClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "2px" : this.wrapper.style.bottom = "2px")), this.wrapper.offsetHeight, this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth, this.options.resize ? (this.indicatorWidth = e.max(e.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px") : this.indicatorWidth = this.indicator.clientWidth, this.maxPosX = this.wrapperWidth - this.indicatorWidth, "clip" == this.options.shrink ? (this.minBoundaryX = -this.indicatorWidth + 8, this.maxBoundaryX = this.wrapperWidth - 8) : (this.minBoundaryX = 0, this.maxBoundaryX = this.maxPosX), this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX), this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight, this.options.resize ? (this.indicatorHeight = e.max(e.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px") : this.indicatorHeight = this.indicator.clientHeight, this.maxPosY = this.wrapperHeight - this.indicatorHeight, "clip" == this.options.shrink ? (this.minBoundaryY = -this.indicatorHeight + 8, this.maxBoundaryY = this.wrapperHeight - 8) : (this.minBoundaryY = 0, this.maxBoundaryY = this.maxPosY), this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY), this.updatePosition()
            },
            updatePosition: function() {
                var t = this.options.listenX && e.round(this.sizeRatioX * this.scroller.x) || 0,
                    i = this.options.listenY && e.round(this.sizeRatioY * this.scroller.y) || 0;
                this.options.ignoreBoundaries || (t < this.minBoundaryX ? ("scale" == this.options.shrink && (this.width = e.max(this.indicatorWidth + t, 8), this.indicatorStyle.width = this.width + "px"), t = this.minBoundaryX) : t > this.maxBoundaryX ? "scale" == this.options.shrink ? (this.width = e.max(this.indicatorWidth - (t - this.maxPosX), 8), this.indicatorStyle.width = this.width + "px", t = this.maxPosX + this.indicatorWidth - this.width) : t = this.maxBoundaryX : "scale" == this.options.shrink && this.width != this.indicatorWidth && (this.width = this.indicatorWidth, this.indicatorStyle.width = this.width + "px"), i < this.minBoundaryY ? ("scale" == this.options.shrink && (this.height = e.max(this.indicatorHeight + 3 * i, 8), this.indicatorStyle.height = this.height + "px"), i = this.minBoundaryY) : i > this.maxBoundaryY ? "scale" == this.options.shrink ? (this.height = e.max(this.indicatorHeight - 3 * (i - this.maxPosY), 8), this.indicatorStyle.height = this.height + "px", i = this.maxPosY + this.indicatorHeight - this.height) : i = this.maxBoundaryY : "scale" == this.options.shrink && this.height != this.indicatorHeight && (this.height = this.indicatorHeight, this.indicatorStyle.height = this.height + "px")), this.x = t, this.y = i, this.scroller.options.useTransform ? this.indicatorStyle[a.style.transform] = "translate(" + t + "px," + i + "px)" + this.scroller.translateZ : (this.indicatorStyle.left = t + "px", this.indicatorStyle.top = i + "px")
            },
            _pos: function(t, i) {
                t < 0 ? t = 0 : t > this.maxPosX && (t = this.maxPosX), i < 0 ? i = 0 : i > this.maxPosY && (i = this.maxPosY), t = this.options.listenX ? e.round(t / this.sizeRatioX) : this.scroller.x, i = this.options.listenY ? e.round(i / this.sizeRatioY) : this.scroller.y, this.scroller.scrollTo(t, i)
            },
            fade: function(t, i) {
                if (!i || this.visible) {
                    clearTimeout(this.fadeTimeout), this.fadeTimeout = null;
                    var e = t ? 250 : 500,
                        s = t ? 0 : 300;
                    t = t ? "1" : "0", this.wrapperStyle[a.style.transitionDuration] = e + "ms", this.fadeTimeout = setTimeout(function(t) {
                        this.wrapperStyle.opacity = t, this.visible = +t
                    }.bind(this, t), s)
                }
            }
        }, s.utils = a, "undefined" != typeof module && module.exports ? module.exports = s : t.IScroll = s
    }(window, document, Math), function(t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery)
    }(function(t) {
        "use strict";

        function i(i) {
            return !i.nodeName || -1 !== t.inArray(i.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"])
        }

        function e(i) {
            return t.isFunction(i) || t.isPlainObject(i) ? i : {
                top: i,
                left: i
            }
        }
        var s = t.scrollTo = function(i, e, s) {
            return t(window).scrollTo(i, e, s)
        };
        return s.defaults = {
            axis: "xy",
            duration: 0,
            limit: !0
        }, t.fn.scrollTo = function(o, n, r) {
            "object" == typeof n && (r = n, n = 0), "function" == typeof r && (r = {
                onAfter: r
            }), "max" === o && (o = 9e9), r = t.extend({}, s.defaults, r), n = n || r.duration;
            var a = r.queue && 1 < r.axis.length;
            return a && (n /= 2), r.offset = e(r.offset), r.over = e(r.over), this.each(function() {
                function l(i) {
                    var e = t.extend({}, r, {
                        queue: !0,
                        duration: n,
                        complete: i && function() {
                            i.call(d, u, r)
                        }
                    });
                    p.animate(f, e)
                }
                if (null !== o) {
                    var h, c = i(this),
                        d = c ? this.contentWindow || window : this,
                        p = t(d),
                        u = o,
                        f = {};
                    switch (typeof u) {
                        case "number":
                        case "string":
                            if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(u)) {
                                u = e(u);
                                break
                            }
                            u = c ? t(u) : t(u, d);
                        case "object":
                            if (0 === u.length) return;
                            (u.is || u.style) && (h = (u = t(u)).offset())
                    }
                    var v = t.isFunction(r.offset) && r.offset(d, u) || r.offset;
                    t.each(r.axis.split(""), function(t, i) {
                        var e = "x" === i ? "Left" : "Top",
                            o = e.toLowerCase(),
                            n = "scroll" + e,
                            g = p[n](),
                            m = s.max(d, i);
                        h ? (f[n] = h[o] + (c ? 0 : g - p.offset()[o]), r.margin && (f[n] -= parseInt(u.css("margin" + e), 10) || 0, f[n] -= parseInt(u.css("border" + e + "Width"), 10) || 0), f[n] += v[o] || 0, r.over[o] && (f[n] += u["x" === i ? "width" : "height"]() * r.over[o])) : (e = u[o], f[n] = e.slice && "%" === e.slice(-1) ? parseFloat(e) / 100 * m : e), r.limit && /^\d+$/.test(f[n]) && (f[n] = 0 >= f[n] ? 0 : Math.min(f[n], m)), !t && 1 < r.axis.length && (g === f[n] ? f = {} : a && (l(r.onAfterFirst), f = {}))
                    }), l(r.onAfter)
                }
            })
        }, s.max = function(e, s) {
            var o = "x" === s ? "Width" : "Height",
                n = "scroll" + o;
            if (!i(e)) return e[n] - t(e)[o.toLowerCase()]();
            var o = "client" + o,
                r = e.ownerDocument || e.document,
                a = r.documentElement,
                r = r.body;
            return Math.max(a[n], r[n]) - Math.min(a[o], r[o])
        }, t.Tween.propHooks.scrollLeft = t.Tween.propHooks.scrollTop = {
            get: function(i) {
                return t(i.elem)[i.prop]()
            },
            set: function(i) {
                var e = this.get(i);
                if (i.options.interrupt && i._last && i._last !== e) return t(i.elem).stop();
                var s = Math.round(i.now);
                e !== s && (t(i.elem)[i.prop](s), i._last = this.get(i))
            }
        }, s
    }), ! function(t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
    }(function(t) {
        "use strict";
        var i = window.Slick || {};
        i = function() {
            function i(i, s) {
                var o, n = this;
                n.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: t(i),
                    appendDots: t(i),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                    nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    centerMode: !1,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function(t, i) {
                        return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (i + 1) + "</button>"
                    },
                    dots: !1,
                    dotsClass: "slick-dots",
                    draggable: !0,
                    easing: "linear",
                    edgeFriction: .35,
                    fade: !1,
                    focusOnSelect: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    mobileFirst: !1,
                    pauseOnHover: !0,
                    pauseOnDotsHover: !1,
                    respondTo: "window",
                    responsive: null,
                    rows: 1,
                    rtl: !1,
                    slide: "",
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: !0,
                    swipeToSlide: !1,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    variableWidth: !1,
                    vertical: !1,
                    verticalSwiping: !1,
                    waitForAnimate: !0,
                    zIndex: 1e3
                }, n.initials = {
                    animating: !1,
                    dragging: !1,
                    autoPlayTimer: null,
                    currentDirection: 0,
                    currentLeft: null,
                    currentSlide: 0,
                    direction: 1,
                    $dots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    $nextArrow: null,
                    $prevArrow: null,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: !1,
                    unslicked: !1
                }, t.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.hidden = "hidden", n.paused = !1, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = t(i), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, o = t(i).data("slick") || {}, n.options = t.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, "undefined" != typeof document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = t.proxy(n.autoPlay, n), n.autoPlayClear = t.proxy(n.autoPlayClear, n), n.changeSlide = t.proxy(n.changeSlide, n), n.clickHandler = t.proxy(n.clickHandler, n), n.selectHandler = t.proxy(n.selectHandler, n), n.setPosition = t.proxy(n.setPosition, n), n.swipeHandler = t.proxy(n.swipeHandler, n), n.dragHandler = t.proxy(n.dragHandler, n), n.keyHandler = t.proxy(n.keyHandler, n), n.autoPlayIterator = t.proxy(n.autoPlayIterator, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0), n.checkResponsive(!0)
            }
            var e = 0;
            return i
        }(), i.prototype.addSlide = i.prototype.slickAdd = function(i, e, s) {
            var o = this;
            if ("boolean" == typeof e) s = e, e = null;
            else if (0 > e || e >= o.slideCount) return !1;
            o.unload(), "number" == typeof e ? 0 === e && 0 === o.$slides.length ? t(i).appendTo(o.$slideTrack) : s ? t(i).insertBefore(o.$slides.eq(e)) : t(i).insertAfter(o.$slides.eq(e)) : s === !0 ? t(i).prependTo(o.$slideTrack) : t(i).appendTo(o.$slideTrack), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slides.each(function(i, e) {
                t(e).attr("data-slick-index", i)
            }), o.$slidesCache = o.$slides, o.reinit()
        }, i.prototype.animateHeight = function() {
            var t = this;
            if (1 === t.options.slidesToShow && t.options.adaptiveHeight === !0 && t.options.vertical === !1) {
                var i = t.$slides.eq(t.currentSlide).outerHeight(!0);
                t.$list.animate({
                    height: i
                }, t.options.speed)
            }
        }, i.prototype.animateSlide = function(i, e) {
            var s = {},
                o = this;
            o.animateHeight(), o.options.rtl === !0 && o.options.vertical === !1 && (i = -i), o.transformsEnabled === !1 ? o.options.vertical === !1 ? o.$slideTrack.animate({
                left: i
            }, o.options.speed, o.options.easing, e) : o.$slideTrack.animate({
                top: i
            }, o.options.speed, o.options.easing, e) : o.cssTransitions === !1 ? (o.options.rtl === !0 && (o.currentLeft = -o.currentLeft), t({
                animStart: o.currentLeft
            }).animate({
                animStart: i
            }, {
                duration: o.options.speed,
                easing: o.options.easing,
                step: function(t) {
                    t = Math.ceil(t), o.options.vertical === !1 ? (s[o.animType] = "translate(" + t + "px, 0px)", o.$slideTrack.css(s)) : (s[o.animType] = "translate(0px," + t + "px)", o.$slideTrack.css(s))
                },
                complete: function() {
                    e && e.call()
                }
            })) : (o.applyTransition(), i = Math.ceil(i), s[o.animType] = o.options.vertical === !1 ? "translate3d(" + i + "px, 0px, 0px)" : "translate3d(0px," + i + "px, 0px)", o.$slideTrack.css(s), e && setTimeout(function() {
                o.disableTransition(), e.call()
            }, o.options.speed))
        }, i.prototype.asNavFor = function(i) {
            var e = this,
                s = e.options.asNavFor;
            s && null !== s && (s = t(s).not(e.$slider)), null !== s && "object" == typeof s && s.each(function() {
                var e = t(this).slick("getSlick");
                e.unslicked || e.slideHandler(i, !0)
            })
        }, i.prototype.applyTransition = function(t) {
            var i = this,
                e = {};
            e[i.transitionType] = i.options.fade === !1 ? i.transformType + " " + i.options.speed + "ms " + i.options.cssEase : "opacity " + i.options.speed + "ms " + i.options.cssEase, i.options.fade === !1 ? i.$slideTrack.css(e) : i.$slides.eq(t).css(e)
        }, i.prototype.autoPlay = function() {
            var t = this;
            t.autoPlayTimer && clearInterval(t.autoPlayTimer), t.slideCount > t.options.slidesToShow && t.paused !== !0 && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed))
        }, i.prototype.autoPlayClear = function() {
            var t = this;
            t.autoPlayTimer && clearInterval(t.autoPlayTimer)
        }, i.prototype.autoPlayIterator = function() {
            var t = this;
            t.options.infinite === !1 ? 1 === t.direction ? (t.currentSlide + 1 === t.slideCount - 1 && (t.direction = 0), t.slideHandler(t.currentSlide + t.options.slidesToScroll)) : (0 === t.currentSlide - 1 && (t.direction = 1), t.slideHandler(t.currentSlide - t.options.slidesToScroll)) : t.slideHandler(t.currentSlide + t.options.slidesToScroll)
        }, i.prototype.buildArrows = function() {
            var i = this;
            i.options.arrows === !0 && (i.$prevArrow = t(i.options.prevArrow).addClass("slick-arrow"), i.$nextArrow = t(i.options.nextArrow).addClass("slick-arrow"), i.slideCount > i.options.slidesToShow ? (i.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), i.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.prependTo(i.options.appendArrows), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.appendTo(i.options.appendArrows), i.options.infinite !== !0 && i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : i.$prevArrow.add(i.$nextArrow).addClass("slick-hidden").attr({
                "aria-disabled": "true",
                tabindex: "-1"
            }))
        }, i.prototype.buildDots = function() {
            var i, e, s = this;
            if (s.options.dots === !0 && s.slideCount > s.options.slidesToShow) {
                for (e = '<ul class="' + s.options.dotsClass + '">', i = 0; i <= s.getDotCount(); i += 1) e += "<li>" + s.options.customPaging.call(this, s, i) + "</li>";
                e += "</ul>", s.$dots = t(e).appendTo(s.options.appendDots), s.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
            }
        }, i.prototype.buildOut = function() {
            var i = this;
            i.$slides = i.$slider.children(i.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), i.slideCount = i.$slides.length, i.$slides.each(function(i, e) {
                t(e).attr("data-slick-index", i).data("originalStyling", t(e).attr("style") || "")
            }), i.$slidesCache = i.$slides, i.$slider.addClass("slick-slider"), i.$slideTrack = 0 === i.slideCount ? t('<div class="slick-track"/>').appendTo(i.$slider) : i.$slides.wrapAll('<div class="slick-track"/>').parent(), i.$list = i.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), i.$slideTrack.css("opacity", 0), (i.options.centerMode === !0 || i.options.swipeToSlide === !0) && (i.options.slidesToScroll = 1), t("img[data-lazy]", i.$slider).not("[src]").addClass("slick-loading"), i.setupInfinite(), i.buildArrows(), i.buildDots(), i.updateDots(), i.setSlideClasses("number" == typeof i.currentSlide ? i.currentSlide : 0), i.options.draggable === !0 && i.$list.addClass("draggable")
        }, i.prototype.buildRows = function() {
            var t, i, e, s, o, n, r, a = this;
            if (s = document.createDocumentFragment(), n = a.$slider.children(), a.options.rows > 1) {
                for (r = a.options.slidesPerRow * a.options.rows, o = Math.ceil(n.length / r), t = 0; o > t; t++) {
                    var l = document.createElement("div");
                    for (i = 0; i < a.options.rows; i++) {
                        var h = document.createElement("div");
                        for (e = 0; e < a.options.slidesPerRow; e++) {
                            var c = t * r + (i * a.options.slidesPerRow + e);
                            n.get(c) && h.appendChild(n.get(c))
                        }
                        l.appendChild(h)
                    }
                    s.appendChild(l)
                }
                a.$slider.html(s), a.$slider.children().children().children().css({
                    width: 100 / a.options.slidesPerRow + "%",
                    display: "inline-block"
                })
            }
        }, i.prototype.checkResponsive = function(i, e) {
            var s, o, n, r = this,
                a = !1,
                l = r.$slider.width(),
                h = window.innerWidth || t(window).width();
            if ("window" === r.respondTo ? n = h : "slider" === r.respondTo ? n = l : "min" === r.respondTo && (n = Math.min(h, l)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
                o = null;
                for (s in r.breakpoints) r.breakpoints.hasOwnProperty(s) && (r.originalSettings.mobileFirst === !1 ? n < r.breakpoints[s] && (o = r.breakpoints[s]) : n > r.breakpoints[s] && (o = r.breakpoints[s]));
                null !== o ? null !== r.activeBreakpoint ? (o !== r.activeBreakpoint || e) && (r.activeBreakpoint = o, "unslick" === r.breakpointSettings[o] ? r.unslick(o) : (r.options = t.extend({}, r.originalSettings, r.breakpointSettings[o]), i === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(i)), a = o) : (r.activeBreakpoint = o, "unslick" === r.breakpointSettings[o] ? r.unslick(o) : (r.options = t.extend({}, r.originalSettings, r.breakpointSettings[o]), i === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(i)), a = o) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, i === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(i), a = o), i || a === !1 || r.$slider.trigger("breakpoint", [r, a])
            }
        }, i.prototype.changeSlide = function(i, e) {
            var s, o, n, r = this,
                a = t(i.target);
            switch (a.is("a") && i.preventDefault(), a.is("li") || (a = a.closest("li")), n = 0 !== r.slideCount % r.options.slidesToScroll, s = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, i.data.message) {
                case "previous":
                    o = 0 === s ? r.options.slidesToScroll : r.options.slidesToShow - s, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - o, !1, e);
                    break;
                case "next":
                    o = 0 === s ? r.options.slidesToScroll : s, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + o, !1, e);
                    break;
                case "index":
                    var l = 0 === i.data.index ? 0 : i.data.index || a.index() * r.options.slidesToScroll;
                    r.slideHandler(r.checkNavigable(l), !1, e), a.children().trigger("focus");
                    break;
                default:
                    return
            }
        }, i.prototype.checkNavigable = function(t) {
            var i, e, s = this;
            if (i = s.getNavigableIndexes(), e = 0, t > i[i.length - 1]) t = i[i.length - 1];
            else
                for (var o in i) {
                    if (t < i[o]) {
                        t = e;
                        break
                    }
                    e = i[o]
                }
            return t
        }, i.prototype.cleanUpEvents = function() {
            var i = this;
            i.options.dots && null !== i.$dots && (t("li", i.$dots).off("click.slick", i.changeSlide), i.options.pauseOnDotsHover === !0 && i.options.autoplay === !0 && t("li", i.$dots).off("mouseenter.slick", t.proxy(i.setPaused, i, !0)).off("mouseleave.slick", t.proxy(i.setPaused, i, !1))), i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow && i.$prevArrow.off("click.slick", i.changeSlide), i.$nextArrow && i.$nextArrow.off("click.slick", i.changeSlide)), i.$list.off("touchstart.slick mousedown.slick", i.swipeHandler), i.$list.off("touchmove.slick mousemove.slick", i.swipeHandler), i.$list.off("touchend.slick mouseup.slick", i.swipeHandler), i.$list.off("touchcancel.slick mouseleave.slick", i.swipeHandler), i.$list.off("click.slick", i.clickHandler), t(document).off(i.visibilityChange, i.visibility), i.$list.off("mouseenter.slick", t.proxy(i.setPaused, i, !0)), i.$list.off("mouseleave.slick", t.proxy(i.setPaused, i, !1)), i.options.accessibility === !0 && i.$list.off("keydown.slick", i.keyHandler), i.options.focusOnSelect === !0 && t(i.$slideTrack).children().off("click.slick", i.selectHandler), t(window).off("orientationchange.slick.slick-" + i.instanceUid, i.orientationChange), t(window).off("resize.slick.slick-" + i.instanceUid, i.resize), t("[draggable!=true]", i.$slideTrack).off("dragstart", i.preventDefault),
                t(window).off("load.slick.slick-" + i.instanceUid, i.setPosition), t(document).off("ready.slick.slick-" + i.instanceUid, i.setPosition)
        }, i.prototype.cleanUpRows = function() {
            var t, i = this;
            i.options.rows > 1 && (t = i.$slides.children().children(), t.removeAttr("style"), i.$slider.html(t))
        }, i.prototype.clickHandler = function(t) {
            var i = this;
            i.shouldClick === !1 && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault())
        }, i.prototype.destroy = function(i) {
            var e = this;
            e.autoPlayClear(), e.touchObject = {}, e.cleanUpEvents(), t(".slick-cloned", e.$slider).detach(), e.$dots && e.$dots.remove(), e.options.arrows === !0 && (e.$prevArrow && e.$prevArrow.length && (e.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove()), e.$nextArrow && e.$nextArrow.length && (e.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove())), e.$slides && (e.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
                t(this).attr("style", t(this).data("originalStyling"))
            }), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.detach(), e.$list.detach(), e.$slider.append(e.$slides)), e.cleanUpRows(), e.$slider.removeClass("slick-slider"), e.$slider.removeClass("slick-initialized"), e.unslicked = !0, i || e.$slider.trigger("destroy", [e])
        }, i.prototype.disableTransition = function(t) {
            var i = this,
                e = {};
            e[i.transitionType] = "", i.options.fade === !1 ? i.$slideTrack.css(e) : i.$slides.eq(t).css(e)
        }, i.prototype.fadeSlide = function(t, i) {
            var e = this;
            e.cssTransitions === !1 ? (e.$slides.eq(t).css({
                zIndex: e.options.zIndex
            }), e.$slides.eq(t).animate({
                opacity: 1
            }, e.options.speed, e.options.easing, i)) : (e.applyTransition(t), e.$slides.eq(t).css({
                opacity: 1,
                zIndex: e.options.zIndex
            }), i && setTimeout(function() {
                e.disableTransition(t), i.call()
            }, e.options.speed))
        }, i.prototype.fadeSlideOut = function(t) {
            var i = this;
            i.cssTransitions === !1 ? i.$slides.eq(t).animate({
                opacity: 0,
                zIndex: i.options.zIndex - 2
            }, i.options.speed, i.options.easing) : (i.applyTransition(t), i.$slides.eq(t).css({
                opacity: 0,
                zIndex: i.options.zIndex - 2
            }))
        }, i.prototype.filterSlides = i.prototype.slickFilter = function(t) {
            var i = this;
            null !== t && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.filter(t).appendTo(i.$slideTrack), i.reinit())
        }, i.prototype.getCurrent = i.prototype.slickCurrentSlide = function() {
            var t = this;
            return t.currentSlide
        }, i.prototype.getDotCount = function() {
            var t = this,
                i = 0,
                e = 0,
                s = 0;
            if (t.options.infinite === !0)
                for (; i < t.slideCount;) ++s, i = e + t.options.slidesToShow, e += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
            else if (t.options.centerMode === !0) s = t.slideCount;
            else
                for (; i < t.slideCount;) ++s, i = e + t.options.slidesToShow, e += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
            return s - 1
        }, i.prototype.getLeft = function(t) {
            var i, e, s, o = this,
                n = 0;
            return o.slideOffset = 0, e = o.$slides.first().outerHeight(!0), o.options.infinite === !0 ? (o.slideCount > o.options.slidesToShow && (o.slideOffset = -1 * o.slideWidth * o.options.slidesToShow, n = -1 * e * o.options.slidesToShow), 0 !== o.slideCount % o.options.slidesToScroll && t + o.options.slidesToScroll > o.slideCount && o.slideCount > o.options.slidesToShow && (t > o.slideCount ? (o.slideOffset = -1 * (o.options.slidesToShow - (t - o.slideCount)) * o.slideWidth, n = -1 * (o.options.slidesToShow - (t - o.slideCount)) * e) : (o.slideOffset = -1 * o.slideCount % o.options.slidesToScroll * o.slideWidth, n = -1 * o.slideCount % o.options.slidesToScroll * e))) : t + o.options.slidesToShow > o.slideCount && (o.slideOffset = (t + o.options.slidesToShow - o.slideCount) * o.slideWidth, n = (t + o.options.slidesToShow - o.slideCount) * e), o.slideCount <= o.options.slidesToShow && (o.slideOffset = 0, n = 0), o.options.centerMode === !0 && o.options.infinite === !0 ? o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2) - o.slideWidth : o.options.centerMode === !0 && (o.slideOffset = 0, o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2)), i = o.options.vertical === !1 ? -1 * t * o.slideWidth + o.slideOffset : -1 * t * e + n, o.options.variableWidth === !0 && (s = o.slideCount <= o.options.slidesToShow || o.options.infinite === !1 ? o.$slideTrack.children(".slick-slide").eq(t) : o.$slideTrack.children(".slick-slide").eq(t + o.options.slidesToShow), i = s[0] ? -1 * s[0].offsetLeft : 0, o.options.centerMode === !0 && (s = o.options.infinite === !1 ? o.$slideTrack.children(".slick-slide").eq(t) : o.$slideTrack.children(".slick-slide").eq(t + o.options.slidesToShow + 1), i = s[0] ? -1 * s[0].offsetLeft : 0, i += (o.$list.width() - s.outerWidth()) / 2)), i
        }, i.prototype.getOption = i.prototype.slickGetOption = function(t) {
            var i = this;
            return i.options[t]
        }, i.prototype.getNavigableIndexes = function() {
            var t, i = this,
                e = 0,
                s = 0,
                o = [];
            for (i.options.infinite === !1 ? t = i.slideCount : (e = -1 * i.options.slidesToScroll, s = -1 * i.options.slidesToScroll, t = 2 * i.slideCount); t > e;) o.push(e), e = s + i.options.slidesToScroll, s += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
            return o
        }, i.prototype.getSlick = function() {
            return this
        }, i.prototype.getSlideCount = function() {
            var i, e, s, o = this;
            return s = o.options.centerMode === !0 ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, o.options.swipeToSlide === !0 ? (o.$slideTrack.find(".slick-slide").each(function(i, n) {
                return n.offsetLeft - s + t(n).outerWidth() / 2 > -1 * o.swipeLeft ? (e = n, !1) : void 0
            }), i = Math.abs(t(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
        }, i.prototype.goTo = i.prototype.slickGoTo = function(t, i) {
            var e = this;
            e.changeSlide({
                data: {
                    message: "index",
                    index: parseInt(t)
                }
            }, i)
        }, i.prototype.init = function(i) {
            var e = this;
            t(e.$slider).hasClass("slick-initialized") || (t(e.$slider).addClass("slick-initialized"), e.buildRows(), e.buildOut(), e.setProps(), e.startLoad(), e.loadSlider(), e.initializeEvents(), e.updateArrows(), e.updateDots()), i && e.$slider.trigger("init", [e]), e.options.accessibility === !0 && e.initADA()
        }, i.prototype.initArrowEvents = function() {
            var t = this;
            t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.on("click.slick", {
                message: "previous"
            }, t.changeSlide), t.$nextArrow.on("click.slick", {
                message: "next"
            }, t.changeSlide))
        }, i.prototype.initDotEvents = function() {
            var i = this;
            i.options.dots === !0 && i.slideCount > i.options.slidesToShow && t("li", i.$dots).on("click.slick", {
                message: "index"
            }, i.changeSlide), i.options.dots === !0 && i.options.pauseOnDotsHover === !0 && i.options.autoplay === !0 && t("li", i.$dots).on("mouseenter.slick", t.proxy(i.setPaused, i, !0)).on("mouseleave.slick", t.proxy(i.setPaused, i, !1))
        }, i.prototype.initializeEvents = function() {
            var i = this;
            i.initArrowEvents(), i.initDotEvents(), i.$list.on("touchstart.slick mousedown.slick", {
                action: "start"
            }, i.swipeHandler), i.$list.on("touchmove.slick mousemove.slick", {
                action: "move"
            }, i.swipeHandler), i.$list.on("touchend.slick mouseup.slick", {
                action: "end"
            }, i.swipeHandler), i.$list.on("touchcancel.slick mouseleave.slick", {
                action: "end"
            }, i.swipeHandler), i.$list.on("click.slick", i.clickHandler), t(document).on(i.visibilityChange, t.proxy(i.visibility, i)), i.$list.on("mouseenter.slick", t.proxy(i.setPaused, i, !0)), i.$list.on("mouseleave.slick", t.proxy(i.setPaused, i, !1)), i.options.accessibility === !0 && i.$list.on("keydown.slick", i.keyHandler), i.options.focusOnSelect === !0 && t(i.$slideTrack).children().on("click.slick", i.selectHandler), t(window).on("orientationchange.slick.slick-" + i.instanceUid, t.proxy(i.orientationChange, i)), t(window).on("resize.slick.slick-" + i.instanceUid, t.proxy(i.resize, i)), t("[draggable!=true]", i.$slideTrack).on("dragstart", i.preventDefault), t(window).on("load.slick.slick-" + i.instanceUid, i.setPosition), t(document).on("ready.slick.slick-" + i.instanceUid, i.setPosition)
        }, i.prototype.initUI = function() {
            var t = this;
            t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.show(), t.options.autoplay === !0 && t.autoPlay()
        }, i.prototype.keyHandler = function(t) {
            var i = this;
            t.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === t.keyCode && i.options.accessibility === !0 ? i.changeSlide({
                data: {
                    message: "previous"
                }
            }) : 39 === t.keyCode && i.options.accessibility === !0 && i.changeSlide({
                data: {
                    message: "next"
                }
            }))
        }, i.prototype.lazyLoad = function() {
            function i(i) {
                t("img[data-lazy]", i).each(function() {
                    var i = t(this),
                        e = t(this).attr("data-lazy"),
                        s = document.createElement("img");
                    s.onload = function() {
                        i.animate({
                            opacity: 0
                        }, 100, function() {
                            i.attr("src", e).animate({
                                opacity: 1
                            }, 200, function() {
                                i.removeAttr("data-lazy").removeClass("slick-loading")
                            })
                        })
                    }, s.src = e
                })
            }
            var e, s, o, n, r = this;
            r.options.centerMode === !0 ? r.options.infinite === !0 ? (o = r.currentSlide + (r.options.slidesToShow / 2 + 1), n = o + r.options.slidesToShow + 2) : (o = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)), n = 2 + (r.options.slidesToShow / 2 + 1) + r.currentSlide) : (o = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide, n = o + r.options.slidesToShow, r.options.fade === !0 && (o > 0 && o--, n <= r.slideCount && n++)), e = r.$slider.find(".slick-slide").slice(o, n), i(e), r.slideCount <= r.options.slidesToShow ? (s = r.$slider.find(".slick-slide"), i(s)) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? (s = r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow), i(s)) : 0 === r.currentSlide && (s = r.$slider.find(".slick-cloned").slice(-1 * r.options.slidesToShow), i(s))
        }, i.prototype.loadSlider = function() {
            var t = this;
            t.setPosition(), t.$slideTrack.css({
                opacity: 1
            }), t.$slider.removeClass("slick-loading"), t.initUI(), "progressive" === t.options.lazyLoad && t.progressiveLazyLoad()
        }, i.prototype.next = i.prototype.slickNext = function() {
            var t = this;
            t.changeSlide({
                data: {
                    message: "next"
                }
            })
        }, i.prototype.orientationChange = function() {
            var t = this;
            t.checkResponsive(), t.setPosition()
        }, i.prototype.pause = i.prototype.slickPause = function() {
            var t = this;
            t.autoPlayClear(), t.paused = !0
        }, i.prototype.play = i.prototype.slickPlay = function() {
            var t = this;
            t.paused = !1, t.autoPlay()
        }, i.prototype.postSlide = function(t) {
            var i = this;
            i.$slider.trigger("afterChange", [i, t]), i.animating = !1, i.setPosition(), i.swipeLeft = null, i.options.autoplay === !0 && i.paused === !1 && i.autoPlay(), i.options.accessibility === !0 && i.initADA()
        }, i.prototype.prev = i.prototype.slickPrev = function() {
            var t = this;
            t.changeSlide({
                data: {
                    message: "previous"
                }
            })
        }, i.prototype.preventDefault = function(t) {
            t.preventDefault()
        }, i.prototype.progressiveLazyLoad = function() {
            var i, e, s = this;
            i = t("img[data-lazy]", s.$slider).length, i > 0 && (e = t("img[data-lazy]", s.$slider).first(), e.attr("src", e.attr("data-lazy")).removeClass("slick-loading").load(function() {
                e.removeAttr("data-lazy"), s.progressiveLazyLoad(), s.options.adaptiveHeight === !0 && s.setPosition()
            }).error(function() {
                e.removeAttr("data-lazy"), s.progressiveLazyLoad()
            }))
        }, i.prototype.refresh = function(i) {
            var e = this,
                s = e.currentSlide;
            e.destroy(!0), t.extend(e, e.initials, {
                currentSlide: s
            }), e.init(), i || e.changeSlide({
                data: {
                    message: "index",
                    index: s
                }
            }, !1)
        }, i.prototype.registerBreakpoints = function() {
            var i, e, s, o = this,
                n = o.options.responsive || null;
            if ("array" === t.type(n) && n.length) {
                o.respondTo = o.options.respondTo || "window";
                for (i in n)
                    if (s = o.breakpoints.length - 1, e = n[i].breakpoint, n.hasOwnProperty(i)) {
                        for (; s >= 0;) o.breakpoints[s] && o.breakpoints[s] === e && o.breakpoints.splice(s, 1), s--;
                        o.breakpoints.push(e), o.breakpointSettings[e] = n[i].settings
                    }
                o.breakpoints.sort(function(t, i) {
                    return o.options.mobileFirst ? t - i : i - t
                })
            }
        }, i.prototype.reinit = function() {
            var i = this;
            i.$slides = i.$slideTrack.children(i.options.slide).addClass("slick-slide"), i.slideCount = i.$slides.length, i.currentSlide >= i.slideCount && 0 !== i.currentSlide && (i.currentSlide = i.currentSlide - i.options.slidesToScroll), i.slideCount <= i.options.slidesToShow && (i.currentSlide = 0), i.registerBreakpoints(), i.setProps(), i.setupInfinite(), i.buildArrows(), i.updateArrows(), i.initArrowEvents(), i.buildDots(), i.updateDots(), i.initDotEvents(), i.checkResponsive(!1, !0), i.options.focusOnSelect === !0 && t(i.$slideTrack).children().on("click.slick", i.selectHandler), i.setSlideClasses(0), i.setPosition(), i.$slider.trigger("reInit", [i]), i.options.autoplay === !0 && i.focusHandler()
        }, i.prototype.resize = function() {
            var i = this;
            t(window).width() !== i.windowWidth && (clearTimeout(i.windowDelay), i.windowDelay = window.setTimeout(function() {
                i.windowWidth = t(window).width(), i.checkResponsive(), i.unslicked || i.setPosition()
            }, 50))
        }, i.prototype.removeSlide = i.prototype.slickRemove = function(t, i, e) {
            var s = this;
            return "boolean" == typeof t ? (i = t, t = i === !0 ? 0 : s.slideCount - 1) : t = i === !0 ? --t : t, !(s.slideCount < 1 || 0 > t || t > s.slideCount - 1) && (s.unload(), e === !0 ? s.$slideTrack.children().remove() : s.$slideTrack.children(this.options.slide).eq(t).remove(), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slidesCache = s.$slides, void s.reinit())
        }, i.prototype.setCSS = function(t) {
            var i, e, s = this,
                o = {};
            s.options.rtl === !0 && (t = -t), i = "left" == s.positionProp ? Math.ceil(t) + "px" : "0px", e = "top" == s.positionProp ? Math.ceil(t) + "px" : "0px", o[s.positionProp] = t, s.transformsEnabled === !1 ? s.$slideTrack.css(o) : (o = {}, s.cssTransitions === !1 ? (o[s.animType] = "translate(" + i + ", " + e + ")", s.$slideTrack.css(o)) : (o[s.animType] = "translate3d(" + i + ", " + e + ", 0px)", s.$slideTrack.css(o)))
        }, i.prototype.setDimensions = function() {
            var t = this;
            t.options.vertical === !1 ? t.options.centerMode === !0 && t.$list.css({
                padding: "0px " + t.options.centerPadding
            }) : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow), t.options.centerMode === !0 && t.$list.css({
                padding: t.options.centerPadding + " 0px"
            })), t.listWidth = t.$list.width(), t.listHeight = t.$list.height(), t.options.vertical === !1 && t.options.variableWidth === !1 ? (t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow), t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length))) : t.options.variableWidth === !0 ? t.$slideTrack.width(5e3 * t.slideCount) : (t.slideWidth = Math.ceil(t.listWidth), t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
            var i = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
            t.options.variableWidth === !1 && t.$slideTrack.children(".slick-slide").width(t.slideWidth - i)
        }, i.prototype.setFade = function() {
            var i, e = this;
            e.$slides.each(function(s, o) {
                i = -1 * e.slideWidth * s, e.options.rtl === !0 ? t(o).css({
                    position: "relative",
                    right: i,
                    top: 0,
                    zIndex: e.options.zIndex - 2,
                    opacity: 0
                }) : t(o).css({
                    position: "relative",
                    left: i,
                    top: 0,
                    zIndex: e.options.zIndex - 2,
                    opacity: 0
                })
            }), e.$slides.eq(e.currentSlide).css({
                zIndex: e.options.zIndex - 1,
                opacity: 1
            })
        }, i.prototype.setHeight = function() {
            var t = this;
            if (1 === t.options.slidesToShow && t.options.adaptiveHeight === !0 && t.options.vertical === !1) {
                var i = t.$slides.eq(t.currentSlide).outerHeight(!0);
                t.$list.css("height", i)
            }
        }, i.prototype.setOption = i.prototype.slickSetOption = function(i, e, s) {
            var o, n, r = this;
            if ("responsive" === i && "array" === t.type(e))
                for (n in e)
                    if ("array" !== t.type(r.options.responsive)) r.options.responsive = [e[n]];
                    else {
                        for (o = r.options.responsive.length - 1; o >= 0;) r.options.responsive[o].breakpoint === e[n].breakpoint && r.options.responsive.splice(o, 1), o--;
                        r.options.responsive.push(e[n])
                    } else r.options[i] = e;
            s === !0 && (r.unload(), r.reinit())
        }, i.prototype.setPosition = function() {
            var t = this;
            t.setDimensions(), t.setHeight(), t.options.fade === !1 ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), t.$slider.trigger("setPosition", [t])
        }, i.prototype.setProps = function() {
            var t = this,
                i = document.body.style;
            t.positionProp = t.options.vertical === !0 ? "top" : "left", "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"), (void 0 !== i.WebkitTransition || void 0 !== i.MozTransition || void 0 !== i.msTransition) && t.options.useCSS === !0 && (t.cssTransitions = !0), t.options.fade && ("number" == typeof t.options.zIndex ? t.options.zIndex < 3 && (t.options.zIndex = 3) : t.options.zIndex = t.defaults.zIndex), void 0 !== i.OTransform && (t.animType = "OTransform", t.transformType = "-o-transform", t.transitionType = "OTransition", void 0 === i.perspectiveProperty && void 0 === i.webkitPerspective && (t.animType = !1)), void 0 !== i.MozTransform && (t.animType = "MozTransform", t.transformType = "-moz-transform", t.transitionType = "MozTransition", void 0 === i.perspectiveProperty && void 0 === i.MozPerspective && (t.animType = !1)), void 0 !== i.webkitTransform && (t.animType = "webkitTransform", t.transformType = "-webkit-transform", t.transitionType = "webkitTransition", void 0 === i.perspectiveProperty && void 0 === i.webkitPerspective && (t.animType = !1)), void 0 !== i.msTransform && (t.animType = "msTransform", t.transformType = "-ms-transform", t.transitionType = "msTransition", void 0 === i.msTransform && (t.animType = !1)), void 0 !== i.transform && t.animType !== !1 && (t.animType = "transform", t.transformType = "transform", t.transitionType = "transition"), t.transformsEnabled = null !== t.animType && t.animType !== !1
        }, i.prototype.setSlideClasses = function(t) {
            var i, e, s, o, n = this;
            e = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(t).addClass("slick-current"), n.options.centerMode === !0 ? (i = Math.floor(n.options.slidesToShow / 2), n.options.infinite === !0 && (t >= i && t <= n.slideCount - 1 - i ? n.$slides.slice(t - i, t + i + 1).addClass("slick-active").attr("aria-hidden", "false") : (s = n.options.slidesToShow + t, e.slice(s - i + 1, s + i + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === t ? e.eq(e.length - 1 - n.options.slidesToShow).addClass("slick-center") : t === n.slideCount - 1 && e.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(t).addClass("slick-center")) : t >= 0 && t <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(t, t + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : e.length <= n.options.slidesToShow ? e.addClass("slick-active").attr("aria-hidden", "false") : (o = n.slideCount % n.options.slidesToShow, s = n.options.infinite === !0 ? n.options.slidesToShow + t : t, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - t < n.options.slidesToShow ? e.slice(s - (n.options.slidesToShow - o), s + o).addClass("slick-active").attr("aria-hidden", "false") : e.slice(s, s + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === n.options.lazyLoad && n.lazyLoad()
        }, i.prototype.setupInfinite = function() {
            var i, e, s, o = this;
            if (o.options.fade === !0 && (o.options.centerMode = !1), o.options.infinite === !0 && o.options.fade === !1 && (e = null, o.slideCount > o.options.slidesToShow)) {
                for (s = o.options.centerMode === !0 ? o.options.slidesToShow + 1 : o.options.slidesToShow, i = o.slideCount; i > o.slideCount - s; i -= 1) e = i - 1, t(o.$slides[e]).clone(!0).attr("id", "").attr("data-slick-index", e - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
                for (i = 0; s > i; i += 1) e = i, t(o.$slides[e]).clone(!0).attr("id", "").attr("data-slick-index", e + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
                o.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                    t(this).attr("id", "")
                })
            }
        }, i.prototype.setPaused = function(t) {
            var i = this;
            i.options.autoplay === !0 && i.options.pauseOnHover === !0 && (i.paused = t, t ? i.autoPlayClear() : i.autoPlay())
        }, i.prototype.selectHandler = function(i) {
            var e = this,
                s = t(i.target).is(".slick-slide") ? t(i.target) : t(i.target).parents(".slick-slide"),
                o = parseInt(s.attr("data-slick-index"));
            return o || (o = 0), e.slideCount <= e.options.slidesToShow ? (e.setSlideClasses(o), void e.asNavFor(o)) : void e.slideHandler(o)
        }, i.prototype.slideHandler = function(t, i, e) {
            var s, o, n, r, a = null,
                l = this;
            return i = i || !1, l.animating === !0 && l.options.waitForAnimate === !0 || l.options.fade === !0 && l.currentSlide === t || l.slideCount <= l.options.slidesToShow ? void 0 : (i === !1 && l.asNavFor(t), s = t, a = l.getLeft(s), r = l.getLeft(l.currentSlide), l.currentLeft = null === l.swipeLeft ? r : l.swipeLeft, l.options.infinite === !1 && l.options.centerMode === !1 && (0 > t || t > l.getDotCount() * l.options.slidesToScroll) ? void(l.options.fade === !1 && (s = l.currentSlide, e !== !0 ? l.animateSlide(r, function() {
                l.postSlide(s)
            }) : l.postSlide(s))) : l.options.infinite === !1 && l.options.centerMode === !0 && (0 > t || t > l.slideCount - l.options.slidesToScroll) ? void(l.options.fade === !1 && (s = l.currentSlide, e !== !0 ? l.animateSlide(r, function() {
                l.postSlide(s)
            }) : l.postSlide(s))) : (l.options.autoplay === !0 && clearInterval(l.autoPlayTimer), o = 0 > s ? 0 !== l.slideCount % l.options.slidesToScroll ? l.slideCount - l.slideCount % l.options.slidesToScroll : l.slideCount + s : s >= l.slideCount ? 0 !== l.slideCount % l.options.slidesToScroll ? 0 : s - l.slideCount : s, l.animating = !0, l.$slider.trigger("beforeChange", [l, l.currentSlide, o]), n = l.currentSlide, l.currentSlide = o, l.setSlideClasses(l.currentSlide), l.updateDots(), l.updateArrows(), l.options.fade === !0 ? (e !== !0 ? (l.fadeSlideOut(n), l.fadeSlide(o, function() {
                l.postSlide(o)
            })) : l.postSlide(o), void l.animateHeight()) : void(e !== !0 ? l.animateSlide(a, function() {
                l.postSlide(o)
            }) : l.postSlide(o))))
        }, i.prototype.startLoad = function() {
            var t = this;
            t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.hide(), t.$slider.addClass("slick-loading")
        }, i.prototype.swipeDirection = function() {
            var t, i, e, s, o = this;
            return t = o.touchObject.startX - o.touchObject.curX, i = o.touchObject.startY - o.touchObject.curY, e = Math.atan2(i, t), s = Math.round(180 * e / Math.PI), 0 > s && (s = 360 - Math.abs(s)), 45 >= s && s >= 0 ? o.options.rtl === !1 ? "left" : "right" : 360 >= s && s >= 315 ? o.options.rtl === !1 ? "left" : "right" : s >= 135 && 225 >= s ? o.options.rtl === !1 ? "right" : "left" : o.options.verticalSwiping === !0 ? s >= 35 && 135 >= s ? "left" : "right" : "vertical"
        }, i.prototype.swipeEnd = function() {
            var t, i = this;
            if (i.dragging = !1, i.shouldClick = !(i.touchObject.swipeLength > 10), void 0 === i.touchObject.curX) return !1;
            if (i.touchObject.edgeHit === !0 && i.$slider.trigger("edge", [i, i.swipeDirection()]), i.touchObject.swipeLength >= i.touchObject.minSwipe) switch (i.swipeDirection()) {
                case "left":
                    t = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide + i.getSlideCount()) : i.currentSlide + i.getSlideCount(), i.slideHandler(t), i.currentDirection = 0, i.touchObject = {}, i.$slider.trigger("swipe", [i, "left"]);
                    break;
                case "right":
                    t = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide - i.getSlideCount()) : i.currentSlide - i.getSlideCount(), i.slideHandler(t), i.currentDirection = 1, i.touchObject = {}, i.$slider.trigger("swipe", [i, "right"])
            } else i.touchObject.startX !== i.touchObject.curX && (i.slideHandler(i.currentSlide), i.touchObject = {})
        }, i.prototype.swipeHandler = function(t) {
            var i = this;
            if (!(i.options.swipe === !1 || "ontouchend" in document && i.options.swipe === !1 || i.options.draggable === !1 && -1 !== t.type.indexOf("mouse"))) switch (i.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1, i.touchObject.minSwipe = i.listWidth / i.options.touchThreshold, i.options.verticalSwiping === !0 && (i.touchObject.minSwipe = i.listHeight / i.options.touchThreshold), t.data.action) {
                case "start":
                    i.swipeStart(t);
                    break;
                case "move":
                    i.swipeMove(t);
                    break;
                case "end":
                    i.swipeEnd(t)
            }
        }, i.prototype.swipeMove = function(t) {
            var i, e, s, o, n, r = this;
            return n = void 0 !== t.originalEvent ? t.originalEvent.touches : null, !(!r.dragging || n && 1 !== n.length) && (i = r.getLeft(r.currentSlide), r.touchObject.curX = void 0 !== n ? n[0].pageX : t.clientX, r.touchObject.curY = void 0 !== n ? n[0].pageY : t.clientY, r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curX - r.touchObject.startX, 2))), r.options.verticalSwiping === !0 && (r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curY - r.touchObject.startY, 2)))), e = r.swipeDirection(), "vertical" !== e ? (void 0 !== t.originalEvent && r.touchObject.swipeLength > 4 && t.preventDefault(), o = (r.options.rtl === !1 ? 1 : -1) * (r.touchObject.curX > r.touchObject.startX ? 1 : -1), r.options.verticalSwiping === !0 && (o = r.touchObject.curY > r.touchObject.startY ? 1 : -1), s = r.touchObject.swipeLength, r.touchObject.edgeHit = !1, r.options.infinite === !1 && (0 === r.currentSlide && "right" === e || r.currentSlide >= r.getDotCount() && "left" === e) && (s = r.touchObject.swipeLength * r.options.edgeFriction, r.touchObject.edgeHit = !0), r.swipeLeft = r.options.vertical === !1 ? i + s * o : i + s * (r.$list.height() / r.listWidth) * o, r.options.verticalSwiping === !0 && (r.swipeLeft = i + s * o), r.options.fade !== !0 && r.options.touchMove !== !1 && (r.animating === !0 ? (r.swipeLeft = null, !1) : void r.setCSS(r.swipeLeft))) : void 0)
        }, i.prototype.swipeStart = function(t) {
            var i, e = this;
            return 1 !== e.touchObject.fingerCount || e.slideCount <= e.options.slidesToShow ? (e.touchObject = {}, !1) : (void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (i = t.originalEvent.touches[0]), e.touchObject.startX = e.touchObject.curX = void 0 !== i ? i.pageX : t.clientX, e.touchObject.startY = e.touchObject.curY = void 0 !== i ? i.pageY : t.clientY, void(e.dragging = !0))
        }, i.prototype.unfilterSlides = i.prototype.slickUnfilter = function() {
            var t = this;
            null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit())
        }, i.prototype.unload = function() {
            var i = this;
            t(".slick-cloned", i.$slider).remove(), i.$dots && i.$dots.remove(), i.$prevArrow && i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove(), i.$nextArrow && i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove(), i.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
        }, i.prototype.unslick = function(t) {
            var i = this;
            i.$slider.trigger("unslick", [i, t]), i.destroy()
        }, i.prototype.updateArrows = function() {
            var t, i = this;
            t = Math.floor(i.options.slidesToShow / 2), i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && i.options.centerMode === !1 ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && i.options.centerMode === !0 && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
        }, i.prototype.updateDots = function() {
            var t = this;
            null !== t.$dots && (t.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
        }, i.prototype.visibility = function() {
            var t = this;
            document[t.hidden] ? (t.paused = !0, t.autoPlayClear()) : t.options.autoplay === !0 && (t.paused = !1, t.autoPlay())
        }, i.prototype.initADA = function() {
            var i = this;
            i.$slides.add(i.$slideTrack.find(".slick-cloned")).attr({
                "aria-hidden": "true",
                tabindex: "-1"
            }).find("a, input, button, select").attr({
                tabindex: "-1"
            }), i.$slideTrack.attr("role", "listbox"), i.$slides.not(i.$slideTrack.find(".slick-cloned")).each(function(e) {
                t(this).attr({
                    role: "option",
                    "aria-describedby": "slick-slide" + i.instanceUid + e
                })
            }), null !== i.$dots && i.$dots.attr("role", "tablist").find("li").each(function(e) {
                t(this).attr({
                    role: "presentation",
                    "aria-selected": "false",
                    "aria-controls": "navigation" + i.instanceUid + e,
                    id: "slick-slide" + i.instanceUid + e
                })
            }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), i.activateADA()
        }, i.prototype.activateADA = function() {
            var t = this,
                i = t.$slider.find("*").is(":focus");
            t.$slideTrack.find(".slick-active").attr({
                "aria-hidden": "false",
                tabindex: "0"
            }).find("a, input, button, select").attr({
                tabindex: "0"
            }), i && t.$slideTrack.find(".slick-active").focus()
        }, i.prototype.focusHandler = function() {
            var i = this;
            i.$slider.on("focus.slick blur.slick", "*", function(e) {
                e.stopImmediatePropagation();
                var s = t(this);
                setTimeout(function() {
                    i.isPlay && (s.is(":focus") ? (i.autoPlayClear(), i.paused = !0) : (i.paused = !1, i.autoPlay()))
                }, 0)
            })
        }, t.fn.slick = function() {
            var t, e = this,
                s = arguments[0],
                o = Array.prototype.slice.call(arguments, 1),
                n = e.length,
                r = 0;
            for (r; n > r; r++)
                if ("object" == typeof s || "undefined" == typeof s ? e[r].slick = new i(e[r], s) : t = e[r].slick[s].apply(e[r].slick, o), "undefined" != typeof t) return t;
            return e
        }
    }), void 0 === wwctrials) var wwctrials = {};
if (wwctrials.tracking = function(t) {
        var i = {
            init: function() {
                this.eventTracking()
            },
            eventTracking: function() {
                t("._gt").on("click", function() {
                    var i = t(this),
                        e = i.data("category"),
                        s = i.data("action"),
                        o = i.data("label");
                    wwctrials.tracking.trackEvent(e, s, o)
                }), t(".library-gate-box .btn").on("click", function() {
                    wwctrials.tracking.trackEvent("Research Library", "Submit", "Gated Content Submit")
                }), t(".library-list").on("click", ".read-more", function() {
                    var i = t(this),
                        e = i.closest(".library-item").find(".library-title").text(),
                        s = e.split(" "),
                        o = "";
                    if (s.length <= 5) o = e + " ";
                    else
                        for (var n = 0; n < 5; n++) o += s[n] + " ";
                    o += "- Read More", wwctrials.tracking.trackEvent("Research Library", "Read More", o)
                }), t('.investigator-form input[type="submit"]').click(function() {
                    wwctrials.tracking.trackEvent("Investigator", "Submit", "Investigator Form-Submit")
                });
                var i = t(".footer");
                i.find(".fa-facebook").on("click", function() {
                    wwctrials.tracking.trackEvent("Social Links", "Click", "Facebook")
                }), i.find(".fa-twitter").on("click", function() {
                    wwctrials.tracking.trackEvent("Social Links", "Click", "Twitter")
                }), i.find(".fa-linkedin").on("click", function() {
                    wwctrials.tracking.trackEvent("Social Links", "Click", "LinkedIn")
                })
            },
            trackContactSubmit: function() {
                wwctrials.tracking.trackEvent("Contact Us", "Submit", "Contact Form-Submit")
            },
            trackEvent: function(t, i, e) {
                "function" == typeof ga ? ga("send", "event", t, i, e) : console.log("Unable to log event: \nCategory: " + t + "\nAction: " + i + "\nLabel: " + e)
            }
        };
        return i
    }(jQuery), jQuery(document).ready(function($) {
        wwctrials.tracking.init()
    }), void 0 === wwctrials) var wwctrials = {};
if (wwctrials.main = function(t) {
        var i = t("body").is(".EditMode"),
            e = t("body").is(".DesignMode"),
            s = {
                init: function() {
                    this.externalLinks(), this.heroArrow(), this.mobileNav(), this.clickFirstLink(), this.parallax(), this.homeTherapeuticAreas(), this.scrollable(), this.tabSelector(), this.regionalMessage(), this.videoModal(), this.librarySignupModal(), this.collapsibleBox(), this.searchToggle(), this.imageSlider(), this.contactUs(), this.methodsSearch()
                },
                externalLinks: function() {
                    t('a[href^="http"]').each(function() {
                        this.href.indexOf(location.host) == -1 && t(this).attr("target", "_blank")
                    })
                },
                collapsibleBox: function() {
                    var s = t(".collapsible-box-webpart");
                    if (s.length > 0)
                        if (i || e) {
                            var o = s.find(".collapsible-heading");
                            o.addClass("active"), o.next(".collapsible-content").show()
                        } else s.find(".collapsible-heading").on("click", function() {
                            var i = t(this);
                            i.toggleClass("active"), i.next(".collapsible-content").slideToggle()
                        })
                },
                searchToggle: function() {
                    t(".header-search").length > 0 && (t(".search-toggle").on("click", function() {
                        var i = t(this),
                            e = t(".header-search");
                        i.hasClass("active") ? (i.removeClass("active"), e.fadeOut()) : (i.addClass("active"), e.fadeIn())
                    }), t(".search-close").on("click", function() {
                        var i = t(".header-search"),
                            e = t(".search-toggle");
                        e.removeClass("active"), i.fadeOut()
                    }))
                },
                heroArrow: function() {
                    var i = t(".hero-image-webpart, .hero-video-webpart"),
                        e = i.find(".down-arrow");
                    e.on("click", function() {
                        t("html, body").animate({
                            scrollTop: i.offset().top + i.height()
                        }, 500)
                    })
                },
                parallax: function() {
                    if (console.log("paralax activated"), s.isMobile.any()) return void t(".hero-image-webpart").each(function(i, e) {
                        t(this).find(".img-bg").css("background-position", "50% 0"), t(this).find(".img-bg").css("background-attachment", "scroll")
                    });
                    var i = [],
                        e = function() {
                            i = [], t(".hero-image-webpart").each(function(e, s) {
                                e > 0 ? (t(this).find(".img-bg").css("background-position", "50% 0"), t(this).find(".img-bg").css("background-attachment", "scroll")) : i.push({
                                    startingPos: t(s).offset().top,
                                    elem: t(s)
                                })
                            })
                        };
                    e(), t(window).on("resize", function() {
                        e(), t(window).trigger("scroll")
                    }), t(window).on("scroll", function() {
                        t(i).each(function(i, e) {
                            var s = e.startingPos - t(window).scrollTop();
                            s < 0 ? e.elem.find(".img-bg").css("background-position", "50% " + s / 2 + "px") : e.elem.find(".img-bg").css("background-position", "50% " + s + "px")
                        })
                    }), t(window).trigger("scroll")
                },
                mobileNav: function() {
                    var i = t(".nav-icon"),
                        e = t(".mobile-nav");
                    if (e.is(":visible")) {
                        i.on("click", function() {
                            t(this).is(".open") ? e.removeClass("open") : e.addClass("open")
                        });
                        var s = e.find(".root-nav"),
                            o = e.find(".sub-nav");
                        o.each(function() {
                            var i = t(this),
                                s = i.siblings("a");
                            s.data("subnav", i), s.addClass("has-children"),
                                i.remove().appendTo(e)
                        }), t(window).on("load", function() {
                            new IScroll(s.get(0), {
                                click: !0
                            }), o.each(function() {
                                new IScroll(this, {
                                    click: !0
                                })
                            })
                        }), e.on("click", "a", function(i) {
                            var s = t(this),
                                n = s.data("subnav");
                            void 0 != n ? (i.preventDefault(), n.addClass("open")) : (e.removeClass("open"), o.removeCLass("open"))
                        }), e.on("click", ".back", function(i) {
                            var e = t(this);
                            e.closest(".sub-nav").removeClass("open")
                        })
                    } else i.on("click", function() {
                        var e = t(".primary-nav");
                        t(this).is(".open") ? (e.removeClass("open"), i.removeClass("open")) : (e.addClass("open"), i.addClass("open"))
                    })
                },
                clickFirstLink: function() {
                    i || t(".click-first-link").on("click", function() {
                        var i = t(this).find("a[href]").attr("href");
                        void 0 != i && "" != i && (window.location = i)
                    })
                },
                homeTherapeuticAreas: function() {
                    var i = t(".home-therapeutic-icons-wrapper"),
                        e = t(".home-therapeutic-icon"),
                        s = Math.max(e.length, 1);
                    i.on("click", ".next, .previous", function(i) {
                        var o, n = t(i.target),
                            r = e.index(e.filter(".active").get(0));
                        o = n.is(".next") ? (r + 1) % s : 0 == r ? s - 1 : r - 1, e.eq(r).removeClass("active"), e.eq(o).addClass("active")
                    })
                },
                scrollable: function() {
                    t(window).load(function() {
                        var i = t(".scroll-wrapper");
                        i.each(function(i, e) {
                            var s = t(e),
                                o = s.find(".scroller");
                            1 == o.length && (s.height(o.height()), new IScroll(e, {
                                eventPassthrough: !0,
                                scrollX: !0,
                                scrollY: !1
                            }))
                        })
                    })
                },
                tabSelector: function() {
                    var i = t(".tabs");
                    i.on("click", ".tab", function(i) {
                        var e = t(this),
                            s = e.closest(".tabs"),
                            o = s.find(".tab");
                        o.length > 1 && 1 == o.filter(":visible").length ? (i.preventDefault(), s.addClass("overlay")) : s.is(".overlay") && e.is(".selected") && (i.preventDefault(), s.removeClass("overlay"))
                    })
                },
                regionalMessage: function() {
                    var i = t(".regional-message-webpart");
                    i.find(".close-btn").on("click", function() {
                        i.addClass("hide"), s.setCookie("rgnmsg", "1", 365)
                    })
                },
                videoModal: function() {
                    var i = t(".video-modal"),
                        e = i.find(".video-iframe"),
                        o = i.find(".modal-title");
                    i.on("show.bs.modal", function(i) {
                        var n = t(i.relatedTarget),
                            r = n.data("title");
                        o.text(r);
                        var a = s.convertToYouTubeEmbedUrl(n.attr("href"));
                        e.attr("src", a)
                    }), i.on("hide.bs.modal", function() {
                        e.attr("src", "")
                    })
                },
                librarySignupModal: function() {
                    var i = t(".library-signup-modal"),
                        e = i.find(".feature-signup-success a");
                    if (i.length > 0) {
                        var o = t(".library-featured a, .featured-resource a");
                        o.on("click", function(o) {
                            var n = t(this);
                            e.attr("href", n.attr("href"));
                            var r = s.getCookie("libsignup");
                            "1" != r && (o.preventDefault(), i.modal("show"))
                        })
                    }
                },
                imageSlider: function() {
                    t(".image-slider-webpart").each(function() {
                        var i = t(this);
                        i.slick({
                            arrows: !0,
                            dots: !0,
                            autoplay: !0,
                            autoplaySpeed: 12e3,
                            slide: ".image-slide",
                            prevArrow: ".prev-slide",
                            nextArrow: ".next-slide"
                        })
                    })
                },
                contactUs: function() {
                    var i = t(".contact-us-webpart"),
                        e = null;
                    if (i.length > 0) {
                        var s = i.find(".contact-options");
                        s.on("change", function() {
                            var t = i.find("." + this.value);
                            t.length > 0 && (null != e && e.hide(), t.show(), e = t)
                        })
                    }
                },
                methodsSearch: function() {
                    var i = t(".methods-search-webpart"),
                        e = i.find(".textbox"),
                        s = i.find("input[type=submit]");
                    e.on("keypress", function(t) {
                        if (13 === t.keyCode) return t.preventDefault(), s.click(), !1
                    })
                },
                convertToYouTubeEmbedUrl: function(t) {
                    var i = /v=([^&]+)/,
                        e = i.exec(t);
                    return e.length > 1 ? "https://www.youtube.com/embed/" + e[1] + "?autoplay=1&autohide=0" : ""
                },
                getCookie: function(t) {
                    for (var i = t + "=", e = document.cookie.split(";"), s = 0; s < e.length; s++) {
                        for (var o = e[s];
                            " " == o.charAt(0);) o = o.substring(1);
                        if (0 == o.indexOf(i)) return o.substring(i.length, o.length)
                    }
                    return ""
                },
                setCookie: function(t, i, e) {
                    var s = new Date;
                    s.setTime(s.getTime() + 24 * e * 60 * 60 * 1e3);
                    var o = "expires=" + s.toUTCString();
                    document.cookie = t + "=" + i + "; " + o
                },
                isMobile: {
                    android: function() {
                        return !!navigator.userAgent.match(/Android/i)
                    },
                    blackBerry: function() {
                        return !!navigator.userAgent.match(/BlackBerry/i)
                    },
                    iOS: function() {
                        return !!navigator.userAgent.match(/iPhone|iPad|iPod/i)
                    },
                    iOS7: function() {
                        if (!this.iOS()) return !1;
                        var t = this.iOSVersion();
                        return t[0] > 6 && t[0] < 8
                    },
                    windows: function() {
                        return !!navigator.userAgent.match(/IEMobile/i)
                    },
                    any: function() {
                        return this.android() || this.blackBerry() || this.iOS() || this.windows()
                    },
                    iOSVersion: function() {
                        if (this.iOS()) {
                            var t = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                            return [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3] || 0, 10)]
                        }
                        return []
                    }
                }
            };
        return s
    }(jQuery), jQuery(function() {
        wwctrials.main.init()
    }), function(t, i, e) {
        function s(t, e) {
            this.wrapper = "string" == typeof t ? i.querySelector(t) : t, this.scroller = this.wrapper.children[0], this.scrollerStyle = this.scroller.style, this.options = {
                resizeScrollbars: !0,
                mouseWheelSpeed: 20,
                snapThreshold: .334,
                startX: 0,
                startY: 0,
                scrollY: !0,
                directionLockThreshold: 5,
                momentum: !0,
                bounce: !0,
                bounceTime: 600,
                bounceEasing: "",
                preventDefault: !0,
                preventDefaultException: {
                    tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
                },
                HWCompositing: !0,
                useTransition: !0,
                useTransform: !0
            };
            for (var s in e) this.options[s] = e[s];
            this.translateZ = this.options.HWCompositing && a.hasPerspective ? " translateZ(0)" : "", this.options.useTransition = a.hasTransition && this.options.useTransition, this.options.useTransform = a.hasTransform && this.options.useTransform, this.options.eventPassthrough = this.options.eventPassthrough === !0 ? "vertical" : this.options.eventPassthrough, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollY = "vertical" != this.options.eventPassthrough && this.options.scrollY, this.options.scrollX = "horizontal" != this.options.eventPassthrough && this.options.scrollX, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? a.ease[this.options.bounceEasing] || a.ease.circular : this.options.bounceEasing, this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling, this.options.tap === !0 && (this.options.tap = "tap"), "scale" == this.options.shrinkScrollbars && (this.options.useTransition = !1), this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1, this.x = 0, this.y = 0, this.directionX = 0, this.directionY = 0, this._events = {}, this._init(), this.refresh(), this.scrollTo(this.options.startX, this.options.startY), this.enable()
        }

        function o(t, e, s) {
            var o = i.createElement("div"),
                n = i.createElement("div");
            return s === !0 && (o.style.cssText = "position:absolute;z-index:9999", n.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"), n.className = "iScrollIndicator", "h" == t ? (s === !0 && (o.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", n.style.height = "100%"), o.className = "iScrollHorizontalScrollbar") : (s === !0 && (o.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", n.style.width = "100%"), o.className = "iScrollVerticalScrollbar"), o.style.cssText += ";overflow:hidden", e || (o.style.pointerEvents = "none"), o.appendChild(n), o
        }

        function n(e, s) {
            this.wrapper = "string" == typeof s.el ? i.querySelector(s.el) : s.el, this.wrapperStyle = this.wrapper.style, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = e, this.options = {
                listenX: !0,
                listenY: !0,
                interactive: !1,
                resize: !0,
                defaultScrollbars: !1,
                shrink: !1,
                fade: !1,
                speedRatioX: 0,
                speedRatioY: 0
            };
            for (var o in s) this.options[o] = s[o];
            this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.options.interactive && (this.options.disableTouch || (a.addEvent(this.indicator, "touchstart", this), a.addEvent(t, "touchend", this)), this.options.disablePointer || (a.addEvent(this.indicator, a.prefixPointerEvent("pointerdown"), this), a.addEvent(t, a.prefixPointerEvent("pointerup"), this)), this.options.disableMouse || (a.addEvent(this.indicator, "mousedown", this), a.addEvent(t, "mouseup", this))), this.options.fade && (this.wrapperStyle[a.style.transform] = this.scroller.translateZ, this.wrapperStyle[a.style.transitionDuration] = a.isBadAndroid ? "0.001s" : "0ms", this.wrapperStyle.opacity = "0")
        }
        var r = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame || function(i) {
                t.setTimeout(i, 1e3 / 60)
            },
            a = function() {
                function s(t) {
                    return r !== !1 && ("" === r ? t : r + t.charAt(0).toUpperCase() + t.substr(1))
                }
                var o = {},
                    n = i.createElement("div").style,
                    r = function() {
                        for (var t, i = ["t", "webkitT", "MozT", "msT", "OT"], e = 0, s = i.length; e < s; e++)
                            if (t = i[e] + "ransform", t in n) return i[e].substr(0, i[e].length - 1);
                        return !1
                    }();
                o.getTime = Date.now || function() {
                    return (new Date).getTime()
                }, o.extend = function(t, i) {
                    for (var e in i) t[e] = i[e]
                }, o.addEvent = function(t, i, e, s) {
                    t.addEventListener(i, e, !!s)
                }, o.removeEvent = function(t, i, e, s) {
                    t.removeEventListener(i, e, !!s)
                }, o.prefixPointerEvent = function(i) {
                    return t.MSPointerEvent ? "MSPointer" + i.charAt(9).toUpperCase() + i.substr(10) : i
                }, o.momentum = function(t, i, s, o, n, r) {
                    var a, l, h = t - i,
                        c = e.abs(h) / s;
                    return r = void 0 === r ? 6e-4 : r, a = t + c * c / (2 * r) * (h < 0 ? -1 : 1), l = c / r, a < o ? (a = n ? o - n / 2.5 * (c / 8) : o, h = e.abs(a - t), l = h / c) : a > 0 && (a = n ? n / 2.5 * (c / 8) : 0, h = e.abs(t) + a, l = h / c), {
                        destination: e.round(a),
                        duration: l
                    }
                };
                var a = s("transform");
                return o.extend(o, {
                    hasTransform: a !== !1,
                    hasPerspective: s("perspective") in n,
                    hasTouch: "ontouchstart" in t,
                    hasPointer: t.PointerEvent || t.MSPointerEvent,
                    hasTransition: s("transition") in n
                }), o.isBadAndroid = /Android /.test(t.navigator.appVersion) && !/Chrome\/\d/.test(t.navigator.appVersion), o.extend(o.style = {}, {
                    transform: a,
                    transitionTimingFunction: s("transitionTimingFunction"),
                    transitionDuration: s("transitionDuration"),
                    transitionDelay: s("transitionDelay"),
                    transformOrigin: s("transformOrigin")
                }), o.hasClass = function(t, i) {
                    var e = new RegExp("(^|\\s)" + i + "(\\s|$)");
                    return e.test(t.className)
                }, o.addClass = function(t, i) {
                    if (!o.hasClass(t, i)) {
                        var e = t.className.split(" ");
                        e.push(i), t.className = e.join(" ")
                    }
                }, o.removeClass = function(t, i) {
                    if (o.hasClass(t, i)) {
                        var e = new RegExp("(^|\\s)" + i + "(\\s|$)", "g");
                        t.className = t.className.replace(e, " ")
                    }
                }, o.offset = function(t) {
                    for (var i = -t.offsetLeft, e = -t.offsetTop; t = t.offsetParent;) i -= t.offsetLeft, e -= t.offsetTop;
                    return {
                        left: i,
                        top: e
                    }
                }, o.preventDefaultException = function(t, i) {
                    for (var e in i)
                        if (i[e].test(t[e])) return !0;
                    return !1
                }, o.extend(o.eventType = {}, {
                    touchstart: 1,
                    touchmove: 1,
                    touchend: 1,
                    mousedown: 2,
                    mousemove: 2,
                    mouseup: 2,
                    pointerdown: 3,
                    pointermove: 3,
                    pointerup: 3,
                    MSPointerDown: 3,
                    MSPointerMove: 3,
                    MSPointerUp: 3
                }), o.extend(o.ease = {}, {
                    quadratic: {
                        style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        fn: function(t) {
                            return t * (2 - t)
                        }
                    },
                    circular: {
                        style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
                        fn: function(t) {
                            return e.sqrt(1 - --t * t)
                        }
                    },
                    back: {
                        style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        fn: function(t) {
                            var i = 4;
                            return (t -= 1) * t * ((i + 1) * t + i) + 1
                        }
                    },
                    bounce: {
                        style: "",
                        fn: function(t) {
                            return (t /= 1) < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                        }
                    },
                    elastic: {
                        style: "",
                        fn: function(t) {
                            var i = .22,
                                s = .4;
                            return 0 === t ? 0 : 1 == t ? 1 : s * e.pow(2, -10 * t) * e.sin((t - i / 4) * (2 * e.PI) / i) + 1
                        }
                    }
                }), o.tap = function(t, e) {
                    var s = i.createEvent("Event");
                    s.initEvent(e, !0, !0), s.pageX = t.pageX, s.pageY = t.pageY, t.target.dispatchEvent(s)
                }, o.click = function(t) {
                    var e, s = t.target;
                    /(SELECT|INPUT|TEXTAREA)/i.test(s.tagName) || (e = i.createEvent("MouseEvents"), e.initMouseEvent("click", !0, !0, t.view, 1, s.screenX, s.screenY, s.clientX, s.clientY, t.ctrlKey, t.altKey, t.shiftKey, t.metaKey, 0, null), e._constructed = !0, s.dispatchEvent(e))
                }, o
            }();
        s.prototype = {
            version: "5.1.3",
            _init: function() {
                this._initEvents(), (this.options.scrollbars || this.options.indicators) && this._initIndicators(), this.options.mouseWheel && this._initWheel(), this.options.snap && this._initSnap(), this.options.keyBindings && this._initKeys()
            },
            destroy: function() {
                this._initEvents(!0), this._execEvent("destroy")
            },
            _transitionEnd: function(t) {
                t.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, this._execEvent("scrollEnd")))
            },
            _start: function(t) {
                if ((1 == a.eventType[t.type] || 0 === t.button) && this.enabled && (!this.initiated || a.eventType[t.type] === this.initiated)) {
                    !this.options.preventDefault || a.isBadAndroid || a.preventDefaultException(t.target, this.options.preventDefaultException) || t.preventDefault();
                    var i, s = t.touches ? t.touches[0] : t;
                    this.initiated = a.eventType[t.type], this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.directionLocked = 0, this._transitionTime(), this.startTime = a.getTime(), this.options.useTransition && this.isInTransition ? (this.isInTransition = !1, i = this.getComputedPosition(), this._translate(e.round(i.x), e.round(i.y)), this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this._execEvent("scrollEnd")), this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = s.pageX, this.pointY = s.pageY, this._execEvent("beforeScrollStart")
                }
            },
            _move: function(t) {
                if (this.enabled && a.eventType[t.type] === this.initiated) {
                    this.options.preventDefault && t.preventDefault();
                    var i, s, o, n, r = t.touches ? t.touches[0] : t,
                        l = r.pageX - this.pointX,
                        h = r.pageY - this.pointY,
                        c = a.getTime();
                    if (this.pointX = r.pageX, this.pointY = r.pageY, this.distX += l, this.distY += h, o = e.abs(this.distX), n = e.abs(this.distY), !(c - this.endTime > 300 && o < 10 && n < 10)) {
                        if (this.directionLocked || this.options.freeScroll || (o > n + this.options.directionLockThreshold ? this.directionLocked = "h" : n >= o + this.options.directionLockThreshold ? this.directionLocked = "v" : this.directionLocked = "n"), "h" == this.directionLocked) {
                            if ("vertical" == this.options.eventPassthrough) t.preventDefault();
                            else if ("horizontal" == this.options.eventPassthrough) return void(this.initiated = !1);
                            h = 0
                        } else if ("v" == this.directionLocked) {
                            if ("horizontal" == this.options.eventPassthrough) t.preventDefault();
                            else if ("vertical" == this.options.eventPassthrough) return void(this.initiated = !1);
                            l = 0
                        }
                        l = this.hasHorizontalScroll ? l : 0, h = this.hasVerticalScroll ? h : 0, i = this.x + l, s = this.y + h, (i > 0 || i < this.maxScrollX) && (i = this.options.bounce ? this.x + l / 3 : i > 0 ? 0 : this.maxScrollX), (s > 0 || s < this.maxScrollY) && (s = this.options.bounce ? this.y + h / 3 : s > 0 ? 0 : this.maxScrollY), this.directionX = l > 0 ? -1 : l < 0 ? 1 : 0, this.directionY = h > 0 ? -1 : h < 0 ? 1 : 0, this.moved || this._execEvent("scrollStart"), this.moved = !0, this._translate(i, s), c - this.startTime > 300 && (this.startTime = c, this.startX = this.x, this.startY = this.y)
                    }
                }
            },
            _end: function(t) {
                if (this.enabled && a.eventType[t.type] === this.initiated) {
                    this.options.preventDefault && !a.preventDefaultException(t.target, this.options.preventDefaultException) && t.preventDefault();
                    var i, s, o = (t.changedTouches ? t.changedTouches[0] : t, a.getTime() - this.startTime),
                        n = e.round(this.x),
                        r = e.round(this.y),
                        l = e.abs(n - this.startX),
                        h = e.abs(r - this.startY),
                        c = 0,
                        d = "";
                    if (this.isInTransition = 0, this.initiated = 0, this.endTime = a.getTime(), !this.resetPosition(this.options.bounceTime)) {
                        if (this.scrollTo(n, r), !this.moved) return this.options.tap && a.tap(t, this.options.tap), this.options.click && a.click(t), void this._execEvent("scrollCancel");
                        if (this._events.flick && o < 200 && l < 100 && h < 100) return void this._execEvent("flick");
                        if (this.options.momentum && o < 300 && (i = this.hasHorizontalScroll ? a.momentum(this.x, this.startX, o, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
                                destination: n,
                                duration: 0
                            }, s = this.hasVerticalScroll ? a.momentum(this.y, this.startY, o, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
                                destination: r,
                                duration: 0
                            }, n = i.destination, r = s.destination, c = e.max(i.duration, s.duration), this.isInTransition = 1), this.options.snap) {
                            var p = this._nearestSnap(n, r);
                            this.currentPage = p, c = this.options.snapSpeed || e.max(e.max(e.min(e.abs(n - p.x), 1e3), e.min(e.abs(r - p.y), 1e3)), 300), n = p.x, r = p.y, this.directionX = 0, this.directionY = 0, d = this.options.bounceEasing
                        }
                        return n != this.x || r != this.y ? ((n > 0 || n < this.maxScrollX || r > 0 || r < this.maxScrollY) && (d = a.ease.quadratic), void this.scrollTo(n, r, c, d)) : void this._execEvent("scrollEnd")
                    }
                }
            },
            _resize: function() {
                var t = this;
                clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() {
                    t.refresh()
                }, this.options.resizePolling)
            },
            resetPosition: function(t) {
                var i = this.x,
                    e = this.y;
                return t = t || 0, !this.hasHorizontalScroll || this.x > 0 ? i = 0 : this.x < this.maxScrollX && (i = this.maxScrollX), !this.hasVerticalScroll || this.y > 0 ? e = 0 : this.y < this.maxScrollY && (e = this.maxScrollY), (i != this.x || e != this.y) && (this.scrollTo(i, e, t, this.options.bounceEasing), !0)
            },
            disable: function() {
                this.enabled = !1
            },
            enable: function() {
                this.enabled = !0
            },
            refresh: function() {
                this.wrapper.offsetHeight, this.wrapperWidth = this.wrapper.clientWidth, this.wrapperHeight = this.wrapper.clientHeight, this.scrollerWidth = this.scroller.offsetWidth, this.scrollerHeight = this.scroller.offsetHeight, this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.maxScrollY = this.wrapperHeight - this.scrollerHeight, this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, this.wrapperOffset = a.offset(this.wrapper), this._execEvent("refresh"), this.resetPosition()
            },
            on: function(t, i) {
                this._events[t] || (this._events[t] = []), this._events[t].push(i)
            },
            off: function(t, i) {
                if (this._events[t]) {
                    var e = this._events[t].indexOf(i);
                    e > -1 && this._events[t].splice(e, 1)
                }
            },
            _execEvent: function(t) {
                if (this._events[t]) {
                    var i = 0,
                        e = this._events[t].length;
                    if (e)
                        for (; i < e; i++) this._events[t][i].apply(this, [].slice.call(arguments, 1))
                }
            },
            scrollBy: function(t, i, e, s) {
                t = this.x + t, i = this.y + i, e = e || 0, this.scrollTo(t, i, e, s)
            },
            scrollTo: function(t, i, e, s) {
                s = s || a.ease.circular, this.isInTransition = this.options.useTransition && e > 0, !e || this.options.useTransition && s.style ? (this._transitionTimingFunction(s.style), this._transitionTime(e), this._translate(t, i)) : this._animate(t, i, e, s.fn)
            },
            scrollToElement: function(t, i, s, o, n) {
                if (t = t.nodeType ? t : this.scroller.querySelector(t)) {
                    var r = a.offset(t);
                    r.left -= this.wrapperOffset.left, r.top -= this.wrapperOffset.top, s === !0 && (s = e.round(t.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), o === !0 && (o = e.round(t.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), r.left -= s || 0, r.top -= o || 0, r.left = r.left > 0 ? 0 : r.left < this.maxScrollX ? this.maxScrollX : r.left, r.top = r.top > 0 ? 0 : r.top < this.maxScrollY ? this.maxScrollY : r.top, i = void 0 === i || null === i || "auto" === i ? e.max(e.abs(this.x - r.left), e.abs(this.y - r.top)) : i, this.scrollTo(r.left, r.top, i, n)
                }
            },
            _transitionTime: function(t) {
                if (t = t || 0, this.scrollerStyle[a.style.transitionDuration] = t + "ms", !t && a.isBadAndroid && (this.scrollerStyle[a.style.transitionDuration] = "0.001s"), this.indicators)
                    for (var i = this.indicators.length; i--;) this.indicators[i].transitionTime(t)
            },
            _transitionTimingFunction: function(t) {
                if (this.scrollerStyle[a.style.transitionTimingFunction] = t, this.indicators)
                    for (var i = this.indicators.length; i--;) this.indicators[i].transitionTimingFunction(t)
            },
            _translate: function(t, i) {
                if (this.options.useTransform ? this.scrollerStyle[a.style.transform] = "translate(" + t + "px," + i + "px)" + this.translateZ : (t = e.round(t), i = e.round(i), this.scrollerStyle.left = t + "px", this.scrollerStyle.top = i + "px"), this.x = t, this.y = i, this.indicators)
                    for (var s = this.indicators.length; s--;) this.indicators[s].updatePosition()
            },
            _initEvents: function(i) {
                var e = i ? a.removeEvent : a.addEvent,
                    s = this.options.bindToWrapper ? this.wrapper : t;
                e(t, "orientationchange", this), e(t, "resize", this), this.options.click && e(this.wrapper, "click", this, !0), this.options.disableMouse || (e(this.wrapper, "mousedown", this), e(s, "mousemove", this), e(s, "mousecancel", this), e(s, "mouseup", this)), a.hasPointer && !this.options.disablePointer && (e(this.wrapper, a.prefixPointerEvent("pointerdown"), this), e(s, a.prefixPointerEvent("pointermove"), this), e(s, a.prefixPointerEvent("pointercancel"), this), e(s, a.prefixPointerEvent("pointerup"), this)), a.hasTouch && !this.options.disableTouch && (e(this.wrapper, "touchstart", this), e(s, "touchmove", this), e(s, "touchcancel", this), e(s, "touchend", this)), e(this.scroller, "transitionend", this), e(this.scroller, "webkitTransitionEnd", this), e(this.scroller, "oTransitionEnd", this), e(this.scroller, "MSTransitionEnd", this)
            },
            getComputedPosition: function() {
                var i, e, s = t.getComputedStyle(this.scroller, null);
                return this.options.useTransform ? (s = s[a.style.transform].split(")")[0].split(", "), i = +(s[12] || s[4]), e = +(s[13] || s[5])) : (i = +s.left.replace(/[^-\d.]/g, ""), e = +s.top.replace(/[^-\d.]/g, "")), {
                    x: i,
                    y: e
                }
            },
            _initIndicators: function() {
                function t(t) {
                    for (var i = a.indicators.length; i--;) t.call(a.indicators[i])
                }
                var i, e = this.options.interactiveScrollbars,
                    s = "string" != typeof this.options.scrollbars,
                    r = [],
                    a = this;
                this.indicators = [], this.options.scrollbars && (this.options.scrollY && (i = {
                    el: o("v", e, this.options.scrollbars),
                    interactive: e,
                    defaultScrollbars: !0,
                    customStyle: s,
                    resize: this.options.resizeScrollbars,
                    shrink: this.options.shrinkScrollbars,
                    fade: this.options.fadeScrollbars,
                    listenX: !1
                }, this.wrapper.appendChild(i.el), r.push(i)), this.options.scrollX && (i = {
                    el: o("h", e, this.options.scrollbars),
                    interactive: e,
                    defaultScrollbars: !0,
                    customStyle: s,
                    resize: this.options.resizeScrollbars,
                    shrink: this.options.shrinkScrollbars,
                    fade: this.options.fadeScrollbars,
                    listenY: !1
                }, this.wrapper.appendChild(i.el), r.push(i))), this.options.indicators && (r = r.concat(this.options.indicators));
                for (var l = r.length; l--;) this.indicators.push(new n(this, r[l]));
                this.options.fadeScrollbars && (this.on("scrollEnd", function() {
                    t(function() {
                        this.fade()
                    })
                }), this.on("scrollCancel", function() {
                    t(function() {
                        this.fade()
                    })
                }), this.on("scrollStart", function() {
                    t(function() {
                        this.fade(1)
                    })
                }), this.on("beforeScrollStart", function() {
                    t(function() {
                        this.fade(1, !0)
                    })
                })), this.on("refresh", function() {
                    t(function() {
                        this.refresh()
                    })
                }), this.on("destroy", function() {
                    t(function() {
                        this.destroy()
                    }), delete this.indicators
                })
            },
            _initWheel: function() {
                a.addEvent(this.wrapper, "wheel", this), a.addEvent(this.wrapper, "mousewheel", this), a.addEvent(this.wrapper, "DOMMouseScroll", this), this.on("destroy", function() {
                    a.removeEvent(this.wrapper, "wheel", this), a.removeEvent(this.wrapper, "mousewheel", this), a.removeEvent(this.wrapper, "DOMMouseScroll", this)
                })
            },
            _wheel: function(t) {
                if (this.enabled) {
                    t.preventDefault(), t.stopPropagation();
                    var i, s, o, n, r = this;
                    if (void 0 === this.wheelTimeout && r._execEvent("scrollStart"), clearTimeout(this.wheelTimeout), this.wheelTimeout = setTimeout(function() {
                            r._execEvent("scrollEnd"), r.wheelTimeout = void 0
                        }, 400), "deltaX" in t) 1 === t.deltaMode ? (i = -t.deltaX * this.options.mouseWheelSpeed, s = -t.deltaY * this.options.mouseWheelSpeed) : (i = -t.deltaX, s = -t.deltaY);
                    else if ("wheelDeltaX" in t) i = t.wheelDeltaX / 120 * this.options.mouseWheelSpeed, s = t.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
                    else if ("wheelDelta" in t) i = s = t.wheelDelta / 120 * this.options.mouseWheelSpeed;
                    else {
                        if (!("detail" in t)) return;
                        i = s = -t.detail / 3 * this.options.mouseWheelSpeed
                    }
                    if (i *= this.options.invertWheelDirection, s *= this.options.invertWheelDirection, this.hasVerticalScroll || (i = s, s = 0), this.options.snap) return o = this.currentPage.pageX, n = this.currentPage.pageY, i > 0 ? o-- : i < 0 && o++, s > 0 ? n-- : s < 0 && n++, void this.goToPage(o, n);
                    o = this.x + e.round(this.hasHorizontalScroll ? i : 0), n = this.y + e.round(this.hasVerticalScroll ? s : 0), o > 0 ? o = 0 : o < this.maxScrollX && (o = this.maxScrollX), n > 0 ? n = 0 : n < this.maxScrollY && (n = this.maxScrollY), this.scrollTo(o, n, 0)
                }
            },
            _initSnap: function() {
                this.currentPage = {}, "string" == typeof this.options.snap && (this.options.snap = this.scroller.querySelectorAll(this.options.snap)), this.on("refresh", function() {
                    var t, i, s, o, n, r, a = 0,
                        l = 0,
                        h = 0,
                        c = this.options.snapStepX || this.wrapperWidth,
                        d = this.options.snapStepY || this.wrapperHeight;
                    if (this.pages = [], this.wrapperWidth && this.wrapperHeight && this.scrollerWidth && this.scrollerHeight) {
                        if (this.options.snap === !0)
                            for (s = e.round(c / 2), o = e.round(d / 2); h > -this.scrollerWidth;) {
                                for (this.pages[a] = [], t = 0, n = 0; n > -this.scrollerHeight;) this.pages[a][t] = {
                                    x: e.max(h, this.maxScrollX),
                                    y: e.max(n, this.maxScrollY),
                                    width: c,
                                    height: d,
                                    cx: h - s,
                                    cy: n - o
                                }, n -= d, t++;
                                h -= c, a++
                            } else
                                for (r = this.options.snap, t = r.length, i = -1; a < t; a++)(0 === a || r[a].offsetLeft <= r[a - 1].offsetLeft) && (l = 0, i++), this.pages[l] || (this.pages[l] = []), h = e.max(-r[a].offsetLeft, this.maxScrollX), n = e.max(-r[a].offsetTop, this.maxScrollY), s = h - e.round(r[a].offsetWidth / 2), o = n - e.round(r[a].offsetHeight / 2), this.pages[l][i] = {
                                    x: h,
                                    y: n,
                                    width: r[a].offsetWidth,
                                    height: r[a].offsetHeight,
                                    cx: s,
                                    cy: o
                                }, h > this.maxScrollX && l++;
                        this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0), this.options.snapThreshold % 1 === 0 ? (this.snapThresholdX = this.options.snapThreshold, this.snapThresholdY = this.options.snapThreshold) : (this.snapThresholdX = e.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold), this.snapThresholdY = e.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold))
                    }
                }), this.on("flick", function() {
                    var t = this.options.snapSpeed || e.max(e.max(e.min(e.abs(this.x - this.startX), 1e3), e.min(e.abs(this.y - this.startY), 1e3)), 300);
                    this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, t)
                })
            },
            _nearestSnap: function(t, i) {
                if (!this.pages.length) return {
                    x: 0,
                    y: 0,
                    pageX: 0,
                    pageY: 0
                };
                var s = 0,
                    o = this.pages.length,
                    n = 0;
                if (e.abs(t - this.absStartX) < this.snapThresholdX && e.abs(i - this.absStartY) < this.snapThresholdY) return this.currentPage;
                for (t > 0 ? t = 0 : t < this.maxScrollX && (t = this.maxScrollX), i > 0 ? i = 0 : i < this.maxScrollY && (i = this.maxScrollY); s < o; s++)
                    if (t >= this.pages[s][0].cx) {
                        t = this.pages[s][0].x;
                        break
                    }
                for (o = this.pages[s].length; n < o; n++)
                    if (i >= this.pages[0][n].cy) {
                        i = this.pages[0][n].y;
                        break
                    }
                return s == this.currentPage.pageX && (s += this.directionX, s < 0 ? s = 0 : s >= this.pages.length && (s = this.pages.length - 1), t = this.pages[s][0].x), n == this.currentPage.pageY && (n += this.directionY, n < 0 ? n = 0 : n >= this.pages[0].length && (n = this.pages[0].length - 1), i = this.pages[0][n].y), {
                    x: t,
                    y: i,
                    pageX: s,
                    pageY: n
                }
            },
            goToPage: function(t, i, s, o) {
                o = o || this.options.bounceEasing, t >= this.pages.length ? t = this.pages.length - 1 : t < 0 && (t = 0), i >= this.pages[t].length ? i = this.pages[t].length - 1 : i < 0 && (i = 0);
                var n = this.pages[t][i].x,
                    r = this.pages[t][i].y;
                s = void 0 === s ? this.options.snapSpeed || e.max(e.max(e.min(e.abs(n - this.x), 1e3), e.min(e.abs(r - this.y), 1e3)), 300) : s, this.currentPage = {
                    x: n,
                    y: r,
                    pageX: t,
                    pageY: i
                }, this.scrollTo(n, r, s, o)
            },
            next: function(t, i) {
                var e = this.currentPage.pageX,
                    s = this.currentPage.pageY;
                e++, e >= this.pages.length && this.hasVerticalScroll && (e = 0, s++), this.goToPage(e, s, t, i)
            },
            prev: function(t, i) {
                var e = this.currentPage.pageX,
                    s = this.currentPage.pageY;
                e--, e < 0 && this.hasVerticalScroll && (e = 0, s--), this.goToPage(e, s, t, i)
            },
            _initKeys: function(i) {
                var e, s = {
                    pageUp: 33,
                    pageDown: 34,
                    end: 35,
                    home: 36,
                    left: 37,
                    up: 38,
                    right: 39,
                    down: 40
                };
                if ("object" == typeof this.options.keyBindings)
                    for (e in this.options.keyBindings) "string" == typeof this.options.keyBindings[e] && (this.options.keyBindings[e] = this.options.keyBindings[e].toUpperCase().charCodeAt(0));
                else this.options.keyBindings = {};
                for (e in s) this.options.keyBindings[e] = this.options.keyBindings[e] || s[e];
                a.addEvent(t, "keydown", this), this.on("destroy", function() {
                    a.removeEvent(t, "keydown", this)
                })
            },
            _key: function(t) {
                if (this.enabled) {
                    var i, s = this.options.snap,
                        o = s ? this.currentPage.pageX : this.x,
                        n = s ? this.currentPage.pageY : this.y,
                        r = a.getTime(),
                        l = this.keyTime || 0,
                        h = .25;
                    switch (this.options.useTransition && this.isInTransition && (i = this.getComputedPosition(), this._translate(e.round(i.x), e.round(i.y)), this.isInTransition = !1), this.keyAcceleration = r - l < 200 ? e.min(this.keyAcceleration + h, 50) : 0, t.keyCode) {
                        case this.options.keyBindings.pageUp:
                            this.hasHorizontalScroll && !this.hasVerticalScroll ? o += s ? 1 : this.wrapperWidth : n += s ? 1 : this.wrapperHeight;
                            break;
                        case this.options.keyBindings.pageDown:
                            this.hasHorizontalScroll && !this.hasVerticalScroll ? o -= s ? 1 : this.wrapperWidth : n -= s ? 1 : this.wrapperHeight;
                            break;
                        case this.options.keyBindings.end:
                            o = s ? this.pages.length - 1 : this.maxScrollX, n = s ? this.pages[0].length - 1 : this.maxScrollY;
                            break;
                        case this.options.keyBindings.home:
                            o = 0, n = 0;
                            break;
                        case this.options.keyBindings.left:
                            o += s ? -1 : 5 + this.keyAcceleration >> 0;
                            break;
                        case this.options.keyBindings.up:
                            n += s ? 1 : 5 + this.keyAcceleration >> 0;
                            break;
                        case this.options.keyBindings.right:
                            o -= s ? -1 : 5 + this.keyAcceleration >> 0;
                            break;
                        case this.options.keyBindings.down:
                            n -= s ? 1 : 5 + this.keyAcceleration >> 0;
                            break;
                        default:
                            return
                    }
                    if (s) return void this.goToPage(o, n);
                    o > 0 ? (o = 0, this.keyAcceleration = 0) : o < this.maxScrollX && (o = this.maxScrollX, this.keyAcceleration = 0), n > 0 ? (n = 0, this.keyAcceleration = 0) : n < this.maxScrollY && (n = this.maxScrollY, this.keyAcceleration = 0), this.scrollTo(o, n, 0), this.keyTime = r
                }
            },
            _animate: function(t, i, e, s) {
                function o() {
                    var p, u, f, v = a.getTime();
                    return v >= d ? (n.isAnimating = !1, n._translate(t, i), void(n.resetPosition(n.options.bounceTime) || n._execEvent("scrollEnd"))) : (v = (v - c) / e, f = s(v), p = (t - l) * f + l, u = (i - h) * f + h, n._translate(p, u), void(n.isAnimating && r(o)))
                }
                var n = this,
                    l = this.x,
                    h = this.y,
                    c = a.getTime(),
                    d = c + e;
                this.isAnimating = !0, o()
            },
            handleEvent: function(t) {
                switch (t.type) {
                    case "touchstart":
                    case "pointerdown":
                    case "MSPointerDown":
                    case "mousedown":
                        this._start(t);
                        break;
                    case "touchmove":
                    case "pointermove":
                    case "MSPointerMove":
                    case "mousemove":
                        this._move(t);
                        break;
                    case "touchend":
                    case "pointerup":
                    case "MSPointerUp":
                    case "mouseup":
                    case "touchcancel":
                    case "pointercancel":
                    case "MSPointerCancel":
                    case "mousecancel":
                        this._end(t);
                        break;
                    case "orientationchange":
                    case "resize":
                        this._resize();
                        break;
                    case "transitionend":
                    case "webkitTransitionEnd":
                    case "oTransitionEnd":
                    case "MSTransitionEnd":
                        this._transitionEnd(t);
                        break;
                    case "wheel":
                    case "DOMMouseScroll":
                    case "mousewheel":
                        this._wheel(t);
                        break;
                    case "keydown":
                        this._key(t);
                        break;
                    case "click":
                        t._constructed || (t.preventDefault(), t.stopPropagation())
                }
            }
        }, n.prototype = {
            handleEvent: function(t) {
                switch (t.type) {
                    case "touchstart":
                    case "pointerdown":
                    case "MSPointerDown":
                    case "mousedown":
                        this._start(t);
                        break;
                    case "touchmove":
                    case "pointermove":
                    case "MSPointerMove":
                    case "mousemove":
                        this._move(t);
                        break;
                    case "touchend":
                    case "pointerup":
                    case "MSPointerUp":
                    case "mouseup":
                    case "touchcancel":
                    case "pointercancel":
                    case "MSPointerCancel":
                    case "mousecancel":
                        this._end(t)
                }
            },
            destroy: function() {
                this.options.interactive && (a.removeEvent(this.indicator, "touchstart", this), a.removeEvent(this.indicator, a.prefixPointerEvent("pointerdown"), this), a.removeEvent(this.indicator, "mousedown", this), a.removeEvent(t, "touchmove", this), a.removeEvent(t, a.prefixPointerEvent("pointermove"), this), a.removeEvent(t, "mousemove", this), a.removeEvent(t, "touchend", this), a.removeEvent(t, a.prefixPointerEvent("pointerup"), this), a.removeEvent(t, "mouseup", this)), this.options.defaultScrollbars && this.wrapper.parentNode.removeChild(this.wrapper)
            },
            _start: function(i) {
                var e = i.touches ? i.touches[0] : i;
                i.preventDefault(), i.stopPropagation(), this.transitionTime(), this.initiated = !0, this.moved = !1, this.lastPointX = e.pageX, this.lastPointY = e.pageY, this.startTime = a.getTime(), this.options.disableTouch || a.addEvent(t, "touchmove", this), this.options.disablePointer || a.addEvent(t, a.prefixPointerEvent("pointermove"), this), this.options.disableMouse || a.addEvent(t, "mousemove", this), this.scroller._execEvent("beforeScrollStart")
            },
            _move: function(t) {
                var i, e, s, o, n = t.touches ? t.touches[0] : t;
                a.getTime(), this.moved || this.scroller._execEvent("scrollStart"), this.moved = !0, i = n.pageX - this.lastPointX, this.lastPointX = n.pageX, e = n.pageY - this.lastPointY, this.lastPointY = n.pageY, s = this.x + i, o = this.y + e, this._pos(s, o), t.preventDefault(), t.stopPropagation()
            },
            _end: function(i) {
                if (this.initiated) {
                    if (this.initiated = !1, i.preventDefault(), i.stopPropagation(), a.removeEvent(t, "touchmove", this), a.removeEvent(t, a.prefixPointerEvent("pointermove"), this), a.removeEvent(t, "mousemove", this), this.scroller.options.snap) {
                        var s = this.scroller._nearestSnap(this.scroller.x, this.scroller.y),
                            o = this.options.snapSpeed || e.max(e.max(e.min(e.abs(this.scroller.x - s.x), 1e3), e.min(e.abs(this.scroller.y - s.y), 1e3)), 300);
                        this.scroller.x == s.x && this.scroller.y == s.y || (this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = s, this.scroller.scrollTo(s.x, s.y, o, this.scroller.options.bounceEasing))
                    }
                    this.moved && this.scroller._execEvent("scrollEnd")
                }
            },
            transitionTime: function(t) {
                t = t || 0, this.indicatorStyle[a.style.transitionDuration] = t + "ms", !t && a.isBadAndroid && (this.indicatorStyle[a.style.transitionDuration] = "0.001s")
            },
            transitionTimingFunction: function(t) {
                this.indicatorStyle[a.style.transitionTimingFunction] = t
            },
            refresh: function() {
                this.transitionTime(), this.options.listenX && !this.options.listenY ? this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.indicatorStyle.display = this.scroller.hasVerticalScroll ? "block" : "none" : this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none",
                    this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ? (a.addClass(this.wrapper, "iScrollBothScrollbars"), a.removeClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "8px" : this.wrapper.style.bottom = "8px")) : (a.removeClass(this.wrapper, "iScrollBothScrollbars"), a.addClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "2px" : this.wrapper.style.bottom = "2px")), this.wrapper.offsetHeight, this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth, this.options.resize ? (this.indicatorWidth = e.max(e.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px") : this.indicatorWidth = this.indicator.clientWidth, this.maxPosX = this.wrapperWidth - this.indicatorWidth, "clip" == this.options.shrink ? (this.minBoundaryX = -this.indicatorWidth + 8, this.maxBoundaryX = this.wrapperWidth - 8) : (this.minBoundaryX = 0, this.maxBoundaryX = this.maxPosX), this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX), this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight, this.options.resize ? (this.indicatorHeight = e.max(e.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px") : this.indicatorHeight = this.indicator.clientHeight, this.maxPosY = this.wrapperHeight - this.indicatorHeight, "clip" == this.options.shrink ? (this.minBoundaryY = -this.indicatorHeight + 8, this.maxBoundaryY = this.wrapperHeight - 8) : (this.minBoundaryY = 0, this.maxBoundaryY = this.maxPosY), this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY), this.updatePosition()
            },
            updatePosition: function() {
                var t = this.options.listenX && e.round(this.sizeRatioX * this.scroller.x) || 0,
                    i = this.options.listenY && e.round(this.sizeRatioY * this.scroller.y) || 0;
                this.options.ignoreBoundaries || (t < this.minBoundaryX ? ("scale" == this.options.shrink && (this.width = e.max(this.indicatorWidth + t, 8), this.indicatorStyle.width = this.width + "px"), t = this.minBoundaryX) : t > this.maxBoundaryX ? "scale" == this.options.shrink ? (this.width = e.max(this.indicatorWidth - (t - this.maxPosX), 8), this.indicatorStyle.width = this.width + "px", t = this.maxPosX + this.indicatorWidth - this.width) : t = this.maxBoundaryX : "scale" == this.options.shrink && this.width != this.indicatorWidth && (this.width = this.indicatorWidth, this.indicatorStyle.width = this.width + "px"), i < this.minBoundaryY ? ("scale" == this.options.shrink && (this.height = e.max(this.indicatorHeight + 3 * i, 8), this.indicatorStyle.height = this.height + "px"), i = this.minBoundaryY) : i > this.maxBoundaryY ? "scale" == this.options.shrink ? (this.height = e.max(this.indicatorHeight - 3 * (i - this.maxPosY), 8), this.indicatorStyle.height = this.height + "px", i = this.maxPosY + this.indicatorHeight - this.height) : i = this.maxBoundaryY : "scale" == this.options.shrink && this.height != this.indicatorHeight && (this.height = this.indicatorHeight, this.indicatorStyle.height = this.height + "px")), this.x = t, this.y = i, this.scroller.options.useTransform ? this.indicatorStyle[a.style.transform] = "translate(" + t + "px," + i + "px)" + this.scroller.translateZ : (this.indicatorStyle.left = t + "px", this.indicatorStyle.top = i + "px")
            },
            _pos: function(t, i) {
                t < 0 ? t = 0 : t > this.maxPosX && (t = this.maxPosX), i < 0 ? i = 0 : i > this.maxPosY && (i = this.maxPosY), t = this.options.listenX ? e.round(t / this.sizeRatioX) : this.scroller.x, i = this.options.listenY ? e.round(i / this.sizeRatioY) : this.scroller.y, this.scroller.scrollTo(t, i)
            },
            fade: function(t, i) {
                if (!i || this.visible) {
                    clearTimeout(this.fadeTimeout), this.fadeTimeout = null;
                    var e = t ? 250 : 500,
                        s = t ? 0 : 300;
                    t = t ? "1" : "0", this.wrapperStyle[a.style.transitionDuration] = e + "ms", this.fadeTimeout = setTimeout(function(t) {
                        this.wrapperStyle.opacity = t, this.visible = +t
                    }.bind(this, t), s)
                }
            }
        }, s.utils = a, "undefined" != typeof module && module.exports ? module.exports = s : t.IScroll = s
    }(window, document, Math), function(t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery)
    }(function(t) {
        "use strict";

        function i(i) {
            return !i.nodeName || -1 !== t.inArray(i.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"])
        }

        function e(i) {
            return t.isFunction(i) || t.isPlainObject(i) ? i : {
                top: i,
                left: i
            }
        }
        var s = t.scrollTo = function(i, e, s) {
            return t(window).scrollTo(i, e, s)
        };
        return s.defaults = {
            axis: "xy",
            duration: 0,
            limit: !0
        }, t.fn.scrollTo = function(o, n, r) {
            "object" == typeof n && (r = n, n = 0), "function" == typeof r && (r = {
                onAfter: r
            }), "max" === o && (o = 9e9), r = t.extend({}, s.defaults, r), n = n || r.duration;
            var a = r.queue && 1 < r.axis.length;
            return a && (n /= 2), r.offset = e(r.offset), r.over = e(r.over), this.each(function() {
                function l(i) {
                    var e = t.extend({}, r, {
                        queue: !0,
                        duration: n,
                        complete: i && function() {
                            i.call(d, u, r)
                        }
                    });
                    p.animate(f, e)
                }
                if (null !== o) {
                    var h, c = i(this),
                        d = c ? this.contentWindow || window : this,
                        p = t(d),
                        u = o,
                        f = {};
                    switch (typeof u) {
                        case "number":
                        case "string":
                            if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(u)) {
                                u = e(u);
                                break
                            }
                            u = c ? t(u) : t(u, d);
                        case "object":
                            if (0 === u.length) return;
                            (u.is || u.style) && (h = (u = t(u)).offset())
                    }
                    var v = t.isFunction(r.offset) && r.offset(d, u) || r.offset;
                    t.each(r.axis.split(""), function(t, i) {
                        var e = "x" === i ? "Left" : "Top",
                            o = e.toLowerCase(),
                            n = "scroll" + e,
                            g = p[n](),
                            m = s.max(d, i);
                        h ? (f[n] = h[o] + (c ? 0 : g - p.offset()[o]), r.margin && (f[n] -= parseInt(u.css("margin" + e), 10) || 0, f[n] -= parseInt(u.css("border" + e + "Width"), 10) || 0), f[n] += v[o] || 0, r.over[o] && (f[n] += u["x" === i ? "width" : "height"]() * r.over[o])) : (e = u[o], f[n] = e.slice && "%" === e.slice(-1) ? parseFloat(e) / 100 * m : e), r.limit && /^\d+$/.test(f[n]) && (f[n] = 0 >= f[n] ? 0 : Math.min(f[n], m)), !t && 1 < r.axis.length && (g === f[n] ? f = {} : a && (l(r.onAfterFirst), f = {}))
                    }), l(r.onAfter)
                }
            })
        }, s.max = function(e, s) {
            var o = "x" === s ? "Width" : "Height",
                n = "scroll" + o;
            if (!i(e)) return e[n] - t(e)[o.toLowerCase()]();
            var o = "client" + o,
                r = e.ownerDocument || e.document,
                a = r.documentElement,
                r = r.body;
            return Math.max(a[n], r[n]) - Math.min(a[o], r[o])
        }, t.Tween.propHooks.scrollLeft = t.Tween.propHooks.scrollTop = {
            get: function(i) {
                return t(i.elem)[i.prop]()
            },
            set: function(i) {
                var e = this.get(i);
                if (i.options.interrupt && i._last && i._last !== e) return t(i.elem).stop();
                var s = Math.round(i.now);
                e !== s && (t(i.elem)[i.prop](s), i._last = this.get(i))
            }
        }, s
    }), ! function(t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
    }(function(t) {
        "use strict";
        var i = window.Slick || {};
        i = function() {
            function i(i, s) {
                var o, n = this;
                n.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: t(i),
                    appendDots: t(i),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                    nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    centerMode: !1,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function(t, i) {
                        return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (i + 1) + "</button>"
                    },
                    dots: !1,
                    dotsClass: "slick-dots",
                    draggable: !0,
                    easing: "linear",
                    edgeFriction: .35,
                    fade: !1,
                    focusOnSelect: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    mobileFirst: !1,
                    pauseOnHover: !0,
                    pauseOnDotsHover: !1,
                    respondTo: "window",
                    responsive: null,
                    rows: 1,
                    rtl: !1,
                    slide: "",
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: !0,
                    swipeToSlide: !1,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    variableWidth: !1,
                    vertical: !1,
                    verticalSwiping: !1,
                    waitForAnimate: !0,
                    zIndex: 1e3
                }, n.initials = {
                    animating: !1,
                    dragging: !1,
                    autoPlayTimer: null,
                    currentDirection: 0,
                    currentLeft: null,
                    currentSlide: 0,
                    direction: 1,
                    $dots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    $nextArrow: null,
                    $prevArrow: null,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: !1,
                    unslicked: !1
                }, t.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.hidden = "hidden", n.paused = !1, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = t(i), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, o = t(i).data("slick") || {}, n.options = t.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, "undefined" != typeof document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = t.proxy(n.autoPlay, n), n.autoPlayClear = t.proxy(n.autoPlayClear, n), n.changeSlide = t.proxy(n.changeSlide, n), n.clickHandler = t.proxy(n.clickHandler, n), n.selectHandler = t.proxy(n.selectHandler, n), n.setPosition = t.proxy(n.setPosition, n), n.swipeHandler = t.proxy(n.swipeHandler, n), n.dragHandler = t.proxy(n.dragHandler, n), n.keyHandler = t.proxy(n.keyHandler, n), n.autoPlayIterator = t.proxy(n.autoPlayIterator, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0), n.checkResponsive(!0)
            }
            var e = 0;
            return i
        }(), i.prototype.addSlide = i.prototype.slickAdd = function(i, e, s) {
            var o = this;
            if ("boolean" == typeof e) s = e, e = null;
            else if (0 > e || e >= o.slideCount) return !1;
            o.unload(), "number" == typeof e ? 0 === e && 0 === o.$slides.length ? t(i).appendTo(o.$slideTrack) : s ? t(i).insertBefore(o.$slides.eq(e)) : t(i).insertAfter(o.$slides.eq(e)) : s === !0 ? t(i).prependTo(o.$slideTrack) : t(i).appendTo(o.$slideTrack), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slides.each(function(i, e) {
                t(e).attr("data-slick-index", i)
            }), o.$slidesCache = o.$slides, o.reinit()
        }, i.prototype.animateHeight = function() {
            var t = this;
            if (1 === t.options.slidesToShow && t.options.adaptiveHeight === !0 && t.options.vertical === !1) {
                var i = t.$slides.eq(t.currentSlide).outerHeight(!0);
                t.$list.animate({
                    height: i
                }, t.options.speed)
            }
        }, i.prototype.animateSlide = function(i, e) {
            var s = {},
                o = this;
            o.animateHeight(), o.options.rtl === !0 && o.options.vertical === !1 && (i = -i), o.transformsEnabled === !1 ? o.options.vertical === !1 ? o.$slideTrack.animate({
                left: i
            }, o.options.speed, o.options.easing, e) : o.$slideTrack.animate({
                top: i
            }, o.options.speed, o.options.easing, e) : o.cssTransitions === !1 ? (o.options.rtl === !0 && (o.currentLeft = -o.currentLeft), t({
                animStart: o.currentLeft
            }).animate({
                animStart: i
            }, {
                duration: o.options.speed,
                easing: o.options.easing,
                step: function(t) {
                    t = Math.ceil(t), o.options.vertical === !1 ? (s[o.animType] = "translate(" + t + "px, 0px)", o.$slideTrack.css(s)) : (s[o.animType] = "translate(0px," + t + "px)", o.$slideTrack.css(s))
                },
                complete: function() {
                    e && e.call()
                }
            })) : (o.applyTransition(), i = Math.ceil(i), s[o.animType] = o.options.vertical === !1 ? "translate3d(" + i + "px, 0px, 0px)" : "translate3d(0px," + i + "px, 0px)", o.$slideTrack.css(s), e && setTimeout(function() {
                o.disableTransition(), e.call()
            }, o.options.speed))
        }, i.prototype.asNavFor = function(i) {
            var e = this,
                s = e.options.asNavFor;
            s && null !== s && (s = t(s).not(e.$slider)), null !== s && "object" == typeof s && s.each(function() {
                var e = t(this).slick("getSlick");
                e.unslicked || e.slideHandler(i, !0)
            })
        }, i.prototype.applyTransition = function(t) {
            var i = this,
                e = {};
            e[i.transitionType] = i.options.fade === !1 ? i.transformType + " " + i.options.speed + "ms " + i.options.cssEase : "opacity " + i.options.speed + "ms " + i.options.cssEase, i.options.fade === !1 ? i.$slideTrack.css(e) : i.$slides.eq(t).css(e)
        }, i.prototype.autoPlay = function() {
            var t = this;
            t.autoPlayTimer && clearInterval(t.autoPlayTimer), t.slideCount > t.options.slidesToShow && t.paused !== !0 && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed))
        }, i.prototype.autoPlayClear = function() {
            var t = this;
            t.autoPlayTimer && clearInterval(t.autoPlayTimer)
        }, i.prototype.autoPlayIterator = function() {
            var t = this;
            t.options.infinite === !1 ? 1 === t.direction ? (t.currentSlide + 1 === t.slideCount - 1 && (t.direction = 0), t.slideHandler(t.currentSlide + t.options.slidesToScroll)) : (0 === t.currentSlide - 1 && (t.direction = 1), t.slideHandler(t.currentSlide - t.options.slidesToScroll)) : t.slideHandler(t.currentSlide + t.options.slidesToScroll)
        }, i.prototype.buildArrows = function() {
            var i = this;
            i.options.arrows === !0 && (i.$prevArrow = t(i.options.prevArrow).addClass("slick-arrow"), i.$nextArrow = t(i.options.nextArrow).addClass("slick-arrow"), i.slideCount > i.options.slidesToShow ? (i.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), i.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.prependTo(i.options.appendArrows), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.appendTo(i.options.appendArrows), i.options.infinite !== !0 && i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : i.$prevArrow.add(i.$nextArrow).addClass("slick-hidden").attr({
                "aria-disabled": "true",
                tabindex: "-1"
            }))
        }, i.prototype.buildDots = function() {
            var i, e, s = this;
            if (s.options.dots === !0 && s.slideCount > s.options.slidesToShow) {
                for (e = '<ul class="' + s.options.dotsClass + '">', i = 0; i <= s.getDotCount(); i += 1) e += "<li>" + s.options.customPaging.call(this, s, i) + "</li>";
                e += "</ul>", s.$dots = t(e).appendTo(s.options.appendDots), s.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
            }
        }, i.prototype.buildOut = function() {
            var i = this;
            i.$slides = i.$slider.children(i.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), i.slideCount = i.$slides.length, i.$slides.each(function(i, e) {
                t(e).attr("data-slick-index", i).data("originalStyling", t(e).attr("style") || "")
            }), i.$slidesCache = i.$slides, i.$slider.addClass("slick-slider"), i.$slideTrack = 0 === i.slideCount ? t('<div class="slick-track"/>').appendTo(i.$slider) : i.$slides.wrapAll('<div class="slick-track"/>').parent(), i.$list = i.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), i.$slideTrack.css("opacity", 0), (i.options.centerMode === !0 || i.options.swipeToSlide === !0) && (i.options.slidesToScroll = 1), t("img[data-lazy]", i.$slider).not("[src]").addClass("slick-loading"), i.setupInfinite(), i.buildArrows(), i.buildDots(), i.updateDots(), i.setSlideClasses("number" == typeof i.currentSlide ? i.currentSlide : 0), i.options.draggable === !0 && i.$list.addClass("draggable")
        }, i.prototype.buildRows = function() {
            var t, i, e, s, o, n, r, a = this;
            if (s = document.createDocumentFragment(), n = a.$slider.children(), a.options.rows > 1) {
                for (r = a.options.slidesPerRow * a.options.rows, o = Math.ceil(n.length / r), t = 0; o > t; t++) {
                    var l = document.createElement("div");
                    for (i = 0; i < a.options.rows; i++) {
                        var h = document.createElement("div");
                        for (e = 0; e < a.options.slidesPerRow; e++) {
                            var c = t * r + (i * a.options.slidesPerRow + e);
                            n.get(c) && h.appendChild(n.get(c))
                        }
                        l.appendChild(h)
                    }
                    s.appendChild(l)
                }
                a.$slider.html(s), a.$slider.children().children().children().css({
                    width: 100 / a.options.slidesPerRow + "%",
                    display: "inline-block"
                })
            }
        }, i.prototype.checkResponsive = function(i, e) {
            var s, o, n, r = this,
                a = !1,
                l = r.$slider.width(),
                h = window.innerWidth || t(window).width();
            if ("window" === r.respondTo ? n = h : "slider" === r.respondTo ? n = l : "min" === r.respondTo && (n = Math.min(h, l)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
                o = null;
                for (s in r.breakpoints) r.breakpoints.hasOwnProperty(s) && (r.originalSettings.mobileFirst === !1 ? n < r.breakpoints[s] && (o = r.breakpoints[s]) : n > r.breakpoints[s] && (o = r.breakpoints[s]));
                null !== o ? null !== r.activeBreakpoint ? (o !== r.activeBreakpoint || e) && (r.activeBreakpoint = o, "unslick" === r.breakpointSettings[o] ? r.unslick(o) : (r.options = t.extend({}, r.originalSettings, r.breakpointSettings[o]), i === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(i)), a = o) : (r.activeBreakpoint = o, "unslick" === r.breakpointSettings[o] ? r.unslick(o) : (r.options = t.extend({}, r.originalSettings, r.breakpointSettings[o]), i === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(i)), a = o) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, i === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(i), a = o), i || a === !1 || r.$slider.trigger("breakpoint", [r, a])
            }
        }, i.prototype.changeSlide = function(i, e) {
            var s, o, n, r = this,
                a = t(i.target);
            switch (a.is("a") && i.preventDefault(), a.is("li") || (a = a.closest("li")), n = 0 !== r.slideCount % r.options.slidesToScroll, s = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, i.data.message) {
                case "previous":
                    o = 0 === s ? r.options.slidesToScroll : r.options.slidesToShow - s, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - o, !1, e);
                    break;
                case "next":
                    o = 0 === s ? r.options.slidesToScroll : s, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + o, !1, e);
                    break;
                case "index":
                    var l = 0 === i.data.index ? 0 : i.data.index || a.index() * r.options.slidesToScroll;
                    r.slideHandler(r.checkNavigable(l), !1, e), a.children().trigger("focus");
                    break;
                default:
                    return
            }
        }, i.prototype.checkNavigable = function(t) {
            var i, e, s = this;
            if (i = s.getNavigableIndexes(), e = 0, t > i[i.length - 1]) t = i[i.length - 1];
            else
                for (var o in i) {
                    if (t < i[o]) {
                        t = e;
                        break
                    }
                    e = i[o]
                }
            return t
        }, i.prototype.cleanUpEvents = function() {
            var i = this;
            i.options.dots && null !== i.$dots && (t("li", i.$dots).off("click.slick", i.changeSlide), i.options.pauseOnDotsHover === !0 && i.options.autoplay === !0 && t("li", i.$dots).off("mouseenter.slick", t.proxy(i.setPaused, i, !0)).off("mouseleave.slick", t.proxy(i.setPaused, i, !1))), i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow && i.$prevArrow.off("click.slick", i.changeSlide), i.$nextArrow && i.$nextArrow.off("click.slick", i.changeSlide)), i.$list.off("touchstart.slick mousedown.slick", i.swipeHandler), i.$list.off("touchmove.slick mousemove.slick", i.swipeHandler), i.$list.off("touchend.slick mouseup.slick", i.swipeHandler), i.$list.off("touchcancel.slick mouseleave.slick", i.swipeHandler), i.$list.off("click.slick", i.clickHandler), t(document).off(i.visibilityChange, i.visibility), i.$list.off("mouseenter.slick", t.proxy(i.setPaused, i, !0)), i.$list.off("mouseleave.slick", t.proxy(i.setPaused, i, !1)), i.options.accessibility === !0 && i.$list.off("keydown.slick", i.keyHandler), i.options.focusOnSelect === !0 && t(i.$slideTrack).children().off("click.slick", i.selectHandler), t(window).off("orientationchange.slick.slick-" + i.instanceUid, i.orientationChange), t(window).off("resize.slick.slick-" + i.instanceUid, i.resize), t("[draggable!=true]", i.$slideTrack).off("dragstart", i.preventDefault), t(window).off("load.slick.slick-" + i.instanceUid, i.setPosition), t(document).off("ready.slick.slick-" + i.instanceUid, i.setPosition)
        }, i.prototype.cleanUpRows = function() {
            var t, i = this;
            i.options.rows > 1 && (t = i.$slides.children().children(), t.removeAttr("style"), i.$slider.html(t))
        }, i.prototype.clickHandler = function(t) {
            var i = this;
            i.shouldClick === !1 && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault())
        }, i.prototype.destroy = function(i) {
            var e = this;
            e.autoPlayClear(), e.touchObject = {}, e.cleanUpEvents(), t(".slick-cloned", e.$slider).detach(), e.$dots && e.$dots.remove(), e.options.arrows === !0 && (e.$prevArrow && e.$prevArrow.length && (e.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove()), e.$nextArrow && e.$nextArrow.length && (e.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove())), e.$slides && (e.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
                t(this).attr("style", t(this).data("originalStyling"))
            }), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.detach(), e.$list.detach(), e.$slider.append(e.$slides)), e.cleanUpRows(), e.$slider.removeClass("slick-slider"), e.$slider.removeClass("slick-initialized"), e.unslicked = !0, i || e.$slider.trigger("destroy", [e])
        }, i.prototype.disableTransition = function(t) {
            var i = this,
                e = {};
            e[i.transitionType] = "", i.options.fade === !1 ? i.$slideTrack.css(e) : i.$slides.eq(t).css(e)
        }, i.prototype.fadeSlide = function(t, i) {
            var e = this;
            e.cssTransitions === !1 ? (e.$slides.eq(t).css({
                zIndex: e.options.zIndex
            }), e.$slides.eq(t).animate({
                opacity: 1
            }, e.options.speed, e.options.easing, i)) : (e.applyTransition(t), e.$slides.eq(t).css({
                opacity: 1,
                zIndex: e.options.zIndex
            }), i && setTimeout(function() {
                e.disableTransition(t), i.call()
            }, e.options.speed))
        }, i.prototype.fadeSlideOut = function(t) {
            var i = this;
            i.cssTransitions === !1 ? i.$slides.eq(t).animate({
                opacity: 0,
                zIndex: i.options.zIndex - 2
            }, i.options.speed, i.options.easing) : (i.applyTransition(t), i.$slides.eq(t).css({
                opacity: 0,
                zIndex: i.options.zIndex - 2
            }))
        }, i.prototype.filterSlides = i.prototype.slickFilter = function(t) {
            var i = this;
            null !== t && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.filter(t).appendTo(i.$slideTrack), i.reinit())
        }, i.prototype.getCurrent = i.prototype.slickCurrentSlide = function() {
            var t = this;
            return t.currentSlide
        }, i.prototype.getDotCount = function() {
            var t = this,
                i = 0,
                e = 0,
                s = 0;
            if (t.options.infinite === !0)
                for (; i < t.slideCount;) ++s, i = e + t.options.slidesToShow, e += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
            else if (t.options.centerMode === !0) s = t.slideCount;
            else
                for (; i < t.slideCount;) ++s, i = e + t.options.slidesToShow, e += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
            return s - 1
        }, i.prototype.getLeft = function(t) {
            var i, e, s, o = this,
                n = 0;
            return o.slideOffset = 0, e = o.$slides.first().outerHeight(!0), o.options.infinite === !0 ? (o.slideCount > o.options.slidesToShow && (o.slideOffset = -1 * o.slideWidth * o.options.slidesToShow, n = -1 * e * o.options.slidesToShow), 0 !== o.slideCount % o.options.slidesToScroll && t + o.options.slidesToScroll > o.slideCount && o.slideCount > o.options.slidesToShow && (t > o.slideCount ? (o.slideOffset = -1 * (o.options.slidesToShow - (t - o.slideCount)) * o.slideWidth, n = -1 * (o.options.slidesToShow - (t - o.slideCount)) * e) : (o.slideOffset = -1 * o.slideCount % o.options.slidesToScroll * o.slideWidth, n = -1 * o.slideCount % o.options.slidesToScroll * e))) : t + o.options.slidesToShow > o.slideCount && (o.slideOffset = (t + o.options.slidesToShow - o.slideCount) * o.slideWidth, n = (t + o.options.slidesToShow - o.slideCount) * e), o.slideCount <= o.options.slidesToShow && (o.slideOffset = 0, n = 0), o.options.centerMode === !0 && o.options.infinite === !0 ? o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2) - o.slideWidth : o.options.centerMode === !0 && (o.slideOffset = 0, o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2)), i = o.options.vertical === !1 ? -1 * t * o.slideWidth + o.slideOffset : -1 * t * e + n, o.options.variableWidth === !0 && (s = o.slideCount <= o.options.slidesToShow || o.options.infinite === !1 ? o.$slideTrack.children(".slick-slide").eq(t) : o.$slideTrack.children(".slick-slide").eq(t + o.options.slidesToShow), i = s[0] ? -1 * s[0].offsetLeft : 0, o.options.centerMode === !0 && (s = o.options.infinite === !1 ? o.$slideTrack.children(".slick-slide").eq(t) : o.$slideTrack.children(".slick-slide").eq(t + o.options.slidesToShow + 1), i = s[0] ? -1 * s[0].offsetLeft : 0, i += (o.$list.width() - s.outerWidth()) / 2)), i
        }, i.prototype.getOption = i.prototype.slickGetOption = function(t) {
            var i = this;
            return i.options[t]
        }, i.prototype.getNavigableIndexes = function() {
            var t, i = this,
                e = 0,
                s = 0,
                o = [];
            for (i.options.infinite === !1 ? t = i.slideCount : (e = -1 * i.options.slidesToScroll, s = -1 * i.options.slidesToScroll, t = 2 * i.slideCount); t > e;) o.push(e), e = s + i.options.slidesToScroll, s += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
            return o
        }, i.prototype.getSlick = function() {
            return this
        }, i.prototype.getSlideCount = function() {
            var i, e, s, o = this;
            return s = o.options.centerMode === !0 ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, o.options.swipeToSlide === !0 ? (o.$slideTrack.find(".slick-slide").each(function(i, n) {
                return n.offsetLeft - s + t(n).outerWidth() / 2 > -1 * o.swipeLeft ? (e = n, !1) : void 0
            }), i = Math.abs(t(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
        }, i.prototype.goTo = i.prototype.slickGoTo = function(t, i) {
            var e = this;
            e.changeSlide({
                data: {
                    message: "index",
                    index: parseInt(t)
                }
            }, i)
        }, i.prototype.init = function(i) {
            var e = this;
            t(e.$slider).hasClass("slick-initialized") || (t(e.$slider).addClass("slick-initialized"), e.buildRows(), e.buildOut(), e.setProps(), e.startLoad(), e.loadSlider(), e.initializeEvents(), e.updateArrows(), e.updateDots()), i && e.$slider.trigger("init", [e]), e.options.accessibility === !0 && e.initADA()
        }, i.prototype.initArrowEvents = function() {
            var t = this;
            t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.on("click.slick", {
                message: "previous"
            }, t.changeSlide), t.$nextArrow.on("click.slick", {
                message: "next"
            }, t.changeSlide))
        }, i.prototype.initDotEvents = function() {
            var i = this;
            i.options.dots === !0 && i.slideCount > i.options.slidesToShow && t("li", i.$dots).on("click.slick", {
                message: "index"
            }, i.changeSlide), i.options.dots === !0 && i.options.pauseOnDotsHover === !0 && i.options.autoplay === !0 && t("li", i.$dots).on("mouseenter.slick", t.proxy(i.setPaused, i, !0)).on("mouseleave.slick", t.proxy(i.setPaused, i, !1))
        }, i.prototype.initializeEvents = function() {
            var i = this;
            i.initArrowEvents(), i.initDotEvents(), i.$list.on("touchstart.slick mousedown.slick", {
                action: "start"
            }, i.swipeHandler), i.$list.on("touchmove.slick mousemove.slick", {
                action: "move"
            }, i.swipeHandler), i.$list.on("touchend.slick mouseup.slick", {
                action: "end"
            }, i.swipeHandler), i.$list.on("touchcancel.slick mouseleave.slick", {
                action: "end"
            }, i.swipeHandler), i.$list.on("click.slick", i.clickHandler), t(document).on(i.visibilityChange, t.proxy(i.visibility, i)), i.$list.on("mouseenter.slick", t.proxy(i.setPaused, i, !0)), i.$list.on("mouseleave.slick", t.proxy(i.setPaused, i, !1)), i.options.accessibility === !0 && i.$list.on("keydown.slick", i.keyHandler), i.options.focusOnSelect === !0 && t(i.$slideTrack).children().on("click.slick", i.selectHandler), t(window).on("orientationchange.slick.slick-" + i.instanceUid, t.proxy(i.orientationChange, i)), t(window).on("resize.slick.slick-" + i.instanceUid, t.proxy(i.resize, i)), t("[draggable!=true]", i.$slideTrack).on("dragstart", i.preventDefault), t(window).on("load.slick.slick-" + i.instanceUid, i.setPosition), t(document).on("ready.slick.slick-" + i.instanceUid, i.setPosition)
        }, i.prototype.initUI = function() {
            var t = this;
            t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.show(), t.options.autoplay === !0 && t.autoPlay()
        }, i.prototype.keyHandler = function(t) {
            var i = this;
            t.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === t.keyCode && i.options.accessibility === !0 ? i.changeSlide({
                data: {
                    message: "previous"
                }
            }) : 39 === t.keyCode && i.options.accessibility === !0 && i.changeSlide({
                data: {
                    message: "next"
                }
            }))
        }, i.prototype.lazyLoad = function() {
            function i(i) {
                t("img[data-lazy]", i).each(function() {
                    var i = t(this),
                        e = t(this).attr("data-lazy"),
                        s = document.createElement("img");
                    s.onload = function() {
                        i.animate({
                            opacity: 0
                        }, 100, function() {
                            i.attr("src", e).animate({
                                opacity: 1
                            }, 200, function() {
                                i.removeAttr("data-lazy").removeClass("slick-loading")
                            })
                        })
                    }, s.src = e
                })
            }
            var e, s, o, n, r = this;
            r.options.centerMode === !0 ? r.options.infinite === !0 ? (o = r.currentSlide + (r.options.slidesToShow / 2 + 1), n = o + r.options.slidesToShow + 2) : (o = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)), n = 2 + (r.options.slidesToShow / 2 + 1) + r.currentSlide) : (o = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide, n = o + r.options.slidesToShow, r.options.fade === !0 && (o > 0 && o--, n <= r.slideCount && n++)), e = r.$slider.find(".slick-slide").slice(o, n), i(e), r.slideCount <= r.options.slidesToShow ? (s = r.$slider.find(".slick-slide"), i(s)) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? (s = r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow), i(s)) : 0 === r.currentSlide && (s = r.$slider.find(".slick-cloned").slice(-1 * r.options.slidesToShow), i(s))
        }, i.prototype.loadSlider = function() {
            var t = this;
            t.setPosition(), t.$slideTrack.css({
                opacity: 1
            }), t.$slider.removeClass("slick-loading"), t.initUI(), "progressive" === t.options.lazyLoad && t.progressiveLazyLoad()
        }, i.prototype.next = i.prototype.slickNext = function() {
            var t = this;
            t.changeSlide({
                data: {
                    message: "next"
                }
            })
        }, i.prototype.orientationChange = function() {
            var t = this;
            t.checkResponsive(), t.setPosition()
        }, i.prototype.pause = i.prototype.slickPause = function() {
            var t = this;
            t.autoPlayClear(), t.paused = !0
        }, i.prototype.play = i.prototype.slickPlay = function() {
            var t = this;
            t.paused = !1, t.autoPlay()
        }, i.prototype.postSlide = function(t) {
            var i = this;
            i.$slider.trigger("afterChange", [i, t]), i.animating = !1, i.setPosition(), i.swipeLeft = null, i.options.autoplay === !0 && i.paused === !1 && i.autoPlay(), i.options.accessibility === !0 && i.initADA()
        }, i.prototype.prev = i.prototype.slickPrev = function() {
            var t = this;
            t.changeSlide({
                data: {
                    message: "previous"
                }
            })
        }, i.prototype.preventDefault = function(t) {
            t.preventDefault()
        }, i.prototype.progressiveLazyLoad = function() {
            var i, e, s = this;
            i = t("img[data-lazy]", s.$slider).length, i > 0 && (e = t("img[data-lazy]", s.$slider).first(), e.attr("src", e.attr("data-lazy")).removeClass("slick-loading").load(function() {
                e.removeAttr("data-lazy"), s.progressiveLazyLoad(), s.options.adaptiveHeight === !0 && s.setPosition()
            }).error(function() {
                e.removeAttr("data-lazy"), s.progressiveLazyLoad()
            }))
        }, i.prototype.refresh = function(i) {
            var e = this,
                s = e.currentSlide;
            e.destroy(!0), t.extend(e, e.initials, {
                currentSlide: s
            }), e.init(), i || e.changeSlide({
                data: {
                    message: "index",
                    index: s
                }
            }, !1)
        }, i.prototype.registerBreakpoints = function() {
            var i, e, s, o = this,
                n = o.options.responsive || null;
            if ("array" === t.type(n) && n.length) {
                o.respondTo = o.options.respondTo || "window";
                for (i in n)
                    if (s = o.breakpoints.length - 1, e = n[i].breakpoint, n.hasOwnProperty(i)) {
                        for (; s >= 0;) o.breakpoints[s] && o.breakpoints[s] === e && o.breakpoints.splice(s, 1), s--;
                        o.breakpoints.push(e), o.breakpointSettings[e] = n[i].settings
                    }
                o.breakpoints.sort(function(t, i) {
                    return o.options.mobileFirst ? t - i : i - t
                })
            }
        }, i.prototype.reinit = function() {
            var i = this;
            i.$slides = i.$slideTrack.children(i.options.slide).addClass("slick-slide"), i.slideCount = i.$slides.length, i.currentSlide >= i.slideCount && 0 !== i.currentSlide && (i.currentSlide = i.currentSlide - i.options.slidesToScroll), i.slideCount <= i.options.slidesToShow && (i.currentSlide = 0), i.registerBreakpoints(), i.setProps(), i.setupInfinite(), i.buildArrows(), i.updateArrows(), i.initArrowEvents(), i.buildDots(), i.updateDots(), i.initDotEvents(), i.checkResponsive(!1, !0), i.options.focusOnSelect === !0 && t(i.$slideTrack).children().on("click.slick", i.selectHandler), i.setSlideClasses(0), i.setPosition(), i.$slider.trigger("reInit", [i]), i.options.autoplay === !0 && i.focusHandler()
        }, i.prototype.resize = function() {
            var i = this;
            t(window).width() !== i.windowWidth && (clearTimeout(i.windowDelay), i.windowDelay = window.setTimeout(function() {
                i.windowWidth = t(window).width(), i.checkResponsive(), i.unslicked || i.setPosition()
            }, 50))
        }, i.prototype.removeSlide = i.prototype.slickRemove = function(t, i, e) {
            var s = this;
            return "boolean" == typeof t ? (i = t, t = i === !0 ? 0 : s.slideCount - 1) : t = i === !0 ? --t : t, !(s.slideCount < 1 || 0 > t || t > s.slideCount - 1) && (s.unload(), e === !0 ? s.$slideTrack.children().remove() : s.$slideTrack.children(this.options.slide).eq(t).remove(), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slidesCache = s.$slides, void s.reinit())
        }, i.prototype.setCSS = function(t) {
            var i, e, s = this,
                o = {};
            s.options.rtl === !0 && (t = -t), i = "left" == s.positionProp ? Math.ceil(t) + "px" : "0px", e = "top" == s.positionProp ? Math.ceil(t) + "px" : "0px", o[s.positionProp] = t, s.transformsEnabled === !1 ? s.$slideTrack.css(o) : (o = {}, s.cssTransitions === !1 ? (o[s.animType] = "translate(" + i + ", " + e + ")", s.$slideTrack.css(o)) : (o[s.animType] = "translate3d(" + i + ", " + e + ", 0px)", s.$slideTrack.css(o)))
        }, i.prototype.setDimensions = function() {
            var t = this;
            t.options.vertical === !1 ? t.options.centerMode === !0 && t.$list.css({
                padding: "0px " + t.options.centerPadding
            }) : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow), t.options.centerMode === !0 && t.$list.css({
                padding: t.options.centerPadding + " 0px"
            })), t.listWidth = t.$list.width(), t.listHeight = t.$list.height(), t.options.vertical === !1 && t.options.variableWidth === !1 ? (t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow), t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length))) : t.options.variableWidth === !0 ? t.$slideTrack.width(5e3 * t.slideCount) : (t.slideWidth = Math.ceil(t.listWidth),
                t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
            var i = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
            t.options.variableWidth === !1 && t.$slideTrack.children(".slick-slide").width(t.slideWidth - i)
        }, i.prototype.setFade = function() {
            var i, e = this;
            e.$slides.each(function(s, o) {
                i = -1 * e.slideWidth * s, e.options.rtl === !0 ? t(o).css({
                    position: "relative",
                    right: i,
                    top: 0,
                    zIndex: e.options.zIndex - 2,
                    opacity: 0
                }) : t(o).css({
                    position: "relative",
                    left: i,
                    top: 0,
                    zIndex: e.options.zIndex - 2,
                    opacity: 0
                })
            }), e.$slides.eq(e.currentSlide).css({
                zIndex: e.options.zIndex - 1,
                opacity: 1
            })
        }, i.prototype.setHeight = function() {
            var t = this;
            if (1 === t.options.slidesToShow && t.options.adaptiveHeight === !0 && t.options.vertical === !1) {
                var i = t.$slides.eq(t.currentSlide).outerHeight(!0);
                t.$list.css("height", i)
            }
        }, i.prototype.setOption = i.prototype.slickSetOption = function(i, e, s) {
            var o, n, r = this;
            if ("responsive" === i && "array" === t.type(e))
                for (n in e)
                    if ("array" !== t.type(r.options.responsive)) r.options.responsive = [e[n]];
                    else {
                        for (o = r.options.responsive.length - 1; o >= 0;) r.options.responsive[o].breakpoint === e[n].breakpoint && r.options.responsive.splice(o, 1), o--;
                        r.options.responsive.push(e[n])
                    } else r.options[i] = e;
            s === !0 && (r.unload(), r.reinit())
        }, i.prototype.setPosition = function() {
            var t = this;
            t.setDimensions(), t.setHeight(), t.options.fade === !1 ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), t.$slider.trigger("setPosition", [t])
        }, i.prototype.setProps = function() {
            var t = this,
                i = document.body.style;
            t.positionProp = t.options.vertical === !0 ? "top" : "left", "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"), (void 0 !== i.WebkitTransition || void 0 !== i.MozTransition || void 0 !== i.msTransition) && t.options.useCSS === !0 && (t.cssTransitions = !0), t.options.fade && ("number" == typeof t.options.zIndex ? t.options.zIndex < 3 && (t.options.zIndex = 3) : t.options.zIndex = t.defaults.zIndex), void 0 !== i.OTransform && (t.animType = "OTransform", t.transformType = "-o-transform", t.transitionType = "OTransition", void 0 === i.perspectiveProperty && void 0 === i.webkitPerspective && (t.animType = !1)), void 0 !== i.MozTransform && (t.animType = "MozTransform", t.transformType = "-moz-transform", t.transitionType = "MozTransition", void 0 === i.perspectiveProperty && void 0 === i.MozPerspective && (t.animType = !1)), void 0 !== i.webkitTransform && (t.animType = "webkitTransform", t.transformType = "-webkit-transform", t.transitionType = "webkitTransition", void 0 === i.perspectiveProperty && void 0 === i.webkitPerspective && (t.animType = !1)), void 0 !== i.msTransform && (t.animType = "msTransform", t.transformType = "-ms-transform", t.transitionType = "msTransition", void 0 === i.msTransform && (t.animType = !1)), void 0 !== i.transform && t.animType !== !1 && (t.animType = "transform", t.transformType = "transform", t.transitionType = "transition"), t.transformsEnabled = null !== t.animType && t.animType !== !1
        }, i.prototype.setSlideClasses = function(t) {
            var i, e, s, o, n = this;
            e = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(t).addClass("slick-current"), n.options.centerMode === !0 ? (i = Math.floor(n.options.slidesToShow / 2), n.options.infinite === !0 && (t >= i && t <= n.slideCount - 1 - i ? n.$slides.slice(t - i, t + i + 1).addClass("slick-active").attr("aria-hidden", "false") : (s = n.options.slidesToShow + t, e.slice(s - i + 1, s + i + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === t ? e.eq(e.length - 1 - n.options.slidesToShow).addClass("slick-center") : t === n.slideCount - 1 && e.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(t).addClass("slick-center")) : t >= 0 && t <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(t, t + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : e.length <= n.options.slidesToShow ? e.addClass("slick-active").attr("aria-hidden", "false") : (o = n.slideCount % n.options.slidesToShow, s = n.options.infinite === !0 ? n.options.slidesToShow + t : t, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - t < n.options.slidesToShow ? e.slice(s - (n.options.slidesToShow - o), s + o).addClass("slick-active").attr("aria-hidden", "false") : e.slice(s, s + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === n.options.lazyLoad && n.lazyLoad()
        }, i.prototype.setupInfinite = function() {
            var i, e, s, o = this;
            if (o.options.fade === !0 && (o.options.centerMode = !1), o.options.infinite === !0 && o.options.fade === !1 && (e = null, o.slideCount > o.options.slidesToShow)) {
                for (s = o.options.centerMode === !0 ? o.options.slidesToShow + 1 : o.options.slidesToShow, i = o.slideCount; i > o.slideCount - s; i -= 1) e = i - 1, t(o.$slides[e]).clone(!0).attr("id", "").attr("data-slick-index", e - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
                for (i = 0; s > i; i += 1) e = i, t(o.$slides[e]).clone(!0).attr("id", "").attr("data-slick-index", e + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
                o.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                    t(this).attr("id", "")
                })
            }
        }, i.prototype.setPaused = function(t) {
            var i = this;
            i.options.autoplay === !0 && i.options.pauseOnHover === !0 && (i.paused = t, t ? i.autoPlayClear() : i.autoPlay())
        }, i.prototype.selectHandler = function(i) {
            var e = this,
                s = t(i.target).is(".slick-slide") ? t(i.target) : t(i.target).parents(".slick-slide"),
                o = parseInt(s.attr("data-slick-index"));
            return o || (o = 0), e.slideCount <= e.options.slidesToShow ? (e.setSlideClasses(o), void e.asNavFor(o)) : void e.slideHandler(o)
        }, i.prototype.slideHandler = function(t, i, e) {
            var s, o, n, r, a = null,
                l = this;
            return i = i || !1, l.animating === !0 && l.options.waitForAnimate === !0 || l.options.fade === !0 && l.currentSlide === t || l.slideCount <= l.options.slidesToShow ? void 0 : (i === !1 && l.asNavFor(t), s = t, a = l.getLeft(s), r = l.getLeft(l.currentSlide), l.currentLeft = null === l.swipeLeft ? r : l.swipeLeft, l.options.infinite === !1 && l.options.centerMode === !1 && (0 > t || t > l.getDotCount() * l.options.slidesToScroll) ? void(l.options.fade === !1 && (s = l.currentSlide, e !== !0 ? l.animateSlide(r, function() {
                l.postSlide(s)
            }) : l.postSlide(s))) : l.options.infinite === !1 && l.options.centerMode === !0 && (0 > t || t > l.slideCount - l.options.slidesToScroll) ? void(l.options.fade === !1 && (s = l.currentSlide, e !== !0 ? l.animateSlide(r, function() {
                l.postSlide(s)
            }) : l.postSlide(s))) : (l.options.autoplay === !0 && clearInterval(l.autoPlayTimer), o = 0 > s ? 0 !== l.slideCount % l.options.slidesToScroll ? l.slideCount - l.slideCount % l.options.slidesToScroll : l.slideCount + s : s >= l.slideCount ? 0 !== l.slideCount % l.options.slidesToScroll ? 0 : s - l.slideCount : s, l.animating = !0, l.$slider.trigger("beforeChange", [l, l.currentSlide, o]), n = l.currentSlide, l.currentSlide = o, l.setSlideClasses(l.currentSlide), l.updateDots(), l.updateArrows(), l.options.fade === !0 ? (e !== !0 ? (l.fadeSlideOut(n), l.fadeSlide(o, function() {
                l.postSlide(o)
            })) : l.postSlide(o), void l.animateHeight()) : void(e !== !0 ? l.animateSlide(a, function() {
                l.postSlide(o)
            }) : l.postSlide(o))))
        }, i.prototype.startLoad = function() {
            var t = this;
            t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.hide(), t.$slider.addClass("slick-loading")
        }, i.prototype.swipeDirection = function() {
            var t, i, e, s, o = this;
            return t = o.touchObject.startX - o.touchObject.curX, i = o.touchObject.startY - o.touchObject.curY, e = Math.atan2(i, t), s = Math.round(180 * e / Math.PI), 0 > s && (s = 360 - Math.abs(s)), 45 >= s && s >= 0 ? o.options.rtl === !1 ? "left" : "right" : 360 >= s && s >= 315 ? o.options.rtl === !1 ? "left" : "right" : s >= 135 && 225 >= s ? o.options.rtl === !1 ? "right" : "left" : o.options.verticalSwiping === !0 ? s >= 35 && 135 >= s ? "left" : "right" : "vertical"
        }, i.prototype.swipeEnd = function() {
            var t, i = this;
            if (i.dragging = !1, i.shouldClick = !(i.touchObject.swipeLength > 10), void 0 === i.touchObject.curX) return !1;
            if (i.touchObject.edgeHit === !0 && i.$slider.trigger("edge", [i, i.swipeDirection()]), i.touchObject.swipeLength >= i.touchObject.minSwipe) switch (i.swipeDirection()) {
                case "left":
                    t = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide + i.getSlideCount()) : i.currentSlide + i.getSlideCount(), i.slideHandler(t), i.currentDirection = 0, i.touchObject = {}, i.$slider.trigger("swipe", [i, "left"]);
                    break;
                case "right":
                    t = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide - i.getSlideCount()) : i.currentSlide - i.getSlideCount(), i.slideHandler(t), i.currentDirection = 1, i.touchObject = {}, i.$slider.trigger("swipe", [i, "right"])
            } else i.touchObject.startX !== i.touchObject.curX && (i.slideHandler(i.currentSlide), i.touchObject = {})
        }, i.prototype.swipeHandler = function(t) {
            var i = this;
            if (!(i.options.swipe === !1 || "ontouchend" in document && i.options.swipe === !1 || i.options.draggable === !1 && -1 !== t.type.indexOf("mouse"))) switch (i.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1, i.touchObject.minSwipe = i.listWidth / i.options.touchThreshold, i.options.verticalSwiping === !0 && (i.touchObject.minSwipe = i.listHeight / i.options.touchThreshold), t.data.action) {
                case "start":
                    i.swipeStart(t);
                    break;
                case "move":
                    i.swipeMove(t);
                    break;
                case "end":
                    i.swipeEnd(t)
            }
        }, i.prototype.swipeMove = function(t) {
            var i, e, s, o, n, r = this;
            return n = void 0 !== t.originalEvent ? t.originalEvent.touches : null, !(!r.dragging || n && 1 !== n.length) && (i = r.getLeft(r.currentSlide), r.touchObject.curX = void 0 !== n ? n[0].pageX : t.clientX, r.touchObject.curY = void 0 !== n ? n[0].pageY : t.clientY, r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curX - r.touchObject.startX, 2))), r.options.verticalSwiping === !0 && (r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curY - r.touchObject.startY, 2)))), e = r.swipeDirection(), "vertical" !== e ? (void 0 !== t.originalEvent && r.touchObject.swipeLength > 4 && t.preventDefault(), o = (r.options.rtl === !1 ? 1 : -1) * (r.touchObject.curX > r.touchObject.startX ? 1 : -1), r.options.verticalSwiping === !0 && (o = r.touchObject.curY > r.touchObject.startY ? 1 : -1), s = r.touchObject.swipeLength, r.touchObject.edgeHit = !1, r.options.infinite === !1 && (0 === r.currentSlide && "right" === e || r.currentSlide >= r.getDotCount() && "left" === e) && (s = r.touchObject.swipeLength * r.options.edgeFriction, r.touchObject.edgeHit = !0), r.swipeLeft = r.options.vertical === !1 ? i + s * o : i + s * (r.$list.height() / r.listWidth) * o, r.options.verticalSwiping === !0 && (r.swipeLeft = i + s * o), r.options.fade !== !0 && r.options.touchMove !== !1 && (r.animating === !0 ? (r.swipeLeft = null, !1) : void r.setCSS(r.swipeLeft))) : void 0)
        }, i.prototype.swipeStart = function(t) {
            var i, e = this;
            return 1 !== e.touchObject.fingerCount || e.slideCount <= e.options.slidesToShow ? (e.touchObject = {}, !1) : (void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (i = t.originalEvent.touches[0]), e.touchObject.startX = e.touchObject.curX = void 0 !== i ? i.pageX : t.clientX, e.touchObject.startY = e.touchObject.curY = void 0 !== i ? i.pageY : t.clientY, void(e.dragging = !0))
        }, i.prototype.unfilterSlides = i.prototype.slickUnfilter = function() {
            var t = this;
            null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit())
        }, i.prototype.unload = function() {
            var i = this;
            t(".slick-cloned", i.$slider).remove(), i.$dots && i.$dots.remove(), i.$prevArrow && i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove(), i.$nextArrow && i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove(), i.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
        }, i.prototype.unslick = function(t) {
            var i = this;
            i.$slider.trigger("unslick", [i, t]), i.destroy()
        }, i.prototype.updateArrows = function() {
            var t, i = this;
            t = Math.floor(i.options.slidesToShow / 2), i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && i.options.centerMode === !1 ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && i.options.centerMode === !0 && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
        }, i.prototype.updateDots = function() {
            var t = this;
            null !== t.$dots && (t.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
        }, i.prototype.visibility = function() {
            var t = this;
            document[t.hidden] ? (t.paused = !0, t.autoPlayClear()) : t.options.autoplay === !0 && (t.paused = !1, t.autoPlay())
        }, i.prototype.initADA = function() {
            var i = this;
            i.$slides.add(i.$slideTrack.find(".slick-cloned")).attr({
                "aria-hidden": "true",
                tabindex: "-1"
            }).find("a, input, button, select").attr({
                tabindex: "-1"
            }), i.$slideTrack.attr("role", "listbox"), i.$slides.not(i.$slideTrack.find(".slick-cloned")).each(function(e) {
                t(this).attr({
                    role: "option",
                    "aria-describedby": "slick-slide" + i.instanceUid + e
                })
            }), null !== i.$dots && i.$dots.attr("role", "tablist").find("li").each(function(e) {
                t(this).attr({
                    role: "presentation",
                    "aria-selected": "false",
                    "aria-controls": "navigation" + i.instanceUid + e,
                    id: "slick-slide" + i.instanceUid + e
                })
            }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), i.activateADA()
        }, i.prototype.activateADA = function() {
            var t = this,
                i = t.$slider.find("*").is(":focus");
            t.$slideTrack.find(".slick-active").attr({
                "aria-hidden": "false",
                tabindex: "0"
            }).find("a, input, button, select").attr({
                tabindex: "0"
            }), i && t.$slideTrack.find(".slick-active").focus()
        }, i.prototype.focusHandler = function() {
            var i = this;
            i.$slider.on("focus.slick blur.slick", "*", function(e) {
                e.stopImmediatePropagation();
                var s = t(this);
                setTimeout(function() {
                    i.isPlay && (s.is(":focus") ? (i.autoPlayClear(), i.paused = !0) : (i.paused = !1, i.autoPlay()))
                }, 0)
            })
        }, t.fn.slick = function() {
            var t, e = this,
                s = arguments[0],
                o = Array.prototype.slice.call(arguments, 1),
                n = e.length,
                r = 0;
            for (r; n > r; r++)
                if ("object" == typeof s || "undefined" == typeof s ? e[r].slick = new i(e[r], s) : t = e[r].slick[s].apply(e[r].slick, o), "undefined" != typeof t) return t;
            return e
        }
    }), void 0 === wwctrials) var wwctrials = {};
if (wwctrials.tracking = function(t) {
        var i = {
            init: function() {
                this.eventTracking()
            },
            eventTracking: function() {
                t("._gt").on("click", function() {
                    var i = t(this),
                        e = i.data("category"),
                        s = i.data("action"),
                        o = i.data("label");
                    wwctrials.tracking.trackEvent(e, s, o)
                }), t(".library-gate-box .btn").on("click", function() {
                    wwctrials.tracking.trackEvent("Research Library", "Submit", "Gated Content Submit")
                }), t(".library-list").on("click", ".read-more", function() {
                    var i = t(this),
                        e = i.closest(".library-item").find(".library-title").text(),
                        s = e.split(" "),
                        o = "";
                    if (s.length <= 5) o = e + " ";
                    else
                        for (var n = 0; n < 5; n++) o += s[n] + " ";
                    o += "- Read More", wwctrials.tracking.trackEvent("Research Library", "Read More", o)
                }), t('.investigator-form input[type="submit"]').click(function() {
                    wwctrials.tracking.trackEvent("Investigator", "Submit", "Investigator Form-Submit")
                });
                var i = t(".footer");
                i.find(".fa-facebook").on("click", function() {
                    wwctrials.tracking.trackEvent("Social Links", "Click", "Facebook")
                }), i.find(".fa-twitter").on("click", function() {
                    wwctrials.tracking.trackEvent("Social Links", "Click", "Twitter")
                }), i.find(".fa-linkedin").on("click", function() {
                    wwctrials.tracking.trackEvent("Social Links", "Click", "LinkedIn")
                })
            },
            trackContactSubmit: function() {
                wwctrials.tracking.trackEvent("Contact Us", "Submit", "Contact Form-Submit")
            },
            trackEvent: function(t, i, e) {
                "function" == typeof ga ? ga("send", "event", t, i, e) : console.log("Unable to log event: \nCategory: " + t + "\nAction: " + i + "\nLabel: " + e)
            }
        };
        return i
    }(jQuery), jQuery(document).ready(function() {
        wwctrials.tracking.init()
    }), void 0 === wwctrials) var wwctrials = {};
if (wwctrials.main = function(t) {
        var i = t("body").is(".EditMode"),
            e = t("body").is(".DesignMode"),
            s = {
                init: function() {
                    this.externalLinks(), this.heroArrow(), this.mobileNav(), this.clickFirstLink(), this.parallax(), this.homeTherapeuticAreas(), this.scrollable(), this.tabSelector(), this.regionalMessage(), this.videoModal(), this.librarySignupModal(), this.collapsibleBox(), this.searchToggle(), this.imageSlider(), this.contactUs(), this.methodsSearch()
                },
                externalLinks: function() {
                    t('a[href^="http"]').each(function() {
                        this.href.indexOf(location.host) == -1 && t(this).attr("target", "_blank")
                    })
                },
                collapsibleBox: function() {
                    var s = t(".collapsible-box-webpart");
                    if (s.length > 0)
                        if (i || e) {
                            var o = s.find(".collapsible-heading");
                            o.addClass("active"), o.next(".collapsible-content").show()
                        } else s.find(".collapsible-heading").on("click", function() {
                            var i = t(this);
                            i.toggleClass("active"), i.next(".collapsible-content").slideToggle()
                        })
                },
                searchToggle: function() {
                    t(".header-search").length > 0 && (t(".search-toggle").on("click", function() {
                        var i = t(this),
                            e = t(".header-search");
                        i.hasClass("active") ? (i.removeClass("active"), e.fadeOut()) : (i.addClass("active"), e.fadeIn())
                    }), t(".search-close").on("click", function() {
                        var i = t(".header-search"),
                            e = t(".search-toggle");
                        e.removeClass("active"), i.fadeOut()
                    }))
                },
                heroArrow: function() {
                    var i = t(".hero-image-webpart, .hero-video-webpart"),
                        e = i.find(".down-arrow");
                    e.on("click", function() {
                        t("html, body").animate({
                            scrollTop: i.offset().top + i.height()
                        }, 500)
                    })
                },
                parallax: function() {
                    if (console.log("paralax activated"), s.isMobile.any()) return void t(".hero-image-webpart").each(function(i, e) {
                        t(this).find(".img-bg").css("background-position", "50% 0"), t(this).find(".img-bg").css("background-attachment", "scroll")
                    });
                    var i = [],
                        e = function() {
                            i = [], t(".hero-image-webpart").each(function(e, s) {
                                e > 0 ? (t(this).find(".img-bg").css("background-position", "50% 0"), t(this).find(".img-bg").css("background-attachment", "scroll")) : i.push({
                                    startingPos: t(s).offset().top,
                                    elem: t(s)
                                })
                            })
                        };
                    e(), t(window).on("resize", function() {
                        e(), t(window).trigger("scroll")
                    }), t(window).on("scroll", function() {
                        t(i).each(function(i, e) {
                            var s = e.startingPos - t(window).scrollTop();
                            s < 0 ? e.elem.find(".img-bg").css("background-position", "50% " + s / 2 + "px") : e.elem.find(".img-bg").css("background-position", "50% " + s + "px")
                        })
                    }), t(window).trigger("scroll")
                },
                mobileNav: function() {
                    var i = t(".nav-icon"),
                        e = t(".mobile-nav");
                    if (e.is(":visible")) {
                        i.on("click", function() {
                            t(this).is(".open") ? e.removeClass("open") : e.addClass("open")
                        });
                        var s = e.find(".root-nav"),
                            o = e.find(".sub-nav");
                        o.each(function() {
                            var i = t(this),
                                s = i.siblings("a");
                            s.data("subnav", i), s.addClass("has-children"), i.remove().appendTo(e)
                        }), t(window).on("load", function() {
                            new IScroll(s.get(0), {
                                click: !0
                            }), o.each(function() {
                                new IScroll(this, {
                                    click: !0
                                })
                            })
                        }), e.on("click", "a", function(i) {
                            var s = t(this),
                                n = s.data("subnav");
                            void 0 != n ? (i.preventDefault(), n.addClass("open")) : (e.removeClass("open"), o.removeCLass("open"))
                        }), e.on("click", ".back", function(i) {
                            var e = t(this);
                            e.closest(".sub-nav").removeClass("open")
                        })
                    } else i.on("click", function() {
                        var e = t(".primary-nav");
                        t(this).is(".open") ? (e.removeClass("open"), i.removeClass("open")) : (e.addClass("open"), i.addClass("open"))
                    })
                },
                clickFirstLink: function() {
                    i || t(".click-first-link").on("click", function() {
                        var i = t(this).find("a[href]").attr("href");
                        void 0 != i && "" != i && (window.location = i)
                    })
                },
                homeTherapeuticAreas: function() {
                    var i = t(".home-therapeutic-icons-wrapper"),
                        e = t(".home-therapeutic-icon"),
                        s = Math.max(e.length, 1);
                    i.on("click", ".next, .previous", function(i) {
                        var o, n = t(i.target),
                            r = e.index(e.filter(".active").get(0));
                        o = n.is(".next") ? (r + 1) % s : 0 == r ? s - 1 : r - 1, e.eq(r).removeClass("active"), e.eq(o).addClass("active")
                    })
                },
                scrollable: function() {
                    t(window).load(function() {
                        var i = t(".scroll-wrapper");
                        i.each(function(i, e) {
                            var s = t(e),
                                o = s.find(".scroller");
                            1 == o.length && (s.height(o.height()), new IScroll(e, {
                                eventPassthrough: !0,
                                scrollX: !0,
                                scrollY: !1
                            }))
                        })
                    })
                },
                tabSelector: function() {
                    var i = t(".tabs");
                    i.on("click", ".tab", function(i) {
                        var e = t(this),
                            s = e.closest(".tabs"),
                            o = s.find(".tab");
                        o.length > 1 && 1 == o.filter(":visible").length ? (i.preventDefault(), s.addClass("overlay")) : s.is(".overlay") && e.is(".selected") && (i.preventDefault(), s.removeClass("overlay"))
                    })
                },
                regionalMessage: function() {
                    var i = t(".regional-message-webpart");
                    i.find(".close-btn").on("click", function() {
                        i.addClass("hide"), s.setCookie("rgnmsg", "1", 365)
                    })
                },
                videoModal: function() {
                    var i = t(".video-modal"),
                        e = i.find(".video-iframe"),
                        o = i.find(".modal-title");
                    i.on("show.bs.modal", function(i) {
                        var n = t(i.relatedTarget),
                            r = n.data("title");
                        o.text(r);
                        var a = s.convertToYouTubeEmbedUrl(n.attr("href"));
                        e.attr("src", a)
                    }), i.on("hide.bs.modal", function() {
                        e.attr("src", "")
                    })
                },
                librarySignupModal: function() {
                    var i = t(".library-signup-modal"),
                        e = i.find(".feature-signup-success a");
                    if (i.length > 0) {
                        var o = t(".library-featured a, .featured-resource a");
                        o.on("click", function(o) {
                            var n = t(this);
                            e.attr("href", n.attr("href"));
                            var r = s.getCookie("libsignup");
                            "1" != r && (o.preventDefault(), i.modal("show"))
                        })
                    }
                },
                imageSlider: function() {
                    t(".image-slider-webpart").each(function() {
                        var i = t(this);
                        i.slick({
                            arrows: !0,
                            dots: !0,
                            autoplay: !0,
                            autoplaySpeed: 12e3,
                            slide: ".image-slide",
                            prevArrow: ".prev-slide",
                            nextArrow: ".next-slide"
                        })
                    })
                },
                contactUs: function() {
                    var i = t(".contact-us-webpart"),
                        e = null;
                    if (i.length > 0) {
                        var s = i.find(".contact-options");
                        s.on("change", function() {
                            var t = i.find("." + this.value);
                            t.length > 0 && (null != e && e.hide(), t.show(), e = t)
                        })
                    }
                },
                methodsSearch: function() {
                    var i = t(".methods-search-webpart"),
                        e = i.find(".textbox"),
                        s = i.find("input[type=submit]");
                    e.on("keypress", function(t) {
                        if (13 === t.keyCode) return t.preventDefault(), s.click(), !1
                    })
                },
                convertToYouTubeEmbedUrl: function(t) {
                    var i = /v=([^&]+)/,
                        e = i.exec(t);
                    return e.length > 1 ? "https://www.youtube.com/embed/" + e[1] + "?autoplay=1&autohide=0" : ""
                },
                getCookie: function(t) {
                    for (var i = t + "=", e = document.cookie.split(";"), s = 0; s < e.length; s++) {
                        for (var o = e[s];
                            " " == o.charAt(0);) o = o.substring(1);
                        if (0 == o.indexOf(i)) return o.substring(i.length, o.length)
                    }
                    return ""
                },
                setCookie: function(t, i, e) {
                    var s = new Date;
                    s.setTime(s.getTime() + 24 * e * 60 * 60 * 1e3);
                    var o = "expires=" + s.toUTCString();
                    document.cookie = t + "=" + i + "; " + o
                },
                isMobile: {
                    android: function() {
                        return !!navigator.userAgent.match(/Android/i)
                    },
                    blackBerry: function() {
                        return !!navigator.userAgent.match(/BlackBerry/i)
                    },
                    iOS: function() {
                        return !!navigator.userAgent.match(/iPhone|iPad|iPod/i)
                    },
                    iOS7: function() {
                        if (!this.iOS()) return !1;
                        var t = this.iOSVersion();
                        return t[0] > 6 && t[0] < 8
                    },
                    windows: function() {
                        return !!navigator.userAgent.match(/IEMobile/i)
                    },
                    any: function() {
                        return this.android() || this.blackBerry() || this.iOS() || this.windows()
                    },
                    iOSVersion: function() {
                        if (this.iOS()) {
                            var t = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                            return [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3] || 0, 10)]
                        }
                        return []
                    }
                }
            };
        return s
    }(jQuery), jQuery(function() {
        wwctrials.main.init()
    }), void 0 === healthyStudies) var healthyStudies = {};
if (healthyStudies.main = function(t) {
        var i = {
            init: function() {
                this.heroArrow(), this.accordian(), this.joinAStudyForm(), this.initializeChosen(), this.currentStudy(), this.smsModal()
            },
            smsModal: function() {
                var i = '<iframe src="http://mystudyinfo.com/client/healthystudies/iframe.cfm" height="500" width="320"  allowtransparency="yes" frameborder="0" scrolling="no"></iframe>',
                    e = t(".join-sms .iframe-container");
                t(".join-sms").on("hide.bs.modal", function() {
                    e.find("iframe").remove()
                }), t(".join-sms").on("shown.bs.modal", function() {
                    e.html(i)
                })
            },
            heroArrow: function() {
                var i = t(".hero-image-webpart"),
                    e = t(".hero-image-webpart .down-arrow");
                e.on("click", function() {
                    t("html, body").animate({
                        scrollTop: i.offset().top + i.height()
                    }, 500)
                })
            },
            accordian: function() {
                var i = t("ul.accordian li"),
                    e = t("div.accordian-content"),
                    s = i.find(".icon");
                i.on("click", function() {
					console.log('click');
                    var o = t(this),
                        n = o.find(".icon");
                    o.hasClass("active") ? (o.removeClass("active"), n.removeClass("icon-minus").addClass("icon-plus"), e.slideUp()) : (i.removeClass("active"), e.slideUp(), s.not(n).removeClass("icon-minus").addClass("icon-plus"), o.addClass("active"), n.removeClass("icon-plus").addClass("icon-minus"), o.find(e).slideDown())
                })
            },
            joinAStudyForm: function() {
                var e = t(".measurement-radio-list input[type=radio]"),
                    s = "Standard",
                    o = t('.user-measurements input[name*="txtHeight"]'),
                    n = t('.user-measurements input[name*="txtWeight"]');
                e.on("change", function() {
                    var i = t(".measurement-radio-list input[type=radio]:checked");
                    s = i.val(), o.val(""), n.val(""), t('input[name*="txtBmi"]').val(""), "Standard" == s ? (t("span.measurement.height").text("(in)"), t("span.measurement.weight").text("(lbs)")) : (t("span.measurement.height").text("(cm)"), t("span.measurement.weight").text("(kg)"))
                }), t('.user-measurements input[type="text"]').on("keyup", function() {
                    i.updateBmi("Standard" == s)
                })
            },
            updateBmi: function(i) {
                var e = t('.user-measurements input[name*="txtHeight"]').val().replace(/\D/g, ""),
                    s = t('.user-measurements input[name*="txtWeight"]').val().replace(/\D/g, ""),
                    o = t('input[name*="txtBmi"]'),
                    n = 0;
                "" != e && "" != s && e > 0 && s > 0 && (n = i ? 703 * s / Math.pow(e, 2) : s / Math.pow(.01 * e, 2), n > 0 && o.val(Math.round(10 * n) / 10))
            },
            initializeChosen: function() {
                t(".hs-form select").chosen({
                    disable_search: !0,
                    width: "100%"
                })
            },
            currentStudy: function() {
                t(".study-info").each(function(i, e) {
                    var s = t(e).find(".text-right"),
                        o = s.height();
                    t(this).height() >= o || (s.css({
                        height: "58px",
                        overflow: "hidden"
                    }), $moreLInk = t("<a />").attr("href", "#").css({
                        display: "block",
                        clear: "both",
                        position: "absolute",
                        bottom: "0",
                        right: "0"
                    }).html("More"), t(this).append($moreLInk), $moreLInk.on("click", function(i) {
                        i.preventDefault();
                        var e = t(this).parents(".study-info"),
                            s = e.find(".text-right");
                        t(this).hasClass("open") ? (e.removeAttr("style"), s.css({
                            height: "58px",
                            overflow: "hidden"
                        }), t(this).text("More"), t(this).removeClass("open")) : (e.css("height", o + 85 + "px"), s.removeAttr("style"), t(this).text("Close"), t(this).addClass("open"))
                    }))
                })
            }
        };
        return i
    }(jQuery), jQuery(function($) {
        healthyStudies.main.init()
    }), function(t, i, e) {
        function s(t, e) {
            this.wrapper = "string" == typeof t ? i.querySelector(t) : t, this.scroller = this.wrapper.children[0], this.scrollerStyle = this.scroller.style, this.options = {
                resizeScrollbars: !0,
                mouseWheelSpeed: 20,
                snapThreshold: .334,
                startX: 0,
                startY: 0,
                scrollY: !0,
                directionLockThreshold: 5,
                momentum: !0,
                bounce: !0,
                bounceTime: 600,
                bounceEasing: "",
                preventDefault: !0,
                preventDefaultException: {
                    tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
                },
                HWCompositing: !0,
                useTransition: !0,
                useTransform: !0
            };
            for (var s in e) this.options[s] = e[s];
            this.translateZ = this.options.HWCompositing && a.hasPerspective ? " translateZ(0)" : "", this.options.useTransition = a.hasTransition && this.options.useTransition, this.options.useTransform = a.hasTransform && this.options.useTransform, this.options.eventPassthrough = this.options.eventPassthrough === !0 ? "vertical" : this.options.eventPassthrough, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollY = "vertical" != this.options.eventPassthrough && this.options.scrollY, this.options.scrollX = "horizontal" != this.options.eventPassthrough && this.options.scrollX, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? a.ease[this.options.bounceEasing] || a.ease.circular : this.options.bounceEasing, this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling, this.options.tap === !0 && (this.options.tap = "tap"), "scale" == this.options.shrinkScrollbars && (this.options.useTransition = !1), this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1, this.x = 0, this.y = 0, this.directionX = 0, this.directionY = 0, this._events = {}, this._init(), this.refresh(), this.scrollTo(this.options.startX, this.options.startY), this.enable()
        }

        function o(t, e, s) {
            var o = i.createElement("div"),
                n = i.createElement("div");
            return s === !0 && (o.style.cssText = "position:absolute;z-index:9999", n.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"), n.className = "iScrollIndicator", "h" == t ? (s === !0 && (o.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", n.style.height = "100%"), o.className = "iScrollHorizontalScrollbar") : (s === !0 && (o.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", n.style.width = "100%"), o.className = "iScrollVerticalScrollbar"), o.style.cssText += ";overflow:hidden", e || (o.style.pointerEvents = "none"), o.appendChild(n), o
        }

        function n(e, s) {
            this.wrapper = "string" == typeof s.el ? i.querySelector(s.el) : s.el, this.wrapperStyle = this.wrapper.style, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = e, this.options = {
                listenX: !0,
                listenY: !0,
                interactive: !1,
                resize: !0,
                defaultScrollbars: !1,
                shrink: !1,
                fade: !1,
                speedRatioX: 0,
                speedRatioY: 0
            };
            for (var o in s) this.options[o] = s[o];
            this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.options.interactive && (this.options.disableTouch || (a.addEvent(this.indicator, "touchstart", this), a.addEvent(t, "touchend", this)), this.options.disablePointer || (a.addEvent(this.indicator, a.prefixPointerEvent("pointerdown"), this), a.addEvent(t, a.prefixPointerEvent("pointerup"), this)), this.options.disableMouse || (a.addEvent(this.indicator, "mousedown", this), a.addEvent(t, "mouseup", this))), this.options.fade && (this.wrapperStyle[a.style.transform] = this.scroller.translateZ, this.wrapperStyle[a.style.transitionDuration] = a.isBadAndroid ? "0.001s" : "0ms", this.wrapperStyle.opacity = "0")
        }
        var r = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame || function(i) {
                t.setTimeout(i, 1e3 / 60)
            },
            a = function() {
                function s(t) {
                    return r !== !1 && ("" === r ? t : r + t.charAt(0).toUpperCase() + t.substr(1))
                }
                var o = {},
                    n = i.createElement("div").style,
                    r = function() {
                        for (var t, i = ["t", "webkitT", "MozT", "msT", "OT"], e = 0, s = i.length; e < s; e++)
                            if (t = i[e] + "ransform", t in n) return i[e].substr(0, i[e].length - 1);
                        return !1
                    }();
                o.getTime = Date.now || function() {
                    return (new Date).getTime()
                }, o.extend = function(t, i) {
                    for (var e in i) t[e] = i[e]
                }, o.addEvent = function(t, i, e, s) {
                    t.addEventListener(i, e, !!s)
                }, o.removeEvent = function(t, i, e, s) {
                    t.removeEventListener(i, e, !!s)
                }, o.prefixPointerEvent = function(i) {
                    return t.MSPointerEvent ? "MSPointer" + i.charAt(9).toUpperCase() + i.substr(10) : i
                }, o.momentum = function(t, i, s, o, n, r) {
                    var a, l, h = t - i,
                        c = e.abs(h) / s;
                    return r = void 0 === r ? 6e-4 : r, a = t + c * c / (2 * r) * (h < 0 ? -1 : 1), l = c / r, a < o ? (a = n ? o - n / 2.5 * (c / 8) : o, h = e.abs(a - t), l = h / c) : a > 0 && (a = n ? n / 2.5 * (c / 8) : 0, h = e.abs(t) + a, l = h / c), {
                        destination: e.round(a),
                        duration: l
                    }
                };
                var a = s("transform");
                return o.extend(o, {
                    hasTransform: a !== !1,
                    hasPerspective: s("perspective") in n,
                    hasTouch: "ontouchstart" in t,
                    hasPointer: t.PointerEvent || t.MSPointerEvent,
                    hasTransition: s("transition") in n
                }), o.isBadAndroid = /Android /.test(t.navigator.appVersion) && !/Chrome\/\d/.test(t.navigator.appVersion), o.extend(o.style = {}, {
                    transform: a,
                    transitionTimingFunction: s("transitionTimingFunction"),
                    transitionDuration: s("transitionDuration"),
                    transitionDelay: s("transitionDelay"),
                    transformOrigin: s("transformOrigin")
                }), o.hasClass = function(t, i) {
                    var e = new RegExp("(^|\\s)" + i + "(\\s|$)");
                    return e.test(t.className)
                }, o.addClass = function(t, i) {
                    if (!o.hasClass(t, i)) {
                        var e = t.className.split(" ");
                        e.push(i), t.className = e.join(" ")
                    }
                }, o.removeClass = function(t, i) {
                    if (o.hasClass(t, i)) {
                        var e = new RegExp("(^|\\s)" + i + "(\\s|$)", "g");
                        t.className = t.className.replace(e, " ")
                    }
                }, o.offset = function(t) {
                    for (var i = -t.offsetLeft, e = -t.offsetTop; t = t.offsetParent;) i -= t.offsetLeft, e -= t.offsetTop;
                    return {
                        left: i,
                        top: e
                    }
                }, o.preventDefaultException = function(t, i) {
                    for (var e in i)
                        if (i[e].test(t[e])) return !0;
                    return !1
                }, o.extend(o.eventType = {}, {
                    touchstart: 1,
                    touchmove: 1,
                    touchend: 1,
                    mousedown: 2,
                    mousemove: 2,
                    mouseup: 2,
                    pointerdown: 3,
                    pointermove: 3,
                    pointerup: 3,
                    MSPointerDown: 3,
                    MSPointerMove: 3,
                    MSPointerUp: 3
                }), o.extend(o.ease = {}, {
                    quadratic: {
                        style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        fn: function(t) {
                            return t * (2 - t)
                        }
                    },
                    circular: {
                        style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
                        fn: function(t) {
                            return e.sqrt(1 - --t * t)
                        }
                    },
                    back: {
                        style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        fn: function(t) {
                            var i = 4;
                            return (t -= 1) * t * ((i + 1) * t + i) + 1
                        }
                    },
                    bounce: {
                        style: "",
                        fn: function(t) {
                            return (t /= 1) < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                        }
                    },
                    elastic: {
                        style: "",
                        fn: function(t) {
                            var i = .22,
                                s = .4;
                            return 0 === t ? 0 : 1 == t ? 1 : s * e.pow(2, -10 * t) * e.sin((t - i / 4) * (2 * e.PI) / i) + 1
                        }
                    }
                }), o.tap = function(t, e) {
                    var s = i.createEvent("Event");
                    s.initEvent(e, !0, !0), s.pageX = t.pageX, s.pageY = t.pageY, t.target.dispatchEvent(s)
                }, o.click = function(t) {
                    var e, s = t.target;
                    /(SELECT|INPUT|TEXTAREA)/i.test(s.tagName) || (e = i.createEvent("MouseEvents"),
                        e.initMouseEvent("click", !0, !0, t.view, 1, s.screenX, s.screenY, s.clientX, s.clientY, t.ctrlKey, t.altKey, t.shiftKey, t.metaKey, 0, null), e._constructed = !0, s.dispatchEvent(e))
                }, o
            }();
        s.prototype = {
            version: "5.1.3",
            _init: function() {
                this._initEvents(), (this.options.scrollbars || this.options.indicators) && this._initIndicators(), this.options.mouseWheel && this._initWheel(), this.options.snap && this._initSnap(), this.options.keyBindings && this._initKeys()
            },
            destroy: function() {
                this._initEvents(!0), this._execEvent("destroy")
            },
            _transitionEnd: function(t) {
                t.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, this._execEvent("scrollEnd")))
            },
            _start: function(t) {
                if ((1 == a.eventType[t.type] || 0 === t.button) && this.enabled && (!this.initiated || a.eventType[t.type] === this.initiated)) {
                    !this.options.preventDefault || a.isBadAndroid || a.preventDefaultException(t.target, this.options.preventDefaultException) || t.preventDefault();
                    var i, s = t.touches ? t.touches[0] : t;
                    this.initiated = a.eventType[t.type], this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.directionLocked = 0, this._transitionTime(), this.startTime = a.getTime(), this.options.useTransition && this.isInTransition ? (this.isInTransition = !1, i = this.getComputedPosition(), this._translate(e.round(i.x), e.round(i.y)), this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this._execEvent("scrollEnd")), this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = s.pageX, this.pointY = s.pageY, this._execEvent("beforeScrollStart")
                }
            },
            _move: function(t) {
                if (this.enabled && a.eventType[t.type] === this.initiated) {
                    this.options.preventDefault && t.preventDefault();
                    var i, s, o, n, r = t.touches ? t.touches[0] : t,
                        l = r.pageX - this.pointX,
                        h = r.pageY - this.pointY,
                        c = a.getTime();
                    if (this.pointX = r.pageX, this.pointY = r.pageY, this.distX += l, this.distY += h, o = e.abs(this.distX), n = e.abs(this.distY), !(c - this.endTime > 300 && o < 10 && n < 10)) {
                        if (this.directionLocked || this.options.freeScroll || (o > n + this.options.directionLockThreshold ? this.directionLocked = "h" : n >= o + this.options.directionLockThreshold ? this.directionLocked = "v" : this.directionLocked = "n"), "h" == this.directionLocked) {
                            if ("vertical" == this.options.eventPassthrough) t.preventDefault();
                            else if ("horizontal" == this.options.eventPassthrough) return void(this.initiated = !1);
                            h = 0
                        } else if ("v" == this.directionLocked) {
                            if ("horizontal" == this.options.eventPassthrough) t.preventDefault();
                            else if ("vertical" == this.options.eventPassthrough) return void(this.initiated = !1);
                            l = 0
                        }
                        l = this.hasHorizontalScroll ? l : 0, h = this.hasVerticalScroll ? h : 0, i = this.x + l, s = this.y + h, (i > 0 || i < this.maxScrollX) && (i = this.options.bounce ? this.x + l / 3 : i > 0 ? 0 : this.maxScrollX), (s > 0 || s < this.maxScrollY) && (s = this.options.bounce ? this.y + h / 3 : s > 0 ? 0 : this.maxScrollY), this.directionX = l > 0 ? -1 : l < 0 ? 1 : 0, this.directionY = h > 0 ? -1 : h < 0 ? 1 : 0, this.moved || this._execEvent("scrollStart"), this.moved = !0, this._translate(i, s), c - this.startTime > 300 && (this.startTime = c, this.startX = this.x, this.startY = this.y)
                    }
                }
            },
            _end: function(t) {
                if (this.enabled && a.eventType[t.type] === this.initiated) {
                    this.options.preventDefault && !a.preventDefaultException(t.target, this.options.preventDefaultException) && t.preventDefault();
                    var i, s, o = (t.changedTouches ? t.changedTouches[0] : t, a.getTime() - this.startTime),
                        n = e.round(this.x),
                        r = e.round(this.y),
                        l = e.abs(n - this.startX),
                        h = e.abs(r - this.startY),
                        c = 0,
                        d = "";
                    if (this.isInTransition = 0, this.initiated = 0, this.endTime = a.getTime(), !this.resetPosition(this.options.bounceTime)) {
                        if (this.scrollTo(n, r), !this.moved) return this.options.tap && a.tap(t, this.options.tap), this.options.click && a.click(t), void this._execEvent("scrollCancel");
                        if (this._events.flick && o < 200 && l < 100 && h < 100) return void this._execEvent("flick");
                        if (this.options.momentum && o < 300 && (i = this.hasHorizontalScroll ? a.momentum(this.x, this.startX, o, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
                                destination: n,
                                duration: 0
                            }, s = this.hasVerticalScroll ? a.momentum(this.y, this.startY, o, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
                                destination: r,
                                duration: 0
                            }, n = i.destination, r = s.destination, c = e.max(i.duration, s.duration), this.isInTransition = 1), this.options.snap) {
                            var p = this._nearestSnap(n, r);
                            this.currentPage = p, c = this.options.snapSpeed || e.max(e.max(e.min(e.abs(n - p.x), 1e3), e.min(e.abs(r - p.y), 1e3)), 300), n = p.x, r = p.y, this.directionX = 0, this.directionY = 0, d = this.options.bounceEasing
                        }
                        return n != this.x || r != this.y ? ((n > 0 || n < this.maxScrollX || r > 0 || r < this.maxScrollY) && (d = a.ease.quadratic), void this.scrollTo(n, r, c, d)) : void this._execEvent("scrollEnd")
                    }
                }
            },
            _resize: function() {
                var t = this;
                clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() {
                    t.refresh()
                }, this.options.resizePolling)
            },
            resetPosition: function(t) {
                var i = this.x,
                    e = this.y;
                return t = t || 0, !this.hasHorizontalScroll || this.x > 0 ? i = 0 : this.x < this.maxScrollX && (i = this.maxScrollX), !this.hasVerticalScroll || this.y > 0 ? e = 0 : this.y < this.maxScrollY && (e = this.maxScrollY), (i != this.x || e != this.y) && (this.scrollTo(i, e, t, this.options.bounceEasing), !0)
            },
            disable: function() {
                this.enabled = !1
            },
            enable: function() {
                this.enabled = !0
            },
            refresh: function() {
                this.wrapper.offsetHeight;
                this.wrapperWidth = this.wrapper.clientWidth, this.wrapperHeight = this.wrapper.clientHeight, this.scrollerWidth = this.scroller.offsetWidth, this.scrollerHeight = this.scroller.offsetHeight, this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.maxScrollY = this.wrapperHeight - this.scrollerHeight, this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, this.wrapperOffset = a.offset(this.wrapper), this._execEvent("refresh"), this.resetPosition()
            },
            on: function(t, i) {
                this._events[t] || (this._events[t] = []), this._events[t].push(i)
            },
            off: function(t, i) {
                if (this._events[t]) {
                    var e = this._events[t].indexOf(i);
                    e > -1 && this._events[t].splice(e, 1)
                }
            },
            _execEvent: function(t) {
                if (this._events[t]) {
                    var i = 0,
                        e = this._events[t].length;
                    if (e)
                        for (; i < e; i++) this._events[t][i].apply(this, [].slice.call(arguments, 1))
                }
            },
            scrollBy: function(t, i, e, s) {
                t = this.x + t, i = this.y + i, e = e || 0, this.scrollTo(t, i, e, s)
            },
            scrollTo: function(t, i, e, s) {
                s = s || a.ease.circular, this.isInTransition = this.options.useTransition && e > 0, !e || this.options.useTransition && s.style ? (this._transitionTimingFunction(s.style), this._transitionTime(e), this._translate(t, i)) : this._animate(t, i, e, s.fn)
            },
            scrollToElement: function(t, i, s, o, n) {
                if (t = t.nodeType ? t : this.scroller.querySelector(t)) {
                    var r = a.offset(t);
                    r.left -= this.wrapperOffset.left, r.top -= this.wrapperOffset.top, s === !0 && (s = e.round(t.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), o === !0 && (o = e.round(t.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), r.left -= s || 0, r.top -= o || 0, r.left = r.left > 0 ? 0 : r.left < this.maxScrollX ? this.maxScrollX : r.left, r.top = r.top > 0 ? 0 : r.top < this.maxScrollY ? this.maxScrollY : r.top, i = void 0 === i || null === i || "auto" === i ? e.max(e.abs(this.x - r.left), e.abs(this.y - r.top)) : i, this.scrollTo(r.left, r.top, i, n)
                }
            },
            _transitionTime: function(t) {
                if (t = t || 0, this.scrollerStyle[a.style.transitionDuration] = t + "ms", !t && a.isBadAndroid && (this.scrollerStyle[a.style.transitionDuration] = "0.001s"), this.indicators)
                    for (var i = this.indicators.length; i--;) this.indicators[i].transitionTime(t)
            },
            _transitionTimingFunction: function(t) {
                if (this.scrollerStyle[a.style.transitionTimingFunction] = t, this.indicators)
                    for (var i = this.indicators.length; i--;) this.indicators[i].transitionTimingFunction(t)
            },
            _translate: function(t, i) {
                if (this.options.useTransform ? this.scrollerStyle[a.style.transform] = "translate(" + t + "px," + i + "px)" + this.translateZ : (t = e.round(t), i = e.round(i), this.scrollerStyle.left = t + "px", this.scrollerStyle.top = i + "px"), this.x = t, this.y = i, this.indicators)
                    for (var s = this.indicators.length; s--;) this.indicators[s].updatePosition()
            },
            _initEvents: function(i) {
                var e = i ? a.removeEvent : a.addEvent,
                    s = this.options.bindToWrapper ? this.wrapper : t;
                e(t, "orientationchange", this), e(t, "resize", this), this.options.click && e(this.wrapper, "click", this, !0), this.options.disableMouse || (e(this.wrapper, "mousedown", this), e(s, "mousemove", this), e(s, "mousecancel", this), e(s, "mouseup", this)), a.hasPointer && !this.options.disablePointer && (e(this.wrapper, a.prefixPointerEvent("pointerdown"), this), e(s, a.prefixPointerEvent("pointermove"), this), e(s, a.prefixPointerEvent("pointercancel"), this), e(s, a.prefixPointerEvent("pointerup"), this)), a.hasTouch && !this.options.disableTouch && (e(this.wrapper, "touchstart", this), e(s, "touchmove", this), e(s, "touchcancel", this), e(s, "touchend", this)), e(this.scroller, "transitionend", this), e(this.scroller, "webkitTransitionEnd", this), e(this.scroller, "oTransitionEnd", this), e(this.scroller, "MSTransitionEnd", this)
            },
            getComputedPosition: function() {
                var i, e, s = t.getComputedStyle(this.scroller, null);
                return this.options.useTransform ? (s = s[a.style.transform].split(")")[0].split(", "), i = +(s[12] || s[4]), e = +(s[13] || s[5])) : (i = +s.left.replace(/[^-\d.]/g, ""), e = +s.top.replace(/[^-\d.]/g, "")), {
                    x: i,
                    y: e
                }
            },
            _initIndicators: function() {
                function t(t) {
                    for (var i = a.indicators.length; i--;) t.call(a.indicators[i])
                }
                var i, e = this.options.interactiveScrollbars,
                    s = "string" != typeof this.options.scrollbars,
                    r = [],
                    a = this;
                this.indicators = [], this.options.scrollbars && (this.options.scrollY && (i = {
                    el: o("v", e, this.options.scrollbars),
                    interactive: e,
                    defaultScrollbars: !0,
                    customStyle: s,
                    resize: this.options.resizeScrollbars,
                    shrink: this.options.shrinkScrollbars,
                    fade: this.options.fadeScrollbars,
                    listenX: !1
                }, this.wrapper.appendChild(i.el), r.push(i)), this.options.scrollX && (i = {
                    el: o("h", e, this.options.scrollbars),
                    interactive: e,
                    defaultScrollbars: !0,
                    customStyle: s,
                    resize: this.options.resizeScrollbars,
                    shrink: this.options.shrinkScrollbars,
                    fade: this.options.fadeScrollbars,
                    listenY: !1
                }, this.wrapper.appendChild(i.el), r.push(i))), this.options.indicators && (r = r.concat(this.options.indicators));
                for (var l = r.length; l--;) this.indicators.push(new n(this, r[l]));
                this.options.fadeScrollbars && (this.on("scrollEnd", function() {
                    t(function() {
                        this.fade()
                    })
                }), this.on("scrollCancel", function() {
                    t(function() {
                        this.fade()
                    })
                }), this.on("scrollStart", function() {
                    t(function() {
                        this.fade(1)
                    })
                }), this.on("beforeScrollStart", function() {
                    t(function() {
                        this.fade(1, !0)
                    })
                })), this.on("refresh", function() {
                    t(function() {
                        this.refresh()
                    })
                }), this.on("destroy", function() {
                    t(function() {
                        this.destroy()
                    }), delete this.indicators
                })
            },
            _initWheel: function() {
                a.addEvent(this.wrapper, "wheel", this), a.addEvent(this.wrapper, "mousewheel", this), a.addEvent(this.wrapper, "DOMMouseScroll", this), this.on("destroy", function() {
                    a.removeEvent(this.wrapper, "wheel", this), a.removeEvent(this.wrapper, "mousewheel", this), a.removeEvent(this.wrapper, "DOMMouseScroll", this)
                })
            },
            _wheel: function(t) {
                if (this.enabled) {
                    t.preventDefault(), t.stopPropagation();
                    var i, s, o, n, r = this;
                    if (void 0 === this.wheelTimeout && r._execEvent("scrollStart"), clearTimeout(this.wheelTimeout), this.wheelTimeout = setTimeout(function() {
                            r._execEvent("scrollEnd"), r.wheelTimeout = void 0
                        }, 400), "deltaX" in t) 1 === t.deltaMode ? (i = -t.deltaX * this.options.mouseWheelSpeed, s = -t.deltaY * this.options.mouseWheelSpeed) : (i = -t.deltaX, s = -t.deltaY);
                    else if ("wheelDeltaX" in t) i = t.wheelDeltaX / 120 * this.options.mouseWheelSpeed, s = t.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
                    else if ("wheelDelta" in t) i = s = t.wheelDelta / 120 * this.options.mouseWheelSpeed;
                    else {
                        if (!("detail" in t)) return;
                        i = s = -t.detail / 3 * this.options.mouseWheelSpeed
                    }
                    if (i *= this.options.invertWheelDirection, s *= this.options.invertWheelDirection, this.hasVerticalScroll || (i = s, s = 0), this.options.snap) return o = this.currentPage.pageX, n = this.currentPage.pageY, i > 0 ? o-- : i < 0 && o++, s > 0 ? n-- : s < 0 && n++, void this.goToPage(o, n);
                    o = this.x + e.round(this.hasHorizontalScroll ? i : 0), n = this.y + e.round(this.hasVerticalScroll ? s : 0), o > 0 ? o = 0 : o < this.maxScrollX && (o = this.maxScrollX), n > 0 ? n = 0 : n < this.maxScrollY && (n = this.maxScrollY), this.scrollTo(o, n, 0)
                }
            },
            _initSnap: function() {
                this.currentPage = {}, "string" == typeof this.options.snap && (this.options.snap = this.scroller.querySelectorAll(this.options.snap)), this.on("refresh", function() {
                    var t, i, s, o, n, r, a = 0,
                        l = 0,
                        h = 0,
                        c = this.options.snapStepX || this.wrapperWidth,
                        d = this.options.snapStepY || this.wrapperHeight;
                    if (this.pages = [], this.wrapperWidth && this.wrapperHeight && this.scrollerWidth && this.scrollerHeight) {
                        if (this.options.snap === !0)
                            for (s = e.round(c / 2), o = e.round(d / 2); h > -this.scrollerWidth;) {
                                for (this.pages[a] = [], t = 0, n = 0; n > -this.scrollerHeight;) this.pages[a][t] = {
                                    x: e.max(h, this.maxScrollX),
                                    y: e.max(n, this.maxScrollY),
                                    width: c,
                                    height: d,
                                    cx: h - s,
                                    cy: n - o
                                }, n -= d, t++;
                                h -= c, a++
                            } else
                                for (r = this.options.snap, t = r.length, i = -1; a < t; a++)(0 === a || r[a].offsetLeft <= r[a - 1].offsetLeft) && (l = 0, i++), this.pages[l] || (this.pages[l] = []), h = e.max(-r[a].offsetLeft, this.maxScrollX), n = e.max(-r[a].offsetTop, this.maxScrollY), s = h - e.round(r[a].offsetWidth / 2), o = n - e.round(r[a].offsetHeight / 2), this.pages[l][i] = {
                                    x: h,
                                    y: n,
                                    width: r[a].offsetWidth,
                                    height: r[a].offsetHeight,
                                    cx: s,
                                    cy: o
                                }, h > this.maxScrollX && l++;
                        this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0), this.options.snapThreshold % 1 === 0 ? (this.snapThresholdX = this.options.snapThreshold, this.snapThresholdY = this.options.snapThreshold) : (this.snapThresholdX = e.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold), this.snapThresholdY = e.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold))
                    }
                }), this.on("flick", function() {
                    var t = this.options.snapSpeed || e.max(e.max(e.min(e.abs(this.x - this.startX), 1e3), e.min(e.abs(this.y - this.startY), 1e3)), 300);
                    this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, t)
                })
            },
            _nearestSnap: function(t, i) {
                if (!this.pages.length) return {
                    x: 0,
                    y: 0,
                    pageX: 0,
                    pageY: 0
                };
                var s = 0,
                    o = this.pages.length,
                    n = 0;
                if (e.abs(t - this.absStartX) < this.snapThresholdX && e.abs(i - this.absStartY) < this.snapThresholdY) return this.currentPage;
                for (t > 0 ? t = 0 : t < this.maxScrollX && (t = this.maxScrollX), i > 0 ? i = 0 : i < this.maxScrollY && (i = this.maxScrollY); s < o; s++)
                    if (t >= this.pages[s][0].cx) {
                        t = this.pages[s][0].x;
                        break
                    }
                for (o = this.pages[s].length; n < o; n++)
                    if (i >= this.pages[0][n].cy) {
                        i = this.pages[0][n].y;
                        break
                    }
                return s == this.currentPage.pageX && (s += this.directionX, s < 0 ? s = 0 : s >= this.pages.length && (s = this.pages.length - 1), t = this.pages[s][0].x), n == this.currentPage.pageY && (n += this.directionY, n < 0 ? n = 0 : n >= this.pages[0].length && (n = this.pages[0].length - 1), i = this.pages[0][n].y), {
                    x: t,
                    y: i,
                    pageX: s,
                    pageY: n
                }
            },
            goToPage: function(t, i, s, o) {
                o = o || this.options.bounceEasing, t >= this.pages.length ? t = this.pages.length - 1 : t < 0 && (t = 0), i >= this.pages[t].length ? i = this.pages[t].length - 1 : i < 0 && (i = 0);
                var n = this.pages[t][i].x,
                    r = this.pages[t][i].y;
                s = void 0 === s ? this.options.snapSpeed || e.max(e.max(e.min(e.abs(n - this.x), 1e3), e.min(e.abs(r - this.y), 1e3)), 300) : s, this.currentPage = {
                    x: n,
                    y: r,
                    pageX: t,
                    pageY: i
                }, this.scrollTo(n, r, s, o)
            },
            next: function(t, i) {
                var e = this.currentPage.pageX,
                    s = this.currentPage.pageY;
                e++, e >= this.pages.length && this.hasVerticalScroll && (e = 0, s++), this.goToPage(e, s, t, i)
            },
            prev: function(t, i) {
                var e = this.currentPage.pageX,
                    s = this.currentPage.pageY;
                e--, e < 0 && this.hasVerticalScroll && (e = 0, s--), this.goToPage(e, s, t, i)
            },
            _initKeys: function(i) {
                var e, s = {
                    pageUp: 33,
                    pageDown: 34,
                    end: 35,
                    home: 36,
                    left: 37,
                    up: 38,
                    right: 39,
                    down: 40
                };
                if ("object" == typeof this.options.keyBindings)
                    for (e in this.options.keyBindings) "string" == typeof this.options.keyBindings[e] && (this.options.keyBindings[e] = this.options.keyBindings[e].toUpperCase().charCodeAt(0));
                else this.options.keyBindings = {};
                for (e in s) this.options.keyBindings[e] = this.options.keyBindings[e] || s[e];
                a.addEvent(t, "keydown", this), this.on("destroy", function() {
                    a.removeEvent(t, "keydown", this)
                })
            },
            _key: function(t) {
                if (this.enabled) {
                    var i, s = this.options.snap,
                        o = s ? this.currentPage.pageX : this.x,
                        n = s ? this.currentPage.pageY : this.y,
                        r = a.getTime(),
                        l = this.keyTime || 0,
                        h = .25;
                    switch (this.options.useTransition && this.isInTransition && (i = this.getComputedPosition(), this._translate(e.round(i.x), e.round(i.y)), this.isInTransition = !1), this.keyAcceleration = r - l < 200 ? e.min(this.keyAcceleration + h, 50) : 0, t.keyCode) {
                        case this.options.keyBindings.pageUp:
                            this.hasHorizontalScroll && !this.hasVerticalScroll ? o += s ? 1 : this.wrapperWidth : n += s ? 1 : this.wrapperHeight;
                            break;
                        case this.options.keyBindings.pageDown:
                            this.hasHorizontalScroll && !this.hasVerticalScroll ? o -= s ? 1 : this.wrapperWidth : n -= s ? 1 : this.wrapperHeight;
                            break;
                        case this.options.keyBindings.end:
                            o = s ? this.pages.length - 1 : this.maxScrollX, n = s ? this.pages[0].length - 1 : this.maxScrollY;
                            break;
                        case this.options.keyBindings.home:
                            o = 0, n = 0;
                            break;
                        case this.options.keyBindings.left:
                            o += s ? -1 : 5 + this.keyAcceleration >> 0;
                            break;
                        case this.options.keyBindings.up:
                            n += s ? 1 : 5 + this.keyAcceleration >> 0;
                            break;
                        case this.options.keyBindings.right:
                            o -= s ? -1 : 5 + this.keyAcceleration >> 0;
                            break;
                        case this.options.keyBindings.down:
                            n -= s ? 1 : 5 + this.keyAcceleration >> 0;
                            break;
                        default:
                            return
                    }
                    if (s) return void this.goToPage(o, n);
                    o > 0 ? (o = 0, this.keyAcceleration = 0) : o < this.maxScrollX && (o = this.maxScrollX, this.keyAcceleration = 0), n > 0 ? (n = 0, this.keyAcceleration = 0) : n < this.maxScrollY && (n = this.maxScrollY, this.keyAcceleration = 0), this.scrollTo(o, n, 0), this.keyTime = r
                }
            },
            _animate: function(t, i, e, s) {
                function o() {
                    var p, u, f, v = a.getTime();
                    return v >= d ? (n.isAnimating = !1, n._translate(t, i), void(n.resetPosition(n.options.bounceTime) || n._execEvent("scrollEnd"))) : (v = (v - c) / e, f = s(v), p = (t - l) * f + l, u = (i - h) * f + h, n._translate(p, u), void(n.isAnimating && r(o)))
                }
                var n = this,
                    l = this.x,
                    h = this.y,
                    c = a.getTime(),
                    d = c + e;
                this.isAnimating = !0, o()
            },
            handleEvent: function(t) {
                switch (t.type) {
                    case "touchstart":
                    case "pointerdown":
                    case "MSPointerDown":
                    case "mousedown":
                        this._start(t);
                        break;
                    case "touchmove":
                    case "pointermove":
                    case "MSPointerMove":
                    case "mousemove":
                        this._move(t);
                        break;
                    case "touchend":
                    case "pointerup":
                    case "MSPointerUp":
                    case "mouseup":
                    case "touchcancel":
                    case "pointercancel":
                    case "MSPointerCancel":
                    case "mousecancel":
                        this._end(t);
                        break;
                    case "orientationchange":
                    case "resize":
                        this._resize();
                        break;
                    case "transitionend":
                    case "webkitTransitionEnd":
                    case "oTransitionEnd":
                    case "MSTransitionEnd":
                        this._transitionEnd(t);
                        break;
                    case "wheel":
                    case "DOMMouseScroll":
                    case "mousewheel":
                        this._wheel(t);
                        break;
                    case "keydown":
                        this._key(t);
                        break;
                    case "click":
                        t._constructed || (t.preventDefault(), t.stopPropagation())
                }
            }
        }, n.prototype = {
            handleEvent: function(t) {
                switch (t.type) {
                    case "touchstart":
                    case "pointerdown":
                    case "MSPointerDown":
                    case "mousedown":
                        this._start(t);
                        break;
                    case "touchmove":
                    case "pointermove":
                    case "MSPointerMove":
                    case "mousemove":
                        this._move(t);
                        break;
                    case "touchend":
                    case "pointerup":
                    case "MSPointerUp":
                    case "mouseup":
                    case "touchcancel":
                    case "pointercancel":
                    case "MSPointerCancel":
                    case "mousecancel":
                        this._end(t)
                }
            },
            destroy: function() {
                this.options.interactive && (a.removeEvent(this.indicator, "touchstart", this), a.removeEvent(this.indicator, a.prefixPointerEvent("pointerdown"), this), a.removeEvent(this.indicator, "mousedown", this), a.removeEvent(t, "touchmove", this), a.removeEvent(t, a.prefixPointerEvent("pointermove"), this), a.removeEvent(t, "mousemove", this), a.removeEvent(t, "touchend", this), a.removeEvent(t, a.prefixPointerEvent("pointerup"), this), a.removeEvent(t, "mouseup", this)), this.options.defaultScrollbars && this.wrapper.parentNode.removeChild(this.wrapper)
            },
            _start: function(i) {
                var e = i.touches ? i.touches[0] : i;
                i.preventDefault(), i.stopPropagation(), this.transitionTime(), this.initiated = !0, this.moved = !1, this.lastPointX = e.pageX, this.lastPointY = e.pageY, this.startTime = a.getTime(), this.options.disableTouch || a.addEvent(t, "touchmove", this), this.options.disablePointer || a.addEvent(t, a.prefixPointerEvent("pointermove"), this), this.options.disableMouse || a.addEvent(t, "mousemove", this), this.scroller._execEvent("beforeScrollStart")
            },
            _move: function(t) {
                var i, e, s, o, n = t.touches ? t.touches[0] : t;
                a.getTime();
                this.moved || this.scroller._execEvent("scrollStart"), this.moved = !0, i = n.pageX - this.lastPointX, this.lastPointX = n.pageX, e = n.pageY - this.lastPointY, this.lastPointY = n.pageY, s = this.x + i, o = this.y + e, this._pos(s, o), t.preventDefault(), t.stopPropagation()
            },
            _end: function(i) {
                if (this.initiated) {
                    if (this.initiated = !1, i.preventDefault(), i.stopPropagation(), a.removeEvent(t, "touchmove", this), a.removeEvent(t, a.prefixPointerEvent("pointermove"), this), a.removeEvent(t, "mousemove", this), this.scroller.options.snap) {
                        var s = this.scroller._nearestSnap(this.scroller.x, this.scroller.y),
                            o = this.options.snapSpeed || e.max(e.max(e.min(e.abs(this.scroller.x - s.x), 1e3), e.min(e.abs(this.scroller.y - s.y), 1e3)), 300);
                        this.scroller.x == s.x && this.scroller.y == s.y || (this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = s, this.scroller.scrollTo(s.x, s.y, o, this.scroller.options.bounceEasing))
                    }
                    this.moved && this.scroller._execEvent("scrollEnd")
                }
            },
            transitionTime: function(t) {
                t = t || 0, this.indicatorStyle[a.style.transitionDuration] = t + "ms", !t && a.isBadAndroid && (this.indicatorStyle[a.style.transitionDuration] = "0.001s")
            },
            transitionTimingFunction: function(t) {
                this.indicatorStyle[a.style.transitionTimingFunction] = t
            },
            refresh: function() {
                this.transitionTime(), this.options.listenX && !this.options.listenY ? this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.indicatorStyle.display = this.scroller.hasVerticalScroll ? "block" : "none" : this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none", this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ? (a.addClass(this.wrapper, "iScrollBothScrollbars"), a.removeClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "8px" : this.wrapper.style.bottom = "8px")) : (a.removeClass(this.wrapper, "iScrollBothScrollbars"), a.addClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "2px" : this.wrapper.style.bottom = "2px"));
                this.wrapper.offsetHeight;
                this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth, this.options.resize ? (this.indicatorWidth = e.max(e.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px") : this.indicatorWidth = this.indicator.clientWidth, this.maxPosX = this.wrapperWidth - this.indicatorWidth, "clip" == this.options.shrink ? (this.minBoundaryX = -this.indicatorWidth + 8, this.maxBoundaryX = this.wrapperWidth - 8) : (this.minBoundaryX = 0, this.maxBoundaryX = this.maxPosX), this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX), this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight, this.options.resize ? (this.indicatorHeight = e.max(e.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px") : this.indicatorHeight = this.indicator.clientHeight, this.maxPosY = this.wrapperHeight - this.indicatorHeight, "clip" == this.options.shrink ? (this.minBoundaryY = -this.indicatorHeight + 8, this.maxBoundaryY = this.wrapperHeight - 8) : (this.minBoundaryY = 0, this.maxBoundaryY = this.maxPosY), this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY), this.updatePosition()
            },
            updatePosition: function() {
                var t = this.options.listenX && e.round(this.sizeRatioX * this.scroller.x) || 0,
                    i = this.options.listenY && e.round(this.sizeRatioY * this.scroller.y) || 0;
                this.options.ignoreBoundaries || (t < this.minBoundaryX ? ("scale" == this.options.shrink && (this.width = e.max(this.indicatorWidth + t, 8), this.indicatorStyle.width = this.width + "px"), t = this.minBoundaryX) : t > this.maxBoundaryX ? "scale" == this.options.shrink ? (this.width = e.max(this.indicatorWidth - (t - this.maxPosX), 8), this.indicatorStyle.width = this.width + "px", t = this.maxPosX + this.indicatorWidth - this.width) : t = this.maxBoundaryX : "scale" == this.options.shrink && this.width != this.indicatorWidth && (this.width = this.indicatorWidth, this.indicatorStyle.width = this.width + "px"), i < this.minBoundaryY ? ("scale" == this.options.shrink && (this.height = e.max(this.indicatorHeight + 3 * i, 8), this.indicatorStyle.height = this.height + "px"), i = this.minBoundaryY) : i > this.maxBoundaryY ? "scale" == this.options.shrink ? (this.height = e.max(this.indicatorHeight - 3 * (i - this.maxPosY), 8), this.indicatorStyle.height = this.height + "px", i = this.maxPosY + this.indicatorHeight - this.height) : i = this.maxBoundaryY : "scale" == this.options.shrink && this.height != this.indicatorHeight && (this.height = this.indicatorHeight, this.indicatorStyle.height = this.height + "px")), this.x = t, this.y = i, this.scroller.options.useTransform ? this.indicatorStyle[a.style.transform] = "translate(" + t + "px," + i + "px)" + this.scroller.translateZ : (this.indicatorStyle.left = t + "px", this.indicatorStyle.top = i + "px")
            },
            _pos: function(t, i) {
                t < 0 ? t = 0 : t > this.maxPosX && (t = this.maxPosX), i < 0 ? i = 0 : i > this.maxPosY && (i = this.maxPosY), t = this.options.listenX ? e.round(t / this.sizeRatioX) : this.scroller.x, i = this.options.listenY ? e.round(i / this.sizeRatioY) : this.scroller.y, this.scroller.scrollTo(t, i)
            },
            fade: function(t, i) {
                if (!i || this.visible) {
                    clearTimeout(this.fadeTimeout), this.fadeTimeout = null;
                    var e = t ? 250 : 500,
                        s = t ? 0 : 300;
                    t = t ? "1" : "0", this.wrapperStyle[a.style.transitionDuration] = e + "ms", this.fadeTimeout = setTimeout(function(t) {
                        this.wrapperStyle.opacity = t, this.visible = +t
                    }.bind(this, t), s)
                }
            }
        }, s.utils = a, "undefined" != typeof module && module.exports ? module.exports = s : t.IScroll = s
    }(window, document, Math), function(t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery)
    }(function(t) {
        "use strict";

        function i(i) {
            return !i.nodeName || -1 !== t.inArray(i.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"])
        }

        function e(i) {
            return t.isFunction(i) || t.isPlainObject(i) ? i : {
                top: i,
                left: i
            }
        }
        var s = t.scrollTo = function(i, e, s) {
            return t(window).scrollTo(i, e, s)
        };
        return s.defaults = {
            axis: "xy",
            duration: 0,
            limit: !0
        }, t.fn.scrollTo = function(o, n, r) {
            "object" == typeof n && (r = n, n = 0), "function" == typeof r && (r = {
                onAfter: r
            }), "max" === o && (o = 9e9), r = t.extend({}, s.defaults, r), n = n || r.duration;
            var a = r.queue && 1 < r.axis.length;
            return a && (n /= 2), r.offset = e(r.offset), r.over = e(r.over), this.each(function() {
                function l(i) {
                    var e = t.extend({}, r, {
                        queue: !0,
                        duration: n,
                        complete: i && function() {
                            i.call(d, u, r)
                        }
                    });
                    p.animate(f, e)
                }
                if (null !== o) {
                    var h, c = i(this),
                        d = c ? this.contentWindow || window : this,
                        p = t(d),
                        u = o,
                        f = {};
                    switch (typeof u) {
                        case "number":
                        case "string":
                            if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(u)) {
                                u = e(u);
                                break
                            }
                            u = c ? t(u) : t(u, d);
                        case "object":
                            if (0 === u.length) return;
                            (u.is || u.style) && (h = (u = t(u)).offset())
                    }
                    var v = t.isFunction(r.offset) && r.offset(d, u) || r.offset;
                    t.each(r.axis.split(""), function(t, i) {
                        var e = "x" === i ? "Left" : "Top",
                            o = e.toLowerCase(),
                            n = "scroll" + e,
                            g = p[n](),
                            m = s.max(d, i);
                        h ? (f[n] = h[o] + (c ? 0 : g - p.offset()[o]), r.margin && (f[n] -= parseInt(u.css("margin" + e), 10) || 0, f[n] -= parseInt(u.css("border" + e + "Width"), 10) || 0), f[n] += v[o] || 0, r.over[o] && (f[n] += u["x" === i ? "width" : "height"]() * r.over[o])) : (e = u[o], f[n] = e.slice && "%" === e.slice(-1) ? parseFloat(e) / 100 * m : e), r.limit && /^\d+$/.test(f[n]) && (f[n] = 0 >= f[n] ? 0 : Math.min(f[n], m)), !t && 1 < r.axis.length && (g === f[n] ? f = {} : a && (l(r.onAfterFirst), f = {}))
                    }), l(r.onAfter)
                }
            })
        }, s.max = function(e, s) {
            var o = "x" === s ? "Width" : "Height",
                n = "scroll" + o;
            if (!i(e)) return e[n] - t(e)[o.toLowerCase()]();
            var o = "client" + o,
                r = e.ownerDocument || e.document,
                a = r.documentElement,
                r = r.body;
            return Math.max(a[n], r[n]) - Math.min(a[o], r[o])
        }, t.Tween.propHooks.scrollLeft = t.Tween.propHooks.scrollTop = {
            get: function(i) {
                return t(i.elem)[i.prop]()
            },
            set: function(i) {
                var e = this.get(i);
                if (i.options.interrupt && i._last && i._last !== e) return t(i.elem).stop();
                var s = Math.round(i.now);
                e !== s && (t(i.elem)[i.prop](s), i._last = this.get(i))
            }
        }, s
    }), ! function(t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
    }(function(t) {
        "use strict";
        var i = window.Slick || {};
        i = function() {
            function i(i, s) {
                var o, n = this;
                n.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: t(i),
                    appendDots: t(i),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                    nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    centerMode: !1,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function(t, i) {
                        return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (i + 1) + "</button>"
                    },
                    dots: !1,
                    dotsClass: "slick-dots",
                    draggable: !0,
                    easing: "linear",
                    edgeFriction: .35,
                    fade: !1,
                    focusOnSelect: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    mobileFirst: !1,
                    pauseOnHover: !0,
                    pauseOnDotsHover: !1,
                    respondTo: "window",
                    responsive: null,
                    rows: 1,
                    rtl: !1,
                    slide: "",
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: !0,
                    swipeToSlide: !1,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    variableWidth: !1,
                    vertical: !1,
                    verticalSwiping: !1,
                    waitForAnimate: !0,
                    zIndex: 1e3
                }, n.initials = {
                    animating: !1,
                    dragging: !1,
                    autoPlayTimer: null,
                    currentDirection: 0,
                    currentLeft: null,
                    currentSlide: 0,
                    direction: 1,
                    $dots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    $nextArrow: null,
                    $prevArrow: null,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: !1,
                    unslicked: !1
                }, t.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.hidden = "hidden", n.paused = !1, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = t(i), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, o = t(i).data("slick") || {}, n.options = t.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, "undefined" != typeof document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = t.proxy(n.autoPlay, n), n.autoPlayClear = t.proxy(n.autoPlayClear, n), n.changeSlide = t.proxy(n.changeSlide, n), n.clickHandler = t.proxy(n.clickHandler, n), n.selectHandler = t.proxy(n.selectHandler, n), n.setPosition = t.proxy(n.setPosition, n), n.swipeHandler = t.proxy(n.swipeHandler, n), n.dragHandler = t.proxy(n.dragHandler, n), n.keyHandler = t.proxy(n.keyHandler, n), n.autoPlayIterator = t.proxy(n.autoPlayIterator, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0), n.checkResponsive(!0)
            }
            var e = 0;
            return i
        }(), i.prototype.addSlide = i.prototype.slickAdd = function(i, e, s) {
            var o = this;
            if ("boolean" == typeof e) s = e, e = null;
            else if (0 > e || e >= o.slideCount) return !1;
            o.unload(), "number" == typeof e ? 0 === e && 0 === o.$slides.length ? t(i).appendTo(o.$slideTrack) : s ? t(i).insertBefore(o.$slides.eq(e)) : t(i).insertAfter(o.$slides.eq(e)) : s === !0 ? t(i).prependTo(o.$slideTrack) : t(i).appendTo(o.$slideTrack), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slides.each(function(i, e) {
                t(e).attr("data-slick-index", i)
            }), o.$slidesCache = o.$slides, o.reinit()
        }, i.prototype.animateHeight = function() {
            var t = this;
            if (1 === t.options.slidesToShow && t.options.adaptiveHeight === !0 && t.options.vertical === !1) {
                var i = t.$slides.eq(t.currentSlide).outerHeight(!0);
                t.$list.animate({
                    height: i
                }, t.options.speed)
            }
        }, i.prototype.animateSlide = function(i, e) {
            var s = {},
                o = this;
            o.animateHeight(), o.options.rtl === !0 && o.options.vertical === !1 && (i = -i), o.transformsEnabled === !1 ? o.options.vertical === !1 ? o.$slideTrack.animate({
                left: i
            }, o.options.speed, o.options.easing, e) : o.$slideTrack.animate({
                top: i
            }, o.options.speed, o.options.easing, e) : o.cssTransitions === !1 ? (o.options.rtl === !0 && (o.currentLeft = -o.currentLeft), t({
                animStart: o.currentLeft
            }).animate({
                animStart: i
            }, {
                duration: o.options.speed,
                easing: o.options.easing,
                step: function(t) {
                    t = Math.ceil(t), o.options.vertical === !1 ? (s[o.animType] = "translate(" + t + "px, 0px)", o.$slideTrack.css(s)) : (s[o.animType] = "translate(0px," + t + "px)", o.$slideTrack.css(s))
                },
                complete: function() {
                    e && e.call()
                }
            })) : (o.applyTransition(), i = Math.ceil(i), s[o.animType] = o.options.vertical === !1 ? "translate3d(" + i + "px, 0px, 0px)" : "translate3d(0px," + i + "px, 0px)",
                o.$slideTrack.css(s), e && setTimeout(function() {
                    o.disableTransition(), e.call()
                }, o.options.speed))
        }, i.prototype.asNavFor = function(i) {
            var e = this,
                s = e.options.asNavFor;
            s && null !== s && (s = t(s).not(e.$slider)), null !== s && "object" == typeof s && s.each(function() {
                var e = t(this).slick("getSlick");
                e.unslicked || e.slideHandler(i, !0)
            })
        }, i.prototype.applyTransition = function(t) {
            var i = this,
                e = {};
            e[i.transitionType] = i.options.fade === !1 ? i.transformType + " " + i.options.speed + "ms " + i.options.cssEase : "opacity " + i.options.speed + "ms " + i.options.cssEase, i.options.fade === !1 ? i.$slideTrack.css(e) : i.$slides.eq(t).css(e)
        }, i.prototype.autoPlay = function() {
            var t = this;
            t.autoPlayTimer && clearInterval(t.autoPlayTimer), t.slideCount > t.options.slidesToShow && t.paused !== !0 && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed))
        }, i.prototype.autoPlayClear = function() {
            var t = this;
            t.autoPlayTimer && clearInterval(t.autoPlayTimer)
        }, i.prototype.autoPlayIterator = function() {
            var t = this;
            t.options.infinite === !1 ? 1 === t.direction ? (t.currentSlide + 1 === t.slideCount - 1 && (t.direction = 0), t.slideHandler(t.currentSlide + t.options.slidesToScroll)) : (0 === t.currentSlide - 1 && (t.direction = 1), t.slideHandler(t.currentSlide - t.options.slidesToScroll)) : t.slideHandler(t.currentSlide + t.options.slidesToScroll)
        }, i.prototype.buildArrows = function() {
            var i = this;
            i.options.arrows === !0 && (i.$prevArrow = t(i.options.prevArrow).addClass("slick-arrow"), i.$nextArrow = t(i.options.nextArrow).addClass("slick-arrow"), i.slideCount > i.options.slidesToShow ? (i.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), i.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.prependTo(i.options.appendArrows), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.appendTo(i.options.appendArrows), i.options.infinite !== !0 && i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : i.$prevArrow.add(i.$nextArrow).addClass("slick-hidden").attr({
                "aria-disabled": "true",
                tabindex: "-1"
            }))
        }, i.prototype.buildDots = function() {
            var i, e, s = this;
            if (s.options.dots === !0 && s.slideCount > s.options.slidesToShow) {
                for (e = '<ul class="' + s.options.dotsClass + '">', i = 0; i <= s.getDotCount(); i += 1) e += "<li>" + s.options.customPaging.call(this, s, i) + "</li>";
                e += "</ul>", s.$dots = t(e).appendTo(s.options.appendDots), s.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
            }
        }, i.prototype.buildOut = function() {
            var i = this;
            i.$slides = i.$slider.children(i.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), i.slideCount = i.$slides.length, i.$slides.each(function(i, e) {
                t(e).attr("data-slick-index", i).data("originalStyling", t(e).attr("style") || "")
            }), i.$slidesCache = i.$slides, i.$slider.addClass("slick-slider"), i.$slideTrack = 0 === i.slideCount ? t('<div class="slick-track"/>').appendTo(i.$slider) : i.$slides.wrapAll('<div class="slick-track"/>').parent(), i.$list = i.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), i.$slideTrack.css("opacity", 0), (i.options.centerMode === !0 || i.options.swipeToSlide === !0) && (i.options.slidesToScroll = 1), t("img[data-lazy]", i.$slider).not("[src]").addClass("slick-loading"), i.setupInfinite(), i.buildArrows(), i.buildDots(), i.updateDots(), i.setSlideClasses("number" == typeof i.currentSlide ? i.currentSlide : 0), i.options.draggable === !0 && i.$list.addClass("draggable")
        }, i.prototype.buildRows = function() {
            var t, i, e, s, o, n, r, a = this;
            if (s = document.createDocumentFragment(), n = a.$slider.children(), a.options.rows > 1) {
                for (r = a.options.slidesPerRow * a.options.rows, o = Math.ceil(n.length / r), t = 0; o > t; t++) {
                    var l = document.createElement("div");
                    for (i = 0; i < a.options.rows; i++) {
                        var h = document.createElement("div");
                        for (e = 0; e < a.options.slidesPerRow; e++) {
                            var c = t * r + (i * a.options.slidesPerRow + e);
                            n.get(c) && h.appendChild(n.get(c))
                        }
                        l.appendChild(h)
                    }
                    s.appendChild(l)
                }
                a.$slider.html(s), a.$slider.children().children().children().css({
                    width: 100 / a.options.slidesPerRow + "%",
                    display: "inline-block"
                })
            }
        }, i.prototype.checkResponsive = function(i, e) {
            var s, o, n, r = this,
                a = !1,
                l = r.$slider.width(),
                h = window.innerWidth || t(window).width();
            if ("window" === r.respondTo ? n = h : "slider" === r.respondTo ? n = l : "min" === r.respondTo && (n = Math.min(h, l)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
                o = null;
                for (s in r.breakpoints) r.breakpoints.hasOwnProperty(s) && (r.originalSettings.mobileFirst === !1 ? n < r.breakpoints[s] && (o = r.breakpoints[s]) : n > r.breakpoints[s] && (o = r.breakpoints[s]));
                null !== o ? null !== r.activeBreakpoint ? (o !== r.activeBreakpoint || e) && (r.activeBreakpoint = o, "unslick" === r.breakpointSettings[o] ? r.unslick(o) : (r.options = t.extend({}, r.originalSettings, r.breakpointSettings[o]), i === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(i)), a = o) : (r.activeBreakpoint = o, "unslick" === r.breakpointSettings[o] ? r.unslick(o) : (r.options = t.extend({}, r.originalSettings, r.breakpointSettings[o]), i === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(i)), a = o) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, i === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(i), a = o), i || a === !1 || r.$slider.trigger("breakpoint", [r, a])
            }
        }, i.prototype.changeSlide = function(i, e) {
            var s, o, n, r = this,
                a = t(i.target);
            switch (a.is("a") && i.preventDefault(), a.is("li") || (a = a.closest("li")), n = 0 !== r.slideCount % r.options.slidesToScroll, s = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, i.data.message) {
                case "previous":
                    o = 0 === s ? r.options.slidesToScroll : r.options.slidesToShow - s, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - o, !1, e);
                    break;
                case "next":
                    o = 0 === s ? r.options.slidesToScroll : s, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + o, !1, e);
                    break;
                case "index":
                    var l = 0 === i.data.index ? 0 : i.data.index || a.index() * r.options.slidesToScroll;
                    r.slideHandler(r.checkNavigable(l), !1, e), a.children().trigger("focus");
                    break;
                default:
                    return
            }
        }, i.prototype.checkNavigable = function(t) {
            var i, e, s = this;
            if (i = s.getNavigableIndexes(), e = 0, t > i[i.length - 1]) t = i[i.length - 1];
            else
                for (var o in i) {
                    if (t < i[o]) {
                        t = e;
                        break
                    }
                    e = i[o]
                }
            return t
        }, i.prototype.cleanUpEvents = function() {
            var i = this;
            i.options.dots && null !== i.$dots && (t("li", i.$dots).off("click.slick", i.changeSlide), i.options.pauseOnDotsHover === !0 && i.options.autoplay === !0 && t("li", i.$dots).off("mouseenter.slick", t.proxy(i.setPaused, i, !0)).off("mouseleave.slick", t.proxy(i.setPaused, i, !1))), i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow && i.$prevArrow.off("click.slick", i.changeSlide), i.$nextArrow && i.$nextArrow.off("click.slick", i.changeSlide)), i.$list.off("touchstart.slick mousedown.slick", i.swipeHandler), i.$list.off("touchmove.slick mousemove.slick", i.swipeHandler), i.$list.off("touchend.slick mouseup.slick", i.swipeHandler), i.$list.off("touchcancel.slick mouseleave.slick", i.swipeHandler), i.$list.off("click.slick", i.clickHandler), t(document).off(i.visibilityChange, i.visibility), i.$list.off("mouseenter.slick", t.proxy(i.setPaused, i, !0)), i.$list.off("mouseleave.slick", t.proxy(i.setPaused, i, !1)), i.options.accessibility === !0 && i.$list.off("keydown.slick", i.keyHandler), i.options.focusOnSelect === !0 && t(i.$slideTrack).children().off("click.slick", i.selectHandler), t(window).off("orientationchange.slick.slick-" + i.instanceUid, i.orientationChange), t(window).off("resize.slick.slick-" + i.instanceUid, i.resize), t("[draggable!=true]", i.$slideTrack).off("dragstart", i.preventDefault), t(window).off("load.slick.slick-" + i.instanceUid, i.setPosition), t(document).off("ready.slick.slick-" + i.instanceUid, i.setPosition)
        }, i.prototype.cleanUpRows = function() {
            var t, i = this;
            i.options.rows > 1 && (t = i.$slides.children().children(), t.removeAttr("style"), i.$slider.html(t))
        }, i.prototype.clickHandler = function(t) {
            var i = this;
            i.shouldClick === !1 && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault())
        }, i.prototype.destroy = function(i) {
            var e = this;
            e.autoPlayClear(), e.touchObject = {}, e.cleanUpEvents(), t(".slick-cloned", e.$slider).detach(), e.$dots && e.$dots.remove(), e.options.arrows === !0 && (e.$prevArrow && e.$prevArrow.length && (e.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove()), e.$nextArrow && e.$nextArrow.length && (e.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove())), e.$slides && (e.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
                t(this).attr("style", t(this).data("originalStyling"))
            }), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.detach(), e.$list.detach(), e.$slider.append(e.$slides)), e.cleanUpRows(), e.$slider.removeClass("slick-slider"), e.$slider.removeClass("slick-initialized"), e.unslicked = !0, i || e.$slider.trigger("destroy", [e])
        }, i.prototype.disableTransition = function(t) {
            var i = this,
                e = {};
            e[i.transitionType] = "", i.options.fade === !1 ? i.$slideTrack.css(e) : i.$slides.eq(t).css(e)
        }, i.prototype.fadeSlide = function(t, i) {
            var e = this;
            e.cssTransitions === !1 ? (e.$slides.eq(t).css({
                zIndex: e.options.zIndex
            }), e.$slides.eq(t).animate({
                opacity: 1
            }, e.options.speed, e.options.easing, i)) : (e.applyTransition(t), e.$slides.eq(t).css({
                opacity: 1,
                zIndex: e.options.zIndex
            }), i && setTimeout(function() {
                e.disableTransition(t), i.call()
            }, e.options.speed))
        }, i.prototype.fadeSlideOut = function(t) {
            var i = this;
            i.cssTransitions === !1 ? i.$slides.eq(t).animate({
                opacity: 0,
                zIndex: i.options.zIndex - 2
            }, i.options.speed, i.options.easing) : (i.applyTransition(t), i.$slides.eq(t).css({
                opacity: 0,
                zIndex: i.options.zIndex - 2
            }))
        }, i.prototype.filterSlides = i.prototype.slickFilter = function(t) {
            var i = this;
            null !== t && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.filter(t).appendTo(i.$slideTrack), i.reinit())
        }, i.prototype.getCurrent = i.prototype.slickCurrentSlide = function() {
            var t = this;
            return t.currentSlide
        }, i.prototype.getDotCount = function() {
            var t = this,
                i = 0,
                e = 0,
                s = 0;
            if (t.options.infinite === !0)
                for (; i < t.slideCount;) ++s, i = e + t.options.slidesToShow, e += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
            else if (t.options.centerMode === !0) s = t.slideCount;
            else
                for (; i < t.slideCount;) ++s, i = e + t.options.slidesToShow, e += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
            return s - 1
        }, i.prototype.getLeft = function(t) {
            var i, e, s, o = this,
                n = 0;
            return o.slideOffset = 0, e = o.$slides.first().outerHeight(!0), o.options.infinite === !0 ? (o.slideCount > o.options.slidesToShow && (o.slideOffset = -1 * o.slideWidth * o.options.slidesToShow, n = -1 * e * o.options.slidesToShow), 0 !== o.slideCount % o.options.slidesToScroll && t + o.options.slidesToScroll > o.slideCount && o.slideCount > o.options.slidesToShow && (t > o.slideCount ? (o.slideOffset = -1 * (o.options.slidesToShow - (t - o.slideCount)) * o.slideWidth, n = -1 * (o.options.slidesToShow - (t - o.slideCount)) * e) : (o.slideOffset = -1 * o.slideCount % o.options.slidesToScroll * o.slideWidth, n = -1 * o.slideCount % o.options.slidesToScroll * e))) : t + o.options.slidesToShow > o.slideCount && (o.slideOffset = (t + o.options.slidesToShow - o.slideCount) * o.slideWidth, n = (t + o.options.slidesToShow - o.slideCount) * e), o.slideCount <= o.options.slidesToShow && (o.slideOffset = 0, n = 0), o.options.centerMode === !0 && o.options.infinite === !0 ? o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2) - o.slideWidth : o.options.centerMode === !0 && (o.slideOffset = 0, o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2)), i = o.options.vertical === !1 ? -1 * t * o.slideWidth + o.slideOffset : -1 * t * e + n, o.options.variableWidth === !0 && (s = o.slideCount <= o.options.slidesToShow || o.options.infinite === !1 ? o.$slideTrack.children(".slick-slide").eq(t) : o.$slideTrack.children(".slick-slide").eq(t + o.options.slidesToShow), i = s[0] ? -1 * s[0].offsetLeft : 0, o.options.centerMode === !0 && (s = o.options.infinite === !1 ? o.$slideTrack.children(".slick-slide").eq(t) : o.$slideTrack.children(".slick-slide").eq(t + o.options.slidesToShow + 1), i = s[0] ? -1 * s[0].offsetLeft : 0, i += (o.$list.width() - s.outerWidth()) / 2)), i
        }, i.prototype.getOption = i.prototype.slickGetOption = function(t) {
            var i = this;
            return i.options[t]
        }, i.prototype.getNavigableIndexes = function() {
            var t, i = this,
                e = 0,
                s = 0,
                o = [];
            for (i.options.infinite === !1 ? t = i.slideCount : (e = -1 * i.options.slidesToScroll, s = -1 * i.options.slidesToScroll, t = 2 * i.slideCount); t > e;) o.push(e), e = s + i.options.slidesToScroll, s += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
            return o
        }, i.prototype.getSlick = function() {
            return this
        }, i.prototype.getSlideCount = function() {
            var i, e, s, o = this;
            return s = o.options.centerMode === !0 ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, o.options.swipeToSlide === !0 ? (o.$slideTrack.find(".slick-slide").each(function(i, n) {
                return n.offsetLeft - s + t(n).outerWidth() / 2 > -1 * o.swipeLeft ? (e = n, !1) : void 0
            }), i = Math.abs(t(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
        }, i.prototype.goTo = i.prototype.slickGoTo = function(t, i) {
            var e = this;
            e.changeSlide({
                data: {
                    message: "index",
                    index: parseInt(t)
                }
            }, i)
        }, i.prototype.init = function(i) {
            var e = this;
            t(e.$slider).hasClass("slick-initialized") || (t(e.$slider).addClass("slick-initialized"), e.buildRows(), e.buildOut(), e.setProps(), e.startLoad(), e.loadSlider(), e.initializeEvents(), e.updateArrows(), e.updateDots()), i && e.$slider.trigger("init", [e]), e.options.accessibility === !0 && e.initADA()
        }, i.prototype.initArrowEvents = function() {
            var t = this;
            t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.on("click.slick", {
                message: "previous"
            }, t.changeSlide), t.$nextArrow.on("click.slick", {
                message: "next"
            }, t.changeSlide))
        }, i.prototype.initDotEvents = function() {
            var i = this;
            i.options.dots === !0 && i.slideCount > i.options.slidesToShow && t("li", i.$dots).on("click.slick", {
                message: "index"
            }, i.changeSlide), i.options.dots === !0 && i.options.pauseOnDotsHover === !0 && i.options.autoplay === !0 && t("li", i.$dots).on("mouseenter.slick", t.proxy(i.setPaused, i, !0)).on("mouseleave.slick", t.proxy(i.setPaused, i, !1))
        }, i.prototype.initializeEvents = function() {
            var i = this;
            i.initArrowEvents(), i.initDotEvents(), i.$list.on("touchstart.slick mousedown.slick", {
                action: "start"
            }, i.swipeHandler), i.$list.on("touchmove.slick mousemove.slick", {
                action: "move"
            }, i.swipeHandler), i.$list.on("touchend.slick mouseup.slick", {
                action: "end"
            }, i.swipeHandler), i.$list.on("touchcancel.slick mouseleave.slick", {
                action: "end"
            }, i.swipeHandler), i.$list.on("click.slick", i.clickHandler), t(document).on(i.visibilityChange, t.proxy(i.visibility, i)), i.$list.on("mouseenter.slick", t.proxy(i.setPaused, i, !0)), i.$list.on("mouseleave.slick", t.proxy(i.setPaused, i, !1)), i.options.accessibility === !0 && i.$list.on("keydown.slick", i.keyHandler), i.options.focusOnSelect === !0 && t(i.$slideTrack).children().on("click.slick", i.selectHandler), t(window).on("orientationchange.slick.slick-" + i.instanceUid, t.proxy(i.orientationChange, i)), t(window).on("resize.slick.slick-" + i.instanceUid, t.proxy(i.resize, i)), t("[draggable!=true]", i.$slideTrack).on("dragstart", i.preventDefault), t(window).on("load.slick.slick-" + i.instanceUid, i.setPosition), t(document).on("ready.slick.slick-" + i.instanceUid, i.setPosition)
        }, i.prototype.initUI = function() {
            var t = this;
            t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.show(), t.options.autoplay === !0 && t.autoPlay()
        }, i.prototype.keyHandler = function(t) {
            var i = this;
            t.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === t.keyCode && i.options.accessibility === !0 ? i.changeSlide({
                data: {
                    message: "previous"
                }
            }) : 39 === t.keyCode && i.options.accessibility === !0 && i.changeSlide({
                data: {
                    message: "next"
                }
            }))
        }, i.prototype.lazyLoad = function() {
            function i(i) {
                t("img[data-lazy]", i).each(function() {
                    var i = t(this),
                        e = t(this).attr("data-lazy"),
                        s = document.createElement("img");
                    s.onload = function() {
                        i.animate({
                            opacity: 0
                        }, 100, function() {
                            i.attr("src", e).animate({
                                opacity: 1
                            }, 200, function() {
                                i.removeAttr("data-lazy").removeClass("slick-loading")
                            })
                        })
                    }, s.src = e
                })
            }
            var e, s, o, n, r = this;
            r.options.centerMode === !0 ? r.options.infinite === !0 ? (o = r.currentSlide + (r.options.slidesToShow / 2 + 1), n = o + r.options.slidesToShow + 2) : (o = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)), n = 2 + (r.options.slidesToShow / 2 + 1) + r.currentSlide) : (o = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide, n = o + r.options.slidesToShow, r.options.fade === !0 && (o > 0 && o--, n <= r.slideCount && n++)), e = r.$slider.find(".slick-slide").slice(o, n), i(e), r.slideCount <= r.options.slidesToShow ? (s = r.$slider.find(".slick-slide"), i(s)) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? (s = r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow), i(s)) : 0 === r.currentSlide && (s = r.$slider.find(".slick-cloned").slice(-1 * r.options.slidesToShow), i(s))
        }, i.prototype.loadSlider = function() {
            var t = this;
            t.setPosition(), t.$slideTrack.css({
                opacity: 1
            }), t.$slider.removeClass("slick-loading"), t.initUI(), "progressive" === t.options.lazyLoad && t.progressiveLazyLoad()
        }, i.prototype.next = i.prototype.slickNext = function() {
            var t = this;
            t.changeSlide({
                data: {
                    message: "next"
                }
            })
        }, i.prototype.orientationChange = function() {
            var t = this;
            t.checkResponsive(), t.setPosition()
        }, i.prototype.pause = i.prototype.slickPause = function() {
            var t = this;
            t.autoPlayClear(), t.paused = !0
        }, i.prototype.play = i.prototype.slickPlay = function() {
            var t = this;
            t.paused = !1, t.autoPlay()
        }, i.prototype.postSlide = function(t) {
            var i = this;
            i.$slider.trigger("afterChange", [i, t]), i.animating = !1, i.setPosition(), i.swipeLeft = null, i.options.autoplay === !0 && i.paused === !1 && i.autoPlay(), i.options.accessibility === !0 && i.initADA()
        }, i.prototype.prev = i.prototype.slickPrev = function() {
            var t = this;
            t.changeSlide({
                data: {
                    message: "previous"
                }
            })
        }, i.prototype.preventDefault = function(t) {
            t.preventDefault()
        }, i.prototype.progressiveLazyLoad = function() {
            var i, e, s = this;
            i = t("img[data-lazy]", s.$slider).length, i > 0 && (e = t("img[data-lazy]", s.$slider).first(), e.attr("src", e.attr("data-lazy")).removeClass("slick-loading").load(function() {
                e.removeAttr("data-lazy"), s.progressiveLazyLoad(), s.options.adaptiveHeight === !0 && s.setPosition()
            }).error(function() {
                e.removeAttr("data-lazy"), s.progressiveLazyLoad()
            }))
        }, i.prototype.refresh = function(i) {
            var e = this,
                s = e.currentSlide;
            e.destroy(!0), t.extend(e, e.initials, {
                currentSlide: s
            }), e.init(), i || e.changeSlide({
                data: {
                    message: "index",
                    index: s
                }
            }, !1)
        }, i.prototype.registerBreakpoints = function() {
            var i, e, s, o = this,
                n = o.options.responsive || null;
            if ("array" === t.type(n) && n.length) {
                o.respondTo = o.options.respondTo || "window";
                for (i in n)
                    if (s = o.breakpoints.length - 1, e = n[i].breakpoint, n.hasOwnProperty(i)) {
                        for (; s >= 0;) o.breakpoints[s] && o.breakpoints[s] === e && o.breakpoints.splice(s, 1), s--;
                        o.breakpoints.push(e), o.breakpointSettings[e] = n[i].settings
                    }
                o.breakpoints.sort(function(t, i) {
                    return o.options.mobileFirst ? t - i : i - t
                })
            }
        }, i.prototype.reinit = function() {
            var i = this;
            i.$slides = i.$slideTrack.children(i.options.slide).addClass("slick-slide"), i.slideCount = i.$slides.length, i.currentSlide >= i.slideCount && 0 !== i.currentSlide && (i.currentSlide = i.currentSlide - i.options.slidesToScroll), i.slideCount <= i.options.slidesToShow && (i.currentSlide = 0), i.registerBreakpoints(), i.setProps(), i.setupInfinite(), i.buildArrows(), i.updateArrows(), i.initArrowEvents(), i.buildDots(), i.updateDots(), i.initDotEvents(), i.checkResponsive(!1, !0), i.options.focusOnSelect === !0 && t(i.$slideTrack).children().on("click.slick", i.selectHandler), i.setSlideClasses(0), i.setPosition(), i.$slider.trigger("reInit", [i]), i.options.autoplay === !0 && i.focusHandler()
        }, i.prototype.resize = function() {
            var i = this;
            t(window).width() !== i.windowWidth && (clearTimeout(i.windowDelay), i.windowDelay = window.setTimeout(function() {
                i.windowWidth = t(window).width(), i.checkResponsive(), i.unslicked || i.setPosition()
            }, 50))
        }, i.prototype.removeSlide = i.prototype.slickRemove = function(t, i, e) {
            var s = this;
            return "boolean" == typeof t ? (i = t, t = i === !0 ? 0 : s.slideCount - 1) : t = i === !0 ? --t : t, !(s.slideCount < 1 || 0 > t || t > s.slideCount - 1) && (s.unload(), e === !0 ? s.$slideTrack.children().remove() : s.$slideTrack.children(this.options.slide).eq(t).remove(), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slidesCache = s.$slides, void s.reinit())
        }, i.prototype.setCSS = function(t) {
            var i, e, s = this,
                o = {};
            s.options.rtl === !0 && (t = -t), i = "left" == s.positionProp ? Math.ceil(t) + "px" : "0px", e = "top" == s.positionProp ? Math.ceil(t) + "px" : "0px", o[s.positionProp] = t, s.transformsEnabled === !1 ? s.$slideTrack.css(o) : (o = {}, s.cssTransitions === !1 ? (o[s.animType] = "translate(" + i + ", " + e + ")", s.$slideTrack.css(o)) : (o[s.animType] = "translate3d(" + i + ", " + e + ", 0px)", s.$slideTrack.css(o)))
        }, i.prototype.setDimensions = function() {
            var t = this;
            t.options.vertical === !1 ? t.options.centerMode === !0 && t.$list.css({
                padding: "0px " + t.options.centerPadding
            }) : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow), t.options.centerMode === !0 && t.$list.css({
                padding: t.options.centerPadding + " 0px"
            })), t.listWidth = t.$list.width(), t.listHeight = t.$list.height(), t.options.vertical === !1 && t.options.variableWidth === !1 ? (t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow), t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length))) : t.options.variableWidth === !0 ? t.$slideTrack.width(5e3 * t.slideCount) : (t.slideWidth = Math.ceil(t.listWidth), t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
            var i = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
            t.options.variableWidth === !1 && t.$slideTrack.children(".slick-slide").width(t.slideWidth - i)
        }, i.prototype.setFade = function() {
            var i, e = this;
            e.$slides.each(function(s, o) {
                i = -1 * e.slideWidth * s, e.options.rtl === !0 ? t(o).css({
                    position: "relative",
                    right: i,
                    top: 0,
                    zIndex: e.options.zIndex - 2,
                    opacity: 0
                }) : t(o).css({
                    position: "relative",
                    left: i,
                    top: 0,
                    zIndex: e.options.zIndex - 2,
                    opacity: 0
                })
            }), e.$slides.eq(e.currentSlide).css({
                zIndex: e.options.zIndex - 1,
                opacity: 1
            })
        }, i.prototype.setHeight = function() {
            var t = this;
            if (1 === t.options.slidesToShow && t.options.adaptiveHeight === !0 && t.options.vertical === !1) {
                var i = t.$slides.eq(t.currentSlide).outerHeight(!0);
                t.$list.css("height", i)
            }
        }, i.prototype.setOption = i.prototype.slickSetOption = function(i, e, s) {
            var o, n, r = this;
            if ("responsive" === i && "array" === t.type(e))
                for (n in e)
                    if ("array" !== t.type(r.options.responsive)) r.options.responsive = [e[n]];
                    else {
                        for (o = r.options.responsive.length - 1; o >= 0;) r.options.responsive[o].breakpoint === e[n].breakpoint && r.options.responsive.splice(o, 1), o--;
                        r.options.responsive.push(e[n])
                    } else r.options[i] = e;
            s === !0 && (r.unload(), r.reinit())
        }, i.prototype.setPosition = function() {
            var t = this;
            t.setDimensions(), t.setHeight(), t.options.fade === !1 ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), t.$slider.trigger("setPosition", [t])
        }, i.prototype.setProps = function() {
            var t = this,
                i = document.body.style;
            t.positionProp = t.options.vertical === !0 ? "top" : "left", "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"), (void 0 !== i.WebkitTransition || void 0 !== i.MozTransition || void 0 !== i.msTransition) && t.options.useCSS === !0 && (t.cssTransitions = !0), t.options.fade && ("number" == typeof t.options.zIndex ? t.options.zIndex < 3 && (t.options.zIndex = 3) : t.options.zIndex = t.defaults.zIndex), void 0 !== i.OTransform && (t.animType = "OTransform", t.transformType = "-o-transform", t.transitionType = "OTransition", void 0 === i.perspectiveProperty && void 0 === i.webkitPerspective && (t.animType = !1)), void 0 !== i.MozTransform && (t.animType = "MozTransform", t.transformType = "-moz-transform", t.transitionType = "MozTransition", void 0 === i.perspectiveProperty && void 0 === i.MozPerspective && (t.animType = !1)), void 0 !== i.webkitTransform && (t.animType = "webkitTransform", t.transformType = "-webkit-transform", t.transitionType = "webkitTransition", void 0 === i.perspectiveProperty && void 0 === i.webkitPerspective && (t.animType = !1)), void 0 !== i.msTransform && (t.animType = "msTransform", t.transformType = "-ms-transform", t.transitionType = "msTransition", void 0 === i.msTransform && (t.animType = !1)), void 0 !== i.transform && t.animType !== !1 && (t.animType = "transform", t.transformType = "transform", t.transitionType = "transition"), t.transformsEnabled = null !== t.animType && t.animType !== !1
        }, i.prototype.setSlideClasses = function(t) {
            var i, e, s, o, n = this;
            e = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(t).addClass("slick-current"), n.options.centerMode === !0 ? (i = Math.floor(n.options.slidesToShow / 2), n.options.infinite === !0 && (t >= i && t <= n.slideCount - 1 - i ? n.$slides.slice(t - i, t + i + 1).addClass("slick-active").attr("aria-hidden", "false") : (s = n.options.slidesToShow + t, e.slice(s - i + 1, s + i + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === t ? e.eq(e.length - 1 - n.options.slidesToShow).addClass("slick-center") : t === n.slideCount - 1 && e.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(t).addClass("slick-center")) : t >= 0 && t <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(t, t + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : e.length <= n.options.slidesToShow ? e.addClass("slick-active").attr("aria-hidden", "false") : (o = n.slideCount % n.options.slidesToShow, s = n.options.infinite === !0 ? n.options.slidesToShow + t : t, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - t < n.options.slidesToShow ? e.slice(s - (n.options.slidesToShow - o), s + o).addClass("slick-active").attr("aria-hidden", "false") : e.slice(s, s + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === n.options.lazyLoad && n.lazyLoad()
        }, i.prototype.setupInfinite = function() {
            var i, e, s, o = this;
            if (o.options.fade === !0 && (o.options.centerMode = !1), o.options.infinite === !0 && o.options.fade === !1 && (e = null, o.slideCount > o.options.slidesToShow)) {
                for (s = o.options.centerMode === !0 ? o.options.slidesToShow + 1 : o.options.slidesToShow, i = o.slideCount; i > o.slideCount - s; i -= 1) e = i - 1, t(o.$slides[e]).clone(!0).attr("id", "").attr("data-slick-index", e - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
                for (i = 0; s > i; i += 1) e = i, t(o.$slides[e]).clone(!0).attr("id", "").attr("data-slick-index", e + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
                o.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                    t(this).attr("id", "")
                })
            }
        }, i.prototype.setPaused = function(t) {
            var i = this;
            i.options.autoplay === !0 && i.options.pauseOnHover === !0 && (i.paused = t, t ? i.autoPlayClear() : i.autoPlay())
        }, i.prototype.selectHandler = function(i) {
            var e = this,
                s = t(i.target).is(".slick-slide") ? t(i.target) : t(i.target).parents(".slick-slide"),
                o = parseInt(s.attr("data-slick-index"));
            return o || (o = 0), e.slideCount <= e.options.slidesToShow ? (e.setSlideClasses(o), void e.asNavFor(o)) : void e.slideHandler(o)
        }, i.prototype.slideHandler = function(t, i, e) {
            var s, o, n, r, a = null,
                l = this;
            return i = i || !1, l.animating === !0 && l.options.waitForAnimate === !0 || l.options.fade === !0 && l.currentSlide === t || l.slideCount <= l.options.slidesToShow ? void 0 : (i === !1 && l.asNavFor(t), s = t, a = l.getLeft(s), r = l.getLeft(l.currentSlide), l.currentLeft = null === l.swipeLeft ? r : l.swipeLeft, l.options.infinite === !1 && l.options.centerMode === !1 && (0 > t || t > l.getDotCount() * l.options.slidesToScroll) ? void(l.options.fade === !1 && (s = l.currentSlide, e !== !0 ? l.animateSlide(r, function() {
                l.postSlide(s)
            }) : l.postSlide(s))) : l.options.infinite === !1 && l.options.centerMode === !0 && (0 > t || t > l.slideCount - l.options.slidesToScroll) ? void(l.options.fade === !1 && (s = l.currentSlide, e !== !0 ? l.animateSlide(r, function() {
                l.postSlide(s)
            }) : l.postSlide(s))) : (l.options.autoplay === !0 && clearInterval(l.autoPlayTimer), o = 0 > s ? 0 !== l.slideCount % l.options.slidesToScroll ? l.slideCount - l.slideCount % l.options.slidesToScroll : l.slideCount + s : s >= l.slideCount ? 0 !== l.slideCount % l.options.slidesToScroll ? 0 : s - l.slideCount : s, l.animating = !0, l.$slider.trigger("beforeChange", [l, l.currentSlide, o]), n = l.currentSlide, l.currentSlide = o, l.setSlideClasses(l.currentSlide), l.updateDots(), l.updateArrows(), l.options.fade === !0 ? (e !== !0 ? (l.fadeSlideOut(n), l.fadeSlide(o, function() {
                l.postSlide(o)
            })) : l.postSlide(o), void l.animateHeight()) : void(e !== !0 ? l.animateSlide(a, function() {
                l.postSlide(o)
            }) : l.postSlide(o))))
        }, i.prototype.startLoad = function() {
            var t = this;
            t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.hide(), t.$slider.addClass("slick-loading")
        }, i.prototype.swipeDirection = function() {
            var t, i, e, s, o = this;
            return t = o.touchObject.startX - o.touchObject.curX, i = o.touchObject.startY - o.touchObject.curY, e = Math.atan2(i, t), s = Math.round(180 * e / Math.PI), 0 > s && (s = 360 - Math.abs(s)), 45 >= s && s >= 0 ? o.options.rtl === !1 ? "left" : "right" : 360 >= s && s >= 315 ? o.options.rtl === !1 ? "left" : "right" : s >= 135 && 225 >= s ? o.options.rtl === !1 ? "right" : "left" : o.options.verticalSwiping === !0 ? s >= 35 && 135 >= s ? "left" : "right" : "vertical"
        }, i.prototype.swipeEnd = function() {
            var t, i = this;
            if (i.dragging = !1, i.shouldClick = !(i.touchObject.swipeLength > 10), void 0 === i.touchObject.curX) return !1;
            if (i.touchObject.edgeHit === !0 && i.$slider.trigger("edge", [i, i.swipeDirection()]), i.touchObject.swipeLength >= i.touchObject.minSwipe) switch (i.swipeDirection()) {
                case "left":
                    t = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide + i.getSlideCount()) : i.currentSlide + i.getSlideCount(), i.slideHandler(t), i.currentDirection = 0, i.touchObject = {}, i.$slider.trigger("swipe", [i, "left"]);
                    break;
                case "right":
                    t = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide - i.getSlideCount()) : i.currentSlide - i.getSlideCount(), i.slideHandler(t), i.currentDirection = 1, i.touchObject = {}, i.$slider.trigger("swipe", [i, "right"])
            } else i.touchObject.startX !== i.touchObject.curX && (i.slideHandler(i.currentSlide), i.touchObject = {})
        }, i.prototype.swipeHandler = function(t) {
            var i = this;
            if (!(i.options.swipe === !1 || "ontouchend" in document && i.options.swipe === !1 || i.options.draggable === !1 && -1 !== t.type.indexOf("mouse"))) switch (i.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1, i.touchObject.minSwipe = i.listWidth / i.options.touchThreshold, i.options.verticalSwiping === !0 && (i.touchObject.minSwipe = i.listHeight / i.options.touchThreshold), t.data.action) {
                case "start":
                    i.swipeStart(t);
                    break;
                case "move":
                    i.swipeMove(t);
                    break;
                case "end":
                    i.swipeEnd(t)
            }
        }, i.prototype.swipeMove = function(t) {
            var i, e, s, o, n, r = this;
            return n = void 0 !== t.originalEvent ? t.originalEvent.touches : null, !(!r.dragging || n && 1 !== n.length) && (i = r.getLeft(r.currentSlide), r.touchObject.curX = void 0 !== n ? n[0].pageX : t.clientX, r.touchObject.curY = void 0 !== n ? n[0].pageY : t.clientY, r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curX - r.touchObject.startX, 2))), r.options.verticalSwiping === !0 && (r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curY - r.touchObject.startY, 2)))), e = r.swipeDirection(), "vertical" !== e ? (void 0 !== t.originalEvent && r.touchObject.swipeLength > 4 && t.preventDefault(), o = (r.options.rtl === !1 ? 1 : -1) * (r.touchObject.curX > r.touchObject.startX ? 1 : -1), r.options.verticalSwiping === !0 && (o = r.touchObject.curY > r.touchObject.startY ? 1 : -1), s = r.touchObject.swipeLength, r.touchObject.edgeHit = !1, r.options.infinite === !1 && (0 === r.currentSlide && "right" === e || r.currentSlide >= r.getDotCount() && "left" === e) && (s = r.touchObject.swipeLength * r.options.edgeFriction, r.touchObject.edgeHit = !0), r.swipeLeft = r.options.vertical === !1 ? i + s * o : i + s * (r.$list.height() / r.listWidth) * o, r.options.verticalSwiping === !0 && (r.swipeLeft = i + s * o), r.options.fade !== !0 && r.options.touchMove !== !1 && (r.animating === !0 ? (r.swipeLeft = null, !1) : void r.setCSS(r.swipeLeft))) : void 0)
        }, i.prototype.swipeStart = function(t) {
            var i, e = this;
            return 1 !== e.touchObject.fingerCount || e.slideCount <= e.options.slidesToShow ? (e.touchObject = {}, !1) : (void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (i = t.originalEvent.touches[0]), e.touchObject.startX = e.touchObject.curX = void 0 !== i ? i.pageX : t.clientX, e.touchObject.startY = e.touchObject.curY = void 0 !== i ? i.pageY : t.clientY, void(e.dragging = !0))
        }, i.prototype.unfilterSlides = i.prototype.slickUnfilter = function() {
            var t = this;
            null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit())
        }, i.prototype.unload = function() {
            var i = this;
            t(".slick-cloned", i.$slider).remove(), i.$dots && i.$dots.remove(), i.$prevArrow && i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove(), i.$nextArrow && i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove(),
                i.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
        }, i.prototype.unslick = function(t) {
            var i = this;
            i.$slider.trigger("unslick", [i, t]), i.destroy()
        }, i.prototype.updateArrows = function() {
            var t, i = this;
            t = Math.floor(i.options.slidesToShow / 2), i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && i.options.centerMode === !1 ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && i.options.centerMode === !0 && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
        }, i.prototype.updateDots = function() {
            var t = this;
            null !== t.$dots && (t.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
        }, i.prototype.visibility = function() {
            var t = this;
            document[t.hidden] ? (t.paused = !0, t.autoPlayClear()) : t.options.autoplay === !0 && (t.paused = !1, t.autoPlay())
        }, i.prototype.initADA = function() {
            var i = this;
            i.$slides.add(i.$slideTrack.find(".slick-cloned")).attr({
                "aria-hidden": "true",
                tabindex: "-1"
            }).find("a, input, button, select").attr({
                tabindex: "-1"
            }), i.$slideTrack.attr("role", "listbox"), i.$slides.not(i.$slideTrack.find(".slick-cloned")).each(function(e) {
                t(this).attr({
                    role: "option",
                    "aria-describedby": "slick-slide" + i.instanceUid + e
                })
            }), null !== i.$dots && i.$dots.attr("role", "tablist").find("li").each(function(e) {
                t(this).attr({
                    role: "presentation",
                    "aria-selected": "false",
                    "aria-controls": "navigation" + i.instanceUid + e,
                    id: "slick-slide" + i.instanceUid + e
                })
            }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), i.activateADA()
        }, i.prototype.activateADA = function() {
            var t = this,
                i = t.$slider.find("*").is(":focus");
            t.$slideTrack.find(".slick-active").attr({
                "aria-hidden": "false",
                tabindex: "0"
            }).find("a, input, button, select").attr({
                tabindex: "0"
            }), i && t.$slideTrack.find(".slick-active").focus()
        }, i.prototype.focusHandler = function() {
            var i = this;
            i.$slider.on("focus.slick blur.slick", "*", function(e) {
                e.stopImmediatePropagation();
                var s = t(this);
                setTimeout(function() {
                    i.isPlay && (s.is(":focus") ? (i.autoPlayClear(), i.paused = !0) : (i.paused = !1, i.autoPlay()))
                }, 0)
            })
        }, t.fn.slick = function() {
            var t, e = this,
                s = arguments[0],
                o = Array.prototype.slice.call(arguments, 1),
                n = e.length,
                r = 0;
            for (r; n > r; r++)
                if ("object" == typeof s || "undefined" == typeof s ? e[r].slick = new i(e[r], s) : t = e[r].slick[s].apply(e[r].slick, o), "undefined" != typeof t) return t;
            return e
        }
    }), void 0 === healthyStudies) var healthyStudies = {};
if (healthyStudies.tracking = function(t) {
        var i = {
            init: function() {
                this.eventTracking()
            },
            eventTracking: function() {
                t("._gt").click(function() {
                    var i = t(this).attr("data-category"),
                        e = t(this).attr("data-action"),
                        s = t(this).attr("data-label");
                    healthyStudies.tracking.trackEvent(i, e, s)
                }), t(".primary-nav .facebook").on("click", function() {
                    healthyStudies.tracking.trackEvent("Header", "Facebook", "Header - Facebook")
                }), t(".nav-extras .call-us").on("click", function() {
                    healthyStudies.tracking.trackEvent("Header", "Call", "Header - Call Buttin")
                }), t(".accordian li").on("click", function() {
                    healthyStudies.tracking.trackEvent("FAQ", "More", t(this).find(".accordian-header").text())
                }), t(".FormButton").on("click", function() {
                    healthyStudies.tracking.trackEvent("Contact Us", "Submit", "Contact Us - Submit")
                }), t(".study-sign-up").on("click", function() {
                    healthyStudies.tracking.trackEvent("Current Studies", "Sign Up", t(this).parents(".current-study").find("h2").text() + " Sign Up")
                });
                var i = document.createElement("script");
                i.src = "https://www.youtube.com/iframe_api";
                var e = document.getElementsByTagName("script")[0];
                e.parentNode.insertBefore(i, e);
                var s = "";
                window.onYouTubeIframeAPIReady = function(i) {
                    function e(t) {}

                    function o(t) {
                        t.data == YT.PlayerState.PLAYING && (healthyStudies.tracking.trackEvent("How It Works", "Video Play", "Help Others - Play"), n = !0), t.data == YT.PlayerState.PAUSED && n && (healthyStudies.tracking.trackEvent("How It Works", "Video Play", "Help Others - Pause"), n = !1)
                    }
                    s = new YT.Player(t(".youtube-player iframe").get(0), {
                        events: {
                            onReady: e,
                            onStateChange: o
                        }
                    });
                    var n = !1
                }
            },
            trackEvent: function(t, i, e) {
                ga("send", "event", t, i, e)
            }
        };
        return i
    }(jQuery), jQuery(function() {}), void 0 === wwctrials) var wwctrials = {};
wwctrials.main = function(t) {
    var i = t("body").is(".EditMode"),
        e = t("body").is(".DesignMode"),
        s = {
            init: function() {
                this.externalLinks(), this.heroArrow(), this.mobileNav(), this.clickFirstLink(), this.parallax(), this.homeTherapeuticAreas(), this.scrollable(), this.tabSelector(), this.regionalMessage(), this.videoModal(), this.librarySignupModal(), this.collapsibleBox(), this.searchToggle(), this.imageSlider(), this.contactUs(), this.methodsSearch()
            },
            externalLinks: function() {
                t('a[href^="http"]').each(function() {
                    this.href.indexOf(location.host) == -1 && t(this).attr("target", "_blank")
                })
            },
            collapsibleBox: function() {
                var s = t(".collapsible-box-webpart");
                if (s.length > 0)
                    if (i || e) {
                        var o = s.find(".collapsible-heading");
                        o.addClass("active"), o.next(".collapsible-content").show()
                    } else s.find(".collapsible-heading").on("click", function() {
                        var i = t(this);
                        i.toggleClass("active"), i.next(".collapsible-content").slideToggle()
                    })
            },
            searchToggle: function() {
                t(".header-search").length > 0 && (t(".search-toggle").on("click", function() {
                    var i = t(this),
                        e = t(".header-search");
                    i.hasClass("active") ? (i.removeClass("active"), e.fadeOut()) : (i.addClass("active"), e.fadeIn())
                }), t(".search-close").on("click", function() {
                    var i = t(".header-search"),
                        e = t(".search-toggle");
                    e.removeClass("active"), i.fadeOut()
                }))
            },
            heroArrow: function() {
                var i = t(".hero-image-webpart, .hero-video-webpart"),
                    e = i.find(".down-arrow");
                e.on("click", function() {
                    t("html, body").animate({
                        scrollTop: i.offset().top + i.height()
                    }, 500)
                })
            },
            parallax: function() {
                if (console.log("paralax activated"), s.isMobile.any()) return void t(".hero-image-webpart").each(function(i, e) {
                    t(this).find(".img-bg").css("background-position", "50% 0"), t(this).find(".img-bg").css("background-attachment", "scroll")
                });
                var i = [],
                    e = function() {
                        i = [], t(".hero-image-webpart").each(function(e, s) {
                            e > 0 ? (t(this).find(".img-bg").css("background-position", "50% 0"), t(this).find(".img-bg").css("background-attachment", "scroll")) : i.push({
                                startingPos: t(s).offset().top,
                                elem: t(s)
                            })
                        })
                    };
                e(), t(window).on("resize", function() {
                    e(), t(window).trigger("scroll")
                }), t(window).on("scroll", function() {
                    t(i).each(function(i, e) {
                        var s = e.startingPos - t(window).scrollTop();
                        s < 0 ? e.elem.find(".img-bg").css("background-position", "50% " + s / 2 + "px") : e.elem.find(".img-bg").css("background-position", "50% " + s + "px")
                    })
                }), t(window).trigger("scroll")
            },
            mobileNav: function() {
                var i = t(".nav-icon"),
                    e = t(".mobile-nav");
                if (e.is(":visible")) {
                    i.on("click", function() {
                        t(this).is(".open") ? e.removeClass("open") : e.addClass("open")
                    });
                    var s = e.find(".root-nav"),
                        o = e.find(".sub-nav");
                    o.each(function() {
                        var i = t(this),
                            s = i.siblings("a");
                        s.data("subnav", i), s.addClass("has-children"), i.remove().appendTo(e)
                    }), t(window).on("load", function() {
                        new IScroll(s.get(0), {
                            click: !0
                        });
                        o.each(function() {
                            new IScroll(this, {
                                click: !0
                            })
                        })
                    }), e.on("click", "a", function(i) {
                        var s = t(this),
                            n = s.data("subnav");
                        void 0 != n ? (i.preventDefault(), n.addClass("open")) : (e.removeClass("open"), o.removeCLass("open"))
                    }), e.on("click", ".back", function(i) {
                        var e = t(this);
                        e.closest(".sub-nav").removeClass("open")
                    })
                } else i.on("click", function() {
                    var e = t(".primary-nav");
                    t(this).is(".open") ? (e.removeClass("open"), i.removeClass("open")) : (e.addClass("open"), i.addClass("open"))
                })
            },
            clickFirstLink: function() {
                i || t(".click-first-link").on("click", function() {
                    var i = t(this).find("a[href]").attr("href");
                    void 0 != i && "" != i && (window.location = i)
                })
            },
            homeTherapeuticAreas: function() {
                var i = t(".home-therapeutic-icons-wrapper"),
                    e = t(".home-therapeutic-icon"),
                    s = Math.max(e.length, 1);
                i.on("click", ".next, .previous", function(i) {
                    var o, n = t(i.target),
                        r = e.index(e.filter(".active").get(0));
                    o = n.is(".next") ? (r + 1) % s : 0 == r ? s - 1 : r - 1, e.eq(r).removeClass("active"), e.eq(o).addClass("active")
                })
            },
            scrollable: function() {
                t(window).load(function() {
                    var i = t(".scroll-wrapper");
                    i.each(function(i, e) {
                        var s = t(e),
                            o = s.find(".scroller");
                        if (1 == o.length) {
                            s.height(o.height());
                            new IScroll(e, {
                                eventPassthrough: !0,
                                scrollX: !0,
                                scrollY: !1
                            })
                        }
                    })
                })
            },
            tabSelector: function() {
                var i = t(".tabs");
                i.on("click", ".tab", function(i) {
                    var e = t(this),
                        s = e.closest(".tabs"),
                        o = s.find(".tab");
                    o.length > 1 && 1 == o.filter(":visible").length ? (i.preventDefault(), s.addClass("overlay")) : s.is(".overlay") && e.is(".selected") && (i.preventDefault(), s.removeClass("overlay"))
                })
            },
            regionalMessage: function() {
                var i = t(".regional-message-webpart");
                i.find(".close-btn").on("click", function() {
                    i.addClass("hide"), s.setCookie("rgnmsg", "1", 365)
                })
            },
            videoModal: function() {
                var i = t(".video-modal"),
                    e = i.find(".video-iframe"),
                    o = i.find(".modal-title");
                i.on("show.bs.modal", function(i) {
                    var n = t(i.relatedTarget),
                        r = n.data("title");
                    o.text(r);
                    var a = s.convertToYouTubeEmbedUrl(n.attr("href"));
                    e.attr("src", a)
                }), i.on("hide.bs.modal", function() {
                    e.attr("src", "")
                })
            },
            librarySignupModal: function() {
                var i = t(".library-signup-modal"),
                    e = i.find(".feature-signup-success a");
                if (i.length > 0) {
                    var o = t(".library-featured a, .featured-resource a");
                    o.on("click", function(o) {
                        var n = t(this);
                        e.attr("href", n.attr("href"));
                        var r = s.getCookie("libsignup");
                        "1" != r && (o.preventDefault(), i.modal("show"))
                    })
                }
            },
            imageSlider: function() {
                t(".image-slider-webpart").each(function() {
                    var i = t(this);
                    i.slick({
                        arrows: !0,
                        dots: !0,
                        autoplay: !0,
                        autoplaySpeed: 12e3,
                        slide: ".image-slide",
                        prevArrow: ".prev-slide",
                        nextArrow: ".next-slide"
                    })
                })
            },
            contactUs: function() {
                var i = t(".contact-us-webpart"),
                    e = null;
                if (i.length > 0) {
                    var s = i.find(".contact-options");
                    s.on("change", function() {
                        var t = i.find("." + this.value);
                        t.length > 0 && (null != e && e.hide(), t.show(), e = t)
                    })
                }
            },
            methodsSearch: function() {
                var i = t(".methods-search-webpart"),
                    e = i.find(".textbox"),
                    s = i.find("input[type=submit]");
                e.on("keypress", function(t) {
                    if (13 === t.keyCode) return t.preventDefault(), s.click(), !1
                })
            },
            convertToYouTubeEmbedUrl: function(t) {
                var i = /v=([^&]+)/,
                    e = i.exec(t);
                return e.length > 1 ? "https://www.youtube.com/embed/" + e[1] + "?autoplay=1&autohide=0" : ""
            },
            getCookie: function(t) {
                for (var i = t + "=", e = document.cookie.split(";"), s = 0; s < e.length; s++) {
                    for (var o = e[s];
                        " " == o.charAt(0);) o = o.substring(1);
                    if (0 == o.indexOf(i)) return o.substring(i.length, o.length)
                }
                return ""
            },
            setCookie: function(t, i, e) {
                var s = new Date;
                s.setTime(s.getTime() + 24 * e * 60 * 60 * 1e3);
                var o = "expires=" + s.toUTCString();
                document.cookie = t + "=" + i + "; " + o
            },
            isMobile: {
                android: function() {
                    return !!navigator.userAgent.match(/Android/i)
                },
                blackBerry: function() {
                    return !!navigator.userAgent.match(/BlackBerry/i)
                },
                iOS: function() {
                    return !!navigator.userAgent.match(/iPhone|iPad|iPod/i)
                },
                iOS7: function() {
                    if (!this.iOS()) return !1;
                    var t = this.iOSVersion();
                    return t[0] > 6 && t[0] < 8
                },
                windows: function() {
                    return !!navigator.userAgent.match(/IEMobile/i)
                },
                any: function() {
                    return this.android() || this.blackBerry() || this.iOS() || this.windows()
                },
                iOSVersion: function() {
                    if (this.iOS()) {
                        var t = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                        return [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3] || 0, 10)]
                    }
                    return []
                }
            }
        };
    return s
}(jQuery), jQuery(function() {
    wwctrials.main.init()
});