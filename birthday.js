(function(){
    var $birth = $('#birthday');
    var $parentsConsent = $('#parents-consent');  // checkbox
    var $consentContainer = $('#consent-container');  // checkbox container
    
    // create the date picker using jquery UI
    $birth.prop('type', 'text');
    $birth.data('type', 'date');
    $birth.datepicker({
        dateFormat: 'yy-mm-dd'  // set date format
    });
    $birth.on('blur change', checkDate);  // when dateFild loses focus

    // function checkDate
    function checkDate(){
        var dob = this.value.split('-');  // array from date
        // pass toggleParentsConsent() the date of birth as a date object
        toggleParentsConsent(new Date(dob[0], dob[1] - 1, dob[2]));
    }

    // function toggleParentsConsent
    function toggleParentsConsent(date){
        if(isNaN(date)) return;   // stop if date invalibe
        var now = new Date();   // new date object: today
        if((now - date) < (13 * 365 * 24 * 60 * 60 * 1000)){
            $consentContainer.removeClass('hide');  // remove hide class
            $parentsConsent.focus();   // give it focus
        } else {   // otherwise
            $consentContainer.addClass('hide');  // add hide to class
            $parentsConsent.prop('checked', false);  // set checked to false
        } 
    }
}());