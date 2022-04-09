import { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import {getBusiness} from '../../store/business';
import { loadReviews } from '../../store/reviews';
import BusinessSummary from '../BusinessSummary';

const BusinessHome = ()=>{
    const dispatch = useDispatch();
    const business = useSelector(state => {
      return state.business.list;
    });

    const reviews = useSelector(state=>{
      const reviews = state.reviews;
      return reviews;
    })

    function getReviewInfo(businessId){
      const keys = Object.keys(reviews);
      let firstReview = "";
      let numReviews = 0;
      let avgRating = 0;

      for(let i=0;i<keys.length;++i){
        const idx = keys[i];
        if(reviews[idx].businessId === businessId){
          if(!firstReview)  firstReview = reviews[idx];
          numReviews++;
          avgRating += reviews[idx].rating;
        }
      }
      avgRating /= numReviews;
      return {firstReview,numReviews,avgRating};
    }

    console.log(business,"******************");
    useEffect(()=>{
        console.log("useeffect inside");
        dispatch(getBusiness());
        dispatch(loadReviews());
    },[dispatch])
    
    
    if (!business) {
        return null;
    }
    
    return (
        <>
          <nav>
            {business.map((business) => {
              const reviewInfo = getReviewInfo(business.id);
              return (
                <NavLink key={business.id} to={`/business/${business.id}`}>
                  <BusinessSummary business={business} reviewInfo={reviewInfo} />
                </NavLink>
              );
            })}
          </nav>
        </>
    );
}

export default BusinessHome;