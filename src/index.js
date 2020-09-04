const Hapi = require('hapi');

const database = require('./loaders/database');
const userRoute = require('./routes/userRoute');
const postsRoute = require('./routes/postsRoute');
const config = require('./config/index');

const server = Hapi.server({
	host: config.app.hostname,
	port: config.app.port,
	routes: {
		json: {
			space: 4,
		},
	},
});

userRoute(server);
postsRoute(server);

database.connect().then(async () => {
	try {
		await server.start();
	} catch (err) {
		console.log(err);
		process.exit(1);
	}

	console.log('Server running at:', server.info.uri);
});
