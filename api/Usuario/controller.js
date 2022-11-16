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
        let newTeachers = []
        let activeTeachers = []
        let inactiveTeachers = []
        for (const user of users) {
            user.uid = user.id
            delete user.id
            user.date = user.createdAt
            delete user.createdAt
            if (user.rol == 'docente') {
                if (user.enable) {
                    activeTeachers.push(user)
                } else if (!user.enable){
                    inactiveTeachers.push(user)
                }
            } else if (user.rol == '') {
                newTeachers.push(user)
            }
        }
        let teachers = {newUsers: {size: newTeachers.length, data : newTeachers}, activeUsers: {size: activeTeachers.length, data : activeTeachers}, inactiveUsers: {size: inactiveTeachers.length, data : inactiveTeachers}}
        // Proceso para obtener un grado por cada maestro activo
        let grades = await this._service.getDataU('Grades')
        for (const teacher of teachers.activeUsers.data) {
            teacher.grade = {}
            for (const grade of grades) {
                if (grade.teacherRef != undefined && grade.teacherRef._path.segments.at(-1) == teacher.uid) {
                    delete grade.teacherRef
                    delete grade.levelRef
                    teacher.grade = grade
                    break
                }
            }
        }
        // Proceso para obtener un grado por cada maestro inactivo
        for (const teacher of teachers.inactiveUsers.data) {
            teacher.grade = {}
            for (const grade of grades) {
                if (grade.teacherRef != undefined && grade.teacherRef._path.segments.at(-1) == teacher.uid && grade.enable == true) {
                    delete grade.teacherRef
                    delete grade.levelRef
                    teacher.grade = grade
                    break
                }
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
        } else if (teacher.rol != 'docente' && teacher.rol != '') {
            throw 'Este usuario no es un docente ni docente sin confirmar'
        }
        let gradesList = []
        const grades = await this._service.getDataU('Grades')
        for (const grade of grades) {
            if (grade.teacherRef._path.segments.at(-1) == id && grade.enable == true) {
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

    async enableTeacher(id){
        const response = await this._service.enableTeacher(id)
        return response
    }

    async disableTeacher(id){
        const response = await this._service.disableTeacher(id)
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

