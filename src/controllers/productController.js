const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const {validationResult} = require('express-validator');
const { Op } = require("sequelize");

const Category = db.Category
const Product = db.Product
const amount =  db.Product.count();


const productController = {

    productos: (req,res) => {

        //const productos = productModel.all();
        db.Product.findAll()
            .then(productos => {
                res.render('./products/productos' ,{productos})
            })
                    .catch(error => res.send(error))

    },

    list: (req,res)=>{
        db.Product.findAll()
            .then(listProduct => {
                db.Category.findAll()
                .then( categories => {
                    console.log(amount)
                    res.render('./admin/newProduct', {listProduct, categories,amount})
                })
                .catch(error => res.send(error))
            })
            .catch(error => res.send(error));
    },
    registroProduct:(req,res) => {
            db.Category.findAll()
            .then( categories => {
                res.render('./admin/admin', { categories})
            }).catch(error => res.send(error))
    },

    createProduct:(req,res)=>{
        const resultValidation = validationResult(req);
        let product = db.Product.findByPk(req.params.id);

        if(resultValidation.isEmpty()){
            db.Product.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            category_id: req.body.category,
            image: req.file != null ? req.file.filename : product.image
        },
        {
            where: {id:req.params.id}
        })
        .then( () => {
            res.redirect('/listOfProducts');
        })
    }else{
        let categories = Category.findAll();

        let producto = Product.findAll();

        Promise
        .all([producto, categories])
        .then(([producto, categories]) =>{
            res.render('./admin/admin', 
            {user: req.session.user,
                producto,
                categories, 
                errors : resultValidation.mapped()})
        })
        .catch(error => res.send(error))
    }

        
        /*db.Product.create({
        title: req.body.title,
        image: req.file.filename,
        description: req.body.description,
        price: Number(req.body.price),
        section: "productos",
        category_id: req.body.category
        })
        .then(()=>{
            res.redirect('/listOfProducts')
        })
        .catch(error => res.send(error))*/
    },


    productEdition : (req,res)=>{

        db.Product.findByPk(req.params.id)
        .then( producto => {
            db.Category.findAll()
                .then( categories => {
                    res.render('./admin/productEdition', {producto, categories})
                })
                .catch(error => res.send(error))
        })
        .catch(error => res.send(error))
    },

    edit : (req,res)=>{

        const resultValidation = validationResult(req);
       let product = db.Product.findByPk(req.params.id);
       if(resultValidation.isEmpty()){
            db.Product.update({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            category_id: req.body.category,
            image: req.file != null ? req.file.filename : product.image
        },
        {
            where: {id:req.params.id}
        })
        .then( () => {
            res.redirect('/listOfProducts');
        })
    }else{
        let categories = Category.findAll();

        let producto = Product.findAll();

        Promise
        .all([producto, categories])
        .then(([producto, categories]) =>{
            res.render('./admin/productEdition', 
            {user: req.session.user,
                producto,
                categories, 
                errors : resultValidation.mapped()})
        })
        .catch(error => res.send(error))
    }
    },

    delete : (req,res)=>{
        db.Product.destroy({
            where: { 
                id: req.params.id
            }
        })
        .then( () =>{
            res.redirect('/listOfProducts');
        })
        .catch(error => res.send(error)) 
    },

    category: (req, res) => {
        db.Product.findAll({
            where: {
                category_id: req.params.categoria
            }
        })
        .then(productos => {
            res.render('./products/categories', {productos})
        })
        .catch(error => res.send(error))
            
    },
    productDetail: (req, res) => {
        db.Product.findByPk(req.params.id)
        .then( detail => {
            res.render('./products/productDetail', {detail});
        })
    },
    
    search: (req, res) => {
        
        
        let search = req.query.search.toLowerCase()
        
        db.Product.findAll({
            include: ['category']
        })
        .then( products => {
            let filtrados = products.filter(e => e.title.toLowerCase().includes(search) || e.category.name.toLowerCase().includes(search));
            res.render('./menu/comidaReq', { filtrados})
        })
    },
    
    shoppingCart : (req,res)=>{
        res.render('./products/shopping-cart');
    }
}

module.exports = productController;