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

app.get('/register4',function(req,res){
  res.render('register4');
})

app.get('/register_driver',function(req,res){
  res.render('register_driver');
})

app.get('/find',function(req,res){
    res.render('find');
})

app.get('/find_driver',function(req,res){
  res.render('find_driver');
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

//inserting 4 wheeler data

app.post("/result4", function (req, res){
  console.log("insert working");
   const n1=req.body.no;
   const n2=req.body.name;
   const n3=req.body.date;
   const n4=req.body.chassis;
   const n5=req.body.model;
   const n6=req.body.pollution;
   const n7=req.body.insurance;
   const n8=req.body.permit;
  
const queryString = "INSERT INTO vaahan_users4  VALUES (?,?,?,?,?,?,?,?)"
getConnection().query(queryString, [n1,n2,n3,n4,n5,n6,n7,n8], (err, results, fields) => {
  if (err) {
    console.log("Failed to insert new user: " + err)
    res.sendStatus(500)
    return
  }

  console.log("Inserted a new User  "); 
  // res.send("your data is inserted");
  res.render('result4');
  // res.end()
})
   
})

//insert driver


app.post("/driver", function (req, res){
  console.log("insert working");
   const n1=req.body.fname;
   const n2=req.body.lname;
   const n3=req.body.license;
   const n4=req.body.dob;
   const n5=req.body.validity;
   const n6=req.body.type;
   
  
const queryString = "INSERT INTO drivers  VALUES (?,?,?,?,?,?)"
getConnection().query(queryString, [n1,n2,n3,n4,n5,n6], (err, results, fields) => {
  if (err) {
    console.log("Failed to insert new user: " + err)
    res.sendStatus(500)
    return
  }

  console.log("Inserted a new User  "); 
  // res.send("your data is inserted");
  res.render('driver');
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

//search 2 wheeler
app.get("/search",function(req,res){

    let number=parseInt(req.query.search);
      const queryString = `SELECT * FROM vaahan_users where v_no=${number}` ;
  getConnection().query(queryString, (err, results, fields) => {
    if (err) {
      console.log("Failed to search user: " + err)
      
      // res.sendStatus(500)
      res.send("user not found");
      return
    }

    console.log(results); 

    // res.send("your data is searched");
   
    
    // res.end()
    res.render("search",{
        "data":{
        
        "no":results[0].v_no,
        "name":results[0].regis_name,
        "date":(results[0].regis_date).toDateString(),
        "chassis":results[0].chassis_no,
        "model":results[0].model_name,
        "pollution":results[0].Pollution_certificate
        }
    })
  })
});
//search 4 wheeler
app.get("/search4",function(req,res){

  let number1=parseInt(req.query.search4);
    const queryString = `SELECT * FROM vaahan_users4 where v_no=${number1}` ;
getConnection().query(queryString, (err, results1, fields) => {
  if (err) {
    console.log("Failed to search user: " + err)
    // res.send("failed to search user");
    res.sendStatus(500)
    return
  }

  console.log(results1); 

  // res.send("your data is searched");
 
  
  // res.end()
  res.render("search4",{
      "data1":{
      
      "no":results1[0].v_no,
      "name":results1[0].regis_name,
      "date":(results1[0].regis_date).toDateString(),
      "chassis":results1[0].chassis_no,
      "model":results1[0].model_name,
      "pollution":results1[0].Pollution_certificate,
      "insurance":results1[0].Insurance_certificate,
      "permit":results1[0].goods_permit
      }
  })
})
});

//search driver

app.get("/search_driver",function(req,res){

  let l_number=parseInt(req.query.driver_search);
    const queryString = `SELECT * FROM drivers where license_number=${l_number}` ;
getConnection().query(queryString, (err, results2, fields) => {
  if (err) {
    console.log("Failed to search user: " + err)
    
    // res.sendStatus(500)
    res.send("user not found");
    return
  }

  console.log(results2); 

  // res.send("your data is searched");
 
  
  // res.end()
  res.render("search_driver",{
      "data2":{
      
      "fname":results2[0].first_name,
      "lname":results2[0].last_name,
      "license":(results2[0].license_number),
      "DOB":(results2[0].DOB).toDateString(),
      "validity":(results2[0].valid_till).toDateString(),
      "type":results2[0].vehicle_type
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

  app.get("/allusers4", (req, res) => {
    const connection = getConnection()
    const queryString = "SELECT * FROM vaahan_users4"
    connection.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for users: " + err)
        res.sendStatus(500)
        return
      }
      res.json(rows)
    })
  })

  app.get("/alldrivers", (req, res) => {
    const connection = getConnection()
    const queryString = "SELECT * FROM drivers"
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