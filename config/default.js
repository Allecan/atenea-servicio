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
  dbUrl: {
    database_url: process.env.DATABASE_URL
  },
  dbLocal:{
    host: process.env.HOST_LOCAL,
    user: process.env.USER_LOCAL,
    password:process.env.PASSWORD_LOCAL,
    database: process.env.DATABASE_LOCAL,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret!'
  },
  fireBase: {
    apikey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
  },
  firebaseSDK: {
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_X509_CER_URL 
  },
  smtp: {
    host: process.env.HOST_SMTP,
    port: process.env.PORT_SMTP,
    user: process.env.USER_SMTP,
    pass: process.env.PASS_SMTP
  },
}