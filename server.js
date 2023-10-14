require('dotenv').config()
const { render } = require('ejs');
const express = require('express');
const app =  express();
const ejs = require('ejs');
const path =  require('path');// inbuild module
const expressLayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 3300
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo');
//MongoDbStore()

// Database Connection

mongoose.connect(process.env.MONGO_CONNECTION_URL)
.then(() => {
    console.log("mongodb connected");
    })
    .catch(()=>{
    console.log("failed to connect");
    })
    const connection = mongoose.connection;
connection.once('open', () => {
console.log('Database connected... ');
})

// session store
// let mongoStore = new MongoDbStore({
//     mongooseConnection: connection,
//     collection: 'sessions'
// })    

// session configs
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoDbStore.create({
        mongoUrl: process.env.MONGO_CONNECTION_URL
    }),
    saveUninitialized: false,
    cookie:{ maxAge: 1000 * 60 * 60 * 24 }  //24 hours 

}))

//using as a middleware
app.use(flash())

// Asset
app.use(express.static('public'));
app.use(express.json())

// Gobal Middleware
app.use((req,res, next) => {
    res.locals.session = req.session
    next() 
})

//set Template Engine
app.use(expressLayout)
app.set('views', path.join(__dirname,'/resources/views'))
app.set('view engine', 'ejs')
                                    //part5 15:00
require('./routes/web')(app);       //part 6

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});