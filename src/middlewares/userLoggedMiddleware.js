const db = require('../database/models')
const { Op } = require("sequelize");

function userLoggedMiddleware(req, res, next) {
    
    res.locals.isLogged = false;
    let emailInCookie = req.cookies.userEamil;
    let userFromCookie;
    db.User.findOne({
        where: {
            email: {[Op.like]: emailInCookie}
        }
    })
    .then( user => {
        userFromCookie = user
        if(userFromCookie){
            req.session.userLogged = userFromCookie;
        }
    
        if(req.session && req.session.userLogged){
            res.locals.isLogged = true;
            res.locals.userLogged = req.session.userLogged;
        }

        next();
    })
    .catch(error => res.send(error))

}

module.exports = userLoggedMiddleware;