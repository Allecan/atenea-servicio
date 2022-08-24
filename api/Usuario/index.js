import ControllerUser from "./controller.js";
import { UserRouter } from "./routes.js";
import { User } from "../../models/Usuario.js";
import { userService } from "./servicio.js";
import { DataBasePlanetScale } from "../../database/db.js";

export const userModel = (expressRouter)=>{

    const userServices = new userService()
    const controllerUser = new ControllerUser(userServices,User)
    const userRouter = new UserRouter(expressRouter,controllerUser)
    return userRouter._router
} 