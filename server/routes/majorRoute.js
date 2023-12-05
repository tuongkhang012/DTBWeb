const express = require('express');
const majorCtl = require('../controller/majorController.js');

const router = express.Router();
router.get('/majors', majorCtl.getAllMajor)
router.get('/major/:id', majorCtl.getMajorByID)
router.post('/major/:FacID', majorCtl.createMajor)
router.put('/major/:id', majorCtl.updateMajor)
router.delete('/major/:id', majorCtl.deleteMajor)

module.exports = router;