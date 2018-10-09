var config = (function (){
    
    var rootPath = "http://localhost:3000/api";
    
    var orderById = function (id, access_token) {
        return `${rootPath}/orders?filter[include]=customer&filter[where][id]=${id}&access_token=${access_token}`;
    }

    var orderDetailsById = function(id, access_token) {
      return `${rootPath}/orderDetails?filter[where][orderId]=${id}&filter[include]=product&access_token=${access_token}`;
    };

    return { 
        orderById: orderById,
        orderDetailsById: orderDetailsById
    };
});

export { config };