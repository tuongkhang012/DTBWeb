const db = require("../models")
const AssignedTo = db.assigned_to;
const Op = db.sequelize.Op;
//500 is error
//200 is success
//201 is creation of object success
//404 is not found
//204 is delete success

//Create new assignedTo relation
class AssignedToCtl{
  async createAssignedTo (req, res) {
    try {
        await AssignedTo.create(req.body)
        .then (data => {
            res.status(201).json(data)
        });
    } catch (err) {
        res.status(500).send(err);
    }
  }

  //Get all assignedTo
  async getAllAssignedTo(req, res){
    try {
        await AssignedTo.findAll({})//find all AssignedTo object
        .then (data => {
            res.status(200).send(data)
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }

  //Get assignedTo by id
  async getAssignedToByID(req, res){
    try {
        await AssignedTo.findByPk(req.params.id)
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

  // Update existing assignedTo
  async updateAssignedTo(req, res){
    try {
        const _id = req.params.id;
        await AssignedTo.update(req.body, {
            where: {AssignedToID: _id}
        })
        .then (num => {
            if(num == 1){
                res.status(200).send("Success!")
            } else {
                res.status(404).send("AssignedTo not Found")
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }

  // Delete a room
  async deleteAssignedTo(req, res){
    try {
        const _id = req.params.id;
        await AssignedTo.destroy({
            where: {AssignedToID: _id}
        })
        .then (num => {
            if(num == 1){
                res.status(200).send("Success!")
            } else {
                res.status(404).send("AssignedTo not Found")
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }
}

module.exports = new AssignedToCtl;