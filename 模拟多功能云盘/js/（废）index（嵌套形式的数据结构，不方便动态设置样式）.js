window.onload=function(){
	
	var date=[
		{
			name:"微云",
			children:[
				{
					name:"js课程",
					children:[
						{
							name:"123文件夹",
							children:[
								{
									name:"111",
									children:[
										{
											name:"222"
										}
									]
								}
							]
						},
						{
							name:"456文件夹",
							children:[
								{
									name:"444"
								},
								{
									name:"555"
								}
							]
						}
					]
				},
				{
					name:"css课程",
					children:[
					{
						name:"789文件夹"
					}
					]
				}
			]
		}
	]
	var list=document.getElementById("list");
	function create(obj){//生成li
		
		var str="";
		for (var i = 0; i < obj.length; i++) {
			str+="<li><h3>";
			
			if(obj[i].children){
				str+="<em class='sanjiao' style='margin-left:"+obj[i].children*10+"px'>";
			}else{
				str+="<em>";
			}
			
			str+="</em><a class='ico_file'></a><span>"+ obj[i].name+"</span></h3>";
			
			if(obj[i].children){
				
				str+="<ul>"+create(obj[i].children)+"</ul>";
			}
			
			str+="</li>";
		}
		return str;
	}
	
	list.innerHTML=create(date);
	
	var aH3=list.getElementsByTagName("h3");

	for(var i=0;i<aH3.length;i++){
		aH3[i].onOff=true;//表示收起状态
		aH3[i].onclick=function(){	
			if(this.nextElementSibling){
				if(this.onOff){//当前是收起的状态，点击后展开
					
					closeBrother(this);//清空所有状态，之后在给当前点击添加状态
					
					this.style.background="red";
					this.nextElementSibling.style.display="block";
					this.onOff=false;
					
				}else{//当前是展开的状态，点击之后收起来，包括它的所有子级元素状态都要取消
					closeChild(this);
				}
			}
	//	console.log(aH3[0].onOff,aH3[1].onOff,aH3[2].onOff,aH3[3].onOff,aH3[4].onOff,aH3[5].onOff)
		}
	}
	
	function closeChild(obj){//父子级之间的切换
		//获取当前obj的父级li里面的所有子级h2，也包括obj自己
		var h3s=obj.parentNode.getElementsByTagName('h3');
		for(var i=0;i<h3s.length;i++){
			if(h3s[i].nextElementSibling){
				h3s[i].style.background="";
				h3s[i].nextElementSibling.style.display="none";
				h3s[i].onOff=true;
			}
		}
	}
	
	function closeBrother(obj){//同级之间的切换,包括它自己，利用的是全部清空之后，再添加状态
		
		//获取当前obj的父级li的父级ul里面的所有h2，包括obj自己
		var aH3s=obj.parentNode.parentNode.getElementsByTagName('h3');
		for(var i=0;i<aH3s.length;i++){//清空所有状态
			if(aH3s[i].nextElementSibling){
				aH3s[i].style.background="";
				aH3s[i].nextElementSibling.style.display="none";
				aH3s[i].onOff=true;
				
			}
		}
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
