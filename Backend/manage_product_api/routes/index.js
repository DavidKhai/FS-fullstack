const e = require('express');
var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'product_manage',
  password: 'Khai300398',
  port: 5433,
})

/* GET home page. */
router.get('/', function(req, res, next) {});

router.get('/getData01', function(req, res, next) {
  pool.query('SELECT * FROM product_info', (err, response) => {
    if(err){
      res.send(err);
    }
    else{
      res.send(response.rows);
    }
    //pool.end()
  })
});

//Add Data
router.get('/addData', function(req, res, next) {
  res.render('addData',{})
});

router.post('/addData', function(req, res, next) {
  var product_name = req.body.product_name;
  var product_price = req.body.product_price;
  var product_image = req.body.product_image;

  pool.query('INSERT INTO product_info (product_name, product_price, product_image) VALUES ($1, $2, $3)', [product_name, product_price, product_image], (err, response) => {
    if(err){
      res.send(err);
    }
    else{
      res.send("Thêm dữ liệu thành công " + product_name + " " + product_price + " " + product_image);
    }
    //pool.end()
  })
});

//edit data
router.get('/editData', function(req, res, next) {
  res.render('editData',{})
});

router.put('/editData', function(req, res, next) {
  var product_id = req.body.id;
  var product_name = req.body.product_name;
  var product_price = req.body.product_price;
  var product_image = req.body.product_image;

  pool.query('UPDATE product_info SET product_name = $2, product_price = $3, product_image =$4 WHERE id = ($1) ', [product_id, product_name, product_price, product_image], (err, response) => {
    if(err){
      res.send(err);
    }
    else{
      res.send("Sửa dữ liệu thành công "+ product_id + "" + product_name + " " + product_price + " " + product_image);
    }
    //pool.end()
  })
});

//delete data
router.get('/deleteData', function(req, res, next) {
  res.render('deleteData',{})
});

router.put('/deleteData', function(req, res, next) {
  var product_id = req.body.id;

  pool.query('DELETE FROM product_info WHERE id = ($1)', [product_id], (err, response) => {
    if(err){
      res.send(err);
    }
    else{
      res.send("Đã xóa dữ liệu có id:"+ product_id +" thành công");
    }
    //pool.end()
  })
});

//login account 
router.get('/login', function(req, res, next) {
  res.render('login',{})
});  

router.post('/login', function(req, res, next) {
  var account_name = req.body.account_name;
  var account_password = req.body.account_password;

  pool.query('SELECT * FROM account WHERE account_name = $1 AND account_password = $2', [account_name, account_password], (err, result) => {
    if(err){
      res.send({err: err});
    }
    if(result.rows.length > 0){
      res.send(result.rows);
    }
    else{
      res.send({message: 'Wrong username/password'});
    }
    //pool.end()
  })
});

//signup account 
router.get('/signup', function(req, res, next) {
  res.render('signup',{})
});

router.post('/signup', function(req, res, next) {
  var account_name = req.body.account_name;
  var account_password = req.body.account_password;

  pool.query('INSERT INTO account (account_name, account_password) VALUES ($1, $2) ', [account_name, account_password], (err, result) => {
    if(err){
      res.send(err);
    }
    else{
      res.send({message: 'Account registration is successful'})
    }
    //pool.end()
  })
});

module.exports = router;
