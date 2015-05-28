
////////////////////////////////////////////////////////
// MathCustom.js
//
// A library of custom math functions.
//
// At some point I realized I was using the same
// functions over and over and rewriting them,
// so I've decided to create a custom math library
// for them. A bunch of functions were used for 
// procedural generation.
// 
////////////////////////////////////////////////////////

var MathCustom = (function(mc) {

    //----------------------------------------------
    // Converts degrees to radians
    //----------------------------------------------
    mc.deg2rad = function(x) {
        return x*Math.PI/180;
    };
    
    //----------------------------------------------
    // Converts radians to degrees
    //----------------------------------------------
    mc.rad2deg = function(x) {
        return 180*x/Math.PI;
    };
    
    //----------------------------------------------
    // Rounds towards 0, optional d decimal places
    //----------------------------------------------
    mc.fix = function(x, d) {
        if(d) {
            d = Math.pow(10,d);
            return x >= 0 ? Math.floor(x*d)/d : Math.ceil(x*d)/d;
        }
        return x >= 0 ? Math.floor(x) : Math.ceil(x);
    };
    
    //----------------------------------------------
    // Computes log10
    // Important to use constant provided by Math
    //----------------------------------------------
    mc.log10 = function(x) {
        return Math.log(x) / Math.LN10;
    };

    //----------------------------------------------
    // Linearly maps a value from [vmin, vmax] to 
    // [omin, omax]. Taken from Arduino.
    //----------------------------------------------
    mc.map = function(val, in_min, in_max, out_min, out_max) {
        return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    };
    
    //----------------------------------------------
    // Maps a value from [vmin, vmax] to 
    // [omin, omax] based on a curve.
    //
    // Works by first mapping to [0, 1], performing
    // curve operation, then mapping to output
    // 
    // Defaults to polynomial map based on exp,
    // but can also give a function
    //----------------------------------------------
    mc.mapx = function(val, in_min, in_max, out_min, out_max, exp) {
        
        // Accept number inputs
        if(typeof(exp) == "number") {
            
            // Polynomial map: x^exp
            return Math.pow((val-in_min)/(in_max-in_min), exp) * (out_max - out_min) + out_min;
        
        }
        
        // Accept function inputs
        else if(typeof(exp) == "function") {

            // Use "exp" as function
            return exp((val-in_min)/(in_max-in_min)) * (out_max - out_min) + out_min;
        
        }
        
        // Mapping failed
        return val;
    };
    
    ////////////////////////////////////////////////////////
    // Since an important part of this lib is 
    // procedural generation, it seems necessary
    // to add in a Random submodule.
    ////////////////////////////////////////////////////////

    mc.Random = (function(rn) {
    
        //----------------------------------------------
        // Computes -1 or 1 using Math.random()
        //----------------------------------------------
        rn.randSign = function() {
            return Math.random() < 0.5 ? -1 : 1;
        };
        
        //----------------------------------------------
        // Get random number in a range [min, max)
        // Distribution determined by exp, default = 1
        // Distribution is polynomial
        //
        // Notes: For exp > 1, numbers will cluster 
        // closer to min. For 0 < exp < 1, numbers will
        // cluster towards max.
        //----------------------------------------------
        rn.randRange = function(min, max, exp) {
            if(exp) {return Math.pow(Math.random(),exp)*(max-min)+min;}
            return Math.random()*(max-min)+min;
        };
    
        return rn;
        
    } (mc.Random || {}));
    
    ////////////////////////////////////////////////////////
    // Creating some utility functions to ease
    // transformations, etc.
    ////////////////////////////////////////////////////////
    
    mc.Util = (function(ut) {
        
        //----------------------------------------------
        // Given an array, transforms into a hashmap
        // and counts the distinct values
        //----------------------------------------------
        ut.distinctMap = function(arr) {
            
            var hash = {};
            
            // Note: not all array structures have "forEach"
            // Use for loop instead
            for(var i=0;i<arr.length;i++) {
                var val = hash[arr[i]];
                hash[arr[i]] = val ? val+1 : 1;
            }
            
            return hash;
        
        };
    
        return ut;
    
    } (mc.Util || {}));



    return mc;
    
}(MathCustom || {}));

// Create namespace
var mc = mc || MathCustom;
