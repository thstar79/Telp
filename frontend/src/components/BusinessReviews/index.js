import { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import {delDBReview, getAllReviews} from "../../store/reviews";

const BusinessReviews = ({business, setEditReviewId}) => {
    const reviews = useSelector((state)=>{
        console.log(business.reviews,'^^^^^^^^^^^^^^^');
        if(!business.reviews) return null;
        return business.reviews.map((reviewId)=>state.reviews[reviewId]);
    });
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllReviews(business.id));
    },[business.id,dispatch]);

    console.log(reviews, "============================");
    if(!reviews) return null;

    const deleteReview = async (item) => {
        dispatch(delDBReview(item));
    }

    return reviews.map((review)=>(
        <tr key={review.id}>
            {/* <td>
                <img
                    className="review-image"
                    alt={review.image}
                    src={`${review.image}`}
                />
            </td> */}
            <td>{review.contents}</td>
            <td>{review.userId}</td>
            <td>{review.rating}</td>
            {/* {business.owned && (
                <td>
                    <button onClick={()=>setEditReviewId(review.id)}>Edit</button>
                </td>
            )}
            {business.owned && (
                <td>
                    <button onClick={()=>deleteReview(review.id)}>Delete</button>
                </td>
            )} */}
        </tr>
    ));
};

export default BusinessReviews;
