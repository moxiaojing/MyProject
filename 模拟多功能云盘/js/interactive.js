(function(){
//让weiyun-content自适应
	var oHead = document.getElementById("head");//页面头部
	var oConBox = document.getElementById("cont_box");//页面内容区域
	
	function resize(){
		var clientH = tools.view().h;
		oConBox.style.height = clientH - oHead.offsetHeight + "px";
	}
	window.onresize = resize;
	resize();
	
/*--------------交互开始--------------------------------------------------*/	

	var list = document.getElementById("list");//左侧树形菜单
	var zhezhao = document.getElementById("zhezhao");//文件区域，没有子级的话，显示遮罩层
	//初始化 渲染树形菜单
	var initID = -1;
	list.innerHTML = create.createTree( initID );
	
	var nav = document.getElementById("nav");//表示文件夹路径的导航部分
	
	var lastID = 0;//默认状态ID
	var prevID = 0;//移动到弹框里面的属性菜单使用的上一个标志
	var files = document.getElementById("files");//放文件夹的box
	var filesLis = files.getElementsByTagName("li");//表示每一个文件夹

	var all = document.querySelector(".all");//文件路径左侧的 全选框
	
	var nav_left=document.querySelector(".nav_left");//功能导航
	var navLis=nav_left.getElementsByTagName("li");//每一个功能项
	
	var popBox = document.getElementById("popBox");//提示框
	
	var text0 = files.getElementsByTagName("input")[0];//获取文件夹中第一个li里面的input
	navLis[5].onOff=false;//表示true可以新建，false表示禁止新建
	navLis[3].onOff=false;//true表示可以重命名，false表示不能重命名
	var kuangOnoff = true;//textOff 表示文件夹上的 text 是否可以改名字，true表示能改名字，false表示不能改名字
	var fileName;//全局变量 ，保存文件 原来的名字
	var isDrag = false;//false 表示不能拖拽
	
/*-------------------封装样式部分-----------------------------------------------------------*/
	
//文件路径的 全选框 初始化
	function allTab( ele ){
		ele.onOff=false;//添加自定义属性，当作开关使用
		ele.innerHTML="";
		ele.style.background="";
	}
	allTab( all );
	
//给指定元素添加样式
	function addStyleById(id){
		var aH3 = list.getElementsByTagName("h3");//树形菜单的h3标签
		for( var i=0;i<aH3.length;i++ ){
			if( aH3[i].dataset.id==id ){
				return aH3[i];
			}
		}
	}
	
//	判断遮罩层是否显示
	function showZhezhao(){
		
		if( handle.getchildren( lastID ).length == 0 ){//如果当前点击的id元素 下面没有子元素
			files.style.display="none";
			zhezhao.style.display="block";//遮罩层出现
		}
	}

//返回  选中的 文件夹  身上  自定义属性 id
	function whoSelect(){//whoSelect() 存放的是  选中li的  id
		
		var arr = [];
		var fileChecked = files.getElementsByTagName("div");//获取所有的文件夹li
		
		arr = Array.from(fileChecked).filter(function( item ){
			if(item.dataset.onoff){
				return item.dataset.onoff == 1;//1表示选中效果
			}
		})
		arr = arr.map(function( value ){
			return tools.findParent( value ,"li" ).dataset.id;
		});
		return arr;//用来存放  选中文件夹 li的自定义属性 id
		
	}

//找到指定id的那一个li这个元素
	function findSelfElement(id){
//		console.log(filesLis)
		for (var i = 0; i < filesLis.length; i++) {//找到这个元素
			
			if( filesLis[i].dataset.id == id){
				
				return filesLis[i];
			}
		}
	}

//文件夹上选框的状态
	function allChecked(){//全选
		
		var fileChecked = files.getElementsByTagName("div");//获取所有的文件夹上的选框
		var arrFileChecked = Array.from(fileChecked);
		
		if( all.onOff ){//全选开关为true的时候
			arrFileChecked.forEach(function( item ){
				item.dataset.onoff = "1";//用自定义方式添加开关
				item.innerHTML = "✔";
				item.className = "checkedBox";
				item.parentNode.className="selectLi";
				item.nextElementSibling.style.background="#fff";
//				isDrag = true;//表示可以有拖拽
			})
		}else{
			arrFileChecked.forEach(function( item ){
				item.dataset.onoff = "0";//用自定义方式添加开关
				item.innerHTML = "";
				item.className = "checkbox";
				item.parentNode.className="";
				item.nextElementSibling.style.background="";
//				isDrag = false;//表示不能有拖拽
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
		addStyleById( lastID ).className="";//表示上一个被清空
		
		addStyleById( id ).className="active";//给当前添加样式
		lastID = id;//当前id存放到上一个的变量中
		
	}
	
//遍历所有 文件夹上的checkBox，确定是不是全选
	function isAllCkecked(){
		
		var fileChecked = files.getElementsByClassName("checkbox");//获取所有的文件夹上的选框
		var arrFileChecked = Array.from(fileChecked);
		
		return arrFileChecked.every(function( item ){//每一项，item身上的开关都是1，才返回true，否则，返回false；
			return item.dataset.onoff == 1;
		})
	}
	
//全选框随着isAllCkecked变化，而变化
	function allBox(){
		
		all.onOff = isAllCkecked() ? true : false;
		all.innerHTML = isAllCkecked() ? "✔" : "";
		all.style.background = isAllCkecked() ? "#55addc" : "";
		all.style.color = isAllCkecked() ? "#fff" : "";
		
	}
	
//弹框效果
	function popUp( inner,bgcolor ){
		
		popBox.innerHTML = inner;
		popBox.style.background = bgcolor;
		
		popBox.style.transition="none";//立刻缩回去
		popBox.style.top = "-50px";
		
		setTimeout(function(){
			popBox.style.transition="0.5s";//慢慢露出来
			popBox.style.top = "0px";
		},0)
		
		clearTimeout( popBox.timer );//表示在执行 每次  弹框在页面停顿1s 前，先清空上一次 表示 停顿间隔  的定时器
		
		popBox.timer = setTimeout(function(){//在页面停顿1秒钟后，立刻缩回去
			popBox.style.top = "-50px";
		},1000)
		
	}

//文件夹 没有 选中状态
	function file_Sel_No( ele ){//ele默认只能是li
		ele.dataset.a = 0;//li身上自定义开关a，0表示false
		ele.className = "";
		ele.children[1].style.background="";
		ele.children[1].blur();//失去焦点
		ele.children[0].className = "checkbox";//表示没有选中的class
		ele.children[0].innerHTML = "";
		ele.children[0].dataset.onoff=0;//false表示没有被碰到
		//改变开关要放到最后面，否则会导致找不到children
	}
	
//文件夹  选中状态
	function file_Sel( ele ){
		ele.className="selectLi";
		ele.dataset.a = 1;
		ele.children[1].style.background="#fff";
		ele.children[0].innerHTML = "✔";
		ele.children[0].className = "checkedBox";//表示选中的class
		ele.children[0].dataset.onoff = "1";//表示是否选中的开关
		
	}
	
//文件夹 text名字 没有选中的状态
	function file_textSel_No( ele ){
		ele.blur();//input 失去焦点的时候
		ele.style.background="";
		ele.parentNode.className="";
	}
	
//文件夹 名字 选中的状态
	function file_textSel( ele ){
		ele.select();//选中文字
		ele.style.background="#fff";
		ele.parentNode.className="selectLi";
	}
	
////文件夹 没有选中状态	     左上角的选框
//	function file_checkBoxSel_No( ele ){
//		ele.innerHTML = "";
//		ele.className = "checkbox";
//		ele.dataset.onoff = "0";//表示是否选中的开关
//		ele.parentNode.className="";
//		ele.parentNode.dataset.a = 0;
//	}
//	
////文件夹 选中状态     左上角的选框
//	function file_checkBoxSel( ele ){
//		ele.innerHTML = "✔";
//		ele.className = "checkedBox";
//		ele.dataset.onoff = "1";//表示是否选中的开关
//		ele.parentNode.className="selectLi";
//		ele.parentNode.dataset.a = 1;
//	}


//获取元素的详细信息
	function getRect( obj ){
		return obj.getBoundingClientRect();
	}

//拖拽obj1，去碰撞obj2
	function peng( obj1,obj2 ){
			
		var obj1Rect = 	getRect(obj1);
		var obj2Rect = 	getRect(obj2);

		//如果obj1 碰撞 了obj2，返回true，否则放回false
		
		var obj1Left = obj1Rect.left;
		var obj1Right = obj1Rect.right;
		var obj1Top = obj1Rect.top;
		var obj1Bottom = obj1Rect.bottom;

		var obj2Left = obj2Rect.left;
		var obj2Right = obj2Rect.right;
		var obj2Top = obj2Rect.top;
		var obj2Bottom = obj2Rect.bottom;

		if( obj1Right < obj2Left || obj1Left > obj2Right || obj1Bottom < obj2Top || obj1Top > obj2Bottom ){
			return false;
		}else{
			return true;
		}


	}


/*-------------渲染文件夹路径部分-------------------------------------------*/

	nav.innerHTML = create.createNav( 0 );//默认导航先有一个微云
	files.innerHTML = create.createFiles( 0 )//生成文件
	addStyleById( lastID ).className="active";//微云默认选中状态
	
/////////////////用事件代理方式，给树形菜单指定元素添加点击事件///////////////////////
	
	tools.on( list, "click",function( ev ){
		allTab( all );//全选框初始化
		var target = ev.target;//点击的目标点
//	target = tools.findParent( target, "h3" );//找到渲染效果的那个,h3,给h3添加 active
		
		if( target = tools.findParent( target, "h3" ) ){//先赋值，再作为 if的 判断条件
			
			if( !tools.hasClass( target,"active" ) ){//如果oH3身上 没有active，就添加active
				
				var value_id = target.dataset.id;
//				console.log(addStyleById( lastID ));
				tools.removeClass( addStyleById( lastID ),"active" );
				tools.addClass( target,"active" );
				reconstruction( value_id );
			}
		}
	})
	
	
/*-------------点击文件夹路径导航--------------------------------------------*/
	nav.addEventListener("click",function navClick( ev ){//利用子级的冒泡特性
		
		var target = ev.target;
		//点击文件夹路径的每一个a标签
		if( target.nodeName.toLowerCase() === "a" ){//判断点击的是<a>标签元素
			allTab( all );//全选框 初始化
			var targetIndex = target.dataset.index;//目标元素自定义属性
			reconstruction( targetIndex );
		}
		
	})

/*-----------点击文件夹路径的 全选框---------------------------------*/
	all.addEventListener("click",function (){
		if( files.innerHTML != ""){
			this.onOff =! this.onOff;//点击后，开关取反
			this.innerHTML = this.onOff ? "✔" : "";
			this.style.background = this.onOff ? "#55addc" : "";
			this.style.color = this.onOff ? "#fff" : "";
			allChecked();//控制每个文件夹是否选中
		}
		
	})

/*----------利用事件代理方式添加点击事件,点击放文件夹的 ul ，找到目标元素------------------*/
/*
 * 需求：1.单击 文件夹 和 点击文件夹上的checkbox 效果相同，都有自定义开关控制，0或1 
 * 2.双击 文件夹，实现跳转，重新渲染 files 和 nav
 * 3.鼠标移入文件夹 ，也就是li 上，背景变成白色，同时有边框
 */
	tools.on( files ,"click",function filesClick( ev ){
//	files.addEventListener( "click",function filesClick( ev ){
		var target = ev.target;
		
//如果点击的是li，说明是文件夹 li 本身
		if( target.nodeName.toLowerCase() === "li" ){
			
			allTab( all );//全选框 初始化
			var targetIndex=target.dataset.id;
			reconstruction( targetIndex );
		}
	
//如果点击的是div，说明是复选框
		if( target.nodeName.toLowerCase() === "div" ){
			
			if( target.dataset.onoff == 0 ){//生成结构时已经添加过自定义属性（并不是开关，是字符串），所以不是取反
				
				file_Sel( target.parentNode );
				
			}else{
				
				file_Sel_No( target.parentNode );
							
			}
			allBox();
		}
		
//如果点击的是input ，说明是文件夹名字部分
		if( target.nodeName.toLowerCase() === "input" ){
			
			file_textSel( target );
			
			kuangOnoff = false;//表示 继续 改名字，还是不能框选
			
			tools.on( target ,"blur",function fn_blur(){//input 失去焦点的时候
//				target.addEventListener("blur",function(){//input 失去焦点的时候
				
				kuangOnoff = true;
				file_Sel_No( target.parentNode );
				
				tools.off( target ,"blur",fn_blur);//由于是事件的嵌套格式，所以要使用完后，解绑
					
			});
			
		}
		ev.preventDefault();//阻止浏览器的默认事件	
	})

/*------------点击新建按钮------------------------------------------------*/
	
//新建的文件夹，显示在最前面，然后文件夹名字的位置获取焦点，方便命名，如果没有名字，那么点击document时就删除这个文件夹
	tools.on( navLis[5] ,"mouseup",function( ev ){
		
		files.style.display="block";
		zhezhao.style.display="none";
		
		if( !this.onOff ){//表示新建按钮生效
			//此处添加一个文件夹，也可以用appendChild
			files.innerHTML = '<li><div class="checkbox" data-onoff=0></div><input type="text" /></li>' + files.innerHTML;
			text0 = files.getElementsByTagName("input")[0];
			text0.focus();//text获取焦点
			text0.style.background="#fff";
			
			tools.on( text0 ,"mouseup",function( ev ){//给新建的文件夹的input绑定事件鼠标抬起事件
				ev.stopPropagation();
								
			})
			
			this.onOff=true;
			
		}else{
			popUp("请给文件夹命名字","#EE9700");
			text0.focus();//text获取到焦点
		}
		ev.stopPropagation();//阻止冒泡
	})
	
/*----------点击document时候，文件夹没有名字，就删除-------------------*/

	tools.on( document, "mousedown",function fn( e ){
		
		//新建功能是否成功
		var max = Math.random();
		if( navLis[5].onOff ){//用新建那个开关来判断，点击document时符合开关条件，才生成
			
			if( text0.value.trim().length == 0){//不能有空格，去掉空格以后，长度为0，表示没有名字，新建失败
				
				files.removeChild( files.children[0] );//删除头一个文件夹
				popUp("新建失败","#EE9700");//提示框出现
				showZhezhao();//判断遮罩是不是要出现
				
			}else{//表示新建文件有名字，然后判断 有没有重名
				
//			max=tools.findMaxID( max )+1;//原计划找数据中id 最大值+1，有待再次确认

				if( handle.isSameName( text0.value, lastID ) ){//return true , 表示有重名
					
					files.removeChild( files.children[0] );//删除头一个文件夹
					popUp("新建失败","#EE9700");
					showZhezhao();//判断遮罩是不是要出现
					
				}else{//表示没有重名，于是新建成功
					
					text0.style.background="";
					//在数据中添加一个对象
					date.unshift( {
							name:text0.value,
							id:max,
							pid:lastID
					} );
					
					list.innerHTML = create.createTree( -1 );//重新渲染树形菜单
					files.innerHTML = create.createFiles( lastID )//重新渲染 生成文件
					
					var firstli = files.firstElementChild;//获取第一个文件夹
					firstli.dataId = max;//给新建好的文件夹，添加自定义属性id
					
					addStyleById( lastID ).className="active";//微云默认选中状态
					popUp("新建成功","#3bc125");//提示框
					allTab( all );//全选框 初始化
				}
			}
			
			navLis[5].onOff=false;
		}
		
		//重命名功能是否成功,true表示重名按键生效
		if( navLis[3].onOff ){
			
			var selIdArr = whoSelect();
//			console.log(findSelfElement( selIdArr[0] ));
			
			if( fileName === findSelfElement( selIdArr[0] ).children[1].value ){
//				console.log(fileName);	
//找到要改变的子元素，然后更改样式，要先改变完成样式，然后再变换开关，否则，先改开关再变样式，会找不到元素

				file_Sel_No( findSelfElement( selIdArr[0] ) );//文件夹失去选中的效果
				kuangOnoff = true;//表示改名字完成，可以框选了	
				
			}else if( handle.isSameName( findSelfElement( selIdArr[0] ).children[1].value, lastID ) ){//return true , 表示有重名
				
				popUp("名字重复了，请重新命名","#EE9700");//提示框
				list.innerHTML = create.createTree( -1 );//重新渲染树形菜单
				files.innerHTML = create.createFiles( lastID )//重新渲染 生成文件
				kuangOnoff = true;//表示改名字完成，可以框选了
				
			}else{//表示没有重名，改名字成功
														
//	//找到要改变的子元素，然后更改样式，要先改变完成样式，然后再变换开关，否则，先改开关再变样式，会找不到元素

				//改变数据
				( handle.findSelf( selIdArr[0] ) ).name = findSelfElement( selIdArr[0] ).children[1].value;
				
				file_Sel_No( findSelfElement( selIdArr[0] ) );//文件夹失去选中的效果
								
				//将新的名字传到数据中，改变对应的name，重新渲染树形 菜单和文件夹  部分
				list.innerHTML = create.createTree( -1 );//重新渲染树形菜单
				popUp("重命名成功...","#3bc125");//弹框效果
				kuangOnoff = true;//表示改名字完成，可以框选了
			}
//			kuangOnoff = true;//表示改名字完成，可以框选了
			navLis[3].onOff = false;
			
		}
		
	})
	
/*------------点击 下载 按钮-----------------------------------------*/
	tools.on( navLis[0], "mouseup",function(){
	
	})
/*------------点击 分享 按钮-----------------------------------------*/
	tools.on( navLis[1], "mouseup",function(){
	
	})
/*------------点击 移动到 按钮-----------------------------------------*/
	
	tools.on( navLis[2], "mouseup",function(){
		
//		console.log(whoSelect());//whoSelect()里面是选中的元素的id
		
		var moveStatus = true;//对应的是是不是要移动生效，true表示移动符合要求，生效
		var targetID = null;//用来存放  目的文件夹的对应  数据的 id
		
		//选中文件这个是动态获取的，在移动时会改变选中文件，所以要在使用时候存到变量中
		var selIdArr = whoSelect();
		
		if( selIdArr.length ){
			
			dialog({
				title:"移动到",
				content:"<div class='treeList moveTo'>"+ create.createTree(-1) +"</div>",
				okFn:function (){//点击确认按钮
					
					if( !moveStatus ){//表示不能生效，不移动文件
						return;
					}else{
					//表示移动生效,关闭弹框
						var onoff = false;
						var arr=[];
						
						for (var i = 0; i < selIdArr.length; i++) {//遍历所有选中文件
							arr.push( findSelfElement( selIdArr[i] ) );
						}
//						console.log(arr);
//						console.log((whoSelect().length));
						
						for (var i = 0; i < selIdArr.length; i++) {//遍历所有选中文件
							
							var selfDate = handle.findSelf( selIdArr[i] );//通过id找到自身数据
	//						判断是否  选中文件  与   移动到的文件夹 的一级子元素   有重名
//							console.log(handle.isSameName( selfDate.name ,targetID));

							if( handle.isSameName( handle.findSelf( selIdArr[i] ).name , targetID) ){//找相同名字，true表示有重名
//								console.log(1);
								onoff=true;//true表示有重名
								
							}else{//没有重名，可以放心移动
//								
								selfDate.pid = targetID;
								
//								handle.findSelf( selIdArr[i] ).pid = targetID;
//								popUp("移动完成","#3bc125");//弹框效果

								files.removeChild( arr[i] );//用remove的话就可以避免重新渲染了
								
							}
							
						}
//						
						if(onoff){//有重名，出现弹框
							popUp("存在重名文件，部分移动失败","#EE9700");//弹框效果
							
						}
//				files.innerHTML = create.createFiles( lastID )//重新渲染 生成文件，此处用remove代替
						list.innerHTML = create.createTree( initID );//重新渲染树形菜单
					}
				}
			})
			
			var moveTo_list = document.querySelector(".moveTo");
			var moveTo_h3s = moveTo_list.getElementsByTagName("h3");
			var error = document.querySelector(".pop-btns .error");
			
//			console.log(moveTo_list);

			//表示点击的 h3的id 是不是 在选中文件夹的数组  whoSelect() 中 存在，false表示不存在，true表示存在
			
			tools.on( moveTo_list, "click",function( ev ){
				
				var onoff=false;
								
				var target = ev.target;
				
				var selAllChildren=[];//用来存放所有选中文件的 子孙级数据，包括自己
				
				for (var i = 0; i < selIdArr.length; i++) {
					//找到所有的子孙级   原始数据  ,存到 selectIdArr 中
					selAllChildren = selAllChildren.concat( handle.getAllchilds( selIdArr[i] ) )
				}
				
				var selAllChildrenID = [];//用来存放所有 选中文件  自己的id 和 子孙数据 的id
				
				for (var i = 0; i < selAllChildren.length; i++) {//遍历找到的所有子孙级数据
					selAllChildrenID.push( selAllChildren[i].id );//因为是数据，所以直接有id键名
				}
				
//				console.log(selAllChildrenID);
				
				if( target = tools.findParent( target, "h3" ) ){//点击的父级是h3，
					//此时target = h3
//					console.log(111,target.dataset.id);
//					console.log(this,target);
					for(var i=0;i<moveTo_h3s.length;i++){
						tools.removeClass(moveTo_h3s[i],"active")
						
					}
					tools.addClass(target,"active")
					//将点击的文件夹对应的数据 赋值 给fileId，方便确认按钮中移动 数据 使用
					targetID = target.dataset.id;
										
					for (var i = 0; i < selAllChildrenID.length; i++) {//遍历所有选中的文件的id
						
						//如果点击的h3的id和选中文件身上的id一样，说明是移动到自身，要出现警告
						if( targetID == selAllChildrenID[i] ){
							onoff=true;//表示目标元素 是 选中元素中的一个，不能移动，并且弹出警告语
							break;
						}
					
					}
					//for循环完毕，之后再判断
					if(onoff){//true时候，弹出警告语
						error.innerHTML="不能移动到自身或子文件夹中";
						moveStatus = false;//表示确认按钮不能生效
					}else{
						error.innerHTML="";
						moveStatus = true;//表示确认按钮不能生效
					}
					
				}
			})
		}
	})
	
/*------------点击 重命名 按钮-----------------------------------------*/
	
	tools.on( navLis[3], "mouseup",function(){
//		console.log(handle.findSelf( whoSelect()[0] ));
		var selIdArr = whoSelect();
		
		if( selIdArr.length == 0 ){//要有选中文件夹
			
			this.onOff=false;
			popUp("请选中文件...","#EE9700");//弹框效果
			
		}else if( selIdArr.length > 1 ){//选中文件夹不能超过1个
			
			this.onOff=false;
			
			selIdArr.forEach(function( value ){
				file_Sel_No( findSelfElement( value ) );//文件夹失去选中的效果
			})
			allTab( all );//全选框初始化
			
			popUp("只能选择一个文件夹命名字...","#EE9700");//弹框效果
			
		}else{
			
			fileName = findSelfElement( selIdArr[0] ).children[1].value;
			
			kuangOnoff = false;//表示可以改名字了
			
			this.onOff=true;
			
			//文件夹名字text选中状态，获取焦点，并选中文字效果
			file_textSel( findSelfElement( selIdArr[0] ).children[1] );
			
			popUp("可以改名了...","#EE9700");//弹框效果		
			
		}
		
	})
	
/*------------点击 删除 按钮--------------------------------------------*/
//点击删除按钮，删除选中的文件夹
	tools.on( navLis[4], "mouseup",function(){
		var selIdArr = whoSelect();
		if( selIdArr.length ){

			//使用弹框

			dialog({
				
				title:"删除文件",
//				content:"<div style='padding: 10px;'><h3>确定要删除这个文件夹吗？</h3><p>已删除的文件可以在回收站找到</p></div>",

				content:'<div class="tipsBox"><div class="wenhao_ico"></div><div class="tipsText"><h4>确认要删除这个文件夹吗？</h4><p>已删除的文件可以在回收站找到</p></div></div>',
						
				okFn:function (){//点击确认按钮,要做的事
					
					for (var i = selIdArr.length-1; i>-1; i--) {//表示 遍历所有选中的li
						
						var arrDel = handle.getAllchilds( selIdArr[i] );//找到指定id的所有子孙元素，包括自己	
						
						arrDel.forEach(function( value ){//遍历子孙元素
							
							for( var j = data.length-1; j>=0; j-- ){//遍历整个数据
								
								if( data[j].id === value.id ){//找到相等的那一项
									data.splice( j,1 );//从数据中删除这一项
								}
								
							}
							
						})
					}
//					
					list.innerHTML = create.createTree( -1 );//重新渲染树形菜单
					files.innerHTML = create.createFiles( lastID )//重新渲染 生成文件
					addStyleById( lastID ).className="active";//微云默认选中状态	
					showZhezhao();//判断遮罩是否出现
				}
			})

		}else{
//			fullTip("warn","请填写完必填项，才可以预览")
			popUp("请选中文件...","#EE9700");//弹框效果
		}

		
		
	})
	
/*------------点击 刷新  按钮-------------------------------------------*/
	tools.on( navLis[5], "mouseup",function(){
	
	})
	
	

/*--------框选效果----------------------------------------------------------*/

		
	tools.on( document, "mousedown",function(e){//生成div，作框选用
		
//		console.log(111,kuangOnoff);
		
//		console.log(e.target);
		
		//鼠标按下，排除干扰后，判断是框选状态，还是拖拽状态
		
		var disX = e.clientX;
		var disY = e.clientY;
		var oDiv = null,
			sketchDiv = null,//表示 拖拽时跟随鼠标移动的文件夹的 剪影，显示移动文件夹的数量
			imposterDiv = null,//表示鼠标下面的透明div，解决在文件夹上抬起会  触发的文件夹上  的    click事件
			pengLi = null;//表示碰到的文件夹
			
			
//		点击的如果是文件夹上的div或input 或者是 全选框 的话 就不进行  鼠标移动 事件
		if( e.target.nodeName === "DIV" || e.target.nodeName === "INPUT"  ){
			
			if( tools.findParent( e.target,".cont_right") ){
				return;
			}
			
		}
		
		if( ! kuangOnoff ){//kuangOnoff 是 false 的时候，只能改名字，不能框选
			return;
		}
		
		//鼠标按下的位置是  选中的文件夹 上，框选失效，只能拖拽
		if( tools.hasClass( e.target , "selectLi" ) ){
			e.preventDefault();//阻止浏览器默认事件
			//此处开始拖拽
			isDrag = true;
//			return;
		}
		
		//解决框选范围用判断就好。如果 是在 功能导航 上按下鼠标，就阻止 鼠标移动  事件，否则就触发框选
		if( tools.hasClass( tools.findParent( e.target, "ul" ) ,"nav_left") ){
			return ;
		}
		
		//下面将 mousemove 的时间函数提出来，方便 在 mouseup 的时候，解除 mousemove 函数
		var mouseMove = function( e ){//鼠标移动函数
//			console.log(isDrag);
			//符合 拖拽条件时，执行下面的代码
			if( isDrag ){//表示可以有拖拽
				
				//拖拽时，不是直接拖拽的文件夹，而是拖拽的  文件夹的剪影
				
				//所以 鼠标按下的位置  要 生成一个文件夹的影子  提示移动文件夹的数量
				
				if(!sketchDiv){//如果剪影不存在，就生成，已经存在，就不生成了\
					
					//如果移动的距离，小于5个像素时，不触发 拖拽事件
					
					if( Math.abs( e.clientX - disX ) < 5 && Math.abs( e.clientY - disY ) < 5 ){
						return;
					}
					
//					console.log( whoSelect() )
					selectArr = whoSelect();  //存的是选中的
//					console.log( selectArr )
					//生成文件夹剪影，显示拖拽的文件数量			
					sketchDiv = document.createElement("div");
					sketchDiv.className="dragFile";
					sketchDiv.innerHTML='<div class="drag_fileNum">'+whoSelect().length+'</div>';
					
					document.body.appendChild(sketchDiv);
					
					//生成一个伪装者，代表鼠标，去碰撞其他文件夹
					 
					imposterDiv = document.createElement("div");
					imposterDiv.style.cssText="width:10px;height:10px;position: absolute;left: 0;top:0;background:red;opacity: 1;"
					
					document.body.appendChild(imposterDiv);
					
				}
				
				sketchDiv.style.left = e.clientX + "px";
				sketchDiv.style.top = e.clientY + "px";
				
				imposterDiv.style.left = e.clientX-5 + "px";
				imposterDiv.style.top = e.clientY-5 + "px";
				
				//找到所有可以碰撞的文件，选中文件不能碰撞，即：去掉选中的文件之后，剩下的所有文件，都可以用来碰撞
				//用 伪装者imposterDiv 和  文件li 碰，碰上了，就给这个li就添加 selectLi
				
				for (var i = 0; i < filesLis.length; i++) {//遍历所有页面上的li
					
					var onoff = true;//初始为false，表示可以碰撞
					
					for (var j = 0; j < selectArr.length; j++) {//遍历所有选中的li的id
						
						if( filesLis[i].dataset.id == selectArr[j]){//如果相同，说明是选中文件，不能碰撞
							onoff = false;//表示不能碰撞
						}
					}
					
					if( onoff ){//表示可以碰撞
						//判断，碰上 还是没有 碰上
						if( peng( imposterDiv, filesLis[i] ) ){
							//碰上了，就给li添加class，并且存到变量中，方便鼠标抬起时，判断是不是要改变选中数据的pid
							
							tools.addClass(filesLis[i],"selectLi");
							
							pengLi = filesLis[i];//存下被碰撞的li
							
						}else{//表示没有碰上，去掉class
							
							tools.removeClass(filesLis[i],"selectLi");
						}
						 
					}else{//表示不能碰撞
						continue;
					}
					
				}
				
				return;//阻止框选
			}
			
			//符合框选条件时，执行下面的代码
			
			//如果鼠标移动距离大于15px，才确认是要做框选动作，生成div，append到body中，否则不生成div，目的是优化用户体验
			if( Math.abs(e.clientX-disX) > 15 || Math.abs(e.clientY-disY) > 15 ){
				
				if( !oDiv ){//如果div==null的话，才生成新的div
					
					oDiv = document.createElement("div");
					oDiv.className="kuang";
					document.body.appendChild( oDiv );//生成以后放到body里面
				}
				
				oDiv.style.width = Math.abs(e.clientX-disX)+"px";
				oDiv.style.height = Math.abs(e.clientY-disY)+"px";
				
				oDiv.style.left = Math.min(e.clientX, disX)+"px";
				oDiv.style.top = Math.min(e.clientY, disY)+"px";
				
				for(var i=0; i<filesLis.length; i++){
					
					if( tools.peng( oDiv, filesLis[i] ) ){//表示撞倒了，li添加class
						

						file_Sel( filesLis[i] );//选中文件夹的状态
						
						whoSelect().push( filesLis[i].dataset.id );//碰撞到的li的id 放进 被选中的那个arr
						
					}else{//表示没有框选到，li的class去掉
						
						file_Sel_No( filesLis[i] );
						
					}
					
					isAllCkecked();
				}
				
				allBox();				
			}
			
		};
		
		tools.on( document, "mousemove",mouseMove );//鼠标移动
		
		tools.on( document, "mouseup",function mouseUp( event ){//鼠标抬起
			
			//判断，如果有碰撞li
			if( pengLi ){
				
				var selIdArr = whoSelect();//选中文件的id
				var pengLiId = pengLi.dataset.id;//碰撞文件的id值
				
				var onoff = false;//这个变量代表是不是要出现弹框，false表示不出现弹框
				
				var arr=[];//用来才存放选中文件夹的元素，用来  移动成功后 ，在页面中 删除这个元素
						
				for (var i = 0; i < selIdArr.length; i++) {//遍历所有选中文件的id
					arr.push( findSelfElement( selIdArr[i] ) );
				}
						
				for (var i = 0; i < selIdArr.length; i++) {//遍历所有选中文件的id
							
					var selfDate = handle.findSelf( selIdArr[i] );//通过id找到自身数据
							
//					判断 选中文件  与  被 碰撞文件 的一级子元素   是否 有重名
					var BlSameName = handle.isSameName( selfDate.name , pengLiId );
					
					if(  BlSameName ){//true表示有重名
						
						onoff = true;//此处onoff=true，表示移动失败后，要出现弹框
							
					}else{//没有重名，可以放心移动
//								
						selfDate.pid = pengLiId;
						files.removeChild( arr[i] );//用remove的话就可以避免重新渲染了
						
					}
						
				}
//						
				if(onoff){//有重名，出现弹框
					popUp("存在重名文件，部分移动失败","#EE9700");//弹框效果
				}
				
				list.innerHTML = create.createTree( initID );//重新渲染树形菜单
				
			}
			
			tools.off( document, "mousemove", mouseMove);//解绑mousemove函数
			tools.off( document, "mouseup", mouseUp);//解绑 mouseup 函数
			
			if(oDiv){
				/*如果有div的时候再删除，同时将变量oDiv置空 */
				document.body.removeChild( oDiv );
				oDiv = null;//解决在鼠标抬起时找不到oDiv
			}
			
			if(sketchDiv){
//				console.log(1);
				document.body.removeChild( sketchDiv );//剪影
				document.body.removeChild( imposterDiv );//伪装者
				sketchDiv = null;//鼠标抬起时删除 sketchDiv
			}
			isDrag = false;
			
		})
		
		e.preventDefault();//阻止浏览器默认事件
	})

/*---------阻止所有元素的  鼠标按下  时候的冒泡------------------------------------*/

	for (var i = 0; i < navLis.length; i++) {
		tools.on( navLis[i], "mousedown",function( ev ){
//			ev.stopPropagation();//此处不能用  阻止冒泡解决框选范围问题，不然的话，会影响 新建文件夹的效果
			ev.preventDefault();//阻止浏览器默认事件,解决 会选中文字
			
		} );
	}
	
/*----------点击功能弹框的  关闭按钮-----------------------------------------*/
//	(function(){
//		var funPopBox=document.getElementById("funPopBox");
//		
//		tools.on( funPopBox, "click",function( ev ){
//			var target = ev.target;
//			
//			if( tools.hasClass(target,"close_ico") ){
//				tools.removeClass( target.parentNode,"show_funPopBox")		
//			}
//			
//		} );
//
//	})();
	

})();
