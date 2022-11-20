import { FireBase } from '../../store/FireBase.js'
import { ControllerGrade } from './controller.js'
import { GradeRouter } from './routes.js'
import { Grade } from '../../models/Grade.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpcode.js'
import { config } from '../../config/default.js'

export const gradeModel = (expressRouter)=>{
    const gradeServices = new FireBase(config.fireBase)
    const gradeController = new ControllerGrade(gradeServices, Grade)
    const gradeRouter = new GradeRouter(expressRouter, gradeController, response, HttpCode)
    return gradeRouter._router
} 
/**
 * @swagger
 * components:
 *   schemas:
 *     Grade:
 *       type: object
 *       properties:
 *         grade_name:
 *           type: string
 *           description: El nombre del grado.
 *           example: Grado de Prueba 2
 *         teacherRef:
 *           type: string
 *           description: id del del profesor.
 *           example: RWFKfGsTsJcIp31Rf4RvibXAZl62
 *         levelRef: 
 *          type: string
 *          description: el id del nivel
 *          example: EkNCLha4XHgew4Wm2S2H
 *         enable: 
 *          type: boolean
 *          description: indica si el grado esta activo
 *          example: true
 *       required:
 *         -grade_name
 *         -teacherRef
 *         -levelRef
 *         -enable
 *       example: 
 *         grade_name: Grado de Prueba 2
 *         teacherRef: RWFKfGsTsJcIp31Rf4RvibXAZl62
 *         levelRef: EkNCLha4XHgew4Wm2S2H
 */

/**
 * @swagger
 * /api/v1/grade/add-grade:
 *   post:
 *     summary: Crear un nuevo grado.
 *     tags: [Grade]
 *     requestBody:  
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Graded'
 *     responses:
 *       200:
 *         description: Grade created 
*/

/**
 * @swagger
 * /api/v1/grade/update-grade/{id}:
 *   put:
 *     summary: Editar el grado.
 *     tags: [Grade]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id del grado
 *     requestBody:  
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Grade'
 *     responses:  
 *       200: 
 *         description: grade updated!
 *       400:
 *         description: grade not found
*/
/**
 * @swagger
 * /api/v1/grade/delete-grade/{id}:
 *   delete:
 *     summary: Elimina un grado.
 *     tags: [Grade]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id del grado
 *     responses:  
 *       200: 
 *         description: grado deleted
 *       400:
 *         description: grado not found
*/
/**
 * @swagger
 * /api/v1/grade/getall-grades:
 *   get:
 *     summary: Retorna todas los grados.
 *     tags: [Grade]
 *     responses:  
 *       200: 
 *         description: Retornar todas los grados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Grade'
 * 
 */
/**
 * @swagger
 * /api/v1/grade/getone-grade/{id}:
 *   get:
 *     summary: Retorna un grado.
 *     tags: [Grade]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id del grado
 *     responses:  
 *       200: 
 *         description: Retornar todos los grados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Grade'
 *       400:
 *         description: grade not found
*/
/**
 * @swagger
 * /api/v1/grade/add-student:
 *   put:
 *     summary: Editar el area.
 *     tags: [Grade]
 *     parameters:
 *       - in: query
 *         name: idGrade
 *         type: string
 *         schema:
 *           type: string
 *         required: true
 *         description: id del grado
 *       - in: query
 *         name: idStudent
 *         type: string
 *         schema:
 *           type: string
 *         required: true
 *         description: id del estudiante
 *     responses:  
 *       200: 
 *         description: Area updated!
 *       400:
 *         description: Area not found
*/