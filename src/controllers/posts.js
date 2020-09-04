const Boom = require('boom');

class PostsController {
	constructor(Posts) {
		this.Posts = Posts;
	}

	async find(request) {
		try {
			const { id } = request.params;
			const query = {};
			if (id) {
				query._id = id;
			}

			const posts = await this.Posts.find(query);
			return { posts };
		} catch (error) {
			return Boom.badRequest('Failed to find user');
		}
	}

	async create(request, h) {
		try {
			const post = new this.Posts(request.payload);
			await post.save();

			return h.response().code(201);
		} catch (error) {
			return Boom.badRequest(error);
		}
	}

	async update(request, h) {
		try {
			const { id } = request.params;
			const { title, content, author } = request.payload;
			const updatedPost = await this.Posts.findOneAndUpdate(
				{ _id: id },
				{ title, content, author },
				{ new: true }
			);

			if (updatedPost) {
				return h.response().code(200);
			}
			return Boom.badRequest('Could not update the post');
		} catch (error) {
			return Boom.badRequest(error);
		}
	}

	async delete(request, h) {
		try {
			const { id } = request.params;
			const query = {};
			if (id) {
				query._id = id;
			}

			const deletedPost = await this.Posts.deleteOne(query);
			if (deletedPost) {
				return h.response().code(204);
			}
			return Boom.badRequest('Could not delete the post');
		} catch (error) {
			return Boom.badRequest(error);
		}
	}
}

module.exports = PostsController;
