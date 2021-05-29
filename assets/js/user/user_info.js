$(function(){
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function(value){
            if(value.length > 6) {
                return '昵称必须在1~6之间'
            }
        }
    })
    inituserinfo();
    // 获取更新请求
    function inituserinfo(){
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('获取用户信息失败');
                }
                console.log(res);
                // layer.msg('获取用户信息成功');
                form.val('formUserinfo',res.data)
                // $('#ipt1').val(res.data.username)
            }
        })
    }
    // 重置表单数据
    $('#btnReset').on('click',function(e){
        e.preventDefault();
        inituserinfo();
    })
    // 监听表单提交事件
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            // $(this).serialize()
            data: {
                id: $('[name=id]').val(),
                nickname: $('[name=nickname]').val(),
                email: $('[name=email]').val()
            },
            success: function(res){
                if(res.status !== 0) {
                    return layer.msg('修改用户信息失败');
                }
                layer.msg('修改用户信息成功')
                inituserinfo(); 
                window.parent.getUserInfo();
            }
        })
    })
})