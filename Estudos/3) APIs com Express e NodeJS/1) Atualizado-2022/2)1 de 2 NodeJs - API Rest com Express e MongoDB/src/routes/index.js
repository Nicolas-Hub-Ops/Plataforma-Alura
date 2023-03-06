import express from "express";
import routerCars from "./routerCars.js"
import routerMore from "./routerMore.js"

const routes = (app) => {
    app.route('/').get( (req, res) => {
        res.status(200).send({message: 'API com padrão Rest, usando NodeJS e Express. (Database: MongoDB)'})
    } )

    app.use(
        express.json(),
        routerCars,
        routerMore
    )
}

export default routes;