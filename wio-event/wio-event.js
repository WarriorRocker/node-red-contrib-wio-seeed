module.exports = function (RED) {
	var WebSocketClient = require('websocket').client;

	function WioEvent(config) {
		RED.nodes.createNode(this, config);
		var node = this;
		node.connection = RED.nodes.getCredentials(config.connection);
		var socketConnection = null;
		var attemptReconnect = true;

		if (node.connection)
			startConnection();

		function startConnection() {
			var socket = new WebSocketClient();
			socket.on('connect', function (connection) {
				socketConnection = connection;
				handleConnection(connection);
			});
			socket.connect('wss://' + node.connection.server + '/v1/node/event');
		}

		node.on('close', function () {
			attemptReconnect = false;
			if (socketConnection)
				socketConnection.close();
		});

		function handleConnection(connection) {
			connection.send(config.node);

			connection.on('error', function (error) {
				node.status({ fill: 'red', shape: 'ring', text: error });
			});

			connection.on('close', function () {
				if (attemptReconnect)
					setTimeout(function () {
						startConnection();
					}, 1000);
			});

			connection.on('message', function (message) {
				node.status({});
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
		}
	}
	RED.nodes.registerType('wio-event', WioEvent);
}