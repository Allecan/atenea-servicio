export class ControllerActivity {
    constructor(serviceActivity, activity) {
        this._service = serviceActivity
        this._model = activity
    }

    async createNewActivity(activity) {
        if (activity.activity_value <= 0 || activity.activity_value == null) {
            throw "El valor de la actividad debe ser mayor a 0"
        }
        const newModel = new this._model(activity, null)
        const newActivity = Object.assign({}, newModel)
        newActivity.activity_value = parseInt(newActivity.activity_value)

        const area = await this._service.getOneData('Areas', newActivity.areaRef)

        if (area == undefined) {
            throw "El id de este area no existe"
        } else if (newActivity.unit < 1 || newActivity.unit > 4) {
            throw "El valor de la unidad no puede ser menor a 1 o mayor a 4"
        }

        // Se verifica que no se sobrepase el limite de 8 actividades
        const activities = await this._service.getData('Activities')
        let totalActivities = 0
        for (const activ of activities) {
            if (activ.areaRef._key.path.segments.at(-1) == activity.areaRef && activ.unit == activity.unit && activ.isTest == false && activ.enable == true) {
                  totalActivities++
            }
        }
        if (totalActivities >= 9) {
            throw "No se pueden crear mas de 9 actividades por unidad. El total de actividades en esta unidad es de " + totalActivities
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
        if (activity.activity_value <= 0 || activity.activity_value == null) {
            throw "El valor de la actividad debe ser mayor a 0"
        }
        const oldActivity = await this._service.getOneData('Activities', id)
        activity.activity_value = parseInt(activity.activity_value)

        if (oldActivity == undefined) {
            throw "El id de esta actividad no existe"
        } else if (activity.unit < 1 || activity.unit > 4) {
            throw "El valor de la unidad no puede ser menor a 1 o mayor a 4"
        }

        if (oldActivity.isTest == true) {
            oldActivity.activity_value = activity.activity_value
        } else {
            oldActivity.activity_name = activity.activity_name
            oldActivity.activity_value = activity.activity_value
            oldActivity.unit = activity.unit
        }
        delete oldActivity.id

        const response = await this._service.updateData('Activities', id, oldActivity);
        return response;
    }

    async updateStudentScore(idActivity, idStudent, newScore) {
        const activity = await this._service.getOneData('Activities', idActivity)
        const student = await this._service.getOneData('Students', idStudent)
        newScore = parseInt(newScore)

        if (activity == undefined) {
            throw "El id de esta actividad no existe"
        } else if (student == undefined) {
            throw "El id de este estudiante no existe o no esta asignado al grado de esta actividad"
        } else if (newScore < 0) {
            throw "El punteo no puede ser un numero negativo"
        }

        for (const score of activity.scores) {
            if (score.studentRef._key.path.segments.at(-1) == idStudent) {
                score.score = newScore
            }
        }
        delete activity.id
        const response = await this._service.updateData('Activities', idActivity, activity);
        return response;
    }

    async updateAllStudentsScore(data) {
        const activity = await this._service.getOneData('Activities', data.activityRef)

        if (activity == undefined) {
            throw "El id de esta actividad no existe"
        }

        // Proceso para verificar que la informacion enviada sea correcta
        const students = await this._service.getData('Students')
        for (const score of data.scores) {
            let studentExists = false
            for (const student of activity.scores) {
                if (student.studentRef._key.path.segments.at(-1) == score.studentRef) {
                    studentExists = true
                }
            }
            if (!studentExists) {
                throw "El estudiante " + score.studentRef + " no existe o no esta asignado al grado de esta actividad"
            }
            if (parseInt(score.score) < 0) {
                throw "La nota debe ser mayor o igual a cero"
            }
            // Se actualiza la lista de notas de la actividad
            for (const oldScore of activity.scores) {
                if (oldScore.studentRef._key.path.segments.at(-1) == score.studentRef) {
                    oldScore.score = score.score
                }
            }
        }
        delete activity.id
        const response = await this._service.updateData('Activities', data.activityRef, activity);
        return response;
    }

    async deleteAnActivity(id) {
        const response = await this._service.getOneData('Activities', id)
        if (response == undefined) {
            throw "Este id de actividad no existe"
        } else if (response.isTest == true) {
            throw "No se pueden eliminar las actividades de pruebas objetivas"
        }
        response.enable = false
        delete response.id
        const disableActivity = await this._service.updateData('Activities', id, response);
        return disableActivity
    }


    async getAllActivities() {
        const response = await this._service.getData('Activities')
        let enabledData = []
        for (const activity of response) {
            activity.areaRef = await this._service.getDocByRef(activity.areaRef)
            if (activity.areaRef == undefined || activity.enable == false) {
                continue
            }
            delete activity.areaRef.gradeRef
            delete activity.scores
            enabledData.push(activity)
        }
        return enabledData
    }

    async getOneActivity(uid) {
        const response = await this._service.getOneData('Activities', uid)
        if (response == undefined || response.enable == false) {
            throw "Este id de actividad no existe o no esta habilitada"
        }
        response.areaRef = await this._service.getDocByRef(response.areaRef)
        delete response.areaRef.gradeRef
        let enabledScores = []
        for (const score of response.scores) {
            score.studentRef = await this._service.getDocByRef(score.studentRef)
            if (score.studentRef == undefined || score.studentRef.enable == false) {
                continue
            }
            delete score.studentRef.gradeRef
            enabledScores.push(score)
        }
        response.scores = enabledScores
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