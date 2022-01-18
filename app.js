// 第二层 设计层的逻辑和基本信息 ，没有业务代码 
const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 用于处理post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method != 'POST') {
            // 如果请求方法不是POST 直接返回为空 不必报错
            resolve({});
            return
        }
        if (req.headers['content-type'] != 'application/json') {
            resolve({});
            return
        }
        let post_data = '';
        req.on('data', chunk => {
            post_data += chunk.toString()
        })
        req.on('end', () => {
            if (!post_data) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(post_data)
            )
        })
    })
    return promise
}
const serverHandle = (req, res) => {
    // 设置返回格式
    res.setHeader('Content-type', 'application/json')

    // 获取请求路径
    const url = req.url
    req.path = url.split('?')[0] //通过字符串的划分，获取请求api
    // 解析 query
    req.query = querystring.parse(url.split('?')[1])
    // chulipost data
    getPostData(req).then(post_data => {
        req.body = post_data;
        // 处理blog路由
        const blogData = handleBlogRouter(req, res)
        if (blogData) {
            res.end(JSON.stringify(blogData))
            return
        }

        // 处理 user 路由
        const usergData = handleUserRouter(req, res)
        if (usergData) {
            res.end(JSON.stringify(usergData))
            return
        }

        // 未匹配合适路由返回404
        res.writeHead(404, { "Content-type": "text/plain" })
        res.write("404 Not Found\n")
        res.end()
    })

}

module.exports = serverHandle

// process.env.NODE_ENV