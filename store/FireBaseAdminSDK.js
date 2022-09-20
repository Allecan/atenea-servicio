import { initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { config } from '../config/default.js'
import { SendCustomVerificationEmail } from '../email/nodeMailer.js'


export class FireBaseAdminSDK {
    constructor(){
        this.app = initializeApp()
        this.database = getFirestore(this.app)
    }

    async saveUserFirestore(uid, data){
        await this.database.collection('User').doc(uid).set(data)
    }

    async saveUser(data){
        try {
            const auth = getAuth(this.app)
            const result = await auth.createUser(data)
            this.setRolUser(result.uid, '')
            await this.saveUserFirestore(result.uid, {displayName: result.displayName, email: result.email, phoneNumber: result.phoneNumber})
            return 'Usuario Guardado Correctamente'
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

    async getUserByEmail(email){
        const auth = getAuth(this.app)
        const result = await auth.getUserByEmail(email)
        const { displayName } = result
        return displayName
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

    async generateResetPasswordLink(email){
        try {
            const newEmail = new SendCustomVerificationEmail()
            const auth = getAuth(this.app)
            const result = await auth.generatePasswordResetLink(email)
            const nameuser = await this.getUserByEmail(email)
            const linkEmail = newEmail.sendEmail({
                to: email,
                name: nameuser,
                link: result
            })
            return linkEmail
        } catch (error) {
            return error
        }
    }
}
