(function(){
	var warp = document.getElementById("warp");
	var menu = document.getElementById("menu");
	var warpBud = warp.getElementsByClassName("bud")[0];
	var crts = document.getElementsByClassName("creat");
	var log = document.getElementById("logo");
	var lis = menu.getElementsByTagName("li");
	menu.dis = true;
	var scroll = true;
	var drop = true;
	var back = document.getElementById("back");
	var backFont = document.getElementById("back_font");
	//内容区
	var cont = document.getElementById("content");
	var leaf = cont.getElementsByClassName("leaf1")[0];
	var flys = cont.getElementsByClassName("fly");
	var woman = document.getElementById("woman");
	var man = document.getElementById("man");
	var manImg = ["CSimg/flower2.png","CSimg/flower3.png","CSimg/flower1.png"];
	var dropTimer = null;
	var n = 1; //控制裙子摇摆			
	var manTimer = null; //控制男人走动
	//测试文字
	var warpInfo = document.getElementById("warp_info");
	//背景音乐
	var BGmusic = null;		
	
	//获取search 值
	var color = ["lightgreen","gold","blue","aqua","darkorange","lightcyan","yellow", "orange","deeppink","red"];
	var num = 0;			
	var timer = null;
	
	//开场动画变量
	var s = window.location.search;
	console.log(Boolean(s));			
	
	var oStart = document.getElementById("start");
	var win = document.getElementById("win");
	var moveMan = document.getElementById("moveMan");
	var img1 = oStart.getElementsByClassName("buy")[0];
	var img2 = oStart.getElementsByClassName("sale")[0];
	var speak1 = document.getElementById("speak1");
	var odir = document.getElementById("dirs");
	var turnImg = null;
	
	var sGirl = document.getElementById("sGirl");
	
	// 开场动画
	if(!s){
		oStart.style.display = "block";
		
		setTimeout(function(){
			oStart.children[0].style.backgroundPositionX = "0px";
			
			var n = 1;
				setInterval(function(){
					if(n%2){
						odir.style.backgroundImage = "url(moveImg/dir2.png)";
					}else{
						odir.style.backgroundImage = "url(moveImg/dir1.png)";
					}
					n++;
				},500)
				
			setTimeout(function(){
				moveMan.style.opacity = 1; //男人出现
				speak1.style.display = "block";
				
				setTimeout(function(){
					img1.style.opacity = 1;
					img2.style.opacity = 1;
					
				},500)						
				
			},2000)					
		},300)
		
	}else{ // 如果不是第一次打开网页不显示动画
		oStart.style.display = "none";
		setTimeout(function(){
			menu.style.transform = 	"scale(1) rotate(0deg)";					
		},300)
		
	}
	
	//切换场景2
	var turnImg = null;
	odir.onclick = function(){
		moveMan.src = "moveImg/stand.png";
		turnImg = setInterval(function(){
			if(n%2){
				moveMan.src = "moveImg/leftFoot.png";
			}else{
				moveMan.src = "moveImg/rightFoot.png";
			}
		},200)
		win.style.backgroundPositionX = "-800px";
		sGirl.style.left = "58%";
		img1.style.display = "none";
		img2.style.display = "none";
		speak1.style.display = "none";
		setTimeout(function(){
			clearInterval(turnImg);
			moveMan.src = "moveImg/stand.png";
//					speak1.style.display = "block";
			img1.src = "moveImg/buy2a.png";
			img2.src = "moveImg/sale2.png";
			img1.className = "buy2a";
			img2.className = "sale2a";					
			img1.style.display = "inline-block";
			img2.style.display = "inline-block";
			
			setTimeout(function(){
									
				img1.style.height = "65px";
				img1.src = "moveImg/buy2.png";
				setTimeout(function(){
					img2.src = "moveImg/sale2b.png";
					img2.style.height = "65px";
					speak1.children[0].src = "moveImg/open.png";
					odir.style.transform = "rotateZ(-90deg)";
					odir.style.bottom = "-23px";
					speak1.style.display = "block";
					speak1.onclick = function(){
						oStart.style.opacity = 0;
						
						setTimeout(function(){
							oStart.style.display = "none";
							menu.style.transform = 	"scale(1) rotate(0deg)";
						},1000)
						
					}	
				},500)
				
			},1500)
			
		},2000)
		
	}
	//鼠标移动效果
//	warp.onmousemove = function(ev){
////				console.log(1);
//		var clnX = ev.clientX;
//		var clnY =  ev.clientY;
//		
//		for (var i = 0; i < 8; i++) { //生成div
//			var div =  document.createElement("div");
//			div.className = "creat";					
////					div.style.left = clnX - (div.offsetWidth/2) + 50*(Math.random()-0.5) +"px";
////					div.style.top = clnY - (div.offsetHeight/2) + 50*(Math.random()-0.5) +"px";
//			
//			div.style.left = clnX - (25)+ 50*(Math.random()-0.5) +"px";
//			div.style.top = clnY - (25)+ 50*(Math.random()-0.5) +"px";
//			
//			div.style.background = "#fff";
//			div.style.zIndex = -10;
//			div.style.opacity = .6;
//			
//			document.body.appendChild(div);	
//		}		
//		setTimeout(function(){ //给生成的div添加效果
//			
//			for (var i = 0; i < crts.length; i++) {
//				crts[i].style.opacity = 1;
//				if(!crts[i].onoff){
//					crts[i].onoff = true;
//							
//					crts[i].style.background = color[i%10];
//					crts[i].style.transform = "scale(0)";
//					crts[i].style.left =(Math.random()-0.5)*500 + crts[i].offsetLeft +"px";
//					crts[i].style.top =(Math.random()-0.5)*500 + crts[i].offsetTop +"px";
//				}	
//			}
//		},5)
//		
//		setTimeout(function(){ //删除消失的div
//			for (var i = 0; i < 8; i++) {
//				if(crts[i]){
//					document.body.removeChild(crts[i]);
//				}
//			}
//				
//		},1005)
//	}
	
//--------------------------滚轮事件------------------------------------------------------			
//			函数封装
	addScroll (warp,function(){
//				console.log( "上" );
		if(scroll)menu.style.transform = "scale(1.2) rotate("+ num*360 +"deg)";
		
	},function(){
//				console.log( "下" );
		if(scroll)menu.style.transform = "scale(1) rotate("+ num*360 +"deg)";
		

	})
	
	function addScroll (obj,fnUp,fnDown) {
		//为obj添加鼠标滚轮事件处理函数
		obj.onmousewheel = fn;
		obj.addEventListener("DOMMouseScroll",fn);
		
		function fn (e) {//只要滚动滚轮了，就会触发fn
			var e = e || event;
			if(e.wheelDelta){//chrome
				e.wheelDelta<0? fnDown(): fnUp();
				return false;
			}
			if(e.detail){//firefox
				e.detail>0? fnDown(): fnUp();
				e.preventDefault();
			}
		}
	}						
	
//	menu.onmouseover = function(){
////				clearInterval(timer);
//		
//	}
//	menu.onmouseout =function(){
////				rota();				
//	}
	//心形图片的鼠标移入效果
	log.onmouseover = function(){
//				clearInterval(timer);
		this.style.transform = "translateX(-50%) translateY(-50%) scale(0.9)";
		
	}
	log.onmouseout =function(){
//				rota();	
		this.style.transform = "translateX(-50%) translateY(-50%) scale(0.8)";
	}
	//每一片叶子的事件
	for (var i = 0; i < lis.length; i++) {
		lis[i].onmouseover = function(){
			this.style.transform = "scale(1.2)";
		}
		lis[i].onmouseout = function(){
			this.style.transform = "scale(1)";
		}
	}
	//------------------------------------------------------------------------------			
	function homeHidden(){ //隐藏首页的函数封装
		warpBud.style.display = "none";
		menu.style.transform = "scale(0)  rotateZ("+ num*360 +"deg)";				
		menu.dis = false;
		scroll = false;
		
		setTimeout(function(){
			document.body.style.backgroundImage = "none";
			menu.style.overflow = "hidden";
			menu.style.display = "none";
			back.style.display = "block";
			log.className = "logo_move";
			warp.className = "change";
			
		},500)
		
	}						
	//-------------------  第一片叶子  -------------------------------------------------
	lis[0].onclick = function(ev){
		warpBud.style.display = "none";
		menu.style.transform = "scale(0) rotateZ("+ num*360 +"deg)";					
		menu.dis = false;
		scroll = false;
		cont.style.display = "block";
		
//				homeMusic.pause();
//				homeMusic.style.display = "none";
		//BG音乐
			BGmusic = document.createElement("audio");
			BGmusic.src = "music/nightPaino4.mp3";
			BGmusic.autoplay = "autoplay";
			BGmusic.loop = true;
			warpInfo.appendChild(BGmusic);
		setTimeout(function(){					
			//文字显示样式
			warpInfo.style.transition = "5000ms linear";
			warpInfo.style.height = "370px";
			document.body.style.backgroundImage = "none";
			document.body.style.backgroundColor = "#000";
			menu.style.overflow = "hidden";
			menu.style.display = "none";
			back.style.display = "block";
			log.className = "logo_move";
			warp.className = "change";
			cont.className = "show";
			cont.children[0].style.top = "0px";
			setTimeout(function(){
				woman.style.opacity = 1;//姑娘显示
				var num = 0;
				manTimer = setInterval(function(){ //男人走过来
					
					num++;
					
					num%=2;
					var l = man.offsetLeft + 18;
					if(l >= 0){
						man.style.opacity = 1;
					}
					man.children[0].src = manImg[num];
					if(l>120){
						l = 120;								
						clearInterval(manTimer);
						man.children[0].src = manImg[2];								 
					}
					man.style.left = l +"px";							
				},500)
				
				for (var i = 0; i < flys.length; i++) {
					flys[i].style.display = "block";
				}
				//无限掉落心形图片
				dropTimer = setInterval(function(){
					
					dropHeart();
					
				},2000+(flys.length-1)*200);
				
			},2000)
			
		},500)
		
		ev.cancelBubble = true;
	}

//---------------------------  第1片叶子  --------------------------------------------------

	lis[1].onclick = function(ev){
		homeHidden();
		
		setTimeout(function(){// 这里写点击叶子执行的代码
			window.location.href = "leaf1/html/xin.html";
		},800)
		ev.cancelBubble = true;
	}

//---------------------------  第2片叶子  --------------------------------------------------

	lis[2].onclick = function(ev){
		homeHidden();
		
		setTimeout(function(){// 这里写点击叶子执行的代码
			window.location.href = "leaf2/xudao.html";
		},800)
		ev.cancelBubble = true;
	}

//---------------------------  第3片叶子  --------------------------------------------------

	lis[3].onclick = function(ev){
		homeHidden();
		
		setTimeout(function(){// 这里写点击叶子执行的代码
			window.location.href = "leaf3/present.html";
		},800)
		ev.cancelBubble = true;
	}

//---------------------------  第4片叶子  --------------------------------------------------

	lis[4].onclick = function(ev){
		homeHidden();
		
		setTimeout(function(){// 这里写点击叶子执行的代码
			window.location.href = "leaf4/imgbook.html";
		},800)
		ev.cancelBubble = true;
	}
//---------------------------  第5片叶子  --------------------------------------------------

	lis[5].onclick = function(ev){
		homeHidden();
		
		setTimeout(function(){// 这里写点击叶子执行的代码
			window.location.href = "leaf5/timer.html";
		},800)
		ev.cancelBubble = true;
	}
			

//-------------------------------------掉落❤型的效果------------------------------------
	
	function dropHeart(){
			if(drop){
				drop = false;
				setTimeout(function(){
					for (var i = 0; i < flys.length; i++) {
						flys[i].style.transition =  i*200 + 2000 +"ms";
						flys[i]._right = flys[i].style.right;
						flys[i]._top = flys[i].style.top;
						flys[i].style.right = "45%";
						flys[i].style.marginRight = (Math.random()-0.5)*40 + "px";
						flys[i].style.top = "100%";					
						flys[i].style.transform = "scale(0) rotateY("+ Math.floor((Math.random()-0.5))*720 +"deg) translateY("+ (Math.random()-0.5)*1000 +"px) translateX("+ (Math.random()-0.5)*600 +"px)";	
					}
					
					setTimeout(function(){
						for (var i = 0; i < flys.length; i++) {
							flys[i].style.transition = "0ms";
							flys[i].style.right = flys[i].getAttribute("_right");
							flys[i].style.top = flys[i].getAttribute("_top");
							flys[i].style.marginTop = "0px";					
							flys[i].style.transform = "scale(1) rotateY(0deg) translateY(0px) translateX(0px)";	
						}
						drop = true;
						
					},1500+(flys.length-1)*200)
					
				},1000)					
				
			}								
	}
//----------------------------------------------裙子飞舞-------------------------------------------------
	setInterval(function(){
		var qunZi = document.getElementById("qunzi");
		if(n%2){
			qunZi.style.transform = "rotateZ(-3deg)";
		}else{
			qunZi.style.transform = "rotateZ(0deg)";
		}
		n++;
	},300)
				

	//返回按钮
	back.onclick = function(){
		document.body.style.backgroundImage = "url(img/001.png)";
		warp.className = "normal";
		warpBud.style.display = "block";				
		log.className = "logo_nor";	
		
		woman.style.opacity = 0;//女孩隐藏
		
		clearInterval(manTimer);//隐藏男孩
		man.style.left = "-60px"; 
		man.style.opacity = 0;	
		man.style.transition = "0ms";	
		
		cont.className = "hidden";  //cont隐藏
		cont.style.display = "none";
		cont.children[0].style.top = "600px";
		menu.style.display = "block";
		//文字样式
		warpInfo.style.transition = "0ms";
		warpInfo.style.height = "0px";
		
		//停止音乐
		warpInfo.removeChild(BGmusic);				
		dropTimer = null;
		
//				homeMusic.style.display = "block";				
//				homeMusic.play();
		
		setTimeout(function(){
			
			menu.style.transform = "scale(1) rotateZ("+ num*360 +"deg)";
			menu.style.overflow = "visible";					
			
			menu.dis = true;
			scroll = true;
		},500)
		back.style.display = "none";				
	}
	
	back.onmouseover = function(){
		this.style.transform = "rotateZ(-20deg)";
		backFont.style.transform = "rotateZ(20deg)";
	}
	
	back.onmouseout = function(){
		this.style.transform = "rotateZ(0deg)";
		backFont.style.transform = "rotateZ(0deg)";
	}
	
	log.onclick = function(){
		if(menu.dis){
			num++;
			menu.style.transform = "scale(1) rotateZ("+ num*360 +"deg)";	
		}
					
	}

	//阻止冒泡
	menu.onmousemove = function(ev){
		ev.cancelBubble = true;	
	}
	log.onmousemove = function(ev){	
		
		ev.cancelBubble = true;				
	}
	
	//---------------------------------------相册模块-------------------------------------

	
})()	