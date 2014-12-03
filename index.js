(function(definition){
	if (typeof exports === "object") {
		module.exports = definition();// CommonJS
	} else if (typeof define === "function" && define.amd) {
		define(definition);// RequireJS
	} else {
		SIMPLE_TIMESTEPPER = definition();//<script>
	}
}(function(){

	var global = typeof window === 'undefined' ? {} : window;

	var requestAFrameNative = global.requestAnimationFrame ||
		global.webkitRequestAnimationFrame ||
		global.mozRequestAnimationFrame ||
		global.oRequestAnimationFrame ||
		global.msRequestAnimationFrame ||
		function(callback){
			setTimeout(callback, 1000 / 60);
		};

	var now = function(){
		return (global.performance && global.performance.now) ? global.performance.now() : (new Date()).getTime();
	};
	var noop = function(){};
	var isFunction = function(o){
		return typeof o == 'function';
	}; 
	var isNumber = function(o){
		return !!((typeof o == 'number' || (o && typeof o == 'object' && Object.prototype.toString.call(o) == '[object Number]')) && o == +o);
	};

	return function(onUpdate, onRender, update_timestep, render_timestep){
		onRender = isFunction(onRender) ? onRender : noop;
		onUpdate = isFunction(onUpdate) ? onUpdate : noop;
		update_timestep = isNumber(update_timestep) ? update_timestep : 1/60;

		var requestAFrame = isNumber(render_timestep) ? function(callback){
			setTimeout(callback, render_timestep);
		} : requestAFrameNative;

		var t_curr = now();
		var t_last = now();
		var dt = 0;
		var is_running = false;

		var loop = function loop(){
			if(!is_running){
				return;
			}
			requestAFrame(loop);
			t_curr = now();
			var t_diff = Math.min(1, (t_curr - t_last) / 1000);
			t_last = t_curr;

			dt += t_diff;
			while(dt > update_timestep){
				dt = dt - update_timestep;
				onUpdate(dt);
			} 
			onRender(dt);
		};
		return {
			start: function(){
				is_running = true;
				requestAFrame(loop);
			}, 
			stop: function(){
				is_running = false;
			}
		};
	};
}));
