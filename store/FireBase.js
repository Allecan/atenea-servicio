import { config } from '../config/default.js'
import { initializeApp } from 'firebase/app'
import { collection, getDocs, getFirestore, addDoc, updateDoc, doc, setDoc, deleteDoc,getDoc } from 'firebase/firestore'

export class FireBase {
    constructor(config) {
        //console.log(config)
        this._firebaseConfig = {
            apiKey: config.apiKey,
            authDomain: config.authDomain,
            databaseURL: config.databaseURL,
            projectId: config.projectId,
            storageBucket: config.storageBucket,
            messagingSenderId: config.messagingSenderId,
            appId: config.appId,
        }
    }

    appInitialize() {
        const app = initializeApp(this._firebaseConfig)
        return app
    }

    getDB() {
        const app = this.appInitialize()
        const db = getFirestore(app)
        return db
    }

    async getData(name) {
        const allData = collection(this.getDB(), name);
        const dataDocs = await getDocs(allData);
        const docsList = dataDocs.docs.map(doc => doc.data());
        return docsList;
    }

    async saveData(name, data) {
        console.log(name,data)
        const docRef = await addDoc(collection(this.getDB(), name), data)
        return 'Data Save'
    }

    async updateData(name, id, data) {
        try {
            const docRef = doc(this.getDB(), name, id);
            const docSnap = await updateDoc(docRef, data);
            return "Data Updated";
        } catch (error) {
            return error;
        }
    }
    async setData(name,id,data){
        try {
            const db = this.getDB()
            const docSnap = await db.collection(name).doc(id).setDoc(data,{merge:true})
            return "Data Updated";
        } catch (error) {
            return error;
        }
    }
    async deleteData(name,id){
        try {
         const docRef = doc(this.getDB(), name, id)
         const docSnap = await deleteDoc(docRef);
          return "Delete Data"
        } catch (error) {
            console.log("Error")
            return error
        }
    }
    async getOneData(name,id){
        try {
         const docRef = doc(this.getDB(), name, id)
         const docSnap = await getDoc(docRef);
         const oneData = docSnap.data()
         return oneData
        } catch (error) {
            return error
        }
    }
}

// const newFireBase = new FireBase(config.fireBase)
// const result = newFireBase.getDB()
// console.log(result);

