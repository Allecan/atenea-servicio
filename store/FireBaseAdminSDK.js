import { initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { config } from '../config/default.js'
import { SendCustomVerificationEmail } from '../email/nodeMailer.js'


export class FireBaseAdminSDK {
    constructor(){
        this.app = initializeApp()
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

// const newData = new FireBaseAdminSDK(config.firebaseSDK)
// const result = await newData.generateResetPasswordLink('jossugames@gmail.com')
// console.log(result)
// const result = await newData.generateResetPasswordLink('admin@gmail.com')
// console.log(result)
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