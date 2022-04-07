import React, {useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import {useHistory} from "react-router-dom";

function ReviewFormPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const [contents,setContents] = useState("Write a review");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) =>{
        e.preventDefault();
        //dispatch({rating,contents,userId,businessId});
    }

    return (
    <>
    <form onSubmit={handleSubmit}>
        <ul>
            {errors.map((error,idx)=><li key={idx}>{error}</li>)}
        </ul>
        <label>
            Write a review
            <textarea id='review' name='review' rows="5" cols='33'>
                Write a review
            </textarea>
        </label>
        <button type="submit">Submit</button>
    </form>
    </>
    );
}
export default ReviewFormPage;