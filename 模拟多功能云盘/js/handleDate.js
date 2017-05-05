var date = data;
var handle={
/*------------获取指定id的一级子数据-------------------------------------*/
	getchildren:function( id ){
		return date.filter(function( value ){
			return value.pid == id;
		})
	},
/*--------------通过id找到指定数据---------------------------------------*/
	findSelf:function( id ){
		return date.find(function( value ){//先找到自身元素
			return value.id == id;//符合条件，就返回自身元素，不符合，就返回undefind
		})
	},
/*-----------通过id找到当前元素 的 祖先级--------------------------------*/
	findPatentNode:function( id ){
		var obj=handle.findSelf( id );
		var arr = [];//用来存放符合条件的元素
		if( obj ){//表示 obj 不是 undefind 的时候，继续找元素，如果是undefind，就直接返回arr=[]
			arr.push( obj );
			arr = arr.concat( handle.findPatentNode( obj.pid ) );//拼接 arr 数组，并返回 新的arr
		}
		return arr;//此时 返回值 是拼接完成了以后的新的arr
	},
/*--------------通过id找到指定数据的  所有子孙级数据---------------------------*/
	getAllchilds:function( id ){
		var obj = handle.findSelf( id );//找到自己
		var childs = handle.getchildren( id );//找到一级子元素
		var arr=[];
		arr.unshift( obj );
		
		childs.forEach( function( item ){
			arr = arr.concat( handle.getAllchilds( item.id ) );
		})
		return arr;
	},
	
/*---------找到 数据中  指定id数据  的  一级子数据中 name 和指定 value 是否相同--没有重名，就返回true---------*/


	isSameName:function( value,id ){
		
		var childs = handle.getchildren( id );  //先找到指定id的一级子数据
		//变量 a表示  有重名时  那个子数据的index 或 不重名 返回值 -1
		var a = childs.findIndex( function( item ){
			//去掉两边的空格之后，还和当前子数据的name相同，就表示是重名了
			return item.name === value.trim();
		})
		
		
//		if( a !== -1 ){//没有重名
//			return true;
//		}else{
//			return false;
//		}

		return a !== -1;//鉴于我们只用有重名的时候的返回值true，所以，可以简写成这样的
	},
	
	//通过多个id找到所有id的子孙数据
	getAllChildsByArry: function( arr ){//arr存放多个id
		
	}
	
}

