import express from 'express';
import './config/mongoDB.js'
//import articulos from './models/fileSystem/articulos.json' assert {type:'json'};
import { router as articulosRouter } from './routers/articulos.js';
import {router as authRouter} from './routers/auth.js';
import rateLimiterConfig from './config/rateLimitConfig.js';
import helmet from 'helmet';
import { router as healthRouter} from './routers/health.js';
const PORT = process.env.PORT ?? 3000
const app  = express()

if(process.env.NODE_ENV === 'production'){
    app.use(rateLimiterConfig)
    app.use(helmet())
}

app.use(express.json())
app.use("/api-natura/v1/articulos", articulosRouter)
app.use("/api-natura/v1/auth", authRouter)
app.use("/health", healthRouter)



app.listen(PORT, (err)=>{
    err ? console.log(`Server not running: ${err}`)
    :
    console.log(`Server up: http://localhost:${PORT}`)
})

// app.get('/articulos', (req, res) => {

//     if(!articulos.length){
//         res.status(404).json({meta:{
//             status:404,
//             success:false
//         }})
//     } else{
//         res.status(200).json({meta:{
//             status:200,
//             success:true
//         }, result: articulos})
//     }
    
// })


// app.get('/articulos/s', (req, res) => {
//     const {name} = req.query    
//     if(!name){
//         return res.status(400).json({ meta:{
//             status:400,
//             success:false,
//             error: 'El parámetro "name" es requerido.' }});               
//     }
//     const articulosRes = articulos.filter(x => x.nombre
//         .toLocaleLowerCase()
//         .includes(name.toLocaleLowerCase())
//     )
    
//     if(!articulosRes.length){
//         res.status(404).json({meta:{
//             status:404,
//             success:false
//         }})
//     } else{
//         res.status(200).json({meta:{
//             status:200,
//             success:true
//         }, result: articulosRes})
//     }
    
// })

// app.get('/articulos/:id', (req, res) => {

    
//     const articulo = articulos.find(x => x.id === req.params.id.toString())
    
//     if(!articulo){
//         res.status(404).json({meta:{
//             status:404,
//             success:false
//         }})
//     } else{
//         res.status(200).json({meta:{
//             status:200,
//             success:true
//         }, result: articulo})
//     }
    
// })

// app.post("/articulos", (req, res)=>{

// })

// app.patch("/articulos", (req, res)=>{

// })

// app.delete("/articulos", (req, res)=>{

// })

