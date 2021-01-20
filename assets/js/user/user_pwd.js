$(function() {
    var form = layui.form
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须是6~12位，且不能包含空格'],
        oldPwd:function(value) {
            if(value == $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        newPwd:function(value) {
            if(value !== $('[name=newPwd]').val()) {
                return '俩次密码输入不一致'
            }
        }
    })
    $('form').on('submit',function(e) {
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res) {
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('.layui-form')[0].reset()
            }
        })
    })
})