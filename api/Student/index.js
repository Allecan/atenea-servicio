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
 *     summary: Retorna los estudiantes de un grado en especifico.
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
 *         description: A grade object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_grade:
 *                   type: string
 *                   description: el id del grado
 *                   example: DeUkPG3vhDqlV57hqcHg 
 *                 grade_name:
 *                   type: boolean
 *                   description: el nombre del grado
 *                   example: Sexto Primaria
 *                 size:
 *                   type: number
 *                   description: la cantidad de estudiantes
 *                   example: 1
 *                 students:
 *                   type: array
 *                   description: la lista de estudiantes con su id y nombre
 *                   example: [{"id": "mreO4ADA6E7PmrIWeD5w","name_student": "Rody David Cifuentes Morales"}]
 *       400:
 *         description: student not found
*/
/**
 * @swagger
 * /api/v1/student/getone-student/{id}:
 *   get:
 *     summary: Retorna un estudiante
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id del estudiante
 *     responses:  
 *       200: 
 *         description: Retornar un estudiante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Student'
 *       400:
 *         description: student not found
*/
/**
 * @swagger
 * /api/v1/student/update-student/{id}:
 *   put:
 *     summary: Editar el estudiante.
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id del estudiante
 *     requestBody:  
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Student'
 *     responses:  
 *       200: 
 *         description: Student updated!
 *       400:
 *         description: Student not found
*/
/**
 * @swagger
 * /api/v1/student/delete-student:
 *   put:
 *     summary: Eliminar un estudiante
 *     tags: [Student]
 *     requestBody:  
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *                 description: El id del estudiante
 *                 example: gRvxltYYA6Ca4wkZ1DTh
 *               enable:
 *                 type: boolean
 *                 description: si indica si esta activo 
 *                 example: true
 *     responses:  
 *       200: 
 *         description: student updated!
 *       400:
 *         description: student not found
*/
/**
 * @swagger
 * /api/v1/student/get-student-boletin/{id}:
 *   get:
 *     summary: Retorna el pdf del boletin.
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id del estudiante
 *     responses:  
 *       400:
 *         description: student not found
*/
/**
 * @swagger
 * /api/v1/student/get-student-scores/{id}:
 *   get:
 *     summary: las notas de un estudiante
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El del estudiante
 *     responses:  
 *       200: 
 *         description: A Student object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 unit1:
 *                   type: object
 *                   description: notas de la unidad 1
 *                   example: {"areas": [],"average": 0,"absences": 0}
 *                 unit2:
 *                   type: object
 *                   description: notas de la unidad 2
 *                 unit3:
 *                   type: object
 *                   description: notas de la unidad 3
 *                   example: {"areas": [],"average": 0,"absences": 0}
 *                 unit4:
 *                   type: object
 *                   description: notas de la unidad 4
 *                   example: {"areas": [],"average": 0,"absences": 0}
 *       400:
 *         description: student not found
*/
/**
 * @swagger
 * /api/v1/student/get-student-AllBoletinByGrade/{id}:
 *   get:
 *     summary: Retorna un pdf con los boletines de un grado
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id del grado
 *     responses:  
 *       400:
 *         description: bulletin not found
*/
/**
 * @swagger
 * /api/v1/student/getall-students-aux:
 *   get:
 *     summary: las lista de niveles con grados y estudiantes
 *     tags: [Student]
 *     responses:  
 *       200: 
 *         description: Retorna lista de niveles con grados y estudiantes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StudentAux'
 *       400:
 *         description: student not found
*/

/**
 * @swagger
 * components:
 *   schemas:
 *     StudentAux:
 *       type: object
 *       properties:
 *         level_name:
 *           type: string
 *           description: Primaria
 *           example: area1
 *         position:
 *           type: Integer
 *           description: la posicion del nivel
 *           example: 1
 *         id: 
 *          type: string
 *          description: el id del nivel
 *          example: EkNCLha4XHgew4Wm2S2H
 *         grades: 
 *          type: array
 *          description: lista de grados con informacion del grado y lista de estudiantes
 *          example: [{"enable": true,"position": 0,"grade_name": "Primero Primaria","levelRef": "EkNCLha4XHgew4Wm2S2H","id": "Y6MQzK3aWb4RnDdxPfuq","students": [{"direction": "Aldea Ocubila","date_birth": "28/10/2008","gradeRef": "Y6MQzK3aWb4RnDdxPfuq","manager_phone": "+502 45896312","name_complete": "Mariela Izabel Martinez Carillo","manager_name": "Lorena Izbale Carillo Lopez","enable": true,"id": "QacuH7FDHQBJ38Aj5Hrs"}]}]
 *       required:
 *         -level_name
 *         -position
 *         -id
 *         -grades
 *       example: 
 *         level_name: Primaria
 *         position: 1
 *         id: EkNCLha4XHgew4Wm2S2H
 *         grade: [{"enable": true,"position": 0,"grade_name": "Primero Primaria","levelRef": "EkNCLha4XHgew4Wm2S2H","id": "Y6MQzK3aWb4RnDdxPfuq","students": [{"direction": "Aldea Ocubila","date_birth": "28/10/2008","gradeRef": "Y6MQzK3aWb4RnDdxPfuq","manager_phone": "+502 45896312","name_complete": "Mariela Izabel Martinez Carillo","manager_name": "Lorena Izbale Carillo Lopez","enable": true,"id": "QacuH7FDHQBJ38Aj5Hrs"}]}]
 */