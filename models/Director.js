const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema ({
    name: {
        type: String,
        maxlength: [60, '30dan fazla giremezsiniz'],
        minlength: [2, '1den büyük alalım']
    },
    surname: {
        type: String,
        maxlength: [60, '30dan fazla giremezsiniz'],
        minlength: [2, '1den büyük alalım']
    },
    bio: {
        type: String,
        maxlength: [1000, '30dan fazla giremezsiniz'],
        minlength: [2, '1den büyük alalım']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('director', DirectorSchema);