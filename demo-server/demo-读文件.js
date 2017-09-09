// http模块创建server及url解析：
let http = require('http')
let url = require('url')
let util = require('util')
let fs = require('fs')
//创建了一个server
let server = http.createServer( (req, res) => {
  let pathname = url.parse(req.url).pathname
  console.log(url.parse(req.url))
  fs.readFile(pathname.substring(1), (err, data) => {
    if (err) {
      res.writeHead(404, {
        'Content-Type': 'text/html'
      })
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      res.write(data.toString())
    }
    res.end()
  })
  //请求结束
})
server.listen(3001, '127.0.0.1', () => {
  console.log("请打开浏览器输入http://127.0.0.1:3000")
})

