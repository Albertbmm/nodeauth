var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './uploads'});
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');

/* GET home page. */
router.get('/', function(req, res, next) {
	var db = req.db;
	var posts = db.get('posts');
	posts.find({}, {}, function(err, posts){
		res.render('index', { posts: posts });
	});
});


module.exports = router;
