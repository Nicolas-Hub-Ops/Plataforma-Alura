const database = require('../models');

class TurmaControl {
    static async listAll(req, res) {
        try {
          const listTurmas = await database.Turmas.findAll()
          return res.status(200).json(listTurmas)
        } catch (error) {
          return res.status(500).json(error.message);
        }
    }
    
    static async listId(req, res) {
        const { id } = req.params
        try {
            const onePeople = await database.Turmas.findOne( {where: { id: Number(id) }} )
            return res.status(200).json(onePeople)
        }
        catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async create(req, res) {
        const newTurma = req.body
        try {
            const createNewTurma = await database.Turmas.create(newTurma)
            return res.status(200).json(createNewTurma)
        } 
        catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async update(req, res) {
        const newInfo = req.body
        const { id } = req.params
        
        try {
            await database.Turmas.update(newInfo, { where: { id: Number(id) } })
            const updateTurma = await database.Turmas.findOne( {where: { id: Number(id) }} )
            return res.status(200).json(updateTurma)
        }
        catch(error) {
            return res.status(500).json(error.message)
        }

    }

    static async deleta(req, res) {
        const { id } = req.params

        try {
            await database.Turmas.destroy({ where: { id: Number(id) } })
            return res.status(200).json({ "message": "Deletado com sucesso!" })
        }
        catch(error){
            return res.status(500).json(error.message)
        }
    }
}


module.exports = TurmaControl;