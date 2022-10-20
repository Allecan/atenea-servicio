export class AreaRouter {
  constructor(router, controller, response, httpCode) {
    this._router = router()
    this._controller = controller
    this._response = response
    this._httpcode = httpCode
    this.registerRouter()
  }

  registerRouter() {
    this._router.post('/add-area', this.handleSingUp.bind(this));
    this._router.put(
      '/update-area/:id',
      this.handleUpdateArea.bind(this)
    );
    // this._router.delete('/delete-grade/:id', this.handleDeleteGrade.bind(this))
    // this._router.put(
    //   '/add-student/',
    //   this.handleAddStudent.bind(this)
    // );
    // this._router.put(
    //   '/add-course/',
    //   this.handleAddCourse.bind(this)
    // );
    // this._router.get('/getall-grades', this.handleGetAllGrades.bind(this))
    // this._router.get('/getone-grade/:id', this.handleGetOneGrade.bind(this))
  }

  async handleSingUp(req, res) {
    const area = req.body
    const result = await this._controller.createNewArea(area)
    if (result instanceof Error) {
      this._response.error(req, res, result, 201)
    } else {
      this._response.succes(req, res, result, this._httpcode.OK)
    }
  }

  async handleUpdateArea(req, res) {
    try {
      const updateArea = req.body;
      const idArea = req.params["id"];
      const result = await this._controller.updateAnArea(idArea, updateArea);
      this._response.succes(req, res, result, this._httpcode.OK);
    } catch (error) {
      this._response.error(req, res, error, this._httpcode.BAD_REQUEST);
    }
  }

  // async handleGetAllGrades(req, res) {
  //   try {
  //     const result = await this._controller.getAllGrades()
  //     this._response.succes(req, res, result, this._httpcode.OK)
  //   } catch (error) {
  //     this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
  //   }
  // }

  // async handleGetOneGrade(req, res) {
  //   try {
  //     const uidGradeRef = req.params.id
  //     const result = await this._controller.getOneGrade(uidGradeRef)
  //     this._response.succes(req, res, result, this._httpcode.OK)
  //   } catch (error) {
  //     this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
  //   }
  // }

  // async handleAddStudent(req, res) {
  //   try {
  //     const idGrade = req.query.idGrade
  //     const idStudent = req.query.idStudent
  //     if (idGrade === "" || idStudent === "") {
  //       this._response.error(req, res, 'No se envio ningun parametro', this._httpcode.BAD_REQUEST)
  //     } else if (idGrade === undefined || idStudent === undefined) {
  //       this._response.error(req, res, 'Revisar el parametro de informacion', this._httpcode.BAD_REQUEST)
  //     } else {
  //       const result = await this._controller.addStudent(idGrade, idStudent)
  //       this._response.succes(req, res, result, this._httpcode.OK)
  //     }
  //   } catch (error) {
  //     this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
  //   }
  // }

  // async handleAddCourse(req, res) {
  //   try {
  //     const idGrade = req.query.idGrade
  //     const idCourse = req.query.idCourse
  //     if (idGrade === "" || idCourse === "") {
  //       this._response.error(req, res, 'No se envio ningun parametro', this._httpcode.BAD_REQUEST)
  //     } else if (idGrade === undefined || idCourse === undefined) {
  //       this._response.error(req, res, 'Revisar el parametro de informacion', this._httpcode.BAD_REQUEST)
  //     } else {
  //       const result = await this._controller.addStudent(idGrade, idCourse)
  //       this._response.succes(req, res, result, this._httpcode.OK)
  //     }
  //   } catch (error) {
  //     this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
  //   }
  // }

  // async handleDeleteGrade(req, res) {
  //   try {
  //     const uidGradeRef = req.params.id
  //     const result = await this._controller.deleteAGrade(uidGradeRef);
  //     this._response.succes(req, res, result, this._httpcode.OK);
  //   } catch (error) {
  //     this._response.error(req, res, error, this._httpcode.BAD_REQUEST);
  //   }
  // }
}