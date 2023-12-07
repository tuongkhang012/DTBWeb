//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const db = require('./models')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(logger('dev'))
//for using static files
app.use(express.static('public'));

app.use('/api', require('./routes/studentRoute.js'))
app.use('/api', require('./routes/subjectRoute.js'))
app.use('/api', require('./routes/employeeRoute.js'))
app.use('/api', require('./routes/facultyRoute.js'))
app.use('/api', require('./routes/majorRoute.js'))
app.use('/api', require('./routes/assignedToRoute.js'))
app.use('/api', require('./routes/worksInRoute.js'))
app.use('/api', require('./routes/employeePNumberRoute.js'))
app.use('/api', require('./routes/teachingCertRoute.js'))
app.use('/api', require('./routes/studiesInRoute.js'))
app.use('/api', require('./routes/studentCertRoute.js'))
app.use('/api', require('./routes/SPNRoute.js'))
app.use('/api', require('./routes/dependentRoute.js'))
require('./routes/auth.routes.js')(app);

db.sequelize.sync({alter: true});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});