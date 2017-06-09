function Dialog(options){
	
	var options = options || {}; 
	
	this.defaults = {
		
		title:"默认标题",
		
		content:"将此应用从屏幕删除，同时将删除应用数据。",
		
		ok:function(){
			
			this.parentNode.style.display  = "none";
		},
		cancel:function(){
			
			this.parentNode.style.display  = "none";
		}
		
	}
	
	for ( attr in options ) {
		
		this.defaults[attr] = options[attr];
		
	}
	
	this.init();

}

Dialog.prototype = {
	
	constructor:Dialog,
	
	init(){
		
		var dialogDiv = this.creatHtml();
		
		var h3 = dialogDiv.getElementsByTagName("h3")[0];
		
		var content = dialogDiv.getElementsByClassName("dialog_content")[0];
		
		var ok = dialogDiv.getElementsByClassName("dialog_ok")[0];
		
		var cancel = dialogDiv.getElementsByClassName("dialog_cancel")[0];
		
		h3.innerHTML = this.defaults.title;
		
		content.innerHTML = this.defaults.content;
		
		ok.addEventListener("touchstart",this.defaults.ok);
		
		cancel.addEventListener("touchstart",this.defaults.cancel);
		
		
	},
	creatHtml(){
		
		var div = document.createElement("div");
		
		div.className = "dialog";
		
		div.innerHTML = '<h3></h3> <div class="dialog_content" ></div><span class="dialog_cancel" >取消</span><span class="dialog_ok" >确定</span>';
		
		document.body.appendChild(div);
		
		return div;
	}
	
}	