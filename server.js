const mysql=require('mysql');
const express=require('express');
const bodyParser=require('body-parser');
const path = require('path');
const router = express.Router();

var app=express();

// app.use(bodyParser.urlencoded({exrended: true}));
app.use(express.urlencoded({ extended: true }))
const staticPath = path.join(__dirname,"/public");
// app.use(express.static(__dirname + '../public'));
app.use(express.static(staticPath));

// app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');
app.set('views');

// app.get('/', function(req, res){
//     res.sendFile(__dirname+'/index.html');
// })
// app.get('/users', function(req, res){
//     res.sendFile(__dirname+'/users.html');
// })


app.get('/', function(req, res){
    res.render("home");
})

app.get('/register',function(req,res){
    res.render('register');
})


app.get('/find',function(req,res){
    res.render('find');
})
// app.get('/main', function(req, res){
//     res.render("main");
// })

app.post("/result", function (req, res){
    console.log("insert working");
     const n1=req.body.no;
     const n2=req.body.name;
     const n3=req.body.date;
     const n4=req.body.chassis;
     const n5=req.body.model;
     const n6=req.body.pollution;
    
  const queryString = "INSERT INTO vaahan_users  VALUES (?,?,?,?,?,?)"
  getConnection().query(queryString, [n1,n2,n3,n4,n5,n6], (err, results, fields) => {
    if (err) {
      console.log("Failed to insert new user: " + err)
      res.sendStatus(500)
      return
    }

    console.log("Inserted a new User  "); 
    // res.send("your data is inserted");
    res.render('result');
    // res.end()
  })
     
})





function getConnection() {
     return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      
      password:'password',
      database: 'vaahango'
      
    })
  }
 
  
 
 

//   app.post("/search", function (req, res){
//     console.log("search working");


//   const s1=req.body.search;
  
    
//   const queryString = `SELECT * FROM users where v_no=${s1}` 
//   getConnection().query(queryString, (err, results, fields) => {
//     if (err) {
//       console.log("Failed to search user: " + err)
//     //   res.sendStatus(500)
//     //   return
//     }

//     console.log(results); 

//     // res.send("your data is searched");
   
    
//     res.end()
//   })
     
// })
app.get("/search",function(req,res){

    let number=parseInt(req.query.search);
      const queryString = `SELECT * FROM vaahan_users where v_no=${number}` ;
  getConnection().query(queryString, (err, results, fields) => {
    if (err) {
      console.log("Failed to search user: " + err)
      res.sendStatus(500)
      return
    }

    console.log(results); 

    // res.send("your data is searched");
   
    
    // res.end()
    res.render("search",{
        "data":{
        
        "no":results[0].v_no,
        "name":results[0].regis_name,
        "date":(results[0].regis_date).getFullYear(),
        "chassis":results[0].chassis_no,
        "model":results[0].model_name,
        "pollution":results[0].Pollution_certificate
        }
    })
  })
});
//****************************************************************************************************************** */
app.get("/allusers", (req, res) => {
    const connection = getConnection()
    const queryString = "SELECT * FROM vaahan_users"
    connection.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for users: " + err)
        res.sendStatus(500)
        return
      }
      res.json(rows)
    })
  })
// con.end();

app.listen(3000,()=>{
    console.log("server connected on port 3000");
});

module.exports=app;