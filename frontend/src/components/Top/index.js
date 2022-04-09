import Navigation from '../Navigation';
import SearchBar from '../SearchBar';
import './Top.css';

function Top({isLoaded}){
    return (
    <div className="Top">
        <div>
            <Navigation isLoaded={isLoaded} />
        </div>
        <div>
            <SearchBar />
        </div>
    </div>);
}

export default Top;