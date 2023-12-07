const db = require("../models")
const StudiesIn = db.studies_in;
const Op = db.sequelize.Op;
//500 is error
//200 is success
//201 is creation of object success
//404 is not found
//204 is delete success

//Create new studiesIn relation
class StudiesInCtl{
  async createStudiesIn (req, res) {
    try {
        await StudiesIn.create(req.body)
        .then (data => {
            res.status(201).json(data)
        });
    } catch (err) {
        res.status(500).send(err);
    }
  }

  //Get all studiesIn
  async getAllStudiesIn(req, res){
    try {
        await StudiesIn.findAll({})//find all StudiesIn object
        .then (data => {
            res.status(200).send(data)
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }

  //Get studiesIn by id
  async getStudiesInByID(req, res){
    try {
        await StudiesIn.findByPk(req.params.id)
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

  // Update existing studiesIn
  async updateStudiesIn(req, res){
    try {
        const _id = req.params.id;
        await StudiesIn.update(req.body, {
            where: {StuID: _id}
        })
        .then (num => {
            if(num == 1){
                res.status(200).send("Success!")
            } else {
                res.status(404).send("StudiesIn not Found")
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }

  // Delete a room
  async deleteStudiesIn(req, res){
    try {
        const _id = req.params.id;
        await StudiesIn.destroy({
            where: {StuID: _id}
        })
        .then (num => {
            if(num == 1){
                res.status(200).send("Success!")
            } else {
                res.status(404).send("StudiesIn not Found")
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }
}

module.exports = new StudiesInCtl;