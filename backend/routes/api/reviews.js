const express = require('express');
const asyncHandler = require('express-async-handler');
const {check, validationResult} = require('express-validator');
const router = express.Router();
const {User, Business, Review} = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const reviewValidator = [
    check("rating")
    .exists({checkFalsy: true})
    .withMessage("Please provide a name for the business"),
    check("contents")
    .exists({checkFalsy: true})
    .withMessage("Please provide a description for the business")
    .isLength({max:500})
    .withMessage("Reviews should be no more than 500 characters"),
    handleValidationErrors
];

router.get('/', async(req,res)=>{
    const reviews = await Review.findAll({
        include: [User,Business],
    });
    res.json({reviews});
});

router.post('/',reviewValidator,asyncHandler(async (req,res,next)=>{
    const {rating,contents,userId,businessId} = req.body;

    const review = Review.build({
        rating,
        contents,
        userId,
        businessId,
    });
    
    const result = await review.save();
    return res.json(result);
    // const validatorErrors = validationResult(req);
    // if(validatorErrors.isEmpty()) {
        
    // }
    // else{
    //     const errors = validatorErrors.array().map((error)=>error.msg);
    //     return next(errors);
    // }
}));

router.delete('/:id(\\d+)', async(req, res) => {
    const id = parseInt(req.params.id,10);
    const review = await Review.findByPk(id);
    if(review){
        await review.destroy();
        return res.json({message: "success"});
    }
    else{
        errors.push('Review is not in database');
        return res.json({message: "review failure"});
    }
});

router.put('/:id(\\d+)', reviewValidator, async(req,res)=>{
    const id = parseInt(req.params.id,10);
    const review = await Review.findByPk(id);

    if(review) {
        review.contents = req.body.contents;
        review.rating = req.body.rating;
        const result = await review.save();
        return res.json(result);
    }
    else{
        return res.json({message: "Could not find review please try again."});
    }
});

module.exports = router;