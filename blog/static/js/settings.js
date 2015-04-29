window.onload=function(){
	var scrollFlag=0;
	$(window).scroll(scrollP);
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
				$("#nav_top").css("background-color","rgba(102,153,255,0.8)");

				scrollFlag=1;
			}
			//从下滑到顶
			else if(flag==0){
				$("#nav_top").css("background-color","rgba(102,153,255,1)");
				scrollFlag=0;
			}
		}
	}

	//顶栏
	$("#list_writting").mouseover(function(){
		var src=$("#list_writting img").attr("src");
		var src2=src.replace(/pen/,"pen2");
		$("#list_writting img").attr({"src":src2});
	});
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
	$("#list_writting").mouseout(function(){
		var src=$("#list_writting img").attr("src");
		var src2=src.replace(/pen2/,"pen");
		$("#list_writting img").attr({"src":src2});
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
	$("#list_writting").click(function(){
		window.open("/writting","_self");
	});
	$("#list_logout").click(function(){
		var form=document.createElement("form");
		form.method="get";
		form.action="/logout";
		form.submit();
	});

	//返回按钮
	$("#backwards").click(function(){
		window.open("/index","_self");
	});

	//用户名编辑按钮
	$("#uname_edit").click(function(){
		var username=$("#user_name").text();
		$("#user_name").hide();
		$("#uname_edit").hide();
		$("#uname_input").show();
		$("#uname_input").val(username).focus().select();
	});

	//输入检测
	var flag=new Array();
	for(var i=0;i<4;i++){
		flag[i]=1;
	}
	var pattern1=/[^!-z]/,pattern2=/^[\u4e00-\u9fa5A-Za-z0-9_]+$/;
	var pi1=$(".set_password:eq(0)"),pi2=$(".set_password:eq(1)"),pi3=$(".set_password:eq(2)");
	$("#uname_input").on({
		"input":function(){
			var str=$(this).val();
			if(str&&!pattern2.test(str)){
				$("#uname_row .hint").text("字符有误");
				flag[0]=0;
			}
			else {
				$("#uname_row .hint").text("");
				flag[0]=1;
			}
		},
		"blur":function(){
			var str=$(this).val();
			if(str.length==0||str==$("#user_name").text()){
				$("#user_name").show();
				$("#uname_edit").show();
				$("#uname_input").hide();
				flag[0]=1;
			}
		}
	});
	$(".set_password:eq(0)").on({
		"input":function(){
			var str=$(this).val();
			if(pattern1.test(str)){
				$(this).next().text("字符有误");
				flag[1]=0;
			}
			else {
				$(this).next().text("");
				flag[1]=1;
				if(pi2.next().text()=="新旧密码相同"){
					pi2.next().text("");
				}
			}
		},
		"blur":function(){
			var str=$(this).val();
			if(str.length<8&&str.length>0){
				$(this).next().text("密码长度至少为8位");
				flag[1]=0;
			}
			else if(str.length==0){
				if(!pi2.val()&&!pi3.val()){
					pi2.next().text("");
					pi3.next().text("");
				}
				flag[1]=1;
			}
		}
	});
	$(".set_password:eq(1)").on({"input":function(){checkPas1(2,this)},"blur":function(){checkPas2(2,this)}});
	$(".set_password:eq(2)").on({"input":function(){checkPas1(3,this)},"blur":function(){checkPas2(3,this)}});
	function checkPas1(i,t){
		th=t;
		if($(".set_password:eq(1)").next().text()=="新密码两次输入不同！")
			$(".set_password:eq(1)").next().text("");
		var str=$(th).val();
		if(pattern1.test(str)){
			$(th).next().text("字符有误");
			flag[i]=0;
		}
		else {
			$(th).next().text("");
			flag[i]=1;
		}
	 }
	function checkPas2(i,t){
		th=t;
		var str=$(th).val();
		if(str.length<8&&str.length>0){
			$(th).next().text("密码长度至少为8位");
			flag[i]=0;
		}
		if(str.length==0){
			flag[i]=1;
		}
		if(!pi2.val()&&!pi3.val()&&pi1.next().text()=="值为空"){
			pi1.next().text("");
		}
	}

	//ajax请求
	$("#send").click(function(){
		var uname=$("#uname_input").val();
		var pas1=$(".set_password:eq(0)").val();
		var pas2=$(".set_password:eq(1)").val();
		var pas3=$(".set_password:eq(2)").val();
		var formdata=new FormData(),a=0;
		if(uname&&uname!=$("#user_name").text()){
			formdata.append("username",uname);
			a=1;
		}
		if(pas1&&flag[1]&&flag[2]&&flag[3]){
			formdata.append("opassword",pas1);
			formdata.append("newpassword1",pas2);
			formdata.append("newpassword2",pas3);
			a=2;
		}
		if(pas2!=pas3){
			$(".set_password:eq(1)").next().text("新密码两次输入不同！");
		}
		else if(flag[1]&&pas1&&!pas2){
			$(".set_password:eq(1)").next().text("值为空");
			$(".set_password:eq(2)").next().text("值为空");
		}
		else if(pas2&&!pas1){
			$(".set_password:eq(0)").next().text("值为空");
		}
		else if(pas1&&pas1==pas2){
			$(".set_password:eq(1)").next().text("新旧密码相同");
		}
		else if(a&&flag[0]&&flag[1]&&flag[2]&&flag[3]){
			//*
			$.ajax({
				url:"/saveSettings",
				type:"post",
				contentType:false,
				processData:false,
				data:formdata,
				success:function(data){
					if(data.username){
						$("#uname_row .hint").text(data.username);
					}
					if(data.password){
						$(".set_password:eq(0)").next().text(data.password);
					}
					if(data.status=="success"){
						if(a==2){
							var form=document.createElement("form");
							form.method="get";
							form.action="/logout";
							form.submit();
						}
						else if(a==1){
							window.location.reload();
						}
					}
				},
				error:function(){
					alert("error");
				}
			});//*/
		}
	});
}