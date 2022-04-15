import {Switch,Route} from "react-router-dom";

import BusinessSignupFormPage from "./BusinessSignUpFormPage";
import BusinessHome from "./BusinessHome";
import BusinessDetail from "./BusinessDetail";
import LoginFormPage from "./LoginFormPage";
import SignupFormPage from "./SignUpFormPage";

function Main2(){
    return (
        <Switch>
            <Route exact path="/">
                <BusinessHome />
            </Route>
            <Route path='/login'>
                <LoginFormPage />
            </Route>
            <Route path="/signup">
                <SignupFormPage />
            </Route>
            <Route path="/business/signup">
                <BusinessSignupFormPage />
            </Route>
            <Route exact path='/business'>
                <BusinessHome />
            </Route>
            <Route path="/business/:businessId">
                <BusinessDetail />
            </Route>
            <Route>
                404 Error
            </Route>
        </Switch>
    );
}

export default Main2;