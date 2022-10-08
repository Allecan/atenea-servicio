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
 * components:
 *   schemas:
 *     CourseBulletin:
 *       type: object
 *       properties:
 *         name_grade:
 *           type: string
 *           description: The name course.
 *           example: "curso 1"
 *       required:
 *         -name_grade
 *       example: 
 *         name_grade: "curso 1"
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     deleteCourseBulletin:
 *       type: object
 *       properties:
 *         name_course:
 *           type: string
 *           description: The name course.
 *           example: "curso 1"
 *       required:
 *         -name_course
 *       example: 
 *         name_course: "curso 1"
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     AddNoteBulletin:
 *       type: object
 *       properties:
 *         name_course:
 *           type: string
 *           description: The name course.
 *           example: "curso 1"
 *         note:
 *           type: number
 *           description: The note unit.
 *           example: 60
 *         unit:
 *           type: number
 *           description: The unit course.
 *           example: 2
 *       required:
 *         -name_course
 *         -note
 *         -unit
 *       example: 
 *         name_course: "curso 1"
 *         note: 60
 *         unit: 2
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     createPdfBulletin:
 *       type: object
 *       properties:
 *         name_file:
 *           type: string
 *           description: The name file.
 *           example: "pdf_prueba"
 *         direction:
 *           type: string
 *           description: The file address
 *           example: "C:/Users/Usuario/Documents/pdf"
 *       required:
 *         -name_file
 *         -direction
 *       example: 
 *         name_file: "pdf_prueba"
 *         direction: "C:/Users/Usuario/Documents/pdf"
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
/**
 * @swagger
 * /api/v1/boletin/getAll-boletin:
 *   get:
 *     summary: Get all Bulletin.
 *     tags: [Bulletin]
 *     responses:  
 *       200: 
 *         description: get all bulletin
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
 *     summary: Get one Bulletin.
 *     tags: [Bulletin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the Bulletin id
 *     responses:  
 *       200: 
 *         description: get one Bulletin 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Bulletin'
 *       400:
 *         description: bulletin not found
*/
/**
 * @swagger
 * /api/v1/boletin/delete-boletin/{id}:
 *   delete:
 *     summary: delete a Bulletin.
 *     tags: [Bulletin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the bulletin id
 *     responses:  
 *       200: 
 *         description: bulletin deleted
 *       400:
 *         description: bulletin not found
*/
/**
 * @swagger
 * /api/v1/boletin/update-boletin/{id}:
 *   put:
 *     summary: update a bulletin.
 *     tags: [Bulletin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the bulletin id
 *     requestBody:  
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Bulletin'
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
 *     summary: update a bulletin.
 *     tags: [Bulletin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the bulletin id
 *     requestBody:  
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/CourseBulletin'
 *     responses:  
 *       200: 
 *         description: the course was added!
 *       400:
 *         description: the course was not added
*/
/**
 * @swagger
 * /api/v1/boletin/addNote-boletin/{id}:
 *   put:
 *     summary: update a bulletin.
 *     tags: [Bulletin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the bulletin id
 *     requestBody:  
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/AddNoteBulletin'
 *     responses:  
 *       200: 
 *         description: the note was added!
 *       400:
 *         description: could not add note
*/
/**
 * @swagger
 * /api/v1/boletin/deleteCourses-boletin/{id}:
 *   put:
 *     summary: update a bulletin.
 *     tags: [Bulletin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the bulletin id
 *     requestBody:  
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/deleteCourseBulletin'
 *     responses:  
 *       200: 
 *         description: the course was deleted!
 *       400:
 *         description: the course was not deleted
*/
