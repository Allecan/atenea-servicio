export class ControllerGrade {
    constructor(serviceGrade, grade) {
        this._service = serviceGrade
        this._model = grade
    }

    async createNewGrade(grade) {
        const newModel = new this._model(grade, null)
        const newGrade = Object.assign({}, newModel)

        const teacher = await this._service.getOneData('User', newGrade.teacherRef)
        if (teacher == undefined) {
            return "El id de este usuario no existe"
        } else if (teacher.rol != 'docente') {
            return "Este usuario no es un docente"
        }

        const teacherRef = await this._service.getDocRef('User', grade.teacherRef)
        newGrade.teacherRef = teacherRef

        const response = await this._service.saveData('Grades', newGrade)
        return response
    }

    async updateAGrade(id, grade) {
        const oldGrade = await this._service.getOneGrade('Grades', id)
        const newModel = new this._model(grade, oldGrade);
        const newGrade = Object.assign({}, newModel);
        const teacher = await this._service.getOneData('User', newGrade.teacherRef)

        if (oldGrade == undefined) {
            return "El id de este grado no existe"
        } else if (teacher == undefined) {
            return "El id de este usuario no existe"
        } else if (teacher.rol != 'docente') {
            return "Este usuario no es un docente"
        }

        const teacherRef = await this._service.getDocRef('User', grade.teacherRef)
        newGrade.teacherRef = teacherRef
        
        const response = await this._service.updateData('Grades', id, newGrade);
        return response;
    }

    async getAllGrades() {
        const response = await this._service.getData('Grades')
        return response
    }

    async getOneGrade(uid) {
        const response = await this._service.getOneGrade('Grades', uid)
        response.totalStudents = response.studentsList.length
        return response
    }

}