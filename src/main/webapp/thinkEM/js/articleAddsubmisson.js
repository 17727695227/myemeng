/**
 * Created by guiliang on 2017/7/1 0001.
 */
/**
 * Created by guiliang on 2017/6/15 0015.
 */
$(function () {
	var annex='';
    $("#article_annex").on('change',function () {
        var fileinput = $("#article_annex");
        var file = fileinput[0].files[0];
        var formData1 = new FormData();
        formData1.append("annex1",file);

        $.ajax({
            url: "../meetingupload",    //请求的url地址
            dataType: "json",   //返回格式为json
            async: true, //请求是否异步，默认为异步，这也是ajax重要特性
            processData: false,    //必须设置
            contentType: false,    //必须设置
            data:formData1,
            /*data: {'title':meeting_title,'content':meeting_content,'link':meeting_link,'type':meeting_type,'release_date':new Date(meeting_releaseDate),'code':meeting_code,'annex':formData},    //参数值 可能不用*/
            type: "POST",   //请求方式
            success: function(data) {

                console.log(data.annex);
                annex = data.annex;

            },
            error: function(){
                console.log('上传文件失败');
            }
        });

    })

    $("#article_submit").on('click',function (e) {
        var $article_content = layedit.getContent(editIndex);
        var $article_title = $('#L_title').val();
        var $article_author = $('#L_author').val();
        var $article_link = $('#L_link').val();
        $.ajax({
            url: "../submit/passage",    //请求的url地址
            dataType: "json",   //返回格式为json
            async: true, //请求是否异步，默认为异步，这也是ajax重要特性
            data: {'link':$article_link,'annex':annex,'titile':$article_title,'content':$article_content},    //参数值 可能不用
            type: "POST",   //请求方式
            success: function(data) {
                layer.alert("投稿成功", {icon: 6},function () {
                	location.reload();
                });
            },
            error: function() {
                layer.alert("投稿失败", {icon: 9},function () {
                    location.reload();
                });
            }
        });
        return false;
    })

    layui.use(['layedit'], function() {
        layedit = layui.layedit;
        layedit.set({
            uploadImage: {
                url: "../picupload" //接口url
                ,type: 'post' //默认post
                ,sucess:function(e) {
                    console.log(e);
                }
            }
        })
        //创建一个编辑器
        editIndex = layedit.build('L_content',{
        	height:480
        });
    })

})