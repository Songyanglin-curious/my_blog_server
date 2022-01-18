// 第三层 router 层 只负责处理路由匹配
const {SuccessModel, ErrorModel} = require('../model/resModel')
const {getList, getDetail,newBlog,updateBlog,deleteBlog} = require('../controller/blog')
const handleBlogRouter = (req,res) => {
    const method = req.method //GET POST
    const id = req.query.id;

    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list'){
        const author = req.query.author || '';
        const key_word = req.query.key_word || '';
        const list_data = getList(author,key_word)
        return new SuccessModel(list_data)
    }
    
    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail'){

        const data = getDetail(id)
        return new SuccessModel(data)
    }
    
    // 新建一篇blog接口
    if (method === 'POST' && req.path === '/api/blog/new'){
        const blog_data = req.body
        const data = newBlog(blog_data)
        return new SuccessModel(data)
    }
    
    // 更新一篇blog接口
    if (method === 'POST' && req.path === '/api/blog/update'){
        const blog_data = req.body
        const result = updateBlog(id,blog_data)
        if(result){
            return new SuccessModel()
        }else{
            return new ErrorModel('更新blog失败')
        }
        
    }

    // 删除一篇blog接口
    if (method === 'POST' && req.path === '/api/blog/delete'){
        const result = deleteBlog(id)
        if(result){
            return new SuccessModel('删除博客成功')
        }else{
            return new ErrorModel('删除博客失败')
        }
    }
}
module.exports = handleBlogRouter