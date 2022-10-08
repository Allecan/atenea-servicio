import { FireBase } from '../../store/FireBase.js'
import { BoletinController } from './controller.js'
import { BoletinRouter } from './routes.js'
import { Boletin } from '../../models/Boletin.js'
import { CourseBulletin } from '../../models/CourseBulletin.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpcode.js'
import { config } from '../../config/default.js'

export const boletinModel = (expressRouter)=>{
    const boletinServices = new FireBase(config.fireBase)
    const boletinController = new BoletinController(boletinServices,Boletin,CourseBulletin,CourseBulletin)
    const boeltinRouter = new BoletinRouter(expressRouter, boletinController, response, HttpCode)
    return boeltinRouter._router
}
/**
 * @swagger
 * components:
 *   schemas:
 *     Bulletin:
 *       type: object
 *       properties:
 *         name_student:
 *           type: string
 *           description: The name student.
 *           example: Pedro
 *         grade:
 *           type: string
 *           description: The grade student.
 *           example: Quinto 
 *         teacher:
 *           type: string
 *           description: The name teacher
 *           example: Juan
 *         year: 
 *           type: number
 *           description: school year
 *           example: 2022
 *         keyCode:
 *           type: string
 *           description: student code
 *           example: erq2r12313dfa
 *         courses:
 *           type: array
 *           description: student course list
 *           example: [{}]
 *       required:
 *         -name_student
 *         -grade
 *         -teacher
 *         -year
 *         -keyCode
 *       example: 
 *         name_student: "José"
 *         grade: "Quinto"
 *         teacher: "Maria"
 *         year: 2022
 *         keyCode: dfa2321df
 */

/**
 * @swagger
 * /api/v1/boletin/add-boletin:
 *   post:
 *     summary: Create a new bulletin.
 *     tags: [Bulletin]
 *     requestBody:  
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Bulletin'
 *     responses:
 *       200:
 *         description: create a new bulletin
*/