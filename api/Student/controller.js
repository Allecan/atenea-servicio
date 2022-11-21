import {appPdf} from "../../pdf/app.js"
import {contentFunction} from "../../pdf/content/pdfContent.js"
import { simpleContent } from "../../pdf/content/simpleContent.js"
//import { allContent } from "../../pdf/content/allContent.js"
export class ControllerStudent {
    constructor(serciceStudent, student) {
        this._service = serciceStudent
        this._model = student
    }

    async createNewStudent(student) {
        const newModel = new this._model(student)
        const newStudent = Object.assign({}, newModel)
        const response = await this._service.saveNewStudent('Students', newStudent)
        return response
    }

    async getAllStudents() {
        const response = await this._service.getAllStudentsEnable()
        return response
    }

    async getAllStudentsAux() {
        const response = await this._service.getAllStudentsEnableAux()
        return response
    }

    async getStudentsByGrade(uidGradeRef) {
        const response = await this._service.getEnableStudentsByGrade(uidGradeRef)
        return response
    }

    async getOneStudent(uid) {
        const response = await this._service.getOneData('Students', uid)
        return response
    }

    async getStudentBoletin(uid) {
        const student = await this._service.getOneDataU('Students', uid)
        if (student == undefined) {
            throw "Este id de estudiante no existe"
        }
        // Variables para el boletin
        let courses = []

        // Se ingresan los datos necesarios a las variables del boletin
        const areas = await this._service.getDataU('Areas')
        const activities = await this._service.getDataU('Activities')

        // Se ingresan los cursos que corresponden al grado del estudiante
        for (const area of areas) {
            // Se verifica el grado del area es la misma que la del estudiante
            if (area.gradeRef._path.segments.at(-1) == student.gradeRef._path.segments.at(-1)) {
                let course = { grades: [0, 0, 0, 0], name_grade: area.area_name, promedio: 0 }
                for (const activity of activities) {
                    // Se verifica que la actividad pertenezca al mismo grado y se obtiene la nota del estudiante
                    if (activity.areaRef._path.segments.at(-1) == area.id) {
                        // Se busca la nota o punteo del estudiante en esta actividad
                        for (const score of activity.scores) {
                            if (score.studentRef._path.segments.at(-1) == student.id) {

                                if (activity.unit == 1) {
                                    course.grades[0] += score.score
                                } else if (activity.unit == 2) {
                                    course.grades[1] += score.score
                                } else if (activity.unit == 3) {
                                    course.grades[2] += score.score
                                } else if (activity.unit == 4) {
                                    course.grades[3] += score.score
                                }

                            }
                        }
                    }
                }

                courses.push(course)

            }
        }
        return courses
    }

   async createPdfInformation(courses,uid){
            // Se ingresa el nombre del grado
            console.log("entro")
            const student = await this._service.getOneDataU('Students', uid)
            const gradeDoc = await this._service.getOneDataU('Grades', student.gradeRef._path.segments.at(-1))        
            const grade = gradeDoc.grade_name       
            // Se ingresa el id del estudiante
            const keyCode = student.id

            // Se ingresa el nombre del estudiante
            const name_student = student.name_complete
    
            // Se ingresa el nombre del docente a cargo
            const teacherDoc = await this._service.getOneDataU('User', gradeDoc.teacherRef._path.segments.at(-1))
            const teacher = teacherDoc.displayName
    
            // Se ingresa el ano
            const year = new Date().getFullYear()
    
            // Creacion del boletin
            const boletin = { courses: courses, grade: grade, keyCode: keyCode, name_student: name_student, teacher: teacher, year: year }
        
            const documentPdf = this.createDocumentPdf(boletin)
            return documentPdf
            
    }
    //unifica las funciones para crear un pdf de boletin particular
    async unifyOnePdf(iud){
        
        const courses = await this.getStudentBoletin(iud)

        const documentPdf = await this.createPdfInformation(courses,iud)

        const bodyContent = simpleContent(documentPdf)
        console.log(bodyContent)
        const data = {
            name: documentPdf.name_student.replace(/ /g, '_'),
            year: documentPdf.year
        }
        //se crea la direccion
        const direction = `docs/boletin/${data.name}${data.year}Boletin.pdf` 
        const content = contentFunction(bodyContent)
        console.log(content)
        return this.savePdf(content,direction,data)
    }

    async unifyAllPdf(idGrade){
        const  listStudent  = await this.getStudentsByGrade(idGrade)
        const sizeList = listStudent.students.length
        console.log(listStudent.students)
        console.log(sizeList)
        if(sizeList == 1){
            //si solo se tiene un estudiante
            return await this.unifyOnePdf(listStudent.students[0].id)
        }else{
            let content = []
            for(const student of listStudent.students){
    
                const courses = await this.getStudentBoletin(student.id)
                const documentPdf = await this.createPdfInformation(courses,student.id)
                const bodyContent = simpleContent(documentPdf)           
                content.push(...bodyContent)
                content.push({text: '', pageBreak: 'before'})
    
            }
            const data = {
                name: "Registro",
                year: new Date().getFullYear()
            }
            //se crea la direccion
            const direction = `docs/boletin/${data.name}${data.year}Boletin.pdf` 
            const contentFinal = contentFunction(content)
            return this.savePdf(contentFinal,direction,data)
        }

    }

    savePdf(content,direction,data){
        const pdfResult = appPdf(content, direction,data)
        return pdfResult
    }

    //Funciones para crear el boletin

    //crear documento par el pdf
    createDocumentPdf(bulletin) {
        let doc = {
            name_student: bulletin.name_student,
            teacher: bulletin.teacher,
            grade: bulletin.grade,
            keyCode: bulletin.keyCode,
            year: bulletin.year,
            courses: this.createRawCourse(bulletin.courses),
            condition: this.passOrFail(bulletin.courses)
        }
        return doc
    }

    createRawCourse(courses) {
        //console.log(courses)
        let table = []
        let num_course = 1
        courses.forEach((element, index, array) => {
            let raw = []
            //nombre del curso
            raw.push(num_course++)
            const nameCourse = { text: element.name_grade, style: 'tableHeader' }
            //notas 
            raw.push(nameCourse)
            element.grades.forEach((grade, index, array) => {
                raw.push(grade)
            })
            let promedioCourse = {}
            //promedio 
            //Se asigna el estilo segun si gana o no el curso 
            if (element.promedio < 60) {
                promedioCourse = { text: element.promedio, style: 'missedCourse' }
            }
            else {
                promedioCourse = { text: element.promedio, style: 'courseWon' }
            }
            raw.push(promedioCourse)

            //ingresar a la tabla
            table.push(raw)
        })
        // console.log(table)
        return table
    }

    //Verifica si el estudiante aprobo o no el grado 
    passOrFail(courses) {
        let counter = 0
        courses.forEach((element) => {
            //se evaluan los promedios de las cuatro unidades de cada curso 
            if (element.promedio < 60) {
                counter++
            }
        })
        //si el conteo es mayor a cero significa que reprobo, ya que encontro algun promedio menor a 60
        if (counter > 0) {
            return "REPROBADO"
        }
        else {
            return "APROBADO"
        }
    }

    async getStudentScores(uid) {
        const student = await this._service.getOneDataU('Students', uid)
        // Se verifican los datos
        if (student == undefined || student.enable == false) {
            throw "Este estudiante no existe o no esta habilitado"
        }
        // Se obtiene el grado al que pertenece el estudiante
        const gradeRef = student.gradeRef._path.segments.at(-1)
        const grade = await this._service.getOneDataU('Grades',gradeRef)
        // Se advierte si el estudiante no esta asignado a ningun grado o si este grado esta deshabilitado
        if (grade == undefined || grade.enable == false) {
            throw "Este estudiante no esta asignado a ningun grado"
        }
        // Inicializacion de la variable que contendra el JSON completo
        let data = {unit1: {areas:[], average:0, absences:0}, unit2: {areas:[], average:0, absences:0}, unit3: {areas:[], average:0, absences:0}, unit4: {areas:[], average:0, absences:0}}
        // Proceso para obtener las areas y actividades del grado
        const areas = await this._service.getDataU('Areas')
        const activities = await this._service.getDataU('Activities')
        for (const area of areas) {
            // Se encuentra el area del grado
            if (area.gradeRef._path.segments.at(-1) == gradeRef && area.enable == true) {
                // Se agregan las notas de los alumnos en cada unidad
                let unit1 = 0
                let unit2 = 0
                let unit3 = 0
                let unit4 = 0
                let activities1 = []
                let activities2 = []
                let activities3 = []
                let activities4 = []
                for (const activity of activities) {
                    if (activity.areaRef._path.segments.at(-1) == area.id && activity.enable == true) {
                        // Proceso para hallar la nota del estudiante
                        let studentScore = 0
                        for (const score of activity.scores) {
                            if (score.studentRef._path.segments.at(-1) == uid) {
                                studentScore = score.score
                            }
                        }
                        // Proceso para determinar a que unidad pertenece esa nota y actividad
                        if (activity.unit == 1) {
                            unit1 += studentScore
                            activities1.push({activity_name: activity.activity_name, score: studentScore, isTest: activity.isTest})
                        } else if (activity.unit == 2) {
                            unit2 += studentScore
                            activities2.push({activity_name: activity.activity_name, score: studentScore, isTest: activity.isTest})
                        } else if (activity.unit == 3) {
                            unit3 += studentScore
                            activities3.push({activity_name: activity.activity_name, score: studentScore, isTest: activity.isTest})
                        } else if (activity.unit == 4) {
                            unit4 += studentScore
                            activities4.push({activity_name: activity.activity_name, score: studentScore, isTest: activity.isTest})
                        }
                    }
                }
                data.unit1.areas.push({area_name: area.area_name, area_id:area.id, score: unit1, activities: activities1})
                data.unit2.areas.push({area_name: area.area_name, area_id:area.id, score: unit2, activities: activities2})
                data.unit3.areas.push({area_name: area.area_name, area_id:area.id, score: unit3, activities: activities3})
                data.unit4.areas.push({area_name: area.area_name, area_id:area.id, score: unit4, activities: activities4})
            }
        }
        // Proceso para obtener el promedio de cada unidad
        for (let x = 1; x <= 4; x++) {
            const unitName = "unit"+x
            let totalPoints = 0
            let totalAreas = 0
            for (const area of data[unitName].areas) {
                totalPoints += area.score
                totalAreas++
            }
            // Se verifica que la cantidad de cursos sea de al menos 1 para que no ocurra un error tipo totalPoints/0
            if (totalAreas > 0) {
                data[unitName].average = totalPoints / totalAreas
            }
        }
        // Proceso para obtener las inasistencias del estudiante
        const attendence = await this._service.getDataU('Attendence')
        for (const atten of attendence) {
            const attenYear = atten.date.substring(6,10)
            const todayYear = new Date().getFullYear()
            if (atten.gradeRef._path.segments.at(-1) == gradeRef && attenYear == todayYear) {
                // Se busca al estudiante dentro de la lista y se detecta si estuvo ausente o no
                for (const student of atten.students) {
                    if (student.student._path.segments.at(-1) == uid && student.attendence == false) {
                        const unitName = "unit"+atten.unit
                        data[unitName].absences++
                    }
                }
            }
        }
        return data
    }


    async updateStudent(student, uid) {
        const newModel = new this._model(student)
        const newStudent = Object.assign({}, newModel)
        const response = await this._service.updateData('Students', uid, newStudent)
        return response
    }
    
    async deleteStudent(student) {
        const response = await this._service.deleteData('Students', student.uid, student.enable)
        return response
    }
}