window.addEventListener('load', function(){
//seleccion del form, inputs y divs de errores
    let form = document.querySelector('.form')  
    let logEmail = document.querySelector('#nombre');
    let errorEmail = document.querySelector(".errorEmail");
    let password = document.querySelector('#password');
    let eye = document.querySelector('.pwd .fa-eye-slash');
    let errorPassword = document.querySelector(".errorPassword");
//errores de los inputs
    let errors_email = undefined;
    let errors_password = undefined;
//eventos para email   
    logEmail.addEventListener('change', function(e){
        if(logEmail.value.length < 1){
            errors_email = '&#10005 Este campo debe estar completo &#10071'
        }else if(/\b[a-z0-9-_.]+@[a-z0-9-_.]+(\.[a-z0-9]+)+/i.test(logEmail.value) != true){
            errors_email = '&#10005 Este email no es válido &#9993 &#128078'
        }
        if(errors_email != undefined){
            errorEmail.innerHTML = "<p>" + errors_email + "</p>";
            logEmail.style.borderColor = 'red';
        }
    });
    logEmail.addEventListener('change', function(e){
        if(/\b[a-z0-9-_.]+@[a-z0-9-_.]+(\.[a-z0-9]+)+/i.test(logEmail.value) == true){
            errorEmail.innerHTML = "<p>" + " " + "</p>";
            logEmail.style.borderColor = 'green';
        }
    });
//eventos para password
    password.addEventListener('change', function(e){

        if(password.value.length < 1){
            errors_password = '&#10005 Este campo es obligatorio &#10071' 
        }else if(password.value.length < 9){
            errors_password = '&#10005 Esta contraseña es corta &#128553 Se esperaba una contraseña de al menos 8 caracteres &#128556 &#10071'
        }
        if(errors_password != undefined){
            errorPassword.innerHTML = "<p>" + errors_password + "</p>";
            password.style.borderColor = 'red'; 
        }
    });
    password.addEventListener('change', function(e){
        if(password.value.length >= 8){
            errorPassword.innerHTML = "<p>" + " " + "</p>";
            password.style.borderColor = 'green';
        }
    });
    //evento para mostrar contraseña
    eye.addEventListener('click', ()=>{
        //Si la contraseña esta oculta...
        if(password.type === 'password'){
            //Mostrar en texto
            password.type = 'text';
            //Alteracion de iconos
            eye.classList.remove('fa-eye-slash');
            eye.classList.add('fa-eye');
        }else{
            //para ver en tipo password, oculta
            password.type = 'password';
            //alteracion de iconos
            eye.classList.remove('fa-eye');
            eye.classList.add('fa-eye-slash');
        }    
    });
    form.addEventListener('submit', function(e){
        e.preventDefault();
        let errores = {};
        if(Object.keys(errores).length > 0){
            console.log(errores)
        }else{
            form.submit();
        }
    })

})