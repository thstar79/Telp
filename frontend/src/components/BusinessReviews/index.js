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
    const [userId,setUserId] = useState(3);
    const [reviewId, setReviewId] = useState();
    const [editId, setEditId] = useState(-1);

    console.log(business,"REVIEWS");
    const dispatch = useDispatch();
    const updateRating = (e)=>setRating(e.target.value);
    const updateUserId = (e)=>setUserId(e.target.value);
    const updateContents = (e)=>setContents(e.target.value);

    useEffect(()=>{
        dispatch(getAllReviews(business.id));
    },[business.id,dispatch]);

    if(!reviews) return null;
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log("handle submit");
        const payload = {
            id: reviewId,
            rating,
            contents,
            userId:user.id,
            businessId: business.id,
        };
        console.log(payload,"SUPER PAYLOAD");
        const returnedReview = await dispatch(editDBReview(payload));
        setEditId(-1);
    }

    const editReview = async (review) => {
        console.log("고치실래요?", review.id);
        setUserId(user.id);
        setEditId(review.id);
        setReviewId(review.id);
        setContents(review.contents);
        setRating(review.rating);
        // const inputboxes = document.getElementsByClassName(`reviewForm${review.id}`);
        // for(let i=0;i<inputboxes.length;++i){
        //     const inputbox = inputboxes[i];
        //     inputbox.type="text";
        //     inputbox.style={};
        //     inputbox.disabled = false; 
        // }
        //dispatch(editDBReview(review));
    }
    const deleteReview = async (review) => {
        console.log("지우실래요? ", review.id )
        dispatch(delDBReview(review));
    }

    return reviews.map((review)=>(
        <tr key={review.id}>
            {/* {
                
            } */}
            {(editId !== review.id) && (
            <>
                <td>
                    <input className={`reviewForm${review.id}`} 
                        value={review.userId} 
                        style={{ border: "none", backgroundColor: "transparent"}} disabled />
                </td>
                <td>
                    <input className={`reviewForm${review.id}`} 
                        value={review.contents} 
                        style={{ border: "none", backgroundColor: "transparent"}} />
                </td>
                <td>
                    <input className={`reviewForm${review.id}`}
                        type="number"
                        value={review.rating} 
                        style={{ border: "none", backgroundColor: "transparent"}} disabled />
                </td>
            </>)}
            {(editId === review.id)&& (
            <>
                <td>
                    <input className={`reviewForm${review.id}`} 
                        value={userId} 
                        onChange={updateUserId}
                        style={{ border: "none", backgroundColor: "transparent"}} disabled
                    />
                </td>
                <td>
                    <input className={`reviewForm${review.id}`} 
                        value={contents} 
                        onChange={updateContents}
                    />
                </td>
                <td>
                    <input className={`reviewForm${review.id}`}
                        type="number"
                        min="1"
                        max="5"
                        value={rating} 
                        onChange={updateRating}
                    />
                </td>
            </>)}
            
            {(editId === review.id) && (
                <td>
                    <button onClick={(e)=>handleSubmit(e)}>Update</button>
                </td>
            )}
            
            {(review.userId === user.id && editId === -1)  && (
                <td>
                    <button onClick={()=>editReview(review)}>Edit</button>
                </td>
            )}
            {(review.userId === user.id && editId === -1) && (
                <td>
                    <button onClick={()=>deleteReview(review)}>Delete</button>
                </td>
            )}
        </tr>
    ));
};

export default BusinessReviews;
