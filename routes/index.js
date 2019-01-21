const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Models
const User = require('../models/User');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/register',(req, res, next) => {
  const {username, password} = req.body;


    bcrypt.hash(password, 10).then((hash) => {
        const user = new User ({
            username,
            password: hash
        });

        const promise = user.save();
        promise.then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json(err);
        });
    });

});

//user girişi
router.post('/authenticate', (req, res) => {
    const {username, password} = req.body;

    User.findOne({              //kullanıcı bulma
        username
    }, (err, user) => {
        if(err)
            throw err;

        if(!user){
            res.json({
                status: false,
                message: 'Authentication failed, user not found'
            });
        }else{
            bcrypt.compare(password, user.password).then((result) => {      //şifrelenmiş parola verify işlemi
                if(!result) {
                    res.json({
                       status: false,
                       message: 'Authentication failed, wrong password.'
                    });
                }else{
                    const payload = {
                        username
                    };
                    const token = jwt.sign(payload, req.app.get('api_secret_key'), {       //token oluşturduk
                       expiresIn: 720       //12 saat - ne kadar dakika geçerli olacağını yazıyoruz
                    });

                    res.json({
                        status:true,        //oluşturduğumuz token'ı döndük
                        token
                    })
                }
            });
        }
        });


});



module.exports = router;
