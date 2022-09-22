import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from "path"

//Helpers
import { helpers } from '../lib/helpers.js'

// ENV VARIABLES
import { config } from '../config/default.js'

//Models
import { userModel } from './Usuario/index.js'
import { gradeModel } from './Grado/index.js'
import { studentModel } from './Student/index.js'
import { boletinModel } from "./Boletin/index.js"


// Configuracion de paths

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

//configuracion swagger
import swaggerUI from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"


class Server {
  constructor (config, configcoors) {
    this._app = express()
    this._port = config.port
    this._hostname = config.hostname
    this._name = config.name
    this._dirname = dirname(fileURLToPath(import.meta.url))
    this._allowedDomains = [configcoors.front_url]
    this.setMiddlewares()
    this.setRoutes()
  }

  // Middlewares
  setMiddlewares () {
    //this._app.use("/api-doc",swaggerUI.serve,swaggerUI.setup(helpers.swaggerSpec))
    this._app.use("/api-doc",swaggerUI.serve,swaggerUI.setup(swaggerJsDoc(helpers.swaggerSpec)))
    this._app.use(express.json())
    this._app.use(express.urlencoded({ extended: true }))
    const corsOptions = {
      origin: function (origin, callback) {
        if (this._allowedDomains.indexOf(origin) !== -1) {
          //El origen de request esta pemitido
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
    };
    this._app.use(cors(corsOptions))
    this._app.use(morgan('dev'))
  }

  setRoutes () {
    this._app.use('/api/v1/user', userModel(express.Router))
    this._app.use('/api/v1/grade', gradeModel(express.Router))
    this._app.use('/api/v1/student', studentModel(express.Router))
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