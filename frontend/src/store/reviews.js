export const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";
export const UPDATE_REVIEW = "reviews/UDPATE_REVIEW";
export const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";
export const ADD_REVIEW = "reviews/ADD_REVIEW";

const load = (reviews, businessId) => ({
    type: LOAD_REVIEWS,
    reviews,
    businessId,
});

const update = (review) => ({
    type: UPDATE_REVIEW,
    review,
});

const remove = (reviewId, businessId) => ({
    type: REMOVE_REVIEW,
    reviewId,
    businessId,
});

export const getAllReviews = (id) => async (dispatch) => {
    const res = await fetch(`/api/business/${id}/reviews`);
    if(res.ok) {
        const reviews = await res.json();
        dispatch(load(reviews,id));
        return reviews; 
    }
    else{
        const error = await res.json();
        console.error(error);
        return [];
    }
}

export const editDBReview = (payload, flag=1)=> async (dispatch) =>{
    let method="POST";
    let url = `/api/business/${payload.businessId}/reviews`;
    if(flag === 1){
        url = `/api/reviews/${payload.id}`;
        method="PUT";
    }
    const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(payload),
    });
    if(res.ok) {
        const review = await res.json();
        console.log("REVIEW : ", review);
        dispatch(update(review));
        return review;
    }
    else{
        const error = await res.json();
        console.error("ERROR : ", error);
        return payload;
    }
};

export const delDBReview = (review) => async dispatch => {
    const res = await fetch(`/api/reviews/${review.id}`, {
        method: "DELETE",
    });
    if(res.ok) {
        const result = await res.json();
        dispatch(remove(review.id,review.businessId));
    }
    else{
        const err = await Response.json();
        console.log(err);
    }
};

const initialState = {};

const reviewsReducer = (state=initialState,action) => {
    switch(action.type){
        case LOAD_REVIEWS:
            const newReviews = {};
            action.reviews.forEach((review)=>{
                newReviews[review.id] = review;
            });
            return {...state, ...newReviews};
        case REMOVE_REVIEW:
            const newState = {...state};
            delete newState[action.reviewId];
            return newState;
        case UPDATE_REVIEW:
            return {...state, [action.review.id]: action.review}
        default:
            return state;
    }
}

export default reviewsReducer;