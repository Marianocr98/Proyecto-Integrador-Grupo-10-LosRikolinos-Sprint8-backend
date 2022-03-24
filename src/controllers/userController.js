const db = require('../database/models');
const bcrypt = require('bcryptjs');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const { validationResult} = require('express-validator');


const userController = {

    register: (req, res)=> {
        res.render('./users/register');
    },

    login: (req, res)=> {
        res.render('./users/login');
    },

    processRegister: (req, res)=>{
        
        const resultadosValidos = validationResult(req);
        
        if(resultadosValidos.errors.length > 0){
            return res.render('./users/register', {
                errors: resultadosValidos.mapped(),
                oldData: req.body
            });
        }

        db.User.create({
            full_name: req.body.fullName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: req.file.filename,
            rol_id: 2
        })
        .then( () => {
            return res.redirect('/login');
        })
        .catch( error => {
            return res.send(error);
        });
    
    },
    edit: (req, res)=> {
        res.render('./admin/edit');
    },
    update: (req, res)=>{
        
        db.User.update({
            full_name: req.body.fullName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: req.file.filename,
        },{
            where: { id: req.params.id}
        })
        .then( () => {
                req.session.user = req.body.fullName;
                req.session.email = req.body.email;
                req.session.image = req.file.filename;
                console.log(req.session)
                res.redirect("/");
        })
        .catch( error => {
            return res.send(error);
        });
    
    },
    processLogin: (req, res) =>{

        db.User.findOne(
            { 
                where : { email: req.body.email}
            })
        .then( user => {

            if (user != null) {
            //para saber su en mi base de datos tengo la misma contrase;a que la que el usuario ingreso correra todo bien 
        
                    let isOkPassword = bcrypt.compareSync(req.body.password, user.password);
        
                    if (isOkPassword) {
        
                        req.session.userLogged = user;
                        console.log(req.session.userLogged);
                        if (req.body.remember_user){
        
                            res.cookie('userEmail', req.body.email, {maxAge:(1000 * 60) * 60})
                        }
        
                            res.redirect('/profile')
                    }
        
                    res.render('./users/login' , {
                        errors: {
                            email: {
                                msg: 'Las credenciales son inválidas!'
                            }
                        }	
                    });
                } else {
                    res.render('./users/login', {
                        errors: {
                            email: {
                                msg: 'No se encuentra este email en nuestra base de datos'
                            }
                        }
                    });
                }
        })
        .catch(error => res.send(error));
    },

    
    profile: (req, res)=> {
        res.render('./users/profile', {user: req.session.userLogged});
    },

    logout:(req, res)=>{
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }
};

module.exports = userController;