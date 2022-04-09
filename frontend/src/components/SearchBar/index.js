import './SearchBar.css';

function SearchBar(){
    return (
        <div className="top2">
            <div className="logo">
                Telp<img src='yelp.png' alt='logo' height="30px"/>
            </div>
            <div className="searchBar">
                <input type="text" placeholder="Search.." />
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