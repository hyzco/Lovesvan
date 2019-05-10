import firebaseService from '@firebase/app';
import * as types from './actionsTypes';

export const fetchMatches = (matches) => dispatch => {

    dispatch(matchSuccess(matches));
}


export const restoreSession = () => dispatch => {
  dispatch(sessionLoading());
  dispatch(sessionRestoring());

  firebaseService.auth().onAuthStateChanged(user => {
    if (user) {
      dispatch(sessionSuccess(user));
    } else {
      dispatch(sessionLogout());
    }
  });
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

  const gender = "male";

  firebaseService
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
        firebaseService.auth().onAuthStateChanged(function(res){
          if(res){
            if(!res.emailVerified){
            res.sendEmailVerification().then(function() {
               console.log("we sent verification e mail");

               firebaseService.database().ref('Users/'+gender+'/'+res.uid).set({
                 email:res.email,
               }).
               then((data)=>{
                 //success callback
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
})