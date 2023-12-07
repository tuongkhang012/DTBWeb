const express = require('express');
const DependentCtl = require('../controller/dependentController.js');

const router = express.Router();
router.get('/dependents', DependentCtl.getAllDependent)
router.get('/dependent/:StuID/:Name', DependentCtl.getDependentByID)
router.post('/dependent', DependentCtl.createDependent)
router.put('/dependent/:StuID/:Name', DependentCtl.updateDependent)
router.delete('/dependent/:StuID/:Name', DependentCtl.deleteDependent)

module.exports = router;