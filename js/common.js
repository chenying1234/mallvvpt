
//图片垂直水平缩放裁切显示
(function($){
    $.fn.VMiddleImg = function(options) {
        var defaults={
            "width":null,
"height":null
        };
        var opts = $.extend({},defaults,options);
        return $(this).each(function() {
            var $this = $(this);
            var objHeight = $this.height(); //图片高度
            var objWidth = $this.width(); //图片宽度
            var parentHeight = opts.height||$this.parent().height(); //图片父容器高度
            var parentWidth = opts.width||$this.parent().width(); //图片父容器宽度
            var ratio = objHeight / objWidth;
            if (objHeight > parentHeight && objWidth > parentWidth) {
                if (objHeight > objWidth) { //赋值宽高
                    $this.width(parentWidth);
                    $this.height(parentWidth * ratio);
                } else {
                    $this.height(parentHeight);
                    $this.width(parentHeight / ratio);
                }
                objHeight = $this.height(); //重新获取宽高
                objWidth = $this.width();
                if (objHeight > objWidth) {
                    $this.css("top", (parentHeight - objHeight) / 2);
                    //定义top属性
                } else {
                    //定义left属性
                    $this.css("left", (parentWidth - objWidth) / 2);
                }
            }
            else {
                if (objWidth > parentWidth) {
                    $this.css("left", (parentWidth - objWidth) / 2);
                }
                $this.css("top", (parentHeight - objHeight) / 2);
            }
        });
    };
})(jQuery);
function DrawImage(ImgD,FitWidth,FitHeight){
    var image=new Image();
    image.src=ImgD.src;
    if(image.width>0 && image.height>0)
    {
        if(image.width/image.height>= FitWidth/FitHeight)
        {
            if(image.width>FitWidth)
            {
                ImgD.width=FitWidth;
                ImgD.height=(image.height*FitWidth)/image.width;
            }
            else
            {
                ImgD.width=image.width;
                ImgD.height=image.height;
            }
        }
        else
        {
            if(image.height>FitHeight)
            {
                ImgD.height=FitHeight;
                ImgD.width=(image.width*FitHeight)/image.height;
            }
            else
            {
                ImgD.width=image.width;
                ImgD.height=image.height;
            }
        }
    }
}

function showTips( tips, height, time ){
    var windowWidth = document.documentElement.clientWidth;
    var tipsDiv = '<div class="tipsClass">' + tips + '</div>';

    $( 'body' ).append( tipsDiv );
    $( 'div.tipsClass' ).css({
        'top' : 200 + 'px',
        'left' : ( windowWidth / 2 ) - ( tips.length * 13 / 2 ) + 'px',
        'position' : 'fixed',
        'padding' : '20px 50px',
        'background': '#EAF2FB',
        'font-size' : 14 + 'px',
        'margin' : '0 auto',
        'text-align': 'center',
        'width' : 'auto',
        'color' : '#333',
        'border' : 'solid 1px #A8CAED',
        'opacity' : '0.90',
        'z-index' : '9999'
    }).show();
    setTimeout( function(){$( 'div.tipsClass' ).fadeOut().remove();}, ( time * 1000 ) );
}


(function($) {
    $.fn.nc_region = function(options) {
        var $region = $(this);
        var settings = $.extend({}, {area_id: 0, region_span_class: "_region_value"}, options);

        return this.each(function() {
            var $inputArea = $(this);
            if($inputArea.val() === '') {
                initArea($inputArea);
            } else {
                var $region_span = $('<span class="' + settings.region_span_class + '">' + $inputArea.val() + '</span>');
                var $region_btn = $('<input type="button" value="编辑" />');
                $inputArea.after($region_span);
                $region_span.after($region_btn);
                $region_btn.on("click", function() {
                    $region_span.hide();
                    $region_btn.hide();
                    initArea($inputArea);
                });
            }
        });

        function initArea($inputArea) {
            settings.$area = $('<select></select>');
            $inputArea.after(settings.$area);
            loadAreaArray(function() {
                loadArea(settings.$area, settings.area_id);
            });
        }

        function loadArea($area, area_id){
            if($area && nc_a[area_id].length > 0){
                var areas = [];
                areas = nc_a[area_id];
                $area.append("<option>-请选择-</option>");
                for (i = 0; i <areas.length; i++){
                    $area.append("<option value='" + areas[i][0] + "'>" + areas[i][1] + "</option>");
                }
            }

            $area.on('change', function() {
                $(this).nextAll("select").remove();

                var region_value = '';
                $region.nextAll("select").each(function() {
                    region_value += $(this).find("option:selected").text() + ' ';
                });
                $region.val(region_value);

                var area_id = $(this).val();
                if(area_id > 0) {
                    if(nc_a[area_id] && nc_a[area_id].length > 0) {
                        var $newArea = $('<select></select>');
                        $(this).after($newArea);
                        loadArea($newArea, area_id);
                    }
                }
            });
        }

        function loadAreaArray(callback) {
            if(typeof nc_a === 'undefined') {
                //取JS目录的地址
                var area_scripts_src = '';
                area_scripts_src = $("script[src*='jquery.js']").attr("src");
                area_scripts_src = area_scripts_src.replace('jquery.js', 'area_array.js');
                $.ajax({
                    url: area_scripts_src,
                    async: false,
                    dataType: "script"
                }).done(function(){
                    callback();
                });
            } else {
                callback();
            }
        }
    };
})(jQuery);


