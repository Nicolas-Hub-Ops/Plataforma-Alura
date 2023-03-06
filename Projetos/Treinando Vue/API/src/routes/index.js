import express from "express";
import routerAlbum from "./routerAlbum.js"
import routerImages from "./routerImages.js"
//import configMulter from "./configMulter.js"

const routes = (app) => {
    app.route('/').get( (req, res) => {
        res.status(200).send({message: 'API com padrão Rest, usando NodeJS e Express. (Database: MongoDB)'})
    } )

    app.use(
        express.json(),
        routerAlbum,
        routerImages,
        //configMulter
    )
}

export default routes;