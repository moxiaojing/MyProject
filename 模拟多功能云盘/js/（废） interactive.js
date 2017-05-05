var list=document.getElementById("list");
var zhezhao=document.getElementById("zhezhao");

//初始化 渲染树形菜单
var initID = -1;
list.innerHTML = create.createTree( initID );

var aH3 = list.getElementsByTagName("h3");//树形菜单的h3标签
var aaH3 = Array.from( aH3 );//转换成数组类型

var nav = document.getElementById("nav");//表示文件夹路径的导航部分

var lastID = 0;//默认状态ID
var files = document.getElementById("files");//放文件夹的box
var all = document.querySelector(".all");//文件路径左侧的 全选框

/*-------------------封装样式部分-----------------------------------------------------------*/

//文件路径的 全选框 初始化
function allTab(){
	all.onOff=false;//添加自定义属性，当作开关使用
	all.innerHTML="";
	all.style.background="";
}
allTab();

//给指定元素添加样式
function addStyleById(id){
	for( var i=0;i<aH3.length;i++ ){
		if( aH3[i].dataset.id==id ){
			return aH3[i];
		}
	}
}
//文件夹上选框的状态
function allChecked(){//全选
	var fileChecked = files.getElementsByTagName("div");//获取所有的文件夹上的选框
	var arrFileChecked = Array.from(fileChecked);
	console.log(all.onOff);
	if( all.onOff ){//全选开关为true的时候
		arrFileChecked.forEach(function( item ){
			item.dataset.onoff = "1";//用自定义方式添加开关
			item.innerHTML = "✔";
			item.className = "checkedBox";
			item.parentNode.className="selectLi";
			item.nextElementSibling.style.background="#fff";
		})
	}else{
		console.log(arrFileChecked);
		arrFileChecked.forEach(function( item ){
			console.log(arrFileChecked);
			item.dataset.onoff = "0";//用自定义方式添加开关
			item.innerHTML = "";
			item.className = "checkbox";
			item.parentNode.className="";
			item.nextElementSibling.style.background="";
		})
	}
}
//渲染文件部分
function reconstruction( id ){//通过id重新渲染文件页面
	nav.innerHTML = create.createNav( id );//生成导航
	if( handle.getchildren( id ).length > 0 ){//有子数据，在ul中生成对应的文件
		zhezhao.style.display="none";
		files.style.display="block";
		files.innerHTML = create.createFiles( id )//生成文件
	}else{//否则，隐藏ul，显示遮罩层
		files.innerHTML = "";
		files.style.display="none";
		zhezhao.style.display="block";
	}
	addStyleById( lastID ).style.background="";//表示上一个被清空
	addStyleById( id ).style.background="#e1e8ed";//给当前添加样式
	lastID = id;//当前id存放到上一个的变量中
}

//遍历所有 文件夹上的checkBox，确定是不是全选
function isAllCkecked(){
	var fileChecked = files.querySelectorAll(".checkbox");//获取所有的文件夹上的选框
	var arrFileChecked = Array.from(fileChecked);
	
	return arrFileChecked.every(function( item ){//每一项，item身上的开关都是1，才返回true，否则，返回false；
		return item.dataset.onoff == 1;
	})
}


/*-------------渲染文件夹路径部分-------------------------------------------*/
nav.innerHTML = create.createNav( 0 );//默认导航先有一个微云
files.innerHTML = create.createFiles( 0 )//生成文件

addStyleById( lastID ).style.background="#e1e8ed";//微云默认选中状态

aaH3.forEach( function( value ){//树形菜单所有 H3 转成数组类型，然后遍历数组，value表示数组中的每一项
	
	var value_id=value.dataset.id;//自定义属性id
	
	value.addEventListener("click",function clickFn(){//给每一项添加 点击事件
		allTab();//全选框 初始化
		reconstruction( value_id );
	})
} )

/*-------------点击文件夹路径导航--------------------------------------------*/
nav.addEventListener("click",function navClick( ev ){//利用子级的冒泡特性
	var target = ev.target;
	console.log(target.nodeName);
	console.log(target.dataset.index);
	//点击文件夹路径的每一个a标签
	if(target.nodeName.toLowerCase()==="a"){//判断点击的是<a>标签元素
		allTab();//全选框 初始化
		var targetIndex = target.dataset.index;//目标元素自定义属性
		reconstruction( targetIndex );
	}
	
})
/*-----------点击文件夹路径的 全选框---------------------------------*/

all.addEventListener("click",function (){
	
	if( files.innerHTML == ""){
		alert("木有文件啊~~")
		return;
	}
	this.onOff =! this.onOff;//点击后，开关取反
	this.innerHTML = this.onOff ? "✔" : "";
	this.style.background = this.onOff ? "#55addc" : "";
	this.style.color = this.onOff ? "#fff" : "";
	allChecked();
})

/*------------点击文件夹上的 选框-------------------------------------*/
var aLiFiles = files.getElementsByTagName("li");

var arrLiFiles = Array.from( aLiFiles );
var isAll = arrLiFiles.every( function( value ){
	return value.onOff==true;
})

/*----------利用事件代理方式添加点击事件,点击放文件夹的 ul ，找到目标元素------------------*/
/*
 * 需求：1.单击 文件夹 和 点击文件夹上的checkbox 效果相同，都有自定义开关控制，0或1 
 * 2.双击 文件夹，实现跳转，重新渲染 files 和 nav
 * 3.鼠标移入文件夹 ，也就是li 上，背景变成白色，同时有边框
 */
files.addEventListener( "click",function filesClick( ev ){
	var target = ev.target;
	//如果点击的是li，说明是文件夹 li 本身
	if( target.nodeName.toLowerCase() === "li" ){
		allTab();//全选框 初始化
		var targetIndex=target.dataset.id;
		reconstruction( targetIndex );
	}

	//如果点击的是div，说明是复选框
	if( target.nodeName.toLowerCase() === "div" ){
		if( target.dataset.onoff == 0 ){//生成结构时已经添加过自定义属性（并不是开关，是字符串），所以不是取反
			target.innerHTML = "✔";
			target.className="checkedBox";
			target.dataset.onoff = 1;
			target.parentNode.className="selectLi";
			target.parentNode.dataset.a = 1;
			target.nextElementSibling.style.background="#fff";
			
		}else{
			target.innerHTML = "";
			target.className="checkbox";
			target.dataset.onoff = 0;
			target.parentNode.className="";
			target.parentNode.dataset.a = 0;
			target.nextElementSibling.style.background="";
		}
		all.onoff = isAllCkecked() ? true : false;
		all.innerHTML = isAllCkecked() ? "✔" : "";
		all.style.background = isAllCkecked() ? "#55addc" : "";
		all.style.color = isAllCkecked() ? "#fff" : "";
	}
	
	//如果点击的是input ，说明是文件夹名字部分
//	console.log(target.nodeName.toLowerCase());
	if( target.nodeName.toLowerCase() === "input" ){
		target.select();//选中文字
		target.parentNode.parentNode.className="selectLi";
		target.addEventListener("blur",function(){//input 失去焦点的时候
			this.style.background="";
		});
	}
	ev.preventDefault();//阻止浏览器的默认事件	
})
/*----------利用事件代理方式添加 双击 事件,双击放文件夹的 ul，找到目标元素------------------*/
//files.addEventListener( "dblclick",function filesClick( ev ){
//	var target = ev.target;
//	//如果双击的是li，说明是文件夹 li 本身
//	if( target.nodeName.toLowerCase() === "li" ){
//		allTab();//全选框 初始化
//		var targetIndex=target.dataset.id;
//		reconstruction( targetIndex );
//	}
//	
//	
//	ev.preventDefault();//阻止浏览器的默认事件	
//})
document.addEventListener("click",function(ev){
	ev.preventDefault();
})

/*------------点击新建按钮-------------------------------------*/

/*------------点击 删除按钮--------------------------------------------*/

/*------------点击重命名按钮-------------------------------------------*/


