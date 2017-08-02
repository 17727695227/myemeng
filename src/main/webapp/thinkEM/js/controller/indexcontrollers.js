var indexController = angular.module('indexController', []);
indexController.controller('appcontroller', function($scope, $http,$state, $stateParams,$timeout,$location) {

    if (window.screen.width<500) {
        $scope.phone=1;
        $scope.navShow=0;
        $scope.nav2Show=0;
        $scope.showNav = function(aa) {
            $scope.navShow=aa;
        };
        $scope.showNav2 = function(aa) {
            $scope.nav2Show=aa;
        };
    }else{
        $scope.phone=0;
        $scope.navShow=1;
        $scope.nav2Show=1;
        $scope.showNav = function(aa) {
            $scope.navShow=1;
        };
        $scope.showNav2 = function(aa) {
            $scope.nav2Show=1;
        };
    }
    //获取登录状态
    $scope.appusername="";
	  $scope.getusername = function() {
		     $http({
		        method: 'post',
		        url: './getUserMessage',
		         headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
		         transformRequest: function(obj) {  
		           var str = [];  
		           for(var p in obj){  
		             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
		           }  
		           return str.join("&");  
		         } 
		    
		        }).then(function successCallback(response) {
		        	$scope.appusername=response.data.username;

		            }, function errorCallback(response) {
		            	$scope.appusername="";

		               
		        });
		    };  
		    $scope.getusername();
		  //登出
		    $scope.getout = function() {
			     $http({
			        method: 'post',
			        url: './logout',
			        headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
			         transformRequest: function(obj) {  
			           var str = [];  
			           for(var p in obj){  
			             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
			           }  
			           return str.join("&");  
			         } 
			    
			        }).then(function successCallback(response) {
			            $scope.getusername();
			            
			            }, function errorCallback(response) {
			            	//登出
			               location.href = './index.html';
                     	   //location.reload();
	
			               
			        });
			    };  
			    
			    
			    $scope.submission = function() {
				     $http({
					        method: 'post',
					        url: './getUserMessage',
					         headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
					         transformRequest: function(obj) {  
					           var str = [];  
					           for(var p in obj){  
					             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
					           }  
					           return str.join("&");  
					         } 
					    
					        }).then(function successCallback(response) {
					        	if(response.data.username){
					        		/*./submisson.html*/
					        		//window.open("http://www.baidu.com");  
					        	}else{
					        		alert("请先登录再投稿！~");
					        	}
					            }, function errorCallback(response) {
					            	console.log("请求投稿失败");		
					               
					        });
				    }; 
		
	$scope.allsearch={
			value:'',
	};
    $scope.lessonsearch={value:''};
    $scope.teachersearchText={value:''};
		    
		  //初始化分页数据变量  
		    $scope.listRequest='./passage/search/list';
		    $scope.page={
		         requstarray:[1],
		         totalRecord:0,
		         currentPage:1,
		         pageSize:11,
		         totalPage:0,
		         currentindex:0,
		              data:[],
		     } 
		    //设置分页的数据
		    $scope.pagingOptions = {
		       totalRecord:0,
		       currentPage: 0,
		       totalPage:0,
		    };
		    // 当前列表
		    $scope.detaildata=[];
		    //热点列表
		    $scope.recommentListdata=[];   
		    //获取文章列表： 
		    $scope.getsearchData = function() {
		    	if($scope.allsearch.value){
					    $http({
					       method: 'post',
					       url: $scope.listRequest,
					       data: {
					    	   	  searchInfo:$scope.allsearch.value,
					              pageSize:$scope.page.pageSize,
					              pageNum: $scope.page.requstarray[$scope.page.currentindex],
					          } ,
					          headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
					          transformRequest: function(obj) {  
					              var str = [];  
					              for(var p in obj){  
					                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
					              }  
					              return str.join("&");  
					            } 
					       }).then(function successCallback(response) {
					              $scope.page.data[$scope.page.currentindex]=response.data.dataList;//
					              $scope.page.totalRecord=response.data.totalRecord,
					              $scope.page.totalPage=response.data.totalPage,
					              $scope.page.currentPage=$scope.page.requstarray[$scope.page.currentindex],
					              //传给分页插件
					              $scope.pagingOptions = {
					                   totalRecord: $scope.page.totalRecord,
					                   currentPage: $scope.page.requstarray[$scope.page.currentindex],
					                   totalPage:   $scope.page.totalPage,
					               };
					              	//		              跳转
					              $location.path('/search');
					           }, function errorCallback(response) {
					               $scope.pagingOptions = {
					                   totalRecord: $scope.page.totalRecord,
					                   currentPage: $scope.page.currentPage,
					                   totalPage:   $scope.page.totalPage,
					               };
					       });
		    	};
		    };   
		    
		    $scope.mykey = function (e) {      
	            var keycode = window.event ? e.keyCode : e.which;//获取按键编码  
	            if (keycode == 13) {  
	                $scope.getsearchData();//如果等于回车键编码执行方法  
	            }  
	        };  
	        
	        //获取推荐

	 	   //recommandList


	 	    $scope.allRecommand=[];
	 	  //获取文章列表：
	 	    $scope.getRecommandList = function() {
	 	     $http({
	 	        method: 'post',
	 	        url: "./passage/passagelist",
	 	        data: {
	 	               passageType:12,
	 	               pageSize:7,
	 	               pageNum:1,
	 	           } ,
	 	         headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
	 	         transformRequest: function(obj) {  
	 	           var str = [];  
	 	           for(var p in obj){  
	 	             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
	 	           }  
	 	           return str.join("&");  
	 	         }  
	 	        }).then(function successCallback(response) {
	 	               $scope.allRecommand=response.data.passagePage.dataList;
	 	            }, function errorCallback(response) {
	 	        });
	 	    };

	 	    $scope.getRecommandList();
	 	    //获取文章附件
				

});


//导航栏
indexController.controller('navigationCtr', function($scope, $http,$state, $stateParams,$timeout,$location) {
	  $scope.getnavigation = function() {
		     $http({
		        method: 'post',
		        url: './//main',
		         headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
		         transformRequest: function(obj) {  
		           var str = [];  
		           for(var p in obj){  
		             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
		           }  
		           return str.join("&");  
		         } 
		    
		        }).then(function successCallback(response) {
		             // 赋值
		                $scope.navigationList=response.data.navigationList; 
		            }, function errorCallback(response) {

		              
		        });
		    };  
		    $scope.getnavigation();
});

//轮播图
indexController.controller('playCtr', function($scope, $http,$state, $stateParams,$timeout,$location) {
	$scope.player=[];
	$scope.getPlayer = function() {
		     $http({
		        method: 'post',
		        url: './banner/getAllBanner',
		         headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
		         transformRequest: function(obj) {  
		           var str = [];  
		           for(var p in obj){  
		             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
		           }  
		           return str.join("&");  
		         } 
		        }).then(function successCallback(response) {
		             // 赋值
		                $scope.player=response.data; 
		            }, function errorCallback(response) {
		              
		        });
		    };  
		    $scope.getPlayer();
		    
		    $(function(){
                $("#myCarousel").carousel('cycle');
        });
});


//首页
indexController.controller('indexALL', function($scope, $http,$state, $stateParams,$timeout,$location) {

    
    
	$scope.getHome = function() {
		     $http({
		        method: 'post',
		        url: './//main',
		         headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
		         transformRequest: function(obj) {  
		           var str = [];  
		           for(var p in obj){  
		             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
		           }  
		           return str.join("&");  
		         } 
		    
		        }).then(function successCallback(response) {
		             // 赋值
		                $scope.dynamicList=response.data.dynamicList;
		                $scope.headlineList=response.data.headlineList;
		                $scope.linkList=response.data.linkList.slice(0,30);
		                $scope.meeting=response.data.meeting.dataList;
/*		                $scope.navigationList=response.data.navigationList;
*/		                $scope.newestPassageList=response.data.newestPassageList;
		                $scope.postList=response.data.postList;
		            }, function errorCallback(response) {

		               
		        });
		    };  
		    $scope.getHome();
		    
    
    
    $scope.schoollist=[];
    $scope.getschoolByType2 = function(a) {
        $("[active]").children('li').toggleClass('active',false);
        $("[active]").children('li').eq(a-1).toggleClass('active',true);
    	$scope.province='';
        $http({
             method: 'post',
             url: './selectSchoolsSelectiveByPage',
              headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
              data:{
             	 type:a,
             	currentPage:1,
             	pageSize:6,
              },
              transformRequest: function(obj) {  
                var str = [];  
                for(var p in obj){  
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
                }  
                return str.join("&");  
              } 
             }).then(function successCallback(response) {
                  // 赋值
                 $scope.schoollist=response.data.dataList;
                 }, function errorCallback(response) {
             }); 
    }
	
    $scope.getschoolByType2(1);  
    
  //论坛
	$scope.indexSaying=[];
    $scope.indexSayinglistRequest=['./userpostPageVist', './userpostPage'];
	//获取文章列indexSaying表：
    $scope.sayingtypeAr=['hotPost','update'];
    $scope.sayingtype=$scope.sayingtypeAr[0] 

    $scope.getSayingData= function(type) {
    	$scope.sayingtype=$scope.sayingtypeAr[type] 
     $(".sayingTab").toggleClass('active',false);
	 $(".sayingTab").eq(type).toggleClass('active',true);
     $http({
        method: 'post',
        url: $scope.indexSayinglistRequest[type],
        data: {
               pageSize:8,
               pageNum: 1,
           } ,
         headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
         transformRequest: function(obj) {  
           var str = [];  
           for(var p in obj){  
             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
           }  
           return str.join("&");  
         }  
        }).then(function successCallback(response) {
               $scope.indexSaying=response.data.postList.dataList;//
            }, function errorCallback(response) {
               $scope.indexSaying=[]//
        });
    };
    $scope.getSayingData(0);
    
	  
    //首页名师
    $scope.indexTeacher=[];
    //获取名师列表：
    $scope.getindexTeacherData = function() {
     $http({
        method: 'post',
        url: './teacher/getAllTeacherByPage',
        data: { 
            currentPage: 1,
            pageSize:3,
            type:0,
           },
         headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
         transformRequest: function(obj) {  
           var str = [];  
           for(var p in obj){  
             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
           }  
           return str.join("&");  
         } 
       }).then(function successCallback(response) {
             // 赋值
               $scope.indexTeacher=response.data.dataList;//
            }, function errorCallback(response){
        });
    };
    $scope.getindexTeacherData();
    
     
  
	
	
	
	
});



indexController.filter('htmlContent', function($sce) {
  return function(input){
    return $sce.trustAsHtml(input);
  }
});
/*

indexController.filter('reverse', function() { //可以注入依赖
	/!*return function(text) {
	 return new Date(text).toLocaleDateString();
	 }*!/
    return function(text) {
        //获取到的时间：new Date(text)
        //当前时间：        new Date()
        var nowtime=new Date();
        var objtime=new Date(text);
        if(nowtime.getFullYear()!=objtime.getFullYear()){//年份不一样
            var year = objtime.getFullYear(); //getFullYear getYear
            var month = objtime.getMonth();
            if (month < 10) month = "0" + month;
            return year+'年'+month+'月';//显示为年月
        }else{//年份一样
            if(nowtime.getMonth()!=objtime.getMonth()||nowtime.getDate()!=objtime.getDate()){//年份一样，判断是否同一日，不同一日
                var month = objtime.getMonth();
                var date = objtime.getDate();
                if (month < 10) month = "0" + month;
                if (date < 10) date = "0" + date;
                return month+'月'+date+'日';//显示月日
            }else{
                var hour = objtime.getHours();
                var minu = objtime.getMinutes();
                var sec = objtime.getSeconds();
                if (hour < 10) hour = "0" + hour;
                if (minu < 10) minu = "0" + minu;
                if (sec < 10) sec = "0" + sec;
                return hour+':'+minu+':'+sec;//显示时间时分
            }
        }
        return '未知时间';
    }


});*/

indexController.filter('reverse', function() { //可以注入依赖
    return function(text) {
        var objtime=new Date(text);
        var year = objtime.getFullYear(); //getFullYear getYear
        var month = objtime.getMonth()+1;
        var date = objtime.getDate();
        var hour = objtime.getHours();
        var minu = objtime.getMinutes();
        var sec = objtime.getSeconds();
        if (month < 10) month = "0" + month;
        if (date < 10) date = "0" + date;
        if (hour < 10) hour = "0" + hour;
        if (minu < 10) minu = "0" + minu;
        if (sec < 10) sec = "0" + sec;
        return  year + "/" + month + "/" + date ;
    }
});

indexController.filter('reverse2', function() { //可以注入依赖
    return function(text) {
        var objtime=new Date(text);
        var year = objtime.getFullYear(); //getFullYear getYear
        var month = objtime.getMonth()+1;
        var date = objtime.getDate();
        var hour = objtime.getHours();
        var minu = objtime.getMinutes();
        if (month < 10) month = "0" + month;
        if (date < 10) date = "0" + date;
        if (hour < 10) hour = "0" + hour;
        if (minu < 10) minu = "0" + minu;
        return  year + "/" + month + "/" + date + " " + hour + ":" + minu ;
    }
});


indexController.filter('reverse3', function() { //可以注入依赖
    return function(type) {
//    	1-最新资料，2-思政动态，
//    	3-马院头条，
//    	4-经典作家，5-领导讲话，6-厅部文件，7-通知公告，
//    	8-改革动态，9学科建设，10-评估排行，11-科研前沿，
//    	12-热点难 ，
////    13-课程基础，14-课程概论，15-热点难点，
////    16-课程纲要，
// //   	17-理论剖析，18-参考资料，19-案例资源，20-教案推荐，21-精品课件，22-视频资源，//23-阅读书目，
//    	24-精品在线,25名师新论26新秀论坛
    	var map=[
    	    "#/index",
			"#/passage/latestnews/",//1
			"#/passage/IPstate/",
			"#/passage/headline/",
            "#/authority/author/",
            "#/authority/speach/",//5
            "#/authority/document/",
            "#/authority/inform/",
            "#/horse/reform/",
            "#/horse/constrution/",
            "#/horse/range/",//10
            "#/horse/science/",//11
            "#/passage/recommend/",//12
            "#/lesson/foundation/catalogue/",//13
            "#/lesson/generality/catalogue/",
            "#/lesson/principle/catalogue/",//15
            "#/lesson/essential/catalogue/",
            "/theories/",//17
	        "/references/",//18
	        "/cases/",//19
	        "/schemes/",//20
	        "/courseware/",//21
	        "/vidios/",//22
	        "#/lesson/foundation/booklist/",
	        "#/passage/qualityOnline/",//
			"#/teacher/newtheory/",
			"#/teacher/forum/",//26
    	     ]
        return map[type];
    }
    
});




indexController.filter('reverse4', function() { //可以注入依赖
    return function(type) {

    	var map=[
    	    "#/teacher/elegant/",
			"#/teacher/rookie/",//1
    	     ]
        return map[type];
    }
});
indexController.filter('reverse5', function() { //可以注入依赖
    return function(msg) {
    	var map=[
    	    "images/good.jpg",//1
			"images/good-orange.jpg",//2
    	     ]
        return map[msg-1];
    }
});




indexController.filter('reverse6', function() { //可以注入依赖
    return function(s) {
    	if(s){
    	var a=s.substr(s.lastIndexOf("\/")+1);
        var b=s.substr(s.lastIndexOf("\\")+1);
        if(a.length>b.length){
        	return b;
        }
        return a;
    	}
    }
});



indexController.filter('reverseDate', function() { //可以注入依赖
    return function(s) {
//当前时间new Date();
//请求获得的时间new Date(text).toLocaleDateString();
    	
        return a;
    }
});


