const express = require('express');
const asyncHandler = require('express-async-handler');
const {check, validationResult} = require('express-validator');
const router = express.Router();
const {Review} = require('../../db/models');

router.get('/', async(req,res)=>{
    const reviews = await Review.findAll({
        include: [User,Business],
    });
    res.json({reviews});
});

router.get('/reviews/:id(\\d+)',asyncHandler(async (req,res)=>{

}));

router.post('/')

router.post('/',asyncHandler(async (req,res)=>{
    const {rating,contents,userId,businessId} = req.body;

    const review = Review.build({
        rating,
        contents,
        userId,
        businessId,
    });
    
    const validatorErrors = validationResult(req);
    if(validatorErrors.isEmpty()) {
        await review.save();
        res.json({message:"success"});
    }
    else{
        const errors = validatorErrors.array().map((error)=>error.msg);
        //go back to the review form page
    }
}));

router.delete('/:id(\\d+)', async(req, res) => {
    const id = parseInt(req.params.id,10);
    const review = await Review.findByPk(id);
    if(review){
        await review.destroy();
        res.json({message: "success"});
    }
    else{
        errors.push('Review is not in database');
        res.json({message: "review failure"});
    }
});

router.patch('/:id(\\d+)', async(req,res)=>{
    const userId = req.user.id;
    console.log(req.cookies);
    const id = parseInt(req.params.id,10);
    const review = await Review.findByPk(id);

    if(review) {
        review.contents = req.body.contents;
        await review.save();
        res.json({message:"Success",review});
    }
    else{
        res.json({message: "Could not find review please try again."});
    }
});

module.exports = router;