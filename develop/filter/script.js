$(document).ready(function(){


    $( "#szexi-skala-range").slider({
      range: "min",
      min: 1,
      max: 5,
      value: 5,
      slide: function( event, ui ) {
        $( "#szexi-skala" ).val( 'Csábítási faktor: '+ ui.value );
        $('#szexi-info').text('Csábítási faktor: '+ ui.value);
        filter();
        
        
      }
    });

    $( "#szexi-skala" ).val( 'Csábítási faktor: '+ $( "#szexi-skala-range" ).slider( "value" ) );
    
    
    
	$( "#meret-range" ).slider({
      range: true,
      min: 32,
      max: 56,
      values: [ 36, 50 ],
      slide: function( event, ui ) {
      	
        $( "#meret" ).val('Méret: ' + ui.values[ 0 ] + " - " + ui.values[ 1 ] );
        $('#meret-info').text( 'Méret: ' + ui.values[ 0 ] + " - " + ui.values[ 1 ] );
        
        firstsize = ui.values[ 0 ];
        lastsize = ui.values[ 1 ];
        
        $('#firstsize').val(firstsize);
        $('#lastsize').val(lastsize);
              

        filter();
      }
    });	
    
	
    
	//ez csak betöltődéskor ad valós adatot, mozgás esetén már nem lehet ezekre hivatkozni, a slide funkción belül kell
	$( "#meret" ).val( 'Méret: ' + $( "#meret-range" ).slider( "values", 0 ) + " - " + $( "#meret-range" ).slider( "values", 1 ) );
	
	
	$('#firstsize').val( $( "#meret-range" ).slider( "values", 0 ));
	$('#lastsize').val( $( "#meret-range" ).slider( "values", 1 ));
	

        
    
    
  //  $( "#szexi-skala" ).val( 'Csábítási faktor: '+ $( "#szexi-skala-range" ).slider( "value" ) );




$('.ranged').toggle(
		function() { $('.stretch').hide();  $('.categoryfilter > li').css("height","36px"); $('.ranged').css("height","36px"); $(this).css("height","186px"); $(this).parent().css("height","186px"); $(this).parent().find('.stretch').show(); },
		function() { $(this).css("height","36px"); $(this).parent().css("height","36px"); $('.stretch', this).css("display","none");  }
	);
  	
  	$('.ranged2').css("height","36px");
  	$('.ranged2').toggle(
		function() { $('.stretch').hide(); $('.categoryfilter > li').css("height","36px"); $('.ranged2').css("height","36px"); $('.ranged2 .stretch').css("display","none"); $(this).css("height","326px"); $(this).parent().css("height","346px"); $('.stretch', this).css("display","block"); },
		function() { $(this).css("height","36px"); $(this).parent().css("height","36px"); $('.stretch', this).css("display","none");  }
	);
	

	$('.customselect').fancySelect();
  	
  	$('.ranged').css("height","36px");
  	$('.stretch').hide();
  	


});	
  	
  	$('#colorselect').on("change", function() {		
		filter();		
	});
	
	
	$('.pantelem').on("click", function() {			
		clickedItem($(this).attr("data-value"));
		$("#pant").val($(this).attr("data-value"));
		filter();	
		//filter($(this).attr("data-value"));		
	});
	
	
	
	


	  	
function filter() { 
	
	
	var products = $('.item');
	var color = $('#colorselect').val();	
	
	firstsizevalue = $('#firstsize').val();
	lastsizevalue = $('#lastsize').val();
	
	console.log("searching for: " + firstsizevalue + " - " + lastsizevalue);
	

	
	var selected = $("#pant").val();
	
	szexival = $("#szexi-skala" ).val();
		
	products.each(function(){
		
		product = $(this);		
		result = true;
		
		
		// turn sizes into array then we get the first and the last element 
		
		
		//sizelist = $(".item").attr('data-size');		
	
		sizelist = product.attr('data-size');
		arrSizes = sizelist.split( "," );
	    
	    maxlength = arrSizes.length;
	    
	    minsize = arrSizes[ 0 ];
		maxsize = arrSizes[ arrSizes.length - 1 ];

		//console.log(minsize, maxsize);
				
				
				
		/******************************** CHECKING SIZE ***********************************/
		
		 this.meretFilter = function (firstsizevalue,lastsizevalue) {
		 	
		 	if( arrSizes.length > 0) {
		 	
		 			match = true;	
												
						if ( firstsizevalue > parseInt(maxsize) ) {  
																
							match = false;
		
						}
						
						if ( parseInt(minsize) > lastsizevalue ) {						
						
							match = false;
						
						}
						
					return match;		

		 	}
		 			 			 				
			return true;
				
		} 
		
		
		// FŐ ELLENŐRZÉS
			

		var size = $('#meret').val().replace('Méret: ','').split(' - ');
		
		if(colorFilter(product,color) === false) result = false;
		
		if(clickedItem(selected) === false) result = false;
		
	 	if (this.meretFilter(firstsizevalue,lastsizevalue) === false) result = false;
		
	//	if(szexiFilter() === false) result = false;
		

		
		if ( result  == true ) {
			
			product.show();
			
		} else {
			
			product.hide();
			
		}

  	
  	
  	});
}  	

function colorFilter(product,color){
	
	if(product.attr('data-color') != color && color != '0'){
		
			
		return false;
		
	}
	return true;
	
}


function clickedItem(selected) {

	if(product.attr('data-pant') == selected ) {

		return false;
		
	}

	return true;

}


function szexiFilter(){

	if( szexival.substring(18) != product.attr('data-szexi')){
		
		//console.log(szexival.substring(18));	
		return false;
		
	}
	
	return true;
	
}




$(document).ready(function(){

	filter();

});	

