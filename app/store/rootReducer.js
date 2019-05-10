import { combineReducers } from 'redux';

import routesReducer from '../reducers/routes/routesReducer';
import profileReducer from '../reducers/profile/profileReducer';
import sessionReducer from '../reducers/session/sessionReducer';
import todolistReducer from '../reducers/todolist/todolistReducer';
import mapsReducer from '../reducers/maps/mapsReducer';

export default combineReducers({
  routesReducer,
  profileReducer,
  sessionReducer,
  todolistReducer,
  mapsReducer
});
