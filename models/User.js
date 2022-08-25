export class User{
    constructor(user){
        this._id = null
        this._name_complete = user.name_complete
        this._email = user.email
        this._password = user.password
    }

    encryptPassword(password, hashPassword){
        this._password = hashPassword(password)
    }
}