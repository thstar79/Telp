
// async function ReviewUnit({review}) {
//     console.log(review,"이거 찍히면 대박일듯......");
//     const res = await window.fetch(`/api/users/${review.userId}`);
//     const {user} = await res.json();
//     console.log("DATA : ",user.first_name,user.last_name);
//     return (
//         <>
//         <div key={review.id}>
//             {(editId !== review.id) && (
//             <>
//                 <div>
//                     <img src='/profile.png' />
//                     {/* <img src={profile} /> */}
//                 </div>
//                 <div>
//                     <textarea className={`reviewForm${review.id}`} 
//                         value={review.contents} 
//                         style={{ border: "none", backgroundColor: "transparent"}} />
//                 </div>
//                 <div>
//                     <input className={`reviewForm${review.id}`}
//                         type="number"
//                         value={review.rating} 
//                         style={{ border: "none", backgroundColor: "transparent"}} disabled />
//                 </div>
//             </>)}
//             {(editId === review.id)&& (
//             <>
//                 <div>
//                     <input className={`reviewForm${review.id}`} 
//                         value={userId} 
//                         onChange={updateUserId}
//                         style={{ border: "none", backgroundColor: "transparent"}} disabled
//                     />
//                 </div>
//                 <div>
//                     <textarea className={`reviewForm${review.id}`} 
//                         value={contents} 
//                         onChange={updateContents}
//                     />
//                 </div>
//                 <div>
//                     <input className={`reviewForm${review.id}`}
//                         type="number"
//                         min="1"
//                         max="5"
//                         value={rating} 
//                         onChange={updateRating}
//                     />
//                 </div>
//             </>)}
            
//             {(editId === review.id) && (
//                 <div>
//                     <button onClick={(e)=>handleSubmit(e)}>Update</button>
//                 </div>
//             )}
            
//             {(review.userId === user.id && editId === -1)  && (
//                 <div>
//                     <button onClick={()=>editReview(review)}>Edit</button>
//                     <button onClick={()=>deleteReview(review)}>Delete</button>
//                 </div>
//             )}
//         </div>
//         </>
//         );
// }

// export default ReviewUnit;