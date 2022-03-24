window.addEventListener('load', function(){

//seleccion del formulario
let form = document.querySelector('.form')
let fullName = document.querySelector('#fullName');
let errorFN = document.querySelector(".errorFN");
let email = document.querySelector('#email');
let errorEmail = document.querySelector(".errorEmail");
let password = document.querySelector('#password');
let errorPassword = document.querySelector(".errorPassword");
let confirmPassword = document.querySelector('#confirm');
let errorConfirm = document.querySelector(".errorConfirm");
let avatar = document.querySelector('#avatar');
let errorAvatar = document.querySelector(".errorAvatar");

//errores de los inputs
let errors_fullName = undefined;
let errors_email = undefined;
let errors_password = undefined;
let errors_confirm = undefined;
let errors_avatar = undefined;



//eventos para fullName

fullName.addEventListener('change', function(e){
    if(fullName.value.length < 1){
        errors_fullName = '&#10005 Este campo debe estar completo &#128564';
    }else if( fullName.value.length < 2){
        errors_fullName = '&#10005 El usuario debe tener al menos 2 caracteres &#128533';  
        }
        if(errors_fullName != undefined){
            errorFN.innerHTML = "<p>" + errors_fullName + "</p>";
            fullName.style.borderColor = 'red';
        }
    });
fullName.addEventListener('change', function(e){
    if(fullName.value.length > 2){
        errorFN.innerHTML = "<p>" + "" + "</p>";
        fullName.style.borderColor = 'green';
    }
});
//eventos para email
email.addEventListener('change', function(e){
    if(email.value.length < 1){
        errors_email= '&#10005 Este campo debe estar completo &#128564'
    }else if(/\b[a-z0-9-_.]+@[a-z0-9-_.]+(\.[a-z0-9]+)+/i.test(email.value) != true){
        errors_email = '&#10005 Este email no es válido &#128078'
    }
    if(errors_email != undefined){
        errorEmail.innerHTML = "<p>" + errors_email + "</p>";
        email.style.borderColor = 'red';
    }
});
email.addEventListener('change', function(e){
    if(/\b[a-z0-9-_.]+@[a-z0-9-_.]+(\.[a-z0-9]+)+/i.test(email.value) == true){
        errorEmail.innerHTML = "<p>" + "" + "</p>";
        email.style.borderColor = 'green';
    }
})
//eventos para password
password.addEventListener('change', function(e){
    if(password.value.length < 1){
        errors_password = '&#10005 Este campo debe estar completo &#128564'
    }else if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/i.test(password.value) != true){
        errors_password = '&#10005 La contraseña debe tener al menos 8 caracteres &#128531, al menos una mayúscula, una minúscula, un número y un caracter especial &#128588;'
    }
    if(errors_password != undefined){
        errorPassword.innerHTML = "<p>" + errors_password + "</p>";
        password.style.borderColor = 'red'; 
    }
});
password.addEventListener('change', function(e){
    if(errors_password == undefined){
        errorPassword.innerHTML = "<p>" + " " + "</p>";
        password.style.borderColor = 'green';
    }else if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/i.test(password.value) == true){
        errorPassword.innerHTML = "<p>" + " " + "</p>";
        password.style.borderColor = 'green';
    }
});
//eventos para confirmPassword
confirmPassword.addEventListener('change', function(e){
    if(confirmPassword.value.length < 1){
        errors_confirm = '&#10005 Debe confirmar su contraseña &#128556'
    }else if(password.value != confirmPassword.value){
        errors_confirm = '&#10005 Las contraseñas deben coincidir &#129313'
    }
    if(errors_confirm != undefined){
        errorConfirm.innerHTML = "<p>" + errors_confirm + "</p>";
        confirmPassword.style.borderColor = 'red';
    }
});
confirmPassword.addEventListener('change', function(e){
    if(password.value == confirmPassword.value){
        errorConfirm.innerHTML = "<p>" + "" + "</p>";
        confirmPassword.style.borderColor = 'green';
    }
})
//eventos para avatar
avatar.addEventListener('change', function(e){
    if(avatar.value == ''){
        errors_avatar = '&#10005 Debe subir una imagen &#128579'
    }else if(/(.jpg|.jpeg|.png|.gif|bmp|tiff)$/i.test(avatar.value) != true){
        errors_avatar = '&#10005 Archivo no válido. Las extensiones de archivo permitidas son: jpg, jpeg, png, gif, bmp y tiff &#128078'
        avatar.value = ''
    }
    if(errors_avatar != undefined){
        errorAvatar.innerHTML = "<p>" + errors_avatar + "</p>";
        avatar.style.borderColor = 'red';

    }
});
avatar.addEventListener('change', function(e){
    if(/(.jpg|.jpeg|.png|.gif|bmp|tiff)$/i.test(avatar.value) == true){
        errorAvatar.innerHTML = "<p>" + "" + "</p>";
        avatar.style.borderColor = 'green';
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
