$(function () {
  var form = layui.form
  var layer = layui.layer

  //调用
  userInfo()

  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度必须在 1 ~ 6 个字符之间！'
      }
    }
  })

  //初始化用户的基本信息
  function userInfo() {
    $.ajax({
      method: 'get',
      url: '/my/userinfo',
      success(res) {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败')
        }
        console.log(res);
        // 调用 form.val() 快速为表单赋值
        form.val('formUserInfo', res.data)
      }
    })
  }

  $('#btnReset').on('click', function (e) {
    e.preventDefault()
    userInfo()
    layer.msg('重置成功', {
      icon: 1
    })
  })

  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'post',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) {
          return layer.msg('更新用户信息失败！', {
            icon: 2
          })
        }
        layer.msg('更新用户信息成功', {
            icon: 6
          }),
          //调用父页面中的方法,index中的getUserInfo，重新渲染用户头像与信息。
          window.parent.getUserInfo()
      }
    })
  })



})