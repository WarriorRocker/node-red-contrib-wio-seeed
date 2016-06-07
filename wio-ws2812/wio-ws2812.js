module.exports = function (RED) {
	const https = require('https');

	function WioWs2812(config) {
		RED.nodes.createNode(this, config);
		var node = this;
		node.connection = RED.nodes.getCredentials(config.connection);

		if (node.connection) {
			this.on('input', function (msg) {
				var hexColors = [];
				var count = Math.min(((config.mode == 'auto') ? msg.payload : config.count), config.count);
				var colors = config.colors.split(',');

				for (var i = 0; i < count; i++)
					if (colors[i]) hexColors.push(colors[i]);

				for (i = (hexColors.length - 1) ; i < config.count; i++)
					hexColors.push('000000');

				node.status({ fill: 'blue', shape: 'dot', text: 'requesting' });
				var req = https.request({
					hostname: node.connection.server,
					port: 443,
					path: '/v1/node/' + config.port.replace(/:/g, '') + '/segment/'
						+ config.pos + '/' + hexColors.join('') + '?access_token=' + config.node,
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
	RED.nodes.registerType('wio-ws2812', WioWs2812);
}