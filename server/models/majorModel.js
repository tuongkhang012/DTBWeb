module.exports = (sequelize, Sequelize) => {
    const major = sequelize.define("MAJOR", {
      MajorID: {
        type: Sequelize.STRING(9),
        primaryKey: true,
      },
      MajorName: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      FacID: {
        type: Sequelize.STRING(9),
      }
    }, {
        freezeTableName: true,
        tableName: "MAJOR"
    });
  
    return major;
};