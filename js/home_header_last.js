var PRICE_FORMAT = '&yen;% s ';
			$(function() {
				$(".head-user-menu dl").hover(function() {
						$(this).addClass("hover");
					},
					function() {
						$(this).removeClass("hover");
					});
				$('.head-user-menu .my-mall').mouseover(function() { // 最近浏览的商品
					load_history_information();
					$(this).unbind('mouseover');
				});
				$('.head-user-menu .my-cart').mouseover(function() { // 运行加载购物车
					$(this).unbind('mouseover');
				});
				$('#button').click(function() {
					if($('#keyword').val() == '') {
						return false;
					}
				});
			});
			$(function() {
				//search
				var act = "index";
				if(act == "store_list") {
					$("#search").children('ul').children('li:eq(1)').addClass("current");
					$("#search").children('ul').children('li:eq(0)').removeClass("current");
				}
				$("#search").children('ul').children('li').click(function() {
					$(this).parent().children('li').removeClass("current");
					$(this).addClass("current");
					$('#search_act').attr("value", $(this).attr("act"));
					$('#keyword').attr("placeholder", $(this).attr("title"));
				});
				$("#keyword").blur();

			});