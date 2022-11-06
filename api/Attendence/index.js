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