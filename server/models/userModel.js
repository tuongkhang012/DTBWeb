module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("USER", {
      Username: {
        type: Sequelize.STRING(30),
        primaryKey: true,
      },
      Password: {
        type: Sequelize.STRING(255),
        primaryKey: true,
      },
      Role: {
        type: Sequelize.STRING(30),
      },
      StuID: {
        type: Sequelize.STRING(9),
      },
      EmpID: {
        type: Sequelize.STRING(9),
      },
    }, {
        freezeTableName: true,
        tableName: "USER"
    });
  
    return user;
};