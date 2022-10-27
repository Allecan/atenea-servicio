import { FireBase } from '../../store/FireBase.js'
import { ControllerLevel } from './controller.js'
import { LevelRouter } from './routes.js'
import { Level } from '../../models/Level.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpcode.js'
import { config } from '../../config/default.js'

export const levelModel = (expressRouter)=>{
    const levelServices = new FireBase(config.fireBase)
    const levelController = new ControllerLevel(levelServices, Level)
    const levelRouter = new LevelRouter(expressRouter, levelController, response, HttpCode)
    return levelRouter._router
} 