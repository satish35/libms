const express=require('express');
const router=express.Router();
const pool=require('../db');

router.post('/', async(req,res) =>{
    const user=req.body.username;
    const password=req.body.password;
    try {
        const checkadmin= await pool.query("SELECT staff_id,password FROM admininfo WHERE username=($1)",
        [user]);
        if(password==checkadmin.rows[0].password)
        {
            res.status(200);
            res.json(checkadmin.rows[0].staff_id);
        }
        else{
            res.status(404);
            res.json("password is incorrect");
        }
    } catch (err) {
        console.error(err.message);
    }
    
})

router.post('/add', async(req,res) =>{
    const title=req.body.title;
    const isbn_code=Number(req.body.isbn_code);
    const author_name=req.body.author_name;
    const quantity=Number(req.body.quantity);
    console.log(title);
    console.log(isbn_code);
    try {
        const result= await pool.query("INSERT INTO book(title,isbn_code,author_name,quantity) VALUES(($1),($2),($3),($4))",
        [title,isbn_code,author_name,quantity]);
        console.log(result);
        if(result!=null){
            res.json("Book successfully added");
        }
        else{
            res.json("Not able to add book");
        }
    } catch (err) {
        console.error(err.message);
    }
})

router.put('/update', async(req,res) =>{
    const title=req.body.title;
    const isbn_code=req.body.isbn_code;
    const author_name=req.body.author_name;
    const quantity=req.body.quantity;
    try {
        pool.query("UPDATE book SET title=($1),author_name=($2),quantity=($3) WHERE isbn_code=($4)",
        [title,author_name,quantity,isbn_code],(err,result) =>{
            if(err){
                console.log(err);
                throw err;
            };
            if(result!=null){
                console.log(result.rows);
            }
            else{
                console.log("book not updated");
            } 
        });
    } catch (err) {
        console.error(err.message);
    }
})

router.post('/status', async(req,res) =>{
    const roll_no=req.body.roll_no;
    try {
        const status= await pool.query("SELECT * FROM studentstatus WHERE student_roll_no=($1)",
        [roll_no]);
        if(status!=null)
        {
            console.log(status.rows);
            res.send(status.rows);
        }
        else{
            console.log("data not found");
        }
    } catch (err) {
        console.error(err.message);
    }
})

router.get('/suggestion', async(req,res) =>{
    try {
        const suggestion=await pool.query("SELECT * FROM suggestion");
        res.json(suggestion.rows);
    } catch (err) {
        console.error(err.message);
    }
})

router.delete('/recdelete/:id', async(req,res) =>{
    try {
        const book_details=Number(req.params.id);
        const sel=await pool.query("SELECT book_details FROM studentstatus WHERE id=($1)",[
            book_details
        ])
        const num=Number(sel.rows[0].book_details);
        const del=await pool.query("DELETE FROM studentstatus WHERE id=($1)",[
            book_details
        ])
        console.log("done");
        const update=await pool.query("UPDATE book SET quantity=quantity+1 WHERE isbn_code=($1)",[
            num
        ])
        res.json("done succesfully");
    } catch (err) {
        console.error(err.message);
    }
})

router.delete('/suggestdelete/:id', async (req,res)=>{
    const id=Number(req.params.id);
    const del = await pool.query("DELETE FROM suggestion WHERE id=($1)",[
        id
    ]);
    res.json("successfully done");
})

module.exports=router;