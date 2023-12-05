module.exports = (sequelize, Sequelize) => {
    const studies_in = sequelize.define("STUDIES_IN", {
        StuID: {
          type: Sequelize.STRING(9),
          references :{
            model: "STUDENT",
            key: 'StudentID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          primaryKey: true,
        },
        MajID: {
          type: Sequelize.STRING(9),
          references :{
            model: "MAJOR",
            key: 'MajorID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        },
        StartDate: {
          type: Sequelize.DATEONLY,
        },
      }, {
          freezeTableName: true,
          tableName: "STUDIES_IN"
    });

    return studies_in;
}