$(function () {
  // 调用 getUserInfo 获取用户基本信息
  getUserInfo()
})

var layer = layui.layer
// 获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method: 'get',
    url: '/my/userinfo',
    //请求头配置文件
    //获取token
    // header: {
    //   Authorization: localStorage.getItem('token') || ''
    // },
    success(res) {
      if (res.status !== 0) {
        return layui.layer.msg('登录失败！', {
          icon: 2
        })
      }
      //调用渲染头像的函数,渲染res.data数据
      renderAvatar(res.data)
      console.log(res);
    }
  })
}

//res.data里边的user.name和nickname以及user_pic数据
function renderAvatar(user) {
  //username和nickname,看是否都有数据。
  var name = user.username || user.nickname
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    //行内块隐藏
    $('.text-avatar').hide()
  } else {
    //第一个数据的大写字母
    var first = name[0].toUpperCase()
    //图片隐藏
    $('.layui-nav-img').hide()
    $('.text-avatar').html(first).show()

  }
}


$('#btnLogout').on('click', function () {
  //eg1
  layer.confirm('确定退出登录吗?', {
    icon: 3,
    title: '提示'
  }, function (index) {
    //清除本地的token
    localStorage.removeItem('token')
    //跳转到index.html登陆页面
    location.href = '/index.html'
    layer.close(index);
  });
})