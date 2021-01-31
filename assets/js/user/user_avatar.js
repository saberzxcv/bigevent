$(function () {
  var layer = layui.layer

  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  //调用file复选框的点击事件。
  $('#btnChooseImage').on('click', function () {
    $('#file').click()
  })

  //注册filee复选框改变事件。
  $('#file').on('change', function (e) {
    console.log(e);
    //e.target.files属性,获取用户输入的文件。
    var filelist = e.target.files
    //判断是否输入文件
    if (filelist.length === 0) {
      return layer.msg('请选择图片！')
    }

    //拿到传入的文件
    var file = e.target.files[0]
    //cropper插件,转换为url地址
    var imgURL = URL.createObjectURL(file)
    //重新设置裁剪区域
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', imgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })

  //为确定按钮注册点击事件
  $('#btnUpload').on('click', function () {
    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

    $.ajax({
      method: 'post',
      url: '/my/update/avatar',
      //avater参数 接受数据
      data: {
        avatar: dataURL
      },
      success(res) {
        if (res.status !== 0) {
          return layer.msg('更换头像失败')
        }
        layer.msg('更换头像成功！')
        //调用getUSerInfo,重新渲染头像。
        window.parent.getUserInfo()
      }
    })
  })

})