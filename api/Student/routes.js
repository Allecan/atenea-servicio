export class StudentRouter{
    constructor(router, controller, response, httpCode){
        this._router = router()
        this._controller = controller
        this._response = response
        this._httpcode = httpCode
        this.registerRouter() 
    }

    registerRouter(){
        this._router.post('/create-student', this.handleCreateStudent.bind(this))
    }

    async handleCreateStudent(req, res){
        try {
            const student = req.body
            const result = await this._controller.createNewStudent(student)
            this._response.succes(req, res, result, this._httpcode.CREATED)
        } catch (error) {
            this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
        }
    }
}