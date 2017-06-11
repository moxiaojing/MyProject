function Drag(options){
	//必填并且必须是一个对象
	if( typeof options === "undefined" || options.constructor !== Object ){

		//抛出错误
		throw new Error("传入的参数错误，必须是对象");
		return;
	}

	//不能直接操作传进来的对象，需要复制
	this.defaults = {
		targetEle:null,
		moveEle:null
	}

	for( var attr in options ){//复制一份传进来的参数
		if(options.hasOwnProperty(attr)){
			this.defaults[attr] = options[attr];
		}
	}

	//拖拽的目标
	//this.element是移动的目标
	if( this.defaults.moveEle ){
		this.element = this.defaults.moveEle;
	}else{
		this.element = this.defaults.targetEle;
	}

	
	this.init();
}

Drag.prototype = {
	constructor: Drag,//重新指向实例
	init(){
		//要把一个函数的this改变为指定的值，并且不调用函数，使用bind方法
		this.defaults.targetEle.onmousedown = this.downFn.bind(this);
	},
	downFn(ev){
		//this => 实例
		this.disX = ev.clientX - this.element.offsetLeft;
		this.disY = ev.clientY - this.element.offsetTop;

		document.onmousemove = this.moveFn.bind(this);
		document.onmouseup = this.upFn;

		ev.preventDefault();
	},
	limit(){//限制范围
		if( this.x < 0 ){
			this.x = 0;
		}
		if( this.x > document.documentElement.clientWidth - this.element.offsetWidth ){
			this.x = document.documentElement.clientWidth - this.element.offsetWidth;
		}
		if( this.y < 0 ){
			this.y = 0;
		}
		if( this.y > document.documentElement.clientHeight - this.element.offsetHeight ){
			this.y = document.documentElement.clientHeight - this.element.offsetHeight;
		}
	},
	moveFn(ev){

		//限制的两个运算后的值

		this.x = ev.clientX - this.disX;
		this.y = ev.clientY - this.disY;

		this.limit();

		this.element.style.left = this.x + "px";
		this.element.style.top = this.y + "px";
	},
	upFn(){
		document.onmousemove = null;
		document.onmouseup = null;
	}
}