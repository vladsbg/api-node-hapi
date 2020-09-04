const mongoose = require('mongoose');
const config = require('../config/index');

mongoose.Promise = global.Promise;

mongoose.connection.on('open', () => {
	console.log('Successfully connected to database.');
});

mongoose.connection.on('error', () => {
	throw new Error('Could not connect to MongoDB.');
});

module.exports = {
	connect: () =>
		mongoose.connect(config.mongo.url, config.mongo.options).catch(() => {}),
};
