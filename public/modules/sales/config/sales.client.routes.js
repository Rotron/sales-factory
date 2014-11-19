'use strict';

//Setting up route
angular.module('sales').config(['$stateProvider',
	function($stateProvider) {
		// Sales state routing
		$stateProvider.
		state('listSales', {
			url: '/sales',
			templateUrl: 'modules/sales/views/list-sales.client.view.html'
		}).
		state('createSale', {
			url: '/sales/create',
			templateUrl: 'modules/sales/views/create-sale.client.view.html'
		}).
		state('viewSale', {
			url: '/sales/:cnpj',
			templateUrl: 'modules/sales/views/view-sale.client.view.html'
		}).
		state('editSale', {
			url: '/sales/:cnpj/edit',
			templateUrl: 'modules/sales/views/edit-sale.client.view.html'
		});
	}
]);
