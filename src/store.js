import {combineReducers, createStore} from "redux";
import petReducer from "./Helpers/petReducer";

const reducers = combineReducers({petReducer});
const store = createStore(reducers);


export default store;