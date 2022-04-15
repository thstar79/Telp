import { Link } from 'react-router-dom';
import './SearchBar.css';

function SearchBar(){

    function search(e){
        console.log(e.target);
    }

    return (
        <div className="top2">
            <div className="logo">
                <Link to="/business" style={{color:"#ffff99", fontFamily:"cursive", fontSize:"80px", height:"80px"}}>telp<img src='/yelp.png' alt='logo' height="30px"/></Link>
            </div>
            <form onSubmit={search}>
                <div className="search_bar">
                    <div>
                        <input className="search_box" type="text" placeholder="Search.." />
                    </div>
                    <div>
                        <input className="search_box" type="text" placeholder="Location.." />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-find" id="btnFind">
                            <i className="fa fa-search" />
                        </button>
                    </div>
                </div>
            </form>
            <div className='extra'>

            </div>
        </div>
    )

}
export default SearchBar;