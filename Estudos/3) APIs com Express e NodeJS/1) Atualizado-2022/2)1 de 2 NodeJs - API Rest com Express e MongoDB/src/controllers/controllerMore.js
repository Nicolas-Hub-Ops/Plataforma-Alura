import more from "../models/More.js";

class moreController {

    static listMore = (req, res) => {
        more.find((err, sucess) => {
            if(err){
                res.status(500).send({ERROR: ` (Não foi possível listar itens) ==> ${err.message}`})
            }else{
                res.status(200).json(sucess)
            }
        })
    }

    static listIdMore = (req, res) => {
        const id = req.params.id;

        more.findById(id, (err, more) => {
            if(err) {
                res.status(400).send({ERROR: `(Não foi possível encontrar ID) ==> ${err.message}`})
            } else{
                res.status(200).send(more);
            }
        })
    }

    static registerMore = (req, res) => {
        let model = new more(req.body);

        model.save((err) => {
            if(err) {
                res.status(500).send({ERROR: `(Não foi possível cadastrar) ==> ${err.message} `})
            } else{
                res.status(201).send(model.toJSON())
            }
        })
    }

    static updateMore = (req, res) => {
        const id = req.params.id;

        more.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err){
                res.status(200).send({message: 'Atualizado com sucesso'})
            } else {
                res.status(500).send({ERROR: ` (Não foi possível encontrar ID) ==> ${err.message} `})
            }
        })
    }

    static removeMore = (req, res) => {
        const id = req.params.id;

        more.findByIdAndDelete(id, (err) => {
            if(!err){
                res.status(200).send({message: 'Deletado com sucesso'})
            } else {
                res.status(500).send({ERROR: ` (Não foi possível encontrar ID) ==> ${err.message} `})
            }
        })
    }
}


export default moreController;

