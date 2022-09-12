import { initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { config } from '../config/default.js'

export class FireBaseAdminSDK {
    constructor(config){
        this.firebaseAdminSDK = {
            type: config.type,
            project_id: config.project_id,
            private_key_id: config.private_key_id,
            private_key: config.private_key,
            client_email: config.client_email,
            client_id: config.client_id,
            auth_uri: config.auth_uri,
            token_uri: config.token_uri,
            auth_provider_x509_cert_url: config.auth_provider_x509_cert_url,
            client_x509_cert_url: config.client_x509_cert_url  
        }
        this.app = initializeApp(this.firebaseAdminSDK)
    }

    async saveUser(data){
        try {
            const auth = getAuth(this.app)
            const result = await auth.createUser(data)
            this.setRolUser(result.uid, '')
            return 'Data Save'
        } catch (error) {
            return error.message
        }

    }

    async getAllUser(){
        const usersArray = []
        const usersObject = {users: []}
        try {
            const auth = getAuth(this.app)
            const users = await auth.listUsers()
            for (let i = 0; i < users.users.length; i++) {
                const user = users.users[i];
                const {uid, email, displayName, disabled, customClaims} = user;
                usersArray.push({uid, email, displayName, disabled, customClaims});
            }
            usersObject.users = usersArray
            return usersObject
        } catch (error) {
            return error
        }
    }

    async getDataUser(id){
        try {
            const auth = getAuth(this.app)
            const data = await auth.getUser(id)
            const {uid, email, displayName, disabled, customClaims} = data
            return {uid, email, displayName, disabled, customClaims}
        } catch (error) {
            return error
        }
    }

    async updateUser(id, data){
        try {
            const auth = getAuth(this.app)
            const update = await auth.updateUser(id, data)
            return `Se actualizo la informacio para el Usuario ${update.displayName}`
        } catch (error) {
            return error
        }
    }

    async deleteUser(id){
        try {
            const auth = getAuth(this.app)
            const deleteUser = await auth.updateUser(id, {disabled: true})
            this.setRolUser(id, '')
            return `Se ha borrado exitosamente el usuario ${deleteUser.displayName}`
        } catch (error) {
            return error
        }
    }

    async setRolUser(uid, type){
        try {
            const auth = getAuth(this.app)
            await auth.setCustomUserClaims(uid, {rol: type})
            return 'Se ha actualizado el rol del usuario correctamente.'
        } catch (error) {
            return error
        }   
    }

    async createToken(uid){
        const auth = getAuth(this.app)
        const TokenUser = await auth.createCustomToken(uid)
        console.log(TokenUser)
    }
}

// const newData = new FireBaseAdminSDK(config.firebaseSDK)
// await newData.createToken('IKBMlVhnyJYyhvlNgi38AMLYtj92')
// await newData.getAllUser()
// const result = await newData.saveUser({
//     email: "jossugames@gmail.com",
//     emailVerified: false,
//     password: "hola1234",
//     displayName: "Josue Mendez Diaz",
//     disable: false, 
// })
// console.log(result);
//const result = await newData.setRolUser('vNiQoTSasTY7RVpxsols8fD5ULr2', 'teacher')
// const result = await newData.getDataUser('XXeiZsqmpjOo4wcOANEMBNh098w2')