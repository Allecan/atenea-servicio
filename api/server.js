import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from "path"

//Helpers
import { helpers } from '../lib/helpers.js'

//Models
import { userModel } from './Usuario/index.js'
import { authModule } from './Auth/index.js'
import { gradeModel } from './Grado/index.js'
import {boletinModel} from "./Boletin/index.js"

// Configuracion de paths

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

//configuracion swagger
import swaggerUI from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"


class Server {
  constructor (config) {
    this._app = express()
    this._port = config.port
    this._hostname = config.hostname
    this._name = config.name
    this._dirname = dirname(fileURLToPath(import.meta.url))
    this.setMiddlewares()
    this.setRoutes()
  }

  // Middlewares
  setMiddlewares () {
    //this._app.use("/api-doc",swaggerUI.serve,swaggerUI.setup(helpers.swaggerSpec))
    this._app.use("/api-doc",swaggerUI.serve,swaggerUI.setup(swaggerJsDoc(helpers.swaggerSpec)))
    this._app.use(express.json())
    this._app.use(express.urlencoded({ extended: true }))
    this._app.use(cors())
    this._app.use(morgan('dev'))
  }

  setRoutes () {
    this._app.use('/api/v1/user',userModel(express.Router))
    this._app.use('/api/v1/auth',authModule(express.Router))
    this._app.use('/api/v1/grade',gradeModel(express.Router))
    this._app.use('/api/v1/boletin',boletinModel(express.Router))
  }

  start () {
    this._app.set('hostname', this._hostname)
    this._app.listen(this._port, () => {
      console.log(`${this._name} is running en http://${this._hostname}:${this._port}`)
    })
  }
}

export default Server