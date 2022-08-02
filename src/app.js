const express=require('express')
const path=require('path')
const hbs=require('hbs')
require('./db/conn')
const Users=require('./models/usermsg')
const { send } = require('process')
const app=express()
const port=process.env.PORT || 3000;


const templatepath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')
const staticpath=path.join(__dirname,'../public')

app.use('/css',express.static(path.join(__dirname,'../node_modules/bootstrap/dist/css')))
app.use('/js',express.static(path.join(__dirname,'../node_modules/bootstrap/dist/js')))
app.use('/js',express.static(path.join(__dirname,'../node_modules/jquery/dist')))
app.use(express.static(staticpath))
app.use(express.urlencoded({extended:false}))
app.set("view engine", "hbs")
app.set("views",templatepath)
hbs.registerPartials(partialpath)
app.get('/',(req,res)=>{
    res.render("index")
})
app.post('/contacts',async(req,res)=>{
    try {
        // res.send(req.body);
        const usersdata=new Users(req.body)
        await usersdata.save();
        res.status(201).render('index')
        
    } catch (error) {
        res.status(500).send(error)
    }
})

app.listen(port,()=>{
    console.log(`listening to the port ${port}`)
})