var express = require('express');
var multer = require('multer');
var upload = multer({dest: './uploads'});
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/add',function(req,res,next){
  var categories = db.get('categories');
  categories.find({},{},function(err,categories){
        res.render('addpost',{
          'title':'Add Post',
          'categories' : categories
        });
  });
});

router.post('/add',upload.single('mainimage'), function(req,res,next){
		//console.log('tes');
    //mengambil value dari request untuk disimpan ke DB.
    var judul = req.body.title;
    var category = req.body.category;
    var body = req.body.body;
    var author = req.body.author;
    var date = new Date();
    if(req.file){
         console.log('Uploading File....');
         var profileImage = req.file.filename;

       }
       else{
         console.log('No File Uploaded....');
         var profileImage = 'noimage.jpg';
       }

       req.checkBody('title','Tittle is required').notEmpty();
       req.checkBody('body','Main Content field is required').notEmpty();
       req.checkBody('author','Author field is required').notEmpty();

       var error = req.validationErrors();
       if(error){
         res.render('addpost',{
           "errors" : error
         });
       }
       else{
         var post = db.get('posts');
         post.insert({
           "title" : judul,
           "body" : body,
           "category" : category,
           "date" : date,
           "author" : author,
           "mainimage" : profileImage
         },function(err,post){
           if(err){
             res.send(err);
           }
           else{
             req.flash('success','Post added');
             res.location('/');
             res.redirect('/');
           }
         });
       }


});



module.exports = router;
