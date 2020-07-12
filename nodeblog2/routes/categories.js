var express = require('express');
var multer = require('multer');
var upload = multer({dest: './uploads'});
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');
var router = express.Router();

router.get('/add', function(req, res, next) {
  res.render('addcategories');
});

router.post('/add', function(req,res,next){
    var category = req.body.category;
    req.checkBody('category','category is required').notEmpty();
    var error = req.validationErrors();
       if(error){
         res.render('index',{
           "errors" : error
         });
       }
       else{
         var categories = db.get('categories');
         categories.insert({
           "name" : category
         },function(err,post){
           if(err){
             res.send(err);
           }
           else{
             req.flash('success','Categories added');
             res.location('/');
             res.redirect('/');
           }
         });
          }


});

module.exports = router;
