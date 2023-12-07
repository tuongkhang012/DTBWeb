const express = require('express');
const assignedToCtl = require('../controller/assignedToController.js');

const router = express.Router();
router.get('/assignedTos', assignedToCtl.getAllAssignedTo)
router.get('/assignedTo/:StuID/:LecID/:SubjID/:Seme', assignedToCtl.getAssignedToByID)
router.post('/assignedTo', assignedToCtl.createAssignedTo)
router.put('/assignedTo/:StuID/:LecID/:SubjID/:Seme', assignedToCtl.updateAssignedTo)
router.delete('/assignedTo/:StuID/:LecID/:SubjID/:Seme', assignedToCtl.deleteAssignedTo)

module.exports = router;