export class TeacherRouter{
    constructor(router, controller, response, httpCode){
        this._router = router()
        this._controller = controller
        this._response = response
        this._httpcode = httpCode
        this.registerRouter()    
    }

    registerRouter(){
        this._router.put(
            '/update-teacher/:id',
            this.handleUpdateTeacher.bind(this)
          );
    }
    
    async handleUpdateTeacher(req, res) {
        try {
          const updateTeacher = req.body;
          const idTeacher = req.params["id"];
          const result = await this._controller.updateATeacher(idTeacher, updateTeacher);
          this._response.succes(req, res, result, this._httpcode.OK);
        } catch (error) {
          this._response.error(req, res, error, this._httpcode.BAD_REQUEST);
        }
      }
}