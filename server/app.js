const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./account');

const app = express();
app.use(bodyParser.json());

const mongoURI = 'mongodb+srv://rentomojo:OltQXK07mQBuv50q@cluster0-owz33.mongodb.net/test?retryWrites=true&w=majority'

const Account = mongoose.model('account');
mongoose.connect(mongoURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',()=>{
    console.log('Connected to MongoDB');
})

mongoose.connection.on('error',(err)=>{
    console.log('Error',err);
})

app.get('/',(req,res)=>{
    Account.find({})
    .then(data=>{
        res.send(data)
    }).catch(err=>console.log(err))
})

app.post('/send-data',(req,res)=>{
    const account = new Account({
        name:req.body.name,
        email:req.body.email,
        phone: req.body.phone,
        dob: req.body.dob
    })
    account.save()
    .then(data=>{
        console.log(data)
        res.send('Success')
    }).catch(err=>console.log(err))
    
})

app.post('/delete',(req,res)=>{
    Account.findByIdAndRemove(req.body._id)
    .then(data=>{
        console.log(data)
        res.send('deleted')
    }).catch(err=>console.log(err))
})

app.post('/update',(req,res)=>{
    Account.findByIdAndUpdate(req.body._id,{
        name:req.body.name,
        email:req.body.email,
        phone: req.body.phone,
        dob: req.body.dob
    }).then(data=>{
        console.log(data)
        res.send('Updated')
    }).catch(err=>console.log(err))
})
app.listen(3000,()=>{
    console.log('Server is running')
})


