const mongoose = require('mongoose');
const URL = "mongodb+srv://alisbahhina:hbg6dlFbB0zPlbkB@cluster0.jhb0o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function connectDb() {

        return mongoose.connect(URL);

}

module.exports = connectDb;