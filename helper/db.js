const mongoose = require('mongoose');

module.exports =() => {
    mongoose.connect('mongodb://movie_user:dvpogz2334@ds235388.mlab.com:35388/movie-api', {useNewUrlParser: true});
    mongoose.connection.on('open', () => {      //ile trigerı kontrol ediyoruz, tetiklenirse buraya düşecek
       console.log('Mongodb connected');
    });

    mongoose.connection.on('error', (err) => {
        console.log('Mongodb disconnect', err);
    });

    mongoose.Promise = global.Promise;
};