const authController = require('../app/http/controllers/authController');
const homeController = require('../app/http/controllers/homeController');
const cartController = require('../app/http/controllers/customers/cartController');
const guest = require('../app/http/middleware/guest')

function initRoutes(app) {
    

    app.get('/', homeController().index);
    
    // (req,res) => {
    //     res.render('home');
    // }
    app.get('/login', guest, authController().login)
    app.post('/login', authController().postLogin)
    
    app.get('/register', guest, authController().register)
    app.post('/register', authController().postRegister) // part 7

    app.post('/logout', authController().logout)  // part 7
    
    app.get('/cart',cartController().index)
    app.post('/update-cart',cartController().update)
}

module.exports = initRoutes;