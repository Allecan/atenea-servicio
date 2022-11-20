import { FireBaseAdminSDK } from '../../store/FireBaseAdminSDK.js'
import { ControllerStudent } from './controller.js'
import { StudentRouter } from './routes.js'
import { Student } from '../../models/Student.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpcode.js'

export const studentModel = (expressRouter) => {
    const studentServices = new FireBaseAdminSDK()
    const studentController = new ControllerStudent(studentServices, Student)
    const studentRouter = new StudentRouter(expressRouter, studentController, response, HttpCode)
    return studentRouter._router
}
/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       properties:
 *         name_complete:
 *           type: string
 *           description: el nombre del estudiante
 *           example: Juan Perez
 *         date_birth:
 *           type: string
 *           description: fecha de nacimiento.
 *           example: 31/04/2001
 *         direction: 
 *          type: string
 *          description: direccion del estudiante
 *          example: Aldea Pnyta
 *         gradeRef: 
 *          type: string
 *          description: referencia del grado
 *          example: 4ipYcYTWIx9IlnS11tmh
 *         manager_name: 
 *          type: string
 *          description: nombre del representante
 *          example: Rubia Herrerara Lopez
 *         manager_phone: 
 *          type: string
 *          description: numero del representante
 *          example: +502 52858963
 *         enable: 
 *          type: boolean
 *          description: indica si esta activo
 *          example: true
 *       required:
 *         -name_complete
 *         -date_birth
 *         -direction
 *         -gradeRef
 *         -manager_name
 *         -manager_phone
 *         -enable
 *       example: 
 *         area_name: Luis y Fer casados
 *         date_birth: 31/04/2001
 *         direction: Aldea Pnyta
 *         gradeRef: 4ipYcYTWIx9IlnS11tmh
 *         manager_name: Rubia Herrerara Lopez
 *         manager_phone: +502 52858963
 *         enable: true
 */
/**
 * @swagger
 * /api/v1/student/create-student:
 *   post:
 *     summary: Crear una nueva area.
 *     tags: [Student]
 *     requestBody:  
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Estudiante creada 
*/
/**
 * @swagger
 * /api/v1/student/getall-students:
 *   get:
 *     summary: Retorna todas los estudiantes.
 *     tags: [Student]
 *     responses:  
 *       200: 
 *         description: Retornar todos los estudiantes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 * 
 */
/**
 * @swagger
 * /api/v1/student/getone-bygrade/{id}:
 *   get:
 *     summary: Retorna un area.
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id del grado
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
