const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.students = require("./studentModel.js")(sequelize, Sequelize);
db.employees = require("./employeeModel.js")(sequelize, Sequelize);
db.studentCertificates = require("./studentCertificateModel.js")(sequelize, Sequelize);
db.dependents = require("./dependentModel.js")(sequelize, Sequelize);
db.subjects = require("./subjectModel.js")(sequelize, Sequelize);
db.majors = require("./majorModel.js")(sequelize, Sequelize);
db.faculties = require("./facultyModel.js")(sequelize, Sequelize);
db.studentPhoneNumbers = require("./studentPhoneNumberModel.js")(sequelize, Sequelize);
db.employeePhoneNumbers = require("./employeePhoneNumberModel.js")(sequelize, Sequelize);
db.teachingCertificates = require("./teachingCertificateModel.js")(sequelize, Sequelize);
db.works_in = require("./works_inModel.js")(sequelize, Sequelize);
db.studies_in = require("./studies_inModel.js")(sequelize, Sequelize);
db.assigned_to = require("./assigned_toModel.js")(sequelize, Sequelize);

// Association
//STUDENT_CERTIFICATE N-1 STUDENT
db.students.hasMany(db.studentCertificates, {
  foreignKey: 'StuID',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
db.studentCertificates.belongsTo(db.students, {
  foreignKey: 'StuID',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
//STUDENT 1-N DEPENDENT
db.students.hasMany(db.dependents, {
  foreignKey: 'StuID',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
db.dependents.belongsTo(db.students, {
  foreignKey: 'StuID',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
//FACULTY 1-N LECTURER
db.employees.hasMany(db.faculties, {
  foreignKey: 'DeanID',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
db.faculties.belongsTo(db.employees, {
  foreignKey: 'DeanID',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
//FACULTY 1 - N MAJOR
db.faculties.hasMany(db.majors, {
  foreignKey: 'FacID',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
db.majors.belongsTo(db.majors, {
  foreignKey: 'FacID',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
//EMPLOYEE 1-N EMPLOYEE_PHONE_NUMBER
db.employees.hasMany(db.employeePhoneNumbers, {
  foreignKey: 'EmpID',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
db.employeePhoneNumbers.belongsTo(db.employees, {
  foreignKey: 'EmpID',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
//STUDENT 1 - N STUDENT_PHONE_NUMBER
db.students.hasMany(db.studentPhoneNumbers, {
  foreignKey: 'StuID',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
db.studentPhoneNumbers.belongsTo(db.students, {
  foreignKey: 'StuID',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
//LECTURER 1 - N TEACHING_CERTIFICATE
db.employees.hasMany(db.teachingCertificates, {
  foreignKey: 'LecID',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
db.teachingCertificates.belongsTo(db.employees, {
  foreignKey: 'LecID',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
//WORKS_IN
db.works_in.belongsTo(db.employees, {foreignKey: 'LecturerID'})
db.works_in.belongsTo(db.faculties, {foreignKey: 'FacID'})
db.employees.belongsToMany(db.faculties, {through: db.works_in, foreignKey: 'LecturerID'})
db.faculties.belongsToMany(db.employees, {through: db.works_in, foreignKey: 'FacID'})
//STUDIES_IN
db.studies_in.belongsTo(db.students, {foreignKey: 'StuID'})
db.studies_in.belongsTo(db.majors, {foreignKey: 'MajID'})
db.students.belongsToMany(db.majors, {through: db.studies_in, foreignKey: 'StuID'})
db.majors.belongsToMany(db.students, {through: db.studies_in, foreignKey: 'MajID'})
//STUDIES_IN
db.assigned_to.belongsTo(db.students, {foreignKey: 'StuID'})
db.assigned_to.belongsTo(db.employees, {foreignKey: 'LecID'})
db.assigned_to.belongsTo(db.subjects, {foreignKey: 'SubjID'})
db.students.belongsToMany(db.employees, {through: db.assigned_to, foreignKey: 'StuID'})
db.employees.belongsToMany(db.students, {through: db.assigned_to, foreignKey: 'LecID'})
db.students.belongsToMany(db.subjects, {through: db.assigned_to, foreignKey: 'StuID'})
db.subjects.belongsToMany(db.students, {through: db.assigned_to, foreignKey: 'SubjID'})
db.employees.belongsToMany(db.subjects, {through: db.assigned_to, foreignKey: 'LecID'})
db.subjects.belongsToMany(db.employees, {through: db.assigned_to, foreignKey: 'SubjID'})

module.exports = db;