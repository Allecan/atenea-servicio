 export class ControllerUser{
    constructor(serviceUser, user, hashPassword){
        this._service = serviceUser
        this._model = user
        this._hashPassword = hashPassword
    }

    async createNewUser(user){
        const newModel = new this._model(user)
        newModel.encryptPassword(user.password, this._hashPassword)
        const newUser = Object.assign({}, newModel)
        const response = await this._service.saveData('Users', newUser)
        return response
    }

}

