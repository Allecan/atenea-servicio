import dotenv from 'dotenv'

dotenv.config()

export const config = {
  api: {
    port: process.env.PORT || 4000,
    hostname: process.env.HOSTNAME || 'localhost',
    name: process.env.NAME || 'App-Atenea'
  },
  db:{
    database: process.env.NAME_DATA_BASE,
    user: process.env.USER_NAME,
    host: process.env.HOST,
    password: process.env.PASSWORD,
  },
}