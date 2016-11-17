/**
 * Created by Administrator on 2016/11/17.
 */

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
                    speed:30,
                    prevBtn:'.prev',
                    nextBtn:'.next'
                };
                settings = $.extend({}, defaults, option);

                var slideDiv = $(settings.slideDiv),
                    slideSpeed = settings.speed,
                    prev = $(settings.prevBtn),
                    next = $(settings.nextBtn);

                var thisWidth = that.width(),
                    imgWidth;


                var LeftTimer = null,
                    rightTimer = null,
                    autoPlayTime = null;

                //设置一个数，为了每次移动存入新值
                var oldWidth = 0;

                //进来后默认自动播放
                autoPlay();

                slideDiv.hover(function(){
                    clearInterval(autoPlayTime);
                },function(){
                    autoPlay()
                });

                prev.hover(function(){
                    clearInterval(autoPlayTime);
                    LeftTimer = setInterval(function(){leftMove(slideDiv)},slideSpeed);
                },function(){
                    clearInterval(LeftTimer);
                    autoPlay();
                });

                next.hover(function(){
                    clearInterval(autoPlayTime);
                    rightTimer = setInterval(function(){rightMove(slideDiv)},slideSpeed)
                },function(){
                    clearInterval(rightTimer);
                    autoPlay();
                });


                //自动播放
                function autoPlay(){
                    autoPlayTime = setInterval(function(){rightMove(slideDiv)},slideSpeed)
                };

                //向左移动
                function leftMove(obj){
                    imgWidth = slideDiv.width();
                    if(oldWidth == imgWidth){
                        var bigImgLSet = slideDiv.position().left;
                        var nowLeft = bigImgLSet + oldWidth;
                        if(bigImgLSet == 0){
                            obj.css('left',0)
                        }else if(nowLeft < oldWidth){
                            obj.css('left',bigImgLSet+10)
                        }
                    }
                    oldWidth = imgWidth;

                };

                //向右移动
                function rightMove(obj){
                    imgWidth = slideDiv.width();
                    if(oldWidth == imgWidth){
                        var bigImgLSet = slideDiv.position().left;
                        var objRight = -(oldWidth - thisWidth);

                        if(bigImgLSet > objRight ){
                            obj.css('left',bigImgLSet-10)
                        }else if(bigImgLSet == objRight){
                            obj.css('left',objRight)
                        };
                    }
                    oldWidth = imgWidth;
                }


                /*面向对象写法*/
               /*var slideDirection = function(){};
                slideDirection.prototype.left = function(obj){
                    imgWidth = slideDiv.width();
                    if(oldWidth == imgWidth){
                        var bigImgLSet = slideDiv.position().left;
                        var nowLeft = bigImgLSet + oldWidth;
                        if(bigImgLSet == 0){
                            obj.css('left',0)
                        }else if(nowLeft < oldWidth){
                            obj.css('left',bigImgLSet+10)
                        }
                    }
                    oldWidth = imgWidth;
                };
                slideDirection.prototype.right = function(obj){
                    imgWidth = slideDiv.width();
                    if(oldWidth == imgWidth){
                        var bigImgLSet = slideDiv.position().left;
                        var objRight = -(oldWidth - thisWidth);

                        if(bigImgLSet > objRight ){
                            obj.css('left',bigImgLSet-10)
                        }else if(bigImgLSet == objRight){
                            obj.css('left',objRight)
                        };
                    }
                    oldWidth = imgWidth;
                };
                var nowSlide = new slideDirection();
                nowSlide.right(slideDiv);*/


                /*模块化写法*/
               /* var ModuleSlide = (function(){
                    var slideOption = {
                        dom:$('#bigImg'),
                        direction:'left'
                    };

                    var settings = $.extend({}, slideOption, option);

                    var newSlide = function(settings){
                        this.dom = settings.dom;
                        this.dir = settings.direction;
                        this.left();
                    };
                    newSlide.prototype.left = function(){
                        console.log(this.dom);
                        console.log(this.dir);
                    };
                    return {
                        init:function(slideOption){
                            option = slideOption;
                            new newSlide(option);
                        }
                    }
                })();
                ModuleSlide.init({
                    dom:$('#testSlide'),
                    direction:'right'
                });
                */

            });
        }
    };
})(jQuery);

