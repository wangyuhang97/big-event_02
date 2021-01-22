$(function () {
    var form = layui.form
    // 初始化富文本编辑器
    initEditor()
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    // coverFile
    $('#xz').on('click',function() {
        $('#coverFile').click()
    })
    ////上传图片
    $('#coverFile').on('change',function(e) {
        var file = e.target.files
        if(file.length == 0) {
            return layer.msg('请选择文件！')
        }
        ////根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file[0])
        $image
              .cropper('destroy')      // 销毁旧的裁剪区域
              .attr('src', newImgURL)  // 重新设置图片路径
              .cropper(options)        // 重新初始化裁剪区域
    })

    // 3. 初始化裁剪区域
    $image.cropper(options)

    ////动态获取、下拉菜单的选项
    initcate()
    function initcate() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tplXX', res)
                $('#cate_id').html(htmlStr)
                form.render() ////该方法是重新渲染表单区域
                ////因为调用模板引擎渲染是异步任务，所以第一次加载不出来
            }
        })
    }
    ////定义发布状态 
    var art_state = '已发布'
    $('#btnSave1').on('click',function() {
        art_state = '已发布'
    })
    ////为存为 草稿按钮绑定点击事件
    $('#btnSave2').on('click',function() {
        art_state = '草稿'
    })
    //// 发布新文章 
    $('form').on('submit',function(e) {
        e.preventDefault()
        var fd = new FormData($(this)[0])
        fd.append('state',art_state)
        // alert(321)
        // fd.forEach(function(v,k) {
        //     console.log(k,v);
        // })
        ////
        $image
              .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
              })
              .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img',blob)
                ////发起 ajax 请求
                 pubajax(fd)
              })
   
    })
    ////发起ajax的方法
    function pubajax(fd){
        $.ajax({
            method:'POST',
            url:'/my/article/add',
            data:fd, ////如果向服务器发送的是 FormData 格式的数据
            //// 必须加下面俩个配置项
            contentType:false,
            processData:false,
            success:function(res) {
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                location = '/article/art_list.html'
            }
        })
    }
   
})