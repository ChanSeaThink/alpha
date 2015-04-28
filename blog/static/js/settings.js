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
	$("#uname_input").on({
		"input":function(){
			var str=$(this).val();
			if(str&&!pattern2.test(str)){
				$("#uname_row .hint").text("字符有误");
				flag[3]=0;
			}
			else {
				$("#uname_row .hint").text("");
				flag[3]=1;
			}
		},
		"blur":function(){
			var str=$(this).val();
			if(str.length==0){
				$(this).next().text("值为空");
				flag[3]=0;
			}
		}
	});
	for(var i=0;i<3;i++){
		if(i==0){
			$(".set_password:eq("+i+")").on({
				"input":function(){
					var str=$(this).val();
					if(pattern1.test(str)){
						$(this).next().text("字符有误");
						flag[i]=0;
					}
					else {
						$(this).next().text("");
						flag[i]=1;
					}
				},
				"blur":function(){
					var str=$(this).val();
					if(str.length<8&&str.length>0){
						$(this).next().text("密码长度至少为8位");
						flag[i]=0;
					}
				}
			});
		}
		else{
			$(".set_password:eq("+i+")").on({
				"input":function(){
					if($(".set_password:eq(1)").next().text()=="新密码两次输入不同！")
						$(".set_password:eq(1)").next().text("");
					var str=$(this).val();
					if(pattern1.test(str)){
						$(this).next().text("字符有误");
						flag[i]=0;
					}
					else {

						$(this).next().text("");
						flag[i]=1;
					}
				},
				"blur":function(){
					var str=$(this).val();
					if(str.length<8&&str.length>0){
						$(this).next().text("密码长度至少为8位");
						flag[i]=0;
					}
				}
			});
		}
	}

	//ajax请求
	$("#send").click(function(){
		var pas1=$(".set_password:eq(0)").val();
		var pas2=$(".set_password:eq(1)").val();
		var pas3=$(".set_password:eq(2)").val();
		if(flag[0]&&flag[1]&&flag[2]&&flag[3]){
			if(pas2!=pas3){
				$(".set_password:eq(1)").next().text("新密码两次输入不同！")
			}
			else if(pas1&&!pas2){
				$(".set_password:eq(1)").next().text("值为空");
				$(".set_password:eq(2)").next().text("值为空");
			}
			else if(pas2&&!pas1){
				$(".set_password:eq(0)").next().text("值为空");
			}
			else{//*
				var form=document.getElementById("settings_form");
				var formdata=new FormData(form);
				$.ajax({
					url:"/saveSettings",
					type:"post",
					data:formdata,
					success:function(data){
						if(data.username){
							$("#uname_row .hint").text(data.username);
						}
						if(data.password){
							$(".set_password:eq(0) .hint").text(data.password);
						}
					},
					error:function(){}
				});//*/
			}
		}
	});
}