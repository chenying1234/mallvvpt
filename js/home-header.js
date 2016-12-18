$(function() {
	//搜索左侧的切换
	$("#search .search_tips").hover(function() {
		$(this).find("ul").show();
	}, function() {
		$(this).find("ul").hide();
	});
	$("#search .search_tips li").click(function() {
		var span_text = $(this).html();
		var hidden_value = $(this).attr("act");
		$("#search .search_tips span em").html(span_text);
		$(".search-form input[type=hidden]").val(hidden_value);
		$(this).parent().hide();
	});
	//精选分类的切换
	$(".public-nav-layout .all-category").hover(function() {
		$(this).find(".category").show();
	}, function() {
		$(this).find(".category").hide();
	});
	$("#ttt").click(function () {
		window.location.href='goodlist.html';
	})
	$("#vvv").click(function () {
		window.location.href='goodlist.html';
	})
	//site-menu 下拉列表的切换
	$(".public-nav-layout .site-menu .hover-list").hover(function() {
		var a_cd = $(this).find("a").attr("cd");
		var cate_index = a_cd.indexOf("actid");
		var alt_id = a_cd.slice(cate_index + 6);
		$(".col-block-wrap").hide();
		$(".top_menu_" + alt_id + "").show();
		var w_href = window.location.href;
		$(".public-nav-layout .wrapper .nav-classify").hide();
		if(w_href.indexOf(a_cd) > -1) {
			$(".public-nav-layout .nav-classify").hide();
		} else {
			$(".public-nav-layout .nav-classify").show();
		}

	}, function() {
		$(".public-nav-layout .nav-classify").hide();
	});
	$(".public-nav-layout .wrapper .nav-classify").hover(function() {
		$(this).show();
	}, function() {
		$(this).hide();
	});
	//地址的选择
	$(".address-select").hover(function() {
		$(this).find("ul").show();
	}, function() {
		$(this).find("ul").hide();
	});
	//
	$(".quick-menu dl").hover(function() {
			$(this).addClass("hover");
		},
		function() {
			$(this).removeClass("hover");
		});
	//
	$(".deliver-address li").eq(0).addClass("selected");
	$(".deliver-address li a").click(function() {
		$(this).parent().addClass("selected").siblings().removeClass('selected');
		$(".your-address em").text($(this).text());
	});

	$(".head-user-menu dl").hover(function() {
			$(this).addClass("hover");
		},
		function() {
			$(this).removeClass("hover");
		});

	
	$('#button').click(function() {
		if($('#keyword').val() == '') {
			return false;
		}
	});
	
	$(window).load(function() {
		var oInput = $("#keyword");
		oInput.keyup(function() {
			$.ajax({
				url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+oInput.val()+"&json=1&p=3",
				dataType: "jsonp",
				jsonp: "cb",
				success: function(data) {
					$("#tipxj").show();
					var lists = data.g;
					var oUl = $("#tipListxj");
					oUl.html("");
					for(var i in lists) {
						var oLi = $("<li></li>");
						oLi.html(lists[i].q);
						oUl.append(oLi);
					}
					$("li","#tipxj").click(function () {
						oInput.val($(this).text());
						$("#tipxj").hide();
					})
				}
			})
		})
	})
		$.cookie.json = true;
		var cc = $.cookie('cc');
		if (!cc||cc.length===0) {
			$("#onehead").css("display","block");
			$("#twohead").css("display","none");
		}else{
			$("#onehead").css("display","none");
			$("#twohead").css("display","block");
				$("#fff").append(cc.user)
		}
		
		$("#ggg").click(function () {
			$("#onehead").css("display","block");
			$("#twohead").css("display","none");
			$("#fff").text("");
			$.cookie("cc","",{expires:-1,path:'/'})
		})

});