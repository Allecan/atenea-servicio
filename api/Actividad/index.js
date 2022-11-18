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
/**
 * @swagger
 * components:
 *   schemas:
 *     Activity:
 *       type: object
 *       properties:
 *         activity_name:
 *           type: string
 *           description: The name activity.
 *           example: actividad 1
 *         activity_value: 
 *           type: number
 *           description: The value activity.
 *           example: 10
 *         areaRef:
 *           type: object
 *           description: The object activity.
 *           example: {}
 *         unit:
 *           type: number
 *           description: The activity unit
 *           example: 1
 *         enable: 
 *           type: boolean
 *           description: The enable activity
 *           example: true
 *         isTest:
 *           type: boolean
 *           description: test activity
 *           example: false
 *       required:
 *         -activity_name
 *         -activity_value
 *         -areaRef
 *         -unit
 *         -enable
 *         -isTest
 *       example: 
 *         activity_name: actividad 1
 *         activity_value: 10
 *         areaRef: {}
 *         unit: 2
 *         enable: false
 *         isTest: false
 */