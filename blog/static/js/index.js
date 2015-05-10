window.onload=function(){
	$("#origin_pic img").css({"max-width":$(window).width()+"px","max-height":$(window).height()+"px"});

	$(window).resize(function(){
		base=$(document).width();
		$(".fill").css("width",(base-780)/2+"px");
		$("#origin_pic img").css({"max-width":$(window).width()+"px","max-height":$(window).height()+"px"});
		if($("#origin_pic").css("display")!="none"){
			var pich=parseInt($("#origin_pic img").css("height"));
			var picw=parseInt($("#origin_pic img").css("width"));
			$("#origin_pic").css({marginTop:-pich/2+"px",marginLeft:-picw/2+"px"});
		}
	});

	var scrollFlag=0,scrollCount=0,pageCount=1;
	var scrollHeight=$(document).height();
	var clientHeight=$(window).height()+$(window).scrollTop();
	//0表示视窗在最顶，1表示不在最顶
	$(window).scroll(scrollP);
	$(window).scroll(ajaxScroll);
	function scrollP(){
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
				$("#intro_top").hide();
				$("#nav_top").css("background-color","rgba(102,153,255,0.8)");
				$("#search").css("margin-top","15px");
				$("#list_top").css("top","63px");
				$("#lr").css("margin-top","17px");
				$("#user").css("margin-top","0px");
				scrollFlag=1;
			}
			//从下滑到顶
			else if(flag==0){
				$("#intro_top").show();
				$("#nav_top").css("background-color","rgba(102,153,255,1)");
				$("#search").css("margin-top","25px");
				$("#list_top").css("top","83px");
				$("#lr").css("margin-top","27px");
				$("#user").css("margin-top","10px");
				scrollFlag=0;
			}
		}
	}
	function ajaxScroll(){
		clientHeight=$(window).height()+$(window).scrollTop();
		if(scrollHeight-clientHeight<30){
			$(window).unbind("scroll",ajaxScroll);
			$.ajax({
				url:"/morePassage",
				type:"post",
				data:{"id":$("#content h2:last").attr("data-url")},
				success:function(data){
					scrollCount+=1;
					$("#content").append(data.html);
					if(window.navigator.userAgent.indexOf("Firefox")<0){
						for(var i=scrollCount*8;i<$(".pic_box").length;i++){
							for(var j=3;j<$(".pic_box:eq("+i+") img").length;j++){
								var image=$(".pic_box:eq("+i+") img:eq("+j+")");
								image.css("z-index",-j);
								if(j>3)
									image.css("left",-w*(j-3)/2);
								image.css("-webkit-transform","rotateY(-60deg)");
								image.css("transform","rotateY(-60deg)")
							}

						}
					}
    				for(var i=scrollCount*8;i<picbox.length;i++){
						picbox[i].onmousewheel=picSlide;
					}
					scrollHeight=$(document).height();
					if(scrollCount==2||(pageCount-1)*24+$("#content h2").length==parseInt(data.passageCount)){
						$("#page").html("");
						showPage(data.passageCount,"page",pageCount);
						$("#page div:first").click();
						$("#page div").click(pageClick);
					}
					else{
						setTimeout(function(){$(window).bind("scroll",ajaxScroll);},200);
					}
				},
				error:function(){
					alert("请求更多出错");
				}
			});
		}
	}
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
		else{
			pageCount=parseInt(page);
		}
		$.ajax({
			url:"morePassage",
			type:"post",
			data:{"page":pageCount},
			success:function(data){
				$("#content").html(data.html);
				scrollCount=0;
				window.scrollTo(0,0);
				if(window.navigator.userAgent.indexOf("Firefox")<0){
					for(var i=scrollCount*8;i<$(".pic_box").length;i++){
						for(var j=3;j<$(".pic_box:eq("+i+") img").length;j++){
							var image=$(".pic_box:eq("+i+") img:eq("+j+")");
							image.css("z-index",-j);
							if(j>3)
								image.css("left",-w*(j-3)/2);
							image.css("-webkit-transform","rotateY(-60deg)");
							image.css("transform","rotateY(-60deg)")
						}
					}
				}
   				for(var i=scrollCount*8;i<picbox.length;i++){
					picbox[i].onmousewheel=picSlide;
				}
				if($("#content h2").length%8!=0||(pageCount-1)*24+$("#content h2").length==parseInt(data.passageCount)){
					$("#page").html("");
					showPage(data.passageCount,"page",pageCount);
					$("#page div:first").click();
					$("#page div").click(pageClick);
				}
				else{
					$("#page").html("More");
					scrollHeight=$(document).height();
					$(window).scroll(ajaxScroll);
				}
			},
			error:function(){
				alert("页码错误");
			}
		});
	}

	//顶栏
	$("#list_writting").mouseover(function(){
		var src=$("#list_writting img").attr("src");
		var src2=src.replace(/pen/,"pen2");
		$("#list_writting img").attr({"src":src2});
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
	$("#list_writting").mouseout(function(){
		var src=$("#list_writting img").attr("src");
		var src2=src.replace(/pen2/,"pen");
		$("#list_writting img").attr({"src":src2});
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
	$("#list_writting").click(function(){
		window.open("/writting","_self");
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
		$("#popup,#lr_box,#log_box,#reg_box,#log_button,#reg_button,#origin_pic,#origin_pic img").hide();
	});
	$("#content").delegate(".pic_box img","click",function(){
		$("#popup,#origin_pic").show();
		var s=$(this).attr("src").replace(/Thumnail/,"Picture").replace(/thumnail/,"");
		if($("#origin_pic img").attr("src")==s){
			var pich=parseInt($("#origin_pic img").css("height"));
			var picw=parseInt($("#origin_pic img").css("width"));
			$("#origin_pic").css({marginTop:-pich/2+"px",marginLeft:-picw/2+"px"});
			setTimeout(function(){$("#origin_pic img").show();},100);
		}
		else{
			$("#origin_pic img").attr({"src":s});
		}
		$("#origin_pic img").load(function(){
			var pich=parseInt($("#origin_pic img").css("height"));
			var picw=parseInt($("#origin_pic img").css("width"));
			$("#origin_pic").css({marginTop:-pich/2+"px",marginLeft:-picw/2+"px"});
			setTimeout(function(){$("#origin_pic img").show();},100);
		});
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
	$("#content").delegate(".title,.summary","click",function(){
		window.open($(this).attr("data-url"),"_blank");
	})
	//图片滚动事件
	var w=parseInt($(".pic_box img:first").css("width"))+10;
	if(window.navigator.userAgent.indexOf("Firefox")<0){
		for(var i=0;i<$(".pic_box").length;i++){
			for(var j=3;j<$(".pic_box:eq("+i+") img").length;j++){
				var image=$(".pic_box:eq("+i+") img:eq("+j+")");
				image.css("z-index",-j);
				if(j>3)
					image.css("left",-w*(j-3)/2);
				image.css("-webkit-transform","rotateY(-60deg)");
				image.css("transform","rotateY(-60deg)")
			}
		}
	}
	var picbox=document.getElementsByClassName("pic_box");
	var n=0;
	function picSlide(e){
		e=e||window.event;
		e.preventDefault();
		if(e.wheelDelta){
			if(e.wheelDelta>0)n=1;
			else n=-1;
			$("img",this).stop(true,true);
			var left1=$("img:first",this).offset().left-$(this).offset().left;
			var left2=$("img:last",this).offset().left-$(this).offset().left;
			var left=123;
			if((left1>w/2&&n>0)||(left2<3*w&&n<0))
				return;
			var pb=this;
			pb.onmousewheel=function(e){e.preventDefault()};
			setTimeout(function(){
				pb.onmousewheel=picSlide;
			},100);
			var len=$("img",this).length;
			var t=0,img,l,count=100;
			for(var i=0;i<len;i++){
				img=$("img:eq("+i+")",this);
				l=img.offset().left-$(this).offset().left;
				t=l+w*n;
				if(n<0){
					if(l>30&&t<30){
						if(img.css("-webkit-aniamtion-name")!="rotate"||img.css("aniamtion-name")!="rotate"){
							img.css("-webkit-animation","rotate .3s linear 0 1 forwards");
							img.css("animation","rotate .3s linear 0 1 forwards");
							img.css("z-index",i);
						}
						else{
							img.css("-webkit-transform","rotateY(60deg)");
							img.css("transform","rotateY(60deg)");
						}
						img.animate({left:"+="+w*n+"px"},500);
					}
					else if(l>230&&t<230){
						if(img.css("-webkit-aniamtion-name")!="rotate3"||img.css("aniamtion-name")!="rotate3"){
							img.css("-webkit-animation","rotate3 .3s linear 0 1 forwards");
							img.css("animation","rotate3 .3s linear 0 1 forwards");
							count=i;
						}
						else{
							img.css("-webkit-transform","rotateY(0deg)");
							img.css("transform","rotateY(0deg)");
						}
						img.animate({left:"+="+w*n+"px"},500);
					}
					else{
						if(img.css("-webkit-animation-name")=="rotate"||img.css("animation-name")=="rotate"||count<i){
							img.animate({left:"+="+w*n/2+"px"},"500");
						}
						else{
							img.animate({left:"+="+w*n+"px"},"500");
						}
					}
				}
				else{
					if(img.css("-webkit-animation-name")=="rotate"||img.css("animation-name")=="rotate"){
						if(l<30&&t>30){
							img.css("-webkit-animation","rotate2 .3s linear 0 1 forwards");
							img.css("animation","rotate2 .3s linear 0 1 forwards");
							img.animate({left:"+="+w*n+"px"},"500");
						}else
							img.animate({left:"+="+w*n/2+"px"},"500");
					}
					else if(l<230&&t>230){
						if(img.css("-webkit-aniamtion-name")!="rotate4"||img.css("aniamtion-name")!="rotate4"){
							img.css("-webkit-animation","rotate4 .3s linear 0 1 forwards");
							img.css("animation","rotate4 .3s linear 0 1 forwards");
							img.css("z-index",-i);
							count=i;
						}
						else{
							img.css("-webkit-transform","rotateY(-60deg)");
							img.css("transform","rotateY(-60deg)");
						}
						img.animate({left:"+="+w*n+"px"},500);
					}
					else if(count<i){
						img.animate({left:"+="+w*n/2+"px"},"500");
					}
					else{
						img.animate({left:"+="+w*n+"px"},"500");
					}
				}
			}
		}
		else if(e.detail){
			if(e.detail>0)n=-1;
			else n=1;
			$("img",this).stop(true,true);
			var left1=$("img:first",this).offset().left;
			var left2=$("img:last",this).offset().left;
			var left=123;
			if((left1>w-1&&n>0)||(left2<3*w+1&&n<0))
				return;
			$("img",this).animate({"left":"+="+w*n+"px"});
		}
    }
    for(var i=0;i<picbox.length;i++){
		picbox[i].onmousewheel=picSlide;
	}

	//页码显示函数
		function showPage(n,id,pn){
			//根据显示项数目生成Ajax式页码栏
			if(n<=24){
				$("#"+id).html("No More");
				return;
			}
			var max=10;
			var half=Math.floor((max-1)/2);
			var pages=Math.ceil(n/24);
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
						var c=parseInt(pn);
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
						var c=parseInt(pn);
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
};