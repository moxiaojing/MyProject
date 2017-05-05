$(function(){
	$("#my-duoduo").hover(function(){
		$(this).removeClass("my-duoduo");
		$(this).addClass("my-duoduo-hover");
	},function(){
		$(this).addClass("my-duoduo");
		$(this).removeClass("my-duoduo-hover");
	})
	$("#weixin").hover(function(){
		$(this).addClass("hover");
	},function(){
		$(this).removeClass("hover");
	})
	$("#my-shopping-car").hover(function(){
		$(this).removeClass("my-shopping");
		$(this).addClass("my-shopping-hover")
	},function(){
		$(this).addClass("my-shopping");
		$(this).removeClass("my-shopping-hover")
	})
	$("#fixed-nav>li").hover(function(){
		$(this).addClass("hover");
	},function(){
		$(this).removeClass("hover");
	})
	$("#fixed-back").bind("click",function(){
		$(".alerts").addClass("click");
	})
	function AutoResizeImage(maxWidth,maxHeight,objImg){
		img.src = objImg.src;
		var hRatio;
		var wRatio;
		var Ratio = 1;
		var w = img.width;
		var h = img.height;
		wRatio = maxWidth / w;
		hRatio = maxHeight / h;
		if (maxWidth ==0 && maxHeight==0){
		Ratio = 1;
		}else if (maxWidth==0){//
		if (hRatio<1) Ratio = hRatio;
		}else if (maxHeight==0){
		if (wRatio<1) Ratio = wRatio;
		}else if (wRatio<1 || hRatio<1){
		Ratio = (wRatio<=hRatio?wRatio:hRatio);
		}
		if (Ratio<1){
		w = w * Ratio;
		h = h * Ratio;
		}
		objImg.height = h;
		objImg.width = w;
	}
	!function () {
		var img=$(".sect-img").find("img");
		var maxheight=$(".sect-img")[0].offsetHeight;
		var maxwidth=$(".sect-img")[0].offsetWidth;
		img.each(function(i,e){
			AutoResizeImage(maxwidth,maxheight,e)
		});
	} ();
});
