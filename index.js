const { faker } = require('@faker-js/faker');
const mysql = require("mysql2")
const express = require("express");
const { request } = require('http');
const { createConnection } = require('net');
const app = express()
const path = require("path")
const port =  3000;

app.use(express.urlencoded({extended:true}))
app.set("view engine" , "ejs")
app.set("views")
app.set(path.join(__dirname , "views"))
app.use(express.static(path.join(__dirname,"public")))


const connection = mysql.createConnection({

host:"localhost",
user:"root",
database:"chatx",
password:"06062003"

})




let  createRandomUser = () => {
    return [
      
      faker.internet.userName(),
      faker.internet.password(),
      
    ]
  }



app.get("/login_Page" , (req,res) =>{






res.render("home.ejs")



})


app.post("/login_Page/op" , (req,res) =>{

let {password: formpass} = req.body

let q = `select * from chatx where password='${formpass}'`

try{
    
  connection.query(q, (err,result) =>{
  
  
  if(err){
  
  throw err;
  
  }
  
  
  let user = result[0]
  

  if(formpass != user.password){

  res.render("wronginput.ejs")

  }

  else{


  res.render("index.ejs")


  }
  
})

}catch(err){

console.log(err)


  }

  






})





app.post("/login_Page/nameo" , (req,res) =>{


var name = req.body.username
var password = req.body.password



let q = "insert into chatx  values ('"+name+"' , '"+password+"') "




try{

connection.query(q , (err,result)=>{


if(err){

throw err;

}




res.render("index.ejs")


})




}catch(err){

console.log(err)


}



})













app.get("/sign-in" , (req,res) =>{


res.render("signin.ejs")


})








app.listen(port , (req,res) =>{

console.log(`your server is running om the port ${port}`)


})

