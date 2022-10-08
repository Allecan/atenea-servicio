export class ControllerTeacher {
    constructor(serviceTeacher, teacher) {
        this._service = serviceTeacher
        this._model = teacher
    }

    async updateATeacherGrades(id, teacher) {
        const oldTeacher = await this._service.getOneData('User', id)
        if (oldTeacher.rol != "teacher") {
            return "Este usuario no es un maestro"
        }
        const newModel = new this._model(teacher, oldTeacher);
        const newTeacher = Object.assign({}, newModel);
        const response = await this._service.updateData('User', id, newTeacher);
        return response;
    }

    async getOneTeacher(uid) {
        const response = await this._service.getOneData('User', uid)
        return response
    }

    async addATeacherGrades(id, teacher) {
        const oldTeacher = await this._service.getOneData('User', id);
        if (oldTeacher.rol != "teacher") {
            return "Este usuario no es un maestro"
        }
        
        for (const grade of teacher.gradesList) {
            const verify = await this._service.getOneData('Grades', grade);
            if (verify.grade_name == null) {
                return "Uno de los grados ingresados no esta registrado"
            }
            oldTeacher.gradesList.push(grade)
        }
        
        teacher.gradesList = oldTeacher.gradesList;

        const newModel = new this._model(teacher, oldTeacher);
        const newTeacher = Object.assign({}, newModel);
        const response = await this._service.updateData('User', id, newTeacher);
        return response;
    }

    async deleteATeacherGrades(id, teacher) {
        const oldTeacher = await this._service.getOneData('User', id)
        if (oldTeacher.rol != "teacher") {
            return "Este usuario no es un maestro"
        }
        const newModel = new this._model(teacher, oldTeacher);
        const newTeacher = Object.assign({}, newModel);
        const response = await this._service.updateData('User', id, newTeacher);
        return response;
    }

}