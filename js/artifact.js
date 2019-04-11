/*
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);
/*global jQuery */
/*!
* FitText.js 1.1
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );

/**
 * author Remy Sharp
 * url http://remysharp.com/2009/01/26/element-in-view-event-plugin/
 */
(function ($) {
    function getViewportHeight() {
        var height = window.innerHeight; // Safari, Opera
        var mode = document.compatMode;

        if ( (mode || !$.support.boxModel) ) { // IE, Gecko
            height = (mode == 'CSS1Compat') ?
            document.documentElement.clientHeight : // Standards
            document.body.clientHeight; // Quirks
        }

        return height;
    }

    $(window).scroll(function () {
        var vpH = getViewportHeight(),
            scrolltop = (document.documentElement.scrollTop ?
                document.documentElement.scrollTop :
                document.body.scrollTop),
            elems = [];

        // naughty, but this is how it knows which elements to check for
        $.each($.cache, function () {
            if (this.events && this.events.inview) {
                elems.push(this.handle.elem);
            }
        });

        if (elems.length) {
            $(elems).each(function () {
                var $el = $(this),
                    top = $el.offset().top,
                    height = $el.height(),
                    inview = $el.data('inview') || false;

                if (scrolltop > (top + height) || scrolltop + vpH < top) {
                    if (inview) {
                        $el.data('inview', false);
                        $el.trigger('inview', [ false ]);
                    }
                } else if (scrolltop < (top + height)) {
                    if (!inview) {
                        $el.data('inview', true);
                        $el.trigger('inview', [ true ]);
                    }
                }
            });
        }
    });

    // kick the event to pick up any elements already in view.
    // note however, this only works if the plugin is included after the elements are bound to 'inview'
    $(function () {
        $(window).scroll();
    });
})(jQuery);

/**
 * jQuery Unveil
 * A very lightweight jQuery plugin to lazy load images
 * http://luis-almeida.github.com/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2013 Luís Almeida
 * https://github.com/luis-almeida
 */

;(function($){$.fn.unveil=function(threshold,callback){var $w=$(window),th=threshold||0,retina=window.devicePixelRatio>1,attrib=retina?"data-src-retina":"data-src",images=this,loaded;this.one("unveil",function(){var source=this.getAttribute(attrib);source=source||this.getAttribute("data-src");if(source){this.setAttribute("src",source);if(typeof callback==="function")callback.call(this);}});function unveil(){var inview=images.filter(function(){var $e=$(this),wt=$w.scrollTop(),wb=wt+$w.height(),et=$e.offset().top,eb=et+$e.height();return eb>=wt-th&&et<=wb+th;});loaded=inview.trigger("unveil");images=images.not(loaded);}$w.scroll(unveil);$w.resize(unveil);unveil();return this;};})(window.jQuery||window.Zepto);

//Finds Thumbnails for Vimeo Videos
$('html').find('img.vimeo').each(function(index,item){
  var vimeo_id = this.id.split('-')[1];
  
  $.ajax({
    type:'GET',
    url: 'http://vimeo.com/api/v2/video/' + vimeo_id + '.json',
    jsonp: 'callback',
    dataType: 'jsonp',
    success: function(data){
      var thumb_src = data[0].thumbnail_large;
      $(item).attr('src', thumb_src);
    } 
  });
});

//Replace Vimeo Thumbnail with Vimeo Video iframe on Click
$('html').on('click', 'img.vimeo', function(){
    var vimeo_id = this.id.split('-')[1];
    var vimeoHeight = $(this).outerHeight();
    var vimeoWidth = $(this).outerWidth();

    var $iframe = $('<iframe />', {
      src : '//player.vimeo.com/video/'+vimeo_id+'/?autoplay=1',
      class : 'vimeo',
      frameborder : 0,
      width : vimeoWidth,
      height: vimeoHeight
    })

    $(this).parent().addClass('loaded'); //optional but useful
    $(this).replaceWith($iframe);
});
(function() {
  window.APP = {
    methodName: function() {},
    common: {
      init: function() {
        var $hash, $unjankIt, accordianResize, page_hash, showMenu, timer;
        $("img").unveil(200);
        $(".style--speaker-collage").bind("inview", function(event, visible) {
          if (visible === true) {
            return $(this).addClass("speaker-collage--loaded");
          }
        });
        $unjankIt = $(".unjank");
        timer = void 0;
        $(window).scroll(function() {
          clearTimeout(timer);
          if ($unjankIt.hasClass("unjank")) {
            $unjankIt.removeClass("unjank");
          }
          return timer = setTimeout(function() {
            return $unjankIt.addClass("unjank");
          }, 400);
        });
        $(".title--event").fitText(1.2, {
          minFontSize: "36px",
          maxFontSize: "48px"
        });
        $(document).on("touchstart", function() {});
        showMenu = function() {
          var $action, $nav;
          $action = $(".action--navigation");
          $nav = $(".site--navigation");
          if ($action.hasClass("icon-menu")) {
            $action.addClass("icon-close");
            $action.removeClass("icon-menu");
            return $nav.addClass("action--display-navigation");
          } else {
            $action.addClass("icon-menu");
            $action.removeClass("icon-close");
            return $nav.removeClass("action--display-navigation");
          }
        };
        $(".action--navigation").click(function(e) {
          showMenu();
          return e.preventDefault();
        });
        $(".social--button").click(function(e) {
          $(".social--nav").addClass("action--nav-open");
          return e.preventDefault();
        });
        $(".social--close").click(function(e) {
          $(".social--nav").removeClass("action--nav-open");
          return e.preventDefault();
        });
        page_hash = window.location.hash;
        $hash = $(window.location.hash);
        $(window).on("load", function() {
          var $action;
          $(".action--toggle-slave").each(function() {
            var $this;
            $this = $(this);
            return $this.css("height", 0);
          });
          $(".action--toggle-master").addClass("action--toggle-button");
          if (page_hash.length) {
            $action = $hash.parents(".action--toggle-slave");
            $action.addClass("action--display");
            $action.css("height", "auto");
            return $('html,body').animate({
              scrollTop: $hash.offset().top
            }, 500);
          }
        });
        accordianResize = function() {
          return $(".action--toggle-slave").each(function() {
            var $this;
            $this = $(this);
            if ($this.hasClass("action--display")) {
              return $this.css("height", "auto");
            }
          });
        };
        $(window).resize($.throttle(250, accordianResize));
        $(".action--toggle-master").click(function(e) {
          var $child, $h, $height, $this;
          $this = $(this);
          $child = $this.next(".action--toggle-slave");
          $h = $child.data("height");
          if ($child.hasClass("action--display")) {
            $child.css("height", 0);
            $this.removeClass("action--open");
            $child.removeClass("action--display");
          } else {
            $height = $child.css("height", "auto").innerHeight();
            $child.css("height", $height);
            $this.addClass("action--open");
            $child.addClass("action--display");
          }
          return e.preventDefault();
        });
        return $(".js--register").click(function(e) {
          if ($(document).width() > 528) {
            if (!$("#register-action").hasClass("action--open")) {
              $("#register-action").trigger("click");
            }
            $('html,body').animate({
              scrollTop: $("#register-action").offset().top
            }, 500);
            return e.preventDefault();
          }
        });
      }
    }
  };

  APP.common.init();

}).call(this);
