const mongoose=require('mongoose');
mongoose.Promise=global.Promise;
const bcrypt=require('bcrypt');

const usuariosSchema= new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        lowerCase:true,
        trim:true
    },
    nombre:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required:true,
        trim:true
    },
    token:String,
    expira:Date     
});

//Metodo para hashear password
usuariosSchema.pre('save',async function(next){
    //si el pass ya esta hasheado
    if(!this.isModified('password')){
        return next(); //deten la ejecucion y continua con el siguiente midleware
    }
    // si no
    const hash=await bcrypt.hash(this.password,12);
    this.password=hash
    next();
});

module.exports=mongoose.model('Usuario',usuariosSchema);