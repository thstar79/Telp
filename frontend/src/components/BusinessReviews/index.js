import { useEffect,useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import {delDBReview, editDBReview, getAllReviews} from "../../store/reviews";
import StarRating from "../StarRating";

const BusinessReviews = ({business,rating,setRating,setRate,showMessage}) => {
    
    const [cbusiness,setCBusiness] = useState(business);
    //const [rating, setRating] = useState(5);
    const [contents,setContents] = useState("Write a review");
    const [userId,setUserId] = useState(3);
    const [reviewId, setReviewId] = useState();
    const [editId, setEditId] = useState(-1);
    const [isSubmit, setIsSubmit] = useState(false);

    const user = useSelector((state)=>state.session.user);
    let reviews = useSelector((state)=>{
        console.log(Object.keys(state.reviews).length,"666666666666666666666666666666666666");
        const arr = [];
        const keys = Object.keys(state.reviews);
        for(let i=0;i<keys.length;++i){
            const review = state.reviews[keys[i]];
            if(review.businessId === cbusiness.id){
                arr.push(review);
            }
        }
        console.log(state.reviews,arr,"777777777777777777777777777777777777777777777");
        if(arr.length === 0) return null;
        return arr;
    });
    console.log(reviews,"8888888888888888888888888888888888");

    console.log(business,"REVIEWS44");
    const dispatch = useDispatch();
    const updateRating = (e)=>setRating(e.target.value);
    const updateUserId = (e)=>setUserId(e.target.value);
    const updateContents = (e)=>setContents(e.target.value);

    useEffect(()=>{
        console.log("000000000000000000000000000000000",cbusiness);
        dispatch(getAllReviews(cbusiness.id));
        console.log("555555555555555555555555555555555555555555555555");
        setIsSubmit(false);
    },[business.id,isSubmit,dispatch]);

    if(!reviews) return null;
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log("handle submit");
        setIsSubmit(true);
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
