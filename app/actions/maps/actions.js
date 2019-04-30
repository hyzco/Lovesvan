import * as types from './actionTypes';
import firebaseService from './../../enviroments/firebase';


export function setLocationServiceStatus(status){
	return(dispatch) =>{
		dispatch(locationServices(status));
	}
}

export function AddMark (item){
	return(dispatch)=>{
		dispatch(markSuccess(item));
	}
}



export function setCurrentLocation (getLocation,geoInfo){
	return(dispatch)=>{	
//hıza göre işlemler yaptırt <3

		dispatch(locationSuccess(getLocation));

		var isNull = null;
		isNull = geoInfo.city;

		var countryCode = null;
		var city= null;

		if(isNull != null){
		 countryCode = geoInfo.country;
		 city = geoInfo.city;
		}else{
			countryCode = "NaN";
			city = "NaN";
		}

		firebaseService.auth().onAuthStateChanged(user => {
			if (user) {	
					firebaseService.database().ref("/Location/"+user.uid).set({
					longitude:getLocation.coords.longitude,
					latitude:getLocation.coords.latitude,
					countryCode:countryCode,
					city:city,
					})
				
			} else {
			  console.log("errorSetCurrentAction");
			}
		  });
		}
	};
	  
export function errorLocation(error){
	return(dispatch)=>{
		dispatch(locationError(error));
	}
};



	const reverseGeocodeSuccess =(objGeoReverse)=>({
		type: types.SUCCESS_GEOREVERSE,
		objGeoReverse,
	});

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

	const locationServices = (status) =>({
		type:types.LOCATION_SERVICE,
		status,
	})





