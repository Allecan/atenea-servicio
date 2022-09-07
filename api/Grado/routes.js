export class GradeRouter{
    constructor(router, controller, response, httpCode){
        this._router = router()
        this._controller = controller
        this._response = response
        this._httpcode = httpCode
        this.registerRouter()    
    }

    registerRouter(){
        this._router.post('/add-grade', this.handleSingUp.bind(this))
    }
    
    async handleSingUp(req,res){
        const grade = req.body
        const result = await this._controller.createNewGrade(grade)
        if (result instanceof Error) {
            this._response.error(req, res, result, 201)
        } else {
            this._response.succes(req, res, result, this._httpcode.OK)
        }
    }
}