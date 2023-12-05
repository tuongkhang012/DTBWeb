const db = require("../models")
const Subject = db.subjects;
const Op = db.sequelize.Op;
//500 is error
//200 is success
//201 is creation of object success
//404 is not found
//204 is delete success

//Create new subject
class SubjectCtl{
  async createSubject (req, res) {
    try {
        await Subject.create(req.body)
        .then (data => {
            res.status(201).json(data)
        });
    } catch (err) {
        res.status(500).send(err);
    }
  }

  //Get all subject
  async getAllSubject(req, res){
    try {
        await Subject.findAll({})//find all Subject object
        .then (data => {
            res.status(200).send(data)
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }

  //Get subject by id
  async getSubjectByID(req, res){
    try {
        await Subject.findByPk(req.params.id)
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

  // Update existing subject
  async updateSubject(req, res){
    try {
        const _id = req.params.id;
        await Subject.update(req.body, {
            where: {SubjectID: _id}
        })
        .then (num => {
            if(num == 1){
                res.status(200).send("Success!")
            } else {
                res.status(404).send("Subject not Found")
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }

  // Delete a room
  async deleteSubject(req, res){
    try {
        const _id = req.params.id;
        await Subject.destroy({
            where: {SubjectID: _id}
        })
        .then (num => {
            if(num == 1){
                res.status(200).send("Success!")
            } else {
                res.status(404).send("Subject not Found")
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }
}

module.exports = new SubjectCtl;