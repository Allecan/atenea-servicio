export class Grade{
    constructor(grade, oldGrade){
        this.grade_name = grade.grade_name || oldGrade.grade_name
        this.teacherRef = grade.teacherRef || oldGrade.teacherRef
        this.grade_level = grade.grade_level || oldGrade.grade_level
    }

}