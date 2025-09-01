const express = require('express');
const connect = require('./connection');
const makeAdmin = require('./makeadmin');
const path = require('path');
const user = require('./routes/user');
const student = require('./routes/student');
const app = express();
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
connect();
makeAdmin();
app.use(user);
app.use(student);
app.listen(3000, (err) => {
    if (err)
        console.log(err);
    else
        console.log("Server is running on PORT 3000");
});
