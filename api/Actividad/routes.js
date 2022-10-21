export class ActivityRouter {
  constructor(router, controller, response, httpCode) {
    this._router = router()
    this._controller = controller
    this._response = response
    this._httpcode = httpCode
    this.registerRouter()
  }

  registerRouter() {
    this._router.post('/add-activity', this.handleSingUp.bind(this));
    this._router.put(
      '/update-activity/:id',
      this.handleUpdateActivity.bind(this)
    );
    this._router.put('/delete-activity/:id', this.handleDeleteActivity.bind(this))
    // this._router.put(
    //   '/add-student/',
    //   this.handleAddStudent.bind(this)
    // );
    // this._router.put(
    //   '/add-course/',
    //   this.handleAddCourse.bind(this)
    // );
    this._router.get('/getall-activities', this.handleGetAllActivities.bind(this))
    this._router.get('/getone-activity/:id', this.handleGetOneActivity.bind(this))
  }

  async handleSingUp(req, res) {
    const activity = req.body
    const result = await this._controller.createNewActivity(activity)
    if (result instanceof Error) {
      this._response.error(req, res, result, 201)
    } else {
      this._response.succes(req, res, result, this._httpcode.OK)
    }
  }

  async handleUpdateActivity(req, res) {
    try {
      const updateActivity = req.body;
      const idActivity = req.params["id"];
      const result = await this._controller.updateAnActivity(idActivity, updateActivity);
      this._response.succes(req, res, result, this._httpcode.OK);
    } catch (error) {
      this._response.error(req, res, error, this._httpcode.BAD_REQUEST);
    }
  }

  async handleGetAllActivities(req, res) {
    try {
      const result = await this._controller.getAllActivities()
      this._response.succes(req, res, result, this._httpcode.OK)
    } catch (error) {
      this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
    }
  }

  async handleGetOneActivity(req, res) {
    try {
      const uidActivityRef = req.params.id
      const result = await this._controller.getOneActivity(uidActivityRef)
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

  async handleDeleteActivity(req, res) {
    try {
      const uidActivityRef = req.params.id
      const result = await this._controller.deleteAnActivity(uidActivityRef);
      this._response.succes(req, res, result, this._httpcode.OK);
    } catch (error) {
      this._response.error(req, res, error, this._httpcode.BAD_REQUEST);
    }
  }
}