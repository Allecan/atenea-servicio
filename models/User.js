export class User{
    constructor(user){
        this.name_complete = user.name_complete
        this.email = user.email
        this.password = user.password
    }

    encryptPassword(password, hashPassword){
        this.password = hashPassword(password)
    }
}