const db = require('../../database/models');

controller = {
    list: (req, res) =>{
        db.Product.findAll({
            attributes: ['id', 'title', 'description', 'category_id']
        })
        .then(products =>{
            let listProducts = [];
            products.forEach((product)=>{
                listProducts.push({
                    id: product.id,
                    title: product.title,
                    description: product.description,
                    category: product.category_id,
                    detail: '/api/products/' + product.id
                })
            });
            let Hamburguesas = products.filter(product => product.category_id === 1).length
            let Pizzas = products.filter(product => product.category_id === 2).length
            let Pastas = products.filter(product => product.category_id === 3).length
            let Empanadas = products.filter(product => product.category_id === 4).length
            let Asado = products.filter(product => product.category_id === 5).length
            let Bebidas = products.filter(product => product.category_id === 6).length
            return res.json({
                count: products.length,
                countByCategory: {
                    Hamburguesas,
                    Pizzas,
                    Pastas,
                    Empanadas,
                    Asado,
                    Bebidas
                },
                products: listProducts
            })
        })            
    },
    listByCategory: (req, res) =>{
        db.Product.findAll({
            where: {category_id: req.params.id}
        })
        .then(listProductByCategory =>{
            return res.status(200).json({
                total : listProductByCategory.length,
                data: listProductByCategory,
                status: 200
            })
        })
    },
    show: (req, res) =>{
        db.Product.findByPk(req.params.id)
        .then(product =>{
            return res.status(200).json({
                id: product.id,
                title: product.title,
                description: product.description,
                category: product.category_id,
                url: '/img/' + product.image,
                status: 200
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