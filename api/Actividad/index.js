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
 *           description: El nombre de la actividad 
 *           example: actividad 1
 *         activity_value: 
 *           type: number
 *           description: La nota la actividada 
 *           example: 10
 *         areaRef:
 *           type: object
 *           description: Es la referencia del curso o el area.
 *           example: {}
 *         unit:
 *           type: number
 *           description: La unidad a la que pertenece la actividad 
 *           example: 1
 *         enable: 
 *           type: boolean
 *           description: Indica si la actividad esta activa o no
 *           example: true
 *         isTest:
 *           type: boolean
 *           description: Indica si la actividad es un test osea una evaluacion
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

/**
 * @swagger
 * /api/v1/activity/add-activity:
 *   post:
 *     summary: Crear una nueva actividad.
 *     tags: [Activity]
 *     requestBody:  
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Activity'
 *     responses:
 *       200:
 *         description: actividad creada 
*/
/**
 * @swagger
 * /api/v1/activity/update-activity/{id}:
 *   put:
 *     summary: Se edita la actividad
 *     tags: [Activity]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id de la actividad 
 *     requestBody:  
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               activity_name:
 *                 type: string
 *                 description: El nombre de la actividad.
 *                 example: actividad1 
 *               activity_value:
 *                 type: number
 *                 description: La nota de la actividad.
 *                 example: 9
 *               unit:
 *                 type: number
 *                 description: La unidad a la que pertenece la actividad.
 *                 example: 4
 *     responses:  
 *       200: 
 *         description: activity updated!
 *       400:
 *         description: activity not found
*/

/**
 * @swagger
 * /api/v1/activity/getall-activities:
 *   get:
 *     summary: Retorna todos las actividades.
 *     tags: [Activity]
 *     responses:  
 *       200: 
 *         description: Retorna todas las actividades en un array.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activity'
 * 
 */
/**
 * @swagger
 * /api/v1/activity/getone-activity/{id}:
 *   get:
 *     summary: Retorna una actividad.
 *     tags: [Activity]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id de la actividad
 *     responses:  
 *       200: 
 *         description: Retorna una actividad.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Activity'
 *       400:
 *         description: Activity not found
*/
/**
 * @swagger
 * /api/v1/activity/delete-activity/{id}:
 *   delete:
 *     summary: Elimina una actividad.
 *     tags: [Activity]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id de la actividad
 *     responses:  
 *       200: 
 *         description: activity deleted
 *       400:
 *         description: activity not found
*/
/**
 * @swagger
 * /api/v1/activity/update-all-students-scores:
 *   put:
 *     summary: Editar la nota de la actividad de los estudiantes
 *     tags: [Activity]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id de la actividad 
 *     requestBody:  
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               activityRef:
 *                 type: string
 *                 description: El nombre de la actividad.
 *                 example: actividad1 
 *               scores:
 *                 type: array
 *                 description: Lista de las actividades con la nota y el id del estudiante.
 *                 example: [{"score" : 9,"studentRef" : "1KPKYwX718El5IoVitSl"},{"score" : 8,"studentRef" : "DXy8sN0cVh0VDqmdwB3z"},{"score" : 8,"studentRef" : "jZiZzYC3zv6DVkgsnt58"}]
 *     responses:  
 *       200: 
 *         description: activity updated!
 *       400:
 *         description: activity not found
*/
