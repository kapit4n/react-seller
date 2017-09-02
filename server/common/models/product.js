'use strict';

module.exports = function(Product) {
    Product.getName = function(productId, cb) {
        Product.findById( productId, function (err, instance) {
            var response = "Name of product is " + instance.name;
            cb(null, response);
            console.log(response);
        });
      }
    Product.remoteMethod (
        'getName',
        {
          http: {path: '/getname', verb: 'get'},
          accepts: {arg: 'id', type: 'string', http: { source: 'query' } },
          returns: {arg: 'name', type: 'string'}
        }
    );
};
