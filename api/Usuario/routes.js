import { response } from "../../response/response.js"
import { HttpCode } from "../../response/httpcode.js"

export class UserRouter{
    constructor(router,controller){
        this._router = router()
        this._controller = controller
        this.registerRouter()    
    }

    registerRouter(){
        this._router.post('/singup', this.handleSingUp.bind(this))
    }
    
    async handleSingUp(req,res){
        const result = await this._controller.createNewUser(req.body)
        response.succes(req, res, result, HttpCode.OK)
    }
}