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
    this._router.put('/delete-grade/:id', this.handleDeleteGrade.bind(this))
    this._router.put(
      '/add-student/',
      this.handleAddStudent.bind(this)
    );
    // this._router.put(
    //   '/add-area/',
    //   this.handleAddArea.bind(this)
    // );
    this._router.get('/getall-grades', this.handleGetAllGrades.bind(this))
    this._router.get('/getone-grade/:id', this.handleGetOneGrade.bind(this))
    this._router.get('/getone-grade-detailed/:id', this.handleGetOneGradeDetailed.bind(this))
  }

  async handleSingUp(req, res) {
    try {
      const grade = req.body
      const result = await this._controller.createNewGrade(grade)
      this._response.succes(req, res, result, this._httpcode.OK);
    } catch (error) {
      this._response.error(req, res, error, this._httpcode.BAD_REQUEST);
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

  async handleGetOneGradeDetailed(req, res) {
    try {
      const uidGradeRef = req.params.id
      const result = await this._controller.getOneGradeDetailed(uidGradeRef)
      this._response.succes(req, res, result, this._httpcode.OK)
    } catch (error) {
      this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
    }
  }

  async handleAddStudent(req, res) {
    try {
      const idGrade = req.query.idGrade
      const idStudent = req.query.idStudent
      if (idGrade === "" || idStudent === "") {
        this._response.error(req, res, 'No se envio ningun parametro', this._httpcode.BAD_REQUEST)
      } else if (idGrade === undefined || idStudent === undefined) {
        this._response.error(req, res, 'Revisar el parametro de informacion', this._httpcode.BAD_REQUEST)
      } else {
        const result = await this._controller.addStudent(idGrade, idStudent)
        this._response.succes(req, res, result, this._httpcode.OK)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
    }
  }

  async handleAddArea(req, res) {
    try {
      const idGrade = req.query.idGrade
      const idArea = req.query.idArea
      if (idGrade === "" || idArea === "") {
        this._response.error(req, res, 'No se envio ningun parametro', this._httpcode.BAD_REQUEST)
      } else if (idGrade === undefined || idArea === undefined) {
        this._response.error(req, res, 'Revisar el parametro de informacion', this._httpcode.BAD_REQUEST)
      } else {
        const result = await this._controller.addArea(idGrade, idArea)
        this._response.succes(req, res, result, this._httpcode.OK)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
    }
  }

  async handleDeleteGrade(req, res) {
    try {
      const uidGradeRef = req.params.id
      const result = await this._controller.deleteAGrade(uidGradeRef);
      this._response.succes(req, res, result, this._httpcode.OK);
    } catch (error) {
      this._response.error(req, res, error, this._httpcode.BAD_REQUEST);
    }
  }
}