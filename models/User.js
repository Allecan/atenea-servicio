export class User{
    constructor(user){
        this.email = user.email
        this.emailVerified = false
        this.password = user.password
        this.displayName = user.displayName
        this.disable = false
    }

    encryptPassword(password, hashPassword){
        this.password = hashPassword(password)
    }
}