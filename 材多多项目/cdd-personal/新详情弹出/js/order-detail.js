$(function(){
		$(".s-order").bind("click",function(){
			$(".mask").addClass("p-Goods");
			return false;
		})
		$(".c-order").bind("click",function(){
			$(".mask").addClass("p-cancel");
			return false;
		})
		$(".d-order").bind("click",function(){
			$(".mask").addClass("p-delete");
			return false;
		})
});