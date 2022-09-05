import AuthController from "./Controller.js"
import AuthRoute from "./Routes.js"
import { DataBasePS } from '../../store/PlanetScale.js'
import Auth from '../../models/Auth.js'
import { helpers } from '../../lib/helpers.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpcode.js'

export const authModule = (expressRoute) => {
  const authServices = new DataBasePS()
  const authController = new AuthController(authServices, Auth, helpers.comparePassword, helpers.generateToken)
  const authRoute = new AuthRoute(expressRoute, authController, response, HttpCode)
  return authRoute._router
}