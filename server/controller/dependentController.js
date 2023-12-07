const db = require("../models")
const Dependent = db.dependents;
const Op = db.sequelize.Op;
//500 is error
//200 is success
//201 is creation of object success
//404 is not found
//204 is delete success

//Create new dependent
class DependentCtl{
  async createDependent (req, res) {
    try {
        await Dependent.create(req.body)
        .then (data => {
            res.status(201).json(data)
        });
    } catch (err) {
        res.status(500).send(err);
    }
  }

  //Get all dependent
  async getAllDependent(req, res){
    try {
        await Dependent.findAll({})//find all Dependent object
        .then (data => {
            res.status(200).send(data)
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }

  //Get dependent by id
  async getDependentByID(req, res){
    try {
        await Dependent.findOne({
            where: {
                StuID: req.params.StuID,
                Name: req.params.Name,
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

  // Update existing dependent
  async updateDependent(req, res){
    try {
        await Dependent.update(req.body, {
            where: {
                StuID: req.params.StuID,
                Name: req.params.Name,
            }
        })
        .then (num => {
            if(num == 1){
                res.status(200).send("Success!")
            } else {
                res.status(404).send("Dependent not Found")
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }

  // Delete a room
  async deleteDependent(req, res){
    try {
        await Dependent.destroy({
            where: {
                StuID: req.params.StuID,
                Name: req.params.Name,
            }
        })
        .then (num => {
            if(num == 1){
                res.status(200).send("Success!")
            } else {
                res.status(404).send("Dependent not Found")
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }
}

module.exports = new DependentCtl;