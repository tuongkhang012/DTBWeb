const db = require("../models")
const TeachingCert = db.teachingCertificates;
const Op = db.sequelize.Op;
//500 is error
//200 is success
//201 is creation of object success
//404 is not found
//204 is delete success

//Create new teachingCert
class TeachingCertCtl{
  async createTeachingCert (req, res) {
    try {
        await TeachingCert.create(req.body)
        .then (data => {
            res.status(201).json(data)
        });
    } catch (err) {
        res.status(500).send(err);
    }
  }

  //Get all teachingCert
  async getAllTeachingCert(req, res){
    try {
        await TeachingCert.findAll({})//find all TeachingCert object
        .then (data => {
            res.status(200).send(data)
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }

  //Get teachingCert by id
  async getTeachingCertByID(req, res){
    try {
        await TeachingCert.findOne({
            where: {
                LecID: req.params.LecID,
                Name: req.params.Name
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

  // Update existing teachingCert
  async updateTeachingCert(req, res){
    try {
        await TeachingCert.update(req.body, {
            where: {
                LecID: req.params.LecID,
                Name: req.params.Name
            }
        })
        .then (num => {
            if(num == 1){
                res.status(200).send("Success!")
            } else {
                res.status(404).send("TeachingCert not Found")
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }

  // Delete a room
  async deleteTeachingCert(req, res){
    try {
        await TeachingCert.destroy({
            where: {
                LecID: req.params.LecID,
                Name: req.params.Name
            }
        })
        .then (num => {
            if(num == 1){
                res.status(200).send("Success!")
            } else {
                res.status(404).send("TeachingCert not Found")
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }
}

module.exports = new TeachingCertCtl;