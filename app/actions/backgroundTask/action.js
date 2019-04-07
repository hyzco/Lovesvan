import * as types from './actionTypes';


export function updateCurrentLocation (getLocation){
	return(dispatch)=>{	
//hıza göre işlemler yaptırt <3
		dispatch(locationSuccess(getLocation));
		}
	};
	  
	const locationSuccess = (location) =>({
		type:types.UPDATE_LOCATION,
		location,
	});





