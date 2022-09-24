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
        this._router.get('/getone-student/:id', this.handleGetOneStudent.bind(this))
        this._router.put('/update-student/:id', this.handleUpdateStudent.bind(this))
        this._router.put('/delete-student/:id', this.handleDeleteStudent.bind(this))

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

    async handleGetOneStudent(req, res){
        try {
            const uid = req.params.id
            const result = await this._controller.getOneStudent(uid)
            this._response.succes(req, res, result, this._httpcode.OK)
        } catch (error) {
            this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
        }
    }

    async handleUpdateStudent(req, res){
        try {
            const student = req.body
            const uid = req.params.id
            const result = await this._controller.updateStudent(student, uid)
            this._response.succes(req, res, result, this._httpcode.OK)
        } catch (error) {
            this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
        }
    }

    async handleDeleteStudent(req, res){
        try {
            const student = req.body
            const uid = req.params.id
            const result = await this._controller.deleteStudent(student, uid)
            this._response.succes(req, res, result, this._httpcode.OK)
        } catch (error) {
            this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
        }
    }
}