const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8085"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
  
  res.json({ message: "Welcome to OnlineLPK12 application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
// var http=require('http');
// http.createServer(function(req,res){
//   var htmlcode="<form action='http://localhost:8085/OnlineLPK12/register.jsp'>"
//   res.writeHead(200,{'Content-Type':'applicatio/json'});
//   res.end(htmlcode);
// }).listen
// set port, listen for requests
const PORT = process.env.PORT || 8083;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "Student"
  });
 
  Role.create({
    id: 2,
    name: "Teacher"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}
