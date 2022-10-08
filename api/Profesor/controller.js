export class ControllerTeacher {
    constructor(serviceTeacher, teacher) {
        this._service = serviceTeacher
        this._model = teacher
    }

    async updateATeacherGrades(id, teacher) {
        const oldTeacher = await this._service.getOneData('User', id)
        if (oldTeacher.rol != "docente") {
            return "Este usuario no es un maestro"
        }

        for (const grade of teacher.gradesList) {
            const response = await this._service.getOneData('Grades', grade)
            if (response == undefined) {
                return "El grado " + grade + " no existe"
            }
        }

        const newModel = new this._model(teacher, oldTeacher);
        const newTeacher = Object.assign({}, newModel);
        const response = await this._service.updateData('User', id, newTeacher);
        return response;
    }

    async getOneTeacher(uid) {
        const response = await this._service.getOneData('User', uid)
        if (response == undefined || response.rol != "docente") {
            return "Este usuario no es un maestro o no existe"
        }
        return response
    }

    async getATeacherGradesList(uid) {
        const response = await this._service.getOneData('User', uid)
        if (response == undefined || response.rol != "docente") {
            return "Este usuario no es un maestro o no existe"
        }
        return response.gradesList
    }

    async addATeacherGrades(id, teacher) {
        const oldTeacher = await this._service.getOneData('User', id);
        if (oldTeacher == undefined || oldTeacher.rol != "docente") {
            return "Este usuario no es un maestro o no existe"
        }
        for (const grade of teacher.gradesList) {
            const response = await this._service.getOneData('Grades', grade)
            if (response == undefined) {
                return "El grado " + grade + " no existe"
            }
        }
        const newModel = new this._model(teacher, oldTeacher);
        const newTeacher = Object.assign({}, newModel);
        const response = await this._service.addGradesToTeacher('User', id, newTeacher, oldTeacher.gradesList);
        return response;
    }

    async removeATeacherGrades(id, gradeId) {
        const oldTeacher = await this._service.getOneData('User', id)
        if (oldTeacher == undefined || oldTeacher.rol != "docente") {
            return "Este usuario no es un maestro o no existe"
        }
        const response = await this._service.deleteGradesToTeacher('User', id, gradeId, oldTeacher);
        return response;
    }

}