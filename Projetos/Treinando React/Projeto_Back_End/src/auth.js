const LocalStrategy = require('passport-local').Strategy;
const AdminModel = require('./models/Admins');
const bcrypt = require('bcrypt');



module.exports = function authenticate(passport) {
    // Config Passport

    passport.use(
        new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            session: false
        }, (username, password, done) => {
            try {
                AdminModel.find({'Username': username}, (error, success) => {
                    if(error) {
                        throw new Error(error)
                    } else {
                        if(success.length === 0) {
                            console.log('Não existe administrador com esse USERNAME')
                            done('Não existe administrador com esse username', false)
                        } else {
                            const validPassword = bcrypt.compareSync(password, success[0].Password);
                            if(!validPassword) {
                                console.log('USERNAME ou PASSWORD inválidos')
                                done('Username ou Password inválidos', false)
                            } else {
                                return done(null, true, console.log('Autenticação realizada com sucesso'))
                            }
                        }
                    }
                })
            } catch (error) {
                return done(error, false);
            }        
        })
    )
}