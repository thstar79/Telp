import { useEffect,useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import {delDBReview, editDBReview, getAllReviews} from "../../store/reviews";
import StarRating from "../StarRating";
import DisplayStars from "../DisplayStars";
import './BusinessReviews.css';

const BusinessReviews = ({business,rating,setRating,setRate,showMessage}) => {
    
    const [cbusiness,setCBusiness] = useState(business);
    const [contents,setContents] = useState("Write a review");
    const [reviewId, setReviewId] = useState();
    const [editId, setEditId] = useState(-1);
    const [isSubmit, setIsSubmit] = useState(false);

    const user = useSelector((state)=>state.session.user);
    let reviews = useSelector((state)=>{
        const arr = [];
        const keys = Object.keys(state.reviews);
        for(let i=0;i<keys.length;++i){
            const review = state.reviews[keys[i]];
            if(review.businessId === cbusiness.id){
                arr.push(review);
            }
        }
        if(arr.length === 0) return null;
        return arr;
    });

    // if(rating && id){
    //     const ratefill = document.getElementById("rdsp"+id);
    //     if(ratefill)    ratefill.style.width = parseInt(rating * 30) + 'px';
    // }

    const setRate1 = (newrate) => {
        setRating(newrate);
        document.querySelector('.ratefill1').style.width = parseInt(newrate * 30) + 'px';
        let items = document.querySelectorAll('.rate_radio1');
        items.forEach(function(item, idx){
            if(idx < newrate){
                item.checked = true;
            }else{
                item.checked = false;
            }
        });
    }
    const showMessage1 = (type) => {
        switch(type){
            case 'rate':
                document.querySelector('.review_rating1 .warning_msg1').style.display = 'block';
                setTimeout(function(){
                    document.querySelector('.review_rating1 .warning_msg1').style.display = 'none';
                },1000);            
                break;
            case 'review':
                document.querySelector('.review_contents1 .warning_msg1').style.display = 'block';
                setTimeout(function(){
                    document.querySelector('.review_contents1 .warning_msg1').style.display = 'none';
                },1000);    
                break;
        }
    }

    const dispatch = useDispatch();
    const updateRating = (e)=>setRating(e.target.value);
    const updateContents = (e)=>setContents(e.target.value);

    useEffect(()=>{
        dispatch(getAllReviews(cbusiness.id));
        setIsSubmit(false);
    },[business.id,isSubmit,dispatch]);

    if(!reviews) return null;
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setIsSubmit(true);
        const payload = {
            id: reviewId,
            rating,
            contents,
            userId:user.id,
            businessId: business.id,
        };
        await dispatch(editDBReview(payload));
        setEditId(-1);
    }

    const editReview = async (review) => {
        setEditId(review.id);
        setReviewId(review.id);
        setContents(review.contents);
        setRating(review.rating);
    }

    const deleteReview = async (review) => {
        dispatch(delDBReview(review));
    }

    return reviews.map((review)=>(
        <div key={review.id} className="reviewUnit">
            {(editId !== review.id) && (
            <>
                <div className='profile'>
                    <img src='/profile.png' />
                </div>
                <div className="rating_date">
                    <div className="review_rating1 rating_point1">
                        <div className="rating1">
                            {/* <div className="ratefill1" id={`rdsp${id}`}></div> */}
                            <div className="ratefill1" style={{width:`${parseInt(review.rating * 20)}px`, height:"20px"}}></div>
                            <input type="checkbox" name="rating" id="rating11" value="1" className="rate_radio1" title="1" />
                            <label htmlFor="rating1"></label>
                            <input type="checkbox" name="rating" id="rating21" value="2" className="rate_radio1" title="2" />
                            <label htmlFor="rating2"></label>
                            <input type="checkbox" name="rating" id="rating31" value="3" className="rate_radio1" title="3" />
                            <label htmlFor="rating3"></label>
                            <input type="checkbox" name="rating" id="rating41" value="4" className="rate_radio1" title="4" />
                            <label htmlFor="rating4"></label>
                            <input type="checkbox" name="rating" id="rating51" value="5" className="rate_radio1" title="5" />
                            <label htmlFor="rating5"></label>
                        </div>
                    </div>
                    <div className="date1">
                        {review.updatedAt.substring(0,10)}
                    </div>
                </div>
                <div className="review_contents1">
                    <textarea className={`reviewForm${review.id}`} 
                        value={review.contents} 
                        style={{ border: "none", backgroundColor: "transparent"}} />
                </div>
            </>)}
            {(editId === review.id)&& (
            <>
                <div className='profile'>
                    <img src='/profile.png' />
                </div>
                <div>
                    <div>
                        <input className={`reviewForm${review.id}`}
                            type="number"
                            min="1"
                            max="5"
                            value={rating} 
                            onChange={updateRating}
                        />
                    </div>
                </div>
                <div className="review_contents1">
                    <textarea className={`reviewForm${review.id}`} 
                        value={contents} 
                        onChange={updateContents}
                    />
                </div>
            </>)}
        
            {(editId === review.id) && (
                <div>
                    <button onClick={(e)=>handleSubmit(e)}>Update</button>
                </div>
            )}
        
            {(user!==undefined) && (review.userId === user.id && editId === -1)  && (
                <div>
                    <button onClick={()=>editReview(review)}>Edit</button>
                    <button onClick={()=>deleteReview(review)}>Delete</button>
                </div>
            )}
        </div>
    ));
};

export default BusinessReviews;
