const express = require('express');
const EPNCtl = require('../controller/employeePNumberController.js');

const router = express.Router();
router.get('/EPNs', EPNCtl.getAllEmployeePNumber)
router.get('/EPN/:EmpID/:PhoneNum', EPNCtl.getEmployeePNumberByID)
router.post('/EPN', EPNCtl.createEmployeePNumber)
router.put('/EPN/:EmpID/:PhoneNum', EPNCtl.updateEmployeePNumber)
router.delete('/EPN/:EmpID/:PhoneNum', EPNCtl.deleteEmployeePNumber)

module.exports = router;