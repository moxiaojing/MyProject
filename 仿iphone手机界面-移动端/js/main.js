var islock = true;//表示锁屏状态
var dh = document.documentElement.clientHeight; //可视区高度
var dw = document.documentElement.clientWidth; //可视区宽度

//设置大图盒子的width
$(".bigImg_wrap").css("width", photosData.length*dw + "vw");

//当前时间
;(function(){
	
	var arrWeek = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
	
	var timeObj = null;
	
	function setTime(){
		
		var time = new Date();
		
		var hours = time.getHours() < 10 ? "0"+time.getHours() : time.getHours();//时
		
		var minutes = time.getMinutes() < 10 ? "0"+time.getMinutes() : time.getMinutes();//分
		
		var month = time.getMonth();//月
		
		var dates = time.getDate();//日
		
		var weeks = time.getDay();//星期几
		
		var obj = {
			
			"hh":hours,//时
			"mm":minutes,//分
			"MM":month+1,//月
			"dd":dates,//日
			"WW":weeks//星期
			
		}
		
		return obj;
		
	}
	
	timeObj = setTime();
	
	$(".lockS_time h2").html( timeObj.hh + ":" + timeObj.mm );
	
	$(".lockS_time div").html( timeObj.MM + " 月 " + timeObj.dd +" 日  &nbsp;&nbsp;&nbsp;&nbsp;"+ arrWeek[timeObj.WW] );
	
	$(".head_time").html( timeObj.hh + ":" + timeObj.mm );
		
	setInterval(function(){
		
		var time = new Date();
		
		var hour = time.getHours() < 10 ? "0"+time.getHours() : time.getHours();
		
		var minit = time.getMinutes() < 10? "0"+ time.getMinutes():time.getMinutes();
		
		//如果分钟相同，就return，否则就更新分钟数
		if( timeObj.mm !== minit ){
			
			timeObj.mm = minit;
			
			$(".lockS_time h2").html( timeObj.hh + ":" + timeObj.mm );
			
			$(".lockS_time div").html( timeObj.MM + " 月 " + timeObj.dd +" 日  &nbsp;&nbsp;&nbsp;&nbsp;"+ arrWeek[timeObj.WW] );
			
			$(".head_time").html( timeObj.hh + ":" + timeObj.mm );
			
		}else{
			
			return;
			
		}
		
		//小时数相同就return，否则就更新小时数
		if( timeObj.hh !== hour ){
			
			timeObj.hh = hour;
			
			$(".lockS_time h2").html( timeObj.hh + ":" + timeObj.mm );
			
			$(".lockS_time div").html( timeObj.MM + " 月 " + timeObj.dd +" 日  &nbsp;&nbsp;&nbsp;&nbsp;"+ arrWeek[timeObj.WW] );
			
			$(".head_time").html( timeObj.hh + ":" + timeObj.mm );
			
		}
		
		if( timeObj.MM !== time.getMonth() || timeObj.dd !== time.getDate() || timeObj.WW !== time.getDay() ){
						
			if( timeObj.MM !== time.getMonth() ){
				
				timeObj.MM = time.getMonth();
				
			}
			
			if( timeObj.dd !== time.getDate() ){
				
				timeObj.dd = time.getDate();
				
			}
			
			if( timeObj.WW !== time.getDay() ){
				
				timeObj.WW = time.getDay();
				
			}	
			
			$(".lockS_time div").html( timeObj.MM + " 月 " + timeObj.dd +" 日  &nbsp;&nbsp;&nbsp;&nbsp;"+ arrWeek[timeObj.WW] );							
			
		}
		
	},1000)
	
})()

//解锁
;(function(){
	
	var moveX = 0;
    //	var lockS_open_left = $(".lockS_open").get(0).offsetLeft;
	var lockS_open_width = $(".lockS_open").get(0).clientWidth;
	
	$(".lockS_open").on("touchstart",function(event){
		
		//changedTouches  涉及当前事件的手指的一个列表
		var ev = event.changedTouches[0];
		
		var disX = ev.pageX;
		
		$(".lockS_open").on("touchmove",function(event){
			
			var ev = event.changedTouches[0];
			
			moveX = ev.pageX-disX;
			
			$(".lockScreen").css({
				
				"left":moveX+"px"
				
			})
			
		})
		
		$(".lockS_open").on("touchend",function(){
			
			$(".lockS_open").on("touchmove",null);
			
			$(".lockS_open").on("touchend",null);
			
			if( moveX <= lockS_open_width/2 ){//表示解锁失败
				
				moveX = 0;
				
			}else{//表示解锁成功
				
				islock = false;//表示锁屏已开
				
				moveX = dw;
				
				$(".head_time").css("display","block");
				
			}
			
			$(".lockScreen").css({
				
				"left":moveX+"px",
				"transition":"0.3s"
				
			});

			$(".con_app").fadeIn("slow");
			
			//$(".con_app").css("visibility","visible");
			$(".con_app ul").css("opacity",1);
			
			$(".con_fixed").fadeIn("slow");						
			
			//利用延时定时器，去掉transition
			setTimeout(function(){
				
				$(".lockScreen").css({
					
				"transition":"none"
				
				})
				
			},300)
			
		})
		
	})
	
	tools.changePosition($(".con_app li").get());//解锁完成之后才能显示app，才能更改布局
	
})()

//主页面滑屏操作
;(function(){
	
	var moveX = 0;//表示移动距离
	var disX, num ,start = 0;
	var isMove = true;//表示允许滑动
	var pages = 0;//表示当前显示的页面	
	var startTime = 0;
	var disTime = Infinity;
	
	$(".con_app").on("touchstart",function(event){
		
		if(!isMove){
			
			return;
			
		}
		
		var ev = event.changedTouches[0];
		
		start = ev.pageX;
		
		disX = 0;
		
		startTime = new Date().getTime();//记录当前时刻
		
		$(".con_app").on("touchmove",function(event){
			
			if(!isMove){
				
				return;
				
			}
			
			var ev = event.changedTouches[0];
			
			if(num===0){
				
				start = ev.pageX;
				
			}
			
			num++;
			
			disX = ev.pageX-start;
			
			if( (pages === 0 && disX > 0) || ( pages === data.length-1 && disX < 0 ) ){
				
				moveX = - pages*dw + disX * 0.3;
				
			}else{
				
				moveX = - pages * dw + disX;
				
			}
			
			$(".con_app ul").css({
				
				"opacity":Math.abs(disX)/1000+0.2
				
			});
			
			$(".con_app ul").eq(pages).css({
				
				"opacity":0.9-Math.abs(disX)/1000+0.2
				
			});
			
			$(".con_app").css({
				
				"-webkit-transform":"translateX("+ moveX +"px)"
				
			});
			

		})
		
		$(".con_app").on("touchend",function(event){
			
			if(!isMove){
				
				return;
				
			}
			
			var ev = event.changedTouches[0];
			
			isMove = false;
			
			num = 0;
			
			disTime = new Date().getTime() - startTime;
			
			setTimeout(function(){
				
				//利用延时定时器，去掉transition
				setTimeout(function(){
					
					isMove = true;
					
					$(".con_app").css("transition","none");
					
					$(".con_page_ico span").removeClass("active");
					
					$(".con_page_ico span").eq(pages).addClass("active");
					
					
				},300)
				
				
				//滑屏成功
				if( ( disX / dw ) > 0.25 || ( (disX / dw) > 0.2 && (disTime < 300) ) ){//向右滑屏
					
					pages--;
					
					pages = pages < 0 ? 0 : pages;
					
				}else if( ( disX / dw ) < -0.25 || ( (disX / dw) < -0.2 && (disTime < 300) ) ){//向左滑屏
					
					pages++;
					
					pages = pages > data.length-1 ? data.length-1 : pages;
					
				}
				
				moveX = + - pages * dw;
				
				$(".con_app").css({
					
					"-webkit-transform":"translateX("+ moveX +"px)",
					"transition":"0.3s"
					
				})
				
				//屏幕变暗
				//$(".con_app ul").css("opacity",0.3);
				
				$(".con_app ul").eq(pages).css({
					
					"opacity":1
					
				});
				// $(".con_app ul").removeClass("show");
				// $(".con_app ul").eq(pages).addClass("show");
			
			},0)
			
		})
		
	})
	
})()

//返回上一级
;(function(){
	
	var isMove;
	
	$("._home").on("touchstart",function(){
		
		isMove = false;
		
		$(this).css("color","#4CAE4C");
		
	})
	
	$("._home").on("touchmove",function(){
		
		isMove = false;
		
	})
	
	$("._home").on("touchend",function(event){
		
		if(isMove){
			
			return;
			
		}
		
		var ev = event.changedTouches;
		//此处返回上一级
		$(this).parent().css("transform","scale(0)");
		
		$(this).css("color","#fff");
				
	})
	
})()

//删除app
;(function(){
	
	//使用面向对象，封装一个删除指定数据的方法
	function DelApp(data, pageNum, index ){
		
		this.data = data;//数据来源
		
		this.pageNum = pageNum;//页码索引值
		
		this.index = index;//当前页码的第几个app
		
		
	}
	//将方法绑定在原型上
	DelApp.prototype = {
		
		constructor:DelApp,
		//找到指定数据
		findData(){
			
			if( this.pageNum === "undefind" || this.index === "undefind" ){
				
				return null;
				
			}
			
			var data = null;
			
			for( var i=0; i<this.data.length; i++ ){
				
				if( this.data[i].page === this.pageNum ){
					
					for( var j=0; j<this.data[i].apps.length; j++ ){
						
						if( this.data[i].apps[j].index === this.index ){
							
							data = this.data[i].apps[j];
							
							break;
							
						}
							
					}
					
					break;
				}
				
			}
			
			return data;
			
		},
		//删除指定数据
		removeData(){
			
			var arr = this.data[this.pageNum - 1].apps;
			
			var data = null;
			
			for( var i=0; i<arr.length; i++ ){
				
				if( arr[i] === this.findData() ){
					
					data = arr[i];
					
					arr.splice(i,1);
					
					break;
					
				}
				
			}
			
			return data;
			
		}
		
	}
	
	//删除指定app的动画效果
	function removeApp(element,arrs){
		
		var index = element.index();
		
		var parent = element.parent();
		
		var arr = [];
		
		var j = 0;
		
		for (var i = index; i < (arrs.length-1); i++,j++) {
			
			arr[j] = [arrs.eq(i).css("left"),arrs.eq(i).css("top")];
		}
		
		element.remove();
	
		for (var i = 0; i < arr.length; i++,index++) {
			
			parent.find("li").eq(index).css({
				
				"left":arr[i][0],
				"top":arr[i][1],
				"transition":"0.5s"
				
				
			});
			
			//parent.find("li").eq(index).css("top",arr[i][1]);
		}
		
		return element;
	}
	
	var isDel;//是否删除app
	
	$(".con_apps_del").on("touchstart",function(){
		
		isDel = false;
		
	})
	
	$(".con_apps_del").on("touchmove",function(){
		
		isDel = false;
		
	})
	
	$(".con_apps_del").on("touchend",function(event){
		
		var ev = event.changedTouches[0];
		
		var that = $(this);
		
		isDel = true;
		
		$("#mask").show();
		
		
		new Dialog({
			
			"title":"删除",
			
			"content":$(this).parent().find("span").eq(0).text()+"将会被删除",
			
			ok(){
				
				$(this.parentNode).remove();
				
				$("#mask").hide();
				
				//console.log( that.parent().get(0).dataset.index );
				var app = new DelApp( data, that.parent().parent().get(0).dataset.page, that.parent().get(0).dataset.index )
				
				var a = app.removeData();//删除指定app数据
				//console.log(app);
				removeApp(that.parent(),that.parent().parent().find("li"));
				
			},
			
			cancel(){
				
				$(this.parentNode).remove();
				
				$("#mask").hide();	
				
			}
			
		})
		
	})
	
})()

//顶部下拉显示
;(function(){
	
	var disY;
	
	$(".head_sider").on("touchstart",function(event){
		
		var ev = event.changedTouches[0];
		
		disY = ev.pageY;
		
	})
	
	$(".head_sider").on("touchmove",function(event){
		
		var ev = event.changedTouches[0];
		
		var y = ev.pageY - disY;
		
		y = y < 0 ? 0 : y;

		if( islock ){

			$(".head_sidebar").addClass("head_sidebar_lock");
			
		}else{

			$(".head_sidebar").addClass("head_sidebar_Unlock");
		}

		$(".head_sidebar").css({
				"transform":"translateY("+ y +"px)"
		});

		$(".head_sider").css({
			"transform":"translateY("+ y +"px)"
		});
		
	})
	
	$(".head_sider").on("touchend",function(){
		
		var ev = event.changedTouches[0];
		
		var scale = ev.pageY / dh;
		//console.log(scale);

		$(".head_sider").css({"transition":"0.3s"});
		
		$(".head_sidebar").css({"transition":"0.3s"});
				
		if( scale < 0.3 ){
			
			$(".head_sider").css({"transform":"translateY(0)"});
			
			$(".head_sidebar").css({"transform":"translateY(0)"});
						
		}else{
			
			$(this).css({"transform":"translateY(100vh)"});
			
			$(".head_sidebar").css({"transform":"translateY(100vh)"});
			
		}
		
		setTimeout(function(){
			
			$(".head_sider").css({"transition":"none"});
			
			$(".head_sidebar").css({"transition":"none"});
			
		},300)
		
	})
	//上滑收回弹框

	var startY,
		chaZhi;
	
	$(".head_sidebar_back").on("touchstart",function(event){
		
		var ev = event.changedTouches[0];
		
		startY = ev.pageY;
	})
	
	$(".head_sidebar_back").on("touchmove",function(event){
		
		var ev = event.changedTouches[0];
		
		chaZhi = ev.pageY - startY;
	})
	
	$(".head_sidebar_back").on("touchend",function(event){
		
		var ev = event.changedTouches[0];
		
		$(".head_sider").css({"transition":"0.3s"});
		
		$(".head_sidebar").css({"transition":"0.3s"});
		
		if( chaZhi < -20){
			
			$(".head_sider").css({"transform":"translateY(0)"});
			
			$(".head_sidebar").css({"transform":"translateY(0)"});
			
		}
		
		setTimeout(function(){
			
			$(".head_sider").css({"transition":"none"});
			
			$(".head_sidebar").css({"transition":"none"});
			
		},300)
		
	})

	//顶部下拉弹框title切换

	$(".head_sidebar_title span").on("touchend",function(event){
		
		var ev = event.changedTouches[0];
		
		$(".head_sidebar_title span").removeClass("active");
		
		$(this).addClass("active");
		
	})

})()

//底部上划显示弹框
;(function(){
	
	var disY;
	
	var height = $(".foot_sidebar").height();
	
	$(".foot_sider").on("touchstart",function(event){
		
		var ev = event.changedTouches[0];
		
		disY = ev.pageY;
		
	})
	
	$(".foot_sider").on("touchmove",function(event){
		
		var ev = event.changedTouches[0];
		
		var y = ev.pageY - disY;
		
		if( y < 0 ){
			
			y = y;
			
			if( y < -height ){
				
				y = -height;
				
			}
			
		}else {
			
			y = 0;
			
		}
		
		$(this).css({"transform":"translateY("+ y +"px)"});
		
		$(".foot_sidebar").css({
			
			"transform":"translateY("+ y +"px)",
			"zIndex":110
			
		});		
		
	})
	$(".foot_sider").on("touchend",function(event){
		
		var ev = event.changedTouches[0];
		
		$(this).css({"transform":"translateY(0)"});
		
		$(".close").removeClass("glyphicon-minus");
		
		$(".close").addClass("glyphicon-chevron-down");
		
		$("#mask").css({
			
			"display":"block",
			"opacity":opacity
			
		});
		
		$(".foot_sidebar").css({
			
			"transform":"translateY("+ -height +"px)",
			"zIndex":110,
			"transition":"0.3s"
			
		});
		
	})
	//点击收回底部上滑弹框	
	$(".close").on("touchend",function(){
		
		$(".foot_sidebar").css({
			
			"transform":"translateY(0)",
			"transition":"0.3s"
			
		});
		$("#mask").css({
			
			"display":"none"
			
		});
	//		$(document).css("opacity",opacity);
	})
	
	//点击弹框屏幕亮度按钮	
	var currentX = 0,
		startX,
		opacity = 0.4;
		
	var L_width = $(".line").width();
	
	var L_active_width = $(".line_active").width();
	
	$(".line_btn").on("touchstart",function(event){
		
		var ev = event.changedTouches[0];
		
		startX = ev.pageX;
		
	})
	
	$(".line_btn").on("touchmove",function(event){
		
		var ev = event.changedTouches[0];
		
		var x = ev.pageX - startX + currentX;
		
		//		console.log(x);
		if( x < -L_width/2 ){
			
			x = -L_width/2;
			
		}else if(x > L_width/2){
			
			x = L_width/2;
			
		}
		
		opacity = 1- (x / L_width + 0.5);
		
		opacity > 0.8 ? opacity = 0.8 : opacity;
		
		//		console.log(opacity)
		$(this).css({"transform":"translateX("+ x +"px)"});
		
		$(".line_active").css({"width":x + L_active_width +"px"});
		
		$("#mask").css({"opacity":opacity});
		
	})
	
	$(".line_btn").on("touchend",function(event){
		
		var ev = event.changedTouches[0];
		
		currentX = ev.pageX - startX + currentX;//记录上一次btn的位置
		
	})

})()

//点击app事件
;(function(){
	
	var isMove = false;//是否拖动
	var	isOpen = true;//是否打开app,true-打开app，false-长按app
	var	longTimer,//表示长按定时器500s
		disX,
		disY,
		left,
		top,
		app_pageInfo,//表示con_apps_page盒模型信息
		num,
		time = 0;
		
	$(".app").on("touchstart",function(event){
		
		if(event.target.nodeName === "EM"){
			return;
		}
		var ev = event.changedTouches[0];
		//获取app的盒模型信息
		var appInfo = this.getBoundingClientRect();
		
		app_pageInfo = this.parentNode.getBoundingClientRect();
		
		disX = ev.pageX - appInfo.left;
		
		disY = ev.pageY - appInfo.top;
		
		left = parseInt(getComputedStyle(this).left);
		
		top = parseInt(getComputedStyle(this).top);
		
		var that = $(this);
		
		time = new Date().getTime();
		
		num = 0;
		
		clearTimeout(longTimer);
		
		longTimer = setTimeout(function(){
			
			num++;
			
			if( num > 0 ){//表示长按app
				
				isOpen = false;
				
			}
			
			if( !isOpen && !isMove){//判断是不是长按
				
				that.css("opacity",0.8);
				
				$(".app").toggleClass("active");
				
				$(".con_apps_del").toggleClass("show");
				
			}
			
		},500)
			
	})

	$(".app").on("touchmove",function(event){
		
		if(event.target.nodeName === "EM"){
			return;
		}
		var ev = event.changedTouches[0];
		
		isOpen = false;
		
		if( !isOpen ){//表示长按app，可移动或删除app
			
			isMove = true;
		}
		
		if( $(this).hasClass("active") ){//如果有class，就可以拖拽
			
			event.stopPropagation();
			
			$(this).css({
				
				"left":( ev.pageX - disX ) + "px",
				"top":( ev.pageY - disY - app_pageInfo.top ) + "px",
				"zIndex":10,
				"opacity":0.8,
				"transition":0
				
			})
		}
		
	})

	$(".app").on("touchend",function(event){
		
		if(event.target.nodeName === "EM"){
			
			return;
			
		}
		
		var ev = event.changedTouches[0];
		
		clearTimeout(longTimer);
		
		time = new Date().getTime() - time;//时间差
		
		isMove = false;//移动停止
		
		var text = $(this).find("span.app_title").text();

		if(isOpen){//表示是打开app
			
			if( time < 500 ){
				if( text === "相册" ){
					//显示图片模板
					$(".photo_open").css("transform","scale(1)");

					//上下滚动模块，相册图片上下滑动
					new IScroll(".photo_open",{});

				}else{
					
					$(".app_open").css("transform","scale(1)");
					
				}
				
			}
		}else{//表示长按app之后抬起手指,不打开app
			
			$(this).css("opacity",1);
			
			if( !$(this).hasClass("active") ){
				
				isOpen = true;//还原初始状态
				
			}else{
				
				$(this).css({
					
					"left":left+"px",
					"top":top+"px",
					"zIndex":0
					
				})
				
			}
			
		}
		
	})

})()


//相册事件
;(function(){
	
	var isMove;
	
	$(".photo_open .photo_wrap").on("touchstart",function(event){
		
		var ev = event.changedTouches[0];
		
		isMove = false;
		
		console.log(event.target);
	})
	
	$(".photo_open .photo_wrap").on("touchmove",function(event){
		
		var ev = event.changedTouches[0];
		
		isMove = true;
		
	})
	
	$(".photo_open .photo_wrap").on("touchend",function(event){
		
		var target = event.target;
		
		var ev = event.changedTouches[0];
				
		if( isMove ){
			
			return;
			
		}
		//确认点击的是li或其子集img
		if(target.nodeName !== "LI"){
			
			if( $(target).parents().filter("li").length ){
				
				target = $(target).parents().filter("li")[0];
				
			} else {
				
				return;
			}
		}
		
		var index;//记录点击目标的索引值
		
		index = $(target).index();
		
		$(".bigImg_wrap").data("currentIndex",index);
				
		$(".bigImg_wrap").css({
			"transform":"scale(1)",
			"transform":"translateX("+ -index*dw +"px)"
			
		});
		
		$(".bigImg_wrap img").removeClass("active");
			
		$(".bigImg_wrap img").eq(index).addClass("active");
		
		setTimeout(function(){
				
				$(".bigImg_open").css({
				
					"transform":"scale(1)",
					
					"-webkit-transform":"scale(1)"
				});
				
			},0);
		
		
		
	})
})()


























