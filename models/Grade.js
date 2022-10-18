export class Grade{
    constructor(grade, oldGrade){
        this.grade_name = grade.grade_name || oldGrade.grade_name
        this.teacherRef = grade.teacherRef || oldGrade.teacherRef
        this.levelRef = grade.levelRef || oldGrade.levelRef
    }

}