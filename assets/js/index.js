$(function() {
    //// 获取用户信息
    getUserInfo()
    //// 退出登录
    $('#btn1').on('click',function() {
        //// 弹出询问框 ，提示用户是否退出
        layer.confirm('是否退出?', {icon: 3, title:'提示'},function(index){
            //// 删除本地的 token
            localStorage.removeItem('token')
            // 跳转到 login 登录页面
            location.href = '/login.html'
            //// 关闭 confirm 询问框
            layer.close(index);
          });
    })
    
})
//// 获取用户的基本信息
  //// 必须是全局函数，所以写在入口函数外面
function getUserInfo() {
    $.ajax({
        method:'GET',
        url:"/my/userinfo",
        //// 请求头  // 转移到拼接url 地址处
        // headers: {
        //     Authorization:localStorage.getItem('token')||''
        // },
        success:function(res) {
            console.log(res);
            if(res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            layer.msg(res.message)
            //电用渲染用户头像的函数
            renderAvatar(res.data)
        }

    })
}
// 渲染用户头像
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎: ' + name)
    // 按需渲染用户头像
    if(user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //渲染文字头像
        var frist = name[0].toUpperCase()
        $('.text-avatar').html(frist).show()
        $('.layui-nav-img').hide()
    }
}