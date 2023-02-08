
const {Schema, model} = require('mongoose');

const MensajeSchema = Schema({

    de:{
        type: Schema.Types.ObjectId, //indica que es el id de un modelo en mis Schema
        ref: 'Usuario',//A que modelo hacemos referencia para el type
        required: true
    },
    para:{
        type: Schema.Types.ObjectId, //indica que es el id de un modelo en mis Schema
        ref: 'Usuario',//A que modelo hacemos referencia para el type
        required: true
    },

    mensaje:{
        type: String,
        required: true
    }
    /*
    Se configura moongose para que ahí se guarde la fecha y no contrarlo como campo
    fecha:{
        type: Date,
        default: new Date,
        required: true
    },*/
    
},{
    //Configuración adicional para que moongose
    timestamps: true
});

//Sobre escribir método, para regresar los campos que queremos 
MensajeSchema.method('toJSON', function(){
    //EL método toJSON se manda llamar en un json (en el archivo contoller/auth.js)

    //this.Object es la instancia del objeto que esta creado en el momento    
    //los primetos campos son lo que no queremos regresar
    //...object indica que todas las propiedades restantes seran alamacenadas en algo llamado object
    const{ __v, _id, password, ...object } = this.toObject();
    //agregar una nueva propieda (es como renombrar el nombre de la columna)

    return object;

});

module.exports = model('Mensaje', MensajeSchema);