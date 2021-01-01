(function(){
    document.forms[0].noValidate = true;  // disable html5 validation
    $('form').on('submit', function(e){  // when form is submited
        var elements = this.elements;  // collection of form controls
        var valid = {};   // create an empty object
        var isValid;     // to chech form controls
        var isFormValid;   // to check entire form

        // perform geniric checks (calls functions outside event handler
        for(let i = 0, l = elements.length - 1; i< l; i++){
            // next line call validateRequired and validateTypes
            isValid = validateRequired(elements[i]) && validateTypes(elements[i]);
            
            if(!isValid){  // if is not pass these two tests
                showErrorMessage(elements[i]);  // showErrorMessage is called
            }else {
                removeErrorMessage(elements[i]);  // otherwise removeErrorMessage is called
            }  // end if stetement
            valid[elements[i].id] = isValid;  // add to valid object
        }   // end for loop

        // perform custom validation ()
        if(!validateBio()){  // call validateBio if not valid
            showErrorMessage(document.getElementById('bio'));  // showErrorMessage is called
            valid.bio = false;  // update valid object -not valid
        } else {  // otherwise
             removeErrorMessage(document.getElementById('bio'));  // removeErrorMessage is called
        }
        // two more functions follow here page: 614 - 617

        // call validatePassword
        if(!validatePassword()){
            showErrorMessage(document.getElementById('password'));
            valid.password = false;
        }else {
            removeErrorMessage(document.getElementById('password'));
        }
        // call validateParentsConsent function
        if(!validateParentsConsent()){
            showErrorMessage(document.getElementById('parents-consent'));
            valid.parentsConsent = false;
        }else {
            removeErrorMessage(document.getElementById('parents-consent'));
        }



         // loop through valid object, if there are errors set isFormValid to false
        for(var field in valid){  // check propeties of the valid object
            if(!valid[field]){  // if it is not valid
                isFormValid = false;  // set isFormValid to false
                break;  // stop the for loop error was found
            }  // otherwise 
            isFormValid = true;  // the form is valid and ok to submit
        }  // end for loop

        // if the form did not validate, prevent it being submitted
        if(!isFormValid){  // if isFormValid is not true
            e.preventDefault();   // prevent the form being submitted
        }
    });  // end event handler

    // functions called above go here
    // function validateRequired
    function validateRequired(el){  
        if(isRequired(el)){   // is this element required
            var valid = !isEmpty(el);   // is value not empty
            if(!valid){   // if valid variable holds false
                  setErrorMessage(el, 'field is required');  // setErrorMessage is called
            }
            return valid;   // return valid variable true or false
        }
        return true;  // if not required all is ok
    }  // end validateRequired function

    // function isRequired
    function isRequired(el){
        return ((typeof el.required === 'boolean') && el.required) || (typeof el.required === 'string');
    }  // end isRequired function

    // function isEmpty()
    function isEmpty(el){
        return !el.value || el.value === el.placeholder;
    }  // end isEmpty function

    // function setErrorMessage
    function setErrorMessage(el, message){
        $(el).data('errorMessage', message);  // set error message with element
    }  // end setErrorMessage


    // function showErrorMessage
    function showErrorMessage(el){
        var $el = $(el);  // find element with error
        var $errorContainer = $el.siblings('.error');  // does it have errors already

        if(!$errorContainer.length){  // if no error found
            // create a span to hold the error and add it after element with the error
            $errorContainer = $('<span class="error"></span>').insertAfter($el);
        }
        $errorContainer.text($(el).data('errorMessage'));  // add error message
    }  // end showErrorMessage function


    // function validateTypes()
    function validateTypes(el){
        if(!el.value) return true;  // if element has no value return true
        //otherwise get the value from the .data()
        var type = $(el).data('type') || $(el).getAttribute('type');  // or get the type of input
        if(typeof validateType[type] === 'function'){ // is type a method of validate object
            return validateType[type](el);  // if yes, check if the value validate
        }else {  // if not
            return true;  // return true as it can not be tested
        }
    }  // end validateTypes function

    var validateType = {
        email: function(el){  // create email method
            var valid = /[^@]+@[^@]+/.test(el.value);
            if(!valid){
                setErrorMessage(el, 'Please Enter a Valid Email');
            }
            return valid;
        },
        number: function(el){
            var valid = /^\d+$/.test(el.value);  // store result of test in variable
            if(!valid){  // if the value of valid is not true
                setErrorMessage(el, 'Please Enter a valid Number');  // setErrorMessage is called
            }
            return valid;  // return the valid variable

        },
        date: function(el){
            var valid = /^(\d{2}\/\d{2}\/\d{4})|(\d{4}-\d{2}-\d{2})$/.test(el.value);
            if(!valid){
                setErrorMessage(el, 'Please Enter a Valid Date');
            }
            return valid;

        }
    };
    //// 
    

    function validateBio(){
        var bio = document.getElementById('bio');  // store ref to bio textarea
        var valid = bio.value.length <= 140;  // is bio is <= 140 caracters?
        if(!valid){   // if not
            setErrorMessage(bio, 'Your bio should Not exceed 140 caracters'); // setErrorMessage is called
        }
        return valid;  // return boolean value
    }  // end validateBio function


   
    

    // function validate password
    function validatePassword(){
        var password = document.getElementById('password');  // store ref to element
        var valid = password.value.length >=8;  // is its value >= 8
        if(!valid){  // if not
            setErrorMessage(password, 'password must be at least 8 caracters');  // setErrorMessage is called
        }
        return valid;  // return true or false
    }  // end validatePassword function

    

    // function validateParentsConsent
    function validateParentsConsent(){
        var parentsConsent = document.getElementById('parents-consent');
        var consentContainer = document.getElementById('consent-container');
        var valid = true;  // variable valid set to true
        if(consentContainer.className.indexOf('hide') === -1){  // if checkbox shown
            valid = parentsConsent.checked;  // update valid is it checked or not
            if(!valid){
                setErrorMessage(parentsConsent, 'You need your parents\' consent');
            }
        }
        return valid;  // return whether valid or nat

    }  // end validateParentsConsent function
}());
