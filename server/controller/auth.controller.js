const config = require("../config/auth.config");
const db = require("../models");
const User = db.users;
const Student = db.students;
const SPN = db.studentPhoneNumbers;
const Subject = db.subjects;
const Major = db.majors;
const AssignedTo = db.assigned_to;
const Faculty = db.faculties;
const EPN = db.employeePhoneNumbers;
const Dependent = db.dependents;
const Employee = db.employees;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    try {
        if (req.body.Role === "student"){
            const student = await Student.findOne({ where: {StudentID: req.body.StudentID}})
            if(!student){
                await Student.create({
                    StudentID: req.body.StudentID,
                    Name: req.body.Name,
                    Lname: req.body.Lname,
                    Sex: req.body.Sex,
                    BirthDate: req.body.BirthDate,
                    Address: req.body.Address,
                    Email: req.body.Email,
                    Class: req.body.Class,
                    GPA: 0,
                    TotalCredit: 0,
                })
            }
            console.log("hello")
            await User.create({
                Username: req.body.Username,
                Password: bcrypt.hashSync(req.body.Password, 8),
                Role: req.body.Role,
                StuID: req.body.StudentID,
            })
            res.status(201).send("Created student successfully!")
        } else if (req.body.Role === "lecturer") {
            const employee = await Employee.findOne({ where: {EmployeeID: req.body.EmployeeID}})
            if(!employee){
                await Employee.create({
                    EmployeeID: req.body.EmployeeID,
                    Name: req.body.Name,
                    Lname: req.body.Lname,
                    Sex: req.body.Sex,
                    BirthDate: req.body.BirthDate,
                    Address: req.body.Address,
                    Email: req.body.Email,
                    YearsOfService: 0,
                    Salary: 20000,
                    LecturerType: 1,
                    WorkerType: 0,
                })
            }
            await User.create({
                Username: req.body.Username,
                Password: bcrypt.hashSync(req.body.Password, 8),
                Role: req.body.Role,
                EmpID: req.body.EmployeeID,
            })
            res.status(201).send("Created lecturer successfully!")
        } else {
            await User.create({
                Username: req.body.Username,
                Password: bcrypt.hashSync(req.body.Password, 8),
                Role: req.body.Role,
            })
            res.status(201).send("Created admin successfully!")
        }
    } catch (err) {
      res.status(500).send({ message: err });
    }
  };

  exports.signin = async (req, res) => {
    try {
      const user = await User.findOne({
        where: { 
          Username: req.body.Username,
        },
      });

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(req.body.Password, user.Password);
  
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      const authorities = "ROLE_" + user.Role.toUpperCase();

      if(authorities === 'ROLE_STUDENT'){
        const trueUser = await User.findOne({
          where: { 
            Username: req.body.Username,
          },
          include: {
            model: Student,
            include: [
              {
                model: SPN,
              },
              {
                model: Dependent,
              }, 
              {
                model: Major,
                include: Faculty
              },
              {
                model: Subject,
                through: AssignedTo,
                include: Employee,
              },
            ]
          }
        });

        res.status(200).send({
          Username: trueUser.Username,
          StudentInfo: trueUser.STUDENT,
          StudentID: trueUser.StuID,
          Role: authorities,
          accessToken: token
        });
      } else if (authorities === 'ROLE_LECTURER'){
        const trueUser = await User.findOne({
          where: { 
            Username: req.body.Username,
          },
          include: {
            model: Employee,
            include: [
              {
                model: EPN,
              },
              {
                model: Subject,
                through: AssignedTo,
                include: Student,
              },
            ]
          }
        });
        console.log(trueUser)
        res.status(200).send({
          Username: trueUser.Username,
          LecturerInfo: trueUser.EMPLOYEE,
          EmployeePhoneNumbers: trueUser.EMPLOYEE.EMPLOYEE_PHONE_NUMBERs,
          EmployeeID: trueUser.EmpID,
          Role: authorities,
          accessToken: token
        });
      } else {
        res.status(200).send({
          Username: user.Username,
          Role: authorities,
          accessToken: token
        });
      }
  
    } catch (err) {
      res.status(500).send({ message: err });
    }
  };