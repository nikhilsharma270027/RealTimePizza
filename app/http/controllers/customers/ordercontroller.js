const Order = require('../../../models/order')  //part 8
const moment = require('moment')

function orderController () {
    return {
        async store(req, res) {
            try {
                const { phone, address } = req.body;
                if (!phone || !address) {
                    req.flash('error', 'All fields are required');
                    return res.redirect('/cart');
                }
        
                const order = new Order({
                    customerId: req.user._id,
                    items: req.session.cart.items,
                    phone: phone,
                    address: address
                });
        
                const result = await order.save();
                const placedOrder = await Order.populate(result, { path: 'customerId' });
        
                req.flash('success', 'Order placed successfully');
                delete req.session.cart;
        
                // Emit
                const eventEmitter = req.app.get('eventEmitter');
                eventEmitter.emit('orderPlaced', placedOrder);
                
                return res.redirect('/customer/orders');
            } catch (err) {
                req.flash('error', 'Something went wrong');
                return res.redirect('/cart');
            }
        }
        ,
        async index(req, res){
            const orders = await Order.find({ customerId: req.user._id },
                null, 
                { sort: { 'createdAt': -1 } } )
                res.header('Cache-Control', 'no-store')    
            res.render('customers/orders', {orders: orders, moment: moment})
            // console.log(orders)
        },
        async show(req, res) {
            const order = await Order.findById(req.params.id)//Order is a model
            //Authorise User
            if(req.user._id.toString() == order.customerId.toString()){//id is in object form ,so we must convert to string to make it comparable
                return res.render('customers/singleOrder', { order : order })
            }   //if customer id doesnt macth we dont allow to even watch the page
            return res.redirect('/')
            
        }
    }
}

module.exports = orderController;





// const Order = require('../../../models/order')


// function orderController () {
//     //returning  object
//     return {
//         store(req,res) {
//             //console.log(req.body)
//             // Validate request
//             const { phone, address} = req.body
//             if(!phone || !address){
//                 req.flash('error', 'All fields are required')
//                 return res.redirect('/cart')
//             }

//             const order = new Order({
//                 customerId: req.user._id,
//                 items: req.session.cart.items,
//                 phone: phone,
//                 address: address
//             })


//             order.save().then(result => {
//                 req.flash('success', 'Order placed successfully')
//                 return redirect('/')
//             }).catch(err => {    
//                 req.flash('error', 'Something went wromg')
//                 return res.redirect('/cart')
//             })
//         }
//     }
// }

// module.exports = orderController;