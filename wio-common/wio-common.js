function WioCommon(config, skus) {
	config.connection = null;

	var connection = $('#node-input-connection');
	var nodes = $('#node-input-node');
	var ports = $('#node-input-port');

	connection.on('change', function () {
		getConnection();
	}).trigger('change');

	if ((ports.length) && (skus))
		nodes.on('change', function () {
			reloadPortSelect();
		});

	function getConnection() {
		$.getJSON('wio-config/' + connection.val()).done(function (res) {
			config.connection = res;
			reloadNodeSelect();
		});
	}

	function reloadNodeSelect() {
		if ((config.connection) && (config.connection.server) && (config.connection.token)) {
			$.ajax({
				url: 'https://' + config.connection.server + '/v1/nodes/list?access_token=' + config.connection.token,
				method: 'GET',
				success: function (res) {
					nodes.html('');
					res.nodes.sort(function (a, b) {
						return ((a.online) ? -1 : 1);
					});
					for (var i = 0; i < res.nodes.length; i++) {
						nodes.append($('<option/>')
							.attr('value', res.nodes[i].node_key)
							.text(res.nodes[i].name + ' (' + ((res.nodes[i].online) ? 'up' : 'down') + ')'));
					}
					if ((config.node) && (nodes.find('option[value="' + config.node + '"]').length))
						nodes.val(config.node);
					nodes.trigger('change');
				}
			});
		}
	}

	function reloadPortSelect() {
		if (nodes.val()) {
			$.ajax({
				url: 'https://' + config.connection.server + '/v1/node/config?access_token=' + nodes.val(),
				method: 'GET',
				success: function (res) {
					ports.html('');
					for (var i = 0; i < res.config.connections.length; i++) {
						if (skus.hasOwnProperty(res.config.connections[i].sku))
							ports.append($('<option/>')
								.attr('value', skus[res.config.connections[i].sku].module + ':' + res.config.connections[i].port)
								.attr('data-wio-port', res.config.connections[i].port)
								.attr('data-wio-sku', res.config.connections[i].sku)
								.attr('data-wio-module', skus[res.config.connections[i].sku].module)
								.text(res.config.connections[i].port + ' - ' + skus[res.config.connections[i].sku].name));
					}
					if ((config.port) && (ports.find('option[value="' + config.port + '"]').length))
						ports.val(config.port);
					if (!ports.find('option').length)
						$('<option/>')
							.text(((res.config.connections.length) ? '--No compatible ports found--' : '--No ports configured--'))
							.appendTo(ports);
					ports.trigger('change');
				}
			});
		}
	}
}