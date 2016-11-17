/***
 * 图片、文件上传插件
 * author:xiaoymin@foxmail.com
 * time:2016-5-8 20:05:16
 * plugin-dependency:jqwidgetsfileupload.js 、jquery.js
 * 调用方法  $(selector).fileupload(); selector 最好是input隐藏表单域
 * @param $
 */
(function($){
	$.fn.fileupload=function(options){
		var method=arguments[0];
		if(fileuploadMethods[method]) {
			method = fileuploadMethods[method];
			arguments = Array.prototype.slice.call(arguments, 1);
		} else if( typeof(method) == 'object' || !method ) {
			method = fileuploadMethods.init;
		} else {
			$.log( 'Method ' +  method + ' does not exist on jQuery.pluginName' );
			return this;
		}
		return method.apply(this, arguments);
	}
	
	var fileuploadMethods={
		init:function(options){
			return this.each(function(){
				var that=$(this);
				var settings = that.data('fileupload');
				if(typeof(settings) == 'undefined') {
					var defaults = {
						autoUpload:true,
						multipleFilesUpload:true, 
						uploadUrl: "/api/cms/material/uploadMaterial.htm",
						fileInputName: 'file',
						browseTemplate: 'success'
					}
					settings = $.extend({}, defaults, options);
					that.data('fileupload', settings);
				} else {
					settings = $.extend({}, settings, options);
				}

				//依赖jqwights
				//单图上传
				//图片 input 隐藏域,用于提交表单值
				//在隐藏域下面创建div框
				var image=that;
				var id=image.attr("id");
				var logo=$("<div></div>");
				logo.attr("id",id+"_upload_file_div");
				//创建隐藏表单域
				//var hidden_input=$("<input type='hidden' name='"+id+"' /> ")
				//logo.append(hidden_input);
				image.after(logo);
				//实例化上传控件
				logo.jqxFileUpload({autoUpload:settings.autoUpload, uploadUrl:settings.uploadUrl, fileInputName: settings.fileInputName ,browseTemplate: settings.browseTemplate});
				//单文件上传,不需要显示 全部上传、全部取消按钮，直接remove掉，免得影响美观
				logo.find(".jqx-file-upload-buttons-container").remove();
				//取消 button的默认事件,这里的button默认事件是提交表单,是bug,只能手动去掉
				logo.find("button").on("click",function(e){
					e.preventDefault();
				})
				var pid=id+"_upload_image_preview_div";
				//判断是否是图片
				var imgExp=new RegExp(".*?\.(jpg|png|jpeg|bmp|gif)","ig");
				//处理图片上传完成后的事件操作
				logo.on("uploadEnd",function(event){
					var preResp=event.args.response;
					//这里正则去除多余的标签
					var regex=/<pre style=\".*?\">(.*?)<\/pre>/gim;
					if(regex.test(preResp)){
						var resp=eval("("+RegExp.$1+")");
						var url=resp.data[0].url;
						var media_id=resp.data[0].media_id;
						//给隐藏域赋值
						$("#"+id).val(url);
						if($("#"+pid).length>0){
							//存在 直接赋值
							var preview=$("#"+pid);
							preview.html("");
							var previewA=$("<a></a>");
							if(url.match(imgExp)!=null){
							//if(imgExp.test($.trim(url))){
								previewA.addClass("thumbnail");
								//图片
								var img=$("<img  style='width:250px;height:200px;'>");
								img[0].src=url;
								previewA.append(img);
							}else{
								previewA.attr("alt",url);
								var mediaName=url.substring(url.lastIndexOf("/")+1);
								previewA.html("").html(mediaName);
								previewA.attr("href",url).attr("target","_blank");
							}
							preview.append(previewA);
						}else{
							//创建预览div
							var preview=$("<div style='margin:5px;'></div>");
							preview.attr("id",pid);
							preview.addClass("col-xs-6 col-md-3");
							var previewA=$("<a></a>");
							if(imgExp.test(url)){
								previewA.addClass("thumbnail");
								var img=$("<img  style='width:250px;height:200px;'>");
								img[0].src=url;
								previewA.append(img);
							}else{
								//附件
								previewA.attr("alt",url);
								var mediaName=url.substring(url.lastIndexOf("/")+1);
								previewA.html("").html(mediaName);
								previewA.attr("href",url).attr("target","_blank");
							}
							
							preview.append(previewA);
							logo.append(preview);
						}
					}
				})
				//判断是否url是有值的,如果有,创建默认预览,初始化的情况
				if($("#"+id).val()){
					//创建预览div
					var preview=$("<div style='margin:5px;'></div>");
					preview.attr("id",pid);
					preview.addClass("col-xs-6 col-md-3");
					var previewA=$("<a></a>");
					var url=$("#"+id).val();
					if(imgExp.test(url)){
						previewA.addClass("thumbnail");
						var img=$("<img  style='width:250px;height:200px;'>");
						img[0].src=$("#"+id).val();
						previewA.append(img);
					}else{
						//附件
						//http://oss.drore.com/material/e65a026b11ad4c6e98816f716e8f2e66/201605/09/b16bcad062f94035a568d0fea1b1e75f.json
						//var mediaExp=/.*?\/\(.*?\\.\).*/gim;
						previewA.attr("alt",url);
						var mediaName=url.substring(url.lastIndexOf("/")+1);
						previewA.html("").html(mediaName);
						previewA.attr("href",url).attr("target","_blank");
					}
					preview.append(previewA);
					logo.append(preview);
				}
			})
		},setValue:function (value) {
			var that=this.eq(0);
			//判断是否是图片
			var imgExp=new RegExp(".*?\.(jpg|png|jpeg|bmp|gif)","ig");
			var id=that.attr("id");
			var pid=id+"_upload_image_preview_div";
			var parent=$("#"+id+"_upload_file_div");
			if(typeof (value)!="undefined"&&value!=""){
				//创建预览div
				var preview=$("<div style='margin:5px;'></div>");
				preview.attr("id",pid);
				preview.addClass("col-xs-6 col-md-3");
				var previewA=$("<a></a>");
				var url=$("#"+id).val();
				if(imgExp.test(url)){
					previewA.addClass("thumbnail");
					var img=$("<img  style='width:250px;height:200px;'>");
					img[0].src=$("#"+id).val();
					previewA.append(img);
				}else{
					//附件
					//http://oss.drore.com/material/e65a026b11ad4c6e98816f716e8f2e66/201605/09/b16bcad062f94035a568d0fea1b1e75f.json
					//var mediaExp=/.*?\/\(.*?\\.\).*/gim;
					previewA.attr("alt",url);
					var mediaName=url.substring(url.lastIndexOf("/")+1);
					previewA.html("").html(mediaName);
					previewA.attr("href",url).attr("target","_blank");
				}
				preview.append(previewA);
				parent.append(preview);
			}
		},getParent:function () {
			var that=this.eq(0);
			var id=that.attr("id");
			return $("#"+id+"_upload_file_div");
		}
	}
})(jQuery)