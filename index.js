const mongoose=require('mongoose');
require('./config/db');

const express= require('express');
const exphbs=require('express-handlebars');
const path=require('path');
const router=require('./routes');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const MongoStore = require('connect-mongo');
//const {body, validationResult}=require('express-validator');
const flash=require('connect-flash');

require('dotenv').config({path:'variables.env'}); 

const app=express();

//habilitar para leer datos del formulario
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//validación de campos
//app.use(expressValidator());

//habilitar handlebars como view
app.engine('handlebars',
    exphbs({
        defaultLayout:'layout',
        helpers:require('./helpers/handlebars') 
    })
);
//helpers es una forma de registrar scripts para comunicarse con handlebars antes de su salida

app.set('view engine','handlebars');

//status files
app.use(express.static(path.join(__dirname,'public')));

app.use(cookieParser());
app.use(session({
    secret:process.env.SECRETO,
    key:process.env.KEY,
    resave:false,
    saveUninitialized:false,
    store:MongoStore.create({
        mongoUrl:process.env.DATABASE
    })
})); 

//Alertas y flash messages
app.use(flash());

//Crear nuestro middleware
app.use((req,res,next)=>{
    res.locals.mensajes=req.flash();
    next();
});

app.use('/',router());


const host='0.0.0.0';
const port=process.env.PUERTO||3000;

app.listen(port,host,()=>{
    console.log('Servidor conectado en el puerto:'+port);
});