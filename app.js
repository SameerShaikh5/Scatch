const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const flash = require('connect-flash')
const connectDB = require('./config/mongoose-connection')
connectDB()

require('dotenv').config()  //It loads all the variables from dotenv file.


//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser()) 
app.use(expressSession({
    resave:false,  //Dont save session user again and again
    saveUninitialized:false, //If an anonymous/not logged in user comes dont create his session
    secret: process.env.EXPRESS_SESSION_SECRET
}))
app.use(flash())
app.use(express.static(path.join(__dirname, "public")))

app.set('view engine', 'ejs')


//Routes
const ownersRouter = require('./routes/ownersRouter')
const usersRouter = require('./routes/usersRouter')
const productsRouter = require('./routes/productsRouter')
const indexRouter = require("./routes/index")


app.use("/", indexRouter)
app.use('/users', usersRouter)
app.use('/owners', ownersRouter)
app.use('/products', productsRouter)



// app.get('/', (req,res)=>{  
//     res.send("hey")
// })


app.listen(port, ()=>{
    console.log("Server Started")
})