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
    