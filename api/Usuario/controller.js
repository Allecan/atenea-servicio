 export class ControllerUser{
    constructor(serviceUser, user){
        this._service = serviceUser
        this._model = user
    }

    async createNewUser(user){
        const newModel = new this._model(user)
        const newUser = Object.assign({}, newModel)
        const response = await this._service.saveUser(newUser)
        return response
    }

    async getAllUsers(){
        const response = await this._service.getAllUser()
        return response
    }

    async getAllTeachers(){
        const users = await this._service.getDataU('User')
        const teachers = []
        for (const user of users) {
            if (user.rol == 'docente') {
                teachers.push(user)
            }
        }
        return teachers
    }

    async getAllPrincipals(){
        const users = await this._service.getDataU('User')
        const principals = []
        for (const user of users) {
            if (user.rol == 'director') {
                principals.push(user)
            }
        }
        return principals
    }

    async getAllEnabledTeachers(){
        const users = await this._service.getDataU('User')
        const teachers = []
        for (const user of users) {
            if (user.rol == 'docente' && user.enable == true) {
                teachers.push(user)
            }
        }
        return teachers
    }

    async getAllDisabledTeachers(){
        const users = await this._service.getDataU('User')
        const teachers = []
        for (const user of users) {
            if (user.rol == 'docente' && user.enable == false) {
                teachers.push(user)
            }
        }
        return teachers
    }

    async getOneUser(id){
        const response = await this._service.getDataUser(id)
        return response
    }

    async getOneTeacher(id){
        const teacher = await this._service.getOneDataU('User',id)
        if (teacher == undefined) {
            throw 'Este usuario no existe'
        } else if (teacher.rol != 'docente') {
            throw 'Este usuario no es un docente'
        }
        let gradesList = []
        const grades = await this._service.getDataU('Grades')
        for (const grade of grades) {
            if (grade.teacherRef._path.segments.at(-1) == id) {
                delete grade.levelRef
                delete grade.teacherRef
                delete grade.position
                gradesList.push(grade)
            }
        }
        teacher.grades = gradesList
        return teacher
    }

    async updateInfoUser(id, data){
        const response = await this._service.updateUser(id, data)
        return response
    }

    async enableTeacher(id, data){
        const response = await this._service.enableTeacher(id, data)
        return response
    }

    async disableTeacher(id, data){
        const response = await this._service.disableTeahcer(id, data)
        return response
    }

    async deleteUserController(data){
        const response = await this._service.deleteUser(data.uid, data.enable)
        console.log(response)
        return response
    }

    async updateRolUser(id, type){
        const response = await this._service.setRolUser(id, type)
        return response
    }

    async resetPasswordLink(email){
        const response = await this._service.generateResetPasswordLink(email)
        return response
    }
}

