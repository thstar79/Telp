const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {User} = require('../../db/models');
const { setTokenCookie } = require('../../utils/auth');

router.get('/:id(\\d+)',asyncHandler(async (req,res)=>{
    const id = parseInt(req.params.id,10);
    const user = await User.findByPk(id);
    return res.json({
        user
    });
}));

router.post('/',asyncHandler(async (req,res)=>{
    const {first_name, last_name, email, password, zip_code} = req.body;
    const user = await User.signup({first_name, last_name, email, password, zip_code});

    await setTokenCookie(res, user);

    return res.json({
        user
    });
}));

module.exports = router;