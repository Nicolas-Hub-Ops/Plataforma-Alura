const clientController = require('./controllers/Client-Controller');
const adminController = require('./controllers/Admin-Controller');
const multerConfig = require('./config/multer');
const multer = require('multer');
const express = require('express');
const router = express.Router();
const passport = require('passport');

router
//Admins
    .get('/list/admin', adminController.listAdmin)
    .get('/admin/id/:id', adminController.listAdminId)
    .get('/admin/username/:username', adminController.listAdminUsername)
    .post('/new/admin', adminController.createAdmin)
    .post('/admin/login', passport.authenticate('local', { session: false }), adminController.successLogin)
    .delete('/delete/admin/:id', adminController.deleteAdmin)

// Clients
    .get('/list/client', clientController.listClients)
    .get('/client/id/:id', clientController.listClientId)
    .post('/new/client', multer(multerConfig).single('file'), clientController.createClient)
    .put('/modify/client/:id', multer(multerConfig).single('file'), clientController.updateClient)
    .delete('/delete/client/:id', clientController.deleteClient)

module.exports = router;