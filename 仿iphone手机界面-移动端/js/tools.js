;(function(){
	var tools = {
		changePosition:function(arrElement){ //浮动转定位
			var arr = [];
			for( var i=0; i< arrElement.length; i++ ){
				
				var obj = {
							left: arrElement[i].offsetLeft,						
							top: arrElement[i].offsetTop	
						}
				
				arr.push(obj);
			
			}
			
			for( var i=0; i< arrElement.length; i++ ){
				
				arrElement[i].style.cssText = "position:absolute;margin:0px;float:none";
				
				arrElement[i].style.left = arr[i].left + "px";
				
				arrElement[i].style.top = arr[i].top + "px";
					
			}
		
		},
		removeData:function(data,id){//删除app
			return data.filter(function(item){
				return item.index !== id 
			})
		}
	}
	
	window.tools = tools;
})()
