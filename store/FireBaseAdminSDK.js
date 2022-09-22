import { initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { SendCustomVerificationEmail } from '../email/nodeMailer.js'

const appFirebase = initializeApp()

export class FireBaseAdminSDK {
    getFireStoreDatabase(){
        const db = getFirestore(appFirebase)
        return db
    }

    async saveNewStudent(name, data){
        try {
            if(name === 'Students'){
                const collectionRef = this.getFireStoreDatabase().collection(name)
                await collectionRef.add({
                    name_complete: data.name_complete,
                    date_birth: data.date_birth,
                    direction: data.direction,
                    gradeRef: this.getFireStoreDatabase().doc(`Grades/${data.gradeRef}`),
                    manager_name: data.manager_name,
                    manager_phone: data.manager_phone,
                    enable: data.enable
                })
                return 'Alumno Creado'
            }else {
                return 'Informacion Creada'
            }
        } catch (error) {
            return error
        }
    }

    async updateData(name, uid, data){
        try {
            if(name === 'Students'){
                await this.getFireStoreDatabase().collection(name).doc(uid).update({
                    name_complete: data.name_complete,
                    date_birth: data.date_birth,
                    direction: data.direction,
                    gradeRef: this.getFireStoreDatabase().doc(`Grades/${data.gradeRef}`),
                    manager_name: data.manager_name,
                    manager_phone: data.manager_phone,
                    enable: data.enable
                }, {merge: true})
                return 'Alumno Modificado Correctamente'
            }else {
                return 'Informacion Creada'
            }
        } catch (error) {
            return error
        }
    }

    async getOneData(name, uid){
        const cityRef = this.getFireStoreDatabase().collection(name).doc(uid);
        const doc = await cityRef.get();
        if (!doc.exists) {
            return 'No existe un almuno con esa información'
        } else {
            return doc.data()
        }
    }

    async deleteData(name, uid, data){
        try {
            if(name === 'Students'){
                await this.getFireStoreDatabase().collection(name).doc(uid).update({
                    enable: data.enable
                }, {merge: true})
                return 'Alumno Eliminado Correctamente'
            }else {
                return 'Eliminacion Creada'
            }
        } catch (error) {
            return error
        }
    }

    async saveUserFirestore(uid, data){
        await this.getFireStoreDatabase().collection('User').doc(uid).set(data)
    }

    async saveUser(data){
        try {
            const auth = getAuth(appFirebase)
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
            const auth = getAuth(appFirebase)
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
            const auth = getAuth(appFirebase)
            const data = await auth.getUser(id)
            const {uid, email, displayName, disabled, customClaims} = data
            return {uid, email, displayName, disabled, customClaims}
        } catch (error) {
            return error
        }
    }

    async updateUser(id, data){
        try {
            const auth = getAuth(appFirebase)
            const update = await auth.updateUser(id, data)
            return `Se actualizo la informacio para el Usuario ${update.displayName}`
        } catch (error) {
            return error
        }
    }

    async deleteUser(id){
        try {
            const auth = getAuth(appFirebase)
            const deleteUser = await auth.updateUser(id, {disabled: true})
            this.setRolUser(id, '')
            return `Se ha borrado exitosamente el usuario ${deleteUser.displayName}`
        } catch (error) {
            return error
        }
    }

    async getUserByEmail(email){
        const auth = getAuth(appFirebase)
        const result = await auth.getUserByEmail(email)
        const { displayName } = result
        return displayName
    }

    async setRolUser(uid, type){
        try {
            const auth = getAuth(appFirebase)
            await auth.setCustomUserClaims(uid, {rol: type})
            return 'Se ha actualizado el rol del usuario correctamente.'
        } catch (error) {
            return error
        }   
    }

    async generateResetPasswordLink(email){
        try {
            const newEmail = new SendCustomVerificationEmail()
            const auth = getAuth(appFirebase)
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

// const firebase = new FireBaseAdminSDK()
// const result = await firebase.getOneData('Students', 'nqMubJ2w4km87jCJGtf2')