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
            throw "El id de este usuario no existe"
        } else if (teacher.rol != 'docente') {
            throw "Este usuario no es un docente"
        } else if (level == undefined) {
            throw "El id de este nivel no existe"
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
            throw "El id de este grado no existe"
        } else if (teacher == undefined) {
            throw "El id de este usuario no existe"
        } else if (teacher.rol != 'docente') {
            throw "Este usuario no es un docente"
        } else if (level == undefined) {
            throw "El id de este nivel no existe"
        }

        const teacherRef = await this._service.getDocRef('User', newGrade.teacherRef)
        const levelRef = await this._service.getDocRef('Levels', newGrade.levelRef)

        newGrade.teacherRef = teacherRef
        newGrade.levelRef = levelRef

        const response = await this._service.updateGrade('Grades', id, newGrade, oldGrade);
        return response;
    }

    async deleteAGrade(id) {
        // const response = await this._service.deleteGrade('Grades', id)
        const grade = await this._service.getOneData('Grades', id)
        if (grade == undefined) {
            throw "Este id de grado no existe"
        }
        grade.enable = false
        delete grade.id
        const response = await this._service.updateData('Grades', id, grade);
        const areas = await this._service.getData('Areas')
        const activities = await this._service.getData('Activities')
        for (const area of areas) {
            if (area.gradeRef._key.path.segments.at(-1) == id) {
                for (const activity of activities) {
                    if (activity.areaRef._key.path.segments.at(-1) == area.id) {
                        activity.enable = false
                        const activityId = activity.id
                        delete activity.id
                        const disableActivity = await this._service.updateData('Activities', activityId, activity);
                    }
                }
                area.enable = false
                const areaId = area.id
                delete area.id
                const disableArea = await this._service.updateData('Areas', areaId, area);
            }
        }
        return response
    }


    async getAllGrades() {
        const response = await this._service.getGrades('Grades')
        return response
    }

    async getOneGrade(uid) {
        const grade = await this._service.getOneData('Grades', uid)
        if (grade == undefined || grade.enable == false) {
            throw "Este id de grado no existe o no esta habilitado"
        }
        const response = await this._service.getOneGrade('Grades', uid)
        return response
    }

    async addStudent(idGrade, idStudent) {
        //Se verifica el estudiante y se le modifica el campo de "gradeRef"
        const studentModel = await this._service.getOneData('Students', idStudent)
        const gradeModel = await this._service.getOneData('Grades', idGrade)
        if (studentModel == undefined) {
            throw "El id de este estudiante no existe"
        } else if (gradeModel == undefined) {
            throw "El id de este grado no existe"
        }
        let oldGradeId = ""
        if (studentModel.gradeRef != undefined) {
            oldGradeId = studentModel.gradeRef._key.path.segments.at(-1)
        }
        studentModel.gradeRef = await this._service.getDocRef('Grades', idGrade)

        delete studentModel.id
        const response = await this._service.updateData('Students', idStudent, studentModel);

        if (oldGradeId == idGrade) {
            return response
        }

        //Se buscan los cursos del grado para buscar sus actividades y agregar al alumno a la
        //lista de notas
        const areas = await this._service.getData('Areas')
        const activities = await this._service.getData('Activities')

        for (const area of areas) {
            if (area.gradeRef._key.path.segments.at(-1) == idGrade) {
                for (const activity of activities) {
                    if (activity.areaRef._key.path.segments.at(-1) == area.id) {

                        activity.scores.push({ score: 0, studentRef: await this._service.getDocRef('Students', idStudent) })

                        const idActivity = activity.id
                        delete activity.id
                        const addScore = await this._service.updateData('Activities', idActivity, activity);
                    }
                }
                // Se eliminan las notas de los cursos en donde estaba el alumno anteriormente
            } else if (area.gradeRef._key.path.segments.at(-1) == oldGradeId) {
                for (const activity of activities) {
                    if (activity.areaRef._key.path.segments.at(-1) == area.id) {
                        let newScores = []
                        for (const score of activity.scores) {
                            if (score.studentRef._key.path.segments.at(-1) != idStudent) {
                                newScores.push(score)
                            }
                        }
                        const idActivity = activity.id
                        delete activity.id
                        activity.scores = newScores
                        const deleteScore = await this._service.updateData('Activities', idActivity, activity);

                    }
                }
            }
        }

        return response
    }

    async addArea(idGrade, idArea) {
        const areaModel = await this._service.getOneData('Areas', idArea)
        const grade = await this._service.getOneData('Grades', idGrade)
        if (areaModel == undefined) {
            throw "El id de esta area no existe"
        } else if (grade == undefined) {
            throw "El id de este grado no existe"
        }
        areaModel.gradeRef = await this._service.getDocRef('Grades', idGrade)
        delete areaModel.id
        const response = await this._service.updateData('Areas', idArea, areaModel);
        return response
    }
}