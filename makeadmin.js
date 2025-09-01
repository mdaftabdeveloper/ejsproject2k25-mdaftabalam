const User = require('./models/User');
const bcrypt = require('bcrypt');

async function makeAdmin() {
    try {
        let user = await User.findOne({ email: 'mdaftabdeveloper@gmail.com' })
        if (user) {
            console.log("User Updated..");
        } else {
            user = new User();
        }
        user.firstName = 'Aftab';
        user.lastName = 'Alam';
        user.email = 'mdaftabdeveloper@gmail.com';
        let encryptedPassword = bcrypt.hashSync('123456', 10);
        user.password = encryptedPassword;
        user.userType = 'admin';
        await user.save();
        console.log('User saved sucessfully..');
    } catch (error) {
        console.log(error);
    }
}
module.exports = makeAdmin;