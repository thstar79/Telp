import React, {useEffect, useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { useParams, useHistory,Link } from "react-router-dom";
import { getAllReviews,editDBReview } from "../../store/reviews";
import StarRating from "../StarRating";
import './ReviewFormPage.css';

function ReviewFormPage({reviewId,business,rating,setRating,setRate,showMessage}) {
    const {businessId} = useParams();
    let review = useSelector((state)=>state.reviews[reviewId]);
    const user = useSelector((state)=>state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    
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

        if(rating === 0){
            showMessage('rate');
            return;
        }
        if(document.querySelector('.review_textarea').value.length < 5){
            showMessage('review');
            return;
        }
        console.log("이건 좀 아닌 것 같은데.. 희망이 있다. 1111");
        let returnedReview;
        if(reviewId) {
            returnedReview = dispatch(editDBReview(payload))
                                    .then(()=>{
                                        setErrors([]);
                                        setRate(0);
                                        document.querySelector('.review_textarea').value = '';
                                    })
                                    .catch(async (res) => {
                                        console.log("여기엔 희망이 있다. ");
                                        const data = await res.json();
                                        if (data && data.errors) setErrors(data.errors);
                                    });
        }
        else{
            payload.businessId = businessId;
            returnedReview = dispatch(editDBReview(payload, 0))
                                    .then(()=>{
                                        setErrors([]);
                                        setRate(0);
                                        document.querySelector('.review_textarea').value = '';
                                    })
                                    .catch(async (res) => {
                                        console.log("여기엔 희망이 있다. 111");
                                        const data = await res.json();
                                        console.log(data);
                                        console.log(data.errors);
                                        if (data && data.errors) setErrors(data.errors);
                                    });
        }
        // setRate(0);
        // document.querySelector('.review_textarea').value = '';
        return returnedReview;
    }

    return (
    <div>
        <form name="reviewform" className="reviewform" onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <input type="hidden" name="rate" id="rate" value="0"/>
            <p className="title_star">Please share your review</p>
            <StarRating rating={rating} setRating={setRating} setRate={setRate} />
            <div className="review_contents">
                <div className="warning_msg">Review should be longer than 5 letters</div>
                <textarea 
                    rows="10" 
                    className="review_textarea"
                    value={contents}
                    onChange={updateContents}
                />
            </div>   
            {user && (
            <div className="cmd">
                <button name="save" id="save"> Write </button>
            </div>
            )}
            {!user && (
            <div className="cmd">
                <Link to="/login">
                    <input type='button' value="Login" />
                </Link>
            </div>
            )}
        </form>
    </div>
    );
}
export default ReviewFormPage;