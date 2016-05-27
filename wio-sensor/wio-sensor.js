module.exports = function (RED) {
	const https = require('https');

	function WioSensor(config) {
		RED.nodes.createNode(this, config);
		var node = this;
		node.connection = RED.nodes.getNode(config.connection);

		if (node.connection) {
			this.on('input', function (msg) {
				node.status({ fill: 'blue', shape: 'dot', text: 'requesting' });
				var req = https.request({
					hostname: node.connection.server,
					port: 443,
					path: '/v1/node/' + config.port.replace(/:/g, '') + '/' + config.method
						+ '?access_token=' + config.node,
					method: 'GET'
				}, function (res) {
					res.on('data', function (chunk) {
						var json = JSON.parse(chunk);
						var payload = ((config.output == 'object') ? json : wioGetParsedValue(json));
						if (payload != undefined) {
							msg.payload = payload;
							node.status({});
						} else {
							msg.payload = '';
							node.status({ fill: 'red', shape: 'ring', text: 'undefined' });
						}
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

		function wioGetParsedValue(json) {
			var module = config.port.split(':');

			switch (module[0]) {
				case 'GroveTemp':
					return json.temperature;

				case 'GroveTempHum':
					switch (config.method) {
						case 'temperature':
							return json.celsius_degree;
						case 'temperature_f':
							return json.fahrenheit_degree;
						case 'humidity':
							return json.humidity;
					}
					break;

				case 'GroveUltraRanger':
					switch (config.method) {
						case 'range_in_inch':
							return json.range_inch;
						case 'range_in_cm':
							return json.range_cm;
					}
					break;

				case 'GrovePIRMotion':
					return json.approach;

				case 'GroveAirquality':
					return json.quality;

				case 'GroveBaroBMP280':
					switch (config.method) {
						case 'temperature':
							return json.temperature;
						case 'altitude':
							return json.altitude;
						case 'pressure':
							return json.pressure;
					}
					break;

				case 'GroveDigitalLight':
					return json.lux;

				case 'GroveMoisture':
					return json.moisture;

				case 'GroveGesture':
					return json.motion;

				case 'GroveIRRecv':
					switch (config.method) {
						case 'last_data_recved':
							return json.data;
					}
					break;

				case 'GroveMagneticSwitch':
					return json.mag_approach;

				case 'GroveCompass':
					return json.heading_deg;

				case 'GroveAccMMA7660':
					switch (config.method) {
						case 'shaked':
							return json.shaked;
					}
			}

			return json;
		}
	}
	RED.nodes.registerType('wio-sensor', WioSensor);
}