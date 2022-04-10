import './BusinessSummary.css';
import DisplayStars from '../DisplayStars';

function BusinessSummary({business, reviewInfo}) {
    let contents;
    if(reviewInfo){
        if(reviewInfo.firstReview){
            contents=reviewInfo.firstReview.contents.substring(0,250);
        }
    }
    return (
    <div className="summary">
        <div className="summary_left">
            <img src={`${business.image}` } width="150px" alt="No Img"/>
        </div>
        <div className='spacer'></div>
        <div className="summary_right">
            <div className="business_name">{business.name}</div>
            <div className="business_rating">Number of Reviews : {reviewInfo.numReviews}</div>
            <DisplayStars rating={reviewInfo.avgRating} id={business.id}>{reviewInfo.numReviews}</DisplayStars>
            <div className="primary-text">{business.zip_code}</div>
            <div className="primary-text">{business.state}</div>
            <div className="primary-text">{business.city}</div>
        {(reviewInfo !== undefined) && (
            <div className="first_comment">
                <div className="spacer">
                    <i className="far fa-comment-dots"></i>
                </div>
                <div className="spacer">
                    {reviewInfo.firstReview.rating} 
                </div>
                <div className="firstreview_contents">
                    {contents}
                </div>
            </div>
            )
        }
        </div>
    </div>
    );
}
export default BusinessSummary;