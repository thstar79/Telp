import { useState, useEffect } from "react";
import { useParams,useHistory, Redirect } from "react-router-dom";
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

    const [cbusiness,setCBusiness] = useState(business);
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
    const [errors, setErrors] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const updateName = (e)=>setName(e.target.value);
    const updateDesc = (e)=>setDesc(e.target.value);
    const updateAddress = (e)=>setAddress(e.target.value);
    const updateCity = (e)=>setCity(e.target.value);
    const updateState = (e)=>setState(e.target.value);
    const updateZipcode = (e)=>setZipcode(e.target.value);

    const setRate = (newrate) => {
        setRating(newrate);
        document.querySelector('.ratefill').style.width = parseInt(newrate * 30) + 'px';
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
        // setCBusiness(business);
        setEditReviewId(null);
        dispatch(getOneBusiness(businessId));
    }, [cbusiness, user, dispatch]);

    if (!business) {
        return null;
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
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
        })).then(()=>{
            setIsSubmit(true);
            setErrors([]);
            setEditId(-1);
          })
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
            setIsSubmit(false);
          });
    }

    if(isDelete)    return <Redirect to="/business" />;

    const editBusiness = async (business) => {
        setEditId(business.id);
        setDesc(business.description);
        setImage(business.image);
        setAddress(business.address);
        setCity(business.city);
        setState(business.state);
        setZipcode(business.zip_code);
    }
    const deleteBusiness = async (business) => {
        dispatch(delDBBusiness(business));
        setIsDelete(true);
        // history.push('/business');
    }

    let comInfo = (
        <div className="business-detail-container">
            <div className="top_business_detail">
                <div className="top_business_detail_image" style={{backgroundImage: "url(" + business.image + ")"}} />
                <div>
                    {(business) && editId !== business.id && (
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
                    <div className="business_detail_state">
                        <b>State</b> {business.state}
                    </div>
                    <div className="business_detail_zip">
                        <b>Zipcode</b>{business.zip_code}
                    </div>
                    </>
                    )}
                    {(editId === business.id)&& (
                    <>
                        <div>
                            <ul>
                                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                            </ul>
                        </div>
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
                                className="update_state"
                                value={state} 
                                onChange={updateState}
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
                    {(editId === business.id) && (
                        <div>
                            <button onClick={(e)=>handleSubmit(e)}>Update</button>
                        </div>
                    )}
                    
                    {(user !== undefined) && (business.userId === user.id && editId === -1)  && (
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
      {comInfo}
    </div>
  );
};

export default BusinessDetail;
