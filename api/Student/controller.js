export class ControllerStudent{
    constructor(serciceStudent, student){
        this._service = serciceStudent
        this._model = student
    }

    async createNewStudent(student){
        const newModel = new this._model(student)
        const newStudent = Object.assign({}, newModel)
        const response = await this._service.saveNewDataFireStore('Students', newStudent)
        return response
    }
}