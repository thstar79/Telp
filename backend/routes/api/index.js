const express = require('express');
const router = express.Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

const asyncHandler = require('express-async-handler');
const {setTokenCookie} = require('../../utils/auth.js');
const {User} = require('../../db/models');
const {restoreUser, requireAuth} = require('../../utils/auth.js');

router.use('/session',sessionRouter);
router.use('/users', usersRouter);

router.post('/test', (req,res)=>{
    res.json({requestBody: req.body});
});

router.get('/set-token-cookie', asyncHandler(async (req,res)=>{
    const user = await User.findOne({
        where: {
            email: 'demo@user.io',
        }
    });
    setTokenCookie(res, user);
    return res.json({user});
}));

router.get('/restore-user', restoreUser, (req,res)=>{
    return res.json(req.user);
})

router.get('/require-auth',requireAuth,(req,res)=>{
    return res.json(req.user);
});

module.exports = router;