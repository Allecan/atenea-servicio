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