import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from '../config/default.js'
import path from "path"
import fs from "fs"


export const helpers = {
  encryptPassword: (password) => {
    return bcrypt.hashSync(password, 10)
  },
  comparePassword: (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword)
  },
  generateToken: (idUser) => {
    return jwt.sign({
      id: idUser
    }, config.jwt.secret, {
      expiresIn: '1h'
    }
    )
  }, 
  verifyToken: (token) => {
    return jwt.verify(token, config.jwt.secret)
  },
    swaggerSpec:{
      swaggerDefinition:{
      openapi:"3.0.0",
      info:{
        title: "Atenea API Documentation",
        version:"1.0.0",
      },
      servers:[
        {
          url: `http://${config.api.hostname}:${config.api.port}`
        },
        {
          url: "https://atenea-app-ud23b.ondigitalocean.app"
        }
      ],
    },
    apis:[`${path.join("./index.js","../api/Usuario/*.js")}`, `${path.join("./index.js","../api/Boletin/*.js")}`,
    `${path.join("./index.js","../api/Actividad/*.js")}`,`${path.join("./index.js","../api/Area/*.js")}`,`${path.join("./index.js","../api/Attendence/*.js")}`
      ,`${path.join("./index.js","../api/Grado/*.js")}`,`${path.join("./index.js","../api/Nivel/*.js")}`       
  ]
    },
    deleteFile:(direction,name_file)=>{
      try {
        fs.unlinkSync(`${direction}/${name_file}`)
        console.log('File removed')
      } catch(err) {
        console.error('Something wrong happened removing the file', err)
      }
    }
}

