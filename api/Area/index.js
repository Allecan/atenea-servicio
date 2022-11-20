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
/**
 * @swagger
 * components:
 *   schemas:
 *     Area:
 *       type: object
 *       properties:
 *         area_name:
 *           type: string
 *           description: El nombre del area.
 *           example: area1
 *         gradeRef:
 *           type: string
 *           description: id del grado relacionado.
 *           example: 5GHHpOWZe4Cy1yBKsjI4
 *         enable: 
 *          type: boolean
 *          description: indica si esta activo
 *          example: true
 *       required:
 *         -area_name
 *         -gradeRef
 *       example: 
 *         area_name: Area de Prueba
 *         gradeRef: 5GHHpOWZe4Cy1yBKsjI4
 */
/**
 * @swagger
 * /api/v1/area/add-area:
 *   post:
 *     summary: Crear una nueva area.
 *     tags: [Area]
 *     requestBody:  
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Area'
 *     responses:
 *       200:
 *         description: actividad creada 
*/
/**
 * @swagger
 * /api/v1/area/update-area/{id}:
 *   put:
 *     summary: Editar el area.
 *     tags: [Area]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id del area
 *     requestBody:  
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Area'
 *     responses:  
 *       200: 
 *         description: Area updated!
 *       400:
 *         description: Area not found
*/
/**
 * @swagger
 * /api/v1/area/getall-areas:
 *   get:
 *     summary: Retorna todas las areas.
 *     tags: [Area]
 *     responses:  
 *       200: 
 *         description: Retornar todas las areas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Area'
 * 
 */
/**
 * @swagger
 * /api/v1/area/getone-area/{id}:
 *   get:
 *     summary: Retorna un area.
 *     tags: [Area]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id del area
 *     responses:  
 *       200: 
 *         description: A User object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 request:
 *                   type: string
 *                   description: el tipo de peticion con la direccion
 *                   example: GET /getall-areas 
 *                 error:
 *                   type: boolean
 *                   description: indica si se tiene un error.
 *                 status:
 *                   type: number
 *                   description: indica el numero de request
 *                   example: 200
 *                 body:
 *                   type: object
 *                   description: contiene todos los registros
 *                   example: {"area_name": "Comunicacion y Lenguaje","enable": true,"gradeRef": {"grade_name": "Segundo","enable": true,"position": 1,"id": "rGo2rjlpgkZUfnVjmZhu"},"id": "5GHHpOWZe4Cy1yBKsjI4","activities": {unit1:array,unit2:array,unit3:array,unit4:array}}
 *       400:
 *         description: Area not found
*/
/**
 * @swagger
 * /api/v1/area/delete-area/{id}:
 *   delete:
 *     summary: Elimina un area.
 *     tags: [Area]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id del area
 *     responses:  
 *       200: 
 *         description: Area deleted
 *       400:
 *         description: Area not found
*/
/**
 * @swagger
 * /api/v1/area/download-notes/{id}:
 *   get:
 *     summary: Descarga el registro de notas del area.
 *     tags: [Area]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id del area
 *     responses:  
 *       200: 
 *         description: A User object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 request:
 *                   type: string
 *                   description: mensaje de descarga 
 *                   example: log download 
 *       400:
 *         description: Area not found
*/