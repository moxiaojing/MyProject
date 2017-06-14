var back = document.getElementById("back");
var backFont = document.getElementById("back_font");
var log = document.getElementById("logo");

back.onmouseover = function(){
	this.style.transform = "rotateZ(-20deg)";
	backFont.style.transform = "rotateZ(20deg)";
}

back.onmouseout = function(){
	this.style.transform = "rotateZ(0deg)";
	backFont.style.transform = "rotateZ(0deg)";
}
back.onclick = function(){
	window.location.href = "../index.html?2";
}


//心形图片的鼠标移入效果
log.onmouseover = function(){
//				clearInterval(timer);
	this.style.transform = "scale(0.9)";
	
}
log.onmouseout =function(){
//				rota();	
	this.style.transform = "scale(0.8)";
}
