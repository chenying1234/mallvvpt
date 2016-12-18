$(function() {
	//热销排行切换
	$('#hot_sales_tab').on('mouseenter', function() {
		$(this).addClass('current');
		$('#hot_collect_tab').removeClass('current');
		$('#hot_sales_list').removeClass('hide');
		$('#hot_collect_list').addClass('hide');
	});
	$('#hot_collect_tab').on('mouseenter', function() {
		$(this).addClass('current');
		$('#hot_sales_tab').removeClass('current');
		$('#hot_sales_list').addClass('hide');
		$('#hot_collect_list').removeClass('hide');
	});
// 商品分类
function class_list(obj) {
	var stc_id = $(obj).attr('span_id');
	var span_class = $(obj).attr('class');
	if (span_class == 'ico-block') {
		$("#stc_" + stc_id).show();
		$(obj).html('<em>-</em>');
		$(obj).attr('class', 'ico-none');
	} else {
		$("#stc_" + stc_id).hide();
		$(obj).html('<em>+</em>');
		$(obj).attr('class', 'ico-block');
	}
}	
	
	
	//浮动导航  waypoints.js
	$('#main-nav').waypoint(function(event, direction) {
		$(this).parent().parent().parent().toggleClass('sticky', direction === "down");
		event.stopPropagation();
	});
	
	// 商品内容部分折叠收起侧边栏控制
	$('#fold').click(function() {
		$('.ncs-goods-layout').toggleClass('expanded');
	});
	// 商品内容介绍Tab样式切换控制
	$('#categorymenu').find("li").click(function() {
		$('#categorymenu').find("li").removeClass('current');
		$(this).addClass('current');
	});
	// 商品详情默认情况下显示全部
	$('#tabGoodsIntro').click(function() {
		$('.bd').css('display', '');
		$('.hd').css('display', '');
	});
	// 点击评价隐藏其他以及其标题栏
	$('#tabGoodsRate').click(function() {
		$('.bd').css('display', 'none');
		$('#ncGoodsRate').css('display', '');
		$('.hd').css('display', 'none');
	});
	// 点击成交隐藏其他以及其标题
	$('#tabGoodsTraded').click(function() {
		$('.bd').css('display', 'none');
		$('#ncGoodsTraded').css('display', '');
		$('.hd').css('display', 'none');
	});
	// 点击咨询隐藏其他以及其标题
	$('#tabGuestbook').click(function() {
		$('.bd').css('display', 'none');
		$('#ncGuestbook').css('display', '');
		$('.hd').css('display', 'none');
	});
	//商品排行Tab切换
	$(".ncs-top-tab > li > a").mouseover(function(e) {
		if (e.target == this) {
			var tabs = $(this).parent().parent().children("li");
			var panels = $(this).parent().parent().parent().children(".ncs-top-panel");
			var index = $.inArray(this, $(this).parent().parent().find("a"));
			if (panels.eq(index)[0]) {
				tabs.removeClass("current ").eq(index).addClass("current ");
				panels.addClass("hide").eq(index).removeClass("hide");
			}
		}
	});
	//信用评价动态评分打分人次Tab切换
	$(".ncs-rate-tab > li > a").mouseover(function(e) {
		if (e.target == this) {
			var tabs = $(this).parent().parent().children("li");
			var panels = $(this).parent().parent().parent().children(".ncs-rate-panel");
			var index = $.inArray(this, $(this).parent().parent().find("a"));
			if (panels.eq(index)[0]) {
				tabs.removeClass("current ").eq(index).addClass("current ");
				panels.addClass("hide").eq(index).removeClass("hide");
			}
		}
	});

	//触及显示缩略图
	$('.goods-pic > .thumb').hover(
		function() {
			$(this).next().css('display', 'block');
		},
		function() {
			$(this).next().css('display', 'none');
		}
	);

	/* 商品购买数量增减*/
	// 增加
	$('.increase').click(function() {
		num = parseInt($('#quantity').val());
		max = parseInt($('[nctype="goods_stock"]').text());
		if (num < max) {
			$('#quantity').val(num + 1);
		}
	});
	//减少
	$('.decrease').click(function() {
		num = parseInt($('#quantity').val());
		if (num > 1) {
			$('#quantity').val(num - 1);
		}
	});

	//评价列表
	$('#comment_tab').on('click', 'li', function() {
		$('#comment_tab li').removeClass('current');
		$(this).addClass('current');
	});




	//购物车的初始化；
	//初始化购物车的数量；
	$.cookie.json = true; //cookie中存储的value值是对象
	var products = $.cookie('products');
	if(!products||products.length === 0){
		$('#hidexs').show();
		$('.no-order').show();
	}else{
		$('#hidexs').hide();
		$('.no-order').hide();
		tj_cart();
		
	}	

	/* 购物车 */   
    $(".addcart ").click(function () {
    	$('.total-price').remove();
    	$('.cart_item_undefined').remove();
    	$('.cart-list').remove();
    	$('#hidexs').hide();
    	$('.no-order').hide();
    	cookiecy ();
		var products = $.cookie("products");
		tj_cart();			
		var num=0;
		for (var i=0;i<products.length;i++) {			
			num+=products[i].price*products[i].amount;
		}
		$('#bold_mly').text('¥'+num+'.00');
		$('#bold_num').text(products.length);
    	$(".ncs-cart-popup").fadeIn()
   	}) 
   
   
   		//删除侧边购物车内容	
   		$('#fdd').on('click',function () {
   			$.cookie.json = true;
   			var products = $.cookie("products");
			var $row = $(this).parents('.cart-list')
			$(".cart_item_undefined").remove();
			$('.cart-list').hide();
			$('.addcart-goods-num').remove();
			$('.new_msg').remove();
			$('.total-price').remove();
   			deleteRow($row);
   			var products = $.cookie("products");
   			console.log(products);
   			var num=0;
			for (var i=0;i<products.length;i++) {			
				num+=products[i].price*products[i].amount;
			}
			$('#bold_mly').text('¥'+num+'.00');
			$('#bold_num').text(products.length);
   		})
	   	$('#fdd').on('click',function () {	
			//初始化购物车的数量；
			$.cookie.json = true; //cookie中存储的value值是对象
			var products = $.cookie('products');
			if(products.length === 0){
				$('#hidexs').show();
				$('.no-order').show();
			}else{
				$('#hidexs').hide();
				$('.no-order').hide();
				tj_cart();			
			}	
	   	})	
	   	
	   	//头部删除
	   $('.incart-goods').on('click',function () {
	   		$.cookie.json = true;
   			var products = $.cookie("products");
			var $row = $(this).parents('.cart_item_undefined')
			$(".cart_item_undefined").hide();
			$('.cart-list').remove();
			$('.addcart-goods-num').remove();
			$('.new_msg').remove();
			$('.total-price').remove();
   			deleteRow($row);
   			var products = $.cookie("products");
   			console.log(products);
   			var num=0;
			for (var i=0;i<products.length;i++) {			
				num+=products[i].price*products[i].amount;
			}
			$('#bold_mly').text('¥'+num+'.00');
			$('#bold_num').text(products.length);
	   })
	   	$('.incart-goods').on('click',function () {	
			//初始化购物车的数量；
			$.cookie.json = true; //cookie中存储的value值是对象
			var products = $.cookie('products');
			if(products.length === 0){
				$('#hidexs').show();
				$('.no-order').show();
			}else{
				$('#hidexs').hide();
				$('.no-order').hide();
				tj_cart();			
			}	
	   	})	
	   	
	   	//立即购买
	   	
	   	$(".buynow").click(function () {
	   		$.cookie.json = true;
			var cc = $.cookie('cc');
	   		if (!cc||cc.length===0) {
	   			cookiecy ();
				window.location.href='login.html';
			}else{
		   		cookiecy ();
				window.location.href='pay.html';
			}
	   	})
	   	
});   
   
    
    // 找出数组中指定商品编号的元素位置
	function findIndex(name, products) {
		for (var i in products) {
			if (products[i].name === name)
				return i;
		}
		return -1;
	}
	
	// 从cookie和页面中删除指定行中的数据
	function deleteRow($row) {
		var products = $.cookie('products');
		// 获取到缓存在行上的商品数据
		var product = $row.data("product");
		// 找出当前删除的商品在数组中是第几个元素
		var index = $.inArray(product, products);
		// 从数组中删除该索引处的元素
		products.splice(index, 1);
		// 将删除元素后的数组保存回 cookie 中
		$.cookie("products", products, {expires:7, path:"/"});
		
		// 如果购物车为空
		if (products.length === 0){
			$('#hidexs').show();
			$('.no-order').show();		
		}
		
	}
	
    function tj_cart(){
    	var products = $.cookie('products');
    	$('<div class="addcart-goods-num">'+products.length+'</div>').appendTo(".my-cart");
		$('<i id="rtoobar_cart_count" class="new_msg">'+products.length+'</i>').appendTo("#rtoolbar_cart");
			$.each(products, function(index,element){ 	
			$('<dl class="cart_item_undefined"><dt class="goods-name"><a href="##">'+element.name+'</a></dt><dd class="goods-thumb"><a href="##" title="'+element.title+'"><img src="'+element.src+'"></a></dd><dd class="goods-sales"></dd>'+
										'<dd class="goods-price"><em>¥'+element.price+'.00'+'×'+element.amount+'</em></dd><dd class="handle"><em><a href="##">删除</a></em></dd></dl>').prependTo('.incart-goods').data('product',element)	
			$('<ul class="cart-list"><li><div class="goods-pic">'+
			'<a href="##" title="'+element.title+'" ><img src="'+element.src+'"></a></div><dl><dt class="goods-name"><a href="##" title="'+element.title+'" >'+element.name+'</a></dt><dd><em class="goods-price">¥'+
			element.price+'.00</em>×'+element.amount+'</dd></dl><a href="##" class="del" title="删除">X</a></li></ul>').prependTo("#fdd").data('product',element)
		});	
			var num=0;
			for (var i=0;i<products.length;i++) {			
				num+=products[i].price*products[i].amount;
			}
			$('<span class="total-price">共<i>'+products.length+'</i>种商品 总计金额：<em>¥'+num+'</em></span>').prependTo('.checkout');
			$('<div nctype="rtoolbar_total_price" class="total-price">共计金额：<em class="goods-price">¥'+num+'.00</em></div>').prependTo('.btn-box');
    }
    	
    

	function cookiecy () {
		var product = {
	    		name:$(".name").find("b").text(),
	    		dname:$(".ncs-info").find('.title').children('h4').text(),
	    		title:$(".name").find("b").text(),
	    		src:$(".sp-img").find("img").attr("src"),
	    		price:parseInt($(".price").children("strong").children("b").text()),
	    		amount:parseInt($("#quantity").val())
	    	}
	    	$.cookie.json = true;
	    	var products = $.cookie("products");
	    	if (!products) {
	    		products = [];
	    	}
	    	// 判断数组中是否存在当前选购商品
			var index = findIndex(product.name, products);
			if (index === -1) { // 数组中不存在当前选购商品
				// 将当前次添加到购物车的商品保存到数组中
				products.push(product);
			} else { // 数组中存在当前选购商品
				// 数量累加
	//			products[index].amount++;
			var add = [];
			add[index] = parseInt(products[index].amount);
			add[index]+= product.amount;
			products[index].amount = add[index];
			}
			// 将数组保存回 cookie
			$.cookie("products", products, {expires:7, path:"/"});
	}