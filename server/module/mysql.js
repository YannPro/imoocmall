/**
 * Created by Yann on 2017/6/29.
 */
const mysql = require('mysql');

function sql(sql,value,callback){
  let config = mysql.createConnection({
    //数据库的地址
    host : "127.0.0.1",
    user : "root",
    password : "yaojiayang",
    port : "3306",
    database : "imoocmall"
  });
//开始连接
  config.connect();
//进行数据库操作 第一个参数数据库代码，第二个参数回调函数
  config.query(sql,value,(err,data)=>{
    callback && callback(err,data);
  })
//结束连接
  config.end();
}
module.exports = sql;
