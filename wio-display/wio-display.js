module.exports = function (RED) {
	const https = require('https');

	function WioDisplay(config) {
		RED.nodes.createNode(this, config);
		var node = this;
		node.connection = RED.nodes.getNode(config.connection);

		if (node.connection) {
			this.on('input', function (msg) {
				var display = msg.payload;
				for (var i = msg.payload.toString().length; i < parseInt(config.count); i++)
					display += ' ';

				node.status({ fill: 'blue', shape: 'dot', text: 'requesting' });
				var req = https.request({
					hostname: node.connection.server,
					port: 443,
					path: '/v1/node/' + config.port.replace(/:/g, '') + '/string/' + (config.row - 1) + '/'
						+ (config.column - 1) + '/' + encodeURIComponent(display) + '?access_token=' + config.node,
					method: 'POST'
				}, function (res) {
					res.on('data', function (chunk) {
						msg.payload = JSON.parse(chunk)
						node.send(msg);
						node.status({});
					});
				});

				req.on('error', function (err) {
					msg.payload = err.toString();
					msg.statusCode = err.code;
					node.send(msg);
					node.status({ fill: 'red', shape: 'ring', text: err.code });
				});

				req.end();
			});
		} else {
			node.status({ fill: 'red', shape: 'ring', text: 'missing connection' });
		}
	}
	RED.nodes.registerType('wio-display', WioDisplay);
}