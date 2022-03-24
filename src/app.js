/* EXPRESS*/
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const cookies = require('cookie-parser');

app.use(express.static(path.join(__dirname, '../public')));

// catch 404 and forward to error handler


const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');



//App session 
app.use(session({
	secret: "Shhh, It's a secret",
	resave: false,
	saveUninitialized: false,
    //Este resave y saveUnitialized es necesario para que no me salgan errores aunque son opcionales
    
}));

app.use(cookies());

app.use(userLoggedMiddleware);

// catch 404 and forward to error handler


/*Para procesar los FORMULARIOS */
app.use(express.urlencoded({extended:false}));

/* EJS */ 
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

/* IMPLEMENTACION PARA PUT Y DELETE*/
// Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
const methodOverride = require('method-override')
app.use(methodOverride('_method'));



  // error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
  
	// render the error page
	res.status(err.status || 500);
	res.render('error');
  });

/* REQUERIMIENTO DE RUTAS */
const mainRutas = require('./routers/indexRouter');
const rutaUser = require('./routers/userRouter') /*airu*/ 
const products = require('./routers/productsRouter');


/* RUTAS */
app.use('/', mainRutas);
app.use('/', rutaUser) 
app.use('/', products);


/*Server Funcionando*/
app.listen(process.env.PORT || 3000, ()=>{
    console.log('Servidor funcionando puerto 3000');
});

app.use((req,res, next) =>{
	res.status(404).render("error")
})


