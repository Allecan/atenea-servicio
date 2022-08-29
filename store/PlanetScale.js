import mysql from 'mysql2/promise';
import { config } from '../config/default.js';

export class DataBasePS {

  async save (data) {
    const connection = await mysql.createConnection(config.dbLocal)
    const query = `INSERT INTO users (name_complete, email, password) VALUES (?, ?, ?);`
    const result = await connection.query(query, [data._name_complete, data._email, data._password])
    //const result = await this._connection.query(query, [data._name_complete, data._email, data._password])
    connection.end()
    return result
  }

  async getOneUserByEmail(data){
    const connection = await mysql.createConnection(config.dbLocal)
    const query = `SELECT id, name_complete, password, email, profile_rol FROM users WHERE email = '${data.email}' LIMIT 1`
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

