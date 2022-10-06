export class Teacher{
    constructor(teacher){
        this.email = teacher.email || this.email
        this.emailVerified = false
        this.phoneNumber = teacher.phoneNumber || this.phoneNumber
        this.password = teacher.password ||  this.password
        this.displayName = teacher.displayName ||  this.displayName
        this.disable = false
        this.gradesList = teacher.gradesList || this.gradesList
    }

    encryptPassword(password, hashPassword){
        this.password = hashPassword(password)
    }
}