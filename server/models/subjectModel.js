module.exports = (sequelize, Sequelize) => {
    const subject = sequelize.define("SUBJECT", {
      SubjectID: {
        type: Sequelize.STRING(9),
        primaryKey: true,
      },
      Name: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      Credit: {
        type: Sequelize.INTEGER,
      },
    }, {
        freezeTableName: true,
        tableName: "SUBJECT"
    });
  
    return subject;
  };