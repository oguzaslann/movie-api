const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Director = require('../models/Director');

// director ekleme
router.post('/', (req, res, next) => {
    const director = new Director(req.body);
        const promise = director.save();

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
       res.json(err);
    });
});

router.get('/', (req, res) => {
    const promise = Director.aggregate([    //join için aggregate kullanıyoruz
        {
        $lookup: {
        from: 'movies',
            localField: '_id',
            foreignField: 'director_id',
            as: 'movies'
                }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true    //herhangi bir datayla eşleşmese de gösterecek
            }
        },
        {
            $group: {                               //gruplama
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movies'                //movieler tek kısımda yazılır
                }
            }
        },
        {
            $project: {                             //gruptaki atamalar
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'
            }
        }
    ]);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
       res.json(err);
    });

});

router.get('/:director_id', (req, res) => {
    const promise = Director.aggregate([    //join için aggregate kullanıyoruz
        {
          $match: {
              '_id': mongoose.Types.ObjectId(req.params.director_id)    //tek bir yönetmenin bilgilerini getirmek için
          }               //veri object id olarak geldiği için mongoose tanımlayıp altındaki types object id kullandık
        },
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true    //herhangi bir datayla eşleşmese de gösterecek
            }
        },
        {
            $group: {                               //gruplama
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movies'                //movieler tek kısımda yazılır
                }
            }
        },
        {
            $project: {                             //gruptaki atamalar
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'
            }
        }
    ]);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});

//update
router.put('/:director_id', (req, res, next) => {
    const promise = Director.findByIdAndUpdate(req.params.director_id, req.body, {new: true});

    promise.then((director) => {
        if(!director)
            next({message: 'The director was not found', code:100});

        res.json(director);
    }).catch((err) => {
        res.json(err);
    })
});

//delete director
router.delete('/:director_id', (req, res, next) => {
    const promise = Director.findByIdAndRemove(req.params.director_id);

    promise.then((director) => {
        if(!director)
            next({message: 'The director was not found', code:101});

        res.json(director);
    }).catch((err) => {
        res.json(err);
    })
});


module.exports = router;