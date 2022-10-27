export class AttendenceRouter {
    constructor(router, controller, response, httpCode){
        this._router = router()
        this._controller = controller
        this._response = response
        this._httpcode = httpCode
        this.registerRouter()  
    }

    registerRouter(){
        this._router.get('/get-mystudents/:id', this.handleGetMyStudents.bind(this))
        this._router.post('/new-attendence', this.handleNewAttendence.bind(this))
    }

    async handleGetMyStudents(req, res){
        try {
            const idTeacher = req.params['id']
            const result = await this._controller.getMyStudents(idTeacher)
            this._response.succes(req, res, result, this._httpcode.CREATED)
        } catch (error) {
            this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
        }
    }

    async handleNewAttendence(req, res){
        try {
            const newAttendence = req.body
            const result = await this._controller.createNewAttendence(newAttendence)
            this._response.succes(req, res, result, this._httpcode.CREATED)
        } catch (error) {
            this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
        }
    }

}