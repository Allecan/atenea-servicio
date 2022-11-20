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