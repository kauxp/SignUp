const express = require("express");
const User = require("../models/userModel");

const router = express.Router();

router.post("/register", async (req, res) => {
    try{
        const newUser = new User(req.body);
        await newUser.save();
        res.send({
            success: true,
            message: 'User has been registered!'
        });
        const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    req.body.password = hashedPassword;

    }catch(error){
        res.json(error)
    }

});

router.post("/login", async (req, res) => {
  const user = await User.findOne({email: req.body.email});

  if(!user){
    res.send({
        success: false,
        message: 'Email not found'
    })
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword){
    res.send({
        success: false,
        message: 'Invalid password'
    })
    
  }
  else {
    res.send({
        success: true,
        message: 'User has been logged in!'
    });
  }
});


module.exports = router;