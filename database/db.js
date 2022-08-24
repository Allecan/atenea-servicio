import {createPool}  from 'mysql2/promise';
import { config } from '../config/default.js';

 export class DataBasePlanetScale{
    constructor(){
        this._pool = this.getConnection()
    }
    
    async getConnection(){
        const pool = await createPool({
            database:  config.db.database,
            user:  config.db.user,
            host: config.db.host,
            password: config.db.password,
            ssl:{
                rejectUnauthorized: false,
            }
        })
    
        return pool
    }
}
/*
const conectarDB  = async  ()=> {
    try {
        const pool = await createPool({
            database:  config.db.database,
            user:  config.db.user,
            host: config.db.host,
            password: config.db.password,
            ssl:{
                rejectUnauthorized: false,
            }
        })   
        console.log('conexion establecida correctamente db')
        
    } catch (error) {
        console.log('error de conexion')
    }
    
}
*/
/*
const data = new DataBasePlanetScale()
const newData = await  data.getConnection()
console.log(newData)
*/