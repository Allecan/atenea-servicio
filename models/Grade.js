export class Grade{
    constructor(grade){
        this.grade_name = grade.grade_name
        this.teacherRef = grade.teacherRef
        this.grade_level = grade.grade_level
        this.studentsList = grade.studentsList || []
    }

}