import { FireBase } from '../../store/FireBase.js'
import { ControllerGrade } from './controller.js'
import { GradeRouter } from './routes.js'
import { Grade } from '../../models/Grade.js'
import { helpers } from '../../lib/helpers.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpcode.js'
import { config } from '../../config/default.js'

export const gradeModel = (expressRouter)=>{
    const gradeServices = new FireBase(config.fireBase)
    const gradeController = new ControllerGrade(gradeServices, Grade)
    const gradeRouter = new GradeRouter(expressRouter, gradeController, response, HttpCode)
    return gradeRouter._router
} 