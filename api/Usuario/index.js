import { DataBasePS } from '../../store/PlanetScale.js'
import { ControllerUser } from './controller.js'
import { UserRouter } from './routes.js'
import { User } from '../../models/User.js'
import { helpers } from '../../lib/helpers.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpcode.js'

export const userModel = (expressRouter)=>{
    const userServices = new DataBasePS()
    const userController = new ControllerUser(userServices, User, helpers.encryptPassword)
    const userRouter = new UserRouter(expressRouter, userController, response, HttpCode)
    return userRouter._router
} 