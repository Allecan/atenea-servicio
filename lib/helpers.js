import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from '../config/default.js'
import path from "path"


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
          url: "https://atenea-servicio.onrender.com"
        }
      ],
    },
    apis:[`${path.join("./index.js","../api/Usuario/*.js")}`, `${path.join("./index.js","../api/Auth/*.js")}`]
    },

}
