module.exports = function (RED) {
	const https = require('https');

	function WioSpeaker(config) {
		RED.nodes.createNode(this, config);
		var node = this;
		node.connection = RED.nodes.getNode(config.connection);

		if (node.connection) {
			this.on('input', function (msg) {
				var payload = ((msg.payload) ? parseInt(msg.payload) : 0);
				var request = '';
				if (config.mode == 'manual') {
					request = 'sound_ms/' + parseInt(config.frequency) + '/' + parseInt(config.duration);
				} else if (config.mode == 'manualfrequency') {
					request = 'sound_ms/' + parseInt(config.frequency) + '/' + payload;
				} else if (config.mode == 'manualduration') {
					request = 'sound_ms/' + payload + '/' + parseInt(config.duration);
				} else {
					request = ((msg.payload) ? 'sound_start/' + parseInt(config.frequency) : 'sound_stop');
				}

				node.status({ fill: 'blue', shape: 'dot', text: 'requesting' });
				var req = https.request({
					hostname: node.connection.server,
					port: 443,
					path: '/v1/node/' + config.port.replace(/:/g, '') + '/' +
						request + '?access_token=' + config.node,
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
	RED.nodes.registerType('wio-speaker', WioSpeaker);
}