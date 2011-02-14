//Cookie plugin Copyright (c) 2006 Klaus Hartl (stilbuero.de) Dual licensed under the MIT and GPL licenses: http://www.opensource.org/licenses/mit-license.php* http://www.gnu.org/licenses/gpl.html
jQuery.cookie = function(name, value, options) {
	if (typeof value != 'undefined') { // name and value given, set cookie
		options = options || {};
		if (value === null) {value = ''; options.expires = -1;}
		var expires = '';
		if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
		}
		var path = options.path ? '; path=' + (options.path) : '';
		var domain = options.domain ? '; domain=' + (options.domain) : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	}
	else { // only name given, get cookie
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};
//Superfish v1.4.8 - jQuery menu widget Copyright (c) 2008 Joel Birch Dual licensed under the MIT and GPL licenses: http://www.opensource.org/licenses/mit-license.php http://www.gnu.org/licenses/gpl.html
; (function($) {
	$.fn.superfish = function(op) {
		var sf = $.fn.superfish,
			c = sf.c,
			$arrow = $(['<span class="', c.arrowClass, '"> &#187;</span>'].join('')),
			over = function() {
				var $$ = $(this), menu = getMenu($$);
				clearTimeout(menu.sfTimer);
				$$.showSuperfishUl().siblings().hideSuperfishUl();
			},
			out = function() {
				var $$ = $(this), menu = getMenu($$), o = sf.op;
				clearTimeout(menu.sfTimer);
				menu.sfTimer = setTimeout(function() {
					o.retainPath = ($.inArray($$[0], o.$path) > -1);
					$$.hideSuperfishUl();
					if (o.$path.length && $$.parents(['li.', o.hoverClass].join('')).length < 1) { over.call(o.$path); }
				}, o.delay);
			},
			getMenu = function($menu) {
				var menu = $menu.parents(['ul.', c.menuClass, ':first'].join(''))[0];
				sf.op = sf.o[menu.serial];
				return menu;
			},
			addArrow = function($a) { $a.addClass(c.anchorClass).append($arrow.clone()); };
		return this.each(function() {
			var s = this.serial = sf.o.length;
			var o = $.extend({}, sf.defaults, op);
			o.$path = $('li.' + o.pathClass, this).slice(0, o.pathLevels).each(function() {
				$(this).addClass([o.hoverClass, c.bcClass].join(' '))
					.filter('li:has(ul)').removeClass(o.pathClass);
			});
			sf.o[s] = sf.op = o;

			$('li:has(ul)', this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over, out).each(function() {
				if (o.autoArrows) addArrow($('>a:first-child', this));
			})
			.not('.' + c.bcClass)
				.hideSuperfishUl();

			var $a = $('a', this);
			$a.each(function(i) {
				var $li = $a.eq(i).parents('li');
				$a.eq(i).focus(function() { over.call($li); }).blur(function() { out.call($li); });
			});
			o.onInit.call(this);

		}).each(function() {
			var menuClasses = [c.menuClass];
			if (sf.op.dropShadows && !($.browser.msie && $.browser.version < 7)) menuClasses.push(c.shadowClass);
			$(this).addClass(menuClasses.join(' '));
		});
	};

	var sf = $.fn.superfish;
	sf.o = [];
	sf.op = {};
	sf.IE7fix = function() {
		var o = sf.op;
		if ($.browser.msie && $.browser.version > 6 && o.dropShadows && o.animation.opacity != undefined)
			this.toggleClass(sf.c.shadowClass + '-off');
	};
	sf.c = {
		bcClass: 'sf-breadcrumb',
		menuClass: 'sf-js-enabled',
		anchorClass: 'sf-with-ul',
		arrowClass: 'sf-sub-indicator',
		shadowClass: 'sf-shadow'
	};
	sf.defaults = {
		hoverClass: 'sfHover',
		pathClass: 'overideThisToUse',
		pathLevels: 1,
		delay: 500,
		animation: { opacity: 'show' },
		speed: 'fast',
		autoArrows: false,
		dropShadows: true,
		disableHI: false, 	// true disables hoverIntent detection
		onInit: function() { }, // callback functions
		onBeforeShow: function() { },
		onShow: function() { },
		onHide: function() { }
	};
	$.fn.extend({
		hideSuperfishUl: function() {
			var o = sf.op,
				not = (o.retainPath === true) ? o.$path : '';
			o.retainPath = false;
			var $ul = $(['li.', o.hoverClass].join(''), this).add(this).not(not).removeClass(o.hoverClass)
					.find('>ul').hide().css('visibility', 'hidden');
			o.onHide.call($ul);
			return this;
		},
		showSuperfishUl: function() {
			var o = sf.op,
				sh = sf.c.shadowClass + '-off',
				$ul = this.addClass(o.hoverClass)
					.find('>ul:hidden').css('visibility', 'visible');
			sf.IE7fix.call($ul);
			o.onBeforeShow.call($ul);
			$ul.animate(o.animation, o.speed, function() { sf.IE7fix.call($ul); o.onShow.call($ul); });
			return this;
		}
	});
})(jQuery);
//hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+ <http://cherne.net/brian/resources/jquery.hoverIntent.html>
(function($) { $.fn.hoverIntent = function(f, g) { var cfg = { sensitivity: 7, interval: 100, timeout: 0 }; cfg = $.extend(cfg, g ? { over: f, out: g} : f); var cX, cY, pX, pY; var track = function(ev) { cX = ev.pageX; cY = ev.pageY; }; var compare = function(ev, ob) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); if ((Math.abs(pX - cX) + Math.abs(pY - cY)) < cfg.sensitivity) { $(ob).unbind("mousemove", track); ob.hoverIntent_s = 1; return cfg.over.apply(ob, [ev]); } else { pX = cX; pY = cY; ob.hoverIntent_t = setTimeout(function() { compare(ev, ob); }, cfg.interval); } }; var delay = function(ev, ob) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); ob.hoverIntent_s = 0; return cfg.out.apply(ob, [ev]); }; var handleHover = function(e) { var p = (e.type == "mouseover" ? e.fromElement : e.toElement) || e.relatedTarget; while (p && p != this) { try { p = p.parentNode; } catch (e) { p = this; } } if (p == this) { return false; } var ev = jQuery.extend({}, e); var ob = this; if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); } if (e.type == "mouseover") { pX = ev.pageX; pY = ev.pageY; $(ob).bind("mousemove", track); if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout(function() { compare(ev, ob); }, cfg.interval); } } else { $(ob).unbind("mousemove", track); if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout(function() { delay(ev, ob); }, cfg.timeout); } } }; return this.mouseover(handleHover).mouseout(handleHover); }; })(jQuery);
var animatedcollapse = {
	divholders: {}, //structure: {div.id, div.attrs, div.$divref}
	divgroups: {}, //structure: {groupname.count, groupname.lastactivedivid}
	lastactiveingroup: {}, //structure: {lastactivediv.id}
	show: function(divids) { //public method
		if (typeof divids == "object") {
			for (var i = 0; i < divids.length; i++)
				this.showhide(divids[i], "show")
		}
		else
			this.showhide(divids, "show")
	},
	hide: function(divids) { //public method
		if (typeof divids == "object") {
			for (var i = 0; i < divids.length; i++)
				this.showhide(divids[i], "hide")
		}
		else
			this.showhide(divids, "hide")
	},
	toggle: function(divid) { //public method
		this.showhide(divid, "toggle")
	},
	addDiv: function(divid, attrstring) { //public function
		this.divholders[divid] = ({ id: divid, $divref: null, attrs: attrstring })
		this.divholders[divid].getAttr = function(name) { //assign getAttr() function to each divholder object
			var attr = new RegExp(name + "=([^,]+)", "i") //get name/value config pair (ie: width=400px,)
			return (attr.test(this.attrs) && parseInt(RegExp.$1) != 0) ? RegExp.$1 : null //return value portion (string), or 0 (false) if none found
		}
	},
	showhide: function(divid, action) {
		var $divref = this.divholders[divid].$divref //reference collapsible DIV
		if (this.divholders[divid] && $divref.length == 1) { //if DIV exists
			var targetgroup = this.divgroups[$divref.attr('groupname')] //find out which group DIV belongs to (if any)
			if ($divref.attr('groupname') && targetgroup.count > 1 && (action == "show" || action == "toggle" && $divref.css('display') == 'none')) { //If current DIV belongs to a group
				if (targetgroup.lastactivedivid && targetgroup.lastactivedivid != divid) //if last active DIV is set
					this.slideengine(targetgroup.lastactivedivid, 'hide') //hide last active DIV within group first
				this.slideengine(divid, 'show')
				targetgroup.lastactivedivid = divid //remember last active DIV
			}
			else {
				this.slideengine(divid, action)
			}
		}
	},
	slideengine: function(divid, action) {
		var $divref = this.divholders[divid].$divref
		if (this.divholders[divid] && $divref.length == 1) { //if this DIV exists
			var animateSetting = { height: action }
			//if ($divref.attr('fade'))
			//animateSetting.opacity=action
			$divref.animate(animateSetting, $divref.attr('speed') ? parseInt($divref.attr('speed')) : 400)
			return false
		}
	},
	generatemap: function() {
		var map = {}
		for (var i = 0; i < arguments.length; i++) {
			if (arguments[i][1] != null) {
				map[arguments[i][0]] = arguments[i][1]
			}
		}
		return map
	},
	init: function() {
		var ac = this
		jQuery(document).ready(function($) {
			var persistopenids = ac.getCookie('acopendivids') //Get list of div ids that should be expanded due to persistence ('div1,div2,etc')
			var groupswithpersist = ac.getCookie('acgroupswithpersist') //Get list of group names that have 1 or more divs with "persist" attribute defined
			if (persistopenids != null) //if cookie isn't null (is null if first time page loads, and cookie hasnt been set yet)
				persistopenids = (persistopenids == 'nada') ? [] : persistopenids.split(',') //if no divs are persisted, set to empty array, else, array of div ids
			groupswithpersist = (groupswithpersist == null || groupswithpersist == 'nada') ? [] : groupswithpersist.split(',') //Get list of groups with divs that are persisted
			jQuery.each(ac.divholders, function() { //loop through each collapsible DIV object
				this.$divref = $('#' + this.id)
				if ((this.getAttr('persist') || jQuery.inArray(this.getAttr('group'), groupswithpersist) != -1) && persistopenids != null) {
					var cssdisplay = (jQuery.inArray(this.id, persistopenids) != -1) ? 'block' : 'none'
				}
				else {
					var cssdisplay = this.getAttr('hide') ? 'none' : null
				}
				this.$divref.css(ac.generatemap(['height', this.getAttr('height')], ['display', cssdisplay]))
				this.$divref.attr(ac.generatemap(['groupname', this.getAttr('group')], ['fade', this.getAttr('fade')], ['speed', this.getAttr('speed')]))
				if (this.getAttr('group')) { //if this DIV has the "group" attr defined
					var targetgroup = ac.divgroups[this.getAttr('group')] || (ac.divgroups[this.getAttr('group')] = {}) //Get settings for this group, or if it no settings exist yet, create blank object to store them in
					targetgroup.count = (targetgroup.count || 0) + 1 //count # of DIVs within this group
					if (!targetgroup.lastactivedivid && this.$divref.css('display') != 'none' || cssdisplay == "block") //if this DIV was open by default or should be open due to persistence								
						targetgroup.lastactivedivid = this.id //remember this DIV as the last "active" DIV (this DIV will be expanded)
					this.$divref.css({ display: 'none' }) //hide any DIV that's part of said group for now
				}
			}) //end divholders.each
			jQuery.each(ac.divgroups, function() { //loop through each group
				if (this.lastactivedivid)
					ac.divholders[this.lastactivedivid].$divref.show() //and show last "active" DIV within each group (one that should be expanded)
			})			
		}) //end doc.ready()
	},
	uninit: function() {
		var opendivids = '', groupswithpersist = ''
		jQuery.each(this.divholders, function() {
			if (this.$divref.css('display') != 'none') {
				opendivids += this.id + ',' //store ids of DIVs that are expanded when page unloads: 'div1,div2,etc'
			}
			if (this.getAttr('group') && this.getAttr('persist'))
				groupswithpersist += this.getAttr('group') + ',' //store groups with which at least one DIV has persistance enabled: 'group1,group2,etc'
		})
		opendivids = (opendivids == '') ? 'nada' : opendivids.replace(/,$/, '')
		groupswithpersist = (groupswithpersist == '') ? 'nada' : groupswithpersist.replace(/,$/, '')
		this.setCookie('acopendivids', opendivids)
		this.setCookie('acgroupswithpersist', groupswithpersist)
	},
	getCookie: function(Name) {
		var re = new RegExp(Name + "=[^;]*", "i"); //construct RE to search for target name/value pair
		if (document.cookie.match(re)) //if cookie found
			return document.cookie.match(re)[0].split("=")[1] //return its value
		return null
	},
	setCookie: function(name, value, days) {
		if (typeof days != "undefined") { //if set persistent cookie
			var expireDate = new Date()
			expireDate.setDate(expireDate.getDate() + days)
			document.cookie = name + "=" + value + "; path=/; expires=" + expireDate.toGMTString()
		}
		else //else if this is a session only cookie
			document.cookie = name + "=" + value + "; path=/"
	}
}
// jQuery.ScrollTo - Easy element scrolling using jQuery.Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.comDual licensed under MIT and GPL.Date: 5/25/2009@author Ariel Flesler@version 1.4.2 http://flesler.blogspot.com/2007/10/jqueryscrollto.html
; (function(d) { var k = d.scrollTo = function(a, i, e) { d(window).scrollTo(a, i, e) }; k.defaults = { axis: 'xy', duration: parseFloat(d.fn.jquery) >= 1.3 ? 0 : 1 }; k.window = function(a) { return d(window)._scrollable() }; d.fn._scrollable = function() { return this.map(function() { var a = this, i = !a.nodeName || d.inArray(a.nodeName.toLowerCase(), ['iframe', '#document', 'html', 'body']) != -1; if (!i) return a; var e = (a.contentWindow || a).document || a.ownerDocument || a; return d.browser.safari || e.compatMode == 'BackCompat' ? e.body : e.documentElement }) }; d.fn.scrollTo = function(n, j, b) { if (typeof j == 'object') { b = j; j = 0 } if (typeof b == 'function') b = { onAfter: b }; if (n == 'max') n = 9e9; b = d.extend({}, k.defaults, b); j = j || b.speed || b.duration; b.queue = b.queue && b.axis.length > 1; if (b.queue) j /= 2; b.offset = p(b.offset); b.over = p(b.over); return this._scrollable().each(function() { var q = this, r = d(q), f = n, s, g = {}, u = r.is('html,body'); switch (typeof f) { case 'number': case 'string': if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)) { f = p(f); break } f = d(f, this); case 'object': if (f.is || f.style) s = (f = d(f)).offset() } d.each(b.axis.split(''), function(a, i) { var e = i == 'x' ? 'Left' : 'Top', h = e.toLowerCase(), c = 'scroll' + e, l = q[c], m = k.max(q, i); if (s) { g[c] = s[h] + (u ? 0 : l - r.offset()[h]); if (b.margin) { g[c] -= parseInt(f.css('margin' + e)) || 0; g[c] -= parseInt(f.css('border' + e + 'Width')) || 0 } g[c] += b.offset[h] || 0; if (b.over[h]) g[c] += f[i == 'x' ? 'width' : 'height']() * b.over[h] } else { var o = f[h]; g[c] = o.slice && o.slice(-1) == '%' ? parseFloat(o) / 100 * m : o } if (/^\d+$/.test(g[c])) g[c] = g[c] <= 0 ? 0 : Math.min(g[c], m); if (!a && b.queue) { if (l != g[c]) t(b.onAfterFirst); delete g[c] } }); t(b.onAfter); function t(a) { r.animate(g, j, b.easing, a && function() { a.call(this, n, b) }) } }).end() }; k.max = function(a, i) { var e = i == 'x' ? 'Width' : 'Height', h = 'scroll' + e; if (!d(a).is('html,body')) return a[h] - d(a)[e.toLowerCase()](); var c = 'client' + e, l = a.ownerDocument.documentElement, m = a.ownerDocument.body; return Math.max(l[h], m[h]) - Math.min(l[c], m[c]) }; function p(a) { return typeof a == 'object' ? a : { top: a, left: a} } })(jQuery);