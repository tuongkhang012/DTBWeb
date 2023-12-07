const express = require('express');
const facultyCtl = require('../controller/facultyController.js');

const router = express.Router();
router.get('/faculties', facultyCtl.getAllFaculty)
router.get('/faculty/:id', facultyCtl.getFacultyByID)
router.post('/faculty', facultyCtl.createFaculty)
router.put('/faculty/:id', facultyCtl.updateFaculty)
router.delete('/faculty/:id', facultyCtl.deleteFaculty)

module.exports = router;