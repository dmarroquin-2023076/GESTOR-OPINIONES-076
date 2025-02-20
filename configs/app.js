//Levantar servidor express (HTTP)

//Modular | + efectiva + legible | trabaja en funciones

'use strict'

//ECModules | ESModules
import express from 'express' //Servidor HTTP
import morgan from 'morgan' //Logs
import helmet from 'helmet' //Seguridad para HTTP
import cors from 'cors' //Acceso al API
import userRouter from '../src/user/user.routes.js'
import { limiter } from '../middlewares/rate.limit.js'

//Configuraciones de express
const configs = (app)=>{
    app.use(express.json()) //Aceptar y enviar datos en JSON
    app.use(express.urlencoded({extended: false})) //No encriptar la URL
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter) //valida las solicitudes en x tiempo
}

const routes = (app)=>{
    app.use('/v1/user', userRouter)
}

//Ejecutarmos el servidor
export const initServer = ()=>{
    const app = express() //Instancia de express
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(err){
        console.error('Server init failed', err)
    }
}