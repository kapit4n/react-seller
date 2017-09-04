'use strict';

module.exports = function (Product) {
    Product.getName = function (productId, cb) {
        Product.findById(productId, function (err, instance) {
            var response = "Name of product is " + instance.name;
            cb(null, response);
        });
    }
    Product.updateStock = function (productId, amount, cb) {
        Product.findById(productId, function (err, instance) {
            var response = "false";
            if (amount <= instance.stock) {
                instance.stock = instance.stock - amount;
                instance.save();
                response = "true";
            }
            cb(null, response);
        });
    }
    Product.checkStockToUpdate = function (productId, amount, cb) {
        Product.findById(productId, function (err, instance) {
            var response = "false";
            if (amount <= instance.stock) {
                response = "true";
            }
            cb(null, response);
        });
    }
    Product.remoteMethod(
        'getName',
        {
            http: { path: '/getname', verb: 'get' },
            accepts: { arg: 'id', type: 'string', http: { source: 'query' } },
            returns: { arg: 'name', type: 'string' }
        }
    );
    Product.remoteMethod(
        'updateStock',
        {
            http: { path: '/updateStock', verb: 'get' },
            accepts: [
                { arg: 'id', type: 'string', http: { source: 'query' } },
                { arg: 'amount', type: 'string', http: { source: 'query' } },
            ],
            returns: { arg: 'success', type: 'string' }
        }
    );
    Product.remoteMethod(
        'checkStockToUpdate',
        {
            http: { path: '/checkStock', verb: 'get' },
            accepts: [
                { arg: 'id', type: 'string', http: { source: 'query' } },
                { arg: 'amount', type: 'string', http: { source: 'query' } },
            ],
            returns: { arg: 'success', type: 'string' }
        }
    );
};
