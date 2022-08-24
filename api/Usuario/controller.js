 class ControllerUser{
    constructor(serviceUser,user){
        this._service = serviceUser
        this._model = user
    }

    async createNewUser(user){
        const newUser = new this._model(user)
        const response = await this._service.save(newUser)
        return response
    }

}

export default ControllerUser
