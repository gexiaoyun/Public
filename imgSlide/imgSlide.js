(function($){

    $.fn.imgSlider = function(option){
        var method = arguments[0];

        // 检验方法是否存在
        if(slider[method]) {
            // 如果方法存在，存储起来以便使用
            // 注意：我这样做是为了等下更方便地使用each（）
            method = slider[method];
            arguments = Array.prototype.slice.call(arguments, 1);

            // 如果方法不存在，检验对象是否为一个对象（JSON对象）或者method方法没有被传入
        } else if( typeof(method) == 'object' || !method ) {

            // 如果我们传入的是一个对象参数，或者根本没有参数，init方法会被调用
            method = slider.init;
        } else {
            // 如果方法不存在或者参数没传入，则报出错误。需要调用的方法没有被正确调用
            $.error( 'Method ' +  method + ' does not exist on jQuery.slider' );
            return this;
        }

        // 调用我们选中的方法
        // 再一次注意我们是如何将each（）从这里转移到每个单独的方法上的
        return method.apply(this, arguments);

    };


    //var options = $.extend({},defaults, option);

    var slider = {
        init:function(option){
            return this.each(function(){
                var that = $(this),settings;
                var defaults = {
                    slideDiv: '#bigImg',
                    speed:30
                };
                settings = $.extend({}, defaults, option);

                var slideDiv = $(settings.slideDiv),
                    slideSpeed = settings.speed;

                var thisWidth = that.width(),
                    imgWidth = slideDiv.width();

                var LeftTimer = null,
                    rightTimer = null,
                    autoPlayTime = null;

                autoPlay();

                $('#bigImg').hover(function(){
                    clearInterval(autoPlayTime);
                },function(){
                    autoPlay()
                });

                $('.left-btn').hover(function(){
                    clearInterval(autoPlayTime);
                    LeftTimer = setInterval(function(){leftMove(slideDiv,imgWidth)},slideSpeed);
                },function(){
                    clearInterval(LeftTimer);
                    autoPlay();
                });

                $('.right-btn').hover(function(){
                    clearInterval(autoPlayTime);
                    rightTimer = setInterval(function(){rightMove(slideDiv,imgWidth)},slideSpeed)
                },function(){
                    clearInterval(rightTimer);
                    autoPlay();
                });


                //自动播放
                function autoPlay(){
                    autoPlayTime = setInterval(function(){rightMove(slideDiv,imgWidth)},slideSpeed)
                };

                //向左移动
                function leftMove(obj,imgWidth){
                    var bigImgLSet = slideDiv.position().left;
                    var nowLeft = bigImgLSet + imgWidth;
                    if(bigImgLSet == 0){
                        obj.css('left',0)
                    }else if(nowLeft < imgWidth){
                        obj.css('left',bigImgLSet+10)
                    }
                }

                //向右移动
                function rightMove(obj,imgWidth){
                    var bigImgLSet = slideDiv.position().left;
                    var objRight = -(imgWidth - thisWidth);
                    if(bigImgLSet > objRight ){
                        obj.css('left',bigImgLSet-10)
                    }else if(bigImgLSet == objRight){
                        obj.css('left',objRight)
                    };
                }
            });
        }
    };




})(jQuery);

