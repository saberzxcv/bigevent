$(function () {
  // 点击“去注册账号”的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击“去登录”的链接
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  //从layui中获取form对象
  var form = layui.form
  //获取layui中的layer对象,弹出框
  var layer = layui.layer
  //通过form.verify的函数自定义校验规则
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6-12位，且不能出现空字符'],

    //确认密码的校验规则
    //repwd的value值是否与password的值相等
    repwd: function (value) {
      //选择类名为reg-box 包裹的name属性为password
      //类似于后代选择器
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次输入的密码不一致'
      }
    }
  })

  //监听表单的提交时间
  $('#form_reg').on('submit', function (e) {
    //阻止表单的默认事件
    e.preventDefault()
    $.post('/api/reguser', {
      //username等于提交表单 包裹的 name属性 为usename的val值
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }, function (res) {
      if (res.status !== 0) {
        //icon为layui中的自定义表情
        //返回并弹出res.message
        return layer.msg(res.message, {
          icon: 2
        });
      }
      layer.msg('注册成功,请登录!', {
        icon: 1
      });
      $('#link_login').click()
    })
  })

  //监听登录页面的提交事件
  $('#form_login').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'post',
      url: '/api/login',
      //快速获取表单的提交信息
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) {
          return layer.msg('登录失败！', {
            icon: 2
          })
        }
        layer.msg('登录成功', {
          icon: 1
        })
        //将登录成功得到的token字符串,保存到本地存储中。
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
      }
    })
  })

})