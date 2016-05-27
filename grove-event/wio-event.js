module.exports = function (RED) {
	var url = require('url');
	var path = require('path');

	function WioEvent(config) {
		RED.nodes.createNode(this, config);

	}
	RED.nodes.registerType('wio-event', WioEvent);
}