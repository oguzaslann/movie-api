const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie');

//tüm filmlerin listelenmesi
router.get('/', (req, res) => {
    const promise = Movie.aggregate([
        {
            $lookup: {
                from: 'directors',
                localField: 'director_id',
                foreignField: '_id',
                as: 'director'
            }
        },
        {
            $unwind: '$director'
        }
    ]);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

//Top10 list
router.get('/top10', (req, res) => {
    const promise = Movie.find({ }).limit(10).sort({imdb_score: -1});

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

//id bazlı arama
router.get('/:movie_id', (req, res, next) => {
  const promise = Movie.findById(req.params.movie_id);

  promise.then((movie) => {
    if(!movie)    //böyle bir id yoksa hata mesajı gönder
      next({message: 'The movie was not found', code:99});

    res.json(movie);
  }).catch((err) => {
    res.json(err);
  })
});

//update
router.put('/:movie_id', (req, res, next) => {
    const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body, {new: true});

    promise.then((movie) => {
        if(!movie)
            next({message: 'The movie was not found', code:99});

        res.json(movie);
    }).catch((err) => {
        res.json(err);
    })
});

//delete film
router.delete('/:movie_id', (req, res, next) => {
    const promise = Movie.findByIdAndRemove(req.params.movie_id);

    promise.then((movie) => {
        if(!movie)
            next({message: 'The movie was not found', code:99});

        res.json(movie);
    }).catch((err) => {
        res.json(err);
    })
});

//yeni film kayıt promise yapısı ile
router.post('/', (req, res, next) =>{
  const movie = new Movie(req.body);
  const promise = movie.save();

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
});

//Between
router.get('/between/:start_year/:end_year', (req, res) => {
  const {start_year, end_year} = req.params;
    const promise = Movie.find({
        year: { "$gte": parseInt(start_year), "$lte": parseInt(end_year)}   //gte büyük eşit, lte küçük eşit
    });

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});




module.exports = router;
