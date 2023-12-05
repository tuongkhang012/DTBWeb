module.exports = (sequelize, Sequelize) => {
    const studentCertificate = sequelize.define("STUDENT_CERTIFICATE", {
      StuID: {
        type: Sequelize.STRING(9),
        primaryKey: true,
      },
      Name: {
        type: Sequelize.STRING(30),
        primaryKey: true,
      },
    }, {
        freezeTableName: true,
        tableName: "STUDENT_CERTIFICATE"
    });
  
    return studentCertificate;
  };