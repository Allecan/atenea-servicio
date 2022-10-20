export class ControllerActivity {
    constructor(serviceActivity, activity) {
        this._service = serviceActivity
        this._model = activity
    }

    async createNewActivity(activity) {
        const newModel = new this._model(activity, null)
        const newActivity = Object.assign({}, newModel)

        const area = await this._service.getOneData('Areas', newActivity.areaRef)

        if (area == undefined) {
            return "El id de este area no existe"
        }

        // } else if (teacher.rol != 'docente') {
        //     return "Este usuario no es un docente"
        // } else if (level == undefined) {
        //     return "El id de este nivel no existe"
        // }

        const areaRef = await this._service.getDocRef('Areas', activity.areaRef)
        // const levelRef = await this._service.getDocRef('Levels', grade.levelRef)

        newActivity.areaRef = areaRef
        // newGrade.levelRef = levelRef

        // se busca el grado al que pertenece el area o curso
        const gradeId = area.gradeRef._key.path.segments.at(-1)
        const grade = await this._service.getOneGrade('Grades', gradeId)

        // Se ingresan los estudiantes a la lista de notas de la actividad
        newActivity.scores = []
        for (const student of grade.students) {
            newActivity.scores.push({studentRef : await this._service.getDocRef('Students',student.id), score : 0})
        }
        
        const response = await this._service.saveData('Activities', newActivity)
        return response
    }

    // async updateAnArea(id, area) {
    //     const oldArea = await this._service.getOneData('Areas', id)
    //     const newModel = new this._model(area, oldArea);
    //     const newArea = Object.assign({}, newModel);
    //     const grade = await this._service.getOneData('Grades', newArea.gradeRef)

    //     if (oldArea == undefined) {
    //         return "El id de esta area no existe"
    //     } else if (grade == undefined) {
    //         return "El id de este grado no existe"
    //     }

    //     const gradeRef = await this._service.getDocRef('Grades', newArea.gradeRef)

    //     newArea.gradeRef = gradeRef

    //     const response = await this._service.updateData('Areas', id, newArea);
    //     return response;
    // }

    // async deleteAGrade(id) {
    //     const response = await this._service.deleteGrade('Grades', id)
    //     return response
    // }


    // async getAllAreas() {
    //     const response = await this._service.getData('Areas')
    //     return response
    // }

    // async getOneArea(uid) {
    //     const response = await this._service.getOneGrade('Areas', uid)
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