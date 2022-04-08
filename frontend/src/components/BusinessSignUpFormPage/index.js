import React, { useState,useEffect } from "react";
import {useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import * as businessActions from "../../store/business";

function BusinessSignupFormPage() {
  const dispatch = useDispatch();
  let history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const businessList = useSelector((state)=>state.business.list);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip_code, setZipcode] = useState();
  
  const [errors, setErrors] = useState([]);

  const lat = 0;
  const lng = 0;

  if (!sessionUser) return <Redirect to="/login" />;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(businessActions.editDBBusiness({name,description:desc,image,address,city,state,zip_code,lat,lng,userId:sessionUser.id},0));
    // .catch(async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) setErrors(data.errors);
    // });
    console.log("리다이렉트 직전");
    //
    history.push('/business');
  };

  return (
    <form onSubmit={e=>{handleSubmit(e);return <Redirect to="/login" />;}}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        description
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
      </label>
      <label>
        imageURL
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
      </label>
      <label>
        Address
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <label>
        City
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </label>
      <label>
        State
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </label>
      <label>
        Zip Code
        <input
          type="text"
          pattern="(^\d{5}$)"
          value={zip_code}
          onChange={(e) => setZipcode(e.target.value)}
          required
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default BusinessSignupFormPage;