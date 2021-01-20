$(function() {
    var layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  ////上传头像
  $('.btnSc').on('click',function() {
      $('#file').click()
  })
  //// 为文件选择框绑定 change 事件
  $('#file').on('change',function(e) {
    //   console.log(e);
    var filelist = e.target.files
    // console.log(filelist);
    if(filelist.length === 0) {
        return layer.msg('请选择文件')
    }
    var file = e.target.files[0]
    var newImgURL = URL.createObjectURL(file)
    $image.cropper('destroy')      ////销毁旧的裁剪区域
          .attr('src',newImgURL)   ////重新设置图片的路径
          .cropper(options)        //// 重新初始化裁剪区域
  })
  //// 上传头像
  $('#btnUpload').on('click',function() {
      var daraURL = $image.cropper('getCroppedCanvas',{
          width:100,
          height:100
        })
        .toDataURL('image/png')
      $.ajax({
          method:'POST',
          url:'/my/update/avatar',
          data:{
              avatar:daraURL
          },
          success:function(res) {
              if(res.status !== 0) {
                  return layer.msg(res.message)
              }
              layer.msg(res.message)
              window.parent.getUserInfo()
          }

      })
  })
})