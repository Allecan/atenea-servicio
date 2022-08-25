import { DataBasePlanetScale } from '../../database/db.js'

class UserService{
    constructor(){
        const pool = new DataBasePlanetScale()
        this._connect = pool.getConnection()
    }

    async save(data){
        const query = `INSERT INTO users (username, email, password) VALUES  (${data.username},  ${data.email}, ${data.password};`
        // const query = `INSERT INTO users(username,email,password) VALUES ('${data.username}','${data.email}','${data.password}')`
        (await this._connect).query(query)
        
    }
}

export default UserService