const express = require('express');
const assignedToCtl = require('../controller/assignedToController.js');

const router = express.Router();
router.get('/assignedTos', assignedToCtl.getAllAssignedTo)
router.get('/assignedTo/:id', assignedToCtl.getAssignedToByID)
router.post('/assignedTo', assignedToCtl.createAssignedTo)
router.put('/assignedTo/:id', assignedToCtl.updateAssignedTo)
router.delete('/assignedTo/:id', assignedToCtl.deleteAssignedTo)

module.exports = router;