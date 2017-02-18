import { combineReducers } from 'redux';
import locBarReducer from './locBarReducer';


const rootReducer = combineReducers({
  GoogleResults: locBarReducer
});

export default rootReducer;
