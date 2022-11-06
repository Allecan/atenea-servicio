import { FireBaseAdminSDK } from '../../store/FireBaseAdminSDK.js'
import { ControllerUser } from './controller.js'
import { UserRouter } from './routes.js'
import { User } from '../../models/User.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpcode.js'
import { config } from '../../config/default.js'
import { validateCreateUser } from './ValidatePassword.js'

export const userModel = (expressRouter)=>{
    const userServices = new FireBaseAdminSDK()
    const userController = new ControllerUser(userServices, User)
    const userRouter = new UserRouter(expressRouter, userController, response, HttpCode, validateCreateUser)
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
 *         phoneNumber:
 *           type: string
 *           description: The user number.
 *           example: 12313
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
 * /api/v1/product/create-user:
 *   post:
 *     summary: Crear un nuevo usuario.
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
 *         description: product created 
*/

/**
 * @swagger
 * /api/v1/user/get-users:
 *   get:
 *     summary: Retorna todos los usuarios.
 *     tags: [User]
 *     responses:  
 *       200: 
 *         description: get all users 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
*/

/**
 * @swagger
 * /api/v1/user/get-user/{id}:
 *   get:
 *     summary: Retorna un usuario.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the user id
 *     responses:  
 *       200: 
 *         description: get all users 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: user not found
*/
/**
 * @swagger
 * /api/v1/product/get-user/{id}:
 *   put:
 *     summary: Editar el usuario.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id del usuario
 *     requestBody:  
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/User'
 *     responses:  
 *       200: 
 *         description: product updated!
 *       400:
 *         description: product not found
*/

/**
 * @swagger
 * /api/v1/user/get-teachers:
 *   get:
 *     summary: Retorna todos los maestros.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the user id
 *     responses:  
 *       200: 
 *         description: get all users 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: user not found
*/
/**
 * @swagger
 * /api/v1/user/get-enabled-teachers:
 *   get:
 *     summary: Retorna todos los maestros.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the user id
 *     responses:  
 *       200: 
 *         description: get all users 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: user not found
*/
/**
 * @swagger
 * /api/v1/user/get-disabled-teachers:
 *   get:
 *     summary: Retorna todos los maestros.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the user id
 *     responses:  
 *       200: 
 *         description: get all users 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: user not found
*/
/**
 * @swagger
 * /api/v1/user/get-teacher/{id}:
 *   get:
 *     summary: Retorna todos los maestros.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the user id
 *     responses:  
 *       200: 
 *         description: get all users 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: user not found
*/