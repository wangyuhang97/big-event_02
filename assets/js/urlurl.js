var baseURL = 'http://api-breakingnews-web.itheima.net'
$.ajaxPrefilter(function(pa) {
    pa.url = baseURL + pa.url
    if(pa.url.indexOf('/my/') !== -1) {
        pa.headers = {
            Authorization:localStorage.getItem('token')||''
        }
    }

    // 3.登录拦截
     pa.complete = function(pa) {
         var obj = pa.responseJSON
         if(obj.status !== 0 && obj.message === '身份认证失败！') {
         //// 1 . 强制清空 token
         localStorage.removeItem('token')
         //// 2 . 强制跳转到登录页
         location.href = '/login.html'
    }
     }
})