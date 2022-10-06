export class ControllerTeacher{
    constructor(serviceTeacher, teacher){
        this._service = serviceTeacher
        this._model = teacher
    }

    async updateATeacher(id, teacher) {
        const newModel = new this._model(teacher);
        const newTeacher = Object.assign({}, newModel);
        const response = await this._service.updateData('User', id, newTeacher);
        return response;
      }

}