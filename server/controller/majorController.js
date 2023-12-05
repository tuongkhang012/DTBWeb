const db = require("../models")
const Major = db.majors;
const Faculty = db.faculties;
const Op = db.sequelize.Op;
//500 is error
//200 is success
//201 is creation of object success
//404 is not found
//204 is delete success

//Create new major
class MajorCtl{
  async createMajor (req, res) {
    try {
        const _FacID = req.params.FacID;
        let fac = Faculty.findOne({where: {FacultyID: _FacID}})
        if (fac) {
            await Major.create({
                ...req.body,
                FacID: _FacID
            })
            .then (data => {
                res.status(201).json(data)
            });
        } else {
            res.status(404).send("This Faculty doesn't exist")
        }
    } catch (err) {
        res.status(500).send(err);
    }
  }

  //Get all major
  async getAllMajor(req, res){
    try {
        await Major.findAll({})//find all Major object
        .then (data => {
            res.status(200).send(data)
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }

  //Get major by id
  async getMajorByID(req, res){
    try {
        await Major.findByPk(req.params.id)
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

  // Update existing major
  async updateMajor(req, res){
    try {
        const _id = req.params.id;
        await Major.update(req.body, {
            where: {MajorID: _id}
        })
        .then (num => {
            if(num == 1){
                res.status(200).send("Success!")
            } else {
                res.status(404).send("Major not Found")
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }

  // Delete a room
  async deleteMajor(req, res){
    try {
        const _id = req.params.id;
        await Major.destroy({
            where: {MajorID: _id}
        })
        .then (num => {
            if(num == 1){
                res.status(200).send("Success!")
            } else {
                res.status(404).send("Major not Found")
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }
}

module.exports = new MajorCtl;