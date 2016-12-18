//返回顶部
	backTop = function(btnId) {
		var btn = document.getElementById(btnId);
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		window.onscroll = set;
		btn.onclick = function() {
			btn.style.opacity = "0.5";
			window.onscroll = null;
			this.timer = setInterval(function() {
				scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				scrollTop -= Math.ceil(scrollTop * 0.1);
				if(scrollTop == 0) clearInterval(btn.timer, window.onscroll = set);
				if(document.documentElement.scrollTop > 0) document.documentElement.scrollTop = scrollTop;
				if(document.body.scrollTop > 0) document.body.scrollTop = scrollTop;
			}, 10);
		};
	
		function set() {
			scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			btn.style.opacity = scrollTop ? '1' : "0.5";
		}
	};
	backTop('gotop');
	//动画显示边条内容区域
	$(function() {
		var areas = new Array();
		areas = nc_a[0];
		for(i = 0; i < areas.length; i++) {
			$(".deliver-address").append(" <li><a href='javascript:void(0)'>" + areas[i][1] + "</a></li>");
		}
		$(".deliver-address li").eq(0).addClass("selected");
		$(".deliver-address li a").click(function() {
			$(this).parent().addClass("selected").siblings().removeClass('selected');
			$(".your-address em").text($(this).text());
		});

		ncToolbar();
		$(window).resize(function() {
			ncToolbar();
		});
	
		function ncToolbar() {
			if($(window).width() >= 1240) {
				$('#appBarTabs >.variation').show();
			} else {
				$('#appBarTabs >.variation').hide();
			}
		}
		$('#appBarTabs').hover(
			function() {
				$('#appBarTabs >.variation').show();
			},
			function() {
				ncToolbar();
			}
		);
		$("#rtoolbar_cart").click(function() {
			if($("#content-cart").css('right') == '-210px') {
				$('#content-compare').animate({
					'right': '-210px'
				});
				$("#content-cart").animate({
					right: '35px'
				});
			} else {
				$(".close").click();
				$(".chat-list").css("display", 'none');
			}
		});
		$(".close").click(function() {
			$(".content-box").animate({
				right: '-210px'
			});
		});
	
		$(".quick-menu dl").hover(function() {
				$(this).addClass("hover");
			},
			function() {
				$(this).removeClass("hover");
			});
			
	$.cookie.json = true;
	var cc = $.cookie('cc');
	$("#dl11").click(function () {
		if (!cc||cc.length===0) {	
				$("#dl22").css("display","none");
				window.location.href='login.html';
		}else{
				$("#dl22").fadeToggle("slow");
		}
		if($("#onehead").css("display")==="block"){
			$("#dl22").css("display","none");
			window.location.href='login.html';
		}
	});
	
	if (!cc||cc.length===0) {
		
	}else{
		$("#dl22").find("dt").append("Hi,"+cc.user)
	}
	$("#dl22").click(function  () {
		$("#dl22").fadeToggle("slow");
	})
	
});