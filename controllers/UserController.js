const User = require("../models/User");
const Student = require("../models/Student");
const bcrypt = require('bcrypt');
async function addUser(req, res) {
    try {
        // console.log(req.body);
        let user = new User(req.body);

        let encryptedPassword = bcrypt.hashSync(req.body.password, 10);
        // console.log(encryptedPassword);
        user.password = encryptedPassword;
        await user.save();
        res.redirect('/');

    } catch (error) {
        console.log(error);
    }
}

async function doLogin(req, res) {
    try {
        // console.log(req.body);
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            let validPassword = await bcrypt.compare(req.body.password, user.password);
            if (validPassword) {
                if (user.userType === 'student') {
                    res.render('welcomstudent');
                } else {
                    let students = await Student.find({});
                    res.render('welcomeadmin', {
                        students: students
                    });
                }

            } else {
                res.end("<h1>Invalid password or email</h1>");
            }
        } else {
            res.end("<h1>User does not exists</h1>");
        }

    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    addUser,
    doLogin
}