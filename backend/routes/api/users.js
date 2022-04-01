const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {User} = require('../../db/models');
const { setTokenCookie } = require('../../utils/auth');

router.post('/',asyncHandler(async (req,res)=>{
    const {first_name, last_name, email, password, zip_code} = req.body;
    const user = await User.signup({first_name, last_name, email, password, zip_code});

    await setTokenCookie(res, user);

    return res.json({
        user
    });
}));

module.exports = router;