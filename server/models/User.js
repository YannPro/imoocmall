const mysql = require('./../module/mysql')

let User = function() {};

User.prototype.find = function(id, callback) {
  let sql = "SELECT * FROM `user` WHERE id =?";
  mysql(sql, [id], (err, results) => {
    if (err) {
      callback(true);
      return;
    }
    callback(false, results)
  })
}
module.exports = User;
