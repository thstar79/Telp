const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {Business} = require('../../db/models');
const {Review} = require('../../db/models');

router.get('/',asyncHandler(async (req,res)=>{
    const businesses = await Business.findAll();

    return res.json({
        businesses
    });
}));

router.get('/:id(\\d+)',asyncHandler(async (req,res)=>{
    const id = parseInt(req.params.id,10);;
    const business = await Business.findByPk(id);

    return res.json({
        business
    });
}));

router.post('/',asyncHandler(async (req,res)=>{
    const {name,description,image,address,city,state,zip_code,lat,lng,userId} = req.body;
    const newBusiness = {name,description,image,address,city,state,zip_code,lat,lng,userId}
    const business = await Business.signup(newBusiness);

    if(!business) {
        const err = new Error('Sign Up failed');
        err.status = 401;
        err.title = 'Business Sign Up failed';
        err.errors = ['The provided information is already existed.'];
        return next(err);
    }

    return res.json({
        business
    });
}));

router.delete('/:id(\\d+)', async(req, res) => {
    const id = parseInt(req.params.id,10);
    const business = await Business.findByPk(id);
    if(business){
        await business.destroy();
        return res.json({message: "success"});
    }
    else{
        errors.push('Business is not in database');
        return res.json({message: "business failure"});
    }
});

router.patch('/:id(\\d+)', async(req,res)=>{
    const id = parseInt(req.params.id,10);
    const business = await Business.findByPk(id);
    if(business) {
        business.description = req.body.description;
        business.address = req.body.address;
        business.city = req.body.city;
        business.state = req.body.state;
        business.zip_code = req.body.zip_code;
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        const result = await business.save();
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~", result.json());
        if(!result) {
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            const err = new Error('Update failed');
            err.status = 401;
            err.title = 'Business Update failed';
            err.errors = ['The provided information is already existed.'];
            return next(err);
        }
        else{
            res.json({message:"Success",business});
        }
    }
    else{
        res.json({message: "Could not find review please try again."});
    }
});

router.get('/:id(\\d+)/reviews', asyncHandler(async (req,res)=>{
    
    const businessId = parseInt(req.params.id,10);
    const reviews = await Review.findAll({
        where: {
            businessId,
        }
    });
    return res.json({
        reviews
    });
}));

router.post('/:id(\\d+)/reviews',asyncHandler(async (req,res)=>{
    const businessId = parseInt(req.params.id,10);
    const {rating,contents,userId} = req.body;
    const review = await Review.create({
        rating,
        contents,
        userId,
        businessId,
    });
    return res.json(review);
}));

module.exports = router;