
export  class BoletinController{
    constructor(serviceBoletin, boletin,courseBulletin){
        this._service = serviceBoletin
        this._model = boletin
        this._courseModel = courseBulletin
    }

    async createNewBoletin(boletin){
        const newModel = new this._model(boletin)
        const newBoletin = Object.assign({}, newModel)
        const response = await this._service.saveData('Boletin', newBoletin)
        return response
    }
    async updateBoletin(id, boletin) {
        const response = await this._service.updateData('Boletin', id,boletin);
        return response;
      }

      async getAllBoletin(){
        console.log('getAllBoletin')
        const response = await this._service.getData('Boletin')
        return response
      }
      async deleteBoletin(id){
        const response = await this._service.deleteData('Boletin',id)
        return response
      }
      async getOneBoletin(id){
        const response = await this._service.getOneData('Boletin',id)
        return response
      }


      async addCourses(id,course){
        //se busca el boletin
        let bulletin = await this.getOneBoletin(id) 
        //se devuelve la lista de cursos
        let courses = bulletin.courses
        //vemos si hay mas de un curso 
        if(courses.length>0){
          //se debe de evaluar si ya existe el curso en la lista 
          const some = courses.some(current => current.name_grade==course.name_grade)
          //si no existe se agrega
          if(!some){
            //se crea el nuevo modelo del curso
            const newModel = new this._courseModel(course)
            const newCourse = Object.assign({}, newModel)
            console.log(newCourse)
            //se agrega el curso a la lista
            courses.push(newCourse)
            console.log(courses)
            //se convierte en el formato adecuado 
            const newCourses = {
              courses
            }
            //se edita el boletin con la lsita de cursos actualizado
            const response = await this.updateBoletin(id, newCourses)
            return response 
          }else{
            return "the course already exists"
          }
        }else{
          //se crea el nuevo modelo del curso
          const newModel = new this._courseModel(course)
          const newCourse = Object.assign({}, newModel)
          courses.push(newCourse)
            const newCourses = {
              courses
            }
            const response = await this.updateBoletin(id, newCourses)
            return response 
        }      
      }

      async deleteCourse(id,data) {
        const bulletin = await this.getOneBoletin(id)
        let courses = bulletin.courses
        const some = courses.some(current => current.name_grade==data.name_course)
        if(some){
          const newCourses = courses.filter((item) => item.name_grade !== data.name_course)
          const deleteCourse = {
            courses:newCourses
          }
          const response = await this.updateBoletin(id, deleteCourse)
          return response
        }
        else{
          return "the course does not exist"
        }
      }

      //Agregar una nota a un curso del boletin
      async addNoteCourse(id,data){
        //se busca el boletin 
        const bulletin = await this.getOneBoletin(id)
        //se verifica que el boletin exista 
        if(!(bulletin === undefined)){
          //se obtiene la lista de cursos
          let courses = bulletin.courses
          //se verifica si el curso existe 
          const some = courses.some(current => current.name_grade==data.name_course)
          if(some){
            //se obtiene el curso que se esta buscando segun el nombre
            let course = courses.find(current => current.name_grade==data.name_course)  
            //se obtiene el indice en el que esta el curso para luego editarlo en la lista de cursos
            const index = courses.findIndex(current => current.name_grade==data.name_course)  
            //se agrega en la lista de notas la nueva nota segun la posicion o unidad que nos manden
            course.grades[data.unit-1] = data.note
            //se actualiza el promedio 
            course.promedio =  this.additionAverage(course.grades)
            //se modifica en la lista de cursos 
            courses[index] = course
            //se crea un objeto con la lista de cursos ya modificado
            const newCourses = {
              courses
            }
            const response = await this.updateBoletin(id, newCourses)
            return response
          }  
          else{
            return "the course does not exist"
          }
        }else{
          return "the bulletin does not exist"
        }
      }
      
      async createPdf(id,data){
        console.log("createPdf")
        const bulletin = await this.getOneBoletin(id)
        if(!(bulletin === undefined)){
          return this.createDocumentPdf(bulletin)
        }
        else{
          return "the bulletin does not exist"
        }
      }

      //crea el promedio para los boletines 
      additionAverage(list){
        let addition = 0
        list.forEach((grade)=>{
          addition+=grade
        });
        const average = addition/4
        return average
      }

      createDocumentPdf(bulletin){
        let doc = {
          name_student: bulletin.name_student,
          teacher: bulletin.teacher,
          grade:bulletin.grade,
          keyCode: bulletin.keyCode,
          year:bulletin.year
        }
        return doc
      }
}