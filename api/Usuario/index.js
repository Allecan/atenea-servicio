import { FireBaseAdminSDK } from '../../store/FireBaseAdminSDK.js'
import { ControllerUser } from './controller.js'
import { UserRouter } from './routes.js'
import { User } from '../../models/User.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpcode.js'
import { config } from '../../config/default.js'
import { validateCreateUser } from './ValidatePassword.js'

export const userModel = (expressRouter)=>{
    const userServices = new FireBaseAdminSDK(config.firebaseSDK)
    const userController = new ControllerUser(userServices, User)
    const userRouter = new UserRouter(expressRouter, userController, response, HttpCode, validateCreateUser)
    return userRouter._router
} 