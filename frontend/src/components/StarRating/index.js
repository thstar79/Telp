
function StarRating({rating, setRating,setRate}) {
    
    function handleStar(e) {
        let elem = e.target;
        if(elem.classList.contains('rate_radio')){
            setRate(parseInt(elem.value));
        }
    }

    return (
    <div className="review_rating rating_point">
        <div className="warning_msg">Please select Stars</div>
        <div className="rating" onClick={handleStar}>
            <div className="ratefill"></div>
            <input type="checkbox" name="rating" id="rating1" value="1" className="rate_radio" title="1" />
            <label for="rating1"></label>
            <input type="checkbox" name="rating" id="rating2" value="2" className="rate_radio" title="2" />
            <label for="rating2"></label>
            <input type="checkbox" name="rating" id="rating3" value="3" className="rate_radio" title="3" />
            <label for="rating3"></label>
            <input type="checkbox" name="rating" id="rating4" value="4" className="rate_radio" title="4" />
            <label for="rating4"></label>
            <input type="checkbox" name="rating" id="rating5" value="5" className="rate_radio" title="5" />
            <label for="rating5"></label>
        </div>
    </div>
    );
    
}

export default StarRating;