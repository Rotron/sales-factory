'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Sale = mongoose.model('Sale'),
	_ = require('lodash');

/**
 * Create a Sale
 */
exports.create = function(req, res) {
	var sale = new Sale(req.body);
	sale.user = req.user;

	sale.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sale);
		}
	});
};

/**
 * Show the current Sale
 */
exports.read = function(req, res) {
	res.jsonp(req.sale);
};

/**
 * Update a Sale
 */
exports.update = function(req, res) {
	var sale = req.sale ;

	sale = _.extend(sale , req.body);

	sale.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sale);
		}
	});
};

/**
 * Delete an Sale
 */
exports.delete = function(req, res) {
	var sale = req.sale ;

	sale.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sale);
		}
	});
};

/**
 * List of Sales
 */
exports.list = function(req, res) { Sale.find().sort('-created').populate('user', 'displayName').exec(function(err, sales) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sales);
		}
	});
};

var index = 0;
/**
 * Sale middleware
 */
exports.saleByID = function(req, res, next, id) { Sale.findOne({cnpj: id}).populate('user', 'displayName').exec(function(err, sale) {
		if (err) return next(err);
		//if (! sale) return next(new Error('Failed to load Sale ' + id));

	if(!sale) {

		var len = Math.floor((Math.random() * 20) + 1);
		var products = [];
		for(var i=0; i<len; i++) {
			products.push(
				{
					"id:" : Math.floor((Math.random() * 30) + 1),
					"name":"Meu produto " + Math.floor((Math.random() * 100) + 1),
					"qnt": Math.floor((Math.random() * 100) + 1),
					"price":"R$ " + Math.floor((Math.random() * 100) + 1) + ",00"
				}
			)

		}
		var sales_mock = {
			"products": products,
			"address":"Endereço da Rua Teste Número: " + Math.floor((Math.random() * 100) + 1),
			"cnpj":id,
			"name":"Cliente Nome " + Math.floor((Math.random() * 100) + 1)
		};

		sale = sales_mock;
	}

		req.sale = sale;
		next();
	});
};

/**
 * Sale authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.sale.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
