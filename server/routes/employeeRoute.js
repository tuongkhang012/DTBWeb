const express = require('express');
const employeeCtl = require('../controller/employeeController.js');

const router = express.Router();
router.get('/employees', employeeCtl.getAllEmployee)
router.get('/employee/:id', employeeCtl.getEmployeeByID)
router.post('/employee', employeeCtl.createEmployee)
router.put('/employee/:id', employeeCtl.updateEmployee)
router.delete('/employee/:id', employeeCtl.deleteEmployee)

module.exports = router;