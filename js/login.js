$(function () {
	//当mobile获得焦点的时候
	$("#mobile").focus(function () {
		$(".usermobile p").text("");
		$(".userpassword1 p").text("");
		$(".usercaptcha p").text("")
	})	
	//当mobile失去焦点的时候
	$("#mobile").blur(function () {
		var reg = /^1[34578]\d{9}$/g,
			moblleVal = $(this).val(),
		res = reg.test(moblleVal);		
		if(moblleVal === ""){
			$(".usermobile p").text("");
		}else{	
			if (!res) {
				$(".usermobile p").text("手机号格式不正确");			
			}else{
				$(".usermobile p").text("");	
			}
		}
		
	})
	
	
	//当password1获得焦点的时候
	$("#password1").focus(function () {
		if ($("#mobile").val() === "") {
			$(".usermobile p").text("手机号不能为空");
		}
		$(".userpassword1 p").text("");
		$(".usercaptcha p").text("");
	})
	//当password1失去焦点的时候
	$("#password1").blur(function () {
		var reg = /^\w{6,12}$/g,
			password1Val = $(this).val(),
			res = reg.test(password1Val);
		if (password1Val === "") {
			$(".userpassword1 p").text("");
		}else{
			if (!res) {
				$(".userpassword1 p").text("密码格式不正确");			
			}else{
				$(".userpassword1 p").text("");
			}
		}		
	})
	
	//当captcha获得焦点的时候
	$("#captcha").focus(function () {
		if ($("#mobile").val() === "") {
			$(".usermobile p").text("手机号不能为空");
		}
		if ($("#password1").val() === "") {
			$(".userpassword1 p").text("密码不能为空");
		}
		$(".usercaptcha p").text("")
	})
	//当captcha失去焦点的时候
	$("#captcha").blur(function () {
		var captchaVal = $(this).val();
		if (captchaVal === "") {
			$(".usercaptcha p").text("")
		}else if (captchaVal.toLowerCase() !== "b4j9") {
			$(".usercaptcha p").text("验证码错误")
		}
	})
	
	$("#loginbtn").click(function () {
		$.cookie.json = true;
		var iUser = $("#mobile").val(),
			iPas = $("#password1").val(),
			aCookie = $.cookie('userInfoc');	
		var cc = {};
	 	cc.user = $("#mobile").val();
	 	$.cookie("cc",cc,{expires:7,path:'/'})
		if ($("#captcha").val() === "") {
			$(".usercaptcha p").text("请输入验证码");
		}	
		for(var i in aCookie){
			if (aCookie[i].user === iUser&&aCookie[i].pas=== iPas) {
				$(".usermobile p").hide();
				$.cookie.json = true; //cookie中存储的value值是对象
				var products = $.cookie('products');
				if(!products||products.length === 0){
					window.location.href='index.html'
				}else{			
					window.location.href='pay.html'
				}	
			}else{
				$(".usermobile p").text("手机号或密码不正确");
			}
		}			
			$.cookie.json = true;
			var cc = $.cookie('userInfoc');
			if (!cc||cc.length===0) {	
				$(".usermobile p").text("手机号或密码不正确");	
			}
		})
	
})
