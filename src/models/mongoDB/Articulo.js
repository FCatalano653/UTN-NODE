import mongoose from "mongoose";

const Schema = mongoose.Schema

const articuloSchema = new Schema({    
    codigo: {
        type: String,
        required: true,
        trim:true 
    },
    nombre: {
        type: String,
        required: true,
        trim:true 
    },
    descripcion: {
        type: String,        
        trim:true 
    },
    costo: {
        type: Number               
    },
    coeficiente: {
        type: Number,
        required:true,
        min:[1, "El coeficiente debe ser mayor o igual a 1"],
        max:[9.9, "El coeficiente debe menor a 10"]
    },
    stock: {
        type: Number,
        required:true
    },
    urlfoto: {
        type:String
    }},  
    {  
    timestamps:true
    })
    articuloSchema.index({nombre:"text", codigo:"text"})

const Articulo = mongoose.model("Articulo", articuloSchema)
export default Articulo