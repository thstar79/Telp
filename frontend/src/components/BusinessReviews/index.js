import { useEffect,useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import {delDBReview, editDBReview, getAllReviews} from "../../store/reviews";

const BusinessReviews = ({business, setEditReviewId}) => {
    const user = useSelector((state)=>state.session.user);
    let reviews = useSelector((state)=>{
        console.log(business,"REVIEWS");
        if(!business.reviews) return null;
        return business.reviews.map((reviewId)=>state.reviews[reviewId]);
    });
    const [rating, setRating] = useState(5);
    const [contents,setContents] = useState("Write a review");
    console.log(business,"REVIEWS");
    const dispatch = useDispatch();
    const updateRating = (e)=>setRating(e.target.value);
    const updateContents = (e, review)=>{
        console.log("contents 바꿀래요", e.target.value);
        review.contents = e.target.value;
    }

    useEffect(()=>{
        dispatch(getAllReviews(business.id));
    },[business.id,dispatch]);

    if(!reviews) return null;
    
    // let component1 = 
    
    const editReview = async (review) => {
        console.log("고치실래요?", review.id);
        const inputboxes = document.getElementsByClassName(`reviewForm${review.id}`);
        for(let i=0;i<inputboxes.length;++i){
            const inputbox = inputboxes[i];
            inputbox.style={};
            inputbox.disabled = false; 
        }
        //dispatch(editDBReview(review));
    }
    const deleteReview = async (review) => {
        console.log("지우실래요? ", review.id )
        dispatch(delDBReview(review));
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
            <td>
                <input class={`reviewForm${review.id}`} 
                    value={review.contents} 
                    onChange={(e)=>updateContents(e,review)}
                    style={{ border: "none", backgroundColor: "transparent"}} />
            </td>
            <td>
                <input class={`reviewForm${review.id}`} 
                    value={review.userId} 
                    style={{ border: "none", backgroundColor: "transparent"}} disabled />
            </td>
            <td>
                <input class={`reviewForm${review.id}`} 
                    value={review.rating} 
                    style={{ border: "none", backgroundColor: "transparent"}} disabled />
            </td>
            {(review.userId === user.id)  && (
                <td>
                    <button onClick={()=>editReview(review)}>Edit</button>
                </td>
            )}
            {(review.userId === user.id) && (
                <td>
                    <button onClick={()=>deleteReview(review)}>Delete</button>
                </td>
            )}
        </tr>
    ));
};

export default BusinessReviews;
