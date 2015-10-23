'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	fs = require('fs'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	Article = mongoose.model('Article'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a article
 */

//  exports.create = function(req, res) {
// 	var article = new Article(req.body);
// 	article.user = req.user;

// 	article.save(function(err) {
// 		if (err) {
// 			return res.status(400).send({
// 				message: errorHandler.getErrorMessage(err)
// 			});
// 		} else {
// 			res.json(article);
// 		}
// 	});
// };

exports.createWithUpload = function(req, res) {
	var file = req.files.file;
	// console.log(file.name);
	// console.log(file.type);
	// console.log(file.path);
	console.log(req.body.article);

	var image = JSON.parse(req.body.article);
	var article = new Article(image);
	article.user = req.user;
	// var original_data = req.body.article;

	fs.writeFile('./modules/articles/client/img/profile/uploads/' + req.files.file.name, req.files.file.buffer, function (err, original_data) {
		if (err) {
		  return res.status(400).send({
		        message: errorHandler.getErrorMessage(err)
		    });
		} else {
		// save image in db as base64 encoded - this limits the image size
		// to there should be size checks here and in client
		// var base64Image = new Buffer (original_data, 'binary').toString('base64');
		// fs.unlink(file.path, function (err) {
		//     if (err)
		//     { 
		//         console.log('failed to delete ' + file.path);
		//     }
		//     else{
		//       console.log('successfully deleted ' + file.path);
		//     }
		// });
		article.image = 'modules/articles/img/profile/uploads/' + req.files.file.name;

		article.save(function(err) {
		if (err) {
		    return res.status(400).send({
		        message: errorHandler.getErrorMessage(err)
		    });
		} else {
		    res.json(article);
		}
		});
	}
	});
};

/**
 * Show the current article
 */
exports.read = function(req, res) {
	res.json(req.article);
};

/**
 * Update a article
 */
exports.update = function(req, res) {
	var article = req.article;

	article.title = req.body.title;
	article.content = req.body.content;

	article.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(article);
		}
	});
};

/**
 * Delete an article
 */
exports.delete = function(req, res) {
	var article = req.article;

	article.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(article);
		}
	});
};

/**
 * List of Articles
 */
exports.list = function(req, res) {
	Article.find({user:req.user}).sort('-created').populate('user', 'displayName').exec(function(err, articles) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(articles);
		}
	});
};

/**
 * Article middleware
 */
exports.articleByID = function(req, res, next, id) {
	Article.findById(id).populate('user', 'displayName').exec(function(err, article) {
		if (err) return next(err);
		if (!article) return next(new Error('Failed to load article ' + id));
		req.article = article;
		next();
	});
};
