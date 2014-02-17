
(function( $ ){
	

var sender = document.getElementById("send");


$('#addMore').on('click',function() {
		$('.maindatas').clone(true).insertAfter('.maindatas').find('select').parent().find('span').html("").parent().parent().parent().find('input').val("").parent().find('span').html("");
	});
	
/*************************************************************************************************/
/***fő függvény***/
/*************************************************************************************************/	
	

$.fn.validation = function(send_trigger, formid) {


	//function validation(send_trigger, formid) {
	
	// classok
	this.error = "error";
	this.ok = "ok";
	
	
	//fő inputok 
	
	this.inputName = document.getElementsByName("companyname[]");
	this.inputEmail = document.getElementsByName("companyemail[]");
	this.inputPhone = document.getElementsByName("companytel[]");
	this.inputPass = document.getElementsByName("companypass[]");
	this.inputConfrim = document.getElementsByName("confirmpass[]");
	this.inputDate = document.getElementsByName("companydate[]");
	this.inputAdrs = document.getElementsByName("companyadrs[]");
	
	//inputok adatai
	
	//this.oName = document.ajaxform.companyname.value;
	//document.forms['form'].elements['data[name]'].value;
	//this.oName = document.forms['ajaxform'].elements['companyname[]'].value;
		
	this.oName = $('input[name="companyname[]"]').parent().find('input').val(); 
	this.oEmail = $('input[name="companyemail[]"]').parent().find('input').val(); 
	this.oPhone = $('input[name="companytel[]"]').parent().find('input').val(); 
	this.oDate = $('input[name="companydate[]"]').parent().find('input').val(); 
    this.oAdrs = $('input[name="companyadrs[]"]').parent().find('input').val(); 
    this.thepass = $('input[name="companypass[]"]').parent().find('input').val(); 
    this.confirmpass = $('input[name="confirmpass[]"]').parent().find('input').val(); 
    this.country = $('select option:selected').html();
    this.theTerms = $('#tersm').attr('checked');
    
    // ellenőrző és validáló függvények
    
 
    
    
	    /*******************************************név ellenőrzés*******************************************/
		
		
		this.validateName = function() {
			
		    if ($.trim(this.oName).length < 3) {
		       return false;
		        }
		     else {
		        return true;
		     }
		}
		
		
		this.checkName = function() {
			
			validateName = this.validateName;
			
			$(this.inputName).blur(function() {	
				
					
				 oName = $(this).val();
				 alertbox = $(this).parent().find('span'); 
				 
				 if ($.trim(oName).length == 0) {
		            alertbox.html('Please enter your name');
		            alertbox.removeClass('ok').addClass('error');
		            event.preventDefault();
		        }
		        else if (validateName(oName)) {                           // -------------> validateName(oName) nem pedig  this.validateName(oName) mert this.validateName = function validateName;
		            alertbox.html('Ok');
		            alertbox.removeClass('error').addClass('ok');
		        }
		        else {
		            alertbox.html('Please enter a valid name');
		            alertbox.removeClass('ok').addClass('error');
		            event.preventDefault();
		        }
			});
			
		}	
	
	

		/*******************************************email ellenőrzés*******************************************/

		
		
		 this.validateEmail = function() {
		
		    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		    if (filter.test(this.oEmail)) {
		        return true;
		    }
		     else {
		        return false;
		     }
		}
		
		
		 this.checkEmail = function() {
		 
		 validateEmail = this.validateEmail;
			
			$(this.inputEmail).blur(function() {
		    	
		    	oEmail = $(this).val();
		    	alertbox = $(this).parent().find('span');   	
		        
		        if ($.trim(oEmail).length == 0) {
		            alertbox.html('Please enter your email');
		            alertbox.removeClass('ok').addClass('error');
		            event.preventDefault();
		        }
		        else if (validateEmail(oEmail)) {
		            alertbox.html('Ok');
		            alertbox.removeClass('error').addClass('ok');
		        }
		        else {
		            $(this).parent().find('span').html('Invalid email');
		            alertbox.removeClass('ok').addClass('error');
		            event.preventDefault();
		        }
		    });
		}
		
		
		
	
		/*******************************************telefon ellenőrzés*******************************************/
		
		
		this.validatePhone = function() {
		
		
		    var filter = /^[0-9-+]+$/;
		    if (filter.test(this.oPhone)) {
		        return true;
		    }
		    else {
		        return false;
		    }   
		}
		
		this.checkPhone = function() {
		
		validatePhone = this.validatePhone;
			
			$(this.inputPhone).blur(function() {
			    	
			    	oPhone = $(this).val();	    		   
			    	alertbox = $(this).parent().find('span');
			    	
					if ($.trim(oPhone).length == 0) {
			            alertbox.html('Please enter your phone number');
			            alertbox.removeClass('ok').addClass('error');
			            event.preventDefault();
			        }
			    	if (validatePhone(oPhone)) {
			            alertbox.html('Ok');
			            alertbox.removeClass('error').addClass('ok');
			        }
			        else {
			            alertbox.html('Invalid phone number');
			            alertbox.removeClass('ok').addClass('error');
			            event.preventDefault();
			        }
			    });
		}   	
		
		
		
			
		/*******************************************jelszó ellenőrzés*******************************************/
		
		this.checkPass = function() {
			
			$(this.inputPass).blur(function() {
		     
		        var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
		        var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
		        var enoughRegex = new RegExp("(?=.{6,}).*", "g");
		        
		        alertbox = $(this).parent().find('span');
		        
		        if (false == enoughRegex.test($(this).val())) {
		            alertbox.html('Min. 6 characters');
		            alertbox.removeClass('ok').addClass('error');
		        } else if (strongRegex.test($(this).val())) {
		            alertbox.className = 'ok';
		            alertbox.html('Strong!');
		        } else if (mediumRegex.test($(this).val())) {
		            alertbox.className = 'alert';
		            alertbox.html('Medium!');
		        } else {
		            alertbox.className = 'error';
		            alertbox.html('Weak!');
		        }
		        return true;
		        
		    });
			
		}	
		
		/*******************************************jelszó megerősítés ellenőrzés*******************************************/
		
		
		
		this.validateconfirmPass = function() {
			
			
			$(this.inputConfrim).blur(function() {
		    
		    	alertbox = $(this).parent().find('span');
		    
		        if ( $(this).val() == $(this).parent().parent().parent().find('input[name="companypass[]"]').val() && $(this).val() != "" ) {
		            alertbox.html('Ok');
		            alertbox.removeClass('error').addClass('ok');
		
		        }
		        else if ( $(this).val() == ""){
		            alertbox.html('Please confirm your password!');
		            alertbox.removeClass('ok').addClass('error');
		            event.preventDefault();
		        }
		        
		        else {
		        	alertbox.className = 'error';
		            alertbox.html('Passwords are not the same!');
		            alertbox.removeClass('ok').addClass('error');
		            event.preventDefault();
		        }            
		    });
			
		} 	
		
		
	 
		/*******************************************dátum ellenőrzés*******************************************/ 
		
		
		this.validateDate = function() {
		
		    //if(oDate == '') return false;
		    
		    var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/; //Declare Regex
		    var dtArray = this.oDate.match(rxDatePattern); // is format OK?
		    
		    if (dtArray == null) return false;
		    
		    //Checks for mm/dd/yyyy format.
		    dtMonth = dtArray[1];
		    dtDay= dtArray[3];
		    dtYear = dtArray[5];        
		    
		    /*Checks for dd/mm/yyyy format.
		    dtDay = dtArray[1];
		    dtMonth= dtArray[3];
		    dtYear = dtArray[5];  */
		    
		    if (dtMonth < 1 || dtMonth > 12) 
		        return false;
		    else if (dtDay < 1 || dtDay> 31) 
		        return false;
		    else if ((dtMonth==4 || dtMonth==6 || dtMonth==9 || dtMonth==11) && dtDay ==31) 
		        return false;
		    else if (dtMonth == 2) 
		    {
		        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
		        if (dtDay> 29 || (dtDay ==29 && !isleap)) 
		                return false;
		    }
		    else {
		    	return true;	    	
		    }
		    
		}
		
		this.checkDate = function() {
		
		validateDate = this.validateDate;
			
			$(this.inputDate).blur(function(){
		        
		        oDate = $(this).val();
		        alertbox = $(this).parent().find('span');
		        
		        if ($.trim(oDate).length == 0) {
		            $(this).parent().find('span').html('Please enter the date');
		            alertbox.removeClass('ok').addClass('error');
		            event.preventDefault();
		        }
		        else if(validateDate(oDate)) {
		            $(this).parent().find('span').html('Ok');
		            alertbox.removeClass('error').addClass('ok');
		 		}
		        else {
		        	$(this).parent().find('span').html('Date is invalid');
		            alertbox.removeClass('ok').addClass('error');
		            event.preventDefault();
		        	
		        }
		            
		    });
		    
		    $(this.inputDate).focus(function(){ 
		    	$(this).parent().find('span').html('mm-dd-yyyy');
		    });
		}	
		
	
		/*******************************************cím ellenőrzés*******************************************/
		
		this.validateAddress = function() {
		    if ($.trim(this.oAdrs).length < 3) {
		       return false;
		        }
		     else {
		        return true;
		     }
		}
		
		
		this.checkAddress = function() {
		
		validateAddress = this.validateAddress;
			
			$(this.inputAdrs).blur(function() {	
					
				 oAdrs = $(this).val();
				 alertbox = $(this).parent().find('span'); 
				 
				 if ($.trim(oAdrs).length == 0) {
		            alertbox.html('Please enter your address');
		            alertbox.removeClass('ok').addClass('error');
		            event.preventDefault();
		        }
		        else if (validateAddress(oAdrs)) {
		            alertbox.html('Ok');
		            alertbox.removeClass('error').addClass('ok');
		        }
		        else {
		            alertbox.html('Please enter a valid address');
		            alertbox.removeClass('ok').addClass('error');
		            event.preventDefault();
		        }
			});
			
		}	
		
		/*******************************************county selectbox ellenőrzés*******************************************/
		
		
		this.validateCountry = function() {
			
			    selectvalue = $("select[name='country[]']").val();
				//selectvalue = $("select[name='country[]'] option:selected").val();
		
				if ( selectvalue == 0 ) {
					return false;		
				}
				else {
					return true;					
				}					
		}
		
		this.checkCountry = function() {
				
								
				
			$('select[name="country[]"]').change(function() {
				
				
				alertbox = $(this).parent().find('span');
				selectvalue = $("option:selected", this).val();	
				
				
				if ( selectvalue == 0 ) {			
					alertbox.html('Please select your country');
					alertbox.removeClass('ok').addClass('error');
				}
				else {
					alertbox.html('Ok');		
					alertbox.removeClass('error').addClass('ok');			
				}	
		
			});
			
		}	
	
		
    
    
	    /*******************************************terms checkbox ellenőrzés*******************************************/
	    
	    
	    this.checkTerms = function () { 
	    	
	    	if ( $("#terms").is(":checked") ) {
				return true;		
			}
			else {
				return false;					
			}
	    	
	    }

	
	// FŐ ESEMÉNYEK	
	//ha kattintanak elindul a validálás
	
	if ( send_trigger === true ) {
		
		
			elements = document.getElementsByClassName('maindatas');

			// for (i=0; i < elements.length; i++) {  

			 
			if ( this.oName == "" || this.oEmail == "" || this.oPhone == "" || this.oAdrs == "" || this.oDate == "" || this.thepass == "" || this.confirmpass == "" || !this.validatePhone() || !this.validateEmail() || this.thepass != this.confirmpass || !this.validateDate() || !this.validateName() || !this.checkTerms() || !this.validateCountry() || !this.validateAddress() ) { 
		   			   	
		   	
			alert("Some datas are missiong or wrong. Please make sure you've entered all the shit correctly.");
			
			
			
			
			$.each(this.oName, function() {
			
				thename = this.oName;

			});
			
			}
			else {
				
				alert('Thank You. Everything looks fine.');	
				
				
				
				
				
				//$('form').submit();
				
				//Ajax time
				
				/*this.submitreg = function(e){
		                    
		                    e.preventDefault();		  
		                    
		                    //dataString = $(this).serialize();                  		                     		           		     			
		     				
		                    $.ajax({
		                        type: "POST",
		                        url: "check.php",
		                        //data: dataString,
		                        data: { 'name': this.oName, 'email_address': this.oEmail, 'phone' : this.oPhone, 'address' : this.oAdrs, 'country' : this.country, 'date' : this.oDate, 'pass' : this.thepass, 'confrim_pass' : this.confirmpass },
		                        dataType: "JSON",
		                        success: function(dataJSON) {
		                        	
		                        	content = "Köszönjük, az ön által megadott adatok a következőek: </br><ul>";
		                        	content += '<li>Name: '+ dataJSON.name +'</li>';		
		                        	content += '<li>Email: '+ dataJSON.email_address +'</li>';                        	
		                        	content += '<li>Phone: '+ dataJSON.phone +'</li>';
		                        	content += '<li>Address: '+ dataJSON.address +'</li>';
		                        	content += '<li>Country: '+ dataJSON.country +'</li>';
		                        	content += '<li>Date: '+ dataJSON.date +'</li>';
		                        	content += '<li>Pass: '+ dataJSON.pass +'</li>';
		                        	content += '</ul>';		                        	
		                        	
		                        	$("#response").html(content);
		                        	
		                        },
		                        error: function () {		                        	
		                        	content = "<div class='error'>Valami hiba történt</div>";
						            $("#response").html(content);
						        }
		           
		                    });
		                     
		         
		            }
		            
		            this.submitreg(e); */
	
			}
			 	
			 	 
		

 			//} // end for loop

		
		    
			
		
	}
	
	
	//ALAP ELLENŐRZÉSEK MEGHÍVÁSA
	
	this.checkName();
    this.checkPhone();
	this.checkEmail();
	this.checkPass();
	this.validateconfirmPass();
	this.checkDate();
	this.checkCountry();
	this.checkAddress(); 

}

}(jQuery));



/*************************************************************************************************/


$(document).ready(function(){


	$('#send').on("click", function() {
        $('#ajaxform').validation(true, '#ajaxform');
    });
    
    //meghívjuk a függvényt de a kattintás eseményeit kikapcsoluk alat esetben
    $('#ajaxform').validation(false, '#ajaxform');
 

});

