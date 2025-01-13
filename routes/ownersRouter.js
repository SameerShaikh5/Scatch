const express = require('express')
const app = express()
const router = express.Router()
const ownersModel = require('../models/admin')

router.get('/', (req,res)=>{
    res.send("Owner Router")
})

router.post("/create", async (req,res)=>{
    let owners = await ownersModel.find()
    if(owners.length>0){
        res.send("Can't create more owners")
    }
    else{
        await ownersModel.create({
            fullname:fullname,
            email:email,
            password:password,
        })
        res.send("Owner Created Successfully!")
    }
})

router.get('/admin', (req,res)=>{
    let success = req.flash('success')
    res.render('createproducts', {success:success})
    
})


module.exports = router