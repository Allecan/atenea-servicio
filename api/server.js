import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from "path"

//Helpers
import { helpers } from '../lib/helpers.js'

//Models
import { userModel } from './Usuario/index.js'
import { gradeModel } from './Grado/index.js'
import { studentModel } from './Student/index.js'
import { boletinModel } from "./Boletin/index.js"
import { teacherModel } from "./Profesor/index.js"
import { levelModel } from './Nivel/index.js'
import { areaModel } from './Area/index.js'

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
    const corsOptions = {
      origin : ['http://localhost:3000', 'http://localhost:4000', 'https://ateneaq.netlify.app/', 'https://ateneaq.netlify.app/register/', 'https://ateneaq.netlify.app', 'https://ateneaq.netlify.app/register', /(^|^[^:]+:\/\/|[^\.]+\.)ateneaq\.netlify\.app(\/)(.*)/],
      credentials: true,
      methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    }

    this._app.use(cors(corsOptions))
    this._app.use(morgan('dev'))
  }

  setRoutes () {
    this._app.use('/api/v1/user', userModel(express.Router))
    this._app.use('/api/v1/grade', gradeModel(express.Router))
    this._app.use('/api/v1/student', studentModel(express.Router))
    this._app.use('/api/v1/boletin',boletinModel(express.Router))
    this._app.use('/api/v1/teacher',teacherModel(express.Router))
    this._app.use('/api/v1/level',levelModel(express.Router))
    this._app.use('/api/v1/area',areaModel(express.Router))
  }

  start () {
    this._app.set('hostname', this._hostname)
    this._app.listen(this._port, () => {
      console.log(`${this._name} is running en http://${this._hostname}:${this._port}`)
    })
  }
}

export default Server