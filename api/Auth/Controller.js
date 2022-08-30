export default class AuthController {
  constructor(authServices, model, comparePassword, generateToken){
    this._services = authServices
    this._model = model
    this._comparePassword = comparePassword
    this._generateToken = generateToken
  }

  async authenticationUser(user){
    try {
      //se debe de pasar los parmetros al formato del modelo
      const auxUser = {
        _email:user.email,
        _password:user.password
      }
      
      const result = await this._services.getOneUserByEmail(auxUser)
      console.log("resutl",result)
      //si existe el email
      if (result) {
        console.log("si es el email")
        const resultComparePassword = await this._comparePassword(user.password, result.password)
        //comprobacion de password 
        if (resultComparePassword) {
          console.log("si es el password")
          //generar autenticacion 
          const tokenUser = this._generateToken(result.id)
          this._services.upDate("users","token",`'${tokenUser}'`,"id",result.id)
          return new this._model({
            state: true, 
            name_complete: result.name_complete,
            email: result.email,
            profile_rol: result.profile_rol,
            token: tokenUser,
            message: 'Login Succesfully'
          })
        } else { // si no existe el email
          console.log("no es password")
          return new this._model({
            state: false, 
            name_complete: '',
            email: '',
            profile_rol: '',
            token: '',
            message: 'wrong credentials'
        })
      }
    }else{
      console.log("no es el email")
      return new this._model({
        state: false, 
        name_complete: '',
        email: '',
        profile_rol: '',
        token: '',
        message: 'wrong credentials'
    })
    }
    } catch (error) {
      return new Error(error)
    }
  }
}