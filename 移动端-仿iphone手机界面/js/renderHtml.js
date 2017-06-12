//设置 con_apps_page 的width
$(".con_app").css("width",data.length*100+"vw");
$(".con_app ul li").css("width","25%");
//生成主屏app图标	
var obj = { data:data };

var html =  template('apps_pageHTML', obj);

$(".con_app").eq(0).html(html);

//生成相册页面

var objImgs = {photosData:photosData};

$(".photo_wrap").html(template('photo_pageHTML', objImgs))

//生成相册大图

var imgStr = "";

for( var i = 0; i < photosData.length; i++){
	
	imgStr +="<li class = 'swiper-slide'><img src='"+ photosData[i] +"' /></li>"
	
}

$(".bigImg_wrap").html(imgStr);


// $(".con_app ul").eq(0).addClass("show");
// 生成页数对应的小圆圈
var str = "";

data.forEach(function(item,index){
	
	if( index === 0 ){
		
		str += "<span class = 'active'></span>";
		
	}else{
		
		str += "<span></span>";
		
	}
	
})

$(".con_page_ico").html( str );

//app浮动布局转定位布局

function changePosition(arrElement){ //浮动转定位
	
	var arr = [];
	
	for( var i=0; i< arrElement.length; i++ ){
		
		var obj = {
			
					left: arrElement[i].offsetLeft,						
					top: arrElement[i].offsetTop	
					
				}
		
		arr.push(obj);
		
//		console.log(arrElement[i].offsetLeft);
	}
	
	for( var i=0; i< arrElement.length; i++ ){
		
		arrElement[i].style.cssText = "position:absolute;margin:0px;float:none";
		
		arrElement[i].style.left = arr[i].left + "px";
		
		arrElement[i].style.top = arr[i].top + "px";
			
	}

}


