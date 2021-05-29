$(function(){
    var layer = layui.layer;
    var form = layui.form;
    // 获取文章分类的列表
    initArtCateList();
    function initArtCateList(){
        $.ajax({
            url:'/my/article/cates',
            method: 'GET',
            success: function(res){
                var htmlStr = template('tpl-table',res);
                $('tbody').html(htmlStr);
            }
        })
    }
    var indexAdd = null;
    $('#btnAddCate').on('click',function(){
        index = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类'
            ,content: $('#dialog-add').html()
          });     
            
    })
    $('body').on('submit','#form-add',function(e){
        e.preventDefault();
        console.log(123);
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('新增文章失败');
                     
                }
                initArtCateList();
                layer.msg('新增成功')
                layer.close(indexAdd);
            }
        })
        
    })
    var indexEdit = null;
    $('tbody').on('click','#btn-edit',function(){
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类'
            ,content: $('#dialog-edit').html()
          });
          var id = $(this).attr('data-id');
          $.ajax({
              method: 'GET',
              url: '/my/article/cates/'+id,
              success: function(res){
                form.val('form-edit',res.data)
              }
          })
    })
    $('body').on('submit','#form-edit',function(e){
        e.preventDefault();
        console.log(123);
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('请求修改失败');
                }
                layer.close(indexEdit);
                initArtCateList();
                layer.msg('请求修改成功');
            }
        })
    })
    $('tbody').on('click','#btn-del',function(){
        var id = $(this).attr('data-id');
        layer.confirm('是否删除数据？', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/'+id,
                success: function(res){
                    if(res.status !== 0) {
                        return layer.msg('删除失败');
                    }
                    layer.close();
                    initArtCateList();
                    layer.msg('删除数据成功');
                }
    
            })
            layer.close(index);
          });
    })
})