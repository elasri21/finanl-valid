function addEvent(el, event, callBack){
    if('addEventListener' in el){   // if 'addEventListener work 
        el.addEventListener(event, callBack, false); // use it

    } else {  // if not === othetwise
        el['e' + event + callBack] = callBack;  // make callBack a methodof el
        el[event + callBack] = function(){     // add second method
            el['e' + event + callBack](window.event);  // use it to call previous function
        };
        el.attachEvent('on' + event, el[event + callBack]);
        /* use attachEvent to call the second method, then the second method will call the first method */
    }
}