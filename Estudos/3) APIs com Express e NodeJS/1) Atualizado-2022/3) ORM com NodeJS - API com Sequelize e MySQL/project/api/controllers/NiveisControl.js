const database = require('../models');

class NiveisControl {

    static async listAll(req, res) {
        try {
          const listNivel = await database.Niveis.findAll()
          return res.status(200).json(listNivel)
        } catch (error) {
          return res.status(500).json(error.message);
        }
    }
    
    static async listId(req, res) {
        const { id } = req.params
        try {
            const onePeople = await database.Niveis.findOne( {where: { id: Number(id) }} )
            return res.status(200).json(onePeople)
        }
        catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async create(req, res) {
        const newNivel= req.body
        try {
            const createNewNivel = await database.Niveis.create(newNivel)
            return res.status(200).json(createNewNivel)
        } 
        catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async update(req, res) {
        const newInfo = req.body
        const { id } = req.params
        
        try {
            await database.Niveis.update(newInfo, { where: { id: Number(id) } })
            const updateNivel = await database.Niveis.findOne( {where: { id: Number(id) }} )
            return res.status(200).json(updateNivel)
        }
        catch(error) {
            return res.status(500).json(error.message)
        }

    }

    static async deleta(req, res) {
        const { id } = req.params

        try {
            await database.Niveis.destroy({ where: { id: Number(id) } })
            return res.status(200).json({ "message": "Deletado com sucesso!" })
        }
        catch(error){
            return res.status(500).json(error.message)
        }
    }
}

module.exports = NiveisControl;