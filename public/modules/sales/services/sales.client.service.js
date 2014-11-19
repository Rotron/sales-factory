'use strict';

//Sales service used to communicate Sales REST endpoints
angular.module('sales').factory('Sales', ['$resource',
	function($resource) {
		return $resource('sales/:cnpj', { saleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
