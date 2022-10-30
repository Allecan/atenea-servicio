import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { SendCustomVerificationEmail } from "../email/nodeMailer.js";

const appFirebase = initializeApp({
  credential: cert(JSON.parse(process.env.FIREBASE_ADMIN_SDK_CONFIG)),
});

export class FireBaseAdminSDK {
  getFireStoreDatabase() {
    const db = getFirestore(appFirebase);
    return db;
  }

  async getAllStudentsEnable() {
    const grades = [
      "F4537f0syHtPiMoUXWTC",
      "RTx9zOnTYhY2WEryDgsK",
      "ivli0dl1dneP7az5uL12",
      "UCayKbzRghLfrbgx8qBM",
      "rGo2rjlpgkZUfnVjmZhu",
      "CSK8sQa9XG5tVHhjz1Il",
      "jPFMpu7oTalTrsPwTWOL",
      "1sabonHrVsMMqRIsHFEy",
      "4ipYcYTWIx9IlnS11tmh",
    ];
    const preschool = {
      preKinder: { size: null, data: [] },
      kinder: { size: null, data: [] },
      parvulos: { size: null, data: [] },
    };
    const primary = {
      primero: { size: null, data: [] },
      segundo: { size: null, data: [] },
      tercero: { size: null, data: [] },
      cuarto: { size: null, data: [] },
      quinto: { size: null, data: [] },
      sexto: { size: null, data: [] },
    };
    const studentObject = { prePrimaria: preschool, primaria: primary };
    try {
      for (let index = 0; index < grades.length; index++) {
        const gradeRef = this.getFireStoreDatabase()
          .collection("Grades")
          .doc(grades[index]);
        const snapshot = await this.getFireStoreDatabase()
          .collection("Students")
          .where("gradeRef", "==", gradeRef)
          .where("enable", "==", true)
          .get();
        snapshot.forEach((doc) => {
          switch (index) {
            case 0:
              preschool.preKinder.data.push({
                uid: doc.id,
                name: doc.data().name_complete,
              });
              preschool.preKinder.size = preschool.preKinder.data.length;
              break;
            case 1:
              preschool.kinder.data.push({
                uid: doc.id,
                name: doc.data().name_complete,
              });
              preschool.kinder.size = preschool.kinder.data.length;
              break;
            case 2:
              preschool.parvulos.data.push({
                uid: doc.id,
                name: doc.data().name_complete,
              });
              preschool.parvulos.size = preschool.parvulos.data.length;
              break;
            case 3:
              primary.primero.data.push({
                uid: doc.id,
                name: doc.data().name_complete,
              });
              primary.primero.size = primary.primero.data.length;
              break;
            case 4:
              primary.segundo.data.push({
                uid: doc.id,
                name: doc.data().name_complete,
              });
              primary.segundo.size = primary.segundo.data.length;
              break;
            case 5:
              primary.tercero.data.push({
                uid: doc.id,
                name: doc.data().name_complete,
              });
              primary.tercero.size = primary.tercero.data.length;
              break;
            case 6:
              primary.cuarto.data.push({
                uid: doc.id,
                name: doc.data().name_complete,
              });
              primary.cuarto.size = primary.cuarto.data.length;
              break;
            case 7:
              primary.quinto.data.push({
                uid: doc.id,
                name: doc.data().name_complete,
              });
              primary.quinto.size = primary.quinto.data.length;
              break;
            case 8:
              primary.sexto.data.push({
                uid: doc.id,
                name: doc.data().name_complete,
              });
              primary.sexto.size = primary.sexto.data.length;
              break;
            default:
              break;
          }
        });
      }
      return studentObject;
    } catch (error) {
      return error;
    }
  }

  async getEnableStudentsByGrade(idGrade) {
    try {
      const usersObject = { size: null, students: [] };
      const gradeRef = this.getFireStoreDatabase()
        .collection("Grades")
        .doc(idGrade);
      const snapshot = await this.getFireStoreDatabase()
        .collection("Students")
        .where("gradeRef", "==", gradeRef)
        .where("enable", "==", true)
        .get();
      snapshot.forEach((doc) => {
        usersObject.students.push({
          id: doc.id,
          name_student: doc.data().name_complete,
        });
      });
      usersObject.size = usersObject.students.length;
      return usersObject;
    } catch (error) {
      return error;
    }
  }

  async saveNewStudent(name, data) {
    try {
      if (name === "Students") {
        try {
          const collectionRef = this.getFireStoreDatabase().collection(name);
          await collectionRef.add({
            name_complete: data.name_complete,
            date_birth: data.date_birth,
            direction: data.direction,
            gradeRef: this.getFireStoreDatabase().doc(
              `Grades/${data.gradeRef}`
            ),
            manager_name: data.manager_name,
            manager_phone: data.manager_phone,
            enable: data.enable,
          });
          return "Alumno Creado Correctamente";
        } catch (error) {
          return `Error. Por favor intente mas tarde. ${error}`;
        }
      } else if (name === "Attendence") {
        try {
          const arrayStudents = [];
          data.students.forEach((value) => {
            arrayStudents.push({
              student: this.getFireStoreDatabase().doc(
                `Students/${value.student}`
              ),
              attendence: value.attendence,
            });
          });
          const collectionRef = this.getFireStoreDatabase().collection(name);
          await collectionRef.add({
            date: data.date,
            gradeRef: this.getFireStoreDatabase().doc(
              `Grades/${data.gradeRef}`
            ),
            students: arrayStudents,
          });
          return "Asistencia Confirmada";
        } catch (error) {
          return `Error. Por favor intente mas tarde. ${error}`;
        }
      }
    } catch (error) {
      return error;
    }
  }

  async updateData(name, uid, data) {
    try {
      if (name === "Students") {
        await this.getFireStoreDatabase()
          .collection(name)
          .doc(uid)
          .update({
            name_complete: data.name_complete,
            date_birth: data.date_birth,
            direction: data.direction,
            gradeRef: this.getFireStoreDatabase().doc(
              `Grades/${data.gradeRef}`
            ),
            manager_name: data.manager_name,
            manager_phone: data.manager_phone,
            enable: data.enable,
          });
        return "Alumno Modificado Correctamente";
      } else {
        return "Informacion Creada";
      }
    } catch (error) {
      return error;
    }
  }

  async getOneData(name, uid) {
    const studentRef = this.getFireStoreDatabase().collection(name).doc(uid);
    const doc = await studentRef.get();
    if (!doc.exists) {
      return "No existe un almuno con esa información";
    } else {
      return {
        name_complete: doc.data().name_complete,
        date_birth: `${doc.data().date_birth} - ${
          new Date().getFullYear() -
          parseInt(doc.data().date_birth.substr(6, 4))
        } años`,
        direction: doc.data().direction,
        gradeRef: await (
          await this.getFireStoreDatabase()
            .collection("Grades")
            .doc(doc.data().gradeRef._path.segments[1])
            .get()
        ).data().grade_name,
        manager_name: doc.data().manager_name,
        manager_phone: doc.data().manager_phone,
      };
    }
  }

  async getOneDataU(name, uid) {
    const dataRef = this.getFireStoreDatabase().collection(name).doc(uid);
    const doc = await dataRef.get();
    const data = doc.data();
    if (data != undefined) {
      data.id = doc.id;
    }
    return data;
  }

  async getDataU(name) {
    const snapshot = await this.getFireStoreDatabase().collection(name).get();
    const dataList = [];
    snapshot.forEach((doc) =>
      dataList.push(Object.assign(doc.data(), { id: doc.id }))
    );
    return dataList;
  }

  async deleteData(name, uid, enable) {
    try {
      if (name === "Students") {
        await this.getFireStoreDatabase().collection(name).doc(uid).update({
          enable: enable,
        });
        return "Alumno Eliminado Correctamente";
      } else {
        return "Eliminacion Creada";
      }
    } catch (error) {
      return error;
    }
  }

  async saveUserFirestore(uid, data) {
    await this.getFireStoreDatabase().collection("User").doc(uid).set(data);
  }

  async saveUser(data) {
    try {
      const auth = getAuth(appFirebase);
      const result = await auth.createUser(data);
      this.setRolUser(result.uid, "");
      const date = new Date();
      const today = this.dateToSpanish(date);
      const time =
        ("0" + date.getHours()).slice(-2) +
        ":" +
        ("0" + date.getMinutes()).slice(-2);
      await this.saveUserFirestore(result.uid, {
        displayName: result.displayName,
        email: result.email,
        phoneNumber: "",
        createdAt: today + " a las " + time,
        enable: true,
      });
      return "Usuario Guardado Correctamente";
    } catch (error) {
      return error.message;
    }
  }

  async getAllUser() {
    const usersObject = {
      newUsers: { size: null, data: [] },
      activeUsers: { size: null, data: [] },
      inactiveUsers: { size: null, data: [] },
    };
    try {
      const auth = getAuth(appFirebase);
      const users = await auth.listUsers();
      for (let i = 0; i < users.users.length; i++) {
        const user = users.users[i];
        if (user.customClaims.rol === "") {
          const { uid, displayName, tokensValidAfterTime } = user;
          usersObject.newUsers.data.push({
            uid,
            displayName,
            date: this.dateToSpanish(tokensValidAfterTime),
          });
        }
        if (
          user.customClaims.rol === "admin" ||
          user.customClaims.rol === "director" ||
          user.customClaims.rol === "docente"
        ) {
          const { uid, displayName } = user;
          usersObject.activeUsers.data.push({ uid, displayName });
        }
        if (user.disabled === true) {
          const { uid, displayName } = user;
          usersObject.inactiveUsers.data.push({ uid, displayName });
        }
      }
      usersObject.newUsers.size = usersObject.newUsers.data.length;
      usersObject.activeUsers.size = usersObject.activeUsers.data.length;
      usersObject.inactiveUsers.size = usersObject.inactiveUsers.data.length;
      return usersObject;
    } catch (error) {
      return error;
    }
  }

  async getDataUser(id) {
    try {
      const auth = getAuth(appFirebase);
      const data = await auth.getUser(id);
      const {
        uid,
        email,
        displayName,
        disabled,
        customClaims,
        phoneNumber,
        tokensValidAfterTime,
      } = data;
      return {
        uid,
        email,
        displayName,
        disabled,
        customClaims,
        phoneNumber,
        date: this.dateToSpanish(tokensValidAfterTime),
      };
    } catch (error) {
      return error;
    }
  }

  async updateUser(id, data) {
    try {
      const auth = getAuth(appFirebase);
      const update = await auth.updateUser(id, data);
      await this.getFireStoreDatabase()
        .collection("User")
        .doc(id)
        .update({
          displayName: data.displayName,
          email: data.email,
          phoneNumber: data.phoneNumber || "",
        });
      return `Se actualizo la informacio para el Usuario ${update.displayName}`;
    } catch (error) {
      return error;
    }
  }

  async enableTeacher(id) {
    const auth = getAuth(appFirebase);
    const deleteUser = await auth.updateUser(id, { disabled: false });
    await this.getFireStoreDatabase()
      .collection("User")
      .doc(id)
      .update({ enable: true });
    return `Se habilito al docente`;
  }

  async disableTeacher(id) {
    const auth = getAuth(appFirebase);
    const deleteUser = await auth.updateUser(id, { disabled: true });
    await this.getFireStoreDatabase()
      .collection("User")
      .doc(id)
      .update({ enable: false });
    return `Se desabilito al docente`;
  }

  async deleteUser(id, state) {
    try {
      let msg = "";
      const auth = getAuth(appFirebase);
      const deleteUser = await auth.updateUser(id, { disabled: state });
      state === true ? (msg = "deshabilitado") : (msg = "habilitado");
      await this.getFireStoreDatabase()
        .collection("User")
        .doc(id)
        .update({ enable: false });
      return `Se ha ${msg} exitosamente el usuario ${deleteUser.displayName}`;
    } catch (error) {
      return error;
    }
  }

  async getUserByEmail(email) {
    const auth = getAuth(appFirebase);
    const result = await auth.getUserByEmail(email);
    const { displayName } = result;
    return displayName;
  }

  async setRolUser(uid, type) {
    try {
      if (
        type != "docente" &&
        type != "admin" &&
        type != "director" &&
        type != ""
      ) {
        throw "Solo se permiten los roles de docente, director o admin";
      }
      const auth = getAuth(appFirebase);
      await auth.setCustomUserClaims(uid, { rol: type });
      await this.getFireStoreDatabase()
        .collection("User")
        .doc(uid)
        .update({ rol: type });
      return "Se ha actualizado el rol del usuario correctamente.";
    } catch (error) {
      return error;
    }
  }

  async generateResetPasswordLink(email) {
    try {
      const newEmail = new SendCustomVerificationEmail();
      const auth = getAuth(appFirebase);
      const result = await auth.generatePasswordResetLink(email);
      const nameuser = await this.getUserByEmail(email);
      const linkEmail = newEmail.sendEmail({
        to: email,
        name: nameuser,
        link: result,
      });
      return linkEmail;
    } catch (error) {
      return error;
    }
  }

  async getCoursesByTeacher(id) {
    let arrayData = [];
    let data = {};
    let count = 1;
    const userRef = this.getFireStoreDatabase().collection("User").doc(id);
    const citiesRef = this.getFireStoreDatabase().collection("Grades");
    const snapshot = await citiesRef.where("teacherRef", "==", userRef).get();
    for (let index = 0; index < snapshot.size; index++) {
      arrayData.push(
        (data[`grade${index + 1}`] = { grade_name: "", size: 0, students: [] })
      );
    }
    if (snapshot.empty) {
      return "No hay grados a cargo del docente por el momento";
    }
    const array = [];
    snapshot.forEach((doc) => {
      array.push(doc.id);
      data[`grade${count}`].grade_name = doc.data().grade_name;
      count++;
    });
    count = 1;
    for (const child of array) {
      const result = await this.getEnableStudentsByGrade(child);
      data[`grade${count}`].size = result.size;
      data[`grade${count}`].students = result.students;
      count++;
    }
    return arrayData;
  }

  dateToSpanish(string) {
    const meses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    const data = new Date(string);
    const date =
      data.getDate() +
      " de " +
      meses[data.getMonth()] +
      " de " +
      data.getUTCFullYear();
    return date;
  }
}

// const firebase = new FireBaseAdminSDK()
// const result = await firebase.getAllUser()
