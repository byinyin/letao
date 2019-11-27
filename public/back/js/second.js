$(function(){
  var currentPage = 1;
  var pageSize = 5;
  // 1.进入页面，ajax请求数据，渲染页面
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        // 1.通过模板引擎渲染页面
        var htmlStr = template('tpl',info);
        $("tbody").html(htmlStr);

        // 分页
        $("#paginator").bootstrapPaginator({
          // 指定bootstrap版本号
          bootstrapMajorVersion:3,
          // 指定当前页
          currentPage:currentPage,
          // 总页数
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,page){
            currentPage = page;
            render();
          }
        });
      }
    });
  }

  // 2.点击添加分类按钮，显示模态框
  $("#addBtn").click(function(){
    $("#secondModal").modal("show");

    // 发送ajax 请求，获取所有的一级分类数据，进行动态渲染下拉框

    // 通过获取一级分类接口(带分页的)模拟，获取全部一级分类的接口
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:1,
        pageSize:100
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        var htmlStr = template("dropdownTpl",info);
        $(".dropdown-menu").html(htmlStr);
      }
    });
  });

  // 3.给下拉列表的 a 添加点击事件，(通过事件委托绑定)
  $(".dropdown-menu").on("click","a",function(){
    // 获取 a的文本
    var txt = $(this).text();
    // 设置给按钮
    $("#dropdownText").text( txt );
    //
    // 获取选中的id
    var id = $(this).data("id");
    // 设置给 input
    $('[name="categoryId"]').val(id);

    // 将隐藏域校验状态，设置成校验成功状态
    // updateStatus(字段名，校验状态，校验规则(可以配置提示信息) );
    $("#form").data('bootstrapValidator').updateStatus('categoryId','VALID');
  });

  //4. 配置文件上传插件，进行文件上传初始化

  /**
   * 文件上传思路整理
   * 1.引包
   * 2.准备结构，name data-url
   * 3.进行文件上传初始化，配置done 回调函数
   * 
   * */ 
  $("#fileupload").fileupload({
    // 配置返回数据格式
    dataType:"json",
    // 上传完成图片后，调用的回调函数
    // 通过 data.result.picAddr 获取响应的图片地址
    done:function(e, data){
      console.log(data.result.picAddr);
      // 获取地址
      var imgUrl = data.result.picAddr;
      // 设置给img
      $("#imgBox img").attr("src",imgUrl);

      // 将图片地址，设置给input
      $('[name="brandLogo"]').val(imgUrl);


      // 手动重置隐藏域的校验状态
      $("#form").data('bootstrapValidator').updateStatus('brandLogo','VALID');
    }
  });

  // 5.实现表单校验
  $("#form").bootstrapValidator({
    // 1.指定不校验的类型，默认为[':disabled',':hidden',':not(:visible)']
    // 默认插件不对隐藏域进行校验，现在需要对隐藏域进行校验
    // 重置排除项
    excluded:[],
     // 配置校验图标
     feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',  // 校验失败
      validating: 'glyphicon glyphicon-refresh' // 校验中
    },
    // 配置字段
    // categoryId 分类id
    // brandName
    // brandLogo
    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:"请选中一级分类"
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:"请输入二级分类"
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"请选择图片"
          }
        }
      }
    }
  });

  // 6.注册表单校验成功事件，阻止默认提交，通过 ajax 进行提交
  $("#form").on("success.form.bv",function(e){
    e.preventDefault();

    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data:$("#form").serialize(),
      dataType:"json",
      success:function(info){
        console.log( info );
        if(info.success){
          // 1.关闭模态框
          $("#secondModal").modal('hide');
          // 2.重新渲染页面
          currentPage =1;
          render();

          // 3.重置模态框表单，不仅校验状态要重置，文本内容也要重置
          $("#form").data('bootstrapValidator').resetForm(true);

          // 4.手动重置文本内容和图片路径
          $("#dropdownText").text("请选择一级分类");
          $("#imgBox img").attr('src','images/none.jpg');
        }
      }
    });
  })
});