'use strict';

module.exports = function(Orderdetail) {
  Orderdetail.getCurretTotal = function(cb) {
    Orderdetail.find({}, function(err, instance) {
      var response = 0;
      instance.forEach(function(orderItem) {
        if (!orderItem.orderId) {
          response += orderItem.totalPrice;
        }
      });
      cb(null, response);
    });
  }
  Orderdetail.remoteMethod(
    'getCurretTotal', {
      http: { path: '/currentTotal', verb: 'get' },
      returns: { arg: 'total', type: 'string' }
    }
  );
};
