$(function () {
  var form = layui.form
  var layer = layui.layer

  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位且不能出现空格！'],
    samePwd(value) {
      if (value === $('[name = oldPwd]').val()) {
        return '新密码不能与旧密码相同'
      }
    },
    rePwd(value) {
      if (value !== $('[name = newPwd]').val()) {
        return '两次密码必须相同!'
      }
    }
  })

  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'post',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) {
          return layui.layer.msg('重置密码失败', {
            icon: 4
          })

        }
        layui.layer.msg('重置密码成功！', {
          icon: 6
        })
        $('.layui-form')[0].reset()
      }
    })
  })



})