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

    async updateAnActivity(id, activity) {
        const oldActivity = await this._service.getOneData('Activities', id)

        if (oldActivity == undefined) {
            return "El id de esta actividad no existe"
        }

        oldActivity.activity_name = activity.activity_name
        oldActivity.activity_value = activity.activity_value
        delete oldActivity.id

        const response = await this._service.updateData('Activities', id, oldActivity);
        return response;
    }

    // async deleteAGrade(id) {
    //     const response = await this._service.deleteGrade('Grades', id)
    //     return response
    // }


    async getAllActivities() {
        const response = await this._service.getData('Activities')
        for (const activity of response) {
            activity.areaRef = await this._service.getDocByRef(activity.areaRef)
            delete activity.areaRef.gradeRef
            delete activity.scores
        }
        return response
    }

    async getOneActivity(uid) {
        const response = await this._service.getOneData('Activities', uid)
        if (response == undefined) {
            return "Este id de actividad no existe"
        }
        response.areaRef = await this._service.getDocByRef(response.areaRef)
        delete response.areaRef.gradeRef
        for (const score of response.scores) {
            score.studentRef = await this._service.getDocByRef(score.studentRef)
            delete score.studentRef.gradeRef
        }
        return response
    }

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