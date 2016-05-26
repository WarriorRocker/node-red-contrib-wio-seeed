module.exports = function (RED) {
	var url = require('url');

	function WioConfig(config) {
		RED.nodes.createNode(this, config);
		this.server = config.server;
		this.token = config.token;
	}
	RED.nodes.registerType('wio-config', WioConfig);

	RED.httpAdmin.get('/wio-config/config-node', function (req, res) {
		var query = url.parse(req.url, true).query;
		if (query.id)
			res.send(RED.nodes.getNode(query.id));
	});
}