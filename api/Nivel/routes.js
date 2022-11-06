export class LevelRouter {
  constructor(router, controller, response, httpCode) {
    this._router = router()
    this._controller = controller
    this._response = response
    this._httpcode = httpCode
    this.registerRouter()
  }

  registerRouter() {
    // this._router.post('/add-grade', this.handleSingUp.bind(this));
    // this._router.put(
    //   '/update-grade/:id',
    //   this.handleUpdateGrade.bind(this)
    // );
    // this._router.delete('/delete-grade/:id', this.handleDeleteGrade.bind(this))
    // this._router.put(
    //   '/add-student/',
    //   this.handleAddStudent.bind(this)
    // );
    // this._router.put(
    //   '/add-course/',
    //   this.handleAddCourse.bind(this)
    // );
    this._router.get('/getall-levels', this.handleGetAllLevels.bind(this))
    this._router.get('/getone-level/:id', this.handleGetOneLevel.bind(this))
  }

  // async handleSingUp(req, res) {
  //   const grade = req.body
  //   const result = await this._controller.createNewGrade(grade)
  //   if (result instanceof Error) {
  //     this._response.error(req, res, result, 201)
  //   } else {
  //     this._response.succes(req, res, result, this._httpcode.OK)
  //   }
  // }

  // async handleUpdateGrade(req, res) {
  //   try {
  //     const updateGrade = req.body;
  //     const idGrade = req.params["id"];
  //     const result = await this._controller.updateAGrade(idGrade, updateGrade);
  //     this._response.succes(req, res, result, this._httpcode.OK);
  //   } catch (error) {
  //     this._response.error(req, res, error, this._httpcode.BAD_REQUEST);
  //   }
  // }

  async handleGetAllLevels(req, res) {
    try {
      const result = await this._controller.getAllLevels()
      this._response.succes(req, res, result, this._httpcode.OK)
    } catch (error) {
      this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
    }
  }

  async handleGetOneLevel(req, res) {
    try {
      const id = req.params.id
      const result = await this._controller.getOneLevel(id)
      this._response.succes(req, res, result, this._httpcode.OK)
    } catch (error) {
      this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
    }
  }

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