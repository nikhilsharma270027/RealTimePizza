const Menu = require('../../models/menu')

function homeController() {
  return {
    async index(req, res) {

      const pizzas = await Menu.find()                  // fetching data from db
     //console.log(pizzas)                                // printing data from db
      return res.render('home',{ pizzas: pizzas}); 
          
      // Menu.find().then(function(pizzas) {
      //   console.log(pizzas)
      //     return res.render('home',{ pizzas: pizzas});
      // })
       
    }
  }  
}

module.exports = homeController;

// CRUD opertion controller