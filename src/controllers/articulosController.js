//import articulos from '../models/fileSystem/articulos.json' assert {type:'json'};
import { trusted } from "mongoose"
import Articulo from "../models/mongoDB/Articulo.js"

export const articuloController = {
    async getAll(req, res){
        try {
            const articulos = await Articulo.find()
            if(!articulos.length){
                res.status(404).json({meta:{
                    status:404,
                    message: "Articulos Database is empty",
                    success:false
                }})
            } else{
                res.status(200).json({meta:{
                    status:200,
                    message: "Articulos",
                    success:true
                }, result: articulos})
            }
        } catch (error) {
            res.status(500).json({
                status:500,
                message:"Internal Server Error",
                succes:false
                
            })
        }
        
    },

    async getByNombre(req, res){
        const {nombre} = req.query
        if(!nombre){
            res.status(400).json({succes:false, message:"Missing 'nombre' query param"})
        }

        try {
            const articulos = await Articulo.find({nombre:{$regex: nombre, $options:"i"}})
            if(!articulos.length){
                return res.status(404).json({succes:false, message:"Articles not found"})
            }
            res.status(200).json({
                succes:true,
                message:"Articles by query nombre",
                data:articulos
            })

        } catch (error) {
            res.status(500).json({
                status:500,
                message:"Internal Server Error",
                succes:false
                
            })
        }
    },

    async getFirstById(req, res){
        
        try {
            const articulo = await Articulo.findById(req.params.id)
            if(!articulo){
                return res.status(404).json({succes:false, message:"Article not found"})
            }
            res.status(200).json({
                succes:true,
                message:"Article by id",
                data: articulo
            })

        } catch (error) {
            res.status(500).json({
                status:500,
                message:"Internal Server Error",
                succes:false
                
            })
        }
    },

    async createOne(req, res){
        const { codigo, 
                nombre, 
                descripcion, costo, coeficiente, stock, urlfoto} = req.body

        try {

            const newArticulo = new Articulo({
                codigo, nombre, descripcion, costo, coeficiente, stock, urlfoto
            })
            const savedArticulo = await newArticulo.save()
            res.status(200).json({
                status: 200,
                message: "New Article created",
                succes: true,
                data: savedArticulo
            })
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "Internal Server Error",
                succes: false
                
            })
        }
    },

    async deleteOne(req, res){
        try {
            const articulo = await Articulo.findByIdAndDelete(req.params.id)
            if(!articulo){
                return res.status(404).json({
                    succes: false,
                    message: "Deletion failed. Article not found"
                })
            }
            res.send(204)
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "Internal Server Error",
                succes: false
                
            })
        }
    },

    async updateOne(req, res){
        try {
            const updatedArticulo = await Articulo.findByIdAndUpdate(req.params.id, req.body, {new: trusted})
            if(!updatedArticulo){
                return res.status(404).json({
                    succes: false,
                    message: "Updating failed. Article not found"
                }) 
            }
            res.status(200).json({succes:true, message:"Article Updated", data:updatedArticulo})
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "Internal Server Error",
                succes: false
                
            })
        }
    }

}