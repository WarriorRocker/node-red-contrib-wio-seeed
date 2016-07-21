function WioCommon(config, skus) {
	config.connection = null;

	var connection = $('#node-input-connection');
	var nodes = $('#node-input-node');
	var ports = $('#node-input-port');

	nodes.on('change', function () {
		reloadPortSelect();
	});

	connection.on('change', function () {
		getConnection();
	}).trigger('change');

	function getConnection() {
		$.getJSON('wio-config/' + connection.val()).done(function (res) {
			config.connection = res;
			reloadNodeSelect();
		});
	}

	function reloadNodeSelect() {
		if ((config.connection) && (config.connection.server) && (config.connection.token)) {
			nodes.html('').append($('<option/>').text('Loading nodes...'));
			$.ajax({
				url: 'https://' + config.connection.server + '/v1/nodes/list?access_token=' + config.connection.token,
				method: 'GET',
				success: function (res) {
					nodes.html('');
					if (('nodes' in res) && (res.nodes.length)) {
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
					} else {
						nodes.append($('<option/>').text('--No nodes listed--'));
					}
					nodes.trigger('change');
				},
				error: function (xhr) {
					var response = JSON.parse(xhr.responseText);
					nodes.html('').append($('<option/>').text('--' + (('error' in response) ? response.error : 'Unknown error') + '--'));
					nodes.trigger('change');
				}
			});
		} else {
			nodes.html('').append($('<option/>').text('--Missing wio-config--'));
			nodes.trigger('change');
		}
	}

	function reloadPortSelect() {
		console.log(nodes.val());
		if (nodes.val()) {
			ports.html('').append($('<option/>').text('Loading ports...'));
			$.ajax({
				url: 'https://' + config.connection.server + '/v1/node/config?access_token=' + nodes.val(),
				method: 'GET',
				success: function (res) {
					ports.html('');
					if (('config' in res) && ('connections' in res.config) && (res.config.connections.length)) {
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
							ports.append($('<option/>').text('--No compatible ports found--'));
					} else {
						ports.append($('<option/>').text('--No ports configured--'));
					}
					ports.trigger('change');
				},
				error: function (xhr) {
					var response = JSON.parse(xhr.responseText);
					ports.html('').append($('<option/>').text('--' + (('error' in response) ? response.error : 'Unknown error') + '--'));
					ports.trigger('change');
				}
			});
		} else {
			ports.html('').append($('<option/>').text('--No node selected--'));
			ports.trigger('change');
		}
	}
}