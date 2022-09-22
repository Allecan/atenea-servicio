
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
}