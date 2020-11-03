/*!
 * remark v1.0.1 (http://getbootstrapadmin.com/remark)
 * Copyright 2015 amazingsurge
 * Licensed under the Themeforest Standard Licenses
 */
(function(window, document, $) {
  'use strict';

  var $doc = $(document);

  $.site = $.site || {};

  $.extend($.site, {
    _queue: {
      prepare: [],
      run: [],
      complete: []
    },

    run: function() {
      var self = this;

      this.trigger('beforerun', this);
      this.dequeue('run', function() {
        self.trigger('afterrun', self);
      });
    },

    dequeue: function(name, done) {
      var self = this,
        queue = this.getQueue(name),
        fn = queue.shift(),
        next = function() {
          self.dequeue(name, done);
        };

      if (fn) {
        fn.call(this, next);
      } else if ($.isFunction(done)) {
        done.call(this);
      }
    },

    getQueue: function(name) {
      if (!$.isArray(this._queue[name])) {
        this._queue[name] = [];
      }

      return this._queue[name];
    },

    extend: function(obj) {
      $.each(this._queue, function(name, queue) {
        if ($.isFunction(obj[name])) {
          queue.push(obj[name]);

          delete obj[name];
        }
      });

      $.extend(this, obj);

      return this;
    },

    trigger: function(name, data, $el) {
      if (typeof name === 'undefined') return;
      if (typeof $el === 'undefined') $el = $doc;

      $el.trigger(name + '.site', data);
    },

    throttle: function(func, wait) {
      var _now = Date.now || function() {
        return new Date().getTime();
      };
      var context, args, result;
      var timeout = null;
      var previous = 0;

      var later = function() {
        previous = _now();
        timeout = null;
        result = func.apply(context, args);
        context = args = null;
      };

      return function() {
        var now = _now();
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
          clearTimeout(timeout);
          timeout = null;
          previous = now;
          result = func.apply(context, args);
          context = args = null;
        } else if (!timeout) {
          timeout = setTimeout(later, remaining);
        }
        return result;
      };
    },

    resize: function() {
      if (document.createEvent) {
        var ev = document.createEvent('Event');
        ev.initEvent('resize', true, true);
        window.dispatchEvent(ev);
      } else {
        element = document.documentElement;
        var event = document.createEventObject();
        element.fireEvent("onresize", event);
      }
    }
  });

  

})(window, document, jQuery);
