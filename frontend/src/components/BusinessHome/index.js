import { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import {getBusiness} from '../../store/business';
import BusinessDetail from '../BusinessDetail';

const BusinessHome = ()=>{
    const dispatch = useDispatch();
    const business = useSelector(state => {
        return state.business.list;
        //map(business => {
        //   console.log('***************',business,"@@@@@@@@@@@@@@@@@@@@@@@@@");
        //     return state.business.list[business.id];
        // });
    });
    
    console.log(business,"******************");
    useEffect(()=>{
        console.log("useeffect inside");
        dispatch(getBusiness());
    },[dispatch])
    
    
    if (!business) {
        return null;
    }
    
    return (
        <>
          <nav>
            {business.map((business) => {
              return (
                <NavLink key={business.id} to={`/business/${business.id}`}>
                  <div
                    // className={
                    //   Number.parseInt(businessId) === business.id
                    //     ? "nav-entry is-selected"
                    //     : "nav-entry"
                    //}
                  >
                    <div className="nav-entry-image">
                      <img src={`${business.image}` } width="50px" />
                    </div>
                    <div>
                      <div className="primary-text">{business.name}</div>
                      <div className="primary-text">{business.zip_code}</div>
                      <div className="primary-text">{business.state}</div>
                      <div className="primary-text">{business.city}</div>
                    </div>
                  </div>
                </NavLink>
              );
            })}
          </nav>
        </>
    );
}

export default BusinessHome;