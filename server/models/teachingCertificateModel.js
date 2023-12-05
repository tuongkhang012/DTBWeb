module.exports = (sequelize, Sequelize) => {
    const teachingCertificate = sequelize.define("TEACHING_CERTIFICATE", {
      LecID: {
        type: Sequelize.STRING(9),
        primaryKey: true,
      },
      Name: {
        type: Sequelize.STRING(30),
        primaryKey: true,
      },
    }, {
        freezeTableName: true,
        tableName: "TEACHING_CERTIFICATE"
    });
  
    return teachingCertificate;
  };