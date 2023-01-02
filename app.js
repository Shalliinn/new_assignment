const express=require('express');
const cookieParser=require('cookie-parser');
const csrf=require('csurf')
const csrfProtection=csrf({cookie:true})
const bodyParser=require('body-parser');
const sequelize=require('./util/database')
const app=express();
var parseForm=bodyParser.urlencoded({extended:false})
var cors=require('cors');
app.use(cookieParser())
//const adminRoutes=require('./routes/admin')
const User=require('./models/user')
//app.use(cors());

//console.log('11');
app.get('/form',csrfProtection,function (req,res){
  console.log('10');
  res.send({csrfToken:req.csrfToken()})
})
app.post('/process',parseForm,csrfProtection,function (req,res){
  res.send('data is being processed')
  console.log(req.body);
  User.create({
    name:req.body.name,
    email:req.body.email,
    phoneNumber:req.body.phoneNumber
})
.then(()=>{
  res.status(200)
})
.catch((err)=>{
  console.log(err);
})

})
//app.use(adminRoutes);

sequelize.sync()
.then(result=>{
  app.listen(3000)
 }).catch(err=>{
  console.log(err)
})