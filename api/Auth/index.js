import AuthController from "./Controller.js"
import AuthRoute from "./Routes.js"
import { DataBasePS } from '../../store/PlanetScale.js'
import Auth from '../../models/Auth.js'
import { helpers } from '../../lib/helpers.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpcode.js'

export const authModule = (expressRoute) => {
  const authServices = new DataBasePS()
  const authController = new AuthController(authServices, Auth, helpers.comparePassword, helpers.generateToken)
  const authRoute = new AuthRoute(expressRoute, authController, response, HttpCode)
  return authRoute._router
}
/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       properties:
 *         auth:
 *           type: boolean
 *           description: The auth .
 *           example: false || true
 *         name_complete:
 *           type: string
 *           description: The auth name complete.
 *           example: "daniel"
 *         email:
 *           type: string
 *           description: The auth email
 *           example: "jose@gmail.com"
 *         profile_rol: 
 *           type: string
 *           description: The auth profile rol
 *           example: director || maestro
 *         token: 
 *           type: string
 *           description: The auth token
 *           example: "aer34123edfeewr32421341dfaf234fdfadfa231rgfg"
 *         message: 
 *           type: string
 *           description: The auth token
 *           example: "message"
 *         password: 
 *           type: string
 *           description: The auth password
 *           example: "123456"
 *       required:
 *         -email
 *         -password
 *       example: 
 *         email: "jossugames@gmail.com"
 *         password: "123456"
 */
/**
 * @swagger
 * /api/v1/auth/signIn:
 *   post:
 *     summary: Authentication.
 *     tags: [Auth]
 *     requestBody:  
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: Authenticated user
*/