/*!
 * remark v1.0.1 (http://getbootstrapadmin.com/remark)
 * Copyright 2015 amazingsurge
 * Licensed under the Themeforest Standard Licenses
 */
(function(window, document, $) {
  'use strict';

  var $body = $('body');
  $.site.menubar = {
    opened: null,
    folded: null,
    top: false,
    $instance: null,
    auto: true,
    init: function() {
      this.$instance = $(".site-menubar");

      var self = this;

      if ($body.is('.site-menubar-top')) {
        this.top = true;
      }

      if ($body.data('autoMenubar') === false) {
        if ($body.hasClass('site-menubar-fold')) {

          this.auto = 'fold';
        } else if ($body.hasClass('site-menubar-unfold')) {
          this.auto = 'unfold';
        }
      }

      // bind events
       $.site.menu.$instance.on('collapsed expanded', function(e){
           self.update();
       });

      this.$instance.on('changed.site.menubar', function() {
        self.update();
      });

      this.change();
    },

    change: function() {

      var breakpoint = Breakpoints.current();
      if (this.auto !== true) {
        switch (this.auto) {

          case 'fold':
            this.reset();
            if (breakpoint.name == 'xs') {
              this.hide();
            } else {
              this.fold();
            }
            return;
          case 'unfold':
            this.reset();
            if (breakpoint.name == 'xs') {
              this.hide();
            } else {
              this.unfold();
            }
            return;
        }
      }

      this.reset();

      if (breakpoint) {
        switch (breakpoint.name) {
          case 'lg':
            this.unfold();
            break;
          case 'md':
          case 'sm':
            this.fold();
            break;
          case 'xs':
            //this.hide();
            
            break;
        }
      }
    },

    animate: function(doing, callback) {
      var self = this;
      $body.addClass('site-menubar-changing');

      doing.call(self);
      this.$instance.trigger('changing.site.menubar');

      setTimeout(function() {
        callback.call(self);
        $body.removeClass('site-menubar-changing');

        self.$instance.trigger('changed.site.menubar');
      }, 500);
    },

    reset: function() {
      this.opened = null;
      this.folded = null;
      $body.removeClass('site-menubar-hide site-menubar-open site-menubar-fold site-menubar-unfold');
    },

    open: function() {
      if (this.opened !== true) {
        this.animate(function() {
          $body.removeClass('site-menubar-hide').addClass('site-menubar-open site-menubar-unfold');
          this.opened = true;

        }, function() {
        });
      }
    },

    hide: function() {
      if (this.opened !== false) {
        this.animate(function() {
          $body.removeClass('site-menubar-open').addClass('site-menubar-hide site-menubar-unfold');
          this.opened = false;

        }, function() {
        });
      }
    },

    unfold: function() {
console.log(this.folded,"foldes");
      if (this.folded !== false) {
        this.animate(function() {
          $body.removeClass('site-menubar-fold').addClass('site-menubar-unfold');
          this.folded = false;

        }, function() {

          if (this.folded !== null) {
            $.site.resize();
          }
        });
      }
    },

    fold: function() {
      if (this.folded !== true) {
        this.animate(function() {
          $body.removeClass('site-menubar-unfold').addClass('site-menubar-fold');
          this.folded = true;

        }, function() {
          if (this.folded !== null) {
            $.site.resize();
          }
        });
      }
    },

    toggle: function() {
      var breakpoint = Breakpoints.current();
      var folded = this.folded;
      var opened = this.opened;
      switch (breakpoint.name) {
        case 'lg':
          if (folded === null || folded === false) {
            this.fold();
          } else {
            this.unfold();
          }
          break;
        case 'md':
        case 'sm':
          if (folded === null || folded === true) {
            this.unfold();
          } else {
            this.fold();
          }
          break;
        case 'xs':
          if (opened === null || opened === false) {
            this.open();
          } else {
            this.hide();
          }
          break;
      }
    },

    update: function() {
    }
  };
})(window, document, jQuery);
