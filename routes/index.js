const express=require('express');
const router=express.Router();
const homeController=require('../controllers/homeController');
const vacantesController=require('../controllers/vacantesController');
const usuariosController=require('../controllers/usuariosController');


const { check, validationResult } = require('express-validator');
//const flash=require('connect-flash');

//express().use(flash());


module.exports=()=>{
    router.get('/',homeController.mostrarTrabajos);
    //Crear Vacantes
    router.get('/vacantes/nueva',vacantesController.formularioNuevaVacante);
    router.post('/vacantes/nueva',vacantesController.agregarVacante);

    //Mostrar Vacante
    router.get('/vacantes/:url',vacantesController.mostrarVacante);
    
    //Editar Vacante
    router.get('/vacantes/editar/:url',vacantesController.formEditarVacante);
    router.post('/vacantes/editar/:url',vacantesController.editarVacante);
    
    //Crear Cuentas
    router.get('/crear-cuenta',usuariosController.formCrearCuenta);
    router.post('/crear-cuenta',
    [
        check('nombre')
        .notEmpty()
        .withMessage('El nombre es Obligatorio.'),
        check('email')
        .isEmail()
       .withMessage('El Email debe ser Válido.'),
       check('password')
        .notEmpty()
       .withMessage('El Password no puede ir vacio.'),
       //check('confirmar')
       //.notEmpty()
       //.withMessage('Confirmar Password no puede ir vacio'),
       check('confirmar')
       .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation is incorrect');
        }
      })
    ]
    ,
    (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        req.flash('error', errors.errors.map(error=>error.msg));        
        /*
        res.render('crear-cuenta', {
            nombrePagina: 'Crea tu cuenta en devJobs',
            tagline: 'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta',mensajes: req.flash()
        });*/
        return;
    }
        next();
    },
    usuariosController.crearUsuario
    );
    
    
    return router;
}




/*
    [
        check('nombre')
        .notEmpty()
        .withMessage('El nombre es Obligatorio.'),
        check('email')
        .isEmail()
       .withMessage('El Email debe ser Válido.'),
       check('password')
        .notEmpty()
       .withMessage('El Password no puede ir vacio.'),
       check('confirmar')
        .notEmpty()
       .withMessage('El Password es diferente.') 
           
    ],
    (req, res,next)=> {
        var errors = validationResult(req).array();
        req.flash('error', errors.map(error=>error.msg));        
        res.locals.mensajes=req.flash();
    
    },*/