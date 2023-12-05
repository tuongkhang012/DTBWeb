module.exports = (sequelize, Sequelize) => {
    const studentPhoneNumber = sequelize.define("STUDENT_PHONE_NUMBER", {
      StuID: {
        type: Sequelize.STRING(9),
        primaryKey: true,
      },
      APhoneNumber: {
        type: Sequelize.STRING(9),
        primaryKey: true,
      },
    }, {
        freezeTableName: true,
        tableName: "STUDENT_PHONE_NUMBER"
    });
  
    return studentPhoneNumber;
};