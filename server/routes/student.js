const express = require('express');
const pool = require('../db');
const router = express.Router();
const bcrypt= require('bcrypt');
const moment = require('moment/moment');

router.post('/', async(req,res) =>{
    const user = req.body.username;
    const password= req.body.password;
    console.log(user);
    console.log(password);
    try {
        const check = await pool.query("SELECT roll_no,password FROM studentinfo WHERE username=($1)",
        [user]);//it will return roll_no and hashed password
        console.log(check.rows[0]);
        bcrypt.compare(password,check.rows[0].password, (err,result) =>{
            console.log(result);
            if(err){
                console.log(err);
                throw err;
            };
            if(result){
                console.log("success");
                res.json(check.rows[0].roll_no);
            }
            else{
                console.log("password is incorrect");
                res.sendStatus(403);
            }
        })
    } catch (err) {
        console.error(err.message);
    }
})

router.post('/register', async(req,res) =>{
    const name=req.body.name;
    const roll_no=req.body.roll_no;
    const branch=req.body.branch;
    const div=req.body.div;
    const contact_no=Number(req.body.contact_no);
    const email=req.body.email;
    const username=req.body.username;
    const password=req.body.password;
    const hashedPassword= await bcrypt.hash(password, 10);
    console.log(req.body.name);
    try {
        const postval= await pool.query("INSERT INTO studentinfo (name,roll_no,branch,div,contact_no,email,username,password) VALUES(($1),($2),($3),($4),($5),($6),($7),($8))",
        [name,roll_no,branch,div,contact_no,email,username,hashedPassword]);
        console.log(postval);
        res.send("succesful");
    } catch (err) {
        console.error(err.message);
    }
})

router.post('/order', async(req,res) =>{
    const roll_no=req.body.student_roll_no;
    const book_details=req.body.book_details;
    try {
        const date1=await pool.query("SELECT NOW()::DATE");
        console.log(date1);
        const book_issued_on=date1.rows[0].now;
        console.log(book_issued_on);
        const date2=await pool.query("SELECT (NOW() + INTERVAL '30 day')::DATE");
        console.log(date2);
        const book_to_be_returned=date2.rows[0].date;
        console.log(book_to_be_returned);
        const order=await pool.query("INSERT INTO studentstatus(student_roll_no,book_details,book_issued_on,book_to_be_returned) VALUES(($1),($2),($3),($4))",[
            roll_no,book_details,book_issued_on,book_to_be_returned
        ]);
        const update=await pool.query("UPDATE book SET quantity=quantity-1 WHERE isbn_code=($1)",[
            book_details
        ]);
        res.json("book added successfully");
        console.log(order.rows);
    } catch (err) {
        console.error(err.message);
    }
})

router.post('/book', async(req,res) =>{
    const title=req.body.title;
    const isbn_code= Number(req.body.isbn_code);
    const author_name=req.body.author_name;
    try {
        const search= await pool.query("SELECT * FROM book WHERE title=($1) OR author_name=($2) OR isbn_code=($3)",[
            title,author_name,isbn_code
        ]);
        //res.json(search.rows);
        if(search.rows[0].quantity==0)
        {
            res.json("book is not available");
        }
        else{
            res.json("book is available");
        }
    } catch (err) {
        console.error(err);
    }
})

router.post('/suggestion', async(req,res) =>{
    const roll_no=req.body.roll_no;
    const suggestion=req.body.suggestion;
    console.log(roll_no);
    try {
        pool.query("INSERT INTO suggestion(student_id,suggestion) VALUES(($1),($2))",[
            roll_no,suggestion
        ], (err,result) =>{
            if(err){
                console.log(err);
                throw err;
            };
            if(result!=null){
                res.json("successfully added your suggestion");
            }
            else{
                res.json("not able to add suggestion");
            }
        });
    } catch (err) {
        console.error(err.message);
    }
    
})

router.post('/status', async(req,res) =>{
    const roll_no=req.body.roll_no;
    try {
        const status=await pool.query("SELECT * FROM studentstatus WHERE student_roll_no=($1)",[
            roll_no
        ]);
        //console.log(data);
        res.send(status.rows);
    } catch (err) {
        console.error(err.message);
    }

})

router.post('/profile', async(req,res) =>{
    const roll_no=req.body.roll_no;
    try {
        const result= await pool.query("SELECT name,roll_no,branch,div,contact_no,email FROM studentinfo WHERE roll_no=($1)",[
            roll_no
        ]);
        res.json(result.rows)
    } catch (err) {
        console.error(err.message);
    }
})

router.put('/update', async(req,res) =>{
    const roll_no=req.body.roll_no;
    const name=req.body.name;
    const branch=req.body.branch;
    const div=req.body.div;
    const contact_no=req.body.contact_no;
    const email=req.body.email;
    try {
        const result= await pool.query("UPDATE studentinfo SET name=($1),branch=($2),div=($3),contact_no=($4),email=($5) WHERE roll_no=($6)",[
            name, branch, div, contact_no, email, roll_no
        ]);
        if(result!=null){
            res.json("Changes saved");
        }
        else{
            res.json("Not able to save changes");
        }
    } catch (err) {
        console.error(err.message);
    }
})

module.exports= router;