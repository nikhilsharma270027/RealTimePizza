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
const exp = require('constants');
//MongoDbStore()
const passport = require('passport')
const Emitter = require('events')

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

// // password config
// const passportInit = require('./app/config/passport')
// passportInit(passport)
// app.use(passport.initialize())
// app.use(passport.session())
// //passport works with the help of session

// session store
// let mongoStore = new MongoDbStore({
//     mongooseConnection: connection,
//     collection: 'sessions'
// })    

// Event Emitter
const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter)

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

// password config
const passportInit = require('./app/config/passport');
const order = require('./app/models/order');
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())
//passport works with the help of session


// Asset
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false}))
app.use(express.json())

// Gobal Middleware
app.use((req,res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next() 
})

//set Template Engine
app.use(expressLayout)
app.set('views', path.join(__dirname,'/resources/views'))
app.set('view engine', 'ejs')
                                    //part5 15:00
require('./routes/web')(app);       //part 6  all routes are in this
app.use((req,res) => {
    res.status(404).send('<h1>404, Page not found</h1>')
})

const server = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});



// Socket

const io = require('socket.io')(server)
io.on('connection', (socket) => {
    // Join
    //console.log(socket.id)
    socket.on('join', (orderId) => {
        //console.log(orderId)
        socket.join(orderId) // room will be crated
    })
})


eventEmitter.on('orderUpdated', (data) => {
    io.to(`order_${data.id}`).emit('orderUpdated', data)
})


eventEmitter.on('orderPlaced', (data) => {
    io.to('adminRoom').emit('orderPlaced', data)
})