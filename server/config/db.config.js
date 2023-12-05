module.exports = {
    HOST: "h05h1n0",
    PORT: "1433",
    USER: "admin",
    PASSWORD: "admin",
    DB: "DB_TEST",
    dialect: "mssql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };