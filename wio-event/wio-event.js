module.exports = function (RED) {
	var WebSocketClient = require('websocket').client;

	function WioEvent(config) {
		RED.nodes.createNode(this, config);
		var node = this;
		node.connection = RED.nodes.getCredentials(config.connection);

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
						var json = JSON.parse(message.utf8Data);

						if (config.output == 'value') {
							var msgs = [];

							for (var i = 0; i < config.events.length; i++)
								msgs.push((((json.msg) && (json.msg[config.events[i]]))
								? {
									payload: json.msg[config.events[i]]
								} : null));

							if ((msgs.length > 1) || (msgs[0]))
								node.send(msgs);
						} else {
							node.send({
								payload: json
							});
						}
					}
				});
			});

			client.connect('wss://' + node.connection.server + '/v1/node/event');
		}
	}
	RED.nodes.registerType('wio-event', WioEvent);
}