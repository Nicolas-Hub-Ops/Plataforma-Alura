import images from "../models/Images.js";

class imagesController {

    static list = (req, res) => {
        images.find((err, sucess) => {
            if(err){
                res.status(500).send({ERROR: ` (Não foi possível listar itens) ==> ${err.message}`})
            }else{
                res.status(200).json(sucess)
            }
        })
    }

    static listId = (req, res) => {
        const id = req.params.id;

        images.findById(id, (err, images) => {
            if(err) {
                res.status(400).send({ERROR: `(Não foi possível encontrar ID) ==> ${err.message}`})
            } else{
                res.status(200).send(images);
            }
        })
    }

    static register = (req, res) => {
        let model = new images(req.body);

        model.save((err) => {
            if(err) {
                res.status(500).send({ERROR: `(Não foi possível cadastrar) ==> ${err.message} `})
            } else{
                res.status(201).send(model.toJSON())
            }
        })
    }

    static update = (req, res) => {
        const id = req.params.id;

        images.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err){
                res.status(200).send({message: 'Atualizado com sucesso'})
            } else {
                res.status(500).send({ERROR: ` (Não foi possível encontrar ID) ==> ${err.message} `})
            }
        })
    }

    static remove = (req, res) => {
        const id = req.params.id;

        images.findByIdAndDelete(id, (err) => {
            if(!err){
                res.status(200).send({message: 'Deletado com sucesso'})
            } else {
                res.status(500).send({ERROR: ` (Não foi possível encontrar ID) ==> ${err.message} `})
            }
        })
    }
}


export default imagesController;

