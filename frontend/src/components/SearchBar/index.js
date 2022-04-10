import { Link } from 'react-router-dom';
import './SearchBar.css';

function SearchBar(){
    return (
        <div className="top2">
            <div className="logo">
                <Link to="/business" style={{color:"#ffff99", fontFamily:"cursive", fontSize:"80px", height:"80px"}}>telp<img src='/yelp.png' alt='logo' height="30px"/></Link>
            </div>
            <div className="search_bar">
                <input className="search_box" type="text" placeholder="Search.." />
                <button type="submit" className="btn btn-success">
                    <i className="fa fa-search"></i>
                </button>
            </div>
            <div className='extra'>

            </div>
        </div>
    )

}
export default SearchBar;