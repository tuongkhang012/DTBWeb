module.exports = (sequelize, Sequelize) => {
    const student = sequelize.define("STUDENT", {
      StudentID: {
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
        type: Sequelize.DATEONLY,
      },
      Address: {
        type: Sequelize.STRING(50)
      },
      Email: {
        type: Sequelize.STRING(30)
      },
      Class: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      GPA: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      TotalCredit: {
        type: Sequelize.INTEGER
      },
    }, {
        freezeTableName: true,
        tableName: "STUDENT"
    });

    return student;
  };