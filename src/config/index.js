const dotenv = require('dotenv').config();

const {
	MONGO_USERNAME,
	MONGO_PASSWORD,
	MONGO_HOSTNAME,
	MONGO_PORT,
	MONGO_DB,
	APP_HOSTNAME,
	APP_PORT,
} = process.env;

module.exports = {
	mongo: {
		url: `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`,
		options: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			reconnectInterval: 500,
			connectTimeoutMS: 5000,
		},
	},
	app: {
		hostname: APP_HOSTNAME,
		port: APP_PORT,
	},
};
