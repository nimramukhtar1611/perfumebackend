const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connection = async()=>{
    try {
        const mongooseconnection= process.env.MONGODB_URL
        if (!mongooseconnection){
            ("env is not defined")
        }
await mongoose.connect(mongooseconnection)
console.log ("DataBase Connected")
    }catch (error){
        console.error("cannot find mongoose connection",)
    }
}
module.exports=connection