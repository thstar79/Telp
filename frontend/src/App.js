import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";

import * as sessionActions from "./store/session";
import Top from "./components/Top";
import Main from "./components/Main";
import Bot from "./components/Bot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(()=>{
    dispatch(sessionActions.restoreUser()).then(()=>setIsLoaded(true));
  },[dispatch]);

  return (
    <>
    <Top />
    <Main />
    <Bot />
    {/* <Top isLoaded={isLoaded} />
    {isLoaded && (
      <Main />
    )}
    <Bot /> */}
    </>
  );
}

export default App;
