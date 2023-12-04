// Route for '/' level requests


// ====== IMPORTS ======

const express = require('express');
const router = express.Router();

// Controller
const indexController = require('../controllers/indexController.js'); 


// ====== ROUTES ======

router.use('/', indexController.testIndexRoute);


// ====== EXPORTS ======

module.exports = router;