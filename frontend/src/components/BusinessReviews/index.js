import { useEffect,useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import {delDBReview, editDBReview, getAllReviews} from "../../store/reviews";
import StarRating from "../StarRating";
import ReviewUnit from "../ReviewUnit";
import './BusinessReviews.css';

const BusinessReviews = ({business,rating,setRating,setRate,showMessage}) => {
    
    const [cbusiness,setCBusiness] = useState(business);
    const [contents,setContents] = useState("Write a review");
    const [reviewId, setReviewId] = useState();
    const [editId, setEditId] = useState(-1);

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

    console.log(business,"REVIEWS44");
    const dispatch = useDispatch();
    const updateRating = (e)=>setRating(e.target.value);
    const updateContents = (e)=>setContents(e.target.value);

    useEffect(()=>{
        setCBusiness(business);
        dispatch(getAllReviews(cbusiness.id));
    },[business.id,dispatch]);

    if(!reviews) return null;
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
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
                <div className="review_contents1">
                    <textarea className={`reviewForm${review.id}`} 
                        value={review.contents} 
                        style={{ border: "none", backgroundColor: "transparent"}} />
                </div>
                <div>
                    <input className={`reviewForm${review.id}`}
                        type="number"
                        value={review.rating} 
                        style={{ border: "none", backgroundColor: "transparent"}} disabled />
                </div>
            </>)}
            {(editId === review.id)&& (
            <>
                <div className='profile'>
                    <img src='/profile.png' />
                </div>
                <div className="review_contents1">
                    <textarea className={`reviewForm${review.id}`} 
                        value={contents} 
                        onChange={updateContents}
                    />
                </div>
                <div>
                    <input className={`reviewForm${review.id}`}
                        type="number"
                        min="1"
                        max="5"
                        value={rating} 
                        onChange={updateRating}
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
