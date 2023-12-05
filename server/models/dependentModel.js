module.exports = (sequelize, Sequelize) => {
    const dependent = sequelize.define("DEPENDENT", {
      StuID: {
        type: Sequelize.STRING(9),
        primaryKey: true,
      },
      Name: {
        type: Sequelize.STRING(15),
        primaryKey: true,
        allowNull: false,
      },
      Relationship: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      Profession: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      PhoneNumber: {
        type: Sequelize.STRING(10),
      },
    }, {
        freezeTableName: true,
        tableName: "DEPENDENT"
    });
  
    return dependent;
  };