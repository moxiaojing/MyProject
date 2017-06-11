(function($){
	
	function Drag( element,options ){
		
		this.element = element;
		this.defaults = {
			left:null
		}
		$.extend(true,this.defaults,options);
		
		this.init();
	}
	
	Drag.prototype = {
		constructor:Drag,
		init(){
			this.element.on("mousedown",this.downFn.bind(this));
		},
		downFn(ev){
			
			this.disX = ev.pageX - $(this).offset().left;
			this.disY = ev.pageY - $(this).offset().top;
			
			$(document).on("mousemove.drag",this.moveFn.bind(this));
			$(document).on("mouseup.drag",this.upFn.bind(this));
		},
		moveFn(ev){
			this.element.css({
				"left":ev.clientX - this.disX,
				"top":ev.clientY - this.disY
			})
			//出发自定义事件用trigger
			this.element.trigger("moving");
			
		},
		upFn(){
			$(document).off("mousemove.drag mouseup.drag");
		}
	}
	
	$.fn.Drag = function(options){
		new Drag(this,options);
	}
	
})(jQuery)
