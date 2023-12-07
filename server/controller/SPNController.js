const db = require("../models")
const SPN = db.studentPhoneNumbers;
const Op = db.sequelize.Op;
//500 is error
//200 is success
//201 is creation of object success
//404 is not found
//204 is delete success

//Create new SPN
class SPNCtl{
  async createSPN (req, res) {
    try {
        await SPN.create(req.body)
        .then (data => {
            res.status(201).json(data)
        });
    } catch (err) {
        res.status(500).send(err);
    }
  }

  //Get all SPN
  async getAllSPN(req, res){
    try {
        await SPN.findAll({})//find all SPN object
        .then (data => {
            res.status(200).send(data)
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }

  //Get SPN by id
  async getSPNByID(req, res){
    try {
        await SPN.findOne({
            where: {
                StuID: req.params.StuID,
                APhoneNumber: req.params.PhoneNum
            }
        })
        .then (data => {
            res.status(200).json(data);
        }) //find by id the school
        .catch (err => {
            return res.status(404).json({
                  success: false,
                  message: err
            });
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }

  // Update existing SPN
  async updateSPN(req, res){
    try {
        await SPN.update(req.body, {
            where: {
                StuID: req.params.StuID,
                APhoneNumber: req.params.PhoneNum
            }
        })
        .then (num => {
            if(num == 1){
                res.status(200).send("Success!")
            } else {
                res.status(404).send("SPN not Found")
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }

  // Delete a room
  async deleteSPN(req, res){
    try {
        await SPN.destroy({
            where: {
                StuID: req.params.StuID,
                APhoneNumber: req.params.PhoneNum
            }
        })
        .then (num => {
            if(num == 1){
                res.status(200).send("Success!")
            } else {
                res.status(404).send("SPN not Found")
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }
}

module.exports = new SPNCtl;