window.onload=function(){
	var base=$(document).width();
	$(".fill").css("width",(base-780)/2+"px");

	$(window).resize(function(){
		base=$(document).width();
		$(".fill").css("width",(base-780)/2+"px");
	});

	var scrollFlag=0;
	//0表示视窗在最顶，1表示不在最顶
	$(window).scroll(function(){
		var top=$(window).scrollTop();
		var flag;
		if(top>0){
			flag=1;
		}
		else {
			flag=0;
		}
		//从顶滑下
		if(flag==1&&scrollFlag!=flag){
			$("#intro_top").hide();
			$("#nav_top").css("background-color","rgba(102,153,255,0.8)");
			$("#search").css("margin-top","15px");
			$("#lr").css("margin-top","17px");
			$("#user").css("margin-top","0px");
			scrollFlag=1;
		}
		//从下滑到顶
		else if(flag==0&&scrollFlag!=flag){
			$("#intro_top").show();
			$("#nav_top").css("background-color","rgba(102,153,255,1)");
			$("#search").css("margin-top","25px");
			$("#lr").css("margin-top","27px");
			$("#user").css("margin-top","10px");
			scrollFlag=0;
		}
	});

	//顶栏
	$("#list_top li:eq(0)").mouseover(function(){
		$("#list_top img:eq(0)").attr({"src":"/static/img/settings2.png"});
	});
	$("#list_top li:eq(1)").mouseover(function(){
		$("#list_top img:eq(1)").attr({"src":"/static/img/pen2.png"});
	});
	$("#list_top li:eq(2)").mouseover(function(){
		$("#list_top img:eq(2)").attr({"src":"/static/img/paperplane2.png"});
	});
	$("#list_top li:eq(0)").mouseout(function(){
		$("#list_top img:eq(0)").attr({"src":"/static/img/settings.png"});
	});
	$("#list_top li:eq(1)").mouseout(function(){
		$("#list_top img:eq(1)").attr({"src":"/static/img/pen.png"});
	});
	$("#list_top li:eq(2)").mouseout(function(){
		$("#list_top img:eq(2)").attr({"src":"/static/img/paperplane.png"});
	});

	//弹出框
	$("#log").click(function(){
		$("#log_box,#log_button").css({left:"0px"});
		$("#popup,#lr_box,#log_box,#log_button").show();
		$("#move_stick").css("left",0);
		//var h=parseInt($("#lr_box").css("height"));
		//$("#lr_box").css({top:"50%",marginTop:-h/2+"px"});
	});
	$("#reg").click(function(){
		$("#reg_box,#reg_button").css({left:"0px"});
		$("#popup,#lr_box,#reg_box,#reg_button").show();
		$("#move_stick").css("left","88px");
		//var h=parseInt($("#lr_box").css("height"));
		//$("#lr_box").css({top:"50%",marginTop:-h/2+"px"});
	});
	$("#login").click(function(){
		if($("#move_stick").css("left")=="88px"){
			$("#log_box,#log_button").css({left:"-450px"});
			$("#reg_box,#reg_button").animate({left:"450px"},300);
			setTimeout(function(){
				$("#reg_box,#reg_button").hide();
				$("#log_box,#log_button").show();
				$("#log_box,#log_button").animate({left:"0px"},300);
			},300);
			$("#move_stick").animate({left:0},200);
		}
	});
	$("#regis").click(function(){
		if($("#move_stick").css("left")=="0px"){
			$("#reg_box,#reg_button").css({left:"450px"});
			$("#log_box,#log_button").animate({left:"-450px"},300);
			setTimeout(function(){
				$("#log_box,#log_button").hide();
				$("#reg_box,#reg_button").show();
				$("#reg_box,#reg_button").animate({left:"0px"},300);
			},300);
			$("#move_stick").animate({left:"88px"},200);
		}
	});
	$("#close,#popup_bottom").click(function(){
		$("#popup,#lr_box,#log_box,#reg_box,#log_button,#reg_button,#origin_pic").hide();
	});
	$(".pic_box img").click(function(){
		$("#popup,#origin_pic").show();
		$("#origin_pic img").attr(src);
		var h=parseInt($("#origin_pic").css("height"));
		$("#origin_pic").css({top:"50%",marginTop:-h/2+"px"});
	});

	//正文区点击
	//标题
	$(".title .summary").click(function(){
		window.open("./article.html","_self");
	});
	//图片滚动事件
	var picbox=document.getElementsByClassName("pic_box");
	var num=0,t;
	function picSlide(e){
		e=e||window.event;
		e.preventDefault();
		var d=e.wheelDelta?e.wheelDelta:e.detail;
    	var len=$("img",this).length;
    	var w=parseInt($("img",this).css("width"))+9;
    	var n=0;
    	if(d>0)n=1;
    	else n=-1;
    	$("img",this).stop(true,true);
    	var left=parseInt($("img:first",this).css("left"));
    	if((left>w-1&&n>0)||(left<-w*(len-2)+1&&n<0))
    		return;
    	$("img",this).animate({left:"+="+n*w+"px"},"fast");
    }
    for(var i=0;i<picbox.length;i++){
		picbox[i].onmousewheel=picSlide;
	}
};