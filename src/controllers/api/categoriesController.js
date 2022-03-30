const db = require('../../database/models');

controller = {
    list: (req, res) =>{
        db.Category.findAll()
        .then(categories=>{
        db.Product.findAll()
        .then(products =>{
            
            let Hamburguesas = products.filter(product => product.category_id === 1).length
            let Pizzas = products.filter(product => product.category_id === 2).length
            let Pastas = products.filter(product => product.category_id === 3).length
            let Empanadas = products.filter(product => product.category_id === 4).length
            let Asado = products.filter(product => product.category_id === 5).length
            let Bebidas = products.filter(product => product.category_id === 6).length
            return res.json({
                countTotal: categories.length,
                countByCategory: {
                    Hamburguesas,
                    Pizzas,
                    Pastas,
                    Empanadas,
                    Asado,
                    Bebidas
            },
            data : categories
            })
          
        })
        })            
    },

   /* imgProduct: (req, res) =>{
        db.Product.findByPk(req.params.image)
        .then(imgProduct =>{
            return res.render(imgProduct);
             console.log(imgProduct)
        })
    }*/
}

module.exports = controller;