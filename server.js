const { render } = require('ejs');
const express = require('express');
const app =  express();
const ejs = require('ejs');
const path =  require('path');// inbuild module
const expressLayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 3300

// Asset
app.use(express.static('public'));

//set Template Engine
app.use(expressLayout)
app.set('views', path.join(__dirname,'/resources/views'))
app.set('view engine', 'ejs')
                                    //part5 15:00
app.get('/', (req,res) => {
    res.render('home');
});

app.get('/cart', (req,res) => {
    res.render('customers/cart');
})

app.get('/login', (req,res) => {
    res.render('auth/login');
})

app.get('/register', (req,res) => {
    res.render('auth/register');
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});