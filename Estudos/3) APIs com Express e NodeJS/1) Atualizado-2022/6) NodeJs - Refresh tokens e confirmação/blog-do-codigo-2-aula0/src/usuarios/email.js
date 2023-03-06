const nodemailer = require('nodemailer')

const configurateProd = {
    host: process.env.EMAIL_HOST,
    auth: {
        user: process.env.EMAIL_USUARIO,
        pass: process.env.EMAIL_SENHA
    },
    secure: true
};

const configurateDev = (testAccount) => ({
    host: 'smtp.ethereal.email',
    auth: testAccount
});


async function configuration() {
    if(process.env.NODE_ENV === 'production') {
        return configurateProd;
    } else {
        const testAccount = await nodemailer.createTestAccount();
        return configurateDev(testAccount);
    }
};

class Email {
    async enviaEmail() {
        const transporter = nodemailer.createTransport(configuration);
        const info = await transporter.sendMail(this)
    
        console.log(`URL criada: ${nodemailer.getTestMessageUrl(info)}`)
    };
};

class EmailVerificacao extends Email {
    constructor(usuario, url) {
        super();
        this.from = `"Blog do Código" <noreply@blogdocodigo.com.br>`;
        this.to = usuario.email;
        this.subject = `Verificação de e-mail`;
        this.text = `Olá! Verifique seu e-mail aqui: ${url}`;
        this.html = `<h1>Olá!</h1> <p>Verifique seu e-mail <a href="${url}">${url}</a></p> `;
    };
};


module.exports = { EmailVerificacao }