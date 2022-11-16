import { helpers } from "../../lib/helpers.js"
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
      this.handleUpdateAreaName.bind(this)
    );
    this._router.put('/delete-area/:id', this.handleDeleteArea.bind(this))
    // this._router.put(
    //   '/add-student/',
    //   this.handleAddStudent.bind(this)
    // );
    // this._router.put(
    //   '/add-course/',
    //   this.handleAddCourse.bind(this)
    // );
    this._router.get('/getall-areas', this.handleGetAllAreas.bind(this))
    this._router.get('/getone-area/:id', this.handleGetOneArea.bind(this))
    this._router.get('/download-notes/:id', this.handleDownloadNotes.bind(this))
  }

  async handleSingUp(req, res) {
    try {
      const area = req.body
      const result = await this._controller.createNewArea(area)
      this._response.succes(req, res, result, this._httpcode.OK);
    } catch (error) {
      this._response.error(req, res, error, this._httpcode.BAD_REQUEST);
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
  async handleUpdateAreaName(req, res) {
    try {
      const updateArea = req.body;
      const idArea = req.params["id"];
      const result = await this._controller.updateAnAreaName(idArea, updateArea);
      this._response.succes(req, res, result, this._httpcode.OK);
    } catch (error) {
      this._response.error(req, res, error, this._httpcode.BAD_REQUEST);
    }
  }

  async handleGetAllAreas(req, res) {
    try {
      const result = await this._controller.getAllAreas()
      this._response.succes(req, res, result, this._httpcode.OK)
    } catch (error) {
      this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
    }
  }

  async handleGetOneArea(req, res) {
    try {
      const uidAreaRef = req.params.id
      const result = await this._controller.getOneArea(uidAreaRef)
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

  async handleDeleteArea(req, res) {
    try {
      const uidAreaRef = req.params.id
      const result = await this._controller.deleteAnArea(uidAreaRef);
      this._response.succes(req, res, result, this._httpcode.OK);
    } catch (error) {
      this._response.error(req, res, error, this._httpcode.BAD_REQUEST);
    }
  }
  async handleDownloadNotes(req, res) {
    try {
      const uidAreaRef = req.params.id
      const result = await this._controller.unifyOnePdf(uidAreaRef);
      const direction = `docs/area/${result.name_file}`
      await new Promise((resolve, reject) => {
          result.pdfDocPipe.on('finish', resolve)
          result.pdfDocPipe.on('error', reject)
      })
      res.download(direction, result.name_file, function (err) {
          if (err) {
              console.log(err)
          } else {
              const direction_file = "docs/area"
              const name_file = result.name_file

              helpers.deleteFile(direction_file, name_file)
              console.log("downloaded file")

          }
      })
      //this._response.succes(req, res, result, this._httpcode.OK);
    } catch (error) {
      this._response.error(req, res, error, this._httpcode.BAD_REQUEST);
    }
  }
}