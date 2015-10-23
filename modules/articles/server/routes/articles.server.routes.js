'use strict';

/**
 * Module dependencies.
 */
var articlesPolicy = require('../policies/articles.server.policy'),
	articles = require('../controllers/articles.server.controller'),

			multiparty = require('connect-multiparty'),
multipartyMiddleware = multiparty();

module.exports = function(app) {
	// Articles collection routes
	app.route('/api/articles').all(articlesPolicy.isAllowed)
		.get(articles.list)
		.post(articles.createWithUpload)
		.post(multipartyMiddleware, articles.createWithUpload);
// var users = require('../controllers/users.server.controller'),


// app.route('/api/articles').all(articlesPolicy.isAllowed)
//     .post(multipartyMiddleware, articles.createWithUpload);

	// Single article routes
	app.route('/api/articles/:articleId').all(articlesPolicy.isAllowed)
		.get(articles.read)
		.put(articles.update)
		.delete(articles.delete);

	// Finish by binding the article middleware
	app.param('articleId', articles.articleByID);
};
