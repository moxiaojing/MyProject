

//------------------日期时间------------------
		var elapseClock=document.getElementById("elapseClock");
		
		//设置初始日期为 2016.1.1.0.0.0
		var t1=new Date();			
		t1.setFullYear(2016,1,1);
		t1.setHours(0);
		t1.setMinutes(0);
		t1.setSeconds(0);
		
		setInterval(function(){
			timeElapse(t1);
		},1000)
		
		function timeElapse(date){
			var t2=new Date(); //当前日期时间
			var differTime=Math.floor((t2-t1)/1000);//经历的总时间				
			var differS = differTime%60; //秒
			var differM = Math.floor(differTime%86400%3600/60);//分
			var differH = Math.floor(differTime%86400/3600);//时
			var differD = Math.floor(differTime / (3600 * 24));//天
			var str = "<span class=\"digit\">" + add0(differD) + "</span> days <span class=\"digit\">" + add0(differH) + "</span> hours <span class=\"digit\">" + add0(differM) + "</span> minutes <span class=\"digit\">" + add0(differS) + "</span> seconds";
			
			elapseClock.innerHTML=str;
		}			
		function add0(n){//补0
			return n>=10 ? n:"0"+n;
		}
		
		//------------------心形花环------------------
		var loveHeart = document.getElementById("loveHeart");
		var hearts = document.getElementById("hearts");
		var words = document.getElementById("words");
		var str="";
		for(var i=0;i<18;i++){
			str+="<div class='heart' style='width:100px;height:90px;transform:rotate("+(i*20)+"deg)'></div>"
		}
		
		
		hearts.innerHTML=str;
		var oDiv=document.querySelectorAll(".heart");
		var timer=null;
		timer=setInterval(changeColor,400)	

		var	onoff=true;
		function changeColor(){
			if(onoff){
				for(var i=0;i<oDiv.length;i++){		
					if(i%2){
						oDiv[i].className="heart heartBig";		
					}else{
						oDiv[i].className="heart";		
					}						
				}	
			}else{
				for(var i=0;i<oDiv.length;i++){		
					if(i%2){
						oDiv[i].className="heart";		
					}else{
						oDiv[i].className="heart heartBig";		
					}		
				}
			}
			onoff=!onoff;			
		}
		
	//-----------------------花瓣飘落------------------------
	function snow(x){
		var snow=document.createElement("div");
		snow.className="snow";
		snow.style.left=Math.floor(Math.random()*100)+"%";	
		snow.style.top=Math.floor((Math.random()-x)*100)+"%";
		document.body.appendChild(snow);
		setTimeout(function(){
			snow.style.top="110%";
		},16)
		setTimeout(function(){
			document.body.removeChild(snow);
		},10000)
	}

	setInterval(snow,1000)
	setInterval(function(){
		snow(0.5);
	},4000)

	//-----------------------人物动画------------------------
		var qlv=document.getElementById("qlv");
			
		var target=(window.innerWidth-parseFloat(getComputedStyle(qlv).width))/2 + 100; 			
		timer=setInterval(function(){
			var right=parseFloat(getComputedStyle(qlv).right);				
			if(right >= target) {
				clearInterval(timer);	
			} else {
				qlv.style.right = right + 5 +"px";
			}
		},16)	