


function validateName(oName) {

    if ($.trim(oName).length < 3) {
       return false;
        }
     else {
        return true;
     }
}


function checkName() {
	
	$('input[name="companyname[]"]').blur(function() {		
		 oName = $(this).val();
		 alertbox = $(this).parent().find('span'); 
		 
		 if ($.trim(oName).length == 0) {
            alertbox.html('Please enter your name');
            //em.preventDefault();
        }
        else if (validateName(oName)) {
            alertbox.html('Ok');
        }
        else {
            alertbox.html('Please enter a valid name');
            //em.preventDefault();
        }
	});
	
}	


/*************************************************************************************************/


var oEmail = $('input[name="companyemail[]"]').parent().find('input').val(); 

function validateEmail(oEmail) {

    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(oEmail)) {
        return true;
    }
     else {
        return false;
     }
}


function checkEmail() {
	
	$('input[name="companyemail[]"]').blur(function() {
    	
    	oEmail = $(this).val();
    	alertbox = $(this).parent().find('span');   	
        
        if ($.trim(oEmail).length == 0) {
            alertbox.html('Please enter valid email address');
           // em.preventDefault();
        }
        else if (validateEmail(oEmail)) {
            alertbox.html('Ok');
        }
        else {
            $(this).parent().find('span').html('Invalid Email Address');
           // em.preventDefault();
        }
    });
}


/*************************************************************************************************/

var oPhone = $('input[name="companytel[]"]').parent().find('input').val(); 

function validatePhone(oPhone) {

    var filter = /^[0-9-+]+$/;
    if (filter.test(oPhone)) {
        return true;
    }
    else {
        return false;
    }   
}

function checkPhone() {
	
	$('input[name="companytel[]"]').blur(function() {
	    	
	    	oPhone = $(this).val();	    		   
	    	alertbox = $(this).parent().find('span');
			if ($.trim(oPhone).length == 0) {
	            alertbox.html('Please enter your phone number');
	            //em.preventDefault();
	        }
	    	if (validatePhone(oPhone)) {
	            alertbox.html('Ok');
	            alertbox.css('color', 'green');
	        }
	        else {
	            alertbox.html('Invalid');
	            alertbox.css('color', 'red');
	            //em.preventDefault();
	        }
	    });
}   

/*************************************************************************************************/

function checkPass() {
	
	$('input[name="companypass[]"]').blur(function() {
     
        var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
        var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
        var enoughRegex = new RegExp("(?=.{6,}).*", "g");
        
        alertbox = $(this).parent().find('span');
        
        if (false == enoughRegex.test($(this).val())) {
            alertbox.html('More Characters');
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
    
/*************************************************************************************************/   



function confirmPass() {
	
	
	$('input[name="confirmpass[]"]').blur(function() {
    
    	alertbox = $(this).parent().find('span');
    
        if ( $(this).val() == $(this).parent().parent().parent().find('input[name="companypass[]"]').val() && $(this).val() != "" ) {
            alertbox.className = 'passed';
            alertbox.html('Ok');

        }
        else if ( $(this).val() == ""){
            alertbox.className = 'error';
            alertbox.html('Empty!');
           // em.preventDefault();
        }
        
        else {
        	alertbox.className = 'error';
            alertbox.html('Passwords are not the same!');
           // em.preventDefault();
        }            
    });
	
} 
 
/*************************************************************************************************/   


var oDate = $('input[name="companydate[]"]').parent().find('input').val(); 

function validateDate(oDate) {

    //if(oDate == '') return false;
    
    var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/; //Declare Regex
    var dtArray = oDate.match(rxDatePattern); // is format OK?
    
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

function checkDate() {
	
	$('input[name="companydate[]"]').blur(function(){
        
        oDate = $(this).val();
        
        if ($.trim(oDate).length == 0) {
            $(this).parent().find('span').html('Please enter the date');
            //em.preventDefault();
        }
        else if(validateDate(oDate))
            $(this).parent().find('span').html('Ok');
 
        else
            $(this).parent().find('span').html('Date is invalid');
           // em.preventDefault();
    });
    
    $('input[name="companydate[]"]').focus(function(){ 
    	$(this).parent().find('span').html('(mm-dd-yyyy)');
    });
}



/*************************************************************************************************/


function checkSelect() {
	
		selectvalue = $("#country option:selected").val();

		if ( selectvalue == 0 ) {
			return false;		
		}
		else {
			return true;					
		}					
}

function checkCountry() {
		
	$('#country').on('blur change', function() {
		
		alertbox = $(this).parent().find('span');
		selectvalue = $("#country option:selected").val();	
		
		if ( selectvalue == 0 ) {			
			alertbox.html('Please select');
		}
		else {
			alertbox.html('ok');					
		}	

	});
	
}	


/*************************************************************************************************/




function checkTerms() {

		if ( $("#terms").is(":checked") ) {
			return true;		
		}
		else {
			return false;					
		}					
}




/*************************************************************************************************/

var sender = document.getElementById("send");



function validation() {
	
	this.oName = $('input[name="companyname[]"]').parent().find('input').val(); 
	
	
	var thename = $('input[name="companyname[]"]').val();
    var thephone = $('input[name="companytel[]"]').val();
    var theemail = $('input[name="companyemail[]"]').val();
    var theadrs = $('input[name="companyadrs[]"]').val();
    var thedate = $('input[name="companydate[]"]').val();
    var thepass = $('input[name="companypass[]"]').val();
    var thepass2 = $('input[name="confirmpass[]"]').val();
    var theTerms = $('#tersm').attr('checked');
    
    
    console.log(checkTerms());
    
	//if ( thename == "" || thephone == "" || theemail == "" || theadrs == "" || thedate == "" || thepass == "" || thepass2 == "" || !validatePhone(oPhone) || !validateEmail(oEmail) || thepass != thepass2 || !validateDate(oDate) || !validateName(oName) || !checkTerms() ) { 
    if ( !checkSelect() ) { 
   	
	alert("Some datas are missiong or wrong. Please make sure you've entered all the shit correctly.");
	
	}
	else {
		alert('Thank You. Everything looks fine.');	
	}


}



/*************************************************************************************************/


$(document).ready(function(){


	//$('input[name="companyname[]"]').focus();

	$('#send').click(function() {
       //$('#country option:selected').html());
        validation();

    });


	$('#addMore').click(function() {
		$('form').clone(true).appendTo('body').find('input').val("").parent().find('span').html("");
	});
	
	checkPhone();
	checkEmail();
	checkPass();
	confirmPass();
	checkDate();
	checkName();
	checkCountry();
	



  

});


// window.onload=validation;