import { FireBase } from '../../store/FireBase.js'
import { ControllerArea } from './controller.js'
import { AreaRouter } from './routes.js'
import { Area } from '../../models/Area.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpcode.js'
import { config } from '../../config/default.js'

export const areaModel = (expressRouter)=>{
    const areaServices = new FireBase(config.fireBase)
    const areaController = new ControllerArea(areaServices, Area)
    const areaRouter = new AreaRouter(expressRouter, areaController, response, HttpCode)
    return areaRouter._router
} 