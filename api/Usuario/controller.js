 export class ControllerUser{
    constructor(serviceUser, user, hashPassword){
        this._service = serviceUser
        this._model = user
        this._hashPassword = hashPassword
    }

    async createNewUser(user){
        const newUser = new this._model(user)
        newUser.encryptPassword(user.password, this._hashPassword)
        const response = await this._service.save(newUser)
        return response
    }

}

