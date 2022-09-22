import nodemailer from 'nodemailer'
import { config } from '../config/default.js'

export class SendCustomVerificationEmail {
    constructor(){
        this.info = {
            host: config.smtp.host,
            port: config.smtp.port,
            auth: {
                user: config.smtp.user,
                pass: config.smtp.pass,
            },
        }
        this.transporter = nodemailer.createTransport(this.info)
    }

    async mailVerification(){
        const yesorna = await this.transporter.verify()
        return yesorna
    }

    async sendEmail(infoEmail){
        if (this.mailVerification()) {
            await this.transporter.sendMail({
                from: '"Atenea Support" <jossugames@gmail.com>', // sender address
                to: infoEmail.to, // list of receivers
                subject: 'Restablece tu contraseña de Atenea App', // Subject line
                text: "There is a new article. It's about sending emails, check it out!", // plain text body
                html: `<p>Hola: ${infoEmail.name}</p>
                <p>Visita este vínculo para restablecer la contraseña de Atenea para tu cuenta de ${infoEmail.to}.</p>
                <p><a href='${infoEmail.link}'>${infoEmail.link}</a></p>
                <p>Si no solicitaste el restablecimiento de tu contraseña, puedes ignorar este correo electrónico.</p>
                <p>Gracias.</p>
                <p>El equipo de Atenea`, // html body
            })
            return 'Se ha enviado un link para crear nueva contraseña a su correo electronico.'
        }else {
            return 'Error. Por favor contactese con el soporte.'
        }
    }
}

// const newMail = new sendCustomVerificationEmail()
// const result = await newMail.sendEmail({
//     to: 'jmendezdd20@gmail.com',
//     subject: 'Reset your password'
// })

// console.log(result);