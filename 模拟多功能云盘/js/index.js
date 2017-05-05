var date=[
	{
		name:"微云",
		id:0,
		pid:-1
	},
	{
		name:"js文件",
		id:1,
		pid:0
	},
	{
		name:"css文件",
		id:2,
		pid:0
	},
	{
		name:"123文件",
		id:3,
		pid:1
	},
	{
		name:"456文件",
		id:4,
		pid:1
	},
	{
		name:"abc文件",
		id:5,
		pid:2
	},
	{
		name:"qwe文件",
		id:6,
		pid:2
	},
	{
		name:"111文件",
		id:7,
		pid:3
	},
	{
		name:"aaa文件",
		id:8,
		pid:5
	}
	
]

var list=document.getElementById("list");

function getchildren( id ){//获取指定id的子数据
	var arr=[];
	date.forEach( function( a ){//遍历 date，a表示每一项
		if( a.pid == id ){//如果a的pid的值和指定id值相等，说明是指定要找的子数据
			arr.push( a );//存放到数组arr里
		}
	} )
	return arr;
}

function createTree( id ){//生成树形菜单
	var arr = getchildren( id );
	var str="";
	if( arr.length > 0 ){//如果arr不是[],就执行下面的语句
		
		arr.forEach( function( a ){//遍历arr数组，a表示数组的每一项
			str += "<li><h3 data-id='"+ a.id +"'><em class='sanjiao' style='margin-left:"+( ( a.pid )*10+10 ) +"px'></em><a class='ico_file'></a><span>"+a.name+"</span></h3>";
			str += "<ul>";
			str += createTree( a.id );//传入新的id值，生成下一级的ul和li
			str += "</ul></li>";
		} )
		
	}
	return str;
}
list.innerHTML = createTree( -1 );

var aH3 = list.getElementsByTagName("h3");
var nav = document.getElementById("nav");

Array.from( aH3 ).forEach( function( value ){//转成数组类型，然后遍历数组，value表示数组中的每一项
	var value_id=value.dataset.id;//自定义属性id
	value.addEventListener("click",function clickFn(){//给每一项添加点击事件
//		alert(1);"
		var str = "";
		var arr = findPatentNode( value_id ).reverse();//颠倒arr的顺序，重新赋值给arr
		arr.forEach( function( a ){
			str+="<span><a>"+ a.name +"</a><i class='ico_next'></i></span>"
		})
		nav.innerHTML = str;
	})
} )

function findPatentNode( id ){//通过id找到当前元素以及它 的父级
	var obj = date.find(function( value ){//先找到自身元素
		return value.id == id;//符合条件，就返回自身元素，不符合，就返回undefind
	})
	var arr = [];//用来存放符合条件的元素
	if( obj ){//表示 obj 不是 undefind 的时候，继续找元素，如果是undefind，就直接返回arr=[]
		arr.push( obj );
		arr=arr.concat( findPatentNode( obj.pid ) );//拼接 arr 数组，并返回 新的arr
	}
	return arr;//此时 返回值 是拼接完成了以后的新的arr
}
