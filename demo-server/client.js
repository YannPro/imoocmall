let http = require('http')
let url = require('url')
let util = require('util')
http.get('http://www.imooc.com/index/getstarlist', (res) => {
  let data = ''
  res.on("data", function (chunk) {
    data += chunk
  })
  res.on("end", function () {
    let result = JSON.parse(data)
  })
})
