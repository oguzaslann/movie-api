const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req. headers['x-access-token'] || req.body.token || req.query.token       //tokenımızı 3 şekilde alabiliyoruz

    if(token){
        jwt.verify(token, req.app.get('api_secret_key'), (err, decoded) => {
            if(err){
                res.json({
                    status: false,
                    message: 'Failed to authenticate token.'
                })
            }else{
                req.decode = decoded;                                                      //payload'taki şifrelenmemiş password
                console.log(decoded);
                next();
            }
        });
    }else{
        res.json({
            status:false,
            message: 'No token provided.'
        })
    }
};