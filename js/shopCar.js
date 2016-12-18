$(function () {
	//购物车的初始化；
	//初始化购物车的数量；
	$.cookie.json = true; //cookie中存储的value值是对象
	var products = $.cookie('products');
	if(!products||products.length === 0){
		$('.ncc-main').hide();
		$('.ncc-null-shopping').show();
	}else{
//		var num=0;
//			for (var i=0;i<products.length;i++) {			
//				num+=products[i].price*products[i].amount;
//			}
		$.each(products, function(index,element){ 
		$('<tbody class="rowcd"><tr><th colspan="20"><strong>店铺：<a href="##">'+element.dname+'</a></strong><span member_id="3214541"></span></th></tr>'+
							'<tr id="cart_item_701" nc_group="701" class="shop-list ">'+
								'<td><input checked="checked"  id="cart_id701" class="cll_abc" name="cart_id[]" type="checkbox"></td>'+
								'<td class="w60">'+
									'<a href="##" target="_blank" class="ncc-goods-thumb"><img src="'+element.src+'" alt="'+element.name+'"></a>'+
								'</td>'+
								'<td class="tl">'+
									'<dl class="ncc-goods-info">'+
										'<dt><a href="##" target="_blank">'+element.name+'</a></dt>'+
									'</dl>'+
								'</td>'+
								'<td class="w120"><em id="item701_price">'+element.price+'.00</em></td>'+
								'<td class="w120 ws0">'+
									'<a href="##" title="减少商品件数" class="add-substract-key tip minus">-</a>'+
									'<input id="input_item_701" value="'+element.amount+'"  class="text w20" type="text">'+
									'<a href="##" title="增加商品件数" class="add-substract-key tip add">+</a>'+
								'</td>'+
								'<td class="w120 index"> <em id="item701_subtotal" class="eachGoodsTotal">'+element.price*element.amount+'.00</em>'+
								'</td>'+
								'<td class="w80">'+
									'<a href="##">收藏</a><br>'+
									'<a href="##">删除</a>'+
								'</td>'+
							'</tr>'+
							'<tr>'+
								'<td class="tr" colspan="20">'+
									'<div class="ncc-store-account">'+
										'<dl>'+
											'<dt>店铺合计：</dt>'+
											'<dd><em class="eachStoreTotal" id="ss"></em>元</dd>'+
										'</dl>'+
									'</div>'+
								'</td>'+
							'</tr>'+
						'</tbody>').insertAfter('thead').data('product',element);
							$("#ss").append(element.price*element.amount+".00");
										
		});	
		calcTotal();
	}
		
			
			
			// "删除" 购物车中的商品
			$(".w80 a").click(function(){
				var $row = $(this).parents(".rowcd");
				deleteRow($row);
			});
			
			// "全选" 功能 
			$("#selectAll").click(function(){				
				$(".cll_abc").prop("checked", $(this).prop("checked"));
				$("#selectAll:not(:checked)").parents(".rowcd").find(".eachStoreTotal").text("0.00");
				for (var i=0;i<$("tbody").length;i++) {
					if ($(".cll_abc").eq(i).prop("checked")){
						$(".eachStoreTotal").eq(i).text("");
						$(".eachStoreTotal").eq(i).text($(".eachGoodsTotal").eq(i).text());
					}else{
						$(".eachStoreTotal").eq(i).text("");
						$(".eachStoreTotal").eq(i).text("0.00");
					}
		
				}
				
				calcTotal();
			});
			
			// 点击商品行前的复选框，设置“全选”复选框状态与刷新显示合计金额
			$(".cll_abc").click(function() {
				$("#selectAll").prop("checked", $(".cll_abc:checked").length === $(".cll_abc").length ? true : false);
				
				for (var i=0;i<$("tbody").length;i++) {
						if ($(".cll_abc").eq(i).prop("checked")){
							$(".eachStoreTotal").eq(i).text("");
							$(".eachStoreTotal").eq(i).text($(".eachGoodsTotal").eq(i).text());
						}else{
							$(".eachStoreTotal").eq(i).text("");
							$(".eachStoreTotal").eq(i).text("0.00");
						}			
					}
				calcTotal();
			});
			
	
			// 加数量
			$(".add").click(function(){
				var amount = parseInt($(this).prev().val());
				amount++;
				$(this).prev().val(amount);
				var price = parseFloat($(this).parent().prev().text());
				$(this).parent().next().text(price * amount+'.00');
				$(this).parents(".rowcd").find(".eachStoreTotal").text($(this).parent().next().text());
				calcTotal();

				$(this).parents(".rowcd").data("product").amount = amount;
				$.cookie("products", products, {expires:7, path:"/"});
			});

			// 减数量
			$(".minus").click(function(){
				var amount = parseInt($(this).next().val());
				if (amount <= 1) // 数量最小减到1
					return;
				amount--;
				$(this).next().val(amount);
				var price = parseFloat($(this).parent().prev().text());
				$(this).parent().next().text(price * amount+'.00');
				$(this).parents(".rowcd").find(".eachStoreTotal").text(price * amount+'.00');
				calcTotal();

				$(this).parents(".rowcd").data("product").amount = amount;
				$.cookie("products", products, {expires:7, path:"/"});
			});
			//如果页面未登录跳转
			$("#next_submit").click(function () {
				$.cookie.json = true;
				var cc = $.cookie('cc');
				if (!cc||cc.length===0) {	
						window.location.href='login.html';
				}else{
						window.location.href='pay.html';
				}
				if($("#onehead").css("display")==="block"){
					window.location.href='login.html';
				}
			})
			
			
	
	// 计算合计金额
	function calcTotal() {
		var total = 0;
		$(".cll_abc:checked").parents(".rowcd").find(".eachStoreTotal").each(function(index, element){
			total += parseFloat($(this).text());
		});
		// 显示合计金额
		$("#cartTotal").text(total+'.00');
	}
	
	
	function deleteRow($row) {
		var products = $.cookie('products');
		var product = $row.data("product");
		var index = $.inArray(product, products);
		products.splice(index, 1);
		$.cookie("products", products, {expires:7, path:"/"});
		$row.remove();
		if (products.length === 0){
			$('.ncc-main').hide();
			$('.ncc-null-shopping').show();	
		}
		calcTotal();
	}
	
	
})


	