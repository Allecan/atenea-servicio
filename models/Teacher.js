export class Teacher{
    constructor(teacher, oldTeacher){
        this.email = oldTeacher.email
        this.phoneNumber = oldTeacher.phoneNumber
        this.displayName = oldTeacher.displayName
        // this.gradesList = teacher.gradesList || this.gradesList
    }

    encryptPassword(password, hashPassword){
        this.password = hashPassword(password)
    }
}