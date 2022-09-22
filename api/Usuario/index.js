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
/**
 * @swagger
 * /api/v1/user/get-users:
 *   get:
 *     summary: Get all users.
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
 *     summary: Get one user.
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
 * /api/v1/user/delete-user/{id}:
 *   delete:
 *     summary: delete a user.
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
 *         description: user deleted
 *       400:
 *         description: user not found
*/
/**
 * @swagger
 * /api/v1/user/update-user/{id}:
 *   put:
 *     summary: update a user.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the user id
 *     requestBody:  
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/User'
 *     responses:  
 *       200: 
 *         description: user updated!
 *       400:
 *         description: user not found
*/
/**
 * @swagger
 * /api/v1/user/update-user-rol/{id}/{type}:
 *   put:
 *     summary: modify user role.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the user id
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: type user
 *     requestBody:  
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/User'
 *     responses:  
 *       200: 
 *         description: user updated!
 *       400:
 *         description: user not found
*/