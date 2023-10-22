const Order = require("../../../models/order");
const User = require("../../../models/user");

function orderController() {
  return {
    async index(req, res) {
      try {
        const orders = await Order.find({ status: { $ne: 'completed' } })
          .sort({ createdAt: -1 })
          .populate('customerId', '-password')
          .exec();

        if (req.xhr) {
          return res.json(orders);
        } else {
          res.render('admin/orders', { orders });
        }
      } catch (err) {
        console.error('Error:', err);
        // Handle the error, possibly by sending an error response
        res.status(500).json({ error: 'An error occurred' });
      }
    },
  };
}

module.exports = orderController;


// const Order = require("../../../models/order"); // Correct the model name to start with an uppercase letter
// const { populate } = require("../../../models/user"); // Correct the model name to start with an uppercase letter

// function orderController() {
//   return {
//     index(req, res) {
//       Order.find({ status: { $ne: 'completed' } })
//         .sort({ createdAt: -1 })
//         .populate('customerId', '-password')
//         .exec((err, orders) => {
//           if (err) {
//             console.error('Error:', err);
//             // Handle the error, possibly by sending an error response
//             return res.status(500).json({ error: 'An error occurred' });
//           }

//           if (req.xhr) {
//             return res.json(orders);
//           } else {
//             res.render('admin/orders', { orders });
//           }
//         });
//     },
//   };
// }

// module.exports = orderController;

// const order = require("../../../models/order")
// const { populate } = require("../../../models/user")

// function orderController(){
//     return {
//         index(req,res){
//             order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 }}).
//             populate('customerId', '-password').exec((errr,orders) => {
//                 if(req.xhr){
//                     return res.json(orders)
//                 }else{
//                     res.render('admin/orders')
//                 }
//             })
//         }
//     }
// }

// module.exports = orderController;