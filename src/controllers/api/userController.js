const db = require('../../database/models');

controller = {

    list: (req, res) =>{
        db.User.findAll()
        .then(users => {
            let listUsers = [];
            users.forEach((user)=>{
                listUsers.push({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    detail: '/api/user/' + user.id
                })
            });
            return res.json({
                count: users.length,
                users: listUsers
            })
        })
        .catch(error =>{
            console.log(error);
        });
    },
    show: (req, res) =>{
        db.User.findByPk(req.params.id)
        .then(user =>{
            return res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                url: '/img/' + user.avatar,
            })
        })
    }

}

module.exports = controller;