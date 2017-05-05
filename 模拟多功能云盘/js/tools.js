var tools={
	//表示，高度自适应
	view:function(){
		return {
			w: document.documentElement.clientWidth,
			h: document.documentElement.clientHeight
		}
	},
	
	//给ele 绑定 evName 事件，evFn是事件处理函数
	on:function( ele,evName,evFn ){
		ele.addEventListener( evName,evFn ,false );
	},
	
	//解除ele 身上绑定的 evName 事件的处理函数 evFn
	off:function( ele,evName,evFn ){//解除ele 身上绑定的 evName 事件的处理函数 evFn
		ele.removeEventListener( evName,evFn ,false );
	},
	
	//判断某个指定元素身上有没有指定的className
	hasClass:function( ele,className ){
		if( ele.nodeType === 9 ){
			ele=null;
			return;
		}
		var arrChar = ele.className.split(" ");//用空格 把字符串class，分割成数组
		
		for (var i = 0; i < arrChar.length; i++) {
			if( arrChar[i] ===className ){
				return true;//有符合条件的，就返回true
			}
		}
		return false;//遍历整个数组后，都没有符合条件的，就返回false
	},
	
	//找指定元素的 最近的 有attr属性的 父级
	//attr可以是（.class名）（#id名）（标签名）
	findParent:function( ele,attr){
		var firstChar = attr.charAt(0);//找到第一个字符
		if( firstChar === "." ){//表示attr是一个className
			//element.nodeType !== 9 表示 ele不是 document，document的父级是null，找到这一层时，会报错
			while( ele.nodeType !== 9 && !tools.hasClass( ele, attr.slice(1) ) ){//去掉第一个字符后剩下的字符串
				ele = ele.parentNode;
			}
			
		}else if(firstChar === "#"){//表示attr是一个id名，id是唯一的，所以没有必要封装方法，直接使用就好
			while(ele.nodeType !== 9 && ele.id !== attr.slice(1)){
				//element没有指定的class，那么element就为父级，继续向上找
				ele = ele.parentNode;
			}
			
		}else{//表示attr是标签名
			//如果while（ 条件成立 ），就执行{}里面的
			while( ele.nodeType !== 9 && ele.nodeName !== attr.toUpperCase() ){
				ele = ele.parentNode;
			}
		}
		ele = ele.nodeName == 9 ?null : ele;
		return ele;
		//这句话是说 ele变成document时，返回null，表示整个文档里面 都没有找到符合条件的元素
	},
	
	//给指定 元素添加指定的class名,不带点
	addClass:function( ele,className ){
		if( !tools.hasClass( ele,className ) ){//ele没有className，ele没有className
			ele.className += " " + className;
		}
	},
	
	//删除 指定元素身上指定的class名,不带点
	removeClass:function( ele,className ){
		if( tools.hasClass(ele,className) ){//如果ele 有指定的class名，就删除
			var classArr = ele.className.split(" ");//将 class 字符串 的每一个字符劈成数组形式 
			//["a","b","c","d"]
			for( var i = classArr.length-1; i >= 0; i-- ){//可以倒序循环
				if( classArr[i] === className){
					classArr.splice(i,1);//删掉符合条件的那个，改变了原来的数组
				}
			}
			ele.className = classArr.join(" ");// 将数组转成字符串并用空格分开每个字符串
			//"a c d"
		}
	},
	
	//寻找数据中最大的id
	findMaxID:function(max){
		date.forEach(function( item ){
			return max = max < item.id ? item.id : max ;
		})
	},
	
	//框选文件夹
	peng:function( Ele1, Ele2){//碰撞函数
		var pos1=Ele1.getBoundingClientRect();
		var pos2=Ele2.getBoundingClientRect();
		return pos1.right > pos2.left && pos1.bottom > pos2.top && pos1.left < pos2.right && pos1.top < pos2.bottom;
	//	返回值是true，表示碰撞到了，如果是false，表示没有碰撞到
	}
	
}
