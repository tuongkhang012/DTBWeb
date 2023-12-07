const db = require("../models")
const EmployeePNumber = db.employeePhoneNumbers;
const Op = db.sequelize.Op;
//500 is error
//200 is success
//201 is creation of object success
//404 is not found
//204 is delete success

//Create new employeePNumber
class EmployeePNumberCtl{
  async createEmployeePNumber (req, res) {
    try {
        await EmployeePNumber.create(req.body)
        .then (data => {
            res.status(201).json(data)
        });
    } catch (err) {
        res.status(500).send(err);
    }
  }

  //Get all employeePNumber
  async getAllEmployeePNumber(req, res){
    try {
        await EmployeePNumber.findAll({})//find all EmployeePNumber object
        .then (data => {
            res.status(200).send(data)
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }

  //Get employeePNumber by id
  async getEmployeePNumberByID(req, res){
    try {
        await EmployeePNumber.findOne({
            where: {
                EmpID: req.params.EmpID,
                APhoneNumber: req.params.PhoneNum
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

  // Update existing employeePNumber
  async updateEmployeePNumber(req, res){
    try {
        await EmployeePNumber.update(req.body, {
            where: {
                EmpID: req.params.EmpID,
                APhoneNumber: req.params.PhoneNum
            }
        })
        .then (num => {
            if(num == 1){
                res.status(200).send("Success!")
            } else {
                res.status(404).send("EmployeePNumber not Found")
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }

  // Delete a room
  async deleteEmployeePNumber(req, res){
    try {
        await EmployeePNumber.destroy({
            where: {
                EmpID: req.params.EmpID,
                APhoneNumber: req.params.PhoneNum
            }
        })
        .then (num => {
            if(num == 1){
                res.status(200).send("Success!")
            } else {
                res.status(404).send("EmployeePNumber not Found")
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
  }
}

module.exports = new EmployeePNumberCtl;