import {Link} from "react-router-dom";

function MainRight(){
    return (
        <div>
            <Link to="https://github.com/thstar79">
                <div>
                    <p>Taehoon Kim</p>
                    <div>
                        <img src="https://avatars.githubusercontent.com/u/50850699?v=4" width="150px" alt="No Img"/>
                    </div>
                </div>
            </Link>
        </div>);
}

export default MainRight;