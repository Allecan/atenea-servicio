export class ControllerArea {
    constructor(serviceArea, area) {
        this._service = serviceArea
        this._model = area
    }

    async createNewArea(area) {
        const newModel = new this._model(area, null)
        const newArea = Object.assign({}, newModel)

        const grade = await this._service.getOneData('Grades', newArea.gradeRef)

        if (grade == undefined) {
            return "El id de este grado no existe"
        }

        // } else if (teacher.rol != 'docente') {
        //     return "Este usuario no es un docente"
        // } else if (level == undefined) {
        //     return "El id de este nivel no existe"
        // }

        const gradeRef = await this._service.getDocRef('Grades', area.gradeRef)
        // const levelRef = await this._service.getDocRef('Levels', grade.levelRef)

        newArea.gradeRef = gradeRef
        // newGrade.levelRef = levelRef

        const response = await this._service.saveData('Areas', newArea)
        return response
    }

    async updateAnArea(id, area) {
        const oldArea = await this._service.getOneData('Areas', id)
        const newModel = new this._model(area, oldArea);
        const newArea = Object.assign({}, newModel);
        const grade = await this._service.getOneData('Grades', newArea.gradeRef)

        if (oldArea == undefined) {
            return "El id de esta area no existe"
        } else if (grade == undefined) {
            return "El id de este grado no existe"
        }

        const gradeRef = await this._service.getDocRef('Grades', newArea.gradeRef)

        newArea.gradeRef = gradeRef

        const response = await this._service.updateData('Areas', id, newArea);
        return response;
    }

    // async deleteAGrade(id) {
    //     const response = await this._service.deleteGrade('Grades', id)
    //     return response
    // }


    // async getAllGrades() {
    //     const response = await this._service.getGrades('Grades')
    //     return response
    // }

    // async getOneGrade(uid) {
    //     const response = await this._service.getOneGrade('Grades', uid)
    //     return response
    // }

    // async addStudent(idGrade, idStudent) {
    //     const studentModel = await this._service.getOneData('Students', idStudent)
    //     studentModel.gradeRef = await this._service.getDocRef('Grades', idGrade)
    //     const response = await this._service.updateData('Students', idStudent, studentModel);
    //     return response
    // }

    // async addCourse(idGrade, idCourse) {
    //     const courseModel = await this._service.getOneData('Courses', idCourse)
    //     courseModel.gradeRef = await this._service.getDocRef('Grades', idGrade)
    //     const response = await this._service.updateData('Courses', idCourse, courseModel);
    //     return response
    // }
}