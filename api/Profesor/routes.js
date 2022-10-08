export class TeacherRouter {
  constructor(router, controller, response, httpCode) {
    this._router = router()
    this._controller = controller
    this._response = response
    this._httpcode = httpCode
    this.registerRouter()
  }

  registerRouter() {
    this._router.put(
      '/update-teacher-grades/:id',
      this.handleUpdateTeacherGrades.bind(this)
    );
    this._router.get('/getone-teacher/:id', this.handleGetOneTeacher.bind(this));
  }

  async handleUpdateTeacherGrades(req, res) {
    try {
      const updateTeacher = req.body;
      const idTeacher = req.params["id"];
      const result = await this._controller.updateATeacherGrades(idTeacher, updateTeacher);
      this._response.succes(req, res, result, this._httpcode.OK);
    } catch (error) {
      this._response.error(req, res, error, this._httpcode.BAD_REQUEST);
    }
  }

  async handleGetOneTeacher(req, res){
    try {
        const uid = req.params.id
        const result = await this._controller.getOneTeacher(uid)
        this._response.succes(req, res, result, this._httpcode.OK)
    } catch (error) {
        this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
    }
}
}