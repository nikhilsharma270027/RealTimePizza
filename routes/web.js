//middleware are used as second parameter

const authController = require('../app/http/controllers/authController');
const homeController = require('../app/http/controllers/homeController');
const cartController = require('../app/http/controllers/customers/cartController');
const orderController = require('../app/http/controllers/customers/ordercontroller');

const adminOrderController = require('../app/http/controllers/admin/orderController');
const statusController = require('../app/http/controllers/admin/statusController');

// Middleware
const guest = require('../app/http/middleware/guest')
const auth = require('../app/http/middleware/auth')
const admin = require('../app/http/middleware/admin')

function initRoutes(app) {
    

    app.get('/', homeController().index);
    
    // (req,res) => {
    //     res.render('home');
    // }
    app.get('/login', guest, authController().login) //login is a  method
    app.post('/login', authController().postLogin)
    
    app.get('/register', guest, authController().register)
    app.post('/register', authController().postRegister) // part 7

    app.post('/logout', authController().logout)  // part 7
    
    app.get('/cart',cartController().index)
    app.post('/update-cart',cartController().update)

    //Customer routes
    app.post('/orders', auth, orderController().store)
    app.get('/customer/orders', auth, orderController().index)
    app.get('/customer/orders/:id', auth, orderController().show)

    //Admin routes
    app.get('/admin/orders', admin, adminOrderController().index)
    // admin/order/status
    app.post('/admin/order/status', admin, statusController().update)

}

module.exports = initRoutes;