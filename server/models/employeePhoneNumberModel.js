module.exports = (sequelize, Sequelize) => {
    const employeePhoneNumber = sequelize.define("EMPLOYEE_PHONE_NUMBER", {
      EmpID: {
        type: Sequelize.STRING(9),
        primaryKey: true,
      },
      APhoneNumber: {
        type: Sequelize.STRING(9),
        primaryKey: true,
      },
    }, {
        freezeTableName: true,
        tableName: "EMPLOYEE_PHONE_NUMBER"
    });
  
    return employeePhoneNumber;
};