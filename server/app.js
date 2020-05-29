const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000
const {MONGOURI} = require('./config/keys');

require('./account');
const app = express();

app.use(bodyParser.json());


const Account = mongoose.model('account');
mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',()=>{
    console.log('Connected to MongoDB');
})

mongoose.connection.on('error',(err)=>{
    console.log('Error',err);
})

app.get('/home',(req,res)=>{
    Account.find({}).sort({name:1})
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{console.log(err)})
})

app.post('/senddata',(req,res)=>{
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    const dob = req.body.dob

    Account.findOne({phone})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error : 'Phone Number Already in use!'}) 
        }
        const account = new Account({
            name: name,
            email: email,
            phone: phone,
            dob: dob
        })
        
        account.save()
        .then(data => {
            res.json({
                message:'Saved successfully!'
            })
        })
        .catch(err=>{
            console.log(err)
        })
    })
    .catch(err=>{
        console.log(err);
    })
})
    

app.get('/get-data/:id',(req,res)=>{
    Account.findById({_id:req.params.id})
    .then(data=>{
        res.send(data)
    })
}
)

app.delete('/delete/:id',(req,res)=>{
    Account.findOne({_id:req.params.id})
    .exec((err,data)=>{
        if(err || !data){
            return res.status(422).json({error:err})
        }
        else{
            data.remove()
            .then(result=>{
                res.json(result)
            }).catch(err=>{
                console.log(err)
            })
        }
    })
})

app.post('/update/:id',(req,res)=>{
    Account.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        email:req.body.email,
        phone: req.body.phone,
        dob: req.body.dob
    }).then(data=>{
        console.log(data)
        res.send('Updated')
    }).catch(err=>console.log(err))
})

app.post('/search',(req,res)=>{
    let userPattern = new RegExp('^'+req.body.query)
    Account.find({phone:{$regex:userPattern}})
    .then(data=>{
        res.json({data})
    }).catch(err=>console.log(err))
})

if(process.env.NODE_ENV == "production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
app.listen(PORT,()=>{
    console.log('Server is running')
})


