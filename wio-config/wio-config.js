module.exports = function (RED) {
	var url = require('url');
	var path = require('path');
	var commonPath = path.resolve(__dirname + '/../wio-common');

	function WioConfig(config) {
		RED.nodes.createNode(this, config);
		this.server = config.server;
		this.token = config.token;
	}
	RED.nodes.registerType('wio-config', WioConfig, {
		credentials: {
			server: { type: 'text' },
			token: { type: 'text' }
		}
	});

	RED.httpAdmin.get('/wio-config/:id', function (req, res) {
		res.send(RED.nodes.getCredentials(req.params.id));
	});

	RED.httpAdmin.post('/wio-config/:id/auth', function (req, res) {
		var credentials = {};

		if (req.body.server)
			credentials.server = req.body.server;

		if (req.body.token)
			credentials.token = req.body.token;

		RED.nodes.addCredentials(req.params.id, credentials);
	});

	RED.httpAdmin.get('/wio-common', function (req, res) {
		res.sendFile(path.join(commonPath, 'wio-common.js'));
	});

	RED.httpAdmin.get('/wio-modules', function (req, res) {
		res.sendFile(path.join(commonPath, 'wio-modules.json'));
	});
}