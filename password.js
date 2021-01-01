(function(){
    var password = document.getElementById('password');  // store password inputs
    var passwordConfirm = document.getElementById('conf-password');

    // function  setErrorHighLighter()
    function setErrorHighLighter(e){
        var target = e.target || e.srcElement;  // get target element
        if(target.value.length < 8){  // if its length < 8
            target.className = 'fail';  // set class to fail
        }else {  // otherwise
            target.className = 'pass';   // set class to pass
        }
    }  // end setErrorHighLighter function


    // function removeErrorHighLighter()
    function removeErrorHighLighter(e){
        var target = e.target || e.srcElement;  // get target element
        if(target.className === 'fail'){  // if its class is fail
            target.className = '';  // clear class
        }
    }  // end removeErrorHighLighter function


    // function  passwordsMatch()
    function passwordsMatch(e){
        var target = e.target || e.srcElement;   // get target element
        // if value matches pwd and it is long enough
        if((password.value === target.value) && target.value.length >= 8){
            target.className = 'pass';  // set class to pass
        } else {   // otherwise 
            target.className = 'fail';  // set class to fail
        }
    }  // end passwordsMatch function

    addEvent(password, 'focus', removeErrorHighLighter);
    addEvent(password, 'blue', setErrorHighLighter);
    addEvent(passwordConfirm, 'focus', removeErrorHighLighter);
    addEvent(passwordConfirm, 'blur', passwordsMatch);

}());