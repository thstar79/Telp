import {csrfFetch} from './csrf';
import {LOAD_REVIEWS,REMOVE_REVIEW,ADD_REVIEW} from "./reviews";

const SET_BUSINESS = 'business/setBusiness';
const REMOVE_BUSINESS = 'business/removeBusiness';
const LOAD = "business/load";

const setBusiness = (business)=>{
    return {
        type: SET_BUSINESS,
        payload: business,
    };
};

const removeBusiness = ()=>{
    return {
        type: REMOVE_BUSINESS,
    };
};

const load = (list) => ({
    type:LOAD,
    list,
});

const initialState = {list: []};

const sortList = (list) => {
    return list
      .sort((businessA, businessB) => {
        return businessA.zip_code - businessB.zip_code;
      })
      .map((business) => business.id);
  };
  
export const signup = (business) => async (dispatch) => {
    const {name,description,image,address,city,state,zip_code,lat,lng,userId} = business;
    console.log("여기까지는 당연해");
    const response = await csrfFetch('/api/business',{
        method: "POST",
        body: JSON.stringify({
            name,
            description,
            image,
            address,
            city,
            state,
            zip_code,
            //lat,
            //lng,
            userId
        }),
    });
    const data = await response.json();
    dispatch(setBusiness(data.business));
    return response;
}

export const getOneBusiness = (id) => async (dispatch) => {
    console.log("Get ONE BUSINESS");
    const response = await fetch(`/api/business/${id}`);
    if(response.ok) {
        const {business} = await response.json();
        dispatch(setBusiness(business));
        console.log(business,"*********");
    }
}
export const getBusiness = () => async (dispatch) => {
    const response = await fetch(`/api/business`);
    console.log("나 여기는 오니?");
  
    if (response.ok) {
      const list = await response.json();
      dispatch(load(list));
    }
  };

const businessReducer = (state=initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_BUSINESS:
            if(!state[action.payload.id]){
                //newState = Object.assign({},state);
                newState = {
                    ...state,
                    [action.payload.id]: action.payload
                };
                const businessList = newState.list.map((id)=>newState[id]);
                businessList.push(action.payload);
                newState.list = businessList;
                return newState;
            }
            else{
                return {
                    ...state,
                    [action.payload.id] : {
                        ...state[action.payload.id],
                        ...action.payload,
                    },
                };
            }
        case REMOVE_BUSINESS:
            newState = Object.assign({},state);
            newState.business = null;
            return newState;
        case LOAD:
            const allBusiness = {};
            console.log("ACTIOn ", action.list.businesses);
            action.list.businesses.forEach((business)=>{
                console.log(business,"@@@@@@@");
                allBusiness[business.id] = business;
                console.log(allBusiness);
            });
            return {...allBusiness,...state,list: action.list.businesses};
        case LOAD_REVIEWS:
            console.log("AM I HERER>K>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            return {
                ...state,
                [action.businessId]: {
                    ...state[action.businessId],
                    reviews: action.reviews.map((review)=>{
                        console.log(review);
                        return review.id
                    }),
                },
            };
        case REMOVE_REVIEW:
            return {
                ...state,
                [action.businessId]: {
                    reviews: state[action.businessId].reviews.filter(
                        (reviewId) => reviewId !== action.reviewId
                    ),
                }
            }
        case ADD_REVIEW:
            return {
                ...state,
                [action.review.businessId]: {
                    ...state[action.review.businessId],
                    reviews: [...state[action.review.businessId].reviews,action.review.id],
                },
            };

        default:
            return state;
    }
}

export default businessReducer;