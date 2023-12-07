const express = require('express');
const TeachingCertCtl = require('../controller/teachingCertController.js');

const router = express.Router();
router.get('/teachingCerts', TeachingCertCtl.getAllTeachingCert)
router.get('/teachingCert/:LecID/:Name', TeachingCertCtl.getTeachingCertByID)
router.post('/teachingCert', TeachingCertCtl.createTeachingCert)
router.put('/teachingCert/:LecID/:Name', TeachingCertCtl.updateTeachingCert)
router.delete('/teachingCert/:LecID/:Name', TeachingCertCtl.deleteTeachingCert)

module.exports = router;