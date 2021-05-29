$(function () {
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;
    template.defaults.imports.dataFormat = function (data) {
        const dt = new Date(data);
        var y = dt.getFullYear();
        var m = padZero(dt.getMonth() + 1);
        var d = padZero(dt.getDate());
        var hh = padZero(dt.getHours());
        var mm = padZero(dt.getMinutes());
        var ss = padZero(dt.getSeconds());
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
    }
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    var q = {
        pagenum: 1, //页码值
        pagesize: 2, //每页显示多少条数据
        cate_id: '', //	文章分类的 Id
        state: ''//	文章的状态，可选值有：已发布、草稿
    }
    initTable();
    initCate();
    function initTable() {
        // console.log(123);
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return lay.msg('获取文章列表失败');
                }
                var htmlstr = template('tpl-table', res);
                $('tbody').html(htmlstr);
                randerPage(res.total);
            }
        })
    }

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败');
                }
                // console.log(res);
                var htmlStr = template('tpl-cate', res);
                $('[name=cate_id]').html(htmlStr);
                // console.log(htmlStr);
                form.render();
            }
        })
    }
    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        var cate_id = $('[name=cate_id]').val();
        var state = $('[name=state]').val();
        console.log(cate_id);
        console.log(state);
        q.cate_id = cate_id;
        q.state = state;
        initTable();
    })
    function randerPage(total) {
        laypage.render({
            elem: 'pageBox' //注意，这里的 test1 是 ID，不用加 # 号
            , //数据总数，从服务端得到
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                if (!first) {
                    initTable();
                }

            }

        })
    }
    $('tbody').on('click','.btn-cls',function(){
        var len = $('.btn-cls').length;
        console.log(len);
        var id = $(this).attr('data-id');
        console.log(id);
        layer.confirm('是否删除', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/'+id,
                success: function(res){
                    if(res.status !== 0){
                        return layer.msg('删除文章失败');
                    }
                    layer.msg('删除成功');
                    if(len === 1){
                        q.pagenum = q.pagenum===1?1:q.pagenum-1;
                    }
                    initTable();
                }
            })
            layer.close(index);
          });
    })
})