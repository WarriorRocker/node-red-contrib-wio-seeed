module.exports = function (RED) {
	var WebSocketClient = require('websocket').client;

	function WioEvent(config) {
		RED.nodes.createNode(this, config);
		var node = this;
		node.connection = RED.nodes.getNode(config.connection);

		if (node.connection) {
			var client = new WebSocketClient();

			client.on('connect', function (connection) {
				connection.send(config.node);

				connection.on('error', function (error) {
					console.log(error);
				});

				connection.on('close', function () {
					console.log('closed');
				});

				connection.on('message', function (message) {
					if ((message.type == 'utf8') && (message.utf8Data)) {
						node.status({});
						node.send({
							payload: JSON.parse(message.utf8Data)
						});
					} else {
						node.status({ fill: 'red', shape: 'ring', text: 'unknown' });
						node.send({
							payload: message
						});
					}
				});
			});

			client.connect('wss://' + node.connection.server + '/v1/node/event');
		}
	}
	RED.nodes.registerType('wio-event', WioEvent);
}