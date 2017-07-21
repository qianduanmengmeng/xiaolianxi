// JavaScript Document

function $( v ){                          //相当于var
	if( typeof v === 'function' ){
		window.onload = v;
	} else if ( typeof v === 'string' ) {
		return document.getElementById(v);
	} else if ( typeof v === 'object' ) {
		return v;
	}
}

function getStyle( obj, attr ){             //获取style 的属性
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle( obj )[attr];
}

function addZ(iNum){          //时分秒，00:00:00 使其都为两位数
	return iNum<10? "0"+iNum : ""+iNum;
}

function doMove(obj,end,speed,how,endFn){         //上下左右的移动
	var oldAttr=parseInt(getStyle(obj,how));
    if(end<oldAttr){
		speed=-speed;
	}
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var nowAttr=parseInt(getStyle(obj,how))+speed;
		if(nowAttr>=end&&speed>0||nowAttr<=end&&speed<0){
			obj.style[how]=end+"px";
			clearInterval(obj.timer);
			//if(endFn){endFn();}
			setTimeout(function(){endFn&&endFn();},0)
			
		} else{
		    obj.style[how]=nowAttr+"px";	
		}	
	},30)
}

var bOnOff=true;
function shake(obj,attr,endFn){        //抖动
	
	if(bOnOff){
		obj.timer=null;
		var arr=[]; 
		for(var i=10;i>0;i-=2){
			arr.push(i,-i)                          //生成数组
		}; 
		arr.push(0);
		var oldAttr=parseInt(getStyle(obj,attr));   //获取元素位置
		var j=0;
		obj.timer=setInterval(function(){
			obj.style[attr]=oldAttr+arr[j]+"px";     //抖动过程的位置
			if(j==arr.length-1){
				clearInterval(obj.timer);         //当抖动结束时关闭计数器,并重新打开开关，如果有回调函数就执行
				bOnOff=!bOnOff;
				setTimeout(function(){endFn&&endFn()});
			}
			j++;
		},45)
		bOnOff=!bOnOff; 
	}
	                      //开始抖动时关闭开关
}