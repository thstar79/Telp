function DisplayStars({rating,id}) {
    
    if(rating && id){
        const ratefill = document.getElementById("dsp"+id);
        if(ratefill)    ratefill.style.width = parseInt(rating * 60) + 'px';
        console.log(parseInt(rating*60), "SUPER ********************* RATING", id);
    }
    
    return (
    <div className="review_rating rating_point">
        <div className="rating">
            <div className="ratefill" id={`dsp${id}`}></div>
            <input type="checkbox" name="rating" id="rating1" value="1" className="rate_radio" title="1" />
            <label htmlFor="rating1"></label>
            <input type="checkbox" name="rating" id="rating2" value="2" className="rate_radio" title="2" />
            <label htmlFor="rating2"></label>
            <input type="checkbox" name="rating" id="rating3" value="3" className="rate_radio" title="3" />
            <label htmlFor="rating3"></label>
            <input type="checkbox" name="rating" id="rating4" value="4" className="rate_radio" title="4" />
            <label htmlFor="rating4"></label>
            <input type="checkbox" name="rating" id="rating5" value="5" className="rate_radio" title="5" />
            <label htmlFor="rating5"></label>
        </div>
    </div>
    );
    
}

export default DisplayStars;