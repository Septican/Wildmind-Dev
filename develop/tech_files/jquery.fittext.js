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
		var division = 10;
		if($this.parent().hasClass("bangkok")){
			division = 2.305825242718447;
		}
		if($this.parent().hasClass("entrepreneur")){
			division = 3.861788617886179;
		}
		if($this.parent().hasClass("startups")){
			division = 3.006329113924051;
		}
		if($this.parent().hasClass("write")){
			division = 3.104575163398693;
		}
		if ( $.browser.mozilla) {
			if($this.parent().hasClass("write")){
				division = 3.740157480314961;
			}
		}
		if($this.parent().hasClass("desgin")){
			division = 9.134615384615385;
		}
		if($this.parent().hasClass("contactme")){
			division = 11.875;
		}
		if($this.hasClass("thatdo")){
			division = 11.875;
		}
		if($this.parent().hasClass("logo")){
			division = 12.17948717948718;
		}
		$this.css('font-size', Math.max(Math.min($this.width() / (compressor*division), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
        
      };

      // Call once to set.
      resizer();
				
      // Call on resize. Opera debounces their resize by default. 
      $(window).on('resize', resizer);
      	
    });

  };

})( jQuery );