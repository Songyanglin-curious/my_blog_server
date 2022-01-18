// 第四层 处理数据
const getList = (author, key_word) => {
    return [
        {
            id: 1,
            title: '标配A',
            content: '内容A',
            create_time: 1642474123565,
            author: '张三',
        },
        {
            id: 2,
            title: '标配B',
            content: '内容B',
            create_time: 1642474199798,
            author: '李四',
        },
    ]

}
const getDetail = (id) => {
    return {
        id: 1,
        title: '标配A',
        content: '内容A',
        create_time: 1642474123565,
        author: '张三',
    }
}
const newBlog = (blog_data = {}) => {
    // blog_data 为一个对象 包含 title content 属性
    return{
        // 新建blog插入表的id
        id: 3,
    }
}
const updateBlog = (id,blog_data = {}) => {
    return false
}
const deleteBlog = (id) => {
    return true
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}