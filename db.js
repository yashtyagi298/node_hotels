const mongoose = require('mongoose');

// Define a mongoDB URL

const mongoURL="mongodb://127.0.0.1:27017/hotel?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.15" // url of your databse

// set up MongoDb connection

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection
const db=mongoose.connection;

// define event listner for databses connection

db.on('connected',()=>{
    console.log('connected to MongoDB');
})

db.on('error',(err)=>{
    console.log('error occur');
})
db.on('disconnected',()=>{
    console.log('disconnected from MongoDB');
})

// export the database connection

module.exports=db;