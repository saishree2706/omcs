const express = require('express')
const router = express.Router()

const User = require('../models/User')

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.send('Error...' + err)
    }
})

router.post('/',async(req,res)=>
{
    const user=new User({
        title:req.body.title,
        author:req.body.author,
        copies:req.body.copies
    })
    
    try{
       const u1= await user.save()
       res.json(u1)
    }catch(err)
    {
        res.send('Error... '+err)
    }
})

module.exports = router