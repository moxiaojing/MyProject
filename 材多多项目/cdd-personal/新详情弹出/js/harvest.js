$(function(){
		$(".a-default").children(".write").bind("click",function(){
			$("#alert").addClass("add");
			$("#harvest-title").text("编辑收货人信息");
			return false;
		})
		$(".ad-new").children(".exit").bind("click",function(){
			$("#alert").addClass("delete");
		})
		$(".a-default").children(".delete").bind("click",function(){
			$("#alert").addClass("delete");
			return false;
		})
		$("#new-goods-address").bind("click",function(){
			$("#alert").addClass("add");
			$("#harvest-title").text("新增收货人信息");
		})
		$(".openwin-close").click(function(){
			$("#alert").removeClass("delete");
			});
		//这个是弹出框的退出，我给input都清空了
		$("#alert-exit").bind("click",function(){
			$("#alert").find(".item").find("input").val("");
			$("#alert").removeClass("add");
		})
		$(".select").bind("click",function(){
			$(".select").removeClass("click");
			$(this).addClass("click");
			if($(this).children("ul").height()>200){
				$(this).children("ul").addClass("scroll")
			}
			return false;
		})
		$(document).bind("click",function(){
				$(".select").removeClass("click");
			})
		$("#more-list").children(".add-list").bind("click",function(){
			$("#more-list").children(".add-list").removeClass("click")
			$(this).addClass("click");
			console.log();
		})
		$("#more-list").find(".exit").bind("click",function(){
			$(this).parent().parent().removeClass("click");
			return false;
		})
		$("#alert").find(".item").find("input").focus(function(){
			$(this).parent().addClass("foucs");
		});
		$("#alert").find(".item").find("input").blur(function(){
			$(this).parent().removeClass("foucs");
		});
});