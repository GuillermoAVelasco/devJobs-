const mongoose=require('mongoose');
const Usuarios=mongoose.model('Usuario');


//const { check, validationResult } = require('express-validator');

exports.formCrearCuenta=(req,res)=>{
    res.render('crear-cuenta',{
        nombrePagina:'Crea tu cuenta en devJobs.',
        tagline:'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta.'
    })
}

exports.validarRegistro=(req,res,next)=>{

}

exports.crearUsuario=async(req,res,next)=>{
    const usuario=new Usuarios(req.body);
    
    const nuevoUsuario= await usuario.save();

    if(!nuevoUsuario) return next();

    res.redirect('/iniciar-sesion');
}