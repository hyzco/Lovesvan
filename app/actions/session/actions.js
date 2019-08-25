import firebaseService from '@firebase/app';
import * as types from './actionsTypes';

export const setWizardState = (wizardState,_uid) => dispatch => {
  var ref = firebaseService.database().ref("/Users/"+_uid);
    ref.update({
       wizardState:wizardState,
    }).then(function(){
           dispatch(wizardSuccess(wizardState));
  	}).catch(function(error){
            console.log(error.message);
    });
}

export const fetchMatches = (matches) => dispatch => {
    dispatch(matchSuccess(matches));
}

export const fetchLastMessages = (lastMessages) => dispatch =>{
  dispatch(lastMessageSuccess(lastMessages));
}

export const setUserData = (userData) => dispatch =>{
  console.log("action",userData);
  dispatch(userDataSuccess(userData));
}

export const restoreSession = () => dispatch => {
  try{
  dispatch(sessionLoading());
  dispatch(sessionRestoring());

  firebaseService.auth().onAuthStateChanged(user => {
    if (user) {
      dispatch(sessionSuccess(user));
    } else {
      dispatch(sessionLogout());
    }
  });
}
catch(e){
console.log(e);
}
};

export const loginUser = (email, password) => dispatch => {
  dispatch(sessionLoading());
  firebaseService
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      dispatch(sessionSuccess(user));
    })
    .catch(error => {
      dispatch(sessionError(error.message));
    });
};

export const signupUser = (email, password) => dispatch => {
  dispatch(sessionLoading());

  firebaseService
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
        firebaseService.auth().onAuthStateChanged(function(res){
          if(res){
            if(!res.emailVerified){
            res.sendEmailVerification().then(function() {
               console.log("we sent verification e mail");

               firebaseService.database().ref('Users/'+res.uid).set({
                 email:res.email,
                 wizardState: false,
               }).
               then((data)=>{
                 //success callback
                 console.log(data);
                 console.log('database yükleme başarılı' , data)
               }).catch((error)=>{
                 //error callback
                 console.log('database yükleme başarısız', error)
               })
             
              }).catch(function(error) {
                console.log(error);
              });
            }else{
                console.log("account verified");
            }
          }else{
              console.log("error");
          }
        });
      
      dispatch(signupSuccess(res));      
    })
    .catch(error => {
      dispatch(sessionError(error.message));
    });
};


export const logoutUser = () => dispatch => {
  dispatch(sessionLoading());

  firebaseService
    .auth()
    .signOut()
    .then(() => {
      dispatch(sessionLogout());
    })
    .catch(error => {
      dispatch(sessionError(error.message));
    });
};


const sessionRestoring = () => ({
  type: types.SESSION_RESTORING
});

const sessionLoading = () => ({
  type: types.SESSION_LOADING
});

const sessionSuccess = (user) => ({
  type: types.SESSION_SUCCESS,
  user,
});

const signupSuccess = user => ({
  type: types.SIGNUP_SUCCESS,
  user
});

const sessionError = error => ({
  type: types.SESSION_ERROR,
  error
});

const sessionLogout = () => ({
  type: types.SESSION_LOGOUT
});

const matchSuccess = (matches) => ({
    type: types.MATCHES_SUCCESS,
    matches
});

const lastMessageSuccess = (lastMessages) => ({
   type: types.LASTMESSAGES_SUCCESS,
   lastMessages
});

const wizardSuccess = (wizardState) =>({
  type: types.WIZARD_SUCCESS,
  wizardState
});

const userDataSuccess = (userData) =>({
    type: types.USERDATA_SUCCESS,
    userData
});