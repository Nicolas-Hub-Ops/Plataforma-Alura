import cars from "../models/Car.js";

class carController {

    static listCars = (req, res) => {
        cars.find()
        .populate("info")
        .exec((err, sucess) => {
            if(err){
                res.status(500).send({ERROR: ` (Não foi possível listar itens) ==> ${err.message}`})
            }else{
                res.status(200).json(sucess)
            }
        })
    }

    static listFabricante = (req, res) => {
        const fabricante = req.query.fabricante

        cars.find({'fabricante': fabricante}, (err, success) => {
            res.status(200).send(success);
        })
    }

    static listIdCars = (req, res) => {
        const id = req.params.id;

        cars.findById(id, (err, cars) => {
            if(err) {
                res.status(400).send({ERROR: `(Não foi possível encontrar ID) ==> ${err.message}`})
            } else{
                res.status(200).send(cars);
            }
        })
    }

    static registerCars = (req, res) => {
        let car = new cars(req.body);

        car.save((err) => {
            if(err) {
                res.status(500).send({ERROR: `(Não foi possível cadastrar) ==> ${err.message} `})
            } else{
                res.status(201).send(car.toJSON())
            }
        })
    }

    static updateCars = (req, res) => {
        const id = req.params.id;

        cars.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err){
                res.status(200).send({message: 'Atualizado com sucesso'})
            } else {
                res.status(500).send({ERROR: ` (Não foi possível encontrar ID) ==> ${err.message} `})
            }
        })
    }

    static removeCars = (req, res) => {
        const id = req.params.id;

        cars.findByIdAndDelete(id, (err) => {
            if(!err){
                res.status(200).send({message: 'Deletado com sucesso'})
            } else {
                res.status(500).send({ERROR: ` (Não foi possível encontrar ID) ==> ${err.message} `})
            }
        })
    }
}


export default carController;

