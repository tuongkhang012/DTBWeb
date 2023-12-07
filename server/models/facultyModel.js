module.exports = (sequelize, Sequelize) => {
    const faculty = sequelize.define("FACULTY", {
      FacultyID: {
        type: Sequelize.STRING(9),
        primaryKey: true,
      },
      Name: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      DeanID: {
        type: Sequelize.STRING(9),
      },
    }, {
        freezeTableName: true,
        tableName: "FACULTY"
    });
  
    return faculty;
};