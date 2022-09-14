import nodemailer from 'nodemailer'


export class SendCustomVerificationEmail {
    constructor(){
        this.info = {
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: 'jossugames@gmail.com',
                pass: 'uzsihiwjxrzdhull',
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
            return 'Email Verificacion Not Valid'
        }
    }
}

// const newMail = new sendCustomVerificationEmail()
// const result = await newMail.sendEmail({
//     to: 'jmendezdd20@gmail.com',
//     subject: 'Reset your password'
// })

// console.log(result);