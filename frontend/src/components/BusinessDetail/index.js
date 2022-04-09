import { useState, useEffect } from "react";
import { useParams,useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneBusiness,editDBBusiness,delDBBusiness } from "../../store/business";
import ReviewFormPage from "../ReviewFormPage";
import BusinessReviews from "../BusinessReviews";
//import EditBusinessForm from "./EditBusinessForm";

const BusinessDetail = () => {
  
  const user = useSelector((state)=>state.session.user);
  const { businessId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const business = useSelector((state) => state.business[businessId]);
  console.log("BUSINESS DETAIL",businessId, business);
  
  const [showEditBusinessForm, setShowEditBusinessForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
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
  const [editId, setEditId] = useState(-1);

  const updateName = (e)=>setName(e.target.value);
  const updateDesc = (e)=>setDesc(e.target.value);
  const updateAddress = (e)=>setAddress(e.target.value);
  const updateCity = (e)=>setCity(e.target.value);
  const updateState = (e)=>setState(e.target.value);
  const updateZipcode = (e)=>setZipcode(e.target.value);

  useEffect(() => {
    setShowEditBusinessForm(false);
    setShowEditForm(false);
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

  let content = null;

    content = (
        <div className="business-detail-lists">
        <div>
          <h2>Information</h2>
          <ul>
            {editId !== business.id && (
              <>
            <li>
              <img src={business.image} width="100px"/>
            </li>
            <li>
                <b>Number</b> {business.name}
            </li>
            <li>
                <b>Description</b> {business.description}
            </li>
            <li>
                <b>Address</b> {business.address}
            </li>
            <li>
                <b>City</b> {business.city}
            </li>
            <li>
                <b>Zip Code</b>{business.zip_code}
            </li>
            </>
            )}
            {(editId === business.id)&& (
            <>
                <li>
                  <img src={business.image} width="100px"/>
                </li>
                <li>
                    <input
                        value={business.name} 
                        onChange={updateName}
                        style={{ border: "none", backgroundColor: "transparent"}} disabled
                    />
                </li>
                <li>
                    <input
                        value={desc} 
                        onChange={updateDesc}
                    />
                </li>
                <li>
                <input
                        value={address} 
                        onChange={updateAddress}
                    />
                </li>
                <li>
                <input
                        value={city} 
                        onChange={updateCity}
                    />
                </li>
                <li>
                <input
                        value={zip_code} 
                        onChange={updateZipcode}
                    />
                </li>
            </>)}
            {editId === business.id && (
                <li>
                    <button onClick={(e)=>handleSubmit(e)}>Update</button>
                </li>
            )}
            
            {(business.userId === user.id && editId === -1)  && (
                <li>
                    <button onClick={()=>editBusiness(business)}>Edit</button>
                </li>
            )}
            {(business.userId === user.id && editId === -1) && (
                <li>
                    <button onClick={()=>deleteBusiness(business)}>Delete</button>
                </li>
            )}
            </ul>
        </div>

        <div>
            <h2>
            Reviews
            {/* <button onClick={() => {
            return setShowEditForm(true);
            }}> + </button> */}
            </h2>
            <table>
                <thead>
                    <tr>
                    <th>contents</th>
                    <th>userId</th>
                    <th>rating</th>
                    </tr>
                </thead>
                <tbody>
                    <BusinessReviews business={business} setEditReviewId={setEditReviewId} />
                </tbody>
            </table>
            <ReviewFormPage reviewId={editReviewId} business={business}/>
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
