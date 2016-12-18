$(function () {
		//三级联动
		$.get(
				"../data/address.json",
				function(data){
					var html="";
					for (var i = 0; i < data.regions.length; i++) {
					html += "<option class='contArrname' value='"+i+"'>"+ data.regions[i].name+"</option>";
					}
					$(html).appendTo(".contArr");
				}
			)
	
		$(".contArr").on("change",function(){		   
			var indexcontArr= $(".contArr option:selected").index()-1;
			$.get(
					"../data/address.json",
					function(data){
						var html="<option>- - 请选择 - </option>";
						for (var i = 0; i < data.regions[indexcontArr].regions.length; i++) {
						html += "<option class='cityname' value='"+i+"'>"+ data.regions[indexcontArr].regions[i].name+"</option>";
						}
						$(".city").html(html);											
					}
			)		
		})
		
		$(".city").on("change",function(){
			var indexcontArr= $(".contArr option:selected").index()-1,
					indexcity=$(".city option:selected").index()-1;
				console.log(indexcity);
			$.get(
					"../data/address.json",
					function(data){
						console.log('1')
						var html="<option>- - 请选择 - </option>";
						for (var i = 0; i < data.regions[indexcontArr].regions[indexcity].regions.length; i++) {
						html += "<option class='sentname' value='"+i+"'>"+ data.regions[indexcontArr].regions[indexcity].regions[i].name+"</option>";
						}
						$(".sent").html(html);					
					}
			)	
		})
	
	//商品清单
	$.cookie.json = true;
	var products = $.cookie('products');
		$.each(products, function(index,element){ 
			var num = 0;
			num +=element.price*element.amount+300; 
		$('<tbody>'+
				'<tr>'+
					'<th colspan="20"><strong>店铺：<a href="##">'+element.dname+'</a></strong>'+
						'<div class="store-sale">'+
						'</div>'+
					'</th>'+
				'</tr>'+
				'<tr id="cart_item_713" class="shop-list ">'+
					'<td> <input value="713|1" name="cart_id[]" type="hidden">'+
					'</td>'+
					'<td class="w60">'+
						'<a href="##" class="ncc-goods-thumb"><img src="'+element.src+'" alt="'+element.name+'"></a>'+
					'</td>'+
					'<td class="tl">'+
						'<dl class="ncc-goods-info">'+
							'<dt><a href="##">'+element.name+'</a></dt>'+
						'</dl>'+
					'</td>'+
					'<td class="w120"><em>'+element.price+'.00</em></td>'+
					'<td class="w60">'+element.amount+'</td>'+
					'<td class="w120"> <em id="item713_subtotal" nc_type="eachGoodsTotal">'+element.price*element.amount+'.00</em>'+
					'</td>'+
					'<td></td>'+
				'</tr>'+
				'<tr>'+
					'<td class="w10"></td>'+
					'<td class="tl" colspan="2">买家留言：'+
						'<textarea name="" class="ncc-msg-textarea" placeholder="选填：对本次交易的说明（建议填写已经和商家达成一致的说明）" title="选填：对本次交易的说明（建议填写已经和商家达成一致的说明）" maxlength="150">'+
						'</textarea>'+
					'</td>'+
					'<td class="tl" colspan="10">'+
						'<div class="ncc-form-default"> </div>'+
					'</td>'+
				'</tr>'+
				'<tr>'+
					'<td class="tr" colspan="20">'+
						'<div class="ncc-store-account">'+
							'<dl class="freight">'+
								'<dt>运费：</dt>'+
								'<dd><em id="eachStoreFreight_8763">300.00</em>元</dd>'+
							'</dl>'+
							'<dl>'+
								'<dt>商品金额：</dt>'+
								'<dd><em id="eachStoreGoodsTotal_8763">'+element.price*element.amount+'.00</em>元</dd>'+
							'</dl>'+
							'<dl class="total">'+
								'<dt>本店合计：</dt>'+
								'<dd><em store_id="8763" class="eachStoreTotal">'+num+'.00</em>元</dd>'+
							'</dl>'+
						'</div>'+
						'<h2 style="font-size:14px; color:#F00">提示：48小时内未及时付款订单会被自动取消，请及时付款。</h2></td>'+
				'</tr>'+
			'</tbody>').insertAfter('thead').data('product',element);
		});	
	
		var total = 0;
		$(".eachStoreTotal").each(function(index, element){
			total += parseFloat($(this).text());
		});
		// 显示合计金额
		$("#orderTotal").text(total+'.00');
		
		
		//收货人信息
		$.cookie.json = true;
		var dz = $.cookie('place');
		if (!dz||dz.length===0) {
				$("#com1").css("display","block");
				$("#com2").css("display","none");
				$("#payment_list").css("display","none");
				$("#paymentCon").removeClass("current_box");
				$("#edit_payment").css("display","inline-block");
				$("#edit_reciver").css("display","inline-block");
		}else{
				$("#com1").css("display","none");
				$("#com2").css("display","block");
				$("#payment_list").css("display","block");
				$("#paymentCon").addClass("current_box");
				$("#edit_payment").css("display","none");
				$("#edit_reciver").css("display","none");

					$(".true-name").append(dz.tn)
					$(".address").append(dz.ads+"   "+dz.adx);
					$(".phone").append(dz.mob);
			
		}
			
		
		
		
		
		//收货人信息
		$("#mob_phone").keyup(function () {
			var reg = /^1[34578]\d{9}$/g,
				moblleVal = $(this).val(),
			res = reg.test(moblleVal);		
			if(moblleVal === ""){
				$("#mob_phone").next(".error").text("手机号码或固定电话请至少填写一个");
			}else{	
				if (!res) {
					$("#mob_phone").next(".error").text("手机号码不正确");			
				}else{
					$("#mob_phone").next(".error").text("");	
				}
			}	
		})
		$("#true_name").keyup(function () {
			if ($("#true_name").val()!=="") {
				$("#true_name").next(".error").text("");
			}
		})
		$("#address").keyup(function () {
			if($("#address").val()!==""){
				$("#address").next(".error").text("");
			}
		})
		
		//填写核对购物信息
		$("#hide_addr_list").click(function () {
			if ($("#true_name").val()==="") {
				$("#true_name").next(".error").text("请填写收货人姓名");
			}
			if($("#address").val()===""){
				$("#address").next(".error").text("请填写收货人详细地址");
			}
			if($("#mob_phone").val()===""){
				$("#mob_phone").next(".error").text("手机号码或固定电话请至少填写一个");
			}
			if ($(".error").text()===""&&$(".sent").text()==="") {
				alert("请选择所在地区");
			}
			if ($(".error").text()===""&&$(".sent").text()!=="") {
				$("#com1").css("display","none");
				$("#com2").css("display","block");
				$("#payment_list").css("display","block");
				$("#paymentCon").addClass("current_box");
				$("#edit_payment").css("display","none");
				$("#edit_reciver").css("display","none");
				var tn = $("#true_name").val();
				var ads = $(".contArr option:checked").text()+"  "+$(".city option:checked").text()+"  "+$(".sent option:checked").text();
				var adx = $("#address").val();
				var mob = $("#mob_phone").val();
//				$(".true-name").text(tn);
//				$(".address").text(ads+"   "+adx);
//				$(".phone").text(mob);
				
				var place={
					tn : tn,
					ads : ads,
					adx : adx,
					mob : mob
				}
				$("#com3").css("display","block");
				$.cookie.json = true;
				$.cookie("place",place,{expires:7,path:'/'});
				var dz = $.cookie('place');
					$(".true-name").append(dz.tn);
					$(".address").append(dz.ads+"   "+dz.adx);
					$(".phone").append(dz.mob);
			}			
		})
		
		
		$("#edit_reciver").click(function () {
			$("#com1").css("display","block");
			$("#com2").css("display","none");
			$(".true-name").first().text("");
			$(".address").first().text("");
			$(".phone").first().text("");
			
		})
		
		
		$("#edit_payment").click(function () {
			$("#payment_list").css("display","block");
			$("#paymentCon").addClass("current_box");
			$("#edit_payment").css("display","none");
		})
		$("#hide_payment_list").click(function () {
			$("#payment_list").css("display","none");
			$("#paymentCon").removeClass("current_box");
			$("#edit_payment").css("display","inline-block");
			$("#edit_reciver").css("display","inline-block");
		})
		
		$.cookie.json = true;
		var cc = $.cookie('cc');
		if (!cc||cc.length===0) {	
				window.location.href='login.html';
		}
		if($("#onehead").css("display")==="block"){
			window.location.href='login.html';
		}
		
})
