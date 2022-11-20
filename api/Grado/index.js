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