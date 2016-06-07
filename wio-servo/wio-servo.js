module.exports = function (RED) {
	const https = require('https');

	function WioServo(config) {
		RED.nodes.createNode(this, config);
		var node = this;
		node.connection = RED.nodes.getCredentials(config.connection);

		if (node.connection) {
			this.on('input', function (msg) {
				var payload = ((msg.payload) ? parseInt(msg.payload) : 0);
				node.status({ fill: 'blue', shape: 'dot', text: 'requesting' });
				var req = https.request({
					hostname: node.connection.server,
					port: 443,
					path: '/v1/node/' + config.port.replace(/:/g, '') + '/angle_motion_in_seconds/'
						+ ((config.mode == 'manualangle') ? parseInt(config.angle) : payload) + '/'
						+ ((config.mode == 'manualduration') ? parseInt(config.duration) : payload)
						+ '?access_token=' + config.node,
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
	RED.nodes.registerType('wio-servo', WioServo);
}