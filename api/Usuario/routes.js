export class UserRouter{
    constructor(router, controller, response, httpCode){
        this._router = router()
        this._controller = controller
        this._response = response
        this._httpcode = httpCode
        this.registerRouter()    
    }

    registerRouter(){
        this._router.post('/signUp', this.handleSingUp.bind(this))
    }
    
    async handleSingUp(req,res){
        const user = req.body
        const result = await this._controller.createNewUser(user)
        if (result instanceof Error) {
            this._response.error(req, res, result, 201)
        } else {
            this._response.succes(req, res, result, this._httpcode.OK)
        }
    }
}