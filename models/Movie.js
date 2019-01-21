const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema ({
   director_id: Schema.Types.ObjectId,
   title: {
     type: String,
       required: [true, '`{PATH}` alanı zorunludur.'],
       maxlength: [30, '30dan fazla giremezsiniz'],
       minlength: [2, '1den büyük alalım']
   },
    category: {
        type: String,
        maxlength: [30, '30dan fazla giremezsiniz'],
        minlength: [2, '1den büyük alalım']
    },
    country: {
        type: String,
        maxlength: [30, '30dan fazla giremezsiniz'],
        minlength: [2, '1den büyük alalım']
    },
    year: Number,
    imdb_score: {
       type: Number,
        max:10,
        min:0
    },
    createdAt: {
       type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movie', MovieSchema);