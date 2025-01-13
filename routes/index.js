const express = require('express')
const router = express.Router()
const isLoggedIn = require("../middleware/isLoggedIn")
const productsModel = require('../models/product')
const userModel = require('../models/user')

router.get('/', (req,res)=>{
    let error = req.flash("error")
    res.render("index", {error, loggedin:false})
})

router.get("/shop", isLoggedIn, async(req,res)=>{
    let products = await productsModel.find()
    let success = req.flash('success')
    res.render("shop", {products, success})
})

router.get("/cart", isLoggedIn, async(req,res)=>{
    let user = await userModel.findOne({email:req.user.email}).populate('cart')
    res.render("cart", {user})
})

router.get("/addtocart/:productid", isLoggedIn, async (req,res)=>{
    let user = await userModel.findOne({email:req.user.email})
    user.cart.push(req.params.productid)
    await user.save()
    req.flash('success', "Added to cart")
    res.redirect('/shop')
})

module.exports = router