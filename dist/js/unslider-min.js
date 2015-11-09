!function($){return $?($.Unslider=function(t,n){var e=this;return e._="unslider",e.defaults={autoplay:!1,delay:3e3,speed:750,easing:"swing",keys:{prev:37,next:39},nav:!0,arrows:{prev:'<a class="'+e._+'-arrow prev">Previous</a>',next:'<a class="'+e._+'-arrow next">Next</a>'},animation:"horizontal",selectors:{container:"ul:first",slides:"li"},animateHeight:!1,activeClass:e._+"-active",lastActiveClass:e._+"-last-active"},e.$context=t,e.options={},e.$parent=null,e.$container=null,e.$slides=null,e.$nav=null,e.$arrows=[],e.total=0,e.current=0,e.prefix=e._+"-",e.eventSuffix="."+e.prefix+~~(2e3*Math.random()),e.interval=null,e.init=function(t){return e.options=$.extend({},e.defaults,t),e.$container=e.$context.find(e.options.selectors.container).addClass(e.prefix+"wrap"),e.$slides=e.$container.children(e.options.selectors.slides),e.setup(),["nav","arrows","keys","infinite"].forEach(function(t){e.options[t]&&e["init"+$._ucfirst(t)]()}),void 0!==typeof jQuery.event.special.swipe&&e.initSwipe(),e.options.autoplay&&e.start(),e.calculateSlides(),e.$context.trigger(e._+".ready"),e.animate(e.options.index||e.current)},e.setup=function(){e.$context.addClass(e.prefix+"slider "+e.prefix+e.options.animation).wrap('<div class="'+e._+'" />'),e.$parent=e.$context.parent("."+e._);var t=e.$context.css("position");"static"===t&&e.$context.css("position","relative"),e.$context.css("overflow","hidden")},e.calculateSlides=function(){e.total=e.$slides.length,"fade"!==e.options.animation&&(e.$container.css("width",100*e.total+"%").addClass(e.prefix+"carousel"),e.$slides.css("width",100/e.total+"%"))},e.start=function(){e.interval=setTimeout(function(){e.next(),e.start()},e.options.delay)},e.stop=function(){clearTimeout(e.interval)},e.initNav=function(){var t=$('<nav class="'+e.prefix+'nav"><ol /></nav>');e.$slides.each(function(n){var i=this.getAttribute("data-nav")||n+1;$.isFunction(e.options.nav)&&(i=e.options.nav.call(e.$slides.eq(n),n,i)),t.children("ol").append('<li data-slide="'+n+'">'+i+"</li>")}),e.$nav=t.insertAfter(e.$context),e.$nav.find("li").on("click"+e.eventSuffix,function(){var t=$(this).addClass(e.options.activeClass);t.siblings().removeClass(e.options.activeClass),e.animate(t.attr("data-slide"))})},e.initArrows=function(){e.options.arrows===!0&&(e.options.arrows=e.defaults.arrows),$.each(e.options.arrows,function(t,n){e.$arrows.push($(n).insertAfter(e.$context).on("click"+e.eventSuffix,e[t]))})},e.initKeys=function(){e.options.keys===!0&&(e.options.keys=e.defaults.keys),$(document).on("keyup"+e.eventSuffix,function(t){$.each(e.options.keys,function(n,i){t.which===i&&$.isFunction(e[n])&&e[n].call(e)})})},e.initSwipe=function(){var t=e.$slides.width();e.$container.on({swipeleft:e.next,swiperight:e.prev,movestart:function(t){return t.distX>t.distY&&t.distX<-t.distY||t.distX<t.distY&&t.distX>-t.distY?!!t.preventDefault():void e.$container.css("position","relative")}}),"fade"!==e.options.animation&&e.$container.on({move:function(n){e.$container.css("left",100*n.distX/t+"%")},moveend:function(){e.$container.animate({left:0},200)}})},e.initInfinite=function(){var t=["first","last"];t.forEach(function(n,i){e.$slides.push.apply(e.$slides,e.$slides.filter(':not(".'+e._+'-cloned")')[n]().clone().addClass(e._+"-cloned")["insert"+(0===i?"After":"Before")](e.$slides[t[~~!i]]()))}),e.$container.css("margin-left","-100%")},e.destroyArrows=function(){e.$arrows.forEach(function(t){t.remove()})},e.destroySwipe=function(){e.$container.off("movestart swipeleft move moveend").css("left",0)},e.destroyKeys=function(){$(document).off("keyup"+e.eventSuffix)},e.setIndex=function(t){return 0>t&&(t=e.total-1),e.current=Math.min(Math.max(0,t),e.total-1),e.options.nav&&e.$nav.find('[data-slide="'+e.current+'"]')._toggleActive(e.options.activeClass),e.$slides.eq(e.current)._toggleActive(e.options.activeClass),e},e.animate=function(t,n){if("first"===t&&(t=0),"last"===t&&(t=e.total),isNaN(t))return e;e.setIndex(t),e.$context.trigger(e._+".change",[t,e.$slides.eq(t)]);var i="animate"+$._ucfirst(e.options.animation);return $.isFunction(e[i])&&e[i](e.current,n),e},e.next=function(){var t=e.current+1;return t>=e.total&&(t=0),e.animate(t,"next")},e.prev=function(){return e.animate(e.current-1,"prev")},e.animateHorizontal=function(t){if(e.options.animateHeight){var n=e.$slides.eq(t).height();e.$context.css("height",n)}if(e.options.infinite){var i;t===e.total-1&&(i=e.total-3,t=-1),t===e.total-2&&(i=0,t=e.total-2),"number"==typeof i&&(e.setIndex(i),e.$context.on(e._+".moved",function(){e.current===i&&e.$container.css("left",-(100*i)+"%").off(e._+".moved")}))}return e.$container._move({left:-(100*t)+"%"},e.options.speed,e.options.easing,function(){e.$context.trigger(e._+".moved")})},e.animateFade=function(t,n){var i=e.$slides.removeClass(e.options.lastActiveClass).eq(t),s=i.prev();s.length||(s=e.$slides.last()),s.addClass(e.options.lastActiveClass).removeClass(e.options.activeClass),i.removeClass(e.options.lastActiveClass).addClass(e.options.activeClass)},e.init(n)},$.fn._toggleActive=function(t){return this.addClass(t).siblings().removeClass(t)},$._ucfirst=function(t){return t.toString().toLowerCase().replace(/^./,function(t){return t.toUpperCase()})},$.fn._move=function(){return this.stop(!0,!0),$.fn.velocity?$.fn.velocity.apply(this,arguments):$.fn.animate.apply(this,arguments)},void($.fn.unslider=function(t){return this.each(function(){var n=$(this);if("string"==typeof t&&n.data("unslider")){t=t.split(":");var e=t[0],i=n.data("unslider")[e];if(t[1]){var s=t[1].split(",");return $.isFunction(i)&&i.apply(n,s)}return $.isFunction(i)&&i()}return n.data("unslider",new $.Unslider(n,t))})})):console.warn("Unslider needs jQuery")}(window.jQuery);