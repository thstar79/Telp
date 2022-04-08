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
        res.json({message:"success", review});
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

router.put('/:id(\\d+)', async(req,res)=>{
    console.log(req.cookies);
    const id = parseInt(req.params.id,10);
    const review = await Review.findByPk(id);

    if(review) {
        review.contents = req.body.contents;
        review.rating = req.body.rating;
        await review.save();
        console.log("Success update");
        res.json({message:"Success",review});
    }
    else{
        console.log("Failed update");
        res.json({message: "Could not find review please try again."});
    }
});

module.exports = router;