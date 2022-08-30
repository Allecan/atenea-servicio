import mysql from 'mysql2/promise';
import { config } from '../config/default.js';

export class DataBasePS {

  async save (data) {
    const existsUser = await this.getOneUserByEmail(data)
    if( typeof existsUser === 'undefined'){
      console.log(await this.getOneUserByEmail(data));
      const connection = await mysql.createConnection(config.dbLocal)
      const query = `INSERT INTO users (name_complete, email, password) VALUES (?, ?, ?);`
      const result = await connection.query(query, [data._name_complete, data._email, data._password])
      //const result = await this._connection.query(query, [data._name_complete, data._email, data._password])
      connection.end()
      return result
    }
    else{
      const error  = new Error("user already exists")
      return error
    }
  }

  async getOneUserByEmail(data){
    const connection = await mysql.createConnection(config.dbLocal)
    const query = `SELECT id, name_complete, password, email, profile_rol FROM users WHERE email = '${data._email}' LIMIT 1`
    console.log(query)
    const result = await connection.query(query)
    connection.end()
    return result[0][0]
    }
}

// const data = new DataBasePS ()
// const result = await data.getOneUserByEmail({
//   _email: 'jossugames@gmail.com'
// })
// console.log(result);


// const data = new DataBasePS()
// const result = await data.save({
//   _name_complete: "yossu502",
//   _email: "jossugames@gmail.com",
//   _password: "prueba"
// })
// console.log(result);

