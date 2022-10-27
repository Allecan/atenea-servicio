export class UserRouter{
    constructor(router, controller, response, httpCode, createUserValidation){
        this._router = router()
        this._controller = controller
        this._response = response
        this._httpcode = httpCode
        this._checkUser = createUserValidation
        this.registerRouter()    
    }

    registerRouter(){
        this._router.post('/create-user', this._checkUser, this.handleCreateUser.bind(this))
        this._router.get('/get-users', this.handleGetAllUsers.bind(this))
        this._router.get('/get-user/', this.handleGetOneUser.bind(this))
        this._router.put('/update-user/:id', this.handleUpdateuser.bind(this))
        this._router.put('/delete-user/', this.handleDeleteuser.bind(this))
        this._router.put('/update-user-rol/', this.handleUpdateRol.bind(this))
        this._router.get('/reset-password/', this.resetPasswordUser.bind(this))
    }
    
    async handleCreateUser(req,res){
        try {
            const user = req.body
            const result = await this._controller.createNewUser(user)
            if (!result.errorInfo) {
                this._response.succes(req, res, result, this._httpcode.OK)
            }else{
                this._response.error(req, res, 'Error.Por favor verifica los datos de usuario', this._httpcode.BAD_REQUEST)
            }
        } catch (error) {
            this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
        }
    }

    async handleGetAllUsers(req, res){
        try {
            const result = await this._controller.getAllUsers()
            if (!result.errorInfo) {
                this._response.succes(req, res, result, this._httpcode.OK)
            }else{
                this._response.error(req, res, 'Error.Por favor verifica los datos de usuario', this._httpcode.BAD_REQUEST)
            }
        } catch (error) {
            this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
        }
    }

    async handleGetOneUser(req, res){
        try {
            const idUser = req.query.id
            const result = await this._controller.getOneUser(idUser)
            if (!result.errorInfo) {
                this._response.succes(req, res, result, this._httpcode.OK)
            }else{
                this._response.error(req, res, 'Error.Por favor verifica los datos de usuario', this._httpcode.BAD_REQUEST)
            }
        } catch (error) {
            this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
        }
    }

    async handleUpdateuser(req, res){
        try {
            const idUser = req.params['id']
            const infoUser = req.body
            const result = await this._controller.updateInfoUser(idUser, infoUser)
            if (!result.errorInfo) {
                this._response.succes(req, res, result, this._httpcode.OK)
            }else{
                this._response.error(req, res, 'Error. Por favor verifica los datos de usuario', this._httpcode.BAD_REQUEST)
            }
        } catch (error) {
            this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
        }
    }

    async handleDeleteuser(req, res){
        try {
            const idUser = req.body
            const result = await this._controller.deleteUserController(idUser)
            console.log(result);
            if (!result.errorInfo) {
                this._response.succes(req, res, result, this._httpcode.OK)
            }else{
                this._response.error(req, res, 'Error. Por favor verifica los datos de usuario', this._httpcode.BAD_REQUEST)
            }
        } catch (error) {
            this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
        }
    }

    async handleUpdateRol(req, res){
        try {
            const idUser = req.query.id
            const type = req.query.type
            if (idUser === "" || type ==="") {
                this._response.error(req, res, 'No se envio ningun parametro', this._httpcode.BAD_REQUEST)
            } else if(idUser === undefined || type === undefined){
                this._response.error(req, res, 'Revisar el parametro de informacion', this._httpcode.BAD_REQUEST)
            }else{
                const result = await this._controller.updateRolUser(idUser, type)
                if (!result.errorInfo) {
                    this._response.succes(req, res, result, this._httpcode.OK)
                }else{
                    this._response.error(req, res, 'Error. Por favor verifica los datos de usuario', this._httpcode.BAD_REQUEST)
                }
            }
        } catch (error) {
            this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
        }
    }

    async resetPasswordUser(req, res){
        try {
            const userEmail = req.query.email
            const result = await this._controller.resetPasswordLink(userEmail)
            if (result.errorInfo) {
                this._response.error(req, res, `Lo sentimos. El Correo ${userEmail} no esta asociado a una cuenta de Atenea. Verifica el correo electronico.`, this._httpcode.BAD_REQUEST)
            }else{
                this._response.succes(req, res, result, this._httpcode.OK)
            }
        } catch (error) {
            this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
        }
    }
}