const express = require('express');
const studiesInCtl = require('../controller/studiesInController.js');

const router = express.Router();
router.get('/studiesIns', studiesInCtl.getAllStudiesIn)
router.get('/studiesIn/:id', studiesInCtl.getStudiesInByID)
router.post('/studiesIn', studiesInCtl.createStudiesIn)
router.put('/studiesIn/:id', studiesInCtl.updateStudiesIn)
router.delete('/studiesIn/:id', studiesInCtl.deleteStudiesIn)

module.exports = router;