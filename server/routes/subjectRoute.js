const express = require('express');
const subjectCtl = require('../controller/subjectController.js');

const router = express.Router();
router.get('/subjects', subjectCtl.getAllSubject)
router.get('/subject/:id', subjectCtl.getSubjectByID)
router.post('/subject', subjectCtl.createSubject)
router.put('/subject/:id', subjectCtl.updateSubject)
router.delete('/subject/:id', subjectCtl.deleteSubject)

module.exports = router;