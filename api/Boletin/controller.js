
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

}