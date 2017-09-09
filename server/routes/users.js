const express = require('express')
const router = express.Router()
const sql = require('../module/mysql')
require('./../util/util')

router.post('/login', (req,res,next) => {
  let userName = req.body.userName
  let userPwd = req.body.userPwd
  let sqlStr = 'select * from user where userName = ?'
  sql(sqlStr,[userName],(err,data) => {
    if(err){
      console.log(err)
      return
    }
    if(data[0].userPwd === userPwd){
      res.cookie("userName",userName,{path:'/',maxAge:1000*60*60*24});
      res.cookie("userId",data[0].userId,{path:'/',maxAge:1000*60*60*24});
      // req.session.login = userName
      res.json({
        statusCode:0,
        msg: ''
      })
    }else {
      res.json({
        statusCode:-1
      })
    }
  })
})
router.post('/logout', (req,res,next) => {
  res.cookie("userName","",{
    path: '/',
    maxAge: 0
  })
  res.json({
    statusCode:0,
    msg:""
  })
})
router.get('/checkLogin',(req,res,next)=>{
  if(req.cookies.userName){
    res.json({
      statusCode: 0,
      result: {
        userName: req.cookies.userName
      }
    })
  }else{
    res.json({
      statusCode: -1,
      result: ''
    })
  }
})
router.get('/cartList',(req, res, next)=>{
  console.log('进来了')
  let userId = req.cookies.userId
  let sqlStr = 'select * from shopping where buyerId = ?'
  let shoppingList = []
  let promiseArr = []
  sql(sqlStr,[userId],(err,data1) => {
    if (err) {
      console.log(err)
      return
    }
    for (let item of data1) {
      let productNum = item.productNum
      let productId = item.productId
      let checked = item.checked
      let sqlStr = 'select * from goods where productId = ?'
      let fn = function () {
        return new Promise((resolve,reject)=>{
          sql(sqlStr, [productId], (err, data2) => {
            let productCartObj = {
              productId: data2[0].productId,
              productName: data2[0].productName,
              productPrice: data2[0].productPrice,
              productImage: data2[0].productImage,
              productUrl: data2[0].productUrl,
              productNum: productNum,
              checked: checked
            }
            shoppingList.push(productCartObj)
            resolve()
          })
        })
      }
      promiseArr.push(fn())
    }
    Promise.all(promiseArr).then(()=>{
      res.json({
        statusCode: 0,
        result: shoppingList
      })
    })
  })
})
router.post('/delCart',(req,res)=>{
  let userId = req.cookies.userId, productId = req.body.productId
  let sqlStr = ' DELETE FROM `shopping` WHERE buyerId = ? AND productId = ? '
  sql(sqlStr, [userId,productId], (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    res.json({
      statusCode: 0
    })
  })
})
router.post('/editCart',(req,res)=>{
  let userId = req.cookies.userId,
      productId = req.body.productId,
      productNum = req.body.productNum,
      checked = req.body.checked;
  let sqlStr = ' UPDATE `shopping` SET productNum = ?,checked = ? WHERE buyerId = ? AND productId = ? '
  sql(sqlStr, [productNum,checked,userId,productId], (err, data) => {
    if(err){
      console.log(err)
      return
    }
    res.json({
      statusCode: 0
    })
  })
})
router.post('/checkAllCart',(req,res)=>{
  let userId = req.cookies.userId
  let checkAllFlag = req.body.checkAllFlag
  let checked = 0
  checkAllFlag === true ? checked = 1 : checked = 0
  let sqlStr = ' UPDATE `shopping` SET checked = ? WHERE buyerId = ? '
  sql(sqlStr, [checked,userId], (err, data) => {
    if(err){
      console.log(err)
      return
    }
    res.json({
      statusCode: 0
    })
  })
})
router.get('/addressList',(req,res)=>{
  console.log('进来了')
  let userId = req.cookies.userId
  let userName = req.cookies.userName
  let sqlStr = 'select * from address where userId = ?'
  let addressList = []
  sql(sqlStr,[userId],(err,data) => {
    if (err) {
      console.log(err)
      return
    }
    for (let item of data) {
      let obj = {
        addressId: item.addressId,
        userName: userName,
        recipientName: item.recipientName,
        streetName: item.streetName,
        postCode: item.postCode,
        tel: item.tel,
        isDefault: item.isDefault
      }
      if(obj.isDefault === 1){
        addressList.unshift(obj)
      }else{
        addressList.push(obj)
      }
    }
    res.json({
      statusCode: 0,
      result: addressList
    })
  })
})
router.post('/delAddress',(req,res)=>{
  console.log("进来了")
  let userId = req.cookies.userId, addressId = req.body.addressId;
  let sqlStr = ' DELETE FROM `address` WHERE userId = ? AND addressId = ? '
  sql(sqlStr, [userId,addressId], (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    res.json({
      statusCode: 0
    })
  })
})
router.post('/setDefaultAddress',(req,res)=>{
  let userId = req.cookies.userId, addressId = req.body.addressId;
  let sqlStr1 = ' UPDATE `address` SET isDefault = 0 '
  sql(sqlStr1, (err, data1) => {
    if (err) {
      console.log(err)
      return
    }
    let fn = function () {
      return new Promise((resolve, reject) => {
        let sqlStr2 = ' UPDATE `address` SET isDefault = 1 WHERE userId = ? AND addressId = ? '
        sql(sqlStr2, [userId,addressId], (err, data2) => {
          if (err) {
            console.log(err)
            return
          }
          resolve()
        })
      })
    }
    fn().then(() => {
      res.json({
        statusCode: 0
      })
    })
  })
})
router.post('/payment',(req,res)=>{
  let userId = req.cookies.userId, addressId = req.body.addressId, orderTotal = req.body.orderTotal;
  let platform = '1001';
  let r1 = Math.floor(Math.random()*10);
  let r2 = Math.floor(Math.random()*10);
  let sysDate = new Date().Format('yyyyMMddhhmmss');
  let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
  let orderId = platform+r1+sysDate+r2;
  let fn = function () {
    return new Promise((resolve,reject) => {
      let sqlStr1 = ' INSERT INTO `order` (orderId, addressId, orderTotal, orderStatus, createDate) VALUES(?,?,?,0,?) '
      sql(sqlStr1, [orderId,addressId,orderTotal,createDate], (err, data) => {
        if(err){
          console.log(err)
          return
        }
        let sqlStr2 = ' UPDATE `shopping` SET orderId = ? WHERE buyerId = ? AND checked = 1 '
        sql(sqlStr2, [orderId,userId], (err, data) => {
          if(err){
            console.log(err)
            return
          }
          resolve()
        })
      })
    })
  }
  fn().then(()=>{
    res.json({
      statusCode: 0,
      result: {
        'orderId': orderId
      }
    })
  })
})
router.get('/getOrderDetail',(req,res)=>{
  let orderId = req.param('orderId')
  let sqlStr = ' SELECT * FROM `order` WHERE orderId = ? '
  sql(sqlStr,[orderId],(err,data)=>{
    if(err){
      console.log(err)
      return
    }
    console.log(data)
    res.json({
      statusCode: 0,
      result: {
        'orderDetail': data[0]
      }
    })
  })
})
router.get('/getCartCount',(req,res)=>{
  if(req.cookies && req.cookies.userId){
    let userId = req.cookies.userId
    let sqlStr = ' SELECT * FROM `shopping` WHERE buyerId = ? '
    let cartCount = 0
    sql(sqlStr,[userId],(err,data)=> {
      if (err) {
        console.log(err)
        return
      }
      for(let item of data){
        cartCount += item.productNum
      }
      res.json({
        statusCode: 0,
        result: {
          cartCount
        }
      })
    })
  }
})
module.exports = router
