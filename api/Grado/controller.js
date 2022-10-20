export class ControllerGrade {
    constructor(serviceGrade, grade) {
        this._service = serviceGrade
        this._model = grade
    }

    async createNewGrade(grade) {
        const newModel = new this._model(grade, null)
        const newGrade = Object.assign({}, newModel)

        const teacher = await this._service.getOneData('User', newGrade.teacherRef)
        const level = await this._service.getOneData('Levels', newGrade.levelRef)

        if (teacher == undefined) {
            return "El id de este usuario no existe"
        } else if (teacher.rol != 'docente') {
            return "Este usuario no es un docente"
        } else if (level == undefined) {
            return "El id de este nivel no existe"
        }

        const teacherRef = await this._service.getDocRef('User', grade.teacherRef)
        const levelRef = await this._service.getDocRef('Levels', grade.levelRef)

        newGrade.teacherRef = teacherRef
        newGrade.levelRef = levelRef

        const response = await this._service.saveGrade('Grades', newGrade)
        return response
    }

    async updateAGrade(id, grade) {
        const oldGrade = await this._service.getOneData('Grades', id)
        const newModel = new this._model(grade, oldGrade);
        const newGrade = Object.assign({}, newModel);
        const teacher = await this._service.getOneData('User', newGrade.teacherRef)
        const level = await this._service.getOneData('Levels', newGrade.levelRef)

        if (oldGrade == undefined) {
            return "El id de este grado no existe"
        } else if (teacher == undefined) {
            return "El id de este usuario no existe"
        } else if (teacher.rol != 'docente') {
            return "Este usuario no es un docente"
        } else if (level == undefined) {
            return "El id de este nivel no existe"
        }

        const teacherRef = await this._service.getDocRef('User', newGrade.teacherRef)
        const levelRef = await this._service.getDocRef('Levels', newGrade.levelRef)

        newGrade.teacherRef = teacherRef
        newGrade.levelRef = levelRef

        const response = await this._service.updateGrade('Grades', id, newGrade, oldGrade);
        return response;
    }

    async deleteAGrade(id) {
        const response = await this._service.deleteGrade('Grades', id)
        return response
    }


    async getAllGrades() {
        const response = await this._service.getGrades('Grades')
        return response
    }

    async getOneGrade(uid) {
        const response = await this._service.getOneGrade('Grades', uid)
        return response
    }

    async addStudent(idGrade, idStudent) {
        const studentModel = await this._service.getOneData('Students', idStudent)
        if (studentModel == undefined) {
            return "El id de este estudiante no existe"
        }
        studentModel.gradeRef = await this._service.getDocRef('Grades', idGrade)
        delete studentModel.id
        const response = await this._service.updateData('Students', idStudent, studentModel);
        return response
    }

    async addArea(idGrade, idArea) {
        const areaModel = await this._service.getOneData('Areas', idArea)
        if (areaModel == undefined) {
            return "El id de esta area no existe"
        }
        areaModel.gradeRef = await this._service.getDocRef('Grades', idGrade)
        delete areaModel.id
        const response = await this._service.updateData('Areas', idArea, areaModel);
        return response
    }
}