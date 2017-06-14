var crts = document.getElementsByClassName("creat");
var color = ["lightgreen","gold","blue","aqua","darkorange","lightcyan","yellow", "orange","deeppink","red"];
document.onmousemove = function(ev){
	var clnX = ev.clientX;
	var clnY =  ev.clientY;
	
	for (var i = 0; i < 8; i++) { //生成div
		var div =  document.createElement("div");
		div.className = "creat";					
//					div.style.left = clnX - (div.offsetWidth/2) + 50*(Math.random()-0.5) +"px";
//					div.style.top = clnY - (div.offsetHeight/2) + 50*(Math.random()-0.5) +"px";
		
		div.style.left = clnX - (25)+ 50*(Math.random()-0.5) +"px";
		div.style.top = clnY - (25)+ 50*(Math.random()-0.5) +"px";
		
		div.style.background = "#fff";
		div.style.zIndex = -1;
		div.style.opacity = .6;		
		document.body.appendChild(div);	
	}
	console.log(crts);
	
	setTimeout(function(){ //给生成的div添加效果
		
		for (var i = 0; i < crts.length; i++) {
			crts[i].style.opacity = 1;
			if(!crts[i].onoff){
				crts[i].onoff = true;						
				crts[i].style.background = color[i%10];
				crts[i].style.transform = "scale(0)";
				crts[i].style.left =(Math.random()-0.5)*500 + crts[i].offsetLeft +"px";
				crts[i].style.top =(Math.random()-0.5)*500 + crts[i].offsetTop +"px";
			}	
		}
	},5)
	
	setTimeout(function(){ //删除消失的div
		for (var i = 0; i < 8; i++) {
			if(crts[i]){
				document.body.removeChild(crts[i]);
			}
		}
			
	},1005)
}

//css中添加这段样式即可

//.creat{
//	width: 50px;
//	height: 50px;
//	border-radius: 50%;
//	position: absolute;
//	transition: 1000ms ease-out;
//	box-shadow: 0 0 2px 2px #fff;
//	opacity: 1;
//}