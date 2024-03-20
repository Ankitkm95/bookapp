const mongoose  = require("mongoose");
require('dotenv').config();

const connection = () => {
    console.log(process.env.MONGODB_URL);
    return mongoose.connect(process.env.MONGODB_URL)
}

module.exports = connection;