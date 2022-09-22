
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


}