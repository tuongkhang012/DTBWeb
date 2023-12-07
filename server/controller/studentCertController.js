const db = require("../models")
const StudentCert = db.studentCertificates;
const Op = db.sequelize.Op;
//500 is error
//200 is success
//201 is creation of object success
//404 is not found
//204 is delete success

//Create new studentCert
class StudentCertCtl{
  async createStudentCert (req, res) {
    try {
        await StudentCert.create(req.body)
        .then (data => {
            res.status(201).json(data)
        });
    } catch (err) {
        res.status(500).send(err);
    }
  }

  //Get all studentCert
  async getAllStudentCert(req, res){
    try {
        await StudentCert.findAll({})//find all StudentCert object
        .then (data => {
            res.status(200).send(data)
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }

  //Get studentCert by id
  async getStudentCertByID(req, res){
    try {
        await StudentCert.findOne({
            where: {
                StuID: req.params.StuID,
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

  // Update existing studentCert
  async updateStudentCert(req, res){
    try {
        await StudentCert.update(req.body, {
            where: {
                StuID: req.params.StuID,
                Name: req.params.Name
            }
        })
        .then (num => {
            if(num == 1){
                res.status(200).send("Success!")
            } else {
                res.status(404).send("StudentCert not Found")
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }

  // Delete a room
  async deleteStudentCert(req, res){
    try {
        await StudentCert.destroy({
            where: {
                StuID: req.params.StuID,
                Name: req.params.Name
            }
        })
        .then (num => {
            if(num == 1){
                res.status(200).send("Success!")
            } else {
                res.status(404).send("StudentCert not Found")
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }
}

module.exports = new StudentCertCtl;