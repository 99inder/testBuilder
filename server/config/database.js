const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(
        process.env.DB_URL
    ).then(() => {
        console.log("Connection to database successful");
    }).catch((error) => {
        console.log("Error occured while connecting to Database");
        console.log(error);
        process.exit(1);
    })
}