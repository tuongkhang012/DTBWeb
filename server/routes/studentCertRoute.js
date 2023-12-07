const express = require('express');
const StudentCertCtl = require('../controller/studentCertController.js');

const router = express.Router();
router.get('/studentCerts', StudentCertCtl.getAllStudentCert)
router.get('/studentCert/:StuID/:Name', StudentCertCtl.getStudentCertByID)
router.post('/studentCert', StudentCertCtl.createStudentCert)
router.put('/studentCert/:StuID/:Name', StudentCertCtl.updateStudentCert)
router.delete('/studentCert/:StuID/:Name', StudentCertCtl.deleteStudentCert)

module.exports = router;