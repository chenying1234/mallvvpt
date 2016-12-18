$(function () {
	//当mobile获得焦点的时候
	$("#mobile").focus(function () {
		$(".usermobile p").text("");
		$(".userpassword1 p").text("");
		$(".userpassword2 p").text("");
		$(".usercaptcha p").text("")
	})	
	//当mobile失去焦点的时候
	$("#mobile").blur(function () {
		$.cookie.json = true;//cookie中存储的value值是对象
		var reg = /^1[34578]\d{9}$/g,
			moblleVal = $(this).val(),
			aCookie = $.cookie('userInfoc');		
//		console.log(aCookie);		
		res = reg.test(moblleVal);
		
		if(moblleVal === ""){
			$(".usermobile p").text("");
		}else{	
			if (!res) {
				$(".usermobile p").text("请输入正确的11位手机号码");
				
			}else{
				$(".usermobile p").text("");
			}
		}
		//判断该用户名是否已存在
		for(var i in aCookie){
			if (aCookie[i].user === moblleVal) {
				console.log(aCookie[i].user);
				$(".usermobile p").text("该用户名已存在");
			}
		}
	})
	//当password1获得焦点的时候
	$("#password1").focus(function () {
		if ($("#mobile").val() === "") {
			$(".usermobile p").text("手机号不能为空");
		}
		$(".userpassword1 p").text("");
		$(".userpassword2 p").text("");
		$(".usercaptcha p").text("")
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
				$(".userpassword1 p").text("请输入6-12位密码且不能有特殊符号(区分大小写)");			
			}else{
				$(".userpassword1 p").text("");
			}
		}
		
	})
	//当password2获得焦点的时候
	$("#password2").focus(function () {
		if ($("#mobile").val() === "") {
			$(".usermobile p").text("手机号不能为空");
		}
		if ($("#password1").val() === "") {
			$(".userpassword1 p").text("密码不能为空");
		}
		$(".userpassword2 p").text("");
		$(".usercaptcha p").text("")
	})
	//当password2失去焦点的时候
	$("#password2").blur(function () {
		var password1Val = $("#password1").val(),
			password2Val = $(this).val();
		if (password2Val === "" ) {
			$(".userpassword2 p").text("");
		}else{
			if (password2Val === password1Val) {
				$(".userpassword2 p").text("");
			}else{
				$(".userpassword2 p").text("两次密码不一致");
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
		if ($("#password2").val() === "") {
			$(".userpassword2 p").text("密码不能为空");
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
	
	$("#agree").click(function () {
		if ($("#agree").get(0).checked) {
			$(".useragreement p").text("")
		}else{
			$(".useragreement p").text("请阅读并同意该协议")
		}
	})
	
	$("#registerbtn").click(function () {
		if ($("#mobile").val() === "") {
			$(".usermobile p").text("手机号不能为空");
		}
		if ($("#password1").val() === "") {
			$(".userpassword1 p").text("密码不能为空");
		}
		if ($("#password2").val() === "") {
			$(".userpassword2 p").text("密码不能为空");
		}
		if ($("#captcha").val() === "") {
			$(".usercaptcha p").text("请输入验证码");
		}
		if ($("#agree").get(0).checked) {
			$(".useragreement p").text("")
		}else{
			$(".useragreement p").text("请阅读并同意该协议")
		}
		if($("#register-Index p").text()===""){//所有红字都为空时
		 	var userInfo = {};
		 	userInfo.user = $("#mobile").val();
		 	userInfo.pas = $("#password1").val();
		 	
		 	var cc = {};
		 	cc.user = $("#mobile").val();
		 	
		 	
		 	
		 	$.cookie.json = true;//cookie中存储的value值是对象
		 	var userInfoc = $.cookie("userInfoc");
		 	//判断是否读取到数组
			if(!userInfoc){//未读取到，说明是第一次添加用户信息，则创建数组对象
				userInfoc = [];
			}
		 	//判断数组是否存在之前
			var index = findIndex(userInfo.user,userInfoc);
//			console.log(userInfo.user)
			if(index === -1){
				//将当前次添加的用户信息保存到数组中
				userInfoc.push(userInfo);
			}else{

			}
			//
			//将数组保存会cookie
			$.cookie("cc",cc,{expires:7,path:'/'})
			$.cookie("userInfoc",userInfoc,{expires:7,path:'/'})
			$.cookie.json = true; //cookie中存储的value值是对象
			var products = $.cookie('products');
			if(!products||products.length === 0){
				window.location.href='index.html'
			}else{			
				window.location.href='pay.html'
			}

		}

	})
		
		function findIndex(id,products){
			for(var attr in products){			
				if(products[attr].user === id){
					return attr;
				}
			}
				return -1;
		}		
})
