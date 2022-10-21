import { FireBase } from '../../store/FireBase.js'
import { ControllerActivity } from './controller.js'
import { ActivityRouter } from './routes.js'
import { Activity } from '../../models/Activity.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpcode.js'
import { config } from '../../config/default.js'

export const activityModel = (expressRouter)=>{
    const activityServices = new FireBase(config.fireBase)
    const activityController = new ControllerActivity(activityServices, Activity)
    const activityRouter = new ActivityRouter(expressRouter, activityController, response, HttpCode)
    return activityRouter._router
} 