const { InvalidArgumentError } = require('../erros')
const crypto = require('crypto');
const moment = require('moment');
const jwt = require('jsonwebtoken');

const allowlistRefreshToken = require('../../redis/allowlist-refresh-token');
const blocklistAccessToken = require('../../redis/blocklist-access-token');



function criaTokenJWT(id, [Qtemp, Utemp]) {
    const payload = { id };
    const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: Qtemp + Utemp});
    return token;
};

async function verificaJWT(token, blocklist, name) {
    if(!blocklist) {
        return;
    }
    await verificaTokenNaBlocklist(token, blocklist, name);
    const { id } = jwt.verify(token, process.env.CHAVE_JWT);
    return id;
};

async function verificaTokenNaBlocklist(token, blocklist, name) {
    const tokenNaBlocklist = await blocklist.contemToken(token);
    if (tokenNaBlocklist) {
        throw new jwt.JsonWebTokenError(`${name} inválido por logout!`);
    }
};

async function invalidaJWT(token, blocklist) {
    return blocklist.adiciona(token);
}


async function criaRefreshToken(id, [Qtemp, Utemp], allowlist) {
    const refreshToken = crypto.randomBytes(24).toString('hex');
    const expiration = moment().add(Qtemp, Utemp).unix();
    await allowlist.adiciona(refreshToken, id, expiration);
    return refreshToken;
};

function verificaTokenValido(id, name) {
    if (!id) {
        throw new InvalidArgumentError(`${name} inválido !`);
    }
};

function verificaTokenEnviado(token, name) {
    if (!token) {
        throw new InvalidArgumentError(`${name} não enviado !`);
    }
};

async function verificaRefresh(token, allowlist, name) {
    verificaTokenEnviado(token, name);
    const id = await allowlist.buscaValor(token)
    verificaTokenValido(id, name);
    return id;
};

async function invalidaRefresh(token, allowlist) {
    await allowlist.deleta(token)
};

module.exports = {
    access: {
        expiration: [15, 'm'],  
        list: blocklistAccessToken, 
        name: 'Access Token',

        cria(id) {
            return criaTokenJWT(id, this.expiration, this.name)
        },

        verifica(token) {
            return verificaJWT(token, this.list, this.name);
        },

        invalida(token) {
            return invalidaJWT(token, this.list);
        }
    }, 

    refresh: {
        expiration: [5, 'd'],
        list: allowlistRefreshToken,
        name: 'Refresh Token',

        cria(id) {
            return criaRefreshToken(id, this.expiration, this.list)
        },

        verifica(token) {
            return verificaRefresh(token, this.list, this.name);
        },

        invalida(token) {
            return invalidaRefresh(token, this.list)
        }
    },

    email: {
        name: 'Verificação de e-mails',
        expiration: [1, 'h'],
        
        cria(id) {
            return criaTokenJWT(id, this.expiration);
        },

        verifica(token) {
            return verificaJWT(token, this.name);
        }
    }
}
