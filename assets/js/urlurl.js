var baseURL = 'http://api-breakingnews-web.itheima.net'
$.ajaxPrefilter(function(opt) {
    opt.url = baseURL + opt.url
})