const mongoose= require('mongoose');
const Vacante=mongoose.model('Vacante');
//tmb podria haber sido
//const Vacante=require('../models/Vacantes')

exports.formularioNuevaVacante=(req,res)=>{
    res.render('nueva-vacante',{
        nombrePagina:'Nueva Vacante',
        tagline:'Llena el formulario y publica tu Vacante.'
    })
}

exports.agregarVacante=async(req,res)=>{
    const vacante= new Vacante(req.body);
    
    //crear Arreglo de habilidades
    vacante.skills=req.body.skills.split(',');

    //almacenarlo en la bd
    const nuevaVacante=await vacante.save();

    // redireccionar
    res.redirect(`/vacantes/${nuevaVacante.url}`);
}

exports.mostrarVacante=async(req,res,next)=>{
    const vacante=await Vacante.findOne({url: req.params.url}).lean();

    // si no hay resultados
    if(!vacante) return next();

    res.render('vacante',{
        vacante,
        nombrePagina:vacante.titulo,
        barra:true
    })
}

exports.formEditarVacante=async(req,res,next)=>{
    const vacante=await Vacante.findOne({url: req.params.url}).lean();

    // si no hay resultados
    if(!vacante) return next();

    res.render('editar-vacante',{
        vacante,
        nombrePagina:`Editar- ${vacante.titulo}`
    })
}

exports.editarVacante=async(req,res,next)=>{
    const vacanteActualizada=req.body;
    vacanteActualizada.skills=req.body.skills.split(',');

    const vacante=await Vacante.findOneAndUpdate({url: req.params.url},vacanteActualizada,{
        new:true,  //si no se pone en true por defecto trae el registro viejo
        runValidators:true //para que todo lo que pusimos ene l modelo lo tome
    }).lean();

    res.redirect(`/vacantes/${vacante.url}`);
}
