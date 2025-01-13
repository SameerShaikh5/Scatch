const mongoose = require('mongoose')



const connectDB = async function(){
    try{
        await mongoose.connect(
            "mongodb+srv://iyazshaikh276:2N8GMvcN5eZowx4D@cluster0.29y7q.mongodb.net/Scatch"
        )
        console.log("Database connected")
    }
    catch(error){
        console.log("Connection to db failed!", error.message)
    }
}

module.exports = connectDB