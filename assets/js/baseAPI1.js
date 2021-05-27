//ajax运行先调用
$.ajaxPrefilter(function(option){
    // console.log(option);
    option.url = 'http://api-breakingnews-web.itheima.net' + option.url;
    // console.log(option.url);
    if(option.url.indexOf('/my/') !== -1){
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    option.complete = function(res){
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
            localStorage.removeItem('token')
           location.href = '/login.html'              
           console.log('123');
        }
    }
})