const db = require("../models")
const Employee = db.employees;
const Op = db.sequelize.Op;
//500 is error
//200 is success
//201 is creation of object success
//404 is not found
//204 is delete success

//Create new employee
class EmployeeCtl{
  async createEmployee (req, res) {
    try {
        await Employee.create(req.body)
        .then (data => {
            res.status(201).json(data)
        });
    } catch (err) {
        res.status(500).send(err);
    }
  }

  //Get all employee
  async getAllEmployee(req, res){
    try {
        await Employee.findAll({})//find all Employee object
        .then (data => {
            res.status(200).send(data)
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }

  //Get employee by id
  async getEmployeeByID(req, res){
    try {
        await Employee.findByPk(req.params.id)
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

  // Update existing employee
  async updateEmployee(req, res){
    try {
        const _id = req.params.id;
        await Employee.update(req.body, {
            where: {EmployeeID: _id}
        })
        .then (num => {
            if(num == 1){
                res.status(200).send("Success!")
            } else {
                res.status(404).send("Employee not Found")
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }

  // Delete a room
  async deleteEmployee(req, res){
    try {
        const _id = req.params.id;
        await Employee.destroy({
            where: {EmployeeID: _id}
        })
        .then (num => {
            if(num == 1){
                res.status(200).send("Success!")
            } else {
                res.status(404).send("Employee not Found")
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }
}

module.exports = new EmployeeCtl;