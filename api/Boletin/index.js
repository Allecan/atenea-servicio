import { FireBase } from '../../store/FireBase.js'
import { BoletinController } from './controller.js'
import { BoletinRouter } from './routes.js'
import { Boletin } from '../../models/Boletin.js'
import { CourseBulletin } from '../../models/CourseBulletin.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpcode.js'
import { config } from '../../config/default.js'

export const boletinModel = (expressRouter)=>{
    const boletinServices = new FireBase(config.fireBase)
    const boletinController = new BoletinController(boletinServices,Boletin,CourseBulletin,CourseBulletin)
    const boeltinRouter = new BoletinRouter(expressRouter, boletinController, response, HttpCode)
    return boeltinRouter._router
}