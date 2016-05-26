module.exports = function (RED) {
	const https = require('https');

	function WioGroveDigit(config) {
		RED.nodes.createNode(this, config);
		var node = this;
		this.on('input', function (msg) {
			config.count = parseInt(config.count);
			var display = msg.payload;
			for (var i = msg.payload.toString().length; i <= parseInt(config.count); i++)
				display += '.';

			node.status({ fill: 'blue', shape: 'dot', text: 'requesting' });
			var req = https.request({
				hostname: config.server,
				port: 443,
				path: '/v1/node/Grove4Digit' + config.port + '/'
					+ ((config.display == 'chars') ? 'display_digits' : 'display_one_digit') + '/'
					+ config.pos + '/' + display + '?access_token=' + config.node,
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
	}
	RED.nodes.registerType('wio-grove-digit', WioGroveDigit);
}