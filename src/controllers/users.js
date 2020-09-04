const Boom = require('boom');

class UsersController {
	constructor(Users) {
		this.Users = Users;
	}

	async find(request) {
		try {
			const { id } = request.params;
			const query = {};
			if (id) {
				query._id = id;
			}

			const users = await this.Users.find(query);
			return { users };
		} catch (error) {
			return Boom.badRequest('Failed to find user');
		}
	}

	async create(request, h, err) {
		try {
			const user = new this.Users(request.payload);
			await user.save();

			return h.response().code(201);
		} catch (error) {
			return Boom.badRequest(error);
		}
	}

	async update(request, h) {
		try {
			const { id } = request.params;
			const { firstName, lastName, email } = request.payload;
			const updatedUser = await this.Users.findOneAndUpdate(
				{ _id: id },
				{ firstName, lastName, email },
				{ new: true }
			);

			if (updatedUser) {
				return h.response().code(200);
			}

			return Boom.badRequest('Could not update the user');
		} catch (error) {
			return Boom.badRequest(error);
		}
	}

	async delete(request) {
		try {
			const { id } = request.params;
			const query = {};
			if (id) {
				query._id = id;
			}

			const deletedUser = this.Users.delete(query);
			if (deletedUser) {
				return h.response().code(204);
			}
			return Boom.badRequest('Could not delete the user');
		} catch (error) {
			return Boom.badRequest(error);
		}
	}
}

module.exports = UsersController;
