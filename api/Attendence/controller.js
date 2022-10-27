export class ControllerAttendence{
    constructor(servicesAttendence){
        this._service = servicesAttendence
    }

    async getMyStudents(idTeacher){
        const response = await this._service.getCoursesByTeacher(idTeacher)
        return response
    }

    async createNewAttendence(data){
        const response = await this._service.saveNewStudent('Attendence', data)
        return response
    }
}