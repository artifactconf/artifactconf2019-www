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

(function() {
  window.APP = {
    methodName: function() {},
    common: {
      init: function() {
        var showMenu;
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
        return $(window).load(function() {
          $(".action--toggle-slave").each(function() {
            var $h, $this;
            $this = $(this);
            $h = $this.innerHeight();
            $this.attr("data-height", $h);
            return $this.css("height", 0);
          });
          $(".action--toggle-master").addClass("action--toggle-button");
          $(".action--toggle-master").click(function(e) {
            var $child, $h, $this;
            $this = $(this);
            $child = $this.next(".action--toggle-slave");
            $h = $child.data("height");
            if ($child.hasClass("action--display")) {
              $child.css("height", 0);
              $this.removeClass("action--open");
              $child.removeClass("action--display");
            } else {
              $child.css("height", $h);
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
        });
      }
    }
  };

  APP.common.init();

}).call(this);
