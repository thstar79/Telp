import React, {useEffect, useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getAllReviews,editDBReview } from "../../store/reviews";

function ReviewFormPage({reviewId,business}) {
    const {businessId} = useParams();
    let review = useSelector((state)=>state.reviews[reviewId]);
    const user = useSelector((state)=>state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [rating, setRating] = useState(5);
    const [contents,setContents] = useState("Write a review");
    const [errors, setErrors] = useState([]);

    const updateRating = (e)=>setRating(e.target.value);
    const updateContents = (e)=>setContents(e.target.value);
    useEffect(()=>{
        dispatch(getAllReviews(business.id));
    },[review,dispatch]);


    const handleSubmit = async (e) =>{
        e.preventDefault();
        const payload = {
            ...review,
            rating,
            contents,
            userId : user.id,
            businessId: business.id,
        };

        let returnedReview;
        if(reviewId) {
            returnedReview = await dispatch(editDBReview(payload));
        }
        else{
            payload.businessId = businessId;
            returnedReview = await dispatch(editDBReview(payload, 0));
        }
    }

    return (
    <>
    <form onSubmit={handleSubmit}>
        <ul>
            {errors.map((error,idx)=><li key={idx}>{error}</li>)}
        </ul>
        <label>
            Choose a rating
            <input
                type="number"
                placeholder="3"
                min="1"
                max="5"
                required
                value={rating}
                onChange={updateRating}
            />
        </label>
        <label>
            Write a review
            <textarea 
                rows="5" 
                cols='33'
                required
                value={contents}
                onChange={updateContents}
            />
        </label>
        <button type="submit">Submit</button>
    </form>
    </>
    );
}
export default ReviewFormPage;