const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {Business} = require('../../db/models');
const {Review} = require('../../db/models');

router.get('/',asyncHandler(async (req,res)=>{
    console.log("여기는 business ALL");
    const businesses = await Business.findAll();

    return res.json({
        businesses
    });
}));

router.get('/:id(\\d+)',asyncHandler(async (req,res)=>{
    console.log("여기는 business get One");
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

    return res.json({
        business
    });
}));

router.get('/:id/reviews', asyncHandler(async (req,res)=>{
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
    console.log("PLEASEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    const businessId = parseInt(req.params.id,10);
    const {rating,contents,userId} = req.body;
    console.log("REQ BODY : ", req.body, businessId);
    const review = await Review.create({
        rating,
        contents,
        userId,
        businessId,
    });
    return res.json(review);
}));

module.exports = router;