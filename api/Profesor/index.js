import { FireBase } from '../../store/FireBase.js'
import { ControllerTeacher } from './controller.js'
import { TeacherRouter } from './routes.js'
import { Teacher } from '../../models/Teacher.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpcode.js'
import { config } from '../../config/default.js'

export const teacherModel = (expressRouter)=>{
    const teacherServices = new FireBase(config.fireBase)
    const teacherController = new ControllerTeacher(teacherServices, Teacher)
    const teacherRouter = new TeacherRouter(expressRouter, teacherController, response, HttpCode)
    return teacherRouter._router
} 