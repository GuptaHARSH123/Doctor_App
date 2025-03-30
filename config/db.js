const mongoose = require('mongoose')
const colors = require('colors');
const ConnectDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Mangodb connected ${mongoose.connection.host}`.bgGreen.white);
        
    } catch(error){
        console.log(`Mangodb server Issue ${error}`.bgRed.white);
        
    }
}

module.exports = ConnectDB