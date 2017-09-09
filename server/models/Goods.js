const mysql = require('./../module/mysql')

let Goods = function() {};

Goods.prototype.find = function(id, callback) {
  let sql = "SELECT * FROM `goods` WHERE id =?";
  mysql(sql, [id], (err, results) => {
    if (err) {
      callback(true);
      return;
    }
    callback(false, results)
  })
}
module.exports = Goods;
