module.exports = function (RED) {
	const https = require('https');

	function WioSensor(config) {
		RED.nodes.createNode(this, config);
		var node = this;
		node.connection = RED.nodes.getNode(config.connection);

		if (node.connection) {
			this.on('input', function (msg) {
				var method = config.method.split(':');
				node.status({ fill: 'blue', shape: 'dot', text: 'requesting' });
				var req = https.request({
					hostname: node.connection.server,
					port: 443,
					path: '/v1/node/' + config.port.replace(/:/g, '') + '/' + method[0]
						+ '?access_token=' + config.node,
					method: 'GET'
				}, function (res) {
					res.on('data', function (chunk) {
						var json = JSON.parse(chunk);
						msg.payload = (((config.output == 'value') && (method[1]) && (json[method[1]])) ? json[method[1]] : json);
						node.status({});
						node.send(msg);
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
	RED.nodes.registerType('wio-sensor', WioSensor);
}