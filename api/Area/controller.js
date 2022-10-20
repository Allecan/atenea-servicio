export class ControllerArea {
    constructor(serviceArea, area) {
        this._service = serviceArea
        this._model = area
    }

    async createNewArea(area) {
        const newModel = new this._model(area, null)
        const newArea = Object.assign({}, newModel)

        const grade = await this._service.getOneData('Grades', newArea.gradeRef)

        // if (teacher == undefined) {
        //     return "El id de este usuario no existe"
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

    // async updateAGrade(id, grade) {
    //     const oldGrade = await this._service.getOneData('Grades', id)
    //     const newModel = new this._model(grade, oldGrade);
    //     const newGrade = Object.assign({}, newModel);
    //     const teacher = await this._service.getOneData('User', newGrade.teacherRef)
    //     const level = await this._service.getOneData('Levels', newGrade.levelRef)

    //     if (oldGrade == undefined) {
    //         return "El id de este grado no existe"
    //     } else if (teacher == undefined) {
    //         return "El id de este usuario no existe"
    //     } else if (teacher.rol != 'docente') {
    //         return "Este usuario no es un docente"
    //     } else if (level == undefined) {
    //         return "El id de este nivel no existe"
    //     }

    //     const teacherRef = await this._service.getDocRef('User', newGrade.teacherRef)
    //     const levelRef = await this._service.getDocRef('Levels', newGrade.levelRef)

    //     newGrade.teacherRef = teacherRef
    //     newGrade.levelRef = levelRef

    //     const response = await this._service.updateGrade('Grades', id, newGrade, oldGrade);
    //     return response;
    // }

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