$(function() {
//// 去注册的点击事件
    $('#link_reg').on('click',function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
//// 去登录的点击事件
    $('#link_login').on('click',function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // console.log(132456798);
//// 登录 login-box 的表单验证
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码需6-12位，且不能出现空格'],
        repwd:function(value){
            var pwd = $('.reg-box [name=password]').val()
            var repwd = $('.reg-box [name=repassword]').val()
            if(pwd !== repwd) {
                return '俩次密码输入不一致'
            }
        }
    })
    $('#form_reg').on('submit',function(e) {
        // console.log(123456789);
        e.preventDefault()
        var data =  {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()}
        $.post("/api/reguser", data,
            function (res) {
                console.log(res);
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                console.log('注册成功！');
                layer.msg('注册成功,请登录！')
                //// 切换到登录页面
                $('#link_login').click()
                //// 清空注册页表单内容
                $('#form-reg')[0].reset()
            }
        );
    })
    $('#form_login').on('submit',function(e) {
        e.preventDefault()
        console.log(123);
        $.ajax({
            method:'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res) {
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功')  //////有BUG
                location.href = '/index.html'
                localStorage.setItem('token',res.token)
            }
        })
    })
})