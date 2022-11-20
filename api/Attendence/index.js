import { FireBaseAdminSDK } from '../../store/FireBaseAdminSDK.js'
import { ControllerAttendence } from './controller.js'
import { AttendenceRouter } from './routes.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpcode.js'

export const attendenceModel = (expressRouter) => {
    const attendenceServices = new FireBaseAdminSDK()
    const attendenceController = new ControllerAttendence(attendenceServices)
    const attendenceRouter = new AttendenceRouter(expressRouter, attendenceController, response, HttpCode)
    return attendenceRouter._router
}
/**
 * @swagger
 * components:
 *   schemas:
 *     Attendence:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           description: La fecha de la asistencia.
 *           example: 15/02/2023
 *         gradeRef:
 *           type: string
 *           description: id del grado relacionado.
 *           example: 1sabonHrVsMMqRIsHFEy
 *         students: 
 *          type: array
 *          description: Lista id de alumno con booleano que indica asistencia
 *          example: [{"student": "FaRk3iTfC5K9B1awXwYN", "attendence": true},{"student": "JvqWHsQtUFNfoST1WGeS", "attendence": true},{"student": "yr2xZoKDvyOhiEbJLctJ", "attendence": true}]
 *       required:
 *         -area_name
 *         -gradeRef
 *       example: 
 *         date: Area de Prueba
 *         gradeRef: 5GHHpOWZe4Cy1yBKsjI4
 *         students: [{"student": "FaRk3iTfC5K9B1awXwYN", "attendence": true},{"student": "JvqWHsQtUFNfoST1WGeS", "attendence": true},{"student": "yr2xZoKDvyOhiEbJLctJ", "attendence": true}]
 */