export class ControllerStudent{
    constructor(serciceStudent, student){
        this._service = serciceStudent
        this._model = student
    }

    async createNewStudent(student){
        const newModel = new this._model(student)
        const newStudent = Object.assign({}, newModel)
        const response = await this._service.saveNewStudent('Students', newStudent)
        return response
    }

    async getAllStudents(){
        const response = await this._service.getAllStudentsEnable()
        return response
    }

    async getStudentsByGrade(uidGradeRef){
        const response = await this._service.getEnableStudentsByGrade(uidGradeRef)
        return response
    }

    async getOneStudent(uid){
        const response = await this._service.getOneData('Students', uid)
        return response
    }
    
    async updateStudent(student, uid){
        const newModel = new this._model(student)
        const newStudent = Object.assign({}, newModel)
        const response = await this._service.updateData('Students', uid, newStudent)
        return response
    }


    async deleteStudent(student, uid){
        const response = await this._service.deleteData('Students', uid, student)
        return response
    }
}