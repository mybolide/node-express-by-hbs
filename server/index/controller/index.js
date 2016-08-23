var express = require('express');
var http = require('../../util/http');
var router = express.Router();
var logger = require('../../../logger');


/* GET home page. */
router.get('/', function(req, res, next) {
  var id = req.params.id;
  // http.get("http://localhost:8080/article/get.htm?id="+id, "", function(data){
  //       data = JSON.parse(data);
  //       res.render('index',{
  //         title:'首页',
  //         data:data
  //       })
  //   });
    res.render('index',{
          title:'首页',
          data:1
    })
    logger.info("welcome")
  
});

module.exports = router;
