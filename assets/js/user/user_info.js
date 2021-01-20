$(function() {
    var form = layui.form
    form.verify({
        nickname:function(value) {
            if(value.length >6) {
                return '昵称长度为1~6位之间！'
            }
        }
    })
    getUser()
    function getUser() {
        $.ajax({
            url:'/my/userinfo',
            success:function(res) {
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                // console.log(res);
                // layer.msg(res.message)
                form.val('form-user',res.data)
            }
        })
    }
    ////重置的点击事件
    $('#btnCZ').on('click',function(e) {
        e.preventDefault()
        getUser()
    })
    $('form').on('submit',function(e) {
        e.preventDefault()
        $.ajax({
            method:"POST",
            url:"/my/userinfo",
            data:$(this).serialize(),
            success:function(res) {
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                ///调用父页面的方法重新渲染用户头像
                window.parent.getUserInfo()
            }
        })

    })

    // $('form').on('submit',function(e) {
    //     e.preventDefault()
    // })
})