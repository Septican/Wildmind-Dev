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





   $( "#price-range" ).slider({
        range: true,
        min: 5000,
        max: 50000,
        step: 1000,
        values: [ 10000, 30000 ],
        slide: function( event, ui ) {
            $( "#price" ).val('Ár: ' + ui.values[ 0 ] + " - " + ui.values[ 1 ] );
            $('#price-info').text( 'Ár: ' + ui.values[ 0 ] + " - " + ui.values[ 1 ] );

            minprice = ui.values[ 0 ];
            maxprice = ui.values[ 1 ];

            $('#pricebox').attr("price-array",[minprice,maxprice]);

            filter();
            return "baseball";
        }

    });

    $('#pricebox').attr("price-array",[$( "#price-range" ).slider( "values", 0 ),$( "#price-range" ).slider( "values", 1 )]);


  // console.log($( "#price-range" ).slider().init('min'));



    $( "#price" ).val( 'Ár: ' + $( "#price-range" ).slider( "values", 0 ) + " - " + $( "#price-range" ).slider( "values", 1 ) );





  	


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


        //Termék ár 2 értékének kiolvasása, szétválasztása, majd definiálása

        pricebox = $('#pricebox').attr('price-array');
        theprices = pricebox.split(",");

        minprice = theprices[ 0 ];
        maxprice = theprices[ 1 ];





        /******************************** CHECKING PRICE ***********************************/

        priceCheck = function(minprice,maxprice) {

            pricevalue = product.attr("data-price");


            if( product.attr("data-price").length > 0) {

                match = true;

                if ( minprice > parseInt(pricevalue) ) {

                    match = false;

                }

                if ( parseInt(pricevalue) > maxprice ) {

                    match = false;

                }

                return match;

            }

            return true;

        }
				
				
				
		/******************************** CHECKING SIZE ***********************************/
		
		 meretFilter = function(firstsizevalue,lastsizevalue) {
		 	
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

        /******************************** CHECKING COLOR ***********************************/


        colorFilter = function(product,color){

            if(product.attr('data-color') != color && color != '0'){


                return false;

            }
            return true;

        }

        /******************************** CHECKING PÁNT ***********************************/

        clickedItem = function(selected) {

            if(product.attr('data-pant') == selected ) {

                return false;

            }

            return true;

        }

        szexiFilter = function(){

            if( szexival.substring(18) < product.attr('data-szexi')){

                return false;

            }

            return true;

        }
		
		
		// FŐ ELLENŐRZÉS
			

		var size = $('#meret').val().replace('Méret: ','').split(' - ');
		
		if(colorFilter(product,color) === false) result = false;
		
		if(clickedItem(selected) === false) result = false;
		
	 	if(meretFilter(firstsizevalue,lastsizevalue) === false) result = false;

        if(priceCheck(minprice,maxprice) === false) result = false;
		
		if(priceCheck() === false) result = false;
		

		
		if ( result  == true ) {
			
			product.show();
			
		} else {
			
			product.hide();
			
		}

  	
  	
  	});
}



$(document).ready(function(){

	filter();


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

