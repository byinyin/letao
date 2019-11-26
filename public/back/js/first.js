$(function(){
  var currentPage = 1;
  var pageSize = 5;
  // 1.已进入页面发送ajax请求，获取数据渲染页面
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function( info ){
        console.log(info);
        // 模板引擎和数据结合
        var htmlStr = template('tpl', info);
        $("tbody").html(htmlStr);
        // 2.分页渲染
        $("#paginator").bootstrapPaginator({
          // 指定bootstrap版本号
          bootstrapMajorVersion:3,
          // 当前页
          currentPage:currentPage,
          // 总页数
          totalPages:Math.ceil(info.total / info.size),
          // 给页面添加点击事件
          onPageCliked:function(a,b,c,page){
            // 更新当前页，重新渲染
            currentPage = page;
            render();
          }
        });
      }
    });
  }
 
  // 3.点击添加分类按钮，显示模态框
  $("#btnAdd").click(function(){
    $("#addModal").modal('show');
  });

  // 4.使用表单校验插件，实现表单校验
 
    // e.preventdefault();
    $("#form").bootstrapValidator({
       // 配置校验图标
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',    // 校验成功
          invalid: 'glyphicon glyphicon-remove',  // 校验失败
          validating: 'glyphicon glyphicon-refresh' // 校验中
        },
        fields:{
          categoryName:{
            validators:{
              notEmpty:{
                message:"一级分类名称不能为空"
              }
            }
          }
        }
    });
 
// 5.注册表单校验成功事件，阻止默认的成功提交，通过ajax 提交
$("#form").on("success.form.bv",function(e){
  e.preventDefault();
  console.log(1);
   // 通过ajax提交数据
  $.ajax({
    type:"post",
    url:"/category/addTopCategory",
    data:$("#form").serialize(),
    dataType:"json",
    success:function(info){
      console.log(info);
      if(info.success){
        // 1.关闭模态框
        $("#addModal").modal('hide');
        // 2.页面重新渲染第一页，让用户看到第一页的数据
        currentPage = 1;
        render();
      }
    }
  });
});
  
  
});