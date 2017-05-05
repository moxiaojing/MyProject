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
		$(this).addClass("click");
	})
	$("#nav-all").hover(function(){
		$(this).addClass("hover")
	},function(){
		$(this).removeClass("hover")
	});
	$('#feed_btn').click(function(){
		$("#feedBack").show('slow');
	});
	$('#h-web').hover(function(){
		if($(this).hasClass('header-tel-hover')){
			$(this).removeClass('header-tel-hover')
		}else{
			$(this).addClass('header-tel-hover')
		}
	});
	$('#fixwin-close').click(function(){
		$("#feedBack").hide();
	});
	$('#backTop').click(function(){
		$('html,body').animate({scrollTop:0},300);
	});
	function backTop(){
		var top=$(document).scrollTop();
		var winh=$(window).height();
		var $backToTopEle=$('#backTop');
		(top>0)? $backToTopEle.show():$backToTopEle.fadeOut("slow");;
		 //IE6下的定位
        if (!window.XMLHttpRequest) {
            $backToTopEle.css("top", st + winh - 166);
        }
	}
	$(window).bind('scroll',backTop);
	$(".rank-con").find(".top-li-lef").find("a").each(function(i,e){
		var con=e.innerHTML;
		if(con.length>22){
			e.innerHTML=con.substring(0,21)+"...";
		}
	});
	
});
