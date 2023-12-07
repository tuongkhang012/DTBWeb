const db = require("../models")
const Faculty = db.faculties;
const Employee = db.employees;
const Op = db.sequelize.Op;
//500 is error
//200 is success
//201 is creation of object success
//404 is not found
//204 is delete success

//Create new faculty
class FacultyCtl{
  async createFaculty (req, res) {
    try {
        await Faculty.create(req.body)
        .then (data => {
            res.status(201).json(data)
        });
    } catch (err) {
        res.status(500).send(err);
    }
  }

  //Get all faculty
  async getAllFaculty(req, res){
    try {
        await Faculty.findAll({ include: Employee })//find all Faculty object
        .then (data => {
            res.status(200).send(data)
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }

  //Get faculty by id
  async getFacultyByID(req, res){
    try {
        await Faculty.findByPk(req.params.id)
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

  // Update existing faculty
  async updateFaculty(req, res){
    try {
        const _id = req.params.id;
        await Faculty.update(req.body, {
            where: {FacultyID: _id}
        })
        .then (num => {
            if(num == 1){
                res.status(200).send("Success!")
            } else {
                res.status(404).send("Faculty not Found")
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }

  // Delete a room
  async deleteFaculty(req, res){
    try {
        const _id = req.params.id;
        await Faculty.destroy({
            where: {FacultyID: _id}
        })
        .then (num => {
            if(num == 1){
                res.status(200).send("Success!")
            } else {
                res.status(404).send("Faculty not Found")
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }
}

module.exports = new FacultyCtl;