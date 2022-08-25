export default class Auth {
  constructor (auth) {
    this._auth = auth.state || false
    this._name_complete = auth.name_complete || ''
    this._email = auth.email || ''
    this._profile_rol = auth.profile_rol || ''
    this._token = auth.token || ''
    this._message = auth.message || ''
  }
}