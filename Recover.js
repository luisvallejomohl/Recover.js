/*********************************************************
 * Recover.js
 * Licensed under Mozilla Public License v2.0
 * https://www.mozilla.org/en-US/MPL/2.0/
/*****************************************************************************************************************************
Object properties and methods
*****************************************************************************************************************************/

// Object.prototype.__count__: See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/count
Object.prototype.__defineGetter__('__count__', function(){
	var count = 0;
	(this.constructor == Array)
		? for(var item = 0; item < this.length; item++){
			if((typeof this[item]) != 'undefined')
				count++;
		}
		: return Object.keys(this).length;	
	return count
})

// Object.prototype.eval: See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/eval
Object.prototype.eval = eval;

// Object.observe: See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
Object.observe = function(obj, callback){
	obj.self = obj;
	obj = new Proxy(obj, {
		set: function(target, prop, value) {
			console.log({ type: 'set', target, prop, value });
			callback();
			return Reflect.set(target, prop, value);
		}
	})
	return obj
}
Object.prototype.observe = function(){
	return Object.observe(this)
}
// Object.unobserve: See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/unobserve
Object.unobserve = function(obj){
	return obj.self
}
Object.prototype.unobserve = function(){
	return Object.unobserve(this)
}

/*******************************************************************************************************************************
Function properties and methods
*******************************************************************************************************************************/

// Function.arity: See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/arity
Function.arity = function(unction){
	return unction.length;
}
Function.prototype.arity = Function.prototype.length
/*******************************************************************************************************************************
Array properties and methods
*******************************************************************************************************************************/

// Array.observe: See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/observe
Array.observe = Object.observe

// Array.unobserve: See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unobserve
Array.unobserve = Object.unobserve

/*******************************************************************************************************************************
Number properties and methods
*******************************************************************************************************************************/

// Number.toInteger: See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toInteger
Number.toInteger = function(n){
	if(((typeof n == Number) && isNaN(n)) || n === null || n === undefined || n === false){
		return 0
	}else if(n === true){
		return 1
	}else{
		return parseInt(n)
	}
}

/*******************************************************************************************************************************
ParallelArray (the whole thing was obsoleted)
*******************************************************************************************************************************/

//ParallelArray: See https://developer.mozilla.org/en-US/docs/Archive/Web/ParallelArray
class ParallelArray{
	constructor(arr){
		if(arr == undefined){
			this.length = 0
		}else{
			for(var item = 0; item < arr.length; item++){
				this[item] = arr[item]
			}
			this.length = arr.length;
		}
	}
}
