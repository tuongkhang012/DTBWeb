const db = require("../models")
const Student = db.students;
const Op = db.sequelize.Op;
//500 is error
//200 is success
//201 is creation of object success
//404 is not found
//204 is delete success

//Create new student
class StudentCtl{
  async createStudent (req, res) {
    try {
        console.log(req.body)
        await Student.create(req.body)
        .then (data => {
            res.status(201).json(data)
        });
    } catch (err) {
        res.status(500).send(err);
    }
  }

  //Get all student
  async getAllStudent(req, res){
    try {
        await Student.findAll({})//find all Student object
        .then (data => {
            res.status(200).send(data)
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }

  //Get student by id
  async getStudentByID(req, res){
    try {
        await Student.findByPk(req.params.id)
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

  // Update existing student
  async updateStudent(req, res){
    try {
        const _id = req.params.id;
        await Student.update(req.body, {
            where: {StudentID: _id}
        })
        .then (num => {
            if(num == 1){
                res.status(200).send("Success!")
            } else {
                res.status(404).send("Student not Found")
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }

  // Delete a room
  async deleteStudent(req, res){
    try {
        const _id = req.params.id;
        await Student.destroy({
            where: {StudentID: _id}
        })
        .then (num => {
            if(num == 1){
                res.status(200).send("Success!")
            } else {
                res.status(404).send("Student not Found")
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }
}

module.exports = new StudentCtl;