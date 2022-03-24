window.addEventListener('load', function(){

    let form = document.querySelector('.form');
    let title = document.querySelector('#title');
    let price = document.querySelector('#price');
    let file = document.querySelector('#file');
    let description = document.querySelector('#description');
    let errors = {}

    let titleValidator = () => {
        let stringError = '';
        let errorElement = title.nextElementSibling;

        if(title.value == ''){
            stringError = 'Este campo debe estar completo'
        }else if( title.value.length < 5){
            stringError = 'El nombre debe tener al menos 5 caracteres'   
            }
    //Si existe error se almacena en objeto errores
            if(stringError){
                title.classList.add('errorTitle');
                title.style.borderColor = 'red';
                errors.title = stringError;
            }else{
                title.classList.remove('errorTitle');
                title.style.borderColor = 'green';
                delete errors.title;
            }
            
            //Se imprime string de errore en Vista

            errorElement.innerText = stringError;
        
        }
    let priceValidator = () => {
        let stringError = '';
        let errorElement = price.nextElementSibling;

        if(price.value == ''){
            stringError = 'Debes darle un precio'
        }
        //Si existe error se almacena en objeto errores
        if(stringError){
            price.classList.add('errorPrice');
            price.style.borderColor = 'red';
            errors.price = stringError;
        }else{
            price.classList.remove('errorPrice');
            price.style.borderColor = 'green';
            delete errors.price;
        }
        
        //Se imprime string de errore en Vista

        errorElement.innerText = stringError;
    }
    let fileValidator = () => {
        let stringError = '';
        let errorElement = file.nextElementSibling;

        if(file.value == ''){
            stringError = 'Debe subir una imagen'
        }else if(/(.jpg|.jpeg|.png|.gif|bmp|tiff|.jfif)$/i.test(file.value) != true){
            stringError = 'Este archivo no es válido'
        }
        //Si existe error se almacena en objeto errores
        if(stringError){
            file.classList.add('errorFile');
            file.style.borderColor = 'red';
            errors.file = stringError;
        }else{
            file.classList.remove('errorFile');
            file.style.borderColor = 'green';
            delete errors.file;
        }
        
        //Se imprime string de errore en Vista

        errorElement.innerText = stringError;
    }
    let descriptionValidator = () => {
        let stringError = '';
        let errorElement = description.nextElementSibling;

        if(description.value == ''){
            stringError = 'Este campo no puede estar vacio.'
        }else if( description.value.length < 20){
            stringError = 'La descripcion debe tener al menos 20 caracteres'
                console.log(description.value.length)
            }
    //Si existe error se almacena en objeto errores
        if(stringError){
            description.classList.add('errorDescription');
            description.style.borderColor = 'red';
            errors.description = stringError;
        }else{
            description.classList.remove('errorDescription');
            description.style.borderColor = 'green';
            delete errors.description;
        }
        
        //Se imprime string de errore en Vista

        errorElement.innerText = stringError;
    }

    //Ejecutar oyentes - Llamar a las funciones
    
    form.addEventListener('submit', function(e){

        titleValidator();
        priceValidator();
        fileValidator();
        descriptionValidator();

        if(Object.keys(errors).length){
            e.preventDefault();
        }else{
            alert('El producto fue editado de manera exitosa :D')
        }
    });
    //Si focus sale del input se ejecutan las validaciones
title.addEventListener('blur', titleValidator);
price.addEventListener('blur', priceValidator);
file.addEventListener('blur', fileValidator);
description.addEventListener('blur', descriptionValidator);
    
}) 