/*!
 * remark v1.0.1 (http://getbootstrapadmin.com/remark)
 * Copyright 2015 amazingsurge
 * Licensed under the Themeforest Standard Licenses
 */
(function(window, document, $) {
  'use strict';

  var $body = $(document.body);
  window.Site = $.site.extend({
    run: function(next) {
      $('html').removeClass('before-run').addClass('after-run');
      // Menubar setup
      // =============
      $.site.menu.init();

      $(".site-menubar").on('changing.site.menubar', function() {
        $('[data-toggle="menubar"]').each(function() {
          var $this = $(this);
          var $hamburger = $(this).find('.hamburger');

          function toggle($el) {
            $el.toggleClass('hided', !$.site.menubar.opened);
            $el.toggleClass('unfolded', !$.site.menubar.folded);
          }
          if ($hamburger.length > 0) {
            toggle($hamburger);
          } else {
            toggle($this);
          }
        });

        // $.site.menu.refresh();
      });

      

      $(document).on('click', '[data-toggle="menubar"]', function() {
        $.site.menubar.toggle();
        return false;
      });

      $.site.menubar.init();

      Breakpoints.on('change', function() {
        $.site.menubar.change();
      });    
    }

  

   
  });

})(window, document, jQuery);
