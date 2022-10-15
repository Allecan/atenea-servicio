export class GradeRouter {
  constructor(router, controller, response, httpCode) {
    this._router = router()
    this._controller = controller
    this._response = response
    this._httpcode = httpCode
    this.registerRouter()
  }

  registerRouter() {
    this._router.post('/add-grade', this.handleSingUp.bind(this));
    this._router.put(
      '/update-grade/:id',
      this.handleUpdateGrade.bind(this)
    );
    this._router.get('/getall-grades', this.handleGetAllGrades.bind(this))
    this._router.get('/getone-grade/:id', this.handleGetOneGrade.bind(this))
  }

  async handleSingUp(req, res) {
    const grade = req.body
    const result = await this._controller.createNewGrade(grade)
    if (result instanceof Error) {
      this._response.error(req, res, result, 201)
    } else {
      this._response.succes(req, res, result, this._httpcode.OK)
    }
  }

  async handleUpdateGrade(req, res) {
    try {
      const updateGrade = req.body;
      const idGrade = req.params["id"];
      const result = await this._controller.updateAGrade(idGrade, updateGrade);
      this._response.succes(req, res, result, this._httpcode.OK);
    } catch (error) {
      this._response.error(req, res, error, this._httpcode.BAD_REQUEST);
    }
  }

  async handleGetAllGrades(req, res) {
    try {
      const result = await this._controller.getAllGrades()
      this._response.succes(req, res, result, this._httpcode.OK)
    } catch (error) {
      this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
    }
  }

  async handleGetOneGrade(req, res) {
    try {
      const uidGradeRef = req.params.id
      const result = await this._controller.getOneGrade(uidGradeRef)
      this._response.succes(req, res, result, this._httpcode.OK)
    } catch (error) {
      this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
    }
  }

}