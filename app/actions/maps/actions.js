import * as types from './actionTypes';
import firebaseService from './../../enviroments/firebase';




export function AddMark (item){
	return(dispatch)=>{
		dispatch(markSuccess(item));
	}
}



export function setCurrentLocation (getLocation){
	return(dispatch)=>{	
//hıza göre işlemler yaptırt <3
		dispatch(locationSuccess(getLocation));

		firebaseService.auth().onAuthStateChanged(user => {
			if (user) {
				firebaseService.database().ref("/Location/"+user.uid).set({
					longitude:getLocation.coords.longitude,
					latitude:getLocation.coords.latitude,
				})
			} else {
			  console.log("error");
			}
		  });
		}
	};
	  
export function errorLocation(error){
	return(dispatch)=>{
		dispatch(locationError(error));
	}
}
   const markSuccess = (markSuccess)=>({
		type: types.MARK_SUCCESS,
		markSuccess,
	})

	const locationSuccess = (location) =>({
		type:types.SUCCESS_LOCATION,
		location,
	});
	const locationError = (error) =>({
		type:types.FAILED_LOCATION,
		error,
	});





