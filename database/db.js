import {createPool}  from 'mysql2/promise';

const conectarDB  = async  ()=> {
    try {
        const conn = await createPool({
            database:  'learningdb',
            username:  'u6e1sdr19968',
            host: 'v500hxdsdde6.us-west-2.psdb.cloud',
            password: 'pscale_pw_6M-zYj0fo1Fu1CUu_r4yUb3D46VGI1nd5W36xP7-A4Q',
            ssl:{
                rejectUnauthorized: false,
            }
        })   
        console.log('conexion establecida correctamente db')
        
    } catch (error) {
        console.log('error de conexion')
    }
}

export {
    conectarDB,
}