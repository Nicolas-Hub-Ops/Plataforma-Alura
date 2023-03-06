const database = require('../models');

class PessoasControl {
    static async listAll(req, res) {
        try {
            const list = await database.Pessoas.findAll()
            return res.status(200).json(list)
        }
        catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async listId(req, res) {
        const { id } = req.params
        try {
            const onePeople = await database.Pessoas.findOne( {where: { id: Number(id) }} )
            return res.status(200).json(onePeople)
        }
        catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async create(req, res) {
        const newPeople = req.body
        try {
            const createNewPeople = await database.Pessoas.create(newPeople)
            return res.status(200).json(createNewPeople)
        } 
        catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async update(req, res) {
        const newInfo = req.body
        const { id } = req.params
        
        try {
            await database.Pessoas.update(newInfo, { where: { id: Number(id) } })
            const updatePeople = await database.Pessoas.findOne( {where: { id: Number(id) }} )
            return res.status(200).json(updatePeople)
        }
        catch(error) {
            return res.status(500).json(error.message)
        }

    }

    static async deleta(req, res) {
        const { id } = req.params

        try {
            await database.Pessoas.destroy({ where: { id: Number(id) } })
            return res.status(200).json({ "message": "Deletado com sucesso!" })
        }
        catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async listOneMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            const oneMatricula = await database.Matriculas.findOne( {where: { id: Number(matriculaId), estudante_id: Number(estudanteId) }} )
            return res.status(200).json(oneMatricula)
        }
        catch (error) {
            return res.status(500).json(error)
        }
    }

    static async createMatricula(req, res) {
        const { estudanteId } = req.params
        const newMatricula = { ...req.body, estudante_id: Number(estudanteId) }
        try {
            const createNewMatricula = await database.Matriculas.create(newMatricula)
            return res.status(200).json(createNewMatricula)
        } 
        catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async updateMatricula(req, res) {
        const newInfo = req.body
        const { estudanteId, matriculaId } = req.params
        
        try {
            await database.Matriculas.update(newInfo, {where: { id: Number(matriculaId), estudante_id: Number(estudanteId) }})
            const updateMatricula = await database.Matriculas.findOne( {where: { id: Number(matriculaId) }} )
            return res.status(200).json(updateMatricula)
        }
        catch(error) {
            return res.status(500).json(error.message)
        }

    }

    static async deletaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params

        try {
            await database.Matriculas.destroy({ where: { id: Number(matriculaId) } })
            return res.status(200).json({ "message": "Deletado com sucesso!" })
        }
        catch(error){
            return res.status(500).json(error.message)
        }
    }   
}

module.exports = PessoasControl;