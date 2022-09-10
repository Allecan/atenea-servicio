import { config } from '../config/default.js'
import { initializeApp } from 'firebase/app'
import { collection, getDocs, getFirestore, addDoc} from 'firebase/firestore'

export class FireBase {
    constructor(config){
        this._firebaseConfig = {
            apiKey: config.apiKey,
            authDomain: config.authDomain,
            projectId: config.projectId,
            storageBucket: config.storageBucket,
            messagingSenderId: config.messagingSenderId,
            appId: config.appId,
            measurementId: config.measurementId
        }
    }

    appInitialize(){
       const app = initializeApp(this._firebaseConfig)
       return app 
    }

    getDB(){
        const app = this.appInitialize()
        const db = getFirestore(app)
        return db
    }

    async getData(name){
        const allData = collection(this.getDB(), name);
        const dataDocs = await getDocs(allData);
        const docsList = dataDocs.docs.map(doc => doc.data());
        return docsList;
    }

    async saveData(name, data){
        const docRef = await addDoc(collection(this.getDB(), name), data)
        return 'Data Save'
    }
}

// const newFireBase = new FireBase(config.fireBase)
// const result = newFireBase.getDB()
// console.log(result);

