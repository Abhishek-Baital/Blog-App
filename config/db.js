const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Database connected successfully');
    } catch(error){
        console.log('Error while connecting with the database ');
    }
}

module.exports = connectDB;