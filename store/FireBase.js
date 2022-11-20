import { config } from '../config/default.js'
import { initializeApp } from 'firebase/app'
import { collection, getDocs, getFirestore, addDoc, updateDoc, doc, setDoc, deleteDoc, getDoc, query, where, orderBy } from 'firebase/firestore'

import { ControllerActivity } from "../api/Actividad/controller.js"
import { Activity } from "../models/Activity.js"

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
        const docsList = dataDocs.docs.map(doc => Object.assign(doc.data(), { id: doc.id }));
        return docsList;
    }

    async getLevels() {
        const levelsRef = collection(this.getDB(), "Levels");
        const levelsQuery = query(levelsRef, orderBy("position"))
        const levelsDocs = await getDocs(levelsQuery)
        const levels = levelsDocs.docs.map(doc => Object.assign(doc.data(), { id: doc.id }));
        return levels;
    }

    async getGrades(name) {
        const allData = collection(this.getDB(), name);
        const dataDocs = await getDocs(allData);
        const docsList = dataDocs.docs.map(doc => Object.assign(doc.data(), { id: doc.id }));
        let enabledData = []
        for (const grade of docsList) {
            if (grade.levelRef == undefined || grade.teacherRef == undefined || grade.enable == false) {
                continue
            }
            const levelDoc = await this.getDocByRef(grade.levelRef);
            const teacherDoc = await this.getDocByRef(grade.teacherRef);
            grade.levelRef = levelDoc
            grade.teacherRef = teacherDoc
            docsList[grade] = grade
            enabledData.push(grade)
        }
        // Proceso para ordenar la informacion de los grados segun su nivel y posicion
        let levels = await this.getLevels()
        let students = await this.getData('Students')
        for (const level of levels) {
            level.grades = []
            for (const data of enabledData) {
                if (data.levelRef.id == level.id) {
                    // Obtener la cantidad de estudiantes de un grado
                    let totalStudents = 0
                    for (const student of students) {
                        if (student.gradeRef._key.path.segments.at(-1) == data.id) {
                            totalStudents++
                        }
                    }
                    data.totalStudents = totalStudents
                    data.levelRef = data.levelRef.id
                    level.grades[data.position] = data
                }
            }
            // Proceso para eliminar los espacios en blanco que dejan los grados que estan deshabilitados
            let fixedGradesList = []
            for (const grade of level.grades) {
                if (grade != null) {
                    fixedGradesList.push(grade)
                }
            }
            level.grades = fixedGradesList
        }

        const response = levels
        return response;
    }

    async saveData(name, data) {
        // console.log(name, data)
        const docRef = await addDoc(collection(this.getDB(), name), data)
        return 'Data Save'
    }

    async saveArea(name, data) {
        // console.log(name, data)
        const docRef = await addDoc(collection(this.getDB(), name), data)

        // Proceso para crear las 4 unidades objetivas para cada unidad
        const areaRef = docRef.id
        const objectiveTest1 = {activity_name: "PRUEBA OBJETIVA", activity_value: 30, unit: 1, areaRef: areaRef, isTest: true}
        const objectiveTest2 = {activity_name: "PRUEBA OBJETIVA", activity_value: 30, unit: 2, areaRef: areaRef, isTest: true}
        const objectiveTest3 = {activity_name: "PRUEBA OBJETIVA", activity_value: 30, unit: 3, areaRef: areaRef, isTest: true}
        const objectiveTest4 = {activity_name: "PRUEBA OBJETIVA", activity_value: 30, unit: 4, areaRef: areaRef, isTest: true}
        const activityServices = new FireBase(config.fireBase)
        const activityController = new ControllerActivity(activityServices, Activity)
        await activityController.createNewActivity(objectiveTest1)
        await activityController.createNewActivity(objectiveTest2)
        await activityController.createNewActivity(objectiveTest3)
        await activityController.createNewActivity(objectiveTest4)

        return 'Data Save'
    }

    async saveGrade(name, data) {
        const allData = collection(this.getDB(), name);
        const dataDocs = await getDocs(allData);
        const docsList = dataDocs.docs.map(doc => doc.data());
        let pos = 0
        for (const elements of docsList) {
            if (elements.levelRef._key.path.segments.at(-1) == data.levelRef._key.path.segments.at(-1)) {
                pos++
            }
        }
        data.position = pos
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

    async updateGrade(name, id, data, oldData) {
        try {
            const docRef = doc(this.getDB(), name, id);

            if (oldData.position == undefined || oldData.levelRef == undefined || data.levelRef._key.path.segments.at(-1) != oldData.levelRef._key.path.segments.at(-1)) {
                //Se obtiene la lista de grados
                const gradesData = collection(this.getDB(), name);
                const gradesDocs = await getDocs(gradesData);
                const grades = gradesDocs.docs.map(doc => Object.assign(doc.data(), { id: doc.id }));

                //Al grado se le asigna la ultima posicion en su nuevo nivel, la variable pos se suma cada vez
                //que encuentra un grado con referencia al nuevo nivel del grado a actualizar
                let pos = 0
                for (const elements of grades) {
                    if (elements.levelRef != undefined && elements.levelRef._key.path.segments.at(-1) == data.levelRef._key.path.segments.at(-1)) {
                        pos++
                    }
                }
                data.position = pos

                //Si el antiguo modelo del grado no tenia referencia a ningun nivel, la siguiente parte se omite
                if (oldData.levelRef != undefined) {
                    //Los grados que estaban por delante del grado en su antiguo nivel se corren hacia atras
                    for (const elements of grades) {
                        if (elements.levelRef != undefined && elements.levelRef._key.path.segments.at(-1) == oldData.levelRef._key.path.segments.at(-1) && elements.position > oldData.position) {
                            elements.position--
                            const gradeRef = doc(this.getDB(), name, elements.id);
                            // se elimina el atributo id para que no se guarde junto con el grado con la posicion ya actualizada
                            delete elements.id
                            const gradeSnap = await updateDoc(gradeRef, elements);
                        }
                    }
                }
            }

            const docSnap = await updateDoc(docRef, data);

            return "Data Updated";
        } catch (error) {
            return error;
        }
    }

    async setData(name, id, data) {
        try {
            const db = this.getDB()
            const docSnap = await db.collection(name).doc(id).setDoc(data, { merge: true })
            return "Data Updated";
        } catch (error) {
            return error;
        }
    }
    async deleteData(name, id) {
        try {
            const docRef = doc(this.getDB(), name, id)
            const docSnap = await deleteDoc(docRef);
            return "Delete Data"
        } catch (error) {
            console.log("Error")
            return error
        }
    }
    async deleteGrade(name, id) {
        // Datos del grado que se va a eliminar
        const oldGradeRef = doc(this.getDB(), name, id)
        const oldGradeSnap = await getDoc(oldGradeRef);
        const oldGrade = oldGradeSnap.data()

        // Lista de los grados, la posicion de los grados que vayan despues de este grado, va a decrementar en 1
        const allData = collection(this.getDB(), name);
        const dataDocs = await getDocs(allData);
        const docsList = dataDocs.docs.map(doc => Object.assign(doc.data(), { id: doc.id }));

        for (const elements of docsList) {
            if (elements.levelRef._key.path.segments.at(-1) == oldGrade.levelRef._key.path.segments.at(-1) && elements.position > oldGrade.position) {
                elements.position--
                const gradeRef = doc(this.getDB(), name, elements.id);
                // se elimina el atributo id para que no se guarde junto con el grado con la posicion ya actualizada
                delete elements.id
                const gradeSnap = await updateDoc(gradeRef, elements);
            }
        }

        try {
            const docRef = doc(this.getDB(), name, id)
            const docSnap = await deleteDoc(docRef);
            return "Delete Data"
        } catch (error) {
            console.log("Error")
            return error
        }
    }
    async getOneData(name, id) {
        try {
            const docRef = doc(this.getDB(), name, id)
            const docSnap = await getDoc(docRef);
            const oneData = docSnap.data()

            if (oneData != undefined) {
                oneData.id = id
            }

            return oneData
        } catch (error) {
            return error
        }
    }

    async getOneGrade(name, id) {
        try {
            //Se obtiene el documento del grado
            const docRef = doc(this.getDB(), name, id)
            const docSnap = await getDoc(docRef);
            const oneData = docSnap.data()

            //Se obtiene el documento del docente en base a su referencia
            const teacherRef = oneData.teacherRef
            const teacherSnap = await getDoc(teacherRef);
            const teacherData = teacherSnap.data()

            //Se obtiene el documento del nivel en base a su referencia
            const levelRef = oneData.levelRef
            const levelSnap = await getDoc(levelRef);
            const levelData = levelSnap.data()

            //Se obtiene la lista de estudiantes del grado
            const studentsRef = collection(this.getDB(), "Students");
            const studentsQuery = query(studentsRef, where("gradeRef", "==", docRef))
            const studentsDocs = await getDocs(studentsQuery)
            const students = studentsDocs.docs.map(doc => Object.assign(doc.data(), { id: doc.id }));
            //Se elimina el campo de la referencia de los grados de cada estudiante
            for (const estudiante of students) {
                students[estudiante] = delete estudiante.gradeRef
            }

            //Se obtiene la lista de areas del grado
            const areasRef = collection(this.getDB(), "Areas");
            const areasQuery = query(areasRef, where("gradeRef", "==", docRef))
            const areasDocs = await getDocs(areasQuery)
            const areas = areasDocs.docs.map(doc => Object.assign(doc.data(), { id: doc.id }));
            //Se elimina el campo de la referencia de los grados de cada area
            for (const area of areas) {
                areas[area] = delete area.gradeRef
            }

            oneData.teacherRef = teacherData
            oneData.levelRef = levelData
            oneData.id = id
            oneData.students = students
            oneData.areas = areas

            // se organizan los datos a como fernando los pidio >:v


            return oneData
        } catch (error) {
            return error
        }
    }

    async getOneGradeDetailed(name, id) {
        try {
            //Se obtiene el documento del grado
            const docRef = doc(this.getDB(), name, id)
            const docSnap = await getDoc(docRef);
            const oneData = docSnap.data()

            //Se obtiene el documento del docente en base a su referencia
            const teacherRef = oneData.teacherRef
            const teacherSnap = await getDoc(teacherRef);
            const teacherData = teacherSnap.data()

            //Se obtiene el documento del nivel en base a su referencia
            const levelRef = oneData.levelRef
            const levelSnap = await getDoc(levelRef);
            const levelData = levelSnap.data()

            //Se obtienen las areas del grado
            const areasData = collection(this.getDB(), "Areas");
            const areasDocs = await getDocs(areasData);
            const areas = areasDocs.docs.map(doc => Object.assign(doc.data(), { id: doc.id }));
            let areasList = []
            for (const area of areas) {
                if (area.gradeRef._key.path.segments.at(-1) == id && area.enable == true) {
                    areasList.push(area)
                }
            }
            areasList.map(area => delete area.gradeRef)

            //Se obtienen las actividades de cada area
            const activitiesData = collection(this.getDB(), "Activities");
            const activitiesDocs = await getDocs(activitiesData);
            let activitiesList = activitiesDocs.docs.map(doc => Object.assign(doc.data(), { id: doc.id }));
            for (const area of areasList) {
                area.activities = {unit1: [], unit2: [], unit3: [], unit4: []}
                for (const activity of activitiesList) {
                    if (activity.areaRef != null && activity.areaRef._key.path.segments.at(-1) == area.id && activity.enable == true) {
                        let addedActivity = activity
                        delete addedActivity.areaRef
                        delete addedActivity.scores
                        let unit = "unit"+addedActivity.unit
                        area.activities[unit].push(activity)
                    }
                }
            }

            oneData.teacherRef = teacherData
            oneData.levelRef = levelData
            oneData.id = id
            oneData.areas = areasList

            // se organizan los datos a como fernando los pidio >:v


            return oneData
        } catch (error) {
            return error
        }
    }

    async getDocRef(name, id) {
        const docRef = doc(this.getDB(), name, id)
        return docRef
    }

    async getDocByRef(docRef) {
        const docSnap = await getDoc(docRef);
        const oneData = docSnap.data()
        oneData.id = docSnap.id
        return oneData
    }

    async addGradesToTeacher(name, id, data, oldGrades) {
        try {
            const docRef = doc(this.getDB(), name, id);
            for (const grade of data.gradesList) {
                const gradeRef = doc(this.getDB(), "Grades", grade)
                oldGrades.push(gradeRef)
            }
            data.gradesList = oldGrades
            const docSnap = await updateDoc(docRef, data);
            return "Data Updated";
        } catch (error) {
            return error;
        }
    }
    async deleteGradesToTeacher(name, id, gradeId, data) {
        try {
            const docRef = doc(this.getDB(), name, id);
            const newGradesList = []
            var gradeFinded = false
            for (const grade of data.gradesList) {
                if (grade._key.path.segments[6] != gradeId) {
                    newGradesList.push(grade)
                } else {
                    gradeFinded = true
                }
            }
            data.gradesList = newGradesList

            if (gradeFinded) {
                const docSnap = await updateDoc(docRef, data);
                return "Grade Removed";
            } else {
                return "No se ha encontrado el grado ingresado"
            }

        } catch (error) {
            return error;
        }
    }
}

// const newFireBase = new FireBase(config.fireBase)
// const result = newFireBase.getDB()
// console.log(result);

