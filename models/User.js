const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true            //benzersiz
    },
    password: {
        type: String,
        minlength: [5, 'En az 5 karakter girmelisiniz.']
    }
});

module.exports = mongoose.model('user', UserSchema);