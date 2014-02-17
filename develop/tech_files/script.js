/* Author: Peachanan Rojwongsuriya
*/

function ShowHide(bizlayer){
  if ( history.replaceState ) history.pushState( {}, document.title, '#'+bizlayer );
	switch(bizlayer)
	{
	  case "spotify":
  			if (jQuery("#spotify").is(":hidden")) {
  			jQuery(".loaded").slideUp("fast");
  			jQuery("#spotify").slideDown("slow");
  			jQuery("#spotify:not(.loaded)").html('<iframe src="https://embed.spotify.com/?uri=spotify:user:peachananr:playlist:5hAo3s1toO8HqBG17rTjvj" width="445" height="525" frameborder="0" allowtransparency="true"></iframe>');
  			jQuery("#spotify").addClass("loaded");
  			} else {
  			jQuery("#spotify").slideUp("slow");
  			}

  	  break;
  	  
  case "bucketlist":
  		if (jQuery("#bucketlist").is(":hidden")) {
  		  jQuery(".loaded").slideUp("fast");
  		jQuery("#bucketlist").slideDown("slow");
  		jQuery("#bucketlist:not(.loaded)").html('<iframe id="bucketlistly-widget" src="http://www.bucketlistly.com/widgets/list?user=peachananr&unlocked=show" width="445" height="525" frameborder="0" allowtransparency="true"></iframe>');
  		$("#bucketlistly-widget").load(function (){
          jQuery("#bucketlist").addClass("loaded");
      });
  		} else {
  		jQuery("#bucketlist").slideUp("slow");
  		}
  
    break;
	case "aboutme":
			jQuery(".foldin_wrapper").slideUp("slow");
			jQuery(".small_box_wrapper h1,.small_box_wrapper h2").removeClass('selected');
			if (jQuery("#aboutme").is(":hidden")) {
			jQuery("#aboutme").slideDown("slow");
			jQuery(".bangkok").addClass('selected');
			} else {
			jQuery("#aboutme").slideUp("slow");
			jQuery(".bangkok").removeClass('selected');
			}

	  break;
	  case "write":
			jQuery(".foldin_wrapper").slideUp("slow");
			jQuery(".small_box_wrapper h1,.small_box_wrapper h2").removeClass('selected');
			if (jQuery("#write").is(":hidden")) {
			jQuery("#write").slideDown("slow");
			jQuery(".write").addClass('selected');
			} else {
			jQuery("#write").slideUp("slow");
			jQuery(".write").removeClass('selected');
			}

	  break;
	case "startups":
			jQuery(".foldin_wrapper").slideUp("slow");
			jQuery(".small_box_wrapper h1,.small_box_wrapper h2").removeClass('selected');
			if (jQuery("#startups").is(":hidden")) {
			jQuery("#startups").slideDown("slow");
			jQuery(".startups").addClass('selected');
			} else {
			jQuery("#startups").slideUp("slow");
			jQuery(".startups").removeClass('selected');
			}

	  break;
	  
	  case "design":
			jQuery(".foldin_wrapper").slideUp("slow");
			jQuery(".small_box_wrapper h1,.small_box_wrapper h2").removeClass('selected');
			if (jQuery("#design").is(":hidden")) {
			jQuery("#design").slideDown("slow");
			jQuery(".design").addClass('selected');
			} else {
			jQuery("#design").slideUp("slow");
			jQuery(".design").removeClass('selected');
			}

	  break;
	  
	}
  sliderInit("#"+ bizlayer + " .flexslider:not(.flex-complete)");

}

function play_single_sound() {
//if(document.getElementById('audiotag1'))document.getElementById('audiotag1').play();
}
	
function formValidation(form){
	if(document.contactform.name.value=="" || document.contactform.name.value=="Your Name*"){
		alert("Please fill in your name before submiting");
		document.contactform.name.focus();
		return false;
	}

	if(document.contactform.subject.value=="" || document.contactform.subject.value=="Subject*"){
		alert("Please fill in the subject before submiting");
		document.contactform.subject.focus();
		return false;
	}

	if(document.contactform.message.value=="" || document.contactform.message.value=="Message*"){
		alert("Please fill in the message before submiting");
		document.contactform.message.focus();
		return false;

	}
	var body = "Hi, Pete%0A%0AI'm " + document.contactform.name.value + ". " + document.contactform.message.value 
	window.open("mailto:pete@bucketlistly.com?subject="+document.contactform.subject.value+"&body="+body, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
  return false;
}

function sliderInit(selector) {
  jQuery(selector).flexslider({
  	touchSwipe: true,
  	animation: "slide",
  	slideshow: false,
  	easing: "swing",
  	start: function(slider) {
      slider.addClass("flex-complete");
    }
  });
  
}
jQuery(document).ready(function($) {
  $('body').addClass("js");
  $('.init-loading').css("visibility","visible");
});

 jQuery(window).load(function() {
	if(!jQuery.browser.mobile){
		$(".bangkok a, .entrepreneur a, .startups a").addClass("special-effect");
	}
 /*--------------------------------
Animation
---------------------------------*/
	
	
	$(".init-loading").remove().queue(function(next){
		$("#contactme_fold").css("visibility","visible").addClass("fadeInDownBig").delay(50).queue(function(next){
			$("#design_fold").css("visibility","visible").addClass("fadeInDownBig").delay(100).queue(function(next){
				$("#write_fold").css("visibility","visible").addClass("fadeInDownBig").delay(15.).queue(function(next){
					$("#startups_fold").css("visibility","visible").addClass("fadeInDownBig").delay(250).queue(function(next){
						$("#ventures_fold").css("visibility","visible").addClass("fadeInDownBig").delay(350).queue(function(next){
							$("#aboutme_fold").css("visibility","visible").addClass("fadeInDownBig").queue(function(next){
							  var stripped_url;
                stripped_url = document.location.toString().split("#");
                if (stripped_url.length > 1) {
                  $("#" + stripped_url[1]).closest(".foldin_wrapper").slideDown("slow",function(){
                    $.scrollTo($("#" + stripped_url[1]),{duration:'slow', offsetTop : '0'})
                    if($("#" + stripped_url[1]).closest(".foldin_wrapper").find(".flexslider:not(.flex-complete)").length > 0) sliderInit("#" + $("#" + stripped_url[1]).closest(".foldin_wrapper").attr("id") + " .flexslider:not(.flex-complete)");
                  });
                  
                  
                }
							});
						});
					});
				});
			});
		});
	});
  

/*--------------------------------
Sliders
---------------------------------*/

/*--------------------------------
Lightbox
---------------------------------*/
    jQuery("a[rel^='prettyPhoto']").prettyPhoto();

/*--------------------------------
Placeholder simulation for IE
---------------------------------*/	
	jQuery('#name').focus(function(){if(jQuery(this).val()=="Your Name*"){jQuery(this).val("");}}).blur(function(){if(jQuery(this).val()==""){jQuery(this).val("Your Name*");}});
	jQuery('#email').focus(function(){if(jQuery(this).val()=="Your Email Address*"){jQuery(this).val("");}}).blur(function(){if(jQuery(this).val()==""){jQuery(this).val("Your Email Address*");}});
	jQuery('#subject').focus(function(){if(jQuery(this).val()=="Subject*"){jQuery(this).val("");}}).blur(function(){if(jQuery(this).val()==""){jQuery(this).val("Subject*");}});
	jQuery('#message').focus(function(){if(jQuery(this).val()=="Message*"){jQuery(this).val("");}}).blur(function(){if(jQuery(this).val()==""){jQuery(this).val("Message*");}});
	
  /*--------------------------------
  Fittext for IE
  ---------------------------------*/	
	jQuery(".bangkok a").fitText(1, { maxFontSize: '206px' });
	jQuery(".entrepreneur a").fitText(1, { maxFontSize: '123px' });
	jQuery(".startups a").fitText(1, { maxFontSize: '158px' });
	jQuery(".write a").fitText(1, { maxFontSize: '153px' });
	if ( $.browser.mozilla) {
		jQuery(".write a").fitText(1, { maxFontSize: '127px' });
	}
	
	if ( $.browser.safari) {
		jQuery(".write a").fitText(1, { maxFontSize: '127px' });
	}
	
	jQuery(".design a").fitText(0.7, { maxFontSize: '52px' });
	jQuery(".thatdo").fitText(1, { maxFontSize: '40px' });
	jQuery(".contactme a").fitText(1, { maxFontSize: '40px' });
	jQuery(".logo a").fitText(1, { maxFontSize: '39px' });
	//jQuery(".small_box_wrapper h1, .small_box_wrapper h2").fitText();
	
  });
