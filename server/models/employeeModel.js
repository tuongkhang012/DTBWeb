module.exports = (sequelize, Sequelize) => {
    const employee = sequelize.define("EMPLOYEE", {
      EmployeeID: {
        type: Sequelize.STRING(9),
        primaryKey: true,
      },
      Name: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      Lname: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      Sex: {
        type: Sequelize.STRING(1)
      },
      BirthDate: {
        type: Sequelize.DATEONLY
      },
      Address: {
        type: Sequelize.STRING(50)
      },
      Email: {
        type: Sequelize.STRING(30)
      },
      Salary: {
        type: Sequelize.INTEGER
      },
      YearsOfService: {
        type: Sequelize.INTEGER
      },
      LecturerType: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      WorkerType: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      AssignedTask: {
        type: Sequelize.STRING(30)
      },
    }, {
        freezeTableName: true,
        tableName: "EMPLOYEE"
    });
  
    return employee;
  };