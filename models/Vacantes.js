const mongoose=require('mongoose');
mongoose.Promise=global.Promise;
const slug=require('slug');
const shortid=require('shortid');

const vacantesShema= new mongoose.Schema({
    titulo:{
        type:String,
        required:'El nombre de la vacante es obligatorio',
        trim:true
    },
    empresa:{
        type:String,
        trim:true
    },
    ubicacion:{
        type:String,
        trim:true,
        required:'La ubicación es obligatoria'
    },
    salario:{
        type:String,
        default:0,
        trim:true, 
    },
    contrato:{
        type:String,
        trim:true,     
    },
    descripcion:{
        type:String,
        trim:true,    
    },
    url:{
        type:String,
        lowercase:true
    },
    skills:[String],
    candidatos:[{
        nombre:String,
        email:String,
        cv:String
    }]
});
//hooks pero aca se conoce como midleware
vacantesShema.pre('save',function(next){
    
    //crear la url
    const url=slug(this.titulo);
    this.url=`${url}-${shortid.generate()}`;    
    
    next();
})

module.exports=mongoose.model('Vacante',vacantesShema);