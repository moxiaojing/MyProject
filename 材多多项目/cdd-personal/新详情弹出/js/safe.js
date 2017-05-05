$(function(){
		$(".new-password").bind("blur",function(){
			if($(this).val().trim().match(/^(?!\d+$)(?![A-Za-z]+$)[a-zA-Z0-9]{6,}$/)){
				$(this).parent("div").children(".input-tip").hide();
			}else{
				$(this).parent("div").children(".input-tip").show();
			}
		});
		$(".again-password").bind("blur",function(){
			if($(this).val().trim()&&$(this).val().trim()==$(".new-password").val().trim()){
				$(this).parent("div").children(".input-tip").hide();
			}else{
				$(this).parent("div").children(".input-tip").show();
			}
		});
		(function(n){
			if(n){
				var timer=setInterval(function(){
				n--;
				if(n<1){
					clearInterval(timer)
					location.href = '登录页面'; return false;
				}
				$(".succ-tip>em").html(n);
			},1000)}
		})($(".succ-tip>em").text());
		$(".vc-btn").bind("click",function(){
				var n=60;
				$(this).attr("disabled",true);
				$(this).val("("+n+"s)后重新获取");
				$(this).addClass("vcclick");
				var vctimer=setInterval(function(){
					n--;
					if(n<1){
						$(".vc-btn").val("重新获取验证码");
						$(".vc-btn").removeAttr("disabled");
						$(".vc-btn").removeClass("vcclick");
						clearInterval(vctimer);
						return false;
					}
					$(".vc-btn").val("("+n+"s)后重新获取");
				},1000);
		})
});