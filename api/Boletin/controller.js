
export  class BoletinController{
    constructor(serviceBoletin, boletin){
        this._service = serviceBoletin
        this._model = boletin
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
            //se agrega el curso a la lista
            courses.push(course)
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
          courses.push(course)
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

      async addNoteCourse(id,data){
        const bulletin = await this.getOneBoletin(id)
        if(!(bulletin === undefined)){
          let courses = bulletin.courses
          const some = courses.some(current => current.name_grade==data.name_course)
          if(some){
            let course = courses.find(current => current.name_grade==data.name_course)  
            const index = courses.findIndex(current => current.name_grade==data.name_course)  
            course.grades[data.unit-1] = data.note
            course.promedio =  this.additionAverage(course.grades)
            courses[index] = course
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



      additionAverage(list){
        let addition = 0
        list.forEach((grade)=>{
          addition+=grade
        });
        const average = addition/4
        return average
      }
}