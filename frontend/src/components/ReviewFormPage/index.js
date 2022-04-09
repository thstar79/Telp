import React, {useEffect, useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getAllReviews,editDBReview } from "../../store/reviews";
import './ReviewFormPage.css';

function ReviewFormPage({reviewId,business}) {
    const {businessId} = useParams();
    let review = useSelector((state)=>state.reviews[reviewId]);
    const user = useSelector((state)=>state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [rating, setRating] = useState(0);
    const [contents,setContents] = useState("Write a review");
    const [errors, setErrors] = useState([]);

    const updateRating = (e)=>setRating(e.target.value);
    const updateContents = (e)=>setContents(e.target.value);
    useEffect(()=>{
        dispatch(getAllReviews(business.id));
    },[review,dispatch]);

    const setRate = (newrate) => {
        setRating(newrate);
        document.querySelector('.ratefill').style.width = parseInt(newrate * 60) + 'px';
        let items = document.querySelectorAll('.rate_radio');
        items.forEach(function(item, idx){
            if(idx < newrate){
                item.checked = true;
            }else{
                item.checked = false;
            }
        });
    }
    const showMessage = (type) => {
        switch(type){
            case 'rate':
                document.querySelector('.review_rating .warning_msg').style.display = 'block';
                setTimeout(function(){
                    document.querySelector('.review_rating .warning_msg').style.display = 'none';
                },1000);            
                break;
            case 'review':
                document.querySelector('.review_contents .warning_msg').style.display = 'block';
                setTimeout(function(){
                    document.querySelector('.review_contents .warning_msg').style.display = 'none';
                },1000);    
                break;
        }
    }

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
        
        let returnedReview;
        if(reviewId) {
            returnedReview = await dispatch(editDBReview(payload));
        }
        else{
            payload.businessId = businessId;
            returnedReview = await dispatch(editDBReview(payload, 0));
        }
        setRate(0);
        document.querySelector('.review_textarea').value = '';;
    }

    function handleStar(e) {
        let elem = e.target;
        if(elem.classList.contains('rate_radio')){
            setRate(parseInt(elem.value));
        }
    }

    return (
    <div>
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

        <form name="reviewform" class="reviewform" onSubmit={handleSubmit}>
            <input type="hidden" name="rate" id="rate" value="0"/>
            <p class="title_star">Please share your review</p>
     
            <div class="review_rating rating_point">
                <div class="warning_msg">Please select Stars</div>
                <div class="rating" onClick={handleStar}>
                    <div class="ratefill"></div>
                    <input type="checkbox" name="rating" id="rating1" value="1" class="rate_radio" title="1점" />
                    <label for="rating1"></label>
                    <input type="checkbox" name="rating" id="rating2" value="2" class="rate_radio" title="2점" />
                    <label for="rating2"></label>
                    <input type="checkbox" name="rating" id="rating3" value="3" class="rate_radio" title="3점" />
                    <label for="rating3"></label>
                    <input type="checkbox" name="rating" id="rating4" value="4" class="rate_radio" title="4점" />
                    <label for="rating4"></label>
                    <input type="checkbox" name="rating" id="rating5" value="5" class="rate_radio" title="5점" />
                    <label for="rating5"></label>
                </div>
            </div>
            <div class="review_contents">
                <div class="warning_msg">Review should be longer than 5 letters</div>
                <textarea 
                    rows="10" 
                    class="review_textarea"
                    value={contents}
                    onChange={updateContents}
                />
            </div>   
            <div class="cmd">
                <input type="submit" name="save" id="save" value="Write" />
            </div>
        </form>
    </div>
    );
}
export default ReviewFormPage;