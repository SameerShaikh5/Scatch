const mongoose = require('mongoose')



const connectDB = async function(){
    try{
        await mongoose.connect(
            process.env.MONGODB_URI
        )
        console.log("Database connected")
    }
    catch(error){
        console.log("Connection to db failed!", error.message)
    }
}

module.exports = connectDB