'use strict';

// Sales controller
angular.module('sales').controller('SalesController', ['$scope', '$stateParams', '$location', '$http', 'Authentication', 'Sales',
	function($scope, $stateParams, $location, $http, Authentication, Sales ) {
		$scope.authentication = Authentication;
		$scope.user = {};
		$scope.product = {};
		$scope.products = [];
		$scope.sales = {
			name: '',
			qnt: '',
			cnpj: '',
			products: []
		};

		console.log($scope.sale);


		$scope.addProduct = function(product) {
			$scope.sales.products.push(product);
			$scope.product = {};
		};

		$scope.create = function() {
			$http.post('/sales', $scope.sales).success(function(response) {
				$location.path('sales/' + response.cnpj);
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Create new Sale
		$scope.create2 = function() {
			// Create new Sale object
			var sale = new Sales ({
				name: this.name,
				cnpj: this.cnpj,
				address: this.address,
				qnt: this.qnt,
				price: this.price,
				products: this.products
			});


			// Redirect after save
			sale.$save(function(response) {
				$location.path('sales/' + response.cnpj);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Sale
		$scope.remove = function( sale ) {
			if ( sale ) { sale.$remove();

				for (var i in $scope.sales ) {
					if ($scope.sales [i] === sale ) {
						$scope.sales.splice(i, 1);
					}
				}
			} else {
				$scope.sale.$remove(function() {
					$location.path('sales');
				});
			}
		};

		// Update existing Sale
		$scope.update = function() {
			var sale = $scope.sale ;

			sale.$update(function() {
				$location.path('sales/' + sale._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Sales
		$scope.find = function() {
			$scope.sales = Sales.query();
		};

		// Find existing Sale
		$scope.findOne3 = function() {
			$scope.sale = Sales.get({ 
				cnpj: $stateParams.cnpj
			});
		};

		$scope.findOne = function() {
			$http.get('/sales/' + $stateParams.cnpj).success(function(response) {
				$scope.sale = response;
				console.log($scope.sale);
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
