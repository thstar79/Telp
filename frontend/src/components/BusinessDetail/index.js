import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneBusiness } from "../../store/business";
import ReviewFormPage from "../ReviewFormPage";
import BusinessReviews from "../BusinessReviews";
//import EditBusinessForm from "./EditBusinessForm";

const BusinessDetail = () => {
    console.log("BUSINESS DETAIL");
  const { businessId } = useParams();
  const dispatch = useDispatch();
  const business = useSelector((state) => state.business[businessId]);
  
  const [showEditBusinessForm, setShowEditBusinessForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editReviewId, setEditReviewId] = useState(null);
  const [flag, setFlag] = useState(0);

  useEffect(() => {
    setShowEditBusinessForm(false);
    setShowEditForm(false);
    setEditReviewId(null);
    dispatch(getOneBusiness(businessId));
  }, [businessId, dispatch]);

  if (!business) {
    return null;
  }

  let content = null;

    content = (
        <div className="business-detail-lists">
        <div>
            <h2>Information</h2>
            <ul>
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
            </ul>
        </div>
        <div>
            <h2>
            Reviews
            <button onClick={() => {
            return setShowEditForm(true);
            }}> + </button>
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
        {/* <div>
          <h1 className="bigger">{business.name}</h1>
          {business.captured && (
            <button onClick={() => setShowEditPokeForm(true)}>Edit</button>
          )}
        </div> */}
      </div>
      {content}
    </div>
  );
};

export default BusinessDetail;
