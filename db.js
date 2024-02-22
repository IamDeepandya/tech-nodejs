const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/Test?directConnection=true&ssl=false&readPreference=primary";

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, )
    .then(() => console.log('Successfully connected to Mongo'))
    .catch((err) => { console.error(err); });
}

module.exports = connectToMongo;
