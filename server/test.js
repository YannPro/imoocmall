const sql = require('./module/mysql')
sql("SELECT * FROM `goods`",(err,data)=>{
  if(err) {
    console.log(err);
  }
  // console.log(data)
})
