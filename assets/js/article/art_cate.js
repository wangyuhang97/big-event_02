$(function() {
    var layer = layui.layer
    var form = layui.form
    getCate()
    function getCate() {
        $.ajax({
            url:"/my/article/cates",
            success:function(res) {
                // console.log(res);
                if(res.status !== 0) {
                    return layer.msg(res.message)
                } layer.msg(res.message)
                var htmlStr = template('tpl-cate',res)
                $('tbody').html(htmlStr)
            }
        })
    }
    //// 添加类
    var indexA = null
    $('#btnLB').on('click',function() {
         indexA = layer.open({
            type:1,
            area:['500px','250px'],
            content: $('#addForm').html()
          })
    })
    $('body').on('submit','#form-add',function(e) {
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res) {
                console.log(res);
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.close(indexA)
                getCate()
            }
        })
    })
    //// 修改类
    var indexE = null
    $('tbody').on('click','#btnBJ',function() {
         indexE = layer.open({
            type:1,
            area:['500px','250px'],
            title:'修改文章分类',
            content: $('#dialog-edit').html()
          })
          var id= $(this).attr('data-id')
          $.ajax({
              url:"/my/article/cates/" + id,
              success:function(res) {
                  if(res.status !== 0) {
                      return layer.msg(res.message)
                  }
                  form.val('form-edit',res.data)
              }
          })
    })
    $('body').on('submit','#form-edit',function(e) {
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res) {
                console.log(res);
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.close(indexE)
                getCate()
            }
        })
    })
    ////删除按钮
    $('body').on('click',"#btn-delete",function() {
        var id = $(this).attr('data-id')
        console.log(id);
        $.ajax({
            url:"/my/article/deletecate/" + id,
            success:function(res) {
                if(res.status !== 0) {
                    return layer.msg(res.message)
                } layer.msg(res.message)
                getCate()
            }
        })
    })
})