const express = require('express');
const SPNCtl = require('../controller/SPNController.js');

const router = express.Router();
router.get('/SPNs', SPNCtl.getAllSPN)
router.get('/SPN/:StuID/:PhoneNum', SPNCtl.getSPNByID)
router.post('/SPN', SPNCtl.createSPN)
router.put('/SPN/:StuID/:PhoneNum', SPNCtl.updateSPN)
router.delete('/SPN/:StuID/:PhoneNum', SPNCtl.deleteSPN)

module.exports = router;