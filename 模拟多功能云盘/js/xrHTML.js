var create={
/*------------生成树形菜单----------------------------------------*/
	createTree:function( id ){
		var arr = handle.getchildren( id );
		var str="";
		if( arr.length > 0 ){//如果arr不是[],就执行下面的语句
			str = "<ul>";
			arr.forEach( function( a ){//遍历arr数组，a表示数组的每一项
				//判断是不是要加上三角ico
				var arr2 = handle.getchildren( a.id );//找子级
				var sanjiaoClassName = arr2.length ? "sanjiaoOpen" : "sanjiaoNone";
				var arr3 = handle.findPatentNode( a.id );//找祖先级，有几个祖先div的margin-left就对应是10的几倍
				str += "<li><h3 data-id='"+ a.id +"' >";
//				str += "<li><h3 data-id="+ a.id +" >";
				str+="<div style='margin-left:"+( ( arr3.length )*10) +"px'><em class="+ sanjiaoClassName +" >";
				str+="</em><span>"+a.name+"</span></div></h3>";
				str +=  create.createTree( a.id );//传入新的id值，生成下一级的ul和li
				str += "</li>";
				
			} )
			str += "</ul>";
		}
		return str;
	},
/*----------生成nav导航--------------------------------------------------------*/
	createNav:function( id ){
		var str = "";
		var arr = handle.findPatentNode( id ).reverse();//颠倒arr的顺序，重新赋值给arr
		arr.forEach( function( a,b ){
			if( b == (arr.length-1) ){
				str+="<span class='nav_seclect'><a data-index="+a.id+" class='hover'>"+ a.name +"</a></span>";
			}else{
				str+="<span><a data-index="+a.id+">"+ a.name +"</a></span>";
			}
		})
		return str;
	},
/*-----------生成文件夹----------------------------------------------------------*/
	createFiles:function( id ){
		var str = "";
		if( handle.getchildren( id ) ){
			handle.getchildren( id ).forEach(function( item ){
				str += '<li data-id='+ item.id +' data-a=0><div class="checkbox" data-onoff=0></div><input type="text" value="'+ item.name +'" /></li>';
			
			})
		}
		return str;
	}
}	
