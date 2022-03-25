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
            let category = {
                hamburguesas: 5,
                pizzas: 6,
                pastas: 4,
                empanadas: 6,
                asado: 4,
                bebidas: 6
            };
            return res.json({
                count: products.length,
                countByCategory: category,
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
    }
}

module.exports = controller;