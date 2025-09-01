const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/ejsstudentproject');
        console.log("Database connected successfully..");
    } catch (error) {
        console.log(error);
    }
}
module.exports = connect;