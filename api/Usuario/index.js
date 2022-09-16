import { FireBaseAdminSDK } from '../../store/FireBaseAdminSDK.js'
import { ControllerUser } from './controller.js'
import { UserRouter } from './routes.js'
import { User } from '../../models/User.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpcode.js'
import { config } from '../../config/default.js'

export const userModel = (expressRouter)=>{
    const userServices = new FireBaseAdminSDK(config.firebaseSDK)
    const userController = new ControllerUser(userServices, User)
    const userRouter = new UserRouter(expressRouter, userController, response, HttpCode)
    return userRouter._router
} 
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The user email.
 *           example: jossugames@gmail.com
 *         emailVerified:
 *           type: boolean
 *           description: The user's email verified.
 *           example: false || true
 *         password:
 *           type: string
 *           description: The user's password
 *           example: 123456
 *         displayName: 
 *           type: string
 *           description: The user's display name
 *           example: 'John Doe'
 *         disable:
 *           type: boolean
 *           description: The user's disable
 *           example: false || true
 *       required:
 *         -email
 *         -emailVerified
 *         -password
 *         -displayName
 *         -disable
 *       example: 
 *         email: jossugames@gmail.com
 *         emailVerified: false
 *         password: "123456"
 *         displayName: josue
 *         disable: false
 */
/**
 * @swagger
 * /api/v1/user/create-user:
 *   post:
 *     summary: Create a new user.
 *     tags: [User]
 *     requestBody:  
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: create a new user
*/