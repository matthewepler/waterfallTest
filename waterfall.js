var async = require('async');
var other = require('./other.js');

function doTheThang() {
    async.waterfall([
                function(cb) {
                    other.stepOne();
                    cb(null);
                }, 
                function(cb) {
                    var r = other.stepTwo();
                    if (r) {
                        cb(null, r);
                    } else {
                        cb(new Error('something bad'));
                    }
                },
                function(result, cb) {
                    console.log(result);
                    other.stepThree();
                    cb();
                }
            ], 
            function(err, results){
                if (err) {
                    console.log(err.toString('utf8'));
                } 
                
                if (results) {
                    console.log(results.toString('utf8'));
                } 

                console.log('end of waterfall');
            });
}

doTheThang();


/* 
 Problem:
 How do I deal with a function inside a waterfall function that
 doesn't have a built-in callback (one that I built or otherwise)?

 Solution:
 If it doesn't have a built-in callback, you need to call the provided
 callback yourself. If you need to know if the function call was successful, y you can have it return something, which can be saved to a local variable and checked before executing the callback. If an error is returned, call the callback with that error. If not, call it with the returned data and receive it in the next function's parameters. 
 */
