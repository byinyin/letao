$(function(){
  var currentPage = 1;
  var pageSize = 2;
  // 1.一进入页面，发送ajax请求，渲染页面
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/product/queryProductDetailList",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        // 使用模板引擎渲染页面
        // template("模板id",数据对象)
        var htmlStr =template("tpl",info);
        $("tbody").html( htmlStr );
  
        // 分页插件实现分页效果
        $("#paginator").bootstrapPaginator({
          // 版本号
          bootstrapMajorVersion:3,
          // 当前页
          currentPage:info.page,
          // 总页数
          totalPages:Math.ceil(info.total/ info.size),
          // 配置按钮大小
          size:"normal",
          // 配置按钮上显示的文字
          // 每个按钮在初始化的时候，都会调用一次这个函数，通过返回值进行文本设置
          // 参数1: type  取值 :page first last prev next
          // 参数2: page 指当前这个按钮所指向的页码
          // 参数3： current  当前页
          itemTexts:function( type, page, current){
             console.log( arguments );
            //  switch case
            switch(type){
              case "page":
                return page;
              case "first":
                return "首页";
              case  "last":
                return "尾页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页" ;      
            }
          },
          // 配置 title 提示信息
          // 每个按钮在初始化的时候，都会调用一次这个函数，通过返回值设置title 文本
          tooltipTitles:function(type,page,current){
            switch (type){
              case "page":
                return "前往第"+page+"页";
              case "first":
                return "首页";
              case "last":
                return "尾页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";        
            }
          },
          // 为按钮绑定点击事件
          onPageClicked:function(a,b,c,page){
            currentPage = page;
            render();
          }
        });
      }
    });
  }
  // 2.点击添加商品显示模态框
  $("#addBtn").click(function(){
    // 模态框显示
    $("#addProduct").modal("show");

    // 发送ajax 请求，请求所有的二级分类数据，进行下拉列表渲染
    // 通过分页接口，模拟获取全部数据
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:1,
        pageSize:100
      },
      dataType:"json",
      success:function( info ){
        console.log(info);
        // 使用模板引擎渲染
        var htmlStr = template('dropdownTpl',info);
        $(".dropdown-menu").html( htmlStr );
      }
    });
  });

  // 3.点击添加商品，选择下拉类别
  $(".dropdown-menu").on('click',"a",function(){
    var txt = $(this).text();
    $("#dropdownText").text(txt);
    var id = $(this).data("id");
    $('[name="brandId"]').val( id );
  });
});