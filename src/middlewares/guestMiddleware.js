function guestMiddleware(req, res, next){
    if(req.session.userLogged && req.session.userLogged.rol_id == 2){
        return res.redirect('/profile');
    }
    next();
};

module.exports = guestMiddleware;