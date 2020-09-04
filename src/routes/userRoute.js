const Joi = require('joi');

const UsersController = require('../controllers/users');
const UserModel = require('../models/users');

const usersController = new UsersController(UserModel);
const PATH_BASE = '/users';

const userRoute = (server) => {
	server.route({
		method: 'GET',
		path: `${PATH_BASE}/{id?}`,
		handler: (request, h) => usersController.find(request, h),
	});

	server.route({
		method: 'POST',
		path: `${PATH_BASE}`,
		handler: (request, h) => usersController.create(request, h),
		options: {
			validate: {
				payload: {
					firstName: Joi.string().required(),
					lastName: Joi.string().required(),
					email: Joi.string().email().required(),
				},
			},
		},
	});

	server.route({
		method: 'PUT',
		path: `${PATH_BASE}/{id}`,
		handler: (request, h) => usersController.update(request, h),
		options: {
			validate: {
				payload: {
					firstName: Joi.string(),
					lastName: Joi.string(),
					email: Joi.string().email(),
				},
			},
		},
	});

	server.route({
		method: 'DELETE',
		path: `${PATH_BASE}/{id}`,
		handler: (request, h) => usersController.delete(request, h),
	});
};

module.exports = userRoute;
