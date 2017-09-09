const express = require('express');
const router = express.Router();
const sql = require('../module/mysql')
/* GET home page. */
router.get('/list', (req, res, next) => {
  let priceFilter = JSON.parse(req.param('priceFilter'))
  let isSortByPriceAsc = parseInt(req.param('isSortByPriceAsc'))
  let page = req.param('page')
  let pageSize = req.param('pageSize')
  let sqlStr = ' SELECT * FROM `goods` '
  if(isSortByPriceAsc){
    sqlStr += ' order by productPrice asc'
  }
  sqlStr = `${sqlStr} limit ${(page-1)*pageSize},${pageSize}`
  if(priceFilter.text && priceFilter.text === 'all'){
    sql(sqlStr,(err,data) => {
      if(err){
        console.log(err)
        return
      }
      res.json(data)
    })
  } else {
    let startPrice = priceFilter.startPrice
    let endPrice = priceFilter.endPrice
    sql(sqlStr,(err,data) => {
      let goodsData = []
      if(err){
        console.log(err)
        return
      }
      for(let item of data){
        if(item.productPrice>=startPrice && item.productPrice<=endPrice){
          goodsData.push(item)
        }
      }
      res.json(goodsData)
    })
  }
});

router.post('/addCart', (req,res,next) => {
  let productId = req.body.productId
  let userId = req.cookies.userId
  if(userId&&userId!=''){
    let sqlStr1 = ' SELECT * FROM `shopping` WHERE buyerId = ? AND productId = ?'
    sql(sqlStr1,[userId,productId],(err,data1) => {
      if(err){
        console.log(err)
        return
      }
      if(data1.length==0){
        sqlStr2 = 'INSERT INTO `shopping` (buyerId, productId, productNum) VALUES(?,?,1)'
         sql(sqlStr2,[userId,productId],(err,data2) => {
           if(err){
            console.log(err)
            return
           }
         })
      }else {
        let productNum = data1[0].productNum
        sqlStr2 = ' UPDATE `shopping` SET productNum = ? WHERE buyerId = ? AND productId = ?'
        sql(sqlStr2,[++productNum,userId,productId],(err,data2) => {
          if(err){
            console.log(err)
            return
          }
        })
      }
      res.json({
        statusCode: 0
      })
    })
  }else{
    res.json({
      statusCode: -1
    })
  }
})
module.exports = router;
