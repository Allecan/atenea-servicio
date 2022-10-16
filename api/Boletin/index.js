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
 *     summary: Crear el boletin.
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
 *         description: create bulletin  
*/

/**
 * @swagger
 * /api/v1/boletin/getAll-boletin:
 *   get:
 *     summary: Retorna todos los boletines.
 *     tags: [Bulletin]
 *     responses:  
 *       200: 
 *         description: Retorna todos los boletines.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bulletin'
*/
/**
 * @swagger
 * /api/v1/boletin/getOne-boletin/{id}:
 *   get:
 *     summary: Retorna un boletin.
 *     tags: [Bulletin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id del boletin
 *     responses:  
 *       200: 
 *         description: Retorna un boletin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Bulletin'
 *       400:
 *         description: Bulletin not found
*/
/**
 * @swagger
 * /api/v1/boletin/delete-boletin/{id}:
 *   delete:
 *     summary: Eliminar un boletin.
 *     tags: [Bulletin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id del boletin
 *     responses:  
 *       200: 
 *         description: bulletin delete
 *       400:
 *         description: bulletin not found
*/

/**
 * @swagger
 * /api/v1/boletin/addCourses-boletin/{id}:
 *   put:
 *     summary: Agregar un curso al boletin.
 *     tags: [Bulletin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id del boletin
 *     requestBody:  
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name_grade:
 *                 type: string
 *                 description: el nombre del grado.
 *                 example: curso 1 
 *     responses:  
 *       200: 
 *         description: bulletin updated!
 *       400:
 *         description: bulletin not found
*/

/**
 * @swagger
 * /api/v1/boletin/deleteCourses-boletin/{id}:
 *   put:
 *     summary: Eliminar un curso de un boletin.
 *     tags: [Bulletin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id del boletin
 *     requestBody:  
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name_course:
 *                 type: string
 *                 description: el nombre del grado.
 *                 example: curso 1 
 *     responses:  
 *       200: 
 *         description: bulletin updated!
 *       400:
 *         description: bulletin not found
*/

/**
 * @swagger
 * /api/v1/boletin/addNote-boletin/{id}:
 *   put:
 *     summary: Agregar una nota al curso de un boletin.
 *     tags: [Bulletin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id del boletin
 *     requestBody:  
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name_course:
 *                 type: string
 *                 description: el nombre del grado.
 *                 example: curso 5 
 *               note:
 *                 type: Number
 *                 description: La nota a asignar.
 *                 example: 60.7
 *               unit:
 *                 type: Integer
 *                 description: La unidad del curso.
 *                 example: 3
 *     responses:  
 *       200: 
 *         description: bulletin updated!
 *       400:
 *         description: bulletin not found
*/

/**
 * @swagger
 * /api/v1/boletin/createPdf-boletin/{id}:
 *   put:
 *     summary: Crear PDF
 *     tags: [Bulletin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id del boletin
 *     responses:  
 *       200: 
 *         description: informacion de autenticacion.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name_file:
 *                   type: string
 *                   description: Retorna el nombre del archivo que se acaba de crear.
 *                   example: estudiante52022Boletin
 *       400:
 *         description: bulletin not found
*/

/**
 * @swagger
 * /api/v1/boletin/download-boletin/{name}:
 *   put:
 *     summary: Descargar el PDF
 *     tags: [Bulletin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El nombre del archivo pdf que se acaba de crear.
 *     responses:  
 *       200: 
 *         description: descarga el boletin.
 *       400:
 *         description: bulletin not found
*/