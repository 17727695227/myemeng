/**
 * Created by guiliang on 2017/6/30 0030.
 */
$(function () {
    layui.use(['laypage', 'layer', 'form'], function () {
        var layer = layui.layer;
        $('#login_button').on('click',function(){
        	var username = $('#username').val();
        	var password = $('#pass').val();
            $.ajax({
                url: "../login",    //请求的url地址
                dataType: "json",   //返回格式为json
                async: true, //请求是否异步，默认为异步，这也是ajax重要特性
                data:{'username':username,'password':password},
                type: "POST",   //请求方式
                success: function(data) {
                    //请求出错处理
                    /*alert('获取总页数失败');*/
                	if(data=='index'){
                		console.log('hh');
                		layer.msg("登录成功", {icon: 6},function () {
                			console.log('hh2');	
                    	location.href = './indexEM.html';
                    });
                		}
                	else {layer.alert('账户或者密码失败', {icon: 9},function () {
                    	location.href = './login.html'
                    });}
                    
                },
                error: function(){
                    layer.alert("请求失败", {icon: 9},function () {
                       
                    	location.href = '../thinkEM/login.html'
                    });

                }
            });
        })
        
    });

})