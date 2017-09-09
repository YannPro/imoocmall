// http模块创建server及url解析：
let http = require('http')
let url = require('url')
let util = require('util')
//创建了一个server
let server = http.createServer( (req, res) => {
  res.setHeader("Content-Type","text/plain; charset=utf-8")
  console.log(url.parse(req.url))
  res.end(util.inspect(url.parse("http://localhost:3000/demo.html?a=123#tag")))
})
server.listen(3000, '127.0.0.1', () => {
  console.log("请打开浏览器输入http://127.0.0.1:3000")
})

