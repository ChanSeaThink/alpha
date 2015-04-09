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
		var src=$("#list_top img:eq(0)").attr("src");
		var src2=src.replace(/settings/,"settings2");
		$("#list_top img:eq(0)").attr({"src":src2});
	});
	$("#list_top li:eq(1)").mouseover(function(){
		var src=$("#list_top img:eq(1)").attr("src");
		var src2=src.replace(/pen/,"pen2");
		$("#list_top img:eq(1)").attr({"src":src2});
	});
	$("#list_top li:eq(2)").mouseover(function(){
		var src=$("#list_top img:eq(2)").attr("src");
		var src2=src.replace(/paperplane/,"paperplane2");
		$("#list_top img:eq(2)").attr({"src":src2});
	});
	$("#list_top li:eq(0)").mouseout(function(){
		var src=$("#list_top img:eq(0)").attr("src");
		var src2=src.replace(/settings2/,"settings");
		$("#list_top img:eq(0)").attr({"src":src2});
	});
	$("#list_top li:eq(1)").mouseout(function(){
		var src=$("#list_top img:eq(1)").attr("src");
		var src2=src.replace(/pen2/,"pen");
		$("#list_top img:eq(1)").attr({"src":src2});
	});
	$("#list_top li:eq(2)").mouseout(function(){
		var src=$("#list_top img:eq(2)").attr("src");
		var src2=src.replace(/paperplane2/,"paperplane");
		$("#list_top img:eq(2)").attr({"src":src2});
	});
	$("#list_top li:eq(0)").click(function(){
		window.open("/writting","_self");
	});
	$("#list_top li:eq(2)").click(function(){
		var form=document.createElement("form");
		form.method="get";
		form.action="/logout";
		form.submit();
	});

	//弹出框
	$("#log").click(function(){
		$("#log_box,#log_button").css({left:"0px"});
		$("#popup,#lr_box,#log_box,#log_button").show();
		$("#lr_title p").css("left","-2px");
		$("#lr_box input").val("");
		$(".account p,.code_check p:eq(1)").text("");
		$(".code_check:eq(0) img").attr({"src":"/getCAPTCHA/?nocache="+Math.random()});
		$("#log_box input:eq(0)").focus();
		//var h=parseInt($("#lr_box").css("height"));
		//$("#lr_box").css({top:"50%",marginTop:-h/2+"px"});
	});
	$("#reg").click(function(){
		$("#reg_box,#reg_button").css({left:"0px"});
		$("#popup,#lr_box,#reg_box,#reg_button").show();
		$("#lr_title p").css("left","87px");
		$("#lr_box input").val("");
		$(".account p,.code_check p:eq(1)").text("");
		$(".code_check:eq(1) img").attr({"src":"/getCAPTCHA/?nocache="+Math.random()});
		$("#reg_box input:eq(0)").focus();
		//var h=parseInt($("#lr_box").css("height"));
		//$("#lr_box").css({top:"50%",marginTop:-h/2+"px"});
	});
	$("#login").click(function(){
		if($("#lr_title p").css("left")=="87px"){
			$("#log_box,#log_button").css({left:"-450px"});
			$("#reg_box,#reg_button").animate({left:"450px"},300);
			setTimeout(function(){
				$("#reg_box,#reg_button").hide();
				$("#log_box,#log_button").show();
				$("#log_box,#log_button").animate({left:"0px"},300);
			},300);
			setTimeout(function(){
				$("#log_box input:eq(0)").focus();
				$(".code_check:eq(0) img").attr({"src":"/getCAPTCHA/?nocache="+Math.random()});
			},600);
			$("#lr_title p").animate({left:"-2px"},200);
		}
		else {
			$("#log_box input:eq(0)").focus();
		}
	});
	$("#regis").click(function(){
		if($("#lr_title p").css("left")=="-2px"){
			$("#reg_box,#reg_button").css({left:"450px"});
			$("#log_box,#log_button").animate({left:"-450px"},300);
			setTimeout(function(){
				$("#log_box,#log_button").hide();
				$("#reg_box,#reg_button").show();
				$("#reg_box,#reg_button").animate({left:"0px"},300);
			},300);
			setTimeout(function(){
				$("#reg_box input:eq(0)").focus();
				$(".code_check:eq(1) img").attr({"src":"/getCAPTCHA/?nocache="+Math.random()});
			},600);
			$("#lr_title p").animate({left:"87px"},200);
		}
		else {
			$("#reg_box input:eq(0)").focus();
		}
	});
	$(".code_check:eq(0) img,.code_check:eq(0) > p").click(function(){
		$(".code_check:eq(0) img").attr({"src":"/getCAPTCHA/?nocache="+Math.random()});
	});
	$(".code_check:eq(1) img,.code_check:eq(1) > p").click(function(){
		$(".code_check:eq(1) img").attr({"src":"/getCAPTCHA/?nocache="+Math.random()});
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
	//submit时判断框内数据是否符合要求
	$("#log_box").submit(function(e){
		if(!($("#log_box input:eq(0)").val())){
			$("#log_box p:eq(0)").text("值为空！");
			flag1[0]=0;
		}
		if(!($("#log_box input:eq(1)").val())){
			$("#log_box p:eq(1)").text("值为空！");
			flag1[1]=0;
		}
		if($("#log_box input:eq(2)").val().length!=4){
			$("#log_box p:eq(3)").text("位数不够！");
			flag1[2]=0;
		}
		else{
			flag1[2]=1;
		}
		if(flag1[0]==0||flag1[1]==0||flag1[2]==0){
			e.preventDefault();
		}
	});
	$("#reg_box").submit(function(e){
		if(!($("#reg_box input:eq(0)").val())){
			$("#reg_box p:eq(0)").text("值为空！");
			flag2[0]=0;
		}
		if(!($("#reg_box input:eq(1)").val())){
			$("#reg_box p:eq(1)").text("值为空！");
			flag2[1]=0;
		}
		if(!($("#reg_box input:eq(2)").val())){
			$("#reg_box p:eq(2)").text("值为空！");
			flag2[2]=0;
		}
		if($("#reg_box input:eq(3)").val().length!=4){
			$("#reg_box p:eq(4)").text("位数不够！");
			flag2[3]=0;
		}
		else{
			flag2[3]=1;
		}
		if(flag2[0]==0||flag2[1]==0||flag2[2]==0||flag2[3]==0){
			e.preventDefault();
		}
	});
	$("#log_button").click(function(){
		var email=$("#log_box input:eq(0)").val();
		var password=$("#log_box input:eq(1)").val();
		var code=$("#log_box input:eq(2)").val();
		if(!(email)){
			$("#log_box p:eq(0)").text("值为空！");
			flag1[0]=0;
		}
		if(!(password)){
			$("#log_box p:eq(1)").text("值为空！");
			flag1[1]=0;
		}
		if(code.length!=4){
			$("#log_box p:eq(3)").text("位数不够！");
			flag1[2]=0;
		}
		else{
			flag1[2]=1;
		}
		if(flag1[0]==1&&flag1[1]==1&&flag1[2]==1){
			var xmlhttp=new XMLHttpRequest();
			xmlhttp.open("POST","/login",false);
			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xmlhttp.send("email="+email+"&password="+password+"&valicode="+code);
			if(xmlhttp.responseText.charAt(0)=="{"){
				var AjaxObj=eval("("+xmlhttp.responseText+")");
				if(AjaxObj.email){
					$("#log_box p:eq(0)").text(AjaxObj.email);
				}
				else if(AjaxObj.password){
					$("#log_box p:eq(1)").text(AjaxObj.password);
				}
				else if(AjaxObj.valicode){
					$("#log_box p:eq(3)").text(AjaxObj.valicode);
				}
				else if(AjaxObj.status=="success"){
					window.open("/index","_self");
				}
			}
		}
	});
	$("#reg_button").click(function(){
		var email=$("#reg_box input:eq(0)").val();
		var username=$("#reg_box input:eq(1)").val();
		var password=$("#reg_box input:eq(2)").val();
		var code=$("#reg_box input:eq(3)").val();
		if(!(email)){
			$("#reg_box p:eq(0)").text("值为空！");
			flag2[0]=0;
		}
		if(!(username)){
			$("#reg_box p:eq(1)").text("值为空！");
			flag2[1]=0;
		}
		if(!(password)){
			$("#reg_box p:eq(2)").text("值为空！");
			flag2[2]=0;
		}
		if(code.length!=4){
			$("#reg_box p:eq(4)").text("位数不够！");
			flag2[3]=0;
		}
		else{
			flag2[3]=1;
		}
		if(flag2[0]==1&&flag2[1]==1&&flag2[2]==1&&flag2[3]==1){
			var xmlhttp=new XMLHttpRequest();
			xmlhttp.open("POST","/regist",false);
			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xmlhttp.send("email="+email+"&username="+username+"&password="+password+"&valicode="+code);
			if(xmlhttp.responseText.charAt(0)=="{"){
				var AjaxObj=eval("("+xmlhttp.responseText+")");
				if(AjaxObj.email){
					$("#reg_box p:eq(0)").text(AjaxObj.email);
				}
				else if(AjaxObj.username){
					$("#reg_box p:eq(1)").text(AjaxObj.username);
				}
				else if(AjaxObj.password){
					$("#reg_box p:eq(2)").text(AjaxObj.password);
				}
				else if(AjaxObj.valicode){
					$("#reg_box p:eq(4)").text(AjaxObj.valicode);
				}
				else if(AjaxObj.status=="success"){
					window.open("/index","_self");
				}
			}
		}
	});
	//登录注册输入框字符检测
	var pattern1=/[^!-z]/,
	pattern2=/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
	pattern3=/^[\u4e00-\u9fa5A-Za-z0-9_]+$/,
	pattern4=/[^a-zA-Z0-9]/;
	var flag1=new Array(),flag2=new Array();
	$("#log_box input:eq(0)").on({
		"input":function(){
			var str=$(this).val();
			if(pattern1.test(str)){
				$("#log_box p:eq(0)").text("字符有误");
				flag1[0]=0;
			}
			else {
				$("#log_box p:eq(0)").text("");
				flag1[0]=1;
			}
		},
		"blur":function(){
			var str=$(this).val();
			if(str&&!pattern2.test(str)){
				$("#log_box p:eq(0)").text("邮箱格式有误");
				flag1[0]=0;
			}
		}
	});
	$("#log_box input:eq(1)").on("input",function(){
		var str=$(this).val();
		if(pattern1.test(str)){
			$("#log_box p:eq(1)").text("字符有误");
			flag1[1]=0;
		}
		else {
			$("#log_box p:eq(1)").text("");
			flag1[1]=1;
		}
	});
	$("#log_box input:eq(2)").on({
		"input":function(){
			var str=$(this).val();
			if(pattern4.test(str)){
				$("#log_box p:eq(3)").text("字符有误");
				flag1[1]=0;
			}
			else {
				$("#log_box p:eq(3)").text("");
				flag1[1]=1;
			}
		},
		"blur":function(){
			var str=$(this).val();
			if(str.length!=4){
				$("#log_box p:eq(3)").text("位数不够！");
				flag1[2]=0;
			}
			else{
				flag1[2]=1;
			}
		}
	});
	$("#reg_box input:eq(3)").on({
		"input":function(){
			var str=$(this).val();
			if(pattern4.test(str)){
				$("#reg_box p:eq(4)").text("字符有误");
				flag1[1]=0;
			}
			else {
				$("#reg_box p:eq(4)").text("");
				flag1[1]=1;
			}
		},
		"blur":function(){
			var str=$(this).val();
			if(str.length!=4){
				$("#reg_box p:eq(4)").text("位数不够！");
				flag1[2]=0;
			}
			else{
				flag1[2]=1;
			}
		}
	});
	$("#reg_box input:eq(0)").on({
		"input":function(){
			var str=$(this).val();
			if(pattern1.test(str)){
				$("#reg_box p:eq(0)").text("字符有误");
				flag2[0]=0;
			}
			else {
				$("#reg_box p:eq(0)").text("");
				flag2[0]=1;
			}
		},
		"blur":function(){
			var str=$(this).val();
			if(str&&!pattern2.test(str)){
				$("#reg_box p:eq(0)").text("邮箱格式有误");
				flag2[0]=0;
			}
		}
	});
	$("#reg_box input:eq(1)").on("input",function(){
		var str=$(this).val();
		if(str&&!pattern3.test(str)){
			$("#reg_box p:eq(1)").text("字符有误");
			flag2[1]=0;
		}
		else {
			$("#reg_box p:eq(1)").text("");
			flag2[1]=1;
		}
	});
	$("#reg_box input:eq(2)").on({
		"input":function(){
			var str=$(this).val();
			if(pattern1.test(str)){
				$("#reg_box p:eq(2)").text("字符有误");
				flag2[2]=0;
			}
			else {
				$("#reg_box p:eq(2)").text("");
				flag2[2]=1;
			}
		},
		"blur":function(){
			var str=$(this).val();
			if(str.length<8){
				$("#reg_box p:eq(2)").text("密码长度至少为8位");
				flag2[2]=0;
			}
		}
	});

	//正文区点击
	//标题
	$(".title .summary").click(function(){
		window.open("./article","_self");
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