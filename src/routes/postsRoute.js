const Joi = require('joi');

const PostsController = require('../controllers/posts');
const PostsModel = require('../models/posts');

const postsController = new PostsController(PostsModel);

const PATH_BASE = '/posts';

const postsRoute = (server) => {
	server.route({
		method: 'GET',
		path: `${PATH_BASE}/{id?}`,
		handler: (req, h) => postsController.find(req, h),
	});

	server.route({
		method: 'POST',
		path: PATH_BASE,
		handler: (req, h) => postsController.create(req, h),
		options: {
			validate: {
				payload: {
					title: Joi.string().required(),
					content: Joi.string().required(),
					author: Joi.string().required(),
				},
			},
		},
	});

	server.route({
		method: 'PUT',
		path: `${PATH_BASE}/{id}`,
		handler: (req, h) => postsController.update(req, h),
	});

	server.route({
		method: 'DELETE',
		path: `${PATH_BASE}/{id}`,
		handler: (req, h) => postsController.delete(req, h),
	});
};

module.exports = postsRoute;
