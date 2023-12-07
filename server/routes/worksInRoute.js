const express = require('express');
const worksInCtl = require('../controller/worksInController.js');

const router = express.Router();
router.get('/worksIns', worksInCtl.getAllWorksIn)
router.get('/worksIn/:id', worksInCtl.getWorksInByID)
router.post('/worksIn', worksInCtl.createWorksIn)
router.put('/worksIn/:id', worksInCtl.updateWorksIn)
router.delete('/worksIn/:id', worksInCtl.deleteWorksIn)

module.exports = router;