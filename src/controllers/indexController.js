let db = require("../database/models");

const controllerIndex = {
    home: (req,res) =>{
        db.Product.findAll({where:{category_id:4},limit:4})
        .then( producto => {
            db.Category.findAll({where:{isSpecial:1}})
                .then( categories => {
                    res.render('./menu/index', {producto, categories})
                })
                .catch(error => res.send(error))
        })
    },

    menu: (req,res) =>{
        db.Category.findAll()
        .then(categorias => {
            res.render('./menu/menu', {categorias} )
        })
    }
} 

module.exports =  controllerIndex;