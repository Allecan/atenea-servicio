export class ControllerGrade{
    constructor(serviceGrade, grade){
        this._service = serviceGrade
        this._model = grade
    }

    async createNewGrade(grade){
        const newModel = new this._model(grade)
        const newGrade = Object.assign({}, newModel)
        const response = await this._service.saveData('Grades', newGrade)
        return response
    }

}