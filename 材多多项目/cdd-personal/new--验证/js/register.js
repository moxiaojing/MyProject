$(function(){
		$(".input").each(function(i,e){
			if($(e).val().trim()){
				$(e).addClass("blur");
			}
		});
		$(".input").bind("blur",function(){
			if($(this).val().trim()){$(this).addClass("blur");}else{$(this).attr("value","");}
			return false;
		});
		$(".input").bind("focus",function(){
				$(this).removeClass("blur");
			return false;
		})
});