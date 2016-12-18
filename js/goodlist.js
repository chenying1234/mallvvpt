$(function() {
	$('#files').tree({
		expanded: 'li:lt(2)'
	});

	$('span[nc_type="show"]').click(function() {
		s = $(this).parents('dd').prev().find('li[nc_type="none"]');
		if(s.css('display') == 'none') {
			s.show();
			$(this).html('<i class="icon-angle-up"></i>收起');
		} else {
			s.hide();
			$(this).html('<i class="icon-angle-down"></i>更多');
		}
	});
	
	$.ajax({
	    type: "get",
	    url: "../data/goodlist.json", 
	    dataType:"json",
	    success: function(data){
	        $.each(data, function(i,n){
	        	$('<li class="item">'+
					'<div class="goods-content" nctype_goods=" 101948" nctype_store="8739">'+
						'<div class="goods-pic">'+
							'<a href="'+n.href+'" title="'+n.title+'"><img src="'+n.src+'" title="'+n.title+'" alt="'+n.title+'"></a>'+
						'</div>'+
						'<div class="goods-info">'+
							'<div class="goods-name">'+
								'<a href="'+n.href+'" title="'+n.em+'">'+n.title+'<em class="good_num" style="display: inline-block;">'+n.em+'</em></a>'+
							'</div>'+
							'<div class="goods-price"> <em class="sale-price" title="商城价：¥'+n.aprice+'.00">¥'+n.aprice+'.00</em> <em class="market-price" title="市场价：¥'+n.sprice+'.00">¥'+n.sprice+'.00</em>'+
							'</div>'+
							'<div class="stock-account"><span class="fir_span">库存999</span><span class="sec_span"></span></div>'+
						'</div>'+
					'</div>'+
				'</li>').prependTo(".list_pic");
	        	
	       }); 	
		},
	});
	
});