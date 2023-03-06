import album from "../models/Album.js";
//import { fsImages } from "../upload/upload.js";


class albumController {

    static list = (req, res) => {
        album.find()
        .populate("imgs")
        .exec((err, sucess) => {
            if(err) {
                res.status(500).send({ERROR: `(Não foi possível listar itens) ==> ${err.message}`})
            }else {
                res.status(200).json(sucess)
            }
        })
    }

    //static listFilter = (req, res) => {
    //    const filter = req.params.filter;
    //    const fabricante = req.query.fabricante
    //
    //    album.find({filter: filter}, (err, success) => {
    //        res.status(200).send(success);
    //    })
    //}

    static listId = (req, res) => {
        const id = req.params.id;

        album.findById(id, (err, album) => {
            if(err) {
                res.status(400).send({ERROR: `(Não foi possível encontrar ID) ==> ${err.message}`})
            } else{
                res.status(200).send(album);
            }
        })
    }

    static register = (req, res) => {
        let model = new album(req.body);

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

        album.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err){
                res.status(200).send({message: 'Atualizado com sucesso'})
            } else {
                res.status(500).send({ERROR: ` (Não foi possível encontrar ID) ==> ${err.message} `})
            }
        })
    }

    static remove = (req, res) => {
        const id = req.params.id;

        album.findByIdAndDelete(id, (err) => {
            if(!err){
                res.status(200).send({message: 'Deletado com sucesso'})
            } else {
                res.status(500).send({ERROR: ` (Não foi possível encontrar ID) ==> ${err.message} `})
            }
        })
    }
}


export default albumController;

