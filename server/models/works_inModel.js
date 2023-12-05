module.exports = (sequelize, Sequelize) => {
    const works_in = sequelize.define("WORKS_IN", {
        LecturerID: {
          type: Sequelize.STRING(9),
          references :{
            model: "EMPLOYEE",
            key: 'EmployeeID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          primaryKey: true,
        },
        FacID: {
          type: Sequelize.STRING(9),
          references :{
            model: "FACULTY",
            key: 'FacultyID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        },
        StartDate: {
          type: Sequelize.DATEONLY,
        },
      }, {
          freezeTableName: true,
          tableName: "WORKS_IN"
    });

    return works_in;
}