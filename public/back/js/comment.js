// 进度条


  // // 开启进度条
  // NProgress.start();

  // setTimeout(function(){
  //   // 结束进度条
  // NProgress.done();
  // },3000);
  

  // 实现在第一个 ajax 发送的时候，开启进度条
  // 在所有的 ajax 请求都完成的时候，结束进度条


  // 通过ajax 全局事件
  // 1.ajaxComplete 当每个ajax 请求完成的使用，调用(不管成功还是失败都调用)
  // 2.ajaxError    当 ajax 请求失败的时候，调用
  // 3.ajaxSuccess  当 ajax 请求成功的时候， 调用
  // 4.ajaxSend     当 ajax 请求发送前，调用
  // 5.ajaxStart    当第一个ajax 发送时，调用
  // 6.ajaxStop     在所有的 ajax 请求完成时，调用

  // ajaxStart 在第一个ajax 发送时，调用
  $(document).ajaxStart(function(){
    NProgress.start();
  });

  // ajaxStop 在所有的ajax 完成时，调用
  $(document).ajaxStop(function(){
    // 模拟网络延迟
    setTimeout(function(){
       // 关闭进度条
      NProgress.done();
    },5000);

    });


    // 首页
    $(function(){
      // 1.分类管理的切换功能
      $(".nav .category").click(function(){
        $(".nav .child").stop().slideToggle();
      });

      // 2.左侧侧边栏切换功能
      $(".icon_menu").click(function(){
        
        $(".lt-aside").toggleClass("hidemenu");
        $(".lt_topbar").toggleClass("hidemenu");
        $(".lt_main").toggleClass("hidemenu");
      });

      // 3.点击topbar退出按钮，弹出模态框
      $(".icon_logout").click(function(){
        // 显示模态框。显示模态框 modal("show");
        $("#logoutModal").modal("show");
      });

      // 4.点击模态框的退出按钮，实现退出功能
      $("#logoutBtn").click(function(){
        // 发送ajax 请求，进行退出
        console.log(1);
        $.ajax({
          type:"get",
          url:"/employee/employeeLogout",
          dataType:"json",
          success:function(info){
            console.log(info);
            if( info.success ){
              console.log(2);
              // 退出成功，跳转到登录页了
              location.href = "login.html";
            }
          }
        });
      });


    });
    