const ClientModel = require('../models/Clients');
const path = require('path');
const fs = require('fs');

class controllerClient {
    static listClients = async (req, res) => { 
        const clientModel = await ClientModel.find();
        return res.json(clientModel);
    };

    static listClientId = async (req, res) => {
        const id = req.params.id;
        ClientModel.findById(id, (err, response) => {
            if(err) {
                res.status(500).send({error: err.message})
            } else {
                res.status(200).send(response)
            }
        })
    };

    static createClient = async (req, res) => {
        const clientModel = await ClientModel.create({
            Foto: `${req.file.filename}`,
            Nome: req.body.nome,
            Email: req.body.email,
            Telefone: req.body.telefone,
            CPF: req.body.CPF,
            País: req.body.país,
            Estado: req.body.estado,
            Endereco: req.body.endereco,
            EstadoCivil: req.body.estadoCivil
        })
        return res.json(clientModel);
    };

    static updateClient = async (req, res) => {
        const id = req.params.id;
        if(req.file) {
            
            const clientModel = await ClientModel.findById(req.params.id);
            
            fs.unlinkSync(path.resolve(__dirname, "..", "..", 'tmp', 'photos', clientModel.Foto));

            ClientModel.findByIdAndUpdate(id, {
                Foto: `${req.file.filename}`,
                $set: req.body,
            }, (err) => {
                if(!err) {
                    res.status(202).send({message: 'Atualizado com sucesso'})
                } else {
                    res.status(500).send({ERROR: `Não foi possivel atualizar o id => ${id}`})
                }
            })
        } else {
            ClientModel.findByIdAndUpdate(id, {$set: req.body,}, (err) => {
                if(!err) {
                    res.status(202).send({message: 'Atualizado com sucesso'})
                } else {
                    res.status(500).send({ERROR: `Não foi possivel atualizar o id => ${id}`})
                }
            })
        }

    }

    static deleteClient = async (req, res) => {
        const clientModel = await ClientModel.findById(req.params.id);

        fs.unlinkSync(path.resolve(__dirname, "..", "..", 'tmp', 'photos', clientModel.Foto));

        await clientModel.remove();
        return res.send({message: "Dados e imagem deletados com sucesso!"});
    }
}


module.exports = controllerClient;