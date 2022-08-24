import { DataBasePlanetScale } from "../../database/db.js"
export class userService{
    constructor(){
        const pool = new DataBasePlanetScale()
        this._connect = pool.getConnection()
    }
    async save(data){
            const query = `select * from users;`
        // const query = `INSERT INTO users(username,email,password) VALUES ('${data.username}','${data.email}','${data.password}')`

        await  this._connect.execute(query)
        
    }

}


