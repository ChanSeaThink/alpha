

window.onload=function(){

	$(window).resize(function(){
		base=$(document).width();
		$(".fill").css("width",(base-600)/2+"px");
	});

	//顶栏
	$("#list_edit").mouseover(function(){
		var src=$("#list_edit img").attr("src");
		var src2=src.replace(/pen/,"pen2");
		$("#list_edit img").attr({"src":src2});
	});
	$("#list_setting").mouseover(function(){
		var src=$("#list_setting img").attr("src");
		var src2=src.replace(/settings/,"settings2");
		$("#list_setting img").attr({"src":src2});
	});
	$("#list_logout").mouseover(function(){
		var src=$("#list_logout img").attr("src");
		var src2=src.replace(/paperplane/,"paperplane2");
		$("#list_logout img").attr({"src":src2});
	});
	$("#list_edit").mouseout(function(){
		var src=$("#list_edit img").attr("src");
		var src2=src.replace(/pen2/,"pen");
		$("#list_edit img").attr({"src":src2});
	});
	$("#list_setting").mouseout(function(){
		var src=$("#list_setting img").attr("src");
		var src2=src.replace(/settings2/,"settings");
		$("#list_setting img").attr({"src":src2});
	});
	$("#list_logout").mouseout(function(){
		var src=$("#list_logout img").attr("src");
		var src2=src.replace(/paperplane2/,"paperplane");
		$("#list_logout img").attr({"src":src2});
	});
	$("#list_edit").click(function(){
		window.open($("#article").attr("data-url"),"_self");
	});
	$("#list_setting").click(function(){
		window.open("/setting","_self");
	});
	$("#list_logout").click(function(){
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
					window.location.reload();
				}
			}
			else{
				alert("服务器返回数据有误");
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
					window.location.reload();
				}
			}
			else{
				alert("服务器返回数据有误");
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

	//随拉动条变化
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
		if(scrollFlag==flag){
			return;
		}
		else{
			//从顶滑下
			if(flag==1){
				$("#nav_top").css("background-color","rgba(102,153,255,0.8)");
				scrollFlag=1;
			}
			//从下滑到顶
			else if(flag==0){
				$("#nav_top").css("background-color","rgba(102,153,255,1)");
				scrollFlag=0;
			}
		}
	});
	//返回按钮
	$("#backwards").click(function(){
		window.open("/index","_self");
	});
	

	//评论栏功能
	var comment=document.getElementById("comment");
	var pos=0;
	for(var i=0;i<$("#expression img").length;i++){
		$("#expression img:eq("+i+")").click(function(){
			if(window.getSelection().containsNode(comment,true)){
				var img=document.createElement("img");
				img.src=this.src;
				var range=window.getSelection().getRangeAt(0);
				range.insertNode(img);
			}
		});
	}
	comment.onpaste=function(e){
		var data=e.clipboardData;
		document.execCommand("insertText",false,data.getData("text/plain"));
		for(var i=0;i<$("#comment p").length;i++){
				var s=$("#comment p:eq("+i+")").html();
				if(s.charCodeAt(0)==13){
					$("#comment p:eq("+i+")").html("<br>");
				}
				else if(s.charCodeAt(s.length-1)==13){
					$("#comment p:eq("+i+")").html(s.slice(0,-1));
				}
			}
		e.preventDefault();
	}
	comment.oninput=function(){
		if(!($("#comment").text())){
			$("#comment").html("<p> </p><p><br></p>");
			setTimeout(function(){
				$("body").focus();
				var r=document.createRange();
				r.setStart(comment.childNodes[1],0);
				r.setEnd(comment.childNodes[1],0);
				window.getSelection().removeAllRanges();
				window.getSelection().addRange(r);
			},1);
		}
	}

	//send message
	//*
	$("#send_message").click(function(){
		var words=$("#comment").text().replace(/\s/g,"").length;
		if(words==0||words>500){
			alert("字数需在500以内");
			return;
		}
		$.ajax({
			url:"/saveComment",
			type:"post",
			data:{"commentText":$("#comment").html()},
			success:function(data){
				$("#comment").html("<p> </p><p><br></p>");
				$("#comments_area").html(data.html);
				$(window).scrollTop($("#comments_area").offset().top-90);
				$("#page").html("");
				pageCount=1;
				showPage(data.commentCount,"page",pageCount);
				$("#page div:first").click();
				$("#page div").click(pageClick);
			},
			error:function(){
				alert("发送评论出错");
			}
		});
	});
	//*/


	//函数
		function showPage(num,id,pn){
			//根据显示项数目生成Ajax式页码栏
			var n=parseInt(num);
			if(n<=10){
				return;
			}
			var max=10;
			var half=Math.floor((max-1)/2);
			var pages=Math.ceil(n/10);
			var gridrecord=0;
			var grid,pagerecord=1;
			if(pages<=max){
				for(var i=1;i<=pages;i++){
					$("#"+id).append("<div>"+i+"</div>");
				}
				$("#"+id).append("<div>></div>");
				grid=pages;
				$("#"+id+" div").click(function(){
					if(pn){
						c=parseInt(pn);
					}
					else{
						var c=parseInt($(this).text());
					}
					if(!c){
						if(pagerecord<pages)
							c=pagerecord+1;
						else
							return;
					}
					//$("#"+id+" div:eq("+gridrecord+")").css("background-color","white");
					$("#"+id+" div:eq("+(c-1)+")").css("background-color","#c1c1c1");
					gridrecord=c-1;
					pagerecord=c;
				});
			}
			else{
				for(var i=1;i<=max-1;i++){
					$("#"+id).append("<div>"+i+"</div>");
				}
				$("#"+id).append("<div>...</div><div>"+pages+"</div>")
				$("#"+id).append("<div>></div>");
				grid=max+1;
				$("#"+id+" div").click(function(){
					if(pn){
						var c=pn;
					}
					else{
						var c=$(this).text();
					}
					if(c==">"){
						if(pagerecord<pages)
							c=pagerecord+1;
						else
							return;
					}
					else if(c=="..."){
						if($(this).prev().text()=="1"){
							c=pagerecord-4;
						}
						else{
							c=pagerecord+4;
						}
					}
					else{
						c=parseInt(c);
					}
					if(c-half>2&&c+half<pages-1){
						$("#"+id+" div:eq("+1+")").text("...");
						$("#"+id+" div:eq("+(max-1)+")").text("...");
						for(var i=2;i<(max-1);i++){
							$("#"+id+" div:eq("+i+")").text(i+c-(half+1));
						}
						//$("#"+id+" div:eq("+gridrecord+")").css("background-color","white");
						$("#"+id+" div:eq("+(half+1)+")").css("background-color","#c1c1c1");
						gridrecord=(half+1);
					}
					else if(c-half<=2){
						$("#"+id+" div:eq("+(max-1)+")").text("...");
						for(var i=1;i<(max-1);i++){
							$("#"+id+" div:eq("+i+")").text(i+1);
						}
						//$("#"+id+" div:eq("+gridrecord+")").css("background-color","white");
						$("#"+id+" div:eq("+(c-1)+")").css("background-color","#c1c1c1");
						gridrecord=c-1;
					}
					else if(c+half>=pages-1){
						$("#"+id+" div:eq("+1+")").text("...");
						for(var i=2;i<max;i++){
							$("#"+id+" div:eq("+i+")").text(i+pages-max);
						}
						//$("#"+id+" div:eq("+gridrecord+")").css("background-color","white");
						$("#"+id+" div:eq("+(max-(pages-c))+")").css("background-color","#c1c1c1");
						gridrecord=max-(pages-c);
					}
					else{
						alert("Error!")
					}
					pagerecord=c;
				});
			}
			
		}
	var pageCount=1;
	showPage(parseInt($("#comments_area").attr("data-n")),"page",pageCount);
	$("#page div:first").click();
	$("#page div").click(pageClick);
	function pageClick(){
		var page=$(this).text();
		if(page==">"){
			var i=$("#page>div").length;
			if($("#page>div:eq("+(i-2)+")").text()!=""+pageCount){
				pageCount+=1;
			}
			else{
				return;
			}
		}
		else if(page=="..."){
			if($(this).prev().text()=="1"){
				pageCount-=4;
			}
			else{
				pageCount+=4;
			}
		}
		else if(pageCount==parseInt(page)){
			return;
		}
		else{
			pageCount=parseInt(page);
		}
		$.ajax({
			url:"/moreComment",
			type:"post",
			data:{"page":pageCount},
			success:function(data){
				$("#comments_area").html(data.html);
				$(window).scrollTop($("#comments_area").offset().top-90);
				$("#page").html("");
				showPage(data.commentCount,"page",pageCount);
				$("#page div:first").click();
				$("#page div").click(pageClick);
			},
			error:function(){
				alert("页码错误");
			}
		});
	}
}