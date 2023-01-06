const mongoose = require('mongoose');
const mongoURI = "mongodb://0.0.0.0:27017/praedico_backend_db"
const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongoose successfully");
    })
}

module.exports = connectToMongo;