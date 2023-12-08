module.exports = (sequelize, Sequelize) => {
    const assigned_to = sequelize.define("ASSIGNED_TO", {
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
        LecID: {
          type: Sequelize.STRING(9),
          references :{
            model: "EMPLOYEE",
            key: 'EmployeeID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          primaryKey: true,
        },
        SubjID: {
            type: Sequelize.STRING(9),
            references :{
              model: "SUBJECT",
              key: 'SubjectID',
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
            },
            primaryKey: true,
          },
        Semester: {
            type: Sequelize.STRING(9),
            primaryKey: true,
        },
      }, {
          freezeTableName: true,
          tableName: "ASSIGNED_TO",
          hasTrigger: true
    });

    return assigned_to;
}