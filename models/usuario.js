
const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({

    nombre:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    online:{
        type: Boolean,
        default: false
    },
});

//Sobre escribir método, para regresar los campos que queremos 
UsuarioSchema.method('toJSON', function(){
    //EL método toJSON se manda llamar en un json (en el archivo contoller/auth.js)

    //this.Object es la instancia del objeto que esta creado en el momento    
    //los primetos campos son lo que no queremos regresar
    //...object indica que todas las propiedades restantes seran alamacenadas en algo llamado object
    const{ __v, _id, password, ...object } = this.toObject();
    //agregar una nueva propieda (es como renombrar el nombre de la columna)
    object.uid = _id;

    return object;

});

module.exports = model('Usuario', UsuarioSchema);