const db = require("../models")
const WorksIn = db.works_in;
const Op = db.sequelize.Op;
//500 is error
//200 is success
//201 is creation of object success
//404 is not found
//204 is delete success

//Create new worksIn relation
class WorksInCtl{
  async createWorksIn (req, res) {
    try {
        await WorksIn.create(req.body)
        .then (data => {
            res.status(201).json(data)
        });
    } catch (err) {
        res.status(500).send(err);
    }
  }

  //Get all worksIn
  async getAllWorksIn(req, res){
    try {
        await WorksIn.findAll({})//find all WorksIn object
        .then (data => {
            res.status(200).send(data)
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }

  //Get worksIn by id
  async getWorksInByID(req, res){
    try {
        await WorksIn.findByPk(req.params.id)
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

  // Update existing worksIn
  async updateWorksIn(req, res){
    try {
        const _id = req.params.id;
        await WorksIn.update(req.body, {
            where: {LecturerID: _id}
        })
        .then (num => {
            if(num == 1){
                res.status(200).send("Success!")
            } else {
                res.status(404).send("WorksIn not Found")
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }

  // Delete a room
  async deleteWorksIn(req, res){
    try {
        const _id = req.params.id;
        await WorksIn.destroy({
            where: {LecturerID: _id}
        })
        .then (num => {
            if(num == 1){
                res.status(200).send("Success!")
            } else {
                res.status(404).send("WorksIn not Found")
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }
}

module.exports = new WorksInCtl;