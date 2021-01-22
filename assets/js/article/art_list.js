$(function() {
    var form = layui.form 
    var laypage = layui.laypage
     ////时间过滤器
     template.defaults.imports.dateFormat = function(dtStr) {
        var dt = new Date(dtStr)
        var y = padZero(dt.getFullYear())
        var m = padZero(dt.getMonth() + 1)

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        return y + '-' + m + ' ' + hh + ':' + mm + ':' + ss
    }
    function padZero(n) {
        return n < 9?'0' + n:n
    }

    initCate()
    //// 初始化 文章分类
    function initCate() {
        $.ajax({
            url:'/my/article/cates',
            success:function(res) {
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('Fl',res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }
    ////文章列表
    ////定义查询参数对象，将来查询文章使用
    var q = {
        pagenum:1,    //页码值
        pagesize:2,   //每页显示多少条数据
        cate_id:"",   //文章分类 id
        state:"",     //文章的状态，可选值有：已发布、草稿
    };
    initTable()
    // 获取文章列表数据的方法
    function initTable() {
        $.ajax({
            url:'/my/article/list',
            data:q,
            success:function(res) {
                // console.log(res);
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                var htmlStr = template("tpl_table",res)
                $('tbody').html(htmlStr)
                renderPage(res.total)    //// 调用分页
            }
        })
    }
    $('#form-search').on('submit',function(e) {
        e.preventDefault()
        var state = $('[name=state]').val()
        var cate_id = $('[name=cate_id]').val()
        q.state = state
        q.cate_id = cate_id
        initTable()
    })
    //// 定义分页渲染方法 （组件渲染,layui的内置模块 分页）
    function renderPage(total) {
        // console.log(total);
        laypage.render({
            elem:'pageBox', ////目标位置ID
            count:total,    //// 总数居条数
            limit:q.pagesize, //每页显示几条数据
            curr:q.pagenum,  ////
            layout:['count','limit','prev','page','next','skip'], ////顺序可自定义
            limits:[2,3,5,10], //// 改变每页展示的条数
            ////分页发生切换的时候，触发 jump 回调
               // 触发 jump 回调的方法
                // 方式1. 点击页码的时候会触发
                // 方式2 . 只要调用了  laypage.render方法 就会触发
            jump:function(obj,first) {
                // console.log(obj.curr);
                q.pagenum = obj.curr
                //// 最新的条目数赋值到 q.pagesize
                q.pagesize = obj.limit
                ////根据最新的 q 获取对应数据列表，渲染表格
                //// first 通过方式1 调用则为 undefit
                ////  否则这是方式2调用，first为 true
                if(!first) {
                    initTable()
                }
            },
            
        })

    }
    //// 通过代理的方式给 删除按钮绑定点击事件
    $('body').on('click','.btn-delete',function() {
        var id = $(this).attr('data-id')
        // alert(321)
        //// 询问是否删除
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                url:'/my/article/delete/' + id,
                success:function(res) {
                    if(res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    if($('.btn-delete').length == 1 &&q.pagenum > 1) q.pagenum--
                    layer.msg(res.message)
                    initTable()
                }
            })
            
            layer.close(index);
          });
    })
})