const express = require('express');// imports the library
const app = express();// creates a server of name app
const cors = require('cors');
const pool = require('./db');
const student=require('./routes/student.js')
const admin=require('./routes/admin');
const pg =require('pg');
var types = pg.types;
types.setTypeParser(1114, function(stringValue) {
return stringValue;
});

app.use(express.json());//app.use(runs the middleware, here express.json() modifies the req.body data to json format and returns the parsed object to req.body)
app.use(cors());

app.use('/student',student);
app.use('/admin',admin);

app.listen(5000, () =>{
    console.log("Server started on port 5000");
} )//starts the server on port 5000