$(function() {
    $('#link_reg').on('click',function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click',function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })
//// 从layui 中获取 form 对象
console.log(123);
    var form = layui.form
    form.verify({
        //// 自定义规则
        pwd:[/^[\s]{6,12}$/,'密码必须为6-12位，且不能出现空格']
    })
})