import { useState, useEffect } from "react";
import { useParams,useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneBusiness,editDBBusiness,delDBBusiness } from "../../store/business";
import ReviewFormPage from "../ReviewFormPage";
import BusinessReviews from "../BusinessReviews";
import './BusinessDetail.css';

const BusinessDetail = () => {
  
  const user = useSelector((state)=>state.session.user);
  const { businessId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const business = useSelector((state) => state.business[businessId]);
  
  const [editReviewId, setEditReviewId] = useState(null);
  const lat = 0;
  const lng = 0;
  const [name, setName] = useState("");
  const [desc,setDesc] = useState("");
  const [image,setImage] = useState("");
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zip_code, setZipcode] = useState();
  const [rating, setRating] = useState(0);
  const [editId, setEditId] = useState(-1);

  const updateName = (e)=>setName(e.target.value);
  const updateDesc = (e)=>setDesc(e.target.value);
  const updateAddress = (e)=>setAddress(e.target.value);
  const updateCity = (e)=>setCity(e.target.value);
  const updateState = (e)=>setState(e.target.value);
  const updateZipcode = (e)=>setZipcode(e.target.value);

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

    useEffect(() => {
        setEditReviewId(null);
        dispatch(getOneBusiness(businessId));
    }, [businessId, dispatch]);

    if (!business) {
    return null;
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log("handle submit");
        dispatch(editDBBusiness({
            id:businessId,
            name,
            description:desc,
            image,
            address,
            city,
            state,
            zip_code,
            lat,
            lng,
            userId:user.id
        }));
        setEditId(-1);
    }

    const editBusiness = async (business) => {
        console.log("고치실래요?", business.id);
        setEditId(business.id);
        setName(user.id);
        setDesc(business.description);
        setImage(business.image);
        setAddress(business.address);
        setCity(business.city);
        setState(business.state);
        setZipcode(business.zip_code);
    }
    const deleteBusiness = async (business) => {
        console.log("지우실래요? ", business.id )
        dispatch(delDBBusiness(business));
        history.push('/business');
    }

    let content = (
        <div className="business-detail-container">
            <div className="top_business_detail">
                <div className="top_business_detail_image" style={{backgroundImage: "url(" + business.image + ")"}} />
                <div>
                    {editId !== business.id && (
                    <>
                    <div className="business_detail_name">
                        {business.name}
                    </div>
                    <div className="business_detail_desc">
                        {business.description}
                    </div>
                    <div className="business_detail_address">
                        <b>Address</b> {business.address}
                    </div>
                    <div className="business_detail_city">
                        <b>City</b> {business.city}
                    </div>
                    <div className="business_detail_zip">
                        <b>Zip Code</b>{business.zip_code}
                    </div>
                    </>
                    )}
                    {(editId === business.id)&& (
                    <>
                        <div className="business_detail_name">
                            <input
                                value={business.name} 
                                onChange={updateName}
                                style={{ border: "none", backgroundColor: "transparent"}} disabled
                            />
                        </div>
                        <div>
                            <textarea
                                className="update_desc"
                                value={desc} 
                                onChange={updateDesc}
                            />
                        </div>
                        <div>
                            <input
                                className="update_addr"
                                value={address} 
                                onChange={updateAddress}
                            />
                        </div>
                        <div>
                            <input
                                className="update_city"
                                value={city} 
                                onChange={updateCity}
                            />
                        </div>
                        <div>
                            <input
                                className="zip_code"
                                value={zip_code} 
                                onChange={updateZipcode}
                            />
                        </div>
                    </>)}
                    {editId === business.id && (
                        <div>
                            <button onClick={(e)=>handleSubmit(e)}>Update</button>
                        </div>
                    )}
                    
                    {(business.userId === user.id && editId === -1)  && (
                        <div className="business_btns">
                            <button onClick={()=>editBusiness(business)}>Edit</button>
                            <button onClick={()=>deleteBusiness(business)}>Delete</button>
                        </div>
                    )}
                </div>
            </div>

            <div className="review_container">
                <h2>Reviews</h2>
                <BusinessReviews business={business} rating={rating} setRating={setRating} setRate={setRate} showMessage={showMessage} />
                <ReviewFormPage reviewId={editReviewId} business={business} rating={rating} setRating={setRating} setRate={setRate} showMessage={showMessage} />
            </div>
        </div>
    );

  return (
    <div className="business-detail">
      <div className={`business-detail-image-background`}>
        <div
          className="business-detail-image"
          style={{ backgroundImage: `${business.image}` }}
        ></div>
      </div>
      {content}
    </div>
  );
};

export default BusinessDetail;
