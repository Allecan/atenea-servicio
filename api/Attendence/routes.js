export class AttendenceRouter {
    constructor(router, controller, response, httpCode){
        this._router = router()
        this._controller = controller
        this._response = response
        this._httpcode = httpCode
        this.registerRouter()  
    }

    registerRouter(){
        this._router.post('/new-attendence', this.handleNewAttendence.bind(this))
    }
}