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

    async getOneUser(id){
        const response = await this._service.getDataUser(id)
        return response
    }

    async updateInfoUser(id, data){
        const response = await this._service.updateUser(id, data)
        return response
    }

    async deleteUserController(id){
        const response = await this._service.deleteUser(id)
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

