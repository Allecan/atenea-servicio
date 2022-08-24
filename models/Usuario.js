export class User{
    constructor(user){
        this._id = null
        this._username = user.username
        this._email = user.email
        this._password = user.password
    }
}